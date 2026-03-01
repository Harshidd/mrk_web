import { PortableTextBlock } from '@portabletext/types'
import { Image } from 'sanity'

export interface SiteSettings {
    siteTitle: string
    siteDescription: string
    email: string
    phoneNumber?: string
    whatsappNumber: string
    locationText?: string
    socialLinks?: {
        x?: string
        linkedin?: string
        github?: string
        youtube?: string
    }
    navCtas?: {
        primaryLabel?: string
        primaryUrl?: string
        secondaryLabel?: string
        secondaryUrl?: string
    }
    homeHero?: {
        headline?: string
        heroTagline?: string
        subheadline?: string
        primaryCtaLabel?: string
        primaryCtaUrl?: string
        secondaryCtaLabel?: string
        secondaryCtaUrl?: string
    }
    about?: {
        headline?: string
        body?: PortableTextBlock[]
        howIWorkSteps?: { title: string; text: string }[]
        values?: { title: string; text: string; icon: string }[]
    }
    proofPrinciples?: { title: string; text: string }[]
    brandAccent?: {
        accentA?: string
        accentB?: string
    }
}

export interface SolutionCategory {
    _id: string
    title: string
    slug: { current: string }
    shortSummary: string
    icon: string
    order: number
    problemItSolves?: PortableTextBlock[]
    process?: PortableTextBlock[]
    delivery?: PortableTextBlock[]
    faqs?: { question: string; answer: string }[]
    ctaLabel: string
    ctaUrl: string
}

export interface Project {
    _id: string
    title: string
    slug: { current: string }
    category: { title: string; slug: { current: string } }
    summary: string
    coverImage: Image
    problem?: PortableTextBlock[]
    approach?: PortableTextBlock[]
    solution?: PortableTextBlock[]
    techStack: string[]
    results: { label: string; value: string; note?: string }[]
    gallery?: Image[]
    featured: boolean
    publishedAt: string
    ctaLabel?: string
    ctaUrl?: string
}

export interface Tool {
    _id: string
    title: string
    slug: { current: string }
    category?: { title: string; slug: { current: string } }
    status: 'ComingSoon' | 'Active'
    summary: string
    forWhom: string[]
    features: string[]
    coverImage?: Image
    demoUrl?: string
    requestLabel: string
    publishedAt: string
}

export interface Post {
    _id: string
    title: string
    slug: { current: string }
    category: 'AI_Strategy' | 'Education_Leadership' | 'Digital_Efficiency' | 'BuildInPublic'
    excerpt: string
    coverImage?: Image
    publishedAt: string
    body: PortableTextBlock[]
    readingTime?: number
    featured: boolean
}

export interface LegalPage {
    _id: string
    title: string
    slug: { current: string }
    body: PortableTextBlock[]
}
