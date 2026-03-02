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
      {/* ════════════ SECTION 1: HERO (split) ════════════ */}
      <section className="relative z-[1] pt-36 pb-24 lg:pt-44 lg:pb-32">
        <div className="section-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left — Copy */}
            <AnimatedSection>
              <div className="badge-pill mb-8">
                <span className="badge-dot" />
                Eğitim + Yapay Zekâ
              </div>
              <h1 className="text-4xl md:text-[3.25rem] lg:text-[3.75rem] font-bold tracking-tight text-fg leading-[1.06] mb-7">
                {settings?.homeHero?.headline || 'Eğitim ve yapay zekâ odaklı sistemler'}
              </h1>
              <p className="text-lg md:text-xl text-muted leading-relaxed mb-10 max-w-xl">
                {settings?.homeHero?.subheadline || 'Eğitim kurumlarında karşılaşılan karmaşayı sadeleştiren, veriye dayalı ve gerçekten işe yarayan dijital çözümler.'}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href={settings?.homeHero?.primaryCtaUrl || '/projeler'} className="btn-glow px-8 py-3.5 text-sm">
                  {settings?.homeHero?.primaryCtaLabel || 'Projeleri İncele'}
                </Link>
                <Link href={settings?.homeHero?.secondaryCtaUrl || '/iletisim'} className="btn-ghost group text-sm">
                  {settings?.homeHero?.secondaryCtaLabel || 'İletişime Geç'}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>

            {/* Right — Dashboard Mock */}
            <div className="relative">
              <DashboardMock />
              <div className="absolute -bottom-5 -left-4 glass p-3.5 px-5 hidden lg:flex items-center gap-3" style={{ borderRadius: 16 }}>
                <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent">
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

      {/* ════════════ SECTION 2: Eğitim Teknolojileri (copy LEFT, showcase RIGHT) ════════════ */}
      <section className="relative z-[1] py-24 lg:py-32">
        <div className="section-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <AnimatedSection>
              <SectionHeader
                eyebrow="Uzmanlık"
                title="Eğitim Teknolojileri"
                subtitle="Sınavlardan veri toplama, bu veriyi anlamlı raporlara dönüştürme ve öğrenci gelişimini izlenebilir kılma."
              />
              <div className="space-y-3 mb-8">
                {(categories.length > 0
                  ? categories.slice(0, 3).map(c => ({ title: c.title, desc: c.shortSummary }))
                  : [
                    { title: 'Optik Okuma Sistemleri', desc: 'Sınav kâğıtlarını otomatik tarama ve değerlendirme' },
                    { title: 'Öğrenci Performans Analizi', desc: 'Bireysel ve sınıf bazlı gelişim izleme' },
                    { title: 'Otomatik Raporlama', desc: 'Kurum ve veli raporlarını tek tıkla oluşturma' },
                  ]
                ).map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-3 border-b border-card-border last:border-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 shrink-0" />
                    <div>
                      <span className="text-sm font-semibold text-fg">{item.title}</span>
                      <span className="text-sm text-muted ml-2">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/uzmanlik" className="btn-ghost group text-sm">
                Detayları incele <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <CodePanel />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ════════════ SECTION 3: Araçlar (showcase LEFT, copy RIGHT) ════════════ */}
      <section className="relative z-[1] py-24 lg:py-32">
        <div className="section-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            <AnimatedSection className="lg:order-2">
              <SectionHeader
                eyebrow="Araçlar"
                title="Öğretmen ve Geliştirici Araçları"
                subtitle="Günlük operasyonları hızlandıran, tek bir işi iyi yapan, odaklı ve pratik araçlar."
              />
              <div className="space-y-3 mb-8">
                {(homeTools.length > 0
                  ? homeTools.map(t => ({ title: t.title, desc: t.summary, status: t.status }))
                  : [
                    { title: 'Sınav Şablonu Oluşturucu', desc: 'Optik okumaya uygun sınav kâğıtları', status: 'Active' as const },
                    { title: 'Not Dönüştürücü', desc: 'Ham puanları farklı ölçeklere çevirin', status: 'Active' as const },
                    { title: 'Dijital Rubrik Editörü', desc: 'Performans değerlendirme kriterleri', status: 'ComingSoon' as const },
                  ]
                ).map((item, i) => (
                  <div key={i} className="glass glass-interactive border-beam p-5 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                      {i === 0 ? <FileCode2 size={17} /> : i === 1 ? <Layers size={17} /> : <BookOpen size={17} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="text-sm font-semibold text-fg truncate">{item.title}</h3>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold shrink-0 ml-2 ${item.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-surface text-subtle'}`}>
                          {item.status === 'Active' ? 'Aktif' : 'Yakında'}
                        </span>
                      </div>
                      <p className="text-xs text-muted truncate">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/araclar" className="btn-ghost group text-sm">
                Tümünü gör <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>

            <AnimatedSection delay={0.15} className="lg:order-1 space-y-4">
              <MetricStrip />
              <WorkflowStrip />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ════════════ SECTION 4: Projeler (bento grid) ════════════ */}
      <section className="relative z-[1] py-24 lg:py-32">
        <div className="section-shell">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Projeler" title="Projeler"
              subtitle="Gerçek problemlerden doğan, sahada test edilmiş dijital sistemler."
              action={<Link href="/projeler" className="btn-ghost group text-sm">Tüm projeler <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></Link>}
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
                      <div className="text-xs text-subtle mt-5 pt-4 border-t border-card-border flex items-center justify-between group-hover:text-muted transition-colors">
                        Detayları gör <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="glass p-5 h-full flex flex-col">
                    <div className="skeleton aspect-[16/10] w-full mb-5 rounded-xl" />
                    <span className="text-[10px] text-accent font-bold tracking-[0.12em] mb-2 uppercase">{p.cat}</span>
                    <h3 className="text-base font-semibold text-fg mb-2">{p.title}</h3>
                    <div className="skeleton h-3 w-full mb-1.5" />
                    <div className="skeleton h-3 w-3/4" />
                    <div className="text-xs text-subtle mt-5 pt-4 border-t border-card-border flex items-center justify-between">
                      Detayları gör <ArrowRight size={12} />
                    </div>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ════════════ SECTION 5: Yazılar ════════════ */}
      <section className="relative z-[1] py-24 lg:py-32">
        <div className="section-shell">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Blog" title="Yazılar"
              subtitle="Eğitim teknolojileri, yapay zekâ ve dijital süreçler üzerine içgörüler."
              action={<Link href="/yazilar" className="btn-ghost group text-sm">Tümünü oku <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></Link>}
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
                { id: '1', title: 'Eğitimde yapay zekâ: Nereden başlamalı?', cat: 'AI Strategy', excerpt: '', slug: '', date: '', time: 0, real: false },
                { id: '2', title: 'Optik okuma sistemlerinin evrimi', cat: 'Digital Efficiency', excerpt: '', slug: '', date: '', time: 0, real: false },
                { id: '3', title: "BiSınıf'ın gelişim hikâyesi", cat: 'Build in Public', excerpt: '', slug: '', date: '', time: 0, real: false },
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
                  <div className="glass p-7 h-full flex flex-col">
                    <span className="text-[10px] text-accent mb-3 block uppercase tracking-[0.15em] font-bold">{p.cat}</span>
                    <h3 className="text-base font-semibold text-fg mb-3 leading-snug">{p.title}</h3>
                    <div className="skeleton h-3 w-full mb-2" />
                    <div className="skeleton h-3 w-full mb-2" />
                    <div className="skeleton h-3 w-3/5" />
                    <div className="flex items-center gap-4 text-xs text-subtle pt-4 mt-auto border-t border-card-border">
                      <div className="skeleton h-3 w-24" />
                      <div className="skeleton h-3 w-10" />
                    </div>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ════════════ SECTION 6: Final CTA ════════════ */}
      <section className="relative z-[1] py-24 lg:py-32">
        <div className="section-shell">
          <AnimatedSection>
            <div className="glass p-12 md:p-16 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-[2.5rem] font-bold tracking-tight text-fg mb-6 leading-tight">
                Bir fikriniz varsa konuşalım.
              </h2>
              <p className="text-muted mb-8 max-w-lg mx-auto">
                Dijital mimari, eğitim teknolojileri veya yapay zekâ projeleri hakkında konuşmak isterseniz.
              </p>
              <Link href="/iletisim" className="btn-glow px-10 py-4 text-sm">
                İletişime Geç
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
