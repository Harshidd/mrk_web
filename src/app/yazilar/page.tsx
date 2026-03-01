import { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { listPostsQuery } from '@/lib/sanity/queries'
import { Post } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'

export const metadata: Metadata = {
    title: 'Yazılar',
    description: 'Eğitim teknolojileri, yapay zekâ ve dijital süreçler üzerine içgörüler.',
    alternates: { canonical: '/yazilar' },
}

export const revalidate = 60

export default async function PostsPage() {
    const posts: Post[] = await client.fetch(listPostsQuery).catch(() => [])

    return (
        <section className="section-white py-24 lg:py-32 px-6">
            <div className="max-w-[1200px] mx-auto flex flex-col gap-16">
                <AnimatedSection className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text-primary mb-6 leading-tight">
                        Yazılar
                    </h1>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        Eğitim teknolojileri, yapay zekâ uygulamaları ve dijital süreçler üzerine notlar ve gözlemler.
                    </p>
                </AnimatedSection>

                {posts.length === 0 ? (
                    <AnimatedSection className="card p-12 text-center text-text-muted">
                        Henüz yazı eklenmedi.
                    </AnimatedSection>
                ) : (
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <StaggerItem key={post._id}>
                                <Link href={`/yazilar/${post.slug.current}`} className="group block h-full">
                                    <div className="card card-hover p-7 h-full flex flex-col justify-between">
                                        <div>
                                            <span className="text-xs text-accent mb-3 block uppercase tracking-wider font-medium">{post.category.replace('_', ' ')}</span>
                                            <h3 className="text-lg font-medium text-text-primary mb-3 group-hover:text-accent transition-colors leading-snug">{post.title}</h3>
                                            <p className="text-sm text-text-secondary line-clamp-3 leading-relaxed">{post.excerpt}</p>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-text-muted pt-4 mt-6 border-t border-border">
                                            <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                            {post.readingTime && <span>{post.readingTime} dk</span>}
                                        </div>
                                    </div>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerChildren>
                )}
            </div>
        </section>
    )
}
