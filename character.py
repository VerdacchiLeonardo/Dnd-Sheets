import math
import json
import base64
import io

ABILITY_KEYS = ["str", "dex", "con", "int", "wis", "cha"]

ABILITY_INFO = {
    "str": {"label": "Forza",        "short": "FOR"},
    "dex": {"label": "Destrezza",    "short": "DES"},
    "con": {"label": "Costituzione", "short": "COS"},
    "int": {"label": "Intelligenza", "short": "INT"},
    "wis": {"label": "Saggezza",     "short": "SAG"},
    "cha": {"label": "Carisma",      "short": "CAR"},
}

SKILLS = [
    ("Acrobazia",          "dex"),
    ("Addestrare Animali", "wis"),
    ("Arcano",             "int"),
    ("Atletica",           "str"),
    ("Furtività",          "dex"),
    ("Indagare",           "int"),
    ("Inganno",            "cha"),
    ("Intimidire",         "cha"),
    ("Intuizione",         "wis"),
    ("Medicina",           "wis"),
    ("Natura",             "int"),
    ("Percezione",         "wis"),   # index 11 — used for Passive Perception
    ("Performance",        "cha"),
    ("Persuasione",        "cha"),
    ("Rapidità di Mano",   "dex"),
    ("Religione",          "int"),
    ("Storia",             "int"),
    ("Sopravvivenza",      "wis"),
]

ALIGNMENTS = [
    "Legale Buono", "Neutrale Buono", "Caotico Buono",
    "Legale Neutrale", "Vero Neutrale", "Caotico Neutrale",
    "Legale Malvagio", "Neutrale Malvagio", "Caotico Malvagio",
]

HIT_DICE_OPTIONS = ["d4", "d6", "d8", "d10", "d12"]


def ability_modifier(score) -> int:
    try:
        return math.floor((int(score) - 10) / 2)
    except (ValueError, TypeError):
        return 0


def proficiency_bonus(level) -> int:
    try:
        lvl = max(1, min(20, int(level)))
        return math.ceil(lvl / 4) + 1
    except (ValueError, TypeError):
        return 2


def format_modifier(mod: int) -> str:
    return f"+{mod}" if mod >= 0 else str(mod)


def default_character() -> dict:
    d = {
        "name":        "",
        "race":        "",
        "class_":      "",
        "subclass":    "",
        "level":       1,
        "background":  "",
        "alignment":   "",
        "xp":          0,
        "inspiration": False,
        # Ability scores
        "str": 10, "dex": 10, "con": 10,
        "int": 10, "wis": 10, "cha": 10,
        # Saving throw proficiencies
        "save_str": False, "save_dex": False, "save_con": False,
        "save_int": False, "save_wis": False, "save_cha": False,
        # Combat stats
        "hp_max": 0, "hp_current": 0, "hp_temp": 0,
        "ac": 10, "speed": 30,
        "hit_dice_type": "d8", "hit_dice_current": 1,
        # Death saves
        "death_success_1": False, "death_success_2": False, "death_success_3": False,
        "death_fail_1":    False, "death_fail_2":    False, "death_fail_3":    False,
        # Attacks (list of dicts)
        "attacks": [],
        # Currency
        "cp": 0, "sp": 0, "ep": 0, "gp": 0, "pp": 0,
        # Free-text areas
        "equipment": "",
        "features":  "",
        "backstory": "",
        "notes":     "",
        "spells":    "",
        # Image support
        "character_image": "",  # base64 encoded
    }
    for i in range(len(SKILLS)):
        d[f"skill_{i}_prof"]   = False
        d[f"skill_{i}_expert"] = False
    return d


def load_character(path: str) -> dict:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    defaults = default_character()
    for key, val in defaults.items():
        if key not in data:
            data[key] = val
    return data


def save_character(data: dict, path: str):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def encode_image(path: str) -> str:
    from PIL import Image
    img = Image.open(path)
    img.thumbnail((400, 600))
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode()


def decode_image_pil(data: str):
    from PIL import Image
    return Image.open(io.BytesIO(base64.b64decode(data)))
