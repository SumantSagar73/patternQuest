import React from 'react'

type Props = {
    index: number
    isFlashed?: boolean
    isSelected?: boolean
    disabled?: boolean
    onClick?: () => void
    onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
    isCorrect?: boolean
    isWrong?: boolean
    isMissed?: boolean
}

export default React.forwardRef<HTMLDivElement, Props>(function Cell({ index, isFlashed = false, isSelected = false, disabled = false, onClick, onKeyDown, isCorrect = false, isWrong = false, isMissed = false }: Props, ref) {
    const classNames = ['pq-cell']
    if (isFlashed) classNames.push('flash')
    if (isSelected) classNames.push('selected')
    if (disabled) classNames.push('disabled')
    if (isCorrect) classNames.push('correct')
    if (isWrong) classNames.push('incorrect')
    if (isMissed) classNames.push('missed')

    const handleClick = () => {
        if (disabled) return
        onClick?.()
    }

    return (
        <div
            ref={ref}
            className={classNames.join(' ')}
            role="gridcell"
            aria-label={`Cell ${index}`}
            onClick={handleClick}
            onKeyDown={onKeyDown}
            tabIndex={disabled ? -1 : 0}
        >
            <div className="pq-cell-inner">
                <span className="pq-cell-index">{index}</span>
                {isSelected && !isCorrect && !isWrong && <span className="pq-cell-dot" />}
            </div>
        </div>
    )
})

