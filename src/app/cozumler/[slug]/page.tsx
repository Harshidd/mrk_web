import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listCategoriesQuery, getSettingsQuery } from '@/lib/sanity/queries'
import { SolutionCategory } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { DynamicIcon } from '@/components/DynamicIcon'
import { Blocks } from '@/components/Blocks'

export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const data: SolutionCategory | null = await client.fetch(`*[_type == "solutionCategory" && slug.current == $slug][0]`, { slug })
    if (!data) return {}
    return {
        title: data.title,
        description: data.shortSummary,
        alternates: {
            canonical: `/uzmanlik/${data.slug.current}`,
        }
    }
}

export async function generateStaticParams() {
    const cats: SolutionCategory[] = await client.fetch(listCategoriesQuery).catch(() => [])
    return cats.map((cat) => ({ slug: cat.slug.current }))
}

export default async function SolutionDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const category: SolutionCategory | null = await client.fetch(`*[_type == "solutionCategory" && slug.current == $slug][0]`, { slug })

    if (!category) {
        notFound()
    }

    return (
        <section className="section-white py-24 lg:py-32 px-6">
            <article className="max-w-[1200px] mx-auto">
                {/* Header */}
                <AnimatedSection className="pb-16 border-b border-border mb-16">
                    <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
                        <Link href="/uzmanlik" className="hover:text-text-primary transition">Eğitim Teknolojileri</Link>
                        <ChevronRight size={14} />
                        <span className="text-text-primary">{category.title}</span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0">
                            <DynamicIcon name={category.icon || 'Box'} className="w-8 h-8" />
                        </div>
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary mb-6 leading-tight">
                                {category.title}
                            </h1>
                            <p className="text-xl text-text-secondary leading-relaxed">
                                {category.shortSummary}
                            </p>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Content layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <StaggerChildren className="flex flex-col gap-16">
                            {category.problemItSolves && (
                                <StaggerItem>
                                    <h2 className="text-2xl font-medium text-text-primary mb-6">Çözülen problem</h2>
                                    <div className="text-text-secondary"><Blocks value={category.problemItSolves} /></div>
                                </StaggerItem>
                            )}

                            {category.process && (
                                <StaggerItem>
                                    <div className="p-8 rounded-3xl bg-surface border border-border text-text-secondary">
                                        <h2 className="text-2xl font-medium text-text-primary mb-6">Süreç</h2>
                                        <Blocks value={category.process} />
                                    </div>
                                </StaggerItem>
                            )}

                            {category.delivery && (
                                <StaggerItem>
                                    <h2 className="text-2xl font-medium text-text-primary mb-6">Teslimat</h2>
                                    <div className="text-text-secondary"><Blocks value={category.delivery} /></div>
                                </StaggerItem>
                            )}

                            {category.faqs && category.faqs.length > 0 && (
                                <StaggerItem>
                                    <h2 className="text-2xl font-medium text-text-primary mb-6 pt-8 border-t border-border">Sık Sorulan Sorular</h2>
                                    <div className="flex flex-col gap-4">
                                        {category.faqs.map((faq, idx) => (
                                            <details key={idx} className="group card p-6 cursor-pointer">
                                                <summary className="font-medium text-text-primary flex justify-between items-center list-none outline-none">
                                                    {faq.question}
                                                    <span className="text-text-muted group-open:-rotate-180 transition-transform duration-300">
                                                        <ChevronRight size={20} />
                                                    </span>
                                                </summary>
                                                <p className="mt-4 pt-4 border-t border-border text-sm leading-relaxed text-text-secondary">
                                                    {faq.answer}
                                                </p>
                                            </details>
                                        ))}
                                    </div>
                                </StaggerItem>
                            )}
                        </StaggerChildren>
                    </div>

                    {/* Sidebar */}
                    <AnimatedSection delay={0.3} className="lg:col-span-4">
                        <div className="sticky top-32 card p-8 text-center rounded-3xl">
                            <h3 className="text-xl font-medium text-text-primary mb-4">Bu hizmet için iletişime geçin</h3>
                            <p className="text-sm text-text-muted mb-8">
                                Projenizi detaylandırmak ve ön değerlendirme almak için bize ulaşabilirsiniz.
                            </p>
                            <Link
                                href={category.ctaUrl || `/iletisim?konu=${encodeURIComponent(category.title)}`}
                                className="inline-block w-full py-4 bg-dark-band text-white font-medium rounded-full hover:bg-dark-band/90 hover:shadow-lg transition-all"
                            >
                                {category.ctaLabel || 'Hemen Başla'}
                            </Link>
                        </div>
                    </AnimatedSection>
                </div>
            </article>
        </section>
    )
}
