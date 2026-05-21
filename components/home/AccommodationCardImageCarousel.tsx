'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useRef, useState, type ReactNode } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

type Props = {
	images: string[]
	alt: string
	href: string
	children?: ReactNode
}

export default function AccommodationCardImageCarousel({ images, alt, href, children }: Props) {
	const slides = images.length > 0 ? images : ['/images/accommodation/kateryna-v1.webp']
	const [index, setIndex] = useState(0)
	const touchStartX = useRef<number | null>(null)
	const n = slides.length
	const canSlide = n > 1

	const go = useCallback(
		(delta: number) => {
			setIndex(i => (i + delta + n) % n)
		},
		[n]
	)

	return (
		<div
			className='group/carousel relative isolate h-36 shrink-0 md:h-40'
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
			<Link
				href={href}
				target='_blank'
				rel='noopener noreferrer'
				className='relative block h-full w-full overflow-hidden'
				aria-label={`Відкрити «${alt}» у новій вкладці`}
			>
				{slides.map((src, i) => (
					<Image
						key={`${src}-${i}`}
						src={src}
						alt={i === index ? alt : ''}
						fill
						className={`object-cover transition-opacity duration-300 ${
							i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
						}`}
						sizes='(min-width: 768px) 33vw, 92vw'
						priority={i === 0}
					/>
				))}
			</Link>

			{children}

			{canSlide ? (
				<>
					<button
						type='button'
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							go(-1)
						}}
						className='absolute left-1.5 top-1/2 z-[2] flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white opacity-100 shadow-sm transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:opacity-0 md:group-hover/carousel:opacity-100 sm:left-2'
						aria-label='Попереднє фото'
					>
						<FaChevronLeft className='size-3.5' aria-hidden />
					</button>
					<button
						type='button'
						onClick={e => {
							e.preventDefault()
							e.stopPropagation()
							go(1)
						}}
						className='absolute right-1.5 top-1/2 z-[2] flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/45 text-white opacity-100 shadow-sm transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:opacity-0 md:group-hover/carousel:opacity-100 sm:right-2'
						aria-label='Наступне фото'
					>
						<FaChevronRight className='size-3.5' aria-hidden />
					</button>
					<div
						className='pointer-events-none absolute bottom-2 left-1/2 z-[2] flex -translate-x-1/2 gap-1'
						aria-hidden
					>
						{slides.map((src, i) => (
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
