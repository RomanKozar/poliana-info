'use client'

import Image from 'next/image'
import { useCallback, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

type Props = {
	images: string[]
	alt: string
}

export default function ExcursionCardImageCarousel({ images, alt }: Props) {
	const [index, setIndex] = useState(0)
	const touchStartX = useRef<number | null>(null)
	const n = images.length
	const canSlide = n > 1

	const go = useCallback(
		(delta: number) => {
			setIndex(i => (i + delta + n) % n)
		},
		[n]
	)

	return (
		<div
			className='group/carousel relative isolate h-full w-full'
			onTouchStart={e => {
				touchStartX.current = e.touches[0].clientX
			}}
			onTouchEnd={e => {
				if (!canSlide) return
				const start = touchStartX.current
				if (start == null) return
				const dx = e.changedTouches[0].clientX - start
				touchStartX.current = null
				if (Math.abs(dx) < 40) return
				go(dx < 0 ? 1 : -1)
			}}
		>
			<div className='relative h-full w-full overflow-hidden'>
				{images.map((src, i) => (
					<Image
						key={`${src}-${i}`}
						src={src}
						alt={i === index ? alt : ''}
						fill
						unoptimized
						className={`object-cover transition-opacity duration-300 ${
							i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
						}`}
						sizes='(min-width: 1024px) 28vw, (min-width: 640px) 42vw, 88vw'
						priority={i === 0}
					/>
				))}
			</div>

			{canSlide ? (
				<>
					<button
						type='button'
						onClick={e => {
							e.stopPropagation()
							go(-1)
						}}
						className='absolute left-1.5 top-1/2 z-[2] flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white opacity-100 shadow-sm transition duration-200 hover:scale-110 hover:bg-black/60 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:opacity-0 md:group-hover/carousel:opacity-100 sm:left-2'
						aria-label='Попереднє фото'
					>
						<FaChevronLeft className='size-3.5' aria-hidden />
					</button>
					<button
						type='button'
						onClick={e => {
							e.stopPropagation()
							go(1)
						}}
						className='absolute right-1.5 top-1/2 z-[2] flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white opacity-100 shadow-sm transition duration-200 hover:scale-110 hover:bg-black/60 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:opacity-0 md:group-hover/carousel:opacity-100 sm:right-2'
						aria-label='Наступне фото'
					>
						<FaChevronRight className='size-3.5' aria-hidden />
					</button>
					<div
						className='pointer-events-none absolute bottom-2 left-1/2 z-[2] flex -translate-x-1/2 gap-1'
						aria-hidden
					>
						{images.map((_, i) => (
							<span
								key={`dot-${i}`}
								className={`h-1.5 rounded-full transition-all ${
									i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/55'
								}`}
							/>
						))}
					</div>
				</>
			) : null}
		</div>
	)
}
