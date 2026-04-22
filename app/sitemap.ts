import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

/** Усі публічні маршрути для індексації (узгоджено з навігацією сайту). */
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
	'/privacy',
	'/spa',
	'/team',
	'/wellness',
]

export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date()
	return paths.map(path => ({
		url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
		lastModified: now,
		changeFrequency: path === '/' ? 'weekly' : 'monthly',
		priority: path === '/' ? 1 : 0.8,
	}))
}
