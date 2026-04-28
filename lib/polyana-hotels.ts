export type PolyanaHotel = {
	id: string
	name: string
	address: string
	description: string
	image: string
	price: string
	rating: string
	feature: string
	phone: string
	website: string
	/** Агрегат на детальній сторінці (з 10 балів та кількість відгуків), якщо є — замість вирахування з поля rating. */
	detailReviewScoreOutOf10?: number
	detailReviewCount?: number
	/** 4+ фото для каруселі в InfoWindow на карті; якщо нема — дубль основного */
	mapGallery?: string[]
	position: { lat: number; lng: number }
}

/** Слайди для картки на мапі; тимчасово можна будь-які, потім замінити. */
export function getHotelMapGallery(hotel: PolyanaHotel): string[] {
	if (hotel.mapGallery?.length) {
		const g = hotel.mapGallery.filter(x => x.trim().length > 0)
		if (g.length > 0) return g
	}
	return [hotel.image, hotel.image, hotel.image, hotel.image]
}

/** Готелі та апарт-готелі Поляни (координати для карти й карток проживання). */
export const polyanaHotels: PolyanaHotel[] = [
	{
		id: 'kateryna',
		name: 'Готель Катерина',
		address: 'Сонячна, 55 Б, Поляна',
		description: 'Сімейний готель зі SPA, рестораном та затишною територією.',
		image: '/images/accommodation/kateryna-v1.webp',
		price: 'від 1500 ₴',
		rating: '4.3 (1104)',
		feature: 'Безкоштовний Wi-Fi',
		phone: '+380502149266',
		website: 'https://hotel-kateryna.com/',
		mapGallery: [
			'/images/accommodation/kateryna-v1.webp',
			'/images/gallery/golovna-foto.webp',
			'/images/gallery/golovna-foto-2.webp',
			'/images/gallery/golovna-foto-3.webp',
		],
		position: { lat: 48.62146474176638, lng: 22.97048064221818 },
		detailReviewScoreOutOf10: 9.2,
		detailReviewCount: 265,
	},
	{
		id: 'kontinent',
		name: 'Готель Континент',
		address: 'Сонячна, 59, Поляна',
		description: 'Комфортні номери, басейн та оздоровчі процедури.',
		image: '/images/accommodation/kontinent.webp',
		price: 'від 1800 ₴',
		rating: '4.3 (1256)',
		feature: 'Сніданок включено',
		phone: '+380502149266',
		website: 'https://www.hotel-continent.com/',
		mapGallery: [
			'/images/accommodation/kontinent.webp',
			'/images/gallery/chan_1.webp',
			'/images/gallery/sayna.webp',
			'/images/gallery/akziya.webp',
		],
		position: { lat: 48.62080723777113, lng: 22.969461724127456 },
	},
	{
		id: 'riverside',
		name: 'River Side Hotel',
		address: 'вул. Духновича, 68, Поляна',
		description: 'Тиха локація біля річки для спокійного відпочинку.',
		image: '/images/accommodation/river-side.webp',
		price: 'від 1100 ₴',
		rating: '3.8 (61)',
		feature: 'Поруч річка та тиша',
		phone: '+380502149266',
		website: 'https://www.instagram.com/hotel.riverside.ua',
		mapGallery: [
			'/images/accommodation/river-side.webp',
			'/images/entertainment/tybinh-v2-1.webp',
			'/images/entertainment/tybinh-v2-2.webp',
			'/images/entertainment/tybinh-v2-3.webp',
		],
		position: { lat: 48.62244278745904, lng: 22.96724255849585 },
	},
	{
		id: 'arena',
		name: 'Arena Apart-Hotel',
		address: 'Курортна, 23, Поляна',
		description: 'Апарт-готель зі SPA-зоною та сучасними апартаментами.',
		image: '/images/accommodation/arena.webp',
		price: 'від 2500 ₴',
		rating: '4.7 (212)',
		feature: 'Сучасні апартаменти',
		phone: '+380502149266',
		website: 'https://arena-hotel.com.ua/',
		mapGallery: [
			'/images/accommodation/arena.webp',
			'/images/gallery/golovna-foto-2.webp',
			'/images/kids-camps/camp-1.webp',
			'/images/kids-camps/camp-2.webp',
		],
		position: { lat: 48.6238240422547, lng: 22.948909722484508 },
	},
]
