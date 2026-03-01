import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'solutionCategory',
    title: 'Solution Category',
    type: 'document',
    fields: [
        defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'shortSummary', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({
            name: 'icon',
            type: 'string',
            options: { list: ['GraduationCap', 'Zap', 'Shield', 'CheckCircle', 'Activity', 'Archive'] },
            validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'order', type: 'number', validation: (Rule) => Rule.required() }),
        defineField({ name: 'problemItSolves', title: 'Problem It Solves', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'process', title: 'Process', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'delivery', title: 'Delivery', type: 'array', of: [{ type: 'block' }] }),
        defineField({
            name: 'faqs',
            title: 'FAQs',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'question', type: 'string', validation: (Rule) => Rule.required() },
                        { name: 'answer', type: 'text', validation: (Rule) => Rule.required() },
                    ],
                },
            ],
        }),
        defineField({ name: 'ctaLabel', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'ctaUrl', type: 'string', validation: (Rule) => Rule.required() }),
    ],
})
