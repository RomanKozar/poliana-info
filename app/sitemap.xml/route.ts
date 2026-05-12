import { buildPolyanaSitemapXml } from '@/lib/sitemap-build'

/** Статична відповідь на GET /sitemap.xml (уникаємо 500 на проді з metadata sitemap у деяких конфігураціях). */
export const dynamic = 'force-static'

export async function GET() {
	const xml = buildPolyanaSitemapXml()
	return new Response(xml, {
		status: 200,
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
		},
	})
}
