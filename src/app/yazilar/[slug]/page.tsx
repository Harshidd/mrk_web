import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listPostsQuery } from '@/lib/sanity/queries'
import { Post } from '@/types/content'
import { AnimatedSection } from '@/components/AnimatedSection'
import { Blocks } from '@/components/Blocks'
import { urlForImage } from '@/lib/sanity/image'

export const revalidate = 60
export async function generateStaticParams() {
    const posts: Post[] = await client.fetch(listPostsQuery).catch(() => [])
    return posts.map(p => ({ slug: p.slug.current }))
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const d: Post | null = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug })
    if (!d) return {}
    return { title: d.title, description: d.excerpt, alternates: { canonical: `/yazilar/${d.slug.current}` } }
}

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post: Post | null = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug })
    if (!post) notFound()

    return (
        <section className="relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36">
            <article className="section-shell max-w-3xl">
                <AnimatedSection>
                    <Link href="/yazilar" className="inline-flex items-center gap-2 text-sm text-subtle hover:text-fg transition-colors mb-10 group">
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Geri Dön
                    </Link>
                    <div className="mb-12">
                        <span className="text-xs text-accent font-bold tracking-[0.15em] uppercase mb-4 block">{post.category.replace('_', ' ')}</span>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-fg mb-6 leading-tight">{post.title}</h1>
                        <div className="flex items-center gap-4 text-sm text-subtle">
                            <time dateTime={post.publishedAt}>{new Date(post.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
                            {post.readingTime && <><span className="w-1 h-1 bg-card-border rounded-full" /><span>{post.readingTime} dk okuma</span></>}
                        </div>
                    </div>
                    {post.coverImage && (
                        <div className="w-full aspect-video relative rounded-3xl overflow-hidden bg-surface/50 mb-12 border border-card-border">
                            <Image src={urlForImage(post.coverImage)?.url() as string} alt={post.title} fill className="object-cover" priority />
                        </div>
                    )}
                    <div className="prose prose-lg max-w-none text-muted"><Blocks value={post.body} /></div>
                    <div className="mt-20 pt-10 border-t border-card-border">
                        <div className="glass p-10 text-center">
                            <h3 className="text-xl font-semibold text-fg mb-3">Bu yazı ilgini çekti mi?</h3>
                            <p className="text-sm text-muted mb-6 max-w-md mx-auto">Fikir alışverişi yapmak veya benzer süreçleri değerlendirmek için sohbet edebiliriz.</p>
                            <Link href={`/iletisim?konu=${encodeURIComponent(post.title)}`} className="btn-glow px-8 py-3.5 text-sm">Tanışalım</Link>
                        </div>
                    </div>
                </AnimatedSection>
            </article>
        </section>
    )
}
