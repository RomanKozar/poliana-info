import { APPLE_APP_SITE_ASSOCIATION_JSON, APPLE_AASA_HEADERS } from '@/lib/apple-app-site-association'

/** Деякі сканери звертаються без префікса `/.well-known/`. */
export const dynamic = 'force-static'

export function GET() {
	return new Response(APPLE_APP_SITE_ASSOCIATION_JSON, { status: 200, headers: APPLE_AASA_HEADERS })
}
