/**
 * Solar Dominion DLC — 简体中文 (zh)
 * Prefix: dlc_sd_  (no collision with base or DLC 1 keys)
 */

export default {
  // ── Warden ─────────────────────────────────────────
  dlc_sd_passive_name: '太阳蓄能',
  dlc_sd_passive_desc: '每施放一次费用≥2的法术获得+1太阳能量。积累8层时，太阳射线自动免费施放。',
  dlc_sd_warden_locked: '需要太阳主宰DLC',

  // ── Solar Charge HUD ────────────────────────────────
  dlc_sd_log_auto_cast:     (spell) => `☀️ 太阳之力爆发！自动施放：${spell}`,
  dlc_sd_log_solar_charge:  (n, max) => `太阳能量：${n}/${max}`,

  // ── Relic names ─────────────────────────────────────
  relic_solar_lens:           '太阳透镜',
  relic_solar_lens_desc:      '神圣炮塔攻击范围+60%。',
  relic_titan_bane:           '巨人克星',
  relic_titan_bane_desc:      '太阳灼烧（持续伤害）每秒伤害+4，持续时间延长1.5秒。',
  relic_radiant_core:         '辉耀核心',
  relic_radiant_core_desc:    '所有防御塔伤害+12%。',
  relic_solar_capacitor:      '太阳蓄能器',
  relic_solar_capacitor_desc: '所有防御塔攻击速度+20%。',
  relic_crusader_relic:       '圣战士之热忱',
  relic_crusader_relic_desc:  '圣战士眩晕持续时间+200毫秒。',
  relic_solar_tribute:        '太阳贡品',
  relic_solar_tribute_desc:   '每波次清除后获得+6金币。',
  relic_sun_market:           '太阳市场',
  relic_sun_market_desc:      '商店卡牌费用降低2金币。',
  relic_golden_chalice:       '黄金圣杯',
  relic_golden_chalice_desc:  '每次游戏局开始额外获得+18金币。',
  relic_solar_ward:           '太阳守护',
  relic_solar_ward_desc:      '开局额外获得+1要塞核心生命值。',
  relic_holy_bastion:         '圣洁堡垒',
  relic_holy_bastion_desc:    '每波次要塞核心最多只能被击中一次。',
  relic_blinding_amulet:      '致盲护符',
  relic_blinding_amulet_desc: '所有减速效果强度+25%。',
  relic_solar_pact_relic:     '太阳契约',
  relic_solar_pact_relic_desc:'拥有2座以上太阳防御塔时，所有太阳伤害+30%。',
  relic_light_prism_bonus:    '棱光增幅器',
  relic_light_prism_bonus_desc:'光棱气场对相邻防御塔额外提供+10%伤害加成。',
  relic_solar_crown:          '太阳王冠',
  relic_solar_crown_desc:     '太阳守护者：太阳能量在积累6层时触发（原为8层）。',
  relic_radiant_will:         '辉耀意志',
  relic_radiant_will_desc:    '太阳守护者：施放费用4+的法术时额外获得+1太阳能量。',

  // ── Map names ──────────────────────────────────────
  dlc_sd_map_solar_forum:       '太阳广场',
  dlc_sd_map_sunken_temple:     '沉没神殿',
  dlc_sd_map_blazing_corridor:  '烈焰走廊',

  // ── Spell logs ─────────────────────────────────────
  spell_solar_beam:       (d, pct, s) => `太阳射线！对所有敌人造成${d}点伤害+减速${pct}%，持续${s}秒！`,
  spell_divine_shield:    (s)        => `神圣护盾！要塞核心免疫伤害${s}秒！`,
  spell_solar_flare:      (dps, s)   => `太阳闪焰！对所有敌人施加${dps}每秒太阳灼烧（持续伤害），持续${s}秒！`,
  spell_solar_tithe:      (g)        => `太阳献祭！消耗${g}金币——所有敌人受到×2伤害！`,
  spell_radiant_burst:    (d)        => `辉耀爆发！对所有敌人造成${d}点伤害！`,
  spell_sunburst:         (d, pct, s)=> `烈阳爆裂！对先头敌人造成${d}点伤害+减速${pct}%，持续${s}秒！`,
  spell_gold_tithe:       (g)        => `黄金献祭！从战场获得+${g}金币！`,
  spell_solar_nova:       (d)        => `太阳新星！对所有敌人造成${d}点伤害（对太阳灼烧目标双倍）！`,
  spell_heavenly_light:   (hp, g)    => `天堂之光！要塞核心+${hp}生命值，+${g}金币！`,
  spell_blinding_light:   (s)        => `致盲之光！所有敌人冰冻${s}秒！`,
  spell_solar_surge:      (pct, s)   => `太阳涌动！所有防御塔攻击速度+${pct}%，持续${s}秒！`,
  spell_divine_wrath:     (d)        => `神圣愤怒！对先头敌人造成${d}点伤害！`,
  spell_solar_corona:     (dps, s)   => `太阳日冕！太阳灼烧每秒${dps}点，持续${s}秒+额外太阳能量！`,

  // ── Event logs ─────────────────────────────────────
  event_invest_gold_return: (g) => `黄金投资回报！+${g}金币！`,
};
