// 적 이동 및 상태 관리 시스템
import { ENEMY_PATH, hexToPixel, svgEl } from '../rendering/MapRenderer.js';
import { drawBossArt } from '../rendering/BossArt.js';
import { audio } from './AudioSystem.js';
import { HEX_W } from '../config/constants.js'; // eslint-disable-line no-unused-vars

// WAYPOINTS는 런 시작(startWave) 시점에 활성 경로로 재계산됨
// 모듈 로드 시에는 기본 경로로 초기화
let WAYPOINTS = ENEMY_PATH.current.map(([c, r]) => hexToPixel(c, r));

export const WAVE_CONFIGS = [
  // ── Act 1 ────────────────────────────────────────────
  // Wave 1: 그런트 3 + 고블린 4 (소형 스와머 첫 등장)
  [{ type: 'grunt', count: 3, interval: 1500 }, { type: 'goblin', count: 4, interval: 800 }],
  // Wave 2: 그런트 4 + 고블린 5 + 러너 2
  [{ type: 'grunt', count: 4, interval: 1100 }, { type: 'goblin', count: 5, interval: 700 }, { type: 'fast', count: 2, interval: 1600 }],
  // Wave 3: 그런트 5 + 고블린 6 + 러너 3 + 탱크 1
  [{ type: 'goblin', count: 6, interval: 650 }, { type: 'grunt', count: 5, interval: 900 },
   { type: 'fast', count: 3, interval: 1100 }, { type: 'tank', count: 1, interval: 3000 }],
  // Wave 4: 엘리트 등장 (기존 유지)
  [{ type: 'grunt', count: 4, interval: 800 }, { type: 'fast', count: 4, interval: 900 }, { type: 'elite', count: 2, interval: 2500 }, { type: 'tank', count: 1, interval: 2000 }],
  // Wave 5: Act 1 보스 — Ironclad
  [{ type: 'grunt', count: 3, interval: 1200 }, { type: 'elite', count: 2, interval: 2000 }, { type: 'boss', count: 1, interval: 5000 }],

  // ── Act 2 ────────────────────────────────────────────
  // Wave 6: 실드 적 첫 등장 (기존 유지)
  [{ type: 'grunt', count: 6, interval: 750 }, { type: 'fast', count: 4, interval: 850 }, { type: 'shielded', count: 2, interval: 2000 }],
  // Wave 7: 광전사 + 스톤 골렘 첫 등장 (슬로우 면역)
  [{ type: 'berserker', count: 3, interval: 1100 }, { type: 'shielded', count: 2, interval: 1800 },
   { type: 'fast', count: 4, interval: 750 }, { type: 'stone_golem', count: 1, interval: 4000 }],
  // Wave 8: 네크로맨서 첫 등장 (HP 재생) + 스톤 골렘
  [{ type: 'berserker', count: 3, interval: 900 }, { type: 'necromancer', count: 2, interval: 2000 },
   { type: 'stone_golem', count: 1, interval: 3500 }, { type: 'elite', count: 2, interval: 1800 }],
  // Wave 9: 페스트 캐리어 첫 등장 (피해 감소) + 네크로맨서
  [{ type: 'elite', count: 4, interval: 1000 }, { type: 'necromancer', count: 2, interval: 1800 },
   { type: 'plague_carrier', count: 2, interval: 2200 }, { type: 'berserker', count: 3, interval: 850 }],
  // Wave 10: Act 2 보스 — Void Titan + 페스트 캐리어
  [{ type: 'plague_carrier', count: 2, interval: 2000 }, { type: 'shielded', count: 2, interval: 1500 },
   { type: 'elite', count: 2, interval: 1200 }, { type: 'void_titan', count: 1, interval: 6000 }],

  // ── Act 3 ────────────────────────────────────────────
  // Wave 11: 공허의 전령 — Void Wraith + Void Stalker(격노형 엘리트) + Phantom(고속 유령)
  [{ type: 'void_wraith', count: 6, interval: 500 }, { type: 'phantom', count: 3, interval: 600 },
   { type: 'void_stalker', count: 2, interval: 1200 }, { type: 'berserker', count: 3, interval: 900 }],
  // Wave 12: 저거넛 행진 + 시즈 비스트 첫 등장 + 팬텀
  [{ type: 'juggernaut', count: 2, interval: 2500 }, { type: 'siege_beast', count: 1, interval: 4000 },
   { type: 'void_wraith', count: 6, interval: 480 }, { type: 'phantom', count: 4, interval: 550 },
   { type: 'void_stalker', count: 2, interval: 1100 }],
  // Wave 13: 그림자 군단 + 콜로서스 첫 등장 (보스급 탱커)
  [{ type: 'shadow_elite', count: 4, interval: 900 }, { type: 'siege_beast', count: 2, interval: 3500 },
   { type: 'phantom', count: 5, interval: 520 }, { type: 'void_stalker', count: 3, interval: 1000 },
   { type: 'colossus', count: 1, interval: 5000 }],
  // Wave 14: 총공세 — 모든 Act 3 타입 + 콜로서스 2기
  [{ type: 'void_wraith', count: 6, interval: 450 }, { type: 'shadow_elite', count: 4, interval: 850 },
   { type: 'juggernaut', count: 2, interval: 2500 }, { type: 'siege_beast', count: 2, interval: 3200 },
   { type: 'phantom', count: 4, interval: 520 }, { type: 'colossus', count: 2, interval: 4500 }],
  // Wave 15: 파이널 보스 — Abyssal Dragon + 호위대
  [{ type: 'shadow_elite', count: 3, interval: 1000 }, { type: 'colossus', count: 1, interval: 4000 },
   { type: 'void_wraith', count: 5, interval: 500 }, { type: 'abyssal_dragon', count: 1, interval: 8000 }],

  // ── DLC Act 4 (Wave 16~23) ─────────────────────────
  // Wave 16: 공허 침공 개시 — Void Shade 물량 + Shadow Hound
  [{ type: 'void_shade', count: 8, interval: 400 }, { type: 'shadow_hound', count: 6, interval: 350 },
   { type: 'void_knight', count: 2, interval: 2000 }],
  // Wave 17: 망령 군단 — Abyssal Wraith + Void Reaper 첫 등장
  [{ type: 'void_shade', count: 6, interval: 400 }, { type: 'abyssal_wraith', count: 3, interval: 900 },
   { type: 'void_reaper', count: 2, interval: 2200 }, { type: 'void_knight', count: 2, interval: 1800 }],
  // Wave 18: 공허 기사 + 팬텀 자이언트 첫 등장 (중간 탱커)
  [{ type: 'void_knight', count: 3, interval: 1500 }, { type: 'phantom_giant', count: 1, interval: 5000 },
   { type: 'abyssal_wraith', count: 4, interval: 800 }, { type: 'shadow_hound', count: 8, interval: 300 }],
  // Wave 19: 그림자 타이탄 중간보스 + 호위대
  [{ type: 'void_shade', count: 8, interval: 380 }, { type: 'void_reaper', count: 3, interval: 1800 },
   { type: 'phantom_giant', count: 1, interval: 4500 }, { type: 'shadow_titan', count: 1, interval: 7000 }],
  // Wave 20: DLC 중반 — Void Herald 대거 등장 + 압도적 물량
  [{ type: 'void_spawn', count: 12, interval: 300 }, { type: 'abyssal_wraith', count: 4, interval: 750 },
   { type: 'void_herald', count: 2, interval: 3000 }, { type: 'phantom_giant', count: 2, interval: 4000 }],
  // Wave 21: 그림자 총공세 — Act 4 전 유닛 총출동
  [{ type: 'shadow_hound', count: 8, interval: 300 }, { type: 'void_knight', count: 4, interval: 1200 },
   { type: 'void_reaper', count: 3, interval: 1800 }, { type: 'phantom_giant', count: 2, interval: 3800 },
   { type: 'abyssal_wraith', count: 4, interval: 700 }],
  // Wave 22: 보스 직전 — Shadow Titan 2기 + 최정예 호위대
  [{ type: 'void_shade', count: 10, interval: 350 }, { type: 'void_herald', count: 3, interval: 2500 },
   { type: 'shadow_titan', count: 2, interval: 6000 }, { type: 'void_knight', count: 4, interval: 1100 }],
  // Wave 23: DLC 파이널 보스 — Shadow Colossus + 호위대
  [{ type: 'void_reaper', count: 3, interval: 1500 }, { type: 'void_herald', count: 2, interval: 2500 },
   { type: 'phantom_giant', count: 2, interval: 4000 }, { type: 'shadow_colossus', count: 1, interval: 10000 }],

  // ── DLC 2 Act 5 (Wave 24~31) ────────────────────────
  // Wave 24: 태양 침공 개시 — Solar Ember 물량 + Acolyte + Sunfire Dancer
  [{ type: 'solar_ember', count: 10, interval: 350 }, { type: 'solar_acolyte', count: 5, interval: 900 },
   { type: 'sunfire_dancer', count: 4, interval: 700 }],
  // Wave 25: Blinded Crusader + Sun Herald(분열!) + Ember 물량
  [{ type: 'solar_acolyte', count: 6, interval: 800 }, { type: 'blinded_crusader', count: 2, interval: 2200 },
   { type: 'sun_herald', count: 1, interval: 4500 }, { type: 'solar_ember', count: 8, interval: 380 }],
  // Wave 26: Zealot + Knight + Dancer + Blazing Golem 첫 등장
  [{ type: 'solar_zealot', count: 4, interval: 1100 }, { type: 'solar_knight', count: 2, interval: 2000 },
   { type: 'sunfire_dancer', count: 6, interval: 650 }, { type: 'blazing_golem', count: 1, interval: 5000 }],
  // Wave 27: 총공세 — 다종 정예 + Golem 2기
  [{ type: 'sun_herald', count: 2, interval: 3500 }, { type: 'blinded_crusader', count: 3, interval: 1800 },
   { type: 'solar_zealot', count: 4, interval: 1000 }, { type: 'solar_knight', count: 3, interval: 1600 },
   { type: 'blazing_golem', count: 2, interval: 4500 }],
  // Wave 28: Solar Titan 중간보스 + 호위대
  [{ type: 'solar_acolyte', count: 6, interval: 750 }, { type: 'solar_zealot', count: 3, interval: 1200 },
   { type: 'blinded_crusader', count: 2, interval: 2000 }, { type: 'solar_titan', count: 1, interval: 8000 }],
  // Wave 29: Gilded Titan(분열) + Sun Herald 2기 + Knight 물량
  [{ type: 'solar_ember', count: 12, interval: 300 }, { type: 'gilded_titan', count: 1, interval: 6000 },
   { type: 'sun_herald', count: 2, interval: 3500 }, { type: 'solar_knight', count: 4, interval: 1400 }],
  // Wave 30: 보스 직전 총공세 — Solar Herald + 다종 정예
  [{ type: 'blinded_crusader', count: 4, interval: 1600 }, { type: 'solar_herald', count: 3, interval: 2800 },
   { type: 'blazing_golem', count: 2, interval: 4500 }, { type: 'gilded_titan', count: 2, interval: 5500 }],
  // Wave 31: DLC 2 파이널 보스 — Sun God + 호위대
  [{ type: 'solar_zealot', count: 4, interval: 1000 }, { type: 'blinded_crusader', count: 2, interval: 2000 },
   { type: 'sun_herald', count: 2, interval: 3500 }, { type: 'sun_god', count: 1, interval: 12000 }],

  // ── DLC 3 Act 6 (Wave 32~39) ────────────────────────
  // Wave 32: 폭풍 침공 개시 — Gust Sprite 물량 + Storm Hawk + Thunder Berserker
  [
    { type: 'gust_sprite', count: 8, interval: 600 },
    { type: 'storm_hawk', count: 3, interval: 2500 },
    { type: 'thunder_berserker', count: 4, interval: 1800 },
  ],
  // Wave 33: 스쿼올 + 폭풍 골렘 + Tempest Wraith
  [
    { type: 'gust_sprite', count: 10, interval: 500 },
    { type: 'tempest_wraith', count: 4, interval: 2200 },
    { type: 'storm_golem', count: 1, interval: 5000 },
  ],
  // Wave 34: Storm Hawk + Squall Knight + Gale Slasher
  [
    { type: 'storm_hawk', count: 4, interval: 2000 },
    { type: 'squall_knight', count: 2, interval: 4000 },
    { type: 'gale_slasher', count: 3, interval: 1800 },
  ],
  // Wave 35: Tempest Wraith + Lightning Drake + Squall Knight
  [
    { type: 'tempest_wraith', count: 5, interval: 2000 },
    { type: 'lightning_drake', count: 1, interval: 8000 },
    { type: 'squall_knight', count: 2, interval: 4000 },
  ],
  // Wave 36: 중간보스 — Typhoon Warlord + 호위대
  [
    { type: 'gust_sprite', count: 8, interval: 600 },
    { type: 'storm_hawk', count: 3, interval: 2500 },
    { type: 'typhoon_warlord', count: 1, interval: 10000 },
  ],
  // Wave 37: Cyclone Rider + Lightning Drake + Squall Knight
  [
    { type: 'cyclone_rider', count: 2, interval: 5000 },
    { type: 'lightning_drake', count: 2, interval: 6000 },
    { type: 'squall_knight', count: 3, interval: 3000 },
  ],
  // Wave 38: 총공세 — 다종 폭풍 유닛 + Typhoon Warlord
  [
    { type: 'gust_sprite', count: 6, interval: 500 },
    { type: 'tempest_wraith', count: 4, interval: 2000 },
    { type: 'storm_hawk', count: 3, interval: 2500 },
    { type: 'cyclone_rider', count: 2, interval: 5000 },
    { type: 'lightning_drake', count: 2, interval: 6000 },
    { type: 'typhoon_warlord', count: 1, interval: 8000 },
  ],
  // Wave 39: 최종보스 — Tempest Sovereign + 호위대
  [
    { type: 'storm_sentinel', count: 2, interval: 3000 },
    { type: 'typhoon_warlord', count: 1, interval: 6000 },
    { type: 'tempest_sovereign', count: 1, interval: 12000 },
  ],
];

// ── 기습 설정 ────────────────────────────────────────────
// 0-indexed waveIndex 기준, 보스/커스드 웨이브 제외
const AMBUSH_WAVE_SET = new Set([2, 6, 10, 12, 17, 20, 24, 28]);
const AMBUSH_DELAY_MS = 5000;

function _getAmbushGroup(waveIndex) {
  if (waveIndex < 5)  return { type: 'goblin',      count: 4, interval: 400 };
  if (waveIndex < 10) return { type: 'fast',         count: 3, interval: 500 };
  if (waveIndex < 15) return { type: 'void_wraith',  count: 4, interval: 350 };
  if (waveIndex < 23) return { type: 'shadow_hound', count: 5, interval: 280 };
  return                     { type: 'solar_ember',  count: 6, interval: 300 };
}

export const ENEMY_DEFS = {
  //                              HP    speed  color          size  reward
  grunt:      { name: 'Grunt',      hp:   48, speed:  44, color: '#8B4513', size: 12, reward:  1 },
  fast:       { name: 'Runner',     hp:   30, speed:  85, color: '#C0392B', size: 10, reward:  1 },
  tank:       { name: 'Tank',       hp:  160, speed:  28, color: '#2C3E50', size: 18, reward:  3 },
  elite:      { name: 'Elite',      hp:  140, speed:  58, color: '#6A0DAD', size: 14, reward:  4, isElite: true },
  shielded:   { name: 'Shielded',   hp:  110, speed:  38, color: '#1A5276', size: 14, reward:  5, shieldHits: 5 },
  berserker:  { name: 'Berserker',  hp:   90, speed:  55, color: '#922B21', size: 13, reward:  4, isElite: true },
  boss:       { name: 'Ironclad',   hp:  520, speed:  20, color: '#B8860B', size: 26, reward: 20, isBoss: true },  // 700 → 520
  void_titan: { name: 'Void Titan', hp: 1100, speed:  15, color: '#1A0033', size: 32, reward: 40, isBoss: true },
  // ── Act 3 기존 적 ──────────────────────────────────
  void_wraith:   { name: 'Void Wraith',  hp:  55, speed: 120, color: '#440066', size:  9, reward: 2 },
  juggernaut:    { name: 'Juggernaut',   hp: 320, speed:  18, color: '#1C1C1C', size: 22, reward: 8, slowImmune: true },
  shadow_elite:  { name: 'Shadow Elite', hp: 160, speed:  62, color: '#2D0050', size: 15, reward: 6, isElite: true, enrageThreshold: 0.6 },
  abyssal_dragon: { name: 'Abyssal Dragon', hp: 3000, speed: 12, color: '#0D0030',
                    size: 36, reward: 60, isBoss: true, phase2Hp: 1500 },

  // ── 신규 8종 ───────────────────────────────────────
  // Act 1: 소형 스와머 — 빠르고 약하지만 대량 등장
  goblin:        { name: 'Goblin',        hp:  20, speed:  95, color: '#5D7A1A', size:  8, reward:  1 },

  // Act 2: 슬로우 면역 대형 탱커 (저거넛보다 느리지만 더 단단함)
  stone_golem:   { name: 'Stone Golem',   hp: 580, speed:  18, color: '#7F8C8D', size: 23, reward:  6, slowImmune: true },

  // Act 2: HP 재생형 (regenDps: 초당 회복 HP) — 집중 화력 필요
  necromancer:   { name: 'Necromancer',   hp: 280, speed:  48, color: '#4A235A', size: 13, reward:  5,
                   isElite: true, regenDps: 6 },  // 14 → 6 (처치 불가 방지)

  // Act 2-3: 피해 감소 35% (damageReduction) — 지속 딜로만 잡아야 함
  plague_carrier: { name: 'Plague Carrier', hp: 440, speed:  40, color: '#1E8449', size: 16, reward:  5,
                    damageReduction: 0.35 },

  // Act 3: 격노형 고속 엘리트 — HP 50% 이하에서 속도 폭증
  void_stalker:  { name: 'Void Stalker',  hp: 220, speed:  78, color: '#6600CC', size: 12, reward:  5,
                   isElite: true, enrageThreshold: 0.5 },

  // Act 3: 슬로우 면역 초대형 탱커 — 저거넛보다 더 강력
  siege_beast:   { name: 'Siege Beast',   hp: 880, speed:  20, color: '#4A4A4A', size: 25, reward:  8,
                   slowImmune: true },

  // Act 3: 고속 유령형 — 빠름 + 피해 감소 25% + 위장 (camo)
  phantom:       { name: 'Phantom',       hp: 165, speed: 108, color: '#7D3C98', size: 10, reward:  3,
                   damageReduction: 0.25, camo: true },

  // Act 3: 최강 탱커 — 슬로우 면역 + HP 35% 격노 + 거대한 크기
  colossus:      { name: 'Colossus',      hp:1250, speed:  16, color: '#17202A', size: 29, reward:  9,
                   slowImmune: true, enrageThreshold: 0.35 },

  // ── DLC Act 4 적 10종 ───────────────────────────────
  // 공허 군단 — 그림자 왕국의 적들
  void_shade:    { name: 'Void Shade',    hp:  80, speed: 130, color: '#1A0033', size:  9, reward:  2,
                   damageReduction: 0.15, camo: true },             // 고속 + 소량 피해감소 + 위장
  shadow_hound:  { name: 'Shadow Hound',  hp:  45, speed: 160, color: '#2D004D', size:  8, reward:  1, camo: true }, // 최고속 경량 + 위장
  void_knight:   { name: 'Void Knight',   hp: 480, speed:  35, color: '#0D0025', size: 18, reward:  7,
                   isElite: true, shieldHits: 3 },                  // 쉴드 + 엘리트
  shadow_titan:  { name: 'Shadow Titan',  hp:1800, speed:  12, color: '#0A001A', size: 30, reward: 25,
                   isBoss: false, slowImmune: true, damageReduction: 0.20 }, // 중간보스급 탱커
  abyssal_wraith:{ name: 'Abyssal Wraith',hp: 220, speed:  95, color: '#3D0066', size: 11, reward:  4,
                   isElite: true, enrageThreshold: 0.55 },          // 고속 격노 엘리트
  void_reaper:   { name: 'Void Reaper',   hp: 340, speed:  50, color: '#1A0044', size: 14, reward:  6,
                   isElite: true, regenDps: 8 },                    // HP 재생 엘리트
  phantom_giant: { name: 'Phantom Giant', hp: 920, speed:  22, color: '#4D0080', size: 26, reward: 10,
                   damageReduction: 0.30, slowImmune: true },       // 피해감소 + 슬로우면역 탱커
  void_spawn:    { name: 'Void Spawn',    hp:  35, speed: 100, color: '#220033', size:  7, reward:  1 }, // 다량 스와머
  shadow_colossus:{ name: 'Shadow Colossus', hp:2500, speed: 10, color: '#060015', size: 34, reward: 30,
                    isBoss: true, slowImmune: true, enrageThreshold: 0.40,
                    damageReduction: 0.15 },                        // DLC 최종 보스
  void_herald:   { name: 'Void Herald',   hp: 600, speed:  30, color: '#1A0055', size: 20, reward: 12,
                   isElite: true, enrageThreshold: 0.50, regenDps: 5 }, // 재생 + 격노 엘리트

  // ── DLC 2 Act 5 태양 군단 12종 ─────────────────────────
  // 소형 스와머 — 분열 자식 유닛 (sun_herald/gilded_titan 사망 시 스폰)
  solar_ember:      { name: 'Solar Ember',      hp:  40, speed: 110, color: '#FF6600', size:  8, reward:  1 },
  // 기본 태양 병사
  solar_acolyte:    { name: 'Solar Acolyte',    hp: 120, speed:  55, color: '#C8860A', size: 11, reward:  3 },
  // 눈먼 성전사 — 엘리트 + Solar DoT 면역
  blinded_crusader: { name: 'Blinded Crusader', hp: 380, speed:  40, color: '#B8860B', size: 16, reward:  7,
                      isElite: true, solarImmune: true },
  // 태양 광신도 — 엘리트 + 격노 50%
  solar_zealot:     { name: 'Solar Zealot',     hp: 200, speed:  68, color: '#D4890A', size: 13, reward:  5,
                      isElite: true, enrageThreshold: 0.50 },
  // 태양 전령 — 엘리트 + solarImmune + 사망 시 Acolyte×3 분열
  sun_herald:       { name: 'Sun Herald',       hp: 550, speed:  28, color: '#F5C518', size: 19, reward: 10,
                      isElite: true, solarImmune: true,
                      splitOnDeath: { type: 'solar_acolyte', count: 3 } },
  // 불꽃 골렘 — 슬로우 면역 + 20% 피해 감소
  blazing_golem:    { name: 'Blazing Golem',    hp: 750, speed:  18, color: '#8B6914', size: 24, reward:  8,
                      slowImmune: true, damageReduction: 0.20 },
  // 태양 기사 — 엘리트 + 쉴드×4 + solarImmune
  solar_knight:     { name: 'Solar Knight',     hp: 480, speed:  38, color: '#DAA520', size: 17, reward:  8,
                      isElite: true, shieldHits: 4, solarImmune: true },
  // 선파이어 댄서 — 초고속 + 20% 피해 감소
  sunfire_dancer:   { name: 'Sunfire Dancer',   hp: 160, speed: 115, color: '#FF4500', size: 10, reward:  3,
                      damageReduction: 0.20 },
  // 황금 타이탄 — 슬로우 면역 + 격노 45% + 사망 시 Ember×4 분열
  gilded_titan:     { name: 'Gilded Titan',     hp:1400, speed:  16, color: '#CD7F32', size: 28, reward: 15,
                      slowImmune: true, enrageThreshold: 0.45,
                      splitOnDeath: { type: 'solar_ember', count: 4 } },
  // 태양의 전령 — 엘리트 + regenDps 7 + solarImmune
  solar_herald:     { name: 'Solar Herald',     hp: 700, speed:  25, color: '#FFD700', size: 21, reward: 12,
                      isElite: true, regenDps: 7, solarImmune: true },
  // 태양 타이탄 — 중간 보스급 탱커 (Wave 28)
  solar_titan:      { name: 'Solar Titan',      hp:2200, speed:  14, color: '#E8791A', size: 31, reward: 28,
                      isBoss: false, slowImmune: true, damageReduction: 0.15, solarImmune: true },
  // 태양신 — 최종 보스 (Wave 31) 3페이즈
  sun_god:          { name: 'Sun God',          hp:3200, speed:  11, color: '#F5C518', size: 38, reward: 45,
                      isBoss: true, slowImmune: true, enrageThreshold: 0.40, solarImmune: true,
                      phase2Hp: 1600 },

  // ── DLC 3: Storm Imperium ──────────────────────────
  // Flying (6종)
  gust_sprite: {
    id: 'gust_sprite', name: 'Gust Sprite', nameKo: '돌풍 정령',
    hp: 50, speed: 105, reward: 2, size: 14,
    color: '#4ECDC4', flying: true, dlc: 'storm_imperium',
  },
  storm_hawk: {
    id: 'storm_hawk', name: 'Storm Hawk', nameKo: '폭풍 매',
    hp: 180, speed: 130, reward: 4, size: 18,
    color: '#00B4D8', flying: true, isElite: true, enrageThreshold: 0.55, dlc: 'storm_imperium',
  },
  squall_knight: {
    id: 'squall_knight', name: 'Squall Knight', nameKo: '돌풍 기사',
    hp: 420, speed: 45, reward: 8, size: 22,
    color: '#0077B6', flying: true, isElite: true, shieldHits: 3, windImmune: true, dlc: 'storm_imperium',
  },
  tempest_wraith: {
    id: 'tempest_wraith', name: 'Tempest Wraith', nameKo: '폭풍 유령',
    hp: 90, speed: 150, reward: 3, size: 15,
    color: '#48CAE4', flying: true, camo: true, damageReduction: 0.20, dlc: 'storm_imperium',
  },
  lightning_drake: {
    id: 'lightning_drake', name: 'Lightning Drake', nameKo: '번개 드레이크',
    hp: 900, speed: 22, reward: 10, size: 32,
    color: '#0096C7', flying: true, windImmune: true, damageReduction: 0.20, dlc: 'storm_imperium',
  },
  cyclone_rider: {
    id: 'cyclone_rider', name: 'Cyclone Rider', nameKo: '사이클론 라이더',
    hp: 600, speed: 35, reward: 12, size: 28,
    color: '#023E8A', flying: true, isElite: true,
    splitOnDeath: { type: 'gust_sprite', count: 4 }, dlc: 'storm_imperium',
  },
  // Ground (4종)
  storm_golem: {
    id: 'storm_golem', name: 'Storm Golem', nameKo: '폭풍 골렘',
    hp: 1100, speed: 16, reward: 9, size: 36,
    color: '#335D6E', slowImmune: true, damageReduction: 0.15, dlc: 'storm_imperium',
  },
  thunder_berserker: {
    id: 'thunder_berserker', name: 'Thunder Berserker', nameKo: '번개 광전사',
    hp: 280, speed: 70, reward: 6, size: 20,
    color: '#264653', isElite: true, enrageThreshold: 0.45, dlc: 'storm_imperium',
  },
  storm_sentinel: {
    id: 'storm_sentinel', name: 'Storm Sentinel', nameKo: '폭풍 파수꾼',
    hp: 500, speed: 42, reward: 8, size: 24,
    color: '#1B4332', isElite: true, regenDps: 10, dlc: 'storm_imperium',
  },
  gale_slasher: {
    id: 'gale_slasher', name: 'Gale Slasher', nameKo: '강풍 베기',
    hp: 200, speed: 100, reward: 5, size: 17,
    color: '#2D6A4F', isElite: true, damageReduction: 0.25, dlc: 'storm_imperium',
  },
  // Boss (2종)
  typhoon_warlord: {
    id: 'typhoon_warlord', name: 'Typhoon Warlord', nameKo: '태풍 군주',
    hp: 2800, speed: 13, reward: 28, size: 38,
    color: '#0096C7',
    flying: true, windImmune: true, slowImmune: true, damageReduction: 0.10,
    enrageThreshold: 0.50, isBoss: true, dlc: 'storm_imperium',
  },
  tempest_sovereign: {
    id: 'tempest_sovereign', name: 'Tempest Sovereign', nameKo: '폭풍 군주',
    hp: 3600, speed: 10, reward: 60, size: 44,
    color: '#4ECDC4',
    flying: true, windImmune: true, damageReduction: 0.20,
    isBoss: true, phase2Hp: 1800, dlc: 'storm_imperium',
  },
};

export class EnemySystem {
  constructor(layer, onEnemyReachEnd, onEnemyKilled, onBossUpdate) {
    this.layer = layer;
    this.onEnemyReachEnd = onEnemyReachEnd;
    this.onEnemyKilled   = onEnemyKilled;
    this.onBossUpdate    = onBossUpdate ?? null; // 보스 HP 갱신 콜백
    this.enemies = [];
    this._idCounter = 0;
    this._spawnQueue = [];
    this._spawnTimer  = 0;
    this._spawnIndex  = 0;
    this._waveActive  = false;
    this._dying = new Set();
    this._pendingRemove = new Set(); // 틱 종료 후 일괄 제거 큐 — 순회 중 즉시 제거 방지
    this._sortedByProgress = []; // 프레임 타겟팅 캐시: getLeadEnemy O(n²) → O(n log n + k)
    this._boss        = null;
    this._slowBonus   = 1;    // 유물 감속 배율
    this._hpScale          = 1.15; // 난이도 HP 스케일 (기본: Standard)
    this._eliteBonus       = 0;    // 엘리트 추가 HP 배율
    this._bossHpScale      = 1;    // 보스 HP 스케일 (Novice: 0.80, Veteran: 1.25)
    this._enrageMult       = 1.8;  // 격노 속도 배율 (Novice: 1.3, Veteran: 2.0)
    this._spawnIntervalMult = 1;   // 스폰 간격 배율 (Novice: 1.25, Veteran: 0.85)
    this._veteranRegen     = false; // 재생 적 DPS 강화 여부
    this._noviceRegen      = false; // 재생 적 DPS 절반 여부
    this._pool             = {};   // type → [{el, bodyEl, hpBar}] SVG 요소 풀
    this._ambushTriggered  = false;
    this._adaptedTypes     = new Set(); // 넥서스 통과 적 타입 집합 (런 내 누적)
    // ── DLC 3 Storm Imperium ──────────────────────────
    this._groundedSet         = new Set();  // 현재 grounded 상태인 비행 적 id Set
    this._windDotEnabled      = true;       // windDot 처리 플래그
    this._groundingSlowThreshold = 0.5;    // 슬로우 50% 이상이면 비행 착지
    this._injectStyles();
  }

  // ── 적 적응 시스템 ─────────────────────────────────────
  recordAdaptation(type) { this._adaptedTypes.add(type); }
  resetAdaptations()     { this._adaptedTypes.clear(); }

  // 난이도별 재생 DPS 조정
  // Veteran: Necromancer 6→10, Void Reaper 8→14, Void Herald 5→8
  // Novice: 모든 재생 적 DPS 절반 (학습 곡선 완화)
  _applyVeteranRegen(type, baseDps) {
    if (baseDps === 0) return baseDps;
    if (this._veteranRegen) {
      const table = { necromancer: 10, void_reaper: 14, void_herald: 8, solar_herald: 11 };
      return table[type] ?? baseDps;
    }
    if (this._noviceRegen) {
      return Math.max(1, Math.round(baseDps * 0.5));
    }
    return baseDps;
  }

  // ── SVG 오브젝트 풀 ───────────────────────────────────
  // 보스·쉴드 적(형태가 파괴 가능)은 풀 대상 제외
  _canPool(def) { return !def.isBoss && !(def.shieldHits > 0); }

  _poolGet(type) {
    return this._pool[type]?.pop() ?? null;
  }

  _poolReturn(el, type, bodyEl, hpBar, badgesEl) {
    if (!this._pool[type]) this._pool[type] = [];
    if (this._pool[type].length < 10) {
      el.setAttribute('transform', 'translate(-9999,-9999)');
      el.removeAttribute('style');
      this._pool[type].push({ el, bodyEl, hpBar, badgesEl: badgesEl ?? null });
    } else {
      el.remove();
    }
  }

  // ── 역할별 몸통 형태 생성 ─────────────────────────────
  // 고속(타원) / 중장갑(육각형) / 엘리트(다이아몬드) / 기본(원)
  _makeBodyEl(type, def) {
    const fill = def.color, stroke = 'rgba(255,255,255,0.6)', s = def.size;
    if (['fast','goblin','void_wraith','solar_ember','sunfire_dancer',
         'shadow_hound','void_shade','void_spawn'].includes(type)) {
      return svgEl('ellipse', { cx: 0, cy: 0,
        rx: +(s * 1.35).toFixed(1), ry: +(s * 0.72).toFixed(1),
        fill, stroke, 'stroke-width': 1.5 });
    }
    if (['tank','stone_golem','juggernaut','colossus','siege_beast',
         'blazing_golem','phantom_giant','shadow_titan'].includes(type)) {
      const pts = Array.from({length: 6}, (_, i) => {
        const a = i * Math.PI / 3 - Math.PI / 6;
        return `${(s * Math.cos(a)).toFixed(1)},${(s * Math.sin(a)).toFixed(1)}`;
      }).join(' ');
      return svgEl('polygon', { points: pts, fill, stroke, 'stroke-width': 1.5 });
    }
    if (['elite','shadow_elite','necromancer','void_stalker','void_knight',
         'abyssal_wraith','void_reaper','solar_zealot','void_herald'].includes(type)) {
      return svgEl('polygon', {
        points: `0,${-s} ${+(s * 0.72).toFixed(1)},0 0,${s} ${-(s * 0.72).toFixed(1)},0`,
        fill, stroke, 'stroke-width': 1.5,
      });
    }
    return svgEl('circle', { cx: 0, cy: 0, r: s, fill, stroke, 'stroke-width': 1.5 });
  }

  // ── 적 캐릭터 디테일 (눈 + 아이들 애니메이션) ────────
  _addCharacterDetails(g, type, def) {
    const s = def.size;
    const E = (lx, ly, rx, ry, wr, pr, wc = '#fff', pc = '#111') => {
      // 왼쪽 눈
      g.appendChild(svgEl('circle', { cx: lx.toFixed(1), cy: ly.toFixed(1), r: wr, fill: wc, 'pointer-events': 'none' }));
      g.appendChild(svgEl('circle', { cx: (lx + wr * 0.18).toFixed(1), cy: (ly + wr * 0.18).toFixed(1), r: pr, fill: pc, 'pointer-events': 'none' }));
      // 오른쪽 눈
      g.appendChild(svgEl('circle', { cx: rx.toFixed(1), cy: ry.toFixed(1), r: wr, fill: wc, 'pointer-events': 'none' }));
      g.appendChild(svgEl('circle', { cx: (rx + wr * 0.18).toFixed(1), cy: (ry + wr * 0.18).toFixed(1), r: pr, fill: pc, 'pointer-events': 'none' }));
    };
    const SlitEye = (lx, ly, w, h, col) => {
      g.appendChild(svgEl('ellipse', { cx: lx.toFixed(1), cy: ly.toFixed(1), rx: w, ry: h, fill: col, 'pointer-events': 'none' }));
      g.appendChild(svgEl('ellipse', { cx: (-lx).toFixed(1), cy: ly.toFixed(1), rx: w, ry: h, fill: col, 'pointer-events': 'none' }));
    };

    switch (type) {
      // ── Act 1 ────────────────────────────────────────────
      case 'grunt':
        E(-s*0.28, -s*0.22, s*0.28, -s*0.22, s*0.22, s*0.13);
        g.classList.add('enemy-bob');
        break;
      case 'goblin':
        // 성난 눈썹 + 눈
        g.appendChild(svgEl('line', { x1: (-s*0.45).toFixed(1), y1: (-s*0.55).toFixed(1), x2: (-s*0.15).toFixed(1), y2: (-s*0.42).toFixed(1), stroke: '#3a6e00', 'stroke-width': 1.4, 'pointer-events': 'none' }));
        g.appendChild(svgEl('line', { x1: (s*0.45).toFixed(1), y1: (-s*0.55).toFixed(1), x2: (s*0.15).toFixed(1), y2: (-s*0.42).toFixed(1), stroke: '#3a6e00', 'stroke-width': 1.4, 'pointer-events': 'none' }));
        E(-s*0.28, -s*0.35, s*0.28, -s*0.35, s*0.2, s*0.12, '#ffff88', '#222');
        // 이빨
        g.appendChild(svgEl('polygon', { points: `${(-s*0.12).toFixed(1)},${(s*0.18).toFixed(1)} ${(-s*0.04).toFixed(1)},${(s*0.32).toFixed(1)} ${(s*0.04).toFixed(1)},${(s*0.18).toFixed(1)} ${(s*0.12).toFixed(1)},${(s*0.32).toFixed(1)} ${(s*0.2).toFixed(1)},${(s*0.18).toFixed(1)}`, fill: 'rgba(255,255,200,0.85)', 'pointer-events': 'none' }));
        g.classList.add('enemy-bob-fast');
        break;
      case 'fast':
        // 사이클롭스 눈 (빠른 느낌)
        g.appendChild(svgEl('ellipse', { cx: '0', cy: (-s*0.08).toFixed(1), rx: (s*0.38).toFixed(1), ry: (s*0.22).toFixed(1), fill: '#fff', 'pointer-events': 'none' }));
        g.appendChild(svgEl('ellipse', { cx: (s*0.06).toFixed(1), cy: (-s*0.08).toFixed(1), rx: (s*0.2).toFixed(1), ry: (s*0.18).toFixed(1), fill: '#CC0000', 'pointer-events': 'none' }));
        g.classList.add('enemy-bob-fast');
        break;
      case 'tank':
        // 장갑 바이저 슬릿
        SlitEye(-s*0.32, -s*0.15, s*0.16, s*0.08, 'rgba(255,80,0,0.9)');
        g.classList.add('enemy-heavy');
        break;
      case 'elite':
        // 빛나는 다이아몬드 눈
        E(-s*0.22, -s*0.12, s*0.22, -s*0.12, s*0.18, s*0.1, 'rgba(220,150,255,0.95)', '#3a006a');
        g.classList.add('enemy-pulse');
        break;
      case 'shielded':
        E(-s*0.26, -s*0.28, s*0.26, -s*0.28, s*0.18, s*0.1, '#ddeeff', '#003366');
        g.classList.add('enemy-bob');
        break;
      case 'berserker':
        // 분노한 눈 (빨간 광채)
        E(-s*0.28, -s*0.25, s*0.28, -s*0.25, s*0.2, s*0.12, '#FF4444', '#440000');
        // 이빨
        g.appendChild(svgEl('polygon', { points: `${(-s*0.18).toFixed(1)},${(s*0.16).toFixed(1)} ${(-s*0.08).toFixed(1)},${(s*0.3).toFixed(1)} ${(0).toFixed(1)},${(s*0.16).toFixed(1)} ${(s*0.08).toFixed(1)},${(s*0.3).toFixed(1)} ${(s*0.18).toFixed(1)},${(s*0.16).toFixed(1)}`, fill: '#ffdddd', 'pointer-events': 'none' }));
        g.classList.add('enemy-bob-fast');
        break;

      // ── Act 2 ────────────────────────────────────────────
      case 'necromancer':
        // 해골 눈 소켓 (빈 구멍)
        g.appendChild(svgEl('circle', { cx: (-s*0.3).toFixed(1), cy: (-s*0.22).toFixed(1), r: (s*0.22).toFixed(1), fill: 'rgba(0,0,0,0.85)', 'pointer-events': 'none' }));
        g.appendChild(svgEl('circle', { cx: (s*0.3).toFixed(1), cy: (-s*0.22).toFixed(1), r: (s*0.22).toFixed(1), fill: 'rgba(0,0,0,0.85)', 'pointer-events': 'none' }));
        // 보라 광채
        g.appendChild(svgEl('circle', { cx: (-s*0.3).toFixed(1), cy: (-s*0.22).toFixed(1), r: (s*0.1).toFixed(1), fill: 'rgba(160,0,255,0.9)', 'pointer-events': 'none' }));
        g.appendChild(svgEl('circle', { cx: (s*0.3).toFixed(1), cy: (-s*0.22).toFixed(1), r: (s*0.1).toFixed(1), fill: 'rgba(160,0,255,0.9)', 'pointer-events': 'none' }));
        g.classList.add('enemy-wisp');
        break;
      case 'stone_golem':
      case 'juggernaut':
      case 'colossus':
        SlitEye(-s*0.32, -s*0.18, s*0.2, s*0.07, 'rgba(255,120,0,0.85)');
        g.classList.add('enemy-heavy');
        break;
      case 'plague_carrier':
        // 충혈된 눈
        E(-s*0.26, -s*0.22, s*0.26, -s*0.22, s*0.2, s*0.11, '#ffeeee', '#880000');
        // 실핏줄
        g.appendChild(svgEl('line', { x1: (-s*0.38).toFixed(1), y1: (-s*0.3).toFixed(1), x2: (-s*0.22).toFixed(1), y2: (-s*0.18).toFixed(1), stroke: 'rgba(200,0,0,0.5)', 'stroke-width': 0.7, 'pointer-events': 'none' }));
        g.classList.add('enemy-bob');
        break;
      case 'siege_beast':
        SlitEye(-s*0.42, -s*0.22, s*0.22, s*0.09, '#FF6600');
        g.classList.add('enemy-heavy');
        break;
      case 'void_stalker':
        E(-s*0.24, -s*0.18, s*0.24, -s*0.18, s*0.18, s*0.1, 'rgba(200,100,255,0.9)', '#1a0033');
        g.classList.add('enemy-pulse');
        break;
      case 'berserker': break; // handled above

      // ── Act 3 ────────────────────────────────────────────
      case 'phantom':
        // 텅 빈 눈구멍 (유령)
        g.appendChild(svgEl('ellipse', { cx: (-s*0.25).toFixed(1), cy: (-s*0.1).toFixed(1), rx: (s*0.2).toFixed(1), ry: (s*0.26).toFixed(1), fill: 'rgba(0,0,0,0.7)', 'pointer-events': 'none' }));
        g.appendChild(svgEl('ellipse', { cx: (s*0.25).toFixed(1), cy: (-s*0.1).toFixed(1), rx: (s*0.2).toFixed(1), ry: (s*0.26).toFixed(1), fill: 'rgba(0,0,0,0.7)', 'pointer-events': 'none' }));
        g.classList.add('enemy-wisp');
        break;
      case 'void_wraith':
        g.appendChild(svgEl('ellipse', { cx: (-s*0.3).toFixed(1), cy: 0, rx: (s*0.18).toFixed(1), ry: (s*0.1).toFixed(1), fill: 'rgba(120,0,200,0.85)', 'pointer-events': 'none' }));
        g.appendChild(svgEl('ellipse', { cx: (s*0.3).toFixed(1), cy: 0, rx: (s*0.18).toFixed(1), ry: (s*0.1).toFixed(1), fill: 'rgba(120,0,200,0.85)', 'pointer-events': 'none' }));
        g.classList.add('enemy-wisp');
        break;
      case 'shadow_elite':
        SlitEye(-s*0.26, -s*0.14, s*0.18, s*0.07, 'rgba(200,0,255,0.9)');
        g.classList.add('enemy-pulse');
        break;
      case 'shadow_hound':
        E(-s*0.28, -s*0.18, s*0.28, -s*0.18, s*0.2, s*0.12, '#ff4444', '#220000');
        g.classList.add('enemy-bob-fast');
        break;
      case 'void_reaper':
        SlitEye(-s*0.28, -s*0.18, s*0.16, s*0.07, 'rgba(160,0,220,0.9)');
        g.classList.add('enemy-pulse');
        break;
      case 'void_knight':
        SlitEye(-s*0.3, -s*0.15, s*0.18, s*0.08, 'rgba(80,0,200,0.85)');
        g.classList.add('enemy-bob');
        break;
      case 'abyssal_wraith':
        E(-s*0.25, -s*0.18, s*0.25, -s*0.18, s*0.17, s*0.1, 'rgba(180,80,255,0.85)', '#1a0033');
        g.classList.add('enemy-wisp');
        break;
      case 'void_herald':
        E(-s*0.26, -s*0.18, s*0.26, -s*0.18, s*0.19, s*0.11, 'rgba(200,150,255,0.9)', '#2a0044');
        g.classList.add('enemy-pulse');
        break;
      case 'void_shade':
        g.appendChild(svgEl('ellipse', { cx: 0, cy: 0, rx: (s*0.25).toFixed(1), ry: (s*0.14).toFixed(1), fill: 'rgba(80,0,160,0.85)', 'pointer-events': 'none' }));
        g.classList.add('enemy-wisp');
        break;
      case 'void_spawn':
        g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: (s*0.4).toFixed(1), fill: 'rgba(60,0,120,0.8)', 'pointer-events': 'none' }));
        g.classList.add('enemy-bob-fast');
        break;
      case 'phantom_giant':
        g.appendChild(svgEl('ellipse', { cx: (-s*0.35).toFixed(1), cy: (-s*0.15).toFixed(1), rx: (s*0.24).toFixed(1), ry: (s*0.32).toFixed(1), fill: 'rgba(0,0,0,0.75)', 'pointer-events': 'none' }));
        g.appendChild(svgEl('ellipse', { cx: (s*0.35).toFixed(1), cy: (-s*0.15).toFixed(1), rx: (s*0.24).toFixed(1), ry: (s*0.32).toFixed(1), fill: 'rgba(0,0,0,0.75)', 'pointer-events': 'none' }));
        g.appendChild(svgEl('ellipse', { cx: (-s*0.35).toFixed(1), cy: (-s*0.15).toFixed(1), rx: (s*0.1).toFixed(1), ry: (s*0.14).toFixed(1), fill: 'rgba(120,0,200,0.8)', 'pointer-events': 'none' }));
        g.appendChild(svgEl('ellipse', { cx: (s*0.35).toFixed(1), cy: (-s*0.15).toFixed(1), rx: (s*0.1).toFixed(1), ry: (s*0.14).toFixed(1), fill: 'rgba(120,0,200,0.8)', 'pointer-events': 'none' }));
        g.classList.add('enemy-wisp');
        break;
      case 'shadow_titan':
        SlitEye(-s*0.35, -s*0.2, s*0.24, s*0.08, 'rgba(200,0,255,0.95)');
        g.classList.add('enemy-heavy');
        break;

      // ── Solar DLC ─────────────────────────────────────────
      case 'solar_ember':
        g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: (s*0.45).toFixed(1), fill: 'rgba(255,120,0,0.75)', 'pointer-events': 'none' }));
        g.classList.add('enemy-pulse');
        break;
      case 'solar_acolyte':
        E(-s*0.25, -s*0.2, s*0.25, -s*0.2, s*0.18, s*0.1, '#fff8aa', '#443300');
        g.classList.add('enemy-bob');
        break;
      case 'sunfire_dancer':
        E(-s*0.28, -s*0.18, s*0.28, -s*0.18, s*0.2, s*0.12, '#ffee44', '#330000');
        g.classList.add('enemy-bob-fast');
        break;
      case 'solar_zealot':
        SlitEye(-s*0.28, -s*0.16, s*0.18, s*0.07, '#FFD700');
        g.classList.add('enemy-pulse');
        break;
      case 'solar_knight':
        SlitEye(-s*0.3, -s*0.15, s*0.2, s*0.09, 'rgba(255,160,0,0.9)');
        g.classList.add('enemy-heavy');
        break;
      case 'blinded_crusader':
        // 눈가리개처럼 가려진 눈
        g.appendChild(svgEl('rect', { x: (-s*0.45).toFixed(1), y: (-s*0.25).toFixed(1), width: (s*0.9).toFixed(1), height: (s*0.18).toFixed(1), rx: (s*0.06).toFixed(1), fill: 'rgba(200,150,0,0.7)', 'pointer-events': 'none' }));
        g.classList.add('enemy-bob');
        break;
      case 'blazing_golem':
        SlitEye(-s*0.35, -s*0.2, s*0.22, s*0.09, '#FF4400');
        g.classList.add('enemy-heavy');
        break;
      case 'gilded_titan':
        SlitEye(-s*0.38, -s*0.2, s*0.24, s*0.09, '#FFD700');
        g.classList.add('enemy-heavy');
        break;
      case 'solar_herald':
      case 'sun_herald':
        E(-s*0.3, -s*0.22, s*0.3, -s*0.22, s*0.22, s*0.13, '#ffff88', '#664400');
        g.classList.add('enemy-pulse');
        break;

      default:
        // 나머지 모든 적: 기본 눈
        if (!def.isBoss) {
          E(-s*0.25, -s*0.2, s*0.25, -s*0.2, s*0.18, s*0.1);
          g.classList.add('enemy-bob');
        }
    }
  }

  // ── 유물: 감속/번 배율 설정 ─────────────────────────
  // 복수 slow_bonus 유물 스택 시 곱연산, 상한 1.40으로 캡 (95% 슬로우 버그 방지)
  setSlowBonus(mult) { this._slowBonus = Math.min(1.40, this._slowBonus * mult); }
  setBurnBonus(extraDps, extraDuration) {
    this._burnExtraDps      = (this._burnExtraDps ?? 0) + extraDps;
    this._burnExtraDuration = (this._burnExtraDuration ?? 0) + extraDuration;
  }

  _ensureBossGlowStyle() {
    if (document.getElementById('boss-glow-style')) return;
    const s = document.createElement('style');
    s.id = 'boss-glow-style';
    // r 속성은 CSS 애니메이션 불가 → transform: scale 사용
    s.textContent = `@keyframes bossGlow {
      0%   { opacity: 0.25; transform: scale(0.88); }
      100% { opacity: 0.75; transform: scale(1.25); }
    }`;
    document.head.appendChild(s);
  }

  _injectStyles() {
    if (document.getElementById('enemy-fx-style')) return;
    const s = document.createElement('style');
    s.id = 'enemy-fx-style';
    s.textContent = `
      @keyframes enemyDeath {
        0%   { opacity: 1; transform: scale(1); }
        40%  { opacity: 1; transform: scale(1.35); }
        100% { opacity: 0; transform: scale(0); }
      }
      @keyframes hitFlash {
        0%,100% { filter: none; }
        50%      { filter: brightness(5) saturate(0); }
      }
      @keyframes dmgFloat {
        0%   { opacity: 1; transform: translateY(0) scale(1); }
        20%  { opacity: 1; transform: translateY(-6px) scale(1.2); }
        100% { opacity: 0; transform: translateY(-30px) scale(0.8); }
      }
      @keyframes deathParticle {
        0%   { opacity: 0.9; transform: translate(0,0) scale(1); }
        100% { opacity: 0;   transform: translate(var(--dx,0px),var(--dy,0px)) scale(0.4); }
      }
      @keyframes deathParticleElite {
        0%   { opacity: 1;   transform: translate(0,0) scale(1.2); }
        60%  { opacity: 0.7; }
        100% { opacity: 0;   transform: translate(var(--dx,0px),var(--dy,0px)) scale(0.2); }
      }
      @keyframes splashRing {
        0%   { opacity: 0.7; transform: scale(0.3); }
        100% { opacity: 0;   transform: scale(1); }
      }
      @keyframes impactBurst {
        0%   { opacity: 0.85; transform: scale(0.08); }
        100% { opacity: 0;    transform: scale(1.65); }
      }
    `;
    document.head.appendChild(s);
  }

  // ── 웨이브 시작 ───────────────────────────────────────
  // spawnDelay: 첫 스폰까지 추가 대기 ms (extra_prep 이벤트)
  // spawnSpeedMult: 적 기본 속도 배율 (slow_next_wave 이벤트, 예: 0.75 = 25% 감속)
  startWave(waveIndex, hpScale = 1.15, eliteBonus = 0, spawnDelay = 0, spawnSpeedMult = 1,
            bossHpScale = 1, enrageMult = 1.8, spawnIntervalMult = 1, veteranRegen = false,
            noviceRegen = false, spawnIntervalStartWave = 3, cursedRevive = false) {
    // 활성 맵 경로로 웨이포인트 갱신
    WAYPOINTS = ENEMY_PATH.current.map(([c, r]) => hexToPixel(c, r));
    // 화면 밖 진입 지점 삽입 — 적이 화면 안으로 걸어 들어오는 효과
    // WAYPOINTS[0]에서 WAYPOINTS[1] 방향의 역방향으로 HEX_W만큼 오프셋
    if (WAYPOINTS.length >= 2) {
      const w0 = WAYPOINTS[0], w1 = WAYPOINTS[1];
      const dx = w0.x - w1.x, dy = w0.y - w1.y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      WAYPOINTS = [
        { x: w0.x + (dx / len) * HEX_W, y: w0.y + (dy / len) * HEX_W },
        ...WAYPOINTS,
      ];
    }
    this._hpScale           = hpScale;
    this._eliteBonus        = eliteBonus;
    this._spawnSpeedMult    = spawnSpeedMult;  // slow_next_wave 이벤트 효과
    this._waveIndex         = waveIndex;       // 후반부 속도 가속 계산용
    this._bossHpScale       = bossHpScale;
    this._enrageMult        = enrageMult;
    this._veteranRegen      = veteranRegen;
    this._noviceRegen       = noviceRegen;
    // 난이도별 스폰 간격 적용 시작 웨이브 (Novice: 0, Veteran: 3)
    this._spawnIntervalMult = waveIndex >= spawnIntervalStartWave ? spawnIntervalMult : 1;

    const config = WAVE_CONFIGS[Math.min(waveIndex, WAVE_CONFIGS.length - 1)];
    this._spawnQueue = [];
    let cumDelay = 0;
    for (const group of config) {
      for (let i = 0; i < group.count; i++) {
        this._spawnQueue.push({ type: group.type, at: cumDelay });
        cumDelay += group.interval * this._spawnIntervalMult;
      }
    }
    // extra_prep: 첫 스폰을 spawnDelay ms 뒤로 미룸 (음수 타이머 시작)
    this._spawnTimer        = -spawnDelay;
    this._spawnIndex        = 0;
    this._waveActive        = true;
    this._cursedWaveRevive  = cursedRevive;
    this._ambushTriggered   = false;
  }

  isWaveClear() {
    return this._waveActive &&
           this._spawnIndex >= this._spawnQueue.length &&
           this.enemies.length === 0;
  }

  // ── 메인 업데이트 ─────────────────────────────────────
  update(delta) {
    if (!this._waveActive) return;

    this._tickStunCooldowns(delta);
    this._spawnTimer += delta;
    while (
      this._spawnIndex < this._spawnQueue.length &&
      this._spawnTimer >= this._spawnQueue[this._spawnIndex].at
    ) {
      this._spawn(this._spawnQueue[this._spawnIndex].type);
      this._spawnIndex++;
    }

    // 기습 체크: 웨이브 절반 스폰 완료 시 5초 후 기습 그룹 추가
    if (!this._ambushTriggered && AMBUSH_WAVE_SET.has(this._waveIndex)) {
      const halfway = Math.ceil(this._spawnQueue.length / 2);
      if (this._spawnIndex >= halfway) this._triggerAmbush();
    }

    // 프레임 타겟팅 캐시: 진행도 내림차순 정렬 → TowerSystem의 getLeadEnemy가 첫 일치 즉시 반환
    this._sortedByProgress = [...this.enemies].sort((a, b) => b.waypointIndex - a.waypointIndex);

    const reachedEnd = [];
    for (const e of [...this.enemies]) {  // 복사본으로 순회 (중간 제거 대비)
      // HP 재생 (Necromancer 등) — 빙결 중에도 계속
      if (e.regenDps > 0 && e.hp < e.maxHp && e.hp > 0) {
        e.hp = Math.min(e.maxHp, e.hp + e.regenDps * delta / 1000);
        this._updateHpBar(e);
      }
      // Solar DoT 처리 — solarImmune 적은 무효
      if (e.solarDots?.length > 0 && !e.solarImmune) {
        this._updateSolarDots(e, delta);
        if (e.hp <= 0 && !this._pendingRemove.has(e.id) && !this._dying.has(e.id)) {
          e._killingElement = 'solar';
          this._queueDeath(e);
          continue;
        }
      }
      // 번(DoT) 처리 — 빙결 중에도 계속 타오름
      if (e.burns.length > 0) {
        this._updateBurns(e, delta);
        if (e.hp <= 0 && !this._pendingRemove.has(e.id) && !this._dying.has(e.id)) {
          e._killingElement = 'fire';
          this._queueDeath(e);
          continue;
        }
      }
      // windDot 틱 처리 (DLC 3 Storm Imperium)
      if (this._windDotEnabled && e.windDots && e.windDots.length > 0) {
        let totalDps = 0;
        e.windDots = e.windDots.filter(d => {
          d.remaining -= delta;
          if (d.remaining > 0) { totalDps += d.dps; return true; }
          return false;
        });
        if (totalDps > 0 && !this._pendingRemove.has(e.id) && !this._dying.has(e.id)) {
          this.dealDamage(e.id, totalDps * delta / 1000, 'wind');
        }
      }
      if (this._pendingRemove.has(e.id)) continue; // 이미 제거 큐에 있음

      if (e.frozen > 0) { e.frozen -= delta; this._updateEnemySVG(e); continue; }
      if (e.stunned > 0) { e.stunned -= delta; this._updateEnemySVG(e); continue; }
      this._moveEnemy(e, delta);
      this._updateEnemySVG(e);
      if (e.reached) reachedEnd.push(e);
    }
    for (const e of reachedEnd) {
      const reachInfo = { type: e.type, displayName: ENEMY_DEFS[e.type]?.name ?? e.type, isBoss: e.isBoss };
      this._pendingRemove.delete(e.id); // 넥서스 도달 시 죽음 큐에서 제거
      this._removeEnemy(e, false);
      this.onEnemyReachEnd(reachInfo);
    }

    // 틱 종료 일괄 제거 — 순회가 완전히 끝난 뒤 안전하게 처리
    this._flushPendingRemovals();
  }

  // 제거 큐 flush — update() 틱 끝 또는 테스트에서 직접 호출 가능
  _flushPendingRemovals() {
    if (this._pendingRemove.size === 0) return;
    for (const id of this._pendingRemove) {
      const e = this.enemies.find(x => x.id === id);
      if (e) {
        this._handleSplitOnDeath(e);
        this._removeEnemy(e, true);
        this.onEnemyKilled(e.reward, e.isSplitChild ?? false, e.def?.flying ?? false);
      }
    }
    this._pendingRemove.clear();
    // flush 후 정렬 캐시 재구축 — TowerSystem이 이후 호출하는 getLeadEnemy에 신선한 목록 제공
    this._sortedByProgress = [...this.enemies].sort((a, b) => b.waypointIndex - a.waypointIndex);
  }

  _moveEnemy(e, delta) {
    const speedMult = e.slowTimer > 0 ? (1 - e.slowAmt) : 1;
    if (e.slowTimer > 0) e.slowTimer -= delta;

    // Abyssal Dragon Phase 2: accumulate elapsed time for frost resistance ramp
    if (e.phase2) e.phase2ElapsedMs = (e.phase2ElapsedMs ?? 0) + delta;

    // Ironclad shield timer decay
    if (e.name === 'Ironclad') {
      if (e.ironShielding > 0) {
        e.ironShielding -= delta;
        if (e.ironShielding <= 0) {
          e.ironShielding = 0;
          e.el?.classList.remove('boss-shielding');
        }
      }
      if (e.ironShieldCd > 0) e.ironShieldCd -= delta;
    }

    const target = WAYPOINTS[e.waypointIndex];
    const dx = target.x - e.x;
    const dy = target.y - e.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const step = (e.speed * speedMult * delta) / 1000;

    if (dist <= step) {
      e.x = target.x; e.y = target.y;
      e.waypointIndex++;
      if (e.waypointIndex >= WAYPOINTS.length) e.reached = true;
    } else {
      e.x += (dx/dist) * step;
      e.y += (dy/dist) * step;
    }
  }

  // ── 스폰 ──────────────────────────────────────────────
  _spawn(type) {
    const def = ENEMY_DEFS[type];
    const start = WAYPOINTS[0];
    const id = `enemy-${++this._idCounter}`;

    // 난이도 HP 스케일링: 보스도 bossHpScale 적용
    const hpScale  = def.isBoss ? (this._bossHpScale ?? 1) : (this._hpScale ?? 1.15);
    const eliteAdd = (def.isElite && !def.isBoss) ? (this._eliteBonus ?? 0) : 0;
    const lateGameMult = def.isBoss ? 1 : 1 + Math.max(0, (this._waveIndex - 8) * 0.12);
    const scaledHp = Math.round(def.hp * hpScale * (1 + eliteAdd) * lateGameMult);

    const enemy = {
      id, type,
      def,           // def 참조 저장 — grounding/windDot 체크에서 def.flying, def.windImmune 사용
      x: start.x, y: start.y,
      hp: scaledHp, maxHp: scaledHp,
      // slow_next_wave 이벤트: 기본 속도에 배율 적용 (1.0 = 변화 없음)
      // Wave 16+: 점진적 속도 가속 (Wave 20 = +9%, Wave 31 = +29%)
      speed: def.speed * (this._spawnSpeedMult ?? 1) * (1 + Math.max(0, (this._waveIndex ?? 0) - 15) * 0.018) * (this._adaptedTypes.has(type) ? 1.1 : 1),
      baseSpeed: def.speed * (this._spawnSpeedMult ?? 1) * (1 + Math.max(0, (this._waveIndex ?? 0) - 15) * 0.018) * (this._adaptedTypes.has(type) ? 1.1 : 1),
      color: def.color, size: def.size, reward: def.reward,
      isBoss:    def.isBoss    ?? false,
      isElite:   def.isElite   ?? false,
      shieldHits: def.shieldHits ?? 0,
      slowImmune: def.slowImmune ?? false,           // Juggernaut, Stone Golem, Siege Beast, Colossus
      enrageThreshold: def.enrageThreshold ?? null,  // Berserker, Shadow Elite, Void Stalker, Colossus
      enraged:   false,
      regenDps:        this._applyVeteranRegen(type, def.regenDps ?? 0),
      damageReduction: def.damageReduction ?? 0,     // Plague Carrier, Phantom: 피해 감소율
      waypointIndex: 1, reached: false,
      frozen: 0, slowTimer: 0, slowAmt: 0,
      ironShieldCd: 0, ironShielding: 0,
      phase2ElapsedMs: 0,
      burns: [],
      // DLC 2 Solar fields
      solarDots: [], stunned: 0, stunCooldowns: {},
      solarImmune: def.solarImmune ?? false,
      splitOnDeath: def.splitOnDeath ?? null,
      phase3: false,
      weakness: (def.isBoss && this._upcomingBossWeakness) ? this._upcomingBossWeakness : null,
      camo: def.camo ?? false,
      el: null, hpBar: null, bodyEl: null, shieldEl: null,
    };

    // 풀에서 같은 타입 SVG 요소 재사용 (보스·쉴드 적 제외)
    if (this._canPool(def)) {
      const pooled = this._poolGet(type);
      if (pooled) {
        const g = pooled.el;
        g.id = id;
        g.setAttribute('transform', `translate(${start.x.toFixed(1)},${start.y.toFixed(1)})`);
        pooled.bodyEl.setAttribute('fill', def.color);
        pooled.bodyEl.setAttribute('stroke', 'rgba(255,255,255,0.6)');
        pooled.hpBar.setAttribute('x', String(-def.size));
        pooled.hpBar.setAttribute('width', String(def.size * 2));
        pooled.hpBar.setAttribute('fill', '#2ecc71');
        enemy.el = g;
        enemy.bodyEl = pooled.bodyEl;
        enemy.hpBar = pooled.hpBar;
        // 위장 적 시각 처리
        g.style.opacity = def.camo ? '0.4' : '';
        pooled.bodyEl.setAttribute('stroke-dasharray', def.camo ? '3,2' : 'none');
        // 상태이상 뱃지 재사용 — 풀 원소의 badgesEl을 찾아 초기화
        let badgesEl = pooled.badgesEl ?? g.querySelector('.status-badges');
        if (!badgesEl) {
          badgesEl = svgEl('g', { class: 'status-badges' });
          g.appendChild(badgesEl);
        } else {
          while (badgesEl.firstChild) badgesEl.removeChild(badgesEl.firstChild);
        }
        enemy.badgesEl = badgesEl;
        enemy._statusKey = '';
        this._ensureWings(g, enemy, def);  // 비행 적 날개 + _flyOffset (풀 재사용 시에도)
        this.layer.appendChild(g);  // bring to front (z-order)
        this.enemies.push(enemy);
        return;
      }
    }

    const g = svgEl('g', { id, class: 'enemy-unit' });

    // 그림자 (QW#1: 불투명도 + 크기 강화 — 볼륨감 향상)
    const shadow = svgEl('ellipse', {
      cx: 0, cy: def.size * 0.72, rx: def.size * 0.85, ry: def.size * 0.32,
      fill: 'rgba(0,0,0,0.45)', 'pointer-events': 'none',
    });
    g.appendChild(shadow);

    // 몸통 (고속=타원 / 중장갑=육각형 / 엘리트=다이아몬드 / 기본=원)
    const body = this._makeBodyEl(type, def);
    g.appendChild(body);
    enemy.bodyEl = body;

    // 위장 적 시각 처리
    if (def.camo) {
      g.style.opacity = '0.4';
      body.setAttribute('stroke-dasharray', '3,2');
    }

    // 적 타입별 마킹
    if (type === 'tank') {
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size * 0.5, fill: 'rgba(0,0,0,0.4)' }));
    } else if (type === 'fast') {
      g.appendChild(svgEl('polygon', {
        points: '0,-6 4,4 -4,4', fill: 'rgba(255,200,0,0.7)',
      }));
    } else if (type === 'shielded') {
      // 실드 적: 파란 방어막 원
      const shield = svgEl('circle', {
        cx: 0, cy: 0, r: def.size + 5,
        fill: 'rgba(100,180,255,0.12)',
        stroke: '#5DADE2', 'stroke-width': 2.5, opacity: '0.85',
      });
      g.appendChild(shield);
      enemy.shieldEl = shield;
      // 방패 마크
      g.appendChild(svgEl('polygon', {
        points: `0,${-def.size*0.5} ${def.size*0.4},${-def.size*0.1} ${def.size*0.4},${def.size*0.3} 0,${def.size*0.55} ${-def.size*0.4},${def.size*0.3} ${-def.size*0.4},${-def.size*0.1}`,
        fill: 'rgba(93,173,226,0.7)',
      }));

    } else if (type === 'berserker') {
      // 광전사: 빨간 뿔 마킹
      g.appendChild(svgEl('polygon', {
        points: `${-def.size*0.4},${-def.size*0.5} ${-def.size*0.1},${-def.size*0.85} 0,${-def.size*0.4}`,
        fill: '#FF4500',
      }));
      g.appendChild(svgEl('polygon', {
        points: `${def.size*0.4},${-def.size*0.5} ${def.size*0.1},${-def.size*0.85} 0,${-def.size*0.4}`,
        fill: '#FF4500',
      }));

    } else if (type === 'elite') {
      // 엘리트: 다이아몬드 몸통 위 내부 코어 (깊이감)
      const s = def.size;
      g.appendChild(svgEl('polygon', {
        points: `0,${-(s * 0.4).toFixed(1)} ${(s * 0.28).toFixed(1)},0 0,${(s * 0.4).toFixed(1)} ${-(s * 0.28).toFixed(1)},0`,
        fill: 'rgba(220,180,255,0.55)',
      }));

    // ── 신규 8종 형태 ──────────────────────────────────

    } else if (type === 'goblin') {
      // 고블린: 뾰족한 귀 2개 (작은 삼각형)
      g.appendChild(svgEl('polygon', {
        points: `${-def.size*0.5},${-def.size*0.4} ${-def.size*0.15},${-def.size*0.85} ${-def.size*0.1},${-def.size*0.3}`,
        fill: '#7CB518',
      }));
      g.appendChild(svgEl('polygon', {
        points: `${def.size*0.5},${-def.size*0.4} ${def.size*0.15},${-def.size*0.85} ${def.size*0.1},${-def.size*0.3}`,
        fill: '#7CB518',
      }));

    } else if (type === 'stone_golem' || type === 'juggernaut' || type === 'colossus') {
      // 헥사곤 몸통 위 장갑 크랙 (깊이감)
      const s = def.size;
      g.appendChild(svgEl('line', { x1: 0, y1: -(s * 0.52).toFixed(1), x2: 0, y2: (s * 0.52).toFixed(1),
        stroke: 'rgba(200,200,200,0.3)', 'stroke-width': 1.5, 'pointer-events': 'none' }));
      g.appendChild(svgEl('line', {
        x1: -(s * 0.45).toFixed(1), y1: -(s * 0.26).toFixed(1),
        x2: (s * 0.45).toFixed(1), y2: (s * 0.26).toFixed(1),
        stroke: 'rgba(200,200,200,0.3)', 'stroke-width': 1.5, 'pointer-events': 'none' }));

    } else if (type === 'necromancer') {
      // 다이아몬드 몸통 위 마법 코어
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size * 0.32,
        fill: 'rgba(150,50,200,0.65)' }));

    } else if (type === 'phantom') {
      // 팬텀: 반투명 위로 테이퍼드 다이아몬드
      g.appendChild(svgEl('polygon', {
        points: `0,${-def.size*0.9} ${def.size*0.4},${def.size*0.1} 0,${def.size*0.5} ${-def.size*0.4},${def.size*0.1}`,
        fill: 'rgba(180,140,255,0.35)', stroke: '#C9B1FF', 'stroke-width': 1,
      }));

    } else if (type === 'plague_carrier') {
      // 페스트 캐리어: 원 + 바깥 독 안개 링
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size + 4,
        fill: 'rgba(30,150,60,0.18)', stroke: '#27AE60', 'stroke-width': 1.2,
        'stroke-dasharray': '4 3', opacity: '0.7' }));

    } else if (type === 'siege_beast') {
      // 헥사곤 몸통 위 기계 리벳 (구조물 느낌)
      const rs = def.size * 0.65;
      [0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach(a => {
        g.appendChild(svgEl('circle', {
          cx: +(rs * Math.cos(a)).toFixed(1), cy: +(rs * Math.sin(a)).toFixed(1),
          r: 2.5, fill: 'rgba(200,200,200,0.65)', 'pointer-events': 'none',
        }));
      });

    } else if (type === 'void_stalker') {
      // 다이아몬드 몸통 위 추진 화살표 (방향성)
      const s = def.size;
      g.appendChild(svgEl('polygon', {
        points: `0,${-(s * 0.55).toFixed(1)} ${(s * 0.35).toFixed(1)},${(s * 0.28).toFixed(1)} 0,${(s * 0.08).toFixed(1)} ${-(s * 0.35).toFixed(1)},${(s * 0.28).toFixed(1)}`,
        fill: 'rgba(140,0,220,0.7)',
      }));

    } else if (type === 'shadow_elite') {
      // 다이아몬드 몸통 위 어둠 코어
      const s = def.size;
      g.appendChild(svgEl('polygon', {
        points: `0,${-(s * 0.42).toFixed(1)} ${(s * 0.30).toFixed(1)},0 0,${(s * 0.42).toFixed(1)} ${-(s * 0.30).toFixed(1)},0`,
        fill: 'rgba(0,0,0,0.55)',
      }));

    } else if (type === 'shadow_titan') {
      // 헥사곤 몸통 위 심연 코어 (대형 non-boss)
      const s = def.size;
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: s * 0.45,
        fill: 'rgba(0,0,0,0.6)', stroke: '#4D0080', 'stroke-width': 2 }));

    } else if (type === 'void_knight') {
      // 다이아몬드 몸통 위 방패 마킹
      const s = def.size;
      g.appendChild(svgEl('polygon', {
        points: `0,${-(s * 0.5).toFixed(1)} ${(s * 0.35).toFixed(1)},${-(s * 0.1).toFixed(1)} ${(s * 0.35).toFixed(1)},${(s * 0.25).toFixed(1)} 0,${(s * 0.48).toFixed(1)} ${-(s * 0.35).toFixed(1)},${(s * 0.25).toFixed(1)} ${-(s * 0.35).toFixed(1)},${-(s * 0.1).toFixed(1)}`,
        fill: 'rgba(60,0,180,0.55)',
      }));

    } else if (type === 'abyssal_wraith') {
      // 다이아몬드 몸통 위 에너지 코어
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size * 0.3,
        fill: 'rgba(160,0,220,0.6)' }));

    } else if (type === 'void_reaper') {
      // 다이아몬드 몸통 위 낫 심볼
      const s = def.size;
      g.appendChild(svgEl('line', {
        x1: -(s * 0.3).toFixed(1), y1: -(s * 0.42).toFixed(1),
        x2: (s * 0.3).toFixed(1), y2: (s * 0.18).toFixed(1),
        stroke: 'rgba(120,0,180,0.85)', 'stroke-width': 2.5, 'pointer-events': 'none' }));

    } else if (type === 'void_herald') {
      // 다이아몬드 몸통 위 재생 링 (점선 원)
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size * 0.38,
        fill: 'none', stroke: 'rgba(180,100,255,0.6)', 'stroke-width': 2,
        'stroke-dasharray': '3 2', 'pointer-events': 'none' }));

    } else if (type === 'abyssal_dragon') {
      // DLC1 최종 보스: 전용 일러스트 (심연 드래곤)
      const s = def.size;
      drawBossArt(g, type, s);
      const adLabel = svgEl('text', {
        x: 0, y: -s - 12, 'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: '#9B59B6', 'font-size': '9px',
        'font-family': 'Cinzel, serif', 'font-weight': 'bold',
        'pointer-events': 'none',
        stroke: 'rgba(0,0,0,0.8)', 'stroke-width': '2', 'paint-order': 'stroke',
      });
      adLabel.textContent = 'ABYSSAL DRAGON';
      g.appendChild(adLabel);
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: s + 6,
        fill: 'none', stroke: '#7700CC', 'stroke-width': 2, opacity: '0.4',
        style: 'transform-origin: 0px 0px; animation: bossGlow 1.15s ease-in-out infinite alternate',
      }));
      this._boss = enemy;
      this._ensureBossGlowStyle();

    } else if (type === 'shadow_colossus') {
      // DLC1 Act 4 보스: 전용 일러스트 (그림자 거상)
      const s = def.size;
      drawBossArt(g, type, s);
      const scLabel = svgEl('text', {
        x: 0, y: -s - 12, 'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: '#9B59B6', 'font-size': '9px',
        'font-family': 'Cinzel, serif', 'font-weight': 'bold',
        'pointer-events': 'none',
        stroke: 'rgba(0,0,0,0.8)', 'stroke-width': '2', 'paint-order': 'stroke',
      });
      scLabel.textContent = 'SHADOW COLOSSUS';
      g.appendChild(scLabel);
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: s + 7,
        fill: 'none', stroke: '#6600CC', 'stroke-width': 2.5, opacity: '0.45',
        style: 'transform-origin: 0px 0px; animation: bossGlow 1.1s ease-in-out infinite alternate',
      }));
      this._boss = enemy;
      this._ensureBossGlowStyle();

    } else if (type === 'void_titan') {
      // Void Titan: 전용 일러스트 (심연 거인)
      drawBossArt(g, type, def.size);
      // 이름 라벨
      const vtLabel = svgEl('text', {
        x: 0, y: -def.size - 12,
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: '#9B59B6', 'font-size': '9px',
        'font-family': 'Cinzel, serif', 'font-weight': 'bold',
        'pointer-events': 'none',
        stroke: 'rgba(0,0,0,0.8)', 'stroke-width': '2', 'paint-order': 'stroke',
      });
      vtLabel.textContent = 'VOID TITAN';
      g.appendChild(vtLabel);
      // 외부 글로우
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size + 6,
        fill: 'none', stroke: '#9B59B6', 'stroke-width': 2, opacity: '0.4',
        style: 'transform-origin: 0px 0px; animation: bossGlow 1.2s ease-in-out infinite alternate',
      }));
      this._boss = enemy;
      this._ensureBossGlowStyle();

    } else if (type === 'boss') {
      // 보스: 전용 일러스트 (황금 갑주 기사)
      drawBossArt(g, type, def.size);
      // 보스 이름 레이블
      const label = svgEl('text', {
        x: 0, y: -def.size - 12,
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: '#FFD700', 'font-size': '9px',
        'font-family': 'Cinzel, serif', 'font-weight': 'bold',
        'pointer-events': 'none',
        stroke: 'rgba(0,0,0,0.8)', 'stroke-width': '2', 'paint-order': 'stroke',
      });
      label.textContent = 'IRONCLAD';
      g.appendChild(label);
      // 보스 외곽 글로우 링 (transform-origin: 중심점)
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size + 5,
        fill: 'none', stroke: '#FFD700', 'stroke-width': 2, opacity: '0.5',
        style: 'transform-origin: 0px 0px; animation: bossGlow 1.4s ease-in-out infinite alternate',
      }));
      this._boss = enemy;
      this._ensureBossGlowStyle();

    // ── DLC 2 Solar 적 마킹 ────────────────────────────
    } else if (type === 'solar_ember') {
      // 소형 오렌지 삼각형
      g.appendChild(svgEl('polygon', {
        points: `0,${-def.size*0.85} ${def.size*0.7},${def.size*0.55} ${-def.size*0.7},${def.size*0.55}`,
        fill: 'rgba(255,140,0,0.8)',
      }));

    } else if (type === 'solar_acolyte') {
      // 작은 태양 십자 마킹
      g.appendChild(svgEl('line', { x1: 0, y1: -def.size*0.6, x2: 0, y2: def.size*0.6,
        stroke: 'rgba(245,197,24,0.7)', 'stroke-width': 2 }));
      g.appendChild(svgEl('line', { x1: -def.size*0.6, y1: 0, x2: def.size*0.6, y2: 0,
        stroke: 'rgba(245,197,24,0.7)', 'stroke-width': 2 }));

    } else if (type === 'blinded_crusader') {
      // 눈에 X 마킹 + 황금 갑옷 테두리
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size + 3,
        fill: 'none', stroke: '#B8860B', 'stroke-width': 2, opacity: '0.7' }));
      g.appendChild(svgEl('line', { x1: -def.size*0.35, y1: -def.size*0.2, x2: def.size*0.35, y2: def.size*0.2,
        stroke: '#FF4444', 'stroke-width': 2.5 }));
      g.appendChild(svgEl('line', { x1: def.size*0.35, y1: -def.size*0.2, x2: -def.size*0.35, y2: def.size*0.2,
        stroke: '#FF4444', 'stroke-width': 2.5 }));

    } else if (type === 'solar_zealot') {
      // 다이아몬드 몸통 위 태양 십자 심볼 (엘리트)
      const s = def.size;
      g.appendChild(svgEl('line', { x1: 0, y1: -(s * 0.52).toFixed(1), x2: 0, y2: (s * 0.52).toFixed(1),
        stroke: 'rgba(245,197,24,0.8)', 'stroke-width': 2, 'pointer-events': 'none' }));
      g.appendChild(svgEl('line', {
        x1: -(s * 0.38).toFixed(1), y1: 0, x2: (s * 0.38).toFixed(1), y2: 0,
        stroke: 'rgba(245,197,24,0.8)', 'stroke-width': 2, 'pointer-events': 'none' }));

    } else if (type === 'sun_herald') {
      // 6점 황금 별 + 분열 예고 글로우
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        g.appendChild(svgEl('line', {
          x1: 0, y1: 0,
          x2: (def.size * 0.72 * Math.cos(a)).toFixed(1),
          y2: (def.size * 0.72 * Math.sin(a)).toFixed(1),
          stroke: '#F5C518', 'stroke-width': 2, opacity: '0.85',
        }));
      }
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size * 0.32,
        fill: 'rgba(245,197,24,0.5)' }));

    } else if (type === 'blazing_golem') {
      // 헥사곤 몸통 위 불꽃 코어 (슬로우 면역 골렘)
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: +(def.size * 0.42).toFixed(1),
        fill: 'rgba(232,121,26,0.5)', stroke: '#FF6600', 'stroke-width': 1.5,
        'pointer-events': 'none' }));

    } else if (type === 'solar_knight') {
      // 방패 + Solar 테두리 (쉴드 + solarImmune)
      const shieldK = svgEl('circle', {
        cx: 0, cy: 0, r: def.size + 5,
        fill: 'rgba(218,165,32,0.10)', stroke: '#DAA520', 'stroke-width': 2.5, opacity: '0.85',
      });
      g.appendChild(shieldK);
      enemy.shieldEl = shieldK;
      g.appendChild(svgEl('polygon', {
        points: `0,${-def.size*0.55} ${def.size*0.4},${-def.size*0.1} ${def.size*0.4},${def.size*0.3} 0,${def.size*0.6} ${-def.size*0.4},${def.size*0.3} ${-def.size*0.4},${-def.size*0.1}`,
        fill: 'rgba(218,165,32,0.6)',
      }));

    } else if (type === 'sunfire_dancer') {
      // 빠른 화살표 마킹 (속도감)
      g.appendChild(svgEl('polygon', {
        points: `0,${-def.size*0.85} ${def.size*0.5},${def.size*0.4} 0,${def.size*0.2} ${-def.size*0.5},${def.size*0.4}`,
        fill: 'rgba(255,69,0,0.6)',
      }));

    } else if (type === 'gilded_titan') {
      // 황금 왕관 + 분열 예고 (대형 탱커)
      const gs = def.size;
      const hexPts3 = Array.from({length: 6}, (_, i) => {
        const a = (i * Math.PI / 3) + Math.PI / 6;
        return `${(gs*0.65*Math.cos(a)).toFixed(1)},${(gs*0.65*Math.sin(a)).toFixed(1)}`;
      }).join(' ');
      g.appendChild(svgEl('polygon', {
        points: hexPts3,
        fill: 'none', stroke: '#CD7F32', 'stroke-width': 2.5,
      }));
      g.appendChild(svgEl('polygon', {
        points: `0,${-gs*0.45} ${gs*0.28},${-gs*0.1} ${-gs*0.28},${-gs*0.1}`,
        fill: '#FFD700',
      }));

    } else if (type === 'solar_herald') {
      // 재생형 정예: 마름모 + 빛의 코어
      g.appendChild(svgEl('polygon', {
        points: `0,${-def.size*0.72} ${def.size*0.52},0 0,${def.size*0.72} ${-def.size*0.52},0`,
        fill: 'none', stroke: '#FFD700', 'stroke-width': 2, opacity: '0.9',
      }));
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size * 0.32,
        fill: 'rgba(255,215,0,0.55)' }));

    } else if (type === 'solar_titan') {
      // 중간 보스급: 전용 일러스트 (태양 거병)
      drawBossArt(g, type, def.size);
      const stLabel = svgEl('text', {
        x: 0, y: -def.size - 12,
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: '#E8791A', 'font-size': '9px',
        'font-family': 'Cinzel, serif', 'font-weight': 'bold',
        'pointer-events': 'none',
        stroke: 'rgba(0,0,0,0.8)', 'stroke-width': '2', 'paint-order': 'stroke',
      });
      stLabel.textContent = 'SOLAR TITAN';
      g.appendChild(stLabel);
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size + 6,
        fill: 'none', stroke: '#E8791A', 'stroke-width': 2, opacity: '0.35',
        style: 'transform-origin: 0px 0px; animation: bossGlow 1.3s ease-in-out infinite alternate',
      }));
      this._ensureBossGlowStyle();

    } else if (type === 'sun_god') {
      // 최종 보스: 전용 일러스트 (태양신)
      drawBossArt(g, type, def.size);
      const sgLabel = svgEl('text', {
        x: 0, y: -def.size - 14,
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: '#F5C518', 'font-size': '10px',
        'font-family': 'Cinzel, serif', 'font-weight': 'bold',
        'pointer-events': 'none',
        stroke: 'rgba(0,0,0,0.9)', 'stroke-width': '2', 'paint-order': 'stroke',
      });
      sgLabel.textContent = 'SUN GOD';
      g.appendChild(sgLabel);
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size + 8,
        fill: 'none', stroke: '#F5C518', 'stroke-width': 2.5, opacity: '0.5',
        style: 'transform-origin: 0px 0px; animation: bossGlow 1.0s ease-in-out infinite alternate',
      }));
      this._boss = enemy;
      this._ensureBossGlowStyle();

    } else if (type === 'typhoon_warlord') {
      // DLC3 중간보스: 전용 일러스트 (태풍 군주)
      drawBossArt(g, type, def.size);
      const twLabel = svgEl('text', {
        x: 0, y: -def.size - 12,
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: '#48CAE4', 'font-size': '9px',
        'font-family': 'Cinzel, serif', 'font-weight': 'bold',
        'pointer-events': 'none',
        stroke: 'rgba(0,0,0,0.8)', 'stroke-width': '2', 'paint-order': 'stroke',
      });
      twLabel.textContent = 'TYPHOON WARLORD';
      g.appendChild(twLabel);
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size + 6,
        fill: 'none', stroke: '#48CAE4', 'stroke-width': 2, opacity: '0.4',
        style: 'transform-origin: 0px 0px; animation: bossGlow 1.2s ease-in-out infinite alternate',
      }));
      this._ensureBossGlowStyle();

    } else if (type === 'tempest_sovereign') {
      // DLC3 최종보스: 전용 일러스트 (폭풍 군주)
      drawBossArt(g, type, def.size);
      const tsLabel = svgEl('text', {
        x: 0, y: -def.size - 14,
        'text-anchor': 'middle', 'dominant-baseline': 'middle',
        fill: '#4ECDC4', 'font-size': '10px',
        'font-family': 'Cinzel, serif', 'font-weight': 'bold',
        'pointer-events': 'none',
        stroke: 'rgba(0,0,0,0.9)', 'stroke-width': '2', 'paint-order': 'stroke',
      });
      tsLabel.textContent = 'TEMPEST SOVEREIGN';
      g.appendChild(tsLabel);
      g.appendChild(svgEl('circle', { cx: 0, cy: 0, r: def.size + 8,
        fill: 'none', stroke: '#4ECDC4', 'stroke-width': 2.5, opacity: '0.45',
        style: 'transform-origin: 0px 0px; animation: bossGlow 1.1s ease-in-out infinite alternate',
      }));
      this._boss = enemy;
      this._ensureBossGlowStyle();
    }

    // 캐릭터 디테일 (눈 + 아이들 애니메이션) — HP 바 아래 레이어에 추가
    this._addCharacterDetails(g, type, def);

    // HP 바 배경
    const hpBg = svgEl('rect', {
      x: -def.size, y: -def.size - 7,
      width: def.size * 2, height: 4,
      fill: '#1a1a1a', rx: 2,
    });
    g.appendChild(hpBg);

    // HP 바
    const hpBar = svgEl('rect', {
      x: -def.size, y: -def.size - 7,
      width: def.size * 2, height: 4,
      fill: '#2ecc71', rx: 2,
    });
    g.appendChild(hpBar);

    // 상태이상 뱃지 컨테이너 (HP 바 위)
    const badgesEl = svgEl('g', { class: 'status-badges' });
    g.appendChild(badgesEl);

    // 비행 적: 날개 + 공중 부유 오프셋 (translateY -4px)
    this._ensureWings(g, enemy, def);
    g.setAttribute('transform', `translate(${start.x},${start.y})`);
    this.layer.appendChild(g);
    enemy.el = g;
    enemy.hpBar = hpBar;
    enemy.badgesEl = badgesEl;
    enemy._statusKey = '';
    this.enemies.push(enemy);
  }

  // HP 바만 갱신 (regen 등에서 사용)
  _updateHpBar(e) {
    if (!e.hpBar) return;
    const ratio = Math.max(0, e.hp / e.maxHp);
    e.hpBar.setAttribute('width', (e.size * 2 * ratio).toFixed(1));
    e.hpBar.setAttribute('fill', ratio > 0.5 ? '#2ecc71' : ratio > 0.25 ? '#f39c12' : '#e74c3c');
  }

  _refreshStatusBadges(e) {
    if (!e.badgesEl) return;
    const badges = [];
    if ((e.burns?.length ?? 0) > 0)      badges.push({ fill: '#FF8C00', icon: '🔥' }); // 🔥
    if (e.slowTimer > 0)                 badges.push({ fill: '#7EC8E3', icon: '❅' });        // ❅
    if ((e.solarDots?.length ?? 0) > 0)  badges.push({ fill: '#F5C518', icon: '★' });        // ★
    if (e.stunned > 0)                   badges.push({ fill: '#FFD700', icon: '✶' });        // ✶
    if (e.frozen > 0)                    badges.push({ fill: '#B0E0FF', icon: '✳' });        // ✳

    const key = badges.map(b => b.icon).join('');
    if (key === e._statusKey) return;
    e._statusKey = key;

    while (e.badgesEl.firstChild) e.badgesEl.removeChild(e.badgesEl.firstChild);
    const y = -e.size - 13;
    badges.forEach((b, i) => {
      const x = (i - (badges.length - 1) / 2) * 11;
      const circ = svgEl('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: '5', fill: b.fill, opacity: '0.92' });
      const txt  = svgEl('text', {
        x: x.toFixed(1), y: y.toFixed(1),
        'text-anchor': 'middle', 'dominant-baseline': 'central',
        'font-size': '6', 'pointer-events': 'none',
      });
      txt.textContent = b.icon;
      e.badgesEl.appendChild(circ);
      e.badgesEl.appendChild(txt);
    });
  }

  _updateEnemySVG(e) {
    if (!e.el) return;
    const flyOff = e._flyOffset ?? 0;
    if (flyOff !== 0) {
      e.el.setAttribute('transform', `translate(${e.x.toFixed(1)},${(e.y + flyOff).toFixed(1)})`);
    } else {
      e.el.setAttribute('transform', `translate(${e.x.toFixed(1)},${e.y.toFixed(1)})`);
    }
    this._updateHpBar(e);
    this._refreshStatusBadges(e);

    if (e.bodyEl) {
      const wantFill = e.slowTimer > 0 ? '#7EC8E3' : e.color;
      if (e._cachedFill !== wantFill) { e.bodyEl.setAttribute('fill', wantFill); e._cachedFill = wantFill; }

      // 격노 임박 경보: dirty flag — 상태 변화 시에만 DOM 업데이트
      const wantEnrage = e._enrageImminent && !e.enraged;
      if (wantEnrage !== e._cachedEnrageImminent) {
        e._cachedEnrageImminent = wantEnrage;
        if (wantEnrage) {
          e.bodyEl.setAttribute('stroke', '#FF8C00');
          e.bodyEl.setAttribute('stroke-width', '2.5');
          e.bodyEl.classList.add('enrage-imminent');
        } else {
          e.bodyEl.setAttribute('stroke', 'none');
          e.bodyEl.classList.remove('enrage-imminent');
        }
      }
    }
  }

  _handleSplitOnDeath(e) {
    const split = e.splitOnDeath ?? (e.phase3 ? { type: 'solar_ember', count: 8 } : null);
    if (!split) return;
    audio.play('enemy_split');
    for (let i = 0; i < split.count; i++) {
      this._spawnAt(split.type, e.x, e.y, e.waypointIndex, { isSplitChild: true });
    }
  }

  _spawnAt(type, x, y, waypointIndex, options = {}) {
    this._spawn(type);
    const e = this.enemies[this.enemies.length - 1];
    if (e && e.type === type) {
      e.x = x; e.y = y; e.waypointIndex = Math.max(1, waypointIndex);
      if (options.isSplitChild) { e.isSplitChild = true; e.reward = 0; }
    }
  }

  // 적을 틱 종료 제거 큐에 등록하고 사망 사운드를 즉시 재생
  _queueDeath(e) {
    if (this._pendingRemove.has(e.id)) return;
    this._pendingRemove.add(e.id);
    if (e.isBoss) {
      this._boss = null;
      this.onBossUpdate?.({ hp: 0, maxHp: e.maxHp });
      audio.play('boss_die');
      this._triggerScreenShake?.();
    } else if (e.type === 'tank' || e.isElite) {
      audio.play(e.isElite ? 'elite_die' : 'tank_die');
    } else {
      audio.play('enemy_die');
    }
  }

  _removeEnemy(e, withAnim = true) {
    this.enemies = this.enemies.filter(x => x.id !== e.id);
    e.windDots = null;

    if (!e.el) return;

    if (withAnim) {
      this._dying.add(e.id);
      this._playDeathAnim(e);
    } else if (this._canPool(ENEMY_DEFS[e.type] ?? {})) {
      this._poolReturn(e.el, e.type, e.bodyEl, e.hpBar, e.badgesEl);
    } else {
      e.el.remove();
    }
  }

  // ── 사망 애니메이션 ───────────────────────────────────
  _playDeathAnim(e) {
    const el = e.el;
    if (!el) return;

    const cx = e.x, cy = e.y;

    // 원소별 파티클 색상 팔레트
    const ELEMENT_COLORS = {
      fire:      ['#FF8C00', '#FF4500', '#FFD700'],
      frost:     ['#7EC8E3', '#B0E0FF', '#DDEEFF'],
      lightning: ['#FFD700', '#00FFFF', '#FFFFFF'],
      shadow:    ['#9B59B6', '#7D3C98', '#D7BDE2'],
      solar:     ['#F5C518', '#E8791A', '#FFF3CD'],
    };
    const palette = ELEMENT_COLORS[e._killingElement] ?? null;

    // 1) 몸통 팽창 후 소멸
    el.style.transformOrigin = `${cx}px ${cy}px`;
    el.style.animation = 'enemyDeath 0.4s ease-out forwards';

    // 2) 방향성 파티클 — CSS custom properties로 translate 방향 지정
    const isBig = e.isElite || e.isBoss;
    const count = isBig ? (8 + Math.floor(Math.random() * 4)) : (6 + Math.floor(Math.random() * 3));
    const particleDur = isBig ? 0.62 : 0.48;
    const anim = isBig ? 'deathParticleElite' : 'deathParticle';
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
      const dist  = e.size * (2.2 + Math.random() * 2.5);
      const dx    = (Math.cos(angle) * dist).toFixed(1);
      const dy    = (Math.sin(angle) * dist).toFixed(1);
      const r     = (isBig ? 3.5 : 2.0) + Math.random() * (isBig ? 3.0 : 2.2);
      const fill  = palette ? palette[i % palette.length] : e.color;

      const pid = `particle-${this._idCounter}-${i}`;
      const particle = svgEl('circle', {
        id: pid, cx: cx.toFixed(1), cy: cy.toFixed(1), r: r.toFixed(1),
        fill, opacity: 0.9,
        'pointer-events': 'none',
        style: `--dx:${dx}px;--dy:${dy}px;animation:${anim} ${particleDur}s ease-out forwards`,
      });
      this.layer.appendChild(particle);
      setTimeout(() => document.getElementById(pid)?.remove(), Math.round(particleDur * 1000) + 10);
    }
    // 보스/엘리트 사망 시 큰 방사형 플래시
    if (isBig) this._spawnImpactFlash(cx, cy, e.color, true);
    // 보스 사망 시 화면 플래시 + 라벨 팝
    if (e.isBoss) this._bossSlainfanfare(cx, cy, e);

    // 3) 정리 — 풀 가능한 타입은 반환, 아니면 제거
    const { type, bodyEl, hpBar, badgesEl } = e;
    const canPool = this._canPool(ENEMY_DEFS[type] ?? {});
    setTimeout(() => {
      if (canPool) {
        this._poolReturn(el, type, bodyEl, hpBar, badgesEl);
      } else {
        el.remove();
      }
      this._dying.delete(e.id);
    }, 400);
  }

  // ── 보스 처치 연출 (화면 플래시 + SLAIN 팝업) ────────────
  _bossSlainfanfare(cx, cy, e) {
    // 화면 전체 밝은 플래시
    const app = document.getElementById('app');
    if (app) {
      app.classList.remove('boss-slain');
      void app.offsetWidth; // reflow to restart animation
      app.classList.add('boss-slain');
      setTimeout(() => app.classList.remove('boss-slain'), 650);
    }

    // SLAIN 텍스트 팝
    const label = svgEl('text', {
      x: cx.toFixed(1),
      y: (cy - 28).toFixed(1),
      'text-anchor': 'middle',
      'dominant-baseline': 'central',
      fill: e.color ?? '#FFD700',
      stroke: '#000',
      'stroke-width': '2',
      'paint-order': 'stroke',
      'font-family': 'Cinzel, serif',
      'font-size': '14px',
      'font-weight': '700',
      'letter-spacing': '0.12em',
      'pointer-events': 'none',
      style: 'animation: dmgFloat 1.1s ease-out forwards',
    });
    label.textContent = 'SLAIN';
    this.layer.appendChild(label);
    setTimeout(() => label.remove(), 1150);
  }

  // ── 피격 플래시 ───────────────────────────────────────
  _hitFlash(e) {
    if (!e.el) return;
    e.el.style.animation = 'hitFlash 0.12s ease-out';
    setTimeout(() => { if (e.el) e.el.style.animation = ''; }, 120);
  }

  // ── 떠오르는 데미지 숫자 (SVG) ────────────────────────
  _spawnDamageNumber(x, y, amount, type = 'normal') {
    if (!this.layer?.ownerSVGElement) return;
    const svg = this.layer.ownerSVGElement;
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', String(x));
    text.setAttribute('y', String(y - 8));
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '11');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('pointer-events', 'none');
    const color = type === 'boss' ? '#FF6600' : type === 'crit' ? '#FFD700' : '#FFFFFF';
    text.setAttribute('fill', color);
    text.setAttribute('stroke', 'rgba(0,0,0,0.6)');
    text.setAttribute('stroke-width', '2');
    text.setAttribute('paint-order', 'stroke');
    text.textContent = String(Math.round(amount));
    text.classList.add('dmg-float');
    svg.appendChild(text);
    setTimeout(() => text.remove(), 900);
  }

  // ── 피해 처리 ─────────────────────────────────────────
  setBossWeakness(type) {
    this._upcomingBossWeakness = type ?? null;
  }

  dealDamage(enemyId, amount, dmgType = null) {
    if (this._pendingRemove.has(enemyId)) return false; // 이미 처치 큐에 있음
    const e = this.enemies.find(x => x.id === enemyId);
    if (!e) return false;

    // 피해 감소 (Plague Carrier, Phantom 등)
    let finalDmg = e.damageReduction > 0
      ? Math.max(1, Math.round(amount * (1 - e.damageReduction)))
      : amount;

    // 보스 약점: 해당 속성으로 +50% 피해
    if (e.isBoss && e.weakness && dmgType && e.weakness === dmgType) {
      finalDmg = Math.round(finalDmg * 1.5);
    }

    // Ironclad: 주기적 충격 방어막 — 피격 시 미활성이면 0.8s 방어막 생성 (60% 피해 감소)
    if (e.name === 'Ironclad') {
      if (e.ironShielding > 0) {
        finalDmg = Math.max(1, Math.round(finalDmg * 0.40));
      } else if (e.ironShieldCd <= 0) {
        e.ironShielding = 800;
        e.ironShieldCd  = 3500;
        e.el?.classList.add('boss-shielding');
      }
    }

    // 실드 적: 피해 추가 50% 감소 (피해 감소 이후 적용), 실드 히트 차감
    if (e.shieldHits > 0) {
      finalDmg = Math.max(1, Math.round(finalDmg * 0.5));
      e.shieldHits--;
      if (e.shieldHits <= 0) {
        // 실드 파괴
        e.shieldEl?.remove(); e.shieldEl = null;
        this._spawnSplashEffect(e.x, e.y, '#5DADE2');
      }
    }

    e.hp -= finalDmg;
    this._hitFlash(e);
    // QW#3: 타격 위치 임팩트 플래시 (보스는 자체 splash 있으므로 제외)
    if (!e.isBoss) this._spawnImpactFlash(e.x, e.y, e.color);

    // 격노 메커닉: berserker(40%) + shadow_elite(60%) + void_stalker(50%) + colossus(35%)
    const enrageThreshold = e.enrageThreshold ?? (e.type === 'berserker' ? 0.4 : null);
    // 격노 임박 경보 (HP가 임계값 +15% 이내)
    if (enrageThreshold && !e.enraged) {
      const wasImminent = e._enrageImminent;
      e._enrageImminent = (e.hp / e.maxHp) <= (enrageThreshold + 0.15);
      if (e._enrageImminent && !wasImminent) {
        this.onEnrageImminent?.(e);
      }
    }
    if (enrageThreshold && !e.enraged && e.hp <= e.maxHp * enrageThreshold) {
      e.enraged = true;
      e.speed   = e.baseSpeed * (this._enrageMult ?? 1.8);
      const enrageColor = {
        shadow_elite: '#CC00FF',
        void_stalker: '#AA00FF',
        colossus:     '#FF4400',
      }[e.type] ?? '#FF2200';
      if (e.bodyEl) e.bodyEl.setAttribute('fill', enrageColor);
      // QW#2: 격노 Rim Glow — CSS 클래스 + 커스텀 컬러 변수
      if (e.el) {
        e.el.style.setProperty('--enrage-glow', enrageColor);
        e.el.classList.add('enemy-enraged');
      }
    }

    // Abyssal Dragon 2페이즈: Veteran에서 HP 60% 이하 조기 전환, 속도 1.9배
    const dragonPhase2Threshold = this._bossHpScale > 1 ? 0.6 : 0.5;
    const dragonPhase2SpeedMult = this._bossHpScale > 1 ? 1.9 : 1.6;
    if (e.type === 'abyssal_dragon' && !e.phase2 && e.hp <= e.maxHp * dragonPhase2Threshold) {
      e.phase2 = true;
      e.speed  = e.baseSpeed * dragonPhase2SpeedMult;
      if (e.bodyEl) {
        e.bodyEl.setAttribute('fill', '#5500AA');
        e.bodyEl.setAttribute('stroke', '#FF00FF');
      }
      // QW#2: 페이즈2 전환 Rim Glow
      e.el?.classList.add('enemy-phase2');
      this.onBossUpdate?.({ hp: Math.max(0, e.hp), maxHp: e.maxHp, name: e.name, phase2: true });
      audio.play('boss_warning');
    }

    // Sun God 2페이즈 (HP 50% 이하): 주황 색상, 속도 ×1.6, Solar Ember 6마리 즉시 스폰
    if (e.type === 'sun_god' && !e.phase2 && e.hp <= e.maxHp * 0.5) {
      e.phase2 = true;
      e.speed  = e.baseSpeed * 1.6;
      if (e.bodyEl) { e.bodyEl.setAttribute('fill', '#E8791A'); e.bodyEl.setAttribute('stroke', '#FF6600'); }
      e.el?.classList.add('enemy-phase2');
      this.onBossUpdate?.({ hp: Math.max(0, e.hp), maxHp: e.maxHp, name: e.name, phase2: true });
      audio.play('boss_warning');
      for (let i = 0; i < 6; i++) setTimeout(() => this._spawnAt('solar_ember', e.x, e.y, e.waypointIndex), i * 120);
    }

    // Sun God 3페이즈 (HP 40% 이하): 붉은 금 색상, 속도 ×1.9, 슬로우 저항 50%, 사망 시 Ember 8마리
    if (e.type === 'sun_god' && e.phase2 && !e.phase3 && e.hp <= e.maxHp * 0.40) {
      e.phase3 = true;
      e.speed  = e.baseSpeed * 1.9;
      e.slowResist = 0.50;
      if (e.bodyEl) { e.bodyEl.setAttribute('fill', '#C9372A'); e.bodyEl.setAttribute('stroke', '#FF2200'); }
      this.onBossUpdate?.({ hp: Math.max(0, e.hp), maxHp: e.maxHp, name: e.name, phase3: true });
    }

    // Tempest Sovereign 2페이즈 전환 (HP phase2Hp 이하): 착지 + 슬로우 면역 + 속도 28
    if (e.def?.id === 'tempest_sovereign' && !e._phase2 && e.hp <= (e.def.phase2Hp ?? 2000)) {
      e._phase2 = true;
      e.def = { ...e.def, flying: false };
      // 착지 자연 전환 — grounded Set에서 제거 (비행 상태 해제이므로)
      this._groundedSet.delete(e.id);
      e._flyOffset = 0;
      e.slowImmune = true;
      e.damageReduction = 0.10;
      e.enrageThreshold = 0.35;
      e.baseSpeed = 28;
      e.speed = 28;
      if (e.bodyEl) { e.bodyEl.setAttribute('fill', '#023E8A'); e.bodyEl.setAttribute('stroke', '#00B4D8'); }
      e.el?.classList.add('enemy-phase2');
      this.onBossUpdate?.({ hp: Math.max(0, e.hp), maxHp: e.maxHp, name: e.name, phase2: true });
      if (this.onBossPhaseTransition) this.onBossPhaseTransition(e.id, 2);
      audio.play('boss_warning');
    }

    const dmgDisplayType = e.isBoss ? 'boss' : finalDmg >= 20 ? 'crit' : 'normal';
    this._spawnDamageNumber(e.x, e.y, finalDmg, dmgDisplayType);

    // 보스 HP 갱신 알림 + 보스 피격 사운드
    if (e.isBoss) {
      this.onBossUpdate?.({ hp: Math.max(0, e.hp), maxHp: e.maxHp, name: e.name, weakness: e.weakness });
      audio.play('boss_hit');
    }

    if (e.hp <= 0) {
      e._killingElement = dmgType;
      // Cursed Wave 'revive': 엘리트 처치 시 HP 30%로 1회 부활 (즉시 — 큐 등록 전)
      if (this._cursedWaveRevive && e.isElite && !e._revived && !e.isSplitChild) {
        e.hp      = Math.ceil(e.maxHp * 0.30);
        e._revived = true;
        audio.play('elite_die');
        return false;
      }
      this._queueDeath(e);
      return true;
    }
    // 적이 살아있고 보스가 아닌 경우 피격음 (보스는 boss_hit으로 처리)
    if (!e.isBoss) audio.play('enemy_hit');
    return false;
  }

  dealDamageToAll(amount, dmgType = null) {
    for (const e of [...this.enemies]) this.dealDamage(e.id, amount, dmgType);
  }

  // N명의 무작위 적에게 피해
  dealDamageToRandom(count, amount, dmgType = null) {
    const targets = [...this.enemies].sort(() => Math.random() - 0.5).slice(0, count);
    for (const e of targets) this.dealDamage(e.id, amount, dmgType);
  }

  // 선두(가장 앞선) 적에게 피해 — filterCamo: true 시 위장 적 제외 (주문 효과 등)
  dealDamageToLead(amount, dmgType = null, filterCamo = false) {
    if (!this.enemies.length) return;
    const candidates = filterCamo ? this.enemies.filter(e => !e.camo) : this.enemies;
    if (!candidates.length) return;
    const lead = candidates.reduce((best, e) =>
      e.waypointIndex > best.waypointIndex ? e : best, candidates[0]);
    this.dealDamage(lead.id, amount, dmgType);
    return lead;
  }

  freezeAll(duration) {
    for (const e of this.enemies) e.frozen = duration;
  }

  // Void Rift: 모든 적을 스폰 지점으로 순간이동
  teleportToStart() {
    const start = WAYPOINTS[0];
    if (!start) return;
    for (const e of this.enemies) {
      if (e.isBoss) continue;
      e.x = start.x;
      e.y = start.y;
      e.waypointIndex = 1;
      if (e.el) e.el.setAttribute('transform', `translate(${e.x},${e.y})`);
    }
  }

  // Void Pulse: 특정 적을 경로 위에서 N 웨이포인트 뒤로 밀어냄
  pushBack(enemyId, steps) {
    const e = this.enemies.find(x => x.id === enemyId);
    if (!e || e.isBoss) return;
    const newWpIdx = Math.max(1, e.waypointIndex - steps);
    const target   = WAYPOINTS[newWpIdx - 1] ?? WAYPOINTS[0];
    e.waypointIndex = newWpIdx;
    e.x = target.x;
    e.y = target.y;
    if (e.el) e.el.setAttribute('transform', `translate(${e.x},${e.y})`);
  }

  // 전체 감속 (빙결이 아닌 슬로우)
  slowAll(amount, duration) {
    const boosted = Math.min(0.95, amount * this._slowBonus);
    for (const e of this.enemies) {
      if (e.slowImmune) continue;
      let eff = boosted;
      if (e.type === 'abyssal_dragon' && e.phase2) {
        // Phase 2 frost resistance ramps from 0% → 70% over 8 seconds
        const rampFraction = Math.min(1, (e.phase2ElapsedMs ?? 0) / 8000);
        eff = boosted * (1 - rampFraction * 0.70);
      }
      // Sun God Phase 3: 50% slow resistance
      if (e.slowResist) eff = eff * (1 - e.slowResist);
      if (eff < 0.01) continue;
      e.slowAmt   = Math.max(e.slowAmt, eff);
      e.slowTimer = Math.max(e.slowTimer, duration);
      // 비행 적: 슬로우 50%(또는 완화 임계값) 이상이면 grounding 적용
      const slowMult = 1 - eff;
      const groundingThreshold = this._groundingSlowThreshold ?? 0.5;
      if (e.def?.flying && slowMult <= groundingThreshold) {
        this.applyGrounding(e.id, duration);
      }
    }
  }

  applySlow(enemyId, amount, duration) {
    const e = this.enemies.find(x => x.id === enemyId);
    if (!e || e.slowImmune) return;
    let effective = amount;
    if (e.type === 'abyssal_dragon' && e.phase2) {
      // Phase 2 frost resistance ramps from 0% → 70% over 8 seconds
      const rampFraction = Math.min(1, (e.phase2ElapsedMs ?? 0) / 8000);
      effective = amount * (1 - rampFraction * 0.70);
    }
    // Sun God Phase 3: 50% slow resistance
    if (e.slowResist) effective = effective * (1 - e.slowResist);
    if (effective < 0.01) return;
    const boosted = Math.min(0.95, effective * this._slowBonus);
    e.slowAmt = boosted; e.slowTimer = duration;
    // 비행 적: 슬로우 50%(또는 완화 임계값) 이상이면 grounding 적용
    const slowMult = 1 - boosted;
    const groundingThreshold = this._groundingSlowThreshold ?? 0.5;
    if (e.def?.flying && slowMult <= groundingThreshold) {
      this.applyGrounding(e.id, duration);
    }
  }

  // 번(DoT) 적용
  applyBurn(enemyId, dps, duration) {
    const e = this.enemies.find(x => x.id === enemyId);
    if (!e) return;
    // Ember Core 유물 보너스 반영
    const boostedDps      = dps      + (this._burnExtraDps      ?? 0);
    const boostedDuration = duration + (this._burnExtraDuration ?? 0);
    // 기존 번 스택 갱신 또는 새 스택 추가 (최대 3스택)
    if (e.burns.length < 3) {
      e.burns.push({ dps: boostedDps, remaining: boostedDuration, tickTimer: 350 });
    } else {
      e.burns[0] = { dps: boostedDps, remaining: boostedDuration, tickTimer: 350 };
    }
    // 불꽃 색으로 몸통 표시
    if (e.bodyEl) e.bodyEl.setAttribute('fill', '#FF8C00');
  }

  // Solar DoT 적용 (solarImmune 적에게는 적용 안 됨)
  applySolarDot(enemyId, dps, duration) {
    const e = this.enemies.find(x => x.id === enemyId);
    if (!e || e.solarImmune) return;
    const boostedDps      = dps      + (this._solarDotExtraDps      ?? 0);
    const boostedDuration = duration + (this._solarDotExtraDuration ?? 0);
    if (e.solarDots.length < 3) {
      e.solarDots.push({ dps: boostedDps, remaining: boostedDuration, tickTimer: 350 });
    } else {
      e.solarDots[0] = { dps: boostedDps, remaining: boostedDuration, tickTimer: 350 };
    }
    if (e.bodyEl) e.bodyEl.setAttribute('fill', '#F5A623');
  }

  // 전체 적에게 Solar DoT 적용 (solar_dot_all 주문)
  applySolarDotAll(dps, duration) {
    for (const e of [...this.enemies]) this.applySolarDot(e.id, dps, duration);
  }

  setSolarDotBonus(extraDps, extraDuration) {
    this._solarDotExtraDps      = (this._solarDotExtraDps      ?? 0) + extraDps;
    this._solarDotExtraDuration = (this._solarDotExtraDuration ?? 0) + extraDuration;
  }

  // ── DLC 3 Storm Imperium ──────────────────────────────
  // grounding_amulet 유물 등으로 임계값 완화 (기본 0.5 → 0.65 등)
  setGroundingThreshold(val) { this._groundingSlowThreshold = val; }

  // ── 비행 적 날개 SVG (생성/풀 재사용 공용) ────────────
  _ensureWings(g, enemy, def) {
    let wings = g.querySelector('.fly-wings');
    if (!def.flying) { wings?.remove(); return; }
    this._ensureWingStyle();
    if (!wings) {
      const s = def.size;
      wings = svgEl('g', { class: 'fly-wings', 'pointer-events': 'none' });
      const wingAttrs = {
        fill: 'rgba(255,255,255,0.28)',
        stroke: 'rgba(255,255,255,0.55)',
        'stroke-width': 0.8,
      };
      wings.appendChild(svgEl('path', {
        class: 'fly-wing fly-wing-l',
        d: `M ${(-s * 0.4).toFixed(1)} ${(-s * 0.1).toFixed(1)} Q ${(-s * 1.6).toFixed(1)} ${(-s * 1.15).toFixed(1)} ${(-s * 1.95).toFixed(1)} ${(-s * 0.3).toFixed(1)} Q ${(-s * 1.3).toFixed(1)} ${(s * 0.18).toFixed(1)} ${(-s * 0.45).toFixed(1)} ${(s * 0.24).toFixed(1)} Z`,
        ...wingAttrs,
      }));
      wings.appendChild(svgEl('path', {
        class: 'fly-wing fly-wing-r',
        d: `M ${(s * 0.4).toFixed(1)} ${(-s * 0.1).toFixed(1)} Q ${(s * 1.6).toFixed(1)} ${(-s * 1.15).toFixed(1)} ${(s * 1.95).toFixed(1)} ${(-s * 0.3).toFixed(1)} Q ${(s * 1.3).toFixed(1)} ${(s * 0.18).toFixed(1)} ${(s * 0.45).toFixed(1)} ${(s * 0.24).toFixed(1)} Z`,
        ...wingAttrs,
      }));
      g.insertBefore(wings, g.firstChild);   // 몸통·그림자 뒤 레이어
    }
    wings.classList.remove('wings-grounded');
    enemy.wingsEl = wings;
    enemy._flyOffset = -4;
  }

  _ensureWingStyle() {
    if (document.getElementById('fly-wing-style')) return;
    const s = document.createElement('style');
    s.id = 'fly-wing-style';
    s.textContent = `
      @keyframes wingFlapL { 0%,100% { transform: rotate(9deg);  } 50% { transform: rotate(-17deg); } }
      @keyframes wingFlapR { 0%,100% { transform: rotate(-9deg); } 50% { transform: rotate(17deg);  } }
      .fly-wing   { transform-box: fill-box; }
      .fly-wing-l { transform-origin: 100% 55%; animation: wingFlapL 0.55s ease-in-out infinite; }
      .fly-wing-r { transform-origin: 0% 55%;   animation: wingFlapR 0.55s ease-in-out infinite; }
      .fly-wings.wings-grounded .fly-wing {
        animation-play-state: paused;
        opacity: 0.3;
        transform: scaleY(0.4);
        transition: opacity 0.3s, transform 0.3s;
      }
    `;
    document.head.appendChild(s);
  }

  // 비행 적을 duration ms 동안 착지 상태로 만든다 (타워가 일반 적처럼 타격 가능)
  applyGrounding(id, duration) {
    const e = this.enemies.find(en => en.id === id);
    if (!e || !e.def?.flying) return;
    if (!this._groundedSet.has(id)) {
      this._groundedSet.add(id);
      // grounding 진입 시 SVG 부드럽게 착지 + 날개 접힘
      if (e.el) {
        e.el.style.transition = 'transform 0.3s';
        // translateY를 포함한 전체 transform은 _updateEnemySVG가 관리하므로
        // flying 오프셋용 커스텀 속성만 기록
        e._flyOffset = 0;
      }
      e.wingsEl?.classList.add('wings-grounded');
      if (this.onEnemyGrounded) this.onEnemyGrounded(id);
    }
    clearTimeout(e._groundingTimer);
    e._groundingTimer = setTimeout(() => {
      this._groundedSet.delete(id);
      e._groundingTimer = null;
      // 착지 해제: 다시 공중으로 + 날개 펼침
      if (e.el) {
        e.el.style.transition = 'transform 0.3s';
        e._flyOffset = -4;
      }
      e.wingsEl?.classList.remove('wings-grounded');
    }, duration);
  }

  // Wind DoT 적용 (windImmune 적에게는 적용 안 됨)
  applyWindDot(id, dps, dur) {
    const e = this.enemies.find(en => en.id === id);
    if (!e || e.def?.windImmune || this._pendingRemove.has(id)) return;
    if (!e.windDots) e.windDots = [];
    e.windDots.push({ dps, remaining: dur });
  }

  _updateSolarDots(e, delta) {
    let totalDmg = 0;
    for (const dot of e.solarDots) {
      dot.remaining -= delta;
      dot.tickTimer  -= delta;
      if (dot.tickTimer <= 0) {
        dot.tickTimer = 400;
        totalDmg += Math.max(1, Math.round(dot.dps * 0.4));
      }
    }
    e.solarDots = e.solarDots.filter(d => d.remaining > 0);

    if (totalDmg > 0) {
      e.hp -= totalDmg;
      this._spawnDamageNumber(e.x, e.y, totalDmg, e.isBoss ? 'boss' : 'normal');
      if (e.solarDots.length > 0 && e.bodyEl) {
        e.bodyEl.setAttribute('fill', '#F5A623');
      } else if (e.bodyEl && e.slowTimer <= 0 && e.burns.length === 0) {
        e.bodyEl.setAttribute('fill', e.color);
      }
    }
  }

  // Crusader 스턴 적용
  applyStun(enemyId, duration, towerId) {
    const e = this.enemies.find(x => x.id === enemyId);
    if (!e || e.isBoss) return;
    // 스턴 쿨다운 체크 (같은 타워는 3s 쿨)
    if (towerId && e.stunCooldowns[towerId] > 0) return;
    e.stunned = Math.max(e.stunned, duration);
    if (towerId) e.stunCooldowns[towerId] = 3000;
    // 쿨다운 틱 감소는 update 루프에서 처리
    // 비행 적 스턴 시 grounding 적용
    if (e.stunned > 0 && e.def?.flying) {
      this.applyGrounding(e.id, e.stunned);
    }
  }

  // 스턴 쿨다운 틱 (update 루프에서 주기적으로 호출)
  _tickStunCooldowns(delta) {
    for (const e of this.enemies) {
      for (const tid of Object.keys(e.stunCooldowns ?? {})) {
        e.stunCooldowns[tid] -= delta;
        if (e.stunCooldowns[tid] <= 0) delete e.stunCooldowns[tid];
      }
    }
  }

  // 번 DoT 업데이트 (update 루프에서 호출)
  _updateBurns(e, delta) {
    let totalDmg = 0;
    for (const burn of e.burns) {
      burn.remaining -= delta;
      burn.tickTimer -= delta;
      if (burn.tickTimer <= 0) {
        burn.tickTimer = 400; // 400ms마다 틱
        const dmg = Math.max(1, Math.round(burn.dps * 0.4));
        totalDmg += dmg;
      }
    }
    e.burns = e.burns.filter(b => b.remaining > 0);

    if (totalDmg > 0) {
      e.hp -= totalDmg;
      this._spawnDamageNumber(e.x, e.y, totalDmg, e.isBoss ? 'boss' : 'normal');
      // 번 색 유지/해제
      if (e.burns.length > 0 && e.bodyEl) {
        e.bodyEl.setAttribute('fill', '#FF8C00');
      } else if (e.bodyEl && e.slowTimer <= 0) {
        e.bodyEl.setAttribute('fill', e.color);
      }
    }
  }

  // 실드 파괴 이펙트 (CSS 애니메이션 원)
  _spawnSplashEffect(x, y, color) {
    const id = `sfx-${Date.now()}`;
    const el = svgEl('circle', {
      id, cx: x.toFixed(1), cy: y.toFixed(1), r: 22,
      fill: 'none', stroke: color, 'stroke-width': 3,
      'pointer-events': 'none',
      style: 'animation: splashRing 0.4s ease-out forwards',
    });
    // splashRing 키프레임은 TowerSystem에서 이미 정의됨
    this.layer.appendChild(el);
    setTimeout(() => document.getElementById(id)?.remove(), 400);
  }

  // ── QW#3: 타격 위치 임팩트 플래시 ──────────────────────
  // isBig=true: 엘리트/보스 사망 버스트 (스케일 2배)
  _spawnImpactFlash(x, y, color, isBig = false) {
    const cx = x.toFixed(1);
    const cy = y.toFixed(1);
    const r  = isBig ? 20 : 13;
    const dur = isBig ? 0.28 : 0.20;
    // <g>를 타격 좌표로 translate — transform-origin: 0 0 이 곧 중심이 됨
    const g = svgEl('g', {
      'pointer-events': 'none',
      style: `transform-origin: ${cx}px ${cy}px; animation: impactBurst ${dur}s ease-out forwards`,
    });
    g.appendChild(svgEl('circle', { cx, cy, r: String(r),       fill: color,     opacity: '0.45' }));
    g.appendChild(svgEl('circle', { cx, cy, r: String(r * 0.45), fill: '#ffffff', opacity: '0.60' }));
    this.layer.appendChild(g);
    setTimeout(() => g.remove(), Math.round(dur * 1000) + 10);
  }

  // ── 화면 흔들림 (넥서스 피격 / 보스 사망) ─────────────
  _triggerScreenShake() {
    const mapArea = document.getElementById('map-area');
    if (!mapArea) return;
    mapArea.classList.remove('screen-shake');
    void mapArea.offsetWidth; // reflow to restart animation
    mapArea.classList.add('screen-shake');
    mapArea.addEventListener('animationend', () => mapArea.classList.remove('screen-shake'), { once: true });
  }

  getEnemiesInRange(px, py, radiusPx) {
    const r2 = radiusPx * radiusPx;
    return this.enemies.filter(e => {
      if (this._pendingRemove.has(e.id) || this._dying.has(e.id)) return false;
      const dx = e.x - px, dy = e.y - py;
      return dx * dx + dy * dy <= r2;
    });
  }

  getLeadEnemy(px, py, radiusPx, canDetectCamo = false) {
    const r2 = radiusPx * radiusPx;
    // _sortedByProgress는 update() 시작 시 진행도 내림차순으로 캐싱됨 — 첫 일치 즉시 반환 O(1)~O(n)
    const list = this._sortedByProgress.length ? this._sortedByProgress : this.enemies;
    for (const e of list) {
      if (this._pendingRemove.has(e.id) || this._dying.has(e.id)) continue;
      if (!canDetectCamo && e.camo) continue;
      const dx = e.x - px, dy = e.y - py;
      if (dx * dx + dy * dy <= r2) return e;
    }
    return null;
  }

  hasCamoWave(waveIndex) {
    const wave = WAVE_CONFIGS[waveIndex];
    if (!wave) return false;
    return wave.some(g => ENEMY_DEFS[g.type]?.camo);
  }

  _triggerAmbush() {
    this._ambushTriggered = true;
    const group = _getAmbushGroup(this._waveIndex);
    let ambushAt = this._spawnTimer + AMBUSH_DELAY_MS;
    for (let i = 0; i < group.count; i++) {
      this._spawnQueue.push({ type: group.type, at: ambushAt });
      ambushAt += group.interval;
    }
    this.onAmbush?.({ count: group.count, delayMs: AMBUSH_DELAY_MS });
  }

  clearAll() {
    for (const e of [...this.enemies]) e.el?.remove();
    this.enemies = [];
    this._sortedByProgress = [];
    this._waveActive = false;
    this._dying.clear();
    this._pendingRemove.clear();
    this._boss = null;
    this.onBossUpdate?.({ hp: 0, maxHp: 1, hidden: true });
  }
}
