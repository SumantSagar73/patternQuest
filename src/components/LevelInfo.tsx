import React from 'react'

type Props = {
    level: number
    phase: 'flash' | 'guess' | 'feedback'
    remainingMs?: number
}

export default function LevelInfo({ level, phase, remainingMs }: Props) {
    const subtitle = phase === 'flash' ? 'Observe the pattern…' : phase === 'guess' ? 'Select all squares that flashed' : 'Your results'

    return (
        <section className="pq-level">
            <div className="pq-level-left">
                <div className="pq-level-number">Level {level}</div>
                <div className="pq-level-sub">{subtitle}</div>
            </div>

            <div className="pq-level-right">
                {phase === 'flash' && (
                    <div className="pq-timer">{Math.ceil((remainingMs ?? 0) / 1000)}s</div>
                )}
            </div>
        </section>
    )
}
