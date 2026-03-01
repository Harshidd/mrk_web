import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({ name: 'siteTitle', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'siteDescription', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'email', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'phoneNumber', type: 'string' }),
        defineField({ name: 'whatsappNumber', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'locationText', type: 'string' }),
        defineField({
            name: 'socialLinks',
            type: 'object',
            fields: [
                { name: 'x', type: 'url' },
                { name: 'linkedin', type: 'url' },
                { name: 'github', type: 'url' },
                { name: 'youtube', type: 'url' },
            ],
        }),
        defineField({
            name: 'navCtas',
            type: 'object',
            fields: [
                { name: 'primaryLabel', type: 'string' },
                { name: 'primaryUrl', type: 'string' },
                { name: 'secondaryLabel', type: 'string' },
                { name: 'secondaryUrl', type: 'string' },
            ],
        }),
        defineField({
            name: 'homeHero',
            title: 'Home Hero',
            type: 'object',
            fields: [
                { name: 'headline', type: 'string' },
                { name: 'heroTagline', type: 'string', description: 'Personal signature or short tagline (e.g. Ben MRKDESIGN...)' },
                { name: 'subheadline', type: 'string' },
                { name: 'primaryCtaLabel', type: 'string' },
                { name: 'primaryCtaUrl', type: 'string' },
                { name: 'secondaryCtaLabel', type: 'string' },
                { name: 'secondaryCtaUrl', type: 'string' },
            ],
        }),
        defineField({
            name: 'about',
            title: 'About Section',
            type: 'object',
            fields: [
                { name: 'headline', type: 'string' },
                { name: 'body', type: 'array', of: [{ type: 'block' }] },
                {
                    name: 'howIWorkSteps',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string' },
                                { name: 'text', type: 'text' },
                            ],
                        },
                    ],
                    validation: (Rule) => Rule.length(3),
                },
                {
                    name: 'values',
                    type: 'array',
                    of: [
                        {
                            type: 'object',
                            fields: [
                                { name: 'title', type: 'string' },
                                { name: 'text', type: 'text' },
                                { name: 'icon', type: 'string' },
                            ],
                        },
                    ],
                    validation: (Rule) => Rule.min(3).max(6),
                },
            ],
        }),
        defineField({
            name: 'proofPrinciples',
            title: 'Proof Principles',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string' },
                        { name: 'text', type: 'text' },
                    ],
                },
            ],
            validation: (Rule) => Rule.min(3).max(5),
        }),
        defineField({
            name: 'brandAccent',
            title: 'Brand Accent Colors',
            type: 'object',
            fields: [
                { name: 'accentA', type: 'string', description: 'Hex color (e.g. #0F172A)' },
                { name: 'accentB', type: 'string', description: 'Hex color (e.g. #0B1020)' },
            ],
        }),
    ],
})
