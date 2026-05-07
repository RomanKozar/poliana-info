'use client'

import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react'

const VELYKYI_VERKH_POS = { lat: 48.6277, lng: 23.2892 }
const VELYKYI_VERKH_ZOOM = 13
const MAP_ZOOM_MIN = 1
const MAP_ZOOM_MAX = 21

const POLYANA_KOKHANNIA_ROUTE_PATH: readonly { lat: number; lng: number }[] = [
	{ lng: 22.9668678, lat: 48.6210542 },
	{ lng: 22.966806, lat: 48.621656 },
	{ lng: 22.9667605, lat: 48.6221039 },
	{ lng: 22.9673613, lat: 48.6228698 },
	{ lng: 22.9655614, lat: 48.623202 },
	{ lng: 22.9634586, lat: 48.6246913 },
	{ lng: 22.9629221, lat: 48.6249891 },
	{ lng: 22.9612699, lat: 48.6252161 },
	{ lng: 22.9593172, lat: 48.6254572 },
	{ lng: 22.9577937, lat: 48.6252728 },
	{ lng: 22.9563346, lat: 48.6246487 },
	{ lng: 22.9554763, lat: 48.6241949 },
	{ lng: 22.9545751, lat: 48.6241949 },
	{ lng: 22.9535451, lat: 48.6245069 },
	{ lng: 22.9511419, lat: 48.6260812 },
	{ lng: 22.9500046, lat: 48.6263365 },
	{ lng: 22.9482236, lat: 48.6271166 },
	{ lng: 22.9464855, lat: 48.6255281 },
	{ lng: 22.9460993, lat: 48.6245636 },
	{ lng: 22.9439106, lat: 48.6243651 },
	{ lng: 22.94346, lat: 48.6243651 },
	{ lng: 22.9426661, lat: 48.6240814 },
	{ lng: 22.9421082, lat: 48.6237977 },
	{ lng: 22.9406598, lat: 48.623351 },
	{ lng: 22.9406598, lat: 48.6231807 },
	{ lng: 22.9407563, lat: 48.6230247 },
	{ lng: 22.9406169, lat: 48.6228332 },
	{ lng: 22.9399088, lat: 48.6225779 },
	{ lng: 22.9391899, lat: 48.6226276 },
	{ lng: 22.9384282, lat: 48.6225779 },
	{ lng: 22.9376128, lat: 48.6227198 },
	{ lng: 22.9377844, lat: 48.6229822 },
	{ lng: 22.9378488, lat: 48.623358 },
	{ lng: 22.9377093, lat: 48.6237339 },
	{ lng: 22.9378703, lat: 48.624131 },
	{ lng: 22.938117, lat: 48.6244431 },
	{ lng: 22.9385998, lat: 48.6247622 },
	{ lng: 22.9383745, lat: 48.6250246 },
	{ lng: 22.9386642, lat: 48.6253792 },
	{ lng: 22.9383531, lat: 48.6254855 },
	{ lng: 22.9392328, lat: 48.6268613 },
	{ lng: 22.9384175, lat: 48.6272017 },
	{ lng: 22.9368296, lat: 48.6278541 },
	{ lng: 22.9362288, lat: 48.6285632 },
	{ lng: 22.9349413, lat: 48.6286766 },
	{ lng: 22.933053, lat: 48.6286483 },
	{ lng: 22.9323664, lat: 48.6291305 },
	{ lng: 22.9306069, lat: 48.6292723 },
	{ lng: 22.9293194, lat: 48.6294141 },
	{ lng: 22.927517, lat: 48.6292439 },
	{ lng: 22.9256287, lat: 48.6291588 },
	{ lng: 22.925972, lat: 48.6299246 },
	{ lng: 22.92447, lat: 48.6299246 },
	{ lng: 22.924481, lat: 48.6303384 },
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

export default function VelykyiVerkhRouteMap() {
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
			initVelykyiVerkhRouteMapCb?: () => void
		}

		let pollTimer: ReturnType<typeof setInterval> | null = null

		const createOrUpdateMap = () => {
			const el = containerRef.current
			if (!el || !win.google?.maps) return false
			const g = win.google.maps

			if (!mapRef.current) {
				mapRef.current = new g.Map(el, {
					center: VELYKYI_VERKH_POS,
					zoom: VELYKYI_VERKH_ZOOM,
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
				map.setCenter?.(VELYKYI_VERKH_POS)
				map.setZoom?.(VELYKYI_VERKH_ZOOM)
			}

			applyRouteToMap(mapRef.current as any, g, POLYANA_KOKHANNIA_ROUTE_PATH, polylineRef, startMarkerRef, endMarkerRef)
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
			delete win.initVelykyiVerkhRouteMapCb
		}

		win.initVelykyiVerkhRouteMapCb = onApiReady

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
			script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&language=uk&region=UA&callback=initVelykyiVerkhRouteMapCb`
			script.async = true
			script.defer = true
			script.onerror = () => {
				setUseIframeFallback(true)
				delete win.initVelykyiVerkhRouteMapCb
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
			if (win.initVelykyiVerkhRouteMapCb) delete win.initVelykyiVerkhRouteMapCb
		}
	}, [])

	const iframeSrc = buildIframeFallbackSrc(VELYKYI_VERKH_POS, VELYKYI_VERKH_ZOOM)

	return (
		<div className='relative mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm ring-1 ring-slate-900/5'>
			{useIframeFallback ? (
				<iframe
					title='Великий Верх — мапа'
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

