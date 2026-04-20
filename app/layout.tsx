import localFont from 'next/font/local'
import './globals.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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

export const metadata: Metadata = {
	title: 'POLIANA.INFO | Туристична дестинація №1',
	description: 'Офіційний туристичний портал громади Поляна.',
	metadataBase: new URL('https://poliana-info.vercel.app'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'POLIANA.INFO | Туристична дестинація №1',
		description: 'Офіційний туристичний портал громади Поляна.',
		url: 'https://poliana-info.vercel.app',
		siteName: 'POLIANA.INFO',
		locale: 'uk_UA',
		type: 'website',
		images: [
			{
				url: '/preview-v2.png',
				width: 1200,
				height: 630,
				alt: 'POLIANA.INFO - Туристична дестинація №1',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'POLIANA.INFO | Туристична дестинація №1',
		description: 'Офіційний туристичний портал громади Поляна.',
		images: ['/preview-v2.png'],
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='uk' className={`${geometria.variable} h-full antialiased`}>
			<body className='min-h-full flex flex-col font-sans'>
				<Header />
				<main className='flex-1 w-full pt-[68px] md:pt-[80px]'>{children}</main>
				<Footer />
				<Analytics />
			</body>
		</html>
	)
}
