// 보스 전용 SVG 일러스트 — 원+왕관 스키매틱을 대체하는 정밀 실루엣
// 좌표계: 중심 (0,0), 명목 반지름 30 기준으로 작화 → def.size/30 배율로 스케일.
// 그라디언트 defs는 게임 루트 SVG에 1회 주입 (보스는 풀링 제외라 재사용 이슈 없음).

import { svgEl } from './MapRenderer.js';

// ── defs 주입 (루트 SVG에 1회) ────────────────────────
function _ensureDefs() {
  if (document.getElementById('boss-art-defs')) return;
  const root = document.querySelector('#map-svg') ?? document.querySelector('svg');
  if (!root) return;
  const defs = svgEl('defs', { id: 'boss-art-defs' });

  const mkLin = (id, stops) => {
    const lg = svgEl('linearGradient', { id, x1: '0', y1: '0', x2: '0', y2: '1' });
    for (const [off, col] of stops) {
      const s = svgEl('stop');
      s.setAttribute('offset', off);
      s.setAttribute('stop-color', col);
      lg.appendChild(s);
    }
    defs.appendChild(lg);
  };
  const mkRad = (id, stops) => {
    const rg = svgEl('radialGradient', { id, cx: '50%', cy: '50%', r: '50%' });
    for (const [off, col, op] of stops) {
      const s = svgEl('stop');
      s.setAttribute('offset', off);
      s.setAttribute('stop-color', col);
      if (op !== undefined) s.setAttribute('stop-opacity', op);
      rg.appendChild(s);
    }
    defs.appendChild(rg);
  };

  mkLin('baIron',   [['0%', '#e8c860'], ['45%', '#b8860b'], ['100%', '#5a4206']]);
  mkLin('baIronDk', [['0%', '#8a6a20'], ['100%', '#3a2c08']]);
  mkLin('baVoid',   [['0%', '#4a1a7a'], ['55%', '#28104a'], ['100%', '#120826']]);
  mkLin('baDrag',   [['0%', '#5a2a8a'], ['55%', '#32104f'], ['100%', '#180830']]);
  mkLin('baColo',   [['0%', '#3a2a55'], ['55%', '#241640'], ['100%', '#100822']]);
  mkLin('baSolar',  [['0%', '#ffd860'], ['50%', '#e8791a'], ['100%', '#7a3a08']]);
  mkLin('baStorm',  [['0%', '#2a6a7a'], ['50%', '#123a4a'], ['100%', '#081e2a']]);
  mkLin('baBolt',   [['0%', '#aefcff'], ['100%', '#00b4d8']]);
  mkRad('baEyeCyan', [['0%', '#ffffff'], ['35%', '#7ef0ff'], ['100%', '#00b0d0', 0]]);
  mkRad('baEyeMag',  [['0%', '#ffffff'], ['35%', '#ff70e0'], ['100%', '#c000a0', 0]]);
  mkRad('baSunCore', [['0%', '#fff8e0'], ['45%', '#f5c518'], ['100%', '#e8791a', 0.15]]);

  root.insertBefore(defs, root.firstChild);
}

// ── 소형 헬퍼 ─────────────────────────────────────────
const path = (g, d, attrs) => g.appendChild(svgEl('path', { d, ...attrs }));
const poly = (g, points, attrs) => g.appendChild(svgEl('polygon', { points, ...attrs }));
const circ = (g, cx, cy, r, attrs) => g.appendChild(svgEl('circle', { cx, cy, r, ...attrs }));

// ═══════════════════════════════════════════════════════
// 보스별 작화 함수 — 명목 반지름 30 좌표계, 중심 (0,0)
// ═══════════════════════════════════════════════════════
const ART = {

  // ── Ironclad (W5) — 황금 갑주 기사 ──────────────────
  boss(g) {
    // 어깨 갑주
    path(g, 'M -26 -2 Q -30 -14 -18 -16 L -8 -10 L -12 4 Z',
      { fill: 'url(#baIronDk)', stroke: '#FFD700', 'stroke-width': 1.2 });
    path(g, 'M 26 -2 Q 30 -14 18 -16 L 8 -10 L 12 4 Z',
      { fill: 'url(#baIronDk)', stroke: '#FFD700', 'stroke-width': 1.2 });
    // 몸통 갑주
    path(g, 'M -12 -12 L 12 -12 L 16 8 Q 8 20 0 22 Q -8 20 -16 8 Z',
      { fill: 'url(#baIron)', stroke: '#FFD700', 'stroke-width': 1.4 });
    path(g, 'M -8 -6 H 8 M -10 2 H 10 M -7 10 H 7',
      { fill: 'none', stroke: '#7a5c10', 'stroke-width': 1, opacity: '0.8' });
    // 타워 실드 (전면 중앙)
    path(g, 'M -7 -4 L 7 -4 L 7 12 Q 4 18 0 20 Q -4 18 -7 12 Z',
      { fill: '#2a2010', stroke: '#FFD700', 'stroke-width': 1.2 });
    path(g, 'M 0 -2 L 0 17 M -4 6 L 4 6',
      { fill: 'none', stroke: '#FFD700', 'stroke-width': 1.2, opacity: '0.9' });
    // 투구
    path(g, 'M 0 -28 Q 11 -26 11 -14 L 8 -8 L -8 -8 L -11 -14 Q -11 -26 0 -28 Z',
      { fill: 'url(#baIron)', stroke: '#FFD700', 'stroke-width': 1.4 });
    // 투구 장식 (볏)
    path(g, 'M 0 -28 L 0 -34 M -3 -30 Q 0 -37 3 -30',
      { fill: 'none', stroke: '#C0392B', 'stroke-width': 2, 'stroke-linecap': 'round' });
    // T-바이저
    path(g, 'M 0 -22 L 0 -10 M -6 -17 L 6 -17',
      { fill: 'none', stroke: '#100c04', 'stroke-width': 3, 'stroke-linecap': 'round' });
    path(g, 'M -6 -17 L 6 -17', { fill: 'none', stroke: '#ffec9e', 'stroke-width': 1, opacity: '0.85' });
  },

  // ── Void Titan (W10) — 심연 거인 ────────────────────
  void_titan(g) {
    // 등 뒤 보이드 균열 후광
    for (let i = 0; i < 5; i++) {
      const a = -Math.PI / 2 + (i - 2) * 0.55;
      path(g, `M 0 0 L ${(26 * Math.cos(a)).toFixed(1)} ${(26 * Math.sin(a)).toFixed(1)}`,
        { stroke: '#9B59B6', 'stroke-width': 1.2, opacity: '0.45' });
    }
    // 웅크린 어깨 실루엣
    path(g, 'M -24 6 Q -28 -12 -12 -16 L 0 -12 L 12 -16 Q 28 -12 24 6 Q 20 20 0 24 Q -20 20 -24 6 Z',
      { fill: 'url(#baVoid)', stroke: '#9B59B6', 'stroke-width': 1.6 });
    // 흉부 균열 (빛나는 보라)
    path(g, 'M -2 -6 L 3 0 L -1 4 L 4 10 M 6 -4 L 9 2 M -8 -2 L -11 6',
      { fill: 'none', stroke: '#E8DAEF', 'stroke-width': 1.3, opacity: '0.85', 'stroke-linecap': 'round' });
    // 머리 (몸에 파묻힌 형태)
    path(g, 'M 0 -24 Q 9 -22 9 -13 L 6 -8 L -6 -8 L -9 -13 Q -9 -22 0 -24 Z',
      { fill: '#1c0c36', stroke: '#9B59B6', 'stroke-width': 1.4 });
    // 곡선 뿔 2개
    path(g, 'M -8 -20 Q -18 -24 -20 -34 Q -12 -30 -6 -24 Z',
      { fill: '#2a1050', stroke: '#9B59B6', 'stroke-width': 1 });
    path(g, 'M 8 -20 Q 18 -24 20 -34 Q 12 -30 6 -24 Z',
      { fill: '#2a1050', stroke: '#9B59B6', 'stroke-width': 1 });
    // 외눈 (마젠타 발광)
    circ(g, 0, -15, 6.5, { fill: 'url(#baEyeMag)' });
    circ(g, 0, -15, 2, { fill: '#fff' });
    // 주먹 (좌우 하단)
    circ(g, -19, 14, 6, { fill: '#1c0c36', stroke: '#9B59B6', 'stroke-width': 1.3 });
    circ(g, 19, 14, 6, { fill: '#1c0c36', stroke: '#9B59B6', 'stroke-width': 1.3 });
    path(g, 'M -22 11 L -16 11 M -22 14 L -16 14 M 16 11 L 22 11 M 16 14 L 22 14',
      { stroke: '#6a3a9a', 'stroke-width': 0.9, opacity: '0.8' });
  },

  // ── Abyssal Dragon (W15) — 심연 드래곤 ──────────────
  abyssal_dragon(g) {
    // 좌우 박쥐 날개 (3지골 막)
    path(g, 'M -8 -4 L -20 -18 L -19 -8 L -30 -14 L -26 -2 L -36 -2 L -27 8 L -33 14 L -18 12 Q -11 8 -8 2 Z',
      { fill: 'url(#baDrag)', stroke: '#8a40d0', 'stroke-width': 1.1, 'stroke-linejoin': 'round' });
    path(g, 'M -9 -2 L -20 -14 M -10 1 L -27 -4 M -10 4 L -28 6',
      { fill: 'none', stroke: '#a060e0', 'stroke-width': 0.7, opacity: '0.55' });
    path(g, 'M 8 -4 L 20 -18 L 19 -8 L 30 -14 L 26 -2 L 36 -2 L 27 8 L 33 14 L 18 12 Q 11 8 8 2 Z',
      { fill: 'url(#baDrag)', stroke: '#8a40d0', 'stroke-width': 1.1, 'stroke-linejoin': 'round' });
    path(g, 'M 9 -2 L 20 -14 M 10 1 L 27 -4 M 10 4 L 28 6',
      { fill: 'none', stroke: '#a060e0', 'stroke-width': 0.7, opacity: '0.55' });
    // 꼬리 (S자 + 창끝)
    path(g, 'M 0 16 Q 4 24 -2 28 Q -10 32 -16 28 L -12 27 Q -6 27 -4 23 Q -2 19 -3 16 Z',
      { fill: 'url(#baDrag)', stroke: '#8a40d0', 'stroke-width': 1 });
    poly(g, '-16,28 -22,32 -15,32', { fill: '#3a1866', stroke: '#8a40d0', 'stroke-width': 0.8 });
    // 목-몸통
    path(g, 'M 0 -10 Q 9 -6 10 4 Q 10 14 0 18 Q -10 14 -10 4 Q -9 -6 0 -10 Z',
      { fill: 'url(#baDrag)', stroke: '#8a40d0', 'stroke-width': 1.4 });
    // 배 비늘
    path(g, 'M -5 -2 H 5 M -6 3 H 6 M -5 8 H 5 M -4 13 H 4',
      { stroke: '#c8a0f0', 'stroke-width': 1, opacity: '0.5' });
    // 가슴 화로 (심연 코어)
    circ(g, 0, 5, 3.4, { fill: '#c060ff', opacity: '0.3' });
    circ(g, 0, 5, 1.6, { fill: '#e8b0ff' });
    // 머리 — 길쭉한 주둥이 + 뿔
    path(g, 'M 0 -30 Q 7 -29 8 -22 L 6 -14 Q 4 -10 0 -9 Q -4 -10 -6 -14 L -8 -22 Q -7 -29 0 -30 Z',
      { fill: 'url(#baDrag)', stroke: '#8a40d0', 'stroke-width': 1.3 });
    // 주둥이/콧구멍
    path(g, 'M -3 -27 Q 0 -29 3 -27', { fill: 'none', stroke: '#c8a0f0', 'stroke-width': 0.8, opacity: '0.7' });
    circ(g, -1.6, -26.5, 0.7, { fill: '#1a0830' });
    circ(g, 1.6, -26.5, 0.7, { fill: '#1a0830' });
    // 후방 스윕 뿔 2쌍
    path(g, 'M -6 -24 Q -14 -28 -16 -36 Q -9 -32 -4 -27 Z',
      { fill: '#2a1050', stroke: '#8a40d0', 'stroke-width': 0.9 });
    path(g, 'M 6 -24 Q 14 -28 16 -36 Q 9 -32 4 -27 Z',
      { fill: '#2a1050', stroke: '#8a40d0', 'stroke-width': 0.9 });
    path(g, 'M -4 -21 Q -9 -24 -10 -30 Q -5 -27 -2 -23 Z', { fill: '#3a1866', opacity: '0.9' });
    path(g, 'M 4 -21 Q 9 -24 10 -30 Q 5 -27 2 -23 Z', { fill: '#3a1866', opacity: '0.9' });
    // 눈 (사이언 발광, 치켜뜬 각도)
    circ(g, -4, -19, 3.6, { fill: 'url(#baEyeCyan)' });
    circ(g, 4, -19, 3.6, { fill: 'url(#baEyeCyan)' });
    path(g, 'M -7 -21 L -1.5 -18.5 M 7 -21 L 1.5 -18.5',
      { stroke: '#082a34', 'stroke-width': 1.3, 'stroke-linecap': 'round' });
    // 이빨 라인
    path(g, 'M -4 -12 L -2.5 -9.5 L -1 -12 L 0 -9 L 1 -12 L 2.5 -9.5 L 4 -12',
      { fill: 'none', stroke: '#e8d8ff', 'stroke-width': 0.9, 'stroke-linejoin': 'round' });
    // 등 가시 (목줄기)
    poly(g, '-1.5,-9 0,-13 1.5,-9', { fill: '#3a1866' });
    poly(g, '-1.5,-4 0,-8 1.5,-4', { fill: '#3a1866' });
  },

  // ── Shadow Colossus (W23) — 그림자 거상 ─────────────
  shadow_colossus(g) {
    // 부유 파편 (배경)
    poly(g, '-30,-14 -27,-9 -32,-8', { fill: '#6600CC', opacity: '0.55' });
    poly(g, '30,-10 33,-5 28,-4', { fill: '#6600CC', opacity: '0.5' });
    poly(g, '26,20 29,24 24,25', { fill: '#5500AA', opacity: '0.45' });
    // 거대한 각진 몸통 (역사다리꼴 석상 — 어깨 넓고 허리 좁게)
    path(g, 'M -23 -14 L 23 -14 L 18 8 L 12 24 L -12 24 L -18 8 Z',
      { fill: 'url(#baColo)', stroke: '#6600CC', 'stroke-width': 1.6 });
    // 석판 조각선
    path(g, 'M -20 -4 H 20 M -17 8 H 17 M 0 -14 L 0 24 M -9 8 L -10 24 M 9 8 L 10 24',
      { fill: 'none', stroke: '#0c0618', 'stroke-width': 1.4, opacity: '0.9' });
    // 빛나는 균열 (마법 룬 빛)
    path(g, 'M -6 -10 L -2 -2 L -7 2 M 5 -8 L 8 0 L 4 6 L 8 12',
      { fill: 'none', stroke: '#b060ff', 'stroke-width': 1.4, opacity: '0.9', 'stroke-linecap': 'round' });
    // 코어 (가슴 중앙)
    circ(g, 0, 2, 5, { fill: '#6600CC', opacity: '0.35' });
    circ(g, 0, 2, 2.4, { fill: '#c890ff' });
    // 주먹 (거대, 좌우)
    path(g, 'M -22 4 L -30 8 L -30 18 L -22 20 Z',
      { fill: '#1a0e33', stroke: '#6600CC', 'stroke-width': 1.3 });
    path(g, 'M 22 4 L 30 8 L 30 18 L 22 20 Z',
      { fill: '#1a0e33', stroke: '#6600CC', 'stroke-width': 1.3 });
    path(g, 'M -29 11 L -23 11 M -29 15 L -23 15 M 23 11 L 29 11 M 23 15 L 29 15',
      { stroke: '#3a1a66', 'stroke-width': 1 });
    // 머리 (몸통 위 각진 두상)
    path(g, 'M -8 -27 L 8 -27 L 10 -14 L -10 -14 Z',
      { fill: 'url(#baColo)', stroke: '#6600CC', 'stroke-width': 1.4 });
    // 눈 슬릿 (가로 발광선)
    path(g, 'M -6 -21 L -1.5 -21 M 1.5 -21 L 6 -21',
      { stroke: '#e0b0ff', 'stroke-width': 2.2, 'stroke-linecap': 'round' });
  },

  // ── Solar Titan (W28 중간보스) — 태양 거병 ──────────
  solar_titan(g) {
    // 후광 원반
    circ(g, 0, -6, 20, { fill: 'none', stroke: '#F5C518', 'stroke-width': 1.4, opacity: '0.55' });
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      path(g, `M ${(21 * Math.cos(a)).toFixed(1)} ${(-6 + 21 * Math.sin(a)).toFixed(1)} L ${(26 * Math.cos(a)).toFixed(1)} ${(-6 + 26 * Math.sin(a)).toFixed(1)}`,
        { stroke: '#F5C518', 'stroke-width': 1.6, opacity: '0.6', 'stroke-linecap': 'round' });
    }
    // 어깨 갑주 (불꽃 형태)
    path(g, 'M -24 0 Q -27 -12 -15 -14 L -7 -8 L -11 4 Z',
      { fill: 'url(#baSolar)', stroke: '#ffd860', 'stroke-width': 1.1 });
    path(g, 'M 24 0 Q 27 -12 15 -14 L 7 -8 L 11 4 Z',
      { fill: 'url(#baSolar)', stroke: '#ffd860', 'stroke-width': 1.1 });
    // 몸통
    path(g, 'M -11 -10 L 11 -10 L 15 8 Q 8 20 0 22 Q -8 20 -15 8 Z',
      { fill: 'url(#baSolar)', stroke: '#ffd860', 'stroke-width': 1.3 });
    // 태양 문장 (가슴)
    circ(g, 0, 4, 5.5, { fill: '#7a3a08', stroke: '#ffd860', 'stroke-width': 1 });
    circ(g, 0, 4, 2.4, { fill: '#fff0c0' });
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      path(g, `M ${(6.5 * Math.cos(a)).toFixed(1)} ${(4 + 6.5 * Math.sin(a)).toFixed(1)} L ${(9 * Math.cos(a)).toFixed(1)} ${(4 + 9 * Math.sin(a)).toFixed(1)}`,
        { stroke: '#ffd860', 'stroke-width': 1, opacity: '0.9' });
    }
    // 투구 (관 형태)
    path(g, 'M 0 -26 Q 10 -24 10 -14 L 7 -8 L -7 -8 L -10 -14 Q -10 -24 0 -26 Z',
      { fill: 'url(#baSolar)', stroke: '#ffd860', 'stroke-width': 1.3 });
    poly(g, '-8,-24 -5,-31 -2,-25', { fill: '#ffd860' });
    poly(g, '-1,-26 2,-34 5,-26', { fill: '#ffd860' });
    poly(g, '4,-24 8,-30 9,-23', { fill: '#ffd860' });
    // 바이저 (눈부신 가로선)
    path(g, 'M -6 -16 L 6 -16', { stroke: '#fff6d0', 'stroke-width': 2.4, 'stroke-linecap': 'round' });
  },

  // ── Sun God (W31 최종보스) — 태양신 ─────────────────
  sun_god(g) {
    // 코로나 (삼각 광선 12개, 교차 길이)
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const len = i % 2 === 0 ? 34 : 26;
      const w = i % 2 === 0 ? 4.5 : 3;
      const x1 = 18 * Math.cos(a), y1 = 18 * Math.sin(a);
      const px = -Math.sin(a) * w, py = Math.cos(a) * w;
      poly(g, `${(x1 + px).toFixed(1)},${(y1 + py).toFixed(1)} ${(len * Math.cos(a)).toFixed(1)},${(len * Math.sin(a)).toFixed(1)} ${(x1 - px).toFixed(1)},${(y1 - py).toFixed(1)}`,
        { fill: i % 2 === 0 ? '#F5C518' : '#E8791A', opacity: i % 2 === 0 ? '0.85' : '0.6' });
    }
    // 태양 원반
    circ(g, 0, 0, 19, { fill: 'url(#baSunCore)' });
    circ(g, 0, 0, 19, { fill: 'none', stroke: '#fff0c0', 'stroke-width': 1.2, opacity: '0.9' });
    // 신의 가면 (평온한 얼굴)
    path(g, 'M 0 -13 Q 10 -11 10 -1 Q 10 8 0 11 Q -10 8 -10 -1 Q -10 -11 0 -13 Z',
      { fill: '#fff4d0', stroke: '#e8a020', 'stroke-width': 1 });
    // 감은 눈 (곡선)
    path(g, 'M -7 -3 Q -4.5 -1 -2 -3 M 2 -3 Q 4.5 -1 7 -3',
      { fill: 'none', stroke: '#8a5a10', 'stroke-width': 1.3, 'stroke-linecap': 'round' });
    // 이마 제3의 눈
    path(g, 'M -2.5 -8 Q 0 -5.5 2.5 -8 Q 0 -10.5 -2.5 -8 Z',
      { fill: '#e8791a', stroke: '#8a5a10', 'stroke-width': 0.7 });
    circ(g, 0, -8, 1, { fill: '#fff' });
    // 입 (미소 없는 직선)
    path(g, 'M -3 6 Q 0 7.5 3 6', { fill: 'none', stroke: '#8a5a10', 'stroke-width': 1.1, 'stroke-linecap': 'round' });
    // 부유 왕관 (원반 위)
    path(g, 'M -9 -20 L -6 -27 L -3 -21 L 0 -30 L 3 -21 L 6 -27 L 9 -20 Z',
      { fill: '#FFD700', stroke: '#b8860b', 'stroke-width': 0.9 });
    circ(g, 0, -24, 1.4, { fill: '#fff4c0' });
  },

  // ── Typhoon Warlord (W36 중간보스) — 태풍 군주 ──────
  typhoon_warlord(g) {
    // 사이클론 대좌 (동심 호)
    path(g, 'M -22 18 Q 0 26 22 18 Q 10 24 0 24 Q -10 24 -22 18 Z', { fill: '#0a2a3a', opacity: '0.9' });
    path(g, 'M -16 22 Q 0 28 16 22', { fill: 'none', stroke: '#48CAE4', 'stroke-width': 1.2, opacity: '0.6' });
    path(g, 'M -10 26 Q 0 30 10 26', { fill: 'none', stroke: '#48CAE4', 'stroke-width': 1, opacity: '0.4' });
    // 좌우 회오리 칼날 (곡선 쌍검)
    path(g, 'M -14 -2 Q -28 -6 -32 -18 Q -24 -12 -18 -10 Q -22 -16 -20 -24 Q -15 -14 -12 -8 Z',
      { fill: '#0e3a50', stroke: '#48CAE4', 'stroke-width': 1.1 });
    path(g, 'M 14 -2 Q 28 -6 32 -18 Q 24 -12 18 -10 Q 22 -16 20 -24 Q 15 -14 12 -8 Z',
      { fill: '#0e3a50', stroke: '#48CAE4', 'stroke-width': 1.1 });
    // 몸통 (경갑)
    path(g, 'M -10 -10 L 10 -10 L 14 6 Q 7 18 0 20 Q -7 18 -14 6 Z',
      { fill: 'url(#baStorm)', stroke: '#48CAE4', 'stroke-width': 1.3 });
    // 바람 문양 (가슴 소용돌이)
    path(g, 'M 4 2 Q 4 -3 -1 -3 Q -6 -3 -6 2 Q -6 7 -1 7 Q 2 7 3 5',
      { fill: 'none', stroke: '#7ee8f0', 'stroke-width': 1.4, 'stroke-linecap': 'round' });
    // 어깨 깃털 갑주
    path(g, 'M -10 -10 L -20 -14 L -14 -8 L -22 -6 L -12 -4 Z', { fill: '#123a4a', stroke: '#48CAE4', 'stroke-width': 0.9 });
    path(g, 'M 10 -10 L 20 -14 L 14 -8 L 22 -6 L 12 -4 Z', { fill: '#123a4a', stroke: '#48CAE4', 'stroke-width': 0.9 });
    // 투구 — 새 부리형 + 뒤로 뻗는 깃
    path(g, 'M 0 -26 Q 9 -24 9 -14 L 5 -8 L -5 -8 L -9 -14 Q -9 -24 0 -26 Z',
      { fill: 'url(#baStorm)', stroke: '#48CAE4', 'stroke-width': 1.2 });
    path(g, 'M 0 -14 L 0 -6 L -3 -10 Z', { fill: '#0a2a3a', stroke: '#48CAE4', 'stroke-width': 0.7 });
    path(g, 'M -7 -24 Q -14 -30 -13 -37 Q -8 -31 -4 -27 Z', { fill: '#0e3a50', stroke: '#48CAE4', 'stroke-width': 0.9 });
    path(g, 'M 7 -24 Q 14 -30 13 -37 Q 8 -31 4 -27 Z', { fill: '#0e3a50', stroke: '#48CAE4', 'stroke-width': 0.9 });
    // 눈 (폭풍 사이언)
    circ(g, -3.5, -17, 3, { fill: 'url(#baEyeCyan)' });
    circ(g, 3.5, -17, 3, { fill: 'url(#baEyeCyan)' });
  },

  // ── Tempest Sovereign (W39 최종보스) — 폭풍 군주 ────
  tempest_sovereign(g) {
    // 폭풍 구름 대좌
    g.appendChild(svgEl('ellipse', { cx: 0, cy: 22, rx: 24, ry: 6, fill: '#0a2432', opacity: '0.9' }));
    g.appendChild(svgEl('ellipse', { cx: -14, cy: 20, rx: 9, ry: 4, fill: '#0e2e40', opacity: '0.85' }));
    g.appendChild(svgEl('ellipse', { cx: 14, cy: 20, rx: 9, ry: 4, fill: '#0e2e40', opacity: '0.85' }));
    // 좌우 부유 번개
    path(g, 'M -26 -6 L -30 2 L -27 2 L -31 10',
      { fill: 'none', stroke: '#7ee8f0', 'stroke-width': 1.4, 'stroke-linecap': 'round', opacity: '0.85' });
    path(g, 'M 26 -6 L 30 2 L 27 2 L 31 10',
      { fill: 'none', stroke: '#7ee8f0', 'stroke-width': 1.4, 'stroke-linecap': 'round', opacity: '0.85' });
    circ(g, -26, -8, 1.2, { fill: '#aefcff' });
    circ(g, 26, -8, 1.2, { fill: '#aefcff' });
    // 망토
    path(g, 'M 0 -14 L 17 -2 L 13 20 L 8 14 L 0 19 L -8 14 L -13 20 L -17 -2 Z',
      { fill: '#0a2434', stroke: '#1e5a70', 'stroke-width': 1 });
    // 어깨 갑주
    path(g, 'M -16 -8 Q -19 -16 -11 -17 L -4 -13 L -7 -5 Z',
      { fill: 'url(#baStorm)', stroke: '#4ecdc4', 'stroke-width': 1 });
    path(g, 'M 16 -8 Q 19 -16 11 -17 L 4 -13 L 7 -5 Z',
      { fill: 'url(#baStorm)', stroke: '#4ecdc4', 'stroke-width': 1 });
    path(g, 'M -15 -14 L -20 -21 M 15 -14 L 20 -21',
      { stroke: '#4ecdc4', 'stroke-width': 1.2, 'stroke-linecap': 'round' });
    // 흉갑
    path(g, 'M -8 -12 L 8 -12 L 11 2 Q 6 12 0 14 Q -6 12 -11 2 Z',
      { fill: 'url(#baStorm)', stroke: '#3ab0c0', 'stroke-width': 1.2 });
    path(g, 'M -6 -7 H 6 M -8 -2 H 8', { stroke: '#2a8a9e', 'stroke-width': 0.7, opacity: '0.8' });
    // 가슴 번개 룬
    path(g, 'M 1.5 -8 L -2.5 0 L 0 0 L -2.5 8 L 4 -1 L 1 -1 L 4.5 -8 Z', { fill: 'url(#baBolt)' });
    // 투구
    path(g, 'M 0 -28 Q 8 -26 8 -17 L 5 -12 L -5 -12 L -8 -17 Q -8 -26 0 -28 Z',
      { fill: 'url(#baStorm)', stroke: '#4ecdc4', 'stroke-width': 1.2 });
    path(g, 'M 0 -28 L 0 -12', { stroke: '#0a2a36', 'stroke-width': 1.2 });
    // 눈 슬릿
    path(g, 'M -5.5 -19 L -1.5 -18.4 M 5.5 -19 L 1.5 -18.4',
      { stroke: '#aefcff', 'stroke-width': 1.8, 'stroke-linecap': 'round' });
    // 번개 왕관
    path(g, 'M -8 -25 L -10 -34 L -6 -29 L -4.5 -37 L -1.5 -30 L 0 -40 L 1.5 -30 L 4.5 -37 L 6 -29 L 10 -34 L 8 -25',
      { fill: 'none', stroke: 'url(#baBolt)', 'stroke-width': 1.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' });
  },
};

/**
 * 보스 전용 아트를 group에 추가한다.
 * @returns {boolean} 해당 타입의 아트가 존재해 그렸으면 true
 */
export function drawBossArt(group, type, size) {
  const fn = ART[type];
  if (!fn) return false;
  _ensureDefs();
  const u = size / 30;
  const art = svgEl('g', { class: 'boss-art', 'pointer-events': 'none' });
  if (Math.abs(u - 1) > 0.01) art.setAttribute('transform', `scale(${u.toFixed(3)})`);
  fn(art);
  group.appendChild(art);
  return true;
}

export const BOSS_ART_TYPES = Object.keys(ART);
