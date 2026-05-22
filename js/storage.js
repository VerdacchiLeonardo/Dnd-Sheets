// User & Character Storage (localStorage-based, multi-user)

const Storage = {
  KEYS: {
    currentUser: 'dnd_current_user',
    users: 'dnd_users',
    characters: (user) => `dnd_characters_${user}`
  },

  getCurrentUser() {
    return localStorage.getItem(this.KEYS.currentUser);
  },

  setCurrentUser(username) {
    if (!username) return false;
    const clean = username.trim().toLowerCase().replace(/[^a-z0-9_\-àèìòù]/gi, '');
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

  logout() {
    localStorage.removeItem(this.KEYS.currentUser);
  },

  cleanUsername(name) {
    return (name || '').trim().toLowerCase().replace(/[^a-z0-9_\-àèìòù ]/gi, '').trim();
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
    if (this.getCurrentUser() === name) this.logout();
    return true;
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
