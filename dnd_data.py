"""
D&D 5e data for auto-suggestions and reference panels.
"""

CLASSES = {
    "Barbaro": {
        "hit_dice": "d12",
        "primary": "Forza",
        "saves": ["Forza", "Costituzione"],
        "armor": "Armatura leggera, armatura media, scudi",
        "weapons": "Armi semplici, armi marziali",
        "description": (
            "Un feroce guerriero primitivo che scatena una furia incontrollabile."
            " Il Barbaro è impavido e implacabile sul campo di battaglia."
        ),
        "subclass_name": "Cammino Primordiale",
        "subclass_level": 3,
        "subclasses": [
            "Berserker", "Tòtem Guerriero", "Tempesta Ancestrale",
            "Araldo della Battaglia", "Cuore Selvaggio",
        ],
        "features": {
            1:  ["Furia (2×/riposo lungo)", "Difesa senz'Armatura"],
            2:  ["Azione Sconsiderata", "Senso del Pericolo"],
            3:  ["Cammino Primordiale"],
            4:  ["Aumento Caratteristica"],
            5:  ["Attacco Extra", "Corsa Veloce"],
            6:  ["Caratteristica del Cammino"],
            7:  ["Istinto Ferino"],
            8:  ["Aumento Caratteristica"],
            9:  ["Critico Brutale (×1)"],
            10: ["Caratteristica del Cammino"],
            11: ["Furia Implacabile"],
            12: ["Aumento Caratteristica"],
            15: ["Vendetta Persistente"],
            16: ["Aumento Caratteristica"],
            17: ["Critico Brutale (×3)"],
            18: ["Potere Primordiale"],
            19: ["Aumento Caratteristica"],
            20: ["Campione Primordiale"],
        },
    },
    "Bardo": {
        "hit_dice": "d8",
        "primary": "Carisma",
        "saves": ["Destrezza", "Carisma"],
        "armor": "Armatura leggera",
        "weapons": "Armi semplici, balestre a mano, spade lunghe, rapiere, spade corte",
        "description": (
            "Un artista ispirato e mago versatile che usa musica e parole"
            " come fonte di potere magico."
        ),
        "subclass_name": "Collegio Bardico",
        "subclass_level": 3,
        "subclasses": [
            "Sapere", "Valore", "Fascino", "Bisbigli", "Creazione", "Eloquenza",
        ],
        "features": {
            1:  ["Incantesimi", "Ispirazione Bardica (d6)"],
            2:  ["Multicompetenza", "Canto della Quiete"],
            3:  ["Collegio Bardico", "Competenza Esperta"],
            4:  ["Aumento Caratteristica"],
            5:  ["Font d'Ispirazione", "Controincantatrice"],
            6:  ["Caratteristica del Collegio"],
            7:  ["Segreti Magici (2 incantesimi)"],
            8:  ["Aumento Caratteristica"],
            10: ["Segreti Magici (2 incantesimi)", "Ispirazione Bardica (d10)"],
            20: ["Superiorità"],
        },
    },
    "Chierico": {
        "hit_dice": "d8",
        "primary": "Saggezza",
        "saves": ["Saggezza", "Carisma"],
        "armor": "Tutte le armature, scudi",
        "weapons": "Armi semplici",
        "description": (
            "Un intermediario divino tra gli dèi e i mortali, capace di magie"
            " potenti e di canalizzare l'energia sacra."
        ),
        "subclass_name": "Dominio Divino",
        "subclass_level": 1,
        "subclasses": [
            "Conoscenza", "Vita", "Luce", "Natura", "Tempesta",
            "Inganno", "Guerra", "Ordine", "Pace", "Crepuscolo",
        ],
        "features": {
            1:  ["Incantesimi", "Canalizza Divinità (1×/riposo breve)", "Dominio Divino"],
            2:  ["Canalizza Divinità (2 utilizzi)"],
            4:  ["Aumento Caratteristica"],
            8:  ["Aumento Caratteristica", "Colpo Divino"],
            10: ["Intervento Divino"],
            20: ["Intervento Divino migliorato"],
        },
    },
    "Druido": {
        "hit_dice": "d8",
        "primary": "Saggezza",
        "saves": ["Intelligenza", "Saggezza"],
        "armor": "Armatura leggera, media (non metallica), scudi (non metallici)",
        "weapons": "Clava, daga, dardo, giavellotto, mazza, bastone, scimitarra, falcetto, fionda, lancia",
        "description": (
            "Guardiano della natura che canalizza la magia primordiale del mondo"
            " naturale e può trasformarsi in animali."
        ),
        "subclass_name": "Cerchio Druidico",
        "subclass_level": 2,
        "subclasses": [
            "Luna", "Terra", "Sogno", "Pastore", "Spore", "Stelle", "Selvatico",
        ],
        "features": {
            1:  ["Druidico", "Incantesimi"],
            2:  ["Forma Selvatica (CR 1/4)", "Cerchio Druidico"],
            4:  ["Forma Selvatica (CR 1/2)", "Aumento Caratteristica"],
            8:  ["Aumento Caratteristica"],
            18: ["Corpi Senza Tempo", "Incantatore delle Bestie"],
            20: ["Archimago"],
        },
    },
    "Guerriero": {
        "hit_dice": "d10",
        "primary": "Forza o Destrezza",
        "saves": ["Forza", "Costituzione"],
        "armor": "Tutte le armature, scudi",
        "weapons": "Armi semplici, armi marziali",
        "description": (
            "Maestro del combattimento, esperto di strategie militari e tecniche"
            " di combattimento di ogni tipo."
        ),
        "subclass_name": "Archetipo Marziale",
        "subclass_level": 3,
        "subclasses": [
            "Campione", "Maestro di Battaglia", "Cavaliere Eldritch",
            "Arciere Arcano", "Cavaliere", "Samurai", "Soldato Psi",
        ],
        "features": {
            1:  ["Stile di Combattimento", "Secondo Respiro"],
            2:  ["Scatto d'Azione"],
            3:  ["Archetipo Marziale"],
            4:  ["Aumento Caratteristica"],
            5:  ["Attacco Extra (2×)"],
            9:  ["Indifferente"],
            11: ["Attacco Extra (3×)"],
            20: ["Attacco Extra (4×)"],
        },
    },
    "Ladro": {
        "hit_dice": "d8",
        "primary": "Destrezza",
        "saves": ["Destrezza", "Intelligenza"],
        "armor": "Armatura leggera",
        "weapons": "Armi semplici, balestre a mano, spade lunghe, rapiere, spade corte",
        "description": (
            "Un esperto di astuzia e agilità, capace di colpire furtivamente"
            " i nemici e disattivare trappole con destrezza sopraffina."
        ),
        "subclass_name": "Archetipo del Ladro",
        "subclass_level": 3,
        "subclasses": [
            "Ladro", "Assassino", "Bugiardo Arcano", "Impostore",
            "Fantasma", "Scout", "Inquisitore Soulknife",
        ],
        "features": {
            1:  ["Competenza Esperta", "Attacco Furtivo (1d6)", "Gergo dei Ladri"],
            2:  ["Azione Scaltra"],
            3:  ["Archetipo del Ladro"],
            4:  ["Aumento Caratteristica"],
            5:  ["Schivata Prodigiosa"],
            6:  ["Competenza Esperta"],
            7:  ["Elusivo"],
            11: ["Intelligenza Superiore"],
            14: ["Senso Cieco"],
        },
    },
    "Mago": {
        "hit_dice": "d6",
        "primary": "Intelligenza",
        "saves": ["Intelligenza", "Saggezza"],
        "armor": "Nessuna",
        "weapons": "Balestre, daga, freccette, fionda, bastone, spada corta",
        "description": (
            "Uno studioso di magia arcana che lancia incantesimi di potere"
            " straordinario. Dedica la vita allo studio dell'arcano."
        ),
        "subclass_name": "Tradizione Arcana",
        "subclass_level": 2,
        "subclasses": [
            "Abiurazione", "Ammaliamento", "Divinazione", "Evocazione",
            "Illusione", "Invocazione", "Necromanzia", "Trasmutazione",
            "Magia del Guerriero", "Cronomanzia",
        ],
        "features": {
            1:  ["Incantesimi", "Recupero Arcano"],
            2:  ["Tradizione Arcana"],
            4:  ["Aumento Caratteristica"],
            18: ["Dominio degli Incantesimi"],
            20: ["Firma degli Incantesimi"],
        },
    },
    "Monaco": {
        "hit_dice": "d8",
        "primary": "Destrezza e Saggezza",
        "saves": ["Forza", "Destrezza"],
        "armor": "Nessuna",
        "weapons": "Armi semplici, spade corte",
        "description": (
            "Un maestro delle arti marziali che sfrutta il ki, la forza vitale,"
            " per compiere prodezze soprannaturali in combattimento."
        ),
        "subclass_name": "Tradizione Monastica",
        "subclass_level": 3,
        "subclasses": [
            "Quattro Elementi", "Ombra", "Palmo Aperto",
            "Sole e Luna", "Anima Vuota", "Drunken Master", "Kensei",
        ],
        "features": {
            1:  ["Arti Marziali", "Difesa senz'Armatura"],
            2:  ["Ki", "Passo del Vento", "Pioggia di Colpi", "Pazienza Difensiva"],
            3:  ["Tradizione Monastica", "Deviare Proiettili"],
            4:  ["Caduta Rallentata", "Aumento Caratteristica"],
            5:  ["Attacco Extra", "Colpo Stordente"],
            6:  ["Colpi Magici del Ki", "Caratteristica della Tradizione"],
        },
    },
    "Paladino": {
        "hit_dice": "d10",
        "primary": "Forza e Carisma",
        "saves": ["Saggezza", "Carisma"],
        "armor": "Tutte le armature, scudi",
        "weapons": "Armi semplici, armi marziali",
        "description": (
            "Un guerriero sacro legato da un giuramento solenne, che combina"
            " abilità marziale con potere divino."
        ),
        "subclass_name": "Sacro Giuramento",
        "subclass_level": 3,
        "subclasses": [
            "Devozione", "Antichi", "Vendetta", "Conquista",
            "Redenzione", "Gloria", "Watchers",
        ],
        "features": {
            1:  ["Senso del Divino", "Imposizione delle Mani"],
            2:  ["Stile di Combattimento", "Incantesimi", "Smiting Divino"],
            3:  ["Salute Divina", "Sacro Giuramento"],
            4:  ["Aumento Caratteristica"],
            5:  ["Attacco Extra"],
            6:  ["Aura di Protezione"],
        },
    },
    "Ranger": {
        "hit_dice": "d10",
        "primary": "Destrezza e Saggezza",
        "saves": ["Forza", "Destrezza"],
        "armor": "Armatura leggera, armatura media, scudi",
        "weapons": "Armi semplici, armi marziali",
        "description": (
            "Un cacciatore e esploratore che combina abilità marziale con"
            " magia naturale per sopravvivere in qualsiasi ambiente."
        ),
        "subclass_name": "Archetipo del Ranger",
        "subclass_level": 3,
        "subclasses": [
            "Cacciatore", "Maestro delle Bestie", "Falconiere",
            "Ambientalista", "Slayer dei Mostri",
        ],
        "features": {
            1:  ["Nemico Prescelto", "Esploratore Naturale"],
            2:  ["Stile di Combattimento", "Incantesimi"],
            3:  ["Consapevolezza Primitiva", "Archetipo del Ranger"],
            4:  ["Aumento Caratteristica"],
            5:  ["Attacco Extra"],
        },
    },
    "Stregone": {
        "hit_dice": "d6",
        "primary": "Carisma",
        "saves": ["Costituzione", "Carisma"],
        "armor": "Nessuna",
        "weapons": "Balestre, daga, freccette, fionda, bastone, spada corta",
        "description": (
            "Un incantatore che attinge a una fonte magica innata, spesso legata"
            " a un'eredità soprannaturale o a un evento straordinario."
        ),
        "subclass_name": "Origine Stregonesca",
        "subclass_level": 1,
        "subclasses": [
            "Linea di Sangue Draconico", "Anima Selvaggia",
            "Magia Divina", "Ombra", "Tempesta",
        ],
        "features": {
            1:  ["Incantesimi", "Origine Stregonesca"],
            2:  ["Punti Stregoneria", "Incantesimi Flessibili"],
            4:  ["Aumento Caratteristica"],
            6:  ["Caratteristica dell'Origine"],
            20: ["Forma del Capostipite"],
        },
    },
    "Warlock": {
        "hit_dice": "d8",
        "primary": "Carisma",
        "saves": ["Saggezza", "Carisma"],
        "armor": "Armatura leggera",
        "weapons": "Armi semplici",
        "description": (
            "Un incantatore legato a un potente essere soprannaturale attraverso"
            " un patto che conferisce potere arcano straordinario."
        ),
        "subclass_name": "Patrono del Warlock",
        "subclass_level": 1,
        "subclasses": [
            "Arcidemone", "Grande Antico", "Fatato",
            "Celestiale", "Leviatano", "Oscurantista",
        ],
        "features": {
            1:  ["Incantesimi del Patrono", "Magia dei Patti (slot recuperati al riposo breve)"],
            2:  ["Invocazioni Eldritch"],
            3:  ["Privilegio del Patto"],
            5:  ["Magia Mistica"],
        },
    },
}

RACES = {
    "Umano": {
        "bonuses": "+1 a tutte le caratteristiche",
        "speed": 30,
        "traits": ["Lingue extra: una a scelta", "Versatile: competenza extra"],
        "description": "Versatile e ambiziosi, gli umani si adattano ovunque.",
        "subraces": [],
    },
    "Elfo": {
        "bonuses": "Destrezza +2",
        "speed": 30,
        "traits": ["Visione nel Buio 18 m", "Sensi Acuti (Percezione)", "Retaggio Fatato", "Trance (4h sonno)"],
        "description": "Creature graziose dai lunghi anni di vita, sensibili alla magia.",
        "subraces": ["Alto Elfo (+1 INT)", "Elfo dei Boschi (+1 SAG)", "Drow (+1 CAR)"],
    },
    "Nano": {
        "bonuses": "Costituzione +2",
        "speed": 25,
        "traits": ["Visione nel Buio 18 m", "Resistenza ai Veleni", "Resilienza Nanica", "Addestramento in Pietra"],
        "description": "Robusti costruttori e guerrieri, fedeli custodi delle tradizioni.",
        "subraces": ["Nano delle Colline (+1 SAG)", "Nano delle Montagne (+2 FOR)"],
    },
    "Halfling": {
        "bonuses": "Destrezza +2",
        "speed": 25,
        "traits": ["Fortuna", "Valoroso", "Furtivo", "Resistenza Halfling"],
        "description": "Piccoli e ottimisti, gli halfling amano le comodità di casa.",
        "subraces": ["Halfling Piedelieve (+1 CAR)", "Halfling Resistente (+1 COS)"],
    },
    "Gnomo": {
        "bonuses": "Intelligenza +2",
        "speed": 25,
        "traits": ["Visione nel Buio 18 m", "Furbizia Gnomica", "Senso della Pietra"],
        "description": "Curiosi inventori e illusionisti, amanti della magia e del sapere.",
        "subraces": ["Gnomo delle Foreste (+1 DES)", "Gnomo delle Rocce (+1 COS)"],
    },
    "Mezzorco": {
        "bonuses": "Forza +2, Costituzione +1",
        "speed": 30,
        "traits": ["Visione nel Buio 18 m", "Minaccioso (Intimidire)", "Resistenza Brutale", "Attacchi Implacabili"],
        "description": "Guerrieri fieri che portano il sangue degli orchi, forti e determinati.",
        "subraces": [],
    },
    "Tiefling": {
        "bonuses": "Intelligenza +1, Carisma +2",
        "speed": 30,
        "traits": ["Visione nel Buio 18 m", "Resistenza Infernale (fuoco)", "Eredità Infernale (incantesimi)"],
        "description": "Discendenti di patti con diavoli, portano il marchio degli Inferi.",
        "subraces": [],
    },
    "Draconide": {
        "bonuses": "Forza +2, Carisma +1",
        "speed": 30,
        "traits": ["Ascendenza Draconica", "Soffio del Drago (1× riposo breve)", "Resistenza Draconica"],
        "description": "Umanoidi simili ai draghi, orgogliosi e onorosi.",
        "subraces": [],
    },
    "Mezzorco": {
        "bonuses": "Forza +2, Costituzione +1",
        "speed": 30,
        "traits": ["Visione nel Buio 18 m", "Minaccioso", "Resistenza Brutale", "Attacchi Implacabili"],
        "description": "Guerrieri nati, con il sangue degli orchi che scorre nelle vene.",
        "subraces": [],
    },
}

BACKGROUNDS = [
    "Accolito", "Artigiano di Gilda", "Cavaliere", "Charlatan",
    "Criminale", "Eremita", "Eroe del Popolo", "Marinaio",
    "Nobile", "Orfano", "Saggio", "Soldato",
]

ALIGNMENTS = [
    "Legale Buono", "Neutrale Buono", "Caotico Buono",
    "Legale Neutrale", "Vero Neutrale", "Caotico Neutrale",
    "Legale Malvagio", "Neutrale Malvagio", "Caotico Malvagio",
]

SPELL_SCHOOLS = [
    "Abiurazione", "Ammaliamento", "Divinazione", "Evocazione",
    "Illusione", "Invocazione", "Necromanzia", "Trasmutazione",
]
