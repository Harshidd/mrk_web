'use client'

import { MessageCircle } from 'lucide-react'

export function FloatingWhatsApp({ number }: { number: string }) {
    // Extract only digits
    const cleanNumber = number.replace(/\D/g, '')

    return (
        <a
            href={`https://wa.me/${cleanNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 p-4 bg-green-500 text-white rounded-full shadow-[0_4px_24px_rgba(34,197,94,0.4)] hover:scale-110 hover:shadow-[0_8px_32px_rgba(34,197,94,0.6)] transition-all duration-300 flex items-center justify-center group"
            aria-label="WhatsApp"
        >
            <MessageCircle size={24} className="group-hover:animate-pulse" />
        </a>
    )
}
