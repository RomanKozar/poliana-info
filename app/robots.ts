import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

/**
 * Публічний `/robots.txt` (статично збирається). Має містити `Sitemap:` — інакше GSC інколи
 * довго тримає стару кешовану копію без неї. Після деплою: у GSC «Перевірка реальної URL» для robots.txt.
 */
export default function robots(): MetadataRoute.Robots {
	const base = SITE_URL.replace(/\/$/, '')
	return {
		rules: [
			{
				userAgent: '*',
				allow: '/',
				disallow: ['/404'],
			},
		],
		sitemap: `${base}/sitemap.xml`,
		host: base,
	}
}
