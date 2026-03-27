import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Projeler',
    type: 'document',
    preview: {
        select: { title: 'title', subtitle: 'status', media: 'coverImage' },
    },
    orderings: [
        { title: 'Yayın Tarihi', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
        { title: 'Sıra', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    ],
    fields: [
        defineField({ name: 'title', title: 'Başlık', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'summary', title: 'Kısa Açıklama', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
        defineField({
            name: 'status',
            title: 'Durum',
            type: 'string',
            options: { list: ['Canlı', 'Demo', 'Gelişimde', 'Konsept'] },
            validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'category', title: 'Kategori', type: 'reference', to: [{ type: 'solutionCategory' }] }),
        defineField({ name: 'coverImage', title: 'Kapak Görseli', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'problem', title: 'Problem', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() }),
        defineField({ name: 'solution', title: 'Çözüm', type: 'array', of: [{ type: 'block' }], validation: (Rule) => Rule.required() }),
        defineField({ 
            name: 'techStack', 
            title: 'Teknolojiler', 
            type: 'array', 
            of: [{ type: 'string' }], 
            options: { layout: 'tags' },
            description: 'Önerilenler: Next.js, TypeScript, Tailwind, Sanity, Python, FastAPI, SQLite, PostgreSQL' 
        }),
        defineField({
            name: 'results',
            title: 'Sonuçlar',
            type: 'array',
            of: [{
                type: 'object', fields: [
                    { name: 'label', title: 'Ölçüm', type: 'string' },
                    { name: 'value', title: 'Değer', type: 'string' },
                    { name: 'note', title: 'Ek Not', type: 'string' },
                ]
            }]
        }),
        defineField({ name: 'gallery', title: 'Galeri', type: 'array', of: [{ type: 'image' }] }),
        defineField({ name: 'featured', title: 'Öne Çıkar', type: 'boolean', initialValue: false }),
        defineField({ name: 'order', title: 'Sıra', type: 'number', description: 'Küçük rakamlar yukarıda görünür.' }),
        defineField({ name: 'publishedAt', title: 'Yayın Tarihi', type: 'datetime' }),
        defineField({ name: 'ctaLabel', title: 'CTA Metni', type: 'string' }),
        defineField({ name: 'ctaUrl', title: 'CTA Linki', type: 'string' }),
    ],
})
