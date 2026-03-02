import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronRight, ExternalLink } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { getProjectBySlugQuery, listProjectsQuery } from '@/lib/sanity/queries'
import { Project } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { Blocks } from '@/components/Blocks'
import { urlForImage } from '@/lib/sanity/image'

export const revalidate = 60
export async function generateStaticParams() {
    const ps: Project[] = await client.fetch(listProjectsQuery).catch(() => [])
    return ps.map(p => ({ slug: p.slug.current }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const d: Project | null = await client.fetch(getProjectBySlugQuery, { slug })
    if (!d) return {}
    return { title: d.title, description: d.summary, alternates: { canonical: `/projeler/${d.slug.current}` } }
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project: Project | null = await client.fetch(getProjectBySlugQuery, { slug })
    if (!project) notFound()

    return (
        <section className="relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36">
            <article className="section-shell">
                <AnimatedSection className="pb-14">
                    <div className="flex items-center gap-2 text-sm text-subtle mb-8">
                        <Link href="/projeler" className="hover:text-fg transition-colors">Projeler</Link><ChevronRight size={14} /><span className="text-fg">{project.title}</span>
                    </div>
                    <div className="max-w-4xl">
                        {project.category?.title && <span className="text-accent font-bold text-xs tracking-[0.12em] uppercase mb-3 block">{project.category.title}</span>}
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-fg mb-6 leading-tight">{project.title}</h1>
                        <p className="text-xl text-muted leading-relaxed max-w-3xl">{project.summary}</p>
                    </div>
                </AnimatedSection>

                {project.coverImage && (
                    <AnimatedSection delay={0.15} className="w-full aspect-video md:aspect-[21/9] relative rounded-3xl overflow-hidden bg-surface/50 mb-20 border border-card-border">
                        <Image src={urlForImage(project.coverImage)?.url() as string} alt={project.title} fill className="object-cover" priority />
                    </AnimatedSection>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
                    <div className="lg:col-span-8">
                        <StaggerChildren className="flex flex-col gap-14">
                            {project.problem && <StaggerItem><div className="border-l-4 border-accent pl-7"><h2 className="text-sm font-bold tracking-[0.15em] text-subtle uppercase mb-5">01 — Problem</h2><div className="text-fg text-lg leading-relaxed"><Blocks value={project.problem} /></div></div></StaggerItem>}
                            {project.approach && <StaggerItem><div className="border-l-4 border-accent-light pl-7"><h2 className="text-sm font-bold tracking-[0.15em] text-subtle uppercase mb-5">02 — Yaklaşım</h2><div className="text-fg text-lg leading-relaxed"><Blocks value={project.approach} /></div></div></StaggerItem>}
                            {project.solution && <StaggerItem><div className="border-l-4 border-dark pl-7"><h2 className="text-sm font-bold tracking-[0.15em] text-subtle uppercase mb-5">03 — Çözüm</h2><div className="text-fg text-lg leading-relaxed"><Blocks value={project.solution} /></div></div></StaggerItem>}
                            {project.gallery && project.gallery.length > 0 && (
                                <StaggerItem>
                                    <h2 className="text-sm font-bold tracking-[0.15em] text-subtle uppercase mb-7">Galeri</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {project.gallery.map((img, i) => (
                                            <div key={i} className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-surface/50 border border-card-border">
                                                <Image src={urlForImage(img)?.url() as string} alt={`${project.title} ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                                            </div>
                                        ))}
                                    </div>
                                </StaggerItem>
                            )}
                        </StaggerChildren>
                    </div>
                    <AnimatedSection delay={0.25} className="lg:col-span-4">
                        <div className="glass p-8 sticky top-32 space-y-8">
                            {project.results && project.results.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-fg mb-5 uppercase tracking-[0.12em]">Sonuçlar</h3>
                                    <ul className="space-y-5">
                                        {project.results.map((r, i) => (
                                            <li key={i} className="flex flex-col">
                                                <span className="text-3xl font-light text-fg mb-0.5">{r.value}</span>
                                                <span className="text-sm font-semibold text-accent mb-0.5">{r.label}</span>
                                                {r.note && <span className="text-xs text-subtle">{r.note}</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            <div className="pt-6 border-t border-card-border">
                                <h3 className="text-sm font-semibold text-fg mb-4 uppercase tracking-[0.12em]">Teknolojiler</h3>
                                <div className="flex flex-wrap gap-2">{project.techStack.map((t, i) => <span key={i} className="px-3 py-1 bg-surface border border-card-border text-muted rounded-full text-xs font-medium">{t}</span>)}</div>
                            </div>
                            {(project.ctaUrl || project.ctaLabel) && (
                                <div className="pt-6 border-t border-card-border">
                                    <a href={project.ctaUrl || '#'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between group p-4 border border-card-border rounded-2xl bg-white/50 hover:bg-surface hover:border-accent/50 transition-all">
                                        <span className="text-fg text-sm font-medium">{project.ctaLabel || 'Projeye Git'}</span>
                                        <ExternalLink size={16} className="text-subtle group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </AnimatedSection>
                </div>
            </article>
        </section>
    )
}
