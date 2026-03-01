import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '@/sanity/env'

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN, // Use appropriate token with write access
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, institution, email, phone, need, budget, kvkkConsent, sourcePage } = body

        if (!name || !email || !need || !kvkkConsent) {
            return NextResponse.json({ message: 'Zorunlu alanlar eksik.' }, { status: 400 })
        }

        // Attempt to write to Sanity. 
        // If no write token is provided in env, this will fail. That's fine as per requirements.
        if (client.config().token) {
            await client.create({
                _type: 'contactLead',
                name,
                institution,
                email,
                phone,
                need,
                budget,
                sourcePage,
            })
        } else {
            console.warn('No SANITY_API_WRITE_TOKEN, skipping write to Sanity.')
        }

        // In a real app, you might also send an email via Resend or Sendgrid here

        return NextResponse.json({ message: 'Success' }, { status: 200 })
    } catch (err: any) {
        console.error('Contact error:', err)
        return NextResponse.json({ message: 'Form gönderilirken hata oluştu.' }, { status: 500 })
    }
}
