import { SPA_CHAN_COMPARISON_VENUES, type SpaVelikyiChanVenue } from '@/data/spa-veliki-chany-venues'

export type SpaBaniVenue = SpaVelikyiChanVenue

/** Без River Side Hotel (лишається в чанах, басейнах тощо). */
const SPA_BANI_EXCLUDED_HOTEL_IDS = new Set(['riverside'])

/** Тарифи сеансу бані (не ціни номерів з головної). */
const SPA_BANI_PRICE_BY_ID: Partial<
	Record<string, Pick<SpaBaniVenue, 'priceFromUah' | 'priceLabel' | 'priceLines'>>
> = {
	kateryna: {
		priceFromUah: 700,
		priceLabel: '1 год - 700 ₴',
		priceLines: ['1 год - 700 ₴', '2 год - 1200 ₴'],
	},
	kontinent: {
		priceFromUah: 800,
		priceLabel: '1 год - 800 ₴',
		priceLines: ['1 год - 800 ₴', '2 год - 1300 ₴'],
	},
}

/**
 * Заклади для порівняння «бані в Поляні»: базовий SPA-перелік без River Side;
 * сеанси бані та ціни — уточнюйте в закладі, якщо не вказано в таблиці.
 */
export const SPA_BANI_VENUES: SpaBaniVenue[] = SPA_CHAN_COMPARISON_VENUES.filter(
	v => !SPA_BANI_EXCLUDED_HOTEL_IDS.has(v.id)
).map(v => {
	const price = SPA_BANI_PRICE_BY_ID[v.id]
	return price ? { ...v, ...price } : v
})
