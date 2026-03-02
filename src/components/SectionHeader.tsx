import { ReactNode } from 'react'

interface SectionHeaderProps {
    eyebrow?: string
    title: string
    subtitle?: string
    align?: 'left' | 'center'
    action?: ReactNode
}

export function SectionHeader({ eyebrow, title, subtitle, align = 'left', action }: SectionHeaderProps) {
    const isCenter = align === 'center'

    return (
        <div className={`mb-14 ${action ? 'flex flex-col md:flex-row justify-between items-start md:items-end gap-6' : ''} ${isCenter ? 'text-center' : ''}`}>
            <div className={isCenter ? 'mx-auto max-w-2xl' : 'max-w-3xl'}>
                {eyebrow && <span className="eyebrow">{eyebrow}</span>}
                <h2 className="text-3xl md:text-[2.75rem] font-bold tracking-tight text-fg leading-[1.08]">
                    {title}
                </h2>
                {subtitle && (
                    <p className="mt-5 text-lg text-muted leading-relaxed max-w-2xl">
                        {subtitle}
                    </p>
                )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
        </div>
    )
}
