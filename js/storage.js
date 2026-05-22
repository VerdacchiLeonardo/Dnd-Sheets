// User & Character Storage (localStorage-based, multi-user)

const Storage = {
  KEYS: {
    currentUser: 'dnd_current_user',
    users: 'dnd_users',
    playerMeta: 'dnd_player_meta',
    characters: (user) => `dnd_characters_${user}`
  },

  getCurrentUser() {
    return localStorage.getItem(this.KEYS.currentUser);
  },

  setCurrentUser(username) {
    const clean = this.cleanUsername(username);
    if (!clean) return false;
    localStorage.setItem(this.KEYS.currentUser, clean);
    const users = this.getUsers();
    if (!users.includes(clean)) {
      users.push(clean);
      localStorage.setItem(this.KEYS.users, JSON.stringify(users));
    }
    return clean;
  },

  getUsers() {
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.users) || '[]');
    } catch { return []; }
  },

  // Ripara stati incoerenti (chiavi utente con spazi create da una vecchia
  // versione di renameUser). Unisce i personaggi sotto la chiave pulita.
  // Idempotente: se non c'è nulla da riparare non scrive niente.
  migrate() {
    const rawUsers = this.getUsers();
    const cur = localStorage.getItem(this.KEYS.currentUser);
    const all = new Set(rawUsers);
    if (cur) all.add(cur);

    let touched = false;
    all.forEach(oldName => {
      const newName = this.cleanUsername(oldName);
      if (!newName || newName === oldName) return;
      touched = true;
      // Unisce i personaggi oldName -> newName (per id, senza perdite)
      const byId = {};
      this.getCharacters(newName).forEach(c => { if (c && c.id) byId[c.id] = c; });
      this.getCharacters(oldName).forEach(c => {
        if (!c) return;
        if (!c.id) c.id = this.generateId();
        byId[c.id] = c;
      });
      localStorage.setItem(this.KEYS.characters(newName), JSON.stringify(Object.values(byId)));
      localStorage.removeItem(this.KEYS.characters(oldName));
      // Metadati
      const meta = this._allMeta();
      if (meta[oldName]) {
        if (!meta[newName]) meta[newName] = meta[oldName];
        delete meta[oldName];
        this._saveMeta(meta);
      }
      // Utente corrente
      if (localStorage.getItem(this.KEYS.currentUser) === oldName) {
        localStorage.setItem(this.KEYS.currentUser, newName);
      }
    });

    if (touched) {
      const cleaned = [];
      rawUsers.forEach(u => {
        const n = this.cleanUsername(u) || u;
        if (n && !cleaned.includes(n)) cleaned.push(n);
      });
      const c = localStorage.getItem(this.KEYS.currentUser);
      if (c && !cleaned.includes(c)) cleaned.push(c);
      localStorage.setItem(this.KEYS.users, JSON.stringify(cleaned));
    }
  },

  logout() {
    localStorage.removeItem(this.KEYS.currentUser);
  },

  cleanUsername(name) {
    return (name || '').trim().toLowerCase().replace(/[^a-z0-9_\-àèìòù]/gi, '');
  },

  renameUser(oldName, newName) {
    const clean = this.cleanUsername(newName);
    if (!clean) return null;
    if (clean === oldName) return oldName;
    const users = this.getUsers();
    if (users.includes(clean)) return 'EXISTS';
    // Sposta i personaggi sotto la nuova chiave
    const chars = this.getCharacters(oldName);
    localStorage.setItem(this.KEYS.characters(clean), JSON.stringify(chars));
    localStorage.removeItem(this.KEYS.characters(oldName));
    // Sposta i metadati del giocatore
    const meta = this._allMeta();
    if (meta[oldName]) { meta[clean] = meta[oldName]; delete meta[oldName]; this._saveMeta(meta); }
    // Aggiorna la lista utenti
    const updated = users.filter(u => u !== oldName);
    updated.push(clean);
    localStorage.setItem(this.KEYS.users, JSON.stringify(updated));
    // Aggiorna l'utente corrente
    if (this.getCurrentUser() === oldName) {
      localStorage.setItem(this.KEYS.currentUser, clean);
    }
    return clean;
  },

  deleteUser(name) {
    if (!name) return false;
    localStorage.removeItem(this.KEYS.characters(name));
    const users = this.getUsers().filter(u => u !== name);
    localStorage.setItem(this.KEYS.users, JSON.stringify(users));
    const meta = this._allMeta();
    delete meta[name];
    this._saveMeta(meta);
    if (this.getCurrentUser() === name) this.logout();
    return true;
  },

  // ---- PLAYER METADATA (tipo giocatore, ecc.) ----
  _allMeta() {
    try { return JSON.parse(localStorage.getItem(this.KEYS.playerMeta) || '{}'); }
    catch { return {}; }
  },

  _saveMeta(meta) {
    localStorage.setItem(this.KEYS.playerMeta, JSON.stringify(meta));
  },

  getPlayerMeta(user) {
    const u = user || this.getCurrentUser();
    if (!u) return { type: 'player' };
    const meta = this._allMeta()[u] || {};
    return { type: meta.type || 'player' };
  },

  setPlayerMeta(user, partial) {
    const u = user || this.getCurrentUser();
    if (!u) return false;
    const all = this._allMeta();
    all[u] = { ...(all[u] || {}), ...partial };
    this._saveMeta(all);
    return true;
  },

  // ---- EXPORT / IMPORT (backup tra dispositivi) ----
  exportData(user) {
    const u = user || this.getCurrentUser();
    return {
      app: 'dnd-sheets',
      version: 1,
      exportedAt: new Date().toISOString(),
      player: u,
      playerType: this.getPlayerMeta(u).type,
      characters: this.getCharacters(u)
    };
  },

  importData(data, user) {
    const u = user || this.getCurrentUser();
    if (!u) return { ok: false, error: 'Nessun giocatore attivo' };
    if (!data || data.app !== 'dnd-sheets' || !Array.isArray(data.characters)) {
      return { ok: false, error: 'File non valido o non riconosciuto' };
    }
    // Unisce per id: aggiorna gli esistenti, aggiunge i nuovi
    const existing = this.getCharacters(u);
    const byId = {};
    existing.forEach(c => { byId[c.id] = c; });
    let added = 0, updated = 0;
    data.characters.forEach(c => {
      if (!c || typeof c !== 'object') return;
      if (!c.id) c.id = this.generateId();
      if (byId[c.id]) updated++; else added++;
      byId[c.id] = c;
    });
    localStorage.setItem(this.KEYS.characters(u), JSON.stringify(Object.values(byId)));
    // Importa anche il tipo giocatore se presente
    if (data.playerType) this.setPlayerMeta(u, { type: data.playerType });
    return { ok: true, added, updated };
  },

  getCharacters(user) {
    const u = user || this.getCurrentUser();
    if (!u) return [];
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.characters(u)) || '[]');
    } catch { return []; }
  },

  saveCharacter(character, user) {
    const u = user || this.getCurrentUser();
    if (!u) return false;
    const chars = this.getCharacters(u);
    const idx = chars.findIndex(c => c.id === character.id);
    if (idx >= 0) {
      chars[idx] = { ...character, updatedAt: new Date().toISOString() };
    } else {
      chars.push({
        ...character,
        id: character.id || this.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }
    localStorage.setItem(this.KEYS.characters(u), JSON.stringify(chars));
    return true;
  },

  getCharacter(id, user) {
    const chars = this.getCharacters(user);
    return chars.find(c => c.id === id) || null;
  },

  deleteCharacter(id, user) {
    const u = user || this.getCurrentUser();
    if (!u) return false;
    const chars = this.getCharacters(u).filter(c => c.id !== id);
    localStorage.setItem(this.KEYS.characters(u), JSON.stringify(chars));
    return true;
  },

  generateId() {
    return 'char_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
  },

  newCharacter() {
    return {
      id: this.generateId(),
      identity: {
        name: '', race: '', subrace: '', class: '', subclass: '',
        level: 1, background: '', alignment: '', xp: 0,
        deity: '', age: '', height: '', weight: '', eyes: '', hair: '', skin: ''
      },
      abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
      skills: {},
      saving_throw_proficiencies: [],
      skill_proficiencies: [],
      tool_proficiencies: [],
      combat: {
        max_hp: 0, current_hp: 0, temp_hp: 0,
        armor_type: '', armor_ac: 10, shield: false,
        custom_ac: null, speed: 30,
        initiative_bonus: 0, death_saves: { successes: 0, failures: 0 },
        attacks: []
      },
      equipment: {
        items: [],
        currency: { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 }
      },
      spells: {
        spellcasting_class: '',
        spell_save_dc: 0,
        spell_attack_bonus: 0,
        slots_used: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        prepared: [],
        known: []
      },
      story: {
        traits: '', ideals: '', bonds: '', flaws: '', backstory: '', notes: ''
      },
      appearance: {
        description: '',
        image: null
      },
      custom: {
        features: [],
        powers: [],
        notes: ''
      },
      features_traits: [],
      languages: [],
      proficiency_bonus: 2
    };
  }
};
