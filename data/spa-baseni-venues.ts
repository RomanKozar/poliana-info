import { SPA_CHAN_COMPARISON_VENUES, type SpaVelikyiChanVenue } from '@/data/spa-veliki-chany-venues'

export type SpaBaseniVenue = SpaVelikyiChanVenue

/** Тарифи басейну (не ціни номерів з головної). */
const SPA_BASENI_PRICE_BY_ID: Partial<
	Record<string, Pick<SpaBaseniVenue, 'priceFromUah' | 'priceLabel' | 'priceLines'>>
> = {
	kateryna: {
		priceFromUah: 200,
		priceLabel: '1 год - 200 ₴',
		priceLines: ['1 год - 200 ₴', '3 год - 400 ₴', 'На день - 550 ₴'],
	},
	riverside: {
		priceFromUah: 200,
		priceLabel: '1 год - 200 ₴',
		priceLines: ['1 год - 200 ₴', '3 год - 350 ₴', 'На день - 500 ₴'],
	},
	kontinent: {
		priceFromUah: 300,
		priceLabel: '1 год - 300 ₴',
		priceLines: ['1 год - 300 ₴', '3 год - 450 ₴', 'На день - 600 ₴'],
	},
}

/**
 * Заклади для порівняння «басейни в Поляні»; ціни сеансів — у таблиці, якщо задані.
 */
export const SPA_BASENI_VENUES: SpaBaseniVenue[] = SPA_CHAN_COMPARISON_VENUES.map(v => {
	const price = SPA_BASENI_PRICE_BY_ID[v.id]
	return price ? { ...v, ...price } : v
})
