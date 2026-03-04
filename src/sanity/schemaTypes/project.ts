import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
    type: 'document',
    preview: {
        select: { title: 'title', subtitle: 'category.title', media: 'coverImage' },
    },
    orderings: [
        { title: 'Yayın Tarihi', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    ],
    fields: [
        defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'category', type: 'reference', to: [{ type: 'solutionCategory' }], validation: (Rule) => Rule.required() }),
        defineField({ name: 'summary', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'coverImage', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'problem', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'approach', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'solution', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'techStack', type: 'array', of: [{ type: 'string' }], validation: (Rule) => Rule.required().min(1) }),
        defineField({
            name: 'results',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string' },
                        { name: 'value', type: 'string' },
                        { name: 'note', type: 'string' },
                    ],
                },
            ],
            validation: (Rule) => Rule.required().min(1),
        }),
        defineField({ name: 'gallery', type: 'array', of: [{ type: 'image' }] }),
        defineField({ name: 'featured', type: 'boolean', initialValue: false }),
        defineField({ name: 'order', title: 'Sıra', type: 'number', description: 'Düşük sayı = önce gösterilir' }),
        defineField({ name: 'publishedAt', type: 'datetime', validation: (Rule) => Rule.required() }),
        defineField({ name: 'ctaLabel', type: 'string' }),
        defineField({ name: 'ctaUrl', type: 'string' }),
    ],
})
