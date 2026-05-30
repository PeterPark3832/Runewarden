/**
 * Storm Imperium DLC — 카드 데이터 (15종)
 * Summon(2) / Augment(5) / Spell(8)
 * 테마: Storm / Flying / Wind
 */

export const STORM_CARDS = [

  // ════════════════════════════════════════════════════
  // ── SUMMON (2) ───────────────────────────────────
  // ════════════════════════════════════════════════════
  {
    id: 'summon_storm_ballista',
    name: 'Storm Ballista',     nameKo: '폭풍 발리스타',
    type: 'summon', rarity: 'rare', cost: 5, icon: '⚡',
    desc:   'Place a Storm Ballista. Targets flying enemies. Deals +40% bonus damage to flying foes.',
    descKo: '폭풍 발리스타를 배치합니다. 비행 적을 타겟합니다. 비행 적에게 +40% 추가 피해.',
    tower: 'storm_ballista', dlc: 'storm_imperium',
  },
  {
    id: 'summon_wind_anchor',
    name: 'Wind Anchor',        nameKo: '바람 닻',
    type: 'summon', rarity: 'uncommon', cost: 3, icon: '⚓',
    desc:   'Place a Wind Anchor. Forces flying enemies in radius 2.5 hex to land (grounded) for 3.5s.',
    descKo: '바람 닻을 배치합니다. 반경 2.5헥스 내 비행 적을 착지 상태로 3.5초간 강제합니다.',
    tower: 'wind_anchor', dlc: 'storm_imperium',
  },

  // ════════════════════════════════════════════════════
  // ── AUGMENT (5) ──────────────────────────────────
  // ════════════════════════════════════════════════════
  {
    id: 'aug_storm_edge',
    name: 'Storm Edge',         nameKo: '폭풍의 날',
    type: 'augment', rarity: 'common', cost: 2, icon: '⚡',
    desc:   'All towers deal +20% damage next wave.',
    descKo: '다음 웨이브 동안 모든 타워 피해 +20%.',
    effect: { type: 'temp_dmg_bonus', mult: 1.20 }, dlc: 'storm_imperium',
  },
  {
    id: 'aug_aerial_focus',
    name: 'Aerial Focus',       nameKo: '공중 집중',
    type: 'augment', rarity: 'uncommon', cost: 3, icon: '🎯',
    desc:   'Permanently grant Storm Ballista +50% damage.',
    descKo: '폭풍 발리스타 영구 +50% 피해.',
    effect: { type: 'tower_dmg_bonus', towerType: 'storm_ballista', mult: 1.50 }, dlc: 'storm_imperium',
  },
  {
    id: 'aug_gale_step',
    name: 'Gale Step',          nameKo: '질풍 걸음',
    type: 'augment', rarity: 'common', cost: 2, icon: '💨',
    desc:   'Selected tower gains +25% attack speed permanently.',
    descKo: '선택한 타워 공격속도 영구 +25%.',
    effect: { type: 'target_speed_bonus', mult: 0.75 }, dlc: 'storm_imperium',
  },
  {
    id: 'aug_storm_pact',
    name: 'Storm Pact',         nameKo: '폭풍 협정',
    type: 'augment', rarity: 'rare', cost: 4, icon: '🌩️',
    desc:   'Storm-tagged towers permanently deal +30% damage (requires 2+ Storm towers).',
    descKo: 'Storm 태그 타워 영구 +30% 피해 (Storm 타워 2개+ 필요).',
    effect: { type: 'storm_pact', extraMult: 0.30 }, dlc: 'storm_imperium',
  },
  {
    id: 'aug_lightning_conduit',
    name: 'Lightning Conduit',  nameKo: '번개 도관',
    type: 'augment', rarity: 'uncommon', cost: 2, icon: '⚡',
    desc:   'Storm Conduit aura radius +1 hex and damage +5%.',
    descKo: '폭풍 도관 오라 반경 +1헥스, 피해 +5%.',
    effect: { type: 'storm_conduit_bonus', extraRadius: 1, extraDmg: 0.05 }, dlc: 'storm_imperium',
  },

  // ════════════════════════════════════════════════════
  // ── SPELL (8) ────────────────────────────────────
  // ════════════════════════════════════════════════════
  {
    id: 'spell_thunderstrike',
    name: 'Thunderstrike',      nameKo: '낙뢰',
    type: 'spell', rarity: 'rare', cost: 4, icon: '⚡',
    desc:   'Deal 80 damage to all flying enemies and ground them for 3s.',
    descKo: '모든 비행 적에게 80 피해 및 3초간 착지 상태.',
    effect: { type: 'thunderstrike', damage: 80, groundDuration: 3000 }, dlc: 'storm_imperium',
  },
  {
    id: 'spell_wind_shear',
    name: 'Wind Shear',         nameKo: '바람 베기',
    type: 'spell', rarity: 'uncommon', cost: 3, icon: '🌪️',
    desc:   'Slow all enemies by 50% for 3s. Wind-immune enemies are unaffected.',
    descKo: '모든 적을 50% 감속 3초. 바람 면역 적에게는 무효.',
    effect: { type: 'wind_shear', slowAmount: 0.50, duration: 3000, windType: true }, dlc: 'storm_imperium',
  },
  {
    id: 'spell_storm_gold',
    name: 'Storm Gold',         nameKo: '폭풍 황금',
    type: 'spell', rarity: 'common', cost: 2, icon: '💰',
    desc:   'Gain 3 gold for each flying enemy currently on the field.',
    descKo: '현재 필드의 비행 적 수 × 3 골드 획득.',
    effect: { type: 'gold_per_flying', mult: 3 }, dlc: 'storm_imperium',
  },
  {
    id: 'spell_grounding_bolt',
    name: 'Grounding Bolt',     nameKo: '착지 볼트',
    type: 'spell', rarity: 'uncommon', cost: 3, icon: '⚡',
    desc:   'Deal 60 damage to the lead enemy and ground it for 5s.',
    descKo: '선두 적에게 60 피해 및 5초간 착지 상태.',
    effect: { type: 'grounding_bolt', damage: 60, groundDuration: 5000 }, dlc: 'storm_imperium',
  },
  {
    id: 'spell_cyclone_burst',
    name: 'Cyclone Burst',      nameKo: '사이클론 폭발',
    type: 'spell', rarity: 'uncommon', cost: 3, icon: '🌪️',
    desc:   'Deal 35 damage to all enemies. Flying enemies take double damage (70).',
    descKo: '모든 적에게 35 피해. 비행 적은 2배 피해(70).',
    effect: { type: 'cyclone_burst', damage: 35, flyingMult: 2 }, dlc: 'storm_imperium',
  },
  {
    id: 'spell_storm_shield',
    name: 'Storm Shield',       nameKo: '폭풍 방패',
    type: 'spell', rarity: 'rare', cost: 4, icon: '🛡️',
    desc:   'Grant the Nexus divine protection for 8s (no damage).',
    descKo: '넥서스를 8초간 무적 상태로 만듭니다.',
    effect: { type: 'divine_shield', duration: 8000 }, dlc: 'storm_imperium',
  },
  {
    id: 'spell_lightning_storm',
    name: 'Lightning Storm',    nameKo: '번개 폭풍',
    type: 'spell', rarity: 'rare', cost: 5, icon: '⛈️',
    desc:   'Instantly ground all flying enemies and apply wind DoT (20 DPS for 5s).',
    descKo: '모든 비행 적을 즉시 착지시키고 바람 DoT 적용 (초당 20 피해, 5초).',
    effect: { type: 'lightning_storm', groundDuration: 5000, windDotDps: 20, windDotDur: 5000 }, dlc: 'storm_imperium',
  },
  {
    id: 'spell_gale_call',
    name: 'Gale Call',          nameKo: '돌풍 소환',
    type: 'spell', rarity: 'common', cost: 2, icon: '💨',
    desc:   'Push back 3 flying enemies along their path.',
    descKo: '비행 적 3마리를 경로 역방향으로 밀어냅니다.',
    effect: { type: 'push_back_flying', count: 3 }, dlc: 'storm_imperium',
  },
];
