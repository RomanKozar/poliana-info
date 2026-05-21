import { polyanaHotels } from '@/lib/polyana-hotels'
import { siteHeaderPhoneTel } from '@/data/trout-page'

/** Той самий `tel:`, що й у `Header.tsx` - одним кліком дзвінок на бронювання. */
const SPA_CHAN_BOOKING_TEL_HREF = `tel:${siteHeaderPhoneTel}` as const

export type SpaVelikyiChanVenue = {
	id: string
	name: string
	/** Адреса готелю - для посилання «маршрут» у Google Maps. */
	address: string
	/** Для сортування в таблиці (береться з рядка ціни готелю на головній). */
	priceFromUah: number
	/** Короткий рядок ціни (сортування, fallback). */
	priceLabel: string
	/** Кілька тарифів сеансу - для колонки «Ціна» на сторінці великих чанів. */
	priceLines?: readonly string[]
	lat: number
	lng: number
	/** Посилання «Забронювати» (зараз - дзвінок на головний номер порталу). */
	bookingHref: string
}

function priceFromUahFromHotelPrice(price: string): number {
	const compact = price.replace(/\u00a0/g, ' ').replace(/\s/g, ' ')
	const m = compact.match(/(\d[\d\s]*)/u)
	if (!m) return 0
	return parseInt(m[1].replace(/\s/g, ''), 10) || 0
}

/** Не показуємо в порівняльних таблицях і SPA-картах. */
const SPA_VENUE_EXCLUDED_HOTEL_IDS = new Set<string>()

function mapPolyanaHotelsToSpaVenues(
	hotels: typeof polyanaHotels,
	excludeIds: ReadonlySet<string>
): SpaVelikyiChanVenue[] {
	return hotels
		.filter(h => !excludeIds.has(h.id))
		.map(h => ({
			id: h.id,
			name: h.name,
			address: h.address,
			priceFromUah: priceFromUahFromHotelPrice(h.price),
			priceLabel: h.price.trim(),
			lat: h.position.lat,
			lng: h.position.lng,
			bookingHref: SPA_CHAN_BOOKING_TEL_HREF,
		}))
}

/**
 * Базовий перелік для SPA-порівнянь (малі чани, бані, басейни тощо): координати з
 * `polyanaHotels` / головної карти.
 */
export const SPA_CHAN_COMPARISON_VENUES: SpaVelikyiChanVenue[] = mapPolyanaHotelsToSpaVenues(
	polyanaHotels,
	SPA_VENUE_EXCLUDED_HOTEL_IDS
)

/** Великі чани: без River Side Hotel. */
const SPA_VELIKI_CHANY_EXCLUDED_HOTEL_IDS = new Set([...SPA_VENUE_EXCLUDED_HOTEL_IDS, 'riverside'])

/** Тарифи оренди великого чану (не ціни номерів з головної). */
const SPA_VELIKI_CHANY_CHAN_PRICE_BY_ID: Partial<
	Record<string, Pick<SpaVelikyiChanVenue, 'priceFromUah' | 'priceLabel' | 'priceLines'>>
> = {
	kateryna: {
		priceFromUah: 1650,
		priceLabel: '1 год - 1650 ₴',
		priceLines: ['1 год - 1650 ₴', '2 год - 2500 ₴'],
	},
	kontinent: {
		priceFromUah: 1800,
		priceLabel: '1 год - 1800 ₴',
		priceLines: ['1 год - 1800 ₴', '2 год - 2700 ₴'],
	},
}

export const SPA_VELIKI_CHANY_VENUES: SpaVelikyiChanVenue[] = mapPolyanaHotelsToSpaVenues(
	polyanaHotels,
	SPA_VELIKI_CHANY_EXCLUDED_HOTEL_IDS
).map(v => {
	const chanPrice = SPA_VELIKI_CHANY_CHAN_PRICE_BY_ID[v.id]
	return chanPrice ? { ...v, ...chanPrice } : v
})
