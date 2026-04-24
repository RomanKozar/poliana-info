import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

/** Генерує /sitemap.xml через App Router (коректніший варіант, ніж лише public/sitemap.xml на проді). */
const lastModified = new Date('2026-04-22')

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: SITE_URL, lastModified, changeFrequency: 'weekly', priority: 1 },
		{ url: `${SITE_URL}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/accommodation`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/blog`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/blog/latest-news`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/blog/poliana-in-spring`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/blog/summer-vacation`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/blog/autumn-vacation`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/blog/poliana-in-winter`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/camps`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/contacts`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/entertainment`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/gastronomy`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/kids-camps`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/poliana`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/polianski`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/privacy`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/spa`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/team`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
		{ url: `${SITE_URL}/wellness`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
	]
}
