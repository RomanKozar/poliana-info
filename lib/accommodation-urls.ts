/** Slug категорії «Готелі Поляни» — збігається з `app/cat/[slug]` та `app/cat/goteli-polyany/[id]`. */
export const HOTELS_CATEGORY_SLUG = 'goteli-polyany'

/** Канонічний URL підборки готелів на карті (меню «Готелі», блок «Популярне»). */
export const ACCOMMODATION_LIST_PATH = `/cat/${HOTELS_CATEGORY_SLUG}`

/** Детальна сторінка готелю під категорією «Готелі Поляни». */
export function accommodationHotelPath(id: string): string {
	return `${ACCOMMODATION_LIST_PATH}/${id}`
}
