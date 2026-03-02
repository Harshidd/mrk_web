import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listCategoriesQuery } from '@/lib/sanity/queries'
import { SolutionCategory } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { DynamicIcon } from '@/components/DynamicIcon'
import { Blocks } from '@/components/Blocks'

export const revalidate = 60
export async function generateStaticParams() {
    const cats: SolutionCategory[] = await client.fetch(listCategoriesQuery).catch(() => [])
    return cats.map(c => ({ slug: c.slug.current }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const d: SolutionCategory | null = await client.fetch(`*[_type == "solutionCategory" && slug.current == $slug][0]`, { slug })
    if (!d) return {}
    return { title: d.title, description: d.shortSummary, alternates: { canonical: `/uzmanlik/${d.slug.current}` } }
}

export default async function SolutionDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const cat: SolutionCategory | null = await client.fetch(`*[_type == "solutionCategory" && slug.current == $slug][0]`, { slug })
    if (!cat) notFound()

    return (
        <section className="relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36">
            <article className="section-shell">
                <AnimatedSection className="pb-14 border-b border-card-border mb-14">
                    <div className="flex items-center gap-2 text-sm text-subtle mb-8">
                        <Link href="/uzmanlik" className="hover:text-fg transition-colors">Eğitim Teknolojileri</Link>
                        <ChevronRight size={14} /><span className="text-fg">{cat.title}</span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-7 items-start">
                        <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent shrink-0"><DynamicIcon name={cat.icon || 'Box'} className="w-7 h-7" /></div>
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-fg mb-6 leading-tight">{cat.title}</h1>
                            <p className="text-xl text-muted leading-relaxed">{cat.shortSummary}</p>
                        </div>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
                    <div className="lg:col-span-8">
                        <StaggerChildren className="flex flex-col gap-14">
                            {cat.problemItSolves && <StaggerItem><h2 className="text-2xl font-semibold text-fg mb-5">Çözülen problem</h2><div className="text-muted leading-relaxed"><Blocks value={cat.problemItSolves} /></div></StaggerItem>}
                            {cat.process && <StaggerItem><div className="glass p-8 text-muted"><h2 className="text-2xl font-semibold text-fg mb-5">Süreç</h2><Blocks value={cat.process} /></div></StaggerItem>}
                            {cat.delivery && <StaggerItem><h2 className="text-2xl font-semibold text-fg mb-5">Teslimat</h2><div className="text-muted leading-relaxed"><Blocks value={cat.delivery} /></div></StaggerItem>}
                            {cat.faqs && cat.faqs.length > 0 && (
                                <StaggerItem>
                                    <h2 className="text-2xl font-semibold text-fg mb-6 pt-6 border-t border-card-border">Sık Sorulan Sorular</h2>
                                    <div className="flex flex-col gap-3">
                                        {cat.faqs.map((f, i) => (
                                            <details key={i} className="group glass p-5 cursor-pointer">
                                                <summary className="font-medium text-fg flex justify-between items-center list-none outline-none">{f.question}<span className="text-subtle group-open:rotate-90 transition-transform"><ChevronRight size={18} /></span></summary>
                                                <p className="mt-4 pt-4 border-t border-card-border text-sm leading-relaxed text-muted">{f.answer}</p>
                                            </details>
                                        ))}
                                    </div>
                                </StaggerItem>
                            )}
                        </StaggerChildren>
                    </div>
                    <AnimatedSection delay={0.2} className="lg:col-span-4">
                        <div className="sticky top-32 glass p-8 text-center">
                            <h3 className="text-xl font-semibold text-fg mb-4">Bu hizmet için iletişime geçin</h3>
                            <p className="text-sm text-subtle mb-7">Projenizi detaylandırmak ve ön değerlendirme almak için bize ulaşabilirsiniz.</p>
                            <Link href={cat.ctaUrl || `/iletisim?konu=${encodeURIComponent(cat.title)}`} className="btn-glow w-full py-4 text-sm">{cat.ctaLabel || 'Hemen Başla'}</Link>
                        </div>
                    </AnimatedSection>
                </div>
            </article>
        </section>
    )
}
