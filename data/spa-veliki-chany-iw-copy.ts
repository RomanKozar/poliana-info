/**
 * Тексти для вікна на карті «Великі чани» (опис і пілюля про чани, не загальний опис готелю).
 */
export type SpaVelikiChanyIwCopy = {
	description: string
	feature: string
	/** Ціна сеансу в InfoWindow на карті (замість ціни номера). */
	mapPriceLabel?: string
}

export const spaVelikiChanyIwCopyByHotelId: Record<string, SpaVelikiChanyIwCopy> = {
	kateryna: {
		description:
			'Гарячий великий чан на території «Катерина» — зручно поєднати з номером і рестораном. Уточнюйте вільні слоти перед візитом.',
		feature: 'Великі чани на території готелю',
		mapPriceLabel: '1 год — 1650 ₴ · 2 год — 2500 ₴',
	},
	kontinent: {
		description:
			'У «Континенті» — басейни, сауна та SPA; про оренду великого чану й пакети «номер + чан» дізнайтесь на ресепшні або на сайті готелю.',
		feature: 'SPA · великі чани за домовленістю',
		mapPriceLabel: '1 год — 1800 ₴ · 2 год — 2700 ₴',
	},
	riverside: {
		description:
			'River Side біля річки: поцікавтесь про великий чан і формат відпочинку з проживанням. Час краще бронювати заздалегідь.',
		feature: 'Великі чани — уточнюйте в готелі',
	},
}

export const spaVelikiChanyIwCopyFallback: SpaVelikiChanyIwCopy = {
	description:
		'Великі чани в Поляні: наявність місць, тривалість сеансу та ціну уточнюйте в закладі або скористайтесь бронюванням за номером порталу.',
	feature: 'Великі чани',
}
