import React, { useEffect, useMemo, useState, useRef } from 'react'
import Cell from './Cell'
import ActionBar from './ActionBar'
import { getFlashPattern } from '../utils/rules'
import { evaluateAnswer, Evaluation } from '../utils/evaluate'
import useFlashPattern from '../hooks/useFlashPattern'

type Props = {
    level?: number
    durationMs?: number
    onSubmit?: (selected: number[], evaluation?: Evaluation) => void
    onFlashComplete?: () => void
    phase?: 'flash' | 'guess' | 'feedback'
}

const CELL_COUNT = 25

export default function Grid({ level = 1, durationMs = 10000, onSubmit, onFlashComplete, phase }: Props) {
    const indices = useMemo<number[]>(() => Array.from({ length: CELL_COUNT }, (_, i) => i), [])

    // Pattern for the current level
    const pattern = useMemo(() => getFlashPattern(level), [level])

    // Active flashing indices (toggles on/off). Hook stops toggling after durationMs.
    const activeFlash = useFlashPattern(pattern, durationMs)

    // Track whether flashing phase is still ongoing (disable clicks while true)
    const [isFlashing, setIsFlashing] = useState(true)

    useEffect(() => {
        setIsFlashing(true)
        const t = window.setTimeout(() => {
            setIsFlashing(false)
            // notify parent that flash phase completed
            onFlashComplete?.()
        }, durationMs)
        return () => clearTimeout(t)
    }, [pattern, durationMs])

    // User selections during guess phase
    const [userSelected, setUserSelected] = useState<number[]>([])

    // After submission we store evaluation results to show feedback highlights
    const [evaluation, setEvaluation] = useState<Evaluation | null>(null)

    useEffect(() => {
        // Reset selections when level/pattern changes
        setUserSelected([])
        setEvaluation(null)
    }, [level, pattern])

    function toggleSelect(index: number) {
        if (isFlashing) return
        setUserSelected((prev: number[]) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    }

    // Keyboard navigation helpers
    const cellRefs = useRef<Array<HTMLDivElement | null>>(Array(CELL_COUNT).fill(null))
    function focusCell(idx: number) {
        const el = cellRefs.current[idx]
        if (el) el.focus()
    }
    function handleCellKeyDown(e: React.KeyboardEvent<HTMLDivElement>, idx: number) {
        if (isFlashing) return
        const colCount = 5
        let next = idx
        switch (e.key) {
            case 'ArrowLeft':
                next = (idx % colCount === 0) ? idx : idx - 1
                focusCell(next)
                e.preventDefault()
                break
            case 'ArrowRight':
                next = (idx % colCount === colCount - 1) ? idx : idx + 1
                focusCell(next)
                e.preventDefault()
                break
            case 'ArrowUp':
                next = idx - colCount >= 0 ? idx - colCount : idx
                focusCell(next)
                e.preventDefault()
                break
            case 'ArrowDown':
                next = idx + colCount < CELL_COUNT ? idx + colCount : idx
                focusCell(next)
                e.preventDefault()
                break
            case 'Enter':
            case ' ':
                // toggle select
                toggleSelect(idx)
                e.preventDefault()
                break
        }
    }

    function handleSubmit() {
        // Evaluate and set visual feedback
        const evalResult = evaluateAnswer(pattern, userSelected)
        setEvaluation(evalResult)

        if (onSubmit) onSubmit(userSelected, evalResult)
    }

    const gridClickable = phase === 'guess' && !isFlashing && !evaluation

    return (
        <div className="pq-grid-wrap">
            <div className="pq-grid-container">
                <div className={"pq-grid" + (gridClickable ? ' pq-clickable' : '')} role="grid" aria-label="Pattern grid">
                {indices.map((index) => {
                    const isCorrect = evaluation ? evaluation.correctPicks.includes(index) : false
                    const isWrong = evaluation ? evaluation.wrongPicks.includes(index) : false
                    const isMissed = evaluation ? evaluation.missed.includes(index) : false

                    return (
                        <Cell
                            key={index}
                            index={index}
                            isFlashed={activeFlash.includes(index)}
                            isSelected={userSelected.includes(index)}
                            disabled={isFlashing || !!evaluation}
                            onClick={() => toggleSelect(index)}
                            onKeyDown={(e) => handleCellKeyDown(e, index)}
                            ref={(el) => (cellRefs.current[index] = el)}
                            isCorrect={isCorrect}
                            isWrong={isWrong}
                            isMissed={isMissed}
                        />
                    )
                })}
                </div>
            </div>
                {phase === 'guess' && (
                    <ActionBar
                        primaryLabel="Submit"
                        onPrimary={handleSubmit}
                        onSecondary={() => setUserSelected([])}
                        secondaryLabel="Clear Selection"
                        disabled={!gridClickable}
                    />
                )}
        </div>
    )
}
