import { getImageProps } from 'next/image'
import { heroSlides } from '@/data/home-page'

/** Має збігатися з `HomeHeroLcpImage`. */
export const homeHeroLcpPreload = getImageProps({
	src: heroSlides[0],
	alt: 'Відпочинок у Поляні',
	fill: true,
	sizes: '(max-width: 640px) 100vw, 1600px',
	quality: 75,
})
