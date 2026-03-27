import type { SiteSettings } from '@/types/content'

/**
 * Merkezi fallback Site Ayarları.
 * Sanity'de Site Ayarları belgesi yayımlandığında bu değerler otomatik olarak
 * Sanity içeriğiyle override edilir. Burayı değiştirmeyin — Sanity Studio'dan yönetin.
 */
export const fallbackSettings: SiteSettings = {
    siteTitle: 'MRKDEV',
    siteDescription: 'Eğitim odaklı dijital sistemler, mini araçlar ve veri odaklı üretim notları.',
    email: '',
    whatsappNumber: '',
    socialLinks: {
        x: '',
        linkedin: '',
        github: '',
        youtube: '',
    },
    homeHero: {
        heroTagline: 'Eğitim + Yapay Zekâ',
        headline: 'Eğitimde ve günlük işlerde karmaşayı azaltan küçük ama güçlü dijital sistemler kuruyorum.',
        subheadline: 'Öğretmen kökenli bir geliştiriciyim. Okullar ve ekipler için veri analizi, sınav sistemleri ve yapay zekâ destekli araçlar geliştiriyorum.',
        primaryCtaLabel: 'Projeleri İncele',
        primaryCtaUrl: '/projeler',
        secondaryCtaLabel: 'İletişime Geç',
        secondaryCtaUrl: '/iletisim',
    },
}

/**
 * Sanity Settings ile fallback'i birleştirir.
 * Sanity değeri varsa öncelik Sanity'dedir; yoksa fallback devreye girer.
 */
export function mergeSettings(cmsSettings: SiteSettings | null): SiteSettings {
    if (!cmsSettings) return fallbackSettings

    return {
        ...fallbackSettings,
        ...cmsSettings,
        homeHero: {
            ...fallbackSettings.homeHero,
            ...cmsSettings.homeHero,
        },
        socialLinks: {
            ...fallbackSettings.socialLinks,
            ...cmsSettings.socialLinks,
        },
    }
}
