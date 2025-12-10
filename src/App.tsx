import React from 'react'
import Grid from './components/Grid'
import { getFlashPattern } from './utils/rules'

export default function App() {
    return (
        <div className="app-root">
            <header className="app-header">
                <h1>PatternQuest</h1>
                <p className="subtitle">Observe the pattern, then decode it.</p>
            </header>

            <main className="main-content">
                <section className="grid-wrapper">
                    <div className="observe-banner">Observe the grid — debug mode</div>
                    <Grid
                        level={2}
                        durationMs={10000}
                        onSubmit={(selected) => {
                            // For Phase 4 scaffolding show a quick feedback
                            const correct = getFlashPattern(2)
                            const correctCount = selected.filter((s) => correct.includes(s)).length
                            const percent = Math.round((correctCount / correct.length) * 100)
                            alert(`You selected ${selected.length} cells. Correct: ${correctCount}/${correct.length} (${percent}%)`)
                        }}
                    />
                </section>
            </main>

            <footer className="app-footer">Phase 1 scaffolding — no game logic yet</footer>
        </div>
    )
}
