import { siteHeaderPhoneTel } from '@/data/trout-page'

/** Як у таблицях SPA-розділу: один клік — дзвінок на номер порталу. */
export const SPA_MASAZHI_BOOKING_HREF = `tel:${siteHeaderPhoneTel}` as const

export type SpaMasazhiServiceItem = {
	id: string
	/** Назва послуги */
	name: string
	/** Тривалість сеансу для відображення */
	duration: string
	priceUah: number
}

export type SpaMasazhiServiceCategory = {
	id: string
	title: string
	items: SpaMasazhiServiceItem[]
}

function uah(n: number): string {
	return `${n.toLocaleString('uk-UA')}\u00a0₴`
}

/**
 * Перелік за прикладом SPA-меню ГТК «Катерина» (Поляна).
 * У інших закладах назви, час і тарифи можуть відрізнятися — завжди уточнюйте на місці.
 */
export const SPA_MASAZHI_MENU_CATEGORIES: SpaMasazhiServiceCategory[] = [
	{
		id: 'relax',
		title: 'Релакс масажі',
		items: [
			{
				id: 'relax-harmony-body',
				name: 'Загальний релакс масаж з аромомаслами «Гармонія з тілом»',
				duration: '50–60 хв',
				priceUah: 900,
			},
			{
				id: 'relax-harmony-neck',
				name: 'Гармонія (масаж воротникової зони, голови, рук)',
				duration: '25 хв',
				priceUah: 500,
			},
			{
				id: 'relax-harmony-health',
				name: 'Гармонія «Health» (масаж спини, рук, голови з аромомаслами)',
				duration: '30 хв',
				priceUah: 600,
			},
		],
	},
	{
		id: 'wellness',
		title: 'Оздоровчі масажі',
		items: [
			{
				id: 'wellness-general',
				name: 'Загальний оздоровчий масаж',
				duration: '60 хв',
				priceUah: 1000,
			},
			{
				id: 'wellness-acupuncture',
				name: 'Голкотерапія + загальний оздоровчий масаж',
				duration: '90 хв',
				priceUah: 1150,
			},
			{
				id: 'wellness-anticellulite-legs',
				name: 'Антицелюлітний масаж ніг (передня 10 хв та задня 15 хв)',
				duration: '25 хв',
				priceUah: 700,
			},
			{
				id: 'wellness-lymph',
				name: 'Лімфодренажний масаж (всього тіла з розігріваючими маслами)',
				duration: '60 хв',
				priceUah: 1050,
			},
			{
				id: 'wellness-back-med',
				name: 'Масаж спини лікувальний',
				duration: '30 хв',
				priceUah: 550,
			},
			{
				id: 'wellness-neck-collar',
				name: 'Масаж шийно-комірцевої зони',
				duration: '15 хв',
				priceUah: 300,
			},
			{
				id: 'wellness-lumbar',
				name: 'Масаж попереково-крижового відділу',
				duration: '10 хв',
				priceUah: 350,
			},
			{
				id: 'wellness-legs',
				name: 'Масаж ніг',
				duration: '25 хв',
				priceUah: 300,
			},
			{
				id: 'wellness-belly-or-head',
				name: 'Масаж живота або голови',
				duration: '20 хв',
				priceUah: 350,
			},
			{
				id: 'wellness-hands',
				name: 'Масаж рук',
				duration: '15 хв',
				priceUah: 200,
			},
			{
				id: 'wellness-stone',
				name: 'Стоун-терапія',
				duration: '60 хв',
				priceUah: 1400,
			},
		],
	},
	{
		id: 'children',
		title: 'Масаж для дітей',
		items: [
			{
				id: 'children-general',
				name: 'Загальний оздоровчий масаж',
				duration: '30 хв',
				priceUah: 450,
			},
		],
	},
]

export function spaMasazhiPriceLabel(uahAmount: number): string {
	return uah(uahAmount)
}
