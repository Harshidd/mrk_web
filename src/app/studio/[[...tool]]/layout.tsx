export const metadata = {
    title: 'MRKDESIGN Studio',
    description: 'Sanity Studio for MRKDESIGN Center Hub',
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="tr">
            <body style={{ margin: 0 }}>
                {children}
            </body>
        </html>
    )
}
