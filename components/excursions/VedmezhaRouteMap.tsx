'use client'

import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react'

const VEDMEZHA_POS = { lat: 48.65316352015213, lng: 22.965168433299574 }
const VEDMEZHA_ZOOM = 13
const MAP_ZOOM_MIN = 1
const MAP_ZOOM_MAX = 21

const VEDMEZHA_ROUTE_PATH: readonly { lat: number; lng: number }[] = [
	{ lng: 22.966912, lat: 48.6212303 },
	{ lng: 22.9667566, lat: 48.6220352 },
	{ lng: 22.9669493, lat: 48.6223935 },
	{ lng: 22.9673896, lat: 48.6228224 },
	{ lng: 22.9687625, lat: 48.6242019 },
	{ lng: 22.9696875, lat: 48.6250351 },
	{ lng: 22.9708569, lat: 48.6254677 },
	{ lng: 22.9715631, lat: 48.6259073 },
	{ lng: 22.9721337, lat: 48.6268576 },
	{ lng: 22.9737607, lat: 48.6296795 },
	{ lng: 22.9742542, lat: 48.6306368 },
	{ lng: 22.9743937, lat: 48.6337992 },
	{ lng: 22.974222, lat: 48.6352811 },
	{ lng: 22.9741484, lat: 48.6361446 },
	{ lng: 22.975683, lat: 48.6396061 },
	{ lng: 22.9764644, lat: 48.6400596 },
	{ lng: 22.9773119, lat: 48.640485 },
	{ lng: 22.9777429, lat: 48.640627 },
	{ lng: 22.9772905, lat: 48.6413144 },
	{ lng: 22.9771188, lat: 48.6416618 },
	{ lng: 22.9768613, lat: 48.6421509 },
	{ lng: 22.9765627, lat: 48.6425127 },
	{ lng: 22.9759619, lat: 48.6429664 },
	{ lng: 22.9751554, lat: 48.6434057 },
	{ lng: 22.9743605, lat: 48.6438296 },
	{ lng: 22.9740279, lat: 48.6441486 },
	{ lng: 22.9737303, lat: 48.6443559 },
	{ lng: 22.973623, lat: 48.6446678 },
	{ lng: 22.9730301, lat: 48.6450205 },
	{ lng: 22.9726736, lat: 48.6454424 },
	{ lng: 22.9730409, lat: 48.6463744 },
	{ lng: 22.9731696, lat: 48.6469699 },
	{ lng: 22.9735129, lat: 48.6476362 },
	{ lng: 22.9738455, lat: 48.6481111 },
	{ lng: 22.9744249, lat: 48.6488979 },
	{ lng: 22.9747897, lat: 48.6493657 },
	{ lng: 22.9750579, lat: 48.6502163 },
	{ lng: 22.9755085, lat: 48.6508826 },
	{ lng: 22.9757553, lat: 48.6514 },
	{ lng: 22.9757553, lat: 48.6516339 },
	{ lng: 22.9759698, lat: 48.6522718 },
	{ lng: 22.9758411, lat: 48.6530514 },
	{ lng: 22.9752403, lat: 48.6538452 },
	{ lng: 22.9749184, lat: 48.6544548 },
	{ lng: 22.9747038, lat: 48.6552344 },
	{ lng: 22.9739957, lat: 48.6559856 },
	{ lng: 22.973631, lat: 48.6561557 },
	{ lng: 22.9730945, lat: 48.6564676 },
	{ lng: 22.9727297, lat: 48.6562124 },
	{ lng: 22.9721289, lat: 48.6559006 },
	{ lng: 22.9712277, lat: 48.6559289 },
	{ lng: 22.9701763, lat: 48.6559998 },
	{ lng: 22.9690176, lat: 48.6561841 },
	{ lng: 22.9686528, lat: 48.6564817 },
	{ lng: 22.9673868, lat: 48.6563967 },
	{ lng: 22.9659706, lat: 48.6563684 },
	{ lng: 22.9648119, lat: 48.6567794 },
	{ lng: 22.9641896, lat: 48.6568645 },
	{ lng: 22.9636317, lat: 48.6570912 },
	{ lng: 22.9627734, lat: 48.6570487 },
]

function buildFlagSvgDataUrl(color: string) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <path d="M14 6c-1.1 0-2 .9-2 2v34a2 2 0 1 0 4 0V29.2c5.7-3.4 11.7 3.6 18 0V10.8c-6.3 3.6-12.3-3.4-18 0V8c0-1.1-.9-2-2-2z" fill="${color}"/>
  <path d="M14 6c-1.1 0-2 .9-2 2v34a2 2 0 1 0 4 0V8c0-1.1-.9-2-2-2z" fill="#111827" opacity=".55"/>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function applyRouteToMap(
	map: { fitBounds: (b: unknown, padding?: number) => void },
	g: {
		LatLng: new (lat: number, lng: number) => unknown
		LatLngBounds: new () => { extend: (p: unknown) => void }
		Polyline: new (opts: Record<string, unknown>) => { setMap: (m: unknown | null) => void }
		Marker: new (opts: Record<string, unknown>) => { setMap: (m: unknown | null) => void }
		Size: new (w: number, h: number) => unknown
		Point: new (x: number, y: number) => unknown
	},
	path: readonly { lat: number; lng: number }[],
	polylineRef: MutableRefObject<{ setMap: (m: unknown | null) => void } | null>,
	startMarkerRef: MutableRefObject<{ setMap: (m: unknown | null) => void } | null>,
	endMarkerRef: MutableRefObject<{ setMap: (m: unknown | null) => void } | null>,
) {
	if (polylineRef.current) {
		polylineRef.current.setMap(null)
		polylineRef.current = null
	}
	if (startMarkerRef.current) {
		startMarkerRef.current.setMap(null)
		startMarkerRef.current = null
	}
	if (endMarkerRef.current) {
		endMarkerRef.current.setMap(null)
		endMarkerRef.current = null
	}
	if (!path.length) return

	const ll = path.map(p => new g.LatLng(p.lat, p.lng))
	polylineRef.current = new g.Polyline({
		path: ll,
		strokeColor: '#39FF14',
		strokeOpacity: 0.95,
		strokeWeight: 5,
		geodesic: true,
	})
	polylineRef.current.setMap(map as any)

	const start = path[0]
	const end = path[path.length - 1]
	const iconSize = new g.Size(34, 34)
	const iconAnchor = new g.Point(10, 30)

	startMarkerRef.current = new g.Marker({
		map,
		position: new g.LatLng(start.lat, start.lng),
		title: 'Старт',
		clickable: false,
		optimized: true,
		icon: { url: buildFlagSvgDataUrl('#22c55e'), scaledSize: iconSize, anchor: iconAnchor },
	})
	endMarkerRef.current = new g.Marker({
		map,
		position: new g.LatLng(end.lat, end.lng),
		title: 'Фініш',
		clickable: false,
		optimized: true,
		icon: { url: buildFlagSvgDataUrl('#ef4444'), scaledSize: iconSize, anchor: iconAnchor },
	})

	const bounds = new g.LatLngBounds()
	for (const p of ll) bounds.extend(p)
	map.fitBounds(bounds, 40)
}

function buildIframeFallbackSrc(end: { lat: number; lng: number }, zoom: number) {
	return `https://maps.google.com/maps?hl=uk&ll=${end.lat},${end.lng}&z=${zoom}&t=k&output=embed`
}

export default function VedmezhaRouteMap() {
	const hasApiKey = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim())
	const [useIframeFallback, setUseIframeFallback] = useState(!hasApiKey)
	const containerRef = useRef<HTMLDivElement>(null)
	const mapRef = useRef<unknown>(null)
	const markerRef = useRef<{ setMap: (m: unknown | null) => void } | null>(null)
	const polylineRef = useRef<{ setMap: (m: unknown | null) => void } | null>(null)
	const startMarkerRef = useRef<{ setMap: (m: unknown | null) => void } | null>(null)
	const endMarkerRef = useRef<{ setMap: (m: unknown | null) => void } | null>(null)

	const adjustZoom = useCallback((delta: number) => {
		const map = mapRef.current as { getZoom?: () => number | undefined; setZoom?: (z: number) => void } | null
		if (!map?.getZoom || !map?.setZoom) return
		const z = map.getZoom()
		if (typeof z !== 'number') return
		map.setZoom(Math.min(MAP_ZOOM_MAX, Math.max(MAP_ZOOM_MIN, z + delta)))
	}, [])

	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim()
		if (!apiKey) {
			setUseIframeFallback(true)
			return
		}

		const win = window as Window & {
			google?: { maps: any }
			initVedmezhaRouteMapCb?: () => void
		}

		let pollTimer: ReturnType<typeof setInterval> | null = null

		const createOrUpdateMap = () => {
			const el = containerRef.current
			if (!el || !win.google?.maps) return false
			const g = win.google.maps

			if (!mapRef.current) {
				mapRef.current = new g.Map(el, {
					center: VEDMEZHA_POS,
					zoom: VEDMEZHA_ZOOM,
					mapTypeId: g.MapTypeId.SATELLITE,
					disableDefaultUI: true,
					mapTypeControl: false,
					fullscreenControl: false,
					zoomControl: false,
					streetViewControl: false,
					keyboardShortcuts: false,
					clickableIcons: false,
					gestureHandling: 'greedy',
					rotateControl: false,
					scaleControl: false,
					styles: [
						{ featureType: 'poi', stylers: [{ visibility: 'off' }] },
						{ featureType: 'transit', stylers: [{ visibility: 'off' }] },
						{ featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
						{ featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
						{ elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
					],
				})
			} else {
				const map = mapRef.current as any
				map.setCenter?.(VEDMEZHA_POS)
				map.setZoom?.(VEDMEZHA_ZOOM)
			}

			applyRouteToMap(mapRef.current as any, g, VEDMEZHA_ROUTE_PATH, polylineRef, startMarkerRef, endMarkerRef)
			return true
		}

		if (createOrUpdateMap()) {
			return () => {
				if (pollTimer) clearInterval(pollTimer)
				if (markerRef.current) {
					markerRef.current.setMap(null)
					markerRef.current = null
				}
				if (polylineRef.current) {
					polylineRef.current.setMap(null)
					polylineRef.current = null
				}
				if (startMarkerRef.current) {
					startMarkerRef.current.setMap(null)
					startMarkerRef.current = null
				}
				if (endMarkerRef.current) {
					endMarkerRef.current.setMap(null)
					endMarkerRef.current = null
				}
				mapRef.current = null
			}
		}

		const onApiReady = () => {
			createOrUpdateMap()
			delete win.initVedmezhaRouteMapCb
		}

		win.initVedmezhaRouteMapCb = onApiReady

		const existingScript = document.getElementById('google-maps-script')
		if (existingScript) {
			pollTimer = setInterval(() => {
				if (createOrUpdateMap()) {
					if (pollTimer) clearInterval(pollTimer)
					pollTimer = null
				}
			}, 100)
		} else {
			const script = document.createElement('script')
			script.id = 'google-maps-script'
			script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&language=uk&region=UA&callback=initVedmezhaRouteMapCb`
			script.async = true
			script.defer = true
			script.onerror = () => {
				setUseIframeFallback(true)
				delete win.initVedmezhaRouteMapCb
			}
			document.head.appendChild(script)
		}

		return () => {
			if (pollTimer) clearInterval(pollTimer)
			if (markerRef.current) {
				markerRef.current.setMap(null)
				markerRef.current = null
			}
			if (polylineRef.current) {
				polylineRef.current.setMap(null)
				polylineRef.current = null
			}
			if (startMarkerRef.current) {
				startMarkerRef.current.setMap(null)
				startMarkerRef.current = null
			}
			if (endMarkerRef.current) {
				endMarkerRef.current.setMap(null)
				endMarkerRef.current = null
			}
			mapRef.current = null
			if (win.initVedmezhaRouteMapCb) delete win.initVedmezhaRouteMapCb
		}
	}, [])

	const iframeSrc = buildIframeFallbackSrc(VEDMEZHA_POS, VEDMEZHA_ZOOM)

	return (
		<div className='relative mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm ring-1 ring-slate-900/5'>
			{useIframeFallback ? (
				<iframe
					title='Гора Ведмежа — мапа'
					src={iframeSrc}
					className='h-[min(440px,70vh)] w-full min-h-[300px]'
					loading='lazy'
					referrerPolicy='no-referrer-when-downgrade'
				/>
			) : (
				<>
					<div ref={containerRef} className='h-[min(440px,70vh)] w-full min-h-[300px]' role='presentation' />
					<div className='pointer-events-none absolute inset-0 z-[5]'>
						<div className='pointer-events-auto absolute right-3 top-3 flex flex-col items-center gap-2 sm:right-4 sm:top-4'>
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
				</>
			)}
			{useIframeFallback && hasApiKey === false ? (
				<p className='pointer-events-none absolute bottom-3 left-1/2 z-[1] max-w-[90%] -translate-x-1/2 rounded-lg bg-white/95 px-3 py-1.5 text-center text-xs text-slate-600 shadow-sm'>
					Щоб карта була інтерактивною, додайте{' '}
					<code className='rounded bg-slate-100 px-1'>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>.
				</p>
			) : null}
		</div>
	)
}

