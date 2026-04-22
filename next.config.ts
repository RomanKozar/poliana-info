import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
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
