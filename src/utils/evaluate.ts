export type Evaluation = {
    correctPicks: number[]
    wrongPicks: number[]
    missed: number[]
}

/**
 * Evaluate user's selected indices against the correct pattern.
 */
export function evaluateAnswer(correct: number[], selected: number[]): Evaluation {
    const correctSet = new Set(correct)
    const selectedSet = new Set(selected)

    const correctPicks = selected.filter((s) => correctSet.has(s))
    const wrongPicks = selected.filter((s) => !correctSet.has(s))
    const missed = correct.filter((c) => !selectedSet.has(c))

    // Sort results for predictable rendering
    return {
        correctPicks: Array.from(new Set(correctPicks)).sort((a, b) => a - b),
        wrongPicks: Array.from(new Set(wrongPicks)).sort((a, b) => a - b),
        missed: Array.from(new Set(missed)).sort((a, b) => a - b),
    }
}
