'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { FaCompress, FaExpand } from 'react-icons/fa'
import { attachHotelDetailMapHomeMarkers } from '@/lib/hotel-detail-map-home-markers'
import type { PolyanaHotel } from '@/lib/polyana-hotels'

const MAP_ZOOM_MIN = 1
const MAP_ZOOM_MAX = 21

const MAP_FRAME =
	'h-[clamp(260px,36vw,400px)] w-full sm:h-[clamp(300px,38vw,400px)] md:h-[380px] lg:h-[400px]'

/**
 * Шар «Супутник»: ті самі мітки що на головній (без інших готелів), плюс маркер поточного об’єкта.
 * Стек керування як у QuadroRideRouteMap: повний екран + / −.
 */
export default function HotelDetailMap({ hotel }: { hotel: PolyanaHotel }) {
	const shellRef = useRef<HTMLDivElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const mapRef = useRef<any>(null)
	const mapInitialized = useRef(false)
	const [isMapFullscreen, setIsMapFullscreen] = useState(false)

	const adjustZoom = useCallback((delta: number) => {
		const map = mapRef.current
		if (!map?.getZoom || !map?.setZoom) return
		const z = map.getZoom()
		if (typeof z !== 'number') return
		map.setZoom(Math.min(MAP_ZOOM_MAX, Math.max(MAP_ZOOM_MIN, z + delta)))
	}, [])

	const toggleMapFullscreen = useCallback(async () => {
		const el = shellRef.current
		if (!el) return
		try {
			if (!document.fullscreenElement) {
				await el.requestFullscreen()
			} else {
				await document.exitFullscreen()
			}
		} catch {
			/* ignore */
		}
	}, [])

	useEffect(() => {
		const onFsChange = () => {
			setIsMapFullscreen(!!document.fullscreenElement && document.fullscreenElement === shellRef.current)
			const map = mapRef.current
			const evt = (window as Window & { google?: { maps?: { event: { trigger: (m: unknown, e: string) => void } } } })
				.google?.maps?.event
			if (map && evt) {
				requestAnimationFrame(() => {
					requestAnimationFrame(() => evt.trigger(map, 'resize'))
				})
			}
		}
		document.addEventListener('fullscreenchange', onFsChange)
		return () => document.removeEventListener('fullscreenchange', onFsChange)
	}, [])

	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
		const root = containerRef.current
		const shell = shellRef.current
		if (!root || !apiKey) return

		let detachHomeMarkers: (() => void) | null = null

		root.innerHTML = ''
		mapInitialized.current = false
		mapRef.current = null

		const win = window as Window & { initPolyanaHotelDetailMap?: () => void }

		const initMap = () => {
			if (!root.isConnected || mapInitialized.current) return
			const g = (window as unknown as { google?: { maps: any } }).google
			if (!g?.maps) return
			const maps = g.maps
			mapInitialized.current = true

			const center = new maps.LatLng(hotel.position.lat, hotel.position.lng)

			const map = new maps.Map(root, {
				center,
				zoom: 18,
				mapTypeId: maps.MapTypeId?.SATELLITE ?? 'satellite',
				disableDefaultUI: true,
				mapTypeControl: false,
				fullscreenControl: false,
				zoomControl: false,
				streetViewControl: false,
				scaleControl: false,
				gestureHandling: 'greedy',
				clickableIcons: false,
				keyboardShortcuts: false,
				rotateControl: false,
				styles: [
					{ featureType: 'poi', stylers: [{ visibility: 'off' }] },
					{ featureType: 'transit', stylers: [{ visibility: 'off' }] },
					{ featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
					{ featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
					{ elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
				],
			})

			mapRef.current = map

			detachHomeMarkers = attachHotelDetailMapHomeMarkers({
				map,
				maps,
				hotel,
				mapRootEl: shell ?? root,
			})

			maps.event.addListenerOnce(map, 'idle', () => {
				maps.event.trigger(map, 'resize')
			})
		}

		const gNow = (window as unknown as { google?: { maps: unknown } }).google
		if (gNow?.maps) {
			initMap()
			return () => {
				detachHomeMarkers?.()
				mapRef.current = null
				mapInitialized.current = false
			}
		}

		win.initPolyanaHotelDetailMap = initMap
		const mapsScriptAlready =
			typeof document !== 'undefined' &&
			!!document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')

		let pollId: number | undefined
		let maxWaitId: number | undefined

		if (!mapsScriptAlready) {
			const script = document.createElement('script')
			script.id = 'google-maps-script'
			script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=uk&region=UA&callback=initPolyanaHotelDetailMap`
			script.async = true
			script.defer = true
			script.onerror = () => {
				mapInitialized.current = false
			}
			document.head.appendChild(script)
		} else {
			pollId = window.setInterval(() => {
				if ((window as unknown as { google?: { maps: unknown } }).google?.maps) {
					if (pollId !== undefined) window.clearInterval(pollId)
					if (maxWaitId !== undefined) window.clearTimeout(maxWaitId)
					initMap()
				}
			}, 120)
			maxWaitId = window.setTimeout(() => {
				if (pollId !== undefined) window.clearInterval(pollId)
			}, 30_000)
		}

		return () => {
			if (pollId !== undefined) window.clearInterval(pollId)
			if (maxWaitId !== undefined) window.clearTimeout(maxWaitId)
			detachHomeMarkers?.()
			mapRef.current = null
			mapInitialized.current = false
			delete win.initPolyanaHotelDetailMap
		}
	}, [hotel.id, hotel.position.lat, hotel.position.lng])

	const apiKey =
		typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() : ''

	if (!apiKey) {
		const q = encodeURIComponent(`${hotel.position.lat},${hotel.position.lng}`)
		return (
			<div
				className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm ${MAP_FRAME}`}
			>
				<iframe
					title={`Карта: ${hotel.name}`}
					src={`https://www.google.com/maps?q=${q}&z=17&output=embed&hl=uk`}
					className='h-full w-full border-0'
					loading='lazy'
					referrerPolicy='no-referrer-when-downgrade'
				/>
			</div>
		)
	}

	return (
		<div
			ref={shellRef}
			className={
				isMapFullscreen
					? 'relative flex h-screen max-h-screen w-full flex-col overflow-hidden rounded-none border-0 bg-slate-100 shadow-none'
					: 'relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm'
			}
			aria-label={`Карта розташування: ${hotel.name}`}
		>
			<div
				ref={containerRef}
				className={
					isMapFullscreen
						? 'polyana-google-map-root polyana-google-map-root--accommodation min-h-0 w-full flex-1'
						: `polyana-google-map-root polyana-google-map-root--accommodation ${MAP_FRAME} min-h-0 w-full`
				}
				role='presentation'
			/>
			<div className='pointer-events-none absolute inset-0 z-[5]'>
				<div className='pointer-events-auto absolute right-3 top-3 flex flex-col items-center gap-2 sm:right-4 sm:top-4'>
					<button
						type='button'
						onClick={toggleMapFullscreen}
						className='flex size-11 cursor-pointer items-center justify-center rounded-full border border-slate-200/90 bg-white text-[#3d4550] shadow-md transition hover:bg-slate-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#53C4DA]'
						aria-label={isMapFullscreen ? 'Вийти з повноекранного режиму' : 'На весь екран'}
					>
						{isMapFullscreen ? (
							<FaCompress className='size-4' aria-hidden />
						) : (
							<FaExpand className='size-4' aria-hidden />
						)}
					</button>
					<div className='flex w-11 flex-col overflow-hidden rounded-full border border-slate-200/90 bg-white shadow-md'>
						<button
							type='button'
							onClick={() => adjustZoom(1)}
							className='flex h-10 cursor-pointer items-center justify-center border-b border-slate-200 text-lg font-normal leading-none text-[#3d4550] transition hover:bg-slate-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#53C4DA]'
							aria-label='Наблизити'
						>
							+
						</button>
						<button
							type='button'
							onClick={() => adjustZoom(-1)}
							className='flex h-10 cursor-pointer items-center justify-center text-lg font-normal leading-none text-[#3d4550] transition hover:bg-slate-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#53C4DA]'
							aria-label='Віддалити'
						>
							−
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
