"""Visual constants: colors, fonts."""
import os
from PIL import ImageFont

_BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS_DIR = os.path.join(_BASE, "assets", "fonts")
SAVES_DIR = os.path.join(_BASE, "saves")

# ── Palette ──────────────────────────────────────────────────────────────────
BG           = "#080808"
BG_PANEL     = "#0e0e0e"
BG_WIDGET    = "#161616"
BG_ENTRY     = "#111108"

TEXT         = "#f0f0f0"        # WHITE primario
TEXT_DIM     = "#909090"
TEXT_BRIGHT  = "#ffffff"

GOLD         = "#c8a951"
GOLD_BRIGHT  = "#f5d680"
GOLD_DIM     = "#5a4820"

BORDER       = "#2a2a2a"
BORDER_GOLD  = "#5a4820"

# Backward compat aliases
GOLD_GLOW    = (200, 150, 40)
BORDER_BRIGHT = GOLD_DIM

# Compass segment colors (base, hover, selected) — scuri con testo bianco
SECTION_COLORS = [
    ("#1a0808", "#3a1010", "#6a1818"),   # Classe    - rosso scuro
    ("#08101a", "#10253a", "#1a4060"),   # Razza     - blu scuro
    ("#081a08", "#10381a", "#1a6030"),   # Stats     - verde scuro
    ("#1a0d08", "#381808", "#6a2808"),   # Combatt.  - arancio scuro
    ("#150815", "#2a1030", "#4a1a55"),   # Abilità   - viola scuro
    ("#08080f", "#10101e", "#1a1a3a"),   # Equipag.  - indaco scuro
    ("#0f0815", "#201030", "#3a185a"),   # Magie     - viola-blu scuro
    ("#08100d", "#10251a", "#1a3f2a"),   # Note      - verde-teal scuro
]

PARTICLE_COLORS = [
    (200, 200, 255),  # spirito bianco-blu
    (150, 180, 255),  # spirito celeste
    (200, 150, 255),  # spirito viola
    (255, 220, 150),  # spirito dorato
    (150, 255, 200),  # spirito acqua
]


def pil_font(name: str, size: int) -> ImageFont.FreeTypeFont:
    try:
        return ImageFont.truetype(os.path.join(FONTS_DIR, name), size)
    except Exception:
        return ImageFont.load_default()


def fonts():
    return {
        "title":    pil_font("Cinzel-Bold.ttf",    72),
        "subtitle": pil_font("Cinzel-Regular.ttf", 34),
        "heading":  pil_font("Cinzel-Bold.ttf",    20),
        "label":    pil_font("Cinzel-Regular.ttf", 14),
        "small":    pil_font("Cinzel-Regular.ttf", 11),
        "compass":  pil_font("Cinzel-Bold.ttf",    13),
        "icon":     pil_font("Cinzel-Bold.ttf",    24),
    }
