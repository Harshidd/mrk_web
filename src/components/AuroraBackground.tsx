'use client'

import { ReactNode, useEffect, useRef } from 'react'

export function AuroraBackground({ children }: { children: ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Pointer parallax — very subtle aurora shift
        const el = ref.current
        if (!el) return
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) return

        const handleMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 8
            const y = (e.clientY / window.innerHeight - 0.5) * 8
            const before = el.querySelector('.aurora-parallax') as HTMLElement | null
            if (before) {
                before.style.transform = `translate(${x}px, ${y}px)`
            }
        }
        window.addEventListener('mousemove', handleMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMove)
    }, [])

    return (
        <div ref={ref} className="aurora-bg">
            <div className="aurora-parallax fixed inset-0 z-0 pointer-events-none transition-transform duration-[2000ms] ease-out" />
            <div className="aurora-grid" />
            {children}
        </div>
    )
}
