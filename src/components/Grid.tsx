import React, { useEffect, useMemo, useState } from 'react'
import Cell from './Cell'
import { getFlashPattern } from '../utils/rules'
import useFlashPattern from '../hooks/useFlashPattern'

type Props = {
    level?: number
    durationMs?: number
    onSubmit?: (selected: number[]) => void
}

const CELL_COUNT = 25

export default function Grid({ level = 1, durationMs = 10000, onSubmit }: Props) {
    const indices = useMemo(() => Array.from({ length: CELL_COUNT }, (_, i) => i), [])

    // Pattern for the current level
    const pattern = useMemo(() => getFlashPattern(level), [level])

    // Active flashing indices (toggles on/off). Hook stops toggling after durationMs.
    const activeFlash = useFlashPattern(pattern, durationMs)

    // Track whether flashing phase is still ongoing (disable clicks while true)
    const [isFlashing, setIsFlashing] = useState(true)

    useEffect(() => {
        setIsFlashing(true)
        const t = window.setTimeout(() => setIsFlashing(false), durationMs)
        return () => clearTimeout(t)
    }, [pattern, durationMs])

    // User selections during guess phase
    const [userSelected, setUserSelected] = useState<number[]>([])

    useEffect(() => {
        // Reset selections when level/pattern changes
        setUserSelected([])
    }, [level, pattern])

    function toggleSelect(index: number) {
        if (isFlashing) return
        setUserSelected((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
    }

    function handleSubmit() {
        if (onSubmit) onSubmit(userSelected)
    }

    return (
        <div>
            <div className="grid" role="grid" aria-label="Pattern grid">
                {indices.map((index) => (
                    <Cell
                        key={index}
                        index={index}
                        isFlashed={activeFlash.includes(index)}
                        isSelected={userSelected.includes(index)}
                        disabled={isFlashing}
                        onClick={() => toggleSelect(index)}
                    />
                ))}
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
                <button className="btn" onClick={handleSubmit} disabled={isFlashing}>
                    Submit Answer
                </button>
                <button
                    className="btn btn-ghost"
                    onClick={() => setUserSelected([])}
                    disabled={isFlashing}
                >
                    Clear Selection
                </button>
            </div>
        </div>
    )
}
