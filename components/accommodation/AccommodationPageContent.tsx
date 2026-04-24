'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa'
import { createHotelPricePillMarker, formatHotelPriceForMapMarker } from '@/lib/google-map-price-marker'
import { polyanaHotels, type PolyanaHotel } from '@/lib/polyana-hotels'
import AccommodationListPaginationStub from '@/components/accommodation/AccommodationListPaginationStub'
import {
	ACCOMMODATION_MAP_COLLAPSE_ICON,
	ACCOMMODATION_MAP_EXPAND_ICON,
	attachPolyanaMapExpandAndZoomControls,
} from '@/lib/google-map-stack-controls'

function hotelInfoWindowHtml(hotel: PolyanaHotel): string {
	const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
		`${hotel.name}, ${hotel.address}`
	)}`
	const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
		`${hotel.name}, ${hotel.address}`
	)}`
	return `<div style="width:296px;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 12px 22px rgba(15,23,42,.2);line-height:1.35">
		<div style="position:relative;height:98px;overflow:hidden">
			<img src="${hotel.image}" alt="${hotel.name}" style="display:block;width:100%;height:100%;object-fit:cover" />
			<div style="position:absolute;right:8px;bottom:8px;background:rgba(255,255,255,.96);padding:6px 10px;border-radius:10px;font-size:16px;font-weight:700;color:#2d333d">${hotel.price}</div>
		</div>
		<div style="padding:10px 12px 12px">
			<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
				<div style="font-size:16px;font-weight:700;color:#2d333d;line-height:1.2">${hotel.name}</div>
				<div style="display:flex;gap:8px;flex-shrink:0">
					<a href="${routeLink}" target="_blank" rel="noopener noreferrer" title="Маршрути" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#bde6f2;color:#0b5f74;font-size:13px;text-decoration:none;cursor:pointer">
						<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M12 2 22 12 12 22 2 12Z" fill="#0b5f74" /><path d="M9 12h6M12 9l3 3-3 3" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
					</a>
					<a href="${saveLink}" target="_blank" rel="noopener noreferrer" title="Зберегти" style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#bde6f2;color:#0b5f74;font-size:13px;text-decoration:none;cursor:pointer">
						<svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true"><path d="M7 4h10a1 1 0 0 1 1 1v14l-6-2.8L6 19V5a1 1 0 0 1 1-1Z" stroke="#0b5f74" stroke-width="1.8" stroke-linejoin="round" /></svg>
					</a>
				</div>
			</div>
			<div style="margin-top:6px;font-size:12px;color:#475569"><span style="color:#f59e0b">★★★★☆</span> ${hotel.rating}</div>
			<div style="margin-top:4px;font-size:12px;color:#64748b">📶 ${hotel.feature}</div>
			<a href="tel:${hotel.phone}" style="margin-top:10px;display:inline-flex;width:100%;align-items:center;justify-content:center;border-radius:9999px;background:#bde6f2;color:#0b5f74;text-decoration:none;font-size:13px;font-weight:700;padding:8px 10px">Подзвонити</a>
		</div>
	</div>`
}

export default function AccommodationPageContent() {
	const mapContainerRef = useRef<HTMLDivElement | null>(null)
	const mapInstanceRef = useRef<any>(null)
	const activeInfoWindowRef = useRef<any>(null)
	const markersByIdRef = useRef<Map<string, any>>(new Map())
	const infoWindowsByIdRef = useRef<Map<string, any>>(new Map())
	const [mapError, setMapError] = useState<string | null>(null)
	const [isMapFallbackMode, setIsMapFallbackMode] = useState(false)
	const [isMapExpanded, setIsMapExpanded] = useState(false)
	const [selectedId, setSelectedId] = useState<string | null>(polyanaHotels[0]?.id ?? null)

	const focusHotel = (hotel: PolyanaHotel) => {
		setSelectedId(hotel.id)
		const map = mapInstanceRef.current
		const marker = markersByIdRef.current.get(hotel.id)
		const iw = infoWindowsByIdRef.current.get(hotel.id)
		if (!map || !marker || !iw) return
		map.panTo(hotel.position)
		const z = map.getZoom()
		if (typeof z === 'number' && z < 15) map.setZoom(15)
		if (activeInfoWindowRef.current) activeInfoWindowRef.current.close()
		iw.open({ anchor: marker, map })
		activeInfoWindowRef.current = iw
	}

	useEffect(() => {
		let detachMapControls: (() => void) | null = null
		const clearMapControls = () => {
			detachMapControls?.()
			detachMapControls = null
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
				const infoWindow = new win.google.maps.InfoWindow({ content: hotelInfoWindowHtml(hotel) })
				markersByIdRef.current.set(hotel.id, marker)
				infoWindowsByIdRef.current.set(hotel.id, infoWindow)
				marker.addListener('click', () => {
					setSelectedId(hotel.id)
					if (activeInfoWindowRef.current) activeInfoWindowRef.current.close()
					infoWindow.open({ anchor: marker, map })
					activeInfoWindowRef.current = infoWindow
				})
			})

			map.fitBounds(bounds)
			win.google.maps.event.addListenerOnce(map, 'idle', () => {
				const zoom = map.getZoom()
				if (typeof zoom === 'number') map.setZoom(Math.max(13, zoom - 1))
				win.google.maps.event.trigger(map, 'resize')
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
	}, [])

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
						{polyanaHotels.length === 1 ? 'заклад' : 'заклади'} на карті Поляни — оберіть готель зліва або
						маркер на карті.
					</p>

					<div className='flex flex-col gap-4'>
					{polyanaHotels.map(hotel => {
						const isSelected = selectedId === hotel.id
						return (
							<article
								key={hotel.id}
								id={`hotel-card-${hotel.id}`}
								className={`scroll-mt-24 grid cursor-pointer grid-cols-[11rem_1fr] overflow-hidden rounded-2xl border bg-white shadow-sm outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 sm:grid-cols-[13rem_1fr] ${
									isSelected
										? 'border-cyan-500/50 shadow-md ring-2 ring-cyan-400/30'
										: 'border-slate-200 hover:border-slate-300 hover:shadow-md'
								}`}
								role='button'
								tabIndex={0}
								aria-pressed={isSelected}
								aria-labelledby={`hotel-title-${hotel.id}`}
								onClick={() => focusHotel(hotel)}
								onKeyDown={e => {
									if (e.key === 'Enter' || e.key === ' ') {
										e.preventDefault()
										focusHotel(hotel)
									}
								}}
							>
								<div className='relative h-full min-h-52 w-full min-w-0 overflow-hidden sm:min-h-60'>
									<Image
										src={hotel.image}
										alt={hotel.name}
										fill
										className='object-cover object-center'
										sizes='(max-width:640px) 48vw, 240px'
									/>
									<span className='pointer-events-none absolute bottom-2 right-2 rounded-lg bg-white/95 px-2 py-0.5 text-xs font-bold text-[#2D333D] shadow-sm'>
										{hotel.price}
									</span>
								</div>
								<div className='flex min-h-0 min-w-0 flex-col justify-between gap-4 p-3 sm:p-5'>
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
									<div className='flex w-full shrink-0 justify-end pt-1'>
										<a
											href={`tel:${hotel.phone}`}
											onClick={e => e.stopPropagation()}
											onKeyDown={e => e.stopPropagation()}
											className='inline-flex w-fit cursor-pointer rounded-full bg-[#F68F5D] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#e57d4a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F68F5D]'
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
	)
}
