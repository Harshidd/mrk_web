import { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { listPostsQuery } from '@/lib/sanity/queries'
import { Post } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { SectionHeader } from '@/components/SectionHeader'

export const metadata: Metadata = { title: 'Yazılar', description: 'Eğitim teknolojileri, yapay zekâ ve dijital süreçler üzerine içgörüler.', alternates: { canonical: '/yazilar' } }
export const revalidate = 60

export default async function PostsPage() {
    const posts: Post[] = await client.fetch(listPostsQuery).catch(() => [])

    return (
        <section className="section-glow relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36" data-glow="amber">
            <div className="section-shell">
                <AnimatedSection className="max-w-3xl">
                    <SectionHeader eyebrow="Blog" title="Yazılar"
                        subtitle="Eğitim teknolojileri, yapay zekâ uygulamaları ve dijital süreçler üzerine notlar." />
                </AnimatedSection>
                {posts.length > 0 ? (
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map(post => (
                            <StaggerItem key={post._id}>
                                <Link href={`/yazilar/${post.slug.current}`} className="group block h-full">
                                    <div className="glass glass-interactive border-beam p-7 h-full flex flex-col justify-between">
                                        <div>
                                            <span className="text-[10px] text-accent mb-3 block uppercase tracking-[0.15em] font-bold">{post.category.replace('_', ' ')}</span>
                                            <h3 className="text-base font-semibold text-fg mb-3 group-hover:text-accent transition-colors leading-snug">{post.title}</h3>
                                            <p className="text-sm text-muted line-clamp-3 leading-relaxed">{post.excerpt}</p>
                                        </div>
                                        <div className="flex items-center gap-4 text-xs text-subtle pt-4 mt-6 border-t border-card-border">
                                            <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                            {post.readingTime && <span>{post.readingTime} dk</span>}
                                        </div>
                                    </div>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerChildren>
                ) : (
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {['AI Strategy', 'Digital Efficiency', 'Build in Public'].map((cat, i) => (
                            <StaggerItem key={i}>
                                <div className="glass p-7 h-full flex flex-col justify-between">
                                    <div>
                                        <span className="text-[10px] text-accent mb-3 block uppercase tracking-[0.15em] font-bold">{cat}</span>
                                        <div className="skeleton h-4 w-4/5 mb-3" />
                                        <div className="space-y-1.5">
                                            <div className="skeleton h-3 w-full" />
                                            <div className="skeleton h-3 w-full" />
                                            <div className="skeleton h-3 w-3/5" />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 pt-4 mt-6 border-t border-card-border">
                                        <div className="skeleton h-3 w-24" />
                                        <div className="skeleton h-3 w-10" />
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </StaggerChildren>
                )}
            </div>
        </section>
    )
}
