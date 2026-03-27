import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/lib/sanity/client'
import { listPostsQuery } from '@/lib/sanity/queries'
import { Post } from '@/types/content'
import { AnimatedSection, StaggerChildren, StaggerItem } from '@/components/AnimatedSection'
import { SectionHeader } from '@/components/SectionHeader'
import { fallbackPosts } from '@/lib/data/fallbackPosts'

export const metadata: Metadata = {
    title: 'Yazılar',
    description: 'Yapay zekâ, dijital verimlilik, eğitim teknolojileri ve üretim süreçleri üzerine notlar.',
    alternates: { canonical: '/yazilar' }
}
export const revalidate = 60

export default async function PostsPage() {
    const cmsPosts: Post[] = await client.fetch(listPostsQuery).catch(() => [])
    const hasCms = cmsPosts && cmsPosts.length > 0

    return (
        <section className="section-glow relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36" data-glow="amber">
            <div className="section-shell">
                <AnimatedSection className="max-w-3xl">
                    <SectionHeader eyebrow="İçgörü & Notlar" title="Yazılar"
                        subtitle="Yapay zekâ, dijital verimlilik, eğitim teknolojileri ve üretim süreçleri üzerine notlar." />
                </AnimatedSection>

                {hasCms ? (
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cmsPosts.map(post => (
                            <StaggerItem key={post._id}>
                                <Link href={`/yazilar/${post.slug.current}`} className="group block h-full">
                                    <div className="glass glass-interactive border-beam p-7 h-full flex flex-col justify-between">
                                        <div>
                                            <span className="text-[10px] text-accent mb-3 block uppercase tracking-[0.15em] font-bold">{post.category.replace('_', ' ')}</span>
                                            <h3 className="text-base font-semibold text-fg mb-3 group-hover:text-accent transition-colors leading-snug">{post.title}</h3>
                                            <p className="text-sm text-muted line-clamp-3 leading-relaxed">{post.excerpt}</p>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-subtle pt-5 mt-6 border-t border-card-border group-hover:text-muted transition-colors">
                                            <div className="flex items-center gap-3">
                                                <span>Makaleyi Oku</span>
                                                {post.readingTime && <><span className="w-1 h-1 bg-card-border rounded-full" /><span>{post.readingTime} dk</span></>}
                                            </div>
                                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform opacity-70" />
                                        </div>
                                    </div>
                                </Link>
                            </StaggerItem>
                        ))}
                    </StaggerChildren>
                ) : (
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {fallbackPosts.map(post => (
                            <StaggerItem key={post._id}>
                                <Link href={`/yazilar/${post.slug.current}`} className="group block h-full">
                                    <div className="glass glass-interactive border-beam p-7 h-full flex flex-col justify-between">
                                        <div>
                                            <span className="text-[10px] text-accent mb-3 block uppercase tracking-[0.15em] font-bold">{post.category}</span>
                                            <h3 className="text-base font-semibold text-fg mb-3 group-hover:text-accent transition-colors leading-snug">{post.title}</h3>
                                            <p className="text-sm text-muted line-clamp-3 leading-relaxed">{post.excerpt}</p>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-subtle pt-5 mt-6 border-t border-card-border group-hover:text-muted transition-colors">
                                            <div className="flex items-center gap-3">
                                                <span>Makaleyi Oku</span>
                                                <span className="w-1 h-1 bg-card-border rounded-full" />
                                                <span>{post.readingTime} dk</span>
                                            </div>
                                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform opacity-70" />
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
