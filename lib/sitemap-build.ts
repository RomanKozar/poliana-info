import { categoryPlaceholderSlugs } from '@/data/category-placeholders'
import { polyanaHotels } from '@/lib/polyana-hotels'
import { SITE_URL } from '@/lib/seo'

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

type SitemapUrlEntry = {
	loc: string
	lastModified: Date
	changeFrequency: ChangeFreq
	priority: number
}

function pageUrl(pathname: string): string {
	const base = SITE_URL.replace(/\/$/, '')
	if (!pathname || pathname === '/') return base
	const path = pathname.startsWith('/') ? pathname : `/${pathname}`
	return `${base}${path}`
}

function escapeXmlLoc(url: string): string {
	return url.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** Формат W3C date-only (YYYY-MM-DD) — достатньо для sitemap і без зайвих мілісекунд у XML. */
function lastmodDateOnly(d: Date): string {
	return d.toISOString().slice(0, 10)
}

function collectSitemapEntries(): SitemapUrlEntry[] {
	const lastModified = new Date()

	const categoryUrls: SitemapUrlEntry[] = categoryPlaceholderSlugs.map(slug => ({
		loc: pageUrl(`/cat/${slug}`),
		lastModified,
		changeFrequency: 'monthly',
		priority: 0.65,
	}))

	const accommodationDetailUrls: SitemapUrlEntry[] = polyanaHotels.map(hotel => ({
		loc: pageUrl(`/cat/goteli-polyany/${hotel.id}`),
		lastModified,
		changeFrequency: 'weekly',
		priority: 0.75,
	}))

	return [
		{ loc: pageUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
		{ loc: pageUrl('/aktsii-ta-propozitsii'), lastModified, changeFrequency: 'weekly', priority: 0.82 },
		{ loc: pageUrl('/about'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/accommodation'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/blog'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/blog/latest-news'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/blog/poliana-in-spring'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/blog/summer-vacation'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/blog/autumn-vacation'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/blog/poliana-in-winter'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/camps'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/camps/polianski-camp'), lastModified, changeFrequency: 'monthly', priority: 0.76 },
		{ loc: pageUrl('/camps/quest-camp'), lastModified, changeFrequency: 'monthly', priority: 0.76 },
		{ loc: pageUrl('/camps/theater-camp'), lastModified, changeFrequency: 'monthly', priority: 0.76 },
		{ loc: pageUrl('/camps/tourist-camp'), lastModified, changeFrequency: 'monthly', priority: 0.76 },
		{ loc: pageUrl('/contacts'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/excursions'), lastModified, changeFrequency: 'weekly', priority: 0.85 },
		{ loc: pageUrl('/excursions/quadro-ride'), lastModified, changeFrequency: 'weekly', priority: 0.82 },
		{ loc: pageUrl('/entertainment'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/gastronomy'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/kids-camps'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/poliana'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/polianski'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/privacy'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/search'), lastModified, changeFrequency: 'monthly', priority: 0.55 },
		{ loc: pageUrl('/spa'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ loc: pageUrl('/cat/spa-bani-chany/veliki-chany'), lastModified, changeFrequency: 'monthly', priority: 0.68 },
		{ loc: pageUrl('/cat/spa-bani-chany/mali-chany'), lastModified, changeFrequency: 'monthly', priority: 0.68 },
		{ loc: pageUrl('/cat/spa-bani-chany/bani'), lastModified, changeFrequency: 'monthly', priority: 0.68 },
		{ loc: pageUrl('/cat/spa-bani-chany/baseni'), lastModified, changeFrequency: 'monthly', priority: 0.68 },
		{ loc: pageUrl('/wellness'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		...accommodationDetailUrls,
		...categoryUrls,
	]
}

/** Повний XML sitemap.org 0.9 для віддачі через Route Handler (стабільніше за вбудований metadata sitemap на частині хостингів). */
export function buildPolyanaSitemapXml(): string {
	const entries = collectSitemapEntries()

	const body = entries
		.map(
			e => `  <url>
    <loc>${escapeXmlLoc(e.loc)}</loc>
    <lastmod>${lastmodDateOnly(e.lastModified)}</lastmod>
    <changefreq>${e.changeFrequency}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
		)
		.join('\n')

	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
}

/** Для тестів / діагностики: кількість URL у sitemap. */
export function polyanaSitemapUrlCount(): number {
	return collectSitemapEntries().length
}
