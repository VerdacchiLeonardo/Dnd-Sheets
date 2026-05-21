"""
Character sheet screen: compass wheel on the left, section panels on the right.
"""
import tkinter as tk
from tkinter import filedialog, messagebox
import customtkinter as ctk
from PIL import ImageTk

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


class SheetScreen(ctk.CTkFrame):
    def __init__(self, master, app):
        super().__init__(master, fg_color=BG)
        self.pack(fill="both", expand=True)
        self.app = app
        self._photos: list = []
        self._compass: CompassWidget | None = None
        self._current_panel: ctk.CTkFrame | None = None
        self._fonts = fonts()
        self._panels: dict = {}
        self._build()

    # ── Layout ───────────────────────────────────────────────────────────────
    def _build(self):
        # ── Top header bar ──
        hdr = ctk.CTkFrame(self, height=50, fg_color="#0e0c08",
                           border_width=1, border_color=BORDER)
        hdr.pack(fill="x")
        hdr.pack_propagate(False)

        def hdr_field(label, key, width, is_str=True):
            ctk.CTkLabel(hdr, text=label, font=("Arial", 11, "bold"),
                         text_color=GOLD).pack(side="left", padx=(14, 3))
            ctk.CTkEntry(hdr, textvariable=self.app.vars[key], font=("Arial", 12),
                         width=width,
                         fg_color="#1a1408", text_color=TEXT,
                         border_color=BORDER, border_width=1,
                         corner_radius=3).pack(side="left", padx=(0, 6))

        hdr_field("Nome:",    "name",   200)
        hdr_field("Lvl:",     "level",   40)
        hdr_field("Classe:",  "class_", 130)
        hdr_field("Razza:",   "race",   110)

        # Save / Load buttons in header
        ctk.CTkButton(hdr, text="Salva", width=70, height=30, font=("Arial", 11),
                      fg_color="#2a1a08", hover_color="#5a3a10",
                      text_color=GOLD_BRIGHT, border_width=1, border_color=BORDER,
                      command=self.app.save_character).pack(side="right", padx=6)

        ctk.CTkButton(hdr, text="Apri", width=70, height=30, font=("Arial", 11),
                      fg_color="#181818", hover_color="#303030",
                      text_color=TEXT, border_width=1, border_color=BORDER,
                      command=self.app.open_character).pack(side="right", padx=2)

        ctk.CTkButton(hdr, text="Nuovo", width=70, height=30, font=("Arial", 11),
                      fg_color="#181818", hover_color="#303030",
                      text_color=TEXT, border_width=1, border_color=BORDER,
                      command=self.app.new_character).pack(side="right", padx=2)

        # ── Main body: compass (left) + panel (right) ──
        body = ctk.CTkFrame(self, fg_color="transparent")
        body.pack(fill="both", expand=True)

        # Compass area (canvas)
        self._cv_frame = ctk.CTkFrame(body, fg_color=BG, width=420)
        self._cv_frame.pack(side="left", fill="y")
        self._cv_frame.pack_propagate(False)

        self._canvas = tk.Canvas(self._cv_frame, bg=BG, highlightthickness=0)
        self._canvas.pack(fill="both", expand=True)

        # Particle background in compass area
        self._particles = ParticleSystem(self._canvas, count=55, fps=30)

        self._canvas.bind("<Configure>", self._on_cv_resize)

        # Panel area (right)
        self._panel_frame = ctk.CTkFrame(body, fg_color=BG_PANEL,
                                          border_width=1, border_color=BORDER)
        self._panel_frame.pack(side="left", fill="both", expand=True)

        # Welcome label (shown when no section selected)
        self._welcome = ctk.CTkLabel(
            self._panel_frame,
            text="Seleziona una sezione\ndal compasso",
            font=("Arial", 16), text_color=GOLD_DIM,
        )
        self._welcome.pack(expand=True)

        # Build all panels (hidden initially)
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
        for panel in self._panels.values():
            panel.pack_forget()

    # ── Canvas resize → redraw compass ───────────────────────────────────────
    def _on_cv_resize(self, event: tk.Event):
        w, h = event.width, event.height
        self._canvas.delete("compass_bg")
        self._canvas.delete("compass_seg")
        self._canvas.delete("compass_sym")
        self._canvas.delete("compass_lbl")
        self._canvas.delete("compass_center")
        self._canvas.delete("compass_ring")
        self._canvas.delete("char_name_img")
        self._photos.clear()

        r = min(w, h) * 0.36
        cx, cy = w // 2, int(h * 0.50)

        if self._compass is None:
            self._compass = CompassWidget(self._canvas, self._on_section_select, cx, cy, r)
        else:
            self._compass.reposition(cx, cy, r)

        # Character name in center circle
        self._draw_center_name(cx, cy, r * 0.22)

        # Small decorative text at bottom
        self._canvas.delete("cv_footer")
        self._canvas.create_text(
            w // 2, h - 14,
            text="Clicca una sezione per modificarla",
            fill=GOLD_DIM, font=("Arial", 9),
            tags="cv_footer",
        )

        # Ensure particles stay below
        self._canvas.tag_lower("particle")

    def _draw_center_name(self, cx: int, cy: int, r: float):
        name = self.app.vars["name"].get() or "Personaggio"
        short = name[:10] + "…" if len(name) > 10 else name
        img = glow_image(
            short,
            self._fonts["small"],
            img_size=(int(r * 2.4), int(r * 1.2)),
            text_color=(220, 200, 140),
            glow_color=(140, 90, 10),
            glow_radius=5,
            glow_strength=1,
            bg_color=(8, 8, 8),
        )
        ph = ImageTk.PhotoImage(img)
        self._photos.append(ph)
        self._canvas.create_image(cx, cy, image=ph, tags="char_name_img")

    # ── Section selection ─────────────────────────────────────────────────────
    def _on_section_select(self, key: str):
        # Hide current panel
        if self._current_panel is not None:
            self._current_panel.pack_forget()
        self._welcome.pack_forget()

        panel = self._panels.get(key)
        if panel:
            panel.pack(fill="both", expand=True)
            self._current_panel = panel

    # ── Data collection helpers (used by app.window) ──────────────────────────
    def get_equipment_text(self) -> str:
        return self._panels["equipment"].get_text()

    def set_equipment_text(self, text: str):
        self._panels["equipment"].set_text(text)

    def get_spells_text(self) -> str:
        return self._panels["spells"].get_spells()

    def set_spells_text(self, text: str):
        self._panels["spells"].set_spells(text)

    def get_features(self) -> str:
        return self._panels["notes"].get_features()

    def set_features(self, t: str):
        self._panels["notes"].set_features(t)

    def get_backstory(self) -> str:
        return self._panels["notes"].get_backstory()

    def set_backstory(self, t: str):
        self._panels["notes"].set_backstory(t)

    def get_notes(self) -> str:
        return self._panels["notes"].get_notes()

    def set_notes(self, t: str):
        self._panels["notes"].set_notes(t)

    def get_attacks(self) -> list[dict]:
        return self._panels["combat"].get_attacks()

    def set_attacks(self, attacks: list[dict]):
        self._panels["combat"].set_attacks(attacks)
