'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AnimatedSection } from '@/components/AnimatedSection'
import { CheckCircle2, Loader2, Mail } from 'lucide-react'

function ContactContent() {
    const searchParams = useSearchParams()
    const initialTopic = searchParams?.get('konu') || ''
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        name: '', institution: '', email: '', phone: '',
        need: initialTopic ? `[${initialTopic}] hakkında:\n` : '',
        budget: '', kvkkConsent: false,
    })
    const [mounted, setMounted] = useState(false)
    useEffect(() => { setMounted(true) }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target
        if (type === 'checkbox') setFormData(p => ({ ...p, [name]: (e.target as HTMLInputElement).checked }))
        else setFormData(p => ({ ...p, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); setIsSubmitting(true); setError('')
        try {
            const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, sourcePage: window.location.href }) })
            if (!res.ok) throw new Error('Form gönderilirken bir hata oluştu.')
            setSuccess(true)
        } catch (err: any) { setError(err.message || 'Bilinmeyen hata.') }
        finally { setIsSubmitting(false) }
    }

    if (!mounted) return null
    const inp = "bg-white/60 border border-card-border rounded-2xl px-4 py-3.5 text-fg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-300 placeholder:text-subtle text-sm"

    return (
        <section className="relative z-[1] pt-36 pb-28 lg:pt-44 lg:pb-36">
            <div className="section-shell flex flex-col md:flex-row gap-14 lg:gap-20">
                <div className="md:w-5/12">
                    <AnimatedSection className="sticky top-32">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-fg mb-7">Birlikte Çözelim.</h1>
                        <p className="text-lg text-muted leading-relaxed mb-12">Dijital mimari ihtiyaçlarınızı netleştirmek, yeni bir araç veya çözüm talebinde bulunmak için formu doldurabilirsiniz.</p>
                        <div className="glass p-7 flex flex-col gap-5">
                            <div className="flex items-center gap-4 text-sm text-muted">
                                <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0"><Mail size={18} className="text-accent" /></div>
                                <span>Mümkün olan en kısa sürede dönüş sağlanır.</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted">
                                <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center shrink-0"><CheckCircle2 size={18} className="text-accent" /></div>
                                <span>Hiçbir detay angarya olarak görülmez.</span>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
                <div className="md:w-7/12">
                    <AnimatedSection delay={0.15} className="glass p-8 md:p-12">
                        {success ? (
                            <div className="flex flex-col items-center text-center py-14">
                                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-7"><CheckCircle2 size={32} /></div>
                                <h2 className="text-2xl font-semibold text-fg mb-4">Talebiniz Alındı</h2>
                                <p className="text-muted mb-8">Bilgileriniz başarıyla iletildi. En kısa sürede iletişime geçeceğiz.</p>
                                <button onClick={() => { setSuccess(false); setFormData({ ...formData, need: '', kvkkConsent: false }) }} className="px-6 py-2.5 bg-surface border border-card-border text-fg font-medium rounded-full hover:bg-surface-alt transition-colors text-sm">Yeni Bir Mesaj Gönder</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                                {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm">{error}</div>}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2"><label htmlFor="name" className="text-sm font-medium text-fg">Ad Soyad *</label><input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} className={inp} placeholder="Adınız Soyadınız" /></div>
                                    <div className="flex flex-col gap-2"><label htmlFor="institution" className="text-sm font-medium text-fg">Kurum / Şirket</label><input type="text" id="institution" name="institution" value={formData.institution} onChange={handleChange} className={inp} placeholder="Eğer varsa" /></div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-2"><label htmlFor="email" className="text-sm font-medium text-fg">E-Posta Adresi *</label><input type="email" id="email" name="email" required value={formData.email} onChange={handleChange} className={inp} placeholder="adiniz@ornek.com" /></div>
                                    <div className="flex flex-col gap-2"><label htmlFor="phone" className="text-sm font-medium text-fg">Telefon Numarası</label><input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inp} placeholder="+90 (___) __ ___ __" /></div>
                                </div>
                                <div className="flex flex-col gap-2"><label htmlFor="need" className="text-sm font-medium text-fg">İhtiyaç / Konu *</label><textarea id="need" name="need" required rows={4} value={formData.need} onChange={handleChange} className={`${inp} resize-y`} placeholder="Detaylardan bahsetmekten çekinmeyin." /></div>
                                <div className="flex flex-col gap-2"><label htmlFor="budget" className="text-sm font-medium text-fg">Tahmini Bütçe (Opsiyonel)</label>
                                    <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className={inp}>
                                        <option value="">Seçiniz</option>
                                        <option value="5k-20k">5.000₺ - 20.000₺</option>
                                        <option value="20k-50k">20.000₺ - 50.000₺</option>
                                        <option value="50k-100k">50.000₺ - 100.000₺</option>
                                        <option value="100k+">100.000₺ ve üzeri</option>
                                    </select>
                                </div>
                                <div className="flex items-start gap-3 mt-1">
                                    <div className="pt-0.5"><input type="checkbox" id="kvkkConsent" name="kvkkConsent" required checked={formData.kvkkConsent} onChange={handleChange} className="w-4 h-4 rounded border-card-border text-accent focus:ring-accent" /></div>
                                    <label htmlFor="kvkkConsent" className="text-xs text-muted leading-relaxed cursor-pointer select-none">
                                        Kişisel verilerimin iletişim amacıyla işlenmesi için <Link href="/kvkk" className="text-fg hover:underline font-medium" target="_blank">Aydınlatma Metnini</Link> okudum ve onaylıyorum. *
                                    </label>
                                </div>
                                <button type="submit" disabled={isSubmitting || !formData.kvkkConsent} className="mt-3 w-full py-4 btn-glow rounded-2xl text-sm disabled:opacity-50 disabled:!transform-none disabled:!shadow-none flex items-center justify-center gap-2">
                                    {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> İletiliyor...</> : 'Talebi Gönder'}
                                </button>
                            </form>
                        )}
                    </AnimatedSection>
                </div>
            </div>
        </section>
    )
}

export default function ContactPage() {
    return <Suspense fallback={<div className="py-28 text-center text-muted">Yükleniyor...</div>}><ContactContent /></Suspense>
}
