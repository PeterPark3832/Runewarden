# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Run the Electron app
npm run dev        # Run in dev mode (enables DevTools via --dev flag)
npm test           # Run all tests (vitest)
npm run lint       # Lint src/ with ESLint

# Run a single test file
npx vitest run tests/CardSystem.test.js

# Build distributables
npm run build:win   # Windows NSIS installer
npm run build:mac   # macOS DMG (x64 + arm64)
npm run build:linux # Linux AppImage
```

## Architecture

Runewarden is an Electron desktop game: a Tower Defense × Deck Builder × Roguelike hybrid. The renderer process runs `index.html` which loads `src/core/GameEngine.js` as an ES module entry point. `main.js` is the Electron main process (BrowserWindow, Steam IPC, app lifecycle).

### Shared state pattern

`src/core/GameState.js` exports a single `shared` object. All modules — `GameEngine`, `HUDUpdater`, `UIOrchestrator` — reference game systems through this object rather than direct imports. `GameEngine` populates `shared.state`, `shared.renderer`, `shared.enemySystem`, etc. at the start of each run and replaces them on restart.

### Game loop and phase state machine

`GameEngine.js` drives a `requestAnimationFrame` loop and owns a phase state machine on `state.phase`:

```
pre → wave → post → node (shop | event | rest) → pre
```

- `pre`: player places towers/plays cards, presses Start Wave
- `wave`: RAF loop calls `enemySystem.update(delta)` and `towerSystem.update(delta)`
- `post`/`node`: between-wave screens (node selection, shop, event, rest site)
- `over`: game ended (victory or defeat)

Wave clear auto-saves to `localStorage` key `rw_autosave`. Meta progression persists to `localStorage` key `runewarden_meta_v1`. Renderer crashes (`error` / `unhandledrejection`) are logged to `rw_crash_log` (last 10 entries).

### Core systems

| Module | Responsibility |
|--------|---------------|
| `src/core/GameEngine.js` | Orchestrates everything: wave lifecycle, callbacks, event listeners, keyboard shortcuts. This file is intentionally monolithic and marked as a gradual refactor target. |
| `src/core/SpellResolver.js` | Handler map for all spell effects. Adding a new spell means adding one entry to `BASE_HANDLERS`. Receives a `ctx` object injected by GameEngine. |
| `src/systems/CardSystem.js` | Draw/discard/play deck mechanics. Stateless logic — no DOM access. |
| `src/systems/EnemySystem.js` | Enemy spawning from `WAVE_CONFIGS`, movement along `WAYPOINTS`, HP/status effects (slow, freeze, burn, solar DoT). |
| `src/systems/TowerSystem.js` | Tower placement, targeting (nearest/farthest/strongest), attack ticks, relic multiplier accumulation. |
| `src/systems/MetaSystem.js` | Cross-run XP, rank (1–20), card unlocks, run history. Codex unlocks gate which cards appear in the shop. |
| `src/systems/DLCRegistry.js` | Thin `Set`-based registry. `hasDLC(id)` / `registerDLC(id)` / `clearDLCs()`. Queried by GameEngine at run start to set `maxWaves` and `bossWaves`. |
| `src/systems/SteamSystem.js` | Achievement/stat calls bridged to `main.js` via Electron IPC. |
| `src/rendering/MapRenderer.js` | SVG hex-grid renderer. Exports `ENEMY_PATH`, `hexToPixel`, `isPlaceableCell`. See "Map rendering (v2)" below. |

### Map rendering (v2 visual overhaul)

`MapRenderer.js` renders far more than a grid — when touching it, know these subsystems:

- **Terrain**: 3 radial-gradient variants (`hexGrad`/`B`/`C`) picked per-cell by hash, plus a single `feTurbulence` noise rect over the whole board. Hex fills are SVG *attributes* set from the map's `hexColor` — do **not** re-add CSS rules that set `.hex-bg` fill/stroke; that was a bug that made all maps look identical.
- **Hover restore**: each `.hex-bg` polygon stores its original fill in `dataset.baseFill`; mouseleave and `removeTower()` restore from it. Never hardcode a restore color.
- **Path**: Catmull-Rom smoothed `<path>` (3 layers: glow / bed / animated dashed center via `.path-center-line`). Spawn = rotating rune-ring portal; exit = Nexus crystal (classes `spawn-marker`/`exit-marker` kept for legacy CSS animations).
- **Decorations**: `_drawDecorations()` scatters procedural props (trees/rocks/crystals/…) using a **seeded PRNG keyed on map id** — same map always gets the same layout. Theme table is `DECOR_THEMES` keyed by map id (fallback `DEFAULT_THEME`); new maps should get an entry. Props are stored in `this.decorMap` and hidden/restored by `placeTower()`/`removeTower()`.
- **Tower shapes**: `_drawTowerShape()` has per-id signature branches for all 24 towers plus `def.shape`-based fallbacks (`archer`/`mage`/`drake`/`tesla`/`druid`/`cannon`/`ballista`) — a new DLC tower with a `shape` field never renders as a bare circle. Towers with shape `cannon`/`ballista` get a rotating `.tower-barrel` group (rotation applied in `TowerSystem._fireAt`).
- Map CSS keyframes are injected once via `_injectMapStyles()` (`#map-fx-style`).

### Flying enemy visuals

`EnemySystem._ensureWings()` adds flapping wing SVG paths to `def.flying` enemies. It runs on **both** the fresh-spawn and pool-reuse paths (pooled enemies previously lost their hover offset — keep it that way). `applyGrounding()` toggles the `wings-grounded` class (wings fold, animation pauses) and `_flyOffset` (−4px airborne, 0 grounded).

### Art modules

- `src/rendering/BossArt.js` — bespoke layered SVG illustrations for all 8 bosses (`drawBossArt(g, type, size)`, authored at nominal radius 30, scaled by `def.size`; gradient defs injected once into the root SVG). New bosses need an `ART` entry or they fall back to the plain body circle.
- `src/ui/CardArt.js` — card art: 15 hand-authored scenes (`CARD_ART` by id) + a procedural composer covering every other card (theme backdrop from dlc/effect keywords × motif by card type, seeded per-card variation). `makeCardArtSVG()` (HUDUpdater) checks `getCardArt(card)` first; unregistered/failed cards fall back to legacy geometric patterns. New DLC cards get composed art automatically.
- `EnemySystem FAMILY_GEAR` table — silhouette gear overlays (horns/helm/hood/spikes/fins/crown/plates/ears/antennae/wispTail) for regular enemies, drawn by `_addFamilyGear()` outside the body so eyes/badges stay clear. Add new enemy types to the table or they render without gear (bosses excluded — they use BossArt).
- Towers get a common pedestal (shadow + stone plinth + rim highlight) in `_drawTowerShape` automatically.

### UI layer

`src/ui/UIOrchestrator.js` manages screen visibility. `src/ui/HUDUpdater.js` owns `updateHUD()` and `renderHand()` — both are called frequently and read from `shared`. Each between-wave screen (Shop, Node, Event, Rest, Relic, RunSummary) is its own class that receives callbacks from GameEngine.

Card/shop descriptions pass through `emphasizeStats()` (HUDUpdater) which wraps numeric tokens in `<span class="card-stat">` for gold-bold highlighting — plain-text descriptions in data files get this for free; don't hand-mark numbers in `desc` strings. Screens fade in via `.screen.active` / overlay backdrops via `.overlay` CSS animations.

### Data layer

`src/data/` contains static definitions (no logic): `cards.js`, `towers.js`, `wardens.js`, `relics.js`, `maps.js`, `difficulty.js`, `ascension.js`, `challenges.js`. DLC cards/towers/wardens are **statically imported** and merged in these base files (e.g., `CARD_DEFS = [...BASE_CARD_DEFS, ...SHADOW_CARDS, ...SOLAR_CARDS]`).

### DLC structure

Each DLC lives under `src/dlc/{id}/` with the same file layout:

```
src/dlc/shadow_realm/   # Act 4 (Waves 16–23), Shadow Realm Warden ("The Phantom")
src/dlc/solar_dominion/ # Act 5 (Waves 24–31), Solar Warden ("The Radiant")
src/dlc/storm_imperium/ # Act 6 (Waves 32–39), Tempest Warden ("The Sovereign") — flying-enemy mechanics
```

Each DLC directory contains `cards.js`, `towers.js`, `wardens.js`, `relics.js`, `maps.js`, `events.js`, `index.js`, and `i18n/{en,ko}.js`. The DLC i18n files are merged into the main i18n in `src/i18n/i18n.js`.

DLC 3 introduces cross-cutting mechanics wired through core systems:
- **Flying** (`def.flying`): only towers with `canTargetFlying: true` can hit airborne enemies. Anti-air roster: archer, ballista, marksman, bone_archer, shadow_strike (base), phantom_sniper (DLC1), storm_ballista/tempest_tower/storm_conduit (DLC3).
- **Grounding**: 50%+ slow or stun grounds a flying enemy (`EnemySystem._groundedSet`, `applyGrounding()`); `grounding_amulet` relic lowers the threshold to 35%. Solar Beam's 30% slow deliberately does **not** ground (documented on the card).
- **Storm Charge** (Tempest Warden passive): charges only on *flying* kills and on groundings — the `isFlying` flag rides the `onEnemyKilled(reward, isSplitChild, isFlying)` callback.
- **windImmune / windDots**: wind-type slows and DoTs skip `windImmune` enemies.

### Content inventory (as of DLC 3)

182 cards (89 base) · 24 towers (12 base) · 7 wardens · 73 relics (26 base) · 14 maps (5 base) · 54 enemy types · 39 waves (Acts 1–6) · 61 events (30 base, in `i18n.t('events')` + DLC `events.js`) · 13 challenges · 5 ascension levels. Regenerate counts with:

```bash
node --input-type=module -e "import {CARD_DEFS} from './src/data/cards.js'; console.log(CARD_DEFS.length)"
```

### i18n

`src/i18n/i18n.js` exports a singleton `i18n`. All UI strings go through `i18n.t('key', ...args)`. Languages: English (`en.js`), Korean (`ko.js`), Chinese Simplified (`zh.js`) — keep all three in sync when adding keys, including the per-DLC `src/dlc/*/i18n/{en,ko,zh}.js` files (merged into the main language objects).

Data definitions (cards/towers/wardens/maps/codex) carry parallel `name`/`nameKo`/`nameZh`, `desc`/`descKo`/`descZh` fields (warden `desc` is an `{en, ko, zh}` object). Display code must use `locText(def, 'name')` from `i18n.js` — never hand-write `i18n.lang === 'ko' ? ... : ...` ternaries; `locText` falls back to English for missing translations. DLC event pools are `{en: [], ko: [], zh: []}` arrays resolved with an English fallback in NodeUI. New content needs all three languages (English fallback otherwise).

### Testing

Tests run in a pure Node environment (no DOM, no Electron). Tests live in `tests/` (8 files, 221 tests) and cover pure-logic systems: `CardSystem`, `EnemySystem`, `MetaSystem`, `SpellResolver`, `TowerSystem`, plus `GameEngineIntegration.test.js` (Victory Streak, Solar/Storm Pact, `_pendingRemove` — engine logic replicated without DOM). DOM-dependent code (`GameEngine`, all `src/ui/`) has no unit tests — verify it in a browser (below).

### Visual verification without Electron

`index.html` has no hard Electron dependency — serve the repo root over plain HTTP and drive it with headless Chromium (Playwright) to screenshot menus, runs, and DLC map themes. Useful entry points: the Quick Start button reaches the game screen fastest (dismiss the tutorial modal and the relic-choice modal first); `window.__dev` helpers jump to shop/event/wave-clear. `MapRenderer` + `setActiveMap(mapDef.path, mapDef)` can also be instantiated standalone on a bare `<svg>` to render any map theme or all tower shapes without running the game.

### Dev helpers

`window.__dev` is available in the renderer during development:

```js
window.__dev.openShop()    // jump to shop screen
window.__dev.clearWave()   // immediately clear current wave
window.__dev.endGame(true) // force victory
window.__dev.metaReset()   // wipe all meta progression
window.__dev.tutReset()    // reset tutorial flags
```

## Multi-Agent Development Workflow

### Automated hooks (configured in `.claude/settings.json`)

| Trigger | Action |
|---------|--------|
| Edit/Write any `src/**/*.js` or `tests/**/*.js` | `npm test` auto-runs, results shown immediately |
| `git push *` | `npm test` runs first; push is **blocked** if any test fails |

### Parallel agent patterns

독립적인 작업은 한 번의 요청으로 병렬 실행할 수 있습니다.

**예시 1 — 버그 수정 + 테스트 동시 작성:**
```
"EnemySystem의 X 버그를 수정하는 에이전트와 해당 케이스의 테스트를 작성하는 에이전트를 병렬로 실행해줘"
```

**예시 2 — 다중 파일 리팩토링 분산:**
```
"cards.js와 towers.js 데이터 정합성 검증을 두 에이전트가 나눠서 병렬로 확인해줘"
```

**병렬 처리 가능한 작업 유형:**
- 서로 다른 시스템 파일 수정 (EnemySystem ↔ TowerSystem은 독립적)
- 테스트 작성 + 구현 동시 진행 (TDD)
- 코드 리뷰 + 버그 수정 병렬 실행
- 여러 DLC 파일의 i18n 키 추가

**병렬 처리 불가 작업 (순서 의존성):**
- GameEngine.js는 shared 상태를 통해 모든 시스템과 연결 — 단독 수정
- `npm test` 결과를 보고 나서 다음 수정 진행
- git commit → push 순서
