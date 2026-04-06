# 🕵️‍♂️ Where in the World is Rubi Rubsen?

A browser-based, retro-style detective game heavily inspired by the classic 1985 "Carmen Sandiego" formula. Track down the elusive criminal mastermind *Rubi Rubsen* and his henchmen across the globe using a modern Three.js 3D environment wrapped in a nostalgic 8-bit aesthetic.

## ✨ Features

* **Classic Detective Gameplay:** Travel from city to city, interview witnesses, and gather clues about the suspect's next destination and physical attributes.
* **Algorithmic Clue Engine:** Features a highly optimized, offline "Look-Ahead + Template-Matching" system (`ai.js`). Clues are generated dynamically based on the target's actual attributes and their next destination—no API calls required.
* **Procedural 8-Bit Art:** Every city skyline (Paris, New York, Tokyo, etc.) and character portrait is drawn purely through math using the HTML5 Canvas API (`draw.js`). **Zero external image assets are used**, making the game incredibly lightweight.
* **Modern Tech, Retro Feel:** Combines the power of WebGL/Three.js with strict pixel-art filtering and scanline styling to deliver that perfect CRT monitor vibe.
* **Bilingual Support:** Fully playable in both English and German, with localization built directly into the core engine templates.

## 🛠 Tech Stack

* **Frontend:** Vanilla JavaScript (ES6+), HTML5, CSS3
* **3D Rendering:** [Three.js](https://threejs.org/)
* **2D Graphics:** Procedural HTML5 Canvas API (`ctx.fillRect`, `ctx.bezierCurveTo`, etc.)

## 🧩 Core Architecture

The game is modular, separating the presentation layer from the game logic:

| Module | Purpose |
|--------|---------|
| `ai.js` | The algorithmic Clue Engine. Handles the template matching for `destination` hints (where the suspect went) and `suspect` hints (what they look like). |
| `draw.js` | The procedural art generator. Contains functions to draw specific cities (e.g., `drawParis`, `drawTokyo`) and the iconic "Rubio" portrait using pure Canvas operations. |
| `game.js` | *(Main Game Loop)* Manages the state, tracks the player's location, handles warrants, and coordinates the Three.js scene with the 2D UI. |

## 🚀 Getting Started

Since the game relies entirely on client-side logic and procedural generation, no build step or backend server is required. 

1. Clone the repository.
2. Serve the directory using any local web server to avoid CORS issues with ES6 modules or Three.js textures.
   ```bash
   npx serve .
   # OR
   python -m http.server 8080
   ```
  Open http://localhost:8080 in your browser and start tracking down the thieves!

## 💡 How to Play

  **Investigate:** 
  
  Click on locations within your current city to question witnesses.

  **Analyze:** 
  
  Witnesses will either give you a hint about the suspect's appearance (e.g., gender, vehicle, hobby) or a clue about the next city they fled to (currency, language, flag colors).

  **Issue a Warrant:** 
  
  Use the Interpol computer to filter suspects based on your clues. You cannot make an arrest without a valid warrant!

  **Travel:** 
  
  Use the map to fly to the next city. Be careful—flying to the wrong city costs valuable in-game time.

<img width="1911" height="941" alt="grafik" src="https://github.com/user-attachments/assets/038ceae3-e545-439a-93f9-1c776ca33ac0" />
<img width="1084" height="703" alt="grafik" src="https://github.com/user-attachments/assets/645a3fac-facd-44ec-bec7-868995745d3e" />

