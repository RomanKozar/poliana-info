import {
	diningMapMarkers,
	pharmacyMapMarkers,
	shopsMapMarkers,
	spaMapMarkers,
	touristCityMapMarkers,
} from '@/lib/home-map-markers'
import {
	diningMapPinIconDataUrl,
	pharmacyMapPinIconDataUrl,
	shoppingMapPinIconDataUrl,
	spaMapPinIconDataUrl,
	touristCityMapPinIconDataUrl,
} from '@/lib/home-map-pin-icons'
import { hotelMapPinIconDataUrl } from '@/lib/google-map-hotel-pin'
import {
	hotelInfoWindowHtml,
	homeMapMarkerToUnifiedCard,
	unifiedMapCardInfoWindowHtml,
} from '@/lib/map-info-window-html'
import { syncInfoWindowGalleryNav, toggleIwHeartActive } from '@/lib/map-info-window-ui'
import type { PolyanaHotel } from '@/lib/polyana-hotels'
import type { HomeMapLayerId } from '@/lib/home-map-layers'

/**
 * Ті самі мітки, що на головній карті (їжа, магазини, аптеки, SPA, туристичні), плюс один маркер поточного готелю.
 * Інші заклади проживання з головної не показуються.
 */
export function attachHotelDetailMapHomeMarkers(args: {
	map: any
	maps: any
	hotel: PolyanaHotel
	mapRootEl: HTMLElement
}): { detach: () => void; layerMarkers: Partial<Record<HomeMapLayerId, any[]>> } {
	const { map, maps, hotel, mapRootEl } = args

	let activeInfoWindow: any = null
	const layerMarkers: Partial<Record<HomeMapLayerId, any[]>> = {
		hotels: [],
		dining: [],
		shops: [],
		pharmacy: [],
		spa: [],
		tourist: [],
	}

	const onInfoWindowUiClick = (e: MouseEvent) => {
		const next =
			e.target instanceof Element ? e.target.closest('.polyana-accommodation-iw-gallery-btn--next') : null
		const prev =
			e.target instanceof Element ? e.target.closest('.polyana-accommodation-iw-gallery-btn--prev') : null
		if (next || prev) {
			e.preventDefault()
			e.stopPropagation()
			e.stopImmediatePropagation()
			const gal = (next || prev)!.closest('[data-iw-gallery]') as HTMLElement | null
			if (!gal) return
			// If images aren't loaded yet, don't allow paging.
			syncInfoWindowGalleryNav(gal)
			if (gal.dataset.ready !== '1') return
			const total = Math.max(1, parseInt(gal.dataset.total || '1', 10))
			let idx = parseInt(gal.dataset.idx || '0', 10)
			if (next) idx = (idx + 1) % total
			else idx = (idx - 1 + total) % total
			gal.dataset.idx = String(idx)
			const track = gal.querySelector<HTMLElement>('[data-gallery-track]')
			if (track) {
				const step = 100 / total
				track.style.transform = `translate3d(-${step * idx}%,0,0)`
			}
			gal.querySelectorAll<HTMLElement>('.polyana-accommodation-iw-dot').forEach((dot, i) => {
				dot.classList.toggle('polyana-accommodation-iw-dot--on', i === idx)
			})
			syncInfoWindowGalleryNav(gal)
			return
		}
		const heart =
			e.target instanceof Element ? e.target.closest('.polyana-accommodation-iw-heart') : null
		if (heart) {
			e.preventDefault()
			e.stopPropagation()
			e.stopImmediatePropagation()
			toggleIwHeartActive(heart)
			return
		}
		const closer =
			e.target instanceof Element ? e.target.closest('.polyana-accommodation-iw-close') : null
		if (!closer) return
		e.preventDefault()
		e.stopPropagation()
		e.stopImmediatePropagation()
		if (activeInfoWindow) {
			activeInfoWindow.close()
			activeInfoWindow = null
		}
	}

	mapRootEl.addEventListener('click', onInfoWindowUiClick, true)
	// When InfoWindow HTML images load, re-sync nav visibility.
	const onIwImageLoad = (e: Event) => {
		const t = e.target
		if (!(t instanceof HTMLImageElement)) return
		if (!t.classList.contains('polyana-accommodation-iw-img')) return
		const gal = t.closest('[data-iw-gallery]') as HTMLElement | null
		if (!gal) return
		syncInfoWindowGalleryNav(gal)
	}
	mapRootEl.addEventListener('load', onIwImageLoad, true)

	const diningIcon = {
		url: diningMapPinIconDataUrl,
		scaledSize: new maps.Size(44, 52),
		anchor: new maps.Point(22, 52),
	}
	const shoppingIcon = {
		url: shoppingMapPinIconDataUrl,
		scaledSize: new maps.Size(44, 52),
		anchor: new maps.Point(22, 52),
	}
	const pharmacyIcon = {
		url: pharmacyMapPinIconDataUrl,
		scaledSize: new maps.Size(44, 52),
		anchor: new maps.Point(22, 52),
	}
	const hotelIcon = {
		url: hotelMapPinIconDataUrl,
		scaledSize: new maps.Size(44, 52),
		anchor: new maps.Point(22, 52),
	}
	const spaIcon = {
		url: spaMapPinIconDataUrl,
		scaledSize: new maps.Size(44, 52),
		anchor: new maps.Point(22, 52),
	}
	const touristCityIcon = {
		url: touristCityMapPinIconDataUrl,
		scaledSize: new maps.Size(44, 52),
		anchor: new maps.Point(22, 52),
	}

	const hotelMarker = new maps.Marker({
		position: hotel.position,
		map,
		title: hotel.name,
		icon: hotelIcon,
	})
	layerMarkers.hotels?.push(hotelMarker)

	const hotelIw = new maps.InfoWindow({
		content: hotelInfoWindowHtml(hotel),
		headerDisabled: true,
	})
	hotelMarker.addListener('click', () => {
		if (activeInfoWindow) activeInfoWindow.close()
		hotelIw.open({ anchor: hotelMarker, map })
		activeInfoWindow = hotelIw
	})

	function openUnified(marker: any, iw: any) {
		marker.addListener('click', () => {
			if (activeInfoWindow) activeInfoWindow.close()
			iw.open({ anchor: marker, map })
			activeInfoWindow = iw
		})
	}

	diningMapMarkers.forEach(place => {
		const marker = new maps.Marker({
			position: place.position,
			map,
			title: place.name,
			icon: diningIcon,
		})
		layerMarkers.dining?.push(marker)
		const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
			`${place.name}, ${place.address}`
		)}`
		const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, ${place.address}`)}`
		const iw = new maps.InfoWindow({
			content: unifiedMapCardInfoWindowHtml(
				homeMapMarkerToUnifiedCard({
					name: place.name,
					address: place.address,
					category: place.category,
					image: place.image,
					featurePill: 'Їжа',
					routeLink,
					saveLink,
				})
			),
			headerDisabled: true,
		})
		openUnified(marker, iw)
	})

	shopsMapMarkers.forEach(store => {
		const marker = new maps.Marker({
			position: store.position,
			map,
			title: store.name,
			icon: shoppingIcon,
		})
		layerMarkers.shops?.push(marker)
		const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
			`${store.name}, ${store.address}`
		)}`
		const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${store.name}, ${store.address}`)}`
		const iw = new maps.InfoWindow({
			content: unifiedMapCardInfoWindowHtml(
				homeMapMarkerToUnifiedCard({
					name: store.name,
					address: store.address,
					category: store.category,
					image: store.image,
					featurePill: 'Магазин',
					routeLink,
					saveLink,
				})
			),
			headerDisabled: true,
		})
		openUnified(marker, iw)
	})

	pharmacyMapMarkers.forEach(ph => {
		const marker = new maps.Marker({
			position: ph.position,
			map,
			title: ph.name,
			icon: pharmacyIcon,
		})
		layerMarkers.pharmacy?.push(marker)
		const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
			`${ph.name}, ${ph.address}`
		)}`
		const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${ph.name}, ${ph.address}`)}`
		const iw = new maps.InfoWindow({
			content: unifiedMapCardInfoWindowHtml(
				homeMapMarkerToUnifiedCard({
					name: ph.name,
					address: ph.address,
					category: ph.category,
					image: ph.image,
					featurePill: ph.badge,
					routeLink,
					saveLink,
				})
			),
			headerDisabled: true,
		})
		openUnified(marker, iw)
	})

	spaMapMarkers.forEach(spot => {
		const marker = new maps.Marker({
			position: spot.position,
			map,
			title: spot.name,
			icon: spaIcon,
		})
		layerMarkers.spa?.push(marker)
		const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
			`${spot.name}, ${spot.address}`
		)}`
		const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${spot.name}, ${spot.address}`)}`
		const iw = new maps.InfoWindow({
			content: unifiedMapCardInfoWindowHtml(
				homeMapMarkerToUnifiedCard({
					name: spot.name,
					address: spot.address,
					category: spot.category,
					image: spot.image,
					featurePill: 'SPA / чани',
					routeLink,
					saveLink,
				})
			),
			headerDisabled: true,
		})
		openUnified(marker, iw)
	})

	touristCityMapMarkers.forEach(city => {
		const marker = new maps.Marker({
			position: city.position,
			map,
			title: city.name,
			icon: touristCityIcon,
		})
		layerMarkers.tourist?.push(marker)
		const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
			`${city.name}, ${city.address}`
		)}`
		const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${city.name}, ${city.address}`)}`
		const iw = new maps.InfoWindow({
			content: unifiedMapCardInfoWindowHtml(
				homeMapMarkerToUnifiedCard({
					name: city.name,
					address: city.address,
					category: city.category,
					image: city.image,
					featurePill: 'Огляд',
					routeLink,
					saveLink,
				})
			),
			headerDisabled: true,
		})
		openUnified(marker, iw)
	})

	map.setCenter(hotel.position)
	map.setZoom(18)

	return {
		layerMarkers,
		detach: () => {
			mapRootEl.removeEventListener('click', onInfoWindowUiClick, true)
			mapRootEl.removeEventListener('load', onIwImageLoad, true)
			// ensure markers are removed on detach
			for (const key of Object.keys(layerMarkers) as HomeMapLayerId[]) {
				for (const m of layerMarkers[key] ?? []) m.setMap?.(null)
			}
		},
	}
}
