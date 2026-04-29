'use client'

import PhishingIcon from '@mui/icons-material/Phishing'
import { useEffect, useRef } from 'react'
import { getTroutMapGoogleDirectionsHref, troutMapSpot } from '@/data/trout-page'
import { attachPolyanaMapZoomControlsOnly } from '@/lib/google-map-stack-controls'
import {
	getTroutPhishingGoogleStylePinDataUrl,
	TROUT_PIN_MARKER_ANCHOR,
	TROUT_PIN_MARKER_SIZE,
} from '@/lib/trout-phishing-marker-icon-url'

/**
 * Як на головній картою готелів: `hybrid` + ці стилі приховують POI/навігацію.
 * НЕ комбінувати `satellite` + `styles` — тайли часто не рендеряться (суцільний фон).
 */
const POLYANA_MAP_SILENT_UI = [
	{ featureType: 'poi', stylers: [{ visibility: 'off' }] },
	{ featureType: 'transit', stylers: [{ visibility: 'off' }] },
	{ featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
	{ featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
	{ elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
]

type TroutMapSectionProps = {
	className?: string
	/** Обовʼязкова явна висота / min-height контейнера — інакше `h-full` у мапі дає 0 px. */
	frameClassName?: string
}

export default function TroutMapSection({
	className = '',
	frameClassName = 'relative min-h-[280px] h-[min(55vh,28rem)] max-h-[640px] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-lg sm:min-h-[320px]',
}: TroutMapSectionProps) {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const mapInstanceRef = useRef<unknown>(null)

	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim()
		const root = containerRef.current

		if (root) root.innerHTML = ''

		if (!apiKey || !root) return

		const win = window as Window & {
			initPolyanaTroutMap?: () => void
			google?: { maps: any }
		}

		let detachControls: (() => void) | null = null
		let markerDirListener: unknown = null
		let cancelled = false

		const clearMarkerDirectionsListener = () => {
			if (markerDirListener !== null && win.google?.maps?.event?.removeListener) {
				win.google.maps.event.removeListener(markerDirListener)
			}
			markerDirListener = null
		}

		const initMap = () => {
			if (!root?.isConnected) return
			const maps = win.google?.maps
			if (!maps) return
			if (cancelled) return

			clearMarkerDirectionsListener()

			root.innerHTML = ''

			const center = { lat: troutMapSpot.lat, lng: troutMapSpot.lng }

			const map = new maps.Map(root, {
				center,
				zoom: troutMapSpot.zoom,
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

			const marker = new maps.Marker({
				position: center,
				map,
				title: `${troutMapSpot.title} — відкрити маршрут у Google Maps`,
				icon: {
					url: getTroutPhishingGoogleStylePinDataUrl(),
					scaledSize: new maps.Size(TROUT_PIN_MARKER_SIZE.w, TROUT_PIN_MARKER_SIZE.h),
					anchor: new maps.Point(TROUT_PIN_MARKER_ANCHOR.x, TROUT_PIN_MARKER_ANCHOR.y),
				},
			})

			markerDirListener = maps.event.addListener(marker, 'click', () => {
				window.open(getTroutMapGoogleDirectionsHref(), '_blank', 'noopener,noreferrer')
			})

			maps.event.addListenerOnce(map, 'idle', () => {
				if (cancelled) return
				maps.event.trigger(map, 'resize')
				requestAnimationFrame(() => maps.event.trigger(map, 'resize'))
			})
		}

		win.initPolyanaTroutMap = initMap

		if (win.google?.maps) {
			queueMicrotask(initMap)
			return () => {
				cancelled = true
				clearMarkerDirectionsListener()
				detachControls?.()
				detachControls = null
				mapInstanceRef.current = null
				win.initPolyanaTroutMap = undefined
				if (root) root.innerHTML = ''
			}
		}

		const mapsScriptAlready = !!document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')
		let pollId: number | undefined
		let maxWaitId: number | undefined

		if (!mapsScriptAlready) {
			const script = document.createElement('script')
			script.id = 'google-maps-script'
			script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&language=uk&region=UA&callback=initPolyanaTroutMap`
			script.async = true
			script.defer = true
			script.onerror = () => {
				win.initPolyanaTroutMap = undefined
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

		return () => {
			cancelled = true
			if (pollId !== undefined) window.clearInterval(pollId)
			if (maxWaitId !== undefined) window.clearTimeout(maxWaitId)
			clearMarkerDirectionsListener()
			detachControls?.()
			detachControls = null
			mapInstanceRef.current = null
			win.initPolyanaTroutMap = undefined
			if (root) root.innerHTML = ''
		}
	}, [])

	useEffect(() => {
		const win = window as Window & {
			google?: { maps?: { event?: { trigger: (m: unknown, e: string) => void } } }
		}
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

	if (!apiKey) {
		const q = encodeURIComponent(`${troutMapSpot.lat},${troutMapSpot.lng}`)
		return (
			<div className={className}>
				<div className={`${frameClassName} relative`}>
					<span aria-hidden className='pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0'>
						<PhishingIcon fontSize='inherit' />
					</span>
					<iframe
						title='Форель — карта Google'
						className='absolute inset-0 h-full min-h-[280px] w-full border-0'
						src={`https://www.google.com/maps?q=${q}&z=${troutMapSpot.zoom}&output=embed&hl=uk`}
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
					/>
				</div>
			</div>
		)
	}

	return (
		<div className={className}>
			<div className={`${frameClassName} accommodation-map-frame`}>
				<span aria-hidden className='pointer-events-none absolute h-0 w-0 overflow-hidden opacity-0'>
					<PhishingIcon fontSize='inherit' />
				</span>
				<div
					ref={containerRef}
					className='polyana-google-map-root polyana-google-map-root--home-map absolute inset-0 min-h-[260px] w-full bg-slate-100'
					role='presentation'
				/>
			</div>
		</div>
	)
}
