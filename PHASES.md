# 🎮 PROJECT NAME: PatternQuest – The Logic Decoder Game

A clean, professional name that fits puzzle-based pattern recognition gameplay.

## 🧩 PROJECT PHASES (DETAILED & PRACTICAL)

These phases follow a real software development lifecycle and will help you complete the assignment smoothly.

### 🚀 PHASE 1 — Project Initialization
**🎯 Goal:** Set up clean project architecture & base structure
**📦 Deliverables:**
- Create Vite + React + TypeScript project
- Setup folder structure:
  ```
  src/
    components/
    hooks/
    utils/
    styles/
    types/
  ```
- Add Tailwind or CSS setup
- Configure ESLint + Prettier (optional)
- Add global theme (light mode default)

**🔍 Details:**
- Prepare the grid container (5x5 static for now)
- Render 25 cells with index numbers for debugging
- No game logic yet

*This phase ensures the foundation is stable before writing gameplay logic.*

### 🧠 PHASE 2 — Rule Engine + Pattern Generator
**🎯 Goal:** Build the brain of the game
**📦 Deliverables:**
- a `getFlashPattern(level)` function
- supports all 5 rules:
  - even indices
  - diagonals
  - prime numbers
  - center cluster
  - `(row + col) % 3`

**🔍 Details:**
- Convert index → (row, col)
- Build helper: `isPrime(num: number): boolean`
- Unit-test the rule generator manually (console.log output)

*This is the core logic of the puzzle game.*

### ⚡ PHASE 3 — Flash Animation System
**🎯 Goal:** Make the grid flash squares according to patterns
**📦 Deliverables:**
- `useFlashPattern(pattern, duration)`
- Flashing loop using `setInterval`
- Flash ends automatically after 10 seconds
- CSS classes:
  - `.cell`
  - `.flash`
- Animation timing: ~600ms toggle

**🔍 Details:**
- Add glowing effect (yellow or cyan)
- Prevent user clicks during flashing
- Show "Observe…" message during this phase

*This builds the visual cue system that players must observe.*

### 🎯 PHASE 4 — Guess Mode (User Interaction)
**Goal:** User selects squares they think were flashing
**📦 Deliverables:**
- Switch phase from "flash" → "guess"
- Grid becomes clickable
- Track user-selected cells in state
- Add selected styling (blue highlight)
- Display Submit Answer button

**🔍 Details:**
- Multiple-select toggle logic
- Limit interactions: no selection during flash
- UI message: “Select squares that flashed”

*This is where the game becomes interactive.*

### 🧮 PHASE 5 — Answer Evaluation + Feedback System
**🎯 Goal:** Compare user's selections with correct pattern
**📦 Deliverables:**
- Comparison logic:
  - correct picks (green)
  - wrong picks (red)
  - missed correct (yellow outline)
- A feedback panel:
  - Score or percentage
  - Message: “Great job!” or “Try again”

**🔍 Details:**
- Update CSS classes based on correctness
- Add Next Level button
- Store stats (optional)

*This helps users learn the pattern and progress.*

### 📈 PHASE 6 — Level Progression Engine
**🎯 Goal:** Build full multi-level experience
**📦 Deliverables:**
- Level counter (1 → 5)
- Auto-load next level after feedback
- Reset states each level:
  - `userSelected = []`
  - `flashCells = []`
- Optional: show Level Start screen

**🔍 Details:**
- On Level 5 completion → final “You completed PatternQuest!” screen

*This makes it a complete structured game, not just a single puzzle.*

### 🌟 PHASE 7 — Polishing & Bonus Features
**🎯 Goal:** Improve UX and aesthetics
**📦 Deliverables (optional but recommended):**
- Light/Dark theme toggle
- Sound effects
- Score tracker
- Timer progress bar
- Subtle animations
- Better layout responsiveness
- Mobile-friendly grid (auto-resize cells)

**🔍 Details:**
- Use CSS transitions for theme
- Keep UI very clean (no libraries)

*This makes your project truly stand out.*

### 🚀 PHASE 8 — Deployment + Documentation
**🎯 Goal:** Make the project professional & submission-ready
**📦 Deliverables:**
- Deploy to Vercel (private GitHub repo)
- Create README.md:
  - Overview
  - Tech Stack
  - Features
  - How to run locally
  - Future improvements
- Optional video walkthrough (2–3 min)

**🔍 Details:**
- Test on mobile device
- Ensure all levels load correctly

*This is your final packaging phase.*
