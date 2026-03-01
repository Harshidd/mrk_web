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
    const pjs: Project[] = await client.fetch(listProjectsQuery).catch(() => [])
    return pjs.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const data: Project | null = await client.fetch(getProjectBySlugQuery, { slug })
    if (!data) return {}
    return {
        title: data.title,
        description: data.summary,
        alternates: {
            canonical: `/projeler/${data.slug.current}`,
        }
    }
}

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const project: Project | null = await client.fetch(getProjectBySlugQuery, { slug })

    if (!project) notFound()

    return (
        <section className="section-white py-24 lg:py-32 px-6">
            <article className="max-w-[1200px] mx-auto">
                {/* Header */}
                <AnimatedSection className="pb-16">
                    <div className="flex items-center gap-2 text-sm text-text-muted mb-8">
                        <Link href="/projeler" className="hover:text-text-primary transition">Projeler</Link>
                        <ChevronRight size={14} />
                        <span className="text-text-primary">{project.title}</span>
                    </div>

                    <div className="max-w-4xl">
                        <div className="text-accent font-semibold text-sm tracking-wider uppercase mb-4">
                            {project.category?.title}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-text-primary mb-6 leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-text-secondary leading-relaxed max-w-3xl">
                            {project.summary}
                        </p>
                    </div>
                </AnimatedSection>

                {/* Cover Image */}
                {project.coverImage && (
                    <AnimatedSection delay={0.2} className="w-full aspect-video md:aspect-[21/9] relative rounded-3xl overflow-hidden bg-surface-alt mb-20 border border-border">
                        <Image
                            src={urlForImage(project.coverImage)?.url() as string}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </AnimatedSection>
                )}

                {/* Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8">
                        <StaggerChildren className="flex flex-col gap-16">
                            {project.problem && (
                                <StaggerItem>
                                    <div className="border-l-4 border-accent pl-8">
                                        <h2 className="text-sm font-semibold tracking-widest text-text-muted uppercase mb-6">01 — Problem</h2>
                                        <div className="text-text-primary text-lg leading-relaxed"><Blocks value={project.problem} /></div>
                                    </div>
                                </StaggerItem>
                            )}

                            {project.approach && (
                                <StaggerItem>
                                    <div className="border-l-4 border-accent-light pl-8">
                                        <h2 className="text-sm font-semibold tracking-widest text-text-muted uppercase mb-6">02 — Yaklaşım</h2>
                                        <div className="text-text-primary text-lg leading-relaxed"><Blocks value={project.approach} /></div>
                                    </div>
                                </StaggerItem>
                            )}

                            {project.solution && (
                                <StaggerItem>
                                    <div className="border-l-4 border-dark-band pl-8">
                                        <h2 className="text-sm font-semibold tracking-widest text-text-muted uppercase mb-6">03 — Çözüm</h2>
                                        <div className="text-text-primary text-lg leading-relaxed"><Blocks value={project.solution} /></div>
                                    </div>
                                </StaggerItem>
                            )}

                            {project.gallery && project.gallery.length > 0 && (
                                <StaggerItem>
                                    <h2 className="text-sm font-semibold tracking-widest text-text-muted uppercase mb-8">Galeri</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {project.gallery.map((img, idx) => (
                                            <div key={idx} className="aspect-[4/3] relative rounded-xl overflow-hidden bg-surface-alt border border-border">
                                                <Image
                                                    src={urlForImage(img)?.url() as string}
                                                    alt={`${project.title} gallery image ${idx + 1}`}
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </StaggerItem>
                            )}
                        </StaggerChildren>
                    </div>

                    {/* Info Sidebar */}
                    <AnimatedSection delay={0.3} className="lg:col-span-4">
                        <div className="card p-8 rounded-3xl sticky top-32 space-y-10">
                            {project.results && project.results.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-text-primary mb-6 uppercase tracking-widest">Sonuçlar</h3>
                                    <ul className="space-y-6">
                                        {project.results.map((r, i) => (
                                            <li key={i} className="flex flex-col">
                                                <span className="text-4xl font-light text-text-primary mb-1">{r.value}</span>
                                                <span className="text-sm font-medium text-accent mb-1">{r.label}</span>
                                                {r.note && <span className="text-xs text-text-muted">{r.note}</span>}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="pt-8 border-t border-border">
                                <h3 className="text-sm font-medium text-text-primary mb-6 uppercase tracking-widest">Kullanılan Teknolojiler</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-surface-alt border border-border text-text-secondary rounded-full text-xs font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {(project.ctaUrl || project.ctaLabel) && (
                                <div className="pt-8 border-t border-border">
                                    <a
                                        href={project.ctaUrl || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between group p-4 border border-border rounded-2xl bg-surface hover:bg-surface-alt hover:border-accent/50 transition-all"
                                    >
                                        <span className="text-text-primary text-sm font-medium">{project.ctaLabel || 'Projeye Git'}</span>
                                        <ExternalLink size={16} className="text-text-muted group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
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
