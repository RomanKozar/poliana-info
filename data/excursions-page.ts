/** Картки екскурсій для сторінки /excursions (квадроцикли, гори, прогулянки Поляною). */

export type ExcursionDetailSection = {
	title: string
	/** Короткий абзац під заголовком. */
	intro?: string
	/** Маркований список. */
	items?: string[]
}

export type ExcursionListing = {
	id: string
	title: string
	description: string
	image: string
	address: string
	position: { lat: number; lng: number }
	/** Підпис на карті (InfoWindow). */
	mapPill: string
	priceHint?: string
	/** Розгорнутий опис у модальному вікні (наприклад, після кліку на картку). */
	detailModal?: ExcursionDetailSection[]
	/** Велике зображення в модалці (брошура, плакат). */
	detailModalImage?: string
	/** Відкрити детальну сторінку в новій вкладці (шлях на сайті). */
	detailPagePath?: string
}

export type ExcursionTabGroup = {
	id: string
	label: string
	excursions: ExcursionListing[]
}

/** Екскурсії на квадроциклах — одна сітка карток під заголовком. */
export const quadExcursions: ExcursionListing[] = [
	{
		id: 'quad-forest',
		title: 'Quadro Ride — лісовий маршрут для початківців',
		description:
			'Без асфальту: гірські стежки, ліси та панорами Карпат. Інструктаж, шоломи й супровід гіда — обирайте рівень і вирушайте з Поляни.',
		image: '/images/excursions/ATV/atv-11.webp',
		address: 'Старт біля курортної зони Поляни, Закарпатська обл.',
		position: { lat: 48.6182, lng: 22.9625 },
		mapPill: 'Квадроцикли',
		priceHint: 'від 1200 грн / особа',
		detailPagePath: '/excursions/quadro-ride',
	},
	{
		id: 'quad-panorama',
		title: 'Панорама на околицях Поляни',
		description:
			'Динамічніший маршрут із зупинками на фото: види на хребти, короткі підйоми. Тривалість — від 1,5 год.',
		image: '/images/gallery/golovna-foto-2.webp',
		address: 'Організатори зустрічають гостей у зазначеній точці в Поляні.',
		position: { lat: 48.6158, lng: 22.955 },
		mapPill: 'Квадроцикли',
		priceHint: 'від 1800 грн / квадро',
	},
	{
		id: 'quad-sunset',
		title: 'Вечірній виїзд «золота година»',
		description:
			'Спокійніший формат на захід сонця: менше швидкості, більше атмосфери. Мінімальна група — домовленість заздалегідь.',
		image: '/images/gallery/golovna-foto-3.webp',
		address: 'Поляна та прилеглі лісові дороги, Закарпатська обл.',
		position: { lat: 48.6235, lng: 22.973 },
		mapPill: 'Квадроцикли',
		priceHint: 'від 2000 грн',
	},
]

/** Екскурсії в гори — вкладки з окремими наборами карток. */
export const mountainExcursionTabs: ExcursionTabGroup[] = [
	{
		id: 'summits',
		label: 'Вершини та оглядові точки',
		excursions: [
			{
				id: 'mtn-rozhok',
				title: 'Гора Рожок — оглядовий майданчик',
				description:
					'Популярна точка поруч із Поляною: зручний під’їзд, майданчик для фото, маршрут можна поєднати з відпочинком у шале.',
				image: '/images/gallery/golovna-foto.webp',
				address: 'с. Голубине, Закарпатська обл.',
				position: { lat: 48.608805906666305, lng: 23.01986710639653 },
				mapPill: 'Гори',
				priceHint: 'орієнтовно від 800 грн з трансфером',
			},
			{
				id: 'mtn-vyzhen-small',
				title: 'Гора Малий Вижень',
				description:
					'Компактний маршрут для тих, хто хоче відчути висоту без багатогодинного переходу. Чудові краєвиди на довколишні села.',
				image: '/images/gallery/golovna-foto-2.webp',
				address: 'с. Уклин, Закарпатська обл.',
				position: { lat: 48.673916128142324, lng: 22.947541351811637 },
				mapPill: 'Гори',
			},
			{
				id: 'mtn-vyzhen-big',
				title: 'Гора Великий Вижень',
				description:
					'Більш виразний підйом для підготовлених туристів. Рекомендуємо взяти воду, зручне взуття та перевірити прогноз.',
				image: '/images/gallery/golovna-foto-3.webp',
				address: 'с. Верхня Грабівниця, Закарпатська обл.',
				position: { lat: 48.70178118047461, lng: 22.957258642049577 },
				mapPill: 'Гори',
			},
			{
				id: 'mtn-vedmezha',
				title: 'Гора Ведмежа',
				description:
					'Маршрут через лісові ділянки з виходом на відкриті схили. Поруч із Поляною та Уклином — зручно спланувати як денний вихід.',
				image: '/images/entertainment/tybinh-v2-1.webp',
				address: 'с. Уклин, Закарпатська обл.',
				position: { lat: 48.65316352015213, lng: 22.965168433299574 },
				mapPill: 'Гори',
			},
			{
				id: 'mtn-lypcha',
				title: 'Гора Липча',
				description:
					'Варіант для тих, хто шукає менш натоптані стежки. Частина шляху проходить поблизу дороги E471 — дотримуйтесь безпеки.',
				image: '/images/entertainment/tybinh-v2-2.webp',
				address: 'с. Уклин, Закарпатська обл. (E471)',
				position: { lat: 48.66332239338579, lng: 23.02946671577749 },
				mapPill: 'Гори',
			},
			{
				id: 'mtn-velykyy-verkh',
				title: 'Великий Верх (Воловецький масив)',
				description:
					'Оглядова вершина з панорамою на хребти та долини. Підйом можна спланувати як частину дня разом із іншими точками маршруту.',
				image: '/images/gallery/golovna-foto-2.webp',
				address: 'біля с. Воловець, Закарпатська обл.',
				position: { lat: 48.6277, lng: 23.2892 },
				mapPill: 'Гори',
			},
		],
	},
	{
		id: 'ridges',
		label: 'Піші стежки Поляни',
		excursions: [
			{
				id: 'sv-trail-polyana-health',
				title: 'Стежка здоров’я та оглядові ділянки в Поляні',
				description:
					'Помірні маршрути в межах курорту: лавки, рівні ділянки та короткі підйоми. Усе досяжно пішки від готелів і санаторіїв, Свалявський район.',
				image: '/images/entertainment/tybinh-v2-3.webp',
				address: 'смт Поляна, Свалявський р-н, Закарпатська обл.',
				position: { lat: 48.6242, lng: 22.951 },
				mapPill: 'Поляна, пішки',
			},
			{
				id: 'sv-trail-uklin-vedmezha',
				title: 'Піший підйом на Ведмежу від Уклина',
				description:
					'Лісові стежки від села до відкритих схилів. Зручно поєднати з днем у Поляні; орієнтуйтеся на розмітку та погоду, ідіть лише пішки.',
				image: '/images/entertainment/tybinh-v2-1.webp',
				address: 'старт: с. Уклин, Свалявський р-н, Закарпатська обл.',
				position: { lat: 48.6678, lng: 22.9385 },
				mapPill: 'Поляна, пішки',
			},
			{
				id: 'sv-trail-uklin-lypcha',
				title: 'Стежка на Липчу від Уклина',
				description:
					'Менш натоптана траса з виходом на схили; частина шляху поблизу траси — будьте обережні. Повний маршрут піший, без обов’язкового трансферу.',
				image: '/images/entertainment/tybinh-v2-2.webp',
				address: 'старт: с. Уклин, Свалявський р-н (далі стежками)',
				position: { lat: 48.6582, lng: 23.012 },
				mapPill: 'Поляна, пішки',
			},
			{
				id: 'sv-trail-hrabivnytsia-vyzhen',
				title: 'Стежки до Виженя з Верхньої Грабівниці',
				description:
					'Сільські дороги та лісові підйоми до масиву Вижень. Підходить для підготовлених пішоходів; візьміть воду й перевірте прогноз, Свалявський район.',
				image: '/images/gallery/golovna-foto-3.webp',
				address: 'старт: с. Верхня Грабівниця, Свалявський р-н, Закарпатська обл.',
				position: { lat: 48.6975, lng: 22.948 },
				mapPill: 'Поляна, пішки',
			},
		],
	},
]

/** Екскурсії в гори з трансфером — тільки для карти (без окремої вкладки). */
export const mountainGuidedExcursions: ExcursionListing[] = [
	{
		id: 'mtn-guided-day',
		title: 'Денна екскурсія «Карпатський вінтаж»',
		description:
			'Збір у Поляні, мікроавтобус, гід розповідає про історію краю, 1–2 зупинки на короткі переходи. Зручно для компанії.',
		image: '/images/accommodation/kateryna-v1.webp',
		address: 'Старт: центр Поляни, Закарпатська обл.',
		position: { lat: 48.62173358568664, lng: 22.967105354571046 },
		mapPill: 'Гори',
		priceHint: 'від 2500 грн / особа',
	},
	{
		id: 'mtn-guided-photo',
		title: 'Фототур на захід сонця',
		description:
			'Короткий виїзд на оглядову точку в вечірніх променях. Тривалість — близько 3–4 годин разом із дорогою.',
		image: '/images/spa/maliy-chan.png',
		address: 'Поляна — околиці, Закарпатська обл.',
		position: { lat: 48.626204712025924, lng: 22.945207647879602 },
		mapPill: 'Гори',
		priceHint: 'від 1900 грн',
	},
]

/** Екскурсії Поляною — вкладки (місцеві маршрути, стежки, вода). */
export const polyanaExcursionTabs: ExcursionTabGroup[] = [
	{
		id: 'center',
		label: 'Від центру курорту',
		excursions: [
			{
				id: 'pl-street',
				title: 'Променад вулицями Поляни',
				description:
					'Спокійна прогулянка: готельні комплекси, локальні заклади, атмосфера курорту. Можна поєднати з кавою чи обідом.',
				image: '/images/gallery/golovna-foto.webp',
				address: 'вул. Духновича, Поляна, Закарпатська обл.',
				position: { lat: 48.6214, lng: 22.9674 },
				mapPill: 'Поляна',
			},
			{
				id: 'pl-plaza',
				title: 'Торговий центр та інфраструктура',
				description:
					'Ознайомча прогулянка: де зручно закупитися, де зупинитися з дітьми, де шукати туристичні послуги.',
				image: '/images/gallery/golovna-foto-3.webp',
				address: 'ТЦ Polayna Plaza, вул. Духновича, 56, Поляна',
				position: { lat: 48.621581391228176, lng: 22.967498727610323 },
				mapPill: 'Поляна',
			},
		],
	},
	{
		id: 'health',
		label: 'Стежки здоров’я та парки',
		excursions: [
			{
				id: 'pl-health-trail',
				title: 'Стежка здоров’я',
				description:
					'Помірне навантаження, лавки для відпочинку, свіже повітря. Підходить людям різного віку після узгодження з лікарем.',
				image: '/images/entertainment/tybinh-v2-3.webp',
				address: 'Поляна, Закарпатська обл.',
				position: { lat: 48.6242, lng: 22.951 },
				mapPill: 'Поляна',
			},
			{
				id: 'pl-park',
				title: 'Зелені зони біля санаторіїв',
				description:
					'Тихі куточки для прогулянок між процедурами: поєднайте оздоровлення з легкою активністю на свіжому повітрі.',
				image: '/images/accommodation/kontinent.webp',
				address: 'вул. Сонячна, Поляна, Закарпатська обл.',
				position: { lat: 48.62058462616725, lng: 22.9702754849307 },
				mapPill: 'Поляна',
			},
		],
	},
	{
		id: 'water',
		label: 'Мінеральна вода та бювети',
		excursions: [
			{
				id: 'pl-buvet',
				title: 'Дегустація мінеральної води',
				description:
					'Коротка екскурсія з поясненням відмінностей місцевих вод, де безпечно набирати та як поєднати з відпочинком.',
				image: '/images/spa/fitobochka.png',
				address: 'Курортна зона Поляни, Закарпатська обл.',
				position: { lat: 48.62526979873458, lng: 22.94656504413456 },
				mapPill: 'Поляна',
				priceHint: 'часто безкоштовно / за донат',
			},
			{
				id: 'pl-spa-chan',
				title: 'Чан і вода після прогулянки',
				description:
					'Після пішої екскурсії — теплий чан на території комплексу. Бронювання та умови уточнюйте в закладі.',
				image: '/images/spa/maliy-chan.png',
				address: 'готель «Катерина», вул. Сонячна, 55-Б, Поляна',
				position: { lat: 48.621390668230035, lng: 22.970576982649888 },
				mapPill: 'Поляна',
				priceHint: 'за прайсом закладу',
			},
		],
	},
]

/** Усі екскурсії «Поляною» одним списком (без вкладок). */
export function polyanaExcursionListings(): ExcursionListing[] {
	const seen = new Set<string>()
	const out: ExcursionListing[] = []
	for (const tab of polyanaExcursionTabs) {
		for (const e of tab.excursions) {
			if (seen.has(e.id)) continue
			seen.add(e.id)
			out.push(e)
		}
	}
	return out
}

export function allExcursionListings(): ExcursionListing[] {
	const seen = new Set<string>()
	const out: ExcursionListing[] = []
	const push = (e: ExcursionListing) => {
		if (seen.has(e.id)) return
		seen.add(e.id)
		out.push(e)
	}
	for (const e of quadExcursions) push(e)
	for (const tab of mountainExcursionTabs) for (const e of tab.excursions) push(e)
	for (const e of mountainGuidedExcursions) push(e)
	for (const tab of polyanaExcursionTabs) for (const e of tab.excursions) push(e)
	return out
}
