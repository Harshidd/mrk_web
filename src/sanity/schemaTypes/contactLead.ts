import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'contactLead',
    title: 'İletişim Talepleri',
    type: 'document',
    fields: [
        defineField({ name: 'name', title: 'İsim', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'institution', title: 'Kurum', type: 'string' }),
        defineField({ name: 'email', title: 'E-posta', type: 'string', validation: (Rule) => Rule.required().email() }),
        defineField({ name: 'phone', title: 'Telefon', type: 'string' }),
        defineField({ name: 'need', title: 'İhtiyaç / Not', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'budget', title: 'Bütçe', type: 'string' }),
        defineField({ name: 'sourcePage', title: 'Kaynak Sayfa', type: 'string' }),
        defineField({
            name: 'createdAt',
            title: 'Oluşturulma Tarihi',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
})
