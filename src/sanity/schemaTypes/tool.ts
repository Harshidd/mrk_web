import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'tool',
    title: 'Araçlar',
    type: 'document',
    preview: {
        select: { title: 'title', subtitle: 'forWhom.0' },
    },
    orderings: [
        { title: 'Sıra', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
    ],
    fields: [
        defineField({ name: 'title', title: 'Araç Adı', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'summary', title: 'Kısa Açıklama', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
        defineField({ 
            name: 'forWhom', 
            title: 'Etiketler', 
            type: 'array', 
            of: [{ type: 'string' }], 
            options: { 
                list: [
                    { title: 'Öğretmen', value: 'Öğretmen' },
                    { title: 'Geliştirici', value: 'Geliştirici' },
                    { title: 'BTY', value: 'BTY' },
                    { title: 'PDF', value: 'PDF' },
                    { title: 'Yapay Zekâ', value: 'Yapay Zekâ' },
                    { title: 'Verimlilik', value: 'Verimlilik' }
                ] 
            },
            description: 'Bu aracın hitap ettiği kitleleri seçin.',
            validation: (Rule) => Rule.required() 
        }),
        defineField({
            name: 'status',
            title: 'Durum',
            type: 'string',
            options: { list: ['Aktif', 'Yakında'] },
            initialValue: 'Aktif',
            validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'features', title: 'Özellikler', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'coverImage', title: 'İkon / Kapak', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'demoUrl', title: 'Link', type: 'url' }),
        defineField({ name: 'featured', title: 'Öne Çıkar', type: 'boolean', initialValue: false }),
        defineField({ name: 'order', title: 'Sıra', type: 'number', description: 'Küçük rakamlar yukarıda görünür.' }),
        defineField({ name: 'publishedAt', title: 'Yayın Tarihi', type: 'datetime' }),
    ],
})
