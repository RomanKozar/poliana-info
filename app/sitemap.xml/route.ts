import { buildPolyanaSitemapXml } from '@/lib/sitemap-build'

/**
 * Прямий GET `/sitemap.xml` без rewrite на `/api/sitemap` — зручніше для Googlebot
 * і для Search Console (інколи rewrite давав неоднозначну відповідь).
 * `/api/sitemap` лишається для сумісності зі старими посиланнями.
 */
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
