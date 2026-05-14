import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Колись проіндексовані «сміттєві» корені (SEO-спам) — 301 на головну, щоб GSC поступово прибрав їх зі звітів.
 * Не зачіпає `/cat/...`, `/blog/...` тощо.
 */
const LEGACY_SPAM_ROOT_SEGMENTS = new Set([
	'97-ford-ranger-tool-box',
	'wireless-washing-machine',
	'popcorn-dispenser-machine',
	'how-to-care-for-lucky-bamboo-plant-in-water',
	'3-piece-ceramic-christmas-tree',
])

export function middleware(request: NextRequest) {
	const first = request.nextUrl.pathname.split('/').filter(Boolean)[0]
	if (first && LEGACY_SPAM_ROOT_SEGMENTS.has(first)) {
		return NextResponse.redirect(new URL('/', request.url), 301)
	}
	return NextResponse.next()
}

export const config = {
	matcher: [
		'/97-ford-ranger-tool-box/:path*',
		'/wireless-washing-machine/:path*',
		'/popcorn-dispenser-machine/:path*',
		'/how-to-care-for-lucky-bamboo-plant-in-water/:path*',
		'/3-piece-ceramic-christmas-tree/:path*',
	],
}
