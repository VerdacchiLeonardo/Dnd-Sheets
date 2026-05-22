// D&D 5e Complete Data - following 5etools / SRD rules

const DND = {

  ABILITY_NAMES: {
    str: 'Forza', dex: 'Destrezza', con: 'Costituzione',
    int: 'Intelligenza', wis: 'Saggezza', cha: 'Carisma'
  },

  ALIGNMENTS: [
    'Legale Buono', 'Neutrale Buono', 'Caotico Buono',
    'Legale Neutrale', 'Neutrale', 'Caotico Neutrale',
    'Legale Malvagio', 'Neutrale Malvagio', 'Caotico Malvagio'
  ],

  SIZES: ['Minuscolo', 'Piccolo', 'Medio', 'Grande', 'Enorme', 'Colossale'],

  LANGUAGES: [
    'Comune', 'Nano', 'Elfico', 'Gigante', 'Gnomesco', 'Goblin',
    'Halfling', 'Orchesco', 'Abissale', 'Celeste', 'Draconico',
    'Infernale', 'Primordiale', 'Silvano', 'Sottocomune'
  ],

  SKILLS: [
    { name: 'Acrobazia',         ability: 'dex', description: 'Equilibrio, capriole, movimenti acrobatici' },
    { name: 'Addestrare Animali',ability: 'wis', description: 'Calmare, addestrare e capire animali' },
    { name: 'Arcano',            ability: 'int', description: 'Magia, oggetti magici, piani di esistenza' },
    { name: 'Atletica',          ability: 'str', description: 'Scalare, saltare, nuotare, lottare' },
    { name: 'Furtività',         ability: 'dex', description: 'Nascondersi, muoversi silenziosamente' },
    { name: 'Indagare',          ability: 'int', description: 'Cercare indizi, ragionamento deduttivo' },
    { name: 'Inganno',           ability: 'cha', description: 'Mentire, camuffarsi, ingannare' },
    { name: 'Intimidire',        ability: 'cha', description: 'Spaventare, minacciare, coercizione' },
    { name: 'Intuizione',        ability: 'wis', description: 'Leggere le intenzioni altrui' },
    { name: 'Medicina',          ability: 'wis', description: 'Stabilizzare morenti, diagnosi' },
    { name: 'Natura',            ability: 'int', description: 'Animali, piante, terreni, tempo' },
    { name: 'Percezione',        ability: 'wis', description: 'Notare, ascoltare, individuare' },
    { name: 'Performance',       ability: 'cha', description: 'Cantare, suonare, recitare' },
    { name: 'Persuasione',       ability: 'cha', description: 'Influenzare diplomaticamente' },
    { name: 'Religione',         ability: 'int', description: 'Divinità, riti, simboli sacri' },
    { name: 'Rapidità di Mano',  ability: 'dex', description: 'Borseggiare, prestidigitazione' },
    { name: 'Storia',            ability: 'int', description: 'Personaggi storici, eventi, leggende' },
    { name: 'Sopravvivenza',     ability: 'wis', description: 'Seguire tracce, cacciare, navigare' }
  ],

  PROFICIENCY_BONUS: [0, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6],

  POINT_BUY_COSTS: { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 },
  STANDARD_ARRAY: [15, 14, 13, 12, 10, 8],

  RACES: {
    'Umano': {
      description: 'Versatili e ambiziosi, gli umani si adattano a qualsiasi ruolo e prosperano ovunque.',
      speed: 30,
      size: 'Medio',
      ability_bonus: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
      traits: ['Versatilità: una competenza aggiuntiva a scelta', 'Una lingua aggiuntiva a scelta'],
      languages: ['Comune', 'a scelta'],
      subraces: null
    },
    'Umano (Variante)': {
      description: 'Variante opzionale degli umani con un talento aggiuntivo.',
      speed: 30,
      size: 'Medio',
      ability_bonus: { two_of_choice: 1 },
      traits: ['Versatilità: una competenza aggiuntiva', 'Un talento a scelta al 1° livello'],
      languages: ['Comune', 'a scelta'],
      subraces: null
    },
    'Elfo': {
      description: 'Creature magiche di un mondo lontano, gli elfi amano natura, arte e magia.',
      speed: 30,
      size: 'Medio',
      ability_bonus: { dex: 2 },
      traits: ['Sensi Acuti (Percezione competente)', 'Lignaggio Fatato (vantaggio contro charme, immunità al sonno magico)', 'Trance (meditazione 4 ore)'],
      languages: ['Comune', 'Elfico'],
      subraces: {
        'Alto Elfo': { ability_bonus: { int: 1 }, traits: ['Addestramento con le Armi degli Elfi', 'Trucchetto da Mago', 'Lingua aggiuntiva'] },
        'Elfo dei Boschi': { ability_bonus: { wis: 1 }, traits: ['Addestramento con le Armi degli Elfi', 'Velocità +5 (35ft)', 'Mascheratura nella Natura'] },
        'Drow': { ability_bonus: { cha: 1 }, traits: ['Visione Superiore nel Buio', 'Sensibilità alla Luce del Sole', 'Magia Drow (Luci Danzanti, Luce delle Fate, Oscurità)'] }
      }
    },
    'Nano': {
      description: 'Audaci e resistenti, i nani sono guerrieri e artigiani nati.',
      speed: 25,
      size: 'Medio',
      ability_bonus: { con: 2 },
      traits: ['Visione nel Buio', 'Resistenza dei Nani (vantaggio vs veleno)', 'Addestramento con le Armi dei Nani', 'Competenza con Strumenti', 'Conoscenza della Pietra'],
      languages: ['Comune', 'Nano'],
      subraces: {
        'Nano Collinare': { ability_bonus: { wis: 1 }, traits: ['Tenacia dei Nani (+1 PF per livello)'] },
        'Nano delle Montagne': { ability_bonus: { str: 2 }, traits: ['Addestramento con l\'Armatura dei Nani'] }
      }
    },
    'Halfling': {
      description: 'Piccoli e instancabilmente allegri, gli halfling sono resilienti e pieni di risorse.',
      speed: 25,
      size: 'Piccolo',
      ability_bonus: { dex: 2 },
      traits: ['Fortunato (ritira 1 su attacco/caratteristica/tiro salvezza)', 'Valoroso (vantaggio vs paura)', 'Agilità degli Halfling (può muoversi tra creature più grandi)'],
      languages: ['Comune', 'Halfling'],
      subraces: {
        'Halfling Piedelesto': { ability_bonus: { cha: 1 }, traits: ['Furtività Naturale'] },
        'Halfling Robusto': { ability_bonus: { con: 1 }, traits: ['Robustezza (vantaggio vs veleno, resistenza danni da veleno)'] }
      }
    },
    'Gnomo': {
      description: 'Piccoli e curiosi, i gnomi sono inventori instancabili e amanti della magia.',
      speed: 25,
      size: 'Piccolo',
      ability_bonus: { int: 2 },
      traits: ['Visione nel Buio', 'Astuzia Gnoma (vantaggio su Intelligenza/Saggezza/Carisma vs magia)'],
      languages: ['Comune', 'Gnomesco'],
      subraces: {
        'Gnomo delle Foreste': { ability_bonus: { dex: 1 }, traits: ['Illusionismo Naturale', 'Parlare con i Piccoli Animali'] },
        'Gnomo delle Rocce': { ability_bonus: { con: 1 }, traits: ['Conoscenza degli Artificieri', 'Fabbricante'] }
      }
    },
    'Mezzelfo': {
      description: 'Dotati del fascino degli elfi e dell\'adattabilità umana, i mezzelfi prosperano tra entrambi i mondi.',
      speed: 30,
      size: 'Medio',
      ability_bonus: { cha: 2, two_of_choice: 1 },
      traits: ['Visione nel Buio', 'Sangue Fatato (vantaggio vs charme, immunità sonno magico)', 'Versatilità: due competenze a scelta'],
      languages: ['Comune', 'Elfico', 'a scelta'],
      subraces: null
    },
    'Mezzorco': {
      description: 'I mezzorchi ereditano forza fisica e ferocia dagli orchi, temperata dall\'umanità.',
      speed: 30,
      size: 'Medio',
      ability_bonus: { str: 2, con: 1 },
      traits: ['Visione nel Buio', 'Minaccioso (competenza in Intimidire)', 'Resistenza Implacabile (1/riposo lungo, scendi a 1 PF invece di 0)', 'Attacchi Selvaggi (dado extra ai critici con armi da mischia)'],
      languages: ['Comune', 'Orchesco'],
      subraces: null
    },
    'Tiefling': {
      description: 'Con ascendenza infernale, i tiefling recano i segni del male ma forgiamo il proprio destino.',
      speed: 30,
      size: 'Medio',
      ability_bonus: { int: 1, cha: 2 },
      traits: ['Visione nel Buio', 'Resistenza Infernale (resistenza ai danni da fuoco)', 'Magia Infernale (Luce delle Fate, Scrittura Infernale, Porta dell\'Inferno)'],
      languages: ['Comune', 'Infernale'],
      subraces: null
    },
    'Dragonide': {
      description: 'Nati dal drago potente del dio-dragone, i dragonidi camminano con orgoglio.',
      speed: 30,
      size: 'Medio',
      ability_bonus: { str: 2, cha: 1 },
      traits: ['Tipo di Drago e Resistenza (a scelta)', 'Arma del Respiro (basata sul tipo)', 'Resistenza ai Danni del Tipo Draconico'],
      languages: ['Comune', 'Draconico'],
      dragon_types: {
        'Nero': { damage: 'Acido', breath: 'Linea 5x30ft' },
        'Blu': { damage: 'Fulmine', breath: 'Linea 5x30ft' },
        'Ottone': { damage: 'Fuoco', breath: 'Linea 5x30ft' },
        'Bronzo': { damage: 'Fulmine', breath: 'Linea 5x30ft' },
        'Rame': { damage: 'Acido', breath: 'Linea 5x30ft' },
        'Oro': { damage: 'Fuoco', breath: 'Cono 15ft' },
        'Verde': { damage: 'Veleno', breath: 'Cono 15ft' },
        'Rosso': { damage: 'Fuoco', breath: 'Cono 15ft' },
        'Argento': { damage: 'Freddo', breath: 'Cono 15ft' },
        'Bianco': { damage: 'Freddo', breath: 'Cono 15ft' }
      },
      subraces: null
    },
    'Aarakocra': {
      description: 'Creature alate native dei piani elementali dell\'aria.',
      speed: 25,
      fly_speed: 50,
      size: 'Medio',
      ability_bonus: { dex: 2, wis: 1 },
      traits: ['Volo (50ft, non con armatura media/pesante)', 'Artigli (1d4 danni taglienti)', 'Lingua degli Uccelli'],
      languages: ['Comune', 'Aarakocra', 'Auran'],
      subraces: null
    },
    'Aasimar': {
      description: 'Discendenti da esseri celesti, gli aasimar portano la luce divina nel mondo.',
      speed: 30,
      size: 'Medio',
      ability_bonus: { cha: 2 },
      traits: ['Visione nel Buio', 'Resistenza Celeste (resistenza a danni necrotici e radianti)', 'Guarigione delle Mani (1/riposo lungo, cura 1d4+livello)'],
      languages: ['Comune', 'Celeste'],
      subraces: {
        'Protettore': { ability_bonus: { wis: 1 }, traits: ['Radiance of the Dawn', 'Forma Angelica (ali e aura radiante)'] },
        'Flagello': { ability_bonus: { str: 1 }, traits: ['Necrotic Shroud'] },
        'Visionario': { ability_bonus: { int: 1 }, traits: ['Iluminare l\'Oscurità'] }
      }
    },
    'Tabaxi': {
      description: 'Felini curiosi dal lontano oriente, cacciatori e raccoglitori di storie.',
      speed: 30,
      climb_speed: 20,
      size: 'Medio',
      ability_bonus: { dex: 2, cha: 1 },
      traits: ['Visione nel Buio', 'Artigli del Felino (1d4 taglienti, scalare)', 'Piedi di Gatto (Acrobazia/Furtività)'],
      languages: ['Comune', 'più una a scelta'],
      subraces: null
    }
  },

  CLASSES: {
    'Barbaro': {
      description: 'Un fiero guerriero primitivo che può entrare in un feroce stato di furia da combattimento.',
      hit_die: 12,
      primary_ability: ['str'],
      saving_throws: ['str', 'con'],
      armor_proficiencies: ['Armature Leggere', 'Armature Medie', 'Scudi'],
      weapon_proficiencies: ['Armi Semplici', 'Armi da Guerra'],
      tool_proficiencies: [],
      skill_choices: { count: 2, from: ['Addestrare Animali', 'Atletica', 'Intimidire', 'Natura', 'Percezione', 'Sopravvivenza'] },
      spellcasting: null,
      hit_points: { level1: 12, per_level: 7 },
      features: {
        1: ['Furia (2/riposo lungo)', 'Difesa Senza Armatura (10+DEX+CON)'],
        2: ['Attacco Sconsiderato', 'Senso del Pericolo'],
        3: ['Percorso Primitivo'],
        4: ['Miglioramento Punteggio'],
        5: ['Attacco Supplementare', 'Attacco Veloce'],
        7: ['Istinto Ferale'],
        9: ['Critico Brutale (1 dado)'],
        11: ['Furia Senza Limiti'],
        13: ['Critico Brutale (2 dadi)'],
        15: ['Spirito Persistente'],
        17: ['Critico Brutale (3 dadi)'],
        20: ['Bestia Primordiale']
      },
      subclasses: {
        name: 'Percorso Primitivo',
        choices: ['Percorso del Berserker', 'Percorso del Guerriero Totemico', 'Percorso degli Araldi della Tempesta', 'Percorso del Guerriero Ancestrale', 'Percorso della Bestia']
      },
      starting_equipment: ['Ascia Bipenne o 2 Asce', 'Asce da lancio (4)', 'Zaino dell\'Esploratore o Zaino del Dungeoneer'],
      unarmored_defense: '10 + DEX + CON'
    },

    'Bardo': {
      description: 'Un cantore ispirato capace di manipolare le menti, curare le ferite e sguainare la lama.',
      hit_die: 8,
      primary_ability: ['cha'],
      saving_throws: ['dex', 'cha'],
      armor_proficiencies: ['Armature Leggere'],
      weapon_proficiencies: ['Armi Semplici', 'Balestrini', 'Spade Corte', 'Spade Lunghe', 'Stocchi'],
      tool_proficiencies: ['3 strumenti musicali a scelta'],
      skill_choices: { count: 3, from: 'any' },
      spellcasting: { ability: 'cha', type: 'known', cantrips: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4] },
      hit_points: { level1: 8, per_level: 5 },
      features: {
        1: ['Incantesimi', 'Ispirazione Bardica (dado d6)'],
        2: ['Canto di Riposo (d6)', 'Tuttofare (+metà proficiency)'],
        3: ['Collegio Bardico', 'Competenze Supplementari'],
        5: ['Ispirazione Bardica (d8)', 'Flusso di Magia'],
        6: ['Competenze Supplementari'],
        7: ['Segreto Magico'],
        10: ['Ispirazione Bardica (d10)', 'Magia Magica'],
        14: ['Segreto Magico'],
        15: ['Ispirazione Bardica (d12)'],
        20: ['Superiore']
      },
      subclasses: {
        name: 'Collegio Bardico',
        choices: ['Collegio della Conoscenza', 'Collegio della Valoria', 'Collegio del Glamour', 'Collegio dei Sussurri', 'Collegio della Creazione', 'Collegio dell\'Eloquenza']
      },
      starting_equipment: ['Stocco, Spada Lunga o Arma Semplice', 'Pacchetto del Diplomatico o Pacchetto dello Spettacolo', 'Liuto o Altro Strumento', 'Armatura di Cuoio', 'Pugnale']
    },

    'Chierico': {
      description: 'Un ministro di un dio, che usa la magia divina al servizio di una divinità superiore.',
      hit_die: 8,
      primary_ability: ['wis'],
      saving_throws: ['wis', 'cha'],
      armor_proficiencies: ['Armature Leggere', 'Armature Medie', 'Scudi'],
      weapon_proficiencies: ['Armi Semplici'],
      tool_proficiencies: [],
      skill_choices: { count: 2, from: ['Storia', 'Intuizione', 'Medicina', 'Persuasione', 'Religione'] },
      spellcasting: { ability: 'wis', type: 'prepared', cantrips: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5] },
      hit_points: { level1: 8, per_level: 5 },
      features: {
        1: ['Dominio Divino', 'Incantesimi'],
        2: ['Intervento del Canale Divino (1/riposo)', 'Rituali'],
        5: ['Distruggi Non Morti'],
        10: ['Intervento Divino']
      },
      subclasses: {
        name: 'Dominio Divino',
        choices: ['Vita', 'Luce', 'Trucchi', 'Tempesta', 'Guerra', 'Natura', 'Conoscenza', 'Inganno', 'Ordine', 'Pace', 'Crepuscolo', 'Forgia']
      },
      starting_equipment: ['Mazza o Martello da Guerra', 'Armatura di Squame, Corazza o Armatura di Cuoio', 'Balestra Leggera (20 dardi) o Arma Semplice', 'Pacchetto del Sacerdote o Pacchetto dell\'Esploratore', 'Scudo e Simbolo Sacro']
    },

    'Druido': {
      description: 'Un sacerdote della natura antica che usa magia elementare e assume forme animali.',
      hit_die: 8,
      primary_ability: ['wis'],
      saving_throws: ['int', 'wis'],
      armor_proficiencies: ['Armature Leggere', 'Armature Medie', 'Scudi (no metallo)'],
      weapon_proficiencies: ['Randelli', 'Pugnali', 'Giavellotti', 'Mazze', 'Bastoni', 'Scimitarre', 'Fionde', 'Lance'],
      tool_proficiencies: ['Forniture per Erborista'],
      skill_choices: { count: 2, from: ['Arcano', 'Addestrare Animali', 'Intuizione', 'Medicina', 'Natura', 'Percezione', 'Religione', 'Sopravvivenza'] },
      spellcasting: { ability: 'wis', type: 'prepared', cantrips: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4] },
      hit_points: { level1: 8, per_level: 5 },
      features: {
        1: ['Druido', 'Incantesimi'],
        2: ['Forma Selvatica', 'Circolo Druidico'],
        18: ['Forma Selvatica Bestiale'],
        20: ['Arcidruido']
      },
      subclasses: {
        name: 'Circolo Druidico',
        choices: ['Circolo della Terra', 'Circolo della Luna', 'Circolo della Stella', 'Circolo degli Spori', 'Circolo degli Incendi Selvaggi', 'Circolo del Pastore']
      },
      starting_equipment: ['Scudo di Legno o Arma Semplice', 'Scimitarra o Arma da Mischia Semplice', 'Pacchetto dell\'Esploratore', 'Vestiti da Druido', 'Focus Druidico']
    },

    'Guerriero': {
      description: 'Un maestro del combattimento che può padroneggiare tutte le armi e le armature.',
      hit_die: 10,
      primary_ability: ['str', 'dex'],
      saving_throws: ['str', 'con'],
      armor_proficiencies: ['Tutte le Armature', 'Scudi'],
      weapon_proficiencies: ['Armi Semplici', 'Armi da Guerra'],
      tool_proficiencies: [],
      skill_choices: { count: 2, from: ['Acrobazia', 'Addestrare Animali', 'Atletica', 'Storia', 'Intuizione', 'Intimidire', 'Percezione', 'Sopravvivenza'] },
      spellcasting: null,
      hit_points: { level1: 10, per_level: 6 },
      features: {
        1: ['Stile di Combattimento', 'Secondo Fiato (1d10+livello/riposo corto)'],
        2: ['Azione Impetuosa (1/riposo corto)'],
        3: ['Archetipo del Guerriero'],
        4: ['Miglioramento Punteggio'],
        5: ['Attacco Supplementare (2 attacchi)'],
        7: ['Capacità dell\'Archetipo'],
        9: ['Indurimento'],
        11: ['Attacco Supplementare (3 attacchi)'],
        15: ['Difensore Indomabile'],
        20: ['Attacco Supplementare (4 attacchi)']
      },
      subclasses: {
        name: 'Archetipo del Guerriero',
        choices: ['Campione', 'Cavaliere Mistico', 'Arciere Arcano', 'Cavaliere di Samurai', 'Guerriero Psionico', 'Banneret', 'Guerriero della Runa']
      },
      starting_equipment: ['Armatura di Squame o Armatura di Cuoio', 'Martello da Guerra o Arma da Guerra', 'Balestra Pesante e 20 dardi o 2 Asce', 'Pacchetto del Dungeon o Pacchetto dell\'Esploratore']
    },

    'Monaco': {
      description: 'Un maestro delle arti marziali che sfrutta ki interiore per potenti attacchi.',
      hit_die: 8,
      primary_ability: ['dex', 'wis'],
      saving_throws: ['str', 'dex'],
      armor_proficiencies: [],
      weapon_proficiencies: ['Armi Semplici', 'Spade Corte'],
      tool_proficiencies: ['Uno strumento artigianale o strumento musicale'],
      skill_choices: { count: 2, from: ['Acrobazia', 'Atletica', 'Storia', 'Intuizione', 'Religione', 'Furtività'] },
      spellcasting: null,
      hit_points: { level1: 8, per_level: 5 },
      features: {
        1: ['Difesa Senza Armatura (10+DEX+WIS)', 'Arti Marziali'],
        2: ['Ki (2 punti)', 'Movimento Senza Armatura (+10ft)'],
        3: ['Tradizione Monastica', 'Deflessione Proiettili'],
        4: ['Caduta Lenta'],
        5: ['Attacco Supplementare', 'Colpo Stordente'],
        7: ['Riflessività', 'Calma di Mente'],
        10: ['Purezza del Corpo'],
        13: ['Lingua del Sole e della Luna'],
        14: ['Anima di Diamante'],
        15: ['Mente Senza Età'],
        18: ['Corpo di Spirito Vuoto'],
        20: ['Perfezione del Sé']
      },
      subclasses: {
        name: 'Tradizione Monastica',
        choices: ['Via della Mano Aperta', 'Via dell\'Ombra', 'Via degli Elementi', 'Via del Mago del Sole', 'Via della Misericordia', 'Via dell\'Anima Astrale']
      },
      starting_equipment: ['Spada Corta o Arma Semplice', 'Pacchetto del Dungeoneer o Pacchetto dell\'Esploratore', '10 dardi'],
      unarmored_defense: '10 + DEX + WIS'
    },

    'Paladino': {
      description: 'Un guerriero sacro vincolato a un giuramento e potenziato dalla forza divina.',
      hit_die: 10,
      primary_ability: ['str', 'cha'],
      saving_throws: ['wis', 'cha'],
      armor_proficiencies: ['Tutte le Armature', 'Scudi'],
      weapon_proficiencies: ['Armi Semplici', 'Armi da Guerra'],
      tool_proficiencies: [],
      skill_choices: { count: 2, from: ['Atletica', 'Intuizione', 'Intimidire', 'Medicina', 'Persuasione', 'Religione'] },
      spellcasting: { ability: 'cha', type: 'prepared' },
      hit_points: { level1: 10, per_level: 6 },
      features: {
        1: ['Rilevamento del Divino', 'Imposizione delle Mani (5x livello PF/riposo lungo)'],
        2: ['Combattimento Divino', 'Incantesimi', 'Smitare Divino'],
        3: ['Consacrazione del Paladino', 'Salute Divina'],
        5: ['Attacco Supplementare'],
        6: ['Aura di Protezione (+CHA TS entro 10ft)'],
        7: ['Caratteristica del Giuramento Sacro'],
        10: ['Aura del Coraggio (immunità paura entro 10ft)'],
        11: ['Smitare Divino Migliorato'],
        14: ['Purificazione del Tocco']
      },
      subclasses: {
        name: 'Giuramento Sacro',
        choices: ['Giuramento della Devozione', 'Giuramento degli Antichi', 'Giuramento della Conquista', 'Giuramento della Corona', 'Giuramento della Gloria', 'Giuramento della Redenzione', 'Giuramento della Vendetta', 'Giuramento degli Osservatori']
      },
      starting_equipment: ['Martello da Guerra o Arma da Guerra', 'Armatura a Catena', 'Giavellotti (5) o Arma Semplice', 'Pacchetto del Sacerdote o Pacchetto dell\'Esploratore', 'Scudo e Simbolo Sacro']
    },

    'Ranger': {
      description: 'Un cacciatore solitario che combatte i pericoli della frontiera usando natura e magia.',
      hit_die: 10,
      primary_ability: ['dex', 'wis'],
      saving_throws: ['str', 'dex'],
      armor_proficiencies: ['Armature Leggere', 'Armature Medie', 'Scudi'],
      weapon_proficiencies: ['Armi Semplici', 'Armi da Guerra'],
      tool_proficiencies: [],
      skill_choices: { count: 3, from: ['Addestrare Animali', 'Atletica', 'Intuizione', 'Indagare', 'Natura', 'Percezione', 'Furtività', 'Sopravvivenza'] },
      spellcasting: { ability: 'wis', type: 'known' },
      hit_points: { level1: 10, per_level: 6 },
      features: {
        1: ['Favorito della Natura', 'Terreni Naturali'],
        2: ['Stile di Combattimento', 'Incantesimi'],
        3: ['Archetipo del Ranger', 'Prontezza Primitiva'],
        5: ['Attacco Supplementare'],
        8: ['Spostamento nella Terra'],
        10: ['Nascondersi in Vista'],
        14: ['Scomparire']
      },
      subclasses: {
        name: 'Archetipo del Ranger',
        choices: ['Cacciatore', 'Mastro delle Bestie', 'Ranger del Confine', 'Cacciatore dei Mostri', 'Ranger dell\'Orda', 'Ranger del Feydale']
      },
      starting_equipment: ['Armatura di Squame o Armatura di Cuoio', 'Spade Corte (2) o Armi da Mischia Semplici (2)', 'Pacchetto del Dungeoneer o Pacchetto dell\'Esploratore', 'Arco Lungo e 20 Frecce']
    },

    'Ladro': {
      description: 'Un destriero astuto che usa la furtività e l\'inganno per superare gli ostacoli.',
      hit_die: 8,
      primary_ability: ['dex'],
      saving_throws: ['dex', 'int'],
      armor_proficiencies: ['Armature Leggere'],
      weapon_proficiencies: ['Armi Semplici', 'Balestrini', 'Spade Lunghe', 'Stocchi', 'Spade Corte'],
      tool_proficiencies: ['Attrezzi da Scasso'],
      skill_choices: { count: 4, from: ['Acrobazia', 'Atletica', 'Inganno', 'Intuizione', 'Intimidire', 'Indagare', 'Percezione', 'Performance', 'Persuasione', 'Rapidità di Mano', 'Furtività'] },
      spellcasting: null,
      hit_points: { level1: 8, per_level: 5 },
      features: {
        1: ['Colpo Furtivo (1d6)', 'Gergo dei Ladri', 'Competenza Specializzata'],
        2: ['Azione Ingegnosa'],
        3: ['Archetipo del Ladro'],
        5: ['Attacco Senza Risposta'],
        7: ['Riflessi Evasivi'],
        11: ['Mente Affidabile'],
        14: ['Vista Cieca'],
        18: ['Posizione della Mente'],
        20: ['Colpo di Rara']
      },
      subclasses: {
        name: 'Archetipo del Ladro',
        choices: ['Imbroglione', 'Assassino', 'Mente Arcana', 'Mistificatore', 'Fantasma', 'Ladro Soulknife']
      },
      starting_equipment: ['Stocco o Spada Corta', 'Arco Corto e 20 frecce o Spada Corta', 'Pacchetto del Burglar, Pacchetto del Dungeoneer o Pacchetto dell\'Esploratore', 'Armatura di Cuoio', 'Pugnali (2)', 'Attrezzi da Scasso']
    },

    'Stregone': {
      description: 'Un incantatore che trae magia innata dalla propria origine soprannaturale.',
      hit_die: 6,
      primary_ability: ['cha'],
      saving_throws: ['con', 'cha'],
      armor_proficiencies: [],
      weapon_proficiencies: ['Pugnali', 'Dardi', 'Fionde', 'Bastoni', 'Archi Corti'],
      tool_proficiencies: [],
      skill_choices: { count: 2, from: ['Arcano', 'Inganno', 'Intuizione', 'Intimidire', 'Persuasione', 'Religione'] },
      spellcasting: { ability: 'cha', type: 'known', cantrips: [4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6] },
      hit_points: { level1: 6, per_level: 4 },
      features: {
        1: ['Origine dello Stregone', 'Incantesimi'],
        2: ['Fonte di Magia', 'Punti Stregoneria'],
        3: ['Meta-magia'],
        20: ['Restaurazione dello Stregone']
      },
      subclasses: {
        name: 'Origine dello Stregone',
        choices: ['Discendenza Draconico', 'Anima Selvatica', 'Luogo Sacro', 'Ombra', 'Origine Divina', 'Aberrazione', 'Tempesta']
      },
      starting_equipment: ['Arco Corto e 20 Frecce o Arma Semplice', 'Sacca da Componenti o Focus Arcano', 'Pacchetto del Dungeoneer o Pacchetto dell\'Esploratore', 'Pugnali (2)']
    },

    'Warlock': {
      description: 'Un incantatore che ha stretto un patto con un essere extraplanare di immensa potenza.',
      hit_die: 8,
      primary_ability: ['cha'],
      saving_throws: ['wis', 'cha'],
      armor_proficiencies: ['Armature Leggere'],
      weapon_proficiencies: ['Armi Semplici'],
      tool_proficiencies: [],
      skill_choices: { count: 2, from: ['Arcano', 'Inganno', 'Storia', 'Intimidire', 'Indagare', 'Natura', 'Religione'] },
      spellcasting: { ability: 'cha', type: 'known', slot_type: 'pact', cantrips: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4] },
      hit_points: { level1: 8, per_level: 5 },
      features: {
        1: ['Patrono Extraplanare', 'Patto della Magia'],
        2: ['Invocazioni Eldritch'],
        3: ['Boon del Patto'],
        5: ['Invocazione Mistica'],
        11: ['Arcanum Mistico'],
        20: ['Maestro degli Eldritch']
      },
      subclasses: {
        name: 'Patrono Extraplanare',
        choices: ['Il Signore dell\'Abisso', 'Il Celestiale', 'Il Genie', 'Il Grande Antico', 'Il Fiend', 'La Lama Hexblade', 'Il Non Morto', 'Il Feywild']
      },
      starting_equipment: ['Arma Semplice (2)', 'Sacca da Componenti o Focus Arcano', 'Pacchetto dello Studioso o Pacchetto del Dungeoneer', 'Armatura di Cuoio', 'Armi Semplici (2)', 'Pugnale']
    },

    'Mago': {
      description: 'Un sapiente che canalizza la magia tramite studio approfondito dei misteri arcani.',
      hit_die: 6,
      primary_ability: ['int'],
      saving_throws: ['int', 'wis'],
      armor_proficiencies: [],
      weapon_proficiencies: ['Pugnali', 'Dardi', 'Fionde', 'Bastoni', 'Archi Corti'],
      tool_proficiencies: [],
      skill_choices: { count: 2, from: ['Arcano', 'Storia', 'Intuizione', 'Indagare', 'Medicina', 'Religione'] },
      spellcasting: { ability: 'int', type: 'prepared', cantrips: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5] },
      hit_points: { level1: 6, per_level: 4 },
      features: {
        1: ['Recupero Arcano', 'Incantesimi'],
        2: ['Tradizione Arcana'],
        18: ['Perfezione Incantesimi'],
        20: ['Firma degli Incantesimi']
      },
      subclasses: {
        name: 'Tradizione Arcana',
        choices: ['Scuola dell\'Evocazione', 'Scuola dell\'Illusione', 'Scuola della Necromanzia', 'Scuola della Divinazione', 'Scuola dell\'Ammaliamento', 'Scuola della Trasmutazione', 'Scuola dell\'Abiurazione', 'Scuola della Coniurazione', 'Ordine dello Scritta', 'Mago delle Cronache']
      },
      starting_equipment: ['Bastone o Pugnale', 'Sacca da Componenti o Focus Arcano', 'Pacchetto dello Studioso o Pacchetto dell\'Esploratore', 'Grimorio']
    },

    'Artificiere': {
      description: 'Un inventore che infonde magia negli oggetti, creando gadget e costrutti meccanici.',
      hit_die: 8,
      primary_ability: ['int'],
      saving_throws: ['con', 'int'],
      armor_proficiencies: ['Armature Leggere', 'Armature Medie', 'Scudi'],
      weapon_proficiencies: ['Armi Semplici'],
      tool_proficiencies: ['Attrezzi da Ladro', 'Attrezzi da Artigianato (2 a scelta)'],
      skill_choices: { count: 2, from: ['Arcano', 'Storia', 'Indagare', 'Medicina', 'Natura', 'Percezione', 'Rapidità di Mano'] },
      spellcasting: { ability: 'int', type: 'prepared' },
      hit_points: { level1: 8, per_level: 5 },
      features: {
        1: ['Maestria degli Attrezzi Magici', 'Incantesimi'],
        2: ['Infusioni'],
        3: ['Specializzazione dell\'Artificiere'],
        5: ['Attacco Supplementare'],
        6: ['Strumento dei Danni', 'Flash of Genius'],
        10: ['Conservazione della Magia'],
        11: ['Portabacchette'],
        14: ['Anima Magica'],
        20: ['Incantesimo dell\'Anima']
      },
      subclasses: {
        name: 'Specializzazione',
        choices: ['Alchimista', 'Artigliere', 'Fabbro da Battaglia', 'Armaiolo']
      },
      starting_equipment: ['Martello da Guerra', 'Armatura di Squame o Corazza', 'Balestra Leggera e 20 dardi', 'Pacchetto del Dungeoneer', 'Attrezzi da Artigianato (2)']
    }
  },

  BACKGROUNDS: {
    'Accolito': {
      description: 'Hai dedicato la vita al servizio di un tempio verso un dio o pantheon specifico.',
      skill_proficiencies: ['Intuizione', 'Religione'],
      tool_proficiencies: [],
      languages: 2,
      equipment: ['Simbolo sacro', 'Libro di preghiere', 'Incenso (5 bastoni)', 'Vesti', 'Borsa (15 mo)'],
      feature: 'Rifugio dei Fedeli: ricevi ospitalità nei templi della tua fede',
      traits: ['Porto la speranza nei cuori disperati.', 'Sono ispirato da una particolare reliquia, testo sacro o luogo.', 'Sono tollerante (o intollerante) verso le altre fedi.'],
      ideals: ['Tradizione', 'Carità', 'Cambiamento', 'Potere', 'Fede', 'Aspirazione'],
      bonds: ['Dedico la vita al servizio del tempio in cui crebbi.', 'Devo la mia vita al sacerdote che mi salvò da bambino.'],
      flaws: ['Giudico gli altri con durezza ma me stesso ancor più duramente.', 'Mi fido ciecamente in coloro in cui ho fede.']
    },
    'Impostore': {
      description: 'Hai sviluppato l\'abilità di assumere identità altrui — nuova nome, storia, personalità.',
      skill_proficiencies: ['Inganno', 'Rapidità di Mano'],
      tool_proficiencies: ['Kit del Travestimento', 'Attrezzi da Falsario'],
      languages: 0,
      equipment: ['Kit del travestimento', 'Attrezzi da falsario', 'Abiti particolari', 'Borsa (15 mo)'],
      feature: 'Identità Falsa: possiedi una seconda identità documentata',
      traits: ['Mi adatto facilmente alle persone che incontro.', 'Mi trovo a guardare sempre le possibili vie d\'uscita.'],
      ideals: ['Libertà', 'Controllo', 'Indipendenza', 'Protettore'],
      bonds: ['Devo denaro e lealtà al mio antico mentore.'],
      flaws: ['Non posso resistere alla sfida di un bel colpo.']
    },
    'Criminale': {
      description: 'Sei un criminale esperto con una storia di azioni al di là della legge.',
      skill_proficiencies: ['Inganno', 'Furtività'],
      tool_proficiencies: ['Un tipo di gioco', 'Attrezzi da Ladro'],
      languages: 0,
      equipment: ['Leva', 'Abiti scuri con cappuccio', 'Borsa (15 mo)'],
      feature: 'Contatto Criminale: hai un contatto affidabile in una rete criminale',
      traits: ['Vivo per il momento; non penso al futuro.', 'Il denaro — e ciò che può comprare — è ciò che è più importante per me.'],
      ideals: ['Honor', 'Libertà', 'Catena', 'Redenzione'],
      bonds: ['Sono in debito con il mio mentore per avermi salvato.'],
      flaws: ['Quando vedo qualcosa che voglio, lo prendo.']
    },
    'Intrattenitore': {
      description: 'Sei cresciuto davanti al pubblico, padroneggiando l\'arte dell\'intrattenimento.',
      skill_proficiencies: ['Acrobazia', 'Performance'],
      tool_proficiencies: ['Kit del Travestimento', 'Strumento musicale'],
      languages: 0,
      equipment: ['Strumento musicale', 'Favore di un ammiratore', 'Costume', 'Borsa (15 mo)'],
      feature: 'Per Volere Popolare: quando sei in una città, puoi facilmente trovare un posto dove esibirti',
      traits: ['Conosco una storia per ogni occasione.', 'Mi piacciono i bei vestiti quasi quanto mi piacciono le belle persone.'],
      ideals: ['Bellezza', 'Tradizione', 'Creatività', 'Avarizia'],
      bonds: ['Voglio essere famoso più di ogni altra cosa.'],
      flaws: ['Farei praticamente di tutto per seguire i miei desideri.']
    },
    'Eroe del Popolo': {
      description: 'Vieni da una comunità umile ma sei destinato a qualcosa di più grande.',
      skill_proficiencies: ['Addestrare Animali', 'Sopravvivenza'],
      tool_proficiencies: ['Un tipo di attrezzi artigianali', 'Veicoli (terrestri)'],
      languages: 0,
      equipment: ['Attrezzi artigianali', 'Pala', 'Pentola di ferro', 'Abiti comuni', 'Borsa (10 mo)'],
      feature: 'Ospitalità del Popolo: puoi trovare rifugio tra i comuni',
      traits: ['Giudico le persone per le loro azioni, non per le loro parole.', 'Non mi fido dei vecchi quando parlano come se avessero visto tutto.'],
      ideals: ['Rispetto', 'Equità', 'Libertà', 'Potere', 'Sincerità', 'Destino'],
      bonds: ['Ho una famiglia, ma non so dove si trovino adesso.'],
      flaws: ['La tirannia di qualunque tipo mi fa uscire dai gangheri.']
    },
    'Artigiano della Gilda': {
      description: 'Sei membro di una gilda artigianale, esperto in un particolare campo.',
      skill_proficiencies: ['Intuizione', 'Persuasione'],
      tool_proficiencies: ['Attrezzi artigianali (specifica)'],
      languages: 1,
      equipment: ['Attrezzi artigianali', 'Lettera di referenza della gilda', 'Abiti da viaggio', 'Borsa (15 mo)'],
      feature: 'Appartenenza alla Gilda: ricevi alloggio e assistenza dalla gilda',
      traits: ['Credo che tutto possa essere comprato, incluse la lealtà e l\'amicizia.', 'Sono bloccato se non lavoro secondo un piano.'],
      ideals: ['Comunità', 'Avidità', 'Persone', 'Tradizione', 'Aspirazione', 'Generosità'],
      bonds: ['Il mio laboratorio è la mia vita.'],
      flaws: ['Farei di tutto per ottenere un oggetto raro o prezioso.']
    },
    'Eremita': {
      description: 'Hai vissuto in isolamento per un lungo periodo di contemplazione.',
      skill_proficiencies: ['Medicina', 'Religione'],
      tool_proficiencies: ['Kit da Erborista'],
      languages: 1,
      equipment: ['Custodia da papiro', 'Coperta invernale', 'Abiti comuni', 'Kit da erborista', 'Borsa (5 mo)'],
      feature: 'Scoperta: la quiete della contemplazione ti ha dato accesso a qualcosa di importante',
      traits: ['Sono tormentato da visioni che sembrano profezie.', 'Sono abituato alla solitudine; il trambusto e le folle mi sopraffanno.'],
      ideals: ['Verità', 'Apertura mentale', 'Autenticità', 'Potere'],
      bonds: ['Ho cercato di risolvere il più grande dei problemi del mio tempo.'],
      flaws: ['Tendo a essere condiscendente verso quelli che non hanno raggiunto il mio livello di illuminazione spirituale.']
    },
    'Nobile': {
      description: 'Comprendi la ricchezza, il potere e il privilegio.',
      skill_proficiencies: ['Storia', 'Persuasione'],
      tool_proficiencies: ['Un tipo di gioco'],
      languages: 1,
      equipment: ['Abiti fini', 'Anello con sigillo', 'Pergamena dell\'albero genealogico', 'Borsa (25 mo)'],
      feature: 'Posizione Privilegiata: il tuo status ti garantisce un trattamento speciale',
      traits: ['Il mio apprezzamento per l\'arte è molto sofisticato.', 'Nascondo sempre le mie preoccupazioni con un sorriso calmo.'],
      ideals: ['Rispetto', 'Responsabilità', 'Indipendenza', 'Potere', 'Famiglia', 'Obbligo Nobile'],
      bonds: ['Sostegno la mia famiglia sopra ogni altra cosa.'],
      flaws: ['Non posso evitare di insistere sull\'etichetta.']
    },
    'Fuoristrada': {
      description: 'Sei cresciuto nelle terre selvagge, lontano dalla civilizzazione.',
      skill_proficiencies: ['Atletica', 'Sopravvivenza'],
      tool_proficiencies: ['Strumento musicale'],
      languages: 1,
      equipment: ['Bastone', 'Trappola per la caccia', 'Trofeo di caccia', 'Abiti da viaggio', 'Borsa (10 mo)'],
      feature: 'Vagabondo: hai un eccellente memoria per le mappe e la geografia',
      traits: ['Sono tormentato da ricordi di ciò che ho visto nelle terre selvagge.', 'Mi sono adattato a vivere in ambienti duri.'],
      ideals: ['Cambiamento', 'Forza Maggiore', 'Onore', 'Potere', 'Natura', 'Gloria'],
      bonds: ['Mio fratello/sorella in armi è la persona più importante della mia vita.'],
      flaws: ['Sono insensibile alle emozioni altrui.']
    },
    'Saggio': {
      description: 'Hai passato anni ad apprendere i segreti dell\'universo.',
      skill_proficiencies: ['Arcano', 'Storia'],
      tool_proficiencies: [],
      languages: 2,
      equipment: ['Bottiglia d\'inchiostro', 'Penna', 'Piccolo coltello', 'Lettera da un collega defunto', 'Abiti comuni', 'Borsa (10 mo)'],
      feature: 'Ricercatore: sai dove trovare informazioni',
      traits: ['Uso parole polisillabiche per trasmettere l\'impressione di grande erudizione.', 'Dimentico quando c\'è qualcuno di non intellettuale.'],
      ideals: ['Conoscenza', 'Bellezza', 'Logica', 'No ai Limiti', 'Potere', 'Bene Superiore'],
      bonds: ['La mia vita è stata segnata da un antico tomo.'],
      flaws: ['La maggior parte delle persone mi urla che sono distaccato.']
    },
    'Marinaio': {
      description: 'Hai navigato mari e oceani per anni.',
      skill_proficiencies: ['Atletica', 'Percezione'],
      tool_proficiencies: ['Kit del Navigatore', 'Veicoli (Acquatici)'],
      languages: 0,
      equipment: ['Cavo di 50 piedi', 'Amuleto portafortuna', 'Vestiti comuni', 'Borsa (10 mo)'],
      feature: 'Passaggio della Nave: hai un passaggio sicuro su navi mercantili',
      traits: ['Il mio linguaggio è rozzo quanto quelli degli scaricatori di porto.', 'Mi piace bere molto.'],
      ideals: ['Rispetto', 'Giustizia', 'Libertà', 'Fedeltà'],
      bonds: ['Ho giurato di proteggere la mia equipaggio.'],
      flaws: ['Ho un debito da pagare a un losco capitano.']
    },
    'Soldato': {
      description: 'Hai trascorso anni al servizio di un esercito.',
      skill_proficiencies: ['Atletica', 'Intimidire'],
      tool_proficiencies: ['Un tipo di gioco', 'Veicoli (Terrestri)'],
      languages: 0,
      equipment: ['Insegna militare', 'Trofeo di nemici uccisi', 'Dadi d\'osso o mazzo di carte', 'Abiti comuni', 'Borsa (10 mo)'],
      feature: 'Rango Militare: i soldati si riferiscono a te per il tuo rango passato',
      traits: ['Sono sempre gentile e rispettoso.', 'Mi trovo a fare piani per affrontare qualsiasi pericolo.'],
      ideals: ['Bene Superiore', 'Responsabilità', 'Indipendenza', 'Potere', 'Nazione', 'Gloria'],
      bonds: ['Farei tutto per proteggere chi ho servito insieme.'],
      flaws: ['Difficoltà a dimenticare le atrocità della guerra.']
    },
    'Monello': {
      description: 'Sei cresciuto nelle strade, affidandoti solo a te stesso.',
      skill_proficiencies: ['Rapidità di Mano', 'Furtività'],
      tool_proficiencies: ['Attrezzi da Ladro', 'Kit del Travestimento'],
      languages: 0,
      equipment: ['Piccolo coltello', 'Mappa della città', 'Ricordo della famiglia', 'Abiti logori', 'Borsa (10 mo)'],
      feature: 'Conoscenza delle Strade: conosci i quartieri pericolosi e i posti sicuri',
      traits: ['Mi identifico con i deboli e gli oppressi.', 'Sono sempre pronto ad approfittare della fortuna.'],
      ideals: ['Rispetto', 'Comunità', 'Cambiamento', 'Redenzione'],
      bonds: ['Mi identifico con i monelli della strada.'],
      flaws: ['È difficile per me fidarmi di qualcuno che non abbia dimostrato valore.']
    }
  },

  SPELL_SLOTS: {
    1:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
    2:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
    3:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
    4:  [4, 3, 0, 0, 0, 0, 0, 0, 0],
    5:  [4, 3, 2, 0, 0, 0, 0, 0, 0],
    6:  [4, 3, 3, 0, 0, 0, 0, 0, 0],
    7:  [4, 3, 3, 1, 0, 0, 0, 0, 0],
    8:  [4, 3, 3, 2, 0, 0, 0, 0, 0],
    9:  [4, 3, 3, 3, 1, 0, 0, 0, 0],
    10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
    11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
  },

  WARLOCK_SPELL_SLOTS: {
    1:  { slots: 1, level: 1 },
    2:  { slots: 2, level: 1 },
    3:  { slots: 2, level: 2 },
    4:  { slots: 2, level: 2 },
    5:  { slots: 2, level: 3 },
    6:  { slots: 2, level: 3 },
    7:  { slots: 2, level: 4 },
    8:  { slots: 2, level: 4 },
    9:  { slots: 2, level: 5 },
    10: { slots: 2, level: 5 },
    11: { slots: 3, level: 5 },
    12: { slots: 3, level: 5 },
    13: { slots: 3, level: 5 },
    14: { slots: 3, level: 5 },
    15: { slots: 3, level: 5 },
    16: { slots: 3, level: 5 },
    17: { slots: 4, level: 5 },
    18: { slots: 4, level: 5 },
    19: { slots: 4, level: 5 },
    20: { slots: 4, level: 5 }
  },

  // Numero di incantesimi conosciuti per livello (classi "known")
  SPELLS_KNOWN: {
    'Bardo':    [4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 15, 16, 18, 19, 19, 20, 22, 22, 22],
    'Ranger':   [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11],
    'Stregone': [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12, 13, 13, 14, 14, 15, 15, 15, 15],
    'Warlock':  [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15]
  },

  SPELLS: {
    cantrips: [
      { name: 'Colpo del Fuoco', level: 0, classes: ['Druido', 'Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '36 metri', duration: 'Istantanea', components: 'V, S', description: 'Lanci un dardo di fuoco. Effettua un TIRO PER COLPIRE CON INCANTESIMO contro il bersaglio: se colpisci infligge 1d10 danni da fuoco. Il danno aumenta a 2d10 al 5° livello, 3d10 all\'11°, 4d10 al 17°.' },
      { name: 'Fulmine', level: 0, classes: ['Druido', 'Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '36 metri', duration: 'Istantanea', components: 'V, S', description: 'Una scarica elettrica verso una creatura. TIRO PER COLPIRE CON INCANTESIMO: se colpisci, 1d8 danni da fulmine. Sale a 2d8 (5°), 3d8 (11°), 4d8 (17°).' },
      { name: 'Luci Danzanti', level: 0, classes: ['Bardo', 'Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '36 metri', duration: 'Concentrazione, 1 min', components: 'V, S, M', description: 'Crei fino a 4 luci fluttuanti (torce o sfere) o una forma vagamente umanoide luminosa. Nessun tiro richiesto. Le muovi con un\'azione bonus.' },
      { name: 'Luce', level: 0, classes: ['Bardo', 'Chierico', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: 'Contatto', duration: '1 ora', components: 'V, M', description: 'Tocchi un oggetto che emette luce intensa in un raggio di 6 metri. Se l\'oggetto è in mano a un nemico, esso effettua un TS su Destrezza per evitare l\'incantesimo.' },
      { name: 'Prestidigitazione', level: 0, classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Trasmutazione', castTime: '1 azione', range: '3 metri', duration: 'Fino a 1 ora', components: 'V, S', description: 'Piccolo trucco magico: accendi/spegni candele, pulisci o sporchi oggetti, crei un suono o un odore. Nessun tiro richiesto.' },
      { name: 'Riparare', level: 0, classes: ['Bardo', 'Chierico', 'Druido', 'Mago'], school: 'Trasmutazione', castTime: '1 minuto', range: 'Contatto', duration: 'Istantanea', components: 'V, S, M', description: 'Ripari una singola rottura o strappo in un oggetto che tocchi (catena, chiave, pergamena). Nessun tiro richiesto.' },
      { name: 'Messaggio', level: 0, classes: ['Bardo', 'Mago'], school: 'Trasmutazione', castTime: '1 azione', range: '36 metri', duration: '1 round', components: 'V, S, M', description: 'Sussurri un messaggio a una creatura che vedi; solo lei lo sente e può risponderti sottovoce. Nessun tiro richiesto.' },
      { name: 'Assistenza', level: 0, classes: ['Chierico', 'Druido'], school: 'Ammaliamento', castTime: '1 azione', range: '9 metri', duration: 'Concentrazione, 1 min', components: 'V, S', description: 'Una creatura ottiene VANTAGGIO sulla prossima prova di caratteristica entro 1 minuto. Nessun tiro per colpire richiesto.' },
      { name: 'Sacra Fiamma', level: 0, classes: ['Chierico'], school: 'Evocazione', castTime: '1 azione', range: '18 metri', duration: 'Istantanea', components: 'V, S', description: 'Una fiamma radiante scende sul bersaglio. Esso effettua un TS su DESTREZZA: se fallisce subisce 1d8 danni radianti. Non beneficia di copertura. Sale a 2d8 (5°), 3d8 (11°), 4d8 (17°).' },
      { name: 'Parola di Guarigione', level: 0, classes: ['Chierico'], school: 'Evocazione', castTime: '1 azione bonus', range: '18 metri', duration: 'Istantanea', components: 'V', description: 'Una creatura recupera 1d4 + il tuo modificatore di caratteristica da incantatore in punti ferita. Cura a distanza, nessun tiro richiesto.' },
      { name: 'Marchio Punitore', level: 0, classes: ['Warlock'], school: 'Necromanzia', castTime: '1 azione', range: '18 metri', duration: 'Concentrazione, 1 min', components: 'V', description: 'Maledici una creatura: la prossima volta che la colpisci con un attacco, subisce 1d6 danni necrotici extra. Sale a 2d6 (5°), 3d6 (11°), 4d6 (17°).' },
      { name: 'Colpo Eldritch', level: 0, classes: ['Warlock'], school: 'Evocazione', castTime: '1 azione', range: '36 metri', duration: 'Istantanea', components: 'V, S', description: 'Raggio di energia magica crepitante. TIRO PER COLPIRE CON INCANTESIMO: se colpisci, 1d10 danni da forza. Al 5° livello lanci 2 raggi, 3 raggi al 11°, 4 al 17°.' },
      { name: 'Amici', level: 0, classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Ammaliamento', castTime: '1 azione', range: 'Personale', duration: 'Concentrazione, 1 min', components: 'S, M', description: 'Ottieni VANTAGGIO sulle prove di Carisma verso una creatura non ostile. Quando finisce, la creatura capisce di essere stata stregata.' },
      { name: 'Tocco Glaciale', level: 0, classes: ['Stregone', 'Warlock', 'Mago'], school: 'Necromanzia', castTime: '1 azione', range: '36 metri', duration: 'Istantanea', components: 'V, S', description: 'Una mano spettrale gelida. TIRO PER COLPIRE CON INCANTESIMO: se colpisci, 1d8 danni necrotici e il bersaglio non può recuperare PF fino all\'inizio del tuo prossimo turno. Sale a 2d8 (5°), 3d8 (11°), 4d8 (17°).' },
      { name: 'Spruzzo Velenoso', level: 0, classes: ['Druido', 'Stregone', 'Warlock', 'Mago'], school: 'Coniurazione', castTime: '1 azione', range: '3 metri', duration: 'Istantanea', components: 'V, S', description: 'Una nube tossica verso una creatura. Essa effettua un TS su COSTITUZIONE: se fallisce, 1d12 danni da veleno. Sale a 2d12 (5°), 3d12 (11°), 4d12 (17°).' },
      { name: 'Lama Tonante', level: 0, classes: ['Stregone', 'Warlock', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '1,5 metri', duration: 'Istantanea', components: 'V, M', description: 'Infondi un\'arma di tuono ed effettui un attacco in mischia. Se colpisci, danno normale; se il bersaglio si muove subisce 1d8 danni da tuono. Sale a 2d8 (5°), 3d8 (11°), 4d8 (17°).' },
      { name: 'Mano Magica', level: 0, classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Coniurazione', castTime: '1 azione', range: '9 metri', duration: '1 minuto', components: 'V, S', description: 'Crei una mano spettrale fluttuante che può manipolare oggetti, aprire porte, recuperare oggetti (fino a 5 kg). Nessun tiro richiesto.' },
      { name: 'Taumaturgia', level: 0, classes: ['Chierico'], school: 'Trasmutazione', castTime: '1 azione', range: '9 metri', duration: 'Fino a 1 min', components: 'V', description: 'Manifesti un piccolo prodigio divino: voce tonante, tremori, porte che si aprono. Nessun tiro richiesto.' }
    ],
    level1: [
      { name: 'Rilevamento della Magia', level: 1, classes: ['Bardo', 'Chierico', 'Druido', 'Paladino', 'Ranger', 'Stregone', 'Mago'], school: 'Divinazione', ritual: true, castTime: '1 azione', range: 'Personale (raggio 9 m)', duration: 'Concentrazione, 10 min', components: 'V, S', description: 'Percepisci la presenza di magia entro 9 metri. Con un\'azione puoi vedere un debole alone attorno a creature/oggetti magici e capire la scuola di magia. Nessun tiro richiesto.' },
      { name: 'Luci delle Fate', level: 1, classes: ['Bardo', 'Druido'], school: 'Evocazione', castTime: '1 azione', range: '18 metri', duration: 'Concentrazione, 1 min', components: 'V', description: 'Le creature in un cubo di 6 metri effettuano un TS su DESTREZZA: se falliscono vengono illuminate (niente invisibilità) e gli attacchi contro di esse hanno VANTAGGIO.' },
      { name: 'Cura Ferite', level: 1, classes: ['Bardo', 'Chierico', 'Druido', 'Paladino', 'Ranger'], school: 'Evocazione', castTime: '1 azione', range: 'Contatto', duration: 'Istantanea', components: 'V, S', description: 'Una creatura che tocchi recupera 1d8 + il tuo modificatore da incantatore in PF. Non funziona su non-morti o costrutti. Lanciato a livello superiore: +1d8 per slot.' },
      { name: 'Scudo della Fede', level: 1, classes: ['Chierico', 'Paladino'], school: 'Abiurazione', castTime: '1 azione bonus', range: '18 metri', duration: 'Concentrazione, 10 min', components: 'V, S, M', description: 'Un campo luccicante avvolge una creatura, dandole +2 alla CA per la durata. Nessun tiro richiesto.' },
      { name: 'Benedizione', level: 1, classes: ['Chierico', 'Paladino'], school: 'Ammaliamento', castTime: '1 azione', range: '9 metri', duration: 'Concentrazione, 1 min', components: 'V, S, M', description: 'Fino a 3 creature aggiungono 1d4 a ogni TIRO PER COLPIRE e TIRO SALVEZZA che effettuano. Lanciato a livello superiore: +1 creatura per slot.' },
      { name: 'Dardo Incantato', level: 1, classes: ['Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '36 metri', duration: 'Istantanea', components: 'V, S', description: 'Crei 3 dardi di forza magica. Ciascuno colpisce AUTOMATICAMENTE (nessun tiro per colpire) infliggendo 1d4+1 danni da forza. Lanciato a livello superiore: +1 dardo per slot.' },
      { name: 'Scudo', level: 1, classes: ['Stregone', 'Mago'], school: 'Abiurazione', castTime: '1 reazione', range: 'Personale', duration: '1 round', components: 'V, S', description: 'Reazione quando vieni colpito da un attacco o bersagliato da Dardo Incantato: ottieni +5 alla CA fino al tuo prossimo turno, anche contro l\'attacco scatenante.' },
      { name: 'Charme su Persone', level: 1, classes: ['Bardo', 'Druido', 'Stregone', 'Warlock', 'Mago'], school: 'Ammaliamento', castTime: '1 azione', range: '9 metri', duration: '1 ora', components: 'V, S', description: 'Un umanoide effettua un TS su SAGGEZZA: se fallisce ti considera un conoscente amichevole. Ha vantaggio se tu o i tuoi alleati lo state combattendo.' },
      { name: 'Sonno', level: 1, classes: ['Bardo', 'Stregone', 'Mago'], school: 'Ammaliamento', castTime: '1 azione', range: '27 metri', duration: '1 minuto', components: 'V, S, M', description: 'Tira 5d8: questo è il totale di PF di creature che addormenti, partendo dalle più deboli. Nessun TS — funziona sui PF. Lanciato a livello superiore: +2d8 per slot.' },
      { name: 'Illusione Minore', level: 1, classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Illusione', castTime: '1 azione', range: '9 metri', duration: '1 minuto', components: 'S, M', description: 'Crei un suono o un\'immagine di un oggetto. Chi la esamina può fare una prova di INTELLIGENZA (Indagare) contro la tua CD per capire che è falsa.' },
      { name: 'Camuffare Sé Stesso', level: 1, classes: ['Bardo', 'Stregone', 'Mago'], school: 'Illusione', castTime: '1 azione', range: 'Personale', duration: '1 ora', components: 'V, S', description: 'Cambi il tuo aspetto (vestiti, volto, altezza apparente). Chi ti ispeziona può fare una prova di Intelligenza (Indagare) contro la tua CD.' },
      { name: 'Fragore Tonante', level: 1, classes: ['Bardo', 'Druido', 'Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: 'Personale (cubo 4,5 m)', duration: 'Istantanea', components: 'V, S', description: 'Un\'onda di tuono. Le creature in un cubo di 4,5 m effettuano un TS su COSTITUZIONE: se falliscono subiscono 2d8 danni da tuono e vengono spinte di 3 metri. Lanciato a livello superiore: +1d8 per slot.' },
      { name: 'Trova Famiglio', level: 1, classes: ['Mago'], school: 'Coniurazione', ritual: true, castTime: '1 ora', range: '3 metri', duration: 'Istantanea', components: 'V, S, M', description: 'Evochi uno spirito famiglio in forma di piccolo animale. Ti aiuta, condivide i sensi e può lanciare incantesimi a contatto al posto tuo. Nessun tiro richiesto.' },
      { name: 'Maledizione Ammaliante', level: 1, classes: ['Warlock'], school: 'Ammaliamento', castTime: '1 azione bonus', range: '18 metri', duration: 'Concentrazione, 1 min', components: 'V', description: 'Maledici una creatura: infliggi 1d6 danni necrotici extra quando la colpisci, e hai VANTAGGIO ai tiri per colpire contro di essa. Recuperi lo slot se va a 0 PF.' },
      { name: 'Comando', level: 1, classes: ['Chierico', 'Paladino'], school: 'Ammaliamento', castTime: '1 azione', range: '18 metri', duration: '1 round', components: 'V', description: 'Pronunci un ordine di una parola. Il bersaglio effettua un TS su SAGGEZZA: se fallisce obbedisce (es. "Fuggi", "Cadi", "Lascia"). Lanciato a livello superiore: +1 bersaglio per slot.' },
      { name: 'Protezione dal Bene e dal Male', level: 1, classes: ['Chierico', 'Druido', 'Paladino', 'Stregone', 'Warlock', 'Mago'], school: 'Abiurazione', castTime: '1 azione', range: 'Contatto', duration: 'Concentrazione, 10 min', components: 'V, S, M', description: 'La creatura protetta non può essere stregata/spaventata/posseduta da aberrazioni, celestiali, elementali, fate, immondi e non-morti, che hanno svantaggio agli attacchi contro di lei.' },
      { name: 'Spruzzo Acido', level: 1, classes: ['Druido', 'Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '18 metri', duration: 'Istantanea', components: 'V, S', description: 'Una bolla d\'acido verso 1 o 2 creature vicine. Ciascuna effettua un TS su DESTREZZA: se fallisce subisce 2d6 danni da acido (1d6 al cantrip — qui è 1° livello). Lanciato a livello superiore: +1d6 per slot.' },
      { name: 'Passo Veloce', level: 1, classes: ['Druido', 'Ranger'], school: 'Trasmutazione', castTime: '1 azione bonus', range: 'Personale', duration: 'Concentrazione, 10 min', components: 'V, S', description: 'La tua velocità raddoppia per la durata. Nessun tiro richiesto.' },
      { name: 'Marchio del Cacciatore', level: 1, classes: ['Ranger', 'Paladino'], school: 'Divinazione', castTime: '1 azione bonus', range: '27 metri', duration: 'Concentrazione, 1 ora', components: 'V', description: 'Marchi una creatura: infliggi 1d6 danni extra ogni volta che la colpisci con un\'arma, e hai vantaggio nel ritrovarla. Lanciato con slot di 3°+ livello: dura più a lungo.' },
      { name: 'Guida', level: 1, classes: ['Chierico', 'Druido'], school: 'Divinazione', castTime: '1 azione', range: 'Contatto', duration: 'Concentrazione, 1 min', components: 'V, S', description: 'Una creatura aggiunge 1d4 a una prova di caratteristica a sua scelta prima della fine dell\'incantesimo. (Tecnicamente è un trucchetto — incluso qui per comodità.)' }
    ],
    level2: [
      { name: 'Invisibilità', level: 2, classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Illusione', castTime: '1 azione', range: 'Contatto', duration: 'Concentrazione, 1 ora', components: 'V, S, M', description: 'Una creatura che tocchi diventa invisibile. L\'effetto termina se essa attacca o lancia un incantesimo. Lanciato a livello superiore: +1 creatura per slot.' },
      { name: 'Sfera Infuocata', level: 2, classes: ['Druido', 'Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '18 metri', duration: 'Istantanea', components: 'V, S, M', description: 'Sfera di fuoco esplode in un raggio di 6 metri. Ogni creatura nell\'area effettua un TS su DESTREZZA: 3d6 danni da fuoco se fallisce, metà se riesce. Lanciato a livello superiore: +1d6 per slot.' },
      { name: 'Oscurità', level: 2, classes: ['Stregone', 'Warlock', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '18 metri', duration: 'Concentrazione, 10 min', components: 'V, M', description: 'Oscurità magica riempie una sfera di 4,5 m. La scurovisione normale non la penetra. Nessun tiro richiesto.' },
      { name: 'Nube di Pugnali', level: 2, classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Coniurazione', castTime: '1 azione', range: '18 metri', duration: 'Concentrazione, 1 min', components: 'V, S, M', description: 'Lame rotanti riempiono un cubo di 1,5 m. Una creatura che entra o inizia il turno nell\'area subisce 4d4 danni taglienti (nessun TS). Lanciato a livello superiore: +2d4 per slot.' },
      { name: 'Risata Incontenibile', level: 2, classes: ['Bardo', 'Warlock', 'Mago'], school: 'Ammaliamento', castTime: '1 azione', range: '9 metri', duration: 'Concentrazione, 1 min', components: 'V, S, M', description: 'Una creatura effettua un TS su SAGGEZZA: se fallisce cade prona, ridendo, e diventa incapacitata. Ripete il TS alla fine di ogni suo turno.' },
      { name: 'Forza Possente', level: 2, classes: ['Druido', 'Ranger', 'Stregone', 'Mago'], school: 'Trasmutazione', castTime: '1 azione', range: 'Contatto', duration: 'Concentrazione, 1 ora', components: 'V, S, M', description: 'Una creatura ha punteggio di Forza 19 (se non già superiore) e vantaggio alle prove di Forza. Nessun tiro richiesto.' },
      { name: 'Rilevare i Pensieri', level: 2, classes: ['Bardo', 'Stregone', 'Mago'], school: 'Divinazione', castTime: '1 azione', range: 'Personale', duration: 'Concentrazione, 1 min', components: 'V, S, M', description: 'Leggi i pensieri superficiali di una creatura entro 9 metri. Per sondare più a fondo, la creatura effettua un TS su SAGGEZZA.' },
      { name: 'Ragnatela', level: 2, classes: ['Stregone', 'Mago'], school: 'Coniurazione', castTime: '1 azione', range: '18 metri', duration: 'Concentrazione, 1 ora', components: 'V, S, M', description: 'Ragnatele riempiono un cubo di 6 metri (terreno difficile). Le creature nell\'area effettuano un TS su DESTREZZA: se falliscono sono TRATTENUTE. Possono liberarsi con una prova di Forza.' },
      { name: 'Passo Velato', level: 2, classes: ['Stregone', 'Warlock', 'Mago'], school: 'Coniurazione', castTime: '1 azione bonus', range: 'Personale', duration: 'Istantanea', components: 'V', description: 'Ti teletrasporti fino a 9 metri in uno spazio libero che puoi vedere. Nessun tiro richiesto. Ottima fuga rapida.' },
      { name: 'Suggestione', level: 2, classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Ammaliamento', castTime: '1 azione', range: '9 metri', duration: 'Concentrazione, 8 ore', components: 'V, M', description: 'Suggerisci un\'azione ragionevole. Il bersaglio effettua un TS su SAGGEZZA: se fallisce segue il corso d\'azione suggerito.' },
      { name: 'Silenzio', level: 2, classes: ['Bardo', 'Chierico', 'Ranger'], school: 'Illusione', ritual: true, castTime: '1 azione', range: '36 metri', duration: 'Concentrazione, 10 min', components: 'V, S', description: 'Nessun suono può essere creato o trasmesso in una sfera di 6 metri. Le creature dentro sono immuni al danno da tuono e non possono lanciare incantesimi con componente verbale.' },
      { name: 'Arma Spirituale', level: 2, classes: ['Chierico'], school: 'Evocazione', castTime: '1 azione bonus', range: '18 metri', duration: '1 minuto', components: 'V, S', description: 'Crei un\'arma spettrale fluttuante. Effettui subito e poi come azione bonus un TIRO PER COLPIRE CON INCANTESIMO: se colpisci, 1d8 + il tuo modificatore da incantatore in danni da forza. Lanciato a livello superiore: +1d8 ogni 2 slot.' },
      { name: 'Cecità/Sordità', level: 2, classes: ['Bardo', 'Chierico', 'Stregone', 'Mago'], school: 'Necromanzia', castTime: '1 azione', range: '9 metri', duration: '1 minuto', components: 'V', description: 'Una creatura effettua un TS su COSTITUZIONE: se fallisce diventa cieca o sorda (a tua scelta). Ripete il TS alla fine di ogni suo turno. Lanciato a livello superiore: +1 bersaglio per slot.' },
      { name: 'Raggio Rovente', level: 2, classes: ['Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '36 metri', duration: 'Istantanea', components: 'V, S', description: 'Lanci 3 raggi di fuoco. Per ciascuno effettui un TIRO PER COLPIRE CON INCANTESIMO: ogni raggio che colpisce infligge 2d6 danni da fuoco. Lanciato a livello superiore: +1 raggio per slot.' },
      { name: 'Immagine Speculare', level: 2, classes: ['Stregone', 'Warlock', 'Mago'], school: 'Illusione', castTime: '1 azione', range: 'Personale', duration: '1 minuto', components: 'V, S', description: 'Crei 3 duplicati illusori di te stesso. Quando vieni attaccato, tira un dado: l\'attacco potrebbe colpire un duplicato (che svanisce) invece di te.' }
    ],
    level3: [
      { name: 'Palla di Fuoco', level: 3, classes: ['Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '45 metri', duration: 'Istantanea', components: 'V, S, M', description: 'Esplosione di fuoco in una sfera di 6 metri di raggio. Ogni creatura nell\'area effettua un TS su DESTREZZA: 8d6 danni da fuoco se fallisce, metà se riesce. Lanciato a livello superiore: +1d6 per slot.' },
      { name: 'Fulmine', level: 3, classes: ['Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: 'Personale (linea 30 m)', duration: 'Istantanea', components: 'V, S, M', description: 'Una saetta in linea di 30 m × 1,5 m. Ogni creatura sulla linea effettua un TS su DESTREZZA: 8d6 danni da fulmine se fallisce, metà se riesce. Lanciato a livello superiore: +1d6 per slot.' },
      { name: 'Volare', level: 3, classes: ['Stregone', 'Warlock', 'Mago'], school: 'Trasmutazione', castTime: '1 azione', range: 'Contatto', duration: 'Concentrazione, 10 min', components: 'V, S, M', description: 'Una creatura ottiene velocità di volo di 18 metri. Lanciato a livello superiore: +1 creatura per slot.' },
      { name: 'Controincantesimo', level: 3, classes: ['Stregone', 'Warlock', 'Mago'], school: 'Abiurazione', castTime: '1 reazione', range: '18 metri', duration: 'Istantanea', components: 'S', description: 'Reazione quando vedi una creatura lanciare un incantesimo: interrompi automaticamente un incantesimo di 3° livello o inferiore. Per livelli superiori, effettui una prova di caratteristica da incantatore (CD 10 + livello incantesimo).' },
      { name: 'Luce del Giorno', level: 3, classes: ['Chierico', 'Druido', 'Ranger', 'Paladino', 'Stregone'], school: 'Evocazione', castTime: '1 azione', range: '18 metri', duration: '1 ora', components: 'V, S', description: 'Luce solare riempie una sfera di 18 metri di raggio. Dissipa l\'oscurità magica di livello inferiore. Nessun tiro richiesto.' },
      { name: 'Forma Gassosa', level: 3, classes: ['Stregone', 'Warlock', 'Mago'], school: 'Trasmutazione', castTime: '1 azione', range: 'Contatto', duration: 'Concentrazione, 1 ora', components: 'V, S, M', description: 'Una creatura consenziente diventa una nube di nebbia: può volare lentamente, attraversare piccole fessure, resiste ai danni non magici.' },
      { name: 'Velocità', level: 3, classes: ['Stregone', 'Mago'], school: 'Trasmutazione', castTime: '1 azione', range: '9 metri', duration: 'Concentrazione, 1 min', components: 'V, S, M', description: 'Una creatura raddoppia la velocità, ha +2 alla CA, vantaggio ai TS su Destrezza e un\'azione extra ogni turno. Quando finisce perde un turno.' },
      { name: 'Lentezza', level: 3, classes: ['Stregone', 'Mago'], school: 'Trasmutazione', castTime: '1 azione', range: '36 metri', duration: 'Concentrazione, 1 min', components: 'V, S, M', description: 'Fino a 6 creature in un cubo di 12 metri effettuano un TS su SAGGEZZA: se falliscono dimezzano velocità, -2 CA e Destrezza, e agiscono più lentamente.' },
      { name: 'Animare i Morti', level: 3, classes: ['Chierico', 'Mago'], school: 'Necromanzia', castTime: '1 minuto', range: '3 metri', duration: 'Istantanea', components: 'V, S, M', description: 'Crei uno scheletro o zombie da ossa o un cadavere. Obbedisce ai tuoi comandi. Devi rinnovare il controllo ogni 24 ore. Lanciato a livello superiore: +2 non-morti per slot.' },
      { name: 'Dissolvi Magie', level: 3, classes: ['Bardo', 'Chierico', 'Druido', 'Paladino', 'Stregone', 'Warlock', 'Mago'], school: 'Abiurazione', castTime: '1 azione', range: '36 metri', duration: 'Istantanea', components: 'V, S', description: 'Termina ogni incantesimo di livello pari o inferiore al tuo slot su una creatura/oggetto. Per livelli superiori, prova di caratteristica (CD 10 + livello incantesimo).' }
    ],
    level4: [
      { name: 'Porta Dimensionale', level: 4, classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Coniurazione', castTime: '1 azione', range: '150 metri', duration: 'Istantanea', components: 'V', description: 'Ti teletrasporti (più un eventuale compagno) verso un punto entro 150 metri. Nessun tiro richiesto.' },
      { name: 'Invisibilità Superiore', level: 4, classes: ['Bardo', 'Stregone', 'Mago'], school: 'Illusione', castTime: '1 azione', range: 'Contatto', duration: 'Concentrazione, 1 min', components: 'V, S', description: 'Una creatura diventa invisibile e RIMANE invisibile anche se attacca o lancia incantesimi. Nessun tiro richiesto.' },
      { name: 'Metamorfosi', level: 4, classes: ['Bardo', 'Druido', 'Stregone', 'Mago'], school: 'Trasmutazione', castTime: '1 azione', range: '18 metri', duration: 'Concentrazione, 1 ora', components: 'V, S, M', description: 'Una creatura effettua un TS su SAGGEZZA (a meno che non sia consenziente): se fallisce si trasforma in una bestia con GS pari o inferiore al suo livello.' },
      { name: 'Avvizzimento', level: 4, classes: ['Druido', 'Stregone', 'Warlock', 'Mago'], school: 'Necromanzia', castTime: '1 azione', range: '9 metri', duration: 'Istantanea', components: 'V, S', description: 'Prosciughi la vita di una creatura. Essa effettua un TS su COSTITUZIONE: 8d8 danni necrotici se fallisce, metà se riesce. I non-morti sono immuni; le piante hanno svantaggio e subiscono il massimo.' },
      { name: 'Confusione', level: 4, classes: ['Bardo', 'Druido', 'Stregone', 'Mago'], school: 'Ammaliamento', castTime: '1 azione', range: '27 metri', duration: 'Concentrazione, 1 min', components: 'V, S, M', description: 'Le creature in una sfera di 3 m effettuano un TS su SAGGEZZA: se falliscono agiscono in modo casuale (tira 1d10 ogni turno). Lanciato a livello superiore: +1,5 m di raggio per slot.' },
      { name: 'Tempesta di Ghiaccio', level: 4, classes: ['Druido', 'Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '90 metri', duration: 'Istantanea', components: 'V, S, M', description: 'Grandine in un cilindro di 6 m. Le creature effettuano un TS su DESTREZZA: 2d8 contundenti + 4d6 da freddo se falliscono, metà se riescono.' }
    ],
    level5: [
      { name: 'Nube di Contagio', level: 5, classes: ['Chierico', 'Mago'], school: 'Coniurazione', castTime: '1 azione', range: '36 metri', duration: 'Concentrazione, 10 min', components: 'V, S, M', description: 'Una nube tossica in una sfera di 6 m. Le creature effettuano un TS su COSTITUZIONE: 5d8 danni da veleno se falliscono, metà se riescono. La nube si muove ogni round.' },
      { name: 'Cono di Freddo', level: 5, classes: ['Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: 'Personale (cono 18 m)', duration: 'Istantanea', components: 'V, S, M', description: 'Aria gelida esplode da te in un cono di 18 metri. Ogni creatura effettua un TS su COSTITUZIONE: 8d8 danni da freddo se fallisce, metà se riesce. Lanciato a livello superiore: +1d8 per slot.' },
      { name: 'Teletrasporto del Cerchio', level: 5, classes: ['Bardo', 'Mago'], school: 'Coniurazione', castTime: '1 azione', range: '3 metri', duration: '1 round', components: 'V, S, M', description: 'Crei un portale verso un cerchio di teletrasporto permanente che conosci. Tu e gli alleati potete attraversarlo. Nessun tiro richiesto.' },
      { name: 'Rianimare i Morti', level: 5, classes: ['Bardo', 'Chierico', 'Druido'], school: 'Necromanzia', castTime: '1 ora', range: 'Contatto', duration: 'Istantanea', components: 'V, S, M', description: 'Riporti in vita una creatura morta da non più di 10 giorni. Torna con 1 PF. Annulla veleni e malattie non magiche.' },
      { name: 'Scrutare', level: 5, classes: ['Bardo', 'Chierico', 'Druido', 'Warlock', 'Mago'], school: 'Divinazione', castTime: '10 minuti', range: 'Personale', duration: 'Concentrazione, 10 min', components: 'V, S, M', description: 'Osservi a distanza una creatura tramite un sensore invisibile. Il bersaglio effettua un TS su SAGGEZZA per resistere (con modificatori in base a quanto lo conosci).' }
    ],
    level6: [
      { name: 'Catena di Fulmini', level: 6, classes: ['Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '45 metri', duration: 'Istantanea', components: 'V, S, M', description: 'Un fulmine colpisce un bersaglio e salta su altre 3 creature vicine. Ciascuna effettua un TS su DESTREZZA: 10d8 danni da fulmine se fallisce, metà se riesce. Lanciato a livello superiore: +1 bersaglio per slot.' },
      { name: 'Disintegrazione', level: 6, classes: ['Stregone', 'Mago'], school: 'Trasmutazione', castTime: '1 azione', range: '18 metri', duration: 'Istantanea', components: 'V, S, M', description: 'Un raggio sottile. Il bersaglio effettua un TS su DESTREZZA: se fallisce subisce 10d6+40 danni da forza; se va a 0 PF viene polverizzato. Lanciato a livello superiore: +3d6 per slot.' },
      { name: 'Raggio di Sole', level: 6, classes: ['Druido', 'Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: 'Personale (linea 18 m)', duration: 'Concentrazione, 1 min', components: 'V, S, M', description: 'Un raggio di sole abbagliante. Le creature effettuano un TS su COSTITUZIONE: 6d8 danni radianti e CECITÀ se falliscono, metà danni senza cecità se riescono.' }
    ],
    level7: [
      { name: 'Teletrasporto', level: 7, classes: ['Bardo', 'Stregone', 'Mago'], school: 'Coniurazione', castTime: '1 azione', range: '3 metri', duration: 'Istantanea', components: 'V', description: 'Teletrasporti istantaneamente te e fino a 8 creature (o un oggetto grande) verso una destinazione che conosci. Tira sulla tabella di precisione in base a quanto conosci il luogo.' },
      { name: 'Spruzzo Prismatico', level: 7, classes: ['Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: 'Personale (cono 18 m)', duration: 'Istantanea', components: 'V, S', description: 'Otto raggi multicolore. Ogni creatura nel cono è colpita da un raggio casuale (tira 1d8) con effetti diversi: danni elementali, veleno, pietrificazione, o essere bandita su un altro piano. TS su DESTREZZA per ogni raggio.' }
    ],
    level8: [
      { name: 'Tsunami', level: 8, classes: ['Druido'], school: 'Coniurazione', castTime: '1 minuto', range: '1,5 km', duration: 'Concentrazione, 6 round', components: 'V, S', description: 'Un\'enorme parete d\'acqua. Le creature effettuano un TS su COSTITUZIONE: 6d10 danni contundenti se falliscono. Il muro avanza e diminuisce ogni round.' },
      { name: 'Esplosione Solare', level: 8, classes: ['Druido', 'Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '45 metri', duration: 'Istantanea', components: 'V, S, M', description: 'Luce solare accecante in una sfera di 18 m. Le creature effettuano un TS su COSTITUZIONE: 12d6 danni radianti e CECITÀ per 1 minuto se falliscono, metà danni senza cecità se riescono.' }
    ],
    level9: [
      { name: 'Desiderio', level: 9, classes: ['Stregone', 'Mago'], school: 'Coniurazione', castTime: '1 azione', range: 'Personale', duration: 'Istantanea', components: 'V', description: 'L\'incantesimo più potente. Puoi duplicare qualsiasi incantesimo di 8° livello o inferiore, o alterare la realtà stessa. Usi più ambiziosi rischiano di non poter più lanciare Desiderio.' },
      { name: 'Sciame di Meteore', level: 9, classes: ['Stregone', 'Mago'], school: 'Evocazione', castTime: '1 azione', range: '1,5 km', duration: 'Istantanea', components: 'V, S', description: 'Quattro meteore infuocate cadono in 4 sfere di 12 m. Le creature effettuano un TS su DESTREZZA: 20d6 danni da fuoco + 20d6 contundenti se falliscono, metà se riescono.' },
      { name: 'Resurrezione Pura', level: 9, classes: ['Chierico', 'Druido'], school: 'Necromanzia', castTime: '1 ora', range: 'Contatto', duration: 'Istantanea', components: 'V, S, M', description: 'Riporti in vita una creatura morta da non più di 200 anni, con tutti i PF. Cura ferite, malattie, veleni, maledizioni e ringiovanisce il corpo.' }
    ]
  },

  SPELL_SCHOOL_INFO: {
    'Evocazione': 'Manipola l\'energia per creare effetti diretti — fuoco, fulmini, luce.',
    'Abiurazione': 'Magia protettiva: barriere, dissoluzioni, protezioni.',
    'Coniurazione': 'Trasporta creature/oggetti o teletrasporta.',
    'Divinazione': 'Rivela informazioni nascoste, passato, futuro, lontananze.',
    'Ammaliamento': 'Influenza o controlla le menti delle creature.',
    'Illusione': 'Inganna i sensi o le menti con immagini false.',
    'Necromanzia': 'Manipola energia vitale, morte e non-morte.',
    'Trasmutazione': 'Modifica le proprietà di creature e oggetti.'
  },

  WEAPON_PROPERTIES: {
    'Leggero': 'Leggera — adatta al combattimento con due armi: puoi attaccare con un\'altra arma leggera nella mano libera come azione bonus.',
    'Preciso': 'Di precisione (Finesse) — puoi usare Forza OPPURE Destrezza (la migliore) per i tiri per colpire e per i danni.',
    'Lanciabile': 'Da lancio — puoi scagliarla per un attacco a distanza usando la stessa caratteristica del corpo a corpo.',
    'Pesante': 'Pesante — le creature di taglia Piccola hanno SVANTAGGIO ai tiri per colpire con essa.',
    'Due Mani': 'A due mani — richiede entrambe le mani per essere impugnata.',
    'Portata': 'Con portata — aggiunge 1,5 m alla tua portata quando attacchi e per le opportunità.',
    'Munizioni': 'A munizioni — richiede frecce/dardi/proiettili per attaccare a distanza.',
    'Ricarica': 'Ricarica — puoi sparare un solo colpo per azione/azione bonus/reazione, anche con attacchi multipli.',
    'Versatile': 'Versatile — può essere impugnata a una o due mani (a due mani infligge il dado di danno maggiore indicato).',
    'Speciale': 'Speciale — questa arma ha regole d\'uso particolari (vedi descrizione).'
  },

  DAMAGE_TYPE_INFO: {
    'Contundente': 'Danno da impatto (mazze, martelli, cadute).',
    'Perforante': 'Danno da punta (lance, frecce, pugnali).',
    'Tagliente': 'Danno da lama (spade, asce).'
  },

  WEAPONS: {
    simple_melee: [
      { name: 'Randello', damage: '1d4', type: 'Contundente', properties: ['Leggero'] },
      { name: 'Pugnale', damage: '1d4', type: 'Perforante', properties: ['Preciso', 'Leggero', 'Lanciabile'] },
      { name: 'Mazza', damage: '1d6', type: 'Contundente', properties: [] },
      { name: 'Bastone', damage: '1d6', type: 'Contundente', properties: ['Versatile 1d8'] },
      { name: 'Ascia da Mano', damage: '1d6', type: 'Tagliente', properties: ['Leggero', 'Lanciabile'] },
      { name: 'Giavellotto', damage: '1d6', type: 'Perforante', properties: ['Lanciabile'] },
      { name: 'Lancia', damage: '1d6', type: 'Perforante', properties: ['Versatile 1d8', 'Lanciabile'] },
      { name: 'Falce da Contadino', damage: '1d4', type: 'Tagliente', properties: ['Piede'] }
    ],
    simple_ranged: [
      { name: 'Arco Corto', damage: '1d6', type: 'Perforante', properties: ['Munizioni', 'Due Mani', 'Portata 80/320'] },
      { name: 'Balestra Leggera', damage: '1d8', type: 'Perforante', properties: ['Munizioni', 'Due Mani', 'Ricarica', 'Portata 80/320'] },
      { name: 'Fionda', damage: '1d4', type: 'Contundente', properties: ['Munizioni', 'Portata 30/120'] },
      { name: 'Dardo', damage: '1d4', type: 'Perforante', properties: ['Lanciabile', 'Preciso'] }
    ],
    martial_melee: [
      { name: 'Spada Lunga', damage: '1d8', type: 'Tagliente', properties: ['Versatile 1d10'] },
      { name: 'Spada Corta', damage: '1d6', type: 'Perforante', properties: ['Preciso', 'Leggero'] },
      { name: 'Stocco', damage: '1d8', type: 'Perforante', properties: ['Preciso'] },
      { name: 'Ascia Bipenne', damage: '1d12', type: 'Tagliente', properties: ['Pesante', 'Due Mani'] },
      { name: 'Martello da Guerra', damage: '1d8', type: 'Contundente', properties: ['Versatile 1d10'] },
      { name: 'Alabarda', damage: '1d10', type: 'Tagliente', properties: ['Pesante', 'Due Mani', 'Portata', 'Piede'] },
      { name: 'Spada a Due Mani', damage: '2d6', type: 'Tagliente', properties: ['Pesante', 'Due Mani'] },
      { name: 'Ascia da Guerra', damage: '1d8', type: 'Tagliente', properties: ['Versatile 1d10'] },
      { name: 'Maglio', damage: '2d6', type: 'Contundente', properties: ['Pesante', 'Due Mani'] },
      { name: 'Tridente', damage: '1d6', type: 'Perforante', properties: ['Lanciabile', 'Versatile 1d8'] },
      { name: 'Falce', damage: '1d10', type: 'Tagliente', properties: ['Pesante', 'Due Mani', 'Portata'] },
      { name: 'Scimitarra', damage: '1d6', type: 'Tagliente', properties: ['Preciso', 'Leggero'] },
      { name: 'Lancia da Giostra', damage: '1d12', type: 'Perforante', properties: ['Portata', 'Speciale'] },
      { name: 'Spada a Bastone', damage: '1d10', type: 'Perforante', properties: ['Preciso'] }
    ],
    martial_ranged: [
      { name: 'Arco Lungo', damage: '1d8', type: 'Perforante', properties: ['Munizioni', 'Due Mani', 'Portata 150/600', 'Pesante'] },
      { name: 'Balestra Pesante', damage: '1d10', type: 'Perforante', properties: ['Munizioni', 'Due Mani', 'Ricarica', 'Portata 100/400', 'Pesante'] },
      { name: 'Balestra a Mano', damage: '1d6', type: 'Perforante', properties: ['Munizioni', 'Leggero', 'Ricarica', 'Portata 30/120'] },
      { name: 'Rete', damage: '—', type: '—', properties: ['Lanciabile', 'Speciale', 'Portata 5/15'] }
    ]
  },

  ARMOR: {
    light: [
      { name: 'Cuoio', ac: 11, stealth: false, strength_req: 0, cost: '10 mo' },
      { name: 'Cuoio Borchiato', ac: 12, stealth: false, strength_req: 0, cost: '45 mo' },
      { name: 'Imbottita', ac: 11, stealth: true, strength_req: 0, cost: '5 mo' }
    ],
    medium: [
      { name: 'Cuoio Inanellato', ac: 12, stealth: false, strength_req: 0, cost: '30 mo' },
      { name: 'Cotta di Maglia', ac: 13, stealth: false, strength_req: 0, cost: '50 mo' },
      { name: 'Corazza di Squame', ac: 14, stealth: true, strength_req: 0, cost: '50 mo' },
      { name: 'Corazza', ac: 14, stealth: false, strength_req: 0, cost: '400 mo' },
      { name: 'Cotta Semipiena', ac: 15, stealth: true, strength_req: 0, cost: '750 mo' }
    ],
    heavy: [
      { name: 'Anelli', ac: 14, stealth: true, strength_req: 0, cost: '30 mo' },
      { name: 'Cotta di Cotta', ac: 16, stealth: true, strength_req: 13, cost: '75 mo' },
      { name: 'Spaccata', ac: 17, stealth: true, strength_req: 15, cost: '200 mo' },
      { name: 'Armatura a Piastre', ac: 18, stealth: true, strength_req: 15, cost: '1500 mo' }
    ],
    shields: [
      { name: 'Scudo', ac: 2, stealth: false, strength_req: 0, cost: '10 mo' }
    ]
  },

  EQUIPMENT_PACKS: {
    'Pacchetto del Diplomatico': ['Cofanetto (50 mo)', 'Inchiostro (2 flaconi)', 'Penna', 'Foglio di carta (5)', 'Profumo (1 flacone)', 'Ceralacca e sigillo', 'Abiti fini', 'Borsa (5 mo)'],
    'Pacchetto dell\'Esploratore': ['Zaino', 'Barattolo di Grasso', 'Campana a Vento', 'Torce (10)', 'Razioni (10 giorni)', 'Corda di Canapa (50 ft)', 'Sacco a Pelo', 'Borraccia', 'Pentola da Campo', 'Borsa (2 mo)'],
    'Pacchetto del Dungeoneer': ['Zaino', 'Piede di Porco', 'Martello', 'Pitons (10)', 'Torce (10)', 'Acciarino', 'Razioni (10 giorni)', 'Corda di Canapa (50 ft)', 'Borraccia', 'Borsa (1 mo)'],
    'Pacchetto del Sacerdote': ['Zaino', 'Coperta', 'Candele (10)', 'Acciarino', 'Scatola delle offerte', 'Incenso (2 blocchi)', 'Vestiti comuni', 'Borsa (15 mo)'],
    'Pacchetto dello Studioso': ['Zaino', 'Libro di conoscenze', 'Bottiglia di Inchiostro', 'Penna', 'Sabbia Asciugante', 'Piccolo Coltello', 'Borsa (10 mo)'],
    'Pacchetto dello Spettacolo': ['Zaino', 'Vestiti del Costume (2)', 'Kit del Travestimento', 'Strumento musicale', 'Borsa (15 mo)']
  },

  COMBAT_STYLES: {
    'Arciere': 'Bonus +2 ai tiri per colpire con armi a distanza',
    'Difesa': '+1 CA mentre si indossa un\'armatura',
    'Duellante': '+2 ai danni se si tiene un\'arma da mischia in una mano',
    'Combattimento con Grandi Armi': 'Ritira 1 e 2 sui dadi danno armi a due mani',
    'Protezione': 'Usa la reazione per imporre svantaggio su un attacco contro un alleato vicino',
    'Combattimento con Due Armi': 'Aggiungi il modificatore ai danni del secondo attacco',
    'Intercezione': 'Usa la reazione per ridurre i danni di un alleato di 1d10+bonus',
    'Cecchino': 'Non c\'è svantaggio per il tiro a lunga distanza'
  },

  TOOL_PROFICIENCIES: [
    'Attrezzi da Artigiano', 'Kit del Falsario', 'Kit del Travestimento', 'Kit da Erborista',
    'Attrezzi da Navigatore', 'Attrezzi da Avvelenatore', 'Attrezzi da Ladro',
    'Liuto', 'Flauto', 'Tamburo', 'Viola', 'Tromba', 'Corno', 'Arpa', 'Cetra',
    'Dadi', 'Carte da Gioco', 'Dragonchess', 'Gioco dei Tre Draghi'
  ],

  CONDITIONS: [
    { name: 'Accecato', effect: 'Fallisce prove dipendenti dalla vista, svantaggio agli attacchi, vantaggio per gli avversari' },
    { name: 'Ammaliato', effect: 'Non può attaccare l\'ammaliatore, che ha vantaggio sulle prove sociali' },
    { name: 'Assordato', effect: 'Fallisce prove dipendenti dall\'udito, immunità al suono' },
    { name: 'Avvelenato', effect: 'Svantaggio su attacchi e prove di caratteristica' },
    { name: 'Impaurito', effect: 'Svantaggio su attacchi/prove mentre la fonte è visibile, non può avvicinarsi' },
    { name: 'Immobilizzato', effect: 'Velocità 0, attacchi contro hanno vantaggio, propri attacchi in svantaggio' },
    { name: 'Incapacitato', effect: 'Non può compiere azioni o reazioni' },
    { name: 'Invisibile', effect: 'Impossibile da vedere, vantaggio agli attacchi, svantaggio altrui contro' },
    { name: 'Paralizzato', effect: 'Incapacitato, velocità 0, attacchi contro vantaggio, critico automatico entro 5ft' },
    { name: 'Pietrificato', effect: 'Come paralizzato + immunità veleno/malattia + resistenza a tutti i danni' },
    { name: 'Prono', effect: 'Velocità dimezzata per rialzarsi, svantaggio attacchi, attacchi ravvicinati vantaggio' },
    { name: 'Trattenuto', effect: 'Velocità 0, svantaggio destrezza e propri attacchi, vantaggio contro di te' }
  ]
};

if (typeof module !== 'undefined') module.exports = DND;
