import tkinter as tk
import customtkinter as ctk
from character import ABILITY_KEYS, ABILITY_INFO, SKILLS, ability_modifier, proficiency_bonus, format_modifier


class SkillsTab(ctk.CTkFrame):
    def __init__(self, parent, app):
        super().__init__(parent, fg_color="transparent")
        self.pack(fill="both", expand=True)
        self.app = app
        self.save_val_labels:  dict[str, ctk.CTkLabel] = {}
        self.skill_val_labels: dict[int, ctk.CTkLabel] = {}
        self._build()
        self._setup_traces()

    def _build(self):
        left = ctk.CTkScrollableFrame(self, label_text="Tiri Salvezza", width=270)
        left.pack(side="left", fill="y", padx=(0, 10), pady=5)

        right = ctk.CTkScrollableFrame(self, label_text="Abilità")
        right.pack(side="left", fill="both", expand=True, pady=5)

        # ---- Saving throws ----
        for key in ABILITY_KEYS:
            row = ctk.CTkFrame(left, fg_color="transparent")
            row.pack(fill="x", padx=6, pady=3)

            ctk.CTkCheckBox(
                row, text="", variable=self.app.vars[f"save_{key}"],
                command=lambda k=key: self._update_save(k), width=24,
            ).pack(side="left")

            lbl = ctk.CTkLabel(row, text="+0", width=40, anchor="e", font=("Arial", 12, "bold"))
            lbl.pack(side="left")
            self.save_val_labels[key] = lbl

            ctk.CTkLabel(row, text=ABILITY_INFO[key]["label"], anchor="w", font=("Arial", 12)).pack(side="left", padx=8)

        # ---- Skills ----
        hdr = ctk.CTkFrame(right, fg_color="transparent")
        hdr.pack(fill="x", padx=6, pady=(2, 0))
        ctk.CTkLabel(hdr, text="Comp.", width=44, font=("Arial", 10)).pack(side="left")
        ctk.CTkLabel(hdr, text="Esp.",  width=44, font=("Arial", 10)).pack(side="left")
        ctk.CTkLabel(hdr, text="Val.",  width=42, font=("Arial", 10)).pack(side="left")
        ctk.CTkLabel(hdr, text="Abilità",        font=("Arial", 10), anchor="w").pack(side="left", padx=6)

        for i, (skill_name, ability_key) in enumerate(SKILLS):
            row = ctk.CTkFrame(right, fg_color="transparent")
            row.pack(fill="x", padx=6, pady=2)

            ctk.CTkCheckBox(
                row, text="", variable=self.app.vars[f"skill_{i}_prof"],
                command=lambda idx=i: self._update_skill(idx), width=24,
            ).pack(side="left")

            ctk.CTkCheckBox(
                row, text="", variable=self.app.vars[f"skill_{i}_expert"],
                command=lambda idx=i: self._update_skill(idx), width=24,
            ).pack(side="left")

            lbl = ctk.CTkLabel(row, text="+0", width=42, anchor="e", font=("Arial", 12, "bold"))
            lbl.pack(side="left")
            self.skill_val_labels[i] = lbl

            ctk.CTkLabel(
                row,
                text=f"{skill_name}  ({ABILITY_INFO[ability_key]['short']})",
                anchor="w", font=("Arial", 12),
            ).pack(side="left", padx=8)

    def _setup_traces(self):
        for key in ABILITY_KEYS:
            self.app.vars[key].trace_add("write", lambda *_: self._update_all())
        self.app.vars["level"].trace_add("write", lambda *_: self._update_all())
        self._update_all()

    def _update_all(self):
        for key in ABILITY_KEYS:
            self._update_save(key)
        for i in range(len(SKILLS)):
            self._update_skill(i)

    def _update_save(self, key: str):
        try:
            mod  = ability_modifier(self.app.vars[key].get())
            pb   = proficiency_bonus(self.app.vars["level"].get())
            prof = self.app.vars[f"save_{key}"].get()
            self.save_val_labels[key].configure(text=format_modifier(mod + (pb if prof else 0)))
        except (tk.TclError, AttributeError, KeyError):
            pass

    def _update_skill(self, i: int):
        try:
            _, ability_key = SKILLS[i]
            mod    = ability_modifier(self.app.vars[ability_key].get())
            pb     = proficiency_bonus(self.app.vars["level"].get())
            prof   = self.app.vars[f"skill_{i}_prof"].get()
            expert = self.app.vars[f"skill_{i}_expert"].get()
            bonus  = (2 * pb if expert else pb if prof else 0)
            self.skill_val_labels[i].configure(text=format_modifier(mod + bonus))
        except (tk.TclError, AttributeError, KeyError):
            pass
