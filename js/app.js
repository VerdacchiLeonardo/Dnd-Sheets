// =============================================
// DnD Sheets — Main Application Logic
// =============================================

// ---- Shared Utilities ----

let _toastTimer = null;
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  // Riusa un singolo toast invece di accumularne tanti
  let t = container.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    container.appendChild(t);
  }
  const icon = type === 'success' ? '✦' : type === 'error' ? '⚠' : 'ℹ';
  t.className = `toast ${type} show`;
  t.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => t.classList.remove('show'), 1800);
}

function getParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

// Restituisce il tema visivo di una classe (colore + stile particelle)
function getClassTheme(className) {
  return (className && DND.CLASS_THEMES[className]) || DND.DEFAULT_THEME;
}

function hexToRgb(hex) {
  const m = (hex || '#c9a84c').replace('#', '');
  return {
    r: parseInt(m.substring(0, 2), 16),
    g: parseInt(m.substring(2, 4), 16),
    b: parseInt(m.substring(4, 6), 16)
  };
}

// Particles background — themed by class. Returns a controller with setTheme().
function initParticles(canvasId, theme) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return { setTheme() {} };
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  let current = theme || DND.DEFAULT_THEME;
  let rgb = hexToRgb(current.color);

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function velocityFor(motion) {
    if (motion === 'rise') return { vx: (Math.random() - 0.5) * 0.18, vy: -(Math.random() * 0.32 + 0.12) };
    if (motion === 'fall') return { vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() * 0.26 + 0.08) };
    return { vx: (Math.random() - 0.5) * 0.14, vy: (Math.random() - 0.5) * 0.14 };
  }

  function mkParticle() {
    const v = velocityFor(current.motion);
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.7 + 0.4,
      vx: v.vx, vy: v.vy,
      alpha: Math.random() * 0.55 + 0.12,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.032
    };
  }

  const count = Math.round(115 * (current.density || 1));
  for (let i = 0; i < count; i++) particles.push(mkParticle());

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const tw = current.twinkle != null ? current.twinkle : 0.5;
    particles.forEach(p => {
      p.pulse += p.pulseSpeed;
      const a = p.alpha * ((1 - tw) + tw * (0.5 + 0.5 * Math.sin(p.pulse)));
      // alone luminoso per le classi magiche
      if (tw > 0.7) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${a * 0.12})`;
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${a})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -6) p.x = W + 6;
      if (p.x > W + 6) p.x = -6;
      if (p.y < -6) { p.y = H + 6; p.x = Math.random() * W; }
      if (p.y > H + 6) { p.y = -6; p.x = Math.random() * W; }
    });
    requestAnimationFrame(draw);
  }
  draw();

  return {
    setTheme(t) {
      if (!t) return;
      current = t;
      rgb = hexToRgb(current.color);
      particles.forEach(p => {
        const v = velocityFor(current.motion);
        p.vx = v.vx; p.vy = v.vy;
      });
    }
  };
}

// Applica le variabili-tema della classe a un elemento (o all'intera pagina)
function applyClassTheme(theme, el) {
  const target = el || document.body;
  target.style.setProperty('--class-color', theme.color);
  target.style.setProperty('--class-glow', theme.glow);
}

// =============================================
// INDEX PAGE
// =============================================

function initIndexPage() {
  initParticles('particles-canvas');

  const currentUser = Storage.getCurrentUser();
  const loginCard = document.getElementById('login-card');
  const welcomeCard = document.getElementById('welcome-card');

  if (currentUser) {
    showWelcome(currentUser);
  } else {
    showLogin();
  }

  // User login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = document.getElementById('username-input');
      const username = Storage.setCurrentUser(input.value);
      if (username) {
        showWelcome(username);
      } else {
        showToast('Inserisci un nome valido', 'error');
      }
    });
  }

  // Existing users list
  renderUserList();

  function showLogin() {
    if (loginCard) loginCard.style.display = '';
    if (welcomeCard) welcomeCard.style.display = 'none';
  }

  function showWelcome(user) {
    if (loginCard) loginCard.style.display = 'none';
    if (welcomeCard) {
      welcomeCard.style.display = '';
      const nameEl = document.getElementById('welcome-name');
      if (nameEl) nameEl.textContent = user;
      const chars = Storage.getCharacters(user);
      const countEl = document.getElementById('char-count');
      if (countEl) countEl.textContent = chars.length;
    }
  }

  function renderUserList() {
    const ul = document.getElementById('users-list');
    if (!ul) return;
    const users = Storage.getUsers();
    if (users.length === 0) {
      ul.style.display = 'none';
      return;
    }
    ul.innerHTML = '';
    users.forEach(u => {
      const chip = document.createElement('div');
      chip.className = 'user-chip';
      chip.innerHTML = `<span class="user-chip-icon">⚔</span> ${u}`;
      chip.addEventListener('click', () => {
        Storage.setCurrentUser(u);
        showWelcome(u);
      });
      ul.appendChild(chip);
    });
  }

  // Logout / Cambia giocatore
  const logoutBtns = document.querySelectorAll('.btn-logout');
  logoutBtns.forEach(b => b.addEventListener('click', () => {
    Storage.logout();
    showLogin();
    renderUserList();
  }));

  // Rinomina profilo
  const renameBtn = document.getElementById('rename-player-btn');
  if (renameBtn) {
    renameBtn.addEventListener('click', () => {
      const cur = Storage.getCurrentUser();
      if (!cur) return;
      const newName = prompt('Nuovo nome del profilo:', cur);
      if (newName === null) return;
      const result = Storage.renameUser(cur, newName);
      if (result === 'EXISTS') {
        showToast('Esiste già un profilo con questo nome', 'error');
      } else if (result) {
        showWelcome(result);
        renderUserList();
        showToast('Profilo rinominato ✦');
      } else {
        showToast('Nome non valido', 'error');
      }
    });
  }

  // Elimina profilo
  const deleteBtn = document.getElementById('delete-player-btn');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      const cur = Storage.getCurrentUser();
      if (!cur) return;
      const count = Storage.getCharacters(cur).length;
      const msg = count > 0
        ? `Eliminare il profilo "${cur}" e i suoi ${count} personaggi? L'azione è irreversibile.`
        : `Eliminare il profilo "${cur}"?`;
      if (!confirm(msg)) return;
      Storage.deleteUser(cur);
      showLogin();
      renderUserList();
      showToast('Profilo eliminato');
    });
  }
}

// =============================================
// CHARACTERS LIST PAGE
// =============================================

function initCharsPage() {
  initParticles('particles-canvas');

  const user = Storage.getCurrentUser();
  if (!user) { window.location.href = 'index.html'; return; }

  const usernameEl = document.getElementById('nav-username');
  if (usernameEl) usernameEl.textContent = user;

  renderChars();

  document.querySelectorAll('.btn-logout').forEach(b => b.addEventListener('click', () => {
    Storage.logout();
    window.location.href = 'index.html';
  }));

  function renderChars() {
    const grid = document.getElementById('chars-grid');
    if (!grid) return;
    const chars = Storage.getCharacters(user);

    grid.innerHTML = '';

    // New character card
    const newCard = document.createElement('div');
    newCard.className = 'char-card char-card-new';
    newCard.innerHTML = `
      <div class="char-card-new-icon">✦</div>
      <div style="font-family:var(--font-h);font-size:0.85rem;color:var(--text-dim);letter-spacing:0.1em">CREA PERSONAGGIO</div>
    `;
    newCard.addEventListener('click', () => window.location.href = 'create.html');
    grid.appendChild(newCard);

    chars.forEach(char => {
      const card = buildCharCard(char);
      grid.appendChild(card);
    });
  }

  function buildCharCard(char) {
    const theme = getClassTheme(char.identity.class);
    const card = document.createElement('div');
    card.className = `char-card animate-in motion-${theme.motion}`;
    card.style.setProperty('--cc', theme.color);
    card.style.setProperty('--ccglow', theme.glow);

    const imgHtml = char.appearance?.image
      ? `<img src="${char.appearance.image}" alt="${char.identity.name}">`
      : `<div class="char-card-placeholder">${getClassIcon(char.identity.class)}</div>`;

    const level = char.identity.level || 1;
    const className = char.identity.class || '—';
    const raceName = char.identity.race || '—';

    // Particelle decorative CSS, colorate in base alla classe
    const particles = char.identity.class
      ? `<div class="card-particles">${'<span></span>'.repeat(7)}</div>`
      : '';

    card.innerHTML = `
      <div class="char-card-image">
        ${imgHtml}
        ${particles}
        <div class="char-card-level-badge">Lv ${level}</div>
        ${char.identity.class ? `<div class="char-card-class-tag">${theme.label}</div>` : ''}
      </div>
      <div class="char-card-body">
        <div class="char-card-name">${char.identity.name || 'Senza Nome'}</div>
        <div class="char-card-class">${className} · ${raceName}</div>
        <div class="char-card-meta">
          ${char.identity.background ? `<span class="meta-tag">${char.identity.background}</span>` : ''}
          ${char.identity.alignment ? `<span class="meta-tag">${char.identity.alignment}</span>` : ''}
        </div>
      </div>
      <div class="char-card-actions">
        <button class="btn btn-secondary btn-sm" onclick="editChar('${char.id}')">Modifica</button>
        <button class="btn btn-secondary btn-sm" onclick="viewChar('${char.id}')">Visualizza</button>
        <button class="btn btn-danger btn-sm" onclick="deleteChar('${char.id}',this)">✕</button>
      </div>
    `;
    return card;
  }

  window.editChar = (id) => window.location.href = `create.html?id=${id}`;
  window.viewChar = (id) => window.location.href = `view.html?id=${id}`;
  window.deleteChar = (id, btn) => {
    if (!confirm('Eliminare questo personaggio?')) return;
    Storage.deleteCharacter(id);
    btn.closest('.char-card').remove();
    showToast('Personaggio eliminato');
  };
}

function getClassIcon(cls) {
  const icons = {
    'Barbaro': '⚔', 'Bardo': '🎵', 'Chierico': '✝', 'Druido': '🌿',
    'Guerriero': '🛡', 'Monaco': '👊', 'Paladino': '⚜', 'Ranger': '🏹',
    'Ladro': '🗡', 'Stregone': '💫', 'Warlock': '👁', 'Mago': '📚',
    'Artificiere': '⚙'
  };
  return icons[cls] || '⚔';
}

// =============================================
// CREATE PAGE — COMPASS UI
// =============================================

function initCreatePage() {
  const user = Storage.getCurrentUser();
  if (!user) { window.location.href = 'index.html'; return; }

  const usernameEl = document.getElementById('nav-username');
  if (usernameEl) usernameEl.textContent = user;

  document.querySelectorAll('.btn-logout').forEach(b => b.addEventListener('click', () => {
    Storage.logout(); window.location.href = 'index.html';
  }));

  // Load existing or new character
  const charId = getParam('id');
  let character = charId ? Storage.getCharacter(charId, user) : null;
  if (!character) character = Storage.newCharacter();

  // Particelle tematiche in base alla classe del personaggio
  const particleCtrl = initParticles('particles-canvas', getClassTheme(character.identity.class));

  // Applica il tema-classe alla pagina (bussola, particelle, accenti)
  function applyCreateTheme() {
    const theme = getClassTheme(character.identity.class);
    applyClassTheme(theme);
    particleCtrl.setTheme(theme);
  }
  applyCreateTheme();

  // Section definitions
  const SECTIONS = [
    { key: 'identity',   icon: '⚜',  label: 'Identità',       step: 1 },
    { key: 'abilities',  icon: '💪',  label: 'Caratteristiche', step: 2 },
    { key: 'skills',     icon: '🎯',  label: 'Abilità',         step: 3 },
    { key: 'combat',     icon: '⚔',   label: 'Combattimento',   step: 4 },
    { key: 'equipment',  icon: '🎒',  label: 'Equipaggiamento', step: 5 },
    { key: 'spells',     icon: '✨',  label: 'Magie',           step: 6 },
    { key: 'story',      icon: '📖',  label: 'Storia',          step: 7 },
    { key: 'appearance', icon: '🖼',  label: 'Aspetto',         step: 8 }
  ];

  // Declare currentSection BEFORE buildCompass — it's used inside updateSectionStates
  let currentSection = null;

  function loadCompletedSections() {
    if (character.identity.name) return ['identity'];
    return [];
  }

  // Build the compass using % positions — no dependency on offsetWidth
  function buildCompass(sections) {
    const container = document.getElementById('compass-container');
    if (!container) return;

    // Remove any previously injected nodes (safe re-build)
    container.querySelectorAll('.compass-section, .compass-line').forEach(el => el.remove());

    const N = sections.length;
    const R = 37;        // radius as % of container width
    const nodeW = 14;    // node size as %

    sections.forEach((sec, i) => {
      const angle = (i * (360 / N) - 90) * Math.PI / 180;
      const x = 50 + R * Math.cos(angle);   // % from left
      const y = 50 + R * Math.sin(angle);   // % from top

      // Connector line (decorative, purely CSS calc)
      const line = document.createElement('div');
      line.className = 'compass-line';
      line.style.cssText = `
        width: ${R - nodeW}%;
        left: 50%;
        top: 50%;
        transform-origin: 0 50%;
        transform: rotate(${Math.atan2(y - 50, x - 50) * 180 / Math.PI}deg);
      `;
      container.appendChild(line);

      // Section node
      const node = document.createElement('div');
      node.className = 'compass-section';
      node.id = `section-${sec.key}`;
      node.dataset.key = sec.key;
      node.style.cssText = `
        left: calc(${x}% - ${nodeW / 2}%);
        top: calc(${y}% - ${nodeW / 2}%);
        width: ${nodeW}%;
        height: ${nodeW}%;
      `;
      node.innerHTML = `
        <span class="compass-section-icon">${sec.icon}</span>
        <span class="compass-section-label">${sec.label}</span>
      `;

      node.addEventListener('click', (e) => {
        e.stopPropagation();
        openSection(sec.key);
      });
      container.appendChild(node);
    });

    updateSectionStates();
  }

  buildCompass(SECTIONS);
  updateCompassCenter();

  function updateSectionStates() {
    SECTIONS.forEach(sec => {
      const node = document.getElementById(`section-${sec.key}`);
      if (!node) return;
      node.classList.remove('active', 'completed');
      if (currentSection === sec.key) node.classList.add('active');
      else if (isSectionComplete(sec.key)) node.classList.add('completed');
    });
  }

  function isSectionComplete(key) {
    switch (key) {
      case 'identity':   return !!character.identity.name && !!character.identity.race && !!character.identity.class;
      case 'abilities':  return Object.values(character.abilities).some(v => v !== 10);
      case 'skills':     return character.skill_proficiencies.length > 0;
      case 'combat':     return character.combat.max_hp > 0;
      case 'equipment':  return character.equipment.items.length > 0;
      case 'spells':     return !Calc.isSpellcaster(character) || character.spells.known.length > 0 || character.spells.prepared.length > 0;
      case 'story':      return !!character.story.backstory || !!character.story.traits;
      case 'appearance': return !!character.appearance.description || !!character.appearance.image;
      default:           return false;
    }
  }

  function updateCompassCenter() {
    const iconEl = document.getElementById('center-icon');
    const nameEl = document.getElementById('center-name');
    const infoEl = document.getElementById('center-info');
    const stepEl = document.getElementById('center-step');
    if (iconEl) iconEl.textContent = character.identity.class ? getClassIcon(character.identity.class) : '⚔';
    if (nameEl) nameEl.textContent = character.identity.name || 'Il tuo eroe';
    if (infoEl) {
      const parts = [character.identity.class, character.identity.race].filter(Boolean);
      infoEl.textContent = parts.length ? parts.join(' · ') : 'Clicca una sezione';
    }
    if (stepEl) {
      const done = SECTIONS.filter(s => isSectionComplete(s.key)).length;
      stepEl.textContent = `${done} / ${SECTIONS.length} sezioni`;
    }
  }

  // ---- OPEN SECTION PANEL ----
  function openSection(key) {
    try {
      currentSection = key;
      const overlay = document.getElementById('section-overlay');
      const panel   = document.getElementById('section-panel');
      const sec     = SECTIONS.find(s => s.key === key);

      if (!overlay || !panel || !sec) {
        showToast('Errore: elementi UI non trovati', 'error');
        return;
      }

      const iconEl  = document.getElementById('panel-icon');
      const titleEl = document.getElementById('panel-title');
      const bodyEl  = document.getElementById('panel-body');

      if (iconEl)  iconEl.textContent  = sec.icon;
      if (titleEl) titleEl.textContent = sec.label;
      if (bodyEl)  bodyEl.innerHTML    = '';

      overlay.classList.add('open');
      panel.classList.add('open');

      updateSectionStates();

      if (bodyEl) renderSectionContent(key, bodyEl);
    } catch (err) {
      showToast('Errore apertura sezione', 'error');
      console.error('[openSection]', err);
    }
  }

  function closeSection() {
    currentSection = null;
    document.getElementById('section-overlay').classList.remove('open');
    document.getElementById('section-panel').classList.remove('open');
    updateSectionStates();
    updateCompassCenter();
    autoSave();
  }

  document.getElementById('panel-close')?.addEventListener('click', closeSection);
  document.getElementById('section-overlay')?.addEventListener('click', closeSection);

  // ---- AUTO SAVE ----
  let saveTimer;
  function autoSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      Calc.autoCalculate(character);
      Storage.saveCharacter(character, user);
      showToast('Salvato ✦', 'success');
    }, 600);
  }

  // =============================================
  // SECTION RENDERERS
  // =============================================

  function renderSectionContent(key, container) {
    switch (key) {
      case 'identity':   renderIdentity(container); break;
      case 'abilities':  renderAbilities(container); break;
      case 'skills':     renderSkills(container); break;
      case 'combat':     renderCombat(container); break;
      case 'equipment':  renderEquipment(container); break;
      case 'spells':     renderSpells(container); break;
      case 'story':      renderStory(container); break;
      case 'appearance': renderAppearance(container); break;
    }
  }

  // ---- IDENTITY ----
  function renderIdentity(c) {
    c.innerHTML = `
      <div class="form-group">
        <label>Nome del Personaggio</label>
        <input type="text" id="f-name" value="${character.identity.name}" placeholder="Es. Aldric Forgescudo..." maxlength="60">
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem">
        <div class="form-group">
          <label>Livello</label>
          <input type="number" id="f-level" value="${character.identity.level}" min="1" max="20">
        </div>
        <div class="form-group">
          <label>Esperienza (XP)</label>
          <input type="number" id="f-xp" value="${character.identity.xp || 0}" min="0">
        </div>
      </div>

      <div class="deco-divider">Razza</div>
      <div id="race-picker" class="picker-grid"></div>
      <div id="subrace-wrap" style="display:none;margin-top:0.8rem">
        <label>Sotto-razza</label>
        <div id="subrace-picker" class="picker-grid"></div>
      </div>

      <div class="deco-divider">Classe</div>
      <div id="class-picker" class="picker-grid"></div>
      <div id="subclass-wrap" style="display:none;margin-top:0.8rem">
        <label>Archetipo / Sottoclasse (livello 3+)</label>
        <div id="subclass-picker" class="picker-grid"></div>
      </div>

      <div class="deco-divider">Background & Allineamento</div>
      <div class="form-group">
        <label>Background</label>
        <div id="bg-picker" class="picker-grid"></div>
      </div>
      <div class="form-group">
        <label>Allineamento</label>
        <select id="f-alignment">
          <option value="">— Scegli —</option>
          ${DND.ALIGNMENTS.map(a => `<option value="${a}" ${character.identity.alignment === a ? 'selected' : ''}>${a}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Divinità (opzionale)</label>
        <input type="text" id="f-deity" value="${character.identity.deity || ''}" placeholder="Es. Pelor, Vecna...">
      </div>
    `;

    buildRacePicker();
    buildClassPicker();
    buildBgPicker();

    c.querySelectorAll('#f-name,#f-level,#f-xp,#f-alignment,#f-deity').forEach(el => {
      el.addEventListener('change', () => {
        const k = el.id.replace('f-', '');
        if (k === 'level') character.identity.level = parseInt(el.value) || 1;
        else if (k === 'xp') character.identity.xp = parseInt(el.value) || 0;
        else character.identity[k] = el.value;
        autoSave();
      });
    });
  }

  const RACE_ICONS = {
    'Umano': '👤', 'Umano (Variante)': '👤', 'Elfo': '🌟', 'Nano': '⛏',
    'Halfling': '🍀', 'Gnomo': '🔧', 'Mezzelfo': '✨', 'Mezzorco': '💢',
    'Tiefling': '🔥', 'Dragonide': '🐉', 'Aarakocra': '🦅', 'Aasimar': '☀',
    'Tabaxi': '🐱'
  };
  const CLASS_ICONS = {
    'Barbaro': '⚔', 'Bardo': '🎵', 'Chierico': '✝', 'Druido': '🌿',
    'Guerriero': '🛡', 'Monaco': '👊', 'Paladino': '⚜', 'Ranger': '🏹',
    'Ladro': '🗡', 'Stregone': '💫', 'Warlock': '👁', 'Mago': '📚',
    'Artificiere': '⚙'
  };
  const BG_ICONS = {
    'Accolito': '🕊', 'Impostore': '🎭', 'Criminale': '🗡', 'Intrattenitore': '🎶',
    'Eroe del Popolo': '🌾', 'Artigiano della Gilda': '🔨', 'Eremita': '📿',
    'Nobile': '👑', 'Fuoristrada': '🏕', 'Saggio': '📚', 'Marinaio': '⚓',
    'Soldato': '⚔', 'Monello': '🏚'
  };

  function buildRacePicker() {
    const p = document.getElementById('race-picker');
    if (!p) return;
    Object.entries(DND.RACES).forEach(([name, data]) => {
      const item = document.createElement('div');
      item.className = `picker-item${character.identity.race === name ? ' selected' : ''}`;
      item.innerHTML = `
        <div class="picker-item-icon">${RACE_ICONS[name] || '👤'}</div>
        <div class="picker-item-name">${name}</div>
        <div class="picker-item-desc">${data.description.substring(0, 60)}...</div>
      `;
      item.addEventListener('click', () => {
        character.identity.race = name;
        character.identity.subrace = '';
        p.querySelectorAll('.picker-item').forEach(x => x.classList.remove('selected'));
        item.classList.add('selected');
        if (data.subraces) {
          buildSubracePicker(name, data.subraces);
          document.getElementById('subrace-wrap').style.display = '';
        } else {
          document.getElementById('subrace-wrap').style.display = 'none';
        }
        autoSave();
      });
      p.appendChild(item);
    });
  }

  function buildSubracePicker(raceName, subraces) {
    const p = document.getElementById('subrace-picker');
    if (!p) return;
    p.innerHTML = '';
    Object.entries(subraces).forEach(([name, data]) => {
      const item = document.createElement('div');
      item.className = `picker-item${character.identity.subrace === name ? ' selected' : ''}`;
      item.innerHTML = `
        <div class="picker-item-name">${name}</div>
        <div class="picker-item-desc">${data.traits[0] || ''}</div>
      `;
      item.addEventListener('click', () => {
        character.identity.subrace = name;
        p.querySelectorAll('.picker-item').forEach(x => x.classList.remove('selected'));
        item.classList.add('selected');
        autoSave();
      });
      p.appendChild(item);
    });
  }

  function buildClassPicker() {
    const p = document.getElementById('class-picker');
    if (!p) return;
    Object.entries(DND.CLASSES).forEach(([name, data]) => {
      const item = document.createElement('div');
      item.className = `picker-item${character.identity.class === name ? ' selected' : ''}`;
      item.innerHTML = `
        <div class="picker-item-icon">${CLASS_ICONS[name] || '⚔'}</div>
        <div class="picker-item-name">${name}</div>
        <div class="picker-item-desc">d${data.hit_die} · ${data.primary_ability.map(a => DND.ABILITY_NAMES[a]).join('/')}</div>
      `;
      item.addEventListener('click', () => {
        character.identity.class = name;
        character.identity.subclass = '';
        character.saving_throw_proficiencies = [...data.saving_throws];
        p.querySelectorAll('.picker-item').forEach(x => x.classList.remove('selected'));
        item.classList.add('selected');
        if (character.identity.level >= 3 && data.subclasses) {
          buildSubclassPicker(data.subclasses);
          document.getElementById('subclass-wrap').style.display = '';
        } else {
          document.getElementById('subclass-wrap').style.display = 'none';
        }
        Calc.autoCalculate(character);
        applyCreateTheme();
        updateCompassCenter();
        autoSave();
        showToast(`Classe: ${name} — ${getClassTheme(name).essence}`);
      });
      p.appendChild(item);
    });

    if (character.identity.class && character.identity.level >= 3) {
      const cls = DND.CLASSES[character.identity.class];
      if (cls?.subclasses) {
        buildSubclassPicker(cls.subclasses);
        document.getElementById('subclass-wrap').style.display = '';
      }
    }
    if (character.identity.race && DND.RACES[character.identity.race]?.subraces) {
      buildSubracePicker(character.identity.race, DND.RACES[character.identity.race].subraces);
      document.getElementById('subrace-wrap').style.display = '';
    }
  }

  function buildSubclassPicker(subclassData) {
    const p = document.getElementById('subclass-picker');
    if (!p) return;
    p.innerHTML = '';
    subclassData.choices.forEach(name => {
      const item = document.createElement('div');
      item.className = `picker-item${character.identity.subclass === name ? ' selected' : ''}`;
      item.innerHTML = `<div class="picker-item-name">${name}</div>`;
      item.addEventListener('click', () => {
        character.identity.subclass = name;
        p.querySelectorAll('.picker-item').forEach(x => x.classList.remove('selected'));
        item.classList.add('selected');
        autoSave();
      });
      p.appendChild(item);
    });
  }

  function buildBgPicker() {
    const p = document.getElementById('bg-picker');
    if (!p) return;
    Object.entries(DND.BACKGROUNDS).forEach(([name, data]) => {
      const item = document.createElement('div');
      item.className = `picker-item${character.identity.background === name ? ' selected' : ''}`;
      item.innerHTML = `
        <div class="picker-item-icon">${BG_ICONS[name] || '📜'}</div>
        <div class="picker-item-name">${name}</div>
        <div class="picker-item-desc">${data.skill_proficiencies.join(', ')}</div>
      `;
      item.addEventListener('click', () => {
        character.identity.background = name;
        // Add background skill proficiencies
        data.skill_proficiencies.forEach(skill => {
          if (!character.skill_proficiencies.includes(skill)) {
            character.skill_proficiencies.push(skill);
          }
        });
        p.querySelectorAll('.picker-item').forEach(x => x.classList.remove('selected'));
        item.classList.add('selected');
        autoSave();
      });
      p.appendChild(item);
    });
  }

  // ---- ABILITIES ----
  function renderAbilities(c) {
    const raceBonuses = Calc.getRacialBonuses(character.identity.race, character.identity.subrace);
    const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    const pointBuyCosts = DND.POINT_BUY_COSTS;

    let method = character._abilityMethod || 'manual';

    c.innerHTML = `
      <div style="display:flex;gap:0.5rem;margin-bottom:1.2rem;flex-wrap:wrap">
        <button class="btn btn-sm ${method==='manual'?'btn-primary':'btn-secondary'}" data-method="manual">Manuale</button>
        <button class="btn btn-sm ${method==='pointbuy'?'btn-primary':'btn-secondary'}" data-method="pointbuy">Point Buy (27pt)</button>
        <button class="btn btn-sm ${method==='standard'?'btn-primary':'btn-secondary'}" data-method="standard">Array Standard</button>
      </div>
      <div id="method-info"></div>
      <div class="ability-grid" id="ability-grid"></div>
      <div style="margin-top:1rem;padding:0.8rem;background:var(--bg2);border-radius:var(--r);font-size:0.8rem;color:var(--text-dim)">
        ${raceBonuses && Object.keys(raceBonuses).length ?
          `<strong style="color:var(--gold)">Bonus Razziali:</strong> ${
            Object.entries(raceBonuses)
              .filter(([k]) => k !== 'two_of_choice')
              .map(([k,v]) => `${DND.ABILITY_NAMES[k]} +${v}`)
              .join(', ') || '—'
          }` : '<em>Seleziona una razza per vedere i bonus razziali</em>'}
      </div>
    `;

    c.querySelectorAll('[data-method]').forEach(btn => {
      btn.addEventListener('click', () => {
        method = btn.dataset.method;
        character._abilityMethod = method;
        if (method === 'standard') {
          const arr = [...DND.STANDARD_ARRAY];
          abilities.forEach((ab, i) => character.abilities[ab] = arr[i]);
        }
        renderAbilityGrid();
        c.querySelectorAll('[data-method]').forEach(b => {
          b.className = `btn btn-sm ${b.dataset.method === method ? 'btn-primary' : 'btn-secondary'}`;
        });
      });
    });

    function renderAbilityGrid() {
      const grid = document.getElementById('ability-grid');
      if (!grid) return;
      const pointsLeft = 27 - Calc.getPointBuyCost(character.abilities);

      const infoEl = document.getElementById('method-info');
      if (method === 'pointbuy' && infoEl) {
        infoEl.innerHTML = `
          <div class="point-buy-total">Punti rimasti: <span style="color:${pointsLeft<0?'var(--red2)':'var(--gold)'}">${pointsLeft}</span> / 27</div>
        `;
      } else if (method === 'standard' && infoEl) {
        infoEl.innerHTML = `<div class="section-hint">Array standard: 15, 14, 13, 12, 10, 8 assegnati in ordine.</div>`;
      } else if (infoEl) {
        infoEl.innerHTML = '';
      }

      grid.innerHTML = '';
      abilities.forEach(ab => {
        const base = character.abilities[ab];
        const bonus = raceBonuses[ab] || 0;
        const total = base + bonus;
        const mod = Calc.modifier(total);

        const box = document.createElement('div');
        box.className = 'ability-box';
        box.innerHTML = `
          <div class="ability-box-name">${DND.ABILITY_NAMES[ab]}</div>
          ${bonus ? `<div class="ability-box-racial">+${bonus} razza</div>` : ''}
          <div class="score-control">
            ${method === 'pointbuy' ? `<button class="score-btn" data-ab="${ab}" data-d="-1">−</button>` : ''}
            <input class="ability-input" type="number" value="${base}" min="3" max="20" data-ab="${ab}" ${method==='standard'?'readonly':''}>
            ${method === 'pointbuy' ? `<button class="score-btn" data-ab="${ab}" data-d="1">+</button>` : ''}
          </div>
          ${bonus ? `<div style="font-size:0.7rem;color:var(--text-dim);margin:2px 0">(totale: ${total})</div>` : ''}
          <div class="ability-box-modifier">${Calc.modStr(total)}</div>
        `;

        box.querySelectorAll('input').forEach(inp => {
          inp.addEventListener('change', () => {
            const val = parseInt(inp.value) || 10;
            character.abilities[ab] = Math.max(3, Math.min(20, val));
            renderAbilityGrid();
            autoSave();
          });
        });

        box.querySelectorAll('.score-btn').forEach(btn => {
          const delta = parseInt(btn.dataset.d);
          btn.addEventListener('click', () => {
            const newVal = character.abilities[ab] + delta;
            if (newVal < 8 || newVal > 15) return;
            const newCost = Calc.getPointBuyCost({ ...character.abilities, [ab]: newVal });
            if (delta > 0 && newCost > 27) return;
            character.abilities[ab] = newVal;
            renderAbilityGrid();
            autoSave();
          });
        });

        grid.appendChild(box);
      });
    }

    renderAbilityGrid();
  }

  // ---- SKILLS ----
  function renderSkills(c) {
    const cls = DND.CLASSES[character.identity.class];
    const maxChoices = cls?.skill_choices?.count || 2;
    const available = cls?.skill_choices?.from === 'any'
      ? DND.SKILLS.map(s => s.name)
      : (cls?.skill_choices?.from || []);

    const bgSkills = character.identity.background
      ? (DND.BACKGROUNDS[character.identity.background]?.skill_proficiencies || [])
      : [];

    c.innerHTML = `
      <div style="font-size:0.85rem;color:var(--text-dim);margin-bottom:1rem">
        Puoi scegliere <strong style="color:var(--gold)">${maxChoices}</strong> competenze dalla tua classe.
        Il background aggiunge: <strong style="color:var(--gold)">${bgSkills.join(', ') || '—'}</strong>
      </div>
      <div id="class-skill-picks" style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);padding:0.8rem;margin-bottom:1rem">
        <div style="font-family:var(--font-h);font-size:0.75rem;color:var(--text2);margin-bottom:0.6rem;letter-spacing:0.1em">
          SCEGLI LE COMPETENZE DI CLASSE
        </div>
        <div id="class-skill-grid" class="picker-grid" style="grid-template-columns:repeat(auto-fill,minmax(130px,1fr))"></div>
      </div>
      <div class="skills-list" id="all-skills-list"></div>
    `;

    const classPickedSkills = character.skill_proficiencies.filter(s =>
      !bgSkills.includes(s) && available.includes(s)
    );

    function renderClassSkillPicks() {
      const grid = document.getElementById('class-skill-grid');
      if (!grid) return;
      grid.innerHTML = '';
      available.forEach(skillName => {
        const isPicked = classPickedSkills.includes(skillName);
        const item = document.createElement('div');
        item.className = `picker-item${isPicked ? ' selected' : ''}`;
        item.style.cssText = 'padding:0.5rem;text-align:center';
        item.innerHTML = `<div class="picker-item-name" style="font-size:0.75rem">${skillName}</div>`;
        item.addEventListener('click', () => {
          if (isPicked) {
            const idx = classPickedSkills.indexOf(skillName);
            classPickedSkills.splice(idx, 1);
            character.skill_proficiencies = character.skill_proficiencies.filter(s => s !== skillName || bgSkills.includes(s));
          } else {
            if (classPickedSkills.length >= maxChoices) {
              showToast(`Puoi scegliere solo ${maxChoices} competenze`, 'error');
              return;
            }
            classPickedSkills.push(skillName);
            if (!character.skill_proficiencies.includes(skillName)) {
              character.skill_proficiencies.push(skillName);
            }
          }
          renderClassSkillPicks();
          renderAllSkills();
          autoSave();
        });
        grid.appendChild(item);
      });
    }

    function renderAllSkills() {
      const list = document.getElementById('all-skills-list');
      if (!list) return;
      list.innerHTML = '';
      DND.SKILLS.forEach(skill => {
        const isProficient = character.skill_proficiencies.includes(skill.name);
        const isExpertise = character.skills?.[skill.name] === 'expertise';
        const bonus = Calc.skillBonus(character, skill.name);

        const row = document.createElement('div');
        row.className = `skill-row${isProficient ? (isExpertise ? ' expertise' : ' proficient') : ''}`;
        row.innerHTML = `
          <div class="skill-check" title="${isProficient ? (isExpertise ? 'Doppia competenza — clicca per rimuovere' : 'Competente — clicca per doppia') : 'Non competente — clicca per aggiungere'}">${isExpertise ? '◆' : (isProficient ? '✓' : '')}</div>
          <span class="skill-ability">${skill.ability.toUpperCase()}</span>
          <span class="skill-name">${skill.name}</span>
          <span class="skill-bonus">${bonus >= 0 ? '+' : ''}${bonus}</span>
        `;

        row.querySelector('.skill-check').addEventListener('click', () => {
          if (!isProficient) {
            character.skill_proficiencies.push(skill.name);
          } else if (!isExpertise) {
            if (!character.skills) character.skills = {};
            character.skills[skill.name] = 'expertise';
          } else {
            character.skill_proficiencies = character.skill_proficiencies.filter(s => s !== skill.name);
            if (character.skills) delete character.skills[skill.name];
          }
          renderClassSkillPicks();
          renderAllSkills();
          autoSave();
        });
        list.appendChild(row);
      });
    }

    renderClassSkillPicks();
    renderAllSkills();
  }

  // ---- COMBAT ----
  function renderCombat(c) {
    Calc.autoCalculate(character);
    const maxHP = Calc.maxHP(character);
    const ac = Calc.ac(character);
    const init = Calc.initiative(character);
    const pb = Calc.proficiencyBonus(character.identity.level);

    if (!character.combat.max_hp) {
      character.combat.max_hp = maxHP;
      character.combat.current_hp = maxHP;
    }

    c.innerHTML = `
      <div class="combat-stats-grid">
        <div class="stat-box">
          <div class="stat-box-value">${ac}</div>
          <span class="stat-box-label">Classe Armatura</span>
        </div>
        <div class="stat-box">
          <div class="stat-box-value">${init >= 0 ? '+' : ''}${init}</div>
          <span class="stat-box-label">Iniziativa</span>
        </div>
        <div class="stat-box">
          <div class="stat-box-value">${character.combat.speed || 30}</div>
          <span class="stat-box-label">Velocità (ft)</span>
        </div>
        <div class="stat-box">
          <div class="stat-box-value">+${pb}</div>
          <span class="stat-box-label">Bonus Competenza</span>
        </div>
        <div class="stat-box">
          <div class="stat-box-value">${Calc.passivePerception(character)}</div>
          <span class="stat-box-label">Percezione Passiva</span>
        </div>
        <div class="stat-box">
          <div class="stat-box-value">d${Calc.getHitDie(character.identity.class) || '?'}</div>
          <span class="stat-box-label">Dado Vita</span>
        </div>
      </div>

      <div class="hp-tracker">
        <span class="hp-label">PF</span>
        <input type="number" style="width:60px;text-align:center;font-family:var(--font-h);font-size:1.3rem;color:var(--red2);background:transparent;border:none;outline:none"
          id="f-current-hp" value="${character.combat.current_hp || maxHP}" min="0">
        <span class="hp-max"> / ${character.combat.max_hp || maxHP}</span>
        <div class="hp-bar-wrap">
          <div class="hp-bar" id="hp-bar" style="width:${Math.min(100, ((character.combat.current_hp || maxHP) / (character.combat.max_hp || maxHP)) * 100)}%"></div>
        </div>
        <input type="number" style="width:60px;text-align:center;font-family:var(--font-h);color:var(--blue2);background:transparent;border:none;outline:none"
          id="f-max-hp" value="${character.combat.max_hp || maxHP}" min="1" title="PF Massimi">
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem;margin-bottom:1rem">
        <div class="form-group">
          <label>Tipo Armatura</label>
          <select id="f-armor">
            <option value="">Senza Armatura</option>
            ${Object.entries(DND.ARMOR).flatMap(([cat, list]) =>
              list.map(a => `<option value="${a.name}" ${character.combat.armor_type === a.name ? 'selected' : ''}>${a.name} (CA ${a.ac})</option>`)
            ).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Scudo</label>
          <select id="f-shield">
            <option value="0" ${!character.combat.shield ? 'selected' : ''}>No</option>
            <option value="1" ${character.combat.shield ? 'selected' : ''}>Sì (+2 CA)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Velocità Personalizzata (ft)</label>
          <input type="number" id="f-speed" value="${character.combat.speed || 30}" min="0" max="120">
        </div>
        <div class="form-group">
          <label>Bonus Iniziativa Aggiuntivo</label>
          <input type="number" id="f-init-bonus" value="${character.combat.initiative_bonus || 0}">
        </div>
      </div>

      <div class="deco-divider">Tiri Salvezza</div>
      <div class="saves-grid">
        ${Object.entries(DND.ABILITY_NAMES).map(([ab, name]) => {
          const prof = character.saving_throw_proficiencies.includes(ab);
          const bonus = Calc.savingThrow(character, ab);
          return `
            <div class="save-row${prof ? ' proficient' : ''}" data-ab="${ab}" style="cursor:pointer" title="Clicca per aggiungere/rimuovere competenza">
              <div class="save-dot"></div>
              <span style="min-width:90px">${name}</span>
              <span style="font-family:var(--font-h);color:var(--gold);margin-left:auto">${bonus >= 0 ? '+' : ''}${bonus}</span>
            </div>
          `;
        }).join('')}
      </div>

      <div class="deco-divider">Attacchi & Armi</div>
      <div class="section-hint">Tocca <strong>📖 Regole</strong> su un'arma per vedere come usarla in battaglia secondo il regolamento D&D.</div>
      <div id="attacks-list"></div>
      <div style="margin-top:0.8rem;display:flex;gap:0.5rem;flex-wrap:wrap">
        <select id="weapon-pick" style="flex:1;min-width:140px">
          <option value="">— Scegli un'arma —</option>
          <optgroup label="Armi Semplici da Mischia">
            ${DND.WEAPONS.simple_melee.map(w => `<option value="${w.name}">${w.name} (${w.damage} ${w.type})</option>`).join('')}
          </optgroup>
          <optgroup label="Armi Semplici a Distanza">
            ${DND.WEAPONS.simple_ranged.map(w => `<option value="${w.name}">${w.name} (${w.damage} ${w.type})</option>`).join('')}
          </optgroup>
          <optgroup label="Armi da Guerra da Mischia">
            ${DND.WEAPONS.martial_melee.map(w => `<option value="${w.name}">${w.name} (${w.damage} ${w.type})</option>`).join('')}
          </optgroup>
          <optgroup label="Armi da Guerra a Distanza">
            ${DND.WEAPONS.martial_ranged.map(w => `<option value="${w.name}">${w.name} (${w.damage} ${w.type})</option>`).join('')}
          </optgroup>
        </select>
        <button class="btn btn-secondary btn-sm" id="add-weapon-btn">+ Arma</button>
        <button class="btn btn-secondary btn-sm" id="add-custom-attack-btn">+ Personalizzato</button>
      </div>
    `;

    renderAttacks();

    document.getElementById('f-current-hp')?.addEventListener('change', e => {
      character.combat.current_hp = parseInt(e.target.value) || 0;
      const maxHPVal = character.combat.max_hp || maxHP;
      const pct = Math.min(100, Math.max(0, (character.combat.current_hp / maxHPVal) * 100));
      document.getElementById('hp-bar').style.width = pct + '%';
      autoSave();
    });

    document.getElementById('f-max-hp')?.addEventListener('change', e => {
      character.combat.max_hp = parseInt(e.target.value) || 1;
      autoSave();
    });

    document.getElementById('f-armor')?.addEventListener('change', e => {
      character.combat.armor_type = e.target.value;
      const found = Calc.findArmor(e.target.value);
      if (found) character.combat.armor_ac = found.ac;
      character.combat.ac_calculated = Calc.ac(character);
      autoSave();
    });

    document.getElementById('f-shield')?.addEventListener('change', e => {
      character.combat.shield = e.target.value === '1';
      autoSave();
    });

    document.getElementById('f-speed')?.addEventListener('change', e => {
      character.combat.speed = parseInt(e.target.value) || 30;
      autoSave();
    });

    document.getElementById('f-init-bonus')?.addEventListener('change', e => {
      character.combat.initiative_bonus = parseInt(e.target.value) || 0;
      autoSave();
    });

    c.querySelectorAll('.save-row').forEach(row => {
      row.addEventListener('click', () => {
        const ab = row.dataset.ab;
        const idx = character.saving_throw_proficiencies.indexOf(ab);
        if (idx >= 0) character.saving_throw_proficiencies.splice(idx, 1);
        else character.saving_throw_proficiencies.push(ab);
        row.classList.toggle('proficient');
        const bonus = Calc.savingThrow(character, ab);
        row.querySelector('span:last-child').textContent = (bonus >= 0 ? '+' : '') + bonus;
        autoSave();
      });
    });

    document.getElementById('add-weapon-btn')?.addEventListener('click', () => {
      const sel = document.getElementById('weapon-pick');
      const name = sel.value;
      if (!name) return;
      const wpn = Calc.findWeapon(name);
      if (!wpn) return;
      const isMelee = !wpn._ranged;
      const props = wpn.properties || [];
      // Arma di precisione: usa la migliore tra FOR e DES
      let abilityMod;
      if (props.some(p => p.startsWith('Preciso'))) {
        abilityMod = Math.max(Calc.modifier(character.abilities.str), Calc.modifier(character.abilities.dex));
      } else {
        abilityMod = isMelee ? Calc.modifier(character.abilities.str) : Calc.modifier(character.abilities.dex);
      }
      const attackBonus = abilityMod + Calc.proficiencyBonus(character.identity.level);
      character.combat.attacks.push({
        name: wpn.name,
        attack_bonus: (attackBonus >= 0 ? '+' : '') + attackBonus,
        damage: wpn.damage + (abilityMod >= 0 ? '+' : '') + abilityMod,
        damage_type: wpn.type,
        weapon_ref: wpn.name,
        custom_notes: ''
      });
      renderAttacks();
      autoSave();
      showToast(`${wpn.name} aggiunta`);
    });

    document.getElementById('add-custom-attack-btn')?.addEventListener('click', () => {
      character.combat.attacks.push({
        name: 'Attacco Personalizzato', attack_bonus: '+0', damage: '1d6',
        damage_type: 'Custom', weapon_ref: null, custom_notes: ''
      });
      renderAttacks();
      autoSave();
    });
  }

  function renderAttacks() {
    const list = document.getElementById('attacks-list');
    if (!list) return;
    list.innerHTML = '';

    if (!character.combat.attacks.length) {
      list.innerHTML = '<div class="section-hint">Nessun attacco. Aggiungi un\'arma qui sotto — il sistema calcola bonus e danni automaticamente.</div>';
      return;
    }

    character.combat.attacks.forEach((atk, i) => {
      const weapon = atk.weapon_ref ? Calc.findWeapon(atk.weapon_ref) : null;
      const card = document.createElement('div');
      card.className = 'attack-card';
      card.innerHTML = `
        <div class="attack-card-head">
          <input type="text" value="${atk.name}" class="attack-name atk-name" data-i="${i}" placeholder="Nome arma">
          <button class="attack-toggle" data-i="${i}" title="Mostra le regole">📖 Regole</button>
          <button class="eq-item-delete atk-del" data-i="${i}">✕</button>
        </div>
        <div class="attack-card-stats">
          <div class="attack-stat">
            <span class="attack-stat-label">Colpire</span>
            <input type="text" value="${atk.attack_bonus}" class="atk-bonus" data-i="${i}">
          </div>
          <div class="attack-stat">
            <span class="attack-stat-label">Danno</span>
            <input type="text" value="${atk.damage}" class="atk-dmg" data-i="${i}">
          </div>
          <div class="attack-stat">
            <span class="attack-stat-label">Tipo</span>
            <input type="text" value="${atk.damage_type || ''}" class="atk-type" data-i="${i}">
          </div>
        </div>
        <div class="attack-rules" id="atk-rules-${i}" style="display:none"></div>
      `;

      card.querySelectorAll('input').forEach(inp => {
        inp.addEventListener('change', () => {
          const idx = parseInt(inp.dataset.i);
          if (inp.classList.contains('atk-name')) character.combat.attacks[idx].name = inp.value;
          if (inp.classList.contains('atk-bonus')) character.combat.attacks[idx].attack_bonus = inp.value;
          if (inp.classList.contains('atk-dmg')) character.combat.attacks[idx].damage = inp.value;
          if (inp.classList.contains('atk-type')) character.combat.attacks[idx].damage_type = inp.value;
          autoSave();
        });
      });

      card.querySelector('.atk-del')?.addEventListener('click', () => {
        character.combat.attacks.splice(i, 1);
        renderAttacks();
        autoSave();
      });

      card.querySelector('.attack-toggle')?.addEventListener('click', () => {
        const rulesEl = document.getElementById(`atk-rules-${i}`);
        if (rulesEl.style.display === 'none') {
          rulesEl.innerHTML = buildWeaponRulesHTML(atk, weapon, i);
          rulesEl.style.display = 'block';
          // bind custom notes textarea
          const ta = rulesEl.querySelector('.atk-custom-notes');
          if (ta) ta.addEventListener('input', () => {
            character.combat.attacks[i].custom_notes = ta.value;
            autoSave();
          });
        } else {
          rulesEl.style.display = 'none';
        }
      });

      list.appendChild(card);
    });
  }

  function buildWeaponRulesHTML(atk, weapon, i) {
    if (weapon) {
      const rules = Calc.explainWeapon(weapon, character);
      return `
        <div class="rules-title">⚔ Come funziona in battaglia</div>
        <ul class="rules-list">
          ${rules.map(r => `<li>${r}</li>`).join('')}
        </ul>
        <div class="rules-meta">
          Dado base dell'arma: <strong>${weapon.damage}</strong> ·
          Proprietà: <strong>${(weapon.properties || []).join(', ') || 'Nessuna'}</strong>
        </div>
        <label style="margin-top:0.6rem">Note personali su quest'arma</label>
        <textarea class="atk-custom-notes" rows="2" placeholder="Es. arma magica +1, effetti speciali...">${atk.custom_notes || ''}</textarea>
      `;
    }
    // Arma personalizzata
    return `
      <div class="rules-title">⚔ Attacco personalizzato</div>
      <ul class="rules-list">
        <li>TIRO PER COLPIRE: 1d20 + il bonus indicato sopra, contro la CA del bersaglio.</li>
        <li>DANNO se colpisci: tira i dadi indicati nel campo "Danno". Con un 20 naturale (critico) tiri i dadi del danno due volte.</li>
        <li>Definisci tu come funziona quest'arma/potere nel campo note qui sotto.</li>
      </ul>
      <label style="margin-top:0.6rem">Descrizione / Regole personalizzate</label>
      <textarea class="atk-custom-notes" rows="3" placeholder="Descrivi come funziona quest'arma o potere: dadi, effetti, tiri salvezza richiesti...">${atk.custom_notes || ''}</textarea>
    `;
  }

  // ---- EQUIPMENT ----
  function renderEquipment(c) {
    c.innerHTML = `
      <div class="deco-divider">Monete</div>
      <div class="currency-grid">
        ${[['cp','Rame'],['sp','Argento'],['ep','Elettrum'],['gp','Oro'],['pp','Platino']].map(([k,label]) => `
          <div class="currency-item">
            <span class="currency-symbol">${label}</span>
            <input class="currency-input" type="number" data-currency="${k}" value="${character.equipment.currency[k] || 0}" min="0">
          </div>
        `).join('')}
      </div>

      <div class="deco-divider">Inventario</div>
      <div style="display:flex;gap:0.5rem;margin-bottom:1rem;flex-wrap:wrap">
        <div class="autocomplete-wrap" style="flex:1;min-width:160px">
          <input type="text" id="eq-search" placeholder="Cerca o aggiungi oggetto...">
          <div class="autocomplete-list" id="eq-autocomplete"></div>
        </div>
        <input type="number" id="eq-qty" value="1" min="1" style="width:60px">
        <button class="btn btn-secondary btn-sm" id="eq-add-btn">Aggiungi</button>
      </div>

      <div id="equipment-list"></div>

      <div class="deco-divider">Equipaggiamento Iniziale</div>
      <div style="font-size:0.8rem;color:var(--text-dim);margin-bottom:0.5rem">Clicca per aggiungere l'equipaggiamento suggerito dalla tua classe/background</div>
      <div id="starting-eq-suggestions" class="picker-grid" style="grid-template-columns:1fr"></div>
    `;

    renderEquipmentList();
    renderStartingEq();

    c.querySelectorAll('.currency-input').forEach(inp => {
      inp.addEventListener('change', () => {
        character.equipment.currency[inp.dataset.currency] = parseInt(inp.value) || 0;
        autoSave();
      });
    });

    const searchInput = document.getElementById('eq-search');
    const autocompleteList = document.getElementById('eq-autocomplete');

    const allItems = [
      ...DND.WEAPONS.simple_melee, ...DND.WEAPONS.simple_ranged,
      ...DND.WEAPONS.martial_melee, ...DND.WEAPONS.martial_ranged,
      ...DND.ARMOR.light, ...DND.ARMOR.medium, ...DND.ARMOR.heavy, ...DND.ARMOR.shields,
      { name: 'Torcia' }, { name: 'Corda di Canapa (50ft)' }, { name: 'Razioni (1 giorno)' },
      { name: 'Zaino' }, { name: 'Coperta' }, { name: 'Acciarino' }, { name: 'Corda di Seta (50ft)' },
      { name: 'Grimorio' }, { name: 'Focus Arcano' }, { name: 'Focus Druidico' },
      { name: 'Simbolo Sacro' }, { name: 'Borraccia' }, { name: 'Attrezzi da Ladro' }
    ];

    searchInput?.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      if (!q) { autocompleteList.classList.remove('open'); return; }
      const matches = allItems.filter(i => i.name.toLowerCase().includes(q)).slice(0, 8);
      if (!matches.length) { autocompleteList.classList.remove('open'); return; }
      autocompleteList.innerHTML = '';
      matches.forEach(item => {
        const el = document.createElement('div');
        el.className = 'autocomplete-item';
        el.innerHTML = `${item.name}${item.damage ? `<small>${item.damage} ${item.type || ''}</small>` : ''}`;
        el.addEventListener('click', () => {
          searchInput.value = item.name;
          autocompleteList.classList.remove('open');
        });
        autocompleteList.appendChild(el);
      });
      autocompleteList.classList.add('open');
    });

    document.getElementById('eq-add-btn')?.addEventListener('click', () => {
      const name = searchInput.value.trim();
      const qty = parseInt(document.getElementById('eq-qty').value) || 1;
      if (!name) return;
      const existing = character.equipment.items.find(i => i.name === name);
      if (existing) existing.qty = (existing.qty || 1) + qty;
      else character.equipment.items.push({ name, qty });
      searchInput.value = '';
      renderEquipmentList();
      autoSave();
    });
  }

  function renderEquipmentList() {
    const list = document.getElementById('equipment-list');
    if (!list) return;
    list.innerHTML = '';
    if (!character.equipment.items.length) {
      list.innerHTML = '<div class="section-hint">Nessun oggetto. Aggiungi dall\'alto o usa l\'equipaggiamento iniziale.</div>';
      return;
    }
    character.equipment.items.forEach((item, i) => {
      const row = document.createElement('div');
      row.className = 'eq-item-row';
      row.innerHTML = `
        <span class="eq-item-name">${item.name}</span>
        <input class="eq-item-qty" type="number" value="${item.qty || 1}" min="0" data-i="${i}">
        <button class="eq-item-delete" data-i="${i}">✕</button>
      `;
      row.querySelector('.eq-item-qty').addEventListener('change', e => {
        character.equipment.items[i].qty = parseInt(e.target.value) || 0;
        if (!character.equipment.items[i].qty) {
          character.equipment.items.splice(i, 1);
          renderEquipmentList();
        }
        autoSave();
      });
      row.querySelector('.eq-item-delete').addEventListener('click', () => {
        character.equipment.items.splice(i, 1);
        renderEquipmentList();
        autoSave();
      });
      list.appendChild(row);
    });
  }

  function renderStartingEq() {
    const container = document.getElementById('starting-eq-suggestions');
    if (!container) return;
    const cls = DND.CLASSES[character.identity.class];
    const bg = DND.BACKGROUNDS[character.identity.background];
    const suggestions = [
      ...(cls?.starting_equipment || []),
      ...(bg?.equipment || [])
    ];
    suggestions.forEach(eq => {
      const item = document.createElement('div');
      item.className = 'picker-item';
      item.style.cssText = 'text-align:left;padding:0.5rem 0.8rem';
      item.innerHTML = `<div class="picker-item-name" style="font-size:0.8rem">+ ${eq}</div>`;
      item.addEventListener('click', () => {
        character.equipment.items.push({ name: eq, qty: 1 });
        item.classList.add('selected');
        renderEquipmentList();
        autoSave();
      });
      container.appendChild(item);
    });
  }

  // ---- SPELLS ----

  // Trova un incantesimo per nome e ne restituisce dati + livello
  function findSpellData(name) {
    for (const [key, list] of Object.entries(DND.SPELLS)) {
      const spell = list.find(s => s.name === name);
      if (spell) {
        const level = key === 'cantrips' ? 0 : parseInt(key.replace('level', ''));
        return { ...spell, _level: level };
      }
    }
    return null;
  }

  function spellLevelLabel(lvl) {
    return lvl === 0 ? 'Trucchetto' : `${lvl}° livello`;
  }

  // Popup di dettaglio incantesimo
  function showSpellDetail(spellName) {
    const spell = findSpellData(spellName);
    if (!spell) { showToast('Dettagli non disponibili', 'error'); return; }

    let modal = document.getElementById('spell-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'spell-modal';
      modal.className = 'spell-modal-overlay';
      document.body.appendChild(modal);
    }

    const isCantrip = spell._level === 0;
    const known = character.spells.known.includes(spellName);

    modal.innerHTML = `
      <div class="spell-modal-card">
        <button class="spell-modal-close" id="spell-modal-close">✕</button>
        <div class="spell-modal-level ${isCantrip ? 'cantrip' : ''}">
          ${isCantrip ? '✦ Trucchetto' : '◆ Incantesimo di ' + spell._level + '° livello'}
        </div>
        <h3 class="spell-modal-name">${spell.name}</h3>
        <div class="spell-modal-tags">
          <span class="spell-modal-tag">${spell.school}</span>
          ${spell.ritual ? '<span class="spell-modal-tag ritual">Rituale</span>' : ''}
        </div>
        <div class="spell-modal-grid">
          <div><span class="smg-label">Tempo di lancio</span><span class="smg-val">${spell.castTime || '1 azione'}</span></div>
          <div><span class="smg-label">Gittata</span><span class="smg-val">${spell.range || '—'}</span></div>
          <div><span class="smg-label">Durata</span><span class="smg-val">${spell.duration || 'Istantanea'}</span></div>
          <div><span class="smg-label">Componenti</span><span class="smg-val">${spell.components || 'V, S'}</span></div>
        </div>
        <div class="spell-modal-section-title">Come funziona</div>
        <p class="spell-modal-desc">${spell.description}</p>
        <div class="spell-modal-school-note">${DND.SPELL_SCHOOL_INFO[spell.school] || ''}</div>
        <div class="spell-modal-classes">Classi: ${spell.classes.join(', ')}</div>
        <button class="btn ${known ? 'btn-secondary' : 'btn-primary'}" id="spell-modal-add" style="width:100%;margin-top:1rem">
          ${known ? '✓ Già nella tua lista — Rimuovi' : '+ Aggiungi ai tuoi incantesimi'}
        </button>
      </div>
    `;

    modal.classList.add('open');

    const close = () => modal.classList.remove('open');
    modal.querySelector('#spell-modal-close').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });

    modal.querySelector('#spell-modal-add').addEventListener('click', () => {
      if (known) {
        character.spells.known = character.spells.known.filter(s => s !== spellName);
        character.spells.prepared = character.spells.prepared.filter(s => s !== spellName);
        showToast('Incantesimo rimosso');
      } else {
        character.spells.known.push(spellName);
        character.spells.prepared.push(spellName);
        showToast('Incantesimo aggiunto ✦');
      }
      close();
      renderPreparedSpells();
      autoSave();
    });
  }

  function renderSpells(c) {
    if (!Calc.isSpellcaster(character)) {
      c.innerHTML = `
        <div style="text-align:center;padding:3rem 1rem;color:var(--text-dim)">
          <div style="font-size:3rem;margin-bottom:1rem">🚫</div>
          <div class="subtitle">La classe ${character.identity.class || 'selezionata'} non usa la magia standard.</div>
          <p style="margin-top:0.8rem;font-size:0.85rem">Puoi comunque aggiungere poteri magici personalizzati nella sezione <strong>Aspetto</strong>.</p>
        </div>
      `;
      return;
    }

    const cls = DND.CLASSES[character.identity.class];
    const spellSlots = Calc.spellSlots(character);
    const dc = Calc.spellSaveDC(character);
    const atk = Calc.spellAttackBonus(character);
    const cantrips = Calc.cantripsKnown(character);
    const spellsAvail = Calc.spellsAvailable(character);
    const maxLvl = Calc.maxSpellLevel(character);

    c.innerHTML = `
      <div class="spell-dc-bar">
        <div class="spell-stat">
          <div class="spell-stat-value">${dc}</div>
          <span class="stat-box-label">CD Incantesimi</span>
        </div>
        <div class="spell-stat">
          <div class="spell-stat-value">${atk >= 0 ? '+' : ''}${atk}</div>
          <span class="stat-box-label">Bonus Attacco</span>
        </div>
        <div class="spell-stat">
          <div class="spell-stat-value" style="text-transform:uppercase;font-size:1rem">${DND.ABILITY_NAMES[cls.spellcasting.ability]}</div>
          <span class="stat-box-label">Caratteristica</span>
        </div>
      </div>

      <div class="spell-budget">
        <div class="spell-budget-title">✦ Al livello ${character.identity.level} il tuo ${character.identity.class} ha:</div>
        <div class="spell-budget-row">
          ${cantrips > 0 ? `<span class="spell-budget-pill"><strong>${cantrips}</strong> trucchetti</span>` : ''}
          <span class="spell-budget-pill"><strong>${spellsAvail.count}</strong> incantesimi ${spellsAvail.type}</span>
          <span class="spell-budget-pill">incantesimi fino al <strong>${maxLvl}°</strong> livello</span>
        </div>
        <div class="spell-budget-current">
          Attualmente nella tua lista: <strong>${character.spells.known.length}</strong> incantesimi
        </div>
      </div>

      ${Array.isArray(spellSlots) ? `
        <div class="deco-divider">Slot Incantesimi</div>
        <div class="section-hint">Tocca i cerchietti per segnare gli slot usati durante l'avventura.</div>
        <div class="spell-slots-grid">
          ${spellSlots.map((total, i) => total > 0 ? `
            <div class="slot-box">
              <span class="slot-level">${i+1}° Livello</span>
              <div class="slot-pips">
                ${Array.from({length: total}, (_, j) => {
                  const used = character.spells.slots_used[i] > j;
                  return `<div class="slot-pip ${used ? 'used' : 'available'}" data-level="${i}" data-slot="${j}" title="Clicca per usare/recuperare"></div>`;
                }).join('')}
              </div>
              <span style="font-size:0.6rem;color:var(--text-dim)">${total - (character.spells.slots_used[i]||0)}/${total}</span>
            </div>
          ` : '').join('')}
        </div>
      ` : `
        <div class="deco-divider">Slot del Patto</div>
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);padding:0.8rem;margin-bottom:1rem;text-align:center">
          <div style="font-family:var(--font-h);color:var(--purple2)">${spellSlots.slots} slot × ${spellSlots.level}° livello</div>
          <div style="font-size:0.7rem;color:var(--text-dim);margin-top:0.3rem">Il Warlock recupera tutti gli slot con un riposo breve</div>
        </div>
      `}

      <div class="deco-divider">Cerca Incantesimi</div>
      <div style="margin-bottom:1rem">
        <input type="text" id="spell-search" placeholder="Cerca tra gli incantesimi per ${character.identity.class}...">
        <div class="autocomplete-list" id="spell-autocomplete"></div>
      </div>

      <div class="deco-divider">I Tuoi Incantesimi</div>
      <div class="section-hint">Tocca un incantesimo per vederne i dettagli completi.</div>
      <div id="prepared-spells"></div>

      <div id="spell-suggestions" style="margin-top:1rem"></div>
    `;

    renderPreparedSpells();
    renderSpellSuggestions();

    c.querySelectorAll('.slot-pip').forEach(pip => {
      pip.addEventListener('click', () => {
        const level = parseInt(pip.dataset.level);
        const slotsUsed = character.spells.slots_used[level] || 0;
        if (pip.classList.contains('available')) {
          character.spells.slots_used[level] = slotsUsed + 1;
        } else {
          character.spells.slots_used[level] = Math.max(0, slotsUsed - 1);
        }
        pip.classList.toggle('available');
        pip.classList.toggle('used');
        autoSave();
      });
    });

    const spellSearch = document.getElementById('spell-search');
    const spellAuto = document.getElementById('spell-autocomplete');
    if (spellSearch) {
      const classSpells = Calc.getClassSpells(character.identity.class);
      const allSpells = Object.entries(classSpells).flatMap(([key, list]) =>
        list.map(s => ({ ...s, _level: key === 'cantrips' ? 0 : parseInt(key.replace('level', '')) }))
      );

      spellSearch.addEventListener('input', () => {
        const q = spellSearch.value.toLowerCase();
        if (!q) { spellAuto.classList.remove('open'); return; }
        const matches = allSpells.filter(s => s.name.toLowerCase().includes(q)).slice(0, 8);
        if (!matches.length) { spellAuto.classList.remove('open'); return; }
        spellAuto.innerHTML = '';
        matches.forEach(spell => {
          const el = document.createElement('div');
          el.className = 'autocomplete-item';
          el.innerHTML = `${spell.name}<small>${spellLevelLabel(spell._level)} · ${spell.school}${spell.ritual?' · Rituale':''}</small>`;
          el.addEventListener('click', () => {
            spellSearch.value = '';
            spellAuto.classList.remove('open');
            showSpellDetail(spell.name);
          });
          spellAuto.appendChild(el);
        });
        spellAuto.classList.add('open');
      });
    }
  }

  function renderPreparedSpells() {
    const container = document.getElementById('prepared-spells');
    if (!container) return;
    if (!character.spells.known.length) {
      container.innerHTML = '<div class="section-hint">Nessun incantesimo ancora. Cercali sopra o scegli tra i suggerimenti qui sotto.</div>';
      return;
    }
    container.innerHTML = '';

    // Raggruppa per livello
    const byLevel = {};
    character.spells.known.forEach(name => {
      const s = findSpellData(name);
      const lvl = s ? s._level : -1;
      (byLevel[lvl] = byLevel[lvl] || []).push({ name, data: s });
    });

    Object.keys(byLevel).map(Number).sort((a, b) => a - b).forEach(lvl => {
      const header = document.createElement('div');
      header.className = 'spell-level-header';
      header.textContent = lvl === 0 ? 'Trucchetti' : (lvl === -1 ? 'Altri' : `${lvl}° Livello`);
      container.appendChild(header);

      byLevel[lvl].forEach(({ name, data }) => {
        const isPrepared = character.spells.prepared.includes(name);
        const el = document.createElement('div');
        el.className = `spell-entry${isPrepared ? ' prepared' : ''}`;
        el.innerHTML = `
          <div class="spell-prepared-dot" title="${isPrepared ? 'Preparato' : 'Non preparato'} — clicca per cambiare"></div>
          <span class="spell-entry-name">${name}</span>
          ${data ? `<span class="spell-entry-school">${data.school}</span>` : ''}
          ${data?.ritual ? '<span class="spell-ritual-tag">R</span>' : ''}
          <button class="spell-info-btn" title="Dettagli">ⓘ</button>
          <button class="eq-item-delete" title="Rimuovi">✕</button>
        `;
        el.querySelector('.spell-prepared-dot').addEventListener('click', e => {
          e.stopPropagation();
          if (isPrepared) character.spells.prepared = character.spells.prepared.filter(s => s !== name);
          else character.spells.prepared.push(name);
          el.classList.toggle('prepared');
          autoSave();
        });
        el.querySelector('.spell-info-btn').addEventListener('click', e => {
          e.stopPropagation();
          showSpellDetail(name);
        });
        el.querySelector('.spell-entry-name').addEventListener('click', () => showSpellDetail(name));
        el.querySelector('.eq-item-delete').addEventListener('click', e => {
          e.stopPropagation();
          character.spells.known = character.spells.known.filter(s => s !== name);
          character.spells.prepared = character.spells.prepared.filter(s => s !== name);
          renderPreparedSpells();
          autoSave();
        });
        container.appendChild(el);
      });
    });
  }

  function renderSpellSuggestions() {
    const container = document.getElementById('spell-suggestions');
    if (!container) return;
    const classSpells = Calc.getClassSpells(character.identity.class);
    const maxLvl = Calc.maxSpellLevel(character);

    container.innerHTML = `<div class="deco-divider">Suggerimenti per ${character.identity.class}</div>
      <div class="section-hint">Incantesimi consigliati per il tuo livello. Tocca per i dettagli, "+" per aggiungere.</div>`;

    const order = ['cantrips', 'level1', 'level2', 'level3', 'level4', 'level5', 'level6', 'level7', 'level8', 'level9'];
    order.forEach(key => {
      const lvl = key === 'cantrips' ? 0 : parseInt(key.replace('level', ''));
      if (lvl > maxLvl) return;
      const spells = (classSpells[key] || []).slice(0, 6);
      if (!spells.length) return;

      const header = document.createElement('div');
      header.className = 'spell-level-header';
      header.textContent = lvl === 0 ? 'Trucchetti' : `${lvl}° Livello`;
      container.appendChild(header);

      spells.forEach(spell => {
        const already = character.spells.known.includes(spell.name);
        const el = document.createElement('div');
        el.className = 'spell-entry' + (already ? ' dimmed' : '');
        el.innerHTML = `
          <span class="spell-entry-name">${spell.name}</span>
          <span class="spell-entry-school">${spell.school}</span>
          ${spell.ritual ? '<span class="spell-ritual-tag">R</span>' : ''}
          <button class="spell-info-btn" title="Dettagli">ⓘ</button>
          <button class="spell-add-btn" title="${already ? 'Già aggiunto' : 'Aggiungi'}">${already ? '✓' : '+'}</button>
        `;
        el.querySelector('.spell-info-btn').addEventListener('click', e => {
          e.stopPropagation();
          showSpellDetail(spell.name);
        });
        el.querySelector('.spell-entry-name').addEventListener('click', () => showSpellDetail(spell.name));
        el.querySelector('.spell-add-btn').addEventListener('click', e => {
          e.stopPropagation();
          if (!character.spells.known.includes(spell.name)) {
            character.spells.known.push(spell.name);
            character.spells.prepared.push(spell.name);
            renderPreparedSpells();
            autoSave();
            showToast('Incantesimo aggiunto ✦');
            el.classList.add('dimmed');
            el.querySelector('.spell-add-btn').textContent = '✓';
          }
        });
        container.appendChild(el);
      });
    });
  }

  // ---- STORY ----
  function renderStory(c) {
    const bg = DND.BACKGROUNDS[character.identity.background];

    c.innerHTML = `
      ${bg ? `
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--r);padding:0.8rem;margin-bottom:1.2rem;font-size:0.85rem">
          <div style="font-family:var(--font-h);font-size:0.75rem;color:var(--gold);margin-bottom:0.5rem;letter-spacing:0.1em">CARATTERISTICA BACKGROUND: ${character.identity.background}</div>
          <div style="color:var(--text2)">${bg.feature}</div>
        </div>
        <div class="form-group">
          <label>Tratti di Personalità — Suggerimenti da ${character.identity.background}</label>
          <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.5rem">
            ${bg.traits.map(t => `<span style="background:var(--bg2);border:1px solid var(--border);border-radius:4px;padding:3px 8px;font-size:0.75rem;cursor:pointer;transition:all 0.2s" class="suggestion-chip" data-target="f-traits" data-val="${t.replace(/"/g,'&quot;')}">${t.substring(0,45)}…</span>`).join('')}
          </div>
        </div>
      ` : ''}

      <div class="form-group">
        <label>Tratti di Personalità</label>
        <textarea id="f-traits" rows="3" placeholder="Caratteristiche della personalità...">${character.story.traits || ''}</textarea>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem">
        <div class="form-group">
          <label>Ideali</label>
          <textarea id="f-ideals" rows="3" placeholder="${bg?.ideals?.join(', ') || 'I tuoi ideali...'}">${character.story.ideals || ''}</textarea>
        </div>
        <div class="form-group">
          <label>Legami</label>
          <textarea id="f-bonds" rows="3" placeholder="${bg?.bonds?.[0] || 'Le tue connessioni...'}">${character.story.bonds || ''}</textarea>
        </div>
      </div>
      <div class="form-group">
        <label>Difetti</label>
        <textarea id="f-flaws" rows="2" placeholder="${bg?.flaws?.[0] || 'I tuoi difetti...'}">${character.story.flaws || ''}</textarea>
      </div>
      <div class="deco-divider">Retroscena</div>
      <div class="form-group">
        <label>Storia del Personaggio</label>
        <textarea id="f-backstory" rows="6" placeholder="Racconta la storia del tuo personaggio. Come sei diventato ciò che sei? Cosa ti ha portato all'avventura?">${character.story.backstory || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Note Aggiuntive</label>
        <textarea id="f-notes" rows="3" placeholder="Note di sessione, obiettivi, segreti...">${character.story.notes || ''}</textarea>
      </div>
    `;

    c.querySelectorAll('.suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const target = document.getElementById(chip.dataset.target);
        if (target) {
          const current = target.value;
          target.value = current ? current + '\n' + chip.dataset.val : chip.dataset.val;
          chip.style.opacity = '0.4';
        }
      });
    });

    ['traits', 'ideals', 'bonds', 'flaws', 'backstory', 'notes'].forEach(field => {
      const el = document.getElementById(`f-${field}`);
      if (el) el.addEventListener('input', () => {
        character.story[field] = el.value;
        autoSave();
      });
    });
  }

  // ---- APPEARANCE ----
  function renderAppearance(c) {
    c.innerHTML = `
      <div class="deco-divider">Immagine del Personaggio</div>
      <div class="image-upload-zone${character.appearance.image ? ' has-image' : ''}" id="upload-zone">
        ${character.appearance.image
          ? `<img src="${character.appearance.image}" class="image-preview" alt="Personaggio">`
          : `<div>
              <div style="font-size:2.5rem;margin-bottom:0.5rem;color:var(--border2)">🖼</div>
              <div class="image-upload-hint">Clicca per caricare un'immagine</div>
              <div style="font-size:0.7rem;color:var(--text-dim);margin-top:0.3rem">JPG, PNG, WebP · Max 5MB</div>
            </div>`
        }
        <input type="file" id="image-input" accept="image/*" style="display:none">
      </div>
      ${character.appearance.image ? `<button class="btn btn-danger btn-sm" id="remove-image-btn" style="margin-top:0.5rem">Rimuovi Immagine</button>` : ''}

      <div class="deco-divider">Aspetto Fisico</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.8rem">
        <div class="form-group">
          <label>Età</label>
          <input type="text" id="f-age" value="${character.identity.age || ''}" placeholder="Es. 25 anni">
        </div>
        <div class="form-group">
          <label>Altezza</label>
          <input type="text" id="f-height" value="${character.identity.height || ''}" placeholder="Es. 1,80m">
        </div>
        <div class="form-group">
          <label>Peso</label>
          <input type="text" id="f-weight" value="${character.identity.weight || ''}" placeholder="Es. 75 kg">
        </div>
        <div class="form-group">
          <label>Occhi</label>
          <input type="text" id="f-eyes" value="${character.identity.eyes || ''}" placeholder="Es. Azzurri">
        </div>
        <div class="form-group">
          <label>Capelli</label>
          <input type="text" id="f-hair" value="${character.identity.hair || ''}" placeholder="Es. Neri, lunghi">
        </div>
        <div class="form-group">
          <label>Carnagione</label>
          <input type="text" id="f-skin" value="${character.identity.skin || ''}" placeholder="Es. Olivastra">
        </div>
      </div>
      <div class="form-group">
        <label>Descrizione dell'Aspetto</label>
        <textarea id="f-appearance-desc" rows="4" placeholder="Descrivi l'aspetto fisico del tuo personaggio. Cicatrici, tatuaggi, abbigliamento tipico...">${character.appearance.description || ''}</textarea>
      </div>

      <div class="deco-divider">Poteri & Caratteristiche Personalizzate</div>
      <div id="custom-features"></div>
      <button class="btn btn-secondary btn-sm" id="add-custom-feature-btn" style="margin-top:0.5rem">+ Aggiungi Caratteristica Personalizzata</button>

      <div class="form-group" style="margin-top:1.2rem">
        <label>Note Personalizzate / Poteri Homebrew</label>
        <textarea id="f-custom-notes" rows="4" placeholder="Poteri speciali, tratti unici, abilità homebrew...">${character.custom.notes || ''}</textarea>
      </div>
    `;

    document.getElementById('upload-zone')?.addEventListener('click', () => {
      document.getElementById('image-input')?.click();
    });

    document.getElementById('image-input')?.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) { showToast('Immagine troppo grande (max 5MB)', 'error'); return; }
      const reader = new FileReader();
      reader.onload = ev => {
        character.appearance.image = ev.target.result;
        renderAppearance(c);
        autoSave();
      };
      reader.readAsDataURL(file);
    });

    document.getElementById('remove-image-btn')?.addEventListener('click', () => {
      character.appearance.image = null;
      renderAppearance(c);
      autoSave();
    });

    ['age','height','weight','eyes','hair','skin'].forEach(f => {
      document.getElementById(`f-${f}`)?.addEventListener('change', e => {
        character.identity[f] = e.target.value;
        autoSave();
      });
    });

    document.getElementById('f-appearance-desc')?.addEventListener('input', e => {
      character.appearance.description = e.target.value;
      autoSave();
    });

    document.getElementById('f-custom-notes')?.addEventListener('input', e => {
      character.custom.notes = e.target.value;
      autoSave();
    });

    renderCustomFeatures(c);

    document.getElementById('add-custom-feature-btn')?.addEventListener('click', () => {
      character.custom.features.push({ name: '', description: '' });
      renderCustomFeatures(c);
    });
  }

  function renderCustomFeatures(c) {
    const container = document.getElementById('custom-features');
    if (!container) return;
    container.innerHTML = '';
    character.custom.features.forEach((feat, i) => {
      const el = document.createElement('div');
      el.className = 'feature-entry';
      el.innerHTML = `
        <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:0.4rem">
          <input type="text" value="${feat.name}" placeholder="Nome della caratteristica" style="flex:1;font-family:var(--font-h);color:var(--gold)" data-feat-name="${i}">
          <button class="eq-item-delete" data-feat-del="${i}">✕</button>
        </div>
        <textarea rows="2" placeholder="Descrizione, effetto, regole..." style="width:100%" data-feat-desc="${i}">${feat.description || ''}</textarea>
      `;
      el.querySelector(`[data-feat-name="${i}"]`)?.addEventListener('change', e => {
        character.custom.features[i].name = e.target.value; autoSave();
      });
      el.querySelector(`[data-feat-desc="${i}"]`)?.addEventListener('input', e => {
        character.custom.features[i].description = e.target.value; autoSave();
      });
      el.querySelector(`[data-feat-del="${i}"]`)?.addEventListener('click', () => {
        character.custom.features.splice(i, 1);
        renderCustomFeatures(c);
        autoSave();
      });
      container.appendChild(el);
    });
  }

  // ---- Global save button ----
  document.getElementById('save-btn')?.addEventListener('click', () => {
    Calc.autoCalculate(character);
    Storage.saveCharacter(character, user);
    showToast('Personaggio salvato! ✦', 'success');
  });

  document.getElementById('view-btn')?.addEventListener('click', () => {
    Calc.autoCalculate(character);
    Storage.saveCharacter(character, user);
    window.location.href = `view.html?id=${character.id}`;
  });
}

// =============================================
// VIEW PAGE
// =============================================

function initViewPage() {
  const user = Storage.getCurrentUser();
  if (!user) { window.location.href = 'index.html'; return; }

  const usernameEl = document.getElementById('nav-username');
  if (usernameEl) usernameEl.textContent = user;

  const charId = getParam('id');
  const character = charId ? Storage.getCharacter(charId, user) : null;
  if (!character) { window.location.href = 'characters.html'; return; }

  Calc.autoCalculate(character);

  // Tema visivo della classe
  const theme = getClassTheme(character.identity.class);
  applyClassTheme(theme);
  initParticles('particles-canvas', theme);

  document.querySelectorAll('.btn-logout').forEach(b => b.addEventListener('click', () => {
    Storage.logout(); window.location.href = 'index.html';
  }));

  // Header
  const bgEl = document.getElementById('view-header-bg');
  if (bgEl && character.appearance.image) bgEl.style.backgroundImage = `url(${character.appearance.image})`;

  const portraitWrap = document.getElementById('view-portrait-wrap');
  if (portraitWrap) {
    portraitWrap.innerHTML = character.appearance.image
      ? `<img src="${character.appearance.image}" class="view-portrait" alt="${character.identity.name}">`
      : `<div class="view-portrait-placeholder">${getClassIcon(character.identity.class)}</div>`;
  }

  const name = character.identity.name || 'Senza Nome';
  const level = character.identity.level || 1;
  const cls = character.identity.class || '—';
  const race = character.identity.race || '—';

  document.getElementById('view-name').textContent = name;
  document.getElementById('view-class').textContent = `${cls} ${level}° · ${race}`;
  document.getElementById('view-alignment').textContent = character.identity.alignment || '';
  document.getElementById('view-background').textContent = character.identity.background || '';
  document.getElementById('view-subrace').textContent = character.identity.subrace || '';

  document.getElementById('edit-btn')?.addEventListener('click', () => {
    window.location.href = `create.html?id=${character.id}`;
  });

  // Ability scores
  const abilityGrid = document.getElementById('view-abilities');
  if (abilityGrid) {
    const raceBonuses = Calc.getRacialBonuses(character.identity.race, character.identity.subrace);
    ['str','dex','con','int','wis','cha'].forEach(ab => {
      const base = character.abilities[ab];
      const bonus = raceBonuses[ab] || 0;
      const total = base + bonus;
      const mod = Calc.modifier(total);
      const box = document.createElement('div');
      box.className = 'ability-box';
      box.innerHTML = `
        <div class="ability-box-name">${DND.ABILITY_NAMES[ab]}</div>
        <div class="ability-box-score">${total}</div>
        <div class="ability-box-modifier">${Calc.modStr(total)}</div>
      `;
      abilityGrid.appendChild(box);
    });
  }

  // Combat stats
  const maxHP = character.combat.max_hp || Calc.maxHP(character);
  const curHP = character.combat.current_hp || maxHP;
  const ac = Calc.ac(character);
  const init = Calc.initiative(character);
  const pb = Calc.proficiencyBonus(level);

  document.getElementById('view-hp').textContent = `${curHP} / ${maxHP}`;
  document.getElementById('view-ac').textContent = ac;
  document.getElementById('view-initiative').textContent = (init >= 0 ? '+' : '') + init;
  document.getElementById('view-speed').textContent = (character.combat.speed || 30) + ' ft';
  document.getElementById('view-pb').textContent = '+' + pb;
  document.getElementById('view-passive').textContent = Calc.passivePerception(character);

  // Saving throws
  const savesGrid = document.getElementById('view-saves');
  if (savesGrid) {
    Object.entries(DND.ABILITY_NAMES).forEach(([ab, name]) => {
      const prof = character.saving_throw_proficiencies.includes(ab);
      const bonus = Calc.savingThrow(character, ab);
      const row = document.createElement('div');
      row.className = `save-row${prof ? ' proficient' : ''}`;
      row.innerHTML = `<div class="save-dot"></div><span style="flex:1">${name}</span><span style="font-family:var(--font-h);color:var(--gold)">${bonus>=0?'+':''}${bonus}</span>`;
      savesGrid.appendChild(row);
    });
  }

  // Skills
  const skillsList = document.getElementById('view-skills');
  if (skillsList) {
    DND.SKILLS.forEach(skill => {
      const isProficient = character.skill_proficiencies.includes(skill.name);
      const bonus = Calc.skillBonus(character, skill.name);
      const row = document.createElement('div');
      row.className = `skill-row${isProficient ? ' proficient' : ''}`;
      row.innerHTML = `
        <div class="skill-check">${isProficient ? '✓' : ''}</div>
        <span class="skill-ability">${skill.ability.toUpperCase()}</span>
        <span class="skill-name">${skill.name}</span>
        <span class="skill-bonus">${bonus>=0?'+':''}${bonus}</span>
      `;
      skillsList.appendChild(row);
    });
  }

  // Attacks
  const attacksBody = document.getElementById('view-attacks-body');
  if (attacksBody) {
    character.combat.attacks.forEach(atk => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${atk.name}</td><td>${atk.attack_bonus}</td><td style="color:var(--red2)">${atk.damage}</td><td style="color:var(--text-dim);font-size:0.8rem">${atk.damage_type}</td>`;
      attacksBody.appendChild(tr);
    });
    if (!character.combat.attacks.length) {
      attacksBody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-dim);font-style:italic">Nessun attacco registrato</td></tr>';
    }
  }

  // Equipment
  const eqBody = document.getElementById('view-equipment-body');
  if (eqBody) {
    character.equipment.items.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${item.name}</td><td style="text-align:center">${item.qty || 1}</td>`;
      eqBody.appendChild(tr);
    });
    if (!character.equipment.items.length) {
      eqBody.innerHTML = '<tr><td colspan="2" style="text-align:center;color:var(--text-dim);font-style:italic">Nessun oggetto</td></tr>';
    }
  }

  // Currency
  ['cp','sp','ep','gp','pp'].forEach(k => {
    const el = document.getElementById(`view-${k}`);
    if (el) el.textContent = character.equipment.currency[k] || 0;
  });

  // Spells
  const spellsSection = document.getElementById('view-spells-section');
  if (spellsSection) {
    if (Calc.isSpellcaster(character)) {
      spellsSection.style.display = '';
      document.getElementById('view-spell-dc').textContent = Calc.spellSaveDC(character);
      document.getElementById('view-spell-atk').textContent = (Calc.spellAttackBonus(character) >= 0 ? '+' : '') + Calc.spellAttackBonus(character);

      const spellsList = document.getElementById('view-spells-list');
      if (spellsList) {
        const allSpells = Object.values(DND.SPELLS).flat();
        character.spells.prepared.forEach(spellName => {
          const spell = allSpells.find(s => s.name === spellName);
          const el = document.createElement('div');
          el.className = 'spell-entry prepared';
          el.innerHTML = `
            <div class="spell-prepared-dot"></div>
            <span class="spell-entry-name">${spellName}</span>
            ${spell ? `<span class="spell-entry-school">${spell.school}</span>` : ''}
          `;
          spellsList.appendChild(el);
        });
        if (!character.spells.prepared.length) {
          spellsList.innerHTML = '<div class="section-hint">Nessun incantesimo preparato</div>';
        }
      }
    } else {
      spellsSection.style.display = 'none';
    }
  }

  // Story
  document.getElementById('view-traits').textContent = character.story.traits || '—';
  document.getElementById('view-ideals').textContent = character.story.ideals || '—';
  document.getElementById('view-bonds').textContent = character.story.bonds || '—';
  document.getElementById('view-flaws').textContent = character.story.flaws || '—';
  document.getElementById('view-backstory').textContent = character.story.backstory || '—';

  // Custom features
  const customContainer = document.getElementById('view-custom');
  if (customContainer) {
    if (character.custom.features.length || character.custom.notes) {
      character.custom.features.forEach(feat => {
        const el = document.createElement('div');
        el.className = 'feature-entry';
        el.innerHTML = `<div class="feature-entry-name">${feat.name}</div><div class="feature-entry-desc">${feat.description}</div>`;
        customContainer.appendChild(el);
      });
      if (character.custom.notes) {
        const el = document.createElement('div');
        el.className = 'feature-entry';
        el.innerHTML = `<div class="feature-entry-name">Note Homebrew</div><div class="feature-entry-desc" style="white-space:pre-wrap">${character.custom.notes}</div>`;
        customContainer.appendChild(el);
      }
    } else {
      customContainer.innerHTML = '<div class="section-hint">Nessuna caratteristica personalizzata</div>';
    }
  }

  // Languages
  const langEl = document.getElementById('view-languages');
  if (langEl) {
    langEl.textContent = character.languages?.join(', ') || 'Comune';
  }

  // Print
  document.getElementById('print-btn')?.addEventListener('click', () => window.print());
}

// =============================================
// AUTO-DETECT PAGE & INIT
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const page = body.dataset.page;

  const navUser = document.getElementById('nav-username');
  const user = Storage.getCurrentUser();
  if (navUser && user) navUser.textContent = user;

  if (page === 'index')      initIndexPage();
  else if (page === 'chars') initCharsPage();
  else if (page === 'create') initCreatePage();
  else if (page === 'view')  initViewPage();
});
