"""
Abilità panel — saving throws and skills with live bonuses.
"""
import tkinter as tk
import customtkinter as ctk
from app.panels.base import BasePanel
from app.theme import GOLD, GOLD_BRIGHT, BG_WIDGET, TEXT, TEXT_DIM, BORDER
from character import ABILITY_KEYS, ABILITY_INFO, SKILLS, ability_modifier, proficiency_bonus, format_modifier


class SkillsPanel(BasePanel):
    def __init__(self, parent, app):
        super().__init__(parent, app)
        self._save_lbls: dict[str, ctk.CTkLabel] = {}
        self._skill_lbls: dict[int, ctk.CTkLabel] = {}
        self._build()
        for key in ABILITY_KEYS:
            app.vars[key].trace_add("write", lambda *_: self._update_all())
        app.vars["level"].trace_add("write", lambda *_: self._update_all())

    def _build(self):
        # ── Saving Throws ──
        self.heading(self, "Tiri Salvezza")

        for key in ABILITY_KEYS:
            row = ctk.CTkFrame(self, fg_color="transparent")
            row.pack(fill="x", padx=12, pady=2)

            ctk.CTkCheckBox(row, text="", variable=self.app.vars[f"save_{key}"],
                            command=self._update_all, width=22,
                            fg_color=GOLD, hover_color=GOLD_BRIGHT,
                            border_color=BORDER, checkmark_color="#0a0a0a").pack(side="left")

            lbl = ctk.CTkLabel(row, text="+0", width=38, anchor="e",
                               font=("Arial", 12, "bold"), text_color=GOLD_BRIGHT)
            lbl.pack(side="left")
            self._save_lbls[key] = lbl

            ctk.CTkLabel(row, text=ABILITY_INFO[key]["label"], anchor="w",
                         text_color=TEXT, font=("Arial", 12)).pack(side="left", padx=8)

        self.divider(self)

        # ── Skills ──
        self.heading(self, "Abilità")

        # Column headers
        hdr = ctk.CTkFrame(self, fg_color="transparent")
        hdr.pack(fill="x", padx=12, pady=(0, 2))
        ctk.CTkLabel(hdr, text="C.", width=22, font=("Arial", 9), text_color=TEXT_DIM).pack(side="left")
        ctk.CTkLabel(hdr, text="E.", width=22, font=("Arial", 9), text_color=TEXT_DIM).pack(side="left")
        ctk.CTkLabel(hdr, text="Val.", width=38, font=("Arial", 9), text_color=TEXT_DIM).pack(side="left")
        ctk.CTkLabel(hdr, text="Abilità",  font=("Arial", 9), text_color=TEXT_DIM, anchor="w").pack(side="left", padx=8)

        for i, (skill_name, ability_key) in enumerate(SKILLS):
            row = ctk.CTkFrame(self, fg_color="transparent")
            row.pack(fill="x", padx=12, pady=1)

            ctk.CTkCheckBox(row, text="", variable=self.app.vars[f"skill_{i}_prof"],
                            command=self._update_all, width=22,
                            fg_color=GOLD, hover_color=GOLD_BRIGHT,
                            border_color=BORDER, checkmark_color="#0a0a0a").pack(side="left")

            ctk.CTkCheckBox(row, text="", variable=self.app.vars[f"skill_{i}_expert"],
                            command=self._update_all, width=22,
                            fg_color=GOLD_BRIGHT, hover_color=GOLD,
                            border_color=BORDER, checkmark_color="#0a0a0a").pack(side="left")

            lbl = ctk.CTkLabel(row, text="+0", width=38, anchor="e",
                               font=("Arial", 12, "bold"), text_color=GOLD_BRIGHT)
            lbl.pack(side="left")
            self._skill_lbls[i] = lbl

            ctk.CTkLabel(row,
                         text=f"{skill_name}  ({ABILITY_INFO[ability_key]['short']})",
                         anchor="w", text_color=TEXT, font=("Arial", 11)).pack(side="left", padx=8)

        self._update_all()

    def _update_all(self):
        try:
            pb = proficiency_bonus(self.app.vars["level"].get())
        except (tk.TclError, ValueError):
            pb = 2

        for key in ABILITY_KEYS:
            try:
                mod  = ability_modifier(self.app.vars[key].get())
                prof = self.app.vars[f"save_{key}"].get()
                self._save_lbls[key].configure(text=format_modifier(mod + (pb if prof else 0)))
            except (tk.TclError, KeyError):
                pass

        for i, (_, ability_key) in enumerate(SKILLS):
            try:
                mod    = ability_modifier(self.app.vars[ability_key].get())
                prof   = self.app.vars[f"skill_{i}_prof"].get()
                expert = self.app.vars[f"skill_{i}_expert"].get()
                bonus  = (2 * pb if expert else pb if prof else 0)
                self._skill_lbls[i].configure(text=format_modifier(mod + bonus))
            except (tk.TclError, KeyError):
                pass
