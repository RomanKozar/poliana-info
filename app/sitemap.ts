import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

/** Статичні маршрути для індексації. Пізніше можна додати динамічні URL з БД. */
const paths: string[] = [
	'/',
	'/about',
	'/accommodation',
	'/blog',
	'/blog/latest-news',
	'/blog/poliana-in-spring',
	'/blog/summer-vacation',
	'/blog/autumn-vacation',
	'/blog/poliana-in-winter',
	'/camps',
	'/contacts',
	'/entertainment',
	'/gastronomy',
	'/kids-camps',
	'/poliana',
	'/polianski',
	'/spa',
	'/team',
	'/wellness',
]

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date()
	return paths.map(path => ({
		url: `${SITE_URL}${path === '/' ? '' : path}`,
		lastModified: now,
		changeFrequency: path === '/' ? ('weekly' as const) : ('monthly' as const),
		priority: path === '/' ? 1 : 0.8,
	}))
}
