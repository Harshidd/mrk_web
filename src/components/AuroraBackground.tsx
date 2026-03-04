'use client'

import { ReactNode, useEffect, useRef } from 'react'

/**
 * AuroraField — V3.5 multi-layer background with pointer spotlight.
 *
 * Layers:
 *   .aurora-deep      — 2 huge washes, slow drift, pointer parallax (8px)
 *   .aurora-mid       — 3 blobs, faster drift, pointer parallax (14px)
 *   .aurora-spotlight  — radial glow that follows cursor (lerp)
 *   .aurora-vignette   — edge focus
 *   .aurora-noise      — grain
 *   .aurora-dots       — dot grid
 */
export function AuroraBackground({ children }: { children: ReactNode }) {
    const deepRef = useRef<HTMLDivElement>(null)
    const midRef = useRef<HTMLDivElement>(null)
    const spotRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const deep = deepRef.current
        const mid = midRef.current
        const spot = spotRef.current
        if (!deep || !mid || !spot) return

        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (mq.matches) {
            spot.style.display = 'none'
            return
        }

        let raf: number
        let tX = 0, tY = 0
        let dX = 0, dY = 0, mX = 0, mY = 0
        let sX = 0, sY = 0
        // Raw pixel coords for spotlight
        let rawX = window.innerWidth / 2, rawY = window.innerHeight / 2

        const onMove = (e: MouseEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5
            const ny = e.clientY / window.innerHeight - 0.5
            tX = nx
            tY = ny
            rawX = e.clientX
            rawY = e.clientY
        }

        const tick = () => {
            // Deep layer: slow follow, small range
            dX += (tX * 8 - dX) * 0.025
            dY += (tY * 8 - dY) * 0.025
            deep.style.transform = `translate(${dX}px, ${dY}px)`

            // Mid layer: faster follow, bigger range
            mX += (tX * 14 - mX) * 0.045
            mY += (tY * 14 - mY) * 0.045
            mid.style.transform = `translate(${mX}px, ${mY}px)`

            // Spotlight: follow cursor with lerp
            sX += (rawX - sX) * 0.06
            sY += (rawY - sY) * 0.06
            spot.style.left = `${sX}px`
            spot.style.top = `${sY}px`

            raf = requestAnimationFrame(tick)
        }

        window.addEventListener('mousemove', onMove, { passive: true })
        raf = requestAnimationFrame(tick)

        return () => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(raf)
        }
    }, [])

    return (
        <div className="aurora-root">
            <div ref={deepRef} className="aurora-deep"><div /></div>
            <div ref={midRef} className="aurora-mid"><div /></div>
            <div ref={spotRef} className="aurora-spotlight" />
            <div className="aurora-vignette" />
            <div className="aurora-noise" />
            <div className="aurora-dots" />
            {children}
        </div>
    )
}
