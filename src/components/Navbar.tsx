'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface NavbarProps {
    navCtas?: {
        primaryLabel?: string
        primaryUrl?: string
        secondaryLabel?: string
        secondaryUrl?: string
    }
}

const links = [
    { href: '/', label: 'Anasayfa' },
    { href: '/uzmanlik', label: 'Eğitim Teknolojileri' },
    { href: '/araclar', label: 'Öğretmen ve Geliştirici Araçları' },
    { href: '/projeler', label: 'Projeler' },
    { href: '/yazilar', label: 'Yazılar' },
    { href: '/hakkimda', label: 'Hakkımda' },
]

export function Navbar({ navCtas }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => { setIsOpen(false) }, [pathname])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const isActive = (href: string) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)]' : 'bg-transparent'}`}>
            <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity flex items-center gap-0.5 text-text-primary">
                    MRK<span className="text-text-muted font-normal">DESIGN</span>
                </Link>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-7 text-sm">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative py-1 transition-colors hover:text-text-primary ${isActive(link.href) ? 'text-text-primary font-medium' : 'text-text-secondary'}`}
                            >
                                {link.label}
                                {isActive(link.href) && (
                                    <span className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-accent rounded-full" />
                                )}
                            </Link>
                        ))}
                    </div>
                    <Link
                        href={navCtas?.primaryUrl || '/iletisim'}
                        className="text-sm bg-dark-band text-white px-5 py-2 rounded-full font-medium hover:bg-dark-band/90 transition-all"
                    >
                        {navCtas?.primaryLabel || 'İletişime Geç'}
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden p-2 text-text-secondary" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-xl border-b border-border p-6 flex flex-col gap-4 shadow-lg"
                    >
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-base py-1.5 ${isActive(link.href) ? 'text-text-primary font-medium' : 'text-text-secondary'}`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <hr className="border-border my-2" />
                        <Link
                            href={navCtas?.primaryUrl || '/iletisim'}
                            className="text-center w-full bg-dark-band text-white px-4 py-3 rounded-full font-medium"
                        >
                            {navCtas?.primaryLabel || 'İletişime Geç'}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
