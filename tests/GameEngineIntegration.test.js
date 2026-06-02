import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── DOM / module mocks ──────────────────────────────────────────────────────
// These are needed because EnemySystem and TowerSystem import MapRenderer
// and AudioSystem, which have side effects at module load time.

const mockEl = () => {
  const el = {
    style: {}, children: [],
    classList: { add: vi.fn(), remove: vi.fn(), contains: vi.fn(() => false) },
  };
  el.setAttribute    = vi.fn();
  el.getAttribute    = vi.fn(() => null);
  el.remove          = vi.fn();
  el.appendChild     = vi.fn(c => el.children.push(c));
  el.ownerSVGElement = el;
  el.querySelector   = vi.fn(() => null);
  el.insertBefore    = vi.fn();
  return el;
};

vi.stubGlobal('document', {
  getElementById:  vi.fn(() => null),
  createElement:   vi.fn(() => mockEl()),
  createElementNS: vi.fn(() => mockEl()),
  head:            { appendChild: vi.fn() },
});

vi.mock('../src/rendering/MapRenderer.js', () => ({
  ENEMY_PATH: { current: [[0, 0], [1, 0], [2, 0]] },
  hexToPixel:  (c, r) => ({ x: c * 60, y: r * 60 }),
  svgEl:       (_tag, _attrs) => mockEl(),
}));

vi.mock('../src/systems/AudioSystem.js', () => ({
  audio: { play: vi.fn() },
}));

vi.mock('../src/config/constants.js', () => ({ HEX_W: 60 }));

import { EnemySystem } from '../src/systems/EnemySystem.js';
import { TowerSystem }  from '../src/systems/TowerSystem.js';

// ── helpers ─────────────────────────────────────────────────────────────────

function makeMockEnemySystem() {
  return {
    enemies:           [],
    getLeadEnemy:      vi.fn(() => null),
    getEnemiesInRange: vi.fn(() => []),
    dealDamage:        vi.fn(() => false),
    applySlow:         vi.fn(),
    applyBurn:         vi.fn(),
  };
}

function makeTS() {
  const layer = mockEl();
  const es    = makeMockEnemySystem();
  const ts    = new TowerSystem(layer, es, vi.fn());
  return { ts, es };
}

function makeES() {
  const es = new EnemySystem(mockEl(), vi.fn(), vi.fn(), vi.fn());
  // Mock visual helpers so tests don't crash on DOM absence
  es._spawnDamageNumber = vi.fn();
  es._hitFlash          = vi.fn();
  es._spawnImpactFlash  = vi.fn();
  es._removeEnemy       = vi.fn();
  es._spawnSplashEffect = vi.fn();
  return es;
}

function makeEnemy(overrides = {}) {
  return {
    id: 'e1', type: 'grunt', name: 'Grunt',
    x: 60, y: 0, hp: 100, maxHp: 100,
    speed: 50, baseSpeed: 50,
    color: '#888', size: 10, reward: 1,
    isBoss: false, isElite: false,
    shieldHits: 0, slowImmune: false,
    enrageThreshold: null, enraged: false,
    regenDps: 0, damageReduction: 0,
    phase2: false,
    frozen: 0, slowTimer: 0, slowAmt: 0,
    ironShieldCd: 0, ironShielding: 0,
    burns: [],
    el: null, hpBar: null, bodyEl: null, shieldEl: null,
    waypointIndex: 1, reached: false,
    ...overrides,
  };
}

// ── Test 1: Victory Streak state machine ─────────────────────────────────────
// GameEngine.js cannot be imported without DOM (document.addEventListener at
// module level + many UI imports). Instead we test the _victoryStreakWaves /
// _victoryStreakBonus state machine in isolation by replicating its minimal
// logic directly — the same pattern used for _nextRerollCost in TowerSystem.test.js.

describe('Victory Streak state machine (isolated logic)', () => {
  // Replicate the GameEngine logic from onEnemyKilled (~line 1581) and
  // onWaveCleared/pre-wave bonus payout (~line 1068).

  function makeStreakState() {
    return { _victoryStreakWaves: 0, _victoryStreakBonus: 0, gold: 0 };
  }

  // Called when a boss-reward enemy is killed (reward >= 20)
  function onBossKilled(state, reward) {
    const streakBonus = reward >= 45 ? 5 : 4;
    state._victoryStreakWaves = 2;
    state._victoryStreakBonus = streakBonus;
  }

  // Called at start of each wave clear (bonus payout phase)
  function payStreakBonus(state) {
    if (state._victoryStreakWaves > 0) {
      state.gold += state._victoryStreakBonus;
      state._victoryStreakWaves--;
    }
  }

  it('boss kill (reward 20) sets _victoryStreakWaves=2 and _victoryStreakBonus=4', () => {
    const state = makeStreakState();
    onBossKilled(state, 20);
    expect(state._victoryStreakWaves).toBe(2);
    expect(state._victoryStreakBonus).toBe(4);
  });

  it('boss kill (reward >= 45) sets higher bonus of 5', () => {
    const state = makeStreakState();
    onBossKilled(state, 50);
    expect(state._victoryStreakBonus).toBe(5);
  });

  it('streak pays out bonus on first wave clear and decrements counter', () => {
    const state = makeStreakState();
    onBossKilled(state, 20);
    payStreakBonus(state);
    expect(state.gold).toBe(4);
    expect(state._victoryStreakWaves).toBe(1);
  });

  it('streak pays out on second wave clear and reaches 0', () => {
    const state = makeStreakState();
    onBossKilled(state, 20);
    payStreakBonus(state);
    payStreakBonus(state);
    expect(state.gold).toBe(8);
    expect(state._victoryStreakWaves).toBe(0);
  });

  it('no payout on third wave clear once streak is exhausted', () => {
    const state = makeStreakState();
    onBossKilled(state, 20);
    payStreakBonus(state);
    payStreakBonus(state);
    payStreakBonus(state); // streak already 0
    expect(state.gold).toBe(8); // unchanged
    expect(state._victoryStreakWaves).toBe(0);
  });
});

// ── Test 2: Solar Pact single application ────────────────────────────────────

describe('TowerSystem.addSolarPact()', () => {
  it('addSolarPact uses assignment not accumulation — calling twice keeps last value', () => {
    const { ts } = makeTS();
    ts.addSolarPact(0.30);
    ts.addSolarPact(0.30);
    // If it accumulated it would be 0.60; assignment means it stays at 0.30
    expect(ts._solarPact).toBeCloseTo(0.30);
  });

  it('second call with different value overwrites first', () => {
    const { ts } = makeTS();
    ts.addSolarPact(0.20);
    ts.addSolarPact(0.45);
    expect(ts._solarPact).toBeCloseTo(0.45);
  });

  it('initial _solarPact is 0 before any call', () => {
    const { ts } = makeTS();
    expect(ts._solarPact).toBe(0);
  });
});

// ── Test 3: Storm Pact single application ────────────────────────────────────

describe('TowerSystem.addStormPact()', () => {
  it('addStormPact uses assignment not accumulation — calling twice keeps last value', () => {
    const { ts } = makeTS();
    ts.addStormPact(0.30);
    ts.addStormPact(0.30);
    expect(ts._stormPact).toBeCloseTo(0.30);
  });

  it('second call with different value overwrites first', () => {
    const { ts } = makeTS();
    ts.addStormPact(0.15);
    ts.addStormPact(0.50);
    expect(ts._stormPact).toBeCloseTo(0.50);
  });

  it('initial _stormPact is 0 before any call', () => {
    const { ts } = makeTS();
    expect(ts._stormPact).toBe(0);
  });
});

// ── Test 4: _pendingRemove prevents double kill reward ────────────────────────

describe('EnemySystem._pendingRemove prevents double kill reward', () => {
  let es;

  beforeEach(() => {
    es = makeES();
  });

  it('dealDamage returns false for already-pending enemy (double hit same frame)', () => {
    const e = makeEnemy({ hp: 10, maxHp: 10 });
    es.enemies.push(e);

    // First hit: 15 damage kills the enemy (hp → -5) → queued in _pendingRemove, returns true
    const first = es.dealDamage('e1', 15);
    expect(first).toBe(true);
    expect(es._pendingRemove.has('e1')).toBe(true);

    // Second hit before flush: enemy is in _pendingRemove → returns false immediately
    const second = es.dealDamage('e1', 15);
    expect(second).toBe(false);
  });

  it('onEnemyKilled fires exactly once after flush despite two damage calls', () => {
    const e = makeEnemy({ hp: 10, maxHp: 10, reward: 5 });
    es.enemies.push(e);

    es.dealDamage('e1', 15); // kills → pending
    es.dealDamage('e1', 15); // already pending → no-op

    es._flushPendingRemovals();

    expect(es.onEnemyKilled).toHaveBeenCalledTimes(1);
    expect(es.onEnemyKilled).toHaveBeenCalledWith(5, false, false);
  });

  it('_pendingRemove is cleared after flush', () => {
    const e = makeEnemy({ hp: 5, maxHp: 5 });
    es.enemies.push(e);

    es.dealDamage('e1', 10);
    es._flushPendingRemovals();

    expect(es._pendingRemove.size).toBe(0);
  });
});
