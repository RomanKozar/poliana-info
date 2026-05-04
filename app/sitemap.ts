import type { MetadataRoute } from 'next'
import { categoryPlaceholderSlugs } from '@/data/category-placeholders'
import { polyanaHotels } from '@/lib/polyana-hotels'
import { SITE_URL } from '@/lib/seo'

/** Статична збірка маршруту /sitemap.xml — менше шансів на помилки при зверненні Googlebot. */
export const dynamic = 'force-static'

/** Генерує /sitemap.xml через App Router. */
const lastModified = new Date()

function pageUrl(pathname: string): string {
	const base = SITE_URL.replace(/\/$/, '')
	if (!pathname || pathname === '/') return base
	const path = pathname.startsWith('/') ? pathname : `/${pathname}`
	return `${base}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
	const categoryUrls: MetadataRoute.Sitemap = categoryPlaceholderSlugs.map(slug => ({
		url: pageUrl(`/cat/${slug}`),
		lastModified,
		changeFrequency: 'monthly' as const,
		priority: 0.65,
	}))

	const accommodationDetailUrls: MetadataRoute.Sitemap = polyanaHotels.map(hotel => ({
		url: pageUrl(`/cat/goteli-polyany/${hotel.id}`),
		lastModified,
		changeFrequency: 'weekly' as const,
		priority: 0.75,
	}))

	return [
		{ url: pageUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
		{
			url: pageUrl('/aktsii-ta-propozitsii'),
			lastModified,
			changeFrequency: 'weekly' as const,
			priority: 0.82,
		},
		{ url: pageUrl('/about'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/accommodation'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/blog'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/blog/latest-news'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/blog/poliana-in-spring'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/blog/summer-vacation'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/blog/autumn-vacation'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/blog/poliana-in-winter'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/camps'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{
			url: pageUrl('/camps/polianski-camp'),
			lastModified,
			changeFrequency: 'monthly' as const,
			priority: 0.76,
		},
		{
			url: pageUrl('/camps/quest-camp'),
			lastModified,
			changeFrequency: 'monthly' as const,
			priority: 0.76,
		},
		{
			url: pageUrl('/camps/theater-camp'),
			lastModified,
			changeFrequency: 'monthly' as const,
			priority: 0.76,
		},
		{
			url: pageUrl('/camps/tourist-camp'),
			lastModified,
			changeFrequency: 'monthly' as const,
			priority: 0.76,
		},
		{ url: pageUrl('/contacts'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/excursions'), lastModified, changeFrequency: 'weekly', priority: 0.85 },
		{
			url: pageUrl('/excursions/quadro-ride'),
			lastModified,
			changeFrequency: 'weekly',
			priority: 0.82,
		},
		{ url: pageUrl('/entertainment'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/gastronomy'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/kids-camps'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/poliana'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/polianski'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/privacy'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/spa'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/wellness'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		...accommodationDetailUrls,
		...categoryUrls,
	]
}
