import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/** Менший бандл при імпорті з `react-icons/fa` (деревоподібне підвантаження іконок). */
	experimental: {
		optimizePackageImports: ['react-icons/fa'],
	},
	// Стабільна віддача sitemap для сканерів (Google Search Console).
	async headers() {
		return [
			{
				source: '/robots.txt',
				headers: [
					{
						key: 'Cache-Control',
						/** Коротший s-maxage — швидше підхоплюють оновлення robots у GSC / CDN. */
						value: 'public, max-age=0, s-maxage=600, stale-while-revalidate=86400',
					},
				],
			},
			{
				source: '/sitemap.xml',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
					},
				],
			},
		]
	},
	// Англомовна сторінка /privacy-policy (часто з боку хостингу) → наша українська політика
	async redirects() {
		return [
			// Старі PHP-запити → головна (Next не віддає index.php; у GSC був 4XX)
			{ source: '/index.php', destination: '/', permanent: true },
			{ source: '/index.php/', destination: '/', permanent: true },
			// Часта опечатка в Google Search Console: sitemax.xml → справжній sitemap Next.js
			{
				source: '/sitemax.xml',
				destination: '/sitemap.xml',
				permanent: true,
			},
			{
				source: '/accommodation/:id',
				destination: '/cat/goteli-polyany/:id',
				permanent: true,
			},
			{
				source: '/privacy-policy',
				destination: '/privacy',
				permanent: true,
			},
			{
				source: '/privacy-policy/',
				destination: '/privacy',
				permanent: true,
			},
		]
	},
}

export default nextConfig
