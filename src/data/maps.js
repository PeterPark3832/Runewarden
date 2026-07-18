/**
 * Runewarden — 맵 정의 (5종 기본 + DLC)
 * 그리드 크기: COLS=14, ROWS=9
 */

import { SHADOW_MAPS } from '../dlc/shadow_realm/maps.js';
import { SOLAR_MAPS }  from '../dlc/solar_dominion/maps.js';
import { STORM_MAPS }  from '../dlc/storm_imperium/maps.js';
import { hasDLC }      from '../systems/DLCRegistry.js';

const _BASE_MAP_DEFS = [
  // ── 맵 A: Crossroads ─────────────────────────────────
  {
    id: 'crossroads',
    name: 'Crossroads',
    nameZh: '十字路口',
    icon: '⚔️',
    desc: 'A winding path through the heart of the fortress.',
    descZh: '一条蜿蜒穿过要塞腹地的小径。',
    hexColor: '#1e2030', pathColor: 'rgba(220,70,70,0.4)',
    path: [
      [0,4],[1,4],[2,4],[2,3],[3,3],[4,3],[4,4],
      [5,4],[5,5],[6,5],[6,4],[7,4],[8,4],[8,3],
      [9,3],[10,3],[10,4],[11,4],[11,5],[12,5],[13,5]
    ],
  },

  // ── 맵 B: Serpent's Run ───────────────────────────────
  {
    id: 'serpent',
    name: "Serpent's Run",
    nameZh: '蛇行小径',
    icon: '🐍',
    desc: 'A winding S-shaped path. Towers near the curves cover twice.',
    descZh: '蜿蜒的 S 形路径。弯道旁的塔可覆盖两段路线。',
    hexColor: '#1e2a1e', pathColor: 'rgba(80,180,80,0.35)',
    path: [
      [0,1],[1,1],[2,1],[3,1],[4,1],[4,2],[4,3],[4,4],
      [5,4],[6,4],[7,4],[7,5],[7,6],[7,7],
      [8,7],[9,7],[10,7],[10,6],[10,5],[10,4],[10,3],[10,2],[10,1],
      [11,1],[12,1],[13,1]
    ],
  },

  // ── 맵 C: Gauntlet ───────────────────────────────────
  {
    id: 'gauntlet',
    name: 'Gauntlet',
    nameZh: '试炼长廊',
    icon: '🏰',
    desc: 'A straight path with a narrow chokepoint in the center.',
    descZh: '一条直路，中央有狭窄的隘口。',
    hexColor: '#201e1e', pathColor: 'rgba(200,100,50,0.4)',
    path: [
      [0,2],[1,2],[2,2],[3,2],[3,3],[3,4],[3,5],[3,6],
      [4,6],[5,6],[5,5],[6,5],[6,4],[7,4],[7,5],[8,5],
      [8,6],[9,6],[9,5],[9,4],[10,4],[10,3],[10,2],[10,1],
      [11,1],[12,1],[13,1]
    ],
  },

  // ── 맵 D: Twin Peaks ─────────────────────────────────
  // U자형 — 상단·하단 양쪽 타워가 경로를 두 번 커버
  {
    id: 'twin_peaks',
    name: 'Twin Peaks',
    nameZh: '双子峰',
    icon: '🏔️',
    desc: 'A U-shaped path. Towers on both flanks cover the route twice.',
    descZh: 'U 形路径。两翼的塔可覆盖路线两次。',
    hexColor: '#1e2030', pathColor: 'rgba(180,180,220,0.38)',
    path: [
      [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],
      [6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],
      [7,8],[8,8],[8,7],[8,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],
      [9,0],[10,0],[11,0],[12,0],[13,0]
    ],
  },

  // ── 맵 E: Labyrinth ──────────────────────────────────
  // 여러 번 꺾이는 미로 — 코너 집중 배치가 핵심
  {
    id: 'labyrinth',
    name: 'Labyrinth',
    nameZh: '迷宫',
    icon: '🌀',
    desc: 'A complex winding path. Tower coverage at each corner is key.',
    descZh: '迂回复杂的路径。在每个拐角布防是取胜的关键。',
    hexColor: '#1a1a30', pathColor: 'rgba(140,60,220,0.38)',
    path: [
      [0,8],[1,8],[2,8],[3,8],[3,7],[3,6],[3,5],
      [4,5],[5,5],[6,5],[6,4],[6,3],[6,2],[6,1],
      [7,1],[8,1],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],
      [10,6],[11,6],[12,6],[13,6]
    ],
  },
];

// DLC 맵 병합 (하위 호환 — 기존 코드에서 계속 사용 가능)
export const MAP_DEFS = [..._BASE_MAP_DEFS, ...SHADOW_MAPS, ...SOLAR_MAPS, ...STORM_MAPS];

/**
 * DLC 소유 여부로 필터링된 맵풀 반환.
 * 랜덤 맵 선택 등 런타임 맵 선택에 사용.
 */
export function getMapPool() {
  return [
    ..._BASE_MAP_DEFS,
    ...(hasDLC('shadow_realm')   ? SHADOW_MAPS : []),
    ...(hasDLC('solar_dominion') ? SOLAR_MAPS  : []),
    ...(hasDLC('storm_imperium') ? STORM_MAPS  : []),
  ];
}

/** 런 시작 시 랜덤 맵 선택 (DLC 게이팅 적용) */
export function pickRandomMap() {
  const pool = getMapPool();
  return pool[Math.floor(Math.random() * pool.length)];
}

/** id로 맵 찾기 */
export function getMapById(id) {
  return MAP_DEFS.find(m => m.id === id) ?? MAP_DEFS[0];
}
