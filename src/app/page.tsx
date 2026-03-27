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
import { DashboardMock, MetricStrip, WorkflowStrip } from '@/components/TechShowcase'
import { urlForImage } from '@/lib/sanity/image'
import type { SiteSettings, SolutionCategory, Project, Tool, Post } from '@/types/content'
import { mergeSettings } from '@/lib/data/fallbackSettings'

export const revalidate = 60

export default async function Home() {
  const [cmsSettings, categories, projects, tools, posts] = await Promise.all([
    client.fetch<SiteSettings>(getSettingsQuery).catch(() => null),
    client.fetch<SolutionCategory[]>(listCategoriesQuery).catch(() => []),
    client.fetch<Project[]>(listProjectsQuery).catch(() => []),
    client.fetch<Tool[]>(listToolsQuery).catch(() => []),
    client.fetch<Post[]>(listPostsQuery).catch(() => []),
  ])

  const settings = mergeSettings(cmsSettings)
  const homeProjects = (projects.filter(p => p.featured).length >= 2
    ? projects.filter(p => p.featured) : projects).slice(0, 4)
  const homeTools = tools.slice(0, 3)
  const homePosts = posts.slice(0, 3)

  return (
    <>
      {/* ═══════ S0: HERO (copy LEFT, DashboardMock RIGHT) — glow: blue ═══════ */}
      <section className="section-glow relative z-[1] pt-[132px] pb-20 lg:pt-[160px] lg:pb-24 overflow-hidden" data-glow="blue">
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[light-sweep_12s_ease-in-out_infinite]" />

        <div className="section-shell relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <AnimatedSection>
              <div className="badge-pill mb-8">
                <span className="badge-dot" />
                {settings.homeHero?.heroTagline}
              </div>
              <h1 className="text-4xl lg:text-[2.35rem] font-bold tracking-[-0.02em] text-fg leading-[1.15] mb-6 max-w-[500px]">
                {settings.homeHero?.headline}
              </h1>
              <p className="text-lg text-muted leading-relaxed mb-10 max-w-[60ch]">
                {settings.homeHero?.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href={settings.homeHero?.primaryCtaUrl || '/projeler'} className="btn-glow px-8 py-4 text-sm">
                  {settings.homeHero?.primaryCtaLabel}
                </Link>
                <Link href={settings.homeHero?.secondaryCtaUrl || '/iletisim'} className="btn-ghost group text-sm">
                  {settings.homeHero?.secondaryCtaLabel}
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>

            <div className="relative group">
              <DashboardMock />
              <div className="absolute -bottom-6 -left-4 glass glass-interactive border border-white/20 p-3.5 px-5 hidden lg:flex items-center gap-3 shadow-[0_8px_20px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] group-hover:-translate-y-1 group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300" style={{ borderRadius: 16 }}>
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

      {/* ═══════ S1: Projeler (bento grid) — glow: teal ═══════ */}
      <section className="section-glow relative z-[1] py-20 lg:py-24" data-glow="teal">
        <div className="section-shell">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Büyük Ölçekli Sistemler" title="Projeler"
              subtitle="Geliştirdiğim dijital sistemler, ürün örnekleri ve uygulama senaryoları."
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
                { id: '1', title: 'BiSınıf — Sınav Analiz Platformu', cat: 'Eğitim Teknolojileri', summary: 'Optik okuma tabanlı sınav analiz ve raporlama sistemi. Okullar için veriyi görünür kılar.', slug: 'bisinif', image: null, real: false },
                { id: '2', title: 'VakitHane', cat: 'Verimlilik', summary: 'Namaz vakitleri, meditasyon ve günlük rutin takibi için tasarlanmış verimlilik aracı.', slug: 'vakithane', image: null, real: false },
                { id: '3', title: 'VOLO', cat: 'Dil Eğitimi', summary: 'Konuşma ve kelime odaklı yapay zekâ destekli dil pratiği uygulaması.', slug: 'volo', image: null, real: false },
              ]
            ).map(p => (
              <StaggerItem key={p.id}>
                {p.slug ? (
                  <Link href={`/projeler/${p.slug}`} className="group block h-full">
                    <div className="glass glass-interactive border-beam p-5 h-full flex flex-col">
                      <div className="aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-surface/50 relative">
                        {p.image && <Image src={urlForImage(p.image)?.url() as string} alt={p.title} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />}
                      </div>
                      <span className="text-[10px] text-accent font-bold tracking-[0.12em] mb-2 uppercase">{p.cat}</span>
                      <h3 className="text-base font-semibold text-fg mb-2">{p.title}</h3>
                      <p className="text-sm text-muted line-clamp-2 flex-1">{p.summary}</p>
                      <div className="text-xs text-subtle mt-6 pt-4 border-t border-card-border flex items-center justify-between group-hover:text-muted transition-colors">
                        Sistemi İncele <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="glass p-5 h-full flex flex-col">
                    <div className="aspect-[16/10] rounded-xl mb-5 bg-surface/40 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-surface/70 skeleton" />
                    </div>
                    <span className="text-[10px] text-accent font-bold tracking-[0.12em] mb-2 uppercase">{p.cat}</span>
                    <h3 className="text-base font-semibold text-fg mb-2">{p.title}</h3>
                    <div className="space-y-1.5 flex-1 mt-1">
                      <p className="text-sm text-muted line-clamp-2">{p.summary}</p>
                    </div>
                    <div className="text-xs text-subtle mt-6 pt-4 border-t border-card-border">Sistemi İncele</div>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <div className="section-divider" />

      {/* ═══════ S2: Araçlar (showcase LEFT, copy RIGHT) — glow: violet ═══════ */}
      <section className="section-glow relative z-[1] py-20 lg:py-24" data-glow="violet">
        <div className="section-shell">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <AnimatedSection delay={0.15} className="lg:order-2">
              <SectionHeader
                eyebrow="Mini Sistemler"
                title="Araçlar"
                subtitle="Günlük iş akışını kolaylaştıran, eğitimde ve dijital üretimde kullanılabilecek küçük ama işlevli araçlar."
              />
              <div className="space-y-3 mb-10">
                {(homeTools.length > 0
                  ? homeTools.map((t: any) => ({ title: t.title, desc: t.summary, status: t.status }))
                  : [
                    { title: 'Sınav Şablonu Oluşturucu', desc: 'Optik okumaya ve düzenli sınav hazırlığına uygun şablonlar.', status: 'Yakında' },
                    { title: 'Not Dönüştürücü', desc: 'Ham puanları farklı ölçeklere hızlıca çeviren araç.', status: 'Yakında' },
                    { title: 'Prompt Yardımcıları', desc: 'Yapay zekâ araçları için düzenli prompt yapıları oluşturma.', status: 'Yakında' },
                  ]
                ).map((item, i) => (
                  <div key={i} className="glass glass-interactive border-beam p-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                      {i === 0 ? <FileCode2 size={18} /> : i === 1 ? <Layers size={18} /> : <BookOpen size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <h3 className="text-sm font-semibold text-fg truncate">{item.title}</h3>
                        <span className={`text-[9px] px-2.5 py-0.5 rounded-md font-bold tracking-widest uppercase shrink-0 ml-2 ${item.status === 'Active' || item.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-surface text-subtle border border-card-border'}`}>
                          {item.status === 'Active' || item.status === 'Aktif' ? 'Aktif' : 'Yakında'}
                        </span>
                      </div>
                      <p className="text-xs text-muted truncate">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/araclar" className="btn-ghost group text-sm">
                Tüm araçları incele <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
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

      {/* ═══════ S3: Yazılar — glow: amber ═══════ */}
      <section className="section-glow relative z-[1] py-20 lg:py-24" data-glow="amber">
        <div className="section-shell">
          <AnimatedSection>
            <SectionHeader
              eyebrow="Blog" title="Yazılar"
              subtitle="Yapay zekâ, dijital verimlilik, eğitim teknolojileri ve üretim süreçleri üzerine notlar."
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
                { id: 'fp-1', title: 'Eğitimde yapay zekâ ile nereden başlanmalı?', cat: 'Yapay Zekâ', excerpt: 'Yapay zekâ araçlarını eğitime dahil ederken ilk adımı doğru seçmek neden önemlidir?', slug: 'egitimde-yapay-zeka-ile-nereden-baslanmali', date: '', time: 5, real: true },
                { id: 'fp-2', title: 'Sınav analizi neden sadece not ortalaması değildir?', cat: 'Eğitim Teknolojileri', excerpt: 'Sınav verisi sadece başarı sıralaması değil, öğrenme sürecini anlamak için de önemli bir kaynaktır.', slug: 'sinav-analizi-neden-sadece-not-ortalamasi-degildir', date: '', time: 6, real: true },
                { id: 'fp-3', title: 'Küçük dijital araçlar neden büyük fark yaratır?', cat: 'Dijital Verimlilik', excerpt: 'Büyük sistemler kadar, küçük ve doğru tasarlanmış araçlar da iş akışını ciddi şekilde değiştirebilir.', slug: 'kucuk-dijital-araclar-neden-buyuk-fark-yaratir', date: '', time: 5, real: true },
              ]
            ).map(p => (
              <StaggerItem key={p.id}>
                {p.real ? (
                  <Link href={`/yazilar/${p.slug}`} className="group block h-full">
                    <div className="glass glass-interactive border-beam p-7 h-full flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-accent mb-3 block uppercase tracking-[0.15em] font-bold">{p.cat}</span>
                        <h3 className="text-[15px] font-bold text-fg mb-3 group-hover:text-accent transition-colors leading-snug">{p.title}</h3>
                        <p className="text-sm text-muted line-clamp-3 leading-relaxed">{p.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-subtle pt-4 mt-6 border-t border-card-border">
                         <span>Makaleyi Oku</span>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="glass p-7 h-full flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-accent mb-3 block uppercase tracking-[0.15em] font-bold">{p.cat}</span>
                      <h3 className="text-[15px] font-bold text-fg mb-3 leading-snug">{p.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{p.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-subtle pt-4 mt-6 border-t border-card-border">
                      <span className="skeleton h-3 w-20" />
                    </div>
                  </div>
                )}
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ═══════ FINAL INFO BLOCK ═══════ */}
      <section className="relative z-[1] py-8 lg:py-12 mb-12">
          <div className="section-shell">
          <AnimatedSection>
              <div className="glass p-8 md:p-10 lg:p-12 max-w-[900px] mx-auto rounded-[24px] border-beam relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
                  <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
                      <div className="flex-[0.9]">
                          <span className="text-[10px] text-accent font-bold tracking-[0.15em] mb-3 block uppercase">
                              Bilgi Notu
                          </span>
                          <h2 className="text-xl md:text-2xl font-bold tracking-[-0.02em] text-fg mb-0 leading-[1.3]">
                              Sistem ve veri odaklı düşünmek neden önemli?
                          </h2>
                      </div>
                      <div className="flex-[1.1] md:pt-1">
                          <p className="text-[13.5px] md:text-[14.5px] text-muted leading-relaxed mb-6">
                              İş süreçleri, öğrenci gelişimi veya ekiplerin üretimi çoğu zaman anlık çözümlerle ilerler ve dağınık bir veri yığınına dönüşür. Sağlam kurgulanmış dijital sistemler; karmaşayı giderir, veriyi görünür hale getirir ve gereksiz karar yükünü azaltır. Bu sitede yer alan projeler, araçlar ve yazılar bu yaklaşımın hem eğitimde hem de dijital üretim alanlarındaki farklı örneklerini yansıtır.
                          </p>
                          <Link href="/projeler" className="btn-ghost group text-[13px] inline-flex tracking-wide">
                              Projeleri incele <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                          </Link>
                      </div>
                  </div>
              </div>
          </AnimatedSection>
          </div>
      </section>
    </>
  )
}
