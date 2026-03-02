import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listToolsQuery } from '@/lib/sanity/queries'
import { Tool } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { SectionHeader } from '@/components/SectionHeader'

export const metadata: Metadata = { title: 'Öğretmen ve Geliştirici Araçları', description: 'Öğretmenler ve geliştiriciler için pratik dijital araçlar.', alternates: { canonical: '/araclar' } }
export const revalidate = 60

export default async function ToolsPage() {
    const tools: Tool[] = await client.fetch(listToolsQuery).catch(() => [])

    return (
        <section className="relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36">
            <div className="section-shell">
                <AnimatedSection className="max-w-3xl">
                    <SectionHeader eyebrow="Araçlar" title="Öğretmen ve Geliştirici Araçları"
                        subtitle="Günlük operasyonları hızlandıran, tek bir işi iyi yapan, odaklı ve pratik araçlar." />
                </AnimatedSection>
                {tools.length === 0 ? (
                    <AnimatedSection className="glass p-14 text-center text-muted">Henüz araç eklenmedi.</AnimatedSection>
                ) : (
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map(t => (
                            <StaggerItem key={t._id}>
                                <div className="glass glass-interactive border-beam p-7 h-full flex flex-col justify-between group">
                                    <div>
                                        <div className="flex items-center justify-between mb-5">
                                            <h3 className="text-base font-semibold text-fg">{t.title}</h3>
                                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold ${t.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-surface text-subtle border border-card-border'}`}>
                                                {t.status === 'Active' ? 'Aktif' : 'Yakında'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted leading-relaxed mb-5">{t.summary}</p>
                                    </div>
                                    <Link href={`/araclar/${t.slug.current}`} className="flex items-center gap-2 text-sm text-subtle hover:text-fg transition-colors">
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
