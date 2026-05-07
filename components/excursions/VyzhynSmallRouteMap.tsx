'use client'

import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react'

const VYZHYN_SMALL_POS = { lat: 48.673916128142324, lng: 22.947541351811637 }
const VYZHYN_SMALL_ZOOM = 13
const MAP_ZOOM_MIN = 1
const MAP_ZOOM_MAX = 21

const VYZHYN_SMALL_ROUTE_PATH: readonly { lat: number; lng: number }[] = [
	{ lng: 22.9668956, lat: 48.6213053 },
	{ lng: 22.9667775, lat: 48.6219081 },
	{ lng: 22.9667561, lat: 48.6222627 },
	{ lng: 22.9673896, lat: 48.6228224 },
	{ lng: 22.9668097, lat: 48.6229081 },
	{ lng: 22.9657368, lat: 48.6230428 },
	{ lng: 22.9634731, lat: 48.6246952 },
	{ lng: 22.9629044, lat: 48.6250498 },
	{ lng: 22.9611342, lat: 48.625298 },
	{ lng: 22.9594497, lat: 48.6254611 },
	{ lng: 22.9578941, lat: 48.6253264 },
	{ lng: 22.9555123, lat: 48.6241846 },
	{ lng: 22.9545574, lat: 48.624213 },
	{ lng: 22.9512744, lat: 48.6260993 },
	{ lng: 22.9506843, lat: 48.6261986 },
	{ lng: 22.9499333, lat: 48.6263404 },
	{ lng: 22.9493646, lat: 48.6265319 },
	{ lng: 22.9464678, lat: 48.6279289 },
	{ lng: 22.9454057, lat: 48.6285387 },
	{ lng: 22.9447834, lat: 48.6291131 },
	{ lng: 22.9438715, lat: 48.6295882 },
	{ lng: 22.9426806, lat: 48.6297938 },
	{ lng: 22.942069, lat: 48.6301767 },
	{ lng: 22.9421763, lat: 48.6321834 },
	{ lng: 22.941597, lat: 48.6327223 },
	{ lng: 22.9400413, lat: 48.6336086 },
	{ lng: 22.939022, lat: 48.6340198 },
	{ lng: 22.939537, lat: 48.6343673 },
	{ lng: 22.9402451, lat: 48.6346934 },
	{ lng: 22.9412858, lat: 48.6347714 },
	{ lng: 22.9426698, lat: 48.6347643 },
	{ lng: 22.9440324, lat: 48.6344949 },
	{ lng: 22.9441933, lat: 48.6347714 },
	{ lng: 22.9440324, lat: 48.6353032 },
	{ lng: 22.9441182, lat: 48.6363241 },
	{ lng: 22.9443114, lat: 48.6369835 },
	{ lng: 22.9454701, lat: 48.6380115 },
	{ lng: 22.9464678, lat: 48.6388198 },
	{ lng: 22.9472725, lat: 48.639791 },
	{ lng: 22.9477446, lat: 48.6406985 },
	{ lng: 22.94856, lat: 48.6424425 },
	{ lng: 22.9486458, lat: 48.6433499 },
	{ lng: 22.9489891, lat: 48.6441863 },
	{ lng: 22.949708, lat: 48.6448456 },
	{ lng: 22.9504697, lat: 48.6457175 },
	{ lng: 22.951092, lat: 48.6462988 },
	{ lng: 22.9520361, lat: 48.6467879 },
	{ lng: 22.9531197, lat: 48.647199 },
	{ lng: 22.9538064, lat: 48.6476243 },
	{ lng: 22.9541712, lat: 48.6482339 },
	{ lng: 22.9545359, lat: 48.6489711 },
	{ lng: 22.9549544, lat: 48.6494106 },
	{ lng: 22.9553084, lat: 48.6503179 },
	{ lng: 22.9556088, lat: 48.6516788 },
	{ lng: 22.9558019, lat: 48.6532806 },
	{ lng: 22.9567461, lat: 48.6544571 },
	{ lng: 22.9581623, lat: 48.6554068 },
	{ lng: 22.9590307, lat: 48.656308 },
	{ lng: 22.9597496, lat: 48.6570876 },
	{ lng: 22.9610692, lat: 48.6574065 },
	{ lng: 22.9622387, lat: 48.6578105 },
	{ lng: 22.9627107, lat: 48.6582569 },
	{ lng: 22.9629575, lat: 48.6586963 },
	{ lng: 22.9630326, lat: 48.659568 },
	{ lng: 22.962936, lat: 48.6606806 },
	{ lng: 22.9629789, lat: 48.6614105 },
	{ lng: 22.9626356, lat: 48.6618499 },
	{ lng: 22.9627215, lat: 48.6627002 },
	{ lng: 22.9625456, lat: 48.6634729 },
	{ lng: 22.9651891, lat: 48.6641246 },
	{ lng: 22.9683004, lat: 48.6650741 },
	{ lng: 22.9677211, lat: 48.665726 },
	{ lng: 22.9669701, lat: 48.6662787 },
	{ lng: 22.9658757, lat: 48.6667464 },
	{ lng: 22.9643308, lat: 48.6670014 },
	{ lng: 22.9630433, lat: 48.6673982 },
	{ lng: 22.9618846, lat: 48.6675541 },
	{ lng: 22.9605757, lat: 48.6676817 },
	{ lng: 22.9597174, lat: 48.6671148 },
	{ lng: 22.9584943, lat: 48.6669731 },
	{ lng: 22.9569279, lat: 48.6676108 },
	{ lng: 22.9556833, lat: 48.6680926 },
	{ lng: 22.9547177, lat: 48.6681493 },
	{ lng: 22.9529153, lat: 48.6679367 },
	{ lng: 22.9515205, lat: 48.667795 },
	{ lng: 22.9496966, lat: 48.6678234 },
	{ lng: 22.94798, lat: 48.6679651 },
	{ lng: 22.947229, lat: 48.6682202 },
	{ lng: 22.9475294, lat: 48.6688295 },
	{ lng: 22.9476582, lat: 48.6696089 },
	{ lng: 22.9476152, lat: 48.6707709 },
	{ lng: 22.9476152, lat: 48.6714936 },
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

export default function VyzhynSmallRouteMap() {
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
			initVyzhynSmallRouteMapCb?: () => void
		}

		let pollTimer: ReturnType<typeof setInterval> | null = null

		const createOrUpdateMap = () => {
			const el = containerRef.current
			if (!el || !win.google?.maps) return false
			const g = win.google.maps

			if (!mapRef.current) {
				mapRef.current = new g.Map(el, {
					center: VYZHYN_SMALL_POS,
					zoom: VYZHYN_SMALL_ZOOM,
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
				map.setCenter?.(VYZHYN_SMALL_POS)
				map.setZoom?.(VYZHYN_SMALL_ZOOM)
			}

			applyRouteToMap(mapRef.current as any, g, VYZHYN_SMALL_ROUTE_PATH, polylineRef, startMarkerRef, endMarkerRef)
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
			delete win.initVyzhynSmallRouteMapCb
		}

		win.initVyzhynSmallRouteMapCb = onApiReady

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
			script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&language=uk&region=UA&callback=initVyzhynSmallRouteMapCb`
			script.async = true
			script.defer = true
			script.onerror = () => {
				setUseIframeFallback(true)
				delete win.initVyzhynSmallRouteMapCb
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
			if (win.initVyzhynSmallRouteMapCb) delete win.initVyzhynSmallRouteMapCb
		}
	}, [])

	const iframeSrc = buildIframeFallbackSrc(VYZHYN_SMALL_POS, VYZHYN_SMALL_ZOOM)

	return (
		<div className='relative mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm ring-1 ring-slate-900/5'>
			{useIframeFallback ? (
				<iframe
					title='Гора Малий Вижень — мапа'
					src={iframeSrc}
					className='h-[min(440px,70vh)] w-full min-h-[300px]'
					loading='lazy'
					referrerPolicy='no-referrer-when-downgrade'
				/>
			) : (
				<>
					<div
						ref={containerRef}
						className='h-[min(440px,70vh)] w-full min-h-[300px]'
						role='presentation'
					/>
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

