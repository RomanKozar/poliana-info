import { siteNavigation } from '@/components/layout/site-navigation'
import { accommodations, camps, categoryItems } from '@/data/home-page'
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
]

const SITE_SEARCH_INDEX_RAW: SiteSearchItem[] = [
	...BASE_ITEMS,
	...categoryItems.map(c => ({
		title: c.label,
		href: c.href,
		keywords: [c.label],
		section: 'Категорії',
	})),
	...siteNavigation.flatMap(item => {
		const self: SiteSearchItem[] = item.href === '/' ? [] : [{ title: item.label, href: item.href }]
		const children: SiteSearchItem[] = (item.children ?? []).map(c => ({ title: c.label, href: c.href }))
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

