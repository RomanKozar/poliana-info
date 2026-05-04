'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	FaChevronLeft,
	FaChevronRight,
	FaCommentDots,
	FaHeart,
	FaMapMarkerAlt,
	FaMugHot,
	FaRegHeart,
	FaShare,
	FaStar,
	FaSwimmer,
	FaTimes,
	FaUtensils,
	FaUsers,
} from 'react-icons/fa'
import {
	MdAirportShuttle,
	MdHotTub,
	MdLocalBar,
	MdPool,
	MdRestaurant,
	MdWifi,
} from 'react-icons/md'
import { MdOutlineDownhillSkiing, MdSmokeFree } from 'react-icons/md'
import HotelDetailMap from '@/components/accommodation/HotelDetailMap'
import type { PolyanaHotel } from '@/lib/polyana-hotels'
import {
	galleryImagesForHotel,
	hotelFaqEntries,
	hotelListingSubtitle,
	longDescriptionParagraphs,
	parseGuestCount,
	popularFacilitiesForHotel,
	propertyHighlights,
	reviewCategoryScoresForHotel,
	sampleReviewCardsForHotel,
	type FacilityIconId,
} from '@/lib/hotel-detail-data'

function parseStarRating(hotel: PolyanaHotel): number {
	const m = /^([\d.,]+)/.exec(hotel.rating.trim())
	if (!m) return 4.3
	return parseFloat(m[1].replace(',', '.'))
}

function scoreOnTen(stars: number): string {
	return (Math.min(10, stars * 2)).toFixed(1).replace('.', ',')
}

/** «P» у колі — у наборах react-icons немає стійкого Md-паркінгу для вашої версії пакета */
function IconParkingP(props: { className?: string }) {
	return (
		<span
			className={`inline-flex size-5 items-center justify-center rounded-full border-[1.5px] border-current text-[0.65rem] font-bold leading-none ${props.className ?? ''}`}
			aria-hidden
		>
			P
		</span>
	)
}

const facilityIcons: Record<FacilityIconId, React.ComponentType<{ className?: string }>> = {
	pool: MdPool,
	spa: MdHotTub,
	parking: IconParkingP,
	wifi: MdWifi,
	family: FaUsers,
	restaurant: MdRestaurant,
	shuttle: MdAirportShuttle,
	nosmoking: MdSmokeFree,
	bar: MdLocalBar,
	breakfast: FaMugHot,
}

function HighlightIcon({ kind }: { kind: 'pin' | 'breakfast' | 'parking' | 'ski' }) {
	const c = 'mt-0.5 shrink-0 text-sky-600'
	if (kind === 'pin') return <FaMapMarkerAlt className={`size-5 ${c}`} aria-hidden />
	if (kind === 'breakfast') return <FaMugHot className={`size-5 ${c}`} aria-hidden />
	if (kind === 'parking') return <IconParkingP className={`${c} text-sky-600`} />
	return <MdOutlineDownhillSkiing className={`size-5 ${c}`} aria-hidden />
}

function HotelGalleryLightbox({
	open,
	startIndex,
	onClose,
	images,
	hotelName,
}: {
	open: boolean
	startIndex: number
	onClose: () => void
	images: string[]
	hotelName: string
}) {
	const [idx, setIdx] = useState(startIndex)
	const touchStartX = useRef<number | null>(null)

	useEffect(() => {
		if (open) setIdx(startIndex)
	}, [open, startIndex])

	const n = Math.max(1, images.length)
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

	const src = images[idx] ?? images[0]

	return (
		<div className='fixed inset-0 z-[200]' role='dialog' aria-modal='true' aria-label={`Галерея фото: ${hotelName}`}>
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
							src={src}
							alt={`${hotelName} — фото ${idx + 1}`}
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

export default function HotelDetailPageContent({ hotel }: { hotel: PolyanaHotel }) {
	const [saved, setSaved] = useState(false)
	const [descExpanded, setDescExpanded] = useState(false)
	const [galleryOpen, setGalleryOpen] = useState(false)
	const [galleryStart, setGalleryStart] = useState(0)
	const [openFacilityId, setOpenFacilityId] = useState<string | null>(null)
	const facilitiesWrapRef = useRef<HTMLUListElement | null>(null)
	const reviewsSectionRef = useRef<HTMLElement | null>(null)
	const [reviewsExpanded, setReviewsExpanded] = useState(false)
	const gallery = useMemo(() => galleryImagesForHotel(hotel), [hotel])
	const stars = useMemo(() => parseStarRating(hotel), [hotel])
	const scoreLabel = useMemo(
		() =>
			hotel.detailReviewScoreOutOf10 != null
				? hotel.detailReviewScoreOutOf10.toFixed(1).replace('.', ',')
				: scoreOnTen(stars),
		[hotel.detailReviewScoreOutOf10, stars]
	)
	const guestCount =
		hotel.detailReviewCount ?? parseGuestCount(hotel.rating) ?? undefined
	const hasExternalReviewStats = guestCount != null && guestCount > 0
	const paragraphs = longDescriptionParagraphs(hotel)

	const onShare = useCallback(async () => {
		const url = typeof window !== 'undefined' ? window.location.href : ''
		try {
			if (navigator.share) {
				await navigator.share({ title: hotel.name, text: hotel.description, url })
			} else if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(url)
			}
		} catch {
			/* ignore */
		}
	}, [hotel.description, hotel.name])

	const openGallery = useCallback((index: number) => {
		setGalleryStart(index)
		setGalleryOpen(true)
	}, [])

	const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({})
	const faqSplit = useMemo(() => {
		const all = hotelFaqEntries
		return { left: all.slice(0, 5), right: all.slice(5, 10) }
	}, [])

	const reviewCards = useMemo(() => sampleReviewCardsForHotel(hotel.id), [hotel.id])

	const openAllReviews = useCallback(() => {
		setReviewsExpanded(true)
	}, [])

	useEffect(() => {
		if (!openFacilityId) return
		const onPointerDown = (e: PointerEvent) => {
			const el = facilitiesWrapRef.current
			if (!el) return
			if (!el.contains(e.target as Node)) setOpenFacilityId(null)
		}
		document.addEventListener('pointerdown', onPointerDown)
		return () => document.removeEventListener('pointerdown', onPointerDown)
	}, [openFacilityId])

	return (
		<div className='mx-auto w-full max-w-6xl px-4 pb-10 pt-3 sm:px-6 lg:px-8'>
			{/* Верхній ряд: назва + дії */}
			<header className='flex flex-col gap-3 border-b border-slate-200/80 pb-4 sm:flex-row sm:items-start sm:justify-between'>
				<div className='flex min-w-0 items-start gap-2'>
					<span className='mt-1 text-slate-400' aria-hidden>
						<FaSwimmer className='size-5 sm:size-6' />
					</span>
					<h1 className='text-xl font-bold leading-snug text-[#2D333D] sm:text-2xl'>{hotel.name}</h1>
				</div>
				<div className='flex shrink-0 items-center gap-2 sm:gap-3'>
					<button
						type='button'
						onClick={onShare}
						className='inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50'
					>
						<FaShare className='size-4' aria-hidden />
						Поділитися
					</button>
					<button
						type='button'
						onClick={() => setSaved(s => !s)}
						aria-pressed={saved}
						className='inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50'
					>
						{saved ? (
							<FaHeart className='size-4 text-rose-500' aria-hidden />
						) : (
							<FaRegHeart className='size-4' aria-hidden />
						)}
						Зберегти
					</button>
				</div>
			</header>

			{/* Галерея */}
			<div className='mt-5'>
				<div className='flex flex-col gap-2 lg:grid lg:h-[min(28rem,calc(100vh-14rem))] lg:grid-cols-4 lg:grid-rows-2 lg:gap-2 lg:rounded-2xl lg:overflow-hidden'>
					<button
						type='button'
						onClick={() => openGallery(0)}
						className='group relative aspect-[4/3] w-full cursor-pointer overflow-hidden lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:min-h-0 lg:h-full'
					>
						<Image
							src={gallery[0]}
							alt={hotel.name}
							fill
							priority
							className='object-cover transition group-hover:opacity-95'
							sizes='(max-width: 1024px) 100vw, 50vw'
						/>
					</button>
					<button
						type='button'
						onClick={() => openGallery(1)}
						className='relative hidden aspect-video w-full cursor-pointer overflow-hidden lg:block lg:aspect-auto lg:min-h-0 lg:h-auto'
						aria-label={`${hotel.name} — фото 2`}
					>
						<Image
							src={gallery[1]}
							alt={`${hotel.name} — 2`}
							fill
							className='object-cover transition hover:opacity-95'
							sizes='25vw'
						/>
					</button>
					<button
						type='button'
						onClick={() => openGallery(2)}
						className='relative hidden aspect-video w-full cursor-pointer overflow-hidden lg:block lg:aspect-auto lg:min-h-0 lg:h-auto'
						aria-label={`${hotel.name} — фото 3`}
					>
						<Image
							src={gallery[2]}
							alt={`${hotel.name} — 3`}
							fill
							className='object-cover transition hover:opacity-95'
							sizes='25vw'
						/>
					</button>
					<button
						type='button'
						onClick={() => openGallery(3)}
						className='relative hidden aspect-video w-full cursor-pointer overflow-hidden lg:block lg:aspect-auto lg:min-h-0 lg:h-auto'
						aria-label={`${hotel.name} — фото 4`}
					>
						<Image
							src={gallery[3]}
							alt={`${hotel.name} — 4`}
							fill
							className='object-cover transition hover:opacity-95'
							sizes='25vw'
						/>
					</button>
					<button
						type='button'
						onClick={() => openGallery(4)}
						className='group/showall relative hidden aspect-video w-full cursor-pointer overflow-hidden lg:block lg:aspect-auto lg:min-h-0 lg:h-auto'
						aria-label='Показати всі фотографії'
					>
						<Image src={gallery[4]} alt={`${hotel.name} — 5`} fill className='object-cover' sizes='25vw' />
						<div className='pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/25 to-transparent p-3'>
							<span className='inline-flex items-center gap-2 rounded-lg border border-white/90 bg-white/95 px-3 py-2 text-sm font-semibold text-[#2D333D] shadow-sm transition-transform duration-300 ease-out will-change-transform group-hover/showall:scale-[1.04] group-hover/showall:-translate-y-0.5 group-hover/showall:shadow-md'>
								<span className='grid grid-cols-3 gap-0.5' aria-hidden>
									{Array.from({ length: 9 }).map((_, j) => (
										<span key={j} className='size-1 rounded-sm bg-slate-700' />
									))}
								</span>
								Показати всі фотографії
							</span>
						</div>
					</button>
				</div>
				{/* Мобільна рядок мініатюр */}
				<div className='mt-2 flex gap-2 overflow-x-auto pb-1 lg:hidden'>
					{gallery.slice(1, 5).map((src, thumbIdx) => {
						const galleryIndex = thumbIdx + 1
						return (
							<button
								key={galleryIndex}
								type='button'
								onClick={() => openGallery(galleryIndex)}
								className='relative h-20 w-28 shrink-0 cursor-pointer overflow-hidden rounded-lg'
								aria-label={`Фото ${galleryIndex + 1}`}
							>
								<Image src={src} alt={`${hotel.name}, фото ${galleryIndex + 1}`} fill className='object-cover' sizes='112px' />
							</button>
						)
					})}
				</div>
			</div>

			{/* Заголовок блоку */}
			<div className='mt-6 space-y-3'>
				<div>
					<h2 className='text-2xl font-bold text-[#2D333D] sm:text-[1.6rem]'>{hotelListingSubtitle()}</h2>
					<p className='mt-2 flex flex-wrap items-center gap-2 text-slate-600'>
						<FaStar className='size-4 text-amber-500' aria-hidden />
						{hasExternalReviewStats ? (
							<span>Зведено з відкритих сервісів бронювання (Booking та ін.)</span>
						) : (
							<span>Ще немає відгуків на порталі</span>
						)}
						<span className='text-slate-400'>·</span>
						<span className='font-medium text-slate-700'>{hotel.rating}</span>
					</p>
				</div>
			</div>

			{/* Особливості помешкання (переміщено під заголовок) */}
			<aside className='mt-6 rounded-2xl bg-sky-50/90 p-5 ring-1 ring-sky-100'>
				<h3 className='text-lg font-bold text-[#2D333D]'>Особливості помешкання</h3>
				<ul className='mt-4 space-y-4'>
					{propertyHighlights(hotel)
						.filter(h => h.title !== 'Паркінг' && h.title !== 'Активності')
						.map((h, i) => (
							<li key={i} className='flex gap-3'>
								{h.icon ? <HighlightIcon kind={h.icon} /> : null}
								<div>
									<p className='font-semibold text-slate-900'>{h.title}</p>
									<p className='mt-1 text-sm leading-relaxed text-slate-700'>{h.body}</p>
								</div>
							</li>
						))}
				</ul>
			</aside>

			{/* Опис + зручності */}
			<div className='mt-8 space-y-6'>
					<section className='space-y-3'>
						<h3 className='text-lg font-semibold text-[#2D333D]'>Про помешкання</h3>
						<p className='text-[0.9375rem] italic leading-relaxed text-sky-950/90'>
							Ця локація часто обирають пари — зручність і сервіс оцінюють на рівні {scoreLabel.replace(',', '.')} з 10 за умовним
							балом порталу (на основі рейтингу {stars.toFixed(1).replace('.', ',')}/5).
						</p>
						<div
							className={`space-y-3 text-[0.9375rem] leading-relaxed text-slate-700 ${!descExpanded ? 'max-h-[7.5rem] overflow-hidden' : ''}`}
						>
							{paragraphs.map((p, i) => (
								<p key={i}>{p}</p>
							))}
						</div>
						<button
							type='button'
							onClick={() => setDescExpanded(e => !e)}
							className='cursor-pointer text-sm font-semibold text-sky-700 hover:underline'
						>
							{descExpanded ? 'Згорнути' : 'Показати більше'} <FaChevronRight className='inline size-3' aria-hidden />
						</button>
					</section>

					<section>
						<h3 className='text-lg font-semibold text-[#2D333D]'>Найпопулярніші зручності</h3>
						<ul ref={facilitiesWrapRef} className='mt-4 flex flex-wrap items-center gap-2.5'>
							{popularFacilitiesForHotel(hotel.id).map(f => {
								const Ico = facilityIcons[f.icon]
								const isOpen = openFacilityId === f.id
								return (
									<li key={f.id} className='group relative'>
										<button
											type='button'
											onClick={() => setOpenFacilityId(prev => (prev === f.id ? null : f.id))}
											className='flex size-10 cursor-pointer items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 sm:cursor-default'
											aria-label={f.label}
											aria-expanded={isOpen}
										>
											<Ico className='size-5' aria-hidden />
										</button>
										<span
											className={`pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white shadow-lg transition-opacity ${
												isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
											}`}
										>
											{f.label}
										</span>
									</li>
								)
							})}
						</ul>
					</section>
			</div>

			{/* Відгуки */}
			<section ref={reviewsSectionRef} className='mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
				<div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
					<h2 className='text-xl font-bold text-[#2D333D]'>Відгуки гостей</h2>
				</div>

				<div className='mt-4 flex flex-wrap items-center gap-3'>
					<span className='rounded bg-sky-900 px-3 py-2 text-xl font-bold text-white'>{scoreLabel}</span>
					<span className='min-w-0 font-medium text-slate-800'>Чудово · {guestCount ?? '—'} відгуків</span>
				</div>

				<p className='mt-5 font-semibold text-slate-900'>Категорії:</p>
				<ul className='mt-3 grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
					{reviewCategoryScoresForHotel(hotel.id).map(c => (
						<li key={c.label} className='space-y-1'>
							<div className='flex justify-between gap-4 text-sm'>
								<span className='text-slate-700'>{c.label}</span>
								<span className='font-semibold text-sky-950'>{c.score.toFixed(1).replace('.', ',')}</span>
							</div>
							<div className='h-2 overflow-hidden rounded-full bg-slate-200'>
								<div
									className='h-full rounded-full bg-sky-800'
									style={{ width: `${(c.score / 10) * 100}%` }}
								/>
							</div>
						</li>
					))}
				</ul>

				<p className='mt-7 font-semibold text-slate-900'>Оберіть теми, які вас цікавлять:</p>
				<div className='mt-2 flex flex-wrap gap-2'>
					{['Номер', 'Чистота', 'Ресторан', 'Сніданок', 'Розташування'].map(t => (
						<button
							key={t}
							type='button'
							className='inline-flex cursor-pointer items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm hover:border-sky-300 hover:bg-sky-50'
						>
							<span className='text-sky-600'>+</span> {t}
						</button>
					))}
				</div>

				<h3 className='mt-7 text-lg font-semibold text-[#2D333D]'>Враження гостей із високими оцінками</h3>
				<div className='relative mt-3 min-w-0'>
					{reviewsExpanded ? (
						<div className='grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
							{reviewCards.map((r, i) => (
								<div key={i} className='min-w-0 rounded-xl border border-slate-200/90 bg-slate-50/80 p-4'>
									<div className='flex gap-3'>
										<span className={`flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${r.bg}`}>
											{r.initial}
										</span>
										<div className='min-w-0'>
											<p className='font-semibold text-slate-900'>{r.name}</p>
											<p className='text-xs text-slate-500'>{r.country}</p>
										</div>
									</div>
									<p className='mt-2 break-words text-sm italic leading-relaxed text-slate-700'>«{r.excerpt}»</p>
								</div>
							))}
						</div>
					) : (
						<>
							{/* Мобільний: повна ширина карток + один CTA знизу (без дубля в кожній картці) */}
							<div className='flex flex-col gap-3 lg:hidden'>
								{reviewCards.slice(0, 1).map((r, i) => (
									<div key={i} className='min-w-0 rounded-xl border border-slate-200/90 bg-slate-50/80 p-4'>
										<div className='flex gap-3'>
											<span className={`flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${r.bg}`}>
												{r.initial}
											</span>
											<div className='min-w-0'>
												<p className='font-semibold text-slate-900'>{r.name}</p>
												<p className='text-xs text-slate-500'>{r.country}</p>
											</div>
										</div>
										<p className='mt-2 break-words text-sm italic leading-relaxed text-slate-700'>«{r.excerpt}»</p>
									</div>
								))}
							</div>
							{/* Десктоп: сітка превʼю */}
							<div className='hidden gap-4 lg:grid lg:grid-cols-3'>
								{reviewCards.slice(0, 6).map((r, i) => (
									<div key={i} className='min-w-0 rounded-xl border border-slate-200/90 bg-slate-50/80 p-4'>
										<div className='flex gap-3'>
											<span className={`flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${r.bg}`}>
												{r.initial}
											</span>
											<div className='min-w-0'>
												<p className='font-semibold text-slate-900'>{r.name}</p>
												<p className='text-xs text-slate-500'>{r.country}</p>
											</div>
										</div>
										<p className='mt-2 break-words text-sm italic leading-relaxed text-slate-700'>«{r.excerpt}»</p>
									</div>
								))}
							</div>
						</>
					)}
				</div>

				{reviewsExpanded ? (
					<button
						type='button'
						onClick={() => setReviewsExpanded(false)}
						className='mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 sm:w-auto'
					>
						Згорнути відгуки
					</button>
				) : (
					<button
						type='button'
						onClick={openAllReviews}
						className='mt-6 inline-flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-sky-600 bg-white px-5 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-50 sm:w-auto'
					>
						Читати всі відгуки
					</button>
				)}
			</section>

			{/* FAQ */}
			<section className='mt-10'>
				<div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
					<h2 className='text-xl font-bold text-[#2D333D]'>Мандрівники запитують</h2>
				</div>
				<div className='mt-5 grid gap-4 md:grid-cols-2 md:items-start md:gap-x-5'>
					<div className='rounded-xl border border-slate-200 bg-white shadow-sm'>
						<ul role='list' className='divide-y divide-slate-200'>
							{faqSplit.left.map((item, j) => {
								const i = j
								const open = !!faqOpen[i]
								const headingId = `faq-q-${hotel.id}-${i}`
								const panelId = `faq-a-${hotel.id}-${i}`
								return (
									<li key={`faq-${i}`}>
										<button
											type='button'
											id={headingId}
											aria-expanded={open}
											aria-controls={panelId}
											className='flex w-full cursor-pointer items-start justify-between gap-2 px-4 py-2.5 text-left transition hover:bg-slate-50/80'
											onClick={() => setFaqOpen(prev => ({ ...prev, [i]: !prev[i] }))}
										>
											<span className='flex min-w-0 items-start gap-2 text-[0.9375rem] font-medium leading-snug text-slate-900'>
												<FaCommentDots className='mt-0.5 size-4 shrink-0 text-slate-400' aria-hidden />
												{item.q}
											</span>
											<FaChevronRight
												className={`mt-1 size-3 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-90' : ''}`}
												aria-hidden
											/>
										</button>
										{open ? (
											<div
												id={panelId}
												role='region'
												aria-labelledby={headingId}
												className='border-t border-slate-100 bg-slate-50/50 px-4 py-3'
											>
												<p className='text-[0.8125rem] leading-relaxed text-slate-600'>{item.a}</p>
											</div>
										) : null}
									</li>
								)
							})}
						</ul>
					</div>
					<div className='rounded-xl border border-slate-200 bg-white shadow-sm'>
						<ul role='list' className='divide-y divide-slate-200'>
							{faqSplit.right.map((item, j) => {
								const i = j + 5
								const open = !!faqOpen[i]
								const headingId = `faq-q-${hotel.id}-${i}`
								const panelId = `faq-a-${hotel.id}-${i}`
								return (
									<li key={`faq-${i}`}>
										<button
											type='button'
											id={headingId}
											aria-expanded={open}
											aria-controls={panelId}
											className='flex w-full cursor-pointer items-start justify-between gap-2 px-4 py-2.5 text-left transition hover:bg-slate-50/80'
											onClick={() => setFaqOpen(prev => ({ ...prev, [i]: !prev[i] }))}
										>
											<span className='flex min-w-0 items-start gap-2 text-[0.9375rem] font-medium leading-snug text-slate-900'>
												<FaCommentDots className='mt-0.5 size-4 shrink-0 text-slate-400' aria-hidden />
												{item.q}
											</span>
											<FaChevronRight
												className={`mt-1 size-3 shrink-0 text-slate-400 transition-transform ${open ? 'rotate-90' : ''}`}
												aria-hidden
											/>
										</button>
										{open ? (
											<div
												id={panelId}
												role='region'
												aria-labelledby={headingId}
												className='border-t border-slate-100 bg-slate-50/50 px-4 py-3'
											>
												<p className='text-[0.8125rem] leading-relaxed text-slate-600'>{item.a}</p>
											</div>
										) : null}
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</section>

			{/* Карта */}
			<section id='hotel-location-map' className='mt-10 scroll-mt-28 border-t border-slate-200 pt-8'>
				<h2 className='text-2xl font-bold text-[#2D333D]'>Де ви будете</h2>
				<div className='mt-4'>
					<HotelDetailMap hotel={hotel} />
				</div>
				<div className='mt-4'>
					<p className='text-lg font-bold text-[#2D333D]'>Поляна, Закарпатська область, Україна</p>
					<p className='mt-2 text-sm leading-relaxed text-slate-600'>
						Свалявський район у долині річки Латориця (близько 200–250 м над рівнем моря), на південних схилах
						Полонинського хребта з висотами близько 1200–1500 м. Зручна база для гірських прогулянок і відпочинку в
						Карпатах.
					</p>
				</div>
			</section>

			<HotelGalleryLightbox
				open={galleryOpen}
				startIndex={galleryStart}
				onClose={() => setGalleryOpen(false)}
				images={gallery}
				hotelName={hotel.name}
			/>
			<a
				href={`tel:${hotel.phone.replace(/[^\d+]/g, '')}`}
				className='animate-wiggle fixed bottom-5 left-4 z-40 inline-flex min-h-11 items-center justify-center rounded-full bg-[#53C4DA] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg ring-1 ring-cyan-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2FAFC8] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#53C4DA] focus-visible:ring-offset-2 sm:bottom-6 sm:left-6 sm:px-6 sm:text-sm'
				aria-label={`Забронювати ${hotel.name} — зателефонувати`}
			>
				Забронювати
			</a>
		</div>
	)
}
