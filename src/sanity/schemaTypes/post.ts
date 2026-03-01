import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
        defineField({
            name: 'category',
            type: 'string',
            options: { list: ['AI_Strategy', 'Education_Leadership', 'Digital_Efficiency', 'BuildInPublic'] },
            validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'excerpt', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'publishedAt', type: 'datetime' }),
        defineField({ name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] }),
        defineField({ name: 'readingTime', type: 'number', description: 'Reading time in minutes' }),
        defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    ],
})
