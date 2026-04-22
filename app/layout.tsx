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
	variable: '--font-geometria', // Створюємо CSS-змінну
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
		'Туристичний портал Поляни на Закарпатті: житло, SPA, чани, табори, розваги, новини та корисні поради для відпочинку.',
	icons: {
		icon: '/images/branding/info1-tab.svg',
		shortcut: '/images/branding/info1-tab.svg',
		apple: '/images/branding/info1.png',
	},
	openGraph: {
		title: 'POLYANA.INFO — туристичний портал Поляни',
		description:
			'Туристичний портал Поляни на Закарпатті: житло, SPA, чани, табори та ідеї для відпочинку.',
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
			'Туристичний портал Поляни на Закарпатті: житло, SPA, чани, табори та ідеї для відпочинку.',
		images: ['/preview-v2.png'],
	},
	verification: { google: googleSiteVerification },
}

const websiteJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: 'POLYANA.INFO',
	alternateName: ['Поляна інфо', 'Polyana Info', 'туристичний портал Поляни'],
	url: SITE_URL,
	description: 'Туристичний портал села Поляна на Закарпатті: житло, SPA, чани, табори та відпочинок.',
	inLanguage: 'uk-UA',
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
					dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
				/>
				<Header />
				<main className='flex-1 w-full' style={{ paddingTop: 'var(--header-offset, 68px)' }}>
					{children}
				</main>
				<Footer />
				<Analytics />
			</body>
		</html>
	)
}
