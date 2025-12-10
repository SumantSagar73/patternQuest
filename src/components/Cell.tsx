import React from 'react'

type Props = {
  index: number
  isFlashed?: boolean
  isSelected?: boolean
  disabled?: boolean
  onClick?: () => void
}

export default function Cell({ index, isFlashed = false, isSelected = false, disabled = false, onClick }: Props) {
  const classNames = ['cell']
  if (isFlashed) classNames.push('flash')
  if (isSelected) classNames.push('selected')
  if (disabled) classNames.push('disabled')

  return (
    <div
      className={classNames.join(' ')}
      role="gridcell"
      aria-label={`Cell ${index}`}
      onClick={() => {
        if (disabled) return
        onClick?.()
      }}
      tabIndex={disabled ? -1 : 0}
    >
      <span className="cell-index">{index}</span>
    </div>
  )
}
