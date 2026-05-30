/**
 * Storm Imperium DLC — 타워 정의 (4종)
 * src/data/towers.js의 TOWER_DEFS 객체에 병합됩니다.
 */

export const STORM_TOWER_DEFS = {

  // ── 1. Storm Ballista (폭풍 발리스타) ─────────────────
  // 단일 타겟 고피해. 비행 적에게 +40% 보너스 피해.
  storm_ballista: {
    id:            'storm_ballista',
    name:          'Storm Ballista',
    nameKo:        '폭풍 발리스타',
    icon:          '⚡',
    color:         '#0a1a2a',
    accentColor:   '#4ECDC4',
    damage:        55,
    range:         5.0,
    attackSpeed:   2000,
    splash:        0,
    flyingBonus:   0.40,        // +40% damage vs flying enemies
    canTargetFlying: true,
    tags:          ['Storm'],
    shape:         'ballista',
    dlc:           'storm_imperium',
  },

  // ── 2. Tempest Tower (폭풍 타워) ─────────────────────
  // 범위 공격. Wind DoT 부여. 비행 적 타겟 가능.
  tempest_tower: {
    id:            'tempest_tower',
    name:          'Tempest Tower',
    nameKo:        '폭풍 타워',
    icon:          '🌪️',
    color:         '#061220',
    accentColor:   '#00B4D8',
    damage:        30,
    range:         3.8,
    attackSpeed:   1400,
    splash:        1.4,
    windDotDps:    8,
    windDotDur:    3000,
    canTargetFlying: true,
    tags:          ['Storm'],
    shape:         'mage',
    dlc:           'storm_imperium',
  },

  // ── 3. Wind Anchor (바람 닻) ──────────────────────────
  // 범위 내 비행 적 착지 강제. 지상 전용 타겟.
  wind_anchor: {
    id:              'wind_anchor',
    name:            'Wind Anchor',
    nameKo:          '바람 닻',
    icon:            '⚓',
    color:           '#0d1b2a',
    accentColor:     '#48CAE4',
    damage:          12,
    range:           4.5,
    attackSpeed:     1200,
    splash:          0,
    groundingRadius:   2.5,     // hex radius for grounding aura
    groundingDuration: 3500,    // ms
    canTargetFlying: false,
    tags:            ['Storm'],
    shape:           'druid',
    dlc:             'storm_imperium',
  },

  // ── 4. Storm Conduit (폭풍 도관) ─────────────────────
  // 낮은 직접 피해. 오라로 주변 타워 Wind DoT 부여 강화.
  storm_conduit: {
    id:              'storm_conduit',
    name:            'Storm Conduit',
    nameKo:          '폭풍 도관',
    icon:            '🌩️',
    color:           '#0a1a2a',
    accentColor:     '#0096C7',
    damage:          10,
    range:           3.5,
    attackSpeed:     1000,
    splash:          0,
    stormConduitAura: true,
    auraRadius:      2.0,
    windDotDps:      5,
    windDotDur:      2000,
    canTargetFlying: true,
    tags:            ['Storm'],
    shape:           'tesla',
    dlc:             'storm_imperium',
  },
};
