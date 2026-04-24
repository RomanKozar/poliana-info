import type { MetadataRoute } from 'next'
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
	return [
		{ url: pageUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
		{ url: pageUrl('/about'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/accommodation'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/blog'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/blog/latest-news'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/blog/poliana-in-spring'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/blog/summer-vacation'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/blog/autumn-vacation'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/blog/poliana-in-winter'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/camps'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/contacts'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/entertainment'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/gastronomy'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/kids-camps'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/poliana'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/polianski'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/privacy'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/spa'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/team'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: pageUrl('/wellness'), lastModified, changeFrequency: 'monthly', priority: 0.8 },
	]
}
