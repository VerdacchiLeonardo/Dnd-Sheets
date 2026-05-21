"""
Character library screen: shows all saved characters as selectable cards.
"""
import os
import json
import tkinter as tk
import customtkinter as ctk
from PIL import Image, ImageTk

from app.theme import BG, BG_PANEL, BG_WIDGET, TEXT, TEXT_DIM, GOLD, GOLD_BRIGHT, BORDER, SAVES_DIR, fonts
from app.particles import ParticleSystem
from app.glow import glow_image


def _list_characters() -> list:
    """Scan SAVES_DIR for .json files and return list of dicts with metadata."""
    os.makedirs(SAVES_DIR, exist_ok=True)
    chars = []
    for fname in sorted(os.listdir(SAVES_DIR)):
        if not fname.endswith(".json"):
            continue
        path = os.path.join(SAVES_DIR, fname)
        try:
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
            chars.append({
                "path":  path,
                "name":  data.get("name", "Senza Nome"),
                "class": data.get("class_", "-"),
                "level": data.get("level", 1),
                "race":  data.get("race", "-"),
                "image": data.get("character_image", ""),
            })
        except Exception:
            pass
    return chars


class CharacterLibrary(ctk.CTkFrame):
    def __init__(self, master, on_new, on_load, on_home):
        super().__init__(master, fg_color=BG)
        self.pack(fill="both", expand=True)
        self.on_new  = on_new
        self.on_load = on_load
        self.on_home = on_home
        self._photos: list = []
        self._fonts = fonts()
        self._build()

    def _build(self):
        canvas = tk.Canvas(self, bg=BG, highlightthickness=0)
        canvas.pack(fill="both", expand=True)
        self._canvas = canvas
        self._particles = ParticleSystem(canvas, count=50, fps=30)
        canvas.bind("<Configure>", self._on_resize)

        # Scrollable frame on top of canvas
        self._scroll = ctk.CTkScrollableFrame(
            self, fg_color="transparent",
            scrollbar_button_color=BORDER,
        )
        # Will be placed on configure

    def _on_resize(self, e: tk.Event):
        w, h = e.width, e.height
        self._canvas.delete("static")
        self._photos.clear()
        self._draw_title(w, h)
        # Place scrollable frame below title
        self._scroll.place(x=20, y=int(h*0.22), width=w-40, height=int(h*0.72))
        self._populate_cards()

    def _draw_title(self, w, h):
        img = glow_image(
            "I Miei Personaggi",
            self._fonts["heading"],
            img_size=(w, int(h*0.18)),
            text_color=(240, 240, 240),
            glow_color=(180, 130, 30),
            glow_radius=14,
            glow_strength=3,
            bg_color=(8, 8, 8),
        )
        ph = ImageTk.PhotoImage(img)
        self._photos.append(ph)
        self._canvas.create_image(w//2, int(h*0.09), image=ph, tags="static")

        # Buttons row
        btn_y = int(h*0.17)
        btn_new = ctk.CTkButton(
            self._canvas, text="+ Nuovo Personaggio", width=200, height=36,
            font=("Arial", 13, "bold"),
            fg_color="#2a1a06", hover_color="#5a3a10",
            text_color=GOLD_BRIGHT, border_width=1, border_color=GOLD,
            command=self.on_new,
        )
        self._canvas.create_window(w//2 - 110, btn_y, window=btn_new, tags="static")

        btn_home = ctk.CTkButton(
            self._canvas, text="<- Home", width=100, height=36,
            font=("Arial", 12),
            fg_color="#141414", hover_color="#282828",
            text_color=TEXT, border_width=1, border_color=BORDER,
            command=self.on_home,
        )
        self._canvas.create_window(w//2 + 70, btn_y, window=btn_home, tags="static")

    def _populate_cards(self):
        for widget in self._scroll.winfo_children():
            widget.destroy()
        self._photos_cards: list = []

        chars = _list_characters()

        if not chars:
            ctk.CTkLabel(
                self._scroll,
                text="Nessun personaggio salvato ancora.\nClicca '+ Nuovo Personaggio' per iniziare!",
                font=("Arial", 14), text_color=TEXT_DIM,
            ).pack(expand=True, pady=40)
            return

        grid = ctk.CTkFrame(self._scroll, fg_color="transparent")
        grid.pack(fill="both", expand=True, padx=10, pady=10)

        COLS = 3
        for i, ch in enumerate(chars):
            row, col = divmod(i, COLS)
            grid.columnconfigure(col, weight=1)

            card = ctk.CTkFrame(grid, fg_color=BG_WIDGET, corner_radius=8,
                                border_width=1, border_color=BORDER)
            card.grid(row=row, column=col, padx=8, pady=8, sticky="nsew")

            # Character image (if any)
            if ch["image"]:
                try:
                    from character import decode_image_pil
                    img = decode_image_pil(ch["image"])
                    img = img.resize((80, 100), Image.LANCZOS)
                    ph = ImageTk.PhotoImage(img)
                    self._photos_cards.append(ph)
                    ctk.CTkLabel(card, image=ph, text="").pack(pady=(10, 4))
                except Exception:
                    # fallback placeholder
                    ctk.CTkLabel(card, text="[?]",
                                 font=("Arial", 24), text_color=TEXT_DIM).pack(pady=(10, 4))
            else:
                # Placeholder silhouette using text
                ctk.CTkLabel(card, text="[ ]",
                             font=("Arial", 36), text_color=TEXT_DIM).pack(pady=(10, 4))

            ctk.CTkLabel(card, text=ch["name"],
                         font=("Arial", 13, "bold"), text_color=TEXT).pack()
            ctk.CTkLabel(card,
                         text=f"Lv.{ch['level']} {ch['class']} - {ch['race']}",
                         font=("Arial", 11), text_color=TEXT_DIM).pack(pady=(2, 6))

            ctk.CTkButton(
                card, text="Apri", width=90, height=28,
                font=("Arial", 12),
                fg_color="#1a1408", hover_color="#3a2a10",
                text_color=GOLD_BRIGHT, border_width=1, border_color=BORDER,
                command=lambda p=ch["path"]: self.on_load(p),
            ).pack(pady=(0, 8))
