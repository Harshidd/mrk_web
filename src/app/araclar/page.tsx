import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listToolsQuery } from '@/lib/sanity/queries'
import { Tool } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'

export const metadata: Metadata = {
    title: 'Öğretmen ve Geliştirici Araçları',
    description: 'Öğretmenler ve geliştiriciler için pratik dijital araçlar.',
    alternates: { canonical: '/araclar' },
}

export const revalidate = 60

export default async function ToolsPage() {
    const tools: Tool[] = await client.fetch(listToolsQuery).catch(() => [])

    return (
        <section className="section-white py-24 lg:py-32 px-6">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
                <AnimatedSection className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary mb-6 leading-tight">
                        Öğretmen ve Geliştirici Araçları
                    </h1>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        Günlük operasyonları hızlandıran, tek bir işi iyi yapan, odaklı ve pratik araçlar.
                    </p>
                </AnimatedSection>

                {tools.length === 0 ? (
                    <AnimatedSection className="card p-12 text-center text-text-muted">
                        Henüz araç eklenmedi.
                    </AnimatedSection>
                ) : (
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map((t) => (
                            <StaggerItem key={t._id}>
                                <div className="card card-hover p-7 h-full flex flex-col justify-between group">
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-medium text-text-primary">{t.title}</h3>
                                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${t.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-surface-alt text-text-muted border border-border'}`}>
                                                {t.status === 'Active' ? 'Aktif' : 'Yakında'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-text-secondary leading-relaxed mb-4">{t.summary}</p>
                                    </div>
                                    <Link
                                        href={`/araclar/${t.slug.current}`}
                                        className="mt-4 flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors"
                                    >
                                        Detayları gör <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerChildren>
                )}
            </div>
        </section>
    )
}
