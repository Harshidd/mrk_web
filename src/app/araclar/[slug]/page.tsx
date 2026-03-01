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
    return tools.map((t) => ({ slug: t.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const data: Tool | null = await client.fetch(`*[_type == "tool" && slug.current == $slug][0]`, { slug })
    if (!data) return {}
    return {
        title: data.title,
        description: data.summary,
        alternates: {
            canonical: `/araclar/${data.slug.current}`,
        }
    }
}

export default async function ToolDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const tool: Tool | null = await client.fetch(`*[_type == "tool" && slug.current == $slug][0]`, { slug })

    if (!tool) {
        notFound()
    }

    return (
        <section className="section-white py-24 lg:py-32 px-6">
            <article className="max-w-[1200px] mx-auto">
                {/* Header */}
                <AnimatedSection className="pb-16 border-b border-border mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2 text-sm text-text-muted">
                            <Link href="/araclar" className="hover:text-text-primary transition">Araçlar</Link>
                            <ChevronRight size={14} />
                            <span className="text-text-primary">{tool.title}</span>
                        </div>
                        <span className={`text-xs px-3 py-1 font-medium rounded-full ${tool.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                            {tool.status === 'Active' ? 'Aktif' : 'Yakında / Davetiyeli'}
                        </span>
                    </div>

                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary mb-6 leading-tight">
                            {tool.title}
                        </h1>
                        <p className="text-xl text-text-secondary leading-relaxed">
                            {tool.summary}
                        </p>
                    </div>
                </AnimatedSection>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <StaggerChildren className="flex flex-col gap-12">
                            <StaggerItem>
                                <h2 className="text-xl font-medium text-text-primary mb-6 pb-2 border-b border-border">Kimler İçin Uygun?</h2>
                                <ul className="space-y-4">
                                    {tool.forWhom.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-4">
                                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-surface-alt text-xs text-text-muted shrink-0 mt-0.5 border border-border">
                                                {idx + 1}
                                            </span>
                                            <span className="text-text-secondary leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </StaggerItem>

                            <StaggerItem>
                                <h2 className="text-xl font-medium text-text-primary mb-6 pb-2 border-b border-border">Temel Özellikler</h2>
                                <ul className="space-y-4">
                                    {tool.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                                            <span className="text-text-secondary leading-relaxed">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </StaggerItem>
                        </StaggerChildren>
                    </div>

                    <AnimatedSection delay={0.2} className="lg:col-span-4">
                        <div className="card p-8 text-center rounded-3xl sticky top-32">
                            <h3 className="text-lg font-medium text-text-primary mb-2 pb-6 border-b border-border">{tool.title}</h3>

                            {tool.status === 'Active' && tool.demoUrl ? (
                                <div className="pt-6">
                                    <p className="text-sm text-text-secondary mb-6">Aşağıdaki bağlantıdan aracı doğrudan deneyebilirsiniz.</p>
                                    <a
                                        href={tool.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-4 bg-dark-band text-white font-medium rounded-full hover:bg-dark-band/90 hover:shadow-lg transition-all"
                                    >
                                        <ExternalLink size={18} /> Demoyu Dene
                                    </a>
                                </div>
                            ) : (
                                <div className="pt-6">
                                    <p className="text-sm text-text-secondary mb-6">Bu araç şu an kapalı betada. Erken erişim ve talep için bizimle iletişime geçin.</p>
                                    <Link
                                        href={`/iletisim?konu=${encodeURIComponent(tool.title)}`}
                                        className="inline-block w-full py-4 bg-surface-alt border border-border text-text-primary font-medium rounded-full hover:bg-dark-band hover:text-white hover:border-dark-band transition-all"
                                    >
                                        {tool.requestLabel || 'Talep Gönder'}
                                    </Link>
                                </div>
                            )}
                        </div>
                    </AnimatedSection>
                </div>
            </article>
        </section>
    )
}
