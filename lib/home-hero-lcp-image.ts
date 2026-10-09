import { getImageProps } from 'next/image'
import { heroSlides } from '@/data/home-page'

/** Параметри LCP-героя на головній — мають збігатися з `HomeHeroBackground`. */
export const HOME_HERO_LCP_IMAGE = getImageProps({
	src: heroSlides[0],
	alt: 'Відпочинок у Поляні',
	fill: true,
	sizes: '(max-width: 640px) 100vw, 1600px',
	quality: 72,
})
