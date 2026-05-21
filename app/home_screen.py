"""
Home screen: glowing title + spirit particles + navigation buttons.
"""
import tkinter as tk
from tkinter import filedialog
import customtkinter as ctk
from PIL import ImageTk

from app.theme import BG, GOLD, GOLD_BRIGHT, TEXT, GOLD_GLOW, fonts
from app.glow import glow_image, divider_image
from app.particles import ParticleSystem


class HomeScreen(ctk.CTkFrame):
    def __init__(self, master, on_new, on_load):
        super().__init__(master, fg_color=BG)
        self.pack(fill="both", expand=True)
        self.on_new = on_new
        self.on_load = on_load
        self._photos: list = []   # keep references alive
        self._fonts = fonts()
        self._build()

    # ── Build ────────────────────────────────────────────────────────────────
    def _build(self):
        canvas = tk.Canvas(self, bg=BG, highlightthickness=0)
        canvas.pack(fill="both", expand=True)
        self.canvas = canvas

        # Particles start immediately; resize will redraw static items
        self.particles = ParticleSystem(canvas, count=90, fps=30)

        canvas.bind("<Configure>", self._on_resize)

    def _on_resize(self, event: tk.Event):
        w, h = event.width, event.height
        self.canvas.delete("static")
        self._photos.clear()
        self._draw_static(w, h)

    # ── Drawing ──────────────────────────────────────────────────────────────
    def _draw_static(self, w: int, h: int):
        cv = self.canvas
        f  = self._fonts

        # ── Title ──
        img = glow_image(
            "D&D  5e",
            f["title"],
            img_size=(w, 130),
            text_color=(245, 225, 150),
            glow_color=(180, 110, 20),
            glow_radius=22,
            glow_strength=4,
            bg_color=(8, 8, 8),
        )
        photo = ImageTk.PhotoImage(img)
        self._photos.append(photo)
        cv.create_image(w // 2, int(h * 0.20), image=photo, tags="static")

        # ── Subtitle ──
        sub = glow_image(
            "Schede Personaggio",
            f["subtitle"],
            img_size=(w, 70),
            text_color=(210, 185, 120),
            glow_color=(140, 80, 10),
            glow_radius=12,
            glow_strength=2,
            bg_color=(8, 8, 8),
        )
        photo2 = ImageTk.PhotoImage(sub)
        self._photos.append(photo2)
        cv.create_image(w // 2, int(h * 0.32), image=photo2, tags="static")

        # ── Divider ──
        dw = int(w * 0.5)
        div = divider_image(dw, height=8, color=(160, 100, 20), bg_color=(8, 8, 8))
        photo3 = ImageTk.PhotoImage(div)
        self._photos.append(photo3)
        cv.create_image(w // 2, int(h * 0.40), image=photo3, tags="static")

        # ── Buttons ──
        btn_y1 = int(h * 0.53)
        btn_y2 = int(h * 0.65)

        btn1 = ctk.CTkButton(
            self.canvas,
            text="✦  Crea Nuovo Personaggio  ✦",
            width=340, height=50,
            font=("Arial", 15, "bold"),
            fg_color="#3a2008", hover_color="#7a4010",
            text_color=GOLD_BRIGHT, border_width=1,
            border_color=GOLD, corner_radius=4,
            command=self.on_new,
        )
        cv.create_window(w // 2, btn_y1, window=btn1, tags="static")

        btn2 = ctk.CTkButton(
            self.canvas,
            text="  Carica Personaggio Esistente  ",
            width=340, height=46,
            font=("Arial", 14),
            fg_color="#181818", hover_color="#303030",
            text_color=TEXT, border_width=1,
            border_color="#504030", corner_radius=4,
            command=self.on_load,
        )
        cv.create_window(w // 2, btn_y2, window=btn2, tags="static")

        # ── Decorative rune ring ──
        self._draw_rune_ring(cv, w // 2, int(h * 0.84), min(w, h) * 0.09)

    def _draw_rune_ring(self, cv: tk.Canvas, cx: int, cy: int, r: float):
        """Simple decorative ring with cardinal markers."""
        cv.create_oval(cx - r, cy - r, cx + r, cy + r,
                       outline=GOLD_BRIGHT, width=1, tags="static")
        cv.create_oval(cx - r * 0.8, cy - r * 0.8, cx + r * 0.8, cy + r * 0.8,
                       outline=GOLD, width=1, tags="static")
        import math
        for angle_deg in range(0, 360, 45):
            rad = math.radians(angle_deg)
            x1 = cx + r * 0.8 * math.cos(rad)
            y1 = cy - r * 0.8 * math.sin(rad)
            x2 = cx + r * 1.0 * math.cos(rad)
            y2 = cy - r * 1.0 * math.sin(rad)
            cv.create_line(x1, y1, x2, y2, fill=GOLD_BRIGHT, width=1, tags="static")
