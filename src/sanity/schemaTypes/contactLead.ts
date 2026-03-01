import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'contactLead',
    title: 'Contact Lead',
    type: 'document',
    fields: [
        defineField({ name: 'name', type: 'string', validation: (Rule) => Rule.required() }),
        defineField({ name: 'institution', type: 'string' }),
        defineField({ name: 'email', type: 'string', validation: (Rule) => Rule.required().email() }),
        defineField({ name: 'phone', type: 'string' }),
        defineField({ name: 'need', type: 'text', validation: (Rule) => Rule.required() }),
        defineField({ name: 'budget', type: 'string' }),
        defineField({ name: 'sourcePage', type: 'string' }),
        defineField({
            name: 'createdAt',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
})
