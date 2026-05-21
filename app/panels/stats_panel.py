"""
Statistiche panel — ability scores with live modifier display.
"""
import tkinter as tk
import customtkinter as ctk
from app.panels.base import BasePanel
from app.theme import GOLD, GOLD_BRIGHT, BG_WIDGET, TEXT, TEXT_DIM, BORDER
from character import ABILITY_KEYS, ABILITY_INFO, ability_modifier, proficiency_bonus, format_modifier


class StatsPanel(BasePanel):
    def __init__(self, parent, app):
        super().__init__(parent, app)
        self._mod_labels: dict[str, ctk.CTkLabel] = {}
        self._prof_lbl: ctk.CTkLabel | None = None
        self._passive_lbl: ctk.CTkLabel | None = None
        self._build()
        for key in ABILITY_KEYS:
            app.vars[key].trace_add("write", lambda *_, k=key: self._update_mod(k))
        app.vars["level"].trace_add("write", lambda *_: self._update_all())
        app.vars["skill_11_prof"].trace_add("write", lambda *_: self._update_all())
        app.vars["skill_11_expert"].trace_add("write", lambda *_: self._update_all())

    def _build(self):
        self.heading(self, "Caratteristiche")

        # Ability score boxes in 2-column grid
        grid = ctk.CTkFrame(self, fg_color="transparent")
        grid.pack(fill="x", padx=12, pady=6)

        for i, key in enumerate(ABILITY_KEYS):
            info = ABILITY_INFO[key]
            col = i % 2
            row = i // 2

            box = ctk.CTkFrame(grid, fg_color=BG_WIDGET, corner_radius=8,
                               border_width=1, border_color=BORDER)
            box.grid(row=row, column=col, padx=6, pady=6, sticky="nsew")
            grid.columnconfigure(col, weight=1)

            ctk.CTkLabel(box, text=info["short"], font=("Arial", 11, "bold"),
                         text_color=GOLD).pack(pady=(8, 0))

            mod = ability_modifier(self.app.vars[key].get())
            lbl = ctk.CTkLabel(box, text=format_modifier(mod),
                               font=("Arial", 24, "bold"), text_color=GOLD_BRIGHT)
            lbl.pack()
            self._mod_labels[key] = lbl

            ctk.CTkEntry(box, textvariable=self.app.vars[key],
                         width=60, justify="center", font=("Arial", 14),
                         fg_color="#1a1408", text_color=TEXT, border_color=BORDER,
                         ).pack(pady=2)

            ctk.CTkLabel(box, text=info["label"], font=("Arial", 10),
                         text_color=TEXT_DIM).pack(pady=(0, 8))

        self.divider(self)

        # Derived values
        self.heading(self, "Valori Derivati", pady=(4, 2))

        prow = ctk.CTkFrame(self, fg_color="transparent")
        prow.pack(fill="x", padx=12, pady=3)
        ctk.CTkLabel(prow, text="Bonus Competenza:", width=170, anchor="w",
                     text_color=TEXT_DIM, font=("Arial", 12)).pack(side="left")
        self._prof_lbl = ctk.CTkLabel(prow, text="+2", font=("Arial", 13, "bold"),
                                       text_color=GOLD_BRIGHT)
        self._prof_lbl.pack(side="left")

        pprow = ctk.CTkFrame(self, fg_color="transparent")
        pprow.pack(fill="x", padx=12, pady=3)
        ctk.CTkLabel(pprow, text="Percezione Passiva:", width=170, anchor="w",
                     text_color=TEXT_DIM, font=("Arial", 12)).pack(side="left")
        self._passive_lbl = ctk.CTkLabel(pprow, text="10", font=("Arial", 13, "bold"),
                                          text_color=GOLD_BRIGHT)
        self._passive_lbl.pack(side="left")

        self.divider(self)

        # Inspiration
        insp = ctk.CTkFrame(self, fg_color="transparent")
        insp.pack(fill="x", padx=12, pady=6)
        ctk.CTkCheckBox(insp, text="Ispirazione", variable=self.app.vars["inspiration"],
                        text_color=TEXT, font=("Arial", 12),
                        fg_color=GOLD, hover_color=GOLD_BRIGHT,
                        border_color=BORDER, checkmark_color="#0a0a0a").pack(anchor="w")

        self._update_all()

    def _update_mod(self, key: str):
        try:
            score = self.app.vars[key].get()
            self._mod_labels[key].configure(text=format_modifier(ability_modifier(score)))
        except (tk.TclError, KeyError):
            pass
        self._update_all()

    def _update_all(self):
        try:
            lvl = self.app.vars["level"].get()
            pb  = proficiency_bonus(lvl)
            if self._prof_lbl:
                self._prof_lbl.configure(text=f"+{pb}")
            # Passive perception
            wis_mod = ability_modifier(self.app.vars["wis"].get())
            prof    = self.app.vars["skill_11_prof"].get()
            expert  = self.app.vars["skill_11_expert"].get()
            bonus   = (2 * pb if expert else pb if prof else 0)
            if self._passive_lbl:
                self._passive_lbl.configure(text=str(10 + wis_mod + bonus))
        except (tk.TclError, AttributeError):
            pass
