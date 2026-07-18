/** Runewarden — 简体中文 (zh) */
import dlcShadowZh from '../dlc/shadow_realm/i18n/zh.js';
import dlcSolarZh  from '../dlc/solar_dominion/i18n/zh.js';

const _BASE_ZH = {
  // ── 主菜单 ───────────────────────────────────────────
  title:           'RUNEWARDEN',
  subtitle:        '构建你的牌组。部署防御塔。坚守要塞。',
  btn_new_run:     '▶ 开始新局',
  btn_codex:       '📖 守护者图鉴',
  btn_how_to_play: '游戏说明',
  btn_replay_tut:  '↩ 重播教程',
  warden_rank:     '守护者等级',
  stat_runs:       (n) => `游戏局：${n}`,
  stat_wins:       (n) => `胜利：${n}`,
  stat_kills:      (n) => `击杀：${n}`,

  // ── 守护者选择 ──────────────────────────────────────
  warden_select_title: '选择你的守护者',
  warden_select_sub:   '每位守护者拥有独特的初始牌组和被动技能。',
  warden_select_back:  '← 返回',
  warden_locked:       (rank) => `等级${rank}解锁`,
  warden_selected:     '✓ 已选择',
  warden_select_btn:   '▶ 选择',
  passive_label:       '被动技能',

  // ── 游戏HUD ─────────────────────────────────────────
  hud_wave:  '波次',
  hud_gold:  '金币',
  hud_nexus: '要塞核心',
  hud_deck:  '牌组',
  act_label: (n) => `第${n}幕`,

  // ── 波次按钮 ────────────────────────────────────────
  btn_start_wave:      '开始波次',
  btn_wave_in_progress:'波次进行中...',
  btn_start_wave_n:    (n) => `开始第${n}波`,

  // ── 商店 ─────────────────────────────────────────────
  shop_title:     '守护者商店',
  shop_subtitle:  '选择卡牌加入你的牌组。',
  shop_reroll:    '🎲 重随',
  first_run_label: '🔰 第一次游玩？',
  first_run_btn: '▶ 快速开始（推荐）',
  first_run_sub: '钢铁守护者 · 标准难度 · 新手最佳配置',
  deck_view_title: '当前牌组',
  summary_new_hint: '选择新守护者与难度',
  summary_retry_btn: '⚡ 快速重开',
  summary_retry_hint: '相同守护者与难度',
  summary_hints_title: (n) => `💡 第 ${n} 波攻略提示`,
  log_card_types_hint: '💡 召唤（放置塔）· 强化（升级塔）· 法术（立即生效）',
  shop_key_buy: '购买',
  shop_key_reroll: '重随',
  shop_key_leave: '离开',
  shop_add_card:  '🃏 卡牌 +1',
  shop_leave:     '离开商店 →',
  shop_rerolls_left: (n) => `剩余${n}次`,
  shop_no_rerolls:   '无法重随',
  shop_cant_afford:   (cost) => `✗ 需要${cost}金币`,
  shop_buy:           '✓ 购买',
  shop_after_wave:    (n) => `— 第${n}波后`,
  shop_sold:          '已售出',
  shop_not_enough_gold: '金币不足，无法重随。',
  shop_bought:        (name) => `购买：${name}（+1张入牌组）`,
  shop_rerolled:      (left) => `已重随商店。（剩余${left}次重随）`,

  // ── 节点选择 ────────────────────────────────────────
  node_title:     '选择你的路径',
  node_shop:      '🏪 商店',
  node_event:     '📜 事件',
  node_rest:      '🏕️ 休息地',
  node_shop_desc: '前往守护者商店。购买和重随卡牌。',
  node_event_desc:'遭遇随机事件。风险与机遇并存。',
  node_rest_desc: '在营地休息。从牌组中移除一张卡牌。',

  // ── 事件 ─────────────────────────────────────────────
  event_title:    '事件',
  event_choose:   '请慎重选择。',
  event_accept:   '✓ 接受',
  event_decline:  '✗ 拒绝',
  event_close:    '继续 →',

  // ── 休息 ─────────────────────────────────────────────
  rest_title:     '守护者休息地',
  rest_subtitle:  '从牌组中移除一张卡牌，优化你的策略。',
  rest_gold_bonus:'改为获得10金币',
  rest_close:     '继续 →',
  rest_removed:   (name) => `已从牌组移除${name}。`,
  rest_gold_taken:'改为获得10金币。',
  rest_deck_min:  '牌组卡牌数量过少，无法移除。',

  // ── 暂停 ─────────────────────────────────────────────
  pause_title:    '⚙️ 已暂停',
  btn_resume:     '▶ 继续',
  btn_how_pause:  '📖 游戏说明',
  pause_reduced_fx: '✨ 减少屏幕震动与闪烁',
  btn_quit_menu:          '✕ 退出至主菜单',
  input_method_notice:    '仅支持键盘和鼠标——不支持手柄',
  vol_label:              '🔊 音量',

  // ── 挑战 ─────────────────────────────────────────────
  challenge_section_title: '⚔️ 挑战（可选）',
  challenge_xp_bonus:      (n) => `经验+${n}%`,
  challenge_xp_none:       '无加成',
  challenge_cat_tower:     '🏰 防御塔限制',
  challenge_cat_card:      '🃏 卡牌限制',
  challenge_cat_economy:   '💰 经济限制',
  challenge_cat_run:       '⚔️ 运行条件',
  ch_cat_tower:            '🏰 防御塔限制',
  ch_cat_card:             '🃏 卡牌限制',
  ch_cat_economy:          '💰 经济限制',
  ch_cat_run:              '⚔️ 运行条件',

  ch_archer_only_name: '弓手要塞',
  ch_archer_only_desc: '只能召唤弓手类型防御塔。',
  ch_no_frost_name:    '烈焰誓约',
  ch_no_frost_desc:    '冰霜类防御塔（霜法师等）无法使用。',
  ch_no_aoe_name:      '单体攻击限定',
  ch_no_aoe_desc:      '范围攻击防御塔（炮塔、特斯拉线圈）无法使用。',
  ch_no_spells_name:   '沉默',
  ch_no_spells_desc:   '法术卡牌无法打出。',
  ch_no_augments_name: '赤手空拳',
  ch_no_augments_desc: '强化卡牌无法使用。',
  ch_common_only_name: '平民牌组',
  ch_common_only_desc: '只能购买普通品质卡牌。',
  ch_fixed_deck_name:  '一成不变',
  ch_fixed_deck_desc:  '无法从商店购买任何卡牌。',
  ch_poverty_name:     '贫困游戏局',
  ch_poverty_desc:     '初始金币10金币（低于正常数量）。',
  ch_no_reroll_name:   '别无二次机会',
  ch_no_reroll_desc:   '商店重随功能禁用。',
  ch_no_rest_name:     '无情行军',
  ch_no_rest_desc:     '无法使用休息地节点。',
  ch_perfect_nexus_name: '完美防守',
  ch_perfect_nexus_desc: '要塞核心任何一次受击即结束游戏局。',
  ch_auto_shop_name:   '命运之路',
  ch_auto_shop_desc:   '无节点选择——波次后始终进入商店。',
  ch_no_event_name:    '有序游戏局',
  ch_no_event_desc:    '无法选择事件节点。',

  challenge_tower_banned:  '挑战：该防御塔类型受限。',
  challenge_card_banned:   (type) => `挑战：${type}卡牌受限。`,
  challenge_no_reroll:     '重随已禁用（挑战）',
  challenge_no_buy:        '🚫 受限',
  challenge_node_banned:   '🚫 挑战限制',
  challenge_perfect_fail:  '💎 完美防守失败——要塞核心被击中！',

  // ── 游戏说明 ─────────────────────────────────────────
  howto_title:    '游戏说明',
  howto_close:    '明白了！',
  howto_1:        '<b>召唤卡牌</b> — 点击卡牌，再点击空格子放置防御塔。',
  howto_2:        '<b>强化卡牌</b> — 点击卡牌，再点击现有防御塔进行升级。',
  howto_3:        '<b>法术卡牌</b> — 点击卡牌立即激活。',
  howto_4:        '防御塔自动攻击敌人。别让它们到达出口！',
  howto_5:        '你有<b>要塞核心生命值</b>。全部耗尽则游戏局结束。',
  howto_6:        '⚡ <b>激怒</b> — 部分敌人（狂战士、虚空追猎者、巨像）在低血量时<b>速度大幅提升</b>。集火快速击杀！',
  howto_7:        '🛡️ <b>伤害减免</b> — 瘟疫携带者和幻影受到的伤害较低。需要多座防御塔协同，而非单点集中。',
  howto_8:        '🧊 <b>减速免疫</b> — 重甲步兵、攻城兽和石石像鬼<b>无法被减速</b>。专注输出原始伤害。',

  howto_shortcuts_title: '⌨️ 键盘快捷键',
  howto_shortcuts_body:  `
    <div class="shortcut-grid">
      <div class="sc-row"><kbd>Enter</kbd><span>新局（主菜单）</span></div>
      <div class="sc-row"><kbd>C</kbd><span>继续已保存的游戏局（主菜单）</span></div>
      <div class="sc-row"><kbd>Space</kbd><span>开始波次</span></div>
      <div class="sc-row"><kbd>1</kbd>–<kbd>5</kbd><span>选择/打出卡牌</span></div>
      <div class="sc-row"><kbd>F</kbd><span>取消选中卡牌</span></div>
      <div class="sc-row"><kbd>D</kbd><span>查看牌组（仅波次前）</span></div>
      <div class="sc-row"><kbd>Tab</kbd><span>切换2倍速（仅波次中）</span></div>
      <div class="sc-row"><kbd>Esc</kbd><span>暂停/关闭覆盖层</span></div>
      <div class="sc-row"><kbd>1</kbd>–<kbd>3</kbd><span>节点·商店·事件选择</span></div>
      <div class="sc-row"><kbd>R</kbd><span>重随商店/重试</span></div>
      <div class="sc-row"><kbd>L</kbd><span>离开商店</span></div>
      <div class="sc-row"><kbd>M</kbd><span>静音（暂停时）</span></div>
      <div class="sc-row"><kbd>Q</kbd><span>退出至主菜单（暂停时）</span></div>
    </div>`,

  // ── 游戏结束/胜利 ───────────────────────────────────
  gameover_title_win:  '🏆 胜利！',
  gameover_title_lose: '游戏局结束',
  gameover_win_msg:    (waves) => `你清除了${waves}波次。要塞核心屹立不倒！`,
  gameover_lose_msg:   (waves) => `你坚持到了第${waves}波，但要塞核心最终陷落。`,
  btn_play_again:      '再来一局',
  btn_main_menu:       '主菜单',

  // ── 游戏日志信息 ────────────────────────────────────
  log_run_start:    (warden) => `${warden} — 新的游戏局开始！`,
  log_wave_start:   (n, act)  => `第${n}波开始！（第${act}幕）`,
  log_wave_clear:   (n, gold) => `第${n}波清除！+${gold}金币`,
  log_boss_wave:    (name)    => `⚠️ 首领波次！${name}正在逼近！`,
  log_boss_weakness: (name, type) => `🔍 ${name}在本局中对${type}存在弱点！（+50%伤害）`,
  weakness_fire:      '🔥 火焰',
  weakness_frost:     '❄️ 冰霜',
  weakness_lightning: '⚡ 闪电',
  weakness_shadow:    '🌑 暗影',
  weakness_solar:     '☀️ 太阳',
  log_victory_streak_start: (n) => `✨ 首领已击杀！接下来${n}波次获得胜利加成。`,
  log_victory_streak:       (g, n) => n > 0 ? `✨ 胜利加成：+${g}金币（剩余${n}波${n > 1 ? '' : ''}）` : `✨ 胜利加成：+${g}金币`,
  log_nexus_hit:    (hp)      => `敌人到达要塞核心！（剩余${hp}点生命值）`,
  log_enemy_adapted: (name) => `⚠️ ${name}已适应——下一波速度提升10%！`,
  log_card_placed:  (name, c, r) => `已放置${name}至（${c},${r}）`,
  log_not_enough_gold: (need, have) => `金币不足！（需要${need}，拥有${have}）`,

  // ── 卡牌类型 ─────────────────────────────────────────
  card_type_summon:  '召唤',
  card_type_augment: '强化',
  card_type_spell:   '法术',
  card_type_curse:   '诅咒',
  card_surcharge:    '+1附加费',
  card_free:         '免费',

  // ── 诅咒卡牌 + 激怒警告 ──────────────────────────────
  log_curse_unplayable:   '诅咒卡牌无法打出。',
  log_curse_regret:       (name) => `悔恨将${name}弃置！`,
  log_cursed_bargain:     '💀 黑暗契约腐化了你的牌组……',
  log_cursed_wave_speed:  '⚠️ 诅咒波次：敌人移动速度提升35%！',
  log_cursed_wave_hand:   '⚠️ 诅咒波次：本波次手牌数量减少2张！',
  log_cursed_wave_revive: '⚠️ 诅咒波次：精英敌人将在30%生命值时复活！',
  log_enrage_imminent:    (name) => `⚠️ ${name}：即将激怒！`,

  // ── 节点选择（扩展） ────────────────────────────────
  node_after_wave:     (n) => `— 第${n}波后 —`,
  node_gold_display:   (g) => `💰 ${g}金币`,
  node_merchant:       '商人',
  node_unknown:        '未知',
  node_sanctuary:      '圣所',
  node_shop_desc2:     '浏览并购买牌组卡牌。最多重随两次。',
  node_event_desc2:    '随机遭遇，迫使你做出艰难选择。',
  node_rest_desc2:     '精简牌组或恢复资源。',

  // ── 休息（扩展） ────────────────────────────────────
  rest_site:           '休息地',
  rest_subtitle2:      '稍作休息，恢复状态或优化牌组。',
  rest_remove_card:    '移除卡牌',
  rest_remove_desc:    '永久从牌组移除一张卡牌（免费）。',
  rest_scavenge:       '搜寻',
  rest_scavenge_desc:  (g) => `搜索周边区域寻找补给。获得${g}金币。`,
  rest_choose_card:    '选择要移除的卡牌：',
  rest_cancel:         '取消',
  rest_leave:          '离开 →',
  rest_deck_empty:     '牌组为空！',
  rest_scavenged:      (g) => `搜索完毕。+${g}金币。`,
  rest_forge:          '锻造',
  rest_forge_desc:     '永久强化牌组中的一张卡牌（免费）。',
  rest_forge_choose:   '选择要锻造的卡牌：',
  rest_forge_empty:    '牌组中没有可锻造的卡牌。',
  rest_forge_cost:     '费用',
  rest_forge_btn:      '锻造',
  rest_forged:         (name) => `${name}锻造完成！`,
  card_btn_remove:     '移除',
  event_log:           (title, label) => `[${title}] ${label}`,

  // ── 游戏局总结 ──────────────────────────────────────
  summary_victory:        '胜利！',
  summary_defeat:         '要塞核心陷落',
  summary_victory_sub:    '守护者坚守住了！',
  summary_defeat_sub:     (n) => `在第${n}波失守`,
  stat_waves_cleared:     '已清除波次',
  stat_enemies_slain:     '击杀敌人数',
  stat_gold_earned:       '获得金币',
  stat_cards_played:      '打出卡牌',
  rank_label:             '守护者等级',
  xp_gained:              (n) => `+${n}经验`,
  rank_num:               (n) => `等级${n}`,
  max_rank:               '最高等级',
  lifetime_runs:          (n) => `总游戏局：${n}`,
  lifetime_wins:          (n) => `胜利：${n}`,
  lifetime_kills:         (n) => `总击杀：${n}`,
  unlock_label:           (title, rank) => `🔓 ${title}  等级${rank}`,

  // ── 图鉴 ─────────────────────────────────────────────
  codex_max_rank:         '已达最高等级',
  codex_xp_to:            (xp, rank) => `还需${xp}经验升至等级${rank}`,
  codex_stat_runs:        '游戏局',
  codex_stat_wins:        '胜利',
  codex_stat_slain:       '击杀敌人',
  codex_stat_winrate:     '胜率',
  codex_unlocked:         (rank) => `✓ 等级${rank}`,
  codex_locked:           (rank) => `需要等级${rank}`,

  // ── 游戏内日志（扩展） ──────────────────────────────
  log_tutorial_done:      '教程完成！你准备好了，守护者。',
  log_select_summon:      (name) => `已选择：${name}。点击地图上的空格子放置。`,
  log_select_augment:     (name) => `已选择：${name}。点击地图上的防御塔应用。`,
  log_cannot_place:       '无法在此放置。',
  log_tower_exists:       '此处已有防御塔。',
  log_no_tower:           '此处没有可强化的防御塔。',
  log_max_augments:       '防御塔已达到最大强化次数。',
  log_tower_sold:         (name, g) => `以${g}金币出售了${name}。`,
  tower_sell_value:       (g) => `出售获得${g}金币（50%）`,
  tower_sell_aug:         '个强化',
  tower_sell_btn:         '出售防御塔',
  tower_sell_cancel:      '取消',
  log_nexus_healed:       (hp) => `要塞核心生命值已恢复！（剩余${hp}点）`,
  log_nexus_full:         '要塞核心已满血。',
  log_no_targets:         '连锁闪电没有可攻击目标。',
  log_prepare_wave:       (n) => `准备好迎接第${n}波！`,
  log_shop_closed:        '商店已关闭。',
  log_run_begin:          '新的游戏局开始。抽取卡牌并放置防御塔！',
  log_surcharge:          (cost, extra) => extra > 1
    ? `+${extra}金币波次附加费（飞升III）。需要${cost}金币。`
    : `+1金币波次附加费。需要${cost}金币。`,
  log_nexus_cursed:       (hp) => `要塞核心受到伤害！剩余${hp}点生命值。`,
  log_cards_added:        (n, r) => `添加了${n}张${r}品质卡牌至牌组。`,
  log_wave_slow:          '下一波敌人将会减速。',
  log_extra_prep:         (s) => `下一波额外准备时间+${s}秒。`,
  log_card_removed_rand:  (name) => `从牌组移除了${name}。`,
  log_nothing:            '什么都没发生。有时谨慎便是智慧。',
  log_augmented:          (stat, mult) => `防御塔已强化：${stat} ×${mult}`,

  // ── 法术日志 ────────────────────────────────────────
  spell_gold:             (n) => `+${n}金币！`,
  spell_freeze:           '暴风雪！所有敌人已冰冻。',
  spell_damage_all:       (n) => `对所有敌人造成${n}点伤害！`,
  spell_slow_all:         (pct, s) => `地震！所有敌人减速${pct}%，持续${s}秒。`,
  spell_lightning:        (count, n) => `闪电击中${count}个随机敌人，各造成${n}点伤害！`,
  spell_chain_bolt_hit:   (d, c, cd) => `连锁闪电！${d} + ${cd}×${c}点连锁伤害。`,
  spell_chain_bolt_miss:  '连锁闪电没有目标。',
  spell_nexus_heal:       '大自然的慈悲！要塞核心生命值已恢复。',
  spell_draw:             (n) => `法力涌动！额外抽取${n}张卡牌。`,
  spell_speed_boost:      (mult, s) => `时间扭曲！所有防御塔攻击速度提升×${mult}，持续${s}秒！`,
  spell_dmg_boost:        (mult, s) => `力量涌现！所有防御塔伤害×${mult}，持续${s}秒！`,
  spell_nova:             (d, pct, s) => `奥术新星！对所有敌人造成${d}点伤害+减速${pct}%！`,
  spell_gold_draw:        (g, n) => `回收！+${g}金币并抽取${n}张卡牌。`,
  spell_tower_rally:      '防御塔集结！所有防御塔立即开火！',
  spell_soul_harvest:     (n) => `灵魂收割！从${n}个敌人处获得+${n}金币。`,
  spell_no_enemies:       '场上没有敌人。',
  spell_nature_cycle:     '大自然循环！手牌刷新——抽取5张新卡牌。',
  spell_rally_cry:        (pct, s) => `集结号令！所有防御塔伤害+${pct}%且攻速+60%，持续${s}秒！`,
  spell_ice_storm:        (d, pct, s) => `冰暴！对所有敌人造成${d}点伤害+减速${pct}%，持续${s}秒！`,
  spell_void_bolt:        (d) => `虚空箭！对最前方敌人造成${d}点伤害。`,
  spell_crimson_tide:     (d) => `血色浪潮！对所有敌人造成${d}点伤害！`,
  spell_arcane_storm:     (n, d) => `奥术风暴！对${n}个敌人各造成${d}点伤害！`,
  spell_mass_slow:        (pct, s) => `泥沼！所有敌人减速${pct}%，持续${s}秒。`,
  spell_overdrive:        (s) => `超载！所有防御塔攻击速度提升3倍，持续${s}秒！`,
  spell_needle:           (d) => `针刺！对最前方敌人造成${d}点伤害。`,
  spell_chain_storm:      (n, d) => `连锁风暴！对${n}个敌人各造成${d}点伤害！`,
  spell_warden_call:      (n) => `守护者召唤！抽取${n}张卡牌。`,
  spell_time_stop:        (s) => `时间停止！所有敌人冰冻${s}秒！`,
  spell_cryowave:         (d, s) => `冰波！造成${d}点伤害+所有敌人冰冻${s}秒！`,
  spell_void_rift:        '虚空裂隙！所有敌人被传送回出生点！',
  spell_ember_rain:       (d, pct, s) => `炎火之雨！对所有敌人造成${d}点伤害+减速${pct}%！`,
  spell_life_tap:         (g, n) => `生命汲取！+${g}金币并抽取${n}张卡牌。`,

  // ── v1.2 暗影守护者法术日志 ──────────────────────────
  spell_soul_drain:       (d, k) => k > 0 ? `灵魂汲取！造成${d}点伤害。${k}次击杀→+${k}金币！` : `灵魂汲取！对所有敌人造成${d}点伤害。`,
  spell_grave_call:       (n) => `墓地召唤！从弃牌堆回收了${n}张卡牌。`,
  spell_entropy:          (pct, total) => `熵变！造成当前生命值${pct}%的伤害——总计${total}点伤害！`,
  spell_dark_matter:      (d) => `暗物质！对最强敌人造成${d}点伤害！`,
  spell_void_echo:        (type) => `虚空回响！重复施放：${type}。`,
  spell_void_echo_empty:  '虚空回响：尚无可重复的法术。',
  spell_sacrifice:        (n, g) => n > 0 ? `黑暗献祭！弃置${n}张卡牌→+${g}金币。` : '黑暗献祭！手牌已空。',
  spell_no_discard:       '弃牌堆为空——没有可回收的卡牌。',
  spell_decay:            (pct, s) => `腐化！所有敌人减速${pct}%，持续${s}秒。`,

  // ── 手牌 ─────────────────────────────────────────────
  hand_label:             '手牌',
  hand_empty:             '手牌为空。',
  card_surcharge_label:   '+1附加费',

  // ── 横幅 ─────────────────────────────────────────────
  banner_boss_act:        (act) => `第${act}幕 — 首领波次`,
  banner_boss_ironclad:        '铁甲军团来袭！',
  banner_boss_titan:           '虚空泰坦苏醒！',
  banner_boss_dragon:          '深渊巨龙降临！',
  banner_boss_shadow_colossus: '暗影巨像降临！',
  banner_boss_solar_titan:     '太阳泰坦崛起！',
  banner_boss_sun_god:         '太阳神降临！',

  boss_hud_ironclad:        '铁甲',
  boss_hud_void_titan:      '虚空泰坦',
  boss_hud_abyssal_dragon:  '深渊巨龙',
  boss_hud_shadow_titan:    '暗影泰坦',
  boss_hud_shadow_colossus: '暗影巨像',
  boss_hud_solar_titan:     '太阳泰坦',
  boss_hud_sun_god:         '太阳神',
  boss_hud_phase2:          ' — 第二阶段',
  banner_act_clear:       (act) => `✨ 第${act}幕完成 ✨`,
  banner_act_next:        (act) => `准备迎接第${act}幕`,
  banner_victory:         '🏆 胜利！ 🏆',
  banner_all_clear:       '全幕完成',
  banner_wave_clear:      (n) => `第${n}波清除！`,
  banner_entering_shop:   '进入商店',
  banner_unlock:          '🔓',

  // ── 遗物系统 ─────────────────────────────────────────
  relic_pick_title:     '选择遗物',
  relic_pick_sub:       '所选遗物将在整个游戏局中持续生效。',
  rarity_common:        '普通',
  rarity_uncommon:      '罕见',
  rarity_rare:          '史诗',

  // 遗物名称与描述
  relic_whetstone:              '磨刀石',
  relic_whetstone_desc:         '弓手防御塔伤害+30%。',
  relic_blast_powder:           '爆破粉',
  relic_blast_powder_desc:      '炮塔溅射范围+40%。',
  relic_ember_core:             '余烬核心',
  relic_ember_core_desc:        '火焰巨龙灼烧（持续伤害）每秒伤害+4，持续时间延长0.8秒。',
  relic_static_coil:            '静电线圈',
  relic_static_coil_desc:       '特斯拉线圈额外连锁1个敌人。',
  relic_ancient_bark:           '古树树皮',
  relic_ancient_bark_desc:      '德鲁伊树林气场额外提供+10%伤害加成（总计+25%）。',
  relic_merchants_badge:        '商人徽章',
  relic_merchants_badge_desc:   '每次清除波次额外获得+3金币。',
  relic_gold_lens:              '金色透镜',
  relic_gold_lens_desc:         '所有商店卡牌费用减少1金币（最低1金币）。',
  relic_lucky_coin:             '幸运硬币',
  relic_lucky_coin_desc:        '拥有5金币以上即可获得利息（原为10金币以上）。',
  relic_war_chest:              '战争宝箱',
  relic_war_chest_desc:         '游戏局开始额外获得+10金币。',
  relic_bounty_mark:            '赏金标记',
  relic_bounty_mark_desc:       '每击杀一个敌人额外获得+1金币。',
  relic_aegis_fragment:         '神盾碎片',
  relic_aegis_fragment_desc:    '开局额外获得1点要塞核心生命值。',
  relic_soul_anchor:            '灵魂锚',
  relic_soul_anchor_desc:       '第一个到达要塞核心的敌人不造成伤害。（每局一次）',
  relic_frost_ward:             '冰霜守护',
  relic_frost_ward_desc:        '所有减速效果强度+25%。',
  relic_swift_quiver:           '疾速箭袋',
  relic_swift_quiver_desc:      '每波开始时额外抽取1张卡牌。',
  relic_arcane_focus:           '奥术专注',
  relic_arcane_focus_desc:      '特斯拉线圈攻击速度+25%。',

  // 遗物名称与描述（新增10个）
  relic_venom_fang:             '毒牙',
  relic_venom_fang_desc:        '击杀敌人时，对附近随机一个敌人造成15点毒素伤害。',
  relic_siege_engine:           '攻城武器',
  relic_siege_engine_desc:      '炮塔溅射半径+60%。',
  relic_merchants_ring:         '商人戒指',
  relic_merchants_ring_desc:    '每次商店访问的首次重随免费。',
  relic_savings_bond:           '储蓄债券',
  relic_savings_bond_desc:      '每次利息触发额外获得+2金币。',
  relic_iron_fortress:          '铁壁要塞',
  relic_iron_fortress_desc:     '每波次要塞核心最多只能被击中一次。',
  relic_thorn_wall:             '荆棘之墙',
  relic_thorn_wall_desc:        '要塞核心受击时，对最近的敌人造成25点伤害。',
  relic_fire_pact:              '烈焰契约',
  relic_fire_pact_desc:         '激活2座以上火焰巨龙时，它们的伤害+25%。',
  relic_storm_circuit:          '风暴电路',
  relic_storm_circuit_desc:     '施放任意法术后，所有特斯拉线圈立即开火。',
  relic_wardens_sigil:          '守护者印记',
  relic_wardens_sigil_desc:     '每波清除后，额外将2张卡牌抽入手牌。',
  relic_blood_price:            '血的代价',
  relic_blood_price_desc:       '牺牲1点要塞核心生命值，立即获得+20金币。',
  relic_keen_eye:               '锐利之眼',
  relic_keen_eye_desc:          '所有防御塔可探测并攻击隐形敌人。',

  // ── 协同效应名称/描述 ────────────────────────────────
  synergy_merchant_king:        '商人之王',
  synergy_merchant_king_desc:   '商人徽章+赏金标记：每3波获得+5金币。',
  synergy_inferno_pact:         '烈焰誓约',
  synergy_inferno_pact_desc:    '余烬核心+烈焰契约：灼烧（持续伤害）每秒伤害额外+4。',
  synergy_thunder_surge:        '雷霆涌现',
  synergy_thunder_surge_desc:   '静电线圈+风暴电路：特斯拉链接额外多连1个目标。',
  synergy_iron_citadel:         '铁甲城堡',
  synergy_iron_citadel_desc:    '神盾碎片+荆棘之墙：荆棘之墙伤害×1.5。',
  synergy_void_surge:           '虚空涌现',
  synergy_void_surge_desc:      '虚空核心+虚空回响：虚空回响冷却时间减半。',
  synergy_solar_ascendancy:     '太阳飞升',
  synergy_solar_ascendancy_desc:'太阳契约+致盲护符：减速效果强度+15%。',

  log_synergy_active:       (icon, name) => `✨ 协同效应激活：${icon} ${name}！`,
  log_synergy_wave_gold:    (icon, name, amt) => `${icon} ${name}：+${amt}金币`,

  // 遗物日志信息
  log_relic_picked:     (name) => `获得遗物：${name}`,
  log_soul_anchor:      '灵魂锚吸收了攻击！要塞核心得到保护。',
  log_interest:         (n) => `利息：+${n}金币。`,
  log_iron_fortress:    '铁壁要塞！要塞核心已被护盾保护——本波不再受击。',
  log_thorn_wall:       (dmg) => `荆棘之墙！向最近的敌人反弹${dmg}点伤害。`,
  log_venom_fang:       (dmg) => `毒牙！对附近敌人造成${dmg}点毒素伤害。`,
  log_wave_draw:        (n) => `守护者印记！额外抽取${n}张卡牌。`,
  log_storm_circuit:    (n) => `风暴电路！${n}座特斯拉线圈开火！`,
  log_blood_price:      (g) => `血的代价：牺牲1点要塞核心生命值，获得+${g}金币。`,
  log_savings_bond:     (n) => `储蓄债券：+${n}点额外利息金币。`,
  log_free_reroll:      '免费重随！（商人戒指）',
  log_camo_warn:        '👁️ 隐形敌人即将来袭！需要神射手或锐利之眼遗物才能探测。',

  // ── 难度 ──────────────────────────────────────────────
  difficulty_title:     '选择难度',
  difficulty_sub:       '选择本次游戏局的挑战程度。',
  diff_novice:          '新手',
  diff_standard:        '标准',
  diff_veteran:         '老兵',
  diff_novice_desc:     '5点要塞核心生命值 · 缓慢增长 · 初始+5金币 · 每波+1金币奖励',
  diff_standard_desc:   '3点要塞核心生命值 · 均衡挑战 · 默认设置',
  diff_veteran_desc:    '2点要塞核心生命值 · 快速增长 · 金币减少 · 精英敌人更强',
  diff_confirm:         '▶ 开始游戏局',
  diff_back:            '← 返回',
  log_difficulty:       (name) => `难度：${name}`,

  // ── 节点提示徽章 ────────────────────────────────────
  node_hint_economy:  '经济',
  node_hint_mystery:  '神秘',
  node_hint_rest:     '恢复',

  // ── 路径分支 ─────────────────────────────────────────
  path_fork_title:     (act) => `第${act}幕完成——选择你的路径`,
  path_fork_sub:       '此选择将影响接下来的走向。',
  path_safe:           '安全路径',
  path_safe_desc:      '从商店、事件或休息地中自由选择。标准推进，无负面效果。',
  path_safe_tag:       '🏰 稳健',
  path_gamble:         '赌注路径',
  path_gamble_desc:    '立即获得+15金币和1个随机遗物——但有50%几率将一张诅咒卡牌添加至牌组。',
  path_gamble_tag:     '🎲 高风险/高回报',
  log_gamble_gold:     '🎲 选择赌注路径：+15金币！',
  log_gamble_relic:    (name) => `🎲 命运眷顾勇者！获得遗物：${name}`,
  log_gamble_curse:    '💀 赌注索取了代价——一张诅咒卡牌已加入你的牌组。',
  log_gamble_no_curse: '✨ 幸运女神微笑——这次没有诅咒。',

  // ── 伏击 ─────────────────────────────────────────────
  banner_ambush:      '⚠️ 伏击！增援部队来袭！',
  log_ambush_warn:    (n) => `⚠️ 伏击！${n}个额外敌人将在5秒后到达！`,

  // ── 自动存档 ─────────────────────────────────────────
  btn_continue:       (wave, icon, map) => `↩ 继续 — ${icon} ${map}（第${wave}波）`,
  autosave_loaded:    (wave) => `从第${wave}波恢复游戏。祝你好运，守护者！`,

  // ── 守护者被动描述 ──────────────────────────────────
  passive_stalwart_desc:    '无特殊效果。完全受益于元进度加成。',
  passive_bloodlust_desc:   '每次击杀获得+1金币。（普通+1，精英+1，首领+5）',
  passive_arcane_flow_desc: '所有法术费用-1（最低0）。波次附加费也-1。',
  passive_grave_gold_desc:  '每波开始时，每张从手牌弃置的卡牌获得1金币。',
  passive_grave_gold_trigger: (n) => `墓地金币：从弃置卡牌获得+${n}金币。`,

  // ── 通用 ─────────────────────────────────────────────
  free:              '免费',
  gold_unit:         '金',
  loading:           '加载中...',
  version:           (v) => `v${v}`,

  // ── 飞升模式 ─────────────────────────────────────────
  asc_section_title:  '⚡ 飞升模式',
  asc_section_sub:    '已达到等级20。在难度基础上叠加额外挑战。',
  asc_off:            '关闭',
  asc_off_desc:       '标准规则。无额外惩罚。',
  asc_1_title:        '飞升 I',
  asc_1_desc:         '每次商店访问仅展示2张卡牌。',
  asc_2_title:        '飞升 II',
  asc_2_desc:         '无利息。金币必须花出才能增加。',
  asc_3_title:        '飞升 III',
  asc_3_desc:         '波次附加费增加至每张卡牌+2金币。',
  asc_locked:         (n) => `完成飞升${n - 1}以解锁`,
  asc_cleared:        (n) => `🏆 飞升${n}已完成！新等级已解锁。`,
  asc_new_record:     (n) => `🔓 飞升${n}已解锁！`,
  log_ascension:      (n) => `飞升${n}已激活——祝你好运，守护者。`,
  log_asc_cleared:    (n) => `飞升${n}完成！飞升${n + 1}现已解锁。`,
  log_asc_all_clear:  '所有飞升等级已征服！你是终极守护者。',

  // ── 教程 ─────────────────────────────────────────────
  tut_welcome_title: '欢迎，守护者！',
  tut_welcome_text:  '守护要塞核心，抵御波次敌人的侵袭。\n\n使用<b>卡牌</b>在<b>15波次</b>（3幕）中召唤并强化防御塔。\n\n击杀敌人获得<b>经验值</b>——升级解锁更稀有的卡牌和更强力的防御塔升级。',
  tut_welcome_btn:   '出发！',
  tut_path_title:    '敌人路径',
  tut_path_text:     '敌人沿<b style="color:#ff8888">红色高亮路径</b>从出生点行进至出口。\n\n你的要塞核心有♥♥♥。若3个敌人到达出口——游戏结束。',
  tut_path_btn:      '明白了',
  tut_green_title:   '最佳防御塔位置',
  tut_green_text:    '看到<b style="color:#4caf50">绿色格子</b>了吗？它们与路径相邻。\n\n<b>在那里放置防御塔</b>以获得最大覆盖范围！',
  tut_green_btn:     '明白了',
  tut_select_title:  '选择卡牌',
  tut_select_text:   '点击<b>🏹 弓手防御塔</b>卡牌选中它。\n\n选中时卡牌会发出金色光芒。',
  tut_place_title:   '放置防御塔',
  tut_place_text:    '现在点击地图上的<b style="color:#4caf50">绿色格子</b>放置你的弓手防御塔。',
  tut_wave_title:    '开始波次！',
  tut_wave_text:     '太棒了！如果有金币可以继续放置防御塔，然后点击<b>开始波次</b>。',
  tut_combat_title:  '防御塔进攻！',
  tut_combat_text:   '你的防御塔会<b>自动</b>攻击敌人。\n\n观察战斗——敌人有血条，死亡时有粒子特效！',
  tut_combat_btn:    '酷！',
  tut_hud_title:     '追踪你的状态',
  tut_hud_text:      '<b>波次</b> — 幕/波次编号\n<b>金币</b> — 用于购买卡牌和升级\n<b>要塞核心 ♥</b> — 生命值耗尽则游戏局结束\n<b>LV/经验</b> — 击杀敌人获得经验→升级→出现更稀有的卡牌\n\n<b>Tab</b>切换2倍速（切换后持续）',
  tut_hud_btn:       '明白了',
  tut_done_title:    '🏆 你准备好了，守护者！',
  tut_done_text:     '清除波次后，选择你的路径：\n• <b>🏪 商店</b> — 购买卡牌、投资经验、添加卡位（8金币）\n• <b>⚡ 事件</b> — 风险/回报随机遭遇\n• <b>🛌 休息</b> — 移除或锻造卡牌\n\n<b>★ 防御塔升级</b>：★2需要玩家3级，★3需要6级！\n\n祝你好运。要塞核心需要你。',
  tut_done_btn:      '开始！',
  tut_waiting:        '等待你的操作……',
  tut_manual_advance: '手动继续',
  tut_skip:           '跳过教程',
  tut_hint_select:   '教程：从手牌中选择一张弓手防御塔卡牌。',
  tut_hint_place:    '教程：点击路径附近的绿色格子。',
  tut_hint_wave:     '教程：准备好后点击开始波次！',

  // ── DLC 介绍 ─────────────────────────────────────────
  dlc_shadow_intro_title: '🌑 暗影领域 — 第4幕开始',
  dlc_shadow_intro_text:  '欢迎来到虚空！\n\n<b>关键变化：</b>\n• <b>隐形</b>敌人增多——需要神射手防御塔或锐利之眼遗物\n• <b>暗影持续伤害</b>——新敌人会造成持续毒素伤害\n• <b>生命恢复</b>精英——使用持续伤害/持续效果\n• <b>幻影巨人</b>——减速免疫+伤害减免坦克\n\n最终首领：暗影巨像（第23波）',
  dlc_shadow_intro_btn:   '我已准备好！',

  dlc_solar_intro_title:  '☀️ 太阳主宰 — 第5幕开始',
  dlc_solar_intro_text:   '太阳焚烧一切！\n\n<b>关键变化：</b>\n• <b>太阳灼烧（持续伤害）</b>——辉耀灼烧（对太阳免疫者无效）\n• <b>眩晕</b>——圣战士防御塔击中每个敌人时眩晕400毫秒\n• <b>分裂敌人</b>——部分敌人死亡后会生成小型单位\n• <b>三阶段首领</b>——太阳神在每个生命值阈值变换形态\n\n☀️ 太阳守护者：8次2+费用法术→自动施放太阳射线',
  dlc_solar_intro_btn:    '直面太阳！',

  dlc_intro_close:        '关闭',

  hint_sell_title:   '🔨 防御塔拆除与升级',
  hint_sell_text:    '点击已放置的防御塔打开操作面板。\n\n• <b>出售防御塔</b> — 回收50%已投入的金币。重新部署不在状态的防御塔。\n• <b>★ 升级</b> — ★2需要玩家3级，★3需要6级。费用：5金币（★2）/ 12金币（★3）。',

  hint_shop_title:   '🏪 商店指南',
  hint_shop_text:    '花费金币将卡牌添加到牌组。\n[普]普通 · [罕]罕见 · [史]史诗——品质越高越强力。\n重随（R键或🎲）查看新卡牌（每次2金币）。',
  hint_augment_title:'⬆️ 强化卡牌',
  hint_augment_text: '强化卡牌可以提升现有防御塔的能力！\n选择强化卡牌，然后点击已放置的防御塔应用。\n每座防御塔可接受多次强化。',
  hint_camo_title:   '⚠️ 隐形敌人来袭！',
  hint_camo_text:    '幻影是隐形的——普通防御塔无法探测到它们！\n• 放置神射手防御塔来揭露隐形敌人\n• 锐利之眼遗物赋予所有防御塔隐形探测能力\n• 火球等范围法术无论如何都可以命中隐形敌人',
  hint_close:        '明白了',

  // ── 游戏局总结（地图/难度显示） ───────────────────────
  summary_map:       '地图',
  summary_difficulty:'难度',

  // ── 事件数据（已翻译） ───────────────────────────────
  events: [
    {
      id: 'merchants_gift', title: '商人的馈赠', icon: '🎁',
      flavor: '一位巡游商人提供了他多余的货物。',
      choices: [
        { label: '获取金币',  desc: '+10金币',                        effect: { type: 'gold', amount: 10 } },
        { label: '获取卡牌', desc: '将2张随机普通卡牌加入牌组', effect: { type: 'add_cards', count: 2, rarity: 'common' } },
      ],
    },
    {
      id: 'ancient_tome', title: '古籍', icon: '📖',
      flavor: '满载遗忘法术的书页散发着微弱光芒。',
      choices: [
        { label: '研读', desc: '将1张随机史诗卡牌加入牌组', effect: { type: 'add_cards', count: 1, rarity: 'rare' } },
        { label: '出售', desc: '+12金币',                           effect: { type: 'gold', amount: 12 } },
      ],
    },
    {
      id: 'cursed_relic', title: '诅咒遗物', icon: '💀',
      flavor: '力量总是有代价的。永远如此。',
      choices: [
        { label: '接受诅咒', desc: '+18金币，损失1点要塞核心生命值', effect: { type: 'cursed_gold', amount: 18, nexusDmg: 1 } },
        { label: '放弃',         desc: '什么都没发生',           effect: { type: 'nothing' } },
      ],
    },
    {
      id: 'mysterious_fog', title: '神秘迷雾', icon: '🌫️',
      flavor: '空气变得浓重。敌人在迷雾中踉跄前行。',
      choices: [
        { label: '拥抱迷雾', desc: '下一波敌人速度-25%', effect: { type: 'slow_next_wave', amount: 0.25 } },
        { label: '烧散迷雾',    desc: '+6金币',                      effect: { type: 'gold', amount: 6 } },
      ],
    },
    {
      id: 'fallen_knight', title: '陨落骑士', icon: '⚔️',
      flavor: '战场上躺着一位战士最后的馈赠。',
      choices: [
        { label: '取走宝剑',  desc: '添加1张随机罕见卡牌', effect: { type: 'add_cards', count: 1, rarity: 'uncommon' } },
        { label: '取走盾牌', desc: '+8金币',                    effect: { type: 'gold', amount: 8 } },
      ],
    },
    {
      id: 'war_cache', title: '战争宝藏', icon: '📦',
      flavor: '一个自上次围攻以来从未被触碰的地下宝箱。',
      choices: [
        { label: '取走金币',     desc: '+15金币',                  effect: { type: 'gold', amount: 15 } },
        { label: '取走补给', desc: '添加3张随机普通卡牌', effect: { type: 'add_cards', count: 3, rarity: 'common' } },
      ],
    },
    {
      id: 'warden_blessing', title: '守护者的祝福', icon: '✨',
      flavor: '历代守护者的灵魂守望着你。',
      choices: [
        { label: '祝福牌组',   desc: '添加1张随机罕见卡牌', effect: { type: 'add_cards', count: 1, rarity: 'uncommon' } },
        { label: '祝福金库', desc: '+10金币',                   effect: { type: 'gold', amount: 10 } },
      ],
    },
    {
      id: 'ravens_secret', title: '渡鸦的秘密', icon: '🪶',
      flavor: '渡鸦低语着关于你敌人的情报。',
      choices: [
        { label: '仔细聆听', desc: '下一波额外+5秒准备时间', effect: { type: 'extra_prep', seconds: 5 } },
        { label: '无视它',      desc: '+4金币',                    effect: { type: 'gold', amount: 4 } },
      ],
    },
    {
      id: 'storm_of_blades', title: '刀刃风暴', icon: '🌀',
      flavor: '一团魔法武器旋涡就悬浮在附近。',
      choices: [
        { label: '抓住刀刃',   desc: '添加1张随机史诗卡牌', effect: { type: 'add_cards', count: 1, rarity: 'rare' } },
        { label: '拆卖零件', desc: '+14金币',               effect: { type: 'gold', amount: 14 } },
      ],
    },
    {
      id: 'dark_bargain', title: '黑暗交易', icon: '🕯️',
      flavor: '一个阴暗的身影提出了一笔交易。值得冒险吗？',
      choices: [
        { label: '谈判', desc: '移除1张随机卡牌→+20金币', effect: { type: 'remove_random_add_gold', amount: 20 } },
        { label: '拒绝', desc: '+5金币',                         effect: { type: 'gold', amount: 5 } },
      ],
    },
    {
      id: 'wandering_healer', title: '游方治疗师', icon: '💉',
      flavor: '一名战地医师正在救治伤员，包括要塞核心。',
      choices: [
        { label: '治疗要塞核心', desc: '恢复1点要塞核心生命值',   effect: { type: 'heal_nexus', amount: 1 } },
        { label: '取走补给',  desc: '+8金币',               effect: { type: 'gold', amount: 8 } },
      ],
    },
    {
      id: 'lost_armory', title: '迷失军械库', icon: '⚔️',
      flavor: '一场激战后遗留的无名士兵武器。',
      choices: [
        { label: '武装自己',   desc: '添加2张随机罕见卡牌', effect: { type: 'add_cards', count: 2, rarity: 'uncommon' } },
        { label: '出售金属', desc: '+15金币',                    effect: { type: 'gold', amount: 15 } },
      ],
    },
    {
      id: 'arcane_surge', title: '奥术涌现', icon: '✨',
      flavor: '狂野魔法在空气中嘶嘶作响，扭曲命运。',
      choices: [
        { label: '驾驭它', desc: '将1张随机史诗卡牌加入牌组', effect: { type: 'add_cards', count: 1, rarity: 'rare' } },
        { label: '抵抗它',  desc: '+10金币',                            effect: { type: 'gold', amount: 10 } },
      ],
    },
    {
      id: 'spectral_cache', title: '幽灵宝库', icon: '👻',
      flavor: '一个幽灵般的金库实体化了。其内容物闪烁消逝。',
      choices: [
        { label: '掠夺它',  desc: '移除1张随机卡牌→+25金币', effect: { type: 'remove_random_add_gold', amount: 25 } },
        { label: '放弃它',    desc: '+10金币',                        effect: { type: 'gold', amount: 10 } },
      ],
    },
    {
      id: 'sentinel_rest', title: '哨兵的喘息', icon: '🏕️',
      flavor: '进攻的短暂间隙。好好利用它。',
      choices: [
        { label: '强化防御', desc: '下一波额外+8秒准备时间', effect: { type: 'extra_prep', seconds: 8 } },
        { label: '休息',    desc: '+7金币',                          effect: { type: 'gold', amount: 7 } },
      ],
    },
    {
      id: 'warden_memory', title: '守护者的记忆', icon: '🪬',
      flavor: '训练深处的古老技巧浮现于脑海。',
      choices: [
        { label: '召唤力量',   desc: '添加1张史诗卡牌',         effect: { type: 'add_cards', count: 1, rarity: 'rare' } },
        { label: '召唤战术', desc: '添加2张罕见卡牌',    effect: { type: 'add_cards', count: 2, rarity: 'uncommon' } },
      ],
    },
    {
      id: 'void_shard', title: '虚空碎片', icon: '🔮',
      flavor: '一块虚空碎片，跳动着黑暗的力量。',
      choices: [
        { label: '吸收它',  desc: '+18金币，损失1点要塞核心生命值', effect: { type: 'cursed_gold', amount: 18, nexusDmg: 1 } },
        { label: '丢弃它', desc: '下一波敌人速度-20%', effect: { type: 'slow_next_wave', amount: 0.20 } },
      ],
    },
    {
      id: 'supply_drop', title: '补给空投', icon: '📦',
      flavor: '盟军从后方派来了增援补给。',
      choices: [
        { label: '取走金币',     desc: '+18金币',               effect: { type: 'gold', amount: 18 } },
        { label: '取走卡牌',    desc: '添加3张随机普通卡牌', effect: { type: 'add_cards', count: 3, rarity: 'common' } },
      ],
    },
    {
      id: 'ember_relic', title: '余烬遗物', icon: '🔥',
      flavor: '触感温热，散发着古老战斗祝福的光芒。',
      choices: [
        { label: '使用它', desc: '添加2张随机罕见卡牌', effect: { type: 'add_cards', count: 2, rarity: 'uncommon' } },
        { label: '出售它',  desc: '+16金币',                   effect: { type: 'gold', amount: 16 } },
      ],
    },
    {
      id: 'frozen_vault', title: '冰封宝库', icon: '❄️',
      flavor: '被冰封了数百年。其中的宝藏完好无损。',
      choices: [
        { label: '解冻它',      desc: '将1张史诗卡牌加入牌组', effect: { type: 'add_cards', count: 1, rarity: 'rare' } },
        { label: '出售冰块', desc: '+12金币',                     effect: { type: 'gold', amount: 12 } },
      ],
    },
    {
      id: 'elite_ambush', title: '精英伏击', icon: '🗡️',
      flavor: '侦察兵报告精英先锋部队提前行动。',
      choices: [
        { label: '设置陷阱',      desc: '下一波敌人速度-30%',  effect: { type: 'slow_next_wave', amount: 0.30 } },
        { label: '声索战利品',  desc: '将1张史诗卡牌加入牌组',  effect: { type: 'add_cards', count: 1, rarity: 'rare' } },
      ],
    },
    {
      id: 'tower_blessing', title: '防御塔祝福', icon: '🌟',
      flavor: '奥术能量涌入你的防御工事。',
      choices: [
        { label: '注魔防御塔', desc: '将2张罕见卡牌加入牌组', effect: { type: 'add_cards', count: 2, rarity: 'uncommon' } },
        { label: '吸收力量',  desc: '+14金币',                          effect: { type: 'gold', amount: 14 } },
      ],
    },
    {
      id: 'gold_fever', title: '淘金热', icon: '💸',
      flavor: '财富深埋于战场的土壤之下。',
      choices: [
        { label: '深挖',  desc: '+22金币',                          effect: { type: 'gold', amount: 22 } },
        { label: '快挖',  desc: '将2张普通卡牌加入牌组',   effect: { type: 'add_cards', count: 2, rarity: 'common' } },
      ],
    },
    {
      id: 'debt_collector', title: '债务催收人', icon: '💼',
      flavor: '一名走投无路的商人恳求短期借款——附带利息。',
      choices: [
        { label: '借出金币',   desc: '花费10金币→获得26金币（净+16金币）', effect: { type: 'spend_for_gold', spend: 10, gain: 26 } },
        { label: '拒绝他',  desc: '+4金币（介绍费）',          effect: { type: 'gold', amount: 4 } },
      ],
    },
    {
      id: 'relic_merchant', title: '遗物商人', icon: '🧿',
      flavor: '一个兜帽人物交易遗忘文物和禁忌力量。',
      choices: [
        { label: '购买稀有知识', desc: '将1张史诗卡牌加入牌组',        effect: { type: 'add_cards', count: 1, rarity: 'rare' } },
        { label: '购买普通货物',   desc: '将3张普通卡牌加入牌组',     effect: { type: 'add_cards', count: 3, rarity: 'common' } },
      ],
    },
    {
      id: 'wardens_duel', title: '守护者决斗', icon: '🏆',
      flavor: '一位对手守护者在战场上挑战你的声望。',
      choices: [
        { label: '接受挑战', desc: '将1张史诗卡牌加入牌组',     effect: { type: 'add_cards', count: 1, rarity: 'rare' } },
        { label: '协商条约',   desc: '将2张罕见卡牌加入牌组', effect: { type: 'add_cards', count: 2, rarity: 'uncommon' } },
      ],
    },
    {
      id: 'haunted_ground', title: '鬼魂之地', icon: '🪦',
      flavor: '阵亡者的灵魂徘徊不去，低语着警告。',
      choices: [
        { label: '与灵魂沟通', desc: '下一波额外+10秒准备时间', effect: { type: 'extra_prep', seconds: 10 } },
        { label: '驱散灵魂',   desc: '将1张史诗卡牌加入牌组',       effect: { type: 'add_cards', count: 1, rarity: 'rare' } },
      ],
    },
    {
      id: 'ancient_shrine', title: '古代神龛', icon: '⛩️',
      flavor: '一座供奉遗忘战神的神龛矗立在路旁，未受触碰。',
      choices: [
        { label: '祈求指引', desc: '将2张罕见卡牌加入牌组', effect: { type: 'add_cards', count: 2, rarity: 'uncommon' } },
        { label: '亵渎神龛',      desc: '+15金币',                          effect: { type: 'gold', amount: 15 } },
      ],
    },
    {
      id: 'war_horn', title: '战争号角', icon: '📯',
      flavor: '远处响起号角——增援部队正在行军。',
      choices: [
        { label: '集结部队', desc: '下一波额外+8秒准备时间', effect: { type: 'extra_prep', seconds: 8 } },
        { label: '出售号角',    desc: '+10金币',                          effect: { type: 'gold', amount: 10 } },
      ],
    },
    {
      id: 'plague_doctor', title: '瘟疫医生', icon: '🧪',
      flavor: '一位戴面具的医生提供实验性的要塞核心治疗。',
      choices: [
        { label: '接受治疗', desc: '花费8金币→恢复1点要塞核心生命值', effect: { type: 'heal_nexus_cost', amount: 1, cost: 8 } },
        { label: '拒绝',          desc: '+5金币',                        effect: { type: 'gold', amount: 5 } },
      ],
    },
  ],

  shop_rerolled_cost:     (cost) => `花费${cost}金币重随`,
  shop_upgrade_tower:     '升级防御塔',
  shop_tower_upgrade_btn: (cost) => `↑ ${cost}金币（伤害+50%）`,
  shop_tower_max_star:    '最高★★★',
  tower_star_upgraded:    (name, lv) => `${name}已升级至${lv}★！`,
  shop_next_reroll_cost:  (cost) => `下次重随：${cost}金币`,

  // ── 玩家等级系统 ─────────────────────────────────────
  hud_level:          '等级',
  hud_xp:             '经验',
  log_level_up:       (lv) => `升级！玩家${lv}级`,
  log_xp_purchased:   (amt, total) => `购买了+${amt}经验。（总计：${total}）`,
  shop_buy_xp:        (amt, cost) => `+${amt}经验（${cost}金币）`,
  shop_xp_max:        '经验已满',

  // ── 图鉴——敌人标签 ────────────────────────────────
  codex_tab_unlocks:  '解锁',
  codex_tab_stats:    '统计',
  codex_tab_enemies:  '敌人',
  codex_enemy_first_wave: (n) => `首次出现：第${n}波`,
  codex_enemy_hp:     '生命值',
  codex_enemy_spd:    '速度',
  codex_enemy_reward: '金币',
  codex_enemy_trait_camo:        '👁 隐形',
  codex_enemy_trait_slow_immune: '🧊 减速免疫',
  codex_enemy_trait_enrage:      '⚡ 激怒',
  codex_enemy_trait_regen:       '💉 生命恢复',
  codex_enemy_trait_dmg_red:     '🛡 伤害减免',
  codex_enemy_trait_boss:        '💀 首领',
  codex_enemy_trait_elite:       '⚜ 精英',
  codex_enemy_trait_shield:      '🔵 护盾',
  codex_enemy_trait_split:       '🔀 分裂',
  codex_enemy_trait_solar_immune:'☀ 太阳免疫',

  codex_enemy_grunt:           '步兵',
  codex_enemy_fast:            '跑者',
  codex_enemy_goblin:          '哥布林',
  codex_enemy_tank:            '重甲兵',
  codex_enemy_elite:           '精英',
  codex_enemy_shielded:        '盾甲兵',
  codex_enemy_berserker:       '狂战士',
  codex_enemy_boss:            '铁甲',
  codex_enemy_void_titan:      '虚空泰坦',
  codex_enemy_stone_golem:     '石石像鬼',
  codex_enemy_necromancer:     '死灵法师',
  codex_enemy_plague_carrier:  '瘟疫携带者',
  codex_enemy_void_wraith:     '虚空幽灵',
  codex_enemy_void_stalker:    '虚空追猎者',
  codex_enemy_juggernaut:      '重甲步兵',
  codex_enemy_siege_beast:     '攻城兽',
  codex_enemy_phantom:         '幻影',
  codex_enemy_colossus:        '巨像',
  codex_enemy_shadow_elite:    '暗影精英',
  codex_enemy_abyssal_dragon:  '深渊巨龙',

  // ── 每日挑战 ─────────────────────────────────────────
  daily_challenge:     '🎯 每日挑战',
  daily_done:          '✅ 今日已完成！',
  daily_modifiers:     (warden, diff, map) => `${warden} · ${diff} · ${map}`,
  daily_label:         (date) => `每日 — ${date}`,
};

// DLC翻译合并
export default { ..._BASE_ZH, ...dlcShadowZh, ...dlcSolarZh };
