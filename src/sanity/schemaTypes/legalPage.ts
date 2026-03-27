import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'legalPage',
    title: 'Sabit Sayfalar',
    type: 'document',
    fields: [
        defineField({ name: 'title', title: 'Başlık', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'body', title: 'İçerik', type: 'array', of: [{ type: 'block' }] }),
    ],
})
