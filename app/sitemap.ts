import type { MetadataRoute } from 'next'
import { polyanaSitemapForNext } from '@/lib/sitemap-build'

/** Карта сайту для Google: https://polyana.info/sitemap.xml */
export default function sitemap(): MetadataRoute.Sitemap {
	return polyanaSitemapForNext()
}
