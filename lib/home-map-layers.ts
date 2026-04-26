export type HomeMapLayerId = 'hotels' | 'dining' | 'shops' | 'pharmacy' | 'spa' | 'tourist'

export const HOME_MAP_LAYER_ORDER: HomeMapLayerId[] = [
	'hotels',
	'dining',
	'shops',
	'pharmacy',
	'spa',
	'tourist',
]

/** Старт: нічого не вибрано — міток на карті немає, доки не позначать потрібні шари. */
export const initialHomeMapLayers: Record<HomeMapLayerId, boolean> = {
	hotels: false,
	dining: false,
	shops: false,
	pharmacy: false,
	spa: false,
	tourist: false,
}

const allHomeMapLayersOn: Record<HomeMapLayerId, boolean> = {
	hotels: true,
	dining: true,
	shops: true,
	pharmacy: true,
	spa: true,
	tourist: true,
}

export function applyHomeMapMarkersForLayers(
	map: any,
	buckets: Partial<Record<HomeMapLayerId, any[]>>,
	visibility: Record<HomeMapLayerId, boolean>
) {
	if (!map) return
	for (const key of HOME_MAP_LAYER_ORDER) {
		const list = buckets[key] ?? []
		for (const marker of list) {
			marker.setMap(visibility[key] ? map : null)
		}
	}
}

/** Якщо в легенді нічого не вибрано — на карті показуємо всі мітки (чекбокси залишаються незаповненими). */
export function effectiveHomeMapLayerVisibility(
	raw: Record<HomeMapLayerId, boolean>
): Record<HomeMapLayerId, boolean> {
	if (HOME_MAP_LAYER_ORDER.every(id => !raw[id])) {
		return { ...allHomeMapLayersOn }
	}
	return raw
}
