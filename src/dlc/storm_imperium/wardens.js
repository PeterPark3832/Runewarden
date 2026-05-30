/**
 * Storm Imperium DLC — 워든 정의 (1명)
 * Tempest Warden "The Sovereign": 7번째 워든
 * 패시브: Storm Charge — 비행 적 처치 또는 착지 시 충전, 8회 → Thunderstrike 자동 시전
 */

import { CARD_DEFS } from '../../data/cards.js';
import { CardSystem } from '../../systems/CardSystem.js';

export const PASSIVES_STORM = {
  STORM_CHARGE: 'storm_charge',
};

function makeDeck(idList) {
  return idList.map(id => {
    const def = CARD_DEFS.find(c => c.id === id);
    if (!def) { console.warn(`[Warden] Card not found: ${id}`); return null; }
    return { ...def, uid: CardSystem.nextUid() };
  }).filter(Boolean);
}

export const STORM_WARDENS = [
  {
    id:         'tempest_warden',
    name:       'Tempest Warden',
    nameKo:     '폭풍 워든',
    title:      'The Sovereign',
    icon:       '⚡',
    color:      '#4ECDC4',
    accentBg:   'linear-gradient(135deg, #0a1a2a 0%, #061220 50%, #0a1a2a 100%)',
    unlockRank: 0,
    dlc:        'storm_imperium',
    tagline:    '"The storm does not negotiate."',
    desc: {
      en: 'Flying enemy specialist. Ground and destroy airborne threats using Storm Charge.',
      ko: '비행 적 전문가. 폭풍 충전으로 공중 위협을 착지시키고 격멸하십시오.',
    },

    startGold:  20,
    nexusHp:    3,
    handSize:   5,
    passive:    'storm_charge',
    passiveKey: 'dlc_si_passive_desc',

    buildDeck: () => makeDeck([
      'summon_storm_ballista', 'summon_storm_ballista',
      'summon_wind_anchor',
      'summon_archer',
      'aug_storm_edge',        'aug_storm_edge',
      'aug_aerial_focus',
      'aug_gale_step',
      'spell_thunderstrike',   'spell_thunderstrike',
      'spell_wind_shear',      'spell_wind_shear',
      'spell_storm_gold',
      'spell_grounding_bolt',
    ]),

    tips: [
      '비행 적이 많을수록 Storm Charge가 빠르게 충전됩니다.',
      'Wind Anchor로 비행 적을 착지시킨 뒤 Storm Ballista로 격멸하세요.',
      'Thunderstrike 자동 시전으로 대규모 비행 웨이브를 손쉽게 처리하세요.',
    ],
  },
];
