'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Zap, Shield, CheckCircle2 } from 'lucide-react'

/* ───────────────────────────────────────
   Animated Counter — count-up on scroll
   ─────────────────────────────────────── */
function Counter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
    const [val, setVal] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) {
                const dur = 2200
                const t0 = performance.now()
                const tick = (now: number) => {
                    const p = Math.min((now - t0) / dur, 1)
                    setVal(Math.round((1 - Math.pow(1 - p, 3)) * target))
                    if (p < 1) requestAnimationFrame(tick)
                }
                requestAnimationFrame(tick)
                obs.disconnect()
            }
        }, { threshold: 0.5 })
        obs.observe(el)
        return () => obs.disconnect()
    }, [target])

    return <span ref={ref} className="metric-num">{prefix}{val}{suffix}</span>
}

/* ───────────────────────────────────────
   DashboardMock — Hero right-side product UI
   
   Designed to look like a real analytics dashboard.
   Animated chart bars + KPI tiles + floating chip.
   ─────────────────────────────────────── */
export function DashboardMock() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass border-beam p-6 md:p-8 space-y-5"
            style={{ borderRadius: 28 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-[10px] text-subtle uppercase tracking-[0.15em] font-semibold mb-1">Sınav Performans Paneli</p>
                    <p className="text-xl font-bold text-fg">BiSınıf Analitik</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-subtle uppercase tracking-[0.15em] font-semibold">Ortalama Başarı</p>
                    <p className="text-3xl font-bold text-accent metric-num">78.4<span className="text-sm text-subtle ml-0.5">%</span></p>
                </div>
            </div>

            {/* Chart area */}
            <div className="bg-bg/60 rounded-2xl p-5 border border-card-border">
                <div className="flex items-end gap-[5px] h-28">
                    {[45, 62, 55, 78, 68, 85, 72, 90, 82, 76, 88, 94].map((v, i) => (
                        <motion.div
                            key={i}
                            className="flex-1 rounded-md"
                            initial={{ height: 0 }}
                            whileInView={{ height: `${v}%` }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            style={{ background: `linear-gradient(to top, rgba(13,148,136,0.4), rgba(13,148,136,0.08))` }}
                        />
                    ))}
                </div>
                <div className="flex justify-between mt-3 text-[8px] text-subtle font-semibold tracking-wider">
                    {['OCA', 'ŞUB', 'MAR', 'NİS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKİ', 'KAS', 'ARA'].map(m => <span key={m}>{m}</span>)}
                </div>
            </div>

            {/* KPI tiles */}
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-bg/60 rounded-2xl p-4 border border-card-border">
                    <p className="text-[9px] text-subtle uppercase tracking-[0.15em] font-semibold mb-1">En Yüksek</p>
                    <p className="text-sm font-semibold text-fg">Elif Yılmaz</p>
                    <p className="text-xs text-accent mt-1 font-medium">96.2 puan</p>
                </div>
                <div className="bg-bg/60 rounded-2xl p-4 border border-card-border">
                    <p className="text-[9px] text-subtle uppercase tracking-[0.15em] font-semibold mb-1">Gelişim Oranı</p>
                    <p className="text-sm font-semibold text-fg">+12.4%</p>
                    <p className="text-xs text-emerald-600 mt-1 font-medium">↑ son 3 ay</p>
                </div>
            </div>
        </motion.div>
    )
}

/* ───────────────────────────────────────
   CodePanel — dark code window
   
   Line highlight animation sweeps every 6s.
   Syntax coloring for keywords.
   ─────────────────────────────────────── */
export function CodePanel({ lines }: { lines?: string[] }) {
    const code = lines || [
        '// BiSınıf Optik Motor v3.2',
        'const results = await scanner.read({',
        '  format: "A4_OPTIC",',
        '  students: classroom.list(),',
        '  threshold: 0.92',
        '});',
        '',
        'await analytics.process(results);',
        'console.log(`${results.length} sınav`);',
    ]

    const colorize = (line: string, i: number) => {
        if (line.startsWith('//')) return 'text-slate-500 italic'
        if (line.includes('await') || line.includes('const')) return 'text-blue-400'
        if (line.includes('"') || line.includes("'") || line.includes('`')) return 'text-emerald-400'
        if (i === code.length - 1) return 'text-slate-300 cursor-blink'
        return 'text-slate-300'
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="code-panel"
        >
            <div className="code-panel-header">
                <span className="code-dot code-dot-red" />
                <span className="code-dot code-dot-amber" />
                <span className="code-dot code-dot-green" />
                <span className="ml-3 text-[10px] text-slate-500 font-medium">scanner.ts</span>
            </div>
            <div className="p-5 overflow-x-auto">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
                    }}
                >
                    {code.map((line, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, x: -10 },
                                show: { opacity: 1, x: 0 }
                            }}
                            transition={{ duration: 0.5 }}
                            className={`flex gap-4 ${i === 1 ? 'code-line-highlight' : ''}`}
                        >
                            <span className="text-slate-600 select-none w-4 text-right shrink-0 text-[11px]">{i + 1}</span>
                            <span className={colorize(line, i)}>
                                {line || '\u00A0'}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    )
}

/* ───────────────────────────────────────
   MetricStrip — animated KPIs
   ─────────────────────────────────────── */
export function MetricStrip() {
    const metrics = [
        { icon: Activity, label: 'Yanıt süresi', value: 42, suffix: 'ms', color: 'text-blue-500', bg: 'icon-halo' },
        { icon: Zap, label: 'Günlük işlem', value: 1240, suffix: '+', color: 'text-amber-500', bg: 'icon-halo' },
        { icon: Shield, label: 'Sistem uptime', value: 99, suffix: '.9%', color: 'text-emerald-500', bg: 'icon-halo' },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="glass p-6 space-y-4"
        >
            <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-semibold text-subtle uppercase tracking-[0.15em]">Sistem Durumu — Canlı</span>
            </div>
            {metrics.map((m, i) => (
                <div key={i} className="flex items-center justify-between py-3 border-b border-card-border last:border-0">
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl ${m.bg} flex items-center justify-center`}>
                            <m.icon size={15} className={m.color} />
                        </div>
                        <span className="text-sm text-muted">{m.label}</span>
                    </div>
                    <span className="text-lg font-bold text-fg">
                        <Counter target={m.value} suffix={m.suffix} />
                    </span>
                </div>
            ))}
        </motion.div>
    )
}

/* ───────────────────────────────────────
   WorkflowStrip — 4-step pipeline
   ─────────────────────────────────────── */
export function WorkflowStrip() {
    const steps = [
        { num: '01', label: 'Problem', desc: 'Sahadan veri toplama', active: false },
        { num: '02', label: 'Veri', desc: 'Optik okuma + analiz', active: false },
        { num: '03', label: 'Yapay Zekâ', desc: 'Desen tanıma', active: false },
        { num: '04', label: 'Çıktı', desc: 'Raporlar ve içgörü', active: true },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass p-6"
        >
            <span className="text-[10px] font-semibold text-subtle uppercase tracking-[0.15em] mb-6 block">İş Akışı</span>
            <div className="flex items-start gap-0">
                {steps.map((s, i) => (
                    <motion.div
                        key={i}
                        className="flex-1 relative"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold mb-2 transition-all ${s.active
                                ? 'bg-accent text-white shadow-lg shadow-accent/20'
                                : 'icon-halo text-muted'
                                }`}>
                                {s.active ? <CheckCircle2 size={16} /> : s.num}
                            </div>
                            <span className="text-[11px] font-semibold text-fg">{s.label}</span>
                            <span className="text-[9px] text-subtle mt-0.5 leading-tight max-w-[80px]">{s.desc}</span>
                        </div>
                        {i < steps.length - 1 && (
                            <div className="absolute top-5 left-[calc(50%+20px)] w-[calc(100%-40px)] h-px bg-card-border" />
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
