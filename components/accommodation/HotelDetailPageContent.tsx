'use client'

import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
	FaBus,
	FaChevronLeft,
	FaChevronRight,
	FaCommentDots,
	FaHeart,
	FaMapMarkerAlt,
	FaMountain,
	FaMugHot,
	FaRegHeart,
	FaShare,
	FaStar,
	FaSwimmer,
	FaTimes,
	FaTint,
	FaUtensils,
	FaUsers,
	FaWalking,
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
	areaTags,
	aroundAirports,
	aroundRestaurantItems,
	aroundTransportItems,
	galleryImagesForHotel,
	hotelFaqEntries,
	hotelListingSubtitle,
	longDescriptionParagraphs,
	parseGuestCount,
	popularFacilities,
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

function AreaTagIcon({ kind }: { kind: (typeof areaTags)[0]['icon'] }) {
	const cls = 'size-4 shrink-0 text-sky-600'
	switch (kind) {
		case 'mountain':
			return <FaMountain className={cls} aria-hidden />
		case 'droplet':
			return <FaTint className={cls} aria-hidden />
		case 'hiker':
			return <FaWalking className={cls} aria-hidden />
		case 'star':
			return <FaStar className={cls} aria-hidden />
		case 'pin':
			return <FaMapMarkerAlt className={cls} aria-hidden />
		default:
			return null
	}
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
							<span>Зведено з відкритих сервісів бронювання (Booking та ін.), не лише POLYANA.INFO</span>
						) : (
							<span>Ще немає відгуків на порталі</span>
						)}
						<span className='text-slate-400'>·</span>
						<span className='font-medium text-slate-700'>{hotel.rating}</span>
					</p>
				</div>
			</div>

			{/* Опис + зручності + сайдбар */}
			<div className='mt-8 grid gap-8 lg:grid-cols-[1fr,min(340px,100%)] lg:items-start'>
				<div className='space-y-6'>
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
						<ul className='mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2'>
							{popularFacilities.map(f => {
								const Ico = facilityIcons[f.icon]
								return (
									<li key={f.id} className='flex items-center gap-3 text-[0.9375rem] text-slate-800'>
										<span className='flex size-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700'>
											<Ico className='size-5' aria-hidden />
										</span>
										<span>{f.label}</span>
									</li>
								)
							})}
						</ul>
					</section>
				</div>

				<aside className='rounded-2xl bg-sky-50/90 p-5 ring-1 ring-sky-100'>
					<h3 className='text-lg font-bold text-[#2D333D]'>Особливості помешкання</h3>
					<ul className='mt-4 space-y-4'>
						{propertyHighlights(hotel).map((h, i) => (
							<li key={i} className='flex gap-3'>
								{h.icon ? <HighlightIcon kind={h.icon} /> : null}
								<div>
									<p className='font-semibold text-slate-900'>{h.title}</p>
									<p className='mt-1 text-sm leading-relaxed text-slate-700'>{h.body}</p>
								</div>
							</li>
						))}
					</ul>
					<a
						href={hotel.website}
						target='_blank'
						rel='noopener noreferrer'
						className='mt-5 flex w-full items-center justify-center rounded-lg bg-sky-600 px-4 py-3 text-center text-sm font-bold text-white shadow-sm transition hover:bg-sky-700'
					>
						Забронювати зараз
					</a>
				</aside>
			</div>

			{/* Відгуки */}
			<section className='mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6'>
				<div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
					<h2 className='text-xl font-bold text-[#2D333D]'>Відгуки гостей</h2>
					<a
						href={hotel.website}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex w-fit shrink-0 items-center justify-center rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700'
					>
						Переглянути наявність місць
					</a>
				</div>

				<div className='mt-4 flex flex-wrap items-center gap-3'>
					<span className='rounded bg-sky-900 px-3 py-2 text-xl font-bold text-white'>{scoreLabel}</span>
					<span className='font-medium text-slate-800'>Чудово · {guestCount ?? '—'} відгуків</span>
					<button type='button' className='cursor-pointer text-sm font-semibold text-sky-700 hover:underline'>
						Читати всі відгуки
					</button>
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
				<div className='relative mt-3'>
					<div className='flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden'>
							{sampleReviewCardsForHotel(hotel.id).map((r, i) => (
								<div
									key={i}
									className='min-w-[min(100%,20rem)] snap-start shrink-0 rounded-xl border border-slate-200/90 bg-slate-50/80 p-4 lg:min-w-0'
								>
									<div className='flex gap-3'>
										<span
											className={`flex size-10 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white ${r.bg}`}
										>
											{r.initial}
										</span>
										<div>
											<p className='font-semibold text-slate-900'>{r.name}</p>
											<p className='text-xs text-slate-500'>{r.country}</p>
										</div>
									</div>
									<p className='mt-2 text-sm italic leading-relaxed text-slate-700'>«{r.excerpt}»</p>
									<button type='button' className='mt-3 cursor-pointer text-sm font-semibold text-sky-700 hover:underline'>
										Докладніше
									</button>
								</div>
							))}
					</div>
				</div>

				<button
					type='button'
					className='mt-6 inline-flex cursor-pointer items-center rounded-lg border-2 border-sky-600 bg-white px-5 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-50'
				>
					Читати всі відгуки
				</button>
			</section>

			{/* FAQ */}
			<section className='mt-10'>
				<div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
					<h2 className='text-xl font-bold text-[#2D333D]'>Мандрівники запитують</h2>
					<a
						href={hotel.website}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex w-fit rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700'
					>
						Переглянути наявність місць
					</a>
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

			{/* Навколо */}
			<section className='mt-10'>
				<div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
					<h2 className='text-xl font-bold text-[#2D333D]'>Навколо готелю</h2>
					<a
						href={hotel.website}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex w-fit rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-700'
					>
						Переглянути наявність місць
					</a>
				</div>
				<p className='mt-3 text-sm text-slate-700'>Гостям подобався район через таке:</p>
				<ul className='mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-sm'>
					{areaTags.map(tag => (
						<li key={tag.label} className='inline-flex items-center gap-1.5 text-slate-800'>
							<AreaTagIcon kind={tag.icon} />
							<span>{tag.label}</span>
						</li>
					))}
					<li>
						<a href='#hotel-location-map' className='inline-flex items-center gap-1 text-sm font-semibold text-sky-700 hover:underline'>
							<FaMapMarkerAlt className='size-4' aria-hidden /> Відмінне розташування — на карті
						</a>
					</li>
				</ul>

				<div className='mt-6 grid gap-8 lg:grid-cols-3'>
					<div>
						<h3 className='mb-3 flex items-center gap-2 text-sm font-bold text-slate-900'>
							<FaUtensils className='size-4 text-slate-600' aria-hidden />
							Ресторани та кафе
						</h3>
						<ul className='space-y-2 text-sm text-slate-700'>
							{aroundRestaurantItems.map((row, i) => (
								<li key={i} className='flex justify-between gap-6 border-b border-slate-100 pb-2 last:border-0'>
									<span className='min-w-0'>{row.label}</span>
									<span className='shrink-0 font-medium tabular-nums text-slate-500'>{row.distance}</span>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className='mb-3 flex items-center gap-2 text-sm font-bold text-slate-900'>
							<FaBus className='size-4 text-slate-600' aria-hidden />
							Громадський транспорт
						</h3>
						<ul className='space-y-2 text-sm text-slate-700'>
							{aroundTransportItems.map((row, i) => (
								<li key={i} className='flex justify-between gap-6 border-b border-slate-100 pb-2'>
									<span className='min-w-0'>{row.label}</span>
									<span className='shrink-0 font-medium tabular-nums text-slate-500'>{row.distance}</span>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h3 className='mb-3 flex items-center gap-2 text-sm font-bold text-slate-900'>
							<MdAirportShuttle className='size-4 text-slate-600' aria-hidden />
							Найближчі аеропорти
						</h3>
						<ul className='space-y-2 text-sm text-slate-700'>
							{aroundAirports.map((row, i) => (
								<li key={i} className='flex justify-between gap-6 border-b border-slate-100 pb-2'>
									<span className='min-w-0'>{row.label}</span>
									<span className='shrink-0 font-medium tabular-nums text-slate-500'>{row.distance}</span>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className='mt-6 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between'>
					<p className='max-w-xl'>
						Показано найкоротші приблизні піші чи автомобільні маршрути. Фактична відстань може відрізнятися.
					</p>
					<p>
						Не вистачає інформації?{' '}
						<button type='button' className='font-medium text-sky-700 hover:underline'>
							Так
						</button>{' '}
						/{' '}
						<button type='button' className='font-medium text-slate-600 hover:underline'>
							Ні
						</button>
					</p>
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
		</div>
	)
}
