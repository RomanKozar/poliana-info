'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export type HomePromoBannerSlide = {
	src: string
	alt: string
	href?: string
}

const AUTO_MS = 3000

type Props = {
	slides: readonly HomePromoBannerSlide[]
	/** Додаткові класи контейнера (за замовчуванням - вирівнювання на головній). */
	className?: string
}

const defaultContainerClass =
	'ml-auto max-w-[520px] sm:max-w-[560px]'

export default function HomePromoBannerCarousel({ slides, className }: Props) {
	const n = slides.length
	const [index, setIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const touchStartX = useRef<number | null>(null)

	const go = useCallback(
		(delta: number) => {
			if (n <= 1) return
			setIndex(i => (i + delta + n) % n)
		},
		[n]
	)

	useEffect(() => {
		if (n <= 1 || isPaused) return
		const id = window.setInterval(() => {
			setIndex(i => (i + 1) % n)
		}, AUTO_MS)
		return () => window.clearInterval(id)
	}, [n, isPaused])

	if (n === 0) return null

	return (
		<div
			className={`group/promo relative h-[210px] w-full overflow-hidden rounded-[16px] bg-slate-900/10 shadow-md ring-1 ring-black/5 sm:h-[340px] sm:rounded-[18px] ${className ?? defaultContainerClass}`}
			onMouseEnter={() => setIsPaused(true)}
			onMouseLeave={() => setIsPaused(false)}
			onFocusCapture={() => setIsPaused(true)}
			onBlurCapture={e => {
				if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsPaused(false)
			}}
			onTouchStart={e => {
				touchStartX.current = e.touches[0].clientX
			}}
			onTouchEnd={e => {
				const start = touchStartX.current
				if (start == null || n <= 1) return
				const dx = e.changedTouches[0].clientX - start
				touchStartX.current = null
				if (Math.abs(dx) < 48) return
				go(dx < 0 ? 1 : -1)
			}}
		>
			<div
				className='flex h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none'
				style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
			>
				{slides.map((slide, i) => {
					const inner = (
						<Image
							src={slide.src}
							alt={slide.alt}
							fill
							unoptimized
							priority={i < 2}
							sizes='(min-width: 640px) 560px, 92vw'
							className='object-cover object-center'
						/>
					)
					return (
						<div key={slide.src} className='relative h-full min-w-full shrink-0 grow-0 basis-full'>
							{slide.href ? (
								<Link
									href={slide.href}
									className='relative block h-full w-full outline-none ring-offset-2 transition-opacity hover:opacity-[0.97] focus-visible:ring-2 focus-visible:ring-cyan-400'
								>
									{inner}
								</Link>
							) : (
								<div className='relative h-full w-full'>{inner}</div>
							)}
						</div>
					)
				})}
			</div>

			{n > 1 ? (
				<>
					<button
						type='button'
						onClick={() => go(-1)}
						className='absolute left-2 top-1/2 z-[2] flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white/70 opacity-100 shadow-sm transition-all duration-200 hover:bg-black/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:left-3 sm:size-9 sm:bg-black/45 sm:text-white sm:opacity-0 sm:shadow-lg sm:backdrop-blur-sm sm:group-hover/promo:opacity-100 sm:hover:bg-black/65'
						aria-label='Попередній банер'
					>
						<FaChevronLeft className='size-3.5 sm:size-4' aria-hidden />
					</button>
					<button
						type='button'
						onClick={() => go(1)}
						className='absolute right-2 top-1/2 z-[2] flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white/70 opacity-100 shadow-sm transition-all duration-200 hover:bg-black/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 sm:right-3 sm:size-9 sm:bg-black/45 sm:text-white sm:opacity-0 sm:shadow-lg sm:backdrop-blur-sm sm:group-hover/promo:opacity-100 sm:hover:bg-black/65'
						aria-label='Наступний банер'
					>
						<FaChevronRight className='size-3.5 sm:size-4' aria-hidden />
					</button>
					<div
						className='pointer-events-none absolute bottom-2.5 left-1/2 z-[2] flex -translate-x-1/2 gap-1.5 sm:bottom-3'
						aria-hidden
					>
						{slides.map((slide, i) => (
							<span
								key={`dot-${slide.src}`}
								className={`rounded-full transition-all duration-300 ${
									i === index ? 'h-2 w-6 bg-white shadow-sm' : 'size-2 bg-white/50'
								}`}
							/>
						))}
					</div>
				</>
			) : null}
		</div>
	)
}
