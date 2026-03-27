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

export const metadata: Metadata = { 
    title: 'Projeler', 
    description: 'Gerçek problemlerden doğan, sahada test edilmiş, veriye dayalı dijital sistemler.', 
    alternates: { canonical: '/projeler' } 
}
export const revalidate = 60

const hardcodedFallbacks: Record<string, any> = {
    'bisinif': {
        title: 'BiSınıf — Sınav Analiz Platformu',
        cat: 'EdTech',
        status: 'Canlı',
        summary: 'Okullar ve öğretmenler için sınav verisini daha anlaşılır hale getiren analiz odaklı bir sistem.',
        problem: 'Sınav sonuçları çoğu zaman ham veri olarak kalıyor. Öğretmenler ve yöneticiler veriyi hızlıca yorumlayamıyor.',
        solution: 'BiSınıf, sınav sonuçlarını anlamlı raporlara ve görsel analizlere dönüştürerek karar sürecini kolaylaştırmayı hedefleyen bir platform yapısı sunar.',
        technology: ['Next.js', 'TypeScript', 'Sanity', 'Tailwind', 'Data visualization components'],
        result: 'Sınav verisinin daha hızlı yorumlanması, öğrenci performansının daha net görülmesi ve öğretmen için daha sade bir karar destek akışı.'
    },
    'vakithane': {
        title: 'VakitHane — Zaman ve Düzen Aracı',
        cat: 'Verimlilik',
        status: 'Demo',
        summary: 'Günlük planlama ve kişisel düzeni daha görünür hale getirmeyi amaçlayan bir verimlilik aracı.',
        problem: 'Günlük işler dağınık ilerliyor ve zaman kullanımı net şekilde takip edilemiyor.',
        solution: 'VakitHane, zaman planlamasını sadeleştiren ve günlük akışı daha görünür hale getiren bir yapı sunar.',
        technology: ['Next.js', 'TypeScript', 'UI components', 'Productivity logic'],
        result: 'Kullanıcının zaman yönetimini daha net görmesi ve kişisel düzenini daha sürdürülebilir hale getirmesi hedeflenir.'
    },
    'volo': {
        title: 'VOLO — Konuşma Odaklı Dil Pratiği',
        cat: 'Dil Eğitimi',
        status: 'Demo / Konsept',
        summary: 'Dil öğreniminde konuşma pratiğini merkeze alan AI destekli bir ürün yaklaşımı.',
        problem: 'Dil öğrenen kullanıcılar çoğu zaman konuşma pratiği yapmadan ilerliyor ve özgüven geliştiremiyor.',
        solution: 'VOLO, konuşma üretimini merkeze alarak kullanıcıyı daha aktif ve akıcı bir pratik sürecine yönlendirmeyi amaçlar.',
        technology: ['Next.js', 'AI-assisted logic', 'Speech workflow concept', 'Product design system'],
        result: 'Konuşma pratiğinin daha erişilebilir ve düzenli hale gelmesi hedeflenir.'
    },
    'optik-motor': {
        title: 'Optik Motor',
        cat: 'Altyapı',
        status: 'Konsept',
        summary: 'Yüksek doğruluklu otomatik tarama altyapısı ve işleme modülü.',
        problem: 'Standart süreçlerde yaşanan yavaşlıklar, iş süreçlerinin ve veri analizinin manuel ve külfetli hale gelmesi.',
        solution: 'Kurumun temel ihtiyacını karşılayan, hızlı tepki veren ve sadeleştirilmiş bir altyapı tasarımı.',
        technology: ['Python', 'Computer Vision', 'Next.js', 'Node.js'],
        result: 'Saniyeler içinde verinin sisteme entegre edilebilmesi ve operasyonel hızda artış.'
    }
}

export default async function ProjectsPage() {
    let fetchedProjects: Project[] = await client.fetch(listProjectsQuery).catch(() => [])

    let mergedProjects = [...fetchedProjects]
    const slugsToAdd = ['bisinif', 'optik-motor', 'vakithane', 'volo']

    slugsToAdd.forEach(slug => {
        if (!mergedProjects.find(p => p.slug.current === slug)) {
            const h = hardcodedFallbacks[slug]
            mergedProjects.push({
                _id: `fallback-${slug}`,
                slug: { current: slug, _type: 'slug' },
                title: h.title,
                category: { title: h.cat, _type: 'reference', _ref: 'ref', _id: 'ref', _createdAt: '', _updatedAt: '', _rev: '' } as any,
                summary: h.summary,
                coverImage: undefined as any,
                publishedAt: new Date().toISOString(),
                techStack: h.technology || [],
                results: [] as any,
                featured: false
            } as unknown as Project)
        }
    })

    mergedProjects.sort((a, b) => {
        const iA = slugsToAdd.indexOf(a.slug.current)
        const iB = slugsToAdd.indexOf(b.slug.current)
        const posA = iA === -1 ? 999 : iA
        const posB = iB === -1 ? 999 : iB
        return posA - posB
    })

    return (
        <section className="section-glow relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36" data-glow="pink">
            <div className="section-shell">
                <AnimatedSection className="max-w-4xl">
                    <SectionHeader 
                        eyebrow="Örnek Sistemler" 
                        title="Projeler"
                        subtitle="Gerçek problemlere üretilen gerçek sistemler. Ham veriyi değere, karmaşayı sade arayüzlere dönüştüren ölçülebilir ve veri odaklı yaklaşımlar." 
                    />
                </AnimatedSection>

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-12">
                    {mergedProjects.map(p => {
                        const fb = hardcodedFallbacks[p.slug.current]

                        const pTitle = fb ? fb.title : p.title
                        const pSummary = fb && !p.summary ? fb.summary : p.summary
                        const pProblem = fb ? fb.problem : 'Süreç yönetimi darboğazları.'
                        const pSolution = fb ? fb.solution : 'Sade ve entegre sistem mimarisi.'
                        const pResult = fb ? fb.result : 'Operasyonel hızda net artış.'
                        const pTech = fb ? fb.technology : (p.techStack || ['Next.js', 'Sanity', 'Tailwind'])
                        const pStatus = fb ? fb.status : 'Canlı'

                        const statusStyle = pStatus === 'Canlı' 
                            ? 'bg-emerald-500/10 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.1)] border border-emerald-500/20' 
                            : pStatus === 'Demo' || pStatus === 'Demo / Konsept'
                            ? 'bg-blue-500/10 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.1)] border border-blue-500/20'
                            : 'bg-surface-variant/80 text-subtle border border-card-border/50'

                        return (
                            <StaggerItem key={p._id}>
                                <div className="glass glass-interactive border-beam p-6 h-full flex flex-col relative z-0 group rounded-3xl">
                                    <div className="absolute top-10 right-10 z-10 flex gap-2">
                                        <span className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold tracking-[0.15em] uppercase backdrop-blur-md ${statusStyle}`}>
                                            {pStatus}
                                        </span>
                                    </div>
                                    <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-8 bg-surface/50 relative shrink-0 border border-card-border/50">
                                        {p.coverImage ? (
                                            <Image 
                                                src={urlForImage(p.coverImage)?.url() as string} 
                                                alt={pTitle} 
                                                fill 
                                                className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" 
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-surface to-surface-variant flex items-center justify-center p-6 text-center">
                                                <span className="text-subtle font-bold text-xs tracking-[0.2em] uppercase leading-relaxed text-balance">{pTitle} <br/><br/> Sistem Görseli</span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="flex-grow flex flex-col">
                                        <div className="mb-8 pr-16">
                                            {p.category?.title && <span className="text-[10px] text-accent mb-3 uppercase tracking-[0.2em] font-bold block">{p.category.title}</span>}
                                            <h3 className="text-xl font-bold text-fg mb-3">{pTitle}</h3>
                                            <p className="text-sm text-muted leading-relaxed line-clamp-3">{pSummary}</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 pt-6 border-t border-card-border/40 flex-grow">
                                            <div>
                                                <span className="text-[10px] text-subtle uppercase tracking-[0.15em] font-bold block mb-1.5">Problem</span>
                                                <p className="text-xs text-muted/90 leading-relaxed max-w-sm line-clamp-3">{pProblem}</p>
                                            </div>
                                            <div>
                                                <span className="text-[10px] text-subtle uppercase tracking-[0.15em] font-bold block mb-1.5">Çözüm</span>
                                                <p className="text-xs text-muted/90 leading-relaxed max-w-sm line-clamp-3">{pSolution}</p>
                                            </div>
                                            <div className="mb-2">
                                                <span className="text-[10px] text-subtle uppercase tracking-[0.15em] font-bold block mb-1.5">Sonuç</span>
                                                <p className="text-xs text-accent/90 font-medium leading-relaxed max-w-sm line-clamp-2">{pResult}</p>
                                            </div>
                                            <div className="mt-auto pt-2">
                                                <span className="text-[10px] text-subtle uppercase tracking-[0.15em] font-bold block mb-2.5">Teknoloji</span>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {(pTech as string[]).map((t: string, i: number) => (
                                                        <span key={i} className="px-2 py-1 bg-surface-variant/40 text-muted rounded-md text-[10px] font-medium border border-card-border/30 backdrop-blur-md">{t}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-card-border/60">
                                            <Link href={`/projeler/${p.slug.current}`} className="w-full flex items-center justify-between group/btn text-sm font-semibold text-fg hover:text-accent transition-colors">
                                                <span>Sistemi İncele</span>
                                                <div className="w-8 h-8 rounded-full bg-surface-variant/50 border border-card-border flex items-center justify-center group-hover/btn:bg-accent/10 transition-colors">
                                                    <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </StaggerItem>
                        )
                    })}
                </StaggerChildren>
            </div>
        </section>
    )
}
