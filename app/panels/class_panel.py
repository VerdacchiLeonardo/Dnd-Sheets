"""
Classe panel — class, subclass, level with auto-suggestions from dnd_data.
"""
import tkinter as tk
import customtkinter as ctk
from app.panels.base import BasePanel
from app.theme import GOLD, GOLD_BRIGHT, BG_WIDGET, TEXT, TEXT_DIM, BORDER
import dnd_data


class ClassPanel(BasePanel):
    def __init__(self, parent, app):
        super().__init__(parent, app)
        self._info_box: ctk.CTkTextbox | None = None
        self._feat_box: ctk.CTkTextbox | None = None
        self._build()
        # Listen for class changes to update suggestions
        app.vars["class_"].trace_add("write", lambda *_: self._on_class_change())

    def _build(self):
        self.heading(self, "Classe & Livello")

        # Class dropdown
        class_names = sorted(dnd_data.CLASSES.keys())
        self.suggest_row(self, "Classe:", self.app.vars["class_"], class_names, width=200)

        # Subclass
        self._subclass_cb = self.suggest_row(
            self, "Sottoclasse:", self.app.vars["subclass"], [], width=200,
        )

        # Level + XP
        row = ctk.CTkFrame(self, fg_color="transparent")
        row.pack(fill="x", padx=12, pady=4)
        ctk.CTkLabel(row, text="Livello:", width=150, anchor="w",
                     text_color=TEXT, font=("Arial", 12)).pack(side="left")
        ctk.CTkEntry(row, textvariable=self.app.vars["level"],
                     width=55, justify="center",
                     fg_color="#1a1408", text_color=TEXT,
                     border_color=BORDER).pack(side="left", padx=4)

        ctk.CTkLabel(row, text="Esp:", width=40, anchor="w",
                     text_color=TEXT_DIM, font=("Arial", 12)).pack(side="left", padx=(16, 0))
        ctk.CTkEntry(row, textvariable=self.app.vars["xp"],
                     width=80, justify="center",
                     fg_color="#1a1408", text_color=TEXT,
                     border_color=BORDER).pack(side="left", padx=4)

        # Hit dice
        hit_row = ctk.CTkFrame(self, fg_color="transparent")
        hit_row.pack(fill="x", padx=12, pady=4)
        ctk.CTkLabel(hit_row, text="Dadi Vita:", width=150, anchor="w",
                     text_color=TEXT, font=("Arial", 12)).pack(side="left")
        self._hd_label = ctk.CTkLabel(hit_row, text="d8",
                                       text_color=GOLD_BRIGHT, font=("Arial", 14, "bold"))
        self._hd_label.pack(side="left")

        self.divider(self)

        # Class description box
        self.heading(self, "Descrizione Classe", pady=(4, 2))
        self._info_box = ctk.CTkTextbox(
            self, height=90, font=("Arial", 11),
            fg_color=BG_WIDGET, text_color=TEXT_DIM,
            border_color=BORDER, border_width=1,
            state="disabled",
        )
        self._info_box.pack(fill="x", padx=12, pady=4)

        # Armor & Weapons
        self.heading(self, "Competenze", pady=(8, 2))
        self._armor_label = ctk.CTkLabel(self, text="", anchor="w",
                                          text_color=TEXT_DIM, font=("Arial", 11),
                                          wraplength=300)
        self._armor_label.pack(anchor="w", padx=12)

        self.divider(self)

        # Level features
        self.heading(self, "Capacità per Livello", pady=(4, 2))
        self._feat_box = ctk.CTkTextbox(
            self, height=220, font=("Arial", 11),
            fg_color=BG_WIDGET, text_color=TEXT,
            border_color=BORDER, border_width=1,
            state="disabled",
        )
        self._feat_box.pack(fill="x", padx=12, pady=4)

        # Initial update
        self._on_class_change()

    def _on_class_change(self):
        cls_name = self.app.vars["class_"].get()
        cls_data = dnd_data.CLASSES.get(cls_name)

        if cls_data is None:
            self._set_textbox(self._info_box, "Seleziona una classe per vedere le informazioni.")
            self._set_textbox(self._feat_box, "")
            self._armor_label.configure(text="")
            self._hd_label.configure(text="—")
            self._subclass_cb.configure(values=[])
            return

        # Update subclass suggestions
        subs = cls_data.get("subclasses", [])
        self._subclass_cb.configure(values=subs)

        # Hit dice
        self._hd_label.configure(text=cls_data.get("hit_dice", "d8"))
        self.app.vars["hit_dice_type"].set(cls_data.get("hit_dice", "d8"))

        # Description
        desc = cls_data.get("description", "")
        saves = " e ".join(cls_data.get("saves", []))
        self._set_textbox(self._info_box, f"{desc}\n\nTS principali: {saves}")

        # Armor/weapons
        armor = cls_data.get("armor", "—")
        weapons = cls_data.get("weapons", "—")
        self._armor_label.configure(text=f"Armature: {armor}\nArmi: {weapons}")

        # Features per level
        features = cls_data.get("features", {})
        lines = []
        for lvl in sorted(features.keys()):
            feats = ", ".join(features[lvl])
            lines.append(f"Liv. {lvl:2d}: {feats}")
        self._set_textbox(self._feat_box, "\n".join(lines))

    @staticmethod
    def _set_textbox(tb: ctk.CTkTextbox, text: str):
        if tb is None:
            return
        tb.configure(state="normal")
        tb.delete("1.0", "end")
        tb.insert("1.0", text)
        tb.configure(state="disabled")
