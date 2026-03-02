import { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { getLegalBySlugQuery } from '@/lib/sanity/queries'
import { LegalPage } from '@/types/content'
import { AnimatedSection } from '@/components/AnimatedSection'
import { Blocks } from '@/components/Blocks'

export const revalidate = 60
export async function generateMetadata(): Promise<Metadata> {
    const data: LegalPage | null = await client.fetch(getLegalBySlugQuery, { slug: 'kvkk' }).catch(() => null)
    return { title: data?.title || 'KVKK ve Gizlilik Politikası', alternates: { canonical: '/kvkk' } }
}

export default async function KvkkPage() {
    const page: LegalPage | null = await client.fetch(getLegalBySlugQuery, { slug: 'kvkk' }).catch(() => null)
    if (!page) return <section className="relative z-[1] pt-36 pb-28"><div className="section-shell"><div className="glass p-14 text-center text-muted max-w-3xl mx-auto">Belge yakında eklenecektir.</div></div></section>

    return (
        <section className="relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36">
            <article className="section-shell max-w-3xl">
                <AnimatedSection>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-fg mb-12">{page.title}</h1>
                    <div className="prose prose-lg max-w-none text-muted glass p-8 md:p-14"><Blocks value={page.body} /></div>
                </AnimatedSection>
            </article>
        </section>
    )
}
