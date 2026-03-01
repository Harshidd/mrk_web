import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { getSettingsQuery } from '@/lib/sanity/queries'
import { SiteSettings } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { DynamicIcon } from '@/components/DynamicIcon'
import { Blocks } from '@/components/Blocks'

export const metadata: Metadata = {
    title: 'Hakkımda',
    description: 'Eğitim ve yapay zekâ odaklı dijital sistem geliştiricisi.',
    alternates: { canonical: '/hakkimda' },
}

export const revalidate = 60

export default async function AboutPage() {
    const settings: SiteSettings | null = await client.fetch(getSettingsQuery).catch(() => null)
    const about = settings?.about

    if (!about) {
        return <div className="py-24 text-center text-text-muted card mt-12 max-w-[1200px] mx-auto px-6">İçerik yakında.</div>
    }

    return (
        <section className="section-white py-24 lg:py-32 px-6">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-24">
                <AnimatedSection className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary mb-8 leading-tight">
                        {about.headline || 'Eğitim ve teknoloji arasında köprü kurmak'}
                    </h1>
                    {about.body && (
                        <div className="text-lg text-text-secondary leading-relaxed max-w-3xl">
                            <Blocks value={about.body} />
                        </div>
                    )}
                </AnimatedSection>

                {about.howIWorkSteps && about.howIWorkSteps.length > 0 && (
                    <AnimatedSection>
                        <h2 className="text-2xl font-semibold tracking-tight text-text-primary mb-10">Nasıl çalışıyorum?</h2>
                        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {about.howIWorkSteps.map((step, idx) => (
                                <StaggerItem key={idx}>
                                    <div className="card p-8 h-full">
                                        <span className="text-3xl font-light text-accent/30 block mb-5">{String(idx + 1).padStart(2, '0')}</span>
                                        <h3 className="text-lg font-medium text-text-primary mb-3">{step.title}</h3>
                                        <p className="text-sm text-text-secondary leading-relaxed">{step.text}</p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerChildren>
                    </AnimatedSection>
                )}

                {about.values && about.values.length > 0 && (
                    <AnimatedSection>
                        <h2 className="text-2xl font-semibold tracking-tight text-text-primary mb-10">Çekirdek değerler</h2>
                        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl">
                            {about.values.map((val, idx) => (
                                <StaggerItem key={idx}>
                                    <div className="card p-6 h-full flex gap-5 items-start">
                                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                                            <DynamicIcon name={val.icon || 'CheckCircle'} />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-medium text-text-primary mb-2">{val.title}</h3>
                                            <p className="text-sm text-text-secondary leading-relaxed">{val.text}</p>
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerChildren>
                    </AnimatedSection>
                )}

                <AnimatedSection className="pt-12 text-center max-w-2xl mx-auto border-t border-border">
                    <h2 className="text-3xl font-semibold tracking-tight text-text-primary mb-6">Bir fikriniz varsa konuşalım.</h2>
                    <Link
                        href="/iletisim"
                        className="inline-flex px-8 py-3 bg-dark-band text-white font-semibold rounded-full hover:bg-dark-band/90 hover:shadow-lg transition-all text-sm"
                    >
                        İletişime Geç <ArrowRight size={16} className="ml-2" />
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    )
}
