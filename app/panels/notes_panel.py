"""
Note panel — features, backstory, free notes.
"""
import customtkinter as ctk
from app.panels.base import BasePanel
from app.theme import BG_WIDGET, TEXT, TEXT_DIM, BORDER


class NotesPanel(BasePanel):
    def __init__(self, parent, app):
        super().__init__(parent, app)
        self._feat_text: ctk.CTkTextbox | None = None
        self._story_text: ctk.CTkTextbox | None = None
        self._notes_text: ctk.CTkTextbox | None = None
        self._build()

    def _build(self):
        for section, attr, height in [
            ("Caratteristiche & Talenti", "_feat_text",  140),
            ("Storia del Personaggio",    "_story_text", 140),
            ("Note Libere",               "_notes_text", 140),
        ]:
            self.heading(self, section)
            tb = ctk.CTkTextbox(
                self, height=height, font=("Arial", 12),
                fg_color="#100e08", text_color=TEXT,
                border_color=BORDER, border_width=1,
            )
            tb.pack(fill="x", padx=12, pady=4)
            setattr(self, attr, tb)
            self.divider(self)

    # ── getters / setters ────────────────────────────────────────────────────
    def get_features(self)  -> str: return self._get(self._feat_text)
    def get_backstory(self) -> str: return self._get(self._story_text)
    def get_notes(self)     -> str: return self._get(self._notes_text)

    def set_features(self,  t: str): self._set(self._feat_text,  t)
    def set_backstory(self, t: str): self._set(self._story_text, t)
    def set_notes(self,     t: str): self._set(self._notes_text, t)

    @staticmethod
    def _get(tb: ctk.CTkTextbox | None) -> str:
        return tb.get("1.0", "end-1c") if tb else ""

    @staticmethod
    def _set(tb: ctk.CTkTextbox | None, text: str):
        if tb:
            tb.delete("1.0", "end")
            tb.insert("1.0", text)
