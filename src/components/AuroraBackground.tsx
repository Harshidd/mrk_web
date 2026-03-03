'use client'

import { ReactNode, useEffect, useRef } from 'react'

/**
 * Wraps the entire app. Renders mesh gradient blobs, noise, and dot grid.
 * Pointer parallax moves the actual mesh layer (up to 12px) for a living feel.
 */
export function AuroraBackground({ children }: { children: ReactNode }) {
    const meshRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = meshRef.current
        if (!el) return
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        if (mq.matches) return

        let rafId: number
        let targetX = 0, targetY = 0, curX = 0, curY = 0

        const onMove = (e: MouseEvent) => {
            targetX = (e.clientX / window.innerWidth - 0.5) * 12
            targetY = (e.clientY / window.innerHeight - 0.5) * 12
        }

        const lerp = () => {
            curX += (targetX - curX) * 0.04
            curY += (targetY - curY) * 0.04
            el.style.transform = `translate(${curX}px, ${curY}px)`
            rafId = requestAnimationFrame(lerp)
        }

        window.addEventListener('mousemove', onMove, { passive: true })
        rafId = requestAnimationFrame(lerp)

        return () => {
            window.removeEventListener('mousemove', onMove)
            cancelAnimationFrame(rafId)
        }
    }, [])

    return (
        <div className="mesh-bg">
            <div ref={meshRef} className="mesh-layer" />
            <div className="mesh-noise" />
            <div className="mesh-dots" />
            {children}
        </div>
    )
}
