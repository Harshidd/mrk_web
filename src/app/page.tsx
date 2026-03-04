import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle2, FileCode2, Layers, BookOpen } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import {
  getSettingsQuery, listCategoriesQuery, listProjectsQuery,
  listToolsQuery, listPostsQuery,
} from '@/lib/sanity/queries'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { SectionHeader } from '@/components/SectionHeader'
import { DashboardMock, CodePanel, MetricStrip, WorkflowStrip } from '@/components/TechShowcase'
import { urlForImage } from '@/lib/sanity/image'
import type { SiteSettings, SolutionCategory, Project, Tool, Post } from '@/types/content'

export const revalidate = 60

export default async function Home() {
  const [settings, categories, projects, tools, posts] = await Promise.all([
    client.fetch<SiteSettings>(getSettingsQuery).catch(() => null),
    client.fetch<SolutionCategory[]>(listCategoriesQuery).catch(() => []),
    client.fetch<Project[]>(listProjectsQuery).catch(() => []),
    client.fetch<Tool[]>(listToolsQuery).catch(() => []),
    client.fetch<Post[]>(listPostsQuery).catch(() => []),
  ])

  const homeProjects = (projects.filter(p => p.featured).length >= 2
    ? projects.filter(p => p.featured) : projects).slice(0, 4)
  const homeTools = tools.slice(0, 3)
  const homePosts = posts.slice(0, 3)

  return (
    <>
      {/* ═══════ S0: HERO (copy LEFT, DashboardMock RIGHT) — glow: blue ═══════ */}
      <section className="section-glow relative z-[1] pt-40 pb-28 lg:pt-48 lg:pb-36" data-glow="blue">
        <div className="section-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <AnimatedSection>
              <div className="badge-pill mb-8">
                <span className="badge-dot" />
                Eğitim + Yapay Zekâ
              </div>
              <h1 className="text-4xl md:text-[3.5rem] lg:text-[4rem] font-bold tracking-[-0.035em] text-fg leading-[1.04] mb-8">
                {settings?.homeHero?.headline || 'Eğitim ve yapay zekâ odaklı sistemler'}
              </h1>
              <p className="text-lg md:text-xl text-muted leading-relaxed mb-12 max-w-lg">
                {settings?.homeHero?.subheadline || 'Eğitim kurumlarında karşılaşılan karmaşayı sadeleştiren, veriye dayalı ve gerçekten işe yarayan dijital çözümler.'}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href={settings?.homeHero?.primaryCtaUrl || '/projeler'} className="btn-glow px-8 py-4 text-sm">
                  {settings?.homeHero?.primaryCtaLabel || 'Projeleri İncele'}
                </Link>
                <Link href={settings?.homeHero?.secondaryCtaUrl || '/iletisim'} className="btn-ghost group text-sm">
                  {settings?.homeHero?.secondaryCtaLabel || 'İletişime Geç'}
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>

            <div className="relative">
              <DashboardMock />
              <div className="absolute -bottom-6 -left-4 glass p-3.5 px-5 hidden lg:flex items-center gap-3" style={{ borderRadius: 16 }}>
                <div className="w-9 h-9 rounded-full icon-halo flex items-center justify-center text-accent">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-fg">324 sınav tarandı</p>
                  <p className="text-[10px] text-subtle">son 7 gün</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ S1: Eğitim Teknolojileri (copy LEFT, CodePanel RIGHT) — glow: teal ═══════ */}
      <section className="section-glow relative z-[1] py-28 lg:py-36" data-glow="teal">
        <div className="section-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <AnimatedSection>
              <SectionHeader
                eyebrow="Uzmanlık"
                title="Eğitim Teknolojileri"
                subtitle="Sınavlardan veri toplama, bu veriyi anlamlı raporlara dönüştürme ve öğrenci gelişimini izlenebilir kılma."
              />
              <div className="space-y-4 mb-10">
                {(categories.length > 0
                  ? categories.slice(0, 3).map(c => ({ title: c.title, desc: c.shortSummary }))
                  : [
                    { title: 'Optik Okuma Sistemleri', desc: 'Sınav kâğıtlarını otomatik tarama ve değerlendirme' },
                    { title: 'Öğrenci Performans Analizi', desc: 'Bireysel ve sınıf bazlı gelişim izleme' },
                    { title: 'Otomatik Raporlama', desc: 'Kurum ve veli raporlarını tek tıkla oluşturma' },
                  ]
                ).map((item, i) => (
                  <div key={i} className="glass glass-interactive border-beam p-5 flex items-center gap-5 mt-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      {i === 0 ? <BookOpen size={20} /> : i === 1 ? <Layers size={20} /> : <FileCode2 size={20} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-fg mb-0.5">{item.title}</h3>
                      <p className="text-[13px] text-muted truncate">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/uzmanlik" className="btn-ghost group text-sm">
                Detayları incele <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <CodePanel />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ S2: Araçlar (showcase LEFT, copy RIGHT) — glow: violet — ZIGZAG ═══════ */}
      <section className="section-glow relative z-[1] py-28 lg:py-36" data-glow="violet">
        <div className="section-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <AnimatedSection delay={0.15} className="lg:order-2">
              <SectionHeader
                eyebrow="Araçlar"
                title="Öğretmen ve Geliştirici Araçları"
                subtitle="Günlük operasyonları hızlandıran, tek bir işi iyi yapan, odaklı ve pratik araçlar."
              />
              <div className="space-y-3 mb-10">
                {(homeTools.length > 0
                  ? homeTools.map(t => ({ title: t.title, desc: t.summary, status: t.status }))
                  : [
                    { title: 'Sınav Şablonu Oluşturucu', desc: 'Optik okumaya uygun sınav kâğıtları', status: 'Active' as const },
                    { title: 'Not Dönüştürücü', desc: 'Ham puanları farklı ölçeklere çevirin', status: 'Active' as const },
                    { title: 'Dijital Rubrik Editörü', desc: 'Performans değerlendirme kriterleri', status: 'ComingSoon' as const },
                  ]
                ).map((item, i) => (
                  <div key={i} className="glass glass-interactive border-beam p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                      {i === 0 ? <FileCode2 size={18} /> : i === 1 ? <Layers size={18} /> : <BookOpen size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="text-sm font-semibold text-fg truncate">{item.title}</h3>
                        <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-semibold shrink-0 ml-2 ${item.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-surface text-subtle border border-card-border'}`}>
                          {item.status === 'Active' ? 'Aktif' : 'Yakında'}
                        </span>
                      </div>
                      <p className="text-xs text-muted truncate">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/araclar" className="btn-ghost group text-sm">
                Tümünü gör <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.1} className="lg:order-1 space-y-5">
              <MetricStrip />
              <WorkflowStrip />
            </AnimatedSection>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ S3: Projeler (bento grid) — glow: pink ═══════ */}
      <section className="section-glow relative z-[1] py-28 lg:py-36" data-glow="pink">
        <div className="section-shell">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Projeler" title="Projeler"
              subtitle="Gerçek problemlerden doğan, sahada test edilmiş dijital sistemler."
              action={<Link href="/projeler" className="btn-ghost group text-sm">Tüm projeler <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" /></Link>}
            />
          </AnimatedSection>

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(homeProjects.length > 0
              ? homeProjects.map(p => ({
                id: p._id, title: p.title, cat: p.category?.title || '', summary: p.summary,
                slug: p.slug.current, image: p.coverImage, real: true,
              }))
              : [
                { id: '1', title: 'BiSınıf — Sınav Analiz Platformu', cat: 'EdTech', summary: 'Optik okuma tabanlı sınav analiz ve raporlama sistemi.', slug: '', image: null, real: false },
                { id: '2', title: 'Optik Okuma Motoru', cat: 'Altyapı', summary: 'Yüksek doğruluklu otomatik tarama altyapısı.', slug: '', image: null, real: false },
                { id: '3', title: 'Kurum Raporlama Paneli', cat: 'Analitik', summary: 'Kurum genelinde performans izleme ve raporlama.', slug: '', image: null, real: false },
                { id: '4', title: 'Veli Bilgilendirme Sistemi', cat: 'İletişim', summary: 'Otomatik veli raporu ve bildirim altyapısı.', slug: '', image: null, real: false },
              ]
            ).map(p => (
              <StaggerItem key={p.id}>
                {p.real ? (
                  <Link href={`/projeler/${p.slug}`} className="group block h-full">
                    <div className="glass glass-interactive border-beam p-5 h-full flex flex-col">
                      <div className="aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-surface/50 relative">
                        {p.image && <Image src={urlForImage(p.image)?.url() as string} alt={p.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-500" />}
                      </div>
                      <span className="text-[10px] text-accent font-bold tracking-[0.12em] mb-2 uppercase">{p.cat}</span>
                      <h3 className="text-base font-semibold text-fg mb-2">{p.title}</h3>
                      <p className="text-sm text-muted line-clamp-2 flex-1">{p.summary}</p>
                      <div className="text-xs text-subtle mt-6 pt-4 border-t border-card-border flex items-center justify-between group-hover:text-muted transition-colors">
                        Detayları gör <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ) : (
                  /* Premium skeleton state — compact, not giant blank */
                  <div className="glass p-5 h-full flex flex-col">
                    <div className="aspect-[16/10] rounded-xl mb-5 bg-surface/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-surface/70 skeleton" />
                    </div>
                    <span className="text-[10px] text-accent font-bold tracking-[0.12em] mb-2 uppercase">{p.cat}</span>
                    <h3 className="text-base font-semibold text-fg mb-2">{p.title}</h3>
                    <div className="space-y-1.5 flex-1">
                      <div className="skeleton h-3 w-full" />
                      <div className="skeleton h-3 w-3/4" />
                    </div>
                    <div className="text-xs text-subtle mt-6 pt-4 border-t border-card-border">Detayları gör</div>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ S4: Yazılar — glow: amber ═══════ */}
      <section className="section-glow relative z-[1] py-28 lg:py-36" data-glow="amber">
        <div className="section-shell">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Blog" title="Yazılar"
              subtitle="Eğitim teknolojileri, yapay zekâ ve dijital süreçler üzerine içgörüler."
              action={<Link href="/yazilar" className="btn-ghost group text-sm">Tümünü oku <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" /></Link>}
            />
          </AnimatedSection>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(homePosts.length > 0
              ? homePosts.map(p => ({
                id: p._id, title: p.title, cat: p.category.replace('_', ' '),
                excerpt: p.excerpt, slug: p.slug.current,
                date: new Date(p.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
                time: p.readingTime, real: true,
              }))
              : [
                { id: '1', title: 'Eğitimde yapay zekâ: Nereden başlamalı?', cat: 'AI Strategy', excerpt: 'Yapay zekâ araçlarının eğitime entegrasyonu için pratik bir yol haritası.', slug: '', date: '', time: 5, real: false },
                { id: '2', title: 'Optik okuma sistemlerinin evrimi', cat: 'Digital Efficiency', excerpt: 'Kâğıttan dijitale geçiş sürecinde optik okuma teknolojilerinin gelişimi.', slug: '', date: '', time: 4, real: false },
                { id: '3', title: "BiSınıf'ın gelişim hikâyesi", cat: 'Build in Public', excerpt: 'Bir fikrin ürüne dönüşme serüveni ve öğrenilen dersler.', slug: '', date: '', time: 6, real: false },
              ]
            ).map(p => (
              <StaggerItem key={p.id}>
                {p.real ? (
                  <Link href={`/yazilar/${p.slug}`} className="group block h-full">
                    <div className="glass glass-interactive border-beam p-7 h-full flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-accent mb-3 block uppercase tracking-[0.15em] font-bold">{p.cat}</span>
                        <h3 className="text-base font-semibold text-fg mb-3 group-hover:text-accent transition-colors leading-snug">{p.title}</h3>
                        <p className="text-sm text-muted line-clamp-3 leading-relaxed">{p.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-subtle pt-4 mt-6 border-t border-card-border">
                        <span>{p.date}</span>
                        {p.time ? <span>{p.time} dk</span> : null}
                      </div>
                    </div>
                  </Link>
                ) : (
                  /* Premium skeleton — shows real title + excerpt placeholder, not blank */
                  <div className="glass p-7 h-full flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-accent mb-3 block uppercase tracking-[0.15em] font-bold">{p.cat}</span>
                      <h3 className="text-base font-semibold text-fg mb-3 leading-snug">{p.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{p.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-subtle pt-4 mt-6 border-t border-card-border">
                      <span className="skeleton h-3 w-20" />
                      <span>{p.time} dk</span>
                    </div>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ FINAL CTA ═══════ */}
      <section className="relative z-[1] py-28 lg:py-36">
        <div className="section-shell">
          <AnimatedSection>
            <div className="glass p-14 md:p-20 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-[2.75rem] font-bold tracking-[-0.03em] text-fg mb-7 leading-tight">
                Bir fikriniz varsa konuşalım.
              </h2>
              <p className="text-muted mb-10 max-w-md mx-auto leading-relaxed">
                Dijital mimari, eğitim teknolojileri veya yapay zekâ projeleri hakkında sohbet etmek isterseniz.
              </p>
              <Link href="/iletisim" className="btn-glow px-12 py-4 text-sm">
                İletişime Geç
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
