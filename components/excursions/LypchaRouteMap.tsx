'use client'

import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react'

const LYPCHA_POS = { lat: 48.66332239338579, lng: 23.02946671577749 }
const LYPCHA_ZOOM = 13
const MAP_ZOOM_MIN = 1
const MAP_ZOOM_MAX = 21

const LYPCHA_ROUTE_PATH: readonly { lat: number; lng: number }[] = [
	{ lng: 22.9669066, lat: 48.6210069 },
	{ lng: 22.9667992, lat: 48.6217072 },
	{ lng: 22.9667455, lat: 48.6221398 },
	{ lng: 22.9673896, lat: 48.6228224 },
	{ lng: 22.9695032, lat: 48.6248932 },
	{ lng: 22.9700932, lat: 48.6251839 },
	{ lng: 22.9711232, lat: 48.625574 },
	{ lng: 22.9716486, lat: 48.6259906 },
	{ lng: 22.9720241, lat: 48.6268912 },
	{ lng: 22.9730434, lat: 48.6285435 },
	{ lng: 22.9737729, lat: 48.6297844 },
	{ lng: 22.9741592, lat: 48.6304935 },
	{ lng: 22.9742665, lat: 48.6318336 },
	{ lng: 22.9743845, lat: 48.6338615 },
	{ lng: 22.9741914, lat: 48.6354852 },
	{ lng: 22.9741484, lat: 48.6361446 },
	{ lng: 22.9749638, lat: 48.6380234 },
	{ lng: 22.975629, lat: 48.6395406 },
	{ lng: 22.9766268, lat: 48.6401432 },
	{ lng: 22.9778928, lat: 48.6406961 },
	{ lng: 22.9782898, lat: 48.6410081 },
	{ lng: 22.9785365, lat: 48.64132 },
	{ lng: 22.9786867, lat: 48.6418872 },
	{ lng: 22.9795236, lat: 48.6426811 },
	{ lng: 22.9803068, lat: 48.642192 },
	{ lng: 22.9804034, lat: 48.6418092 },
	{ lng: 22.9809398, lat: 48.6415469 },
	{ lng: 22.9812402, lat: 48.6414972 },
	{ lng: 22.9817552, lat: 48.641554 },
	{ lng: 22.9824418, lat: 48.6415681 },
	{ lng: 22.9827959, lat: 48.6414476 },
	{ lng: 22.9827101, lat: 48.6412846 },
	{ lng: 22.9827422, lat: 48.6411853 },
	{ lng: 22.9830641, lat: 48.6410081 },
	{ lng: 22.9836435, lat: 48.640682 },
	{ lng: 22.9844803, lat: 48.6404551 },
	{ lng: 22.9848773, lat: 48.6401219 },
	{ lng: 22.9853815, lat: 48.6397249 },
	{ lng: 22.9856498, lat: 48.6392641 },
	{ lng: 22.9855854, lat: 48.6390301 },
	{ lng: 22.9852957, lat: 48.6388387 },
	{ lng: 22.9850168, lat: 48.6386756 },
	{ lng: 22.9846949, lat: 48.6389025 },
	{ lng: 22.984373, lat: 48.6389309 },
	{ lng: 22.9839117, lat: 48.638548 },
	{ lng: 22.9839975, lat: 48.6382503 },
	{ lng: 22.9838688, lat: 48.6379383 },
	{ lng: 22.9837186, lat: 48.6377256 },
	{ lng: 22.9837615, lat: 48.6375058 },
	{ lng: 22.9839117, lat: 48.6372222 },
	{ lng: 22.9837507, lat: 48.6367472 },
	{ lng: 22.9835147, lat: 48.6361233 },
	{ lng: 22.9832465, lat: 48.6356412 },
	{ lng: 22.9830748, lat: 48.6352583 },
	{ lng: 22.9834718, lat: 48.6348825 },
	{ lng: 22.9838473, lat: 48.6346131 },
	{ lng: 22.9844481, lat: 48.6342869 },
	{ lng: 22.9848665, lat: 48.6341806 },
	{ lng: 22.9852206, lat: 48.6339466 },
	{ lng: 22.9855103, lat: 48.6336417 },
	{ lng: 22.9862506, lat: 48.6333014 },
	{ lng: 22.9869587, lat: 48.6331667 },
	{ lng: 22.9874951, lat: 48.6329114 },
	{ lng: 22.9881818, lat: 48.6325781 },
	{ lng: 22.9886216, lat: 48.6323725 },
	{ lng: 22.9890615, lat: 48.6320322 },
	{ lng: 22.9896194, lat: 48.6318124 },
	{ lng: 22.9901022, lat: 48.6316138 },
	{ lng: 22.9904992, lat: 48.6313727 },
	{ lng: 22.9909498, lat: 48.6311955 },
	{ lng: 22.9909713, lat: 48.6311104 },
	{ lng: 22.9904885, lat: 48.6305928 },
	{ lng: 22.9895658, lat: 48.6295504 },
	{ lng: 22.9895443, lat: 48.6293519 },
	{ lng: 22.9896731, lat: 48.6291037 },
	{ lng: 22.9899627, lat: 48.6290328 },
	{ lng: 22.9903061, lat: 48.6290186 },
	{ lng: 22.9909605, lat: 48.6292455 },
	{ lng: 22.9915721, lat: 48.6294086 },
	{ lng: 22.9924196, lat: 48.6293235 },
	{ lng: 22.9932565, lat: 48.6293022 },
	{ lng: 22.9941255, lat: 48.62921 },
	{ lng: 22.9944474, lat: 48.6296213 },
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

export default function LypchaRouteMap() {
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
			initLypchaRouteMapCb?: () => void
		}

		let pollTimer: ReturnType<typeof setInterval> | null = null

		const createOrUpdateMap = () => {
			const el = containerRef.current
			if (!el || !win.google?.maps) return false
			const g = win.google.maps

			if (!mapRef.current) {
				mapRef.current = new g.Map(el, {
					center: LYPCHA_POS,
					zoom: LYPCHA_ZOOM,
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
				map.setCenter?.(LYPCHA_POS)
				map.setZoom?.(LYPCHA_ZOOM)
			}

			applyRouteToMap(mapRef.current as any, g, LYPCHA_ROUTE_PATH, polylineRef, startMarkerRef, endMarkerRef)
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
			delete win.initLypchaRouteMapCb
		}

		win.initLypchaRouteMapCb = onApiReady

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
			script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&language=uk&region=UA&callback=initLypchaRouteMapCb`
			script.async = true
			script.defer = true
			script.onerror = () => {
				setUseIframeFallback(true)
				delete win.initLypchaRouteMapCb
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
			if (win.initLypchaRouteMapCb) delete win.initLypchaRouteMapCb
		}
	}, [])

	const iframeSrc = buildIframeFallbackSrc(LYPCHA_POS, LYPCHA_ZOOM)

	return (
		<div className='relative mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm ring-1 ring-slate-900/5'>
			{useIframeFallback ? (
				<iframe
					title='Гора Липча — мапа'
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

