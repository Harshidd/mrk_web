import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { getSettingsQuery } from '@/lib/sanity/queries'
import { SiteSettings } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { SectionHeader } from '@/components/SectionHeader'
import { DynamicIcon } from '@/components/DynamicIcon'
import { Blocks } from '@/components/Blocks'

export const metadata: Metadata = { title: 'Hakkımda', description: 'Eğitim ve yapay zekâ odaklı dijital sistem geliştiricisi.', alternates: { canonical: '/hakkimda' } }
export const revalidate = 60

export default async function AboutPage() {
    const settings: SiteSettings | null = await client.fetch(getSettingsQuery).catch(() => null)
    const about = settings?.about

    if (!about) return (
        <section className="relative z-[1] pt-36 pb-28"><div className="section-shell"><div className="glass p-14 text-center text-muted">İçerik yakında.</div></div></section>
    )

    return (
        <section className="relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36">
            <div className="section-shell flex flex-col gap-24">
                <AnimatedSection className="max-w-3xl">
                    <SectionHeader eyebrow="Hakkımda" title={about.headline || 'Eğitim ve teknoloji arasında köprü kurmak'} />
                    {about.body && <div className="text-lg text-muted leading-relaxed max-w-3xl"><Blocks value={about.body} /></div>}
                </AnimatedSection>

                {about.howIWorkSteps && about.howIWorkSteps.length > 0 && (
                    <AnimatedSection>
                        <h2 className="text-2xl font-bold tracking-tight text-fg mb-10">Nasıl çalışıyorum?</h2>
                        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {about.howIWorkSteps.map((step, i) => (
                                <StaggerItem key={i}>
                                    <div className="glass p-9 h-full">
                                        <span className="text-3xl font-light text-accent/30 block mb-5">{String(i + 1).padStart(2, '0')}</span>
                                        <h3 className="text-base font-semibold text-fg mb-3">{step.title}</h3>
                                        <p className="text-sm text-muted leading-relaxed">{step.text}</p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerChildren>
                    </AnimatedSection>
                )}

                {about.values && about.values.length > 0 && (
                    <AnimatedSection>
                        <h2 className="text-2xl font-bold tracking-tight text-fg mb-10">Çekirdek değerler</h2>
                        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
                            {about.values.map((v, i) => (
                                <StaggerItem key={i}>
                                    <div className="glass p-7 h-full flex gap-5 items-start">
                                        <div className="w-11 h-11 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                                            <DynamicIcon name={v.icon || 'CheckCircle'} />
                                        </div>
                                        <div><h3 className="text-sm font-semibold text-fg mb-2">{v.title}</h3><p className="text-sm text-muted leading-relaxed">{v.text}</p></div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerChildren>
                    </AnimatedSection>
                )}

                <AnimatedSection className="pt-10 text-center max-w-2xl mx-auto border-t border-card-border">
                    <h2 className="text-3xl font-bold tracking-tight text-fg mb-7">Bir fikriniz varsa konuşalım.</h2>
                    <Link href="/iletisim" className="btn-glow px-10 py-4 text-sm">İletişime Geç <ArrowRight size={16} className="ml-1" /></Link>
                </AnimatedSection>
            </div>
        </section>
    )
}
