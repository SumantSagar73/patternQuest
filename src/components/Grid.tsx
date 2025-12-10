import React from 'react'
import Cell from './Cell'

const CELL_COUNT = 25

export default function Grid() {
  const cells = Array.from({ length: CELL_COUNT }, (_, i) => i)

  return (
    <div className="grid" role="grid" aria-label="Pattern grid">
      {cells.map((index) => (
        <Cell key={index} index={index} />
      ))}
    </div>
  )
}
