import { polyanaHotels } from '@/lib/polyana-hotels'
import { siteHeaderPhoneTel } from '@/data/trout-page'

/** Той самий `tel:`, що й у `Header.tsx` — одним кліком дзвінок на бронювання. */
const SPA_CHAN_BOOKING_TEL_HREF = `tel:${siteHeaderPhoneTel}` as const

export type SpaVelikyiChanVenue = {
	id: string
	name: string
	/** Адреса готелю — для посилання «маршрут» у Google Maps. */
	address: string
	/** Для сортування в таблиці (береться з рядка ціни готелю на головній). */
	priceFromUah: number
	/** Як у картці готелю на порталі. */
	priceLabel: string
	lat: number
	lng: number
	/** Посилання «Забронювати» (зараз — дзвінок на головний номер порталу). */
	bookingHref: string
}

function priceFromUahFromHotelPrice(price: string): number {
	const compact = price.replace(/\u00a0/g, ' ').replace(/\s/g, ' ')
	const m = compact.match(/(\d[\d\s]*)/u)
	if (!m) return 0
	return parseInt(m[1].replace(/\s/g, ''), 10) || 0
}

/**
 * Чотири готелі порталу з великими чанами: назви та координати збігаються з
 * `polyanaHotels` / головною картою (#polyana-map, шар готелів).
 */
export const SPA_VELIKI_CHANY_VENUES: SpaVelikyiChanVenue[] = polyanaHotels.map(h => ({
	id: h.id,
	name: h.name,
	address: h.address,
	priceFromUah: priceFromUahFromHotelPrice(h.price),
	priceLabel: h.price.trim(),
	lat: h.position.lat,
	lng: h.position.lng,
	bookingHref: SPA_CHAN_BOOKING_TEL_HREF,
}))
