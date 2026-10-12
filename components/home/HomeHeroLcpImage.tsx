import Image from 'next/image'
import { heroSlides } from '@/data/home-page'

/**
 * LCP-шар героя - серверний, з `preload` у `<head>` (Next.js 16).
 * Клієнтська карусель (`HomeHeroBackground`) не дублює перший слайд.
 */
export default function HomeHeroLcpImage() {
	return (
		<Image
			src={heroSlides[0]}
			alt='Відпочинок у Поляні'
			fill
			sizes='(max-width: 640px) 100vw, 1600px'
			quality={75}
			loading='eager'
			fetchPriority='high'
			className='object-cover'
		/>
	)
}
