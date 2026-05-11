'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { MapLegendList, MapLegendTitle } from '@/components/home/HomeMapLegend'
import { hotelMapPinIconDataUrl } from '@/lib/google-map-hotel-pin'
import {
	ACCOMMODATION_MAP_COLLAPSE_ICON,
	ACCOMMODATION_MAP_EXPAND_ICON,
	attachPolyanaMapExpandAndZoomControls,
} from '@/lib/google-map-stack-controls'
import {
	applyHomeMapMarkersForLayers,
	effectiveHomeMapLayerVisibility,
	initialHomeMapLayers,
	type HomeMapLayerId,
} from '@/lib/home-map-layers'
import {
	diningMapMarkers,
	pharmacyMapMarkers,
	shopsMapMarkers,
	spaMapMarkers,
	touristCityMapMarkers,
} from '@/lib/home-map-markers'
import {
	diningMapPinIconDataUrl,
	pharmacyMapPinIconDataUrl,
	shoppingMapPinIconDataUrl,
	spaMapPinIconDataUrl,
	touristCityMapPinIconDataUrl,
} from '@/lib/home-map-pin-icons'
import {
	hotelInfoWindowHtml,
	homeMapMarkerToUnifiedCard,
	unifiedMapCardInfoWindowHtml,
} from '@/lib/map-info-window-html'
import { attachPolyanaAccommodationIwDomHandlers } from '@/lib/map-info-window-ui'
import { polyanaHotels as hotelsMapMarkers } from '@/lib/polyana-hotels'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function HomePageMapSection() {
	const [mapError, setMapError] = useState<string | null>(null)
	const [isMapFallbackMode, setIsMapFallbackMode] = useState(false)
	const [isMapLegendExpanded, setIsMapLegendExpanded] = useState(true)
	const [isHomeMapExpanded, setIsHomeMapExpanded] = useState(false)
	const searchParams = useSearchParams()
	const [mapLayerEnabled, setMapLayerEnabled] = useState<Record<HomeMapLayerId, boolean>>(
		() => ({ ...initialHomeMapLayers })
	)
	const mapLayerEnabledRef = useRef(mapLayerEnabled)
	const homeMapMarkersByLayerRef = useRef<Partial<Record<HomeMapLayerId, any[]>>>({})
	const mapContainerRef = useRef<HTMLDivElement | null>(null)
	const mapInstanceRef = useRef<unknown>(null)
	const autoOpenPlaceRef = useRef<string | null>(null)
	const didAutoOpenPlaceRef = useRef(false)
	const markerIndexRef = useRef<Map<string, { marker: any; infoWindow: any; layerId: HomeMapLayerId }> | null>(null)
	const activeInfoWindowRef = useRef<any>(null)

	useEffect(() => {
		const onReset = () => {
			autoOpenPlaceRef.current = null
			didAutoOpenPlaceRef.current = false
			setMapLayerEnabled({ ...initialHomeMapLayers })
			if (activeInfoWindowRef.current) {
				activeInfoWindowRef.current.close()
				activeInfoWindowRef.current = null
			}
		}
		window.addEventListener('polyana:home-map-reset', onReset as EventListener)
		return () => window.removeEventListener('polyana:home-map-reset', onReset as EventListener)
	}, [])

	const normalizeKey = (value: string) =>
		value
			.trim()
			.toLowerCase()
			.replace(/[«»"'’`ʼ]/g, '')
			.replace(/[^a-zа-яіїєґ0-9\s-]/giu, ' ')
			.replace(/\s+/g, ' ')
			.trim()

	const resolvePlaceHit = useCallback((raw: string) => {
		const index = markerIndexRef.current
		if (!index) return null
		const q = normalizeKey(raw)
		if (!q) return null
		const direct = index.get(q)
		if (direct) return direct

		const entries = Array.from(index.entries())
		let best: { hit: (typeof entries)[number][1]; score: number } | null = null
		for (const [k, hit] of entries) {
			let score = 0
			if (k === q) score += 100
			if (k.includes(q)) score += 20
			if (q.includes(k)) score += 10
			for (const w of q.split(' ')) {
				if (w.length >= 3 && k.includes(w)) score += 2
			}
			if (!best || score > best.score) best = { hit, score }
		}
		return best && best.score > 0 ? best.hit : null
	}, [])

	const tryAutoOpenPlace = useCallback(() => {
		const map = mapInstanceRef.current as any
		const place = autoOpenPlaceRef.current
		if (!map || !place || didAutoOpenPlaceRef.current) return
		const hit = resolvePlaceHit(place)
		if (!hit) return

		didAutoOpenPlaceRef.current = true
		setMapLayerEnabled(prev => ({ ...prev, [hit.layerId]: true }))

		try {
			hit.marker.setMap(map)
			map.panTo(hit.marker.getPosition())
			map.setZoom(15)
		} catch {
			// ignore
		}

		if (activeInfoWindowRef.current) {
			activeInfoWindowRef.current.close()
		}
		hit.infoWindow.open({ anchor: hit.marker, map })
		activeInfoWindowRef.current = hit.infoWindow
	}, [resolvePlaceHit])

	useEffect(() => {
		autoOpenPlaceRef.current = searchParams.get('mapPlace')?.trim() || null
		didAutoOpenPlaceRef.current = false
		const requestedLayer = searchParams.get('mapLayer')
		if (requestedLayer === 'dining') {
			setMapLayerEnabled({
				hotels: false,
				dining: true,
				shops: false,
				pharmacy: false,
				spa: false,
				tourist: false,
			})
		}
		window.setTimeout(() => tryAutoOpenPlace(), 0)
	}, [searchParams, tryAutoOpenPlace])

	useEffect(() => {
		mapLayerEnabledRef.current = mapLayerEnabled
	}, [mapLayerEnabled])

	const toggleHomeMapLayer = useCallback((id: HomeMapLayerId) => {
		setMapLayerEnabled(prev => ({ ...prev, [id]: !prev[id] }))
	}, [])

	useEffect(() => {
		const map = mapInstanceRef.current as any
		if (!map) return
		const buckets = homeMapMarkersByLayerRef.current
		if (!buckets.hotels?.length) return
		applyHomeMapMarkersForLayers(map, buckets, effectiveHomeMapLayerVisibility(mapLayerEnabled))
	}, [mapLayerEnabled])

	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

		if (!apiKey) {
			setIsMapFallbackMode(true)
			setMapError('API ключ не знайдено, показуємо fallback-карту.')
			return
		}

		if (!mapContainerRef.current) {
			return
		}

		const win = window as Window & {
			google?: any
			initPolyanaHotelsMap?: () => void
		}

		let detachCustomControls: (() => void) | null = null
		let detachIwUiCapture: (() => void) | null = null
		const clearCustomControls = () => {
			detachCustomControls?.()
			detachCustomControls = null
		}

		const teardownMap = () => {
			clearCustomControls()
			detachIwUiCapture?.()
			detachIwUiCapture = null
			mapInstanceRef.current = null
			delete win.initPolyanaHotelsMap
		}

		const initMap = () => {
			if (!mapContainerRef.current || !win.google?.maps) {
				return
			}

			const map = new win.google.maps.Map(mapContainerRef.current, {
				center: hotelsMapMarkers[0].position,
				zoom: 14,
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
			clearCustomControls()
			detachCustomControls = attachPolyanaMapExpandAndZoomControls(map, win.google.maps, {
				onToggleExpand: () => setIsHomeMapExpanded(v => !v),
			})

			let activeInfoWindow: any = null
			const mapRootEl = mapContainerRef.current
			if (mapRootEl) {
				detachIwUiCapture?.()
				detachIwUiCapture = attachPolyanaAccommodationIwDomHandlers(mapRootEl, () => {
					const refIw = activeInfoWindowRef.current
					if (refIw) {
						refIw.close()
						activeInfoWindowRef.current = null
					}
					if (activeInfoWindow) {
						activeInfoWindow.close()
						activeInfoWindow = null
					}
				})
			}

			const bounds = new win.google.maps.LatLngBounds()
			const layerMarkers: Record<HomeMapLayerId, any[]> = {
				hotels: [],
				dining: [],
				shops: [],
				pharmacy: [],
				spa: [],
				tourist: [],
			}
			const markerIndex = new Map<string, { marker: any; infoWindow: any; layerId: HomeMapLayerId }>()
			markerIndexRef.current = markerIndex
			const normalizeKey = (value: string) =>
				value
					.trim()
					.toLowerCase()
					.replace(/[«»"'’`ʼ]/g, '')
					.replace(/[^a-zа-яіїєґ0-9\s-]/giu, ' ')
					.replace(/\s+/g, ' ')
					.trim()

			const resolvePlaceHit = (raw: string) => {
				const q = normalizeKey(raw)
				if (!q) return null
				const direct = markerIndex.get(q)
				if (direct) return direct

				// Fuzzy: try substring match (handles "катерини" vs "катерина", without quotes, etc.)
				const entries = Array.from(markerIndex.entries())
				let best: { hit: (typeof entries)[number][1]; score: number } | null = null
				for (const [k, hit] of entries) {
					let score = 0
					if (k === q) score += 100
					if (k.includes(q)) score += 20
					if (q.includes(k)) score += 10
					const qWords = q.split(' ')
					for (const w of qWords) {
						if (w.length >= 3 && k.includes(w)) score += 2
					}
					if (!best || score > best.score) best = { hit, score }
				}
				return best && best.score > 0 ? best.hit : null
			}

			const diningIcon = {
				url: diningMapPinIconDataUrl,
				scaledSize: new win.google.maps.Size(44, 52),
				anchor: new win.google.maps.Point(22, 52),
			}

			const shoppingIcon = {
				url: shoppingMapPinIconDataUrl,
				scaledSize: new win.google.maps.Size(44, 52),
				anchor: new win.google.maps.Point(22, 52),
			}

			const pharmacyIcon = {
				url: pharmacyMapPinIconDataUrl,
				scaledSize: new win.google.maps.Size(44, 52),
				anchor: new win.google.maps.Point(22, 52),
			}

			const hotelIcon = {
				url: hotelMapPinIconDataUrl,
				scaledSize: new win.google.maps.Size(44, 52),
				anchor: new win.google.maps.Point(22, 52),
			}

			const spaIcon = {
				url: spaMapPinIconDataUrl,
				scaledSize: new win.google.maps.Size(44, 52),
				anchor: new win.google.maps.Point(22, 52),
			}

			const touristCityIcon = {
				url: touristCityMapPinIconDataUrl,
				scaledSize: new win.google.maps.Size(44, 52),
				anchor: new win.google.maps.Point(22, 52),
			}

			hotelsMapMarkers.forEach(hotel => {
				const marker = new win.google.maps.Marker({
					position: hotel.position,
					map,
					title: hotel.name,
					icon: hotelIcon,
				})
				layerMarkers.hotels.push(marker)

				bounds.extend(hotel.position)

				const infoWindow = new win.google.maps.InfoWindow({
					content: hotelInfoWindowHtml(hotel),
					headerDisabled: true,
				})

				marker.addListener('click', () => {
					if (activeInfoWindow) {
						activeInfoWindow.close()
					}
					infoWindow.open({ anchor: marker, map })
					activeInfoWindow = infoWindow
				})
			})

			diningMapMarkers.forEach(place => {
				const marker = new win.google.maps.Marker({
					position: place.position,
					map,
					title: place.name,
					icon: diningIcon,
				})
				layerMarkers.dining.push(marker)

				bounds.extend(place.position)

				const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
					`${place.name}, ${place.address}`
				)}`
				const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
					`${place.name}, ${place.address}`
				)}`

				const infoWindow = new win.google.maps.InfoWindow({
					content: unifiedMapCardInfoWindowHtml(
						homeMapMarkerToUnifiedCard({
							name: place.name,
							address: place.address,
							category: place.category,
							image: place.image,
							featurePill: 'Їжа',
							routeLink,
							saveLink,
						})
					),
					headerDisabled: true,
				})

				marker.addListener('click', () => {
					if (activeInfoWindow) {
						activeInfoWindow.close()
					}
					infoWindow.open({ anchor: marker, map })
					activeInfoWindow = infoWindow
					activeInfoWindowRef.current = infoWindow
				})

				markerIndex.set(normalizeKey(place.name), { marker, infoWindow, layerId: 'dining' })
			})

			shopsMapMarkers.forEach(store => {
				const marker = new win.google.maps.Marker({
					position: store.position,
					map,
					title: store.name,
					icon: shoppingIcon,
				})
				layerMarkers.shops.push(marker)

				bounds.extend(store.position)

				const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
					`${store.name}, ${store.address}`
				)}`
				const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
					`${store.name}, ${store.address}`
				)}`

				const infoWindow = new win.google.maps.InfoWindow({
					content: unifiedMapCardInfoWindowHtml(
						homeMapMarkerToUnifiedCard({
							name: store.name,
							address: store.address,
							category: store.category,
							image: store.image,
							featurePill: 'Магазин',
							routeLink,
							saveLink,
						})
					),
					headerDisabled: true,
				})

				marker.addListener('click', () => {
					if (activeInfoWindow) {
						activeInfoWindow.close()
					}
					infoWindow.open({ anchor: marker, map })
					activeInfoWindow = infoWindow
				})
			})

			pharmacyMapMarkers.forEach(ph => {
				const marker = new win.google.maps.Marker({
					position: ph.position,
					map,
					title: ph.name,
					icon: pharmacyIcon,
				})
				layerMarkers.pharmacy.push(marker)

				bounds.extend(ph.position)

				const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
					`${ph.name}, ${ph.address}`
				)}`
				const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
					`${ph.name}, ${ph.address}`
				)}`

				const infoWindow = new win.google.maps.InfoWindow({
					content: unifiedMapCardInfoWindowHtml(
						homeMapMarkerToUnifiedCard({
							name: ph.name,
							address: ph.address,
							category: ph.category,
							image: ph.image,
							featurePill: ph.badge,
							routeLink,
							saveLink,
						})
					),
					headerDisabled: true,
				})

				marker.addListener('click', () => {
					if (activeInfoWindow) {
						activeInfoWindow.close()
					}
					infoWindow.open({ anchor: marker, map })
					activeInfoWindow = infoWindow
				})
			})

			spaMapMarkers.forEach(spot => {
				const marker = new win.google.maps.Marker({
					position: spot.position,
					map,
					title: spot.name,
					icon: spaIcon,
				})
				layerMarkers.spa.push(marker)

				bounds.extend(spot.position)

				const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
					`${spot.name}, ${spot.address}`
				)}`
				const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
					`${spot.name}, ${spot.address}`
				)}`

				const infoWindow = new win.google.maps.InfoWindow({
					content: unifiedMapCardInfoWindowHtml(
						homeMapMarkerToUnifiedCard({
							name: spot.name,
							address: spot.address,
							category: spot.category,
							image: spot.image,
							featurePill: 'SPA / чани',
							routeLink,
							saveLink,
						})
					),
					headerDisabled: true,
				})

				marker.addListener('click', () => {
					if (activeInfoWindow) {
						activeInfoWindow.close()
					}
					infoWindow.open({ anchor: marker, map })
					activeInfoWindow = infoWindow
				})
			})

			touristCityMapMarkers.forEach(city => {
				const marker = new win.google.maps.Marker({
					position: city.position,
					map,
					title: city.name,
					icon: touristCityIcon,
				})
				layerMarkers.tourist.push(marker)

				bounds.extend(city.position)

				const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
					`${city.name}, ${city.address}`
				)}`
				const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
					`${city.name}, ${city.address}`
				)}`

				const infoWindow = new win.google.maps.InfoWindow({
					content: unifiedMapCardInfoWindowHtml(
						homeMapMarkerToUnifiedCard({
							name: city.name,
							address: city.address,
							category: city.category,
							image: city.image,
							featurePill: 'Огляд',
							routeLink,
							saveLink,
						})
					),
					headerDisabled: true,
				})

				marker.addListener('click', () => {
					if (activeInfoWindow) {
						activeInfoWindow.close()
					}
					infoWindow.open({ anchor: marker, map })
					activeInfoWindow = infoWindow
					activeInfoWindowRef.current = infoWindow
				})

				markerIndex.set(normalizeKey(city.name), { marker, infoWindow, layerId: 'tourist' })
			})

			homeMapMarkersByLayerRef.current = layerMarkers
			applyHomeMapMarkersForLayers(
				map,
				layerMarkers,
				effectiveHomeMapLayerVisibility(mapLayerEnabledRef.current)
			)

			map.fitBounds(bounds)
			win.google.maps.event.addListenerOnce(map, 'idle', () => {
				const zoom = map.getZoom()
				if (typeof zoom === 'number') {
					map.setZoom(Math.max(9, zoom - 1))
				}
			})

			const placeToOpen = autoOpenPlaceRef.current
			if (!didAutoOpenPlaceRef.current && placeToOpen) {
				const hit = resolvePlaceHit(placeToOpen)
				if (hit) {
					didAutoOpenPlaceRef.current = true
					setMapLayerEnabled(prev => ({ ...prev, [hit.layerId]: true }))
					try {
						// Ensure marker becomes visible immediately even before state effect runs.
						hit.marker.setMap(map)
						map.panTo(hit.marker.getPosition())
						map.setZoom(15)
					} catch {
						// ignore
					}
					if (activeInfoWindow) {
						activeInfoWindow.close()
					}
					hit.infoWindow.open({ anchor: hit.marker, map })
					activeInfoWindow = hit.infoWindow
					activeInfoWindowRef.current = hit.infoWindow
				}
			}
		}

		if (win.google?.maps) {
			initMap()
			return teardownMap
		}

		win.initPolyanaHotelsMap = initMap

		const existingScript = document.getElementById('google-maps-script')
		if (!existingScript) {
			const script = document.createElement('script')
			script.id = 'google-maps-script'
			script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=uk&region=UA&callback=initPolyanaHotelsMap`
			script.async = true
			script.defer = true
			script.onerror = () => {
				setMapError('Не вдалося завантажити Google Maps API. Показуємо fallback-карту.')
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

	useEffect(() => {
		const main = document.querySelector('body > main')
		if (isHomeMapExpanded) {
			document.body.setAttribute('data-home-map-expanded', 'true')
			main?.setAttribute('data-home-map-expanded', 'true')
		} else {
			document.body.removeAttribute('data-home-map-expanded')
			main?.removeAttribute('data-home-map-expanded')
		}
		return () => {
			document.body.removeAttribute('data-home-map-expanded')
			document.querySelector('body > main')?.removeAttribute('data-home-map-expanded')
		}
	}, [isHomeMapExpanded])

	useEffect(() => {
		if (!isHomeMapExpanded) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsHomeMapExpanded(false)
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [isHomeMapExpanded])

	useEffect(() => {
		const btn = mapContainerRef.current?.querySelector<HTMLButtonElement>(
			'.accommodation-map-stack-controls__fullscreen'
		)
		if (!btn) return
		const expanded = isHomeMapExpanded
		btn.setAttribute('aria-pressed', String(expanded))
		btn.setAttribute('data-expanded', String(expanded))
		const collapseLabel = 'Зменшити карту'
		const expandLabel = 'Розгорнути карту'
		btn.title = expanded ? collapseLabel : expandLabel
		btn.setAttribute('aria-label', expanded ? collapseLabel : expandLabel)
		btn.innerHTML = expanded ? ACCOMMODATION_MAP_COLLAPSE_ICON : ACCOMMODATION_MAP_EXPAND_ICON
	}, [isHomeMapExpanded])

	useEffect(() => {
		const map = mapInstanceRef.current
		const win = window as Window & { google?: any }
		if (!map || !win.google?.maps?.event) return
		const id = window.requestAnimationFrame(() => {
			win.google.maps.event.trigger(map, 'resize')
		})
		return () => window.cancelAnimationFrame(id)
	}, [isHomeMapExpanded])

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
		<section
			id='polyana-map'
			className={
				isHomeMapExpanded
					? 'fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-hidden bg-[#F5F6F7]'
					: 'bg-[#F5F6F7] px-4 pb-4 pt-4 sm:px-16 lg:px-24'
			}
			style={
				isHomeMapExpanded
					? { top: 'var(--header-offset, 68px)' }
					: { scrollMarginTop: 'calc(var(--header-offset, 68px) + 12px)' }
			}
		>
			<div
				className={
					isHomeMapExpanded
						? 'accommodation-map-expanded-shell flex min-h-0 flex-1 flex-col'
						: 'mx-auto w-full max-w-7xl'
				}
			>
				<h2
					className={
						isHomeMapExpanded
							? 'sr-only'
							: 'mb-4 text-2xl font-bold text-[#2D333D]'
					}
				>
					Карта готелів та магазинів Поляни
				</h2>
				<div
					className={`relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5${
						isHomeMapExpanded ? ' flex min-h-0 flex-1 flex-col' : ''
					}`}
				>
					<div
						className={
							isHomeMapExpanded
								? 'accommodation-map-frame relative flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-slate-100'
								: 'accommodation-map-frame relative h-[420px] w-full shrink-0 overflow-hidden bg-slate-100'
						}
					>
						{isMapFallbackMode ? (
							<iframe
								title='Fallback карта готелів Поляни'
								src='https://maps.google.com/maps?hl=uk&q=%D0%93%D0%BE%D1%82%D0%B5%D0%BB%D1%8C+%D0%9A%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B0+%D0%9F%D0%BE%D0%BB%D1%8F%D0%BD%D0%B0&t=k&z=14&ie=UTF8&iwloc=B&output=embed'
								className={`w-full min-w-0 ${
									isHomeMapExpanded ? 'min-h-0 flex-1' : 'h-[420px]'
								}`}
								loading='lazy'
								referrerPolicy='no-referrer-when-downgrade'
							/>
						) : (
							<div
								ref={mapContainerRef}
								className={`polyana-google-map-root polyana-google-map-root--home-map w-full min-w-0 ${
									isHomeMapExpanded ? 'min-h-0 flex-1' : 'h-[420px]'
								}`}
							/>
						)}
						{mapError ? (
							<div className='pointer-events-none absolute bottom-10 left-1/2 z-[2] -translate-x-1/2 rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm sm:bottom-14'>
								{mapError}
							</div>
						) : null}
						<div
							className='absolute left-2 top-1/2 z-[1] hidden -translate-y-1/2 sm:left-3 sm:flex sm:items-stretch'
							role='presentation'
						>
							<button
								type='button'
								onClick={() => setIsMapLegendExpanded(prev => !prev)}
								className={`pointer-events-auto flex w-9 shrink-0 flex-col items-center justify-center border border-slate-900/15 bg-white/22 text-slate-700 shadow-md ring-1 ring-slate-900/10 backdrop-blur-md transition-colors hover:bg-white/30 ${
									isMapLegendExpanded
										? 'rounded-l-lg rounded-r-none border-r-0'
										: 'min-h-[104px] rounded-lg'
								}`}
								aria-expanded={isMapLegendExpanded}
								aria-controls='polyana-map-legend-desktop-panel'
								aria-label={
									isMapLegendExpanded
										? 'Згорнути умовні позначення вліво'
										: 'Показати умовні позначення'
								}
							>
								{isMapLegendExpanded ? (
									<FaChevronLeft className='size-3.5 shrink-0' aria-hidden />
								) : (
									<FaChevronRight className='size-3.5 shrink-0' aria-hidden />
								)}
							</button>
							<div
								id='polyana-map-legend-desktop-panel'
								role='region'
								aria-label='Умовні позначення на карті'
								aria-hidden={!isMapLegendExpanded}
								className={`overflow-hidden transition-[max-width,opacity] duration-300 ease-out ${
									isMapLegendExpanded ? 'max-w-[17rem] opacity-100' : 'pointer-events-none max-w-0 opacity-0'
								}`}
							>
								<div className='pointer-events-auto flex w-60 max-w-[17rem] flex-col rounded-r-lg border border-l-0 border-slate-900/15 bg-white/22 px-2.5 py-2 shadow-md ring-1 ring-slate-900/10 backdrop-blur-md sm:px-3 sm:py-2.5'>
									<MapLegendTitle />
									<MapLegendList
										layerEnabled={mapLayerEnabled}
										onLayerToggle={toggleHomeMapLayer}
									/>
								</div>
							</div>
						</div>
					</div>
					<section
						className={`z-0 border-t border-slate-900/10 bg-white/22 px-3 py-2.5 shadow-sm ring-1 ring-slate-900/10 backdrop-blur-md sm:hidden ${
							isHomeMapExpanded ? 'hidden' : ''
						}`}
						aria-labelledby='polyana-map-legend-title'
					>
						<MapLegendTitle id='polyana-map-legend-title' />
						<MapLegendList
							layerEnabled={mapLayerEnabled}
							onLayerToggle={toggleHomeMapLayer}
						/>
					</section>
				</div>
			</div>
		</section>
	)
}
