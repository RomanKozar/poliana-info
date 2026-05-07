'use client'

import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react'

const ROZHOK_POS = { lat: 48.608805906666305, lng: 23.01986710639653 }
const ROZHOK_ZOOM = 13
const MAP_ZOOM_MIN = 1
const MAP_ZOOM_MAX = 21

const ROZHOK_ROUTE_PATH: readonly { lat: number; lng: number }[] = [
	{ lng: 22.966831, lat: 48.6213829 },
	{ lng: 22.9669066, lat: 48.6210069 },
	{ lng: 22.9674425, lat: 48.6209149 },
	{ lng: 22.9682209, lat: 48.6207728 },
	{ lng: 22.9686501, lat: 48.6205884 },
	{ lng: 22.9690518, lat: 48.6209858 },
	{ lng: 22.9696097, lat: 48.62139 },
	{ lng: 22.9697921, lat: 48.6216453 },
	{ lng: 22.9699209, lat: 48.6223404 },
	{ lng: 22.9698243, lat: 48.6227233 },
	{ lng: 22.9699316, lat: 48.6232056 },
	{ lng: 22.9700496, lat: 48.6232552 },
	{ lng: 22.9704037, lat: 48.6231559 },
	{ lng: 22.9707041, lat: 48.6230779 },
	{ lng: 22.9713585, lat: 48.6230708 },
	{ lng: 22.9714766, lat: 48.6229999 },
	{ lng: 22.9714229, lat: 48.6226099 },
	{ lng: 22.9714766, lat: 48.6219574 },
	{ lng: 22.9716375, lat: 48.6215319 },
	{ lng: 22.971734, lat: 48.6211631 },
	{ lng: 22.9716702, lat: 48.6210423 },
	{ lng: 22.9716375, lat: 48.6208085 },
	{ lng: 22.9716268, lat: 48.6207163 },
	{ lng: 22.9719599, lat: 48.6206452 },
	{ lng: 22.9724958, lat: 48.6204822 },
	{ lng: 22.9731288, lat: 48.6202553 },
	{ lng: 22.9737082, lat: 48.6200283 },
	{ lng: 22.9739335, lat: 48.6199361 },
	{ lng: 22.9743095, lat: 48.6195742 },
	{ lng: 22.9747918, lat: 48.6192765 },
	{ lng: 22.9751887, lat: 48.6189574 },
	{ lng: 22.9755213, lat: 48.6185531 },
	{ lng: 22.9755964, lat: 48.618241 },
	{ lng: 22.9757037, lat: 48.6181205 },
	{ lng: 22.9760041, lat: 48.6179857 },
	{ lng: 22.9766264, lat: 48.6178722 },
	{ lng: 22.9767981, lat: 48.6176594 },
	{ lng: 22.9771628, lat: 48.6174608 },
	{ lng: 22.9776134, lat: 48.6173757 },
	{ lng: 22.977989, lat: 48.6170991 },
	{ lng: 22.9781713, lat: 48.6167941 },
	{ lng: 22.9786971, lat: 48.6162551 },
	{ lng: 22.9788687, lat: 48.6157444 },
	{ lng: 22.9793114, lat: 48.6159115 },
	{ lng: 22.9798021, lat: 48.6158792 },
	{ lng: 22.9801347, lat: 48.6156664 },
	{ lng: 22.9806068, lat: 48.6153117 },
	{ lng: 22.9807677, lat: 48.6152053 },
	{ lng: 22.9815298, lat: 48.6152428 },
	{ lng: 22.9823667, lat: 48.6154982 },
	{ lng: 22.9835039, lat: 48.6153847 },
	{ lng: 22.9844052, lat: 48.6150584 },
	{ lng: 22.9856926, lat: 48.6147321 },
	{ lng: 22.9867655, lat: 48.6145477 },
	{ lng: 22.9878945, lat: 48.6141524 },
	{ lng: 22.9881388, lat: 48.6134696 },
	{ lng: 22.9882675, lat: 48.6128028 },
	{ lng: 22.9881173, lat: 48.6121644 },
	{ lng: 22.9881603, lat: 48.6115685 },
	{ lng: 22.9884392, lat: 48.6113132 },
	{ lng: 22.99007, lat: 48.611072 },
	{ lng: 22.991336, lat: 48.6108166 },
	{ lng: 22.9923874, lat: 48.6105045 },
	{ lng: 22.9935891, lat: 48.6104761 },
	{ lng: 22.9945976, lat: 48.6106747 },
	{ lng: 22.9952842, lat: 48.6108166 },
	{ lng: 22.9958636, lat: 48.6106606 },
	{ lng: 22.9962927, lat: 48.6101498 },
	{ lng: 22.9967004, lat: 48.6096249 },
	{ lng: 22.9974943, lat: 48.6093128 },
	{ lng: 22.9977733, lat: 48.608575 },
	{ lng: 22.9980737, lat: 48.6079365 },
	{ lng: 22.9994685, lat: 48.6078089 },
	{ lng: 23.0009276, lat: 48.6079082 },
	{ lng: 23.0023009, lat: 48.6081352 },
	{ lng: 23.0035025, lat: 48.608348 },
	{ lng: 23.0045325, lat: 48.6085466 },
	{ lng: 23.006013, lat: 48.6089155 },
	{ lng: 23.0064637, lat: 48.6088871 },
	{ lng: 23.0069572, lat: 48.6090858 },
	{ lng: 23.0078799, lat: 48.6089155 },
	{ lng: 23.0086523, lat: 48.6089864 },
	{ lng: 23.0104762, lat: 48.6090999 },
	{ lng: 23.0110771, lat: 48.6088729 },
	{ lng: 23.0128151, lat: 48.6084331 },
	{ lng: 23.0140811, lat: 48.6084899 },
	{ lng: 23.0152828, lat: 48.6084757 },
	{ lng: 23.0158192, lat: 48.6085466 },
	{ lng: 23.0170637, lat: 48.6085324 },
	{ lng: 23.017965, lat: 48.6080926 },
	{ lng: 23.0188233, lat: 48.607894 },
	{ lng: 23.0191451, lat: 48.6076812 },
	{ lng: 23.0198103, lat: 48.6073265 },
	{ lng: 23.0201322, lat: 48.6069576 },
	{ lng: 23.0201932, lat: 48.6066804 },
]

function buildFlagSvgDataUrl(color: string) {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
  <path d="M14 6c-1.1 0-2 .9-2 2v34a2 2 0 1 0 4 0V29.2c5.7-3.4 11.7 3.6 18 0V10.8c-6.3 3.6-12.3-3.4-18 0V8c0-1.1-.9-2-2-2z" fill="${color}"/>
  <path d="M14 6c-1.1 0-2 .9-2 2v34a2 2 0 1 0 4 0V8c0-1.1-.9-2-2-2z" fill="#111827" opacity=".55"/>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

function applyRouteToMap(
	map: {
		fitBounds: (b: unknown, padding?: number) => void
	},
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
	polylineRef.current.setMap(map)

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

/** Без `q=` — без червоного піна; embed лишає кнопки Google (fallback). */
function buildIframeFallbackSrc(end: { lat: number; lng: number }, zoom: number) {
	return `https://maps.google.com/maps?hl=uk&ll=${end.lat},${end.lng}&z=${zoom}&t=k&output=embed`
}

export default function RozhokRouteMap() {
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
			initRozhokRouteMapCb?: () => void
		}

		let pollTimer: ReturnType<typeof setInterval> | null = null

		const createOrUpdateMap = () => {
			const el = containerRef.current
			if (!el || !win.google?.maps) return false
			const g = win.google.maps

			if (!mapRef.current) {
				mapRef.current = new g.Map(el, {
					center: ROZHOK_POS,
					zoom: ROZHOK_ZOOM,
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
				map.setCenter?.(ROZHOK_POS)
				map.setZoom?.(ROZHOK_ZOOM)
			}

			applyRouteToMap(mapRef.current as any, g, ROZHOK_ROUTE_PATH, polylineRef, startMarkerRef, endMarkerRef)
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
			delete win.initRozhokRouteMapCb
		}

		win.initRozhokRouteMapCb = onApiReady

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
			script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&language=uk&region=UA&callback=initRozhokRouteMapCb`
			script.async = true
			script.defer = true
			script.onerror = () => {
				setUseIframeFallback(true)
				delete win.initRozhokRouteMapCb
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
			if (win.initRozhokRouteMapCb) delete win.initRozhokRouteMapCb
		}
	}, [])

	const iframeSrc = buildIframeFallbackSrc(ROZHOK_POS, ROZHOK_ZOOM)

	return (
		<div className='relative mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm ring-1 ring-slate-900/5'>
			{useIframeFallback ? (
				<iframe
					title='Гора Рожок — мапа'
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
					Щоб карта була інтерактивною (як на Quadro Ride), додайте{' '}
					<code className='rounded bg-slate-100 px-1'>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>.
				</p>
			) : null}
		</div>
	)
}

