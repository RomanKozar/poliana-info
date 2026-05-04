import { EXCURSIONS_MOUNTAINS_ANCHOR_ID } from '@/data/excursions-page'

/** Сторінка «Акції та пропозиції» — шлях узгоджуй із посиланнями з головної. */
export const PROMOTIONS_PAGE_PATH = '/aktsii-ta-propozitsii' as const

export type PromoAccent = 'coral' | 'cyan' | 'emerald' | 'amber'

export type PromoOffer = {
	id: string
	badge: string
	title: string
	description: string
	accent: PromoAccent
	href: string
	cta: string
}

export const promotionsHeroLead =
	'Зібрали формати відпочинку з вигодою: комбо-пакети, сезонні ідеї та знижки для груп. Уточнюйте актуальні ціни й дати — Поляна завжди має щось особливе для гостей Закарпаття.'

/** Добірка пропозицій (контент можна змінювати без правок верстки). */
export const promotionsOffers: PromoOffer[] = [
	{
		id: 'fish-chan',
		badge: 'Гастро + SPA',
		title: 'Форель і чан — свіжий смак Карпат',
		description:
			'Поєднайте відпочинок біля водойми зігрітими чанами: локальна форель, карпатський настрій і мінус стрес.',
		accent: 'coral',
		href: '/gastronomy',
		cta: 'Форель і риболовля',
	},
	{
		id: 'spa-hub',
		badge: 'Розслаблення',
		title: 'Чани, бані та SPA в одному напрямі',
		description:
			'Підбір закладів із чанами й процедурами — обирайте формат від короткого ритуалу до повного дня догляду.',
		accent: 'cyan',
		href: '/cat/spa-bani-chany',
		cta: 'Дивитись розділ SPA',
	},
	{
		id: 'stay',
		badge: 'Житло',
		title: 'Готелі Поляни з вигідними умовами',
		description:
			'Знайдіть номер поруч із підйомниками, SPA або прогулянковими стежками — порівнюйте ціни й зручність на карті.',
		accent: 'emerald',
		href: '/cat/goteli-polyany',
		cta: 'Готелі на карті',
	},
	{
		id: 'quadro',
		badge: 'Актив',
		title: 'Quadro Ride — адреналін без асфальту',
		description:
			'Маршрути на квадроциклах з інструктажем і гідом: обирайте тривалість і рівень складності перед приїздом.',
		accent: 'amber',
		href: '/excursions/quadro-ride',
		cta: 'Деталі туру',
	},
	{
		id: 'mountains',
		badge: 'Природа',
		title: 'Екскурсії в гори з Поляни',
		description:
			'Вершини, оглядові точки та стежки поруч із курортом — сплануйте день із карти екскурсій.',
		accent: 'cyan',
		href: `/excursions#${EXCURSIONS_MOUNTAINS_ANCHOR_ID}`,
		cta: 'Екскурсії в гори',
	},
	{
		id: 'groups',
		badge: 'Групам',
		title: 'Окремі умови для компаній і турів',
		description:
			'Ресторани, табори та оздоровчі формати — описуємо сценарій під вашу групу та узгоджуємо все голосом.',
		accent: 'emerald',
		href: '/contacts',
		cta: 'Звʼязатися',
	},
]

export const promotionsTips: ReadonlyArray<{ title: string; text: string }> = [
	{
		title: 'Уточнюйте дату заздалегідь',
		text: 'Наприкінці сезону й у свята найкращі слоти розбирають швидко — напишіть або зателефонуйте у зручний час.',
	},
	{
		title: 'Комбінуйте активність і відпочинок',
		text: 'Ранковий підйом або квадро, день у SPA або чані — так відпустка в Поляні стає насиченою без метань.',
	},
	{
		title: 'Один номер для підказки',
		text: 'Якщо не впевнені, що обрати — ми підкажемо логічний маршрут під ваш бюджет і склад групи.',
	},
]
