import type { Metadata } from 'next'
import HomePage from '@/components/pages/HomePage'
import { HOME_HERO_LCP_IMAGE } from '@/lib/home-hero-lcp-image'
import { homePageKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const metadata: Metadata = definePageMetadata({
	title: 'Поляна - туристична дестинація №1 на Закарпатті',
	description:
		'POLYANA.INFO - екскурсії в Поляні та на квадроциклах (Quadro Ride), житло й готелі на карті, чани й SPA, дитячі табори, лижі та тюбінг. Туристичний портал села Поляна, Закарпаття: новини й ідеї відпочинку в Карпатах.',
	pathname: '/',
	keywords: homePageKeywords,
})

export default function Home() {
	return (
		<>
			<link
				rel='preload'
				as='image'
				href={HOME_HERO_LCP_IMAGE.props.src}
				imageSrcSet={HOME_HERO_LCP_IMAGE.props.srcSet}
				imageSizes={HOME_HERO_LCP_IMAGE.props.sizes}
				fetchPriority='high'
			/>
			<HomePage />
		</>
	)
}
