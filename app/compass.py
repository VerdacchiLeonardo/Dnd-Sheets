"""
Compass widget: full-screen canvas, geometric icons drawn as canvas primitives.
No emoji or unicode symbols - only Canvas lines/polygons.
"""
import math
import tkinter as tk
from typing import Callable
from app.theme import BG, SECTION_COLORS, GOLD, GOLD_DIM, GOLD_BRIGHT, TEXT, TEXT_DIM

SECTIONS = [
    {"key": "class",      "label": "Classe"},
    {"key": "race",       "label": "Razza"},
    {"key": "stats",      "label": "Statistiche"},
    {"key": "combat",     "label": "Combattimento"},
    {"key": "skills",     "label": "Abilita"},
    {"key": "equipment",  "label": "Equipaggiamento"},
    {"key": "spells",     "label": "Magie"},
    {"key": "notes",      "label": "Note"},
]
N = len(SECTIONS)
SWEEP = 360 / N
GAP   = 3.5


def _poly_star(cx, cy, r_out, r_in, n_points):
    """Return point list for a star polygon."""
    pts = []
    for i in range(n_points):
        a_out = math.radians(-90 + 360 * i / n_points)
        a_in  = math.radians(-90 + 360 * i / n_points + 180 / n_points)
        pts += [cx + r_out*math.cos(a_out), cy + r_out*math.sin(a_out)]
        pts += [cx + r_in *math.cos(a_in),  cy + r_in *math.sin(a_in)]
    return pts


def draw_icon(cv: tk.Canvas, idx: int, cx: float, cy: float, s: float,
              color: str, tag: str):
    """Draw a geometric icon for section idx at (cx,cy) with half-size s."""
    lw = max(1, int(s * 0.12))

    if idx == 0:  # Classe — crossed swords
        for ang in [45, -45]:
            a = math.radians(ang)
            ca, sa = math.cos(a), math.sin(a)
            # Blade
            cv.create_line(cx - s*ca, cy - s*sa, cx + s*ca, cy + s*sa,
                           fill=color, width=lw, tags=tag)
            # Guard
            perp_a = math.radians(ang + 90)
            gx, gy = cx - s*0.15*ca, cy - s*0.15*sa
            cv.create_line(gx - s*0.35*math.cos(perp_a), gy - s*0.35*math.sin(perp_a),
                           gx + s*0.35*math.cos(perp_a), gy + s*0.35*math.sin(perp_a),
                           fill=color, width=lw+1, tags=tag)

    elif idx == 1:  # Razza — gem/diamond facets
        pts_outer = [cx, cy-s, cx+s*0.7, cy-s*0.2,
                     cx+s*0.7, cy+s*0.5, cx, cy+s,
                     cx-s*0.7, cy+s*0.5, cx-s*0.7, cy-s*0.2]
        cv.create_polygon(pts_outer, fill="", outline=color, width=lw, tags=tag)
        # Facet lines
        cv.create_line(cx-s*0.7, cy-s*0.2, cx, cy-s, cx+s*0.7, cy-s*0.2, fill=color, width=1, tags=tag)
        cv.create_line(cx-s*0.7, cy-s*0.2, cx, cy+s, fill=color, width=1, tags=tag)
        cv.create_line(cx+s*0.7, cy-s*0.2, cx, cy+s, fill=color, width=1, tags=tag)
        cv.create_line(cx, cy-s, cx, cy+s, fill=color, width=1, tags=tag)

    elif idx == 2:  # Statistiche — d20
        # Hexagon for d20 shape
        pts = []
        for i in range(6):
            a = math.radians(30 + 60*i)
            pts += [cx + s*math.cos(a), cy + s*math.sin(a)]
        cv.create_polygon(pts, fill="", outline=color, width=lw, tags=tag)
        # Inner triangle
        tri = []
        for i in range(3):
            a = math.radians(-90 + 120*i)
            tri += [cx + s*0.5*math.cos(a), cy + s*0.5*math.sin(a)]
        cv.create_polygon(tri, fill="", outline=color, width=1, tags=tag)
        cv.create_text(cx, cy, text="20", fill=color,
                       font=("Arial", max(8, int(s*0.55)), "bold"), tags=tag)

    elif idx == 3:  # Combattimento — shield
        # Shield shape
        shield = [cx, cy-s, cx+s*0.75, cy-s*0.4,
                  cx+s*0.75, cy+s*0.2, cx, cy+s,
                  cx-s*0.75, cy+s*0.2, cx-s*0.75, cy-s*0.4]
        cv.create_polygon(shield, fill="", outline=color, width=lw, tags=tag)
        # Cross inside (HP cross)
        cv.create_line(cx, cy-s*0.45, cx, cy+s*0.6, fill=color, width=lw, tags=tag)
        cv.create_line(cx-s*0.35, cy-s*0.05, cx+s*0.35, cy-s*0.05, fill=color, width=lw, tags=tag)

    elif idx == 4:  # Abilita — 5-pointed star
        pts = _poly_star(cx, cy, s, s*0.42, 5)
        cv.create_polygon(pts, fill="", outline=color, width=lw, tags=tag)

    elif idx == 5:  # Equipaggiamento — treasure chest
        # Body
        cv.create_rectangle(cx-s*0.75, cy-s*0.2, cx+s*0.75, cy+s*0.7,
                             fill="", outline=color, width=lw, tags=tag)
        # Lid
        cv.create_rectangle(cx-s*0.75, cy-s*0.8, cx+s*0.75, cy-s*0.2,
                             fill="", outline=color, width=lw, tags=tag)
        # Lid arc hint
        cv.create_arc(cx-s*0.75, cy-s*1.1, cx+s*0.75, cy-s*0.2,
                      start=0, extent=180, style=tk.ARC,
                      outline=color, width=lw, tags=tag)
        # Clasp
        cv.create_rectangle(cx-s*0.18, cy-s*0.38, cx+s*0.18, cy-s*0.02,
                             fill="", outline=color, width=1, tags=tag)
        # Lock dot
        cv.create_oval(cx-s*0.08, cy-s*0.28, cx+s*0.08, cy-s*0.12,
                       fill="", outline=color, width=1, tags=tag)

    elif idx == 6:  # Magie — magic circle with 4-star sparkle
        # Outer ring
        cv.create_oval(cx-s, cy-s, cx+s, cy+s, fill="", outline=color, width=lw, tags=tag)
        # Inner ring
        cv.create_oval(cx-s*0.55, cy-s*0.55, cx+s*0.55, cy+s*0.55,
                       fill="", outline=color, width=1, tags=tag)
        # 8 sparkle lines from inner to outer ring
        for angle in [0, 45, 90, 135, 180, 225, 270, 315]:
            a = math.radians(angle)
            cv.create_line(cx + s*0.55*math.cos(a), cy + s*0.55*math.sin(a),
                           cx + s*0.95*math.cos(a), cy + s*0.95*math.sin(a),
                           fill=color, width=lw, tags=tag)
        # Center dot
        cv.create_oval(cx-s*0.12, cy-s*0.12, cx+s*0.12, cy+s*0.12,
                       fill=color, outline="", tags=tag)

    elif idx == 7:  # Note — open scroll
        # Main body
        cv.create_rectangle(cx-s*0.55, cy-s*0.75, cx+s*0.55, cy+s*0.75,
                             fill="", outline=color, width=lw, tags=tag)
        # Top roll
        cv.create_oval(cx-s*0.7, cy-s*0.95, cx+s*0.7, cy-s*0.55,
                       fill="", outline=color, width=lw, tags=tag)
        # Bottom roll
        cv.create_oval(cx-s*0.7, cy+s*0.55, cx+s*0.7, cy+s*0.95,
                       fill="", outline=color, width=lw, tags=tag)
        # Text lines
        for dy in [-0.25, 0, 0.25]:
            cv.create_line(cx-s*0.35, cy+dy*s, cx+s*0.35, cy+dy*s,
                           fill=color, width=1, tags=tag)


class CompassWidget:
    """Large compass rose drawn on a tk.Canvas with geometric icons."""

    def __init__(self, canvas: tk.Canvas, on_select: Callable, breathe: bool = True):
        self.canvas    = canvas
        self.on_select = on_select
        self.cx = self.cy = self.r = 0
        self._hover_idx: int | None = None
        self._sel_idx:   int | None = None
        self._breath_step = 0
        self._do_breathe  = breathe
        canvas.bind("<Motion>",   self._on_motion)
        canvas.bind("<Button-1>", self._on_click)
        if breathe:
            self._breathe_tick()

    def layout(self, cx: int, cy: int, r: float):
        self.cx, self.cy, self.r = cx, cy, r
        self._redraw_all()

    def _redraw_all(self):
        cv = self.canvas
        cx, cy, r = self.cx, self.cy, self.r
        # Remove old compass drawings
        for tag in ("compass_seg", "compass_icon", "compass_lbl",
                    "compass_center", "compass_ring", "compass_name"):
            cv.delete(tag)

        r_in  = r * 0.20
        r_out = r * 0.82
        r_icon = r * 0.56
        r_lbl  = r * 0.93

        for i, sec in enumerate(SECTIONS):
            base, hover, sel = SECTION_COLORS[i]
            color = (sel if i == self._sel_idx else
                     hover if i == self._hover_idx else base)

            start  = 90 - i * SWEEP - SWEEP / 2 + GAP / 2
            extent = -(SWEEP - GAP)

            # Pie segment
            cv.create_arc(
                cx - r_out, cy - r_out, cx + r_out, cy + r_out,
                start=start, extent=extent,
                style=tk.PIESLICE,
                fill=color, outline=GOLD_DIM, width=1,
                tags=("compass_seg", f"seg_{i}"),
            )

            # Icon
            mid_rad = math.radians(90 - i * SWEEP)
            ix = cx + r_icon * math.cos(mid_rad)
            iy = cy - r_icon * math.sin(mid_rad)
            icon_color = GOLD_BRIGHT if i == self._sel_idx else (TEXT if i == self._hover_idx else GOLD)
            draw_icon(cv, i, ix, iy, r * 0.12, icon_color, "compass_icon")

            # Label
            lx = cx + r_lbl * math.cos(mid_rad)
            ly = cy - r_lbl * math.sin(mid_rad)
            lbl_color = TEXT_DIM if i != self._sel_idx and i != self._hover_idx else TEXT
            cv.create_text(lx, ly, text=sec["label"],
                           fill=lbl_color,
                           font=("Arial", max(9, int(r * 0.044)), "bold"),
                           tags="compass_lbl")

        # Outer decorative ring
        cv.create_oval(cx - r_out, cy - r_out, cx + r_out, cy + r_out,
                       outline=GOLD, width=2, fill="", tags="compass_ring")
        # Inner ring (center hole)
        cv.create_oval(cx - r_in, cy - r_in, cx + r_in, cy + r_in,
                       fill=BG, outline=GOLD, width=2, tags="compass_center")

        # Cardinal tick marks
        for angle_deg in range(0, 360, 45):
            a = math.radians(angle_deg)
            cv.create_line(cx + r_out * 1.01 * math.cos(a),
                           cy - r_out * 1.01 * math.sin(a),
                           cx + (r_out * 1.01 + r * 0.03) * math.cos(a),
                           cy - (r_out * 1.01 + r * 0.03) * math.sin(a),
                           fill=GOLD_DIM, width=1, tags="compass_ring")

        # Keep particles below compass
        cv.tag_lower("particle")

    def update_center_name(self, name: str):
        self.canvas.delete("compass_name")
        if not name:
            return
        short = name[:12] + "..." if len(name) > 12 else name
        self.canvas.create_text(
            self.cx, self.cy, text=short,
            fill=TEXT, font=("Arial", max(10, int(self.r * 0.07)), "bold"),
            tags="compass_name",
        )

    # ── Breathing animation ──────────────────────────────────────────────────
    def _breathe_tick(self):
        if not self._do_breathe:
            return
        cv = self.canvas
        r_in = self.r * 0.20
        cx, cy = self.cx, self.cy
        self._breath_step += 1
        pulse = 1.0 + 0.04 * math.sin(self._breath_step * 0.06)
        r_now = r_in * pulse
        cv.delete("compass_center_glow")
        cv.create_oval(cx - r_now, cy - r_now, cx + r_now, cy + r_now,
                       fill=BG, outline=GOLD_BRIGHT, width=2,
                       tags=("compass_center", "compass_center_glow"))
        cv.after(30, self._breathe_tick)

    # ── Events ───────────────────────────────────────────────────────────────
    def _hit(self, x, y) -> int | None:
        cx, cy = self.cx, self.cy
        r_in = self.r * 0.20
        r_out = self.r * 0.82
        dist = math.hypot(x - cx, y - cy)
        if dist < r_in or dist > r_out:
            return None
        angle = math.degrees(math.atan2(-(y - cy), x - cx)) % 360
        return int((90 - angle) % 360 / SWEEP) % N

    def _on_motion(self, e: tk.Event):
        idx = self._hit(e.x, e.y)
        if idx != self._hover_idx:
            self._hover_idx = idx
            self._redraw_all()

    def _on_click(self, e: tk.Event):
        idx = self._hit(e.x, e.y)
        if idx is None:
            return
        self._sel_idx = idx
        self._redraw_all()
        self.on_select(idx, SECTIONS[idx]["key"])
