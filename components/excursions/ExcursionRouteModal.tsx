'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes } from 'react-icons/fa'

type LatLng = { lat: number; lng: number }
type RouteStop = { label: string; name: string; lat: number; lng: number }

/** Стандартна форма піна Google Maps (SVG path). */
const MAP_PIN_PATH =
	'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z'

function stopPinColor(index: number, total: number) {
	if (index === 0) return '#22c55e'
	if (index === total - 1) return '#ef4444'
	return '#2563eb'
}

function buildLabeledPinIcon(maps: any, fill: string) {
	return {
		path: MAP_PIN_PATH,
		fillColor: fill,
		fillOpacity: 1,
		strokeColor: '#ffffff',
		strokeWeight: 2,
		scale: 1.65,
		anchor: new maps.Point(12, 22),
		labelOrigin: new maps.Point(12, 9),
	}
}

function defaultRouteStops(start: LatLng, end: LatLng): RouteStop[] {
	return [
		{ label: 'A', name: 'Старт', lat: start.lat, lng: start.lng },
		{ label: 'B', name: 'Фініш', lat: end.lat, lng: end.lng },
	]
}

async function ensureGoogleMapsLoaded(apiKey: string) {
	const win = window as Window & { google?: any }
	if (win.google?.maps) return win.google.maps

	const existing = document.getElementById('google-maps-script') as HTMLScriptElement | null
	if (!existing) {
		const script = document.createElement('script')
		script.id = 'google-maps-script'
		script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&language=uk&region=UA`
		script.async = true
		script.defer = true
		document.head.appendChild(script)
	}

	await new Promise<void>((resolve, reject) => {
		const started = Date.now()
		const timer = window.setInterval(() => {
			if ((window as any).google?.maps) {
				window.clearInterval(timer)
				resolve()
				return
			}
			if (Date.now() - started > 25_000) {
				window.clearInterval(timer)
				reject(new Error('Google Maps API timeout'))
			}
		}, 120)
	})

	return (window as any).google.maps
}

export function ExcursionRouteMap({
	title,
	start,
	end,
	path,
	stops,
}: {
	title: string
	start: LatLng
	end: LatLng
	path?: readonly LatLng[]
	stops?: readonly RouteStop[]
}) {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const mapRef = useRef<any>(null)
	const overlaysRef = useRef<{
		stopMarkers?: any[]
		polyline?: any
	} | null>(null)
	const [error, setError] = useState<string | null>(null)

	const apiKey = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() : ''

	const effectiveStops = useMemo(
		() => (stops && stops.length > 0 ? [...stops] : defaultRouteStops(start, end)),
		[stops, start.lat, start.lng, end.lat, end.lng],
	)

	useEffect(() => {
		let cancelled = false
		const root = containerRef.current
		if (!root) return

		const init = async () => {
			if (!apiKey) {
				setError('Додайте NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, щоб показувати маршрут на карті.')
				return
			}
			try {
				const maps = await ensureGoogleMapsLoaded(apiKey)
				if (cancelled || !root.isConnected) return

				const effectivePath: readonly LatLng[] = path && path.length >= 2 ? path : [start, end]
				const bounds = new maps.LatLngBounds()
				for (const p of effectivePath) bounds.extend(p)
				for (const stop of effectiveStops) bounds.extend({ lat: stop.lat, lng: stop.lng })

				const map = new maps.Map(root, {
					center: start,
					zoom: 14,
					mapTypeId: maps.MapTypeId?.SATELLITE ?? 'satellite',
					disableDefaultUI: true,
					mapTypeControl: false,
					fullscreenControl: false,
					zoomControl: true,
					streetViewControl: false,
					keyboardShortcuts: false,
					clickableIcons: false,
					gestureHandling: 'greedy',
					styles: [
						{ featureType: 'poi', stylers: [{ visibility: 'off' }] },
						{ featureType: 'transit', stylers: [{ visibility: 'off' }] },
						{ featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
						{ featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
						{ elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
					],
				})

				mapRef.current = map
				overlaysRef.current = {}

				overlaysRef.current.stopMarkers = effectiveStops.map((stop, index) =>
					new maps.Marker({
						map,
						position: { lat: stop.lat, lng: stop.lng },
						title: `${stop.label}: ${stop.name}`,
						optimized: false,
						label: {
							text: stop.label,
							color: '#ffffff',
							fontSize: '11px',
							fontWeight: '700',
						},
						icon: buildLabeledPinIcon(maps, stopPinColor(index, effectiveStops.length)),
						zIndex: index === 0 ? 3 : index === effectiveStops.length - 1 ? 2 : 1,
					}),
				)

				overlaysRef.current.polyline = new maps.Polyline({
					path: effectivePath,
					strokeColor: '#39FF14',
					strokeOpacity: 0.95,
					strokeWeight: 5,
					geodesic: true,
					map,
				})

				map.fitBounds(bounds, 60)
				maps.event?.addListenerOnce?.(map, 'idle', () => maps.event.trigger(map, 'resize'))
			} catch {
				if (!cancelled) setError('Не вдалося завантажити Google Maps або побудувати маршрут.')
			}
		}

		init()
		return () => {
			cancelled = true
			const overlays = overlaysRef.current
			for (const marker of overlays?.stopMarkers ?? []) marker?.setMap?.(null)
			overlays?.polyline?.setMap?.(null)
			overlaysRef.current = null
			mapRef.current = null
		}
	}, [apiKey, start.lat, start.lng, end.lat, end.lng, path, effectiveStops])

	return (
		<div className='flex min-h-0 w-full flex-col'>
			<div className='flex items-center justify-between gap-3'>
				<h3 className='text-base font-extrabold text-[#2D333D] sm:text-lg'>{title}</h3>
				{error ? <p className='text-xs font-semibold text-rose-600'>{error}</p> : null}
			</div>
			<div className='mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm'>
				<div ref={containerRef} className='h-[min(520px,70vh)] w-full min-h-[320px]' role='presentation' />
			</div>
			<p className='mt-2 text-xs text-slate-500'>
				Зупинки {effectiveStops.map(s => s.label).join(', ')}: {effectiveStops[0].name} → {effectiveStops[effectiveStops.length - 1].name}.
			</p>
		</div>
	)
}

export default function ExcursionRouteModal({
	open,
	onClose,
	title,
	start,
	end,
	path,
	stops,
}: {
	open: boolean
	onClose: () => void
	title: string
	start: LatLng
	end: LatLng
	path?: readonly LatLng[]
	stops?: readonly RouteStop[]
}) {
	useEffect(() => {
		if (!open) return
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = prevOverflow
		}
	}, [open])

	useEffect(() => {
		if (!open) return
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [open, onClose])

	if (!open) return null

	return createPortal(
		<div className='fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6' role='dialog' aria-modal='true'>
			<button
				type='button'
				className='absolute inset-0 cursor-pointer bg-slate-900/40 backdrop-blur-sm'
				aria-label='Закрити'
				onClick={onClose}
			/>
			<div className='relative z-[1] flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl'>
				<div className='flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6'>
					<p className='text-sm font-bold text-slate-700'>Маршрут</p>
					<button
						type='button'
						onClick={onClose}
						className='flex size-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50'
						aria-label='Закрити модальне вікно'
					>
						<FaTimes className='size-4' aria-hidden />
					</button>
				</div>
				<div className='min-h-0 p-4 sm:p-6'>
					<ExcursionRouteMap title={title} start={start} end={end} path={path} stops={stops} />
				</div>
			</div>
		</div>,
		document.body,
	)
}

