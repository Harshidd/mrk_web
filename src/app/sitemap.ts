import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'
import { listCategoriesQuery, listProjectsQuery, listToolsQuery, listPostsQuery } from '@/lib/sanity/queries'
import { SolutionCategory, Project, Tool, Post } from '@/types/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

    const routes = [
        '',
        '/cozumler',
        '/projeler',
        '/araclar',
        '/yazilar',
        '/hakkimda',
        '/iletisim',
        '/kvkk',
    ]

    const staticSitemap = routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    const [categories, projects, tools, posts] = await Promise.all([
        client.fetch<SolutionCategory[]>(listCategoriesQuery).catch(() => []),
        client.fetch<Project[]>(listProjectsQuery).catch(() => []),
        client.fetch<Tool[]>(listToolsQuery).catch(() => []),
        client.fetch<Post[]>(listPostsQuery).catch(() => []),
    ])

    const dynamicCategories = categories.map((cat) => ({
        url: `${baseUrl}/cozumler/${cat.slug.current}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    const dynamicProjects = projects.map((p) => ({
        url: `${baseUrl}/projeler/${p.slug.current}`,
        lastModified: new Date(p.publishedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    const dynamicTools = tools.map((t) => ({
        url: `${baseUrl}/araclar/${t.slug.current}`,
        lastModified: new Date(t.publishedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    const dynamicPosts = posts.map((p) => ({
        url: `${baseUrl}/yazilar/${p.slug.current}`,
        lastModified: new Date(p.publishedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...staticSitemap, ...dynamicCategories, ...dynamicProjects, ...dynamicTools, ...dynamicPosts]
}
