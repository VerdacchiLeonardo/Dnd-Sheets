"""
Visual constants for the D&D app: colors, fonts, sizing.
"""
import os
from PIL import ImageFont

_BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS_DIR = os.path.join(_BASE, "assets", "fonts")

# ── Palette ─────────────────────────────────────────────────────────────────
BG          = "#080808"
BG_PANEL    = "#0c0c0c"
BG_WIDGET   = "#161616"
BG_ENTRY    = "#1a1408"

TEXT        = "#f0e6d3"
TEXT_DIM    = "#9a8a70"

GOLD        = "#c8a951"
GOLD_BRIGHT = "#f5d680"
GOLD_DIM    = "#6a5428"
GOLD_GLOW   = (200, 150, 40)

BLUE        = "#3a6fa8"
BLUE_BRIGHT = "#6aaae8"
BLUE_GLOW   = (60, 100, 200)

RED         = "#7a1a1a"
RED_BRIGHT  = "#c03030"

BORDER      = "#2a1e08"
BORDER_BRIGHT = "#6a5020"

# Compass segment colors  (base, hover, selected)
SECTION_COLORS = [
    ("#3a1010", "#7a2020", "#c03030"),  # Classe    – rosso
    ("#102030", "#1a4060", "#2a70b0"),  # Razza     – blu
    ("#103010", "#1a6030", "#2a9050"),  # Stats     – verde
    ("#301010", "#602020", "#a03030"),  # Combatt.  – cremisi
    ("#302010", "#604020", "#a07030"),  # Abilità   – arancio
    ("#101030", "#202060", "#3030a0"),  # Equipag.  – viola
    ("#201030", "#4a1060", "#8020a0"),  # Magie     – viola-rosa
    ("#102020", "#1a5040", "#2a8060"),  # Note      – teal
]

PARTICLE_COLORS = [
    (200, 150, 40),   # spirito dorato
    (60, 110, 210),   # spirito blu
    (180, 180, 255),  # spirito bianco-blu
    (200, 60,  60),   # brace rossa
    (100, 200, 180),  # spirito acqua
]

# ── Font loading ─────────────────────────────────────────────────────────────
def pil_font(name: str, size: int) -> ImageFont.FreeTypeFont:
    path = os.path.join(FONTS_DIR, name)
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

# Pre-loaded PIL fonts
def fonts():
    return {
        "title":    pil_font("Cinzel-Bold.ttf",    72),
        "subtitle": pil_font("Cinzel-Regular.ttf", 36),
        "heading":  pil_font("Cinzel-Bold.ttf",    22),
        "label":    pil_font("Cinzel-Regular.ttf", 15),
        "small":    pil_font("Cinzel-Regular.ttf", 12),
        "compass":  pil_font("Cinzel-Bold.ttf",    14),
        "icon":     pil_font("Cinzel-Bold.ttf",    28),
    }
