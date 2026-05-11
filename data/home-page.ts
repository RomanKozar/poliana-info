import type { IconType } from 'react-icons'
import { FaRegClock, FaSpa, FaWater } from 'react-icons/fa'
import { EXCURSIONS_MOUNTAINS_ANCHOR_ID } from '@/data/excursions-page'
import { accommodationHotelPath } from '@/lib/accommodation-urls'

export const accommodations = [
	{
		id: 'kateryna',
		title: 'Готель "Катерина"',
		location: 'Сонячна, 55 Б, Поляна, Закарпатська область, 89313',
		description: 'Затишний готель у самому серці курорту.',
		price: 'від 1500 грн',
		rating: '4.3 (1104)',
		image: '/images/accommodation/kateryna-v1.webp',
		website: 'https://hotel-kateryna.com/',
	},
	{
		id: 'kontinent',
		title: 'Готель "Континент"',
		location: 'вул. Сонячна, 59, Поляна, Закарпатська область, 89313',
		description:
			'Комплекс з басейнами (критим і відкритим), рестораном, SPA й конференц-зонами у центрі курорту.',
		price: 'від 1800 грн',
		rating: '4.3 (1256)',
		image: '/images/accommodation/kontinent.webp',
		website: 'https://www.hotel-continent.com/',
	},
	{
		id: 'riverside',
		title: 'River Side Hotel',
		location: 'вул. Духновича, 68, Поляна, Закарпатська область, 89313',
		description:
			'Тихий готель біля річки з рестораном і номерами з балконом; зручно для авто й прогулянок до траси «Ведмежа».',
		price: 'від 1100 грн',
		rating: '3.9 (399)',
		image: '/images/accommodation/river-side.webp',
		website: 'https://www.riverside.in.ua/',
	},
	{
		id: 'arena',
		title: 'Arena Apart-Hotel',
		location: 'вул. Курортна, 23А, Поляна, Закарпатська область, 89314',
		description:
			'Відкритий басейн і SPA, апартаменти з кухнею, ресторан і дитяча зона на курорті «Сонячне Закарпаття».',
		price: 'від 2500 грн',
		rating: '4.7 (299)',
		image: '/images/accommodation/arena.webp',
		website: 'https://arena-hotel.com.ua/',
	},
] as const

export const spaItems: Array<{
	title: string
	subtitle: string
	icon: IconType
	image: string
	imageAlt: string
}> = [
	{
		title: 'Чани в Карпатах',
		subtitle: 'Гарячі чани з джерельною водою',
		icon: FaWater,
		image: '/images/spa/maliy-chan.png',
		imageAlt: 'Чани в Карпатах',
	},
	{
		title: 'Масаж',
		subtitle: 'Професійний масаж для відновлення',
		icon: FaSpa,
		image: '/images/spa/masasch.png',
		imageAlt: 'Масаж',
	},
	{
		title: 'Фітобочки',
		subtitle: 'Оздоровлення та детокс для вашого організму',
		icon: FaRegClock,
		image: '/images/spa/fitobochka.png',
		imageAlt: 'Фітобочки',
	},
]

export type CampSeason = 'summer' | 'winter'

export type CampCardItem = {
	/** Стійкий ключ для зв’язку з окремими сторінками програм */
	id?: string
	title: string
	age: string
	dates: string
	description: string
	price: string
	image: string
	season: CampSeason
	/** Як задано — картка веде на детальну сторінку табору */
	detailPath?: string
}

export const camps: CampCardItem[] = [
	{
		id: 'polianski-camp',
		title: 'Літні зміни PolianskiCamp',
		age: 'від 8 до 14 років',
		dates: '21.06 — 29.06',
		description: 'Літні програми в горах на базі PolianskiCamp.',
		price: '21 500 грн',
		image: '/images/kids-camps/camp-1.webp',
		season: 'summer',
		detailPath: '/camps/polianski-camp',
	},
	{
		id: 'quest-camp',
		title: 'Квестовий табір',
		age: 'від 9 до 15 років',
		dates: '05.07 — 11.07',
		description: 'Командні квести, загадки й активності в Карпатах.',
		price: '18 500 грн',
		image: '/images/kids-camps/camp-2.webp',
		season: 'summer',
		detailPath: '/camps/quest-camp',
	},
	{
		id: 'theater-camp',
		title: 'Театральний заїзд',
		age: 'від 9 до 16 років',
		dates: '18.07 — 26.07',
		description: 'Театр, ролі та творчі майстерні в гірському таборі.',
		price: '23 500 грн',
		image: '/images/kids-camps/camp-3.webp',
		season: 'summer',
		detailPath: '/camps/theater-camp',
	},
	{
		id: 'tourist-camp',
		title: 'Туристичний заїзд',
		age: 'від 10 до 16 років',
		dates: '29.07 — 06.08',
		description: 'Маршрути, орієнтування та відкриття околиць Поляни.',
		price: '23 500 грн',
		image: '/images/kids-camps/camp-4.webp',
		season: 'summer',
		detailPath: '/camps/tourist-camp',
	},
	{
		id: 'tourist-camp-2',
		title: 'Туристичний заїзд',
		age: 'від 10 до 16 років',
		dates: '09.08 — 17.08',
		description: 'Маршрути, орієнтування та відкриття околиць Поляни.',
		price: '23 500 грн',
		image: '/images/kids-camps/camp-4.webp',
		season: 'summer',
		detailPath: '/camps/tourist-camp',
	},
	{
		title: 'Зимові канікули в горах',
		age: 'від 7 до 15 років',
		dates: 'січень — березень (зміни уточнюються)',
		description:
			'Лижі, тюбінг на курорті, ігри в снігу та анімація. Програму та дати оголосимо напередодні сезону.',
		price: 'за запитом',
		image: '/images/entertainment/tybinh-v2-1.webp',
		season: 'winter',
	},
	{
		title: 'Святковий зимовий табір',
		age: 'від 8 до 16 років',
		dates: '27.12 — 06.01',
		description: 'Зимові розваги, святкова програма та прогулянки засніженою Поляною. Реєстрація — наближено до дат.',
		price: 'уточнюйте пізніше',
		image: '/images/kids-camps/camp-4.webp',
		season: 'winter',
	},
]

/** П’ять літніх заїздів у блоці «Дитячі табори» на головній. */
export const campsHomeFeatured = camps.filter(c => c.season === 'summer').slice(0, 5)

export const skiRecreation = [
	{
		title: 'Гірськолижна школа',
		label: 'Для дітей і дорослих',
		description: 'Навчання з інструктором, прокат спорядження та безпечні спуски.',
		price: 'від 600 грн',
		image: '/images/entertainment/tybinh-v2-1.webp',
	},
	{
		title: 'Тюбінг',
		label: 'Активна розвага',
		description: 'Динамічні спуски на тюбах для компаній і сімейного відпочинку.',
		price: 'від 300 грн',
		image: '/images/entertainment/tybinh-v2-2.webp',
	},
	{
		title: 'Літній тюбінг',
		label: 'Літній сезон',
		description: 'Швидкі та безпечні спуски на спеціальній всесезонній трасі.',
		price: 'від 350 грн',
		image: '/images/entertainment/tybinh-v2-3.webp',
	},
] as const

const CATEGORY_ICON_BASE = '/images/branding/categories-icons'

/** Категорії блоку «Популярні категорії» на головній та в меню «Популярне» в шапці — власні SVG з `public/images/branding/categories-icons/`. */
export type CategoryNavItem = {
	label: string
	iconSrc: string
	/** Без посилання — картка лише для відображення (сторінка в доробці). */
	href?: string
}

export const categoryItems: CategoryNavItem[] = [
	{ label: 'Чани, бані, SPA центри', iconSrc: `${CATEGORY_ICON_BASE}/SPA.svg`, href: '/cat/spa-bani-chany' },
	{ label: 'Сільський туризм', iconSrc: `${CATEGORY_ICON_BASE}/tourism.svg` },
	{ label: 'Санаторії Поляни', iconSrc: `${CATEGORY_ICON_BASE}/sanatoriums.svg`, href: '/cat/sanatorii-polyany' },
	{ label: 'Конференц сервіс', iconSrc: `${CATEGORY_ICON_BASE}/conferences.svg`, href: '/cat/konferenc-servis' },
	{ label: 'Їжа та напої', iconSrc: `${CATEGORY_ICON_BASE}/food_drinks.svg`, href: '/cat/yizha-napoyi' },
	{ label: 'Екскурсії', iconSrc: `${CATEGORY_ICON_BASE}/excurs.svg`, href: '/excursions' },
	{ label: 'Готелі Поляни', iconSrc: `${CATEGORY_ICON_BASE}/hotels.svg`, href: '/cat/goteli-polyany' },
	{ label: 'Табори відпочинку', iconSrc: `${CATEGORY_ICON_BASE}/children.svg`, href: '/cat/z-ditmy' },
	{
		label: 'Активний відпочинок',
		iconSrc: `${CATEGORY_ICON_BASE}/activity.svg`,
		href: `/excursions#${EXCURSIONS_MOUNTAINS_ANCHOR_ID}`,
	},
	{ label: 'Сувенір з Поляни', iconSrc: `${CATEGORY_ICON_BASE}/souvenirs.svg`, href: '/cat/suveniry' },
]

type PopularNowItem = {
	badge: string
	title: string
	text: string
	image: string
	href?: string
	/** Якщо true — посилання відкривається в новій вкладці (наприклад деталь готелю). */
	openInNewTab?: boolean
}

export const popularNow: PopularNowItem[] = [
	{
		badge: 'ТОП ГОТЕЛІ',
		title: 'Найкращі готелі Поляни',
		text: 'Підбірка перевірених готелів.',
		image: '/images/gallery/kateryna-pop.webp',
		href: accommodationHotelPath('kateryna'),
		openInNewTab: true,
	},
	{
		badge: 'ТОП ЧАНИ',
		title: 'Чани з видом на гори',
		text: 'Відпочинок, який запам’ятається.',
		image: '/images/gallery/chan_1.webp',
		href: '/cat/spa-bani-chany',
	},
	{
		badge: 'ТОП SPA',
		title: 'SPA для тіла та душі',
		text: 'Релакс, масажі та процедури.',
		image: '/images/gallery/sayna.webp',
		href: '/cat/spa-bani-chany',
	},
]

export const faqItems = [
	{
		question: 'Як до нас доїхати?',
		answer:
			'До Поляни зручно дістатися автобусом із Сваляви або Ужгорода, а також власним авто трасою М-06 з поворотом на Поляну.',
	},
	{
		question: 'Де смачно поїсти в Поляні?',
		answer:
			'У центрі громади є ресторани, колиби та кафе з закарпатською кухнею. На карті вище відмічені ключові гастролокації.',
	},
	{
		question: 'Які туристичні маршрути пропонує Поляна?',
		answer:
			'Популярні напрями: прогулянкові маршрути лісом, Стежка здоровʼя та підйом у напрямку гори Поляна-Кобила.',
	},
	{
		question: 'Як замовити екскурсію в Поляні?',
		answer:
			'Екскурсію можна обрати за категоріями на сайті або звернутися за телефоном у шапці сайту для підбору формату під вас.',
	},
	{
		question: 'Чи дегустують в Поляні вино?',
		answer:
			'Так, у Поляні доступні дегустації локальних напоїв та гастроформати для туристичних груп і сімейних поїздок.',
	},
	{
		question: 'Який сувенір привезти з Поляни?',
		answer:
			'Найчастіше обирають локальні смаколики, травʼяні збори, вироби ручної роботи та сувеніри з символікою Закарпаття.',
	},
	{
		question: 'Де придбати мінеральну воду з Поляни?',
		answer:
			'Мінеральну воду можна придбати у бюветах, спеціалізованих крамницях та на територіях санаторно-оздоровчих комплексів.',
	},
	{
		question: 'Дружні до тварин заклади в Поляні',
		answer:
			'Частина готелів і закладів приймає гостей із тваринами. Рекомендуємо уточнювати умови розміщення під час бронювання.',
	},
] as const

export const heroSlides = [
	'/images/gallery/golovna-foto.webp',
	'/images/gallery/golovna-foto-2.webp',
	'/images/gallery/golovna-foto-3.webp',
] as const
