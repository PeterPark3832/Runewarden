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

/** 카드 id에 전용 아트가 있으면 SVG 문자열 반환, 없으면 null */
export function getCardArt(cardId) {
  const fn = CARD_ART[cardId];
  return fn ? fn() : null;
}
