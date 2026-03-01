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
    return posts.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params
    const data: Post | null = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug })
    if (!data) return {}
    return {
        title: data.title,
        description: data.excerpt,
        alternates: {
            canonical: `/yazilar/${data.slug.current}`,
        }
    }
}

export default async function PostDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const post: Post | null = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug })

    if (!post) {
        notFound()
    }

    return (
        <section className="section-white py-24 lg:py-32 px-6">
            <article className="max-w-3xl mx-auto">
                <AnimatedSection>
                    <Link href="/yazilar" className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-primary transition-colors mb-10 group">
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Geri Dön
                    </Link>

                    {/* Header */}
                    <div className="mb-12">
                        <span className="text-xs text-accent font-medium tracking-widest uppercase mb-4 block">
                            {post.category.replace('_', ' ')}
                        </span>
                        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-text-primary mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-text-muted">
                            <time dateTime={post.publishedAt}>
                                {new Date(post.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </time>
                            {post.readingTime && (
                                <>
                                    <span className="w-1 h-1 bg-border rounded-full" />
                                    <span>{post.readingTime} dk okuma</span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Cover Image */}
                    {post.coverImage && (
                        <div className="w-full aspect-video relative rounded-2xl overflow-hidden bg-surface-alt mb-12 border border-border">
                            <Image
                                src={urlForImage(post.coverImage)?.url() as string}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Body */}
                    <div className="prose prose-lg max-w-none text-text-secondary">
                        <Blocks value={post.body} />
                    </div>

                    {/* Footer CTA */}
                    <div className="mt-20 pt-10 border-t border-border pb-10">
                        <div className="bg-surface rounded-3xl p-8 border border-border text-center">
                            <h3 className="text-xl font-medium text-text-primary mb-3">Bu yazı ilgini çekti mi?</h3>
                            <p className="text-sm text-text-secondary mb-6 max-w-md mx-auto">
                                Fikir alışverişi yapmak veya benzer süreçleri değerlendirmek için sohbet edebiliriz.
                            </p>
                            <Link
                                href={`/iletisim?konu=${encodeURIComponent(post.title)}`}
                                className="inline-block px-8 py-3 bg-dark-band text-white text-sm font-medium rounded-full hover:bg-dark-band/90 hover:shadow-lg transition-all"
                            >
                                Tanışalım
                            </Link>
                        </div>
                    </div>
                </AnimatedSection>
            </article>
        </section>
    )
}
