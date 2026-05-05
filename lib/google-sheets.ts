import { google } from 'googleapis'

function requiredEnv(name: string): string {
	const value = process.env[name]
	if (!value) {
		throw new Error(`Missing env var: ${name}`)
	}
	return value
}

function getAuth() {
	const clientEmail = requiredEnv('GOOGLE_CLIENT_EMAIL')
	const privateKey = requiredEnv('GOOGLE_PRIVATE_KEY').replace(/\\n/g, '\n')

	return new google.auth.GoogleAuth({
		credentials: {
			client_email: clientEmail,
			private_key: privateKey,
		},
		scopes: ['https://www.googleapis.com/auth/spreadsheets'],
	})
}

export async function appendToSheet(opts: { range: string; values: (string | number | null)[][] }) {
	const spreadsheetId = requiredEnv('GOOGLE_SHEET_ID')
	const auth = getAuth()
	const sheets = google.sheets({ version: 'v4', auth })

	await sheets.spreadsheets.values.append({
		spreadsheetId,
		range: opts.range,
		valueInputOption: 'USER_ENTERED',
		requestBody: { values: opts.values },
	})
}

export function kyivDateTimeString(date = new Date()) {
	return date.toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' })
}

