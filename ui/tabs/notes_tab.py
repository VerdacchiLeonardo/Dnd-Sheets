import customtkinter as ctk


class NotesTab(ctk.CTkFrame):
    def __init__(self, parent, app):
        super().__init__(parent, fg_color="transparent")
        self.pack(fill="both", expand=True)
        self.app = app
        self._build()

    def _build(self):
        inner = ctk.CTkTabview(self)
        inner.pack(fill="both", expand=True, padx=5, pady=5)

        for tab in ["Caratteristiche & Talenti", "Storia del Personaggio", "Note Libere"]:
            inner.add(tab)

        self._features  = ctk.CTkTextbox(inner.tab("Caratteristiche & Talenti"), font=("Arial", 12))
        self._features.pack(fill="both", expand=True, padx=5, pady=5)

        self._backstory = ctk.CTkTextbox(inner.tab("Storia del Personaggio"), font=("Arial", 12))
        self._backstory.pack(fill="both", expand=True, padx=5, pady=5)

        self._notes     = ctk.CTkTextbox(inner.tab("Note Libere"), font=("Arial", 12))
        self._notes.pack(fill="both", expand=True, padx=5, pady=5)

    # ---- getters / setters used by app.py ----
    def get_features(self)  -> str: return self._features.get("1.0", "end-1c")
    def get_backstory(self) -> str: return self._backstory.get("1.0", "end-1c")
    def get_notes(self)     -> str: return self._notes.get("1.0", "end-1c")

    def set_features(self,  text: str): self._set(self._features,  text)
    def set_backstory(self, text: str): self._set(self._backstory, text)
    def set_notes(self,     text: str): self._set(self._notes,     text)

    @staticmethod
    def _set(widget: ctk.CTkTextbox, text: str):
        widget.delete("1.0", "end")
        widget.insert("1.0", text)
