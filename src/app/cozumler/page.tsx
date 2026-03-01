import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listCategoriesQuery } from '@/lib/sanity/queries'
import { SolutionCategory } from '@/types/content'
import { DynamicIcon } from '@/components/DynamicIcon'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'

export const metadata: Metadata = {
    title: 'Çözümler',
    description: 'Eğitim teknolojileri ve dijital verimlilik sistemleri. Uçtan uca mimari.',
}

export const revalidate = 60

export default async function SolutionsPage() {
    const categories: SolutionCategory[] = await client.fetch(listCategoriesQuery).catch(() => [])

    return (
        <section className="section-white py-24 lg:py-32 px-6">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
                <AnimatedSection className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary mb-6">Çözümler</h1>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        Süreçlerinizi hızlandıran, operasyonlarınızı netleştiren, eğitime özel dijital mimari sistemleri. İhtiyacınıza en uygun modeli inceleyin.
                    </p>
                </AnimatedSection>

                {categories.length === 0 ? (
                    <AnimatedSection className="card p-12 text-center text-text-muted">
                        İçerik yakında eklenecektir.
                    </AnimatedSection>
                ) : (
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map((cat) => (
                            <StaggerItem key={cat._id}>
                                <Link href={`/uzmanlik/${cat.slug.current}`} className="block h-full cursor-pointer group">
                                    <div className="card card-hover p-8 h-full flex flex-col justify-between">
                                        <div>
                                            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                                                <DynamicIcon name={cat.icon || 'Box'} />
                                            </div>
                                            <h3 className="text-xl font-medium text-text-primary mb-3">{cat.title}</h3>
                                            <p className="text-text-secondary text-sm leading-relaxed">{cat.shortSummary}</p>
                                        </div>
                                        <div className="mt-8 flex items-center justify-between text-sm text-text-muted group-hover:text-text-primary transition-colors">
                                            {cat.ctaLabel || 'İncele'}
                                            <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all" />
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
