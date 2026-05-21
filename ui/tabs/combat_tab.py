import tkinter as tk
import customtkinter as ctk
from character import HIT_DICE_OPTIONS, ability_modifier, format_modifier


class _AttackRow(ctk.CTkFrame):
    def __init__(self, parent, remove_cb, data: dict | None = None):
        super().__init__(parent, fg_color="transparent")
        self.pack(fill="x", padx=4, pady=2)
        d = data or {}
        self._name   = tk.StringVar(value=d.get("name",   ""))
        self._bonus  = tk.StringVar(value=d.get("bonus",  ""))
        self._damage = tk.StringVar(value=d.get("damage", ""))
        self._dtype  = tk.StringVar(value=d.get("type",   ""))
        self._notes  = tk.StringVar(value=d.get("notes",  ""))

        for var, ph, w in [
            (self._name,   "Nome",        130),
            (self._bonus,  "Bonus att.",   65),
            (self._damage, "Danno (es 1d6+3)", 120),
            (self._dtype,  "Tipo danno",  110),
            (self._notes,  "Note",        140),
        ]:
            ctk.CTkEntry(self, textvariable=var, placeholder_text=ph, width=w).pack(side="left", padx=2)

        ctk.CTkButton(
            self, text="✕", width=30, height=28,
            fg_color="#8b1a1a", hover_color="#c0392b",
            command=remove_cb,
        ).pack(side="left", padx=2)

    def get_data(self) -> dict:
        return {
            "name":   self._name.get(),
            "bonus":  self._bonus.get(),
            "damage": self._damage.get(),
            "type":   self._dtype.get(),
            "notes":  self._notes.get(),
        }


class CombatTab(ctk.CTkFrame):
    def __init__(self, parent, app):
        super().__init__(parent, fg_color="transparent")
        self.pack(fill="both", expand=True)
        self.app = app
        self._attack_rows: list[_AttackRow] = []
        self._build()
        app.vars["dex"].trace_add("write", lambda *_: self._update_initiative())

    def _build(self):
        # ---- Top row: main combat numbers ----
        top = ctk.CTkFrame(self)
        top.pack(fill="x", padx=5, pady=(5, 0))

        for label, key, width in [
            ("PF Max",        "hp_max",     68),
            ("PF Attuali",    "hp_current", 78),
            ("PF Temporanei", "hp_temp",    88),
            ("CA",            "ac",         52),
            ("Velocità (m)", "speed",       62),
        ]:
            col = ctk.CTkFrame(top, fg_color="transparent")
            col.pack(side="left", padx=10, pady=10)
            ctk.CTkLabel(col, text=label, font=("Arial", 11)).pack()
            ctk.CTkEntry(col, textvariable=self.app.vars[key], width=width,
                         justify="center", font=("Arial", 14)).pack()

        # Initiative (auto-updated from DEX)
        init_col = ctk.CTkFrame(top, fg_color="transparent")
        init_col.pack(side="left", padx=10, pady=10)
        ctk.CTkLabel(init_col, text="Iniziativa", font=("Arial", 11)).pack()
        self.initiative_label = ctk.CTkLabel(init_col, text="+0", font=("Arial", 18, "bold"))
        self.initiative_label.pack()

        # Hit Dice
        hd_col = ctk.CTkFrame(top, fg_color="transparent")
        hd_col.pack(side="left", padx=10, pady=10)
        ctk.CTkLabel(hd_col, text="Dadi Vita", font=("Arial", 11)).pack()
        hd_row = ctk.CTkFrame(hd_col, fg_color="transparent")
        hd_row.pack()
        ctk.CTkEntry(hd_row, textvariable=self.app.vars["hit_dice_current"],
                     width=42, justify="center").pack(side="left")
        ctk.CTkOptionMenu(hd_row, variable=self.app.vars["hit_dice_type"],
                          values=HIT_DICE_OPTIONS, width=72).pack(side="left", padx=4)

        # ---- Middle row: death saves ----
        mid = ctk.CTkFrame(self)
        mid.pack(fill="x", padx=5, pady=5)

        ds = ctk.CTkFrame(mid, corner_radius=8)
        ds.pack(side="left", padx=10, pady=5)
        ctk.CTkLabel(ds, text="Tiri Salvezza Morte", font=("Arial", 12, "bold")).pack(pady=(8, 4))

        for kind, label in [("success", "Successi:"), ("fail", "Fallimenti:")]:
            r = ctk.CTkFrame(ds, fg_color="transparent")
            r.pack(padx=14, pady=3)
            ctk.CTkLabel(r, text=label, width=80, anchor="w").pack(side="left")
            for n in [1, 2, 3]:
                ctk.CTkCheckBox(r, text="", variable=self.app.vars[f"death_{kind}_{n}"],
                                width=26).pack(side="left", padx=3)

        ctk.CTkFrame(ds, height=8, fg_color="transparent").pack()

        # ---- Attacks section ----
        atk_frame = ctk.CTkFrame(self)
        atk_frame.pack(fill="both", expand=True, padx=5, pady=5)

        hdr = ctk.CTkFrame(atk_frame, fg_color="transparent")
        hdr.pack(fill="x", padx=5, pady=(5, 2))
        ctk.CTkLabel(hdr, text="Attacchi & Incantesimi", font=("Arial", 13, "bold")).pack(side="left")
        ctk.CTkButton(hdr, text="+ Aggiungi attacco", width=150,
                      command=self._add_attack).pack(side="right", padx=5)

        # Column headers
        col_hdr = ctk.CTkFrame(atk_frame, fg_color="transparent")
        col_hdr.pack(fill="x", padx=8, pady=0)
        for text, w in [("Nome", 130), ("Bonus att.", 65), ("Danno", 120), ("Tipo danno", 110), ("Note", 140)]:
            ctk.CTkLabel(col_hdr, text=text, width=w, font=("Arial", 10)).pack(side="left", padx=2)

        self.attacks_scroll = ctk.CTkScrollableFrame(atk_frame, height=200)
        self.attacks_scroll.pack(fill="both", expand=True, padx=5, pady=4)

    def _update_initiative(self):
        try:
            mod = ability_modifier(self.app.vars["dex"].get())
            self.initiative_label.configure(text=format_modifier(mod))
        except (tk.TclError, AttributeError):
            pass

    def _add_attack(self, data: dict | None = None):
        row_ref: list[_AttackRow] = []

        def remove():
            r = row_ref[0]
            if r in self._attack_rows:
                self._attack_rows.remove(r)
                r.destroy()

        row = _AttackRow(self.attacks_scroll, remove, data)
        row_ref.append(row)
        self._attack_rows.append(row)

    def get_attacks(self) -> list[dict]:
        return [r.get_data() for r in self._attack_rows]

    def set_attacks(self, attacks: list[dict]):
        for row in self._attack_rows:
            row.destroy()
        self._attack_rows.clear()
        for atk in attacks:
            self._add_attack(atk)
