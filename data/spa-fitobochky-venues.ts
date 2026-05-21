import { SPA_CHAN_COMPARISON_VENUES, type SpaVelikyiChanVenue } from '@/data/spa-veliki-chany-venues'

export type SpaFitobochkyVenue = SpaVelikyiChanVenue

/** Тариф фітобочки (не ціна номера з головної). */
const SPA_FITOBOCHKY_PRICE_BY_ID: Partial<
	Record<string, Pick<SpaFitobochkyVenue, 'priceFromUah' | 'priceLabel'>>
> = {
	kateryna: {
		priceFromUah: 400,
		priceLabel: '30 хв - 400 ₴',
	},
}

/** На сторінці фітобочок - лише «Готель Катерина». */
export const SPA_FITOBOCHKY_VENUES: SpaFitobochkyVenue[] = SPA_CHAN_COMPARISON_VENUES.filter(
	v => v.id === 'kateryna'
).map(v => {
	const price = SPA_FITOBOCHKY_PRICE_BY_ID[v.id]
	return price ? { ...v, ...price } : v
})
