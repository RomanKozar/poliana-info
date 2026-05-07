'use client'

import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react'

const VYZHYN_BIG_POS = { lat: 48.70178118047461, lng: 22.957258642049577 }
const VYZHYN_BIG_ZOOM = 13
const MAP_ZOOM_MIN = 1
const MAP_ZOOM_MAX = 21

const VYZHYN_BIG_ROUTE_PATH: readonly { lat: number; lng: number }[] = [
	{ lng: 22.9668678, lat: 48.6210542 },
	{ lng: 22.9667605, lat: 48.6221039 },
	{ lng: 22.9673613, lat: 48.6228698 },
	{ lng: 22.9694642, lat: 48.6250966 },
	{ lng: 22.971331, lat: 48.6258483 },
	{ lng: 22.9718245, lat: 48.6264723 },
	{ lng: 22.9740132, lat: 48.6302023 },
	{ lng: 22.9742921, lat: 48.6312092 },
	{ lng: 22.974378, lat: 48.6339603 },
	{ lng: 22.9740561, lat: 48.6361299 },
	{ lng: 22.9756011, lat: 48.6396039 },
	{ lng: 22.9781116, lat: 48.64088 },
	{ lng: 22.9785408, lat: 48.6417874 },
	{ lng: 22.9806221, lat: 48.6438858 },
	{ lng: 22.980708, lat: 48.6454028 },
	{ lng: 22.9815448, lat: 48.6470899 },
	{ lng: 22.9818882, lat: 48.6487627 },
	{ lng: 22.9820598, lat: 48.6510593 },
	{ lng: 22.9825533, lat: 48.6536534 },
	{ lng: 22.9839052, lat: 48.6551276 },
	{ lng: 22.984742, lat: 48.6562899 },
	{ lng: 22.9853858, lat: 48.6569844 },
	{ lng: 22.9854072, lat: 48.6588838 },
	{ lng: 22.985257, lat: 48.6598334 },
	{ lng: 22.9858364, lat: 48.6623137 },
	{ lng: 22.985536, lat: 48.6652048 },
	{ lng: 22.9854287, lat: 48.6674014 },
	{ lng: 22.9844845, lat: 48.6694279 },
	{ lng: 22.9874028, lat: 48.6730979 },
	{ lng: 22.9881323, lat: 48.6733813 },
	{ lng: 22.9888404, lat: 48.6741323 },
	{ lng: 22.9918231, lat: 48.6791339 },
	{ lng: 22.9913939, lat: 48.6798706 },
	{ lng: 22.9921449, lat: 48.681429 },
	{ lng: 22.992338, lat: 48.6855374 },
	{ lng: 22.9927457, lat: 48.6865432 },
	{ lng: 22.9927672, lat: 48.6875064 },
	{ lng: 22.9927886, lat: 48.6881014 },
	{ lng: 22.9912008, lat: 48.6893479 },
	{ lng: 22.9909218, lat: 48.6897729 },
	{ lng: 22.9905141, lat: 48.6934981 },
	{ lng: 22.9900635, lat: 48.6950845 },
	{ lng: 22.9898919, lat: 48.695651 },
	{ lng: 22.9898704, lat: 48.6963733 },
	{ lng: 22.9890765, lat: 48.6974214 },
	{ lng: 22.988025, lat: 48.6983278 },
	{ lng: 22.9878534, lat: 48.6994466 },
	{ lng: 22.9875744, lat: 48.6999565 },
	{ lng: 22.9878319, lat: 48.700877 },
	{ lng: 22.9876173, lat: 48.7012594 },
	{ lng: 22.9865874, lat: 48.7022223 },
	{ lng: 22.986523, lat: 48.7029021 },
	{ lng: 22.9868878, lat: 48.7041624 },
	{ lng: 22.9872955, lat: 48.70606 },
	{ lng: 22.988068, lat: 48.7068246 },
	{ lng: 22.9882611, lat: 48.7073061 },
	{ lng: 22.9890336, lat: 48.7080141 },
	{ lng: 22.9895485, lat: 48.7089769 },
	{ lng: 22.9901708, lat: 48.7098123 },
	{ lng: 22.9902996, lat: 48.7100247 },
	{ lng: 22.9897202, lat: 48.7101663 },
	{ lng: 22.9890979, lat: 48.7103645 },
	{ lng: 22.9879607, lat: 48.7105911 },
	{ lng: 22.9869951, lat: 48.7105344 },
	{ lng: 22.9856432, lat: 48.7103362 },
	{ lng: 22.9843772, lat: 48.7098831 },
	{ lng: 22.9835404, lat: 48.709515 },
	{ lng: 22.9832614, lat: 48.7092601 },
	{ lng: 22.9821671, lat: 48.7091752 },
	{ lng: 22.9809655, lat: 48.7091893 },
	{ lng: 22.9796351, lat: 48.7090619 },
	{ lng: 22.978927, lat: 48.7090336 },
	{ lng: 22.9789055, lat: 48.7082973 },
	{ lng: 22.9790128, lat: 48.70783 },
	{ lng: 22.9778327, lat: 48.7079716 },
	{ lng: 22.9769314, lat: 48.7080141 },
	{ lng: 22.975365, lat: 48.7081273 },
	{ lng: 22.9737986, lat: 48.7082548 },
	{ lng: 22.9726399, lat: 48.7082689 },
	{ lng: 22.9721464, lat: 48.7081557 },
	{ lng: 22.9713095, lat: 48.7074901 },
	{ lng: 22.9706658, lat: 48.7066547 },
	{ lng: 22.9703439, lat: 48.7060883 },
	{ lng: 22.9696358, lat: 48.7049554 },
	{ lng: 22.96955, lat: 48.7040208 },
	{ lng: 22.9692496, lat: 48.7037234 },
	{ lng: 22.9679621, lat: 48.7036526 },
	{ lng: 22.9662455, lat: 48.7032136 },
	{ lng: 22.9652585, lat: 48.7032844 },
	{ lng: 22.9640139, lat: 48.7032986 },
	{ lng: 22.9631127, lat: 48.7024489 },
	{ lng: 22.9625762, lat: 48.7019816 },
	{ lng: 22.96219, lat: 48.7013868 },
	{ lng: 22.9617823, lat: 48.7009195 },
	{ lng: 22.9615677, lat: 48.7006221 },
	{ lng: 22.9612244, lat: 48.7002255 },
	{ lng: 22.9600228, lat: 48.7000981 },
	{ lng: 22.958392, lat: 48.6998432 },
	{ lng: 22.9573835, lat: 48.6997299 },
	{ lng: 22.9567612, lat: 48.7003247 },
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

export default function VyzhynBigRouteMap() {
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
			initVyzhynBigRouteMapCb?: () => void
		}

		let pollTimer: ReturnType<typeof setInterval> | null = null

		const createOrUpdateMap = () => {
			const el = containerRef.current
			if (!el || !win.google?.maps) return false
			const g = win.google.maps

			if (!mapRef.current) {
				mapRef.current = new g.Map(el, {
					center: VYZHYN_BIG_POS,
					zoom: VYZHYN_BIG_ZOOM,
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
				map.setCenter?.(VYZHYN_BIG_POS)
				map.setZoom?.(VYZHYN_BIG_ZOOM)
			}

			applyRouteToMap(mapRef.current as any, g, VYZHYN_BIG_ROUTE_PATH, polylineRef, startMarkerRef, endMarkerRef)
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
			delete win.initVyzhynBigRouteMapCb
		}

		win.initVyzhynBigRouteMapCb = onApiReady

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
			script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&language=uk&region=UA&callback=initVyzhynBigRouteMapCb`
			script.async = true
			script.defer = true
			script.onerror = () => {
				setUseIframeFallback(true)
				delete win.initVyzhynBigRouteMapCb
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
			if (win.initVyzhynBigRouteMapCb) delete win.initVyzhynBigRouteMapCb
		}
	}, [])

	const iframeSrc = buildIframeFallbackSrc(VYZHYN_BIG_POS, VYZHYN_BIG_ZOOM)

	return (
		<div className='relative mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm ring-1 ring-slate-900/5'>
			{useIframeFallback ? (
				<iframe
					title='Гора Великий Вижень — мапа'
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

