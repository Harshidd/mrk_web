import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'solutionCategory',
    title: 'Kategoriler (Projeler)',
    type: 'document',
    fields: [
        defineField({ 
            name: 'title', 
            title: 'Kategori Adı', 
            type: 'string', 
            options: { list: ['Eğitim Teknolojileri', 'Altyapı', 'Yapay Zekâ', 'Verimlilik'] },
            validation: (Rule) => Rule.required() 
        }),
        defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'shortSummary', title: 'Kısa Özet', type: 'text' }),
        defineField({ name: 'order', title: 'Sıra', type: 'number' }),
    ],
})
