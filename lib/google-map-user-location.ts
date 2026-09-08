/** Синя мітка «Ви тут» + коло точності на Google Maps. */
export function attachGoogleMapUserLocation(
	map: unknown,
	maps: {
		Marker: new (opts: Record<string, unknown>) => { setMap: (m: unknown | null) => void; setPosition: (p: unknown) => void }
		Circle: new (opts: Record<string, unknown>) => {
			setMap: (m: unknown | null) => void
			setCenter: (p: unknown) => void
			setRadius: (r: number) => void
		}
		SymbolPath: { CIRCLE: unknown }
	},
	options?: { zIndex?: number }
): () => void {
	if (typeof navigator === 'undefined' || !navigator.geolocation) {
		return () => {}
	}

	const zIndex = options?.zIndex ?? 10_000

	let marker: InstanceType<typeof maps.Marker> | null = null
	let accuracyCircle: InstanceType<typeof maps.Circle> | null = null
	let watchId: number | undefined

	const updatePosition = (position: GeolocationPosition) => {
		const pos = { lat: position.coords.latitude, lng: position.coords.longitude }

		if (!marker) {
			marker = new maps.Marker({
				map,
				position: pos,
				title: 'Ваше місцезнаходження',
				icon: {
					path: maps.SymbolPath.CIRCLE,
					fillColor: '#4285F4',
					fillOpacity: 1,
					strokeColor: '#ffffff',
					strokeWeight: 2,
					scale: 8,
				},
				zIndex,
				optimized: false,
			})
		} else {
			marker.setPosition(pos)
		}

		const accuracy = position.coords.accuracy
		if (accuracy > 0) {
			if (!accuracyCircle) {
				accuracyCircle = new maps.Circle({
					map,
					center: pos,
					radius: accuracy,
					fillColor: '#4285F4',
					fillOpacity: 0.15,
					strokeColor: '#4285F4',
					strokeOpacity: 0.35,
					strokeWeight: 1,
					zIndex: zIndex - 1,
				})
			} else {
				accuracyCircle.setCenter(pos)
				accuracyCircle.setRadius(accuracy)
			}
		}
	}

	watchId = navigator.geolocation.watchPosition(updatePosition, () => {}, {
		enableHighAccuracy: true,
		maximumAge: 15_000,
		timeout: 12_000,
	})

	return () => {
		if (watchId !== undefined) navigator.geolocation.clearWatch(watchId)
		marker?.setMap(null)
		accuracyCircle?.setMap(null)
		marker = null
		accuracyCircle = null
	}
}
