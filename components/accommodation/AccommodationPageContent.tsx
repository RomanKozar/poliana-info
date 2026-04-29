'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { FaMapMarkerAlt, FaStar, FaTimes } from 'react-icons/fa'
import { createHotelPricePillMarker, formatHotelPriceForMapMarker } from '@/lib/google-map-price-marker'
import { getHotelMapGallery, polyanaHotels, type PolyanaHotel } from '@/lib/polyana-hotels'
import AccommodationListPaginationStub from '@/components/accommodation/AccommodationListPaginationStub'
import {
	ACCOMMODATION_MAP_COLLAPSE_ICON,
	ACCOMMODATION_MAP_EXPAND_ICON,
	attachPolyanaMapExpandAndZoomControls,
} from '@/lib/google-map-stack-controls'
import { hotelInfoWindowHtml } from '@/lib/map-info-window-html'
import { syncInfoWindowGalleryNav, toggleIwHeartActive } from '@/lib/map-info-window-ui'

const MOBILE_MAP_SHEET_MQ = '(max-width: 1023px)'

function AccommodationMapMobileBottomSheet({
	hotel,
	onClose,
}: {
	hotel: PolyanaHotel
	onClose: () => void
}) {
	const gallery = getHotelMapGallery(hotel)
	const n = Math.max(1, gallery.length)
	const [idx, setIdx] = useState(0)
	const [mapSheetHeartActive, setMapSheetHeartActive] = useState(false)
	const touchStartX = useRef(0)

	useEffect(() => {
		setIdx(0)
		setMapSheetHeartActive(false)
	}, [hotel.id])

	const go = useCallback(
		(delta: number) => {
			setIdx(i => {
				const next = i + delta
				if (next < 0 || next >= n) return i
				return next
			})
		},
		[n]
	)

	const onTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX
	}
	const onTouchEnd = (e: React.TouchEvent) => {
		if (n <= 1) return
		const dx = e.changedTouches[0].clientX - touchStartX.current
		if (Math.abs(dx) < 45) return
		if (dx < 0) go(1)
		else go(-1)
	}

	return (
		<div
			className='lg:hidden fixed inset-0 z-[100] flex flex-col justify-end'
			role='dialog'
			aria-modal='true'
			aria-labelledby='accommodation-map-sheet-title'
		>
			<button
				type='button'
				className='absolute inset-0 z-0 cursor-default bg-slate-900/35 backdrop-blur-[2px] transition-opacity'
				aria-label='Закрити'
				onClick={onClose}
			/>
			<div className='relative z-10 w-full max-w-7xl mx-auto px-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]'>
				<div className='overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_-8px_40px_rgba(15,23,42,0.18)] pointer-events-auto'>
					<div
						className='relative aspect-[5/2] w-full min-h-[10rem] max-h-[40vh] overflow-hidden touch-none'
						onTouchStart={onTouchStart}
						onTouchEnd={onTouchEnd}
					>
						<div
							className='flex h-full min-h-[10rem] transition-transform duration-300 ease-out will-change-transform'
							style={{
								width: `${n * 100}%`,
								transform: `translateX(-${(idx * 100) / n}%)`,
							}}
						>
							{gallery.map((src, i) => (
								<div
									key={`${hotel.id}-g-${i}`}
									className='relative h-full'
									style={{ width: `${100 / n}%` }}
								>
									<Link
										href={`/accommodation/${hotel.id}`}
										target='_blank'
										rel='noopener noreferrer'
										className='relative block h-full w-full outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-cyan-500'
										aria-label={`Відкрити опис «${hotel.name}» у новій вкладці`}
									>
										<Image
											src={src}
											alt={i > 0 ? `${hotel.name} — ${i + 1}` : hotel.name}
											fill
											className='object-cover pointer-events-none select-none'
											sizes='100vw'
											priority={i === 0}
											draggable={false}
										/>
									</Link>
								</div>
							))}
						</div>
						{n > 1 ? (
							<>
								<button
									type='button'
									className='absolute left-2 top-1/2 z-[1] flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-white/94 text-base font-medium text-slate-800 shadow-sm disabled:opacity-0'
									aria-label='Попереднє фото'
									disabled={idx === 0}
									onClick={e => {
										e.stopPropagation()
										go(-1)
									}}
								>
									&#8249;
								</button>
								<button
									type='button'
									className='absolute right-2 top-1/2 z-[1] flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border-0 bg-white/94 text-base font-medium text-slate-800 shadow-sm disabled:opacity-0'
									aria-label='Наступне фото'
									disabled={idx >= n - 1}
									onClick={e => {
										e.stopPropagation()
										go(1)
									}}
								>
									&#8250;
								</button>
							</>
						) : null}
						<div
							className='pointer-events-none absolute inset-x-0 bottom-0 z-[1] flex justify-center gap-1.5 py-2.5 pt-6 bg-gradient-to-t from-black/50 to-transparent'
							aria-hidden
						>
							{gallery.map((_, i) => (
								<span
									key={i}
									className={
										i === idx
											? 'h-1.5 w-1.5 rounded-full bg-white shadow'
											: 'h-1.5 w-1.5 rounded-full bg-white/45'
									}
								/>
							))}
						</div>
						<div className='absolute right-2 top-2 z-[2] flex items-center gap-2'>
							<button
								type='button'
								className='heart-container heart-container--map-sheet'
								aria-label={
									mapSheetHeartActive
										? `Прибрати ${hotel.name} з обраного`
										: `Додати ${hotel.name} в обране`
								}
								aria-pressed={mapSheetHeartActive}
								onClick={e => {
									e.stopPropagation()
									setMapSheetHeartActive(was => {
										if (was) return false
										return true
									})
								}}
							>
								<span
									className={`heart-svg-container ${mapSheetHeartActive ? 'is-active' : ''}`}
									aria-hidden
								>
									<svg viewBox='0 0 24 24' className='heart-svg-outline' aria-hidden>
										<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
									</svg>
									<svg viewBox='0 0 24 24' className='heart-svg-filled' aria-hidden>
										<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
									</svg>
									<svg viewBox='0 0 24 24' className='heart-svg-celebrate' aria-hidden>
										<path d='M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1' />
									</svg>
								</span>
							</button>
							<button
								type='button'
								className='flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/90 bg-white/95 text-slate-800 shadow-sm transition hover:bg-white'
								aria-label='Закрити'
								onClick={onClose}
							>
								<FaTimes className='size-4' aria-hidden />
							</button>
						</div>
					</div>
					<div className='space-y-2 px-4 pb-4 pt-3'>
						<p className='text-xs font-medium uppercase tracking-wide text-slate-500'>Поляна, Закарпаття</p>
						<h2
							id='accommodation-map-sheet-title'
							className='text-lg font-bold leading-snug text-[#2D333D] sm:text-[1.125rem]'
						>
							{hotel.name}
						</h2>
						<p className='text-sm text-slate-500'>{hotel.address}</p>
						<p className='text-lg font-bold text-[#2D333D]'>{hotel.price}</p>
						{hotel.description ? (
							<p className='line-clamp-2 text-sm leading-snug text-slate-600'>{hotel.description}</p>
						) : null}
						<div className='pt-0.5'>
							<span className='inline-block rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600'>
								{hotel.feature}
							</span>
						</div>
						<div className='flex justify-end pt-1'>
							<a
								href={`tel:${hotel.phone}`}
								className='inline-flex w-fit min-w-[9rem] items-center justify-center rounded-full bg-[#F68F5D] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e57d4a]'
							>
								Подзвонити
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default function AccommodationPageContent() {
	const mapContainerRef = useRef<HTMLDivElement | null>(null)
	const mapColumnRef = useRef<HTMLElement | null>(null)
	const mapInstanceRef = useRef<any>(null)
	const activeInfoWindowRef = useRef<any>(null)
	const markersByIdRef = useRef<Map<string, any>>(new Map())
	const infoWindowsByIdRef = useRef<Map<string, any>>(new Map())
	/** Клік по картці до готовності карти — відкриваємо InfoWindow після initMap. */
	const pendingFocusHotelIdRef = useRef<string | null>(null)
	const [mapError, setMapError] = useState<string | null>(null)
	const [isMapFallbackMode, setIsMapFallbackMode] = useState(false)
	const [isMapExpanded, setIsMapExpanded] = useState(false)
	const [selectedId, setSelectedId] = useState<string | null>(null)
	const [hoveredListHotelId, setHoveredListHotelId] = useState<string | null>(null)
	const [hoveredMapMarkerHotelId, setHoveredMapMarkerHotelId] = useState<string | null>(null)
	const [markersVersion, setMarkersVersion] = useState(0)
	const [mapBottomSheetHotel, setMapBottomSheetHotel] = useState<PolyanaHotel | null>(null)
	/** < lg: нижня картка замість InfoWindow (читається в initMap, слухачах). */
	const isNarrowMapUiRef = useRef(
		typeof window !== 'undefined' && window.matchMedia(MOBILE_MAP_SHEET_MQ).matches
	)
	/** Після кліку по маркеру теж спрацьовує click по карті — тимчасово не закриваємо вікно. */
	const mapClickLockUntilRef = useRef(0)
	useLayoutEffect(() => {
		isNarrowMapUiRef.current = window.matchMedia(MOBILE_MAP_SHEET_MQ).matches
	}, [])

	useEffect(() => {
		const mq = window.matchMedia(MOBILE_MAP_SHEET_MQ)
		const sync = () => {
			isNarrowMapUiRef.current = mq.matches
			if (!mq.matches) setMapBottomSheetHotel(null)
		}
		mq.addEventListener('change', sync)
		return () => mq.removeEventListener('change', sync)
	}, [])

	useEffect(() => {
		if (mapBottomSheetHotel) {
			const prev = document.body.style.overflow
			document.body.style.overflow = 'hidden'
			return () => {
				document.body.style.overflow = prev
			}
		}
	}, [mapBottomSheetHotel])

	useEffect(() => {
		if (!mapBottomSheetHotel) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setMapBottomSheetHotel(null)
				setSelectedId(null)
			}
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [mapBottomSheetHotel])

	const scrollMapIntoView = () => {
		mapColumnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
	}

	const syncPriceMarkerStyles = useCallback(
		(hoverListId: string | null, hoverMapMarkerId: string | null, activeHotelId: string | null) => {
			const win = window as Window & { google?: { maps: any } }
			const maps = win.google?.maps
			if (!maps?.Size || markersByIdRef.current.size === 0) return

			for (const hotel of polyanaHotels) {
				const marker = markersByIdRef.current.get(hotel.id)
				if (!marker) continue
				const priceLabel = formatHotelPriceForMapMarker(hotel.price)
				const hovered = hoverListId === hotel.id || hoverMapMarkerId === hotel.id
				const variant =
					activeHotelId === hotel.id ? 'selected' : hovered ? 'active' : 'default'
				const pill = createHotelPricePillMarker(priceLabel, variant)
				marker.setIcon({
					url: pill.dataUrl,
					scaledSize: new maps.Size(pill.width, pill.height),
					anchor: new maps.Point(Math.round(pill.width / 2), pill.height),
				})
			}
		},
		[]
	)

	useEffect(() => {
		syncPriceMarkerStyles(hoveredListHotelId, hoveredMapMarkerHotelId, selectedId)
	}, [hoveredListHotelId, hoveredMapMarkerHotelId, selectedId, markersVersion, syncPriceMarkerStyles])

	const openHotelInfoOnMap = (hotel: PolyanaHotel) => {
		setSelectedId(hotel.id)
		scrollMapIntoView()
		const map = mapInstanceRef.current
		const marker = markersByIdRef.current.get(hotel.id)
		const iw = infoWindowsByIdRef.current.get(hotel.id)
		if (!map || !marker || !iw) {
			pendingFocusHotelIdRef.current = hotel.id
			return
		}
		pendingFocusHotelIdRef.current = null
		map.panTo(hotel.position)
		const z = map.getZoom()
		if (typeof z === 'number' && z < 15) map.setZoom(15)
		const w = window as Window & { google?: any }
		if (isNarrowMapUiRef.current) {
			if (activeInfoWindowRef.current) activeInfoWindowRef.current.close()
			activeInfoWindowRef.current = null
			mapClickLockUntilRef.current = Date.now() + 400
			setMapBottomSheetHotel(hotel)
			requestAnimationFrame(() => {
				if (map && w.google?.maps?.event) w.google.maps.event.trigger(map, 'resize')
			})
			return
		}
		setMapBottomSheetHotel(null)
		if (activeInfoWindowRef.current) activeInfoWindowRef.current.close()
		mapClickLockUntilRef.current = Date.now() + 400
		iw.open({ anchor: marker, map })
		activeInfoWindowRef.current = iw
		requestAnimationFrame(() => {
			if (map && w.google?.maps?.event) w.google.maps.event.trigger(map, 'resize')
		})
	}

	useEffect(() => {
		let detachMapControls: (() => void) | null = null
		let detachInfoWindowCloseClick: (() => void) | null = null
		const clearMapControls = () => {
			detachMapControls?.()
			detachMapControls = null
			detachInfoWindowCloseClick?.()
			detachInfoWindowCloseClick = null
		}

		const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
		if (!apiKey) {
			setIsMapFallbackMode(true)
			setMapError('Карта: показуємо вбудовану мапу без інтерактивних маркерів.')
			return
		}
		if (!mapContainerRef.current) return

		const win = window as Window & { google?: any; initPolyanaAccommodationMap?: () => void }

		const initMap = () => {
			if (!mapContainerRef.current || !win.google?.maps) return

			const map = new win.google.maps.Map(mapContainerRef.current, {
				center: polyanaHotels[0].position,
				zoom: 14,
				mapTypeId: 'hybrid',
				gestureHandling: 'greedy',
				disableDefaultUI: true,
				mapTypeControl: false,
				zoomControl: false,
				fullscreenControl: false,
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

			clearMapControls()
			detachMapControls = attachPolyanaMapExpandAndZoomControls(map, win.google.maps, {
				onToggleExpand: () => setIsMapExpanded(v => !v),
			})

			const bounds = new win.google.maps.LatLngBounds()
			markersByIdRef.current = new Map()
			infoWindowsByIdRef.current = new Map()

			polyanaHotels.forEach(hotel => {
				const priceLabel = formatHotelPriceForMapMarker(hotel.price)
				const pill = createHotelPricePillMarker(priceLabel)
				const marker = new win.google.maps.Marker({
					position: hotel.position,
					map,
					title: `${hotel.name} — ${priceLabel}`,
					icon: {
						url: pill.dataUrl,
						scaledSize: new win.google.maps.Size(pill.width, pill.height),
						anchor: new win.google.maps.Point(Math.round(pill.width / 2), pill.height),
					},
				})
				bounds.extend(hotel.position)
				const infoWindow = new win.google.maps.InfoWindow({
					content: hotelInfoWindowHtml(hotel),
					/** Сховати стандартний хрестик Google у шапці; закриття — кнопка на фото + клік по карті */
					headerDisabled: true,
				})
				markersByIdRef.current.set(hotel.id, marker)
				infoWindowsByIdRef.current.set(hotel.id, infoWindow)
				marker.addListener('click', () => {
					mapClickLockUntilRef.current = Date.now() + 400
					setSelectedId(hotel.id)
					if (isNarrowMapUiRef.current) {
						if (activeInfoWindowRef.current) activeInfoWindowRef.current.close()
						activeInfoWindowRef.current = null
						setMapBottomSheetHotel(hotel)
						map.panTo(hotel.position)
						const zz = map.getZoom()
						if (typeof zz === 'number' && zz < 15) map.setZoom(15)
						return
					}
					if (activeInfoWindowRef.current) activeInfoWindowRef.current.close()
					infoWindow.open({ anchor: marker, map })
					activeInfoWindowRef.current = infoWindow
				})

				marker.addListener('mouseover', () => setHoveredMapMarkerHotelId(hotel.id))
				marker.addListener('mouseout', () =>
					setHoveredMapMarkerHotelId(cur => (cur === hotel.id ? null : cur))
				)
			})

			setMarkersVersion(v => v + 1)

			map.addListener('click', () => {
				if (Date.now() < mapClickLockUntilRef.current) return
				if (isNarrowMapUiRef.current) {
					setMapBottomSheetHotel(null)
					setSelectedId(null)
					return
				}
				if (activeInfoWindowRef.current) {
					activeInfoWindowRef.current.close()
					activeInfoWindowRef.current = null
				}
				setSelectedId(null)
			})

			const mapRoot = mapContainerRef.current
			if (mapRoot) {
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
						mapClickLockUntilRef.current = Date.now() + 400
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
						mapClickLockUntilRef.current = Date.now() + 400
						return
					}
					const t =
						e.target instanceof Element ? e.target.closest('.polyana-accommodation-iw-close') : null
					if (!t) return
					e.preventDefault()
					e.stopPropagation()
					e.stopImmediatePropagation()
					if (activeInfoWindowRef.current) {
						activeInfoWindowRef.current.close()
						activeInfoWindowRef.current = null
					}
					setSelectedId(null)
					mapClickLockUntilRef.current = Date.now() + 400
				}
				mapRoot.addEventListener('click', onInfoWindowUiClick, true)
				detachInfoWindowCloseClick = () => mapRoot.removeEventListener('click', onInfoWindowUiClick, true)
			}

			map.fitBounds(bounds)
			win.google.maps.event.addListenerOnce(map, 'idle', () => {
				const zoom = map.getZoom()
				if (typeof zoom === 'number') map.setZoom(Math.max(13, zoom - 1))
				win.google.maps.event.trigger(map, 'resize')
				const pendingId = pendingFocusHotelIdRef.current
				if (pendingId) {
					const h = polyanaHotels.find(x => x.id === pendingId)
					if (h) {
						pendingFocusHotelIdRef.current = null
						setSelectedId(h.id)
						const m = markersByIdRef.current.get(h.id)
						const openIw = infoWindowsByIdRef.current.get(h.id)
						if (m && openIw) {
							map.panTo(h.position)
							const zz = map.getZoom()
							if (typeof zz === 'number' && zz < 15) map.setZoom(15)
							mapClickLockUntilRef.current = Date.now() + 400
							if (isNarrowMapUiRef.current) {
								if (activeInfoWindowRef.current) activeInfoWindowRef.current.close()
								activeInfoWindowRef.current = null
								setMapBottomSheetHotel(h)
							} else {
								if (activeInfoWindowRef.current) activeInfoWindowRef.current.close()
								openIw.open({ anchor: m, map })
								activeInfoWindowRef.current = openIw
							}
						}
					}
				}
			})
		}

		if (win.google?.maps) {
			initMap()
			return () => {
				clearMapControls()
				delete win.initPolyanaAccommodationMap
			}
		}

		win.initPolyanaAccommodationMap = initMap
		const existingScript = document.getElementById('google-maps-script')
		if (!existingScript) {
			const script = document.createElement('script')
			script.id = 'google-maps-script'
			script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=uk&region=UA&callback=initPolyanaAccommodationMap`
			script.async = true
			script.defer = true
			script.onerror = () => {
				setMapError('Не вдалося завантажити Google Maps.')
				setIsMapFallbackMode(true)
			}
			document.head.appendChild(script)
		} else {
			const retryId = window.setInterval(() => {
				if (win.google?.maps) {
					window.clearInterval(retryId)
					initMap()
				}
			}, 150)
			return () => {
				window.clearInterval(retryId)
				clearMapControls()
				delete win.initPolyanaAccommodationMap
			}
		}

		return () => {
			clearMapControls()
			delete win.initPolyanaAccommodationMap
		}
	}, [setMapBottomSheetHotel])

	useEffect(() => {
		const main = document.querySelector('body > main')
		if (isMapExpanded) {
			document.body.setAttribute('data-accommodation-map-expanded', 'true')
			main?.setAttribute('data-accommodation-map-expanded', 'true')
		} else {
			document.body.removeAttribute('data-accommodation-map-expanded')
			main?.removeAttribute('data-accommodation-map-expanded')
		}
		return () => {
			document.body.removeAttribute('data-accommodation-map-expanded')
			document.querySelector('body > main')?.removeAttribute('data-accommodation-map-expanded')
		}
	}, [isMapExpanded])

	useEffect(() => {
		if (!isMapExpanded) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsMapExpanded(false)
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [isMapExpanded])

	useEffect(() => {
		const btn = mapContainerRef.current?.querySelector<HTMLButtonElement>(
			'.accommodation-map-stack-controls__fullscreen'
		)
		if (!btn) return
		const expanded = isMapExpanded
		btn.setAttribute('aria-pressed', String(expanded))
		btn.setAttribute('data-expanded', String(expanded))
		const collapseLabel = 'Зменшити карту'
		const expandLabel = 'Розгорнути карту'
		btn.title = expanded ? collapseLabel : expandLabel
		btn.setAttribute('aria-label', expanded ? collapseLabel : expandLabel)
		btn.innerHTML = expanded ? ACCOMMODATION_MAP_COLLAPSE_ICON : ACCOMMODATION_MAP_EXPAND_ICON
	}, [isMapExpanded])

	useEffect(() => {
		const map = mapInstanceRef.current
		const win = window as Window & { google?: any }
		if (!map || !win.google?.maps?.event) return
		const id = window.requestAnimationFrame(() => {
			win.google.maps.event.trigger(map, 'resize')
		})
		return () => window.cancelAnimationFrame(id)
	}, [isMapExpanded])

	useEffect(() => {
		const onResize = () => {
			const map = mapInstanceRef.current
			const win = window as Window & { google?: any }
			if (map && win.google?.maps?.event) win.google.maps.event.trigger(map, 'resize')
		}
		window.addEventListener('resize', onResize)
		return () => window.removeEventListener('resize', onResize)
	}, [])

	return (
		<>
		<div
			className={
				isMapExpanded
					? 'flex min-h-0 w-full flex-col accommodation-map-expanded-shell'
					: 'mx-auto flex min-h-0 w-full max-w-7xl flex-col px-4 pb-6 pt-2 sm:px-6 md:px-5 lg:max-w-none lg:px-6 lg:pb-8 lg:pt-2 xl:px-8'
			}
		>
			{/*
			  Скрол сторінки як у Airbnb; карта lg:sticky. top = header + 1rem збігається з lg:pt-2 сторінки + lg:pt-2 mx-auto,
			  інакше при «прилипанні» блок стрибав би вгору (нібто зменшився відступ під хедером).
			*/}
			<div
				className={`flex flex-col gap-6 lg:flex-row lg:gap-8${
					isMapExpanded
						? ' min-h-0 h-full flex-1 items-stretch'
						: ' lg:items-start'
				}`}
			>
				<div
					className={`flex w-full min-w-0 flex-col gap-4 lg:max-w-xl lg:w-[min(100%,36rem)] lg:shrink-0 lg:pr-2${
						isMapExpanded ? ' hidden' : ''
					}`}
				>
					<p className='shrink-0 text-sm font-medium text-slate-600'>
						{polyanaHotels.length}{' '}
						{polyanaHotels.length === 1 ? 'заклад' : 'заклади'} на карті Поляни — оберіть готель у списку або
						маркер на карті.
					</p>

					<div className='flex flex-col gap-4'>
					{polyanaHotels.map(hotel => {
						const isSelected = selectedId === hotel.id
						return (
							<article
								key={hotel.id}
								id={`hotel-card-${hotel.id}`}
								onMouseEnter={() => setHoveredListHotelId(hotel.id)}
								onMouseLeave={() => setHoveredListHotelId(null)}
								className={`scroll-mt-24 relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 sm:grid sm:grid-cols-[13rem_1fr] ${
									isSelected
										? 'border-cyan-500/50 shadow-md ring-2 ring-cyan-400/30'
										: 'border-slate-200 hover:border-slate-300 hover:shadow-md'
								}`}
								aria-labelledby={`hotel-title-${hotel.id}`}
							>
								<Link
									href={`/accommodation/${hotel.id}`}
									target='_blank'
									rel='noopener noreferrer'
									className='relative isolate block aspect-[5/3] w-full min-w-0 shrink-0 overflow-hidden sm:aspect-auto sm:min-h-[15rem] sm:h-full'
									aria-label={`Відкрити опис «${hotel.name}» у новій вкладці`}
								>
									<Image
										src={hotel.image}
										alt=''
										fill
										className='object-cover object-center'
										sizes='(max-width: 640px) 100vw, 240px'
									/>
									<span className='pointer-events-none absolute bottom-2 right-2 rounded-lg bg-white/95 px-2 py-0.5 text-xs font-bold text-[#2D333D] shadow-sm'>
										{hotel.price}
									</span>
								</Link>
								<div className='relative flex min-h-0 min-w-0 flex-col justify-between gap-4 p-3 sm:p-5'>
									<Link
										href={`/accommodation/${hotel.id}`}
										target='_blank'
										rel='noopener noreferrer'
										className='min-h-0 block outline-none ring-offset-2 transition-opacity hover:opacity-[0.98] focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-cyan-500'
										aria-label={`Відкрити опис «${hotel.name}» у новій вкладці`}
									>
										<div className='space-y-2.5 sm:space-y-3'>
											<h2
												id={`hotel-title-${hotel.id}`}
												className='text-[1.05rem] font-bold leading-snug tracking-tight text-[#2D333D] sm:text-lg sm:leading-tight'
											>
												{hotel.name}
											</h2>
											<p className='flex items-start gap-1.5 text-[0.8125rem] leading-snug text-slate-500'>
												<FaMapMarkerAlt
													className='mt-0.5 size-3.5 shrink-0 text-[#53C4DA]'
													aria-hidden
												/>
												<span className='min-w-0'>{hotel.address}</span>
											</p>
											<p className='flex items-center gap-1.5 text-sm font-medium leading-none text-amber-800'>
												<FaStar className='size-3.5 shrink-0 text-amber-500' aria-hidden />
												<span>{hotel.rating}</span>
											</p>
											<p className='line-clamp-2 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]'>
												{hotel.description}
											</p>
											<p className='text-[0.8125rem] leading-snug text-slate-500'>{hotel.feature}</p>
										</div>
									</Link>
									<div className='flex w-full shrink-0 justify-end pt-1'>
										<a
											href={`tel:${hotel.phone}`}
											className='relative z-[1] inline-flex w-fit cursor-pointer rounded-full bg-[#F68F5D] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#e57d4a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F68F5D]'
										>
											Подзвонити
										</a>
									</div>
								</div>
							</article>
						)
					})}
					</div>
					<AccommodationListPaginationStub />
				</div>

				<aside
					ref={mapColumnRef}
					className={`accommodation-map-column relative z-0 flex w-full min-w-0 flex-col lg:sticky lg:top-[calc(var(--header-offset,68px)+1rem)] lg:z-0 lg:min-h-0 lg:flex-1 lg:self-start${
						isMapExpanded
							? ' max-w-none min-h-0 h-full flex-1 self-stretch lg:static lg:max-w-none lg:self-stretch'
							: ''
					}`}
					aria-label='Карта готелів'
				>
					<div
						className={`accommodation-map-frame flex w-full min-w-0 flex-col overflow-hidden bg-slate-100${
							isMapExpanded
								? ' h-full min-h-0 flex-1 rounded-2xl border border-slate-200 shadow-sm ring-1 ring-slate-900/5'
								: ' min-h-[320px] rounded-2xl border border-slate-200 shadow-sm ring-1 ring-slate-900/5 h-[min(85vh,760px)] lg:min-h-[560px] lg:h-[calc(100svh-var(--header-offset,68px)-2rem)] lg:max-h-[calc(100svh-var(--header-offset,68px)-2rem)]'
						}`}
					>
						{isMapFallbackMode ? (
							<iframe
								title='Карта готелів Поляни'
								src='https://maps.google.com/maps?hl=uk&q=%D0%93%D0%BE%D1%82%D0%B5%D0%BB%D1%8C+%D0%9A%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B0+%D0%9F%D0%BE%D0%BB%D1%8F%D0%BD%D0%B0&t=k&z=14&ie=UTF8&iwloc=B&output=embed'
								className={
									isMapExpanded
										? 'h-full min-h-0 w-full min-w-0 flex-1'
										: 'h-full min-h-[320px] w-full min-w-0 lg:min-h-0'
								}
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
							/>
						) : (
							<div
								ref={mapContainerRef}
								className={`polyana-google-map-root polyana-google-map-root--accommodation h-full w-full min-w-0 ${
									isMapExpanded ? 'min-h-0 flex-1' : 'min-h-[320px] lg:min-h-0'
								}`}
							/>
						)}
					</div>
					{mapError ? (
						<p className='pointer-events-none absolute bottom-3 left-1/2 z-[1] max-w-[90%] -translate-x-1/2 rounded-lg bg-white/95 px-3 py-1.5 text-center text-xs text-slate-600 shadow-sm'>
							{mapError}
						</p>
					) : null}
				</aside>
			</div>
		</div>
		{mapBottomSheetHotel ? (
			<AccommodationMapMobileBottomSheet
				hotel={mapBottomSheetHotel}
				onClose={() => {
					setMapBottomSheetHotel(null)
					setSelectedId(null)
				}}
			/>
		) : null}
		</>
	)
}
