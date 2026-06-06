import type { MetadataRoute } from 'next'
import { collectPolyanaSitemapRoutes } from '@/lib/sitemap-build'

/** Статичний sitemap.xml на збірці — Google Search Console читає його надійніше за динамічний route handler. */
export default function sitemap(): MetadataRoute.Sitemap {
	return collectPolyanaSitemapRoutes()
}
