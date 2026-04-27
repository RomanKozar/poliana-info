'use client'

import { useCallback, useEffect, useRef, useState, type MutableRefObject } from 'react'
import { FaCompress, FaExpand } from 'react-icons/fa'
import { quadroRideRouteOptions, type QuadroRouteOption } from '@/data/quadro-ride-page'

const MAP_ZOOM_MIN = 1
const MAP_ZOOM_MAX = 21

/** Polyline + fitBounds для маршрутів із полем `path` (наприклад «Виклик» з KMZ). */
function applyQuadroRouteToMap(
	map: {
		setCenter: (x: unknown) => void
		setZoom: (z: number) => void
		getZoom?: () => number | undefined
		fitBounds: (b: unknown, padding?: number) => void
	},
	g: {
		LatLng: new (lat: number, lng: number) => unknown
		LatLngBounds: new () => { extend: (p: unknown) => void }
		Polyline: new (opts: Record<string, unknown>) => { setMap: (m: unknown | null) => void }
	},
	option: QuadroRouteOption,
	polylineRef: MutableRefObject<{ setMap: (m: unknown | null) => void } | null>,
) {
	if (polylineRef.current) {
		polylineRef.current.setMap(null)
		polylineRef.current = null
	}
	const pts = option.path
	if (pts && pts.length > 0) {
		const path = pts.map(p => new g.LatLng(p.lat, p.lng))
		const stroke = option.pathStrokeColor ?? '#39FF14'
		polylineRef.current = new g.Polyline({
			path,
			strokeColor: stroke,
			strokeOpacity: 0.95,
			strokeWeight: 5,
			geodesic: true,
		})
		polylineRef.current.setMap(map)
		const bounds = new g.LatLngBounds()
		for (const ll of path) bounds.extend(ll)
		map.fitBounds(bounds, option.pathFitPadding ?? 40)
		const extra = option.pathZoomOutAfterFit
		if (extra && extra > 0 && map.getZoom) {
			const z = map.getZoom()
			if (typeof z === 'number') {
				map.setZoom(Math.max(MAP_ZOOM_MIN, z - extra))
			}
		}
	} else {
		map.setCenter(option.end)
		map.setZoom(option.zoom)
	}
}

/** Без `q=` — без червоного піна; класичний embed лишає кнопки Google (fallback). */
function buildIframeFallbackSrc(end: QuadroRouteOption['end'], zoom: number) {
	return `https://maps.google.com/maps?hl=uk&ll=${end.lat},${end.lng}&z=${zoom}&t=k&output=embed`
}

export function QuadroRideRouteMap() {
	const hasApiKey = Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim())
	const [active, setActive] = useState<QuadroRouteOption>(quadroRideRouteOptions[0])
	const [useIframeFallback, setUseIframeFallback] = useState(!hasApiKey)
	const mapShellRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	const mapRef = useRef<unknown>(null)
	const polylineRef = useRef<{ setMap: (m: unknown | null) => void } | null>(null)
	const activeRef = useRef(active)
	const [isMapFullscreen, setIsMapFullscreen] = useState(false)

	useEffect(() => {
		activeRef.current = active
	}, [active])

	/** Ініціалізація JS API (один раз): супутник, без UI, без власних міток. */
	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim()
		if (!apiKey) {
			setUseIframeFallback(true)
			return
		}

		const win = window as Window & {
			google?: { maps: any }
			initQuadroRideRouteMapCb?: () => void
		}

		let pollTimer: ReturnType<typeof setInterval> | null = null

		const createOrUpdateMap = () => {
			const el = containerRef.current
			if (!el || !win.google?.maps) return false
			const g = win.google.maps
			const end = activeRef.current.end
			const zoom = activeRef.current.zoom

			if (mapRef.current) {
				const map = mapRef.current as any
				applyQuadroRouteToMap(map, g, activeRef.current, polylineRef)
				return true
			}

			mapRef.current = new g.Map(el, {
				center: end,
				zoom,
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
				// На roadmap діють; на супутнику частина підписів може лишатися з боку Google.
				styles: [
					{ featureType: 'poi', stylers: [{ visibility: 'off' }] },
					{ featureType: 'transit', stylers: [{ visibility: 'off' }] },
					{ featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
					{ featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
					{ elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
				],
			})
			applyQuadroRouteToMap(mapRef.current as any, g, activeRef.current, polylineRef)
			return true
		}

		if (createOrUpdateMap()) {
			return () => {
				if (pollTimer) clearInterval(pollTimer)
				if (polylineRef.current) {
					polylineRef.current.setMap(null)
					polylineRef.current = null
				}
				mapRef.current = null
			}
		}

		const onApiReady = () => {
			createOrUpdateMap()
			delete win.initQuadroRideRouteMapCb
		}

		win.initQuadroRideRouteMapCb = onApiReady

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
			script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&language=uk&region=UA&callback=initQuadroRideRouteMapCb`
			script.async = true
			script.defer = true
			script.onerror = () => {
				setUseIframeFallback(true)
				delete win.initQuadroRideRouteMapCb
			}
			document.head.appendChild(script)
		}

		return () => {
			if (pollTimer) clearInterval(pollTimer)
			if (polylineRef.current) {
				polylineRef.current.setMap(null)
				polylineRef.current = null
			}
			mapRef.current = null
			if (win.initQuadroRideRouteMapCb) delete win.initQuadroRideRouteMapCb
		}
	}, [])

	useEffect(() => {
		const win = window as Window & { google?: { maps: any } }
		const g = win.google?.maps
		const m = mapRef.current as Parameters<typeof applyQuadroRouteToMap>[0] | null
		if (!g || !m?.fitBounds) return
		applyQuadroRouteToMap(m, g, active, polylineRef)
	}, [active])

	useEffect(() => {
		const onFsChange = () => {
			const shell = mapShellRef.current
			setIsMapFullscreen(!!document.fullscreenElement && document.fullscreenElement === shell)
			const map = mapRef.current as any
			const evt = (window as Window & { google?: { maps?: { event: { trigger: (m: unknown, e: string) => void } } } })
				.google?.maps?.event
			if (map && evt) {
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						evt.trigger(map, 'resize')
					})
				})
			}
		}
		document.addEventListener('fullscreenchange', onFsChange)
		return () => document.removeEventListener('fullscreenchange', onFsChange)
	}, [])

	const adjustZoom = useCallback((delta: number) => {
		const map = mapRef.current as { getZoom?: () => number | undefined; setZoom?: (z: number) => void } | null
		if (!map?.getZoom || !map?.setZoom) return
		const z = map.getZoom()
		if (typeof z !== 'number') return
		map.setZoom(Math.min(MAP_ZOOM_MAX, Math.max(MAP_ZOOM_MIN, z + delta)))
	}, [])

	const toggleMapFullscreen = useCallback(async () => {
		const el = mapShellRef.current
		if (!el) return
		try {
			if (!document.fullscreenElement) {
				await el.requestFullscreen()
			} else {
				await document.exitFullscreen()
			}
		} catch {
			/* ignore */
		}
	}, [])

	const iframeSrc = buildIframeFallbackSrc(active.end, active.zoom)

	return (
		<div className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6'>
			<h2 className='text-xl font-bold text-[#2D333D] sm:text-2xl'>Маршрут на карті</h2>
			<p className='mt-2 max-w-3xl text-sm text-slate-600'>
				Оберіть формат поїздки — карта покаже орієнтовну зону фінішу (супутниковий знімок).
			</p>

			<div
				className='mt-5 flex flex-wrap gap-2'
				role='tablist'
				aria-label='Доступні маршрути Quadro Ride'
			>
				{quadroRideRouteOptions.map(r => {
					const selected = r.id === active.id
					return (
						<button
							key={r.id}
							type='button'
							role='tab'
							aria-selected={selected}
							className={
								selected
									? 'cursor-pointer rounded-full bg-[#53C4DA] px-4 py-2 text-sm font-semibold text-white shadow-sm'
									: 'cursor-pointer rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-[#53C4DA]/50 hover:text-[#2D333D]'
							}
							onClick={() => setActive(r)}
						>
							{r.name}
						</button>
					)
				})}
			</div>

			<div className='mt-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4'>
				<p className='text-sm font-semibold text-[#2D333D]'>{active.duration}</p>
				<p className='mt-1 text-sm leading-relaxed text-slate-600'>{active.description}</p>
			</div>

			<div
				ref={mapShellRef}
				className={
					isMapFullscreen
						? 'relative flex h-screen max-h-screen w-full flex-col overflow-hidden rounded-none border-0 shadow-none'
						: 'relative mt-5 overflow-hidden rounded-xl border border-slate-200 shadow-sm'
				}
			>
				{useIframeFallback ? (
					<iframe
						title={`Карта: ${active.name}`}
						src={iframeSrc}
						className='h-[min(420px,55vh)] w-full min-h-[280px]'
						loading='lazy'
						referrerPolicy='no-referrer-when-downgrade'
					/>
				) : (
					<>
						<div
							ref={containerRef}
							className={
								isMapFullscreen
									? 'min-h-0 w-full flex-1'
									: 'h-[min(420px,55vh)] w-full min-h-[280px]'
							}
							role='presentation'
						/>
						<div className='pointer-events-none absolute inset-0 z-[5]'>
							<div className='pointer-events-auto absolute right-3 top-3 flex flex-col items-center gap-2 sm:right-4 sm:top-4'>
								<button
									type='button'
									onClick={toggleMapFullscreen}
									className='flex size-11 cursor-pointer items-center justify-center rounded-full border border-slate-200/90 bg-white text-[#3d4550] shadow-md transition hover:bg-slate-50 focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#53C4DA]'
									aria-label={isMapFullscreen ? 'Вийти з повноекранного режиму' : 'На весь екран'}
								>
									{isMapFullscreen ? (
										<FaCompress className='size-4' aria-hidden />
									) : (
										<FaExpand className='size-4' aria-hidden />
									)}
								</button>
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
			</div>
			{useIframeFallback && hasApiKey === false && (
				<p className='mt-2 text-xs text-slate-500'>
					Щоб прибрати кнопки Google на карті, додайте <code className='rounded bg-slate-100 px-1'>NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> у
					налаштування середовища.
				</p>
			)}
		</div>
	)
}
