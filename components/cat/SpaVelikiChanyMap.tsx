'use client'

import { useEffect, useRef, useState } from 'react'
import type { SpaVelikyiChanVenue } from '@/data/spa-veliki-chany-venues'
import { attachPolyanaMapZoomControlsOnly } from '@/lib/google-map-stack-controls'
import { spaMapPinIconDataUrl } from '@/lib/home-map-pin-icons'
import { spaVelikiChanyHotelInfoWindowHtml } from '@/lib/map-info-window-html'
import { attachPolyanaAccommodationIwDomHandlers } from '@/lib/map-info-window-ui'
import { polyanaHotels } from '@/lib/polyana-hotels'

/** Як `spaIcon` на головній карті (`HomePageMapSection`): 44×52, anchor внизу по центру. */
function spaVelikiChanyMapPinIcon(
	maps: { Size: new (w: number, h: number) => any; Point: new (x: number, y: number) => any },
	active: boolean
) {
	return active
		? {
				url: spaMapPinIconDataUrl,
				scaledSize: new maps.Size(50, 59),
				anchor: new maps.Point(25, 59),
			}
		: {
				url: spaMapPinIconDataUrl,
				scaledSize: new maps.Size(44, 52),
				anchor: new maps.Point(22, 52),
			}
}

const POLYANA_MAP_SILENT_UI = [
	{ featureType: 'poi', stylers: [{ visibility: 'off' }] },
	{ featureType: 'transit', stylers: [{ visibility: 'off' }] },
	{ featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
	{ featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
	{ elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
]

type Win = Window & {
	initPolyanaVelikiChanyMap?: () => void
	google?: { maps: any }
}

type Props = {
	venues: readonly SpaVelikyiChanVenue[]
	selectedId: string | null
	className?: string
	frameClassName?: string
}

export default function SpaVelikiChanyMap({
	venues,
	selectedId,
	className = '',
	frameClassName = 'relative min-h-[280px] h-[min(52vh,26rem)] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-lg sm:min-h-[320px] lg:min-h-0 lg:h-[min(70vh,32rem)]',
}: Props) {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const mapInstanceRef = useRef<any>(null)
	const markersRef = useRef<Map<string, any>>(new Map())
	const activeInfoWindowRef = useRef<any>(null)
	const [mapEpoch, setMapEpoch] = useState(0)

	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim()
		const root = containerRef.current
		const win = window as Win

		if (root) root.innerHTML = ''

		if (!apiKey || !root || venues.length === 0) return

		let detachControls: (() => void) | null = null
		let detachIwUiCapture: (() => void) | null = null
		let cancelled = false
		let pollId: number | undefined
		let maxWaitId: number | undefined

		const initMap = () => {
			if (!root?.isConnected) return
			const maps = win.google?.maps
			if (!maps || cancelled) return

			detachIwUiCapture?.()
			detachIwUiCapture = null
			activeInfoWindowRef.current?.close()
			activeInfoWindowRef.current = null

			root.innerHTML = ''
			markersRef.current.clear()

			const bounds = new maps.LatLngBounds()
			for (const v of venues) {
				bounds.extend({ lat: v.lat, lng: v.lng })
			}

			const map = new maps.Map(root, {
				center: bounds.getCenter(),
				zoom: 15,
				mapTypeId: 'hybrid',
				disableDefaultUI: true,
				mapTypeControl: false,
				fullscreenControl: false,
				zoomControl: false,
				streetViewControl: false,
				scaleControl: false,
				rotateControl: false,
				gestureHandling: 'greedy',
				clickableIcons: false,
				keyboardShortcuts: false,
				scrollwheel: true,
				styles: POLYANA_MAP_SILENT_UI,
			})

			mapInstanceRef.current = map
			detachControls?.()
			detachControls = attachPolyanaMapZoomControlsOnly(map, maps)

			detachIwUiCapture = attachPolyanaAccommodationIwDomHandlers(root, () => {
				activeInfoWindowRef.current?.close()
				activeInfoWindowRef.current = null
			})

			map.fitBounds(bounds, { top: 24, right: 24, bottom: 24, left: 24 })

			for (const v of venues) {
				const hotel = polyanaHotels.find(h => h.id === v.id)
				const marker = new maps.Marker({
					position: { lat: v.lat, lng: v.lng },
					map,
					title: v.name,
					icon: spaVelikiChanyMapPinIcon(maps, false),
					zIndex: 1,
					cursor: 'pointer',
				})
				markersRef.current.set(v.id, marker)
				maps.event.addListener(marker, 'click', () => {
					if (cancelled || !hotel) return
					activeInfoWindowRef.current?.close()
					const iw = new maps.InfoWindow({
						content: spaVelikiChanyHotelInfoWindowHtml(hotel),
						headerDisabled: true,
					})
					activeInfoWindowRef.current = iw
					iw.open({ anchor: marker, map })
				})
			}

			maps.event.addListenerOnce(map, 'idle', () => {
				if (cancelled) return
				maps.event.trigger(map, 'resize')
				requestAnimationFrame(() => maps.event.trigger(map, 'resize'))
			})

			setMapEpoch(e => e + 1)
		}

		win.initPolyanaVelikiChanyMap = initMap

		if (win.google?.maps) {
			queueMicrotask(initMap)
		} else {
			const mapsScriptAlready = !!document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')
			if (!mapsScriptAlready) {
				const script = document.createElement('script')
				script.id = 'google-maps-script'
				script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&language=uk&region=UA&callback=initPolyanaVelikiChanyMap`
				script.async = true
				script.defer = true
				script.onerror = () => {
					win.initPolyanaVelikiChanyMap = undefined
				}
				document.head.appendChild(script)
			} else {
				pollId = window.setInterval(() => {
					if (win.google?.maps) {
						if (pollId !== undefined) window.clearInterval(pollId)
						if (maxWaitId !== undefined) window.clearTimeout(maxWaitId)
						queueMicrotask(initMap)
					}
				}, 120)
				maxWaitId = window.setTimeout(() => {
					if (pollId !== undefined) window.clearInterval(pollId)
				}, 30_000)
			}
		}

		return () => {
			cancelled = true
			if (pollId !== undefined) window.clearInterval(pollId)
			if (maxWaitId !== undefined) window.clearTimeout(maxWaitId)
			detachIwUiCapture?.()
			detachIwUiCapture = null
			activeInfoWindowRef.current?.close()
			activeInfoWindowRef.current = null
			detachControls?.()
			detachControls = null
			mapInstanceRef.current = null
			markersRef.current.clear()
			win.initPolyanaVelikiChanyMap = undefined
			if (root) root.innerHTML = ''
		}
	}, [venues])

	useEffect(() => {
		const win = window as Win
		const maps = win.google?.maps
		const map = mapInstanceRef.current
		if (!maps || !map || markersRef.current.size === 0) return

		if (selectedId) {
			const v = venues.find(x => x.id === selectedId)
			if (v) {
				map.panTo({ lat: v.lat, lng: v.lng })
				map.setZoom(17)
			}
		}

		for (const v of venues) {
			const marker = markersRef.current.get(v.id)
			const active = selectedId === v.id
			if (marker?.setIcon) {
				marker.setIcon(spaVelikiChanyMapPinIcon(maps, active))
			}
			if (marker?.setZIndex) {
				marker.setZIndex(active ? 1_000 : 1)
			}
		}
	}, [selectedId, venues, mapEpoch])

	useEffect(() => {
		const win = window as Win
		const onResize = () => {
			const map = mapInstanceRef.current
			if (map && win.google?.maps?.event) {
				win.google.maps.event.trigger(map, 'resize')
			}
		}
		window.addEventListener('resize', onResize)
		return () => window.removeEventListener('resize', onResize)
	}, [])

	const apiKey = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() : ''

	if (!apiKey && venues.length > 0) {
		const midLat = venues.reduce((s, v) => s + v.lat, 0) / venues.length
		const midLng = venues.reduce((s, v) => s + v.lng, 0) / venues.length
		const q = encodeURIComponent(`${midLat},${midLng}`)
		return (
			<div className={className}>
				<div className={`${frameClassName} relative`}>
					<iframe
						title='Великі чани — карта Google'
						className='absolute inset-0 h-full min-h-[280px] w-full border-0'
						src={`https://www.google.com/maps?q=${q}&z=15&output=embed&hl=uk`}
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
					/>
				</div>
			</div>
		)
	}

	return (
		<div className={className}>
			<div className={`accommodation-map-frame ${frameClassName}`}>
				<div
					ref={containerRef}
					className='polyana-google-map-root polyana-google-map-root--home-map absolute inset-0 min-h-[260px] w-full bg-slate-100'
					role='presentation'
					aria-label='Карта закладів з великими чанами'
				/>
			</div>
		</div>
	)
}
