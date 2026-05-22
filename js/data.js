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

  SPELLS: {
    cantrips: [
      { name: 'Colpo del Fuoco', classes: ['Druido', 'Stregone', 'Mago'], school: 'Evocazione', description: 'Un lampo di fuoco verso una creatura. Attacco a distanza con incantesimi.' },
      { name: 'Fulmine', classes: ['Druido', 'Stregone', 'Mago'], school: 'Evocazione', description: 'Una scintilla verso una creatura. 1d8 danni da fulmine.' },
      { name: 'Luci Danzanti', classes: ['Bardo', 'Stregone', 'Mago'], school: 'Evocazione', description: 'Fino a 4 luci fluttuanti in un\'area.' },
      { name: 'Luce', classes: ['Bardo', 'Chierico', 'Mago'], school: 'Evocazione', description: 'Un oggetto irradia luce in raggio di 20ft per 1 ora.' },
      { name: 'Prestidigitazione', classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Trasmutazione', description: 'Piccoli effetti magici minori a volontà.' },
      { name: 'Mending', classes: ['Bardo', 'Chierico', 'Druido', 'Mago'], school: 'Trasmutazione', description: 'Ripara un piccolo strappo o rottura in un oggetto.' },
      { name: 'Messaggio', classes: ['Bardo', 'Mago'], school: 'Trasmutazione', description: 'Sussurra a una creatura che può risponderti.' },
      { name: 'Assistenza', classes: ['Chierico', 'Druido'], school: 'Ammaliamento', description: 'Concede vantaggio a una caratteristica entro 1 minuto.' },
      { name: 'Sacra Fiamma', classes: ['Chierico'], school: 'Evocazione', description: 'Fiamma di luce radiante. TS Destrezza o 1d8 radianti.' },
      { name: 'Parola di Guarigione', classes: ['Chierico'], school: 'Evocazione', description: 'Parola guarisce 1d4+WIS PF a distanza.' },
      { name: 'Ferocia', classes: ['Warlock'], school: 'Necromanzia', description: 'Maledizione una creatura. Vantaggio contro di essa.' },
      { name: 'Colpo Eldritch', classes: ['Warlock'], school: 'Evocazione', description: 'Raggio di energia mistica. 1d10. Forza magica.' },
      { name: 'Amici', classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Ammaliamento', description: 'Vantaggio su Carisma verso una creatura non ostile per 1 minuto.' },
      { name: 'Scheletri dell\'Ombra', classes: ['Mago'], school: 'Necromanzia', description: 'Mano di ombra cerca di afferrare il cuore.' },
      { name: 'Congelamento della Mente', classes: ['Mago'], school: 'Illusion', description: 'Illusion psionica tormenta una creatura.' },
      { name: 'Tocco Glaciale', classes: ['Stregone', 'Warlock', 'Mago'], school: 'Necromanzia', description: 'Attacco da mischia. 1d8 freddo, impedisce guarigione.' },
      { name: 'Veleno Spruzzato', classes: ['Druido', 'Stregone', 'Warlock', 'Mago'], school: 'Coniurazione', description: 'Spruzza veleno acido. 1d12 acido.' },
      { name: 'Lama di Tuono', classes: ['Stregone', 'Warlock', 'Mago'], school: 'Evocazione', description: 'Infonde un\'arma con tuono. Attacco da mischia, 1d8 tuono.' }
    ],
    level1: [
      { name: 'Rilevamento della Magia', classes: ['Bardo', 'Chierico', 'Druido', 'Paladino', 'Ranger', 'Stregone', 'Mago'], school: 'Divinazione', ritual: true, description: 'Percepisci la magia entro 30ft.' },
      { name: 'Luci delle Fate', classes: ['Bardo', 'Druido'], school: 'Evocazione', description: 'Rilevamento e illuminazione. Le creature non possono nascondersi.' },
      { name: 'Cura delle Ferite', classes: ['Bardo', 'Chierico', 'Druido', 'Paladino', 'Ranger'], school: 'Evocazione', description: 'Cura 1d8+mod PF con un tocco.' },
      { name: 'Protezione della Fede', classes: ['Chierico', 'Paladino'], school: 'Abiurazione', description: '+2 CA per 10 minuti tramite focus magico.' },
      { name: 'Benedizione', classes: ['Chierico', 'Paladino'], school: 'Ammaliamento', description: 'Fino a 3 creature ottengono 1d4 su attacchi e TS per 1 min.' },
      { name: 'Proiettile Magico', classes: ['Stregone', 'Mago'], school: 'Evocazione', description: '3 dardi che infliggono 1d4+1 danni magici ciascuno.' },
      { name: 'Scudo Magico', classes: ['Stregone', 'Mago'], school: 'Abiurazione', description: '+5 CA come reazione quando vieni colpito.' },
      { name: 'Charm Person', classes: ['Bardo', 'Druido', 'Stregone', 'Warlock', 'Mago'], school: 'Ammaliamento', description: 'Creatura umanoide trattata come amico per 1 ora.' },
      { name: 'Sonno', classes: ['Bardo', 'Stregone', 'Mago'], school: 'Ammaliamento', description: 'Addormenta creature (5d8 PF totali, partendo dalla più debole).' },
      { name: 'Illusione Minore', classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Illusione', description: 'Crea un suono o immagine illusoria.' },
      { name: 'Sfumare', classes: ['Mago'], school: 'Trasmutazione', description: 'Il bersaglio diventa invisibile quando non attacca o lancia.' },
      { name: 'Onda di Tuono', classes: ['Bardo', 'Druido', 'Stregone', 'Mago'], school: 'Evocazione', description: 'Cubo 15ft. 2d8 tuono e spinge di 10ft. TS.' },
      { name: 'Trovare il Famiglio', classes: ['Mago'], school: 'Coniurazione', ritual: true, description: 'Evoca un famiglio come spirito in forma animale.' },
      { name: 'Maledizione Ammaliante', classes: ['Warlock'], school: 'Ammaliamento', description: 'Creatura riceve svantaggio su attacchi e TS contro di te.' },
      { name: 'Parola Compellente', classes: ['Bardo', 'Chierico'], school: 'Ammaliamento', description: 'Una creatura usa la sua reazione per muoversi verso di te.' },
      { name: 'Protezione dal Bene e dal Male', classes: ['Chierico', 'Druido', 'Paladino', 'Stregone', 'Warlock', 'Mago'], school: 'Abiurazione', description: 'Protezione da Aberrazioni, Celestiali, Elementali, Fate, Fiend, Non-morti.' },
      { name: 'Onda d\'Acido', classes: ['Druido', 'Stregone', 'Mago'], school: 'Evocazione', description: 'Acido spruzzato su una o due creature vicine. 2d6 acido.' },
      { name: 'Veleno del Mago', classes: ['Stregone', 'Warlock', 'Mago'], school: 'Trasmutazione', description: 'Avvelena una creatura. TS o avvelenata per 1 ora.' },
      { name: 'Scivolata', classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Trasmutazione', description: 'Teletrasporto fino a 30ft in uno spazio vuoto.' },
      { name: 'Colpo Turbinante', classes: ['Ranger'], school: 'Trasmutazione', description: 'Al prossimo attacco, il bersaglio viene tirato 10ft verso di te.' },
      { name: 'Guida', classes: ['Chierico', 'Druido'], school: 'Divinazione', description: 'Creatura ottiene 1d4 su una prova di caratteristica prima del prossimo turno.' }
    ],
    level2: [
      { name: 'Invisibilità', classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Illusione', description: 'Creatura diventa invisibile fino ad attaccare o lanciare.' },
      { name: 'Tiro Infuocato', classes: ['Druido', 'Stregone', 'Mago'], school: 'Evocazione', description: '8d6 danni da fuoco in sfera 20ft. Metà su TS riuscito.' },
      { name: 'Oscurità', classes: ['Stregone', 'Warlock', 'Mago'], school: 'Evocazione', description: 'Oscurità magica in sfera 15ft. Non può essere penetrata.' },
      { name: 'Nebbia della Morte', classes: ['Chierico', 'Druido', 'Mago'], school: 'Coniurazione', description: 'Nebbia nerastra 20ft. 4d8 necrotici per passarci attraverso.' },
      { name: 'Follia Esilarante', classes: ['Bardo', 'Warlock', 'Mago'], school: 'Ammaliamento', description: 'Una creatura ride incontrollabilmente e cade prona.' },
      { name: 'Sonno del Vento', classes: ['Druido', 'Ranger'], school: 'Evocazione', description: 'Uccelli/Insetti distraggono i nemici in un\'area.' },
      { name: 'Forza dell\'Orso', classes: ['Druido', 'Ranger', 'Stregone', 'Mago'], school: 'Trasmutazione', description: 'Forza del bersaglio +4 per 1 ora.' },
      { name: 'Corda del Potere', classes: ['Mago'], school: 'Trasmutazione', description: 'Una corda si muove e si avvolge da sola.' },
      { name: 'Rilevare i Pensieri', classes: ['Bardo', 'Stregone', 'Mago'], school: 'Divinazione', description: 'Leggi la mente superficiale di una creatura per 1 minuto.' },
      { name: 'Ragnatela', classes: ['Stregone', 'Mago'], school: 'Coniurazione', description: 'Ragnatela difficile su cubo 20ft. Blocca movimento.' },
      { name: 'Nube di Pugnali', classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Coniurazione', description: 'Cubo 5ft di lame vorticanti. 4d4 taglienti per round.' },
      { name: 'Misty Step', classes: ['Stregone', 'Warlock', 'Mago'], school: 'Coniurazione', description: 'Teletrasporto bonus action fino a 30ft in spazio visibile.' },
      { name: 'Suggestione', classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Ammaliamento', description: 'Suggerisci un\'azione ragionevole a una creatura.' },
      { name: 'Silenzio', classes: ['Bardo', 'Chierico', 'Ranger'], school: 'Illusione', ritual: true, description: 'Sfera 20ft di silenzio assoluto per 10 minuti.' },
      { name: 'Preghiera Spirituale', classes: ['Chierico'], school: 'Evocazione', description: 'Arma spirituale fluttua. Bonus action attacca per 1d8+WIS.' }
    ],
    level3: [
      { name: 'Palla di Fuoco', classes: ['Stregone', 'Mago'], school: 'Evocazione', description: '8d6 fuoco in sfera 20ft. TS Destrezza per metà.' },
      { name: 'Fulmine', classes: ['Stregone', 'Mago'], school: 'Evocazione', description: 'Linea 100ft x 5ft. 8d6 fulmini. TS Destrezza per metà.' },
      { name: 'Volare', classes: ['Stregone', 'Warlock', 'Mago'], school: 'Trasmutazione', description: 'Velocità di volo 60ft per 10 minuti.' },
      { name: 'Arma Spettrale', classes: ['Chierico'], school: 'Evocazione', description: 'Lancia incantesimi con arma spettrale alla distanza di 60ft.' },
      { name: 'Luce del Giorno', classes: ['Chierico', 'Druido', 'Ranger', 'Paladino', 'Stregone'], school: 'Evocazione', description: 'Sfera 60ft di luce solare per 1 ora.' },
      { name: 'Contrattacco Magico', classes: ['Stregone', 'Warlock', 'Mago'], school: 'Abiurazione', description: 'Interrompi un incantesimo di 3° livello o inferiore.' },
      { name: 'Evoca Elementale Minore', classes: ['Druido', 'Mago'], school: 'Coniurazione', description: 'Evoca uno sprite, pseudo-drago, quasit o imp.' },
      { name: 'Gaseous Form', classes: ['Stregone', 'Warlock', 'Mago'], school: 'Trasmutazione', description: 'Trasforma il bersaglio in nebbia incosciente per 1 ora.' },
      { name: 'Lento', classes: ['Stregone', 'Mago'], school: 'Trasmutazione', description: 'Rallenta fino a 6 creature. TS o -2 CA, metà velocità.' },
      { name: 'Animare i Morti', classes: ['Chierico', 'Mago'], school: 'Necromanzia', description: 'Crea uno scheletro o zombie da un cadavere vicino.' }
    ],
    level4: [
      { name: 'Porta Dimensionale', classes: ['Bardo', 'Stregone', 'Warlock', 'Mago'], school: 'Coniurazione', description: 'Teletrasporto tu e un opzionale compagno fino a 500ft.' },
      { name: 'Grande Invisibilità', classes: ['Bardo', 'Stregone', 'Mago'], school: 'Illusione', description: 'Invisibilità anche mentre si attacca o lancia, per 1 minuto.' },
      { name: 'Metamorfosi', classes: ['Bardo', 'Druido', 'Stregone', 'Mago'], school: 'Trasmutazione', description: 'Trasforma una creatura in un diverso animale.' },
      { name: 'Blight', classes: ['Druido', 'Stregone', 'Warlock', 'Mago'], school: 'Necromanzia', description: 'Prosciuga la vitalità. 8d8 necrotici. TS Costituzione.' },
      { name: 'Confusione', classes: ['Bardo', 'Druido', 'Stregone', 'Mago'], school: 'Ammaliamento', description: 'Creature in sfera 10ft agiscono a caso per 1 minuto.' }
    ],
    level5: [
      { name: 'Nube di Contagio', classes: ['Chierico', 'Mago'], school: 'Coniurazione', description: '3d8 veleno per round in sfera 20ft. TS Costituzione.' },
      { name: 'Cono del Freddo', classes: ['Stregone', 'Mago'], school: 'Evocazione', description: 'Cono 60ft. 8d8 freddo. TS Costituzione per metà.' },
      { name: 'Teletrasporto', classes: ['Bardo', 'Stregone', 'Mago'], school: 'Coniurazione', description: 'Teletrasporto verso un luogo familiare su questo piano.' },
      { name: 'Resurrezione', classes: ['Bardo', 'Chierico', 'Druido'], school: 'Necromanzia', description: 'Riporta in vita una creatura morta da non più di 1 secolo.' },
      { name: 'Scrutare', classes: ['Bardo', 'Chierico', 'Druido', 'Paladino', 'Warlock', 'Mago'], school: 'Divinazione', description: 'Vedi tramite un sensore invisibile vicino a una creatura.' }
    ],
    level6: [
      { name: 'Catena di Fulmini', classes: ['Stregone', 'Mago'], school: 'Evocazione', description: 'Fulmine salta su 4 creature vicine. 10d8 ciascuna. TS DEX.' },
      { name: 'Disgregare', classes: ['Stregone', 'Mago'], school: 'Trasmutazione', description: 'Raggio che distrugge oggetti non magici o riduce a 0 PF.' },
      { name: 'Sunbeam', classes: ['Druido', 'Stregone', 'Mago'], school: 'Evocazione', description: 'Raggio abbagliante, 6d8 radianti, acceca e colpisce.' }
    ],
    level7: [
      { name: 'Teleport', classes: ['Bardo', 'Stregone', 'Mago'], school: 'Coniurazione', description: 'Teletrasporto immediato verso luogo conosciuto.' },
      { name: 'Prismatic Spray', classes: ['Stregone', 'Mago'], school: 'Evocazione', description: 'Cono di raggi prismatici con effetti casuali.' }
    ],
    level8: [
      { name: 'Tsunami', classes: ['Druido'], school: 'Coniurazione', description: 'Muro d\'acqua che si abbatte sull\'area.' },
      { name: 'Sunburst', classes: ['Druido', 'Stregone', 'Mago'], school: 'Evocazione', description: 'Esplosione di luce solare. 12d6 radianti. Cecità.' }
    ],
    level9: [
      { name: 'Desiderio', classes: ['Stregone', 'Mago'], school: 'Coniurazione', description: 'L\'incantesimo più potente. Altera la realtà stessa.' },
      { name: 'Meteore', classes: ['Stregone', 'Mago'], school: 'Evocazione', description: '4 meteore in un\'area. 20d6 fuoco+contundente ciascuna.' },
      { name: 'Vera Resurrezione', classes: ['Chierico', 'Druido'], school: 'Necromanzia', description: 'Riporta in vita qualsiasi creatura morta, anche a pezzi.' }
    ]
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
