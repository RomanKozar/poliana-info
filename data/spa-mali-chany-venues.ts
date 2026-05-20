import { SPA_CHAN_COMPARISON_VENUES, type SpaVelikyiChanVenue } from '@/data/spa-veliki-chany-venues'

/**
 * Заклади з малими чанами: базовий SPA-перелік (`SPA_CHAN_COMPARISON_VENUES`); умови й наявність уточнюйте в закладі.
 */
const SPA_MALI_CHANY_PRICE_BY_ID: Partial<
	Record<string, Pick<SpaVelikyiChanVenue, 'priceFromUah' | 'priceLabel' | 'priceLines'>>
> = {
	kateryna: {
		priceFromUah: 1350,
		priceLabel: '1 год - 1350 ₴',
		priceLines: ['1 год - 1350 ₴', '2 год - 2200 ₴'],
	},
	kontinent: {
		priceFromUah: 1550,
		priceLabel: '1 год - 1550 ₴',
		priceLines: ['1 год - 1550 ₴', '2 год - 2400 ₴'],
	},
	riverside: {
		priceFromUah: 1450,
		priceLabel: '1 год - 1450 ₴',
		priceLines: ['1 год - 1450 ₴', '2 год - 2200 ₴'],
	},
}

export const SPA_MALI_CHANY_VENUES = SPA_CHAN_COMPARISON_VENUES.map(v => {
	const price = SPA_MALI_CHANY_PRICE_BY_ID[v.id]
	return price ? { ...v, ...price } : v
})
