'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaTimes } from 'react-icons/fa'

type LatLng = { lat: number; lng: number }

function buildFlagSvgDataUrl(color: string) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <path d="M14 6c-1.1 0-2 .9-2 2v34a2 2 0 1 0 4 0V29.2c5.7-3.4 11.7 3.6 18 0V10.8c-6.3 3.6-12.3-3.4-18 0V8c0-1.1-.9-2-2-2z" fill="${color}"/>
  <path d="M14 6c-1.1 0-2 .9-2 2v34a2 2 0 1 0 4 0V8c0-1.1-.9-2-2-2z" fill="#111827" opacity=".55"/>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
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

function RouteMap({
	title,
	start,
	end,
	path,
}: {
	title: string
	start: LatLng
	end: LatLng
	path?: readonly LatLng[]
}) {
	const containerRef = useRef<HTMLDivElement | null>(null)
	const mapRef = useRef<any>(null)
	const overlaysRef = useRef<{
		startMarker?: any
		endMarker?: any
		polyline?: any
	} | null>(null)
	const [error, setError] = useState<string | null>(null)

	const apiKey = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() : ''

	const startIcon = useMemo(
		() => ({
			url: buildFlagSvgDataUrl('#22c55e'),
		}),
		[],
	)
	const endIcon = useMemo(
		() => ({
			url: buildFlagSvgDataUrl('#ef4444'),
		}),
		[],
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

				const iconSize = new maps.Size(34, 34)
				const iconAnchor = new maps.Point(10, 30)

				overlaysRef.current.startMarker = new maps.Marker({
					map,
					position: start,
					title: 'Старт',
					clickable: false,
					icon: { ...startIcon, scaledSize: iconSize, anchor: iconAnchor },
				})
				overlaysRef.current.endMarker = new maps.Marker({
					map,
					position: end,
					title: 'Фініш',
					clickable: false,
					icon: { ...endIcon, scaledSize: iconSize, anchor: iconAnchor },
				})

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
			overlays?.startMarker?.setMap?.(null)
			overlays?.endMarker?.setMap?.(null)
			overlays?.polyline?.setMap?.(null)
			overlaysRef.current = null
			mapRef.current = null
		}
	}, [apiKey, start.lat, start.lng, end.lat, end.lng, path, startIcon, endIcon])

	return (
		<div className='flex min-h-0 w-full flex-col'>
			<div className='flex items-center justify-between gap-3'>
				<h3 className='text-base font-extrabold text-[#2D333D] sm:text-lg'>{title}</h3>
				{error ? <p className='text-xs font-semibold text-rose-600'>{error}</p> : null}
			</div>
			<div className='mt-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm'>
				<div ref={containerRef} className='h-[min(520px,70vh)] w-full min-h-[320px]' role='presentation' />
			</div>
			<p className='mt-2 text-xs text-slate-500'>Зелений прапорець — старт, червоний — фініш.</p>
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
}: {
	open: boolean
	onClose: () => void
	title: string
	start: LatLng
	end: LatLng
	path?: readonly LatLng[]
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
					<RouteMap title={title} start={start} end={end} path={path} />
				</div>
			</div>
		</div>,
		document.body,
	)
}

