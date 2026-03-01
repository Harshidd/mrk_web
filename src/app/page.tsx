import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BarChart3, CheckCircle2, TrendingUp, Users } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import {
  getSettingsQuery,
  listCategoriesQuery,
  listProjectsQuery,
  listToolsQuery,
  listPostsQuery,
} from '@/lib/sanity/queries'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { urlForImage } from '@/lib/sanity/image'
import type { SiteSettings, SolutionCategory, Project, Tool, Post } from '@/types/content'

export const revalidate = 60

export default async function Home() {
  const [settings, categories, projectsRaw, toolsRaw, postsRaw] = await Promise.all([
    client.fetch<SiteSettings>(getSettingsQuery).catch(() => null),
    client.fetch<SolutionCategory[]>(listCategoriesQuery).catch(() => []),
    client.fetch<Project[]>(listProjectsQuery).catch(() => []),
    client.fetch<Tool[]>(listToolsQuery).catch(() => []),
    client.fetch<Post[]>(listPostsQuery).catch(() => []),
  ])

  const featuredProjects = projectsRaw.filter((p) => p.featured)
  const homeProjects = featuredProjects.length >= 3 ? featuredProjects.slice(0, 3) : projectsRaw.slice(0, 3)
  const homeTools = toolsRaw.slice(0, 3)
  const homePosts = postsRaw.slice(0, 3)

  return (
    <>
      {/* ════════════════════════════════════════════════════════
          SECTION 1 — HERO (LIGHT BACKGROUND)
          ════════════════════════════════════════════════════════ */}
      <section className="section-light pt-32 pb-20 lg:pt-40 lg:pb-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left — Copy */}
            <div className="flex flex-col items-start">
              <div className="badge mb-8">
                <span className="badge-dot" />
                Eğitim + Yapay Zekâ
              </div>

              <h1 className="text-4xl md:text-[3.25rem] lg:text-[3.5rem] font-bold tracking-tight text-text-primary mb-6 leading-[1.08]">
                {settings?.homeHero?.headline || 'Eğitim ve yapay zekâ odaklı sistemler'}
              </h1>

              <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-lg leading-relaxed">
                {settings?.homeHero?.subheadline || 'Eğitim kurumlarında karşılaşılan karmaşayı sadeleştiren, veriye dayalı ve gerçekten işe yarayan dijital çözümler.'}
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link
                  href={settings?.homeHero?.primaryCtaUrl || '/projeler'}
                  className="px-7 py-3 bg-dark-band text-white font-semibold rounded-full hover:bg-dark-band/90 hover:shadow-lg transition-all text-sm"
                >
                  {settings?.homeHero?.primaryCtaLabel || 'Projeleri İncele'}
                </Link>
                <Link
                  href={settings?.homeHero?.secondaryCtaUrl || '/iletisim'}
                  className="px-6 py-3 text-text-secondary hover:text-text-primary font-medium flex items-center gap-2 transition-colors text-sm group"
                >
                  {settings?.homeHero?.secondaryCtaLabel || 'İletişime Geç'}
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right — Real Product UI Mock */}
            <div className="relative w-full">
              <div className="dashboard-card p-6 space-y-4">
                {/* Mini Dashboard Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-text-muted mb-1">Sınav Performans Paneli</p>
                    <p className="text-xl font-semibold text-text-primary">BiSınıf Analitik</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-muted">Ortalama Başarı</p>
                    <p className="text-2xl font-bold text-accent">78.4<span className="text-sm text-text-muted ml-1">%</span></p>
                  </div>
                </div>

                {/* Mini Chart */}
                <div className="bg-surface rounded-xl p-4 border border-border">
                  <div className="flex items-end gap-1.5 h-24">
                    {[45, 62, 55, 78, 68, 85, 72, 90, 82, 76, 88, 94].map((v, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-accent/30 hover:bg-accent/60 transition-colors"
                        style={{ height: `${v}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-text-muted">
                    <span>Oca</span><span>Şub</span><span>Mar</span><span>Nis</span><span>May</span><span>Haz</span>
                    <span>Tem</span><span>Ağu</span><span>Eyl</span><span>Eki</span><span>Kas</span><span>Ara</span>
                  </div>
                </div>

                {/* Student Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface rounded-xl p-3 border border-border">
                    <p className="text-[11px] text-text-muted mb-1">En Yüksek</p>
                    <p className="text-sm font-medium text-text-primary">Elif Yılmaz</p>
                    <p className="text-xs text-accent mt-1">96.2 puan</p>
                  </div>
                  <div className="bg-surface rounded-xl p-3 border border-border">
                    <p className="text-[11px] text-text-muted mb-1">Gelişim Oranı</p>
                    <p className="text-sm font-medium text-text-primary">+12.4%</p>
                    <p className="text-xs text-emerald-600 mt-1">↑ son 3 ay</p>
                  </div>
                </div>
              </div>

              {/* Floating mini card */}
              <div className="absolute -bottom-6 -left-4 bg-white rounded-xl p-3 px-4 border border-border shadow-lg hidden lg:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-xs font-bold">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium text-text-primary">324 sınav tarandı</p>
                  <p className="text-[10px] text-text-muted">son 7 gün</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SECTION 2 — DARK CONTRAST BAND (Eğitim Teknolojileri)
          ════════════════════════════════════════════════════════ */}
      {categories && categories.length > 0 && (
        <section className="section-dark py-24 lg:py-32 px-6">
          <div className="max-w-[1200px] mx-auto">
            <AnimatedSection className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left — Visual */}
              <div className="card-dark p-8 space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <BarChart3 size={20} className="text-accent-muted" />
                  <h3 className="text-white/50 text-xs font-medium tracking-wider uppercase">Kapsam</h3>
                </div>
                <StaggerChildren className="space-y-3">
                  {['Sınav analiz ve optik okuma sistemleri', 'Öğrenci performans panelleri', 'Otomatik raporlama modülleri', 'Kurum içi dijital dönüşüm süreçleri'].map((item, i) => (
                    <StaggerItem key={i}>
                      <div className="flex items-center gap-3 bg-white/[0.04] rounded-xl p-3.5 border border-white/[0.06]">
                        <div className="w-2 h-2 rounded-full bg-accent-muted shrink-0" />
                        <p className="text-sm text-white/80">{item}</p>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>

              {/* Right — Copy */}
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-6 leading-tight">
                  Eğitim Teknolojileri
                </h2>
                <p className="text-white/50 text-lg leading-relaxed mb-8">
                  Sınavlardan veri toplama, bu veriyi anlamlı raporlara dönüştürme ve öğrenci gelişimini izlenebilir kılma. Her bileşen gerçek ihtiyaçlardan doğdu.
                </p>
                <Link
                  href="/uzmanlik"
                  className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-accent-muted transition-colors group"
                >
                  Detayları incele
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          SECTION 3 — WHITE (Geliştirilen Sistemler — Bento Grid)
          ════════════════════════════════════════════════════════ */}
      {homeProjects.length > 0 && (
        <section className="section-white py-24 lg:py-32 px-6">
          <div className="max-w-[1200px] mx-auto">
            <AnimatedSection>
              <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary">Projeler</h2>
                </div>
                <Link href="/projeler" className="text-text-secondary hover:text-text-primary flex items-center gap-2 text-sm transition-colors">
                  Tüm projeler <ArrowRight size={15} />
                </Link>
              </div>
              <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {homeProjects.map((p) => (
                  <StaggerItem key={p._id}>
                    <Link href={`/projeler/${p.slug.current}`} className="group block h-full">
                      <div className="card card-hover p-5 h-full flex flex-col">
                        <div className="aspect-[16/10] rounded-xl overflow-hidden mb-5 relative bg-surface-alt">
                          {p.coverImage && (
                            <Image
                              src={urlForImage(p.coverImage)?.url() as string}
                              alt={p.title}
                              fill
                              className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                            />
                          )}
                        </div>
                        <div className="flex-1 flex flex-col">
                          {p.category?.title && (
                            <span className="text-xs text-accent font-medium tracking-wide mb-2 uppercase">{p.category.title}</span>
                          )}
                          <h3 className="text-lg font-medium text-text-primary mb-2">{p.title}</h3>
                          <p className="text-sm text-text-muted line-clamp-2 flex-1">{p.summary}</p>
                          <div className="text-xs text-text-muted mt-4 pt-3 border-t border-border group-hover:text-text-secondary transition-colors flex items-center justify-between">
                            <span>Detayları gör</span>
                            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          SECTION 4 — SOFT ACCENT GRADIENT (Araçlar)
          ════════════════════════════════════════════════════════ */}
      {homeTools.length > 0 && (
        <section className="section-accent-wash py-24 lg:py-32 px-6">
          <div className="max-w-[1200px] mx-auto">
            <AnimatedSection>
              <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary">Öğretmen ve Geliştirici Araçları</h2>
                </div>
                <Link href="/araclar" className="text-text-secondary hover:text-text-primary flex items-center gap-2 text-sm transition-colors">
                  Tümünü gör <ArrowRight size={15} />
                </Link>
              </div>
              <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {homeTools.map((t) => (
                  <StaggerItem key={t._id}>
                    <Link href={`/araclar/${t.slug?.current}`} className="group block h-full">
                      <div className="card card-hover p-7 h-full flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-text-primary">{t.title}</h3>
                            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${t.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-surface-alt text-text-muted border border-border'}`}>
                              {t.status === 'Active' ? 'Aktif' : 'Yakında'}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary leading-relaxed">{t.summary}</p>
                        </div>
                        <div className="mt-6 text-sm text-text-muted group-hover:text-text-primary flex items-center gap-2 transition-colors">
                          İncele <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          SECTION 5 — BLOG PREVIEW (WHITE — Typography Driven)
          ════════════════════════════════════════════════════════ */}
      {homePosts.length > 0 && (
        <section className="section-white py-24 lg:py-32 px-6">
          <div className="max-w-[1200px] mx-auto">
            <AnimatedSection>
              <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-4">
                <div>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-text-primary">Yazılar</h2>
                </div>
                <Link href="/yazilar" className="text-text-secondary hover:text-text-primary flex items-center gap-2 text-sm transition-colors">
                  Tümünü oku <ArrowRight size={15} />
                </Link>
              </div>
              <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {homePosts.map((post) => (
                  <StaggerItem key={post._id}>
                    <Link href={`/yazilar/${post.slug.current}`} className="group block h-full">
                      <div className="card card-hover p-7 h-full flex flex-col justify-between">
                        <div>
                          <span className="text-xs text-accent mb-3 block uppercase tracking-wider font-medium">{post.category.replace('_', ' ')}</span>
                          <h3 className="text-lg font-medium text-text-primary mb-3 group-hover:text-accent transition-colors leading-snug">{post.title}</h3>
                          <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed">{post.excerpt}</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-text-muted pt-4 mt-4 border-t border-border">
                          <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          {post.readingTime && <span>{post.readingTime} dk</span>}
                        </div>
                      </div>
                    </Link>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════
          SECTION 6 — FINAL CTA (DARK STRIPE STYLE)
          ════════════════════════════════════════════════════════ */}
      <section className="section-dark py-28 lg:py-36 px-6">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white mb-8">
              Bir fikriniz varsa konuşalım.
            </h2>
            <Link
              href="/iletisim"
              className="inline-flex px-8 py-3.5 bg-white text-dark-band font-semibold rounded-full hover:shadow-lg hover:scale-[1.02] transition-all text-sm"
            >
              İletişime Geç
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  )
}
