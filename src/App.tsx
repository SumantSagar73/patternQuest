import React, { useEffect, useRef, useState } from 'react'
import Grid from './components/Grid'
import { getFlashPattern } from './utils/rules'
import type { Evaluation } from './utils/evaluate'

export default function App() {
    const FLASH_DURATION = 10000

    const [level, setLevel] = useState<number>(1)
    const [phase, setPhase] = useState<'flash' | 'guess' | 'feedback'>('flash')
    const [flashPattern, setFlashPattern] = useState<number[]>(getFlashPattern(1))
    const [userSelected, setUserSelected] = useState<number[]>([])
    const [evaluationResult, setEvaluationResult] = useState<Evaluation | null>(null)

    // theme
    const [dark, setDark] = useState<boolean>(false)

    // countdown (ms)
    const [remainingMs, setRemainingMs] = useState<number>(FLASH_DURATION)
    const countdownRef = useRef<number | null>(null)

    // audio (WebAudio) context
    const audioCtxRef = useRef<AudioContext | null>(null)

    useEffect(() => {
        setFlashPattern(getFlashPattern(level))
        // whenever level changes, go to flash phase
        setPhase('flash')
        setUserSelected([])
        setEvaluationResult(null)
    }, [level])

    // manage countdown timer during flash phase
    useEffect(() => {
        if (phase !== 'flash') {
            setRemainingMs(0)
            if (countdownRef.current) {
                clearInterval(countdownRef.current)
                countdownRef.current = null
            }
            return
        }

        // start countdown
        const end = Date.now() + FLASH_DURATION
        setRemainingMs(FLASH_DURATION)
        countdownRef.current = window.setInterval(() => {
            const rem = Math.max(0, end - Date.now())
            setRemainingMs(rem)
            if (rem <= 0 && countdownRef.current) {
                clearInterval(countdownRef.current)
                countdownRef.current = null
            }
        }, 200)

        return () => {
            if (countdownRef.current) {
                clearInterval(countdownRef.current)
                countdownRef.current = null
            }
        }
    }, [phase, level])

    function handleFlashComplete() {
        setPhase('guess')
    }

    function handleSubmit(selected: number[], evaluation?: Evaluation) {
        setUserSelected(selected)
        setEvaluationResult(evaluation ?? null)
        setPhase('feedback')

        // play feedback sound
        try {
            if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
            const ctx = audioCtxRef.current
            const osc = ctx.createOscillator()
            const gain = ctx.createGain()
            osc.connect(gain)
            gain.connect(ctx.destination)

            const wrong = (evaluation?.wrongPicks.length ?? 0) > 0 || (evaluation?.missed.length ?? 0) > 0
            if (wrong) {
                osc.frequency.value = 220
            } else {
                osc.frequency.value = 880
            }
            gain.gain.setValueAtTime(0.0001, ctx.currentTime)
            gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02)
            osc.start()
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45)
            osc.stop(ctx.currentTime + 0.5)
        } catch (e) {
            // ignore audio errors
        }
    }

    function handleNextLevel() {
        if (level < 5) setLevel((l) => l + 1)
        else setLevel((l) => l + 1) // will make level 6 and show completion
    }

    function handleRetry() {
        // retry same level: reset and go to flash
        setUserSelected([])
        setEvaluationResult(null)
        setPhase('flash')
    }

    if (level > 5) {
        return (
            <div className="app-root">
                <header className="app-header">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 520 }}>
                        <div>
                            <h1>PatternQuest</h1>
                            <p className="subtitle">You completed all levels — well done!</p>
                        </div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <div style={{ color: '#9aa4bf' }}>Level {level - 1}</div>
                            <button className="btn" onClick={() => setDark((d) => !d)}>{dark ? 'Light' : 'Dark'}</button>
                        </div>
                    </div>
                </header>
                <main className="main-content">
                    <section className="grid-wrapper">
                        <div style={{ textAlign: 'center', color: '#9aa4bf' }}>
                            🎉 Congratulations — You completed PatternQuest!
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
                            <button className="btn" onClick={() => setLevel(1)}>Play Again</button>
                        </div>
                    </section>
                </main>
            </div>
        )
    }

    return (
        <div className={"app-root " + (dark ? 'theme-dark' : 'theme-light')}>
            <header className="app-header">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: 520 }}>
                    <div>
                        <h1>PatternQuest</h1>
                        <p className="subtitle">Observe the pattern, then decode it.</p>
                    </div>

                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                        <div style={{ color: '#9aa4bf' }}>Level {level}</div>
                        <div style={{ color: '#9aa4bf' }}>{phase === 'flash' ? `Time: ${Math.ceil(remainingMs / 1000)}s` : ''}</div>
                        <button className="btn btn-ghost" onClick={() => setDark((d) => !d)}>{dark ? 'Light' : 'Dark'}</button>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <section className="grid-wrapper">
                    <div className="observe-banner">Level {level} — {phase === 'flash' ? 'Observe…' : phase === 'guess' ? 'Select squares that flashed' : 'Results'}</div>

                    <Grid
                        level={level}
                        durationMs={10000}
                        onFlashComplete={handleFlashComplete}
                        onSubmit={handleSubmit}
                    />

                    {phase === 'feedback' && evaluationResult && (
                        <div style={{ marginTop: 14, textAlign: 'center' }}>
                            <div style={{ color: '#9aa4bf' }}>
                                You selected {userSelected.length} cells. Correct: {evaluationResult.correctPicks.length} • Missed: {evaluationResult.missed.length} • Wrong: {evaluationResult.wrongPicks.length}
                            </div>
                            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 8 }}>
                                <button className="btn" onClick={handleNextLevel}>Next Level</button>
                                <button className="btn btn-ghost" onClick={handleRetry}>Retry Level</button>
                            </div>
                        </div>
                    )}
                </section>
            </main>

            <footer className="app-footer">PatternQuest — Levels 1 to 5</footer>
        </div>
    )
}
