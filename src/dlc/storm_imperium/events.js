/**
 * Storm Imperium DLC — 이벤트 데이터 (10종)
 * Storm / Wind / Flying 테마. EN/KO 통합.
 */

export const STORM_EVENTS = {
  en: [
    {
      id: 'storm_seer', title: 'Storm Seer', icon: '🔮',
      flavor: 'A weathered prophet emerges from the clouds, offering glimpses of the coming tempest.',
      choices: [
        { label: 'Heed the Vision', desc: 'Add 1 Rare Storm card to your deck', effect: { type: 'add_cards', count: 1, rarity: 'rare' } },
        { label: 'Ignore It',       desc: '+14 gold',                            effect: { type: 'gold', amount: 14 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'falling_drake', title: 'Falling Drake', icon: '🦅',
      flavor: 'A wounded storm drake crashes nearby, scattering its escort.',
      choices: [
        { label: 'Exploit the Gap', desc: 'Next wave has 2 fewer flying enemies, +10 gold', effect: { type: 'reduce_flying_wave', amount: 2, gold: 10 } },
        { label: 'Aid the Injured', desc: 'Restore 1 Nexus HP',                              effect: { type: 'heal_nexus', amount: 1 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'storm_cache', title: 'Storm Cache', icon: '💰',
      flavor: 'A storm-battered treasury lies open, its riches exposed to the wind.',
      choices: [
        { label: 'Claim Riches', desc: '+28 gold, lose 1 Nexus HP', effect: { type: 'cursed_gold', amount: 28, nexusDmg: 1 } },
        { label: 'Safe Haul',    desc: '+14 gold',                  effect: { type: 'gold', amount: 14 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'sky_oracle', title: 'Sky Oracle', icon: '☁️',
      flavor: 'An ancient oracle drifts on storm winds, dispensing forgotten storm knowledge.',
      choices: [
        { label: 'Learn Storm Arts', desc: 'Add 2 Uncommon cards to your deck', effect: { type: 'add_cards', count: 2, rarity: 'uncommon' } },
        { label: 'Trade for Gold',   desc: '+20 gold',                          effect: { type: 'gold', amount: 20 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'lightning_baptism', title: 'Lightning Baptism', icon: '⚡',
      flavor: 'Lightning strikes your towers, charging them with raw storm energy.',
      choices: [
        { label: 'Channel the Power', desc: 'All towers +25% damage next wave', effect: { type: 'temp_dmg_bonus', mult: 1.25 } },
        { label: 'Ground the Charge', desc: 'Restore 1 Nexus HP',              effect: { type: 'heal_nexus', amount: 1 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'storm_merchant', title: 'Storm Merchant', icon: '🏪',
      flavor: 'A traveling merchant shelters from the gale, eager to trade storm relics.',
      choices: [
        { label: 'Browse Wares', desc: 'Add 2 Uncommon cards to your deck', effect: { type: 'add_cards', count: 2, rarity: 'uncommon' } },
        { label: 'Buy Supplies', desc: '+20 gold',                          effect: { type: 'gold', amount: 20 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'sky_tribute', title: 'Sky Tribute', icon: '🌩️',
      flavor: 'The storm demands tribute. Pay the toll or lose passage.',
      choices: [
        { label: 'Pay the Toll',  desc: '+30 gold, lose 1 Nexus HP',         effect: { type: 'cursed_gold', amount: 30, nexusDmg: 1 } },
        { label: 'Remove a Card', desc: 'Remove 1 card from deck, +22 gold', effect: { type: 'remove_card_gold', amount: 22 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'dawn_bolt', title: 'Dawn Bolt', icon: '🌅',
      flavor: 'The first bolt of dawn strikes, energizing your forces.',
      choices: [
        { label: 'Harness Energy', desc: 'Add 2 Common cards to your deck', effect: { type: 'add_cards', count: 2, rarity: 'common' } },
        { label: 'Focus the Bolt', desc: 'Add 1 Rare card to your deck',    effect: { type: 'add_cards', count: 1, rarity: 'rare' } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'storm_invest', title: 'Storm Investment', icon: '📈',
      flavor: 'A storm banker offers a risky but potentially profitable deal.',
      choices: [
        { label: 'Invest',        desc: 'Pay 10g now → earn 18g after next wave clear', effect: { type: 'invest_gold', cost: 10, reward: 18 } },
        { label: 'Take Safe Pay', desc: '+8 gold immediately',                          effect: { type: 'gold', amount: 8 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'storm_resonance', title: 'Storm Resonance', icon: '🌀',
      flavor: 'Storm energy resonates through your defenses, amplifying their power.',
      choices: [
        { label: 'Amplify Towers', desc: 'All towers +20% damage next wave', effect: { type: 'temp_dmg_bonus', mult: 1.20 } },
        { label: 'Collect Shards', desc: 'Add 2 Common cards to your deck',  effect: { type: 'add_cards', count: 2, rarity: 'common' } },
      ],
      dlc: 'storm_imperium',
    },
  ],
  ko: [
    {
      id: 'storm_seer', title: '폭풍 예언자', icon: '🔮',
      flavor: '구름 속에서 나타난 예언자가 다가오는 폭풍의 환영을 제공합니다.',
      choices: [
        { label: '환영 받아들이기', desc: '희귀 Storm 카드 1장을 덱에 추가', effect: { type: 'add_cards', count: 1, rarity: 'rare' } },
        { label: '무시하기',       desc: '+14 골드',                          effect: { type: 'gold', amount: 14 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'falling_drake', title: '추락하는 드레이크', icon: '🦅',
      flavor: '부상당한 폭풍 드레이크가 근처에 추락해 호위대를 흩어놓습니다.',
      choices: [
        { label: '허점 활용', desc: '다음 웨이브 비행 적 -2, +10 골드', effect: { type: 'reduce_flying_wave', amount: 2, gold: 10 } },
        { label: '부상 치료', desc: '넥서스 HP +1 회복',                 effect: { type: 'heal_nexus', amount: 1 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'storm_cache', title: '폭풍 금고', icon: '💰',
      flavor: '폭풍으로 망가진 금고가 열려 있어 황금이 바람에 노출되어 있습니다.',
      choices: [
        { label: '황금 획득', desc: '+28 골드, 넥서스 HP -1', effect: { type: 'cursed_gold', amount: 28, nexusDmg: 1 } },
        { label: '안전 획득', desc: '+14 골드',               effect: { type: 'gold', amount: 14 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'sky_oracle', title: '하늘 신탁', icon: '☁️',
      flavor: '고대 신탁이 폭풍 바람을 타고 떠돌며 잊혀진 폭풍 지식을 나눠줍니다.',
      choices: [
        { label: '폭풍 기술 습득', desc: '언커먼 카드 2장을 덱에 추가', effect: { type: 'add_cards', count: 2, rarity: 'uncommon' } },
        { label: '황금과 교환',   desc: '+20 골드',                     effect: { type: 'gold', amount: 20 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'lightning_baptism', title: '번개 세례', icon: '⚡',
      flavor: '번개가 타워에 내리치며 원초적인 폭풍 에너지를 충전합니다.',
      choices: [
        { label: '에너지 결집', desc: '다음 웨이브 모든 타워 +25% 피해', effect: { type: 'temp_dmg_bonus', mult: 1.25 } },
        { label: '방어 강화',   desc: '넥서스 HP +1 회복',              effect: { type: 'heal_nexus', amount: 1 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'storm_merchant', title: '폭풍 상인', icon: '🏪',
      flavor: '여행 상인이 강풍을 피해 대피하며 폭풍 유물을 거래하려 합니다.',
      choices: [
        { label: '상품 탐색', desc: '언커먼 카드 2장을 덱에 추가', effect: { type: 'add_cards', count: 2, rarity: 'uncommon' } },
        { label: '보급 구매', desc: '+20 골드',                     effect: { type: 'gold', amount: 20 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'sky_tribute', title: '하늘 공물', icon: '🌩️',
      flavor: '폭풍이 공물을 요구합니다. 통행료를 내거나 통로를 잃으십시오.',
      choices: [
        { label: '통행료 지불', desc: '+30 골드, 넥서스 HP -1',     effect: { type: 'cursed_gold', amount: 30, nexusDmg: 1 } },
        { label: '카드 제거',   desc: '덱에서 카드 1장 제거, +22 골드', effect: { type: 'remove_card_gold', amount: 22 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'dawn_bolt', title: '새벽 볼트', icon: '🌅',
      flavor: '새벽의 첫 번개가 내리쳐 군대에 활력을 불어넣습니다.',
      choices: [
        { label: '에너지 결집', desc: '커먼 카드 2장을 덱에 추가', effect: { type: 'add_cards', count: 2, rarity: 'common' } },
        { label: '볼트 집중',   desc: '희귀 카드 1장을 덱에 추가', effect: { type: 'add_cards', count: 1, rarity: 'rare' } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'storm_invest', title: '폭풍 투자', icon: '📈',
      flavor: '폭풍 은행가가 위험하지만 잠재적으로 수익성 있는 거래를 제안합니다.',
      choices: [
        { label: '투자',    desc: '10골드 지불 → 다음 웨이브 클리어 시 18골드', effect: { type: 'invest_gold', cost: 10, reward: 18 } },
        { label: '즉시 수령', desc: '+8 골드 즉시',                              effect: { type: 'gold', amount: 8 } },
      ],
      dlc: 'storm_imperium',
    },
    {
      id: 'storm_resonance', title: '폭풍 공명', icon: '🌀',
      flavor: '폭풍 에너지가 방어선에 공명하며 위력을 증폭시킵니다.',
      choices: [
        { label: '타워 증폭', desc: '다음 웨이브 모든 타워 +20% 피해', effect: { type: 'temp_dmg_bonus', mult: 1.20 } },
        { label: '파편 수집', desc: '커먼 카드 2장을 덱에 추가',       effect: { type: 'add_cards', count: 2, rarity: 'common' } },
      ],
      dlc: 'storm_imperium',
    },
  ],
};
