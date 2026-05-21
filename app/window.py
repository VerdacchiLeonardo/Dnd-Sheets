"""
Main application window — manages screen transitions and character data.
"""
import tkinter as tk
from tkinter import filedialog, messagebox
import customtkinter as ctk

from character import ABILITY_KEYS, SKILLS, default_character, load_character, save_character
from app.home_screen import HomeScreen
from app.sheet_screen import SheetScreen

import customtkinter as ctk
ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")


class DndApp(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("D&D 5e – Schede Personaggio")
        self.geometry("1200x780")
        self.minsize(1000, 660)
        self.configure(fg_color="#080808")

        self.current_file: str | None = None
        self._screen: ctk.CTkFrame | None = None
        self._sheet: SheetScreen | None = None

        self._init_vars()
        self._setup_menu()
        self._show_home()

    # ── Variables ─────────────────────────────────────────────────────────────
    def _init_vars(self):
        self.vars: dict[str, tk.Variable] = {}

        for key in ["name", "race", "class_", "subclass", "background", "alignment"]:
            self.vars[key] = tk.StringVar(self)
        self.vars["level"] = tk.IntVar(self, value=1)
        self.vars["xp"]    = tk.IntVar(self, value=0)
        self.vars["inspiration"] = tk.BooleanVar(self, value=False)

        for key in ABILITY_KEYS:
            self.vars[key] = tk.IntVar(self, value=10)
        for key in ABILITY_KEYS:
            self.vars[f"save_{key}"] = tk.BooleanVar(self, value=False)
        for i in range(len(SKILLS)):
            self.vars[f"skill_{i}_prof"]   = tk.BooleanVar(self, value=False)
            self.vars[f"skill_{i}_expert"] = tk.BooleanVar(self, value=False)

        for key in ["hp_max", "hp_current", "hp_temp"]:
            self.vars[key] = tk.IntVar(self, value=0)
        self.vars["ac"]               = tk.IntVar(self, value=10)
        self.vars["speed"]            = tk.IntVar(self, value=30)
        self.vars["hit_dice_current"] = tk.IntVar(self, value=1)
        self.vars["hit_dice_type"]    = tk.StringVar(self, value="d8")

        for prefix in ["success", "fail"]:
            for n in [1, 2, 3]:
                self.vars[f"death_{prefix}_{n}"] = tk.BooleanVar(self, value=False)
        for coin in ["cp", "sp", "ep", "gp", "pp"]:
            self.vars[coin] = tk.IntVar(self, value=0)

    # ── Menu ──────────────────────────────────────────────────────────────────
    def _setup_menu(self):
        mb = tk.Menu(self)
        self.configure(menu=mb)
        fm = tk.Menu(mb, tearoff=0)
        mb.add_cascade(label="File", menu=fm)
        fm.add_command(label="Home",               command=self._show_home)
        fm.add_command(label="Nuovo personaggio",  command=self.new_character,   accelerator="Ctrl+N")
        fm.add_command(label="Apri…",              command=self.open_character,  accelerator="Ctrl+O")
        fm.add_separator()
        fm.add_command(label="Salva",              command=self.save_character,  accelerator="Ctrl+S")
        fm.add_command(label="Salva come…",        command=self.save_as)
        fm.add_separator()
        fm.add_command(label="Esci",               command=self.quit)
        self.bind("<Control-n>", lambda _: self.new_character())
        self.bind("<Control-o>", lambda _: self.open_character())
        self.bind("<Control-s>", lambda _: self.save_character())

    # ── Screen transitions ────────────────────────────────────────────────────
    def _show_home(self):
        if self._screen:
            self._screen.pack_forget()
        self._sheet = None
        self._screen = HomeScreen(self, on_new=self.new_character, on_load=self.open_character)

    def _show_sheet(self):
        if self._screen:
            self._screen.pack_forget()
        self._sheet = SheetScreen(self, self)
        self._screen = self._sheet

    # ── Character actions ─────────────────────────────────────────────────────
    def new_character(self):
        self.current_file = None
        self._populate(default_character())
        if self._sheet is None:
            self._show_sheet()
        self.title("D&D 5e – Nuovo Personaggio")

    def open_character(self):
        path = filedialog.askopenfilename(
            title="Apri personaggio",
            filetypes=[("Personaggio D&D (JSON)", "*.json"), ("Tutti i file", "*.*")],
        )
        if not path:
            return
        try:
            data = load_character(path)
            self.current_file = path
            self._populate(data)
            if self._sheet is None:
                self._show_sheet()
            self.title(f"D&D 5e – {data.get('name', 'Personaggio')}")
        except Exception as exc:
            messagebox.showerror("Errore apertura", str(exc))

    def save_character(self):
        if self.current_file:
            self._write(self.current_file)
        else:
            self.save_as()

    def save_as(self):
        name = self.vars["name"].get() or "personaggio"
        path = filedialog.asksaveasfilename(
            title="Salva personaggio come…",
            defaultextension=".json",
            initialfile=f"{name}.json",
            filetypes=[("Personaggio D&D (JSON)", "*.json"), ("Tutti i file", "*.*")],
        )
        if not path:
            return
        self._write(path)
        self.current_file = path
        self.title(f"D&D 5e – {self.vars['name'].get() or 'Personaggio'}")

    def _write(self, path: str):
        try:
            save_character(self._collect(), path)
        except Exception as exc:
            messagebox.showerror("Errore salvataggio", str(exc))

    # ── Data sync ─────────────────────────────────────────────────────────────
    def _collect(self) -> dict:
        data: dict = {}
        for key, var in self.vars.items():
            try:
                data[key] = var.get()
            except tk.TclError:
                data[key] = 0
        if self._sheet:
            data["equipment"] = self._sheet.get_equipment_text()
            data["spells"]    = self._sheet.get_spells_text()
            data["features"]  = self._sheet.get_features()
            data["backstory"] = self._sheet.get_backstory()
            data["notes"]     = self._sheet.get_notes()
            data["attacks"]   = self._sheet.get_attacks()
        return data

    def _populate(self, data: dict):
        for key, var in self.vars.items():
            if key in data:
                try:
                    var.set(data[key])
                except tk.TclError:
                    pass
        if self._sheet:
            self._sheet.set_equipment_text(data.get("equipment", ""))
            self._sheet.set_spells_text(data.get("spells", ""))
            self._sheet.set_features(data.get("features", ""))
            self._sheet.set_backstory(data.get("backstory", ""))
            self._sheet.set_notes(data.get("notes", ""))
            self._sheet.set_attacks(data.get("attacks", []))
