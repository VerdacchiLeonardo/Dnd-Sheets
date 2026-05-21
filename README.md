# D&D 5e — Schede Personaggio

App desktop cross-platform (macOS & Windows) per gestire schede personaggio di Dungeons & Dragons 5e.

## Caratteristiche

- **Navigazione a Compasso Circolare** — 8 sezioni attorno a una rosa dei venti interattiva
- **Spiriti Animati** — particelle fluttuanti nello sfondo per atmosfera fantasy
- **Font Medievale** — Cinzel con effetto luminoso (glow) dorato
- **Tema Scuro** — sfondo nero, testo bianco/oro
- **Suggerimenti Automatici** — dropdown con classi, razze, background, allineamenti
- **Dati D&D 5e** — informazioni su classi, razze, capacità per livello, slot incantesimi
- **Salvataggio JSON** — personaggi salvati come file `.json`

## Sezioni del Compasso

| Icona | Sezione       | Contenuto                                    |
|-------|---------------|----------------------------------------------|
| ⚔     | Classe        | Classe, sottoclasse, livello, capacità       |
| ♦     | Razza         | Razza, sotto-razza, background, allineamento |
| ⬡     | Statistiche   | 6 caratteristiche + modificatori + bonus      |
| ♥     | Combattimento | PF, CA, Iniziativa, attacchi                 |
| ☆     | Abilità       | Tiri salvezza + 18 abilità con competenze    |
| ⚙     | Equipaggiamento| Monete + lista oggetti                      |
| ✦     | Magie         | Slot incantesimi + lista magie               |
| ☷     | Note          | Caratteristiche, storia, note libere         |

## Installazione

```bash
# 1. Clona o scarica il progetto
# 2. Installa le dipendenze
pip install -r requirements.txt

# 3. Avvia l'app
python main.py
```

## Creazione Eseguibile (per distribuzione)

```bash
pip install pyinstaller

# Windows (.exe)
pyinstaller --onefile --windowed --name "DnD-Sheets" main.py

# macOS (.app)
pyinstaller --onefile --windowed --name "DnD-Sheets" main.py
```

L'eseguibile sarà nella cartella `dist/`.

## Struttura Progetto

```
main.py              # Punto di ingresso
character.py         # Modello dati personaggio
dnd_data.py          # Dati D&D 5e (classi, razze, ecc.)
requirements.txt     # Dipendenze Python
assets/
  fonts/
    Cinzel-Regular.ttf
    Cinzel-Bold.ttf
app/
  window.py          # Finestra principale
  home_screen.py     # Schermata home animata
  sheet_screen.py    # Scheda con compasso
  compass.py         # Widget compasso circolare
  particles.py       # Sistema particelle (spiriti)
  glow.py            # Rendering testo con glow
  theme.py           # Colori e font
  panels/            # Un pannello per ogni sezione
```
