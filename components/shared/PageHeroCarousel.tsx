'use client'

import Image from 'next/image'
import { useEffect, useState, type ReactNode } from 'react'
import { heroSlides } from '@/data/home-page'

const HERO_ROTATE_MS = 6000

type PageHeroCarouselProps = {
	children: ReactNode
	imageAlt?: string
	gradientClassName?: string
}

/** Hero з тими самими фото, що й на головній (gol-1…gol-4), з автопрокруткою. */
export default function PageHeroCarousel({
	children,
	imageAlt = 'Відпочинок у Поляні',
	gradientClassName = 'bg-gradient-to-r from-[#1E3D53]/80 via-[#264D67]/65 to-[#294B61]/40',
}: PageHeroCarouselProps) {
	const [activeSlide, setActiveSlide] = useState(0)

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			setActiveSlide(prev => (prev + 1) % heroSlides.length)
		}, HERO_ROTATE_MS)

		return () => window.clearInterval(intervalId)
	}, [])

	return (
		<section className='relative overflow-hidden'>
			<div className='absolute inset-0'>
				{heroSlides.map((slideSrc, index) => (
					<div
						key={slideSrc}
						className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
							index === activeSlide ? 'opacity-100' : 'opacity-0'
						}`}
					>
						<Image
							src={slideSrc}
							alt={imageAlt}
							fill
							sizes='100vw'
							priority={index === 0}
							className='object-cover'
						/>
					</div>
				))}
			</div>
			<div className={`absolute inset-0 ${gradientClassName}`} />
			<div className='relative z-10 mx-auto w-full max-w-7xl px-4 py-14 text-white sm:px-6 lg:px-8'>
				{children}
			</div>
		</section>
	)
}
