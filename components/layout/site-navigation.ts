import { categoryItems } from '@/data/home-page'

export type NavigationItem = {
	href: string
	label: string
	/** Окремий стан випадаючого списку в мобільному меню (як у «Новин»). */
	submenuKey?: 'news' | 'popular' | 'accommodation'
	children?: {
		href: string
		label: string
	}[]
}

export const siteNavigation: NavigationItem[] = [
	{ href: '/poliana', label: 'Поляна' },
	{
		href: '/blog',
		label: 'Новини',
		submenuKey: 'news',
		children: [
			{ href: '/blog/latest-news', label: 'Останні новини' },
			{ href: '/blog/poliana-in-spring', label: 'Поляна весною' },
			{ href: '/blog/summer-vacation', label: 'Літній відпочинок' },
			{ href: '/blog/autumn-vacation', label: 'Осінній відпочинок' },
			{ href: '/blog/poliana-in-winter', label: 'Поляна Взимку' },
		],
	},
	{
		href: '/',
		label: 'Популярне',
		submenuKey: 'popular',
		children: categoryItems.map(({ label, href }) => ({ label, href })),
	},
	{
		href: '/cat/goteli-polyany',
		label: 'Проживання',
		submenuKey: 'accommodation',
		children: [
			{ href: '/cat/goteli-polyany', label: 'Готелі Поляни' },
			{ href: '/cat/silskyi-turizm', label: 'Сільський туризм' },
			{ href: '/cat/sanatorii-polyany', label: 'Санаторії Поляни' },
		],
	},
	{ href: '/gastronomy', label: 'Форель' },
	{ href: '/camps', label: 'Табори відпочинку' },
]
