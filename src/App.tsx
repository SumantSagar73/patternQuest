import React from 'react'
import Grid from './components/Grid'

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
          <Grid />
        </section>
      </main>

      <footer className="app-footer">Phase 1 scaffolding — no game logic yet</footer>
    </div>
  )
}
