import React from 'react'
import type { Evaluation } from '../utils/evaluate'

type Props = {
  evaluation: Evaluation
}

export default function FeedbackBanner({ evaluation }: Props) {
  const correct = evaluation.correctPicks.length
  const missed = evaluation.missed.length
  const wrong = evaluation.wrongPicks.length
  const total = evaluation.correctPicks.length + evaluation.missed.length

  return (
    <div className="pq-feedback" role="status" aria-live="polite">
      <div className="pq-feedback-item">Correct: {correct}</div>
      <div className="pq-feedback-item">Missed: {missed}</div>
      <div className="pq-feedback-item">Wrong: {wrong}</div>
      <div className="pq-feedback-item" style={{ color: 'var(--muted)' }}>{total} target{total !== 1 ? 's' : ''}</div>
    </div>
  )
}
