import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'post',
    title: 'Yazılar',
    type: 'document',
    preview: {
        select: { title: 'title', subtitle: 'category', media: 'coverImage' },
    },
    orderings: [
        { title: 'Yayın Tarihi', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    ],
    fields: [
        defineField({ name: 'title', title: 'Başlık', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'excerpt', title: 'Kısa Özet', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'slug', title: 'Slug (URL)', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
        defineField({
            name: 'category',
            title: 'Kategori',
            type: 'string',
            options: { list: ['Yapay Zekâ', 'Dijital Verimlilik', 'Gelişim Notları', 'Eğitim Teknolojileri'] },
            validation: (Rule) => Rule.required(),
        }),
        defineField({ name: 'body', title: 'İçerik', type: 'array', of: [{ type: 'block' }, { type: 'image' }], validation: (Rule) => Rule.required() }),
        defineField({ name: 'readingTime', title: 'Okuma Süresi (Dk)', type: 'number', description: 'Ortalama kaç dakikada okunur?' }),
        defineField({ name: 'coverImage', title: 'Kapak Görseli', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'featured', title: 'Öne Çıkar', type: 'boolean', initialValue: false }),
        defineField({ name: 'order', title: 'Sıra', type: 'number' }),
        defineField({ name: 'publishedAt', title: 'Yayın Tarihi', type: 'datetime' }),
    ],
})
