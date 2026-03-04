import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listCategoriesQuery } from '@/lib/sanity/queries'
import { SolutionCategory } from '@/types/content'
import { DynamicIcon } from '@/components/DynamicIcon'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { CodePanel } from '@/components/TechShowcase'

export const metadata: Metadata = {
    title: 'Eğitim Teknolojileri',
    description: 'Sınav okuma sistemlerinden öğrenci analiz panellerine, kurum içi raporlama modüllerinden dijital dönüşüm danışmanlığına.',
}
export const revalidate = 60

export default async function SolutionsPage() {
    const categories: SolutionCategory[] = await client.fetch(listCategoriesQuery).catch(() => [])

    return (
        <section className="section-glow relative z-[1] pt-40 pb-28 lg:pt-48 lg:pb-36" data-glow="teal">
            <div className="section-shell">
                {/* Split hero: copy LEFT, CodePanel RIGHT */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20 lg:mb-28">
                    <AnimatedSection>
                        <div className="eyebrow">Uzmanlık</div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.035em] text-fg mb-7 leading-[1.06]">Eğitim Teknolojileri</h1>
                        <p className="text-lg text-muted leading-relaxed max-w-lg mb-10">
                            Sınav okuma sistemlerinden öğrenci analiz panellerine, kurum içi raporlama modüllerinden dijital dönüşüm danışmanlığına.
                        </p>
                        <Link href="/iletisim" className="btn-glow px-8 py-3.5 text-sm">Proje Konuşalım</Link>
                    </AnimatedSection>
                    <AnimatedSection delay={0.2}>
                        <CodePanel />
                    </AnimatedSection>
                </div>

                <div className="section-divider mb-20" />

                {/* Category cards */}
                {categories.length === 0 ? (
                    <AnimatedSection className="glass p-16 text-center text-muted">İçerik yakında eklenecektir.</AnimatedSection>
                ) : (
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map(cat => (
                            <StaggerItem key={cat._id}>
                                <Link href={`/uzmanlik/${cat.slug.current}`} className="block h-full group">
                                    <div className="glass glass-interactive border-beam p-8 h-full flex flex-col justify-between">
                                        <div>
                                            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                                                <DynamicIcon name={cat.icon || 'Box'} />
                                            </div>
                                            <h3 className="text-lg font-semibold text-fg mb-3">{cat.title}</h3>
                                            <p className="text-muted text-sm leading-relaxed">{cat.shortSummary}</p>
                                        </div>
                                        <div className="mt-8 flex items-center justify-between text-sm text-subtle group-hover:text-fg transition-colors">
                                            {cat.ctaLabel || 'İncele'} <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerChildren>
                )}
            </div>
        </section>
    )
}
