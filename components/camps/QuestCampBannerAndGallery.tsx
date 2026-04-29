'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa'

type GalleryStripItem = { id: string; src: string; alt: string }

const QUEST_GALLERY_STRIP: GalleryStripItem[] = [
	{ id: 'q2', src: '/images/kids-camps/camp-2.webp', alt: 'Командний квест і спільне розвʼязування загадок' },
	{ id: 'q3', src: '/images/kids-camps/camp-3.webp', alt: 'Творчі зони та імпровізація між етапами квесту' },
	{ id: 'q4', src: '/images/kids-camps/camp-4.webp', alt: 'Природа Карпат у перепочинках між активностями' },
	{ id: 'q1', src: '/images/kids-camps/camp-1.webp', alt: 'Разом у таборовій родині: радість перемоги команди' },
]

const LIGHTBOX_TITLE = 'Квестовий табір — фото зі зміни'

function stripIndexForBannerSrc(bannerSrc: string): number {
	const i = QUEST_GALLERY_STRIP.findIndex(({ src }) => src === bannerSrc)
	return i >= 0 ? i : 0
}

function StripLightbox({
	open,
	startIndex,
	onClose,
	items,
}: {
	open: boolean
	startIndex: number
	onClose: () => void
	items: GalleryStripItem[]
}) {
	const [idx, setIdx] = useState(startIndex)
	const touchStartX = useRef<number | null>(null)

	useEffect(() => {
		if (open) setIdx(startIndex)
	}, [open, startIndex])

	const n = Math.max(1, items.length)
	const go = useCallback(
		(delta: number) => {
			setIdx(i => (i + delta + n) % n)
		},
		[n]
	)

	useEffect(() => {
		if (!open) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
			if (e.key === 'ArrowLeft') go(-1)
			if (e.key === 'ArrowRight') go(1)
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [open, go, onClose])

	useEffect(() => {
		if (!open) return
		const prev = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = prev
		}
	}, [open])

	if (!open) return null

	const slide = items[idx] ?? items[0]

	return (
		<div className='fixed inset-0 z-[200]' role='dialog' aria-modal='true' aria-label={LIGHTBOX_TITLE}>
			<button
				type='button'
				aria-label='Закрити галерею'
				className='absolute inset-0 cursor-default bg-black/92'
				onClick={onClose}
			/>
			<div className='pointer-events-none relative z-[1] flex h-full min-h-0 flex-col items-center justify-start pt-[env(safe-area-inset-top)]'>
				<button
					type='button'
					onClick={onClose}
					className='pointer-events-auto absolute right-3 top-3 z-[3] flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-xl text-white shadow-sm transition hover:bg-white/15'
					aria-label='Закрити'
				>
					<FaTimes aria-hidden />
				</button>
				<p className='pointer-events-auto absolute left-1/2 top-16 z-[2] -translate-x-1/2 rounded-full bg-black/55 px-3 py-1.5 text-xs text-white'>
					Фото {idx + 1} з {n}
				</p>
				<div
					className='pointer-events-auto relative mt-20 flex min-h-0 w-full max-w-5xl flex-1 flex-col justify-center px-3 pb-28 sm:mt-24 sm:px-6'
					onTouchStart={e => {
						touchStartX.current = e.touches[0].clientX
					}}
					onTouchEnd={e => {
						const start = touchStartX.current
						if (start == null || n <= 1) return
						const dx = e.changedTouches[0].clientX - start
						touchStartX.current = null
						if (Math.abs(dx) < 48) return
						if (dx < 0) go(1)
						else go(-1)
					}}
				>
					<div className='relative aspect-[16/11] max-h-[min(75vh,calc(100svh-10rem))] min-h-[12rem] w-full sm:aspect-[16/10]'>
						<Image
							src={slide.src}
							alt={slide.alt}
							fill
							className='object-contain'
							sizes='(max-width: 1024px) 100vw, 896px'
							draggable={false}
							priority
						/>
					</div>
				</div>
				{n > 1 ? (
					<>
						<button
							type='button'
							onClick={e => {
								e.stopPropagation()
								go(-1)
							}}
							className='pointer-events-auto absolute left-2 top-1/2 z-[3] flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-xl text-white transition hover:bg-white/15 sm:left-4'
							aria-label='Попереднє фото'
						>
							<FaChevronLeft aria-hidden />
						</button>
						<button
							type='button'
							onClick={e => {
								e.stopPropagation()
								go(1)
							}}
							className='pointer-events-auto absolute right-2 top-1/2 z-[3] flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/55 text-xl text-white transition hover:bg-white/15 sm:right-4'
							aria-label='Наступне фото'
						>
							<FaChevronRight aria-hidden />
						</button>
					</>
				) : null}
			</div>
		</div>
	)
}

type Props = {
	bannerSrc: string
	bannerAlt: string
}

export default function QuestCampBannerAndGallery({ bannerSrc, bannerAlt }: Props) {
	const [open, setOpen] = useState(false)
	const [start, setStart] = useState(0)

	const openFromBanner = () => {
		setStart(stripIndexForBannerSrc(bannerSrc))
		setOpen(true)
	}

	return (
		<>
			<button
				type='button'
				onClick={openFromBanner}
				className='group relative aspect-[21/9] w-full cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 p-0 text-left shadow-sm ring-offset-2 transition hover:brightness-[1.015] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#53C4DA] sm:aspect-[2.4/1]'
				aria-label={`Відкрити фото збільшеним та гортати галерею: ${bannerAlt}`}
			>
				<Image
					src={bannerSrc}
					alt={bannerAlt}
					fill
					className='object-cover object-center transition group-hover:scale-[1.01]'
					sizes='(min-width: 1024px) 72rem, 94vw'
					priority
				/>
			</button>

			<div className='mt-3 sm:mt-5'>
				<div
					className='grid grid-cols-4 grid-rows-1 gap-2 sm:gap-3 md:gap-4'
					role='region'
					aria-label='Фото зі зміни квестового табору — натисніть, щоб відкрити й гортати'
				>
					{QUEST_GALLERY_STRIP.map(({ id, src, alt }, imageIndex) => (
						<button
							key={id}
							type='button'
							onClick={() => {
								setStart(imageIndex)
								setOpen(true)
							}}
							className='group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border border-slate-200/90 bg-white p-0 text-left shadow-sm ring-offset-2 transition hover:brightness-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#53C4DA] sm:rounded-2xl'
							aria-label={`Відкрити збільшеним: ${alt}`}
						>
							<Image
								src={src}
								alt=''
								fill
								className='object-cover object-center transition group-hover:scale-[1.02]'
								sizes='(min-width: 768px) 22vw, 45vw'
							/>
						</button>
					))}
				</div>
			</div>

			<StripLightbox open={open} startIndex={start} onClose={() => setOpen(false)} items={QUEST_GALLERY_STRIP} />
		</>
	)
}
