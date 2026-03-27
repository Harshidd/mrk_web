import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Ayarları',
    type: 'document',
    fields: [
        defineField({ name: 'siteTitle', title: 'Site Adı', type: 'string', description: 'Tarayıcı sekmesinde ve arama motorlarında görünen ana başlık.', validation: (Rule) => Rule.required() }),
        defineField({ name: 'logoText', title: 'Logo Yazısı', type: 'string', description: 'Sol üstte görünen logo metni (örn: MRKDESIGN).' }),
        defineField({ name: 'siteDescription', title: 'Footer Açıklaması', type: 'text', description: 'Footer bölümünde gösterilecek kısa açıklama.' }),
        defineField({ name: 'email', title: 'E-posta', type: 'string', description: 'İletişim için kullanılacak birincil e-posta adresi.' }),
        defineField({ name: 'whatsappNumber', title: 'WhatsApp Linki / Numarası', type: 'string', description: 'Sadece rakam olarak girin. Örn: 905551234567' }),
        defineField({
            name: 'socialLinks',
            title: 'Sosyal Medya Linkleri',
            type: 'object',
            fields: [
                { name: 'x', title: 'X (Twitter)', type: 'url' },
                { name: 'linkedin', title: 'LinkedIn', type: 'url' },
                { name: 'github', title: 'GitHub', type: 'url' },
                { name: 'youtube', title: 'YouTube', type: 'url' },
            ],
            options: { collapsible: true, collapsed: false }
        }),
        defineField({
            name: 'homeHero',
            title: 'Hero Alanı (Anasayfa)',
            type: 'object',
            fields: [
                { name: 'heroTagline', title: 'Hero Rozeti', type: 'string', description: 'Hero alanında en üstte yer alan küçük rozet yazısı.' },
                { name: 'headline', title: 'Hero Başlığı', type: 'string', description: 'Sitenin ana değer önerisi (Büyük başlık).' },
                { name: 'subheadline', title: 'Hero Açıklaması', type: 'text', description: 'Başlığın altındaki detaylı açıklama metni.' },
                { name: 'primaryCtaLabel', title: 'Ana Buton Metni', type: 'string', description: 'Hero alanında ana butonda görünecek metin.' },
                { name: 'primaryCtaUrl', title: 'Ana Buton URL', type: 'string', description: 'Butona tıklanınca gidilecek sayfa veya bağlantı (örn: /projeler).' },
                { name: 'secondaryCtaLabel', title: 'İkincil Buton Metni', type: 'string' },
                { name: 'secondaryCtaUrl', title: 'İkincil Buton URL', type: 'string' },
            ],
            options: { collapsible: true, collapsed: false }
        }),
    ],
})
