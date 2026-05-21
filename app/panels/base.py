"""
Base panel class — all section panels inherit from this.
"""
import tkinter as tk
import customtkinter as ctk
from app.theme import BG_PANEL, BG_WIDGET, BG_ENTRY, TEXT, GOLD, GOLD_BRIGHT, BORDER, TEXT_DIM


class BasePanel(ctk.CTkScrollableFrame):
    """Dark-themed scrollable panel with consistent styling."""

    ENTRY_KW = dict(
        fg_color=BG_ENTRY,
        text_color=TEXT,
        border_color=BORDER,
        border_width=1,
    )
    LABEL_KW = dict(
        text_color=TEXT_DIM,
        font=("Arial", 12),
    )
    HEADING_KW = dict(
        text_color=GOLD_BRIGHT,
        font=("Arial", 14, "bold"),
    )

    def __init__(self, parent, app, **kw):
        super().__init__(parent, fg_color=BG_PANEL, scrollbar_button_color=BORDER, **kw)
        self.pack(fill="both", expand=True)
        self.app = app

    # ── Helpers ──────────────────────────────────────────────────────────────
    def heading(self, parent, text: str, pady=(12, 4)):
        ctk.CTkLabel(parent, text=text, **self.HEADING_KW).pack(anchor="w", padx=12, pady=pady)

    def divider(self, parent):
        ctk.CTkFrame(parent, height=1, fg_color=BORDER).pack(fill="x", padx=12, pady=6)

    def field_row(self, parent, label: str, var: tk.Variable,
                  width: int = 220, pady: int = 4) -> ctk.CTkEntry:
        row = ctk.CTkFrame(parent, fg_color="transparent")
        row.pack(fill="x", padx=12, pady=pady)
        ctk.CTkLabel(row, text=label, width=150, anchor="w", **self.LABEL_KW).pack(side="left")
        e = ctk.CTkEntry(row, textvariable=var, width=width, **self.ENTRY_KW)
        e.pack(side="left")
        return e

    def suggest_row(self, parent, label: str, var: tk.Variable,
                    values: list[str], width: int = 220) -> ctk.CTkComboBox:
        row = ctk.CTkFrame(parent, fg_color="transparent")
        row.pack(fill="x", padx=12, pady=4)
        ctk.CTkLabel(row, text=label, width=150, anchor="w", **self.LABEL_KW).pack(side="left")
        cb = ctk.CTkComboBox(
            row, variable=var, values=values, width=width,
            fg_color=BG_ENTRY, text_color=TEXT,
            button_color=BORDER, button_hover_color=GOLD,
            border_color=BORDER, dropdown_fg_color=BG_PANEL,
            dropdown_text_color=TEXT, dropdown_hover_color=BG_WIDGET,
        )
        cb.pack(side="left")
        return cb

    def int_row(self, parent, label: str, var: tk.Variable,
                width: int = 90, pady: int = 4) -> ctk.CTkEntry:
        row = ctk.CTkFrame(parent, fg_color="transparent")
        row.pack(fill="x", padx=12, pady=pady)
        ctk.CTkLabel(row, text=label, width=150, anchor="w", **self.LABEL_KW).pack(side="left")
        e = ctk.CTkEntry(row, textvariable=var, width=width,
                         justify="center", **self.ENTRY_KW)
        e.pack(side="left")
        return e

    def check_row(self, parent, label: str, var: tk.Variable, pady: int = 3):
        row = ctk.CTkFrame(parent, fg_color="transparent")
        row.pack(fill="x", padx=12, pady=pady)
        ctk.CTkCheckBox(
            row, text=label, variable=var,
            text_color=TEXT, font=("Arial", 12),
            fg_color=GOLD, hover_color=GOLD_BRIGHT,
            border_color=BORDER, checkmark_color=BG_PANEL,
        ).pack(anchor="w")

    def textbox(self, parent, height: int = 120) -> ctk.CTkTextbox:
        tb = ctk.CTkTextbox(
            parent, height=height, font=("Arial", 12),
            fg_color=BG_ENTRY, text_color=TEXT,
            border_color=BORDER, border_width=1,
        )
        tb.pack(fill="x", padx=12, pady=4)
        return tb

    def info_box(self, parent, text: str):
        """Non-editable info label box."""
        box = ctk.CTkTextbox(
            parent, height=80, font=("Arial", 11),
            fg_color=BG_WIDGET, text_color=TEXT_DIM,
            border_color=BORDER, border_width=1,
            state="disabled",
        )
        box.pack(fill="x", padx=12, pady=4)
        box.configure(state="normal")
        box.delete("1.0", "end")
        box.insert("1.0", text)
        box.configure(state="disabled")
        return box
