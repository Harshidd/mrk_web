import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listCategoriesQuery } from '@/lib/sanity/queries'
import { SolutionCategory } from '@/types/content'
import { DynamicIcon } from '@/components/DynamicIcon'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'

export const metadata: Metadata = { title: 'Çözümler', description: 'Eğitim teknolojileri ve dijital verimlilik sistemleri.' }
export const revalidate = 60

export default async function SolutionsPage() {
    const categories: SolutionCategory[] = await client.fetch(listCategoriesQuery).catch(() => [])

    return (
        <section className="relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36">
            <div className="section-shell">
                <AnimatedSection className="max-w-3xl mb-14">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-fg mb-6">Çözümler</h1>
                    <p className="text-lg text-muted leading-relaxed">Süreçlerinizi hızlandıran, eğitime özel dijital mimari sistemleri.</p>
                </AnimatedSection>
                {categories.length === 0 ? (
                    <AnimatedSection className="glass p-14 text-center text-muted">İçerik yakında.</AnimatedSection>
                ) : (
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map(cat => (
                            <StaggerItem key={cat._id}>
                                <Link href={`/uzmanlik/${cat.slug.current}`} className="block h-full group">
                                    <div className="glass glass-interactive border-beam p-8 h-full flex flex-col justify-between">
                                        <div>
                                            <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform"><DynamicIcon name={cat.icon || 'Box'} /></div>
                                            <h3 className="text-lg font-semibold text-fg mb-3">{cat.title}</h3>
                                            <p className="text-muted text-sm leading-relaxed">{cat.shortSummary}</p>
                                        </div>
                                        <div className="mt-8 flex items-center justify-between text-sm text-subtle group-hover:text-fg transition-colors">
                                            {cat.ctaLabel || 'İncele'} <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
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
