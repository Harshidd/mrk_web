import { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp'
import { AuroraBackground } from '@/components/AuroraBackground'
import { client } from '@/lib/sanity/client'
import { getSettingsQuery } from '@/lib/sanity/queries'
import { SiteSettings } from '@/types/content'
import { mergeSettings } from '@/lib/data/fallbackSettings'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: { template: '%s | MRKDEV', default: 'MRKDEV — Eğitim ve Yapay Zekâ Odaklı Sistemler' },
  description: 'Eğitim odaklı dijital sistemler, mini araçlar ve veri odaklı üretim notları.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cmsSettings: SiteSettings | null = await client.fetch(getSettingsQuery).catch(() => null)
  const settings = mergeSettings(cmsSettings)

  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <AuroraBackground>
          <Navbar navCtas={settings?.navCtas} />
          <main className="flex-1 relative z-[1]">{children}</main>
          <Footer settings={settings} />
          {settings?.whatsappNumber && <FloatingWhatsApp number={settings.whatsappNumber} />}
        </AuroraBackground>
      </body>
    </html>
  )
}
