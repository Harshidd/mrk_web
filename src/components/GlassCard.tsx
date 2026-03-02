'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface GlassCardProps {
    children: ReactNode
    className?: string
    hover?: boolean
    beam?: boolean
    as?: 'div' | 'article'
}

export function GlassCard({ children, className = '', hover = false, beam = false, as = 'div' }: GlassCardProps) {
    const Tag = as === 'article' ? motion.article : motion.div

    return (
        <Tag
            className={`glass ${hover ? 'glass-interactive' : ''} ${beam ? 'border-beam' : ''} ${className}`}
            whileHover={hover ? { y: -3, scale: 1.012 } : undefined}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </Tag>
    )
}
