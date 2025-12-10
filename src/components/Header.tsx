import React from 'react'
import ThemeToggle from './ThemeToggle'

type Props = {
    dark: boolean
    onToggle: () => void
}

export default function Header({ dark, onToggle }: Props) {
    return (
        <header className="pq-header">
            <div className="pq-header-left">
                <div className="pq-logo">PQ</div>
                <div className="pq-title">
                    <div className="pq-title-main">PatternQuest</div>
                    <div className="pq-title-sub">Logic Decoder</div>
                </div>
            </div>

            <div className="pq-header-right">
                <ThemeToggle dark={dark} onToggle={onToggle} />
            </div>
        </header>
    )
}
