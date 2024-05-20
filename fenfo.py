import random
import tkinter as tk

# Grundlegende Einstellungen
colors = ["blue", "red", "green", "yellow"]
sequence = []
player_sequence = []
current_index = 0

# Funktionen
def start_game():
    """Startet das Spiel neu und setzt alle Variablen zurück."""
    global sequence, player_sequence, current_index
    result_label.config(text="")
    start_button.config(text="Stop", command=game_over)
    sequence = []
    player_sequence = []
    current_index = 0
    next_round()

def next_round():
    """Beginnt die nächste Runde, fügt eine neue Farbe zur Sequenz hinzu und spielt sie ab."""
    global current_index
    current_index = 0
    player_sequence.clear()
    add_color_to_sequence()
    play_sequence()

def add_color_to_sequence():
    """Fügt eine zufällige Farbe zur Sequenz hinzu."""
    sequence.append(random.choice(colors))

def play_sequence():
    """Spielt die aktuelle Sequenz ab, indem die Farben nacheinander aufblinken."""
    for i, color in enumerate(sequence):
        root.after(1000 * (i + 1), lambda color=color: flash_color(color))

def flash_color(color):
    """Lässt eine Farbe kurz aufblinken."""
    buttons[color].config(bg=color, highlightbackground=color)
    root.after(500, lambda: buttons[color].config(bg="light grey", highlightbackground="white"))

def button_click(color):
    """Wird aufgerufen, wenn der Spieler einen Knopf drückt. Überprüft, ob die Eingabe korrekt ist."""
    global current_index
    if len(sequence) == 0:
        result_label.config(text="Game not started yet!")
        return
    player_sequence.append(color)
    if color == sequence[current_index]:
        current_index += 1
        if current_index == len(sequence):
            root.after(1000, next_round)
    else:
        game_over()

def game_over():
    """Beendet das Spiel und zeigt das Ergebnis an."""
    result_label.config(text="Game Over! Score: " + str(len(sequence) - 1))
    start_button.config(text="Start", state="normal", command=start_game)

# GUI einrichten
root = tk.Tk()
root.title("Fenfo Spiel")

# Knöpfe für die Farben erstellen und im Grid-Layout platzieren
buttons = {}
for color in colors:
    button = tk.Button(root, text=color.capitalize(),
                       bg="light grey", highlightbackground="white",
                       width=10, height=5, command=lambda c=color: button_click(c))
    buttons[color] = button

buttons["blue"].grid(row=0, column=0)
buttons["red"].grid(row=0, column=1)
buttons["green"].grid(row=1, column=0)
buttons["yellow"].grid(row=1, column=1)

# Start-Button und Ergebnis-Label erstellen und platzieren
start_button = tk.Button(root, text="Start", command=start_game)
start_button.grid(row=2, column=0, columnspan=2)

result_label = tk.Label(root, text="")
result_label.grid(row=3, column=0, columnspan=2)

# Spiel starten
root.mainloop()
