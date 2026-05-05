import { NextResponse } from 'next/server'
import { appendToSheet, kyivDateTimeString } from '@/lib/google-sheets'

type FeedbackPayload = {
	name: string | null
	phone: string | null
	message: string
	pageUrl: string | null
}

function asStringOrNull(value: unknown): string | null {
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

	const payload = body as Partial<FeedbackPayload>
	const message = asStringOrNull(payload.message)
	const name = asStringOrNull(payload.name)
	const phone = asStringOrNull(payload.phone)
	const pageUrl = asStringOrNull(payload.pageUrl)

	if (!name || name.length < 2) {
		return NextResponse.json({ error: 'Name is required' }, { status: 400 })
	}
	if (!phone) {
		return NextResponse.json({ error: 'Phone is required' }, { status: 400 })
	}
	const MESSAGE_MAX_LENGTH = 1000
	if (!message || message.length < 10) {
		return NextResponse.json({ error: 'Message too short' }, { status: 400 })
	}
	if (message.length > MESSAGE_MAX_LENGTH) {
		return NextResponse.json({ error: 'Message too long' }, { status: 400 })
	}
	if (name && name.length > 80) {
		return NextResponse.json({ error: 'Name too long' }, { status: 400 })
	}
	if (phone && phone.length > 16) {
		return NextResponse.json({ error: 'Phone too long' }, { status: 400 })
	}
	const phoneDigitsOnly = phone.replace(/\D/g, '')
	if (phoneDigitsOnly.length < 10 || phoneDigitsOnly.length > 12) {
		return NextResponse.json({ error: 'Invalid phone' }, { status: 400 })
	}

	const range = process.env.GOOGLE_SHEET_FEEDBACK_RANGE || 'Зворотній звязок!A:E'

	try {
		const phoneDigits = phone.replace(/\D/g, '')
		// Prefix with apostrophe so Sheets stores it as text (keeps leading 0 and the + sign).
		const phoneText = `'${formatUaPhoneWithPlus(phoneDigits)}`
		await appendToSheet({
			range,
			values: [['=TO_TEXT(ROW()-1)', kyivDateTimeString(), name || 'Без імені', phoneText, message]],
		})
	} catch (error) {
		const message =
			error instanceof Error ? error.message : 'Unknown error'
		return NextResponse.json({ error: 'Google Sheets append failed', details: message }, { status: 500 })
	}

	return NextResponse.json({ ok: true })
}

