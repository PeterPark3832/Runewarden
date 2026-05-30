/**
 * Storm Imperium DLC — 맵 (3종)
 * Storm 바이옴 — 폭풍 제국 테마
 * 그리드: COLS=14, ROWS=9
 */

export const STORM_MAPS = [

  // ── 맵 L: Cloud Citadel (구름 요새) ──────────────────
  // U자형 경로. 중앙 배치 타워가 세 구간을 커버. 28칸.
  {
    id:     'cloud_citadel',
    name:   'Cloud Citadel',
    nameKo: '구름 요새',
    icon:   '⚡',
    desc:   'A storm-shrouded citadel. The U-shaped path lets well-placed towers cover three segments.',
    descKo: '폭풍에 휩싸인 요새. U자형 경로로 잘 배치된 타워가 세 구간을 커버합니다.',
    theme:  'storm',
    hexColor: '#0a1a2a', pathColor: 'rgba(100,220,255,0.35)',
    path: [
      [0,7],[1,7],[2,7],[3,7],
      [3,6],[3,5],[3,4],[3,3],[3,2],[3,1],
      [4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],
      [10,2],[10,3],[10,4],[10,5],[10,6],[10,7],
      [11,7],[12,7],[13,7],
    ],
    dlc: 'storm_imperium',
  },

  // ── 맵 M: Storm Strait (폭풍 해협) ──────────────────
  // S자형 지그재그. 34칸 (최장). 치밀한 배치 필요.
  {
    id:     'storm_strait',
    name:   'Storm Strait',
    nameKo: '폭풍 해협',
    icon:   '🌪️',
    desc:   'A howling S-shaped strait. The longest storm path — time every placement carefully.',
    descKo: '울부짖는 S자형 해협. 가장 긴 폭풍 경로 — 모든 배치를 신중하게 계획하세요.',
    theme:  'storm',
    hexColor: '#061220', pathColor: 'rgba(78,205,196,0.38)',
    path: [
      [0,2],[1,2],[2,2],[3,2],[4,2],
      [4,3],[4,4],[4,5],[4,6],[4,7],
      [5,7],[6,7],[7,7],[8,7],
      [8,6],[8,5],[8,4],[8,3],[8,2],[8,1],
      [9,1],[10,1],[11,1],[12,1],[13,1],
      [13,2],[13,3],[13,4],[13,5],[13,6],[13,7],
    ],
    dlc: 'storm_imperium',
  },

  // ── 맵 N: Lightning Corridor (번개 회랑) ─────────────
  // 직선 + S자 전환. 22칸. 중앙 커버 포지션 존재.
  {
    id:     'lightning_corridor',
    name:   'Lightning Corridor',
    nameKo: '번개 회랑',
    icon:   '🌩️',
    desc:   'A straight corridor that bends with lightning speed. One pivot covers two lanes.',
    descKo: '번개처럼 꺾이는 직선 회랑. 하나의 중심점이 두 구간을 커버합니다.',
    theme:  'storm',
    hexColor: '#0d1b2a', pathColor: 'rgba(0,180,216,0.40)',
    path: [
      [0,5],[1,5],[2,5],[3,5],[4,5],
      [5,5],[5,4],[5,3],[5,2],[5,1],
      [6,1],[7,1],[8,1],[9,1],[10,1],
      [10,2],[10,3],[10,4],[10,5],
      [11,5],[12,5],[13,5],
    ],
    dlc: 'storm_imperium',
  },
];
