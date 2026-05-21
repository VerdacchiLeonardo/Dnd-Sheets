"""
Circular compass navigation widget drawn on a tk.Canvas.
Eight sections arranged like a compass rose.
"""
import math
import tkinter as tk
from PIL import ImageTk

from app.theme import BG, GOLD, GOLD_BRIGHT, GOLD_DIM, SECTION_COLORS, TEXT, fonts
from app.glow import glow_image
from app.particles import ParticleSystem

# ── Section definitions ──────────────────────────────────────────────────────
SECTIONS = [
    {"key": "class",      "label": "Classe",         "symbol": "⚔"},
    {"key": "race",       "label": "Razza",           "symbol": "♦"},
    {"key": "stats",      "label": "Statistiche",     "symbol": "⬡"},
    {"key": "combat",     "label": "Combattimento",   "symbol": "♥"},
    {"key": "skills",     "label": "Abilità",         "symbol": "☆"},
    {"key": "equipment",  "label": "Equipaggiamento", "symbol": "⚙"},
    {"key": "spells",     "label": "Magie",           "symbol": "✦"},
    {"key": "notes",      "label": "Note",            "symbol": "☷"},
]

N = len(SECTIONS)
SWEEP  = 360 / N    # degrees per section
GAP    = 4.0        # gap between segments (degrees)


def _section_at(angle_deg: float) -> int:
    """Return section index for a given canvas angle (tkinter convention)."""
    # In tkinter: 0° = right, angles go CCW (mathematically)
    # Sections start at top (90°) and go CW, so section 0 covers 90±22.5°
    # Convert to "clockwise from top" index:
    cw_from_top = (90 - angle_deg) % 360
    return int(cw_from_top / SWEEP) % N


class CompassWidget:
    """
    A compass rose drawn on a tk.Canvas.
    Calls on_select(section_key) when a section is clicked.
    """

    def __init__(self, canvas: tk.Canvas, on_select, cx: int = 0, cy: int = 0, r: float = 200):
        self.canvas    = canvas
        self.on_select = on_select
        self.cx = cx
        self.cy = cy
        self.r  = r
        self._hover_idx: int | None = None
        self._sel_idx:   int | None = None
        self._photos:    list       = []
        self._item_ids:  list[int]  = []  # segment arc ids
        self._label_ids: list[int]  = []  # label image ids
        self._sym_ids:   list[int]  = []  # symbol image ids
        self._fonts = fonts()
        self._draw_all()
        canvas.bind("<Motion>",  self._on_motion)
        canvas.bind("<Button-1>", self._on_click)

    # ── Drawing ──────────────────────────────────────────────────────────────
    def reposition(self, cx: int, cy: int, r: float):
        self.cx, self.cy, self.r = cx, cy, r
        for iid in (*self._item_ids, *self._label_ids, *self._sym_ids):
            self.canvas.delete(iid)
        self._item_ids.clear()
        self._label_ids.clear()
        self._sym_ids.clear()
        self._photos.clear()
        self._draw_all()

    def _draw_all(self):
        cv = self.canvas
        cx, cy, r = self.cx, self.cy, self.r
        r_in  = r * 0.22   # inner radius (center hole)
        r_out = r * 0.88   # outer radius of segments
        r_sym = r * 0.58   # radius where symbol sits
        r_lbl = r * 1.00   # radius where label sits (outside)

        for i, sec in enumerate(SECTIONS):
            col_base, col_hover, col_sel = SECTION_COLORS[i]
            color = (col_sel if i == self._sel_idx
                     else col_hover if i == self._hover_idx
                     else col_base)

            # Tkinter arc: start measured from 3 o'clock, CCW
            start = 90 - (i * SWEEP) - SWEEP / 2 + GAP / 2
            extent = -(SWEEP - GAP)

            arc_id = cv.create_arc(
                cx - r_out, cy - r_out, cx + r_out, cy + r_out,
                start=start, extent=extent,
                style=tk.PIESLICE,
                fill=color, outline=GOLD_DIM, width=1,
                tags=("compass_seg", f"seg_{i}"),
            )
            self._item_ids.append(arc_id)

            # Inner circle mask (white background to punch hole)
            mid_angle = math.radians(90 - i * SWEEP)
            # Symbol: pre-rendered with PIL glow
            sx = cx + r_sym * math.cos(mid_angle)
            sy = cy - r_sym * math.sin(mid_angle)

            sym_img = glow_image(
                sec["symbol"],
                self._fonts["icon"],
                img_size=(56, 56),
                text_color=(240, 220, 160),
                glow_color=(180, 110, 20),
                glow_radius=8,
                glow_strength=2,
                bg_color=(0, 0, 0),  # transparent-ish
            )
            sym_ph = ImageTk.PhotoImage(sym_img)
            self._photos.append(sym_ph)
            sym_id = cv.create_image(sx, sy, image=sym_ph, tags=("compass_sym",))
            self._sym_ids.append(sym_id)

            # Label outside the ring
            lx = cx + r_lbl * math.cos(mid_angle) * 1.18
            ly = cy - r_lbl * math.sin(mid_angle) * 1.18
            lbl_img = glow_image(
                sec["label"],
                self._fonts["small"],
                img_size=(110, 30),
                text_color=(200, 185, 140),
                glow_color=(120, 80, 10),
                glow_radius=5,
                glow_strength=1,
                bg_color=(0, 0, 0),
            )
            lbl_ph = ImageTk.PhotoImage(lbl_img)
            self._photos.append(lbl_ph)
            lbl_id = cv.create_image(lx, ly, image=lbl_ph, tags=("compass_lbl",))
            self._label_ids.append(lbl_id)

        # Center circle
        cv.create_oval(
            cx - r_in, cy - r_in, cx + r_in, cy + r_in,
            fill=BG, outline=GOLD, width=2,
            tags="compass_center",
        )
        cv.create_oval(
            cx - r_in * 0.85, cy - r_in * 0.85, cx + r_in * 0.85, cy + r_in * 0.85,
            fill=BG, outline=GOLD_DIM, width=1,
            tags="compass_center",
        )

        # Outer decorative ring
        cv.create_oval(
            cx - r_out * 1.01, cy - r_out * 1.01,
            cx + r_out * 1.01, cy + r_out * 1.01,
            outline=GOLD, width=2, fill="",
            tags="compass_ring",
        )

    def _update_segment(self, i: int):
        col_base, col_hover, col_sel = SECTION_COLORS[i]
        color = (col_sel if i == self._sel_idx
                 else col_hover if i == self._hover_idx
                 else col_base)
        self.canvas.itemconfig(self._item_ids[i], fill=color)

    # ── Events ───────────────────────────────────────────────────────────────
    def _hit_test(self, x: int, y: int) -> int | None:
        cx, cy = self.cx, self.cy
        r_in  = self.r * 0.22
        r_out = self.r * 0.88
        dist  = math.hypot(x - cx, y - cy)
        if dist < r_in or dist > r_out:
            return None
        angle_deg = math.degrees(math.atan2(-(y - cy), x - cx)) % 360
        return _section_at(angle_deg)

    def _on_motion(self, event: tk.Event):
        idx = self._hit_test(event.x, event.y)
        if idx == self._hover_idx:
            return
        old = self._hover_idx
        self._hover_idx = idx
        if old is not None:
            self._update_segment(old)
        if idx is not None:
            self._update_segment(idx)

    def _on_click(self, event: tk.Event):
        idx = self._hit_test(event.x, event.y)
        if idx is None:
            return
        old = self._sel_idx
        self._sel_idx = idx
        if old is not None:
            self._update_segment(old)
        self._update_segment(idx)
        self.on_select(SECTIONS[idx]["key"])
