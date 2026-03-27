import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listToolsQuery } from '@/lib/sanity/queries'
import { Tool } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { fallbackTools } from '@/lib/data/fallbackTools'

export const revalidate = 60
export async function generateStaticParams() {
    const tools: Tool[] = await client.fetch(listToolsQuery).catch(() => [])
    const dynamicSlugs = tools.map((t: any) => ({ slug: t.slug.current }))
    fallbackTools.forEach((ft: any) => {
        if (!dynamicSlugs.find(s => s.slug === ft.slug.current)) {
            dynamicSlugs.push({ slug: ft.slug.current })
        }
    })
    return dynamicSlugs
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    let d: any = await client.fetch(`*[_type == "tool" && slug.current == $slug][0]`, { slug }).catch(() => null)
    if (!d) d = fallbackTools.find((ft: any) => ft.slug.current === slug)
    if (!d) return {}
    return { title: d.title, description: d.summary, alternates: { canonical: `/araclar/${slug}` } }
}

export default async function ToolDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    let tool: any = await client.fetch(`*[_type == "tool" && slug.current == $slug][0]`, { slug }).catch(() => null)
    if (!tool) {
        tool = fallbackTools.find((ft: any) => ft.slug.current === slug)
    }
    if (!tool) notFound()

    const isFallback = !!tool.detailDescription
    const tags = isFallback ? tool.tags : (tool.forWhom || tool.tags || [])
    const details = isFallback ? tool.detailDescription : (tool.features ? tool.features[0] : tool.summary)
    const outputLabel = isFallback ? tool.output : (tool.demoUrl ? 'Canlı URL Bağlantısı' : 'Bilinmeyen Çıktı')

    return (
        <section className="relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36">
            <article className="section-shell">
                <AnimatedSection className="pb-14 border-b border-card-border mb-14">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2 text-sm text-subtle">
                            <Link href="/araclar" className="hover:text-fg transition-colors">Araçlar</Link><ChevronRight size={14} /><span className="text-fg">{tool.title}</span>
                        </div>
                        <span className={`text-xs px-3 py-1 font-semibold rounded-full ${tool.status === 'Yakında' || tool.status === 'ComingSoon' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                            {tool.status === 'Yakında' || tool.status === 'ComingSoon' ? 'Yakında / Hazırlanıyor' : 'Aktif'}
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
                                <h2 className="text-xl font-semibold text-fg mb-5 pb-2 border-b border-card-border">Problem ve Amaç</h2>
                                <p className="text-muted leading-relaxed">{details}</p>
                            </StaggerItem>
                            
                            <StaggerItem>
                                <h2 className="text-xl font-semibold text-fg mb-5 pb-2 border-b border-card-border">Uygulama Alanları (Etiketler)</h2>
                                <ul className="space-y-3">
                                    {tags.map((tag: string, i: number) => (
                                        <li key={i} className="flex items-start gap-4">
                                            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-surface text-xs text-subtle shrink-0 mt-0.5 border border-card-border">{i + 1}</span>
                                            <span className="text-muted font-medium mt-1 uppercase text-xs tracking-wider">{tag}</span>
                                        </li>
                                    ))}
                                </ul>
                            </StaggerItem>

                            <StaggerItem>
                                <h2 className="text-xl font-semibold text-fg mb-5 pb-2 border-b border-card-border">Çıktı & Sonuç</h2>
                                <div className="p-5 rounded-2xl bg-surface-variant/40 border border-card-border flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                                        <ExternalLink size={18} />
                                    </div>
                                    <span className="text-fg font-medium tracking-wide text-sm">{outputLabel}</span>
                                </div>
                            </StaggerItem>
                        </StaggerChildren>
                    </div>
                    
                    <AnimatedSection delay={0.2} className="lg:col-span-4">
                        <div className="glass p-8 text-center sticky top-32 border-beam">
                            <h3 className="text-lg font-semibold text-fg mb-2 pb-5 border-b border-card-border">{tool.title}</h3>
                            {(tool.status === 'Aktif' || tool.status === 'Active') && tool.demoUrl ? (
                                <div className="pt-5"><p className="text-sm text-muted mb-5">Araç şu anda yayında. Butona tıklayarak inceleyebilirsiniz.</p><a href={tool.demoUrl} target="_blank" rel="noopener noreferrer" className="btn-glow w-full py-4 text-sm flex justify-center items-center gap-2"><ExternalLink size={16} /> Aracı Başlat</a></div>
                            ) : (
                                <div className="pt-5"><p className="text-sm text-muted mb-5">Bu araç şu anda aktif geliştirme aşamasında. Bilgi almak için iletişime geçebilirsiniz.</p><Link href={`/iletisim?konu=${encodeURIComponent(tool.title)}`} className="inline-block w-full py-4 bg-surface border border-card-border text-fg font-medium rounded-full hover:bg-surface-alt transition-all text-sm">Durumu Sor</Link></div>
                            )}
                        </div>
                    </AnimatedSection>
                </div>
            </article>
        </section>
    )
}
