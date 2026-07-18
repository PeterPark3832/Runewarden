/**
 * Shadow Realm DLC — 简体中文 (zh)
 * Prefix: dlc_sr_  (no collision with base keys)
 */

export default {
  // ── Warden ─────────────────────────────────────────
  dlc_sr_passive_name: '暗影蓄能',
  dlc_sr_passive_desc: '每击杀一个敌人获得+1暗影能量。积累10层时，自动免费施放一道强力暗影法术。',
  dlc_sr_warden_locked: '需要暗影领域DLC',

  // ── Shadow Charge HUD ───────────────────────────────
  dlc_sr_log_auto_cast:    (spell) => `👁️ 暗影之力爆发！自动施放：${spell}`,
  dlc_sr_log_shadow_charge:(n)    => `暗影能量：${n}/10`,

  // ── Relic names ─────────────────────────────────────
  relic_shadow_crystal:        '暗影水晶',
  relic_shadow_crystal_desc:   '暗影打击防御塔伤害+50%。',
  relic_void_lens:             '虚空透镜',
  relic_void_lens_desc:        '虚空哨兵防御塔攻击范围+60%。',
  relic_phantom_edge:          '幻影利刃',
  relic_phantom_edge_desc:     '所有防御塔伤害+12%。',
  relic_death_shroud:          '死亡裹尸布',
  relic_death_shroud_desc:     '每击杀一个敌人获得+2金币。',
  relic_void_core:             '虚空核心',
  relic_void_core_desc:        '所有防御塔攻击速度+20%。',
  relic_shadow_hoard:          '暗影宝库',
  relic_shadow_hoard_desc:     '每波次清除后获得+5金币。',
  relic_void_market:           '虚空市场',
  relic_void_market_desc:      '商店卡牌费用降低2金币。',
  relic_souls_purse:           '灵魂钱袋',
  relic_souls_purse_desc:      '每次游戏局开始额外获得+15金币。',
  relic_shadow_ward:           '暗影守护',
  relic_shadow_ward_desc:      '开局额外获得+1要塞核心生命值。',
  relic_void_anchor:           '虚空锚',
  relic_void_anchor_desc:      '每波次要塞核心最多只能被击中一次。',
  relic_death_veil:            '死亡薄纱',
  relic_death_veil_desc:       '所有减速效果强度+30%。',
  relic_shadow_pact:           '暗影契约',
  relic_shadow_pact_desc:      '拥有2座以上暗影防御塔时，所有暗影伤害+30%。',
  relic_void_echo_relic:       '虚空回响',
  relic_void_echo_relic_desc:  '施放法术时，所有虚空防御塔立即开火。（8秒冷却）',
  log_void_echo_relic:         (n) => `虚空回响！${n}座虚空防御塔开火！`,
  relic_charge_crystal:        '蓄能水晶',
  relic_charge_crystal_desc:   '暗影守护者：暗影能量在积累8层时触发（原为10层）。',
  relic_undying_will:          '不死意志',
  relic_undying_will_desc:     '仅限暗影守护者：每击杀5个敌人额外获得+1暗影能量，更快达到自动施放阈值。',

  // ── Map names ──────────────────────────────────────
  dlc_sr_map_void_corridor:    '虚空走廊',
  dlc_sr_map_phantom_crossing: '幻影渡口',
  dlc_sr_map_abyssal_spiral:   '深渊螺旋',

  // ── Spell logs ─────────────────────────────────────
  spell_darkness:         (pct, dmg, s) => `黑暗！所有敌人速度-${pct}%，所有防御塔伤害+${dmg}%，持续${s}秒！`,
  spell_shadow_nova:      (total)       => `暗影新星！对受伤敌人造成${total}点总伤害！`,
  spell_void_pulse:       (n, steps)    => `虚空脉冲！${n}个敌人被推后${steps}步。`,
  spell_soul_feast:       (n, g)        => n > 0 ? `灵魂盛宴！吞噬${n}个敌人→+${g}金币！` : '灵魂盛宴：没有低于阈值的敌人。',
  spell_soul_surge:       (pct, s)      => `灵魂涌动！所有防御塔伤害+${pct}%，持续${s}秒！`,
  spell_abyssal_wave:     (d, pct, s)   => `深渊浪潮！造成${d}点伤害+减速${pct}%，持续${s}秒！`,
  spell_shadow_step:      (n)           => `暗影步伐！${n}个敌人被传送至出生点。`,
  spell_death_toll:       (n)           => `死亡丧钟！本波次击杀额外获得+${n}金币。`,
  spell_entropy_cascade:  (total)       => `熵变连锁！造成${total}点总伤害（各敌人当前生命值的50%）。`,
  spell_void_collapse:    (pct, s)      => `虚空崩塌！所有敌人减速${pct}%，持续${s}秒。`,
  spell_void_grasp:       (s)           => `虚空掌握！所有敌人冰冻${s}秒。`,
  spell_phantom_strike:   (n, d)        => `幻影突袭！${n}个敌人各受到${d}点伤害。`,

  // Act 4 클리어 보상 레전더리 (누락분 보충)
  relic_void_sovereign:        '虚空主宰',
  relic_void_sovereign_desc:   '所有防御塔伤害 +20%。通关第四章后解锁。',
  relic_shadow_legacy:         '暗影传承',
  relic_shadow_legacy_desc:    '暗影守护者：暗影充能 7 层即可触发（默认 10 层）。通关第四章后解锁。',
};
