"""
Combattimento panel — HP, AC, initiative, death saves, attacks.
"""
import tkinter as tk
import customtkinter as ctk
from app.panels.base import BasePanel
from app.theme import GOLD, GOLD_BRIGHT, BG_WIDGET, TEXT, TEXT_DIM, BORDER, RED, RED_BRIGHT
from character import ability_modifier, format_modifier, HIT_DICE_OPTIONS


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

        ek = dict(fg_color="#1a1408", text_color=TEXT, border_color=BORDER, border_width=1)
        for var, ph, w in [
            (self._name,   "Nome",     120),
            (self._bonus,  "+Bonus",    60),
            (self._damage, "Danno",     90),
            (self._dtype,  "Tipo",      90),
            (self._notes,  "Note",     100),
        ]:
            ctk.CTkEntry(self, textvariable=var, placeholder_text=ph, width=w, **ek).pack(side="left", padx=2)

        ctk.CTkButton(self, text="✕", width=28, height=26,
                      fg_color=RED, hover_color=RED_BRIGHT,
                      command=remove_cb).pack(side="left", padx=2)

    def get_data(self) -> dict:
        return {"name": self._name.get(), "bonus": self._bonus.get(),
                "damage": self._damage.get(), "type": self._dtype.get(),
                "notes": self._notes.get()}


class CombatPanel(BasePanel):
    def __init__(self, parent, app):
        super().__init__(parent, app)
        self._attack_rows: list[_AttackRow] = []
        self._init_lbl: ctk.CTkLabel | None = None
        self._build()
        app.vars["dex"].trace_add("write", lambda *_: self._update_init())

    def _build(self):
        self.heading(self, "Punti Ferita")

        hp_row = ctk.CTkFrame(self, fg_color="transparent")
        hp_row.pack(fill="x", padx=12, pady=4)
        for label, key, w in [("Max", "hp_max", 70), ("Attuali", "hp_current", 70), ("Temp.", "hp_temp", 70)]:
            col = ctk.CTkFrame(hp_row, fg_color=BG_WIDGET, corner_radius=6,
                               border_width=1, border_color=BORDER)
            col.pack(side="left", padx=6)
            ctk.CTkLabel(col, text=label, font=("Arial", 10), text_color=TEXT_DIM).pack(pady=(6, 0))
            ctk.CTkEntry(col, textvariable=self.app.vars[key], width=w,
                         justify="center", font=("Arial", 15, "bold"),
                         fg_color="transparent", text_color=GOLD_BRIGHT,
                         border_width=0).pack(padx=8, pady=(0, 8))

        self.divider(self)
        self.heading(self, "Combattimento")

        stat_row = ctk.CTkFrame(self, fg_color="transparent")
        stat_row.pack(fill="x", padx=12, pady=4)
        for label, key, w in [("CA", "ac", 60), ("Velocità (m)", "speed", 80)]:
            col = ctk.CTkFrame(stat_row, fg_color=BG_WIDGET, corner_radius=6,
                               border_width=1, border_color=BORDER)
            col.pack(side="left", padx=6)
            ctk.CTkLabel(col, text=label, font=("Arial", 10), text_color=TEXT_DIM).pack(pady=(6, 0))
            ctk.CTkEntry(col, textvariable=self.app.vars[key], width=w,
                         justify="center", font=("Arial", 15, "bold"),
                         fg_color="transparent", text_color=GOLD_BRIGHT,
                         border_width=0).pack(padx=8, pady=(0, 8))

        # Initiative (auto-calc)
        init_col = ctk.CTkFrame(stat_row, fg_color=BG_WIDGET, corner_radius=6,
                                border_width=1, border_color=BORDER)
        init_col.pack(side="left", padx=6)
        ctk.CTkLabel(init_col, text="Iniziativa", font=("Arial", 10), text_color=TEXT_DIM).pack(pady=(6, 0))
        self._init_lbl = ctk.CTkLabel(init_col, text="+0",
                                       font=("Arial", 18, "bold"), text_color=GOLD_BRIGHT)
        self._init_lbl.pack(padx=14, pady=(0, 8))

        # Hit dice
        hd_row = ctk.CTkFrame(stat_row, fg_color=BG_WIDGET, corner_radius=6,
                              border_width=1, border_color=BORDER)
        hd_row.pack(side="left", padx=6)
        ctk.CTkLabel(hd_row, text="Dadi Vita", font=("Arial", 10), text_color=TEXT_DIM).pack(pady=(6, 0))
        hd_inner = ctk.CTkFrame(hd_row, fg_color="transparent")
        hd_inner.pack(padx=6, pady=(0, 8))
        ctk.CTkEntry(hd_inner, textvariable=self.app.vars["hit_dice_current"],
                     width=38, justify="center", font=("Arial", 14),
                     fg_color="transparent", text_color=TEXT, border_width=0).pack(side="left")
        ctk.CTkOptionMenu(hd_inner, variable=self.app.vars["hit_dice_type"],
                          values=HIT_DICE_OPTIONS, width=68,
                          fg_color=BG_WIDGET, text_color=TEXT,
                          button_color=BORDER, button_hover_color=GOLD,
                          dropdown_fg_color="#1a1408", dropdown_text_color=TEXT).pack(side="left")

        self.divider(self)

        # Death saves
        self.heading(self, "Tiri Salvezza Morte")
        ds_frame = ctk.CTkFrame(self, fg_color=BG_WIDGET, corner_radius=6,
                                border_width=1, border_color=BORDER)
        ds_frame.pack(fill="x", padx=12, pady=4)
        for kind, label in [("success", "Successi"), ("fail", "Fallimenti")]:
            r = ctk.CTkFrame(ds_frame, fg_color="transparent")
            r.pack(anchor="w", padx=12, pady=4)
            ctk.CTkLabel(r, text=f"{label}:", width=90, anchor="w",
                         text_color=TEXT, font=("Arial", 12)).pack(side="left")
            for n in [1, 2, 3]:
                ctk.CTkCheckBox(r, text="", variable=self.app.vars[f"death_{kind}_{n}"],
                                width=24, fg_color=GOLD, hover_color=GOLD_BRIGHT,
                                border_color=BORDER, checkmark_color="#0a0a0a").pack(side="left", padx=3)

        self.divider(self)

        # Attacks
        self.heading(self, "Attacchi & Incantesimi")
        hdr = ctk.CTkFrame(self, fg_color="transparent")
        hdr.pack(fill="x", padx=12, pady=(0, 2))
        ctk.CTkButton(hdr, text="+ Aggiungi attacco", width=160, height=28,
                      font=("Arial", 12),
                      fg_color="#2a1a08", hover_color="#5a3a10",
                      text_color=GOLD_BRIGHT, border_width=1, border_color=BORDER,
                      command=self._add_attack).pack(side="right")

        col_hdr = ctk.CTkFrame(self, fg_color="transparent")
        col_hdr.pack(fill="x", padx=14, pady=0)
        for text, w in [("Nome", 120), ("Bonus", 60), ("Danno", 90), ("Tipo", 90), ("Note", 100)]:
            ctk.CTkLabel(col_hdr, text=text, width=w, font=("Arial", 9),
                         text_color=TEXT_DIM).pack(side="left", padx=2)

        self._attacks_outer = ctk.CTkFrame(self, fg_color=BG_WIDGET, corner_radius=6,
                                           border_width=1, border_color=BORDER)
        self._attacks_outer.pack(fill="x", padx=12, pady=4)

        self._update_init()

    def _update_init(self):
        try:
            mod = ability_modifier(self.app.vars["dex"].get())
            if self._init_lbl:
                self._init_lbl.configure(text=format_modifier(mod))
        except (tk.TclError, AttributeError):
            pass

    def _add_attack(self, data: dict | None = None):
        ref: list = []

        def remove():
            r = ref[0]
            if r in self._attack_rows:
                self._attack_rows.remove(r)
                r.destroy()

        row = _AttackRow(self._attacks_outer, remove, data)
        ref.append(row)
        self._attack_rows.append(row)

    def get_attacks(self) -> list[dict]:
        return [r.get_data() for r in self._attack_rows]

    def set_attacks(self, attacks: list[dict]):
        for r in self._attack_rows:
            r.destroy()
        self._attack_rows.clear()
        for atk in attacks:
            self._add_attack(atk)
