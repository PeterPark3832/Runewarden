/**
 * Runewarden — Warden 캐릭터 정의
 *
 * 각 Warden은 고유한 시작 조건·패시브·스타터 덱을 갖습니다.
 * Rank 5  이상: Storm Warden  해금
 * Rank 10 이상: Arcane Warden 해금
 * Rank 15 이상: Shadow Warden 해금
 */

import { CARD_DEFS } from './cards.js';
import { CardSystem } from '../systems/CardSystem.js';
import { SHADOW_WARDENS } from '../dlc/shadow_realm/wardens.js';
import { SOLAR_WARDENS }  from '../dlc/solar_dominion/wardens.js';
import { STORM_WARDENS }  from '../dlc/storm_imperium/wardens.js';
import { hasDLC }         from '../systems/DLCRegistry.js';

// ── Warden 패시브 ID ────────────────────────────────
export const PASSIVES = {
  STALWART:           'stalwart',           // Iron   — 표준 넥서스 방어 (특수 효과 없음)
  BLOODLUST:          'bloodlust',          // Storm  — 적 처치 시 골드 +1 추가
  ARCANE_FLOW:        'arcane_flow',        // Arcane — 주문 코스트 -1 (최소 0)
  GRAVE_GOLD:         'grave_gold',         // Shadow — 웨이브 종료 시 버린 카드마다 골드 +1
  SHADOW_CHARGE:      'shadow_charge',      // DLC 1  — 적 처치 10회 → Shadow Beam 자동 시전
  SOLAR_CHARGE_SOLAR: 'solar_charge_solar', // DLC 2  — 주문 시전(cost≥2) 8회 → Solar Beam 자동 시전
  STORM_CHARGE:       'storm_charge',       // DLC 3  — 비행 적 처치/착지 8회 → Thunderstrike 자동 시전
};

// ── 스타터 덱 빌더 ───────────────────────────────────
function makeDeck(idList) {
  return idList.map(id => {
    const def = CARD_DEFS.find(c => c.id === id);
    if (!def) { console.warn(`[Warden] Card not found: ${id}`); return null; }
    return { ...def, uid: CardSystem.nextUid() };
  }).filter(Boolean);
}

// ── Warden 정의 (기본 게임) ────────────────────────
const _BASE_WARDEN_DEFS = [

  // ── 1. Iron Warden (기본) ────────────────────────
  {
    id:        'iron',
    name:      'Iron Warden',
    nameKo:    '철의 워든',
    nameZh:    '钢铁守护者',
    title:     'The Balanced',
    icon:      '🛡️',
    color:     '#D4AF37',
    accentBg:  'linear-gradient(135deg,#1a1a2e,#2a2a4a)',
    unlockRank: 0,
    tagline:   '"Steady hand. Steady mind."',
    taglineKo: '"흔들리지 않는 손, 흔들리지 않는 마음."',
    taglineZh: '"手稳，心亦稳。"',
    desc:      { en: 'Balanced start. A standard deck mixing summons, augments, and spells.', ko: '균형 잡힌 시작 조건. 소환·강화·주문이 고르게 구성된 표준 덱.', zh: '均衡的开局。召唤、强化与法术搭配均衡的标准牌组。' },

    // 시작 조건
    startGold:  25,
    handSize:   5,
    nexusHp:    3,
    passive:    PASSIVES.STALWART,
    passiveKey: 'passive_stalwart_desc',

    // 스타터 덱 (14장)
    buildDeck: () => makeDeck([
      'summon_archer', 'summon_archer', 'summon_archer', 'summon_archer',
      'summon_cannon', 'summon_cannon',
      'aug_sharpen',   'aug_sharpen',
      'aug_extend',
      'aug_haste',
      'spell_gold',    'spell_gold',
      'spell_fireball',
      'spell_freeze',
    ]),

    // 플레이 팁
    tips: ['다양한 타입의 타워를 배치하세요', '강화로 핵심 타워를 극대화하세요'],
  },

  // ── 2. Storm Warden (공격형) ─────────────────────
  {
    id:        'storm',
    name:      'Storm Warden',
    nameKo:    '폭풍의 워든',
    nameZh:    '风暴守护者',
    title:     'The Aggressive',
    icon:      '⚡',
    color:     '#E74C3C',
    accentBg:  'linear-gradient(135deg,#1a0505,#3a0a0a)',
    unlockRank: 5,
    tagline:   '"Strike first. Strike hard."',
    taglineKo: '"먼저 쳐라. 강하게 쳐라."',
    taglineZh: '"先发制人，全力出击。"',
    desc:      { en: 'Kill to earn. +1 gold per kill. Aggressive hand of 6 cards.', ko: '적을 처치할수록 강해진다. 적 처치 시 골드 +1. 빠른 핸드 6장으로 공격적 플레이.', zh: '以杀取财。每击杀 1 名敌人获得 1 金币。6 张手牌，主打进攻。' },

    // 시작 조건
    startGold:  20,   // 골드 약간 적게 시작 (보상으로 회수)
    handSize:   6,    // 핸드 1장 추가
    nexusHp:    2,    // 넥서스 HP 낮음 (위험 보상)
    passive:    PASSIVES.BLOODLUST,
    passiveKey: 'passive_bloodlust_desc',

    // 스타터 덱 (13장) — 화력 집중
    buildDeck: () => makeDeck([
      'summon_archer',    'summon_archer',    'summon_archer',
      'summon_cannon',    'summon_cannon',    'summon_fire_drake',
      'aug_inferno',      'aug_inferno',
      'aug_swift',
      'spell_fireball',   'spell_fireball',
      'spell_chain_bolt',
      'spell_blaze',
    ]),

    tips: ['적 처치로 골드를 축적하세요', '넥서스 HP가 2이므로 실수에 주의하세요'],
  },

  // ── 3. Arcane Warden (제어형) ────────────────────
  {
    id:        'arcane',
    name:      'Arcane Warden',
    nameKo:    '비전의 워든',
    nameZh:    '奥术守护者',
    title:     'The Controller',
    icon:      '🔮',
    color:     '#8E44AD',
    accentBg:  'linear-gradient(135deg,#0d0520,#1a0a35)',
    unlockRank: 10,
    tagline:   '"Know when to act. And when to wait."',
    taglineKo: '"움직일 때와 기다릴 때를 알라."',
    taglineZh: '"知进退，明时机。"',
    desc:      { en: 'All spell costs -1. Dominate the battlefield through magic.', ko: '모든 주문 코스트 -1. 주문 중심 덱으로 마법으로 전장을 지배한다.', zh: '所有法术费用 -1。以魔法主宰战场。' },

    // 시작 조건
    startGold:  32,   // 골드 많게 시작 (초반 주문 플레이)
    handSize:   5,
    nexusHp:    3,
    passive:    PASSIVES.ARCANE_FLOW,
    passiveKey: 'passive_arcane_flow_desc',

    // 스타터 덱 (13장) — 주문 집중
    buildDeck: () => makeDeck([
      'summon_archer',  'summon_archer',
      'summon_cannon',
      'summon_tesla',
      'aug_sharpen',    'aug_extend',    'aug_arcane_link',
      'spell_gold',     'spell_gold',
      'spell_freeze',   'spell_freeze',
      'spell_mana_surge',
      'spell_lightning',
    ]),

    tips: ['주문으로 웨이브를 제어하세요', 'Mana Surge로 손패를 계속 채우세요'],
  },

  // ── 4. Shadow Warden (희생형) ─────────────────────
  {
    id:        'shadow',
    name:      'Shadow Warden',
    nameKo:    '어둠의 워든',
    nameZh:    '暗影守护者',
    title:     'The Forsaken',
    icon:      '🌑',
    color:     '#9B59B6',
    accentBg:  'linear-gradient(135deg,#0a0010,#1a0030)',
    unlockRank: 15,
    tagline:   '"Those who fear the dark have never wielded it."',
    taglineKo: '"어둠을 두려워하는 자는 어둠을 휘둘러본 적이 없다."',
    taglineZh: '"畏惧黑暗者，从未真正驾驭过它。"',
    desc:      {
      en: 'Discard for profit. Each card shed at wave end yields 1 gold. Large hand of 7, but Nexus is fragile.',
      ko: '카드를 버려 골드를 얻는다. 웨이브 종료 시 버린 카드마다 골드 +1. 핸드 7장이지만 넥서스가 취약하다.',
      zh: '弃牌生财。波次结束时每弃 1 张牌获得 1 金币。手牌多达 7 张，但枢纽较为脆弱。',
    },

    startGold:  28,
    handSize:   7,   // 큰 핸드 → 많은 버리기 → 많은 골드
    nexusHp:    2,   // 취약한 넥서스 (Storm과 동일)
    passive:    PASSIVES.GRAVE_GOLD,
    passiveKey: 'passive_grave_gold_desc',

    buildDeck: () => makeDeck([
      'summon_archer',       'summon_archer',
      'summon_bone_archer',  'summon_bone_archer',
      'summon_shadow_strike',
      'aug_cursed_blade',    'aug_cursed_blade',
      'aug_shadow_veil',
      'spell_soul_drain',    'spell_soul_drain',
      'spell_grave_call',
      'spell_sacrifice',
    ]),

    tips: ['웨이브 종료 시 핸드를 가득 채워 최대 골드를 확보하세요', 'Dark Sacrifice로 나쁜 패를 골드로 전환하세요'],
  },
];

// DLC 워든 병합 (하위 호환 — 기존 코드에서 계속 사용 가능)
export const WARDEN_DEFS = [..._BASE_WARDEN_DEFS, ...SHADOW_WARDENS, ...SOLAR_WARDENS, ...STORM_WARDENS];

/** ID로 Warden 찾기 */
export function getWardenById(id) {
  return WARDEN_DEFS.find(w => w.id === id) ?? WARDEN_DEFS[0];
}

/**
 * DLC 소유 여부로 필터링된 워든풀 반환.
 * 워든 선택 화면에서 선택 가능한 워든 목록에 사용.
 */
export function getWardenPool() {
  return [
    ..._BASE_WARDEN_DEFS,
    ...(hasDLC('shadow_realm')   ? SHADOW_WARDENS : []),
    ...(hasDLC('solar_dominion') ? SOLAR_WARDENS  : []),
    ...(hasDLC('storm_imperium') ? STORM_WARDENS  : []),
  ];
}
