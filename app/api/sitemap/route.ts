import { buildPolyanaSitemapXml } from '@/lib/sitemap-build'

/**
 * XML sitemap за `/api/sitemap`; публічний URL `/sitemap.xml` задається через `rewrites` у `next.config.ts`
 * (на Vercel маршрут `app/sitemap.xml/` інколи віддавав 500).
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
