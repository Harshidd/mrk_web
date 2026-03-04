import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { SiteSettings } from '@/types/content'

export function Footer({ settings }: { settings: SiteSettings | null }) {
    return (
        <footer className="footer-glass pt-20 pb-10 px-6 lg:px-8">
            <div className="section-shell">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
                    <div>
                        <h2 className="text-lg font-bold tracking-tight mb-4 text-fg">
                            MRK<span className="text-subtle font-normal">DESIGN</span>
                        </h2>
                        <p className="text-muted text-sm leading-relaxed max-w-xs">
                            {settings?.siteDescription || 'Eğitim ve yapay zekâ odaklı dijital sistemler.'}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-[11px] font-bold text-subtle uppercase tracking-[0.15em] mb-5">Sayfalar</h3>
                        <ul className="space-y-3 text-sm text-muted">
                            <li><Link href="/uzmanlik" className="hover:text-fg transition-colors duration-300">Eğitim Teknolojileri</Link></li>
                            <li><Link href="/araclar" className="hover:text-fg transition-colors duration-300">Öğretmen ve Geliştirici Araçları</Link></li>
                            <li><Link href="/projeler" className="hover:text-fg transition-colors duration-300">Projeler</Link></li>
                            <li><Link href="/yazilar" className="hover:text-fg transition-colors duration-300">Yazılar</Link></li>
                            <li><Link href="/hakkimda" className="hover:text-fg transition-colors duration-300">Hakkımda</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[11px] font-bold text-subtle uppercase tracking-[0.15em] mb-5">İletişim & Ağlar</h3>
                        <ul className="space-y-4 text-sm text-muted">
                            {settings?.email && <li><a href={`mailto:${settings.email}`} className="hover:text-fg transition-colors duration-300">{settings.email}</a></li>}
                            {settings?.phoneNumber && <li><a href={`tel:${settings.phoneNumber}`} className="hover:text-fg transition-colors duration-300">{settings.phoneNumber}</a></li>}
                            {settings?.locationText && <li className="text-subtle">{settings.locationText}</li>}
                            <li className="pt-2 flex gap-4">
                                {settings?.socialLinks?.github && <a href={settings.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-fg transition-colors duration-300"><Github size={18} /></a>}
                                {settings?.socialLinks?.linkedin && <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-fg transition-colors duration-300"><Linkedin size={18} /></a>}
                                {settings?.socialLinks?.x && <a href={settings.socialLinks.x} target="_blank" rel="noopener noreferrer" className="text-subtle hover:text-fg transition-colors duration-300"><Twitter size={18} /></a>}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center text-xs text-subtle pt-8 border-t border-card-border">
                    <div className="flex items-center gap-6 mb-4 md:mb-0">
                        <p>&copy; {new Date().getFullYear()} {settings?.siteTitle || 'MRKDESIGN'}. Tüm hakları saklıdır.</p>
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface border border-card-border">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-medium tracking-wide">All systems normal</span>
                        </div>
                    </div>
                    <Link href="/kvkk" className="hover:text-fg transition-colors duration-300">KVKK &amp; Gizlilik</Link>
                </div>
            </div>
        </footer>
    )
}
