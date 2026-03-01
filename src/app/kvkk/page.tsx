import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { client } from '@/lib/sanity/client'
import { getLegalBySlugQuery } from '@/lib/sanity/queries'
import { LegalPage } from '@/types/content'
import { AnimatedSection } from '@/components/AnimatedSection'
import { Blocks } from '@/components/Blocks'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
    const data: LegalPage | null = await client.fetch(getLegalBySlugQuery, { slug: 'kvkk' }).catch(() => null)
    return {
        title: data?.title || 'KVKK ve Gizlilik Politikası',
        alternates: {
            canonical: '/kvkk',
        }
    }
}

export default async function KvkkPage() {
    const pageData: LegalPage | null = await client.fetch(getLegalBySlugQuery, { slug: 'kvkk' }).catch(() => null)

    if (!pageData) {
        return <div className="py-24 text-center text-text-muted max-w-3xl mx-auto mt-12 card">Belge yakında eklenecektir.</div>
    }

    return (
        <section className="section-white py-24 lg:py-32 px-6">
            <article className="max-w-3xl mx-auto">
                <AnimatedSection>
                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-text-primary mb-12">
                        {pageData.title}
                    </h1>
                    <div className="prose prose-lg max-w-none text-text-secondary bg-surface p-8 md:p-12 rounded-3xl border border-border">
                        <Blocks value={pageData.body} />
                    </div>
                </AnimatedSection>
            </article>
        </section>
    )
}
