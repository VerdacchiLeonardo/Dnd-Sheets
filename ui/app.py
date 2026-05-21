import tkinter as tk
from tkinter import filedialog, messagebox
import customtkinter as ctk

from character import (
    ABILITY_KEYS, SKILLS,
    default_character, load_character, save_character,
)
from ui.tabs.character_tab import CharacterTab
from ui.tabs.combat_tab import CombatTab
from ui.tabs.skills_tab import SkillsTab
from ui.tabs.equipment_tab import EquipmentTab
from ui.tabs.notes_tab import NotesTab

ctk.set_appearance_mode("dark")
ctk.set_default_color_theme("blue")


class DndApp(ctk.CTk):
    def __init__(self):
        super().__init__()
        self.title("D&D 5e – Schede Personaggio")
        self.geometry("1150x760")
        self.minsize(920, 620)
        self.current_file = None
        self._init_vars()
        self._setup_menu()
        self._setup_ui()
        self.new_character()

    # ------------------------------------------------------------------ vars
    def _init_vars(self):
        self.vars: dict[str, tk.Variable] = {}

        for key in ["name", "race", "class_", "subclass", "background", "alignment"]:
            self.vars[key] = tk.StringVar(self)
        self.vars["level"] = tk.IntVar(self, value=1)
        self.vars["xp"] = tk.IntVar(self, value=0)
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

    # ------------------------------------------------------------------ menu
    def _setup_menu(self):
        mb = tk.Menu(self)
        self.configure(menu=mb)

        fm = tk.Menu(mb, tearoff=0)
        mb.add_cascade(label="File", menu=fm)
        fm.add_command(label="Nuovo personaggio",  command=self.new_character,   accelerator="Ctrl+N")
        fm.add_command(label="Apri…",              command=self.open_character,  accelerator="Ctrl+O")
        fm.add_separator()
        fm.add_command(label="Salva",              command=self.save_character,  accelerator="Ctrl+S")
        fm.add_command(label="Salva come…",        command=self.save_as)
        fm.add_separator()
        fm.add_command(label="Esci",               command=self.quit)

        self.bind("<Control-n>", lambda _e: self.new_character())
        self.bind("<Control-o>", lambda _e: self.open_character())
        self.bind("<Control-s>", lambda _e: self.save_character())

    # ------------------------------------------------------------------ UI
    def _setup_ui(self):
        main = ctk.CTkFrame(self, fg_color="transparent")
        main.pack(fill="both", expand=True, padx=10, pady=10)

        # Always-visible header bar
        hdr = ctk.CTkFrame(main, height=56, corner_radius=8)
        hdr.pack(fill="x", pady=(0, 8))
        hdr.pack_propagate(False)

        def _hdr_field(label, key, width):
            ctk.CTkLabel(hdr, text=label, font=("Arial", 12, "bold")).pack(side="left", padx=(14, 3))
            ctk.CTkEntry(hdr, textvariable=self.vars[key], font=("Arial", 13), width=width).pack(side="left", padx=(0, 4))

        _hdr_field("Nome:",   "name",   220)
        _hdr_field("Livello:","level",  46)
        _hdr_field("Classe:", "class_", 150)
        _hdr_field("Razza:",  "race",   120)

        ctk.CTkCheckBox(hdr, text="Ispirazione", variable=self.vars["inspiration"],
                        font=("Arial", 12)).pack(side="right", padx=16)

        # Tab view
        self.tabview = ctk.CTkTabview(main)
        self.tabview.pack(fill="both", expand=True)

        for name in ["Personaggio", "Combattimento", "Abilità", "Equipaggiamento", "Note"]:
            self.tabview.add(name)

        self.character_tab = CharacterTab(self.tabview.tab("Personaggio"),       self)
        self.combat_tab    = CombatTab(self.tabview.tab("Combattimento"),         self)
        self.skills_tab    = SkillsTab(self.tabview.tab("Abilità"),               self)
        self.equipment_tab = EquipmentTab(self.tabview.tab("Equipaggiamento"),    self)
        self.notes_tab     = NotesTab(self.tabview.tab("Note"),                   self)

    # ------------------------------------------------------------------ actions
    def new_character(self):
        self.current_file = None
        self.title("D&D 5e – Nuovo Personaggio")
        self._populate(default_character())

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

    # ------------------------------------------------------------------ data sync
    def _write(self, path: str):
        try:
            save_character(self._collect(), path)
        except Exception as exc:
            messagebox.showerror("Errore salvataggio", str(exc))

    def _collect(self) -> dict:
        data: dict = {}
        for key, var in self.vars.items():
            try:
                data[key] = var.get()
            except tk.TclError:
                data[key] = 0
        data["equipment"] = self.equipment_tab.get_text()
        data["features"]  = self.notes_tab.get_features()
        data["backstory"] = self.notes_tab.get_backstory()
        data["notes"]     = self.notes_tab.get_notes()
        data["attacks"]   = self.combat_tab.get_attacks()
        return data

    def _populate(self, data: dict):
        for key, var in self.vars.items():
            if key in data:
                try:
                    var.set(data[key])
                except tk.TclError:
                    pass
        if hasattr(self, "equipment_tab"):
            self.equipment_tab.set_text(data.get("equipment", ""))
            self.notes_tab.set_features(data.get("features", ""))
            self.notes_tab.set_backstory(data.get("backstory", ""))
            self.notes_tab.set_notes(data.get("notes", ""))
            self.combat_tab.set_attacks(data.get("attacks", []))
