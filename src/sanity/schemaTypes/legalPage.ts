import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'legalPage',
    title: 'Legal Page',
    type: 'document',
    fields: [
        defineField({ name: 'title', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', type: 'array', of: [{ type: 'block' }] }),
    ],
})
