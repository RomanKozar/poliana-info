/**
 * Тексти для вікна на карті «Басейни» (опис про басейни / купання, не загальний опис готелю).
 */
export type SpaBaseniIwCopy = {
	description: string
	feature: string
}

export const spaBaseniIwCopyByHotelId: Record<string, SpaBaseniIwCopy> = {
	kateryna: {
		description:
			'У «Катерині» — відкритий басейн і SPA-зона; глибина, години роботи та платний доступ уточнюйте на ресепшні. Зручно поєднати з номером.',
		feature: 'Відкритий басейн · SPA',
	},
	kontinent: {
		description:
			'«Континент» — критий басейн і SPA-комплекс; дитячі зони, рушники та абонементи дізнайтесь на місці або на сайті готелю.',
		feature: 'Критий басейн · SPA',
	},
	riverside: {
		description:
			'River Side біля річки: відкритий басейн; температуру води, графік і пакети з проживанням уточнюйте в готелі. У вихідні краще бронювати заздалегідь.',
		feature: 'Відкритий басейн',
	},
}

export const spaBaseniIwCopyFallback: SpaBaseniIwCopy = {
	description:
		'Басейни в Поляні: наявність вільних доріжок, температура води та вартість квитка чи сеансу уточнюйте в закладі або за номером порталу для бронювання.',
	feature: 'Басейни та купання',
}
