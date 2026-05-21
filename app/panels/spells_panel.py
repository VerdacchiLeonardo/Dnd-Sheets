"""
Magie panel — spell slots and spell list.
"""
import tkinter as tk
import customtkinter as ctk
from app.panels.base import BasePanel
from app.theme import GOLD, GOLD_BRIGHT, BG_WIDGET, TEXT, TEXT_DIM, BORDER
import dnd_data


_SPELL_LEVELS = ["Trucchetti (0)", "1°", "2°", "3°", "4°", "5°", "6°", "7°", "8°", "9°"]

_SLOT_TABLE = {
    1:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
    2:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
    3:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
    4:  [4, 3, 0, 0, 0, 0, 0, 0, 0],
    5:  [4, 3, 2, 0, 0, 0, 0, 0, 0],
    6:  [4, 3, 3, 0, 0, 0, 0, 0, 0],
    7:  [4, 3, 3, 1, 0, 0, 0, 0, 0],
    8:  [4, 3, 3, 2, 0, 0, 0, 0, 0],
    9:  [4, 3, 3, 3, 1, 0, 0, 0, 0],
    10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
    11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
}


class SpellsPanel(BasePanel):
    def __init__(self, parent, app):
        super().__init__(parent, app)
        self._slot_lbls: list[ctk.CTkLabel] = []
        self._spells_text: ctk.CTkTextbox | None = None
        self._build()
        app.vars["level"].trace_add("write", lambda *_: self._update_slots())

    def _build(self):
        self.heading(self, "Magie & Incantesimi")

        # Spellcasting ability
        abilities = ["Intelligenza", "Saggezza", "Carisma"]
        if not hasattr(self.app, "_spell_ability"):
            self.app._spell_ability = tk.StringVar(value="Intelligenza")
        self.suggest_row(self, "Caratteristica:", self.app._spell_ability, abilities, width=180)

        # Spell school
        if not hasattr(self.app, "_spell_school"):
            self.app._spell_school = tk.StringVar()
        self.suggest_row(self, "Scuola:", self.app._spell_school, dnd_data.SPELL_SCHOOLS, width=180)

        self.divider(self)

        # Spell slots table (auto-filled from level)
        self.heading(self, "Slot Incantesimo per Livello Personaggio")
        slots_frame = ctk.CTkFrame(self, fg_color=BG_WIDGET, corner_radius=6,
                                   border_width=1, border_color=BORDER)
        slots_frame.pack(fill="x", padx=12, pady=4)

        self._slot_lbls.clear()
        for spell_lvl in range(1, 10):
            row = ctk.CTkFrame(slots_frame, fg_color="transparent")
            row.pack(fill="x", padx=10, pady=2)
            ctk.CTkLabel(row, text=f"Livello {spell_lvl}:",
                         width=90, anchor="w",
                         text_color=TEXT, font=("Arial", 11)).pack(side="left")
            lbl = ctk.CTkLabel(row, text="0 slot",
                               text_color=GOLD_BRIGHT, font=("Arial", 11, "bold"))
            lbl.pack(side="left")
            self._slot_lbls.append(lbl)

        self.divider(self)

        self.heading(self, "Lista Incantesimi")
        ctk.CTkLabel(self, text="Inserisci i tuoi incantesimi (uno per riga)",
                     font=("Arial", 10), text_color=TEXT_DIM).pack(anchor="w", padx=12)

        self._spells_text = ctk.CTkTextbox(
            self, height=260, font=("Arial", 11),
            fg_color="#100e08", text_color=TEXT,
            border_color=BORDER, border_width=1,
        )
        self._spells_text.pack(fill="x", padx=12, pady=4)

        self._update_slots()

    def _update_slots(self):
        try:
            lvl = max(1, min(20, self.app.vars["level"].get()))
        except (tk.TclError, ValueError):
            lvl = 1
        slots = _SLOT_TABLE.get(lvl, [0] * 9)
        for i, lbl in enumerate(self._slot_lbls):
            n = slots[i] if i < len(slots) else 0
            lbl.configure(text=f"{n} slot" if n > 0 else "—")

    def get_spells(self) -> str:
        return self._spells_text.get("1.0", "end-1c") if self._spells_text else ""

    def set_spells(self, text: str):
        if self._spells_text:
            self._spells_text.delete("1.0", "end")
            self._spells_text.insert("1.0", text)
