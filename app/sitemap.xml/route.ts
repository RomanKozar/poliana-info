import { buildPolyanaSitemapXml } from '@/lib/sitemap-build'

export const dynamic = 'force-static'

/** Статичний sitemap.org XML для Google (date-only lastmod, без MetadataRoute). */
export function GET() {
	const xml = buildPolyanaSitemapXml()

	return new Response(xml, {
		status: 200,
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
		},
	})
}
