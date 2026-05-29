/**
 * Runewarden — Steam 통합 시스템 v0.3
 *
 * 구조:
 *   Renderer(SteamSystem) → preload(contextBridge) → main(steamworks.js)
 *
 * Steam 미실행 시 localStorage로 자동 폴백.
 */

import { i18n } from '../i18n/i18n.js';

// ── 업적 정의 (40개) ──────────────────────────────────
export const ACHIEVEMENTS = {
  // ── 첫 경험 ───────────────────────────────────────
  FIRST_RUN:       { id: 'FIRST_RUN',       name: 'The First Siege',        nameKo: '첫 번째 공방',         desc: 'Complete your first run.',                           descKo: '첫 번째 런을 완료하세요.',                               icon: '🛡️' },
  FIRST_WIN:       { id: 'FIRST_WIN',       name: 'Warden Victorious',      nameKo: '워든의 승리',          desc: 'Win your first run.',                                descKo: '첫 번째 런에서 승리하세요.',                             icon: '🏆' },
  FIRST_WAVE:      { id: 'FIRST_WAVE',      name: 'Line Held',              nameKo: '방어선 사수',          desc: 'Clear Wave 1 without nexus damage.',                 descKo: '넥서스 피해 없이 웨이브 1을 클리어하세요.',             icon: '⚔️' },

  // ── 전투 ──────────────────────────────────────────
  KILL_100:        { id: 'KILL_100',        name: 'Slaughterer',            nameKo: '학살자',               desc: 'Slay 100 enemies total.',                            descKo: '적을 합계 100마리 처치하세요.',                          icon: '💀' },
  KILL_1000:       { id: 'KILL_1000',       name: 'Warden of Blood',        nameKo: '피의 워든',            desc: 'Slay 1,000 enemies total.',                          descKo: '적을 합계 1,000마리 처치하세요.',                        icon: '☠️' },
  TANK_KILLER:     { id: 'TANK_KILLER',     name: 'Giant Slayer',           nameKo: '거인 사냥꾼',          desc: 'Destroy a Tank enemy.',                              descKo: '탱크 적을 처치하세요.',                                  icon: '💣' },
  BOSS_KILLER:     { id: 'BOSS_KILLER',     name: 'Ironclad Breaker',       nameKo: '철갑 파괴자',          desc: 'Defeat the Ironclad boss.',                          descKo: '철갑 수호자 보스를 격파하세요.',                         icon: '💥' },
  PERFECT_WAVE:    { id: 'PERFECT_WAVE',    name: 'Untouchable',            nameKo: '무결의 방어',          desc: 'Clear a wave with no enemies reaching the exit.',    descKo: '적이 한 마리도 탈출하지 못하고 웨이브를 클리어하세요.', icon: '✨' },
  ELITE_HUNTER:    { id: 'ELITE_HUNTER',    name: 'Elite Slayer',           nameKo: '엘리트 사냥꾼',        desc: 'Kill 10 Elite enemies in a single run.',             descKo: '하나의 런에서 엘리트 적을 10마리 처치하세요.',           icon: '🔱' },

  // ── 덱빌딩 ────────────────────────────────────────
  BIG_DECK:        { id: 'BIG_DECK',        name: 'Card Collector',         nameKo: '카드 수집가',          desc: 'Have 20+ cards in your deck during a run.',          descKo: '런 도중 덱에 카드를 20장 이상 보유하세요.',             icon: '🃏' },
  TRIPLE_AUGMENT:  { id: 'TRIPLE_AUGMENT',  name: 'Master Enhancer',        nameKo: '강화의 달인',          desc: 'Augment 3 different towers in one run.',             descKo: '하나의 런에서 서로 다른 타워 3개를 강화하세요.',         icon: '⚡' },
  SPELL_POWER:     { id: 'SPELL_POWER',     name: 'Arcane Volley',          nameKo: '마법의 연사',          desc: 'Cast 5 spells in a single wave.',                    descKo: '하나의 웨이브에서 주문을 5번 시전하세요.',               icon: '🔮' },
  ALL_TOWERS:      { id: 'ALL_TOWERS',      name: 'Master Builder',         nameKo: '만능 건축가',          desc: 'Place all 6 tower types in a single run.',           descKo: '하나의 런에서 6종 타워를 모두 배치하세요.',              icon: '🏰' },

  // ── 메타 진행 ─────────────────────────────────────
  RANK_5:          { id: 'RANK_5',          name: 'Veteran Warden',         nameKo: '역전의 워든',          desc: 'Reach Warden Rank 5.',                               descKo: '워든 랭크 5에 도달하세요.',                              icon: '⭐' },
  RANK_10:         { id: 'RANK_10',         name: 'Seasoned Commander',     nameKo: '노련한 지휘관',        desc: 'Reach Warden Rank 10.',                              descKo: '워든 랭크 10에 도달하세요.',                             icon: '🌟' },
  RANK_20:         { id: 'RANK_20',         name: 'Ascendant',              nameKo: '초월자',               desc: 'Reach the maximum Warden Rank.',                     descKo: '워든 최고 랭크에 도달하세요.',                           icon: '👑' },

  // ── 숨겨진 ────────────────────────────────────────
  CURSED_WIN:      { id: 'CURSED_WIN',      name: 'Cursed Victory',         nameKo: '저주받은 승리',        desc: 'Win a run after accepting the Cursed Relic.',        descKo: '저주 유물을 받은 후 런에서 승리하세요.',                 icon: '🕯️' },
  PERFECT_RUN:     { id: 'PERFECT_RUN',     name: 'Flawless Warden',        nameKo: '무결의 워든',          desc: 'Win with all 3 Nexus HP remaining.',                 descKo: '넥서스 HP 3을 모두 유지한 채 승리하세요.',               icon: '💎' },
  SPEED_RUN:       { id: 'SPEED_RUN',       name: 'Swift Justice',          nameKo: '신속한 심판',          desc: 'Win a run in under 20 minutes.',                     descKo: '20분 이내에 런을 완료하고 승리하세요.',                  icon: '⚡' },
  NEXUS_HEAL:      { id: 'NEXUS_HEAL',      name: 'Blessed Warden',         nameKo: '축복받은 워든',        desc: 'Restore Nexus HP during a run.',                     descKo: '런 도중 넥서스 HP를 회복하세요.',                        icon: '💚' },

  // ── 워든별 승리 ───────────────────────────────────
  IRON_WIN:        { id: 'IRON_WIN',        name: 'Iron Resolve',           nameKo: '철의 의지',            desc: 'Win a run as the Iron Warden.',                      descKo: '철의 워든으로 런에서 승리하세요.',                       icon: '🔩' },
  STORM_WIN:       { id: 'STORM_WIN',       name: 'Storm Caller',           nameKo: '폭풍 소환사',          desc: 'Win a run as the Storm Warden.',                     descKo: '폭풍의 워든으로 런에서 승리하세요.',                     icon: '⛈️' },
  ARCANE_WIN:      { id: 'ARCANE_WIN',      name: 'Arcane Triumph',         nameKo: '비전의 개가',          desc: 'Win a run as the Arcane Warden.',                    descKo: '비전의 워든으로 런에서 승리하세요.',                     icon: '🔯' },
  SHADOW_WIN:      { id: 'SHADOW_WIN',      name: 'Shadow Sovereign',       nameKo: '어둠의 지배자',        desc: 'Win a run as the Shadow Warden.',                    descKo: '어둠의 워든으로 런에서 승리하세요.',                     icon: '🌑' },

  // ── 챌린지 클리어 ─────────────────────────────────
  ACH_ARCHER_ONLY:     { id: 'ACH_ARCHER_ONLY',     name: 'Arrow Rain',           nameKo: '화살비',               desc: 'Win a run with the Archer Only challenge active.',           descKo: '궁수 전용 챌린지를 활성화한 채 승리하세요.',            icon: '🏹' },
  ACH_POVERTY_WIN:     { id: 'ACH_POVERTY_WIN',     name: 'Rags to Riches',       nameKo: '빈자에서 부자로',       desc: 'Win a run with the Poverty challenge active.',               descKo: '빈곤 챌린지를 활성화한 채 승리하세요.',                 icon: '💸' },
  ACH_PERFECT_DEFENSE: { id: 'ACH_PERFECT_DEFENSE', name: 'Perfect Defense',      nameKo: '완벽한 방어',           desc: 'Win a run with the Perfect Defense challenge active.',       descKo: '완벽한 방어 챌린지를 활성화한 채 승리하세요.',          icon: '🛡️' },
  ACH_NO_SPELLS_WIN:   { id: 'ACH_NO_SPELLS_WIN',   name: 'Silent Warden',        nameKo: '침묵의 워든',           desc: 'Win a run with the Silence challenge active.',               descKo: '침묵 챌린지를 활성화한 채 승리하세요.',                 icon: '🔇' },
  ACH_IMMUTABLE_WIN:   { id: 'ACH_IMMUTABLE_WIN',   name: 'Immutable Force',      nameKo: '불변의 의지',           desc: 'Win a run with the Immutable challenge active.',             descKo: '무변의 덱 챌린지를 활성화한 채 승리하세요.',            icon: '⛔' },
  ACH_TRIPLE_CURSE:    { id: 'ACH_TRIPLE_CURSE',    name: 'Triple Threat',        nameKo: '삼중 시련',             desc: 'Win a run with 3 or more challenges active simultaneously.', descKo: '챌린지 3개 이상을 동시에 활성화한 채 승리하세요.',       icon: '⚠️' },

  // ── 덱 시너지 ─────────────────────────────────────
  ACH_FROST_MASTER:    { id: 'ACH_FROST_MASTER',    name: 'Frost Overlord',       nameKo: '냉기의 지배자',         desc: 'Win a run with both Frost and Glacial towers placed.',       descKo: '프로스트 메이지와 빙하 파수꾼을 모두 배치하고 승리하세요.', icon: '❄️' },
  ACH_FIRE_SWARM:      { id: 'ACH_FIRE_SWARM',      name: 'Inferno Swarm',        nameKo: '화염 군단',             desc: 'Win a run with 3 or more Fire Drake towers placed.',         descKo: 'Fire Drake 타워를 3기 이상 배치하고 승리하세요.',        icon: '🔥' },
  ACH_TESLA_CHAIN:     { id: 'ACH_TESLA_CHAIN',     name: 'Chain Lightning',      nameKo: '연쇄 번개',             desc: 'Win a run with Tesla placed and 10+ spells cast.',           descKo: 'Tesla Coil 배치 후 주문 10회 이상 시전하고 승리하세요.', icon: '⚡' },
  ACH_DRUID_CORE:      { id: 'ACH_DRUID_CORE',      name: "Nature's Guardian",    nameKo: '자연의 수호자',         desc: 'Win a run with a Druid tower placed.',                       descKo: 'Druid Grove를 배치하고 승리하세요.',                     icon: '🌿' },
  ACH_SPELL_SLINGER:   { id: 'ACH_SPELL_SLINGER',   name: 'Spell Slinger',        nameKo: '마법사격수',            desc: 'Cast 15 or more spells in a single run.',                    descKo: '하나의 런에서 주문을 15번 이상 시전하세요.',             icon: '🔮' },

  // ── 전투 마일스톤 ─────────────────────────────────
  WAVE_10_CLEAR:   { id: 'WAVE_10_CLEAR',   name: 'Midpoint Defender',      nameKo: '중간 방어자',          desc: 'Clear Wave 10.',                                             descKo: '웨이브 10을 클리어하세요.',                              icon: '🌊' },
  WAVE_15_CLEAR:   { id: 'WAVE_15_CLEAR',   name: 'Final Stand',            nameKo: '최후의 저항',          desc: 'Clear Wave 15.',                                             descKo: '웨이브 15를 클리어하세요.',                              icon: '🌊' },
  KILL_5000:       { id: 'KILL_5000',       name: 'Warden of Annihilation', nameKo: '섬멸의 워든',          desc: 'Slay 5,000 enemies total.',                                  descKo: '적을 합계 5,000마리 처치하세요.',                        icon: '💀' },
  NEXUS_CRISIS:    { id: 'NEXUS_CRISIS',    name: 'Last Breath',            nameKo: '마지막 숨결',          desc: 'Win a run with only 1 Nexus HP remaining.',                  descKo: '넥서스 HP 1만 남은 상태에서 승리하세요.',                icon: '❤️' },
  VETERAN_WIN:     { id: 'VETERAN_WIN',     name: "Veteran's Triumph",      nameKo: '베테랑의 개선',        desc: 'Win a run on Veteran difficulty.',                            descKo: '베테랑 난이도에서 승리하세요.',                          icon: '🎖️' },
};

// ── Steam 통계 정의 ─────────────────────────────────
export const STEAM_STATS = {
  TOTAL_KILLS:    'stat_total_kills',
  TOTAL_WINS:     'stat_total_wins',
  TOTAL_RUNS:     'stat_total_runs',
  TOTAL_GOLD:     'stat_total_gold',
};

// ── DLC 정의 ────────────────────────────────────────
// Steam Partner에서 DLC App ID 발급 후 여기에 입력
export const DLC_DEFS = {
  shadow_realm: {
    id:       'shadow_realm',
    name:     'Shadow Realm',
    nameKo:   '그림자 왕국',
    steamAppId: 0,   // TODO: Steam DLC App ID 입력
    price:    '$4.99',
  },
};

// ── SteamSystem 클래스 ───────────────────────────────
export class SteamSystem {
  constructor() {
    // preload 브릿지 — Steam 없을 경우 null
    this._api   = window.steamAPI ?? null;
    this._ready = false;   // 비동기로 확인
    this._localUnlocked = new Set(
      JSON.parse(localStorage.getItem('rw_achievements') ?? '[]')
    );

    // 비동기 가용성 확인
    this._init();
  }

  async _init() {
    try {
      if (this._api?.isAvailable) {
        this._ready = await this._api.isAvailable();
      }
      if (this._ready) {
        const name = await this._api.getPlayerName?.() ?? 'Warden';
        console.log(`[Steam] ✅ Connected — ${name}`);
      } else {
        console.log('[Steam] Offline mode — localStorage fallback');
      }
    } catch (e) {
      console.warn('[Steam] Init error:', e.message);
      this._ready = false;
    }
  }

  // ── 업적 언락 ─────────────────────────────────────
  async unlockAchievement(id) {
    if (this._localUnlocked.has(id)) return;

    this._localUnlocked.add(id);
    this._saveLocal();

    const ach = ACHIEVEMENTS[id];
    if (!ach) { console.warn('[Steam] Unknown achievement:', id); return; }

    // Steam API
    if (this._ready && this._api) {
      try {
        await this._api.unlockAchievement(id);
        console.log(`[Steam] 🏆 ${i18n.lang === 'ko' ? (ach.nameKo ?? ach.name) : ach.name}`);
      } catch (e) {
        console.warn('[Steam] Achievement error:', e.message);
      }
    }

    this._showToast(ach);
  }

  isUnlocked(id) { return this._localUnlocked.has(id); }

  // ── DLC 소유 여부 확인 ────────────────────────────
  /**
   * DLC 구매 여부를 확인합니다.
   * @param {string} dlcKey — DLC_DEFS의 키 (예: 'shadow_realm')
   * @returns {boolean}
   *
   * 우선순위:
   * 1. 개발 모드 → 항상 true (테스트 편의)
   * 2. Steam API → isSubscribedApp(appId)
   * 3. localStorage 오버라이드 → 크리에이터 키/테스트용
   * 4. 기본값 → false
   */
  isDlcOwned(dlcKey) {
    const dlc = DLC_DEFS[dlcKey];
    if (!dlc) return false;

    // 개발 모드 우회 (콘솔: localStorage.setItem('rw_dev','1') 후 새로고침)
    if (localStorage.getItem('rw_dev') === '1') return true;

    // localStorage 오버라이드 (크리에이터 키·베타 배포용)
    const overrides = JSON.parse(localStorage.getItem('rw_dlc_owned') ?? '[]');
    if (overrides.includes(dlcKey)) return true;

    // Steam API: BIsDlcInstalled — 소유 + 설치 여부 동시 확인
    // (BIsSubscribedApp는 소유만 확인, DLC에는 BIsDlcInstalled가 정확함)
    if (this._ready && this._api && dlc.steamAppId > 0) {
      try {
        // steamworks.js는 apps.isDlcInstalled(appId) 형태로 노출
        return this._api.isDlcInstalled?.(dlc.steamAppId)
            ?? this._api.isSubscribedApp?.(dlc.steamAppId)  // 폴백
            ?? false;
      } catch {
        return false;
      }
    }

    return false;
  }

  /**
   * 현재 앱에 등록된 DLC 목록 조회 (Steam 기준)
   * GetDLCCount + BGetDLCDataByIndex 활용
   * @returns {{ appId: number, name: string, available: boolean }[]}
   */
  getRegisteredDlcs() {
    if (!this._ready || !this._api) return [];
    try {
      const count = this._api.getDLCCount?.() ?? 0;
      const result = [];
      for (let i = 0; i < count; i++) {
        const data = this._api.getDLCDataByIndex?.(i);
        if (data) result.push(data);
      }
      return result;
    } catch {
      return [];
    }
  }

  /**
   * DLC 활성화 (크리에이터 키, 베타 테스트용)
   * @param {string} dlcKey
   */
  activateDlcLocally(dlcKey) {
    const owned = JSON.parse(localStorage.getItem('rw_dlc_owned') ?? '[]');
    if (!owned.includes(dlcKey)) {
      owned.push(dlcKey);
      localStorage.setItem('rw_dlc_owned', JSON.stringify(owned));
    }
  }

  // ── 통계 갱신 ─────────────────────────────────────
  async setStat(statKey, value) {
    if (!this._ready || !this._api) return;
    try {
      await this._api.setStat(statKey, value);
    } catch (e) {
      console.warn('[Steam] SetStat error:', e.message);
    }
  }

  // ── 런 종료 시 업적 일괄 체크 ────────────────────
  checkRunStats({ wavesCleared, enemiesKilled, nexusHpLeft, victory,
                  runTimeMs, cardsPlayed, towersPlaced, spellsCastThisWave,
                  augmentsApplied, eliteKills, bossKilled, nexusHealed }) {

    if (wavesCleared >= 1) this.unlockAchievement('FIRST_RUN');

    if (victory) {
      this.unlockAchievement('FIRST_WIN');
      if (nexusHpLeft >= 3)           this.unlockAchievement('PERFECT_RUN');
      if (runTimeMs < 20 * 60 * 1000) this.unlockAchievement('SPEED_RUN');
    }

    if (bossKilled)   this.unlockAchievement('BOSS_KILLER');
    if (nexusHealed)  this.unlockAchievement('NEXUS_HEAL');

    if ((augmentsApplied ?? 0) >= 3)    this.unlockAchievement('TRIPLE_AUGMENT');
    if ((spellsCastThisWave ?? 0) >= 5) this.unlockAchievement('SPELL_POWER');
    if ((eliteKills ?? 0) >= 10)        this.unlockAchievement('ELITE_HUNTER');

    // 6종 타워 전부 소환했는지는 GameEngine에서 별도 체크
  }

  checkKillMilestone(totalKills) {
    if (totalKills >=   100) this.unlockAchievement('KILL_100');
    if (totalKills >= 1_000) this.unlockAchievement('KILL_1000');
    if (totalKills >= 5_000) this.unlockAchievement('KILL_5000');
  }

  checkRankMilestone(rank) {
    if (rank >=  5) this.unlockAchievement('RANK_5');
    if (rank >= 10) this.unlockAchievement('RANK_10');
    if (rank >= 20) this.unlockAchievement('RANK_20');
  }

  checkDeckSize(deckSize) {
    if (deckSize >= 20) this.unlockAchievement('BIG_DECK');
  }

  checkAllTowers(towerTypesUsed) {
    if (towerTypesUsed.size >= 6) this.unlockAchievement('ALL_TOWERS');
  }

  // ── 토스트 알림 ───────────────────────────────────
  _showToast(ach) {
    const existing = document.querySelector('.achievement-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    const isKo = i18n.lang === 'ko';
    const label = isKo ? '업적 달성!' : 'Achievement Unlocked';
    const name  = isKo ? (ach.nameKo ?? ach.name) : ach.name;
    const desc  = isKo ? (ach.descKo ?? ach.desc) : ach.desc;
    toast.innerHTML = `
      <span class="ach-icon">${ach.icon}</span>
      <div class="ach-text">
        <div class="ach-label">${label}</div>
        <div class="ach-name">${name}</div>
        <div class="ach-desc">${desc}</div>
      </div>
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => toast.classList.add('show'));
    });
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }

  _saveLocal() {
    localStorage.setItem('rw_achievements', JSON.stringify([...this._localUnlocked]));
  }
}
