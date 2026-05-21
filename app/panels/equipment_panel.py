"""
Equipaggiamento panel — currency and inventory.
"""
import customtkinter as ctk
from app.panels.base import BasePanel
from app.theme import BG_WIDGET, TEXT, TEXT_DIM, BORDER


class EquipmentPanel(BasePanel):
    def __init__(self, parent, app):
        super().__init__(parent, app)
        self._text: ctk.CTkTextbox | None = None
        self._build()

    def _build(self):
        self.heading(self, "Monete")

        coins_frame = ctk.CTkFrame(self, fg_color=BG_WIDGET, corner_radius=6,
                                   border_width=1, border_color=BORDER)
        coins_frame.pack(fill="x", padx=12, pady=4)

        coins_inner = ctk.CTkFrame(coins_frame, fg_color="transparent")
        coins_inner.pack(padx=12, pady=8)

        for label, key, color in [
            ("Rame",    "cp", "#b87333"),
            ("Argento", "sp", "#c0c0c0"),
            ("Electrum","ep", "#a8a9ad"),
            ("Oro",     "gp", "#ffd700"),
            ("Platino", "pp", "#e5e4e2"),
        ]:
            col = ctk.CTkFrame(coins_inner, fg_color="transparent")
            col.pack(side="left", padx=10)
            ctk.CTkLabel(col, text=label, font=("Arial", 10),
                         text_color=color).pack()
            ctk.CTkEntry(col, textvariable=self.app.vars[key],
                         width=72, justify="center", font=("Arial", 14),
                         fg_color="#1a1408", text_color=color,
                         border_color=BORDER, border_width=1).pack()

        self.divider(self)

        self.heading(self, "Equipaggiamento & Oggetti")
        ctk.CTkLabel(self, text="C = Competenza  •  E = Expertise",
                     font=("Arial", 9), text_color=TEXT_DIM).pack(anchor="w", padx=12)

        self._text = ctk.CTkTextbox(
            self, height=280, font=("Arial", 12),
            fg_color="#100e08", text_color=TEXT,
            border_color=BORDER, border_width=1,
        )
        self._text.pack(fill="x", padx=12, pady=4)

    def get_text(self) -> str:
        return self._text.get("1.0", "end-1c") if self._text else ""

    def set_text(self, text: str):
        if self._text:
            self._text.delete("1.0", "end")
            self._text.insert("1.0", text)
