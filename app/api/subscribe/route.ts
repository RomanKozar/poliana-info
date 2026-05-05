import { NextResponse } from 'next/server'
import { appendToSheet, kyivDateTimeString } from '@/lib/google-sheets'

function asString(value: unknown): string | null {
	if (typeof value !== 'string') return null
	const trimmed = value.trim()
	return trimmed.length ? trimmed : null
}

function formatUaPhoneWithPlus(digits: string) {
	if (digits.startsWith('380')) return `+${digits}`
	if (digits.length === 10 && digits.startsWith('0')) return `+38${digits}`
	return `+${digits}`
}

export async function POST(req: Request) {
	let body: unknown
	try {
		body = await req.json()
	} catch {
		return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
	}

	const phone = asString((body as any)?.phone)
	if (!phone) return NextResponse.json({ error: 'Missing phone' }, { status: 400 })

	const digits = phone.replace(/\D/g, '')
	if (digits.length < 10 || digits.length > 12) {
		return NextResponse.json({ error: 'Invalid phone' }, { status: 400 })
	}

	const range = process.env.GOOGLE_SHEET_SUBSCRIBE_RANGE || 'Підписатися на оновлення!A:B'

	try {
		// Prefix with apostrophe so Sheets stores it as text (keeps leading 0 and the + sign).
		const phoneText = `'${formatUaPhoneWithPlus(digits)}`
		await appendToSheet({
			range,
			values: [['=TO_TEXT(ROW()-1)', kyivDateTimeString(), phoneText]],
		})
	} catch (error) {
		const message = error instanceof Error ? error.message : 'Unknown error'
		return NextResponse.json({ error: 'Google Sheets append failed', details: message }, { status: 500 })
	}

	return NextResponse.json({ ok: true })
}

