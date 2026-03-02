import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listToolsQuery } from '@/lib/sanity/queries'
import { Tool } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'

export const revalidate = 60
export async function generateStaticParams() {
    const tools: Tool[] = await client.fetch(listToolsQuery).catch(() => [])
    return tools.map(t => ({ slug: t.slug.current }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const d: Tool | null = await client.fetch(`*[_type == "tool" && slug.current == $slug][0]`, { slug })
    if (!d) return {}
    return { title: d.title, description: d.summary, alternates: { canonical: `/araclar/${d.slug.current}` } }
}

export default async function ToolDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const tool: Tool | null = await client.fetch(`*[_type == "tool" && slug.current == $slug][0]`, { slug })
    if (!tool) notFound()

    return (
        <section className="relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36">
            <article className="section-shell">
                <AnimatedSection className="pb-14 border-b border-card-border mb-14">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2 text-sm text-subtle">
                            <Link href="/araclar" className="hover:text-fg transition-colors">Araçlar</Link><ChevronRight size={14} /><span className="text-fg">{tool.title}</span>
                        </div>
                        <span className={`text-xs px-3 py-1 font-semibold rounded-full ${tool.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                            {tool.status === 'Active' ? 'Aktif' : 'Yakında / Davetiyeli'}
                        </span>
                    </div>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-fg mb-6 leading-tight">{tool.title}</h1>
                        <p className="text-xl text-muted leading-relaxed">{tool.summary}</p>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
                    <div className="lg:col-span-8">
                        <StaggerChildren className="flex flex-col gap-12">
                            <StaggerItem>
                                <h2 className="text-xl font-semibold text-fg mb-5 pb-2 border-b border-card-border">Kimler İçin Uygun?</h2>
                                <ul className="space-y-3">
                                    {tool.forWhom.map((item, i) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-surface text-xs text-subtle shrink-0 mt-0.5 border border-card-border">{i + 1}</span>
                                            <span className="text-muted leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </StaggerItem>
                            <StaggerItem>
                                <h2 className="text-xl font-semibold text-fg mb-5 pb-2 border-b border-card-border">Temel Özellikler</h2>
                                <ul className="space-y-3">
                                    {tool.features.map((f, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2.5" />
                                            <span className="text-muted leading-relaxed">{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </StaggerItem>
                        </StaggerChildren>
                    </div>
                    <AnimatedSection delay={0.2} className="lg:col-span-4">
                        <div className="glass p-8 text-center sticky top-32">
                            <h3 className="text-lg font-semibold text-fg mb-2 pb-5 border-b border-card-border">{tool.title}</h3>
                            {tool.status === 'Active' && tool.demoUrl ? (
                                <div className="pt-5"><p className="text-sm text-muted mb-5">Aşağıdaki bağlantıdan aracı deneyebilirsiniz.</p><a href={tool.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-glow w-full py-4 text-sm"><ExternalLink size={16} /> Demoyu Dene</a></div>
                            ) : (
                                <div className="pt-5"><p className="text-sm text-muted mb-5">Bu araç şu anda kapalı betada. Erken erişim için iletişime geçin.</p><Link href={`/iletisim?konu=${encodeURIComponent(tool.title)}`} className="inline-block w-full py-4 bg-surface border border-card-border text-fg font-medium rounded-full hover:bg-surface-alt transition-all text-sm">{tool.requestLabel || 'Talep Gönder'}</Link></div>
                            )}
                        </div>
                    </AnimatedSection>
                </div>
            </article>
        </section>
    )
}
