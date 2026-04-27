/** Мітки шарів головної карти (окрім готелів — див. polyana-hotels). */

/** Кафе та ресторани Поляни (координати та рейтинги з Google Maps). */
export const diningMapMarkers = [
	{
		name: 'Ресторан «Катерина»',
		address: 'вул. Сонячна, 55-Б, Поляна, Закарпатська обл., 89313',
		category:
			'Ресторан готельного комплексу «Катерина»: закарпатська й українська кухня (бограч, банош, деруни), форель з власного ставка, тераса й винна карта — зручно для сімейного обіду в Поляні.',
		image: '/images/accommodation/kateryna-v1.webp',
		position: { lat: 48.621246497414745, lng: 22.971365350910737 },
	},
	{
		name: 'EQUATOR',
		address: 'вул. Духновича, Поляна, Закарпатська обл., 89313',
		category:
			'★ 4,6 (309) · кафе · орієнтовно 200–400 ₴ · їжа в закладі, замовлення з вулиці, доставка · до 22:00 · 098 929 2202',
		image: '/images/gallery/golovna-foto-2.webp',
		position: { lat: 48.62173358568664, lng: 22.967105354571046 },
	},
	{
		name: 'Coffee Line',
		address: 'вул. Духновича, 88б, Поляна, Закарпатська обл., 89313',
		category:
			'★ 5,0 (33) · кав’ярня · орієнтовно 1–200 ₴ · їжа в закладі, із собою, доставка · 095 639 7993',
		image: '/images/gallery/golovna-foto-3.webp',
		position: { lat: 48.62426419571715, lng: 22.96902223943357 },
	},
	{
		name: 'Good Zone',
		address: 'вул. Курортна, Поляна, Закарпатська обл., 89313',
		category:
			'★ 4,7 (1 085) · ресторан · їжа в закладі, із собою, доставка · до 23:30 · меню на good-zone.ctl.net.ua · 066 647 8918',
		image: '/images/gallery/golovna-foto.webp',
		position: { lat: 48.624618551922836, lng: 22.946096953186508 },
	},
	{
		name: 'ПанОрама',
		address: 'вул. Курортна, Поляна, Закарпатська обл., 89313',
		category: '★ 4,5 (665) · кафе · орієнтовно 200–400 ₴ · їжа в закладі, з вулиці, доставка · до 22:00 · 050 808 5879',
		image: '/images/entertainment/tybinh-v2-3.webp',
		position: { lat: 48.626204712025924, lng: 22.945207647879602 },
	},
	{
		name: 'Лілея',
		address: 'вул. Курортна, Поляна, Закарпатська обл., 89313',
		category: '★ 3,9 (1 496) · ресторан при готельно-ресторанному комплексі',
		image: '/images/gallery/golovna-foto-2.webp',
		position: { lat: 48.62671402968627, lng: 22.94738223808272 },
	},
	{
		name: 'Siesta family cafe',
		address: 'ТЦ Polayna Plaza, вул. Духновича, 56, Поляна, Закарпатська обл., 89313',
		category: '★ 4,2 (69) · кафе · орієнтовно 200–400 ₴ · до 22:00',
		image: '/images/gallery/golovna-foto-3.webp',
		position: { lat: 48.621581391228176, lng: 22.967498727610323 },
	},
] as const

/** Продуктові мережі та спеціалізовані магазини в Поляні (Google Maps). */
export const shopsMapMarkers = [
	{
		name: 'Копійочка',
		address: 'вул. Духновича, 56, Поляна, Закарпатська обл., 89313',
		category: '★ 3,2 (9) · магазин господарських товарів · kopiyochka.com.ua · 0800 502 990',
		image: '/images/gallery/golovna-foto.webp',
		position: { lat: 48.621467383655634, lng: 22.96762098879696 },
	},
	{
		name: 'Супермаркет',
		address: 'вул. Духновича, 5, Поляна (ТЦ Polayna Plaza), Закарпатська обл., 89313',
		category: '★ 4,6 (7) · супермаркет · до 22:00',
		image: '/images/gallery/golovna-foto-2.webp',
		position: { lat: 48.62152356911222, lng: 22.967642765451984 },
	},
	{
		name: 'Амбар Маркет',
		address: 'вул. Духновича, 65, Поляна, Закарпатська обл., 89313',
		category: '★ 4,3 (9) · супермаркет',
		image: '/images/gallery/golovna-foto-3.webp',
		position: { lat: 48.621451094236136, lng: 22.966283208147484 },
	},
	{
		name: 'Алкомаркет «Тиса»',
		address: 'Поляна, Закарпатська обл., 89313',
		category: '★ 4,1 (8) · алкомаркет',
		image: '/images/gallery/golovna-foto.webp',
		position: { lat: 48.62158274103911, lng: 22.966256386059687 },
	},
	{
		name: 'Будівельний магазин',
		address: 'вул. Духновича, 41, Поляна, Закарпатська обл., 89313',
		category: 'Будівельний маркет — матеріали та інструменти',
		image: '/images/gallery/golovna-foto-2.webp',
		position: { lat: 48.6211049645062, lng: 22.967164113166138 },
	},
] as const

export type HomeMapPharmacyMarker = {
	name: string
	address: string
	category: string
	image: string
	position: { lat: number; lng: number }
	badge: string
}

/** Аптеки та медичні точки (Google Maps). */
export const pharmacyMapMarkers: HomeMapPharmacyMarker[] = [
	{
		name: 'Аптека «Подорожник»',
		address: 'вул. Духновича, 56, Поляна, Закарпатська обл., 89313',
		category:
			'★ 4,2 (22) · аптека · покупки й самовивіз, доставка · зачиняється о 21:00',
		image: '/images/gallery/golovna-foto-3.webp',
		position: { lat: 48.62142192423074, lng: 22.967409720203054 },
		badge: 'Аптека',
	},
	{
		name: 'Амбулаторія загальної практики-сімейної медицини',
		address: 'вул. Духновича, 108, Поляна, Закарпатська обл., 89313',
		category: '★ 4,8 (4) · амбулаторія сімейної медицини · 03133 74599',
		image: '/images/gallery/golovna-foto.webp',
		position: { lat: 48.62675756921276, lng: 22.97237635248425 },
		badge: 'Медзаклад',
	},
	{
		name: 'Аптека «Подорожник»',
		address: 'вул. Курортна, 3Б, Поляна, Закарпатська обл., 89313',
		category: '★ 4,7 (18) · аптека · podorozhnyk.ua · 0800 303 111 · самовивіз і доставка',
		image: '/images/gallery/golovna-foto-2.webp',
		position: { lat: 48.62526979873458, lng: 22.94656504413456 },
		badge: 'Аптека',
	},
]

/** SPA, чани та оздоровлення в Поляні (координати з Google Maps / уточнення на місці). */
export const spaMapMarkers = [
	{
		name: 'Чан на території «Катерина»',
		address: 'готель «Катерина», вул. Сонячна, 55-Б, Поляна, Закарпатська обл.',
		category: 'Гарячий чан на території готельно-ресторанного комплексу «Катерина».',
		image: '/images/spa/maliy-chan.png',
		position: { lat: 48.621390668230035, lng: 22.970576982649888 },
	},
	{
		name: 'Чан (SPA на гарячій плиті)',
		address: 'вул. Курортна, 27, Поляна, Закарпатська обл.',
		category: '★ 5,0 (4) · SPA-процедури на гарячій кам’яній плиті',
		image: '/images/spa/fitobochka.png',
		position: { lat: 48.624395001303014, lng: 22.95056637197927 },
	},
	{
		name: 'SPA та оздоровлення «Континент»',
		address: 'готель «Континент», вул. Сонячна, 59, Поляна, Закарпатська обл.',
		category:
			'Оздоровчий комплекс готелю «Континент»: критий басейн, сауна; у описах комплексу також згадують масажі та SPA-послуги для гостей.',
		image: '/images/accommodation/kontinent.webp',
		position: { lat: 48.62058462616725, lng: 22.9702754849307 },
	},
] as const

/** Гірські оглядові точки та туристичні пам’ятки (координати з Google Maps). */
export const touristCityMapMarkers = [
	{
		name: 'Гора Рожок — Chalet Family, оглядовий майданчик',
		address: 'с. Голубине, Закарпатська обл.',
		category: '★ 4,9 (12) · зона для прогулянок · оглядовий майданчик',
		image: '/images/gallery/golovna-foto.webp',
		position: { lat: 48.608805906666305, lng: 23.01986710639653 },
	},
	{
		name: 'Гора Малий Вижень',
		address: 'с. Уклин, Закарпатська обл.',
		category: '★ 5,0 (6) · туристична пам’ятка',
		image: '/images/gallery/golovna-foto-2.webp',
		position: { lat: 48.673916128142324, lng: 22.947541351811637 },
	},
	{
		name: 'Гора Великий Вижень',
		address: 'с. Верхня Грабівниця, Закарпатська обл.',
		category: '★ 4,7 (6) · туристична пам’ятка',
		image: '/images/gallery/golovna-foto-3.webp',
		position: { lat: 48.70178118047461, lng: 22.957258642049577 },
	},
	{
		name: 'Гора Ведмежа',
		address: 'с. Уклин, Закарпатська обл.',
		category: '★ 4,8 (5) · зона для прогулянок',
		image: '/images/entertainment/tybinh-v2-1.webp',
		position: { lat: 48.65316352015213, lng: 22.965168433299574 },
	},
	{
		name: 'Гора Липча',
		address: 'с. Уклин, Закарпатська обл. (E471)',
		category: 'Туристична пам’ятка · огляд з висоти',
		image: '/images/entertainment/tybinh-v2-2.webp',
		position: { lat: 48.66332239338579, lng: 23.02946671577749 },
	},
] as const
