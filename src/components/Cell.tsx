import React from 'react'

type Props = {
  index: number
}

export default function Cell({ index }: Props) {
  return (
    <div className="cell" role="gridcell" aria-label={`Cell ${index}`}>
      <span className="cell-index">{index}</span>
    </div>
  )
}
