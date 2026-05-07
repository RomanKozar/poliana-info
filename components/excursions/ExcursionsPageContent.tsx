'use client'

import Image from 'next/image'
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import BottomStatusToast, {
	WIP_SECTION_TOAST_MESSAGE,
} from '@/components/shared/BottomStatusToast'
import ExcursionRouteModal from '@/components/excursions/ExcursionRouteModal'
import {
	allExcursionListings,
	EXCURSIONS_MOUNTAINS_ANCHOR_ID,
	mountainExcursionTabs,
	polyanaExcursionListings,
	quadExcursions,
	type ExcursionListing,
	type ExcursionTabGroup,
} from '@/data/excursions-page'
import { attachPolyanaMapZoomControlsOnly } from '@/lib/google-map-stack-controls'
import {
	homeMapMarkerToUnifiedCard,
	unifiedMapCardInfoWindowHtml,
} from '@/lib/map-info-window-html'
import { syncInfoWindowGalleryNav, toggleIwHeartActive } from '@/lib/map-info-window-ui'
import { touristCityMapPinIconDataUrl } from '@/lib/home-map-pin-icons'

const EXCURSIONS_MARKERS = allExcursionListings()
const POLYANA_EXCURSIONS = polyanaExcursionListings()

const QUAD_CARD_SKELETON_IDS = new Set(['quad-panorama', 'quad-sunset'])

function ExcursionCardSkeleton() {
	return (
		<article
			className='flex min-h-0 flex-col overflow-hidden rounded-xl border border-[#DCE8D8] bg-white shadow-sm sm:min-h-36 sm:flex-row'
			aria-hidden
		>
			<div className='h-40 w-full shrink-0 bg-slate-200/90 sm:hidden' />
			<div className='flex flex-1 flex-col gap-3 px-4 py-5'>
				<div className='h-6 w-4/5 max-w-xs rounded-md bg-slate-200/90' />
				<div className='h-3 w-full rounded-md bg-slate-200/80' />
				<div className='h-3 w-11/12 rounded-md bg-slate-200/80' />
				<div className='h-3 w-full rounded-md bg-slate-200/70' />
				<div className='h-3 w-[92%] rounded-md bg-slate-200/70' />
			</div>
			<div className='relative hidden min-h-[9rem] w-[42%] min-w-[130px] shrink-0 bg-slate-200/90 sm:block' />
		</article>
	)
}

function ExcursionCard({
	item,
	onOpenDetail,
	detailPageNewTab,
	onWipClick,
}: {
	item: ExcursionListing
	onOpenDetail?: () => void
	/** Повний URL або шлях на цьому ж сайті — відкриється в новій вкладці. */
	detailPageNewTab?: string
	/** Тимчасово: показ тосту «у розробці» замість переходу */
	onWipClick?: () => void
}) {
	const openPage = Boolean(detailPageNewTab)
	const openModal = Boolean(onOpenDetail)
	const wip = Boolean(onWipClick)
	const interactive = openPage || openModal || wip

	const activate = () => {
		if (wip) {
			onWipClick!()
			return
		}
		if (openPage) {
			window.open(detailPageNewTab!, '_blank', 'noopener,noreferrer')
			return
		}
		onOpenDetail?.()
	}

	return (
		<article
			className='flex min-h-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-[#DCE8D8] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:min-h-36 sm:flex-row'
			{...(interactive
				? {
						role: 'button' as const,
						tabIndex: 0,
						...(openModal ? { 'aria-haspopup': 'dialog' as const } : {}),
						'aria-label': wip
							? `${item.title}. Розділ у розробці`
							: openPage
								? `${item.title}. Відкрити детальну сторінку в новій вкладці`
								: `${item.title}. Натисніть для детального опису туру`,
						onClick: activate,
						onKeyDown: (e: ReactKeyboardEvent<HTMLElement>) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault()
								activate()
							}
						},
					}
				: {})}
		>
			<div className='relative h-40 w-full shrink-0 sm:hidden'>
				<Image src={item.image} alt='' fill sizes='100vw' className='object-cover' />
			</div>
			<div className='flex flex-1 flex-col px-4 py-5'>
				<div className='space-y-1'>
					<h3 className='text-lg font-bold text-[#2D333D]'>{item.title}</h3>
					<p className='flex items-start gap-1.5 text-xs leading-snug text-slate-500'>
						<FaMapMarkerAlt className='mt-0.5 size-3.5 shrink-0 text-[#53C4DA]' aria-hidden />
						<span>{item.address}</span>
					</p>
					<p className='text-sm text-slate-600'>{item.description}</p>
					{openModal ? (
						<p className='mt-3 text-sm font-semibold text-[#53C4DA]'>Детальніше про тур</p>
					) : null}
				</div>
			</div>
			<div className='relative hidden w-[42%] min-w-[130px] shrink-0 sm:block'>
				<Image
					src={item.image}
					alt=''
					fill
					sizes='(min-width: 640px) 18vw, 0'
					className='object-cover'
				/>
			</div>
		</article>
	)
}

function TabbedExcursionSection({
	title,
	tabs,
	onExcursionCardWip,
	sectionId,
}: {
	title: string
	tabs: ExcursionTabGroup[]
	onExcursionCardWip: () => void
	/** Якір для переходів типу `/excursions#id`. */
	sectionId?: string
}) {
	const [activeId, setActiveId] = useState(tabs[0]?.id ?? '')
	const active = tabs.find(t => t.id === activeId) ?? tabs[0]
	const [routeModalOpen, setRouteModalOpen] = useState(false)
	const [routeModalPayload, setRouteModalPayload] = useState<{
		title: string
		start: { lat: number; lng: number }
		end: { lat: number; lng: number }
		path?: readonly { lat: number; lng: number }[]
	} | null>(null)

	if (!tabs.length || !active) return null

	return (
		<section
			id={sectionId}
			className={`border-t border-slate-200/80 bg-white px-4 py-8 sm:px-16 lg:px-24${
				sectionId ? ' scroll-mt-[calc(var(--header-offset,68px)+12px)]' : ''
			}`}
		>
			<h2 className='mb-4 text-2xl font-bold text-[#2D333D]'>{title}</h2>
			<div
				className='mb-5 flex flex-wrap gap-2'
				role='tablist'
				aria-label={title}
			>
				{tabs.map(tab => {
					const selected = tab.id === active.id
					return (
						<button
							key={tab.id}
							type='button'
							role='tab'
							aria-selected={selected}
							id={`exc-tab-${tab.id}`}
							className={
								selected
									? 'cursor-pointer rounded-full bg-[#53C4DA] px-4 py-2 text-sm font-semibold text-white shadow-sm'
									: 'cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#53C4DA]/50 hover:text-[#2D333D]'
							}
							onClick={() => setActiveId(tab.id)}
						>
							{tab.label}
						</button>
					)
				})}
			</div>
			<div role='tabpanel' aria-labelledby={`exc-tab-${active.id}`} className='grid gap-4 md:grid-cols-2'>
				{active.excursions.map(item => {
					const hasRoute = Boolean(item.route?.start && item.route?.end)
					const hasDetailPage = Boolean(item.detailPagePath)
					return (
						<ExcursionCard
							key={item.id}
							item={item}
							detailPageNewTab={hasDetailPage ? item.detailPagePath : undefined}
							onOpenDetail={
								hasRoute && !hasDetailPage
									? () => {
											setRouteModalPayload({
												title: item.title,
												start: item.route!.start,
												end: item.route!.end,
												path: item.route!.path,
											})
											setRouteModalOpen(true)
										}
									: undefined
							}
							onWipClick={hasRoute || hasDetailPage ? undefined : onExcursionCardWip}
						/>
					)
				})}
			</div>
			{routeModalPayload ? (
				<ExcursionRouteModal
					open={routeModalOpen}
					onClose={() => setRouteModalOpen(false)}
					title={routeModalPayload.title}
					start={routeModalPayload.start}
					end={routeModalPayload.end}
					path={routeModalPayload.path}
				/>
			) : null}
		</section>
	)
}

function PolyanaExcursionHotelStyleCard({
	item,
	isFavorite,
	onToggleFavorite,
	onCardClick,
}: {
	item: ExcursionListing
	isFavorite: boolean
	onToggleFavorite: () => void
	onCardClick?: () => void
}) {
	const interactive = Boolean(onCardClick)

	return (
		<article
			className='flex h-full cursor-pointer flex-col overflow-hidden rounded-[10px] border border-[#E4EBEE] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
			{...(interactive
				? {
						role: 'button' as const,
						tabIndex: 0,
						'aria-label': `${item.title}. Розділ у розробці`,
						onClick: () => onCardClick!(),
						onKeyDown: (e: ReactKeyboardEvent<HTMLElement>) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault()
								onCardClick!()
							}
						},
					}
				: {})}
		>
			<div className='relative h-36 sm:h-40'>
				<Image
					src={item.image}
					alt={item.title}
					fill
					sizes='(min-width: 1024px) 28vw, (min-width: 640px) 42vw, 88vw'
					className='object-cover'
				/>
				<button
					type='button'
					onClick={e => {
						e.stopPropagation()
						onToggleFavorite()
					}}
					aria-label={
						isFavorite ? `Прибрати ${item.title} з обраного` : `Додати ${item.title} в обране`
					}
					aria-pressed={isFavorite}
					className='heart-container'
				>
					<span className='sr-only'>
						{isFavorite ? 'Прибрати з обраного' : 'Додати в обране'}
					</span>
					<span className={`heart-svg-container ${isFavorite ? 'is-active' : ''}`} aria-hidden>
						<svg viewBox='0 0 24 24' className='heart-svg-outline'>
							<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
						</svg>
						<svg viewBox='0 0 24 24' className='heart-svg-filled'>
							<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
						</svg>
						<svg viewBox='0 0 24 24' className='heart-svg-celebrate'>
							<path d='M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1' />
						</svg>
					</span>
				</button>
			</div>
			<div className='flex flex-1 flex-col p-3 sm:p-4'>
				<div className='space-y-2'>
					<h3 className='text-[15px] font-bold leading-tight text-[#2D333D] sm:text-base'>{item.title}</h3>
					<p className='text-[11px] leading-snug text-[#53C4DA] sm:text-xs'>
						<FaMapMarkerAlt className='mr-1 inline-block size-2.5 align-[-1px]' aria-hidden />
						{item.address}
					</p>
					<p className='line-clamp-3 text-xs leading-relaxed text-slate-600 sm:text-[13px]'>{item.description}</p>
				</div>
			</div>
		</article>
	)
}

export default function ExcursionsPageContent() {
	const [favoritePolyana, setFavoritePolyana] = useState<Record<string, boolean>>({})
	const [mapError, setMapError] = useState<string | null>(null)
	const [isMapFallbackMode, setIsMapFallbackMode] = useState(false)
	const [wipToastOpen, setWipToastOpen] = useState(false)
	const wipToastId = useId()
	const mapContainerRef = useRef<HTMLDivElement | null>(null)
	const mapInstanceRef = useRef<unknown>(null)

	const closeWipToast = useCallback(() => setWipToastOpen(false), [])
	const showWipToast = useCallback(() => setWipToastOpen(true), [])

	useEffect(() => {
		const scrollToHashTarget = () => {
			const id = window.location.hash.slice(1)
			if (!id) return
			const el = document.getElementById(id)
			if (!el) return
			requestAnimationFrame(() => {
				requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
			})
		}
		scrollToHashTarget()
		window.addEventListener('hashchange', scrollToHashTarget)
		return () => window.removeEventListener('hashchange', scrollToHashTarget)
	}, [])

	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
		if (!apiKey) {
			setIsMapFallbackMode(true)
			setMapError('API ключ не знайдено, показуємо fallback-карту.')
			return
		}
		if (!mapContainerRef.current) return

		const win = window as Window & {
			google?: any
			initPolyanaExcursionsMap?: () => void
		}

		let detachZoom: (() => void) | null = null
		let detachIwUiCapture: (() => void) | null = null

		const teardownMap = () => {
			detachZoom?.()
			detachZoom = null
			detachIwUiCapture?.()
			detachIwUiCapture = null
			mapInstanceRef.current = null
			delete win.initPolyanaExcursionsMap
		}

		const initMap = () => {
			if (!mapContainerRef.current || !win.google?.maps) return

			const center = EXCURSIONS_MARKERS[0]?.position ?? { lat: 48.6212, lng: 22.968 }
			const map = new win.google.maps.Map(mapContainerRef.current, {
				center,
				zoom: 12,
				mapTypeId: 'hybrid',
				gestureHandling: 'greedy',
				disableDefaultUI: true,
				mapTypeControl: false,
				fullscreenControl: false,
				zoomControl: false,
				keyboardShortcuts: false,
				clickableIcons: false,
				styles: [
					{ featureType: 'poi', stylers: [{ visibility: 'off' }] },
					{ featureType: 'transit', stylers: [{ visibility: 'off' }] },
					{ featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
					{ featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
					{ elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
				],
			})

			mapInstanceRef.current = map
			detachZoom?.()
			detachZoom = attachPolyanaMapZoomControlsOnly(map, win.google.maps)

			let activeInfoWindow: any = null
			const mapRootEl = mapContainerRef.current
			if (mapRootEl) {
				detachIwUiCapture?.()
				const onInfoWindowUiClick = (e: MouseEvent) => {
					const next =
						e.target instanceof Element
							? e.target.closest('.polyana-accommodation-iw-gallery-btn--next')
							: null
					const prev =
						e.target instanceof Element
							? e.target.closest('.polyana-accommodation-iw-gallery-btn--prev')
							: null
					if (next || prev) {
						e.preventDefault()
						e.stopPropagation()
						e.stopImmediatePropagation()
						const gal = (next || prev)!.closest('[data-iw-gallery]') as HTMLElement | null
						if (!gal) return
						const total = Math.max(1, parseInt(gal.dataset.total || '1', 10))
						let idx = parseInt(gal.dataset.idx || '0', 10)
						if (next) idx = (idx + 1) % total
						else idx = (idx - 1 + total) % total
						gal.dataset.idx = String(idx)
						const track = gal.querySelector<HTMLElement>('[data-gallery-track]')
						if (track) {
							const step = 100 / total
							track.style.transform = `translate3d(-${step * idx}%,0,0)`
						}
						gal.querySelectorAll<HTMLElement>('.polyana-accommodation-iw-dot').forEach((dot, i) => {
							dot.classList.toggle('polyana-accommodation-iw-dot--on', i === idx)
						})
						syncInfoWindowGalleryNav(gal)
						return
					}
					const heart =
						e.target instanceof Element
							? e.target.closest('.polyana-accommodation-iw-heart')
							: null
					if (heart) {
						e.preventDefault()
						e.stopPropagation()
						e.stopImmediatePropagation()
						toggleIwHeartActive(heart)
						return
					}
					const closer =
						e.target instanceof Element ? e.target.closest('.polyana-accommodation-iw-close') : null
					if (!closer) return
					e.preventDefault()
					e.stopPropagation()
					e.stopImmediatePropagation()
					if (activeInfoWindow) {
						activeInfoWindow.close()
						activeInfoWindow = null
					}
				}
				mapRootEl.addEventListener('click', onInfoWindowUiClick, true)
				detachIwUiCapture = () => mapRootEl.removeEventListener('click', onInfoWindowUiClick, true)
			}

			const icon = {
				url: touristCityMapPinIconDataUrl,
				scaledSize: new win.google.maps.Size(44, 52),
				anchor: new win.google.maps.Point(22, 52),
			}

			const bounds = new win.google.maps.LatLngBounds()
			for (const place of EXCURSIONS_MARKERS) {
				const marker = new win.google.maps.Marker({
					position: place.position,
					map,
					title: place.title,
					icon,
				})
				bounds.extend(place.position)

				const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
					`${place.title}, ${place.address}`
				)}`
				const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
					`${place.title}, ${place.address}`
				)}`
				const categoryLine = [place.description, place.priceHint].filter(Boolean).join(' · ')

				const infoWindow = new win.google.maps.InfoWindow({
					content: unifiedMapCardInfoWindowHtml(
						homeMapMarkerToUnifiedCard({
							name: place.title,
							address: place.address,
							category: categoryLine,
							image: place.image,
							featurePill: place.mapPill,
							routeLink,
							saveLink,
						})
					),
					headerDisabled: true,
				})

				marker.addListener('click', () => {
					if (activeInfoWindow) activeInfoWindow.close()
					infoWindow.open({ anchor: marker, map })
					activeInfoWindow = infoWindow
				})
			}

			map.fitBounds(bounds)
			win.google.maps.event.addListenerOnce(map, 'idle', () => {
				const zoom = map.getZoom()
				if (typeof zoom === 'number') {
					map.setZoom(Math.max(10, zoom - 1))
				}
			})
		}

		if (win.google?.maps) {
			initMap()
			return teardownMap
		}

		win.initPolyanaExcursionsMap = initMap

		const existingScript = document.getElementById('google-maps-script')
		if (!existingScript) {
			const script = document.createElement('script')
			script.id = 'google-maps-script'
			script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=uk&region=UA&callback=initPolyanaExcursionsMap`
			script.async = true
			script.defer = true
			script.onerror = () => {
				setMapError('Не вдалося завантажити Google Maps API.')
				setIsMapFallbackMode(true)
			}
			document.head.appendChild(script)
			return teardownMap
		}

		const retryId = window.setInterval(() => {
			if (win.google?.maps) {
				window.clearInterval(retryId)
				initMap()
			}
		}, 150)

		return () => {
			window.clearInterval(retryId)
			teardownMap()
		}
	}, [])

	const onResize = useCallback(() => {
		const map = mapInstanceRef.current
		const win = window as Window & { google?: any }
		if (map && win.google?.maps?.event) win.google.maps.event.trigger(map, 'resize')
	}, [])

	useEffect(() => {
		window.addEventListener('resize', onResize)
		return () => window.removeEventListener('resize', onResize)
	}, [onResize])

	return (
		<div className='flex min-h-0 w-full flex-col bg-[#F5F6F7] pb-10'>
			<section className='border-b border-slate-200/80 bg-white px-4 py-8 sm:px-16 lg:px-24'>
				<p className='mb-2 text-sm font-medium uppercase tracking-wide text-[#53C4DA]'>Екскурсії</p>
				<h1 className='text-3xl font-bold text-[#2D333D] sm:text-4xl'>Екскурсії Поляною та околицями</h1>
				<p className='mt-3 max-w-3xl text-slate-600'>
					Оберіть формат: активні квадроцикли, підйоми в гори або спокійні маршрути самою Поляною. Усі точки зібрані
					на карті внизу сторінки — зручно спланувати день.
				</p>
			</section>

			<section className='border-t border-slate-200/80 bg-[#F5F6F7] px-4 py-8 sm:px-16 lg:px-24'>
				<h2 className='mb-4 text-2xl font-bold text-[#2D333D]'>Екскурсії на квадроциклах</h2>
				<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
					{quadExcursions.map(item =>
						QUAD_CARD_SKELETON_IDS.has(item.id) ? (
							<ExcursionCardSkeleton key={item.id} />
						) : (
							<ExcursionCard
								key={item.id}
								item={item}
								detailPageNewTab={item.detailPagePath}
							/>
						),
					)}
				</div>
			</section>

			<TabbedExcursionSection
				title='Екскурсії в гори'
				tabs={mountainExcursionTabs}
				onExcursionCardWip={showWipToast}
				sectionId={EXCURSIONS_MOUNTAINS_ANCHOR_ID}
			/>

			<section className='border-t border-slate-200/80 bg-white px-4 py-8 sm:px-16 lg:px-24'>
				<h2 className='mb-5 text-2xl font-bold text-[#2D333D] sm:mb-6 sm:text-[26px]'>Екскурсії Поляною</h2>
				<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
					{POLYANA_EXCURSIONS.map(item => (
						<PolyanaExcursionHotelStyleCard
							key={item.id}
							item={item}
							isFavorite={Boolean(favoritePolyana[item.id])}
							onToggleFavorite={() =>
								setFavoritePolyana(prev => ({ ...prev, [item.id]: !prev[item.id] }))
							}
							onCardClick={showWipToast}
						/>
					))}
				</div>
			</section>

			<section
				className='mt-2 border-t border-slate-200/80 bg-white px-4 py-8 sm:px-16 lg:px-24'
				aria-labelledby='excursions-map-heading'
			>
				<h2 id='excursions-map-heading' className='mb-3 text-2xl font-bold text-[#2D333D]'>
					Карта екскурсій
				</h2>
				<p className='mb-4 max-w-3xl text-sm text-slate-600'>
					Натисніть маркер, щоб відкрити короткий опис і побудувати маршрут у Google Maps.
				</p>
				<div className='relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm ring-1 ring-slate-900/5'>
					{isMapFallbackMode ? (
						<iframe
							title='Карта екскурсій Поляни'
							src='https://maps.google.com/maps?hl=uk&q=%D0%9F%D0%BE%D0%BB%D1%8F%D0%BD%D0%B0%2C%20%D0%97%D0%B0%D0%BA%D0%B0%D1%80%D0%BF%D0%B0%D1%82%D1%81%D1%8C%D0%BA%D0%B0%20%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C&t=k&z=12&ie=UTF8&iwloc=B&output=embed'
							className='h-[min(480px,70vh)] w-full min-h-[320px]'
							loading='lazy'
							referrerPolicy='no-referrer-when-downgrade'
						/>
					) : (
						<div
							ref={mapContainerRef}
							className='polyana-google-map-root polyana-google-map-root--home-map h-[min(480px,70vh)] min-h-[320px] w-full'
						/>
					)}
					{mapError ? (
						<p className='pointer-events-none absolute bottom-3 left-1/2 z-[1] max-w-[90%] -translate-x-1/2 rounded-lg bg-white/95 px-3 py-1.5 text-center text-xs text-slate-600 shadow-sm'>
							{mapError}
						</p>
					) : null}
				</div>
			</section>
			<BottomStatusToast
				open={wipToastOpen}
				onClose={closeWipToast}
				id={wipToastId}
				message={WIP_SECTION_TOAST_MESSAGE}
			/>
		</div>
	)
}
