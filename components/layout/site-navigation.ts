export type NavigationItem = {
	href: string
	label: string
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
		children: [
			{ href: '/blog/latest-news', label: 'Останні новини' },
			{ href: '/blog/poliana-in-spring', label: 'Поляна весною' },
			{ href: '/blog/summer-vacation', label: 'Літній відпочинок' },
			{ href: '/blog/autumn-vacation', label: 'Осінній відпочинок' },
			{ href: '/blog/poliana-in-winter', label: 'Поляна Взимку' },
		],
	},
	{ href: '/accommodation', label: 'Проживання' },
	{ href: '/gastronomy', label: 'Форель' },
	{ href: '/spa', label: 'SPA та відпочинок' },
	{ href: '/camps', label: 'Табори відпочинку' },
]
