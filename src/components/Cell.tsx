import React from 'react'

type Props = {
    index: number
    isFlashed?: boolean
    isSelected?: boolean
    disabled?: boolean
    onClick?: () => void
    isCorrect?: boolean
    isWrong?: boolean
    isMissed?: boolean
}

export default function Cell({ index, isFlashed = false, isSelected = false, disabled = false, onClick, isCorrect = false, isWrong = false, isMissed = false }: Props) {
    const classNames = ['cell']
    if (isFlashed) classNames.push('flash')
    if (isSelected) classNames.push('selected')
    if (disabled) classNames.push('disabled')
    if (isCorrect) classNames.push('correct')
    if (isWrong) classNames.push('wrong')
    if (isMissed) classNames.push('missed')

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
