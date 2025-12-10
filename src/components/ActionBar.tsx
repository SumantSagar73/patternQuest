import React from 'react'

type Props = {
  primaryLabel?: string
  onPrimary?: () => void
  onSecondary?: () => void
  secondaryLabel?: string
  disabled?: boolean
}

export default function ActionBar({ primaryLabel = 'Submit', onPrimary, onSecondary, secondaryLabel = 'Clear Selection', disabled = false }: Props) {
  return (
    <div className="pq-actions">
      <button className="pq-action-btn pq-btn-primary" onClick={onPrimary} disabled={disabled}>{primaryLabel}</button>
      <button className="pq-action-btn pq-btn-ghost" onClick={onSecondary} disabled={disabled}>{secondaryLabel}</button>
    </div>
  )
}
