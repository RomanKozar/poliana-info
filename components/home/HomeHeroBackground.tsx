'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { heroSlides } from '@/data/home-page'

type Props = {
	activeIndex: number
}

/**
 * Спочатку лише перший слайд (LCP). Решту підвантажуємо після idle — менше конкуренції за мережу на mobile.
 */
export default function HomeHeroBackground({ activeIndex }: Props) {
	const [allSlidesEnabled, setAllSlidesEnabled] = useState(false)

	useEffect(() => {
		const enable = () => setAllSlidesEnabled(true)
		if (typeof window.requestIdleCallback === 'function') {
			const id = window.requestIdleCallback(enable, { timeout: 2500 })
			return () => window.cancelIdleCallback(id)
		}
		const t = window.setTimeout(enable, 1200)
		return () => window.clearTimeout(t)
	}, [])

	return (
		<div className='absolute inset-0'>
			{heroSlides.map((slideSrc, index) => {
				if (index !== 0 && !allSlidesEnabled) return null

				return (
					<div
						key={slideSrc}
						className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
							index === activeIndex ? 'opacity-100' : 'opacity-0'
						}`}
					>
						<Image
							src={slideSrc}
							alt='Відпочинок у Поляні'
							fill
							sizes='(max-width: 640px) 100vw, 1600px'
							quality={75}
							priority={index === 0}
							loading={index === 0 ? 'eager' : 'lazy'}
							className='object-cover'
						/>
					</div>
				)
			})}
		</div>
	)
}
