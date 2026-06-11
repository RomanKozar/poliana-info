export type PolyanaAttractionPrice = {
	price: string
	description: string
	highlight?: boolean
}

export type PolyanaAttraction = {
	id: string
	title: string
	description: string
	/** Шлях у `public/images/attractions/` - поки порожньо, показуємо заглушку. */
	image?: string
}

/** Майданчик атракціонів на курорті (усі картки ведуть сюди в Google Maps). */
export const polyanaAttractionsMapSpot = {
	lat: 48.6204446955682,
	lng: 22.971480337569187,
	title: 'Атракціони в Поляні',
} as const

/** Google Maps «Маршрут» до майданчика атракціонів. */
export function getPolyanaAttractionsGoogleDirectionsHref(): string {
	const { lat, lng } = polyanaAttractionsMapSpot
	return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`
}

export const polyanaAttractionPrices: PolyanaAttractionPrice[] = [
	{
		price: '100 ₴',
		description: '15 хвилин - кожний атракціон окремо',
	},
	{
		price: '300 ₴',
		description: 'Безліміт на території атракціонів',
	},
	{
		price: '500 ₴',
		description: 'Басейн + безліміт на території атракціонів',
		highlight: true,
	},
]

export const polyanaAttractions: PolyanaAttraction[] = [
	{
		id: 'swing-360',
		title: 'Гойдалка 360°',
		image: '/images/excursions/attractions/swing360/swing360-1.webp',
		description:
			'Обертання на повний оберт над землею - відчуття політу та легкого адреналіну. Підходить для дітей і дорослих за наявності супроводу.',
	},
	{
		id: 'vertliuh',
		title: '«Вертлюх»',
		image: '/images/excursions/attractions/spinner/spinner-1.webp',
		description:
			'Підіймаєтесь на мотузці вгору, накручуєтесь - і після відпускання атракціон крутиться з наростаючою швидкістю. Короткий, але яскравий порив адреналіну для любителів екстриму.',
	},
	{
		id: 'balancer-swing',
		title: 'Гойдалка-балансер',
		image: '/images/excursions/attractions/balance/balance-1.webp',
		description:
			'Підйом до 10 метрів із плавним гойданням - панорама Поляни та гірських околиць з висоти. Один із найефектніших атракціонів на майданчику.',
	},
	{
		id: 'trampoline',
		title: 'Батут',
		image: '/images/excursions/attractions/batyt/batyt-1.webp',
		description:
			'Стрибки на професійному батуті - активний відпочинок для дітей і дорослих. Окремий сеанс - 15 хвилин (див. тариф «100 ₴»).',
	},
]
