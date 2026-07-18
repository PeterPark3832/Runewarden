// SVG 헥스 그리드 렌더러 — flat-top 헥사곤 사용
// 헥스 좌표계: offset(col, row), 픽셀 변환 포함
// v2.0 비주얼 오버홀: 지형 텍스처, 곡선 경로, 포탈/넥서스, 환경 장식, 비네트

import { HEX_SIZE, HEX_W, HEX_H } from '../config/constants.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

// 맵 크기
export const COLS = 14;
export const ROWS = 9;

// ── 활성 맵 (런 시작 시 setActiveMap()으로 변경) ──────
// 기본값: Crossroads (원래 경로)
let _activePathData = [
  [0,4],[1,4],[2,4],[2,3],[3,3],[4,3],[4,4],[5,4],[5,5],[6,5],[6,4],[7,4],[8,4],[8,3],[9,3],[10,3],[10,4],[11,4],[11,5],[12,5],[13,5]
];
let _pathSet         = new Set(_activePathData.map(([c,r]) => `${c},${r}`));
let _pathAdjacentSet = _buildAdjacent(_pathSet);
let _mapHexColor     = null;   // 맵 테마 헥스 배경색 (null = 기본)
let _mapPathColor    = null;   // 맵 테마 경로색 (null = 기본)
let _mapId           = null;   // 맵 id — 장식 테마 결정용

function _buildAdjacent(pathSet) {
  const OFFSETS = [[1,0],[-1,0],[0,1],[0,-1],[1,-1],[-1,1],[1,1],[-1,-1]];
  const adj = new Set();
  for (const key of pathSet) {
    const [c, r] = key.split(',').map(Number);
    for (const [dc, dr] of OFFSETS) {
      const nc = c + dc, nr = r + dr;
      const nk = `${nc},${nr}`;
      if (!pathSet.has(nk) && nc >= 0 && nc < COLS && nr >= 0 && nr < ROWS) adj.add(nk);
    }
  }
  return adj;
}

/** 런 시작 시 맵 변경 — MapRenderer 생성 전에 호출 */
export function setActiveMap(pathArray, mapDef = null) {
  _activePathData  = pathArray;
  _pathSet         = new Set(pathArray.map(([c,r]) => `${c},${r}`));
  _pathAdjacentSet = _buildAdjacent(_pathSet);
  _mapHexColor     = mapDef?.hexColor  ?? null;
  _mapPathColor    = mapDef?.pathColor ?? null;
  _mapId           = mapDef?.id        ?? null;
}

/** 현재 활성 경로 반환 (EnemySystem의 웨이포인트 계산용) */
export const ENEMY_PATH = { get current() { return _activePathData; } };

export function isPathAdjacent(col, row) { return _pathAdjacentSet.has(`${col},${row}`); }
export function isPathCell(col, row)     { return _pathSet.has(`${col},${row}`); }
export function isPlaceableCell(col, row) {
  if (isPathCell(col, row)) return false;
  if (col < 0 || col >= COLS || row < 0 || row >= ROWS) return false;
  return true;
}

// ── 좌표 변환 ──────────────────────────────────────────
export function hexToPixel(col, row) {
  // flat-top offset: 짝수 열은 아래로 shift
  const x = col * HEX_W * 0.75 + HEX_SIZE;
  const y = row * HEX_H + (col % 2 === 0 ? HEX_H / 2 : 0) + HEX_H / 2;
  return { x, y };
}

// Pre-computed offsets for flat-top hexagon corners (angles 0°, 60°, 120°, 180°, 240°, 300°)
const _HEX_CORNERS = Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI / 180) * (60 * i);
  return [HEX_SIZE * Math.cos(a), HEX_SIZE * Math.sin(a)];
});

function hexCorners(cx, cy) {
  return _HEX_CORNERS.map(([dx, dy]) => `${(cx + dx).toFixed(2)},${(cy + dy).toFixed(2)}`).join(' ');
}

// ── SVG 유틸 ──────────────────────────────────────────
export function svgEl(tag, attrs = {}) {
  const el = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

// ── 색상 유틸 ─────────────────────────────────────────
function _hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return { r: 34, g: 34, b: 64 };
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
/** amt > 0: 밝게(흰색 혼합), amt < 0: 어둡게(검정 혼합). amt ∈ [-1, 1] */
function _shade(hex, amt) {
  const { r, g, b } = _hexToRgb(hex);
  const t = amt > 0 ? 255 : 0;
  const p = Math.abs(amt);
  const mix = v => Math.round(v + (t - v) * p);
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`;
}
function _withAlpha(hex, a) {
  const { r, g, b } = _hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}
/** 'rgba(r,g,b,a)' 문자열의 알파만 교체 */
function _rgbaAlpha(rgba, a) {
  const m = /rgba?\(([^)]+)\)/.exec(rgba);
  if (!m) return rgba;
  const [r, g, b] = m[1].split(',').map(s => parseFloat(s));
  return `rgba(${r},${g},${b},${a})`;
}

// ── 시드 기반 PRNG (맵별 장식 배치가 항상 동일하도록) ──
function _mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function _hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}

// ── 맵별 장식 테마 ─────────────────────────────────────
// 각 맵 id → 장식 프롭 구성. 미등록 맵은 dlc 색감 기반 폴백.
const DECOR_THEMES = {
  crossroads:         { props: ['tree', 'rock', 'grass'],        accent: '#4a7a4a' },
  serpent:            { props: ['tree', 'tree', 'grass', 'rock'], accent: '#3f8a3f' },
  gauntlet:           { props: ['deadtree', 'rock', 'ember'],    accent: '#b06030' },
  twin_peaks:         { props: ['pine', 'rock', 'icecrystal'],   accent: '#7ec8e3' },
  labyrinth:          { props: ['runestone', 'crystal', 'rock'], accent: '#8c3cdc' },
  void_corridor:      { props: ['voidspike', 'crystal', 'rock'], accent: '#7b2fbe' },
  phantom_crossing:   { props: ['voidspike', 'deadtree', 'crystal'], accent: '#9040d0' },
  abyssal_spiral:     { props: ['voidspike', 'crystal', 'voidspike'], accent: '#a050f0' },
  solar_forum:        { props: ['obelisk', 'sunstone', 'rock'],  accent: '#f5c518' },
  sunken_temple:      { props: ['obelisk', 'rock', 'sunstone'],  accent: '#e8791a' },
  blazing_corridor:   { props: ['sunstone', 'ember', 'obelisk'], accent: '#ffa01e' },
  cloud_citadel:      { props: ['stormshard', 'rock', 'wisp'],   accent: '#4ecdc4' },
  storm_strait:       { props: ['stormshard', 'wisp', 'rock'],   accent: '#00b4d8' },
  lightning_corridor: { props: ['stormshard', 'stormshard', 'wisp'], accent: '#48cae4' },
};
const DEFAULT_THEME = { props: ['tree', 'rock', 'grass'], accent: '#4a7a4a' };

// ── MapRenderer 클래스 ─────────────────────────────────
export class MapRenderer {
  constructor(svgEl, onCellClick, onCellHover) {
    this.svg = svgEl;
    this.onCellClick = onCellClick;
    this.onCellHover = onCellHover ?? (() => {});
    this.cellMap = new Map();   // "col,row" → <g> 요소
    this.decorMap = new Map();  // "col,row" → 장식 <g> (타워 배치 시 숨김)
    this.towerLayer = null;
    this.enemyLayer = null;
    this.projectileLayer = null;
    this._selectedCell = null;
    this._init();
  }

  // SVG stop 요소 생성 헬퍼 (offset/stop-color는 attribute로만 설정 가능)
  _mkStop(offset, color, opacity = null) {
    const s = svgEl('stop');
    s.setAttribute('offset', offset);
    s.setAttribute('stop-color', color);
    if (opacity !== null) s.setAttribute('stop-opacity', opacity);
    return s;
  }

  _init() {
    this._injectMapStyles();

    const hexBase = _mapHexColor ?? '#222240';

    // ── SVG defs ──────────────────────────────────────
    const defs = svgEl('defs');

    // 헥스 지형 그라디언트 3종 — 셀별로 섞어서 유기적 지면 느낌
    const variants = [
      ['hexGrad',  0.06, -0.28],
      ['hexGradB', 0.10, -0.24],
      ['hexGradC', 0.03, -0.33],
    ];
    for (const [id, lite, dark] of variants) {
      const rg = svgEl('radialGradient', { id, cx: '50%', cy: '38%', r: '68%' });
      rg.appendChild(this._mkStop('0%',   _shade(hexBase, lite)));
      rg.appendChild(this._mkStop('100%', _shade(hexBase, dark)));
      defs.appendChild(rg);
    }

    // 배경(보드 밖) 그라디언트 — 맵색을 짙게 깔아 보드와 이어지게
    const bgGrad = svgEl('radialGradient', { id: 'boardBgGrad', cx: '50%', cy: '42%', r: '75%' });
    bgGrad.appendChild(this._mkStop('0%',   _shade(hexBase, -0.42)));
    bgGrad.appendChild(this._mkStop('100%', _shade(hexBase, -0.72)));
    defs.appendChild(bgGrad);

    // 비네트 그라디언트 (중앙 투명 → 가장자리 어둡게)
    const vg = svgEl('radialGradient', { id: 'vignetteGrad', cx: '50%', cy: '48%', r: '72%' });
    vg.appendChild(this._mkStop('0%',  '#000000', 0));
    vg.appendChild(this._mkStop('72%', '#000000', 0));
    vg.appendChild(this._mkStop('100%', '#000000', 0.42));
    defs.appendChild(vg);

    // 지형 노이즈 필터 — 유기적 텍스처 (보드 전체에 1회 적용, 정적이라 비용 낮음)
    const noise = svgEl('filter', { id: 'terrainNoise', x: '0%', y: '0%', width: '100%', height: '100%' });
    noise.appendChild(svgEl('feTurbulence', {
      type: 'fractalNoise', baseFrequency: '0.055', numOctaves: '3',
      stitchTiles: 'stitch', result: 'noise',
    }));
    const noiseMatrix = svgEl('feColorMatrix', {
      in: 'noise', type: 'matrix',
      values: '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.5 0.5 0.5 0 0',
    });
    noise.appendChild(noiseMatrix);
    defs.appendChild(noise);

    // 소프트 글로우 필터 (경로/포탈용)
    const glow = svgEl('filter', { id: 'mapSoftGlow', x: '-60%', y: '-60%', width: '220%', height: '220%' });
    glow.appendChild(svgEl('feGaussianBlur', { stdDeviation: '5' }));
    defs.appendChild(glow);

    this.svg.appendChild(defs);

    // ── 배경 ──────────────────────────────────────────
    this.svg.appendChild(svgEl('rect', {
      x: 0, y: 0, width: '100%', height: '100%', fill: 'url(#boardBgGrad)',
    }));

    // ── 레이어 그룹 (그리기 순서 = z-order) ────────────
    const gridLayer  = svgEl('g', { id: 'grid-layer' });
    const decorLayer = svgEl('g', { id: 'decor-layer', 'pointer-events': 'none' });
    const pathLayer  = svgEl('g', { id: 'path-layer' });   // 헥스 위, 타워 아래
    this.towerLayer  = svgEl('g', { id: 'tower-layer' });
    this.enemyLayer  = svgEl('g', { id: 'enemy-layer' });
    this.projectileLayer = svgEl('g', { id: 'projectile-layer' });
    this.svg.appendChild(gridLayer);
    this.svg.appendChild(decorLayer);
    this.svg.appendChild(pathLayer);
    this.svg.appendChild(this.towerLayer);
    this.svg.appendChild(this.enemyLayer);
    this.svg.appendChild(this.projectileLayer);

    // 헥스 셀 먼저 그리기
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        this._drawCell(gridLayer, c, r);
      }
    }

    // viewBox 크기 계산 (노이즈/비네트 오버레이에 필요)
    const totalW = COLS * HEX_W * 0.75 + HEX_SIZE * 1.25;
    const totalH = ROWS * HEX_H + HEX_H;

    // 지형 노이즈 오버레이 — 그리드 위에 은은하게
    gridLayer.appendChild(svgEl('rect', {
      x: 0, y: 0, width: totalW, height: totalH,
      filter: 'url(#terrainNoise)', opacity: '0.05',
      'pointer-events': 'none',
    }));

    // 환경 장식 (경로/인접 제외 셀에 시드 기반 배치)
    this._drawDecorations(decorLayer);

    // 경로 오버레이 (헥스 위에 그림)
    this._drawPathLine(pathLayer);

    // ── 최상단 FX 레이어: 비네트 + 부유 입자 ──────────
    const fxLayer = svgEl('g', { id: 'map-fx-layer', 'pointer-events': 'none' });
    fxLayer.appendChild(svgEl('rect', {
      x: 0, y: 0, width: totalW, height: totalH, fill: 'url(#vignetteGrad)',
    }));
    this._drawMotes(fxLayer, totalW, totalH);
    this.svg.appendChild(fxLayer);

    // SVG viewBox 설정
    this.svg.setAttribute('viewBox', `0 0 ${totalW} ${totalH}`);
    this.svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  }

  // 맵 전용 CSS 키프레임 주입 (1회)
  _injectMapStyles() {
    if (document.getElementById('map-fx-style')) return;
    const s = document.createElement('style');
    s.id = 'map-fx-style';
    s.textContent = `
      @keyframes pathFlow    { to { stroke-dashoffset: -26; } }
      @keyframes portalSpin  { to { transform: rotate(360deg); } }
      @keyframes portalSpinR { to { transform: rotate(-360deg); } }
      @keyframes nexusBreath { 0%,100% { opacity: 0.55; } 50% { opacity: 1; } }
      @keyframes chevronPulse{ 0%,100% { opacity: 0.28; } 50% { opacity: 0.7; } }
      @keyframes moteDrift   {
        0%   { transform: translate(0, 0);       opacity: 0; }
        15%  { opacity: 0.5; }
        85%  { opacity: 0.35; }
        100% { transform: translate(var(--mx, 8px), var(--my, -46px)); opacity: 0; }
      }
      .path-center-line { animation: pathFlow 1.7s linear infinite; }
      .portal-ring      { animation: portalSpin 9s linear infinite; }
      .portal-ring-r    { animation: portalSpinR 13s linear infinite; }
      .nexus-glow       { animation: nexusBreath 2.6s ease-in-out infinite; }
      .path-chevron     { animation: chevronPulse 2.2s ease-in-out infinite; }
      .map-mote         { animation: moteDrift var(--dur, 9s) linear infinite; }
    `;
    document.head.appendChild(s);
  }

  // ── Catmull-Rom → cubic bezier 경로 문자열 ───────────
  _smoothPathD(points) {
    if (points.length < 2) return '';
    const p = i => points[Math.max(0, Math.min(points.length - 1, i))];
    let d = `M ${p(0).x.toFixed(1)} ${p(0).y.toFixed(1)}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = p(i - 1), p1 = p(i), p2 = p(i + 1), p3 = p(i + 2);
      const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return d;
  }

  _drawPathLine(layer) {
    const path = ENEMY_PATH.current;  // 현재 활성 맵 경로 (getter)

    // 맵 테마 경로색 결정
    const pathColor = _mapPathColor ?? 'rgba(220,70,70,0.4)';
    const pathFill  = _rgbaAlpha(pathColor, 0.10);
    const bedColor  = _rgbaAlpha(pathColor, 0.13);
    const glowColor = _rgbaAlpha(pathColor, 0.15);
    const lineColor = _rgbaAlpha(pathColor, 0.75);

    // 1) 경로 헥스마다 반투명 오버레이 — 헥스 위에 그려지므로 선명하게 보임
    for (const [c, r] of path) {
      const { x, y } = hexToPixel(c, r);
      layer.appendChild(svgEl('polygon', {
        points: hexCorners(x, y),
        fill: pathFill,
        stroke: _rgbaAlpha(pathColor, 0.20),
        'stroke-width': 1,
        'pointer-events': 'none',
      }));
    }

    // 2) 부드러운 곡선 경로 (Catmull-Rom) — 3중 레이어: 글로우 / 로드베드 / 중심선
    const pts = path.map(([c, r]) => hexToPixel(c, r));
    const d = this._smoothPathD(pts);

    layer.appendChild(svgEl('path', {
      d, fill: 'none', stroke: glowColor, 'stroke-width': 17,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      filter: 'url(#mapSoftGlow)', 'pointer-events': 'none',
    }));
    layer.appendChild(svgEl('path', {
      d, fill: 'none', stroke: bedColor, 'stroke-width': 10,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      'pointer-events': 'none',
    }));
    layer.appendChild(svgEl('path', {
      d, fill: 'none', stroke: lineColor, 'stroke-width': 2,
      'stroke-linecap': 'round', 'stroke-linejoin': 'round',
      'stroke-dasharray': '10 16', class: 'path-center-line',
      'pointer-events': 'none',
    }));

    // 3) 방향 셰브런 (삼각형 폴리곤 — 텍스트 화살표 대체)
    for (let i = 2; i < path.length - 1; i += 3) {
      const p1 = hexToPixel(...path[i - 1]);
      const p2 = hexToPixel(...path[i]);
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;
      const ang = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
      const chev = svgEl('polygon', {
        points: '-4,-5 4,0 -4,5 -1.5,0',
        fill: lineColor, class: 'path-chevron',
        transform: `translate(${mx.toFixed(1)},${my.toFixed(1)}) rotate(${ang.toFixed(1)})`,
        'pointer-events': 'none',
      });
      layer.appendChild(chev);
    }

    // 4) 시작 포탈 — 회전하는 이중 룬 링
    const sp = hexToPixel(...path[0]);
    this._drawPortal(layer, sp.x, sp.y, '#e74c3c', 'SPAWN');

    // 5) 종료 지점 — 넥서스 크리스탈
    const ep = hexToPixel(...path[path.length - 1]);
    this._drawNexus(layer, ep.x, ep.y);
  }

  // 회전 룬 링 포탈 (스폰 지점)
  _drawPortal(layer, x, y, color, label) {
    const g = svgEl('g', { 'pointer-events': 'none' });

    // 바닥 글로우
    g.appendChild(svgEl('circle', {
      cx: x, cy: y, r: 17, fill: color, opacity: '0.16', filter: 'url(#mapSoftGlow)',
    }));
    // 외곽 회전 링 (점선) — transform-box로 자체 중심 회전
    const ring1 = svgEl('circle', {
      cx: x, cy: y, r: 16, fill: 'none', stroke: color, 'stroke-width': 1.6,
      'stroke-dasharray': '5 4', opacity: '0.75', class: 'portal-ring',
    });
    ring1.style.transformOrigin = `${x}px ${y}px`;
    g.appendChild(ring1);
    // 내부 역회전 링
    const ring2 = svgEl('circle', {
      cx: x, cy: y, r: 11, fill: 'none', stroke: color, 'stroke-width': 1.1,
      'stroke-dasharray': '2.5 5', opacity: '0.6', class: 'portal-ring-r',
    });
    ring2.style.transformOrigin = `${x}px ${y}px`;
    g.appendChild(ring2);
    // 중심 코어
    g.appendChild(svgEl('circle', {
      cx: x, cy: y, r: 6.5, fill: color, opacity: '0.5', class: 'spawn-marker',
    }));
    g.appendChild(svgEl('circle', { cx: x, cy: y, r: 3, fill: '#fff', opacity: '0.85' }));

    const t = this._label(x, y + 27, label, _withAlpha('#ffffff', 0.0), '7px');
    t.setAttribute('fill', color);
    t.setAttribute('opacity', '0.85');
    t.setAttribute('letter-spacing', '2');
    t.setAttribute('font-family', 'Cinzel, serif');
    g.appendChild(t);

    layer.appendChild(g);
  }

  // 넥서스 크리스탈 (수호 대상 — 기존 EXIT 마커 대체)
  _drawNexus(layer, x, y) {
    const g = svgEl('g', { 'pointer-events': 'none' });
    const c = '#8E44AD';
    const glow = '#c39bd3';

    // 바닥 글로우 + 룬 링
    g.appendChild(svgEl('circle', {
      cx: x, cy: y, r: 19, fill: c, opacity: '0.20', filter: 'url(#mapSoftGlow)',
      class: 'nexus-glow',
    }));
    const ring = svgEl('circle', {
      cx: x, cy: y, r: 16.5, fill: 'none', stroke: glow, 'stroke-width': 1.2,
      'stroke-dasharray': '3 6', opacity: '0.55', class: 'portal-ring',
    });
    ring.style.transformOrigin = `${x}px ${y}px`;
    g.appendChild(ring);

    // 크리스탈 본체 (세로 다이아몬드) + 하이라이트 면
    g.appendChild(svgEl('polygon', {
      points: `${x},${y - 13} ${x + 8},${y} ${x},${y + 13} ${x - 8},${y}`,
      fill: c, stroke: glow, 'stroke-width': 1.5, class: 'exit-marker',
    }));
    g.appendChild(svgEl('polygon', {
      points: `${x},${y - 13} ${x + 8},${y} ${x},${y + 2}`,
      fill: '#ffffff', opacity: '0.18',
    }));
    // 크리스탈 코어 반짝임
    g.appendChild(svgEl('circle', {
      cx: x, cy: y - 2, r: 2.2, fill: '#fff', opacity: '0.9', class: 'nexus-glow',
    }));

    const t = this._label(x, y + 28, 'NEXUS', glow, '7px');
    t.setAttribute('letter-spacing', '2');
    t.setAttribute('opacity', '0.9');
    t.setAttribute('font-family', 'Cinzel, serif');
    g.appendChild(t);

    layer.appendChild(g);
  }

  // ── 환경 장식 프롭 (시드 기반 결정적 배치) ─────────────
  _drawDecorations(layer) {
    const theme = DECOR_THEMES[_mapId] ?? DEFAULT_THEME;
    const rand = _mulberry32(_hashStr(_mapId ?? 'default'));
    const hexBase = _mapHexColor ?? '#222240';

    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        if (isPathCell(c, r)) continue;
        // 인접 셀은 배치 후보라 장식 확률 낮게, 그 외 셀은 높게
        const chance = isPathAdjacent(c, r) ? 0.10 : 0.34;
        if (rand() > chance) continue;

        const { x, y } = hexToPixel(c, r);
        const kind = theme.props[Math.floor(rand() * theme.props.length)];
        const g = svgEl('g', { class: 'map-decor' });

        const n = rand() < 0.3 ? 2 : 1;
        for (let i = 0; i < n; i++) {
          const ox = (rand() - 0.5) * HEX_SIZE * 0.9;
          const oy = (rand() - 0.5) * HEX_SIZE * 0.8;
          const scale = 0.75 + rand() * 0.5;
          this._drawProp(g, kind, x + ox, y + oy, scale, theme.accent, hexBase, rand);
        }
        g.setAttribute('opacity', String(0.55 + rand() * 0.3));
        layer.appendChild(g);
        this.decorMap.set(`${c},${r}`, g);
      }
    }
  }

  // 개별 프롭 SVG (절차 생성 — 이모지/이미지 없음)
  _drawProp(g, kind, x, y, s, accent, hexBase, rand) {
    const dk = _shade(hexBase, -0.45);   // 그림자/윤곽용 어두운 색
    switch (kind) {
      case 'tree': {
        const h = 13 * s;
        g.appendChild(svgEl('ellipse', { cx: x, cy: y + h * 0.42, rx: 5 * s, ry: 1.8 * s, fill: dk, opacity: '0.5' }));
        g.appendChild(svgEl('rect', { x: x - 1.1 * s, y: y + h * 0.1, width: 2.2 * s, height: h * 0.32, fill: '#4a3222', rx: 0.8 }));
        g.appendChild(svgEl('polygon', { points: `${x},${y - h * 0.55} ${x + 5.5 * s},${y + h * 0.18} ${x - 5.5 * s},${y + h * 0.18}`, fill: _shade(accent, -0.25), stroke: dk, 'stroke-width': 0.6 }));
        g.appendChild(svgEl('polygon', { points: `${x},${y - h * 0.85} ${x + 4.2 * s},${y - h * 0.12} ${x - 4.2 * s},${y - h * 0.12}`, fill: accent, stroke: dk, 'stroke-width': 0.6 }));
        break;
      }
      case 'pine': {
        const h = 15 * s;
        g.appendChild(svgEl('ellipse', { cx: x, cy: y + h * 0.4, rx: 4.4 * s, ry: 1.6 * s, fill: dk, opacity: '0.5' }));
        g.appendChild(svgEl('polygon', { points: `${x},${y - h * 0.62} ${x + 4 * s},${y + h * 0.38} ${x - 4 * s},${y + h * 0.38}`, fill: _shade(accent, -0.35), stroke: _shade(accent, 0.1), 'stroke-width': 0.5 }));
        g.appendChild(svgEl('line', { x1: x, y1: y - h * 0.55, x2: x, y2: y + h * 0.3, stroke: _shade(accent, 0.25), 'stroke-width': 0.6, opacity: '0.6' }));
        break;
      }
      case 'deadtree': {
        const h = 12 * s;
        g.appendChild(svgEl('path', {
          d: `M ${x} ${y + h * 0.4} L ${x} ${y - h * 0.3} M ${x} ${y - h * 0.05} L ${x + 3.5 * s} ${y - h * 0.42} M ${x} ${y - h * 0.18} L ${x - 3 * s} ${y - h * 0.5}`,
          stroke: '#4a3a30', 'stroke-width': 1.4 * s, fill: 'none', 'stroke-linecap': 'round',
        }));
        break;
      }
      case 'rock': {
        const r0 = 4.5 * s;
        const pts = [];
        for (let i = 0; i < 5; i++) {
          const a = (i / 5) * Math.PI * 2 + rand();
          const rr = r0 * (0.75 + rand() * 0.4);
          pts.push(`${(x + rr * Math.cos(a)).toFixed(1)},${(y + rr * 0.72 * Math.sin(a)).toFixed(1)}`);
        }
        g.appendChild(svgEl('polygon', { points: pts.join(' '), fill: _shade(hexBase, 0.16), stroke: dk, 'stroke-width': 0.8 }));
        g.appendChild(svgEl('line', { x1: x - r0 * 0.3, y1: y - r0 * 0.15, x2: x + r0 * 0.25, y2: y + r0 * 0.1, stroke: dk, 'stroke-width': 0.5, opacity: '0.6' }));
        break;
      }
      case 'grass': {
        for (let i = -1; i <= 1; i++) {
          g.appendChild(svgEl('path', {
            d: `M ${x + i * 2.4 * s} ${y + 3 * s} Q ${x + i * 3.4 * s} ${y - 1.5 * s} ${x + i * 4 * s} ${y - 3.6 * s}`,
            stroke: _shade(accent, -0.1), 'stroke-width': 0.9, fill: 'none', opacity: '0.7', 'stroke-linecap': 'round',
          }));
        }
        break;
      }
      case 'crystal': case 'icecrystal': case 'stormshard': {
        const h = 9 * s;
        const tilt = (rand() - 0.5) * 14;
        const cg = svgEl('g', { transform: `rotate(${tilt.toFixed(1)},${x},${y})` });
        cg.appendChild(svgEl('ellipse', { cx: x, cy: y + h * 0.5, rx: 3.6 * s, ry: 1.3 * s, fill: dk, opacity: '0.5' }));
        cg.appendChild(svgEl('polygon', {
          points: `${x},${y - h} ${x + 2.8 * s},${y - h * 0.2} ${x + 1.6 * s},${y + h * 0.45} ${x - 1.6 * s},${y + h * 0.45} ${x - 2.8 * s},${y - h * 0.2}`,
          fill: _withAlpha(accent.startsWith('#') ? accent : '#8c3cdc', 0.75), stroke: _shade(accent, 0.3), 'stroke-width': 0.7,
        }));
        cg.appendChild(svgEl('line', { x1: x, y1: y - h * 0.9, x2: x, y2: y + h * 0.4, stroke: '#fff', 'stroke-width': 0.5, opacity: '0.5' }));
        g.appendChild(cg);
        break;
      }
      case 'runestone': {
        const h = 10 * s;
        g.appendChild(svgEl('ellipse', { cx: x, cy: y + h * 0.5, rx: 4 * s, ry: 1.4 * s, fill: dk, opacity: '0.5' }));
        g.appendChild(svgEl('rect', { x: x - 3 * s, y: y - h * 0.55, width: 6 * s, height: h, rx: 2 * s, fill: _shade(hexBase, 0.2), stroke: dk, 'stroke-width': 0.8 }));
        g.appendChild(svgEl('path', {
          d: `M ${x - 1.2 * s} ${y - h * 0.25} L ${x + 1.2 * s} ${y} L ${x - 1.2 * s} ${y + h * 0.25}`,
          stroke: accent, 'stroke-width': 0.9, fill: 'none', opacity: '0.9',
        }));
        break;
      }
      case 'obelisk': {
        const h = 13 * s;
        g.appendChild(svgEl('ellipse', { cx: x, cy: y + h * 0.42, rx: 3.6 * s, ry: 1.4 * s, fill: dk, opacity: '0.5' }));
        g.appendChild(svgEl('polygon', {
          points: `${x - 2.4 * s},${y + h * 0.38} ${x - 1.2 * s},${y - h * 0.6} ${x + 1.2 * s},${y - h * 0.6} ${x + 2.4 * s},${y + h * 0.38}`,
          fill: _shade(hexBase, 0.22), stroke: _shade(accent, -0.1), 'stroke-width': 0.7,
        }));
        g.appendChild(svgEl('line', { x1: x, y1: y - h * 0.45, x2: x, y2: y + h * 0.25, stroke: accent, 'stroke-width': 0.8, opacity: '0.8' }));
        break;
      }
      case 'sunstone': {
        g.appendChild(svgEl('circle', { cx: x, cy: y, r: 3.4 * s, fill: _withAlpha(accent, 0.55), stroke: accent, 'stroke-width': 0.7 }));
        for (let i = 0; i < 4; i++) {
          const a = i * Math.PI / 2 + Math.PI / 4;
          g.appendChild(svgEl('line', {
            x1: x + Math.cos(a) * 4.4 * s, y1: y + Math.sin(a) * 4.4 * s,
            x2: x + Math.cos(a) * 6.4 * s, y2: y + Math.sin(a) * 6.4 * s,
            stroke: accent, 'stroke-width': 0.7, opacity: '0.7',
          }));
        }
        break;
      }
      case 'ember': {
        for (let i = 0; i < 3; i++) {
          const ox = (rand() - 0.5) * 8 * s, oy = (rand() - 0.5) * 6 * s;
          g.appendChild(svgEl('circle', { cx: x + ox, cy: y + oy, r: (0.9 + rand() * 0.9) * s, fill: '#ff7030', opacity: String(0.4 + rand() * 0.4) }));
        }
        break;
      }
      case 'voidspike': {
        const h = 11 * s;
        const tilt = (rand() - 0.5) * 22;
        const vg2 = svgEl('g', { transform: `rotate(${tilt.toFixed(1)},${x},${y})` });
        vg2.appendChild(svgEl('polygon', {
          points: `${x},${y - h} ${x + 2.2 * s},${y + h * 0.3} ${x - 2.2 * s},${y + h * 0.3}`,
          fill: _shade(hexBase, -0.2), stroke: accent, 'stroke-width': 0.7, opacity: '0.9',
        }));
        vg2.appendChild(svgEl('polygon', {
          points: `${x + 3.5 * s},${y - h * 0.45} ${x + 5 * s},${y + h * 0.28} ${x + 2.2 * s},${y + h * 0.28}`,
          fill: _shade(hexBase, -0.3), stroke: _withAlpha(accent, 0.6), 'stroke-width': 0.5,
        }));
        g.appendChild(vg2);
        break;
      }
      case 'wisp': {
        g.appendChild(svgEl('ellipse', { cx: x, cy: y, rx: 6 * s, ry: 2.2 * s, fill: _withAlpha(accent, 0.14) }));
        g.appendChild(svgEl('ellipse', { cx: x + 3 * s, cy: y - 1.5 * s, rx: 4 * s, ry: 1.6 * s, fill: _withAlpha(accent, 0.10) }));
        break;
      }
    }
  }

  // 부유 입자 (분위기 연출 — GPU 트랜스폼만 사용)
  _drawMotes(layer, w, h) {
    const theme = DECOR_THEMES[_mapId] ?? DEFAULT_THEME;
    const rand = _mulberry32(_hashStr((_mapId ?? 'default') + ':motes'));
    for (let i = 0; i < 14; i++) {
      const mote = svgEl('circle', {
        cx: (rand() * w).toFixed(0), cy: (rand() * h).toFixed(0),
        r: (0.8 + rand() * 1.4).toFixed(1),
        fill: theme.accent, opacity: '0', class: 'map-mote',
      });
      mote.style.setProperty('--dur', `${(7 + rand() * 8).toFixed(1)}s`);
      mote.style.setProperty('--mx', `${((rand() - 0.5) * 30).toFixed(0)}px`);
      mote.style.setProperty('--my', `${(-30 - rand() * 40).toFixed(0)}px`);
      mote.style.animationDelay = `${(rand() * 9).toFixed(1)}s`;
      layer.appendChild(mote);
    }
  }

  _label(x, y, text, fill, size = '11px') {
    const t = svgEl('text', {
      x, y,
      'text-anchor': 'middle',
      'dominant-baseline': 'middle',
      fill,
      'font-size': size,
      'pointer-events': 'none',
    });
    t.textContent = text;
    return t;
  }

  _drawCell(layer, col, row) {
    const { x, y } = hexToPixel(col, row);
    const isPath = isPathCell(col, row);

    const g = svgEl('g', { class: `hex-cell${isPath ? ' path-cell' : ' placeable'}` });

    const isAdj = !isPath && isPathAdjacent(col, row);
    // 셀별 지형 변주 — 결정적 해시로 그라디언트 3종 중 선택
    const variant = ['url(#hexGrad)', 'url(#hexGradB)', 'url(#hexGradC)'][(col * 7 + row * 13) % 3];
    const hexBase = _mapHexColor ?? '#222240';
    const baseFill = isPath ? _shade(hexBase, -0.18) : variant;

    const poly = svgEl('polygon', {
      class: 'hex-bg',
      points: hexCorners(x, y),
      fill: baseFill,
      stroke: isPath ? _shade(hexBase, -0.05) : _shade(hexBase, -0.12),
      'stroke-width': 1,
    });
    poly.dataset.baseFill = baseFill;   // hover/타워 제거 후 원상복구용
    g.appendChild(poly);

    if (!isPath) {
      // 경로 인접 셀: 은은한 하이라이트 링으로 배치 추천 표시
      if (isAdj) {
        g.appendChild(svgEl('polygon', {
          points: hexCorners(x, y),
          fill: 'none',
          stroke: 'rgba(120,200,120,0.18)',
          'stroke-width': 1.5,
          'pointer-events': 'none',
        }));
        g.appendChild(svgEl('circle', {
          cx: x, cy: y, r: 2, fill: 'rgba(120,200,120,0.35)', 'pointer-events': 'none',
        }));
      }

      const hoverFill = _shade(hexBase, 0.14);

      g.addEventListener('click', () => this.onCellClick(col, row, g));
      g.addEventListener('mouseenter', () => {
        if (!g.dataset.tower) poly.setAttribute('fill', hoverFill);
        this.onCellHover(col, row, true);
      });
      g.addEventListener('mouseleave', () => {
        if (!g.dataset.tower) poly.setAttribute('fill', poly.dataset.baseFill);
        this.onCellHover(col, row, false);
      });
    }

    layer.appendChild(g);
    this.cellMap.set(`${col},${row}`, g);
  }

  // ── 타워 배치 ─────────────────────────────────────────
  placeTower(col, row, towerDef) {
    const { x, y } = hexToPixel(col, row);
    const key = `${col},${row}`;
    const cell = this.cellMap.get(key);
    if (!cell) return;

    // 셀 배경 색 변경
    cell.querySelector('.hex-bg').setAttribute('fill', towerDef.color + '33');
    cell.querySelector('.hex-bg').setAttribute('stroke', towerDef.color);
    cell.dataset.tower = towerDef.id;

    // 이 셀의 환경 장식 숨김 (타워와 겹침 방지)
    this.decorMap.get(key)?.setAttribute('display', 'none');

    // 타워 SVG 그리기
    const tg = svgEl('g', { id: `tower-${col}-${row}`, class: 'tower-group', 'pointer-events': 'none' });
    tg.appendChild(this._drawTowerShape(x, y, towerDef));

    // 아이콘 텍스트
    tg.appendChild(this._label(x, y, towerDef.icon, '#fff', '18px'));

    // 팝 애니메이션
    tg.style.transformOrigin = `${x}px ${y}px`;
    tg.style.animation = 'towerPop 0.3s ease-out';
    this.towerLayer.appendChild(tg);

    // CSS 키프레임 (한 번만 추가)
    if (!document.getElementById('tower-pop-style')) {
      const s = document.createElement('style');
      s.id = 'tower-pop-style';
      s.textContent = `@keyframes towerPop { 0%{transform:scale(0)} 70%{transform:scale(1.15)} 100%{transform:scale(1)} }`;
      document.head.appendChild(s);
    }

    return tg;
  }

  // 다각형 점 생성 헬퍼 (cx, cy 중심, r 반지름, n 변 수, rot 회전 라디안)
  _polyPts(cx, cy, r, n, rot = 0) {
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i * 2 * Math.PI / n) + rot;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
    }
    return pts.join(' ');
  }

  // 별 모양 점 생성 헬퍼 (n 꼭지, outer/inner 반지름, rot 회전)
  _starPts(cx, cy, outer, inner, n, rot = 0) {
    const pts = [];
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = (i * Math.PI / n) + rot;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
    }
    return pts.join(' ');
  }

  _drawTowerShape(x, y, def) {
    const g   = svgEl('g');
    const r   = HEX_SIZE * 0.50;  // 기본 반지름 ~17px
    const id  = def.id;
    const col = def.color;
    const acc = def.accentColor;
    const sw  = 2;

    // ── 공통 기단: 그림자 + 석재 플린스 (구조물 무게감) ──
    g.appendChild(svgEl('ellipse', {
      cx: x, cy: y + r * 0.82, rx: r * 1.02, ry: r * 0.34, fill: 'rgba(0,0,0,0.38)',
    }));
    g.appendChild(svgEl('polygon', {
      points: this._polyPts(x, y + r * 0.42, r * 0.88, 6, -Math.PI / 6),
      fill: 'rgba(18,16,32,0.92)', stroke: 'rgba(255,255,255,0.10)', 'stroke-width': 1,
    }));
    g.appendChild(svgEl('polygon', {
      points: this._polyPts(x, y + r * 0.28, r * 0.78, 6, -Math.PI / 6),
      fill: 'rgba(42,38,62,0.92)', stroke: acc, 'stroke-width': 0.6, opacity: '0.92',
    }));

    // ── 형태 분기 ──────────────────────────────────────
    if (id === 'archer' || id === 'marksman' || id === 'bone_archer') {
      // 다이아몬드 (회전된 정사각형) — 빠른 단일 공격 계열
      g.appendChild(svgEl('polygon', {
        points: this._polyPts(x, y, r, 4, -Math.PI / 4),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));

    } else if (id === 'cannon' || id === 'ballista' || id === 'divine_cannon' || def.shape === 'cannon' || def.shape === 'ballista') {
      // 육각형 — 묵직한 포격 계열
      g.appendChild(svgEl('polygon', {
        points: this._polyPts(x, y, r, 6, -Math.PI / 6),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      // 포구 돌출 (작은 직사각형) — 별도 그룹으로 분리하여 회전 가능
      const barrelGroup = svgEl('g', { class: 'tower-barrel' });
      barrelGroup.appendChild(svgEl('rect', {
        x: x - 3, y: y - r - 5, width: 6, height: 7,
        fill: acc, rx: 1,
      }));
      g.appendChild(barrelGroup);

    } else if (id === 'frost' || id === 'glacial' || id === 'frost_giant') {
      // 팔각형 — 얼음 결정 실루엣
      g.appendChild(svgEl('polygon', {
        points: this._polyPts(x, y, r, 8, Math.PI / 8),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      // 내부 십자 (얼음 결정 문양)
      g.appendChild(svgEl('line', { x1: x, y1: y - r * 0.55, x2: x, y2: y + r * 0.55,
        stroke: acc, 'stroke-width': 1.2, opacity: '0.7' }));
      g.appendChild(svgEl('line', { x1: x - r * 0.55, y1: y, x2: x + r * 0.55, y2: y,
        stroke: acc, 'stroke-width': 1.2, opacity: '0.7' }));

    } else if (id === 'fire_drake') {
      // 5각별 — 불꽃 실루엣
      g.appendChild(svgEl('polygon', {
        points: this._starPts(x, y, r, r * 0.45, 5, -Math.PI / 2),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));

    } else if (id === 'tesla') {
      // 오각형 (전기 코일 느낌) + 아크 2개
      g.appendChild(svgEl('polygon', {
        points: this._polyPts(x, y, r, 5, -Math.PI / 2),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      // 작은 전기 아크 장식
      g.appendChild(svgEl('circle', { cx: x - r * 0.35, cy: y - r * 0.2, r: 2.5,
        fill: acc, opacity: '0.8' }));
      g.appendChild(svgEl('circle', { cx: x + r * 0.35, cy: y - r * 0.2, r: 2.5,
        fill: acc, opacity: '0.8' }));

    } else if (id === 'druid') {
      // 원 + 3개 잎사귀 (자연 문양)
      g.appendChild(svgEl('circle', {
        cx: x, cy: y, r: r * 0.85,
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      for (let i = 0; i < 3; i++) {
        const a = (i * 2 * Math.PI / 3) - Math.PI / 2;
        const lx = x + r * 0.85 * Math.cos(a);
        const ly = y + r * 0.85 * Math.sin(a);
        g.appendChild(svgEl('circle', { cx: lx.toFixed(1), cy: ly.toFixed(1), r: r * 0.28,
          fill: acc, opacity: '0.85' }));
      }

    } else if (id === 'shadow_strike') {
      // 역삼각형 (그림자 단검 느낌)
      g.appendChild(svgEl('polygon', {
        points: this._polyPts(x, y, r, 3, Math.PI / 2),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      // 날카로운 내부 라인
      g.appendChild(svgEl('line', { x1: x, y1: y - r * 0.3, x2: x, y2: y + r * 0.7,
        stroke: acc, 'stroke-width': 1.5, opacity: '0.7' }));

    // ── DLC 시그니처 타워 형태 ─────────────────────────
    } else if (id === 'light_prism') {
      // 상향 삼각 프리즘 + 내부 굴절 광선
      g.appendChild(svgEl('polygon', {
        points: this._polyPts(x, y, r, 3, -Math.PI / 2),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      g.appendChild(svgEl('line', { x1: x - r * 0.4, y1: y + r * 0.28, x2: x, y2: y - r * 0.45,
        stroke: acc, 'stroke-width': 1, opacity: '0.8' }));
      g.appendChild(svgEl('line', { x1: x, y1: y - r * 0.45, x2: x + r * 0.4, y2: y + r * 0.28,
        stroke: '#fff', 'stroke-width': 1, opacity: '0.5' }));

    } else if (id === 'crusader') {
      // 방패 실루엣 + 십자 문양
      g.appendChild(svgEl('path', {
        d: `M ${x - r * 0.7} ${y - r * 0.7} L ${x + r * 0.7} ${y - r * 0.7} L ${x + r * 0.7} ${y + r * 0.15} Q ${x + r * 0.7} ${y + r * 0.7} ${x} ${y + r * 0.95} Q ${x - r * 0.7} ${y + r * 0.7} ${x - r * 0.7} ${y + r * 0.15} Z`,
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      g.appendChild(svgEl('line', { x1: x, y1: y - r * 0.45, x2: x, y2: y + r * 0.5,
        stroke: acc, 'stroke-width': 1.6, opacity: '0.85' }));
      g.appendChild(svgEl('line', { x1: x - r * 0.32, y1: y - r * 0.12, x2: x + r * 0.32, y2: y - r * 0.12,
        stroke: acc, 'stroke-width': 1.6, opacity: '0.85' }));

    } else if (id === 'solar_scythe') {
      // 원판 + 초승달 낫날
      g.appendChild(svgEl('circle', {
        cx: x, cy: y, r: r * 0.8, fill: col, stroke: acc, 'stroke-width': sw,
      }));
      g.appendChild(svgEl('path', {
        d: `M ${x - r * 0.15} ${y - r * 0.95} A ${r * 0.95} ${r * 0.95} 0 0 1 ${x + r * 0.85} ${y + r * 0.45}`,
        fill: 'none', stroke: acc, 'stroke-width': 2.4, 'stroke-linecap': 'round',
      }));

    } else if (id === 'wind_anchor') {
      // 터빈 링 + 3개 회전 날개 (grounding 오라 타워)
      g.appendChild(svgEl('circle', {
        cx: x, cy: y, r: r * 0.75, fill: col, stroke: acc, 'stroke-width': sw,
      }));
      for (let i = 0; i < 3; i++) {
        const a = i * 2 * Math.PI / 3;
        const bx = x + Math.cos(a) * r * 0.75, by = y + Math.sin(a) * r * 0.75;
        const cx2 = x + Math.cos(a + 0.7) * r * 1.05, cy2 = y + Math.sin(a + 0.7) * r * 1.05;
        g.appendChild(svgEl('path', {
          d: `M ${bx.toFixed(1)} ${by.toFixed(1)} Q ${cx2.toFixed(1)} ${cy2.toFixed(1)} ${(x + Math.cos(a + 1.1) * r * 0.75).toFixed(1)} ${(y + Math.sin(a + 1.1) * r * 0.75).toFixed(1)}`,
          fill: 'none', stroke: acc, 'stroke-width': 1.8, opacity: '0.85', 'stroke-linecap': 'round',
        }));
      }
      g.appendChild(svgEl('circle', { cx: x, cy: y, r: 2.5, fill: acc }));

    } else if (id === 'storm_conduit') {
      // 오각형 코어 + 궤도 링 (아우라 타워)
      g.appendChild(svgEl('polygon', {
        points: this._polyPts(x, y, r * 0.72, 5, -Math.PI / 2),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      g.appendChild(svgEl('ellipse', {
        cx: x, cy: y, rx: r * 1.02, ry: r * 0.42,
        fill: 'none', stroke: acc, 'stroke-width': 1, opacity: '0.6',
      }));

    } else if (id === 'tempest_tower') {
      // 6각별 — 폭풍 방출 실루엣
      g.appendChild(svgEl('polygon', {
        points: this._starPts(x, y, r, r * 0.55, 6, -Math.PI / 2),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      g.appendChild(svgEl('circle', { cx: x, cy: y, r: r * 0.28, fill: acc, opacity: '0.55' }));

    } else if (id === 'void_sentinel') {
      // 세로 长 다이아몬드 + 감시자 눈
      g.appendChild(svgEl('polygon', {
        points: `${x},${y - r * 1.05} ${x + r * 0.62},${y} ${x},${y + r * 1.05} ${x - r * 0.62},${y}`,
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      g.appendChild(svgEl('ellipse', { cx: x, cy: y, rx: r * 0.30, ry: r * 0.16,
        fill: acc, opacity: '0.9' }));

    } else if (id === 'phantom_sniper') {
      // 长 다이아몬드 + 스코프 링
      g.appendChild(svgEl('polygon', {
        points: `${x},${y - r * 1.0} ${x + r * 0.5},${y} ${x},${y + r * 1.0} ${x - r * 0.5},${y}`,
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      g.appendChild(svgEl('circle', { cx: x, cy: y - r * 0.35, r: r * 0.26,
        fill: 'none', stroke: acc, 'stroke-width': 1.4, opacity: '0.9' }));
      g.appendChild(svgEl('line', { x1: x - r * 0.26, y1: y - r * 0.35, x2: x + r * 0.26, y2: y - r * 0.35,
        stroke: acc, 'stroke-width': 0.8, opacity: '0.7' }));

    } else if (id === 'shadow_weaver') {
      // 다이아몬드 + 거미줄 방사선
      g.appendChild(svgEl('polygon', {
        points: this._polyPts(x, y, r * 0.88, 4, -Math.PI / 4),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      for (let i = 0; i < 4; i++) {
        const a = i * Math.PI / 2 + Math.PI / 4;
        g.appendChild(svgEl('line', {
          x1: x, y1: y,
          x2: (x + Math.cos(a) * r * 1.05).toFixed(1), y2: (y + Math.sin(a) * r * 1.05).toFixed(1),
          stroke: acc, 'stroke-width': 0.8, opacity: '0.55',
        }));
      }

    // ── shape 필드 기반 폴백 (신규 DLC 타워 자동 대응) ──
    } else if (def.shape === 'archer') {
      g.appendChild(svgEl('polygon', {
        points: this._polyPts(x, y, r, 4, -Math.PI / 4),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));

    } else if (def.shape === 'mage') {
      g.appendChild(svgEl('polygon', {
        points: this._polyPts(x, y, r, 8, Math.PI / 8),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      g.appendChild(svgEl('line', { x1: x, y1: y - r * 0.55, x2: x, y2: y + r * 0.55,
        stroke: acc, 'stroke-width': 1.2, opacity: '0.7' }));
      g.appendChild(svgEl('line', { x1: x - r * 0.55, y1: y, x2: x + r * 0.55, y2: y,
        stroke: acc, 'stroke-width': 1.2, opacity: '0.7' }));

    } else if (def.shape === 'drake') {
      g.appendChild(svgEl('polygon', {
        points: this._starPts(x, y, r, r * 0.45, 5, -Math.PI / 2),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));

    } else if (def.shape === 'tesla') {
      g.appendChild(svgEl('polygon', {
        points: this._polyPts(x, y, r, 5, -Math.PI / 2),
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
      g.appendChild(svgEl('circle', { cx: x - r * 0.35, cy: y - r * 0.2, r: 2.5,
        fill: acc, opacity: '0.8' }));
      g.appendChild(svgEl('circle', { cx: x + r * 0.35, cy: y - r * 0.2, r: 2.5,
        fill: acc, opacity: '0.8' }));

    } else if (def.shape === 'druid') {
      g.appendChild(svgEl('circle', {
        cx: x, cy: y, r: r * 0.85, fill: col, stroke: acc, 'stroke-width': sw,
      }));
      for (let i = 0; i < 3; i++) {
        const a = (i * 2 * Math.PI / 3) - Math.PI / 2;
        g.appendChild(svgEl('circle', {
          cx: (x + r * 0.85 * Math.cos(a)).toFixed(1), cy: (y + r * 0.85 * Math.sin(a)).toFixed(1),
          r: r * 0.28, fill: acc, opacity: '0.85',
        }));
      }

    } else {
      // 기본 폴백: 원형
      g.appendChild(svgEl('circle', {
        cx: x, cy: y, r,
        fill: col, stroke: acc, 'stroke-width': sw,
      }));
    }

    // 중앙 이모지 아이콘 (공통)
    const icon = svgEl('text', {
      x, y,
      'text-anchor': 'middle', 'dominant-baseline': 'central',
      'font-size': `${HEX_SIZE * 0.55}px`,
      'pointer-events': 'none',
    });
    icon.textContent = def.icon;
    g.appendChild(icon);

    // 좌상단 림 하이라이트 (은은한 입체감)
    g.appendChild(svgEl('ellipse', {
      cx: x - r * 0.32, cy: y - r * 0.40, rx: r * 0.34, ry: r * 0.15,
      fill: '#fff', opacity: '0.10', transform: `rotate(-28, ${x}, ${y})`,
    }));

    return g;
  }

  // 사격 반동 애니메이션 — 타워가 잠깐 커졌다 돌아오는 효과
  kickTower(col, row) {
    const tg = document.getElementById(`tower-${col}-${row}`);
    if (!tg) return;
    const { x, y } = hexToPixel(col, row);
    tg.style.transformOrigin = `${x}px ${y}px`;
    tg.style.animation = 'none';
    void tg.offsetWidth;
    tg.style.animation = 'towerKick 0.14s ease-out';
    setTimeout(() => { if (tg) tg.style.animation = ''; }, 150);
  }

  removeTower(col, row) {
    const tg = document.getElementById(`tower-${col}-${row}`);
    if (tg) tg.remove();
    const key = `${col},${row}`;
    const cell = this.cellMap.get(key);
    if (cell) {
      const poly = cell.querySelector('.hex-bg');
      poly.setAttribute('fill', poly.dataset.baseFill ?? '#16162e');
      poly.setAttribute('stroke', _shade(_mapHexColor ?? '#222240', -0.12));
      delete cell.dataset.tower;
    }
    // 숨겼던 환경 장식 복원
    this.decorMap.get(key)?.removeAttribute('display');
  }

  // 타워에 강화 시각 표시 (augCount: 1 또는 2)
  markAugmented(col, row, towerDef, augCount = 1) {
    const tg = document.getElementById(`tower-${col}-${row}`);
    if (!tg) return;

    // 기존 강화 표시 제거 후 재렌더
    tg.querySelectorAll('.aug-indicator').forEach(el => el.remove());

    const { x, y } = hexToPixel(col, row);
    const count = Math.min(augCount, 2);

    for (let i = 0; i < count; i++) {
      // 1강화: 중앙 위, 2강화: 좌/우 두 점
      const offsetX = count === 1 ? 0 : (i === 0 ? -5 : 5);
      const offsetY = -HEX_SIZE * 0.54;
      const dot = svgEl('circle', {
        cx: x + offsetX,
        cy: y + offsetY,
        r: 4,
        fill: '#D4AF37',
        stroke: '#1A1A2E',
        'stroke-width': 1,
        class: 'aug-indicator',
      });
      tg.appendChild(dot);
    }
  }

  setTowerStar(col, row, starLevel) {
    const tg = document.getElementById(`tower-${col}-${row}`);
    if (!tg) return;
    // 기존 배지 제거
    tg.querySelectorAll('.star-badge').forEach(el => el.remove());
    if (starLevel <= 1) return; // 1★: 배지 없음

    const { x, y } = hexToPixel(col, row);
    // augment dot 위치: y - HEX_SIZE * 0.54 (상단)
    // 별 배지 위치: y + HEX_SIZE * 0.60 (하단) — 약 38px 간격으로 완전 분리
    const badge = svgEl('text', {
      x,
      y: y + HEX_SIZE * 0.60,
      'text-anchor': 'middle',
      'dominant-baseline': 'central',
      'font-size': `${HEX_SIZE * 0.35}px`,
      fill: starLevel === 2 ? '#FFD700' : '#FF8C00',
      stroke: '#1A1A2E',
      'stroke-width': 0.5,
      class: 'star-badge',
      'pointer-events': 'none',
    });
    badge.textContent = starLevel === 2 ? '★' : '★★';
    tg.appendChild(badge);
  }

  // ── 범위 표시 (rangePx: 픽셀 단위 or rangeHex: 헥스 단위) ──
  showRange(col, row, rangePx) {
    this.hideRange();
    const { x, y } = hexToPixel(col, row);
    const g = svgEl('g', { id: 'range-indicator', 'pointer-events': 'none' });
    // 채움 원
    g.appendChild(svgEl('circle', {
      cx: x, cy: y, r: rangePx,
      fill: 'rgba(212,175,55,0.07)',
    }));
    // 테두리 실선
    g.appendChild(svgEl('circle', {
      cx: x, cy: y, r: rangePx,
      fill: 'none',
      stroke: 'rgba(212,175,55,0.55)',
      'stroke-width': 1.5,
      'stroke-dasharray': '6 4',
    }));
    this.svg.insertBefore(g, this.towerLayer);
  }

  hideRange() {
    document.getElementById('range-indicator')?.remove();
  }

  // ── 셀 선택 하이라이트 ────────────────────────────────
  selectCell(col, row) {
    this.clearSelection();
    const cell = this.cellMap.get(`${col},${row}`);
    if (cell) {
      cell.classList.add('selected-cell');
      this._selectedCell = `${col},${row}`;
    }
  }

  clearSelection() {
    if (this._selectedCell) {
      this.cellMap.get(this._selectedCell)?.classList.remove('selected-cell');
      this._selectedCell = null;
    }
    this.hideRange();
  }

  // ── 포구 요소 접근자 (cannon/ballista/divine_cannon 회전용) ──
  getTowerBarrel(col, row) {
    const tg = document.getElementById(`tower-${col}-${row}`);
    return tg?.querySelector('.tower-barrel') ?? null;
  }

  // ── 적 레이어 접근자 ──────────────────────────────────
  getEnemyLayer()      { return this.enemyLayer; }
  getProjectileLayer() { return this.projectileLayer; }
}
