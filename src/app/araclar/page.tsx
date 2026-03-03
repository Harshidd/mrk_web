import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listToolsQuery } from '@/lib/sanity/queries'
import { Tool } from '@/types/content'
import { DynamicIcon } from '@/components/DynamicIcon'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { WorkflowStrip } from '@/components/TechShowcase'

export const metadata: Metadata = {
    title: 'Öğretmen ve Geliştirici Araçları',
    description: 'Günlük operasyonları hızlandıran, odaklı ve pratik dijital araçlar.',
}
export const revalidate = 60

export default async function ToolsPage() {
    const tools: Tool[] = await client.fetch(listToolsQuery).catch(() => [])

    return (
        <section className="relative z-[1] pt-40 pb-28 lg:pt-48 lg:pb-36">
            <div className="section-shell">
                {/* Split hero: copy LEFT, WorkflowStrip RIGHT — zigzag opposite of /uzmanlik */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20 lg:mb-28">
                    <AnimatedSection className="lg:order-2">
                        <div className="eyebrow">Araçlar</div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.035em] text-fg mb-7 leading-[1.06]">Öğretmen ve Geliştirici Araçları</h1>
                        <p className="text-lg text-muted leading-relaxed max-w-lg mb-10">
                            Günlük operasyonları hızlandıran, tek bir işi iyi yapan, odaklı ve pratik araçlar.
                        </p>
                        <Link href="/iletisim" className="btn-glow px-8 py-3.5 text-sm">Araç Talebi Gönder</Link>
                    </AnimatedSection>
                    <AnimatedSection delay={0.2} className="lg:order-1">
                        <WorkflowStrip />
                    </AnimatedSection>
                </div>

                <div className="section-divider mb-20" />

                {/* Tool cards */}
                {tools.length === 0 ? (
                    <AnimatedSection className="glass p-16 text-center text-muted">Araçlar yakında eklenecektir.</AnimatedSection>
                ) : (
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tools.map(tool => (
                            <StaggerItem key={tool._id}>
                                <Link href={`/araclar/${tool.slug.current}`} className="group block h-full">
                                    <div className="glass glass-interactive border-beam p-7 h-full flex flex-col">
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="w-11 h-11 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500">
                                                <DynamicIcon name="Wrench" />
                                            </div>
                                            <span className={`text-[10px] px-3 py-1 rounded-full font-semibold ${tool.status === 'Active'
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                : 'bg-surface text-subtle border border-card-border'
                                                }`}>
                                                {tool.status === 'Active' ? 'Aktif' : 'Yakında'}
                                            </span>
                                        </div>
                                        <h3 className="text-base font-semibold text-fg mb-2">{tool.title}</h3>
                                        <p className="text-sm text-muted leading-relaxed flex-1">{tool.summary}</p>
                                        <div className="mt-6 pt-4 border-t border-card-border flex items-center justify-between text-xs text-subtle group-hover:text-fg transition-colors">
                                            <span>İncele</span>
                                            {tool.demoUrl
                                                ? <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                : <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                            }
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
