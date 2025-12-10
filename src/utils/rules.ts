// Utility functions for PatternQuest rules

/**
 * Returns true if n is a prime number (n >= 2)
 */
export function isPrime(n: number): boolean {
  if (n < 2) return false
  if (n === 2) return true
  if (n % 2 === 0) return false
  const limit = Math.floor(Math.sqrt(n))
  for (let i = 3; i <= limit; i += 2) {
    if (n % i === 0) return false
  }
  return true
}

/**
 * Convert index (0..24) to (row, col) for 5x5 grid
 */
function idxToCoord(index: number): { row: number; col: number } {
  return { row: Math.floor(index / 5), col: index % 5 }
}

/**
 * getFlashPattern(level): number[]
 * Returns an array of indices (0..24) that should flash for the given level
 * Levels:
 * 1 -> even indices
 * 2 -> main diagonal (row === col) and anti-diagonal (row + col === 4)
 * 3 -> prime number indices
 * 4 -> center cluster (12 and its 4 direct neighbors: 7,11,13,17)
 * 5 -> (row + col) % 3 === 0
 */
export function getFlashPattern(level: number): number[] {
  const indices = Array.from({ length: 25 }, (_, i) => i)
  let result: number[] = []

  switch (level) {
    case 1:
      result = indices.filter((i) => i % 2 === 0)
      break

    case 2:
      result = indices.filter((i) => {
        const { row, col } = idxToCoord(i)
        return row === col || row + col === 4
      })
      break

    case 3:
      result = indices.filter((i) => isPrime(i))
      break

    case 4:
      // center cell and its four direct neighbors
      result = [12, 7, 11, 13, 17]
      break

    case 5:
      result = indices.filter((i) => {
        const { row, col } = idxToCoord(i)
        return (row + col) % 3 === 0
      })
      break

    default:
      result = []
  }

  // Ensure unique, sorted order
  result = Array.from(new Set(result)).sort((a, b) => a - b)
  return result
}
