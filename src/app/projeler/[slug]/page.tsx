import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronRight, ExternalLink, MoveRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { getProjectBySlugQuery, listProjectsQuery } from '@/lib/sanity/queries'
import { Project } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { Blocks } from '@/components/Blocks'
import { urlForImage } from '@/lib/sanity/image'

export const revalidate = 60

export async function generateStaticParams() {
    const ps: Project[] = await client.fetch(listProjectsQuery).catch(() => [])
    const slugs = ps.map(p => ({ slug: p.slug.current }))
    // pre-render known fallback slugs
    ;['bisinif', 'optik-motor', 'vakithane', 'volo'].forEach(s => {
        if (!slugs.find(x => x.slug === s)) slugs.push({ slug: s })
    })
    return slugs
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const d: Project | null = await client.fetch(getProjectBySlugQuery, { slug })
    if (!d) return {}
    return { title: d.title, description: d.summary, alternates: { canonical: `/projeler/${d.slug.current}` } }
}

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

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    let project: Project | null = await client.fetch(getProjectBySlugQuery, { slug })
    
    const isFallback = Object.keys(hardcodedFallbacks).includes(slug)
    
    if (!project && !isFallback) notFound()

    const fb = hardcodedFallbacks[slug] || {}

    const p = project || {
        title: fb.title,
        slug: { current: slug },
        summary: fb.summary,
        category: { title: fb.cat }
    } as any

    const pTitle = Object.keys(fb).length > 0 ? fb.title : p.title
    const pSummary = Object.keys(fb).length > 0 && !p.summary ? fb.summary : p.summary
    const pProblem = Object.keys(fb).length > 0 ? fb.problem : 'Standart süreçlerde yaşanan karmaşalar.'
    const pSolution = Object.keys(fb).length > 0 ? fb.solution : 'Sade bir dijital mimari.'
    const pResult = Object.keys(fb).length > 0 ? fb.result : 'Verimlilik artışı ve kullanım kolaylığı.'
    const pTech = Object.keys(fb).length > 0 ? fb.technology : (p.techStack || ['Modern Altyapı', 'MUI'])
    const pStatus = Object.keys(fb).length > 0 ? fb.status : 'Canlı'

    const hasProblemBlocks = p.problem && Array.isArray(p.problem) && p.problem.length > 0
    const hasSolutionBlocks = p.solution && Array.isArray(p.solution) && p.solution.length > 0

    const statusStyle = pStatus === 'Canlı' 
        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
        : pStatus === 'Demo' || pStatus === 'Demo / Konsept'
        ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
        : 'bg-surface-variant/80 text-subtle border-card-border/50'

    return (
        <section className="relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36">
            <article className="section-shell">
                
                {/* SECTION 1 — Overview */}
                <AnimatedSection className="pb-12 border-b border-card-border/40 mb-12">
                    <div className="flex items-center gap-2 text-sm text-subtle mb-10 font-medium">
                        <Link href="/projeler" className="hover:text-fg transition-colors">Projeler</Link>
                        <ChevronRight size={14} className="opacity-50" />
                        <span className="text-fg">{pTitle}</span>
                    </div>
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-4 mb-5">
                            {p.category?.title && <span className="text-accent font-bold text-xs tracking-[0.2em] uppercase block">{p.category.title}</span>}
                            <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold tracking-[0.15em] uppercase border ${statusStyle}`}>{pStatus}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-fg mb-8 leading-[1.15]">{pTitle}</h1>
                        <p className="text-xl md:text-2xl text-muted leading-relaxed max-w-3xl">{pSummary}</p>
                    </div>
                </AnimatedSection>

                {p.coverImage ? (
                    <AnimatedSection delay={0.15} className="w-full aspect-[16/10] md:aspect-[21/9] relative rounded-[2rem] overflow-hidden bg-surface/50 mb-20 border border-card-border/60">
                        <Image src={urlForImage(p.coverImage)?.url() as string} alt={pTitle} fill className="object-cover" priority />
                    </AnimatedSection>
                ) : (
                    <AnimatedSection delay={0.15} className="w-full aspect-[16/10] md:aspect-[21/9] relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-surface to-surface-variant/40 mb-20 border border-card-border/60 flex flex-col items-center justify-center p-8 text-center ring-1 ring-white/5 shadow-2xl">
                        <span className="text-accent/80 font-bold tracking-[0.25em] text-sm uppercase mb-3 text-balance">Mimarİ Görsel</span>
                        <h2 className="text-fg/50 font-medium text-lg md:text-2xl">{pTitle}</h2>
                    </AnimatedSection>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
                    <div className="lg:col-span-8">
                        <StaggerChildren className="flex flex-col gap-24">
                            
                            {/* SECTION 2 — Problem */}
                            <StaggerItem>
                                <div className="relative">
                                    <h2 className="text-[11px] font-bold tracking-[0.2em] text-accent uppercase mb-8 flex items-center gap-4">
                                        <span className="w-8 h-[1px] bg-accent/40 block"></span> 01 — Gerçek Problem
                                    </h2>
                                    <div className="text-fg text-lg md:text-xl leading-relaxed font-medium bg-surface/30 p-8 rounded-3xl border border-card-border/40 backdrop-blur-sm shadow-sm ring-1 ring-white/5">
                                        {hasProblemBlocks ? <Blocks value={p.problem} /> : <p className="text-muted/90">{pProblem}</p>}
                                    </div>
                                </div>
                            </StaggerItem>

                            {/* SECTION 3 — Solution */}
                            <StaggerItem>
                                <div className="relative">
                                    <h2 className="text-[11px] font-bold tracking-[0.2em] text-fg/70 uppercase mb-8 flex items-center gap-4">
                                        <span className="w-8 h-[1px] bg-card-border block"></span> 02 — Sade Sİstem (Çözüm)
                                    </h2>
                                    <div className="text-fg text-lg md:text-xl leading-relaxed">
                                        {hasSolutionBlocks ? <Blocks value={p.solution} /> : <p className="text-muted/90 max-w-3xl">{pSolution}</p>}
                                    </div>
                                </div>
                            </StaggerItem>

                            {/* SECTION 6 — Screens / Gallery */}
                            <StaggerItem>
                                <h2 className="text-[11px] font-bold tracking-[0.2em] text-fg/70 uppercase mb-8 flex items-center gap-4">
                                    <span className="w-8 h-[1px] bg-card-border block"></span> 03 — Arayüz & Mimari
                                </h2>
                                {p.gallery && p.gallery.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {p.gallery.map((img: any, i: number) => (
                                            <div key={i} className="aspect-[4/3] relative rounded-3xl overflow-hidden bg-surface border border-card-border ring-1 ring-white/5 shadow-lg">
                                                <Image src={urlForImage(img)?.url() as string} alt={`${pTitle} Ekran ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-700 ease-out" />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="aspect-[4/3] relative rounded-3xl bg-surface/30 border border-card-border/50 flex flex-col items-center justify-center p-6 text-center ring-1 ring-white/5">
                                            <div className="w-12 h-12 bg-surface rounded-2xl mb-4 border border-card-border/50 shadow-sm flex items-center justify-center">
                                                <span className="block w-4 h-[2px] bg-subtle/40 rounded-full" />
                                            </div>
                                            <span className="text-subtle text-[10px] tracking-[0.2em] uppercase font-bold">Modül Arayüzü</span>
                                        </div>
                                        <div className="aspect-[4/3] relative rounded-3xl bg-surface/30 border border-card-border/50 flex flex-col items-center justify-center p-6 text-center ring-1 ring-white/5">
                                            <div className="w-12 h-12 bg-surface rounded-2xl mb-4 border border-card-border/50 shadow-sm flex flex-col gap-1 items-center justify-center">
                                               <span className="block w-4 h-[2px] bg-subtle/40 rounded-full" />
                                               <span className="block w-6 h-[2px] bg-subtle/30 rounded-full" />
                                            </div>
                                            <span className="text-subtle text-[10px] tracking-[0.2em] uppercase font-bold">Raporlama Paneli</span>
                                        </div>
                                    </div>
                                )}
                            </StaggerItem>
                        </StaggerChildren>
                    </div>

                    <AnimatedSection delay={0.25} className="lg:col-span-4">
                        <div className="glass p-8 md:p-10 rounded-[2rem] sticky top-32 space-y-12 border border-card-border/60 ring-1 ring-white/5 shadow-2xl">
                            
                            {/* SECTION 4 — Technology */}
                            <div>
                                <h3 className="text-[10px] font-bold text-subtle mb-5 uppercase tracking-[0.2em] flex items-center gap-3">
                                   Altyapı
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {pTech.map((t: string, i: number) => (
                                        <span key={i} className="px-3 py-1.5 bg-surface-variant/40 text-fg/90 border border-card-border/50 rounded-xl text-xs font-semibold backdrop-blur-md">{t}</span>
                                    ))}
                                </div>
                            </div>

                            {/* SECTION 5 — Result */}
                            <div className="pt-8 border-t border-card-border/40">
                                <h3 className="text-[10px] font-bold text-accent mb-6 uppercase tracking-[0.2em] flex items-center gap-3">
                                   Ölçülebilir Çıktı
                                </h3>
                                {p.results && p.results.length > 0 ? (
                                    <ul className="space-y-6">
                                        {p.results.map((r: any, i: number) => (
                                            <li key={i} className="flex flex-col">
                                                <span className="text-4xl font-bold tracking-tight text-fg mb-2">{r.value}</span>
                                                <span className="text-sm font-semibold text-accent mb-1">{r.label}</span>
                                                {r.note && <span className="text-xs text-muted/80 leading-relaxed max-w-[200px]">{r.note}</span>}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="text-sm text-fg/90 leading-relaxed font-medium">
                                        {pResult}
                                    </div>
                                )}
                            </div>

                            {/* SECTION 7 — CTA */}
                            <div className="pt-8 border-t border-card-border/40">
                                <Link href="/iletisim" className="group flex flex-col items-center justify-center gap-4 w-full p-8 bg-fg text-bg rounded-2xl hover:bg-accent hover:text-white transition-all duration-500 shadow-xl hover:shadow-accent/20">
                                    <span className="text-sm font-bold tracking-wide uppercase">Benzer bir sistemi konuşalım</span>
                                    <div className="w-10 h-10 rounded-full bg-bg/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                        <MoveRight size={18} />
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </AnimatedSection>
                </div>
            </article>
        </section>
    )
}
