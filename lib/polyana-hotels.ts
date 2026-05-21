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
	/** Агрегат на детальній сторінці (з 10 балів та кількість відгуків), якщо є - замість вирахування з поля rating. */
	detailReviewScoreOutOf10?: number
	detailReviewCount?: number
	/** 4+ фото для каруселі в InfoWindow на карті; якщо нема - дубль основного */
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
		address: 'Сонячна, 55 Б, Поляна, Закарпатська область, 89313',
		description: 'Сімейний готель зі SPA, рестораном та затишною територією.',
		image: '/images/accommodation/kateryna-v1.webp',
		price: 'від 1760 ₴',
		rating: '4.3 (1104)',
		feature: 'Безкоштовний Wi-Fi',
		phone: '+380502149266',
		website: 'https://hotel-kateryna.com/',
		mapGallery: [
			'/images/accommodation/kateryna-v1.webp',
			'/images/accommodation/kateryna/kateryna-hotel/kateryna-hotel-1.webp',
			'/images/accommodation/kateryna/kateryna-hotel/kateryna-hotel-2.webp',
			'/images/accommodation/kateryna/kateryna-hotel/kateryna-hotel-3.webp',
		],
		position: { lat: 48.62146474176638, lng: 22.97048064221818 },
		detailReviewScoreOutOf10: 9.2,
		detailReviewCount: 265,
	},
	{
		id: 'kontinent',
		name: 'Готель Континент',
		address: 'вул. Сонячна, 59, с. Поляна, Закарпатська область',
		description:
			'Готельний комплекс у Поляні: номери з балконами й краєвидом, критий та літній басейни, сауна, ресторан, SPA-послуги, конференц-зали та парковка на території серед озеленення (умови входу до басейнів та SPA - як на сайті готелю).',
		image: '/images/accommodation/kontinent-v1.webp',
		price: 'від 1350 ₴',
		rating: '4.3 (1256)',
		feature: 'Басейни, сауна, ресторан',
		phone: '+380502149266',
		website: 'https://www.hotel-continent.com/',
		mapGallery: [
			'/images/accommodation/kontinent-v1.webp',
			'/images/accommodation/kontinent/kontinent-hotel-1.webp',
			'/images/accommodation/kontinent/kontinent-hotel-2.webp',
			'/images/accommodation/kontinent/kontinent-hotel-3.webp',
		],
		position: { lat: 48.62080723777113, lng: 22.969461724127456 },
		detailReviewScoreOutOf10: 8.6,
		detailReviewCount: 1256,
	},
	{
		id: 'riverside',
		name: 'River Side Hotel',
		address: 'вул. Духновича, 68, с. Поляна, Закарпатська область',
		description:
			'Готель біля гірської річки в Поляні: ресторан із закарпатською кухнею, бар, безкоштовний Wi‑Fi, парковка та цілодобова реєстрація. Номери різної категорії - із балконами й краєвидами; у каталогах указують понад 30 номерів.',
		image: '/images/accommodation/river-side-v1.webp',
		price: 'від 1030 ₴',
		rating: '3.9 (399)',
		feature: 'Ресторан, річка, парковка',
		phone: '+380953011000',
		website: 'https://www.riverside.in.ua/',
		mapGallery: [
			'/images/accommodation/river-side-v1.webp',
			'/images/accommodation/river-side/river-side-hotel-1.webp',
			'/images/accommodation/river-side/river-side-hotel-2.webp',
			'/images/accommodation/river-side/river-side-hotel-3.webp',
		],
		position: { lat: 48.62244278745904, lng: 22.96724255849585 },
		detailReviewScoreOutOf10: 7.7,
		detailReviewCount: 399,
	},
]
