import { useEffect, useRef, useState } from 'react'

/**
 * useFlashPattern
 * - Toggles flashing ON/OFF every 600ms.
 * - When ON returns the provided pattern array, when OFF returns []
 * - Stops flashing after `durationMs` (default 10000ms)
 * - Cleans up timers on unmount or when deps change
 */
export default function useFlashPattern(pattern: number[], durationMs = 10000): number[] {
    const [isOn, setIsOn] = useState(false)
    const intervalRef = useRef<number | null>(null)
    const timeoutRef = useRef<number | null>(null)

    useEffect(() => {
        // If no pattern provided or duration is non-positive, return empty immediately
        if (!pattern || pattern.length === 0 || durationMs <= 0) {
            setIsOn(false)
            return
        }

        // Start with ON so the first visible state shows the pattern
        setIsOn(true)

        // Toggle every 600ms
        intervalRef.current = window.setInterval(() => {
            setIsOn((prev) => !prev)
        }, 600)

        // Stop flashing after durationMs
        timeoutRef.current = window.setTimeout(() => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            setIsOn(false)
        }, durationMs)

        // Cleanup when pattern or duration changes or on unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
            setIsOn(false)
        }
    }, [pattern, durationMs])

    return isOn ? pattern : []
}
