import type { IconType } from 'react-icons'
import {
	FaBiking,
	FaCamera,
	FaFish,
	FaHeart,
	FaHiking,
	FaMapMarkerAlt,
	FaRegClock,
	FaSpa,
	FaStar,
	FaUtensils,
	FaWater,
} from 'react-icons/fa'

export const accommodations = [
	{
		title: 'Готель "Катерина"',
		location: 'Сонячна, 55 Б, Поляна, Закарпатська область, 89313',
		description: 'Затишний готель у самому серці курорту.',
		price: 'від 1500 грн',
		rating: '4.3 (1104)',
		image: '/images/accommodation/kateryna-v1.webp',
		website: 'https://hotel-kateryna.com/',
	},
	{
		title: 'Готель "Континент"',
		location: 'вул. Сонячна, 59, Поляна, Закарпатська область, 89313',
		description: 'Комфортні номери, басейн, SPA зона.',
		price: 'від 1800 грн',
		rating: '4.3 (1256)',
		image: '/images/accommodation/kontinent.webp',
		website: 'https://www.hotel-continent.com/',
	},
	{
		title: 'River Side Hotel',
		location: 'вул. Духновича, 68, Поляна, Закарпатська область, 89313',
		description: 'Сімейний відпочинок, тиша та свіже повітря Карпат.',
		price: 'від 1100 грн',
		rating: '3.8 (61)',
		image: '/images/accommodation/river-side.webp',
		website: 'https://www.instagram.com/hotel.riverside.ua?igsh=Y280d250MmF4Y2p5',
	},
	{
		title: 'Arena Apart-Hotel',
		location: 'Курортна вулиця, 23, Поляна, Закарпатська область, 89314',
		description: 'Сучасний апарт-готель зі SPA, сауною та відкритим басейном.',
		price: 'від 2500 грн',
		rating: '4.7 (212)',
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

export const camps = [
	{
		title: 'Табір "Гірський орел"',
		age: '7-15 років',
		description: 'Активний відпочинок у горах.',
		price: 'від 9500 грн',
		image: '/images/kids-camps/camp-1.webp',
	},
	{
		title: 'Табір "Карпатська пригода"',
		age: '8-15 років',
		description: 'Пригодницькі зміни для дітей.',
		price: 'від 8900 грн',
		image: '/images/kids-camps/camp-2.webp',
	},
	{
		title: 'Табір "Лісова школа"',
		age: '6-13 років',
		description: 'Природа, творчість та нові друзі.',
		price: 'від 7900 грн',
		image: '/images/kids-camps/camp-3.webp',
	},
	{
		title: 'Табір "Young Camp"',
		age: '10-17 років',
		description: 'Англійська, спорт та креативні модулі.',
		price: 'від 9900 грн',
		image: '/images/kids-camps/camp-4.webp',
	},
] as const

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

/** Категорії блоку «Популярні категорії» на головній та в меню «Популярне» в шапці. */
export const categoryItems: { label: string; icon: IconType; href: string }[] = [
	{ label: 'Чани, бані, SPA центри', icon: FaSpa, href: '/cat/spa-bani-chany' },
	{ label: 'Мінеральна вода', icon: FaWater, href: '/cat/mineralna-voda' },
	{ label: 'Сільський туризм', icon: FaHiking, href: '/cat/silskyi-turizm' },
	{ label: 'Санаторії Поляни', icon: FaHeart, href: '/cat/sanatorii-polyany' },
	{ label: 'Конференц сервіс', icon: FaRegClock, href: '/cat/konferenc-servis' },
	{ label: 'Їжа та напої', icon: FaUtensils, href: '/cat/yizha-napoyi' },
	{ label: 'Екскурсії Поляною', icon: FaCamera, href: '/excursions' },
	{ label: 'Дегустації', icon: FaFish, href: '/cat/dehustacii' },
	{ label: 'Готелі Поляни', icon: FaStar, href: '/cat/goteli-polyany' },
	{ label: 'Відпочинок з дітьми', icon: FaHeart, href: '/cat/z-ditmy' },
	{ label: 'Активний відпочинок', icon: FaBiking, href: '/cat/aktyvnyi-vidpochynok' },
	{ label: 'Сувенір з Поляни', icon: FaMapMarkerAlt, href: '/cat/suveniry' },
]

export const popularNow = [
	{
		badge: 'ТОП ГОТЕЛІ',
		title: 'Найкращі готелі Поляни',
		text: 'Підбірка перевірених готелів.',
		image: '/images/gallery/kateryna-pop.webp',
	},
	{
		badge: 'ТОП ЧАНИ',
		title: 'Чани з видом на гори',
		text: 'Відпочинок, який запам’ятається.',
		image: '/images/gallery/chan_1.webp',
	},
	{
		badge: 'ТОП SPA',
		title: 'SPA для тіла та душі',
		text: 'Релакс, масажі та процедури.',
		image: '/images/gallery/sayna.webp',
	},
] as const

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

export const campYears = ['2026', '2025', '2024'] as const

export const heroSlides = [
	'/images/gallery/golovna-foto.webp',
	'/images/gallery/golovna-foto-2.webp',
	'/images/gallery/golovna-foto-3.webp',
] as const
