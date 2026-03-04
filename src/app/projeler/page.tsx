import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listProjectsQuery } from '@/lib/sanity/queries'
import { Project } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { SectionHeader } from '@/components/SectionHeader'
import { urlForImage } from '@/lib/sanity/image'

export const metadata: Metadata = { title: 'Projeler', description: 'Geliştirilen dijital sistemler ve eğitim teknolojisi projeleri.', alternates: { canonical: '/projeler' } }
export const revalidate = 60

const fallbackProjects = [
    { id: '1', title: 'BiSınıf — Sınav Analiz Platformu', cat: 'EdTech', summary: 'Optik okuma tabanlı sınav analiz ve raporlama sistemi.' },
    { id: '2', title: 'Optik Okuma Motoru', cat: 'Altyapı', summary: 'Yüksek doğruluklu otomatik tarama altyapısı.' },
    { id: '3', title: 'Kurum Raporlama Paneli', cat: 'Analitik', summary: 'Kurum genelinde performans izleme ve raporlama.' },
]

export default async function ProjectsPage() {
    const projects: Project[] = await client.fetch(listProjectsQuery).catch(() => [])

    return (
        <section className="section-glow relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36" data-glow="pink">
            <div className="section-shell">
                <AnimatedSection className="max-w-3xl">
                    <SectionHeader eyebrow="Projeler" title="Projeler"
                        subtitle="Gerçek problemlerden doğan, sahada test edilmiş, veriye dayalı dijital sistemler." />
                </AnimatedSection>

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                    {(projects.length > 0 ? projects : []).map(p => (
                        <StaggerItem key={p._id}>
                            <Link href={`/projeler/${p.slug.current}`} className="group block h-full">
                                <div className="glass glass-interactive border-beam p-5 h-full flex flex-col">
                                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-surface/50 relative shrink-0">
                                        {p.coverImage && <Image src={urlForImage(p.coverImage)?.url() as string} alt={p.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" />}
                                    </div>
                                    <div className="px-1 flex-grow flex flex-col">
                                        {p.category?.title && <span className="text-[10px] text-accent mb-2 uppercase tracking-[0.12em] font-bold">{p.category.title}</span>}
                                        <h3 className="text-base font-semibold text-fg mb-2">{p.title}</h3>
                                        <p className="text-sm text-muted line-clamp-3 flex-grow">{p.summary}</p>
                                        <div className="text-xs text-subtle group-hover:text-muted transition-colors mt-5 pt-4 border-t border-card-border flex items-center justify-between">
                                            <span>Detayları gör</span>
                                            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </StaggerItem>
                    ))}

                    {/* Premium skeletons when CMS empty */}
                    {projects.length === 0 && fallbackProjects.map(p => (
                        <StaggerItem key={p.id}>
                            <div className="glass p-5 h-full flex flex-col">
                                <div className="aspect-[4/3] rounded-xl mb-5 bg-surface/40 flex items-center justify-center">
                                    <div className="w-10 h-10 rounded-full bg-surface/70 skeleton" />
                                </div>
                                <div className="px-1 flex-grow flex flex-col">
                                    <span className="text-[10px] text-accent mb-2 uppercase tracking-[0.12em] font-bold">{p.cat}</span>
                                    <h3 className="text-base font-semibold text-fg mb-2">{p.title}</h3>
                                    <p className="text-sm text-muted">{p.summary}</p>
                                    <div className="text-xs text-subtle mt-5 pt-4 border-t border-card-border">Detayları gör</div>
                                </div>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerChildren>
            </div>
        </section>
    )
}
