'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

const links = [
    { href: '/', label: 'Anasayfa' },
    { href: '/uzmanlik', label: 'Eğitim Teknolojileri' },
    { href: '/araclar', label: 'Öğretmen ve Geliştirici Araçları' },
    { href: '/projeler', label: 'Projeler' },
    { href: '/yazilar', label: 'Yazılar' },
    { href: '/hakkimda', label: 'Hakkımda' },
]

interface NavbarProps {
    navCtas?: { primaryLabel?: string; primaryUrl?: string }
}

export function Navbar({ navCtas }: NavbarProps) {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const ctaRef = useRef<HTMLAnchorElement>(null)

    useEffect(() => { setOpen(false) }, [pathname])

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 24)
        window.addEventListener('scroll', fn, { passive: true })
        return () => window.removeEventListener('scroll', fn)
    }, [])

    // Magnetic CTA hover
    useEffect(() => {
        const el = ctaRef.current
        if (!el) return
        const move = (e: MouseEvent) => {
            const r = el.getBoundingClientRect()
            el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.1}px, ${(e.clientY - r.top - r.height / 2) * 0.1}px)`
        }
        const leave = () => { el.style.transform = '' }
        el.addEventListener('mousemove', move)
        el.addEventListener('mouseleave', leave)
        return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave) }
    }, [])

    const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href)

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}>
            <div className="section-shell h-[72px] flex items-center justify-between">
                <Link href="/" className="text-lg font-bold tracking-tight text-fg hover:opacity-80 transition-opacity">
                    MRK<span className="text-subtle font-normal">DESIGN</span>
                </Link>

                {/* Desktop */}
                <div className="hidden lg:flex items-center gap-7">
                    <div className="flex gap-5 text-[13px]">
                        {links.map(l => (
                            <Link key={l.href} href={l.href}
                                className={`nav-link py-1 ${isActive(l.href) ? 'active text-fg font-medium' : 'text-muted hover:text-fg'}`}>
                                {l.label}
                            </Link>
                        ))}
                    </div>
                    <Link ref={ctaRef} href={navCtas?.primaryUrl || '/iletisim'}
                        className="btn-glow text-[13px] px-6 py-2.5" style={{ transition: 'transform 0.15s ease-out, box-shadow 0.35s ease, background 0.35s ease' }}>
                        {navCtas?.primaryLabel || 'İletişime Geç'}
                    </Link>
                </div>

                <button className="lg:hidden p-2 text-muted" onClick={() => setOpen(!open)} aria-label="Menu">
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden absolute top-[72px] left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-card-border p-5 flex flex-col gap-1.5"
                    >
                        {links.map(l => (
                            <Link key={l.href} href={l.href}
                                className={`text-[15px] py-2.5 px-4 rounded-xl transition-colors ${isActive(l.href) ? 'text-fg font-medium bg-surface' : 'text-muted'}`}>
                                {l.label}
                            </Link>
                        ))}
                        <hr className="border-card-border my-2" />
                        <Link href={navCtas?.primaryUrl || '/iletisim'} className="btn-glow text-center w-full py-3.5 text-[13px]">
                            {navCtas?.primaryLabel || 'İletişime Geç'}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
