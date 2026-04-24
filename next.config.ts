import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	// Стабільна віддача sitemap для сканерів (Google Search Console).
	async headers() {
		return [
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
