import type { PolyanaHotel } from '@/lib/polyana-hotels'
import { getHotelMapGallery } from '@/lib/polyana-hotels'

export function galleryImagesForHotel(hotel: PolyanaHotel): string[] {
	const g = getHotelMapGallery(hotel)
	const out = [...g]
	while (out.length < 5) {
		out.push(hotel.image)
	}
	return out.slice(0, 5)
}

export function parseGuestCount(ratingLabel: string): number | undefined {
	const m = /\((\d[\d\s]*)\)/.exec(ratingLabel.replace(/\s/g, ''))
	if (!m) return undefined
	return parseInt(m[1].replace(/\D/g, ''), 10)
}

/** Підзаголовок як на референсі (локація · тип помешкання). */
export function hotelListingSubtitle(): string {
	return 'Поляна, Україна: номер у готелі — курорт'
}

/** Рядок з характеристиками (можна замінити з CMS). */
export function hotelQuickSpecs(): string {
	return '2 гостя · Номер · 2 ліжка · Власна ванна кімната'
}

export type FacilityIconId =
	| 'pool'
	| 'spa'
	| 'parking'
	| 'wifi'
	| 'family'
	| 'restaurant'
	| 'shuttle'
	| 'nosmoking'
	| 'bar'
	| 'breakfast'

export type FacilityItem = {
	id: string
	label: string
	icon: FacilityIconId
}

export const popularFacilities: FacilityItem[] = [
	{ id: '1', label: 'Відкритий басейн', icon: 'pool' },
	{ id: '2', label: 'Wellness та SPA', icon: 'spa' },
	{ id: '3', label: 'Безкоштовна парковка', icon: 'parking' },
	{ id: '4', label: 'Безкоштовний Wi-Fi', icon: 'wifi' },
	{ id: '5', label: 'Сімейні номери', icon: 'family' },
	{ id: '6', label: 'Ресторан', icon: 'restaurant' },
	{ id: '7', label: 'Трансфер до аеропорту', icon: 'shuttle' },
	{ id: '8', label: 'Номери для некурців', icon: 'nosmoking' },
	{ id: '9', label: 'Бар', icon: 'bar' },
	{ id: '10', label: 'Сніданок', icon: 'breakfast' },
]

export function longDescriptionParagraphs(hotel: PolyanaHotel): string[] {
	const base = `${hotel.name} розташований за адресою ${hotel.address} у затишній частині Поляни на Закарпатті. Неподалік — гірські маршрути, ресторани та оздоровчі заклади.`
	const couples =
		'Мандрівникам подобається поєднання спокою, краєвидів Карпат і доступних зручностей поруч із готелем.'
	const services =
		'На території та в номері: зручне ліжко, ванна кімната з необхідними дрібницями, телебачення й безкоштовний Wi‑Fi для гостей. За домовленістю доступні додаткові послуги проживання.'
	const activities =
		'На курорті можна поєднати відпочинок із прогулянками, лижами або SPA — залежно від сезону та ваших уподобань.'
	return [base, couples, services, activities]
}

export type SidebarHighlight = { title: string; body: string; icon?: 'pin' | 'breakfast' | 'parking' | 'ski' }

export function propertyHighlights(_hotel: PolyanaHotel): SidebarHighlight[] {
	return [
		{
			icon: 'pin',
			title: 'Розташування',
			body: 'Зручні відстані до ключових точок курорту та високий рейтинг розташування за відгуками гостей.',
		},
		{
			icon: 'breakfast',
			title: 'Інформація про сніданки',
			body: 'Формат сніданків може бути континентальним або як у політиці вашого тарифу — уточнюйте при бронюванні.',
		},
		{
			icon: 'parking',
			title: 'Паркінг',
			body: 'Поруч із готелем можлива безкоштовна приватна парковка (наявність та кількість місць — при заїзді).',
		},
		{
			icon: 'ski',
			title: 'Активності',
			body: 'Швидкий доступ до зимових активностей і пішохідних стежок у горах поблизу.',
		},
	]
}

/** Категорії оцінок для готелів без окремих даних у дата-моделі. */
export const reviewCategoryScores: { label: string; score: number }[] = [
	{ label: 'Персонал', score: 9.2 },
	{ label: 'Зручності', score: 9.1 },
	{ label: 'Чистота', score: 9.3 },
	{ label: 'Комфорт', score: 9.0 },
	{ label: 'Співвідношення ціна/якість', score: 8.9 },
	{ label: 'Розташування', score: 9.2 },
	{ label: 'Безкоштовний Wi-Fi', score: 8.8 },
]

const REVIEW_CATEGORY_SCORES_KATERYNA: { label: string; score: number }[] = [
	{ label: 'Персонал', score: 9.5 },
	{ label: 'Зручності', score: 9.2 },
	{ label: 'Чистота', score: 9.4 },
	{ label: 'Комфорт', score: 9.3 },
	{ label: 'Співвідношення ціна/якість', score: 9.0 },
	{ label: 'Розташування', score: 9.2 },
	{ label: 'Безкоштовний Wi-Fi', score: 8.5 },
]

/** Категорії під конкретний об’єкт проживання (референс Booking). */
export function reviewCategoryScoresForHotel(hotelId: string): { label: string; score: number }[] {
	if (hotelId === 'kateryna') return REVIEW_CATEGORY_SCORES_KATERYNA
	return reviewCategoryScores
}

export type SampleReviewCard = {
	name: string
	initial: string
	country: string
	excerpt: string
	bg: string
}

export const sampleReviewCards: SampleReviewCard[] = [
	{
		initial: 'О',
		name: 'Оксана',
		country: 'Україна',
		excerpt: 'Чисто, люб’язний персонал і гарний сніданок. Рекомендую!',
		bg: 'bg-sky-600',
	},
	{
		initial: 'М',
		name: 'Марія',
		country: 'Україна',
		excerpt: 'Гарне розташування для прогулянок горами, басейном скористалися двічі.',
		bg: 'bg-emerald-600',
	},
	{
		initial: 'С',
		name: 'Світлана',
		country: 'Україна',
		excerpt: 'Тихо й затишно, все як на фото. Повернемося влітку ще раз.',
		bg: 'bg-teal-700',
	},
]

export type HotelFaqEntry = { q: string; a: string }

/** Загальні відповіді для готелів курортної Поляни; у конкретного закладу умови можуть відрізнятися — уточнюйте при бронюванні. */
export const hotelFaqEntries: HotelFaqEntry[] = [
	{
		q: 'Ви подаєте сніданок?',
		a:
			'Так — більшість готелів Поляни пропонує сніданки: континентальний, шведський стіл або сет-меню залежно від тарифу. Формат і години роботи їдальні уточнюйте під час бронювання або на ресепшні під час поселення.',
	},
	{
		q: 'Спа-центр відкритий для користування?',
		a:
			'SPA зазвичай доступний зареєстрованим гостям закладу та за правилами зони й розкладом. Деталі, запис на масаж і процедури уточнюйте на ресепшні або на сайті готелю.',
	},
	{
		q: 'Басейн відкритий для користування?',
		a:
			'Басейн здебільшого працює в межах готелю за оголошеними годинами та може бути сезонним. Для малих гостей чи дорослих можуть діяти окремі вікові правила або додаткові послуги (рушники, халати). Актуальний графік — у ресепшні.',
	},
	{
		q: 'Чи є місце для парковки?',
		a:
			'Так — біля багатьох готелів є безкоштовна або платна парковка, іноді з обмеженою кількістю місць. Радимо заздалегідь повідомити про авто або оренду стоянки на місці.',
	},
	{
		q: 'Чи є ресторан?',
		a:
			'На курорті готелі часто мають власний ресторан або кафе; меню, години роботи й бронювання столику можна дізнатися на офіційному сайті або в адміністрації.',
	},
	{
		q: 'Чи є трансфер з/до аеропорту?',
		a:
			'Індивідуальний або груповий трансфер узгоджується попередньо з адміністрацією або через туроператора. Альтернатива — рейсові автобуси, таксі та залізничні сполучення (наприклад, ст. Свалява).',
	},
	{
		q: 'Чи можна взяти з собою домашню тварину?',
		a:
			'Політика щодо тварин залежить від конкретного готелю: часто потрібне попереднє погодження, додаткова оплата та дотримання правил (розмір, вакцинація). Уточнюйте до бронювання.',
	},
	{
		q: 'Які умови користування Wi-Fi?',
		a:
			'Зазвичай у номерах і лобі надається безкоштовний Wi‑Fi; пароль видають на ресепшні або в інструкції в номері. Швидкість залежить від навантаження мережі.',
	},
	{
		q: 'Які ресторани, пам’ятки та зупинки громадського транспорту розташовані неподалік?',
		a:
			'У Поляні та Свалявському районі є кафе й ресторани, магазини, зупинки автобусів, залізнична станція в Сваляві. Пам’ятки природи та маршрути — у розділі «Навколо готелю» на цій сторінці та на мапі нижче.',
	},
	{
		q: 'Чи є номери з гідромасажною ванною?',
		a:
			'Наявність джакузі чи гідромасажної ванни залежить від категорії номера. Запитуйте при бронюванні конкретну категорію з гідромасажем або апгрейд.',
	},
]

export type AroundListItem = { label: string; distance: string }

export const aroundRestaurantItems: AroundListItem[] = [
	{ label: 'Кафе / бар • Кафе Катерина', distance: '50 м' },
	{ label: 'Кафе / бар • Cafe', distance: '300 м' },
	{ label: 'Кафе / бар • Кафе у центрі', distance: '950 м' },
]

export const aroundTransportItems: AroundListItem[] = [
	{ label: 'Поїзд — Свалява', distance: '9 км' },
	{ label: 'Поїзд — Неліпино', distance: '11 км' },
]

export const aroundAirports: AroundListItem[] = [
	{ label: 'Міжнародний аеропорт «Ужгород»', distance: '72 км' },
]

export type AreaTag = { label: string; icon: 'mountain' | 'droplet' | 'hiker' | 'star' | 'pin' }

export const areaTags: AreaTag[] = [
	{ label: 'Гори', icon: 'mountain' },
	{ label: 'Оздоровлення і релаксація', icon: 'droplet' },
	{ label: 'Пішохідний туризм і прогулянки', icon: 'hiker' },
	{ label: 'Гостям подобалося гуляти по району!', icon: 'star' },
]
