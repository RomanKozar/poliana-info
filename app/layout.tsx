import localFont from 'next/font/local'
import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SITE_URL } from '@/lib/seo'

// Налаштовуємо шрифт Geometria
const geometria = localFont({
	src: [
		{
			path: './fonts/Geometria.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: './fonts/Geometria-Medium.ttf',
			weight: '500',
			style: 'normal',
		},
		{
			path: './fonts/Geometria-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: './fonts/Geometria-ExtraBold.ttf',
			weight: '800',
			style: 'normal',
		},
		{
			path: './fonts/Geometria-Heavy.ttf',
			weight: '900',
			style: 'normal',
		},
	],
	variable: '--font-geometria',
	display: 'swap',
})

/** Верифікація Google Search Console (видно в HTML; можна перевизначити через NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION). */
const googleSiteVerification =
	process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ||
	'Hkhwl1rZKipYTUNMgJO1f0ST9tZe7ReWVLVEuk2hXug'

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: 'POLYANA.INFO — туристичний портал Поляни',
		template: '%s | POLYANA.INFO',
	},
	description:
		'Туристичний портал Поляни: екскурсії й квадроцикли в Поляні, готелі та житло, чани й SPA в Карпатах, табори, лижі, тюбінг, санаторії. Закарпаття — карта курорту, новини та поради гостям.',
	icons: {
		icon: '/images/branding/info1-tab.svg',
		shortcut: '/images/branding/info1-tab.svg',
		apple: '/images/branding/info1.png',
	},
	openGraph: {
		title: 'POLYANA.INFO — туристичний портал Поляни',
		description:
			'POLYANA.INFO: екскурсії й квадроцикли в Поляні, готелі та житло в Карпатах, SPA, табори й розваги на Закарпатті.',
		url: SITE_URL,
		siteName: 'POLYANA.INFO',
		locale: 'uk_UA',
		type: 'website',
		images: [
			{
				url: '/preview-v2.png',
				width: 1200,
				height: 630,
				alt: 'POLYANA.INFO - Туристична дестинація №1',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'POLYANA.INFO — туристичний портал Поляни',
		description:
			'POLYANA.INFO: екскурсії й квадроцикли в Поляні, готелі та житло в Карпатах, SPA, табори й розваги на Закарпатті.',
		images: ['/preview-v2.png'],
	},
	verification: { google: googleSiteVerification },
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
			'max-video-preview': -1,
		},
	},
}

const siteBase = SITE_URL.replace(/\/$/, '')
const rootJsonLdGraph = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'Organization',
			'@id': `${siteBase}/#organization`,
			name: 'POLYANA.INFO',
			url: SITE_URL,
			logo: `${siteBase}/images/branding/info1.png`,
		},
		{
			'@type': 'WebSite',
			'@id': `${siteBase}/#website`,
			name: 'POLYANA.INFO',
			alternateName: ['Поляна інфо', 'Polyana Info', 'туристичний портал Поляни'],
			url: SITE_URL,
			publisher: { '@id': `${siteBase}/#organization` },
			description:
				'POLYANA.INFO — екскурсії в Поляні та на квадроциклах, карта готелів і закладів, житло, чани й SPA в Карпатах, табори й активний відпочинок на Закарпатті.',
			keywords:
				'Поляна Закарпаття, екскурсії Поляна, квадроцикли Поляна, готелі Поляна, житло Карпати, SPA чани, дитячі табори',
			inLanguage: 'uk-UA',
		},
	],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='uk' className={`${geometria.variable} h-full antialiased`}>
			<body className='min-h-full flex flex-col overflow-x-hidden font-sans'>
				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(rootJsonLdGraph) }}
				/>
				<Header />
				<main
					className='flex min-h-0 w-full flex-col'
					style={{ paddingTop: 'var(--header-offset, 68px)' }}
				>
					{children}
				</main>
				<Footer />
				<Analytics />
			</body>
		</html>
	)
}
