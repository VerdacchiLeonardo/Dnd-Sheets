"""
Helper script: installs dependencies and runs the app.
Run with: python install.py
"""
import subprocess
import sys
import os

def install_deps():
    print("Installazione dipendenze...")
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
    print("Dipendenze installate.\n")

def run_app():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    import main
    main.main()

if __name__ == "__main__":
    install_deps()
    run_app()
