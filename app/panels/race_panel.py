"""
Razza panel — race, background, alignment with auto-suggestions.
"""
import tkinter as tk
import customtkinter as ctk
from app.panels.base import BasePanel
from app.theme import GOLD_BRIGHT, BG_WIDGET, TEXT, TEXT_DIM, BORDER
import dnd_data


class RacePanel(BasePanel):
    def __init__(self, parent, app):
        super().__init__(parent, app)
        self._info_box: ctk.CTkTextbox | None = None
        self._traits_box: ctk.CTkTextbox | None = None
        self._build()
        app.vars["race"].trace_add("write", lambda *_: self._on_race_change())

    def _build(self):
        self.heading(self, "Razza & Origini")

        race_names = sorted(dnd_data.RACES.keys())
        self._race_cb = self.suggest_row(self, "Razza:", self.app.vars["race"], race_names, width=200)
        self._subrace_cb = self.suggest_row(self, "Sotto-razza:", self.app.vars["subclass"], [], width=200)

        self.suggest_row(self, "Background:", self.app.vars["background"],
                         dnd_data.BACKGROUNDS, width=200)
        self.suggest_row(self, "Allineamento:", self.app.vars["alignment"],
                         dnd_data.ALIGNMENTS, width=200)

        self.field_row(self, "Età:", self.app.vars.get("age", tk.StringVar()), width=100)

        self.divider(self)

        self.heading(self, "Bonus & Velocità", pady=(4, 2))
        self._bonus_label = ctk.CTkLabel(self, text="", anchor="w",
                                          text_color=GOLD_BRIGHT, font=("Arial", 12))
        self._bonus_label.pack(anchor="w", padx=12)
        self._speed_label = ctk.CTkLabel(self, text="", anchor="w",
                                          text_color=TEXT, font=("Arial", 12))
        self._speed_label.pack(anchor="w", padx=12)

        self.divider(self)

        self.heading(self, "Tratti Razziali", pady=(4, 2))
        self._traits_box = ctk.CTkTextbox(
            self, height=150, font=("Arial", 11),
            fg_color=BG_WIDGET, text_color=TEXT,
            border_color=BORDER, border_width=1, state="disabled",
        )
        self._traits_box.pack(fill="x", padx=12, pady=4)

        self.heading(self, "Descrizione", pady=(8, 2))
        self._info_box = ctk.CTkTextbox(
            self, height=90, font=("Arial", 11),
            fg_color=BG_WIDGET, text_color=TEXT_DIM,
            border_color=BORDER, border_width=1, state="disabled",
        )
        self._info_box.pack(fill="x", padx=12, pady=4)

        self._on_race_change()

    def _on_race_change(self):
        race_name = self.app.vars["race"].get()
        data = dnd_data.RACES.get(race_name)
        if not data:
            self._set_tb(self._info_box, "Seleziona una razza per vedere le informazioni.")
            self._set_tb(self._traits_box, "")
            self._bonus_label.configure(text="")
            self._speed_label.configure(text="")
            self._subrace_cb.configure(values=[])
            return

        subs = data.get("subraces", [])
        self._subrace_cb.configure(values=subs)
        self._bonus_label.configure(text=f"Bonus: {data.get('bonuses', '—')}")
        speed = data.get("speed", 30)
        self._speed_label.configure(text=f"Velocità: {speed} m")
        self.app.vars["speed"].set(speed)

        traits = "\n".join(f"• {t}" for t in data.get("traits", []))
        self._set_tb(self._traits_box, traits)
        self._set_tb(self._info_box, data.get("description", ""))

    @staticmethod
    def _set_tb(tb: ctk.CTkTextbox | None, text: str):
        if tb is None:
            return
        tb.configure(state="normal")
        tb.delete("1.0", "end")
        tb.insert("1.0", text)
        tb.configure(state="disabled")
