import tkinter as tk
import customtkinter as ctk
from character import ABILITY_KEYS, ABILITY_INFO, ability_modifier, proficiency_bonus, format_modifier


class CharacterTab(ctk.CTkFrame):
    def __init__(self, parent, app):
        super().__init__(parent, fg_color="transparent")
        self.pack(fill="both", expand=True)
        self.app = app
        self.mod_labels: dict[str, ctk.CTkLabel] = {}
        self.prof_label: ctk.CTkLabel | None = None
        self.passive_label: ctk.CTkLabel | None = None
        self._build()
        for key in ABILITY_KEYS:
            app.vars[key].trace_add("write", lambda *_, k=key: self._update_modifier(k))
        app.vars["level"].trace_add("write", lambda *_: self._update_prof())
        app.vars["level"].trace_add("write", lambda *_: self._update_passive())
        app.vars["wis"].trace_add("write", lambda *_: self._update_passive())
        app.vars["skill_11_prof"].trace_add("write", lambda *_: self._update_passive())
        app.vars["skill_11_expert"].trace_add("write", lambda *_: self._update_passive())

    def _build(self):
        left = ctk.CTkFrame(self, width=290)
        left.pack(side="left", fill="y", padx=(5, 10), pady=5)
        left.pack_propagate(False)

        right = ctk.CTkFrame(self, fg_color="transparent")
        right.pack(side="left", fill="both", expand=True, pady=5)

        # ---- Left panel: extra character info ----
        ctk.CTkLabel(left, text="Informazioni", font=("Arial", 15, "bold")).pack(pady=(12, 6))

        for label, key in [
            ("Sottoclasse:",  "subclass"),
            ("Background:",   "background"),
            ("Allineamento:", "alignment"),
        ]:
            row = ctk.CTkFrame(left, fg_color="transparent")
            row.pack(fill="x", padx=15, pady=4)
            ctk.CTkLabel(row, text=label, width=115, anchor="w", font=("Arial", 12)).pack(side="left")
            ctk.CTkEntry(row, textvariable=self.app.vars[key], width=140).pack(side="left")

        xp_row = ctk.CTkFrame(left, fg_color="transparent")
        xp_row.pack(fill="x", padx=15, pady=4)
        ctk.CTkLabel(xp_row, text="Esperienza:", width=115, anchor="w", font=("Arial", 12)).pack(side="left")
        ctk.CTkEntry(xp_row, textvariable=self.app.vars["xp"], width=100).pack(side="left")

        ctk.CTkFrame(left, height=2, fg_color="gray40").pack(fill="x", padx=15, pady=10)

        prow = ctk.CTkFrame(left, fg_color="transparent")
        prow.pack(fill="x", padx=15, pady=4)
        ctk.CTkLabel(prow, text="Bonus Comp.:", width=135, anchor="w", font=("Arial", 12)).pack(side="left")
        self.prof_label = ctk.CTkLabel(prow, text="+2", font=("Arial", 14, "bold"))
        self.prof_label.pack(side="left")

        pprow = ctk.CTkFrame(left, fg_color="transparent")
        pprow.pack(fill="x", padx=15, pady=4)
        ctk.CTkLabel(pprow, text="Percezione Passiva:", width=135, anchor="w", font=("Arial", 12)).pack(side="left")
        self.passive_label = ctk.CTkLabel(pprow, text="10", font=("Arial", 14, "bold"))
        self.passive_label.pack(side="left")

        # ---- Right panel: ability scores grid ----
        ctk.CTkLabel(right, text="Caratteristiche", font=("Arial", 16, "bold")).pack(pady=(12, 8))

        grid = ctk.CTkFrame(right, fg_color="transparent")
        grid.pack(fill="both", expand=True, padx=15, pady=(0, 10))

        for i, key in enumerate(ABILITY_KEYS):
            info  = ABILITY_INFO[key]
            col   = i % 3
            row_i = i // 3
            grid.columnconfigure(col, weight=1)
            grid.rowconfigure(row_i, weight=1)

            box = ctk.CTkFrame(grid, corner_radius=12, width=150, height=165)
            box.grid(row=row_i, column=col, padx=10, pady=10, sticky="nsew")
            box.pack_propagate(False)
            box.grid_propagate(False)

            ctk.CTkLabel(box, text=info["short"], font=("Arial", 13, "bold")).pack(pady=(14, 0))

            mod = ability_modifier(self.app.vars[key].get())
            lbl = ctk.CTkLabel(box, text=format_modifier(mod), font=("Arial", 32, "bold"))
            lbl.pack()
            self.mod_labels[key] = lbl

            ctk.CTkEntry(
                box, textvariable=self.app.vars[key],
                width=65, justify="center", font=("Arial", 14),
            ).pack(pady=4)

            ctk.CTkLabel(box, text=info["label"], font=("Arial", 10)).pack(pady=(0, 14))

    # ---- live-update callbacks ----
    def _update_modifier(self, key: str):
        try:
            score = self.app.vars[key].get()
            self.mod_labels[key].configure(text=format_modifier(ability_modifier(score)))
        except (tk.TclError, AttributeError, KeyError):
            pass

    def _update_prof(self):
        try:
            pb = proficiency_bonus(self.app.vars["level"].get())
            self.prof_label.configure(text=f"+{pb}")
        except (tk.TclError, AttributeError):
            pass

    def _update_passive(self):
        try:
            wis_mod = ability_modifier(self.app.vars["wis"].get())
            pb      = proficiency_bonus(self.app.vars["level"].get())
            prof    = self.app.vars["skill_11_prof"].get()
            expert  = self.app.vars["skill_11_expert"].get()
            bonus   = (2 * pb if expert else pb if prof else 0)
            self.passive_label.configure(text=str(10 + wis_mod + bonus))
        except (tk.TclError, AttributeError):
            pass
