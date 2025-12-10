# Pattern Quest - Game Requirements

## 📌 Overview
Build a game-like puzzle that tests a user’s ability to decode patterns from visual signals. This assignment is designed to test React + TypeScript skills, logical reasoning, UI creativity, and attention to detail.

## 🎯 The Game Concept
Create a game where a 5x5 grid of squares flashes on and off, following a hidden pattern. The user observes the flashing sequence and then tries to guess the underlying logic by selecting the squares they believe were flashing.
With each level, the rule behind the flashing squares changes — becoming more abstract or complex.

## 🧩 Levels & Rules
| Level | Rule | Description |
| :--- | :--- | :--- |
| 1 | Even indices | Flash squares where `index % 2 === 0` |
| 2 | Diagonals | Flash squares where `(row === col)` or `(row + col === 4)` |
| 3 | Prime numbers | Flash squares whose index is a prime number |
| 4 | Center cluster | Flash center (12) and its 4 direct neighbors |
| 5 | `(row + col) % 3 === 0` | Use this formula to decide flashing squares |

*Free to add more levels.*

## 💡 How the Game Works
1. **Display** a 5x5 grid of square cells.
2. **Flash** certain squares according to the current level’s hidden rule (1s on/off using a timer).
3. **Stop** the animation after ~10 seconds of flashing and prompt the user to select the squares they believe were flashing.
4. **On submission**:
    * Compare the selection with the actual rule-based answer.
    * Provide feedback: ✅ Correct squares, ❌ Incorrect picks.
    * Optionally show a hint if the answer is wrong.
5. **Progress** to the next level.

## ✅ Requirements
* **React** (functional components with Hooks)
* **TypeScript**
* **Styling**: CSS or styled-components (or Tailwind, optional)
* **No UI libraries** (e.g., no Material UI, Chakra, Shadcn)
* **No animation libraries** — use CSS transitions or native JS
* Responsive and clean UI
* Clean and modular code (preferably using reusable components)
* Comment important logic

## 🌟 Bonus Features (Optional)
* Add a level timer or score counter.
* Add sound feedback or animations.
* Allow the user to toggle between light/dark themes.

## 📦 Deliverables
* Link to a hosted live version (Vercel, Netlify, etc.)
* Zip code files
* `README.md` explaining: How to run the app locally
* (Optional) Video walkthrough

## 🕓 Deadline
3 days.
