import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İçerik Yönetimi | MRKDEV',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="studio-layout-container min-h-screen">
      <style>{`
        /* Hide public website chrome (Navbar, Footer, WhatsApp, Aurora) */
        nav, footer, .aurora-deep, .aurora-mid, .aurora-spotlight, .aurora-vignette, .aurora-dots, .aurora-noise, a[aria-label="WhatsApp"] {
          display: none !important;
        }
        
        /* Force reset background for the Studio so it doesn't look like the public site */
        body {
          background: #ffffff !important;
          color: #111827 !important;
          margin: 0;
          padding: 0;
        }
        
        /* Studio takes full height */
        .studio-layout-container {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }
      `}</style>
      {children}
    </div>
  )
}
