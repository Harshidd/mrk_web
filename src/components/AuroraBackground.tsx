'use client'

import { ReactNode, useEffect, useRef } from 'react'

/**
 * V3 Multi-layer mesh background.
 * 
 * Layer 1 (.mesh-deep): 2 huge soft radial fields — pointer parallax max 8px, slow lerp
 * Layer 2 (.mesh-mid):  3 brighter mid blobs    — pointer parallax max 14px, faster lerp
 * Layer 3 (.mesh-vignette): edge focus gradient  — no parallax
 * + noise + dot grid
 * 
 * Each gradient layer has its own CSS animation at a different speed.
 * The JS parallax adds on top of that, with lerp for buttery 60fps.
 */
export function AuroraBackground({ children }: { children: ReactNode }) {
    const deepRef = useRef<HTMLDivElement>(null)
    const midRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const deep = deepRef.current
        const mid = midRef.current
        if (!deep || !mid) return

        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (mq.matches) return

        let raf: number
        let tX = 0, tY = 0
        let dX = 0, dY = 0, mX = 0, mY = 0

        const onMove = (e: MouseEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5
            const ny = e.clientY / window.innerHeight - 0.5
            tX = nx
            tY = ny
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
        <div className="mesh-root">
            <div ref={deepRef} className="mesh-deep"><div /></div>
            <div ref={midRef} className="mesh-mid"><div /></div>
            <div className="mesh-vignette" />
            <div className="mesh-noise" />
            <div className="mesh-dots" />
            {children}
        </div>
    )
}
