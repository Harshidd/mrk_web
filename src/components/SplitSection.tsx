import { ReactNode } from 'react'

interface SplitSectionProps {
    left: ReactNode
    right: ReactNode
    reverse?: boolean
    className?: string
}

export function SplitSection({ left, right, reverse = false, className = '' }: SplitSectionProps) {
    return (
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center ${className}`}>
            <div className={reverse ? 'lg:order-2' : ''}>{left}</div>
            <div className={reverse ? 'lg:order-1' : ''}>{right}</div>
        </div>
    )
}
