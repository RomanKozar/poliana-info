import type { Metadata } from 'next'
import HomePage from '@/components/pages/HomePage'
import { homePageKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const metadata: Metadata = definePageMetadata({
	title: 'Поляна — туристична дестинація №1 на Закарпатті',
	description:
		'POLYANA.INFO — екскурсії в Поляні та на квадроциклах (Quadro Ride), житло й готелі на карті, чани й SPA, дитячі табори, лижі та тюбінг. Туристичний портал села Поляна, Закарпаття: новини й ідеї відпочинку в Карпатах.',
	pathname: '/',
	keywords: homePageKeywords,
})

export default function Home() {
	return <HomePage />
}
