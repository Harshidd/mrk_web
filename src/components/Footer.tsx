import Link from 'next/link'
import { SiteSettings } from '@/types/content'

export function Footer({ settings }: { settings: SiteSettings | null }) {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-dark-band pt-16 pb-8 px-6 relative z-10">
            <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight mb-3 text-white">
                        MRK<span className="text-text-on-dark-muted font-normal">DESIGN</span>
                    </h2>
                    <p className="text-text-on-dark-muted text-sm leading-relaxed max-w-xs">
                        {settings?.siteDescription || 'Eğitim ve yapay zekâ odaklı dijital sistemler.'}
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-white/80 mb-4">Sayfalar</h3>
                    <ul className="space-y-2.5 text-sm text-text-on-dark-muted">
                        <li><Link href="/uzmanlik" className="hover:text-white transition-colors">Eğitim Teknolojileri</Link></li>
                        <li><Link href="/araclar" className="hover:text-white transition-colors">Öğretmen ve Geliştirici Araçları</Link></li>
                        <li><Link href="/projeler" className="hover:text-white transition-colors">Projeler</Link></li>
                        <li><Link href="/yazilar" className="hover:text-white transition-colors">Yazılar</Link></li>
                        <li><Link href="/hakkimda" className="hover:text-white transition-colors">Hakkımda</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-sm font-medium text-white/80 mb-4">İletişim</h3>
                    <ul className="space-y-2.5 text-sm text-text-on-dark-muted">
                        {settings?.email && (
                            <li>
                                <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors">
                                    {settings.email}
                                </a>
                            </li>
                        )}
                        {settings?.phoneNumber && (
                            <li>
                                <a href={`tel:${settings.phoneNumber}`} className="hover:text-white transition-colors">
                                    {settings.phoneNumber}
                                </a>
                            </li>
                        )}
                        {settings?.locationText && <li>{settings.locationText}</li>}
                        <li className="pt-2 flex gap-4">
                            {settings?.socialLinks?.github && <a href={settings.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>}
                            {settings?.socialLinks?.linkedin && <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>}
                            {settings?.socialLinks?.x && <a href={settings.socialLinks.x} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">X</a>}
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-text-on-dark-muted pt-6 border-t border-border-dark">
                <p>&copy; {currentYear} {settings?.siteTitle || 'MRKDESIGN'}. Tüm hakları saklıdır.</p>
                <Link href="/kvkk" className="hover:text-white transition-colors mt-3 md:mt-0">KVKK & Gizlilik</Link>
            </div>
        </footer>
    )
}
