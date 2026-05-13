import { siteNavigation } from '@/components/layout/site-navigation'
import { accommodations, camps, categoryItems, type CategoryNavItem } from '@/data/home-page'
import { allExcursionListings, EXCURSIONS_MOUNTAINS_ANCHOR_ID } from '@/data/excursions-page'
import { diningMapMarkers, touristCityMapMarkers } from '@/lib/home-map-markers'

export type SiteSearchItem = {
	title: string
	href: string
	keywords?: string[]
	section?: string
}

const BASE_ITEMS: SiteSearchItem[] = [
	{ title: 'Головна', href: '/', keywords: ['home', 'головна'] },
	{ title: 'Карта Поляни', href: '/#polyana-map', keywords: ['карта', 'map', 'готелі', 'магазини'] },
	{ title: 'Контакти (зворотний звʼязок)', href: '/contacts', keywords: ['контакти', 'звʼязок', 'чат'] },
	{ title: 'Політика конфіденційності', href: '/privacy', keywords: ['privacy', 'дані', 'cookie'] },
	{ title: 'Умови використання', href: '/terms', keywords: ['terms', 'умови'] },
	{
		title: 'Ресторани та заклади харчування',
		href: '/?mapLayer=dining#polyana-map',
		keywords: ['ресторани', 'їжа', 'кафе', 'каварня', 'кавʼярня', 'форель', 'бограч', 'банош', 'меню'],
		section: 'Гастрономія',
	},
	{
		title: 'Про форель у Поляні',
		href: '/trout',
		keywords: ['форель', 'риболовля', 'риба', 'ресторан', 'trout'],
		section: 'Форель',
	},
	{
		title: 'Екскурсії та активний відпочинок',
		href: `/excursions#${EXCURSIONS_MOUNTAINS_ANCHOR_ID}`,
		keywords: ['екскурсії', 'активний відпочинок', 'гори', 'піші', 'маршрути', 'квадроцикли', 'atv', 'джипінг'],
	},
	{
		title: 'Квадроцикли (Quadro Ride)',
		href: '/excursions/quadro-ride',
		keywords: ['квадроцикли', 'квадро', 'atv', 'квадрики', 'quadro', 'ride', 'маршрут', 'ліс', 'панорама'],
		section: 'Екскурсії',
	},
	{
		title: 'Великі чани в Поляні — порівняння та карта',
		href: '/cat/spa-bani-chany/veliki-chany',
		keywords: ['чани', 'великий чан', 'SPA Поляна', 'купіль', 'бронювання чан', 'ціни чан'],
		section: 'SPA та відпочинок',
	},
	{
		title: 'Малі чани в Поляні — порівняння та карта',
		href: '/cat/spa-bani-chany/mali-chany',
		keywords: ['чани', 'малий чан', 'SPA Поляна', 'купіль', 'бронювання чан', 'ціни чан'],
		section: 'SPA та відпочинок',
	},
	{
		title: 'Бані та сауни в Поляні — порівняння та карта',
		href: '/cat/spa-bani-chany/bani',
		keywords: ['бані', 'сауна', 'лазня', 'SPA Поляна', 'баня Поляна', 'Закарпаття'],
		section: 'SPA та відпочинок',
	},
]

const SITE_SEARCH_INDEX_RAW: SiteSearchItem[] = [
	...BASE_ITEMS,
	...categoryItems
		.filter((c): c is CategoryNavItem & { href: string } => Boolean(c.href))
		.map(c => ({
			title: c.label,
			href: c.href,
			keywords: [c.label],
			section: 'Категорії',
		})),
	...siteNavigation.flatMap(item => {
		const self: SiteSearchItem[] = item.href === '/' ? [] : [{ title: item.label, href: item.href }]
		const children: SiteSearchItem[] = (item.children ?? [])
			.filter((c): c is { label: string; href: string } => Boolean(c.href))
			.map(c => ({ title: c.label, href: c.href }))
		return [...self, ...children]
	}),
	...diningMapMarkers.map(place => ({
		title: place.name,
		href: `/?mapPlace=${encodeURIComponent(place.name)}#polyana-map`,
		keywords: [place.address, place.category],
		section: 'Ресторани',
	})),
	...touristCityMapMarkers.map(place => ({
		title: place.name,
		href: `/?mapPlace=${encodeURIComponent(place.name)}#polyana-map`,
		keywords: [place.address, place.category],
		section: 'Гори / точки',
	})),
	...allExcursionListings().map(e => ({
		title: e.title,
		href: e.detailPagePath ?? `/excursions?excursion=${encodeURIComponent(e.id)}`,
		keywords: [e.mapPill, e.description, e.address, e.priceHint ?? ''],
		section: 'Екскурсії',
	})),
	...accommodations.map(a => ({
		title: a.title,
		href: `/cat/goteli-polyany/${a.id}`,
		keywords: [a.location, a.description],
		section: 'Проживання',
	})),
	...camps
		.filter(c => c.detailPath)
		.map(c => ({
			title: c.title,
			href: c.detailPath!,
			keywords: [c.age, c.dates, c.season],
			section: 'Табори',
		})),
]

function uniqByHref(items: SiteSearchItem[]): SiteSearchItem[] {
	const map = new Map<string, SiteSearchItem>()
	for (const item of items) {
		const prev = map.get(item.href)
		if (!prev) {
			map.set(item.href, item)
			continue
		}

		const nextKeywords = Array.from(
			new Set([...(prev.keywords ?? []), ...(item.keywords ?? [])].filter(Boolean))
		)

		// Prefer an entry that has a section label, and keep the more descriptive title if different.
		const section = prev.section ?? item.section
		const title = prev.title.length >= item.title.length ? prev.title : item.title

		map.set(item.href, { title, href: item.href, section, keywords: nextKeywords.length ? nextKeywords : undefined })
	}
	return Array.from(map.values())
}

export const SITE_SEARCH_INDEX: SiteSearchItem[] = uniqByHref(SITE_SEARCH_INDEX_RAW)

function normalize(text: string) {
	return text
		.toLowerCase()
		.replace(/['’`ʼ]/g, '')
		.replace(/[^a-zа-яіїєґ0-9\s-]/giu, ' ')
		.replace(/\s+/g, ' ')
		.trim()
}

/** Слова, які часто додають до запиту («шукаю чани») — не вважаємо їх змістом для прямого переходу. */
const SEARCH_FILLER_WORDS = new Set([
	'шукай',
	'шукаю',
	'шукати',
	'хочу',
	'дай',
	'покажи',
	'скажи',
	'де',
	'як',
	'про',
	'мені',
	'на',
	'в',
	'у',
	'зі',
	'з',
	'до',
	'цей',
	'ця',
	'ці',
	'цю',
	'для',
	'трохи',
	'відкрий',
	'відкрити',
	'сторінк',
	'сайт',
])

function significantSearchTokens(q: string): string[] {
	return q.split(/\s+/).filter(w => w.length > 0 && !SEARCH_FILLER_WORDS.has(w))
}

/**
 * Якщо запит однозначно вказує на розділ сайту — одразу відкриваємо відповідну сторінку (Enter у пошуку, /search?q=…).
 * Порядок правил важливий: спочатку вужчі збіги (квадро, великі/малі чани), потім загальні.
 */
export function getSearchDirectHref(rawQuery: string): string | null {
	const q = normalize(rawQuery)
	if (!q) return null

	const excursionsMountainsHref = `/excursions#${EXCURSIONS_MOUNTAINS_ANCHOR_ID}`

	const substringRules: { needle: string; href: string }[] = [
		{ needle: 'квадроцикли', href: '/excursions/quadro-ride' },
		{ needle: 'квадроцикл', href: '/excursions/quadro-ride' },
		{ needle: 'quadro ride', href: '/excursions/quadro-ride' },
		{ needle: 'великі чани', href: '/cat/spa-bani-chany/veliki-chany' },
		{ needle: 'великий чан', href: '/cat/spa-bani-chany/veliki-chany' },
		{ needle: 'малі чани', href: '/cat/spa-bani-chany/mali-chany' },
		{ needle: 'малий чан', href: '/cat/spa-bani-chany/mali-chany' },
		{ needle: 'бані в поляні', href: '/cat/spa-bani-chany/bani' },
		{ needle: 'бані поляна', href: '/cat/spa-bani-chany/bani' },
		{ needle: 'сауна поляна', href: '/cat/spa-bani-chany/bani' },
		{ needle: 'екскурсії в гори', href: excursionsMountainsHref },
		{ needle: 'екскурсія в гори', href: excursionsMountainsHref },
		{ needle: 'піші маршрути', href: excursionsMountainsHref },
		{ needle: 'активний відпочинок', href: excursionsMountainsHref },
		{ needle: 'готелі поляни', href: '/cat/goteli-polyany' },
		{ needle: 'готель поляна', href: '/cat/goteli-polyany' },
		{ needle: 'джипінг', href: excursionsMountainsHref },
		{ needle: 'дитячі табори', href: '/camps' },
		{ needle: 'дитячий табір', href: '/camps' },
		{ needle: 'мінеральна вода', href: '/cat/mineralna-voda' },
		{ needle: 'сільський туризм', href: '/cat/silskyi-turizm' },
		{ needle: 'акції та пропозиції', href: '/aktsii-ta-propozitsii' },
		{ needle: 'про нас', href: '/about' },
		{ needle: 'про проєкт', href: '/about' },
	]

	for (const { needle, href } of substringRules) {
		if (q.includes(needle)) return href
	}

	const sig = significantSearchTokens(q)
	if (sig.length === 0) return null

	/** Один «значущий» токен після відсікання слів-паразитів — типові односкладові запити. */
	if (sig.length === 1) {
		const w = sig[0]
		const one: Record<string, string> = {
			чани: '/cat/spa-bani-chany',
			чан: '/cat/spa-bani-chany',
			бані: '/cat/spa-bani-chany/bani',
			баня: '/cat/spa-bani-chany/bani',
			купіль: '/cat/spa-bani-chany',
			купелі: '/cat/spa-bani-chany',
			spa: '/cat/spa-bani-chany',
			сауна: '/cat/spa-bani-chany/bani',
			фітобочка: '/cat/spa-bani-chany',
			фітобочки: '/cat/spa-bani-chany',
			екскурсії: excursionsMountainsHref,
			екскурсія: excursionsMountainsHref,
			excursion: excursionsMountainsHref,
			excursions: excursionsMountainsHref,
			квадро: '/excursions/quadro-ride',
			atv: '/excursions/quadro-ride',
			quadro: '/excursions/quadro-ride',
			гори: excursionsMountainsHref,
			ліс: excursionsMountainsHref,
			тюбінг: '/entertainment',
			лижі: '/entertainment',
			проживання: '/cat/goteli-polyany',
			готелі: '/cat/goteli-polyany',
			готель: '/cat/goteli-polyany',
			житло: '/cat/goteli-polyany',
			ночівля: '/cat/goteli-polyany',
			апартаменти: '/cat/goteli-polyany',
			табори: '/camps',
			табір: '/camps',
			форель: '/trout',
			блог: '/blog',
			новини: '/blog',
			контакти: '/contacts',
			карта: '/#polyana-map',
			карту: '/#polyana-map',
			головна: '/',
			поляна: '/poliana',
			полянське: '/polianski',
			гастрономія: '/gastronomy',
			розваги: '/entertainment',
			wellness: '/wellness',
			спа: '/cat/spa-bani-chany',
			діти: '/kids-camps',
			санаторії: '/cat/sanatorii-polyany',
			санаторій: '/cat/sanatorii-polyany',
			сувеніри: '/cat/suveniry',
			конференц: '/cat/konferenc-servis',
			їжа: '/cat/yizha-napoyi',
			напої: '/cat/yizha-napoyi',
			акції: '/aktsii-ta-propozitsii',
			знижки: '/aktsii-ta-propozitsii',
			пропозиції: '/aktsii-ta-propozitsii',
		}
		if (one[w]) return one[w]
	}

	/** Два значущі токени: «дитячі табори», «їжа напої» тощо. */
	if (sig.length === 2) {
		const [a, b] = sig
		const pair = `${a} ${b}`
		const pairRev = `${b} ${a}`
		const pairRules: Record<string, string> = {
			'дитячі табори': '/camps',
			'табори дитячі': '/camps',
			'їжа напої': '/cat/yizha-napoyi',
			'напої їжа': '/cat/yizha-napoyi',
			'екскурсії гори': excursionsMountainsHref,
			'гори екскурсії': excursionsMountainsHref,
			'чани бані': '/cat/spa-bani-chany',
			'бані чани': '/cat/spa-bani-chany',
		}
		if (pairRules[pair]) return pairRules[pair]
		if (pairRules[pairRev]) return pairRules[pairRev]
	}

	return null
}

export function searchSite(query: string, limit = 8): SiteSearchItem[] {
	const q = normalize(query)
	if (!q) return []

	const qWords = q.split(' ').filter(Boolean)

	const scored = SITE_SEARCH_INDEX.map(item => {
		const hay = normalize([item.title, item.section, ...(item.keywords ?? [])].filter(Boolean).join(' '))
		let score = 0
		if (hay.startsWith(q)) score += 8
		if (hay.includes(q)) score += 4
		for (const w of qWords) {
			if (hay.includes(w)) score += 1
		}
		return { item, score }
	})
		.filter(x => x.score > 0)
		.sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title, 'uk'))

	return scored.slice(0, limit).map(x => x.item)
}

