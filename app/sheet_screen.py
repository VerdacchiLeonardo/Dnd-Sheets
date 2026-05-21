"""
Character sheet: full-screen compass with radial panel positioning.
Panel appears at the edge corresponding to the selected compass section.
"""
import math
import tkinter as tk
from tkinter import filedialog
import customtkinter as ctk
from PIL import Image, ImageTk

from app.theme import BG, BG_PANEL, GOLD, GOLD_BRIGHT, GOLD_DIM, TEXT, TEXT_DIM, BORDER, fonts
from app.compass import CompassWidget, SECTIONS
from app.particles import ParticleSystem
from app.glow import glow_image
from app.panels.class_panel import ClassPanel
from app.panels.race_panel import RacePanel
from app.panels.stats_panel import StatsPanel
from app.panels.combat_panel import CombatPanel
from app.panels.skills_panel import SkillsPanel
from app.panels.equipment_panel import EquipmentPanel
from app.panels.spells_panel import SpellsPanel
from app.panels.notes_panel import NotesPanel

PANEL_W = 400
PANEL_H_RATIO = 0.82   # fraction of screen height
PANEL_MARGIN = 14

# Direction for each section (index 0=top, goes clockwise)
# Returns (anchor_x_factor, anchor_y_factor)
# 0.0 = left/top edge, 1.0 = right/bottom edge, 0.5 = center
_PANEL_ANCHORS = [
    (0.5,  0.0),   # 0 top       -> panel at top-center
    (1.0,  0.0),   # 1 top-right -> panel at top-right
    (1.0,  0.5),   # 2 right     -> panel at right-center
    (1.0,  1.0),   # 3 bot-right -> panel at bottom-right
    (0.5,  1.0),   # 4 bottom    -> panel at bottom-center
    (0.0,  1.0),   # 5 bot-left  -> panel at bottom-left
    (0.0,  0.5),   # 6 left      -> panel at left-center
    (0.0,  0.0),   # 7 top-left  -> panel at top-left
]


class SheetScreen(ctk.CTkFrame):
    def __init__(self, master, app):
        super().__init__(master, fg_color=BG)
        self.pack(fill="both", expand=True)
        self.app = app
        self._photos: list = []
        self._compass: CompassWidget | None = None
        self._panel_frame: ctk.CTkFrame | None = None
        self._current_panel: ctk.CTkScrollableFrame | None = None
        self._current_section_idx: int | None = None
        self._w = self._h = 0
        self._panels: dict = {}
        self._build()

    # ── Build ────────────────────────────────────────────────────────────────
    def _build(self):
        # Top header
        hdr = ctk.CTkFrame(self, height=46, fg_color="#0a0808",
                           border_width=1, border_color=BORDER)
        hdr.pack(fill="x")
        hdr.pack_propagate(False)

        def hf(label, key, w):
            ctk.CTkLabel(hdr, text=label, font=("Arial", 11, "bold"),
                         text_color=GOLD).pack(side="left", padx=(12, 2))
            ctk.CTkEntry(hdr, textvariable=self.app.vars[key], font=("Arial", 12),
                         width=w, fg_color="#110e04", text_color=TEXT,
                         border_color=BORDER, border_width=1,
                         corner_radius=3).pack(side="left", padx=(0, 6))

        hf("Nome:", "name", 190)
        hf("Lvl:", "level", 38)
        hf("Classe:", "class_", 120)
        hf("Razza:", "race", 100)

        for lbl, cmd, fc, hc in [
            ("Salva", self.app.save_character, "#2a1a08", "#5a3a10"),
            ("Apri",  self.app.open_character, "#141414", "#282828"),
            ("Nuovo", self.app.new_character,  "#141414", "#282828"),
            ("<- Personaggi", self.app.show_library, "#0a0814", "#181828"),
        ]:
            btn_color = GOLD_BRIGHT if lbl == "Salva" else TEXT
            btn_width = 110 if lbl == "<- Personaggi" else 80
            ctk.CTkButton(hdr, text=lbl, width=btn_width,
                          height=28, font=("Arial", 11),
                          fg_color=fc, hover_color=hc,
                          text_color=btn_color,
                          border_width=1, border_color=BORDER,
                          command=cmd).pack(side="right", padx=3)

        # Full-screen canvas body
        self._body = ctk.CTkFrame(self, fg_color=BG)
        self._body.pack(fill="both", expand=True)

        self._canvas = tk.Canvas(self._body, bg=BG, highlightthickness=0)
        self._canvas.place(relx=0, rely=0, relwidth=1, relheight=1)

        self._particles = ParticleSystem(self._canvas, count=70, fps=30)
        self._compass   = CompassWidget(self._canvas, self._on_section_select)

        self._canvas.bind("<Configure>", self._on_resize)

        # Panel overlay container (placed dynamically)
        self._panel_frame = ctk.CTkFrame(
            self._body, fg_color=BG_PANEL,
            border_width=1, border_color=BORDER,
            corner_radius=8,
        )
        # Build all section panels inside it
        self._panels = {
            "class":     ClassPanel(self._panel_frame, self.app),
            "race":      RacePanel(self._panel_frame, self.app),
            "stats":     StatsPanel(self._panel_frame, self.app),
            "combat":    CombatPanel(self._panel_frame, self.app),
            "skills":    SkillsPanel(self._panel_frame, self.app),
            "equipment": EquipmentPanel(self._panel_frame, self.app),
            "spells":    SpellsPanel(self._panel_frame, self.app),
            "notes":     NotesPanel(self._panel_frame, self.app),
        }
        for p in self._panels.values():
            p.pack_forget()

        # Close button on panel
        self._close_btn = ctk.CTkButton(
            self._panel_frame, text="X", width=28, height=28,
            fg_color="transparent", hover_color="#2a0a0a",
            text_color=TEXT_DIM, font=("Arial", 13),
            command=self._hide_panel,
        )

        # Image area overlaid at bottom of compass center
        self._char_img_label: ctk.CTkLabel | None = None

    # ── Resize -> reposition compass ──────────────────────────────────────────
    def _on_resize(self, e: tk.Event):
        self._w, self._h = e.width, e.height
        r = min(e.width, e.height) * 0.38
        cx, cy = e.width // 2, e.height // 2
        self._compass.layout(cx, cy, r)
        self._compass.update_center_name(self.app.vars["name"].get())
        # Reposition open panel if any
        if self._current_section_idx is not None and self._panel_frame.winfo_ismapped():
            self._place_panel(self._current_section_idx)

    # ── Section selection ────────────────────────────────────────────────────
    def _on_section_select(self, idx: int, key: str):
        # Toggle: click same section again -> hide
        if idx == self._current_section_idx and self._panel_frame.winfo_ismapped():
            self._hide_panel()
            return

        self._current_section_idx = idx
        # Show the right panel
        if self._current_panel:
            self._current_panel.pack_forget()
        panel = self._panels.get(key)
        if panel:
            panel.pack(fill="both", expand=True)
            self._current_panel = panel

        self._place_panel(idx)

    def _place_panel(self, idx: int):
        w, h = self._w, self._h
        if w == 0 or h == 0:
            return

        ph = int(h * PANEL_H_RATIO)
        ax, ay = _PANEL_ANCHORS[idx]

        # X position
        if ax < 0.3:    x = PANEL_MARGIN
        elif ax > 0.7:  x = w - PANEL_W - PANEL_MARGIN
        else:           x = w // 2 - PANEL_W // 2

        # Y position
        if ay < 0.3:    y = PANEL_MARGIN
        elif ay > 0.7:  y = h - ph - PANEL_MARGIN
        else:           y = h // 2 - ph // 2

        self._close_btn.place(relx=1.0, rely=0, anchor="ne", x=-4, y=4)
        self._panel_frame.place(x=x, y=y, width=PANEL_W, height=ph)
        # Animate slide in
        self._slide_in(idx, x, y, PANEL_W, ph)

    def _slide_in(self, idx, tx, ty, pw, ph, step=0):
        MAX = 10
        if step >= MAX:
            self._panel_frame.place(x=tx, y=ty, width=pw, height=ph)
            return
        ax, ay = _PANEL_ANCHORS[idx]
        prog = (step / MAX) ** 0.5   # sqrt easing
        offset = int(40 * (1 - prog))
        ox = -offset if ax < 0.3 else (offset if ax > 0.7 else 0)
        oy = -offset if ay < 0.3 else (offset if ay > 0.7 else 0)
        self._panel_frame.place(x=tx+ox, y=ty+oy, width=pw, height=ph)
        self._panel_frame.after(16, lambda: self._slide_in(idx, tx, ty, pw, ph, step+1))

    def _hide_panel(self):
        self._panel_frame.place_forget()
        self._current_section_idx = None

    # ── Image support ─────────────────────────────────────────────────────────
    def _update_center_image(self):
        img_data = self.app.character_image
        if not img_data:
            return
        try:
            from character import decode_image_pil
            img = decode_image_pil(img_data)
            r_in = self._compass.r * 0.18
            size = int(r_in * 2)
            img = img.resize((size, size), Image.LANCZOS)
            from PIL import ImageOps, ImageDraw
            # Crop to circle
            mask = Image.new("L", (size, size), 0)
            ImageDraw.Draw(mask).ellipse((0, 0, size, size), fill=255)
            img.putalpha(mask)
            ph = ImageTk.PhotoImage(img)
            self._photos.append(ph)
            self._canvas.delete("char_img_canvas")
            cx, cy = self._compass.cx, self._compass.cy
            self._canvas.create_image(cx, cy, image=ph, tags="char_img_canvas")
        except Exception:
            pass

    # ── Data helpers ──────────────────────────────────────────────────────────
    def get_equipment_text(self) -> str: return self._panels["equipment"].get_text()
    def set_equipment_text(self, t: str): self._panels["equipment"].set_text(t)
    def get_spells_text(self) -> str: return self._panels["spells"].get_spells()
    def set_spells_text(self, t: str): self._panels["spells"].set_spells(t)
    def get_features(self) -> str: return self._panels["notes"].get_features()
    def set_features(self, t: str): self._panels["notes"].set_features(t)
    def get_backstory(self) -> str: return self._panels["notes"].get_backstory()
    def set_backstory(self, t: str): self._panels["notes"].set_backstory(t)
    def get_notes(self) -> str: return self._panels["notes"].get_notes()
    def set_notes(self, t: str): self._panels["notes"].set_notes(t)
    def get_attacks(self) -> list: return self._panels["combat"].get_attacks()
    def set_attacks(self, a: list): self._panels["combat"].set_attacks(a)
