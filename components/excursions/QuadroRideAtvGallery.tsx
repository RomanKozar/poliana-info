'use client'

import Image from 'next/image'
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from 'react'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'
import { quadroRideGalleryImages } from '@/data/quadro-ride-page'

const SWIPE_MIN_PX = 48

type GalleryContextValue = {
	openAt: (index: number) => void
}

const QuadroRideGalleryContext = createContext<GalleryContextValue | null>(null)

function useQuadroRideGallery() {
	const ctx = useContext(QuadroRideGalleryContext)
	if (!ctx) {
		throw new Error('useQuadroRideGallery must be used within QuadroRideGalleryProvider')
	}
	return ctx
}

export function QuadroRideGalleryProvider({ children }: { children: ReactNode }) {
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const touchStartX = useRef<number | null>(null)
	const [isSlideLoading, setIsSlideLoading] = useState(false)

	const openAt = useCallback((index: number) => {
		const n = quadroRideGalleryImages.length
		if (n === 0) return
		const i = ((index % n) + n) % n
		setIsSlideLoading(true)
		setOpenIndex(i)
	}, [])

	const close = useCallback(() => setOpenIndex(null), [])

	const go = useCallback((delta: number) => {
		setOpenIndex(prev => {
			if (prev === null) return prev
			if (isSlideLoading) return prev
			const n = quadroRideGalleryImages.length
			const next = (prev + delta + n) % n
			setIsSlideLoading(true)
			return next
		})
	}, [isSlideLoading])

	useEffect(() => {
		if (openIndex === null) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') close()
			if (e.key === 'ArrowLeft') go(-1)
			if (e.key === 'ArrowRight') go(1)
		}
		window.addEventListener('keydown', onKey)
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			window.removeEventListener('keydown', onKey)
			document.body.style.overflow = prevOverflow
		}
	}, [openIndex, close, go])

	const onOverlayTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0]?.clientX ?? null
	}

	const onOverlayTouchEnd = (e: React.TouchEvent) => {
		if (isSlideLoading) return
		const start = touchStartX.current
		touchStartX.current = null
		if (start === null) return
		const end = e.changedTouches[0]?.clientX
		if (end === undefined) return
		const dx = end - start
		if (dx > SWIPE_MIN_PX) go(-1)
		else if (dx < -SWIPE_MIN_PX) go(1)
	}

	return (
		<QuadroRideGalleryContext.Provider value={{ openAt }}>
			{children}

			{openIndex !== null && (
				<div
					className='fixed inset-0 z-[100] flex flex-col bg-black/90'
					role='dialog'
					aria-modal='true'
					aria-label='Перегляд фото'
					onTouchStart={onOverlayTouchStart}
					onTouchEnd={onOverlayTouchEnd}
				>
					<div
						className='flex shrink-0 items-center justify-between gap-3 px-3 py-3 text-white sm:px-5'
						onClick={e => e.stopPropagation()}
					>
						<p className='text-sm tabular-nums text-white/90'>
							{openIndex + 1} / {quadroRideGalleryImages.length}
						</p>
						<button
							type='button'
							onClick={close}
							className='flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#53C4DA]'
							aria-label='Закрити'
						>
							<FaTimes className='size-5' aria-hidden />
						</button>
					</div>

					<div
						className='relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-6'
						onClick={close}
					>
						<div
							className='relative h-full w-full max-h-[min(85vh,900px)] max-w-6xl cursor-default'
							onClick={e => e.stopPropagation()}
						>
							<button
								type='button'
								onClick={() => go(-1)}
								disabled={isSlideLoading}
								className='absolute left-1 top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#53C4DA] disabled:cursor-not-allowed disabled:opacity-50 sm:left-0 sm:size-12'
								aria-label='Попереднє фото'
							>
								<FaChevronLeft className='size-5 sm:size-6' aria-hidden />
							</button>
							<button
								type='button'
								onClick={() => go(1)}
								disabled={isSlideLoading}
								className='absolute right-1 top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/25 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#53C4DA] disabled:cursor-not-allowed disabled:opacity-50 sm:right-0 sm:size-12'
								aria-label='Наступне фото'
							>
								<FaChevronRight className='size-5 sm:size-6' aria-hidden />
							</button>

							<Image
								src={quadroRideGalleryImages[openIndex]}
								alt={`Quadro Ride, фото ${openIndex + 1}`}
								fill
								className='object-contain'
								sizes='100vw'
								priority
								onLoadingComplete={() => setIsSlideLoading(false)}
							/>
						</div>
					</div>

					<p className='sr-only'>Гортайте свайпом вліво або вправо на мобільному.</p>
				</div>
			)}
		</QuadroRideGalleryContext.Provider>
	)
}

export function QuadroRideHeroGalleryImage({
	src,
	alt,
	priority,
	sizes,
	className,
}: {
	src: string
	alt: string
	priority?: boolean
	sizes: string
	className?: string
}) {
	const { openAt } = useQuadroRideGallery()
	const idx = quadroRideGalleryImages.indexOf(src)

	return (
		<button
			type='button'
			onClick={() => openAt(idx >= 0 ? idx : 0)}
			className={
				className ??
				'relative mx-auto aspect-[4/3] w-full max-w-xl cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 text-left shadow-lg ring-1 ring-slate-900/5 outline-none transition hover:brightness-[1.02] focus-visible:ring-2 focus-visible:ring-[#53C4DA] lg:mx-0 lg:max-w-none'
			}
			aria-label={`Відкрити фото: ${alt}`}
		>
			<Image
				src={src}
				alt={alt}
				fill
				className='cursor-pointer object-cover'
				priority={priority}
				sizes={sizes}
			/>
		</button>
	)
}

export function QuadroRideAtvGalleryStrip() {
	const { openAt } = useQuadroRideGallery()
	const n = quadroRideGalleryImages.length
	const colCount = Math.max(1, Math.ceil(n / 2))

	return (
		<div
			className='grid grid-rows-2 gap-2 sm:gap-3'
			style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}
		>
			{quadroRideGalleryImages.map((imgSrc, index) => (
				<button
					key={imgSrc}
					type='button'
					onClick={() => openAt(index)}
					className='relative aspect-[5/3] w-full min-h-[4.5rem] cursor-pointer overflow-hidden rounded-xl border border-slate-200/90 bg-slate-200 shadow-sm outline-none ring-[#53C4DA] transition hover:opacity-95 focus-visible:ring-2 sm:min-h-[5.5rem]'
					aria-label={`Відкрити фото ${index + 1} з ${quadroRideGalleryImages.length}`}
				>
					<Image
						src={imgSrc}
						alt=''
						fill
						className='cursor-pointer object-cover'
						sizes='(max-width: 640px) 22vw, 15vw'
					/>
				</button>
			))}
		</div>
	)
}

