/**
 * Storm Imperium DLC — 유물 (15개)
 * Storm / Wind / Flying 테마
 */

export const STORM_RELICS = [

  // ── 공격형 (5) ──────────────────────────────────────
  {
    id: 'storm_lens',
    icon: '🔭', rarity: 'uncommon', category: 'attack',
    // Storm Ballista 사거리 +60%
    effect: { type: 'tower_range_bonus', towerType: 'storm_ballista', mult: 1.60 },
    dlc: 'storm_imperium',
  },
  {
    id: 'aerial_bane',
    icon: '🦅', rarity: 'rare', category: 'attack',
    // 모든 타워 비행 적 피해 +25%
    effect: { type: 'flying_dmg_bonus', extraMult: 0.25 },
    dlc: 'storm_imperium',
  },
  {
    id: 'storm_core',
    icon: '⚡', rarity: 'uncommon', category: 'attack',
    // 모든 타워 피해 +10%
    effect: { type: 'tower_dmg_bonus', towerType: '__all__', mult: 1.10 },
    dlc: 'storm_imperium',
  },
  {
    id: 'tempest_capacitor',
    icon: '🌪️', rarity: 'rare', category: 'attack',
    // 모든 타워 공격속도 +18%
    effect: { type: 'tower_speed_bonus', towerType: '__all__', mult: 0.82 },
    dlc: 'storm_imperium',
  },
  {
    id: 'anchor_weight',
    icon: '⚓', rarity: 'uncommon', category: 'attack',
    // Wind Anchor 착지 반경 +1헥스, 지속 +1초
    effect: { type: 'anchor_bonus', extraRadius: 1, extraDuration: 1000 },
    dlc: 'storm_imperium',
  },

  // ── 경제형 (3) ──────────────────────────────────────
  {
    id: 'storm_tribute',
    icon: '💛', rarity: 'uncommon', category: 'economy',
    // 웨이브 클리어마다 골드 +5
    effect: { type: 'wave_clear_gold', amount: 5 },
    dlc: 'storm_imperium',
  },
  {
    id: 'storm_market',
    icon: '🏪', rarity: 'uncommon', category: 'economy',
    // 상점 카드 비용 -2g
    effect: { type: 'shop_discount', amount: 2 },
    dlc: 'storm_imperium',
  },
  {
    id: 'thunder_coffer',
    icon: '💰', rarity: 'rare', category: 'economy',
    // 런 시작 시 골드 +16
    effect: { type: 'start_gold', amount: 16 },
    dlc: 'storm_imperium',
  },

  // ── 방어형 (3) ──────────────────────────────────────
  {
    id: 'storm_ward',
    icon: '🛡️', rarity: 'uncommon', category: 'defense',
    // 넥서스 HP +1
    effect: { type: 'nexus_hp_bonus', amount: 1 },
    dlc: 'storm_imperium',
  },
  {
    id: 'sky_bastion',
    icon: '🏰', rarity: 'rare', category: 'defense',
    // 웨이브당 넥서스 최대 1회 피격
    effect: { type: 'iron_fortress' },
    dlc: 'storm_imperium',
  },
  {
    id: 'grounding_amulet',
    icon: '🌀', rarity: 'uncommon', category: 'defense',
    // 바람 감속 35% 이상 시 비행 적 착지
    effect: { type: 'grounding_threshold', threshold: 0.35 },
    dlc: 'storm_imperium',
  },

  // ── 시너지형 (2) ─────────────────────────────────────
  {
    id: 'storm_pact_relic',
    icon: '⚡', rarity: 'rare', category: 'synergy',
    // Storm 태그 타워 2개+ → 전체 Storm 피해 +30%
    effect: { type: 'storm_pact', extraMult: 0.30 },
    dlc: 'storm_imperium',
  },
  {
    id: 'wind_prism_bonus',
    icon: '💎', rarity: 'rare', category: 'synergy',
    // Storm Conduit 오라 피해 +10%
    effect: { type: 'storm_conduit_bonus', extraRadius: 0, extraDmg: 0.10 },
    dlc: 'storm_imperium',
  },

  // ── 특수형 (2, Tempest Warden 전용) ─────────────────
  {
    id: 'storm_crown',
    icon: '👑', rarity: 'rare', category: 'special',
    // Tempest Warden 전용: Storm Charge 최대치 8→6으로 단축
    effect: { type: 'storm_charge_reduce', newMax: 6 },
    dlc: 'storm_imperium',
  },
  {
    id: 'aerial_will',
    icon: '🦅', rarity: 'uncommon', category: 'special',
    // Tempest Warden 전용: 비행 적 착지 시 충전 +1 추가
    effect: { type: 'storm_charge_on_grounding', extraCharge: 1 },
    dlc: 'storm_imperium',
  },
];
