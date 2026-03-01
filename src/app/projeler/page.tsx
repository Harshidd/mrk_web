import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { listProjectsQuery } from '@/lib/sanity/queries'
import { Project } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { urlForImage } from '@/lib/sanity/image'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Projeler',
    description: 'Geliştirilen dijital sistemler ve eğitim teknolojisi projeleri.',
    alternates: { canonical: '/projeler' },
}

export const revalidate = 60

export default async function ProjectsPage() {
    const projects: Project[] = await client.fetch(listProjectsQuery).catch(() => [])

    return (
        <section className="section-white py-24 lg:py-32 px-6">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
                <AnimatedSection className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary mb-6 leading-tight">
                        Projeler
                    </h1>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        Gerçek problemlerden doğan, sahada test edilmiş, veriye dayalı dijital sistemler.
                    </p>
                </AnimatedSection>

                {projects.length === 0 ? (
                    <AnimatedSection className="card p-12 text-center text-text-muted">
                        Henüz proje eklenmedi.
                    </AnimatedSection>
                ) : (
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((p) => (
                            <StaggerItem key={p._id}>
                                <Link href={`/projeler/${p.slug.current}`} className="group block h-full">
                                    <div className="card card-hover p-4 h-full flex flex-col">
                                        <div className="aspect-[4/3] rounded-xl overflow-hidden mb-5 relative bg-surface-alt shrink-0">
                                            {p.coverImage && (
                                                <Image
                                                    src={urlForImage(p.coverImage)?.url() as string}
                                                    alt={p.title}
                                                    fill
                                                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                                />
                                            )}
                                        </div>
                                        <div className="px-1 flex-grow flex flex-col">
                                            {p.category?.title && (
                                                <span className="text-xs text-accent mb-2 uppercase tracking-wider font-medium">{p.category.title}</span>
                                            )}
                                            <h3 className="text-lg font-medium text-text-primary mb-2">{p.title}</h3>
                                            <p className="text-sm text-text-muted line-clamp-3 flex-grow">{p.summary}</p>
                                            <div className="text-sm text-text-muted group-hover:text-text-secondary transition-colors mt-4 pt-3 border-t border-border flex items-center justify-between">
                                                <span>Detayları gör</span>
                                                <span className="text-xs">{new Date(p.publishedAt).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })}</span>
                                            </div>
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
