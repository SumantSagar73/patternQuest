import React from 'react'

type Props = {
  dark: boolean
  onToggle: () => void
}

export default function ThemeToggle({ dark, onToggle }: Props) {
  return (
    <button className="pq-theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      {dark ? 'Dark' : 'Light'}
    </button>
  )
}
