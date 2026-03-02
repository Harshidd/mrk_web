/* Centralized Framer Motion variants — single source of truth */
export const fadeUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
}

export const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
}

export const staggerItem = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}

export const hoverLift = {
    whileHover: { y: -3, scale: 1.012 },
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
}

export const tapScale = {
    whileTap: { scale: 0.975 },
}

export const reducedMotion = {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0 },
}
