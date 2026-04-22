import { SITE_URL } from '@/lib/seo'

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

function escapeXml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

export function GET() {
	const now = new Date().toISOString()
	const body =
		`<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
		paths
			.map(path => {
				const loc = path === '/' ? SITE_URL : `${SITE_URL}${path}`
				const priority = path === '/' ? '1.0' : '0.8'
				const changefreq = path === '/' ? 'weekly' : 'monthly'
				return (
					`  <url>\n` +
					`    <loc>${escapeXml(loc)}</loc>\n` +
					`    <lastmod>${now}</lastmod>\n` +
					`    <changefreq>${changefreq}</changefreq>\n` +
					`    <priority>${priority}</priority>\n` +
					`  </url>`
				)
			})
			.join('\n') +
		`\n</urlset>`

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=3600',
		},
	})
}
