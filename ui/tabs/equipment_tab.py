import customtkinter as ctk


class EquipmentTab(ctk.CTkFrame):
    def __init__(self, parent, app):
        super().__init__(parent, fg_color="transparent")
        self.pack(fill="both", expand=True)
        self.app = app
        self._build()

    def _build(self):
        # ---- Currency ----
        curr = ctk.CTkFrame(self, corner_radius=8)
        curr.pack(fill="x", padx=8, pady=(8, 4))
        ctk.CTkLabel(curr, text="Monete", font=("Arial", 14, "bold")).pack(pady=(8, 4))

        coins_row = ctk.CTkFrame(curr, fg_color="transparent")
        coins_row.pack(padx=15, pady=(0, 10))

        for label, key, color in [
            ("Rame (MR)",    "cp", "#b87333"),
            ("Argento (MA)", "sp", "#c0c0c0"),
            ("Electrum (ME)","ep", "#a8a9ad"),
            ("Oro (MO)",     "gp", "#ffd700"),
            ("Platino (MP)", "pp", "#e5e4e2"),
        ]:
            col = ctk.CTkFrame(coins_row, fg_color="transparent")
            col.pack(side="left", padx=14)
            ctk.CTkLabel(col, text=label, font=("Arial", 11)).pack()
            ctk.CTkEntry(col, textvariable=self.app.vars[key],
                         width=80, justify="center", font=("Arial", 14)).pack()

        # ---- Equipment list ----
        ctk.CTkLabel(self, text="Equipaggiamento & Oggetti",
                     font=("Arial", 13, "bold")).pack(padx=8, pady=(6, 2), anchor="w")
        self._text = ctk.CTkTextbox(self, font=("Arial", 12))
        self._text.pack(fill="both", expand=True, padx=8, pady=(0, 8))

    def get_text(self) -> str:
        return self._text.get("1.0", "end-1c")

    def set_text(self, text: str):
        self._text.delete("1.0", "end")
        self._text.insert("1.0", text)
