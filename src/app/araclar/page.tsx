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
    title: 'Araçlar',
    description: 'Öğretmenler, geliştiriciler ve dijital üretim süreçleri için hazırlanan araçlar.',
}
export const revalidate = 60

const fallbackTools = [
    { 
        _id: 'ft-1', 
        slug: { current: 'sinav-sablonu' },
        title: 'Sınav Şablonu Oluşturucu', 
        summary: 'Optik okumaya uygun sınav kağıtları hazırlamayı kolaylaştıran yardımcı araç.',
        status: 'Aktif',
        tags: ['Öğretmen', 'PDF']
    },
    { 
        _id: 'ft-2', 
        slug: { current: 'not-donusturucu' },
        title: 'Not Dönüştürücü', 
        summary: 'Ham puanları farklı ölçeklere ve yüzdelik dilimlere dönüştürmeye yardımcı araç.',
        status: 'Aktif',
        tags: ['Öğretmen', 'Verimlilik']
    },
    { 
        _id: 'ft-3', 
        slug: { current: 'rubrik-editoru' },
        title: 'Dijital Rubrik Editörü', 
        summary: 'Performans değerlendirme kriterleri oluşturmayı kolaylaştıran dijital rubrik aracı.',
        status: 'Yakında',
        tags: ['Öğretmen', 'AI']
    },
    { 
        _id: 'ft-4', 
        slug: { current: 'pdf-excel' },
        title: 'PDF / Excel Yardımcıları', 
        summary: 'Belge düzenleme, veri dışa aktarma ve temel raporlama süreçlerini hızlandıran mini araçlar.',
        status: 'Aktif',
        tags: ['Verimlilik', 'PDF']
    },
    { 
        _id: 'ft-5', 
        slug: { current: 'snippet-araclari' },
        title: 'Snippet Yardımcıları', 
        summary: 'Tekrarlanan geliştirme işlerini hızlandırmak için hazır küçük kod parçaları ve yardımcı araçlar.',
        status: 'Aktif',
        tags: ['Geliştirici', 'BTY']
    },
    { 
        _id: 'ft-6', 
        slug: { current: 'prompt-araclari' },
        title: 'Prompt Yardımcıları', 
        summary: 'Yapay zekâ araçları için daha düzenli ve etkili prompt üretimini destekleyen yardımcı yapı.',
        status: 'Aktif',
        tags: ['AI', 'Verimlilik']
    }
]

export default async function ToolsPage() {
    let rawTools: Tool[] = await client.fetch(listToolsQuery).catch(() => [])
    const tools = rawTools && rawTools.length > 0 ? rawTools : fallbackTools

    return (
        <section className="section-glow relative z-[1] pt-40 pb-28 lg:pt-48 lg:pb-36" data-glow="violet">
            <div className="section-shell">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20 lg:mb-28">
                    <AnimatedSection className="lg:order-2">
                        <div className="eyebrow">Mini Sistemler</div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-[-0.035em] text-fg mb-7 leading-[1.06]">Araçlar</h1>
                        <p className="text-lg text-muted leading-relaxed max-w-lg mb-8">
                            Öğretmenler, geliştiriciler ve dijital üretim süreçleri için hazırlanan küçük ama işlevli araçlar. Bu alanda sınav şablonları, not dönüştürücüler, rubrik editörleri, PDF/Excel yardımcıları, snippet araçları ve prompt destekleri gibi pratik çözümler yer alır.
                        </p>
                    </AnimatedSection>
                    <AnimatedSection delay={0.2} className="lg:order-1">
                        <WorkflowStrip />
                    </AnimatedSection>
                </div>

                <div className="section-divider mb-20" />

                <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tools.map((tool: any) => {
                        const isFallback = tool._id.startsWith('ft-')
                        const currentTags = isFallback ? tool.tags : (tool.tags || [tool.category?.title || 'Araç'])
                        const isActive = tool.status === 'Aktif' || tool.status === 'Active'

                        // Dynamic icon assigner based on text matching for aesthetics
                        let iconName = 'Wrench'
                        if (tool.title.includes('Sınav') || tool.title.includes('Not')) iconName = 'BookOpen'
                        if (tool.title.includes('PDF') || tool.title.includes('Excel')) iconName = 'FileText'
                        if (tool.title.includes('Snippet') || tool.title.includes('Geliştirici')) iconName = 'Code2'
                        if (tool.title.includes('Prompt') || tool.title.includes('AI') || tool.title.includes('Rubrik')) iconName = 'Sparkles'

                        return (
                            <StaggerItem key={tool._id}>
                                <div className="group block h-full">
                                    <div className="glass glass-interactive border-beam p-7 h-full flex flex-col relative rounded-3xl cursor-pointer">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="w-11 h-11 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
                                                <DynamicIcon name={iconName} />
                                            </div>
                                            <div className="flex items-center gap-1.5 flex-wrap justify-end">
                                                {currentTags.slice(0, 2).map((t: string) => (
                                                    <span key={t} className="text-[9px] px-2 py-1 rounded-md bg-surface border border-card-border text-subtle font-bold tracking-widest uppercase">
                                                        {t}
                                                    </span>
                                                ))}
                                                <span className={`text-[9px] px-2 py-1 rounded-md font-bold tracking-widest uppercase ml-1 ${isActive
                                                    ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                                    : 'bg-surface text-subtle border border-card-border'
                                                    }`}>
                                                    {isActive ? 'Aktif' : 'Yakında'}
                                                </span>
                                            </div>
                                        </div>
                                        <h3 className="text-[17px] font-bold text-fg mb-3 leading-snug">{tool.title}</h3>
                                        <p className="text-sm text-muted leading-relaxed flex-1">{tool.summary}</p>
                                        <div className="mt-8 pt-5 border-t border-card-border/60 flex items-center justify-between text-xs text-subtle group-hover:text-fg transition-colors">
                                            <span className="font-semibold text-fg">Aracı İncele</span>
                                            {tool.demoUrl
                                                ? <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                : <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                            }
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
