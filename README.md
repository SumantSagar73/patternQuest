# PatternQuest — The Logic Decoder Game

PatternQuest is a small puzzle game that challenges players to decode hidden visual patterns on a 5×5 grid. Each level presents a different rule for which cells flash; the player watches the flashing sequence and then selects the cells they think matched the pattern.

This repository contains a React + TypeScript implementation (Vite) with a simple CSS-based UI.

---

## Demo

- Local development instructions are below. A hosted demo (Vercel/Netlify) can be added once the repo is private and deployed.

---

## Tech stack

- React (functional components + Hooks)
- TypeScript
- Vite (build/dev)
- Plain CSS (no UI or animation libraries)

Optional: Tailwind can be swapped in if preferred.

---

## Game rules (levels)

The 5×5 grid indices run left→right, top→bottom (0..24). Levels implemented:

- Level 1 — Even indices: flash when `index % 2 === 0`.
- Level 2 — Diagonals: flash when `row === col` OR `row + col === 4`.
- Level 3 — Prime indices: flash when the index is a prime number.
- Level 4 — Center cluster: flash center cell (`12`) and its four direct neighbors (`7, 11, 13, 17`).
- Level 5 — Modular rule: flash when `(row + col) % 3 === 0`.

You can extend levels by adding more rules in `src/utils/rules.ts`.

---

## How the game works (player flow)

1. The game shows a 5×5 grid and automatically flashes the cells for the current level (observation phase).
2. After the observation (~10s), flashing stops and the player enters the guessing phase.
3. The player selects the cells they believe flashed and submits their answer.
4. The game evaluates the answer and highlights:
     - correct picks (green),
     - wrong picks (red),
     - missed correct cells (yellow outline).
5. The player may retry or proceed to the next level. After level 5 the game shows a completion screen.

---

## Run locally

Prerequisites: Node.js (16+ recommended) and npm (or yarn).

1. Install dependencies

```powershell
cd <path-to-repo>
npm install
```

2. Start development server

```powershell
npm run dev
# Open the printed URL (usually http://localhost:5173)
```

3. Build for production

```powershell
npm run build
npm run preview   # serve the production build locally
```

---

## Folder structure

```
src/
    components/      # Grid, Cell and other presentational components
    hooks/           # Reusable hooks (useFlashPattern)
    utils/           # Game rules, evaluation helpers
    styles/          # Global CSS
    types/           # Extra TypeScript declarations
    main.tsx         # App bootstrap
    App.tsx          # Top-level app + level management
```

Key files:

- `src/utils/rules.ts` — `getFlashPattern(level)` implements level rules.
- `src/hooks/useFlashPattern.ts` — toggles flashing for observation phase.
- `src/utils/evaluate.ts` — `evaluateAnswer(correct, selected)` returns `{ correctPicks, wrongPicks, missed }`.

---

## Development notes

- The project intentionally avoids UI libraries and animation libraries — animations are CSS-only.
- TypeScript types are included; run `npx tsc --noEmit` to type-check.
- To extend the game, add new level rules in `getFlashPattern` and wire UI/level progression in `App.tsx`.

---

## Credits

- Built as a coding assignment example.
- Author: (Your Name) — replace with your name before submission.

Thanks for trying PatternQuest — if you want, I can help with deployment (Vercel/Netlify), tests, or polishing UI/UX further.

