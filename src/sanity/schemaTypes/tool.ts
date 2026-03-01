import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'tool',
    title: 'Micro Tool',
    type: 'document',
    fields: [
        defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'category', type: 'reference', to: [{ type: 'solutionCategory' }] }),
        defineField({
            name: 'status',
            type: 'string',
            options: { list: ['ComingSoon', 'Active'] },
            initialValue: 'ComingSoon',
            validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'summary', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'forWhom', type: 'array', of: [{ type: 'string' }], validation: (Rule) => Rule.required().min(1) }),
        defineField({ name: 'features', type: 'array', of: [{ type: 'string' }], validation: (Rule) => Rule.required().min(1) }),
        defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'demoUrl', type: 'url' }),
        defineField({ name: 'requestLabel', type: 'string', initialValue: 'Talep Gönder' }),
        defineField({ name: 'publishedAt', type: 'datetime' }),
    ],
})
