// 카드별 전용 아트 — makeCardArtSVG의 기하 패턴 폴백을 대체하는 미니 씬 일러스트.
// viewBox 100×50 (카드 아트 존 비율). 등록되지 않은 카드는 기존 타입별 패턴 사용.
// 문자열 템플릿 SVG — DOM 의존 없음 (innerHTML로 삽입됨).

// 공통 그라디언트/배경 헬퍼 — 각 아트가 자체 <defs>를 갖되 id 충돌 방지 접두사 사용
const sky = (id, top, bottom) =>
  `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${top}"/><stop offset="100%" stop-color="${bottom}"/></linearGradient>`;
const rad = (id, stops) =>
  `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">${stops.map(([o, c, a]) =>
    `<stop offset="${o}" stop-color="${c}"${a !== undefined ? ` stop-opacity="${a}"` : ''}/>`).join('')}</radialGradient>`;
const wrap = (defs, body) =>
  `<svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg"><defs>${defs}</defs>${body}</svg>`;

export const CARD_ART = {

  // ── 소환: Archer Tower — 달빛 감시탑 ─────────────────
  summon_archer: () => wrap(
    sky('caArSky', '#101c34', '#1c2a1e'),
    `<rect width="100" height="50" fill="url(#caArSky)"/>
     <circle cx="78" cy="11" r="7" fill="#e8e0c8" opacity="0.9"/>
     <circle cx="75.5" cy="9.5" r="1.6" fill="#c8c0a8" opacity="0.5"/>
     <path d="M 0 36 L 8 27 L 16 36 M 12 37 L 20 25 L 28 37 M 74 37 L 82 27 L 90 37 M 86 36 L 93 29 L 100 36" fill="#0e1a12"/>
     <path d="M 0 41 Q 30 37 50 40 Q 76 43 100 39 L 100 50 L 0 50 Z" fill="#131c10"/>
     <path d="M 43 41 L 45 18 L 55 18 L 57 41 Z" fill="#4a3826" stroke="#8B5E3C" stroke-width="0.7"/>
     <path d="M 42 18 L 58 18 L 56 13 L 44 13 Z" fill="#3a2c1e" stroke="#8B5E3C" stroke-width="0.7"/>
     <path d="M 43 13 V 10 H 46 V 13 M 48.5 13 V 9.5 H 51.5 V 13 M 54 13 V 10 H 57 V 13" fill="#3a2c1e" stroke="#8B5E3C" stroke-width="0.5"/>
     <rect x="48" y="24" width="4" height="6" rx="1.8" fill="#0c0810"/>
     <circle cx="50" cy="7" r="1.7" fill="#0c0810"/>
     <path d="M 50 8.5 L 50 12.5 M 50 9.5 L 46.5 11 M 50 9.5 L 54 8" stroke="#0c0810" stroke-width="1.1" stroke-linecap="round"/>
     <path d="M 53 4.5 Q 57 8.5 53 12.5" fill="none" stroke="#D4AF37" stroke-width="0.9"/>
     <path d="M 53 4.5 L 53 12.5" stroke="#D4AF37" stroke-width="0.45"/>
     <circle cx="45" cy="21" r="1.2" fill="#ffc860"/>
     <circle cx="45" cy="21" r="2.8" fill="#ffc860" opacity="0.25"/>`
  ),

  // ── 소환: Cannon Tower — 성벽 위 대포 ────────────────
  summon_cannon: () => wrap(
    sky('caCnSky', '#241420', '#181018') + rad('caCnFl', [['0%', '#fff0c0'], ['50%', '#ff9040'], ['100%', '#c03010', 0]]),
    `<rect width="100" height="50" fill="url(#caCnSky)"/>
     <path d="M 0 40 H 100 V 50 H 0 Z" fill="#181210"/>
     <path d="M 4 40 V 34 H 12 V 40 M 20 40 V 34 H 28 V 40 M 72 40 V 34 H 80 V 40 M 88 40 V 34 H 96 V 40" fill="#26201a" stroke="#3a3028" stroke-width="0.6"/>
     <circle cx="46" cy="32" r="8" fill="#33302e" stroke="#C0392B" stroke-width="1"/>
     <rect x="50" y="24.5" width="16" height="6" rx="2" fill="#3c3836" stroke="#C0392B" stroke-width="0.9" transform="rotate(-16 50 28)"/>
     <circle cx="46" cy="32" r="3" fill="#221e1c" stroke="#C0392B" stroke-width="0.7"/>
     <circle cx="69" cy="19" r="6.5" fill="url(#caCnFl)"/>
     <circle cx="69" cy="19" r="2.4" fill="#fff4d0"/>
     <circle cx="77" cy="13" r="1.3" fill="#ffb050"/>
     <circle cx="74" cy="24" r="1" fill="#ff8040"/>
     <path d="M 30 40 Q 33 35 38 37 Q 34 32 28 34 Q 24 36 25 40 Z" fill="#2a2422" opacity="0.9"/>`
  ),

  // ── 소환: Frost Mage — 서리 첨탑 ─────────────────────
  summon_frost: () => wrap(
    sky('caFrSky', '#0c1830', '#12283e'),
    `<rect width="100" height="50" fill="url(#caFrSky)"/>
     <path d="M 0 42 Q 28 38 50 41 Q 74 44 100 40 L 100 50 L 0 50 Z" fill="#0e1c2c"/>
     <path d="M 8 42 L 15 30 L 22 42 M 78 42 L 86 28 L 94 42" fill="#12283a"/>
     <path d="M 44 42 L 47 14 L 53 14 L 56 42 Z" fill="#1a3450" stroke="#2980B9" stroke-width="0.8"/>
     <path d="M 46 14 L 50 4 L 54 14 Z" fill="#234460" stroke="#7ec8e3" stroke-width="0.8"/>
     <circle cx="50" cy="10" r="2.2" fill="#bfe8ff" opacity="0.95"/>
     <circle cx="50" cy="10" r="4.6" fill="#7ec8e3" opacity="0.3"/>
     <path d="M 50 21 V 27 M 47.4 22.5 L 52.6 25.5 M 52.6 22.5 L 47.4 25.5" stroke="#9fd8f0" stroke-width="0.9"/>
     <g fill="#cfeaff" opacity="0.8">
       <circle cx="20" cy="12" r="0.9"/><circle cx="30" cy="22" r="0.7"/><circle cx="68" cy="9" r="0.8"/>
       <circle cx="76" cy="20" r="0.7"/><circle cx="34" cy="7" r="0.6"/><circle cx="63" cy="27" r="0.6"/>
     </g>`
  ),

  // ── 소환: Tesla Coil — 방전탑 ───────────────────────
  summon_tesla: () => wrap(
    sky('caTsSky', '#101a30', '#1a1230'),
    `<rect width="100" height="50" fill="url(#caTsSky)"/>
     <path d="M 0 43 H 100 V 50 H 0 Z" fill="#12101e"/>
     <path d="M 45 43 L 47 22 L 53 22 L 55 43 Z" fill="#1A2A4A" stroke="#00CED1" stroke-width="0.8"/>
     <ellipse cx="50" cy="21" rx="7" ry="3" fill="#22375e" stroke="#00CED1" stroke-width="0.9"/>
     <circle cx="50" cy="15" r="4" fill="#183050" stroke="#00CED1" stroke-width="1"/>
     <circle cx="50" cy="15" r="1.6" fill="#aef8ff"/>
     <path d="M 46 13 L 34 8 L 39 14 L 30 13" fill="none" stroke="#7ee8f0" stroke-width="1" stroke-linecap="round"/>
     <path d="M 54 13 L 66 6 L 61 13 L 71 11" fill="none" stroke="#7ee8f0" stroke-width="1" stroke-linecap="round"/>
     <path d="M 50 11 L 47 4 L 51 7 L 49 1" fill="none" stroke="#aef8ff" stroke-width="0.9" stroke-linecap="round"/>
     <circle cx="30" cy="13" r="1" fill="#aef8ff"/><circle cx="71" cy="11" r="1" fill="#aef8ff"/>
     <circle cx="50" cy="15" r="7.5" fill="#00CED1" opacity="0.12"/>`
  ),

  // ── 주문: Fireball — 화염구 ─────────────────────────
  spell_fireball: () => wrap(
    sky('caFbSky', '#1a0e2e', '#30101a') + rad('caFbCore', [['0%', '#fff8d0'], ['30%', '#ffd040'], ['65%', '#ff6b1a'], ['100%', '#c02a10', 0.35]]),
    `<rect width="100" height="50" fill="url(#caFbSky)"/>
     <path d="M 0 42 L 16 40 L 24 42 L 38 39 L 52 42 L 68 40 L 82 43 L 100 41 L 100 50 L 0 50 Z" fill="#0c0618"/>
     <path d="M 12 11 Q 34 12 54 20 Q 44 16 36 17 Q 48 20 58 25 Q 47 22 42 23 Z" fill="#ff8c30" opacity="0.5"/>
     <path d="M 7 8 Q 32 8 56 19" stroke="#ffc060" stroke-width="1.1" fill="none" opacity="0.6" stroke-linecap="round"/>
     <circle cx="65" cy="24" r="14.5" fill="url(#caFbCore)"/>
     <path d="M 55 17 Q 51 10 54 4 Q 57 11 60 14 M 59 13 Q 58 7 61 2 Q 63 9 64 12" fill="#ff6b1a" opacity="0.85"/>
     <path d="M 74 15 Q 78 9 77 3 Q 73 10 71 13 Z" fill="#ff8c30" opacity="0.8"/>
     <circle cx="65" cy="24" r="6.5" fill="#fff4c0" opacity="0.92"/>
     <circle cx="44" cy="14" r="1" fill="#ffd040"/><circle cx="33" cy="10" r="0.7" fill="#ff9040"/>
     <circle cx="52" cy="30" r="0.9" fill="#ffb050"/><circle cx="80" cy="35" r="0.7" fill="#ff8030"/>
     <ellipse cx="76" cy="41.5" rx="13" ry="2.4" fill="#ff5a1a" opacity="0.35"/>`
  ),

  // ── 주문: Blizzard(freeze) — 눈보라 ─────────────────
  spell_freeze: () => wrap(
    sky('caBzSky', '#0a1c30', '#183048'),
    `<rect width="100" height="50" fill="url(#caBzSky)"/>
     <path d="M 0 43 Q 30 39 55 42 Q 80 45 100 41 L 100 50 L 0 50 Z" fill="#0c1a28"/>
     <path d="M 14 43 Q 20 33 18 25 M 40 44 Q 47 35 45 26 M 70 43 Q 77 34 75 25 M 90 42 Q 95 35 94 28"
           stroke="#7ec8e3" stroke-width="1" fill="none" opacity="0.45" stroke-linecap="round"/>
     <g stroke="#cfeaff" stroke-width="0.9" opacity="0.95">
       <path d="M 30 14 V 24 M 25.7 16.5 L 34.3 21.5 M 34.3 16.5 L 25.7 21.5"/>
       <path d="M 30 14.5 L 28 13 M 30 14.5 L 32 13 M 30 23.5 L 28 25 M 30 23.5 L 32 25"/>
     </g>
     <g stroke="#e8f6ff" stroke-width="1.1" opacity="0.98">
       <path d="M 62 8 V 22 M 56 11.5 L 68 18.5 M 68 11.5 L 56 18.5"/>
       <path d="M 62 8.7 L 59.5 6.7 M 62 8.7 L 64.5 6.7 M 62 21.3 L 59.5 23.3 M 62 21.3 L 64.5 23.3"/>
     </g>
     <g fill="#dff2ff" opacity="0.85">
       <circle cx="12" cy="10" r="0.9"/><circle cx="22" cy="30" r="0.8"/><circle cx="46" cy="16" r="0.7"/>
       <circle cx="52" cy="33" r="0.9"/><circle cx="80" cy="12" r="0.8"/><circle cx="86" cy="30" r="0.7"/>
     </g>
     <path d="M 44 41 Q 46 36 50 37 Q 48 34 44 35 Q 41 37 42 41 Z" fill="#9fd8f0" opacity="0.5"/>`
  ),

  // ── 주문: Gold Rush — 금화 분수 ─────────────────────
  spell_gold: () => wrap(
    sky('caGdSky', '#241a08', '#141008') + rad('caGdGl', [['0%', '#ffe890'], ['100%', '#b8860b', 0]]),
    `<rect width="100" height="50" fill="url(#caGdSky)"/>
     <path d="M 0 44 H 100 V 50 H 0 Z" fill="#100c04"/>
     <ellipse cx="50" cy="42" rx="17" ry="4" fill="#2a1e08"/>
     <path d="M 36 42 Q 35 34 40 33 L 60 33 Q 65 34 64 42 Z" fill="#4a3410" stroke="#D4AF37" stroke-width="0.9"/>
     <circle cx="50" cy="30" r="12" fill="url(#caGdGl)" opacity="0.6"/>
     <g stroke="#8a6a10" stroke-width="0.5">
       <circle cx="44" cy="31" r="3.4" fill="#ffd44a"/><circle cx="52" cy="28" r="3.4" fill="#f5c518"/>
       <circle cx="58" cy="32" r="3" fill="#e8b820"/><circle cx="48" cy="35" r="3" fill="#ffcf30"/>
     </g>
     <g fill="#ffd44a">
       <circle cx="34" cy="18" r="2.2"/><circle cx="66" cy="15" r="2.4"/><circle cx="50" cy="9" r="2.6"/>
       <circle cx="25" cy="29" r="1.9"/><circle cx="75" cy="27" r="2"/>
     </g>
     <g stroke="#8a6a10" stroke-width="0.4" fill="none">
       <circle cx="34" cy="18" r="1.2"/><circle cx="66" cy="15" r="1.3"/><circle cx="50" cy="9" r="1.5"/>
     </g>
     <path d="M 20 10 L 22 12 M 21 8 L 21 14 M 80 8 L 82 10 M 81 6 L 81 12" stroke="#fff0b0" stroke-width="0.7" opacity="0.9"/>`
  ),

  // ── 주문: Lightning — 낙뢰 ──────────────────────────
  spell_lightning: () => wrap(
    sky('caLtSky', '#0e1226', '#1c1430'),
    `<rect width="100" height="50" fill="url(#caLtSky)"/>
     <ellipse cx="50" cy="7" rx="34" ry="7" fill="#181c36"/>
     <ellipse cx="28" cy="9" rx="15" ry="5" fill="#20244a" opacity="0.9"/>
     <ellipse cx="72" cy="9" rx="15" ry="5" fill="#20244a" opacity="0.9"/>
     <path d="M 52 12 L 42 26 L 49 26 L 40 42 L 60 24 L 52 24 L 60 12 Z" fill="#ffe860" stroke="#fff8c0" stroke-width="0.7"/>
     <path d="M 50 15 L 45 24 M 52 22 L 47 32" stroke="#fffbe0" stroke-width="0.8" opacity="0.9"/>
     <path d="M 0 44 Q 30 41 55 43 Q 80 45 100 42 L 100 50 L 0 50 Z" fill="#0c0a18"/>
     <ellipse cx="43" cy="43" rx="12" ry="2.6" fill="#ffe860" opacity="0.5"/>
     <path d="M 30 38 L 27 34 M 56 39 L 60 35 M 47 37 L 44 32" stroke="#ffe860" stroke-width="0.8" opacity="0.7" stroke-linecap="round"/>`
  ),

  // ── 주문: Chain Bolt — 체인 방전 ────────────────────
  spell_chain_bolt: () => wrap(
    sky('caCbSky', '#0e1a2e', '#141026'),
    `<rect width="100" height="50" fill="url(#caCbSky)"/>
     <path d="M 0 44 H 100 V 50 H 0 Z" fill="#0a0c16"/>
     <circle cx="18" cy="30" r="5" fill="#20304a" stroke="#00CED1" stroke-width="0.9"/>
     <circle cx="50" cy="20" r="6" fill="#22375e" stroke="#00CED1" stroke-width="1.1"/>
     <circle cx="82" cy="32" r="5" fill="#20304a" stroke="#00CED1" stroke-width="0.9"/>
     <path d="M 23 28 L 32 25 L 29 28 L 38 23 L 44 21" fill="none" stroke="#7ee8f0" stroke-width="1.3" stroke-linecap="round"/>
     <path d="M 56 22 L 64 26 L 61 27 L 70 30 L 77 31" fill="none" stroke="#7ee8f0" stroke-width="1.3" stroke-linecap="round"/>
     <circle cx="50" cy="20" r="2.4" fill="#aef8ff"/>
     <circle cx="18" cy="30" r="1.7" fill="#aef8ff" opacity="0.9"/>
     <circle cx="82" cy="32" r="1.7" fill="#aef8ff" opacity="0.9"/>
     <circle cx="50" cy="20" r="10" fill="#00CED1" opacity="0.10"/>
     <path d="M 46 14 L 43 9 M 54 14 L 58 9" stroke="#7ee8f0" stroke-width="0.8" opacity="0.7" stroke-linecap="round"/>`
  ),

  // ── 강화: Sharpen — 숫돌과 검 ───────────────────────
  aug_sharpen: () => wrap(
    sky('caShSky', '#1c1424', '#141018'),
    `<rect width="100" height="50" fill="url(#caShSky)"/>
     <path d="M 0 44 H 100 V 50 H 0 Z" fill="#0e0a12"/>
     <path d="M 30 44 L 34 38 L 66 38 L 70 44 Z" fill="#2e2634" stroke="#4a3e52" stroke-width="0.8"/>
     <path d="M 24 32 L 62 12 L 68 10 L 66 16 L 30 36 Z" fill="#c8ccd8" stroke="#8a90a0" stroke-width="0.7"/>
     <path d="M 26 32 L 63 13" stroke="#f0f4ff" stroke-width="0.8" opacity="0.9"/>
     <path d="M 22 36 L 28 30 L 32 34 L 26 40 Z" fill="#5a4a2e" stroke="#8a6a3a" stroke-width="0.8"/>
     <g stroke="#ffd860" stroke-width="0.9" stroke-linecap="round" opacity="0.95">
       <path d="M 68 8 L 71 4 M 70 11 L 75 9 M 66 6 L 66 2"/>
     </g>
     <circle cx="72" cy="7" r="1.1" fill="#fff0b0"/>
     <path d="M 40 25 L 44 27" stroke="#9B59B6" stroke-width="1" opacity="0.6"/>`
  ),

  // ── 강화: Focus — 조준 각인 ─────────────────────────
  aug_focus: () => wrap(
    sky('caFcSky', '#141828', '#1a1226') + rad('caFcGl', [['0%', '#e86040', 0.5], ['100%', '#e86040', 0]]),
    `<rect width="100" height="50" fill="url(#caFcSky)"/>
     <circle cx="50" cy="25" r="17" fill="url(#caFcGl)"/>
     <circle cx="50" cy="25" r="14" fill="none" stroke="#e87050" stroke-width="1.1" opacity="0.9"/>
     <circle cx="50" cy="25" r="8.5" fill="none" stroke="#e87050" stroke-width="0.8" opacity="0.7"/>
     <path d="M 50 6 V 15 M 50 35 V 44 M 31 25 H 40 M 60 25 H 69" stroke="#ff9070" stroke-width="1.2" stroke-linecap="round"/>
     <circle cx="50" cy="25" r="2.6" fill="#ff7050"/>
     <circle cx="50" cy="25" r="1" fill="#fff0e0"/>
     <path d="M 62 13 L 66 9 M 66 13 L 62 9" stroke="#9B59B6" stroke-width="0.9" opacity="0.8"/>
     <path d="M 20 38 L 24 40 M 22 36 L 22 42" stroke="#9B59B6" stroke-width="0.8" opacity="0.6"/>`
  ),

  // ── DLC1 주문: Shadow Nova — 그림자 신성 ────────────
  spell_shadow_nova: () => wrap(
    sky('caSnSky', '#12041e', '#1e0830') + rad('caSnCore', [['0%', '#f0e0ff'], ['30%', '#c060ff'], ['100%', '#4a0a80', 0]]),
    `<rect width="100" height="50" fill="url(#caSnSky)"/>
     <circle cx="50" cy="25" r="16" fill="url(#caSnCore)"/>
     <circle cx="50" cy="25" r="20" fill="none" stroke="#9040d0" stroke-width="1.1" opacity="0.7"/>
     <circle cx="50" cy="25" r="24" fill="none" stroke="#7b2fbe" stroke-width="0.7" opacity="0.4"/>
     <g fill="#2a0a48">
       <path d="M 50 10 L 53 20 L 50 18 L 47 20 Z"/>
       <path d="M 65 25 L 55 28 L 57 25 L 55 22 Z"/>
       <path d="M 50 40 L 47 30 L 50 32 L 53 30 Z"/>
       <path d="M 35 25 L 45 22 L 43 25 L 45 28 Z"/>
     </g>
     <circle cx="50" cy="25" r="4.5" fill="#e8d0ff"/>
     <circle cx="50" cy="25" r="1.8" fill="#fff"/>
     <g fill="#c890ff" opacity="0.8">
       <circle cx="24" cy="12" r="1"/><circle cx="78" cy="14" r="1.1"/><circle cx="20" cy="36" r="0.9"/>
       <circle cx="80" cy="38" r="1"/><circle cx="66" cy="7" r="0.8"/>
     </g>`
  ),

  // ── DLC2 주문: Solar Beam — 태양 광선 ───────────────
  spell_solar_beam: () => wrap(
    sky('caSbSky', '#2e1800', '#180c02') +
    rad('caSbSun', [['0%', '#fff8e0'], ['40%', '#f5c518'], ['100%', '#e8791a', 0.25]]) +
    sky('caSbBeam', '#fff0b0', '#f5c51826'),
    `<rect width="100" height="50" fill="url(#caSbSky)"/>
     <circle cx="50" cy="11" r="9.5" fill="url(#caSbSun)"/>
     <circle cx="50" cy="11" r="4.2" fill="#fff6d8"/>
     <g stroke="#f5c518" stroke-width="0.8" opacity="0.8" stroke-linecap="round">
       <path d="M 37 11 H 31 M 63 11 H 69 M 41 4 L 37 0 M 59 4 L 63 0"/>
     </g>
     <path d="M 43 15 L 36 44 L 64 44 L 57 15 Z" fill="url(#caSbBeam)" opacity="0.85"/>
     <path d="M 47 15 L 44 44 M 53 15 L 56 44" stroke="#fff0b0" stroke-width="0.5" opacity="0.5"/>
     <path d="M 0 43 Q 30 40 50 42 Q 75 44 100 41 L 100 50 L 0 50 Z" fill="#100a04"/>
     <ellipse cx="50" cy="43" rx="17" ry="3.2" fill="#f5c518" opacity="0.4"/>
     <ellipse cx="50" cy="43" rx="8.5" ry="1.8" fill="#fff0b0" opacity="0.7"/>
     <path d="M 45 38 Q 46 34 49 35 Q 51 33 53 36 Q 55 37 54 40 L 46 40 Z" fill="#0c0804" opacity="0.9"/>
     <circle cx="57" cy="33" r="0.8" fill="#f5c518" opacity="0.8"/>
     <circle cx="44" cy="30" r="0.7" fill="#f5c518" opacity="0.7"/>`
  ),

  // ── DLC3 주문: Thunderstrike — 뇌격 (대공) ──────────
  spell_thunderstrike: () => wrap(
    sky('caThSky', '#04141f', '#0a2a3a'),
    `<rect width="100" height="50" fill="url(#caThSky)"/>
     <ellipse cx="50" cy="6" rx="36" ry="6" fill="#0c2230"/>
     <ellipse cx="26" cy="8" rx="14" ry="4" fill="#123040" opacity="0.9"/>
     <ellipse cx="76" cy="8" rx="14" ry="4" fill="#123040" opacity="0.9"/>
     <path d="M 40 9 L 33 22 L 38 22 L 31 36 L 46 20 L 40 20 L 46 9 Z" fill="#aefcff" stroke="#e0feff" stroke-width="0.5"/>
     <path d="M 68 9 L 63 19 L 67 19 L 61 30 L 73 18 L 68 18 L 73 9 Z" fill="#7ee8f0" opacity="0.9"/>
     <!-- 감전된 비행 적 (날개 실루엣) -->
     <g fill="#06202c" stroke="#48CAE4" stroke-width="0.6">
       <path d="M 31 36 L 24 32 L 28 37 L 22 38 L 29 40 Z"/>
       <path d="M 31 36 L 38 32 L 34 37 L 40 38 L 33 40 Z"/>
       <circle cx="31" cy="37.5" r="2.6"/>
     </g>
     <g fill="#06202c" stroke="#48CAE4" stroke-width="0.5">
       <path d="M 61 30 L 55 27 L 58 31 L 53 32 L 59 33.5 Z"/>
       <path d="M 61 30 L 67 27 L 64 31 L 69 32 L 63 33.5 Z"/>
       <circle cx="61" cy="31" r="2.2"/>
     </g>
     <path d="M 27 34 L 25 31 M 35 34 L 37 31 M 58 28 L 56 26 M 64 28 L 66 26"
           stroke="#aefcff" stroke-width="0.6" opacity="0.85" stroke-linecap="round"/>
     <path d="M 0 46 H 100 V 50 H 0 Z" fill="#04101a"/>`
  ),

  // ── DLC3 소환: Storm Ballista — 대공 발리스타 ───────
  summon_storm_ballista: () => wrap(
    sky('caStbSky', '#061826', '#0c2e3e'),
    `<rect width="100" height="50" fill="url(#caStbSky)"/>
     <path d="M 0 44 Q 30 41 55 43 Q 80 45 100 42 L 100 50 L 0 50 Z" fill="#081820"/>
     <ellipse cx="50" cy="42" rx="13" ry="2.8" fill="#0a2430"/>
     <path d="M 44 42 L 46 30 L 54 30 L 56 42 Z" fill="#123a4a" stroke="#4ECDC4" stroke-width="0.8"/>
     <g transform="rotate(-38 50 29)">
       <rect x="46" y="27.4" width="22" height="3.2" rx="1.2" fill="#0e3242" stroke="#4ECDC4" stroke-width="0.7"/>
       <path d="M 68 29 L 73 29" stroke="#7ee8f0" stroke-width="1" stroke-linecap="round"/>
       <path d="M 50 24 Q 58 29 50 34" fill="none" stroke="#4ECDC4" stroke-width="0.9"/>
     </g>
     <path d="M 78 8 L 71 12 L 75 13 L 69 17" fill="none" stroke="#7ee8f0" stroke-width="0.9" stroke-linecap="round" opacity="0.9"/>
     <g fill="#06202c" stroke="#48CAE4" stroke-width="0.6">
       <path d="M 80 7 L 74 4 L 77 8 L 72 9 L 78 10.5 Z"/>
       <path d="M 80 7 L 86 4 L 83 8 L 88 9 L 82 10.5 Z"/>
       <circle cx="80" cy="8.5" r="2.4"/>
     </g>
     <circle cx="22" cy="10" r="1" fill="#7ee8f0" opacity="0.7"/>
     <circle cx="30" cy="16" r="0.7" fill="#48CAE4" opacity="0.6"/>`
  ),
};

// ═══════════════════════════════════════════════════════
// 절차 합성기 — 전용 아트가 없는 카드용 (백드롭 테마 × 모티프 × 시드 변주)
// ═══════════════════════════════════════════════════════

import { TOWER_DEFS } from '../data/towers.js';

// 시드 PRNG — 같은 카드는 항상 같은 변주
function _hash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function _rng(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── 테마 백드롭 정의 ──────────────────────────────────
// 각 테마: 하늘 그라디언트, 지면색, 강조색, 입자색
const THEMES = {
  arcane: { top: '#141830', bot: '#1c1430', ground: '#0e0a1c', accent: '#9B59B6', spark: '#c9a6e8' },
  ember:  { top: '#241018', bot: '#301410', ground: '#120806', accent: '#ff7030', spark: '#ffc060' },
  frost:  { top: '#0c1830', bot: '#12283e', ground: '#0c1a28', accent: '#7ec8e3', spark: '#dff2ff' },
  electric:{ top: '#0e1226', bot: '#1c1430', ground: '#0c0a18', accent: '#ffe860', spark: '#fff8c0' },
  vault:  { top: '#241a08', bot: '#141008', ground: '#100c04', accent: '#f5c518', spark: '#ffe890' },
  grove:  { top: '#101c1a', bot: '#16281a', ground: '#0c1810', accent: '#4CAF50', spark: '#a8e0a0' },
  shadow: { top: '#12041e', bot: '#1e0830', ground: '#0c0416', accent: '#9040d0', spark: '#c890ff' },
  solar:  { top: '#2e1800', bot: '#180c02', ground: '#100a04', accent: '#f5c518', spark: '#ffd860' },
  storm:  { top: '#04141f', bot: '#0c2a3a', ground: '#04101a', accent: '#4ECDC4', spark: '#7ee8f0' },
};

// 카드 → 테마 결정 (DLC 우선, 그 외 키워드 휴리스틱)
function _pickTheme(card) {
  if (card.dlc === 'shadow_realm')   return 'shadow';
  if (card.dlc === 'solar_dominion') return 'solar';
  if (card.dlc === 'storm_imperium') return 'storm';
  const key = `${card.id} ${card.effect?.type ?? ''} ${card.tower ?? ''}`.toLowerCase();
  if (/fire|burn|blaze|inferno|drake|ember/.test(key)) return 'ember';
  if (/frost|freeze|ice|blizzard|glacial|winter|slow/.test(key)) return 'frost';
  if (/bolt|lightning|tesla|chain|storm|shock|overcharge|haste|surge/.test(key)) return 'electric';
  if (/gold|salvage|loot|greed|treasure|toll|market/.test(key)) return 'vault';
  if (/nature|heal|druid|growth|cycle|bloom/.test(key)) return 'grove';
  return 'arcane';
}

// 공통 백드롭: 하늘 + 지면 + 시드 입자
function _backdrop(t, rand, gid) {
  const stars = [];
  const n = 4 + Math.floor(rand() * 4);
  for (let i = 0; i < n; i++) {
    stars.push(`<circle cx="${(4 + rand() * 92).toFixed(1)}" cy="${(3 + rand() * 30).toFixed(1)}" r="${(0.5 + rand() * 0.7).toFixed(2)}" fill="${t.spark}" opacity="${(0.35 + rand() * 0.45).toFixed(2)}"/>`);
  }
  const gy = 40 + rand() * 3;
  return {
    defs: sky(gid, t.top, t.bot),
    body: `<rect width="100" height="50" fill="url(#${gid})"/>` + stars.join('') +
      `<path d="M 0 ${(gy + 1).toFixed(1)} Q 28 ${(gy - 2.5).toFixed(1)} 52 ${gy.toFixed(1)} Q 78 ${(gy + 2.5).toFixed(1)} 100 ${(gy - 1.5).toFixed(1)} L 100 50 L 0 50 Z" fill="${t.ground}"/>`,
    groundY: gy,
  };
}

// ── 소환 카드: 타워 실루엣 (인게임 형태와 동일 어휘) ──
function _towerGlyph(card, t, rand) {
  const def = TOWER_DEFS[card.tower] ?? {};
  const col = def.color ?? '#3a3a5a';
  const acc = def.accentColor ?? t.accent;
  const shape = def.shape ?? 'archer';
  const cx = 50, base = 40, sw = 'stroke-width';
  let s = `<ellipse cx="${cx}" cy="${base + 1}" rx="12" ry="2.6" fill="#000" opacity="0.4"/>` +
          `<path d="M ${cx - 8} ${base} L ${cx - 6} ${base - 4} L ${cx + 6} ${base - 4} L ${cx + 8} ${base} Z" fill="#1c1826" stroke="${acc}" ${sw}="0.5" opacity="0.9"/>`;
  const glow = `<circle cx="${cx}" cy="20" r="14" fill="${acc}" opacity="0.10"/>`;
  if (shape === 'cannon' || shape === 'ballista') {
    s += `<path d="M ${cx - 7} ${base - 4} L ${cx - 5.5} 20 L ${cx + 5.5} 20 L ${cx + 7} ${base - 4} Z" fill="${col}" stroke="${acc}" ${sw}="0.8"/>` +
         `<g transform="rotate(${(-30 + rand() * 14).toFixed(0)} ${cx} 19)"><rect x="${cx - 1.8}" y="6" width="3.6" height="14" rx="1.4" fill="${col}" stroke="${acc}" ${sw}="0.7"/></g>` +
         `<circle cx="${cx}" cy="19" r="4.2" fill="${col}" stroke="${acc}" ${sw}="0.9"/>`;
  } else if (shape === 'mage') {
    s += `<path d="M ${cx - 5.5} ${base - 4} L ${cx - 4} 16 L ${cx + 4} 16 L ${cx + 5.5} ${base - 4} Z" fill="${col}" stroke="${acc}" ${sw}="0.8"/>` +
         `<path d="M ${cx - 4.5} 16 L ${cx} 6 L ${cx + 4.5} 16 Z" fill="${col}" stroke="${acc}" ${sw}="0.8"/>` +
         `<circle cx="${cx}" cy="11" r="2" fill="${acc}" opacity="0.95"/><circle cx="${cx}" cy="11" r="4.2" fill="${acc}" opacity="0.25"/>`;
  } else if (shape === 'drake') {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const r = i % 2 === 0 ? 9 : 4.2, a = i * Math.PI / 5 - Math.PI / 2;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(17 + r * Math.sin(a)).toFixed(1)}`);
    }
    s += `<path d="M ${cx - 5} ${base - 4} L ${cx - 3.5} 24 L ${cx + 3.5} 24 L ${cx + 5} ${base - 4} Z" fill="${col}" stroke="${acc}" ${sw}="0.8"/>` +
         `<polygon points="${pts.join(' ')}" fill="${col}" stroke="${acc}" ${sw}="0.9"/>` +
         `<circle cx="${cx}" cy="17" r="2.4" fill="${acc}" opacity="0.9"/>`;
  } else if (shape === 'tesla') {
    s += `<path d="M ${cx - 5} ${base - 4} L ${cx - 3.5} 20 L ${cx + 3.5} 20 L ${cx + 5} ${base - 4} Z" fill="${col}" stroke="${acc}" ${sw}="0.8"/>` +
         `<ellipse cx="${cx}" cy="19" rx="5.5" ry="2.4" fill="${col}" stroke="${acc}" ${sw}="0.8"/>` +
         `<circle cx="${cx}" cy="13" r="3.4" fill="${col}" stroke="${acc}" ${sw}="0.9"/><circle cx="${cx}" cy="13" r="1.4" fill="${t.spark}"/>` +
         `<path d="M ${cx - 3} 11 L ${cx - 10} 7 L ${cx - 6} 12 M ${cx + 3} 11 L ${cx + 10} 5 L ${cx + 6} 11" fill="none" stroke="${t.spark}" ${sw}="0.8" stroke-linecap="round"/>`;
  } else if (shape === 'druid') {
    s += `<path d="M ${cx - 4.5} ${base - 4} L ${cx - 3.5} 24 L ${cx + 3.5} 24 L ${cx + 4.5} ${base - 4} Z" fill="${col}" stroke="${acc}" ${sw}="0.8"/>` +
         `<circle cx="${cx}" cy="17" r="8" fill="${col}" stroke="${acc}" ${sw}="0.9"/>`;
    for (let i = 0; i < 3; i++) {
      const a = i * 2 * Math.PI / 3 - Math.PI / 2;
      s += `<circle cx="${(cx + 8 * Math.cos(a)).toFixed(1)}" cy="${(17 + 8 * Math.sin(a)).toFixed(1)}" r="2.6" fill="${acc}" opacity="0.9"/>`;
    }
  } else {
    // archer 계열: 첨탑 + 다이아몬드 정점
    s += `<path d="M ${cx - 5} ${base - 4} L ${cx - 3.5} 18 L ${cx + 3.5} 18 L ${cx + 5} ${base - 4} Z" fill="${col}" stroke="${acc}" ${sw}="0.8"/>` +
         `<polygon points="${cx},9 ${cx + 5},16 ${cx},23 ${cx - 5},16" fill="${col}" stroke="${acc}" ${sw}="0.9"/>` +
         `<circle cx="${cx}" cy="16" r="1.6" fill="${acc}" opacity="0.95"/>`;
  }
  return glow + s;
}

// ── 주문 카드: 원소 모티프 ─────────────────────────────
function _spellMotif(card, theme, t, rand, gid) {
  const cx = 44 + rand() * 12, cy = 20 + rand() * 6;
  const rot = (rand() * 30 - 15).toFixed(0);
  switch (theme) {
    case 'ember': {
      let s = `<circle cx="${cx}" cy="${cy}" r="11" fill="url(#${gid}c)"/>` +
              `<circle cx="${cx}" cy="${cy}" r="4.6" fill="#fff4c0" opacity="0.9"/>` +
              `<path d="M ${cx - 6} ${cy - 8} Q ${cx - 9} ${cy - 15} ${cx - 6} ${cy - 20} Q ${cx - 3} ${cy - 13} ${cx - 2} ${cy - 9} Z" fill="${t.accent}" opacity="0.85"/>`;
      for (let i = 0; i < 3 + Math.floor(rand() * 3); i++) {
        s += `<circle cx="${(cx - 20 + rand() * 40).toFixed(1)}" cy="${(cy - 14 + rand() * 24).toFixed(1)}" r="${(0.7 + rand() * 0.8).toFixed(2)}" fill="${t.spark}"/>`;
      }
      return { defs: rad(gid + 'c', [['0%', '#fff8d0'], ['35%', '#ffd040'], ['70%', '#ff6b1a'], ['100%', '#c02a10', 0.3]]), body: s };
    }
    case 'frost': {
      const v = Math.floor(rand() * 3);
      let s = '';
      if (v === 0) {
        // 대형 눈결정
        s = `<g transform="rotate(${rot} ${cx} ${cy})" stroke="${t.spark}" stroke-width="1.1" opacity="0.96">` +
            `<path d="M ${cx} ${cy - 12} V ${cy + 12} M ${cx - 10.4} ${cy - 6} L ${cx + 10.4} ${cy + 6} M ${cx + 10.4} ${cy - 6} L ${cx - 10.4} ${cy + 6}"/>` +
            `<path d="M ${cx} ${cy - 11} L ${cx - 2.4} ${cy - 8.8} M ${cx} ${cy - 11} L ${cx + 2.4} ${cy - 8.8} M ${cx} ${cy + 11} L ${cx - 2.4} ${cy + 8.8} M ${cx} ${cy + 11} L ${cx + 2.4} ${cy + 8.8}"/></g>`;
      } else if (v === 1) {
        // 얼음 파편 군집 (3개 크리스탈)
        s = `<g stroke="${t.spark}" stroke-width="0.7">` +
            `<polygon points="${cx},${cy - 11} ${cx + 4.5},${cy - 1} ${cx + 2.5},${cy + 9} ${cx - 2.5},${cy + 9} ${cx - 4.5},${cy - 1}" fill="rgba(126,200,227,0.55)"/>` +
            `<polygon points="${cx - 10},${cy - 3} ${cx - 6.5},${cy + 3} ${cx - 8},${cy + 10} ${cx - 12},${cy + 6}" fill="rgba(126,200,227,0.4)"/>` +
            `<polygon points="${cx + 10},${cy - 4} ${cx + 13.5},${cy + 3} ${cx + 11},${cy + 10} ${cx + 7.5},${cy + 4}" fill="rgba(126,200,227,0.4)"/></g>` +
            `<path d="M ${cx} ${cy - 9} V ${cy + 6}" stroke="#fff" stroke-width="0.5" opacity="0.6"/>`;
      } else {
        // 빙결 오브 (균열 얼음 구)
        s = `<circle cx="${cx}" cy="${cy}" r="10" fill="rgba(126,200,227,0.28)" stroke="${t.spark}" stroke-width="1.1"/>` +
            `<path d="M ${cx - 6} ${cy - 4} L ${cx - 1} ${cy} L ${cx - 4} ${cy + 6} M ${cx + 2} ${cy - 7} L ${cx + 4} ${cy - 1} L ${cx + 8} ${cy + 2}" fill="none" stroke="#fff" stroke-width="0.7" opacity="0.8"/>` +
            `<circle cx="${cx - 3}" cy="${cy - 4}" r="2.2" fill="#fff" opacity="0.35"/>`;
      }
      s += `<circle cx="${cx}" cy="${cy}" r="13" fill="${t.accent}" opacity="0.10"/>`;
      for (let i = 0; i < 4; i++) s += `<circle cx="${(8 + rand() * 84).toFixed(1)}" cy="${(6 + rand() * 30).toFixed(1)}" r="${(0.6 + rand() * 0.6).toFixed(2)}" fill="${t.spark}" opacity="0.8"/>`;
      return { defs: '', body: s };
    }
    case 'electric': {
      const bx = cx;
      const v = Math.floor(rand() * 3);
      if (v === 1) {
        // 방전 오브
        return { defs: '', body:
          `<circle cx="${bx}" cy="${cy}" r="8.5" fill="#22375e" stroke="${t.accent}" stroke-width="1"/>` +
          `<circle cx="${bx}" cy="${cy}" r="3" fill="${t.spark}"/>` +
          `<path d="M ${bx - 8} ${cy - 3} L ${bx - 18} ${cy - 8} L ${bx - 13} ${cy - 2} L ${bx - 20} ${cy + 1}" fill="none" stroke="${t.spark}" stroke-width="0.9" stroke-linecap="round"/>` +
          `<path d="M ${bx + 8} ${cy - 2} L ${bx + 18} ${cy - 9} L ${bx + 13} ${cy - 2} L ${bx + 21} ${cy}" fill="none" stroke="${t.spark}" stroke-width="0.9" stroke-linecap="round"/>` +
          `<path d="M ${bx - 2} ${cy - 8} L ${bx - 5} ${cy - 16} L ${bx} ${cy - 12} L ${bx - 1} ${cy - 18}" fill="none" stroke="${t.accent}" stroke-width="0.8" stroke-linecap="round"/>` +
          `<circle cx="${bx}" cy="${cy}" r="13" fill="${t.accent}" opacity="0.12"/>` };
      }
      if (v === 2) {
        // 교차 이중 낙뢰
        return { defs: '', body:
          `<ellipse cx="50" cy="6" rx="30" ry="5" fill="#181c36"/>` +
          `<path d="M 40 8 L 33 20 L 38 20 L 30 34 L 44 19 L 39 19 L 45 8 Z" fill="${t.accent}" stroke="${t.spark}" stroke-width="0.5"/>` +
          `<path d="M 64 8 L 58 18 L 62 18 L 55 30 L 67 17 L 62 17 L 68 8 Z" fill="${t.spark}" opacity="0.85"/>` +
          `<ellipse cx="33" cy="39" rx="8" ry="2" fill="${t.accent}" opacity="0.4"/>` +
          `<ellipse cx="58" cy="35" rx="6" ry="1.6" fill="${t.spark}" opacity="0.3"/>` };
      }
      return { defs: '', body:
        `<ellipse cx="${bx}" cy="7" rx="26" ry="5.5" fill="#181c36"/>` +
        `<ellipse cx="${bx - 17}" cy="9" rx="11" ry="4" fill="#20244a" opacity="0.9"/>` +
        `<path d="M ${bx + 2} 10 L ${bx - 6} 22 L ${bx - 1} 22 L ${bx - 8} 36 L ${bx + 8} 20 L ${bx + 2} 20 L ${bx + 9} 10 Z" fill="${t.accent}" stroke="${t.spark}" stroke-width="0.6"/>` +
        `<ellipse cx="${bx - 3}" cy="41" rx="10" ry="2.2" fill="${t.accent}" opacity="0.45"/>` +
        `<path d="M ${bx - 14} 36 L ${bx - 17} 32 M ${bx + 10} 37 L ${bx + 13} 33" stroke="${t.accent}" stroke-width="0.8" opacity="0.7" stroke-linecap="round"/>` };
    }
    case 'vault': {
      let s = `<ellipse cx="50" cy="41" rx="15" ry="3.4" fill="#2a1e08"/>` +
              `<path d="M 38 41 Q 37 33 42 32 L 58 32 Q 63 33 62 41 Z" fill="#4a3410" stroke="${t.accent}" stroke-width="0.8"/>` +
              `<circle cx="50" cy="30" r="11" fill="url(#${gid}g)" opacity="0.6"/>`;
      for (let i = 0; i < 4; i++) {
        s += `<circle cx="${(44 + rand() * 12).toFixed(1)}" cy="${(28 + rand() * 6).toFixed(1)}" r="${(2.4 + rand()).toFixed(1)}" fill="#ffd44a" stroke="#8a6a10" stroke-width="0.4"/>`;
      }
      for (let i = 0; i < 4 + Math.floor(rand() * 3); i++) {
        s += `<circle cx="${(24 + rand() * 52).toFixed(1)}" cy="${(8 + rand() * 18).toFixed(1)}" r="${(1.5 + rand()).toFixed(1)}" fill="#ffd44a"/>`;
      }
      return { defs: rad(gid + 'g', [['0%', '#ffe890'], ['100%', '#b8860b', 0]]), body: s };
    }
    case 'grove': {
      let s = `<path d="M ${cx} ${cy + 12} Q ${cx - 2} ${cy} ${cx} ${cy - 10}" fill="none" stroke="#3a6a30" stroke-width="1.4"/>` +
              `<path d="M ${cx} ${cy - 2} Q ${cx - 9} ${cy - 6} ${cx - 10} ${cy - 14} Q ${cx - 2} ${cy - 11} ${cx} ${cy - 5} Z" fill="${t.accent}" opacity="0.9"/>` +
              `<path d="M ${cx} ${cy - 5} Q ${cx + 9} ${cy - 9} ${cx + 11} ${cy - 16} Q ${cx + 3} ${cy - 13} ${cx} ${cy - 7} Z" fill="#6ac060" opacity="0.9"/>` +
              `<circle cx="${cx}" cy="${cy - 6}" r="12" fill="${t.accent}" opacity="0.10"/>`;
      for (let i = 0; i < 4; i++) s += `<circle cx="${(cx - 16 + rand() * 32).toFixed(1)}" cy="${(cy - 16 + rand() * 26).toFixed(1)}" r="${(0.7 + rand() * 0.6).toFixed(2)}" fill="${t.spark}" opacity="0.8"/>`;
      return { defs: '', body: s };
    }
    case 'shadow': {
      const v = Math.floor(rand() * 3);
      if (v === 1) {
        // 공허 균열 (세로 틈 + 뻗어나오는 촉수 빛)
        return { defs: rad(gid + 'r', [['0%', '#e0c0ff'], ['50%', '#8030c0'], ['100%', '#30084a', 0]]), body:
          `<ellipse cx="${cx}" cy="${cy}" rx="4" ry="14" fill="url(#${gid}r)"/>` +
          `<path d="M ${cx} ${cy - 13} Q ${cx + 1.6} ${cy} ${cx} ${cy + 13} Q ${cx - 1.6} ${cy} ${cx} ${cy - 13} Z" fill="#f0e0ff"/>` +
          `<path d="M ${cx - 2} ${cy - 8} Q ${cx - 12} ${cy - 12} ${cx - 17} ${cy - 8} M ${cx + 2} ${cy - 4} Q ${cx + 12} ${cy - 8} ${cx + 16} ${cy - 2} M ${cx - 2} ${cy + 5} Q ${cx - 11} ${cy + 8} ${cx - 15} ${cy + 14} M ${cx + 2} ${cy + 8} Q ${cx + 10} ${cy + 11} ${cx + 13} ${cy + 16}" fill="none" stroke="${t.accent}" stroke-width="0.8" opacity="0.65"/>` };
      }
      if (v === 2) {
        // 궤도 공허 오브 3개 + 초승달
        let orbs = '';
        for (let i = 0; i < 3; i++) {
          const a = rot / 57.3 + i * 2.09;
          orbs += `<circle cx="${(cx + 13 * Math.cos(a)).toFixed(1)}" cy="${(cy + 9 * Math.sin(a)).toFixed(1)}" r="${(2 + rand()).toFixed(1)}" fill="#a060e0" opacity="0.9"/>`;
        }
        return { defs: '', body:
          `<path d="M ${cx + 3} ${cy - 10} A 10.5 10.5 0 1 0 ${cx + 3} ${cy + 10} A 8 8 0 1 1 ${cx + 3} ${cy - 10} Z" fill="#c9a6e8" opacity="0.9"/>` +
          `<ellipse cx="${cx}" cy="${cy}" rx="17" ry="12" fill="none" stroke="${t.accent}" stroke-width="0.5" opacity="0.45"/>` + orbs +
          `<circle cx="${cx}" cy="${cy}" r="16" fill="${t.accent}" opacity="0.08"/>` };
      }
      return { defs: rad(gid + 'n', [['0%', '#f0e0ff'], ['30%', '#c060ff'], ['100%', '#4a0a80', 0]]), body:
        `<circle cx="${cx}" cy="${cy}" r="12" fill="url(#${gid}n)"/>` +
        `<circle cx="${cx}" cy="${cy}" r="15.5" fill="none" stroke="${t.accent}" stroke-width="0.9" opacity="0.7"/>` +
        `<circle cx="${cx}" cy="${cy}" r="19" fill="none" stroke="${t.accent}" stroke-width="0.5" opacity="0.4"/>` +
        `<g transform="rotate(${rot} ${cx} ${cy})" fill="#2a0a48">` +
        `<path d="M ${cx} ${cy - 12} L ${cx + 2.4} ${cy - 4} L ${cx} ${cy - 5.6} L ${cx - 2.4} ${cy - 4} Z"/>` +
        `<path d="M ${cx + 12} ${cy} L ${cx + 4} ${cy + 2.4} L ${cx + 5.6} ${cy} L ${cx + 4} ${cy - 2.4} Z"/>` +
        `<path d="M ${cx} ${cy + 12} L ${cx - 2.4} ${cy + 4} L ${cx} ${cy + 5.6} L ${cx + 2.4} ${cy + 4} Z"/>` +
        `<path d="M ${cx - 12} ${cy} L ${cx - 4} ${cy - 2.4} L ${cx - 5.6} ${cy} L ${cx - 4} ${cy + 2.4} Z"/></g>` +
        `<circle cx="${cx}" cy="${cy}" r="3.4" fill="#e8d0ff"/>` };
    }
    case 'solar': {
      const v = Math.floor(rand() * 3);
      if (v === 1) {
        // 태양 원반 + 후광 링
        return { defs: rad(gid + 's', [['0%', '#fff8e0'], ['40%', '#f5c518'], ['100%', '#e8791a', 0.2]]), body:
          `<circle cx="${cx}" cy="${cy}" r="11" fill="url(#${gid}s)"/>` +
          `<circle cx="${cx}" cy="${cy}" r="4.6" fill="#fff6d8"/>` +
          `<circle cx="${cx}" cy="${cy}" r="15" fill="none" stroke="${t.accent}" stroke-width="0.8" opacity="0.6"/>` +
          `<circle cx="${cx}" cy="${cy}" r="18.5" fill="none" stroke="${t.accent}" stroke-width="0.4" opacity="0.35" stroke-dasharray="3 3"/>` +
          `<path d="M ${cx - 21} ${cy} H ${cx - 17} M ${cx + 17} ${cy} H ${cx + 21} M ${cx} ${cy - 20} V ${cy - 16} M ${cx} ${cy + 16} V ${cy + 20}" stroke="${t.spark}" stroke-width="0.8" stroke-linecap="round"/>` };
      }
      if (v === 2) {
        // 방사 광선 버스트 (12방향)
        let rays = '';
        for (let i = 0; i < 12; i++) {
          const a = i * Math.PI / 6, len = i % 2 === 0 ? 17 : 11;
          rays += `<path d="M ${(cx + 7 * Math.cos(a)).toFixed(1)} ${(cy + 7 * Math.sin(a)).toFixed(1)} L ${(cx + len * Math.cos(a)).toFixed(1)} ${(cy + len * Math.sin(a)).toFixed(1)}" stroke="${i % 2 === 0 ? t.accent : t.spark}" stroke-width="${i % 2 === 0 ? 1.4 : 0.8}" stroke-linecap="round" opacity="${i % 2 === 0 ? 0.95 : 0.7}"/>`;
        }
        return { defs: rad(gid + 'u', [['0%', '#fff8e0'], ['60%', '#f5c518'], ['100%', '#e8791a', 0.15]]), body:
          rays + `<circle cx="${cx}" cy="${cy}" r="6.5" fill="url(#${gid}u)"/>` +
          `<circle cx="${cx}" cy="${cy}" r="2.6" fill="#fff6d8"/>` };
      }
      return { defs: rad(gid + 's', [['0%', '#fff8e0'], ['40%', '#f5c518'], ['100%', '#e8791a', 0.25]]) + sky(gid + 'b', '#fff0b0', 'rgba(245,197,24,0.15)'), body:
        `<circle cx="50" cy="12" r="8.5" fill="url(#${gid}s)"/>` +
        `<circle cx="50" cy="12" r="3.8" fill="#fff6d8"/>` +
        `<path d="M 44 16 L 38 41 L 62 41 L 56 16 Z" fill="url(#${gid}b)" opacity="0.85"/>` +
        `<ellipse cx="50" cy="41" rx="15" ry="2.8" fill="${t.accent}" opacity="0.4"/>` +
        `<path d="M 38 12 H 33 M 62 12 H 67 M 42 5 L 39 1 M 58 5 L 61 1" stroke="${t.accent}" stroke-width="0.8" opacity="0.8" stroke-linecap="round"/>` };
    }
    case 'storm': {
      const v = Math.floor(rand() * 3);
      if (v === 1) {
        // 사이클론 소용돌이
        return { defs: '', body:
          `<path d="M ${cx} ${cy - 13} Q ${cx + 15} ${cy - 10} ${cx + 13} ${cy} Q ${cx + 11} ${cy + 9} ${cx} ${cy + 10} Q ${cx - 10} ${cy + 11} ${cx - 11} ${cy + 2} Q ${cx - 12} ${cy - 6} ${cx - 3} ${cy - 7} Q ${cx + 5} ${cy - 8} ${cx + 6} ${cy - 1} Q ${cx + 7} ${cy + 5} ${cx} ${cy + 5}" fill="none" stroke="${t.accent}" stroke-width="1.3" stroke-linecap="round" opacity="0.9"/>` +
          `<path d="M ${cx - 2} ${cy - 17} Q ${cx + 20} ${cy - 15} ${cx + 17} ${cy + 1}" fill="none" stroke="${t.spark}" stroke-width="0.7" opacity="0.55" stroke-linecap="round"/>` +
          `<circle cx="${cx}" cy="${cy}" r="2.2" fill="${t.spark}"/>` +
          `<circle cx="${cx}" cy="${cy}" r="16" fill="${t.accent}" opacity="0.08"/>` };
      }
      if (v === 2) {
        // 돌풍 날개 (바람 갈퀴 3줄 + 깃털)
        return { defs: '', body:
          `<path d="M ${cx - 22} ${cy - 6} Q ${cx - 4} ${cy - 12} ${cx + 18} ${cy - 7} Q ${cx + 8} ${cy - 5} ${cx + 2} ${cy - 4}" fill="none" stroke="${t.accent}" stroke-width="1.2" stroke-linecap="round" opacity="0.85"/>` +
          `<path d="M ${cx - 18} ${cy + 1} Q ${cx + 2} ${cy - 4} ${cx + 22} ${cy + 2} Q ${cx + 10} ${cy + 3} ${cx + 4} ${cy + 4}" fill="none" stroke="${t.spark}" stroke-width="1" stroke-linecap="round" opacity="0.75"/>` +
          `<path d="M ${cx - 14} ${cy + 8} Q ${cx + 2} ${cy + 4} ${cx + 16} ${cy + 9}" fill="none" stroke="${t.accent}" stroke-width="0.8" stroke-linecap="round" opacity="0.6"/>` +
          `<path d="M ${cx + 16} ${cy - 7} L ${cx + 21} ${cy - 11} M ${cx + 22} ${cy + 2} L ${cx + 27} ${cy - 1}" stroke="${t.spark}" stroke-width="0.7" stroke-linecap="round" opacity="0.8"/>` +
          `<circle cx="${cx + 24}" cy="${cy - 12}" r="1" fill="${t.spark}"/>` };
      }
      return { defs: '', body:
        `<ellipse cx="50" cy="7" rx="30" ry="5.5" fill="#0c2230"/>` +
        `<ellipse cx="30" cy="9" rx="12" ry="3.6" fill="#123040" opacity="0.9"/>` +
        `<path d="M ${cx} 10 L ${cx - 7} 23 L ${cx - 2} 23 L ${cx - 9} 37 L ${cx + 6} 21 L ${cx} 21 L ${cx + 6} 10 Z" fill="#aefcff" stroke="#e0feff" stroke-width="0.5"/>` +
        `<path d="M ${cx + 16} 12 Q ${cx + 24} 16 ${cx + 16} 21 M ${cx - 20} 14 Q ${cx - 27} 18 ${cx - 20} 23" fill="none" stroke="${t.accent}" stroke-width="0.9" opacity="0.6"/>` +
        `<ellipse cx="${(cx - 4).toFixed(1)}" cy="41" rx="9" ry="2" fill="#aefcff" opacity="0.4"/>` };
    }
    default: { // arcane — 룬 서클 + 성광
      let s = `<circle cx="${cx}" cy="${cy}" r="12.5" fill="none" stroke="${t.accent}" stroke-width="0.9" opacity="0.8"/>` +
              `<circle cx="${cx}" cy="${cy}" r="8.5" fill="none" stroke="${t.accent}" stroke-width="0.5" opacity="0.55" stroke-dasharray="2.5 2"/>` +
              `<g transform="rotate(${rot} ${cx} ${cy})">` +
              `<path d="M ${cx} ${cy - 6.5} L ${cx + 1.9} ${cy - 1.9} L ${cx + 6.5} ${cy} L ${cx + 1.9} ${cy + 1.9} L ${cx} ${cy + 6.5} L ${cx - 1.9} ${cy + 1.9} L ${cx - 6.5} ${cy} L ${cx - 1.9} ${cy - 1.9} Z" fill="${t.accent}" opacity="0.9"/></g>` +
              `<circle cx="${cx}" cy="${cy}" r="2" fill="#fff" opacity="0.9"/>` +
              `<circle cx="${cx}" cy="${cy}" r="15" fill="${t.accent}" opacity="0.10"/>`;
      for (let i = 0; i < 4; i++) {
        const a = rand() * Math.PI * 2, r = 15 + rand() * 6;
        s += `<circle cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a) * 0.7).toFixed(1)}" r="${(0.6 + rand() * 0.7).toFixed(2)}" fill="${t.spark}" opacity="0.85"/>`;
      }
      return { defs: '', body: s };
    }
  }
}

// ── 강화 카드: 룬 받침 + 키워드 아이템 ─────────────────
function _augmentMotif(card, t, rand) {
  const key = `${card.id} ${card.effect?.type ?? ''}`.toLowerCase();
  const cx = 50, cy = 22;
  // 받침: 룬 원 + 부유 링
  let s = `<ellipse cx="${cx}" cy="38" rx="13" ry="3" fill="#000" opacity="0.4"/>` +
          `<ellipse cx="${cx}" cy="36" rx="11" ry="2.6" fill="none" stroke="${t.accent}" stroke-width="0.8" opacity="0.65"/>` +
          `<ellipse cx="${cx}" cy="33" rx="7.5" ry="1.8" fill="none" stroke="${t.accent}" stroke-width="0.5" opacity="0.45"/>` +
          `<circle cx="${cx}" cy="${cy}" r="14" fill="${t.accent}" opacity="0.08"/>`;
  const item = (() => {
    if (/shield|bulwark|fortify|guardian|titan/.test(key)) {
      return `<path d="M ${cx - 6} ${cy - 8} L ${cx + 6} ${cy - 8} L ${cx + 6} ${cy + 1} Q ${cx + 6} ${cy + 7} ${cx} ${cy + 9} Q ${cx - 6} ${cy + 7} ${cx - 6} ${cy + 1} Z" fill="#28304a" stroke="${t.accent}" stroke-width="1"/>` +
             `<path d="M ${cx} ${cy - 5} V ${cy + 6} M ${cx - 3.6} ${cy - 1} H ${cx + 3.6}" stroke="${t.accent}" stroke-width="1" opacity="0.9"/>`;
    }
    if (/speed|haste|swift|rapid|overclock/.test(key)) {
      return `<path d="M ${cx - 4.5} ${cy - 8} H ${cx + 4.5} L ${cx + 1.2} ${cy} L ${cx + 4.5} ${cy + 8} H ${cx - 4.5} L ${cx - 1.2} ${cy} Z" fill="#2a2438" stroke="${t.accent}" stroke-width="1"/>` +
             `<path d="M ${cx - 2} ${cy - 5.5} H ${cx + 2} M ${cx - 2} ${cy + 5.5} H ${cx + 2}" stroke="${t.spark}" stroke-width="1"/>` +
             `<path d="M ${cx + 7} ${cy - 6} Q ${cx + 12} ${cy - 4} ${cx + 8} ${cy - 1} M ${cx - 7} ${cy - 6} Q ${cx - 12} ${cy - 4} ${cx - 8} ${cy - 1}" fill="none" stroke="${t.accent}" stroke-width="0.8" opacity="0.7"/>`;
    }
    if (/range|extend|focus|marksman|eye|sniper/.test(key)) {
      return `<circle cx="${cx}" cy="${cy}" r="7.5" fill="none" stroke="${t.accent}" stroke-width="1"/>` +
             `<circle cx="${cx}" cy="${cy}" r="3.6" fill="none" stroke="${t.accent}" stroke-width="0.7" opacity="0.8"/>` +
             `<path d="M ${cx} ${cy - 11} V ${cy - 6} M ${cx} ${cy + 6} V ${cy + 11} M ${cx - 11} ${cy} H ${cx - 6} M ${cx + 6} ${cy} H ${cx + 11}" stroke="${t.spark}" stroke-width="1" stroke-linecap="round"/>` +
             `<circle cx="${cx}" cy="${cy}" r="1.4" fill="${t.spark}"/>`;
    }
    if (/gold|econ|greed/.test(key)) {
      return `<circle cx="${cx}" cy="${cy}" r="7" fill="#ffd44a" stroke="#8a6a10" stroke-width="0.8"/>` +
             `<circle cx="${cx}" cy="${cy}" r="4" fill="none" stroke="#8a6a10" stroke-width="0.6"/>` +
             `<path d="M ${cx} ${cy - 3} V ${cy + 3}" stroke="#8a6a10" stroke-width="1"/>`;
    }
    if (/slow|frost|ice/.test(key)) {
      return `<g stroke="${t.spark}" stroke-width="1" opacity="0.95">` +
             `<path d="M ${cx} ${cy - 8} V ${cy + 8} M ${cx - 7} ${cy - 4} L ${cx + 7} ${cy + 4} M ${cx + 7} ${cy - 4} L ${cx - 7} ${cy + 4}"/></g>` +
             `<circle cx="${cx}" cy="${cy}" r="9" fill="${t.accent}" opacity="0.12"/>`;
    }
    if (/burn|inferno|fire/.test(key)) {
      return `<path d="M ${cx} ${cy + 8} Q ${cx - 7} ${cy + 3} ${cx - 4} ${cy - 3} Q ${cx - 2} ${cy + 1} ${cx} ${cy - 1} Q ${cx + 1} ${cy - 6} ${cx + 4} ${cy - 8} Q ${cx + 4} ${cy - 2} ${cx + 6} ${cy + 2} Q ${cx + 7} ${cy + 6} ${cx} ${cy + 8} Z" fill="#ff7030" stroke="#ffc060" stroke-width="0.7"/>` +
             `<path d="M ${cx} ${cy + 6} Q ${cx - 2.5} ${cy + 2} ${cx} ${cy - 1.5} Q ${cx + 2.5} ${cy + 2} ${cx} ${cy + 6} Z" fill="#fff0c0"/>`;
    }
    if (/aura|hymn|resonance|link|prism|pact/.test(key)) {
      return `<circle cx="${cx}" cy="${cy}" r="3" fill="${t.accent}"/>` +
             `<circle cx="${cx}" cy="${cy}" r="6.5" fill="none" stroke="${t.accent}" stroke-width="0.8" opacity="0.75"/>` +
             `<circle cx="${cx}" cy="${cy}" r="10" fill="none" stroke="${t.accent}" stroke-width="0.6" opacity="0.5"/>` +
             `<circle cx="${cx}" cy="${cy}" r="13.5" fill="none" stroke="${t.accent}" stroke-width="0.4" opacity="0.3"/>`;
    }
    if (/sharpen|dmg|damage|power|prime|edge|catalyst/.test(key)) {
      return `<path d="M ${cx - 7} ${cy + 7} L ${cx + 4} ${cy - 7} L ${cx + 7} ${cy - 9} L ${cx + 6} ${cy - 5} L ${cx - 5} ${cy + 9} Z" fill="#c8ccd8" stroke="#8a90a0" stroke-width="0.6"/>` +
             `<path d="M ${cx - 6} ${cy + 7} L ${cx + 5} ${cy - 7}" stroke="#f0f4ff" stroke-width="0.7" opacity="0.9"/>` +
             `<path d="M ${cx + 7} ${cy - 11} L ${cx + 9} ${cy - 14} M ${cx + 9.5} ${cy - 9} L ${cx + 12.5} ${cy - 10}" stroke="${t.spark}" stroke-width="0.8" stroke-linecap="round"/>`;
    }
    // 기본: 기어 룬
    let gpts = '';
    for (let i = 0; i < 8; i++) {
      const a = i * Math.PI / 4 + 0.2;
      gpts += `<rect x="${(cx + 8.2 * Math.cos(a) - 1.1).toFixed(1)}" y="${(cy + 8.2 * Math.sin(a) - 1.1).toFixed(1)}" width="2.2" height="2.2" fill="${t.accent}" transform="rotate(${(a * 57.3).toFixed(0)} ${(cx + 8.2 * Math.cos(a)).toFixed(1)} ${(cy + 8.2 * Math.sin(a)).toFixed(1)})"/>`;
    }
    return `<circle cx="${cx}" cy="${cy}" r="7" fill="#242038" stroke="${t.accent}" stroke-width="1"/>` + gpts +
           `<circle cx="${cx}" cy="${cy}" r="2.6" fill="none" stroke="${t.accent}" stroke-width="0.9"/>`;
  })();
  // 부유 스파크
  let sparks = '';
  for (let i = 0; i < 3; i++) {
    sparks += `<circle cx="${(cx - 16 + rand() * 32).toFixed(1)}" cy="${(8 + rand() * 22).toFixed(1)}" r="${(0.6 + rand() * 0.6).toFixed(2)}" fill="${t.spark}" opacity="0.8"/>`;
  }
  return s + item + sparks;
}

// ── 저주 카드 ─────────────────────────────────────────
function _curseMotif(rand) {
  const cx = 50, cy = 22, tilt = (rand() * 16 - 8).toFixed(0);
  return `<circle cx="${cx}" cy="${cy}" r="14" fill="#4a0a5a" opacity="0.25"/>` +
    `<g transform="rotate(${tilt} ${cx} ${cy})">` +
    `<path d="M ${cx} ${cy - 9} Q ${cx + 8} ${cy - 8} ${cx + 8} ${cy} Q ${cx + 8} ${cy + 5} ${cx + 4} ${cy + 7} L ${cx + 4} ${cy + 10} L ${cx - 4} ${cy + 10} L ${cx - 4} ${cy + 7} Q ${cx - 8} ${cy + 5} ${cx - 8} ${cy} Q ${cx - 8} ${cy - 8} ${cx} ${cy - 9} Z" fill="#1a0826" stroke="#b040c0" stroke-width="1"/>` +
    `<circle cx="${cx - 3.2}" cy="${cy - 1}" r="2.2" fill="#e060f0" opacity="0.9"/>` +
    `<circle cx="${cx + 3.2}" cy="${cy - 1}" r="2.2" fill="#e060f0" opacity="0.9"/>` +
    `<path d="M ${cx - 2.5} ${cy + 8} V ${cy + 10} M ${cx} ${cy + 8} V ${cy + 10} M ${cx + 2.5} ${cy + 8} V ${cy + 10}" stroke="#b040c0" stroke-width="0.8"/></g>` +
    `<path d="M ${cx - 14} ${cy + 12} Q ${cx - 8} ${cy + 16} ${cx - 2} ${cy + 13} M ${cx + 14} ${cy + 12} Q ${cx + 8} ${cy + 17} ${cx + 2} ${cy + 14}" fill="none" stroke="#7a2090" stroke-width="0.9" opacity="0.7"/>`;
}

// 절차 합성 카드 아트 생성
function _composeArt(card) {
  const theme = _pickTheme(card);
  const t = THEMES[theme];
  const rand = _rng(_hash(card.id));
  const gid = 'cg' + (_hash(card.id) % 100000).toString(36);
  const bd = _backdrop(t, rand, gid);

  let motifDefs = '', motifBody = '';
  if (card.type === 'summon') {
    motifBody = _towerGlyph(card, t, rand);
  } else if (card.type === 'spell') {
    const m = _spellMotif(card, theme, t, rand, gid);
    motifDefs = m.defs; motifBody = m.body;
  } else if (card.type === 'curse') {
    motifBody = _curseMotif(rand);
  } else {
    motifBody = _augmentMotif(card, t, rand);
  }
  return wrap(bd.defs + motifDefs, bd.body + motifBody);
}

/**
 * 카드 아트 반환 — 전용 아트 우선, 없으면 절차 합성.
 * @param {object|string} card 카드 정의 객체 (또는 id 문자열 — 전용 아트만 조회)
 */
export function getCardArt(card) {
  if (typeof card === 'string') {
    const fn = CARD_ART[card];
    return fn ? fn() : null;
  }
  const fn = CARD_ART[card.id];
  if (fn) return fn();
  try {
    return _composeArt(card);
  } catch {
    return null; // 합성 실패 시 기존 타입별 패턴으로 폴백
  }
}
