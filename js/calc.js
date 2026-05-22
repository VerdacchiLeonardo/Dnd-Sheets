// D&D 5e Calculations Engine

const Calc = {
  modifier(score) {
    return Math.floor((score - 10) / 2);
  },

  modStr(score) {
    const m = this.modifier(score);
    return (m >= 0 ? '+' : '') + m;
  },

  proficiencyBonus(level) {
    return DND.PROFICIENCY_BONUS[Math.max(1, Math.min(20, level))] || 2;
  },

  maxHP(character) {
    const cls = DND.CLASSES[character.identity.class];
    if (!cls) return 0;
    const hd = cls.hit_die;
    const conMod = this.modifier(character.abilities.con);
    const lvl = character.identity.level || 1;
    const level1HP = hd + conMod;
    const perLevel = Math.floor(hd / 2) + 1 + conMod;
    return Math.max(1, level1HP + (lvl - 1) * perLevel);
  },

  ac(character) {
    if (character.combat.custom_ac) return character.combat.custom_ac;
    const cls = DND.CLASSES[character.identity.class];
    const dexMod = this.modifier(character.abilities.dex);
    const conMod = this.modifier(character.abilities.con);
    const wisMod = this.modifier(character.abilities.wis);

    if (character.combat.armor_type === '') {
      const unarmoredDefense = cls ? cls.unarmored_defense : null;
      if (unarmoredDefense === '10 + DEX + CON') return 10 + dexMod + conMod;
      if (unarmoredDefense === '10 + DEX + WIS') return 10 + dexMod + wisMod;
      return 10 + dexMod;
    }

    const armorAC = character.combat.armor_ac || 10;
    const armorData = this.findArmor(character.combat.armor_type);
    let ac = armorAC;

    if (armorData) {
      if (armorData.category === 'light') ac = armorData.ac + dexMod;
      else if (armorData.category === 'medium') ac = armorData.ac + Math.min(dexMod, 2);
      else ac = armorData.ac;
    }

    if (character.combat.shield) ac += 2;
    return ac;
  },

  findArmor(name) {
    for (const [cat, list] of Object.entries(DND.ARMOR)) {
      const found = list.find(a => a.name === name);
      if (found) return { ...found, category: cat };
    }
    return null;
  },

  initiative(character) {
    return this.modifier(character.abilities.dex) + (character.combat.initiative_bonus || 0);
  },

  savingThrow(character, ability) {
    const base = this.modifier(character.abilities[ability]);
    const prof = character.saving_throw_proficiencies || [];
    const hasProficiency = prof.includes(ability);
    const pb = this.proficiencyBonus(character.identity.level);
    return base + (hasProficiency ? pb : 0);
  },

  skillBonus(character, skillName) {
    const skill = DND.SKILLS.find(s => s.name === skillName);
    if (!skill) return 0;
    const base = this.modifier(character.abilities[skill.ability]);
    const pb = this.proficiencyBonus(character.identity.level);
    const prof = character.skill_proficiencies || [];
    const expertise = character.skills || {};
    if (expertise[skillName] === 'expertise') return base + pb * 2;
    if (prof.includes(skillName)) return base + pb;
    return base;
  },

  passivePerception(character) {
    return 10 + this.skillBonus(character, 'Percezione');
  },

  spellSaveDC(character) {
    const cls = DND.CLASSES[character.identity.class];
    if (!cls || !cls.spellcasting) return 0;
    const ability = cls.spellcasting.ability;
    const pb = this.proficiencyBonus(character.identity.level);
    return 8 + pb + this.modifier(character.abilities[ability]);
  },

  spellAttackBonus(character) {
    const cls = DND.CLASSES[character.identity.class];
    if (!cls || !cls.spellcasting) return 0;
    const ability = cls.spellcasting.ability;
    const pb = this.proficiencyBonus(character.identity.level);
    return pb + this.modifier(character.abilities[ability]);
  },

  isSpellcaster(character) {
    const cls = DND.CLASSES[character.identity.class];
    return !!(cls && cls.spellcasting);
  },

  spellSlots(character) {
    const cls = DND.CLASSES[character.identity.class];
    if (!cls || !cls.spellcasting) return null;
    const lvl = character.identity.level || 1;
    if (character.identity.class === 'Warlock') {
      return DND.WARLOCK_SPELL_SLOTS[lvl];
    }
    return DND.SPELL_SLOTS[lvl];
  },

  getClassSpells(className) {
    const spells = {};
    for (const [level, list] of Object.entries(DND.SPELLS)) {
      spells[level] = list.filter(s => s.classes.includes(className));
    }
    return spells;
  },

  abilityScoreImprovements(level) {
    const improvements = [4, 8, 12, 16, 19];
    return improvements.filter(l => l <= level).length;
  },

  autoCalculate(character) {
    const level = character.identity.level || 1;
    character.proficiency_bonus = this.proficiencyBonus(level);

    if (character.identity.class) {
      const cls = DND.CLASSES[character.identity.class];
      if (cls) {
        if (!character.combat.max_hp) {
          character.combat.max_hp = this.maxHP(character);
          if (!character.combat.current_hp) {
            character.combat.current_hp = character.combat.max_hp;
          }
        }
        character.combat.ac_calculated = this.ac(character);
        character.combat.initiative_calculated = this.initiative(character);

        if (!character.saving_throw_proficiencies || character.saving_throw_proficiencies.length === 0) {
          character.saving_throw_proficiencies = [...cls.saving_throws];
        }
      }
    }

    if (character.identity.race) {
      const race = DND.RACES[character.identity.race];
      if (race) {
        if (!character.combat.speed) character.combat.speed = race.speed || 30;
        if (!character.languages || character.languages.length === 0) {
          character.languages = [...(race.languages || ['Comune'])];
        }
      }
    }

    if (character.identity.class && character.identity.background) {
      const bg = DND.BACKGROUNDS[character.identity.background];
      const cls = DND.CLASSES[character.identity.class];
      const merged = new Set([
        ...(character.skill_proficiencies || []),
        ...(bg ? bg.skill_proficiencies : []),
        ...(cls ? (cls.skill_choices?.from === 'any' ? [] : []) : [])
      ]);
      character.skill_proficiencies = [...merged];
    }

    if (this.isSpellcaster(character)) {
      character.spells.spell_save_dc = this.spellSaveDC(character);
      character.spells.spell_attack_bonus = this.spellAttackBonus(character);
    }

    return character;
  },

  getPointBuyCost(scores) {
    return Object.values(scores).reduce((total, score) => {
      return total + (DND.POINT_BUY_COSTS[score] || 0);
    }, 0);
  },

  getHitDie(className) {
    return DND.CLASSES[className]?.hit_die || 8;
  },

  getRacialBonuses(raceName, subraceName) {
    const race = DND.RACES[raceName];
    if (!race) return {};
    let bonuses = { ...(race.ability_bonus || {}) };
    if (subraceName && race.subraces?.[subraceName]) {
      const sub = race.subraces[subraceName];
      for (const [k, v] of Object.entries(sub.ability_bonus || {})) {
        bonuses[k] = (bonuses[k] || 0) + v;
      }
    }
    return bonuses;
  },

  applyRacialBonuses(baseScores, raceName, subraceName) {
    const bonuses = this.getRacialBonuses(raceName, subraceName);
    const result = { ...baseScores };
    for (const [ability, bonus] of Object.entries(bonuses)) {
      if (ability !== 'two_of_choice' && result[ability] !== undefined) {
        result[ability] += bonus;
      }
    }
    return result;
  }
};
