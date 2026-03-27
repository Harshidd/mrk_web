import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronLeft, ArrowRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listPostsQuery } from '@/lib/sanity/queries'
import { Post } from '@/types/content'
import { AnimatedSection } from '@/components/AnimatedSection'
import { Blocks } from '@/components/Blocks'
import { urlForImage } from '@/lib/sanity/image'
import Image from 'next/image'
import { fallbackPosts } from '@/lib/data/fallbackPosts'

export const revalidate = 60

export async function generateStaticParams() {
    const posts: Post[] = await client.fetch(listPostsQuery).catch(() => [])
    const dynamicSlugs = posts.map((p: any) => ({ slug: p.slug.current }))
    fallbackPosts.forEach((fp) => {
        if (!dynamicSlugs.find(s => s.slug === fp.slug.current)) {
            dynamicSlugs.push({ slug: fp.slug.current })
        }
    })
    return dynamicSlugs
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    let d: any = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug }).catch(() => null)
    if (!d) d = fallbackPosts.find(fp => fp.slug.current === slug)
    if (!d) return {}
    return {
        title: d.title,
        description: d.excerpt,
        alternates: { canonical: `/yazilar/${slug}` }
    }
}

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    let post: any = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug }).catch(() => null)
    const isFallback = !post
    if (!post) {
        post = fallbackPosts.find(fp => fp.slug.current === slug)
    }
    if (!post) notFound()

    const publishedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
        : null

    return (
        <section className="relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36">
            <article className="section-shell max-w-3xl">
                <AnimatedSection>
                    <Link href="/yazilar" className="inline-flex items-center gap-2 text-sm text-subtle hover:text-fg transition-colors mb-10 group">
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Yazılara Dön
                    </Link>

                    <div className="mb-12">
                        <span className="text-xs text-accent font-bold tracking-[0.15em] uppercase mb-4 block">
                            {isFallback ? post.category : post.category?.replace('_', ' ')}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-fg mb-6 leading-tight">{post.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-subtle">
                            {publishedDate && <time dateTime={post.publishedAt}>{publishedDate}</time>}
                            {post.readingTime && (
                                <>
                                    {publishedDate && <span className="w-1 h-1 bg-card-border rounded-full" />}
                                    <span>{post.readingTime} dk okuma</span>
                                </>
                            )}
                        </div>
                    </div>

                    {!isFallback && post.coverImage && (
                        <div className="w-full aspect-video relative rounded-3xl overflow-hidden bg-surface/50 mb-12 border border-card-border">
                            <Image
                                src={urlForImage(post.coverImage)?.url() as string}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {isFallback ? (
                        <div
                            className="prose prose-lg md:prose-xl max-w-none text-muted
                                prose-headings:text-fg prose-headings:font-bold prose-headings:tracking-tight prose-headings:mt-10 prose-headings:mb-4
                                prose-h2:text-2xl prose-h2:border-b prose-h2:border-card-border prose-h2:pb-3
                                prose-p:leading-relaxed prose-p:mb-5
                                prose-ul:my-4 prose-ol:my-4
                                prose-li:marker:text-accent prose-li:mb-1
                                prose-strong:text-fg prose-strong:font-semibold
                                prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                                prose-blockquote:border-l-accent prose-blockquote:text-fg prose-blockquote:font-medium prose-blockquote:not-italic prose-blockquote:bg-surface/30 prose-blockquote:rounded-r-lg"
                            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
                        />
                    ) : (
                        <div className="prose prose-lg md:prose-xl max-w-none text-muted prose-headings:text-fg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-fg prose-strong:font-semibold prose-li:marker:text-subtle prose-blockquote:border-l-accent prose-blockquote:text-fg prose-blockquote:font-medium prose-blockquote:not-italic prose-blockquote:bg-surface/30 prose-blockquote:rounded-r-lg">
                            <Blocks value={post.body} />
                        </div>
                    )}

                    <div className="mt-20 pt-10 border-t border-card-border">
                        <div className="glass p-10 md:p-14 text-center rounded-[32px] border border-card-border bg-gradient-to-b from-surface/20 to-transparent">
                            <span className="text-[10px] text-accent font-bold tracking-[0.15em] mb-4 block uppercase">
                                Teoriden Pratiğe
                            </span>
                            <h3 className="text-xl md:text-2xl font-semibold text-fg mb-4">Gerçek sistemleri inceleyin</h3>
                            <p className="text-[14.5px] text-muted mb-8 max-w-md mx-auto leading-relaxed">
                                Bu yazıda bahsedilen yaklaşımların uygulandığı, sahada aktif olarak kullanılan eğitim ve veri paneli sistemlerine göz atabilirsiniz.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <Link href="/projeler" className="btn-glow px-8 py-3.5 text-[13px]">
                                    Projeleri İncele
                                </Link>
                                <Link href="/araclar" className="btn-ghost group text-[13px] px-8 py-3.5">
                                    Araçları Keşfet <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </article>
        </section>
    )
}
