import { buildPolyanaSitemapXml } from '@/lib/sitemap-build'

/** Той самий XML, що `/sitemap.xml` (`app/sitemap.ts`). Для сумісності з `/api/sitemap`. */
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
