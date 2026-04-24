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
	position: { lat: number; lng: number }
}

/** Готелі та апарт-готелі Поляни (координати для карти й карток проживання). */
export const polyanaHotels: PolyanaHotel[] = [
	{
		id: 'kateryna',
		name: 'Готель Катерина',
		address: 'Сонячна, 55 Б, Поляна',
		description: 'Сімейний готель зі SPA, рестораном та затишною територією.',
		image: '/images/accommodation/kateryna-v1.jpg',
		price: 'від 1500 ₴',
		rating: '4.3 (1104)',
		feature: 'Безкоштовний Wi-Fi',
		phone: '+380502149266',
		website: 'https://hotel-kateryna.com/',
		position: { lat: 48.62146474176638, lng: 22.97048064221818 },
	},
	{
		id: 'kontinent',
		name: 'Готель Континент',
		address: 'Сонячна, 59, Поляна',
		description: 'Комфортні номери, басейн та оздоровчі процедури.',
		image: '/images/accommodation/kontinent.jpg',
		price: 'від 1800 ₴',
		rating: '4.3 (1256)',
		feature: 'Сніданок включено',
		phone: '+380502149266',
		website: 'https://www.hotel-continent.com/',
		position: { lat: 48.62080723777113, lng: 22.969461724127456 },
	},
	{
		id: 'riverside',
		name: 'River Side Hotel',
		address: 'вул. Духновича, 68, Поляна',
		description: 'Тиха локація біля річки для спокійного відпочинку.',
		image: '/images/accommodation/river-side.jpg',
		price: 'від 1100 ₴',
		rating: '3.8 (61)',
		feature: 'Поруч річка та тиша',
		phone: '+380502149266',
		website: 'https://www.instagram.com/hotel.riverside.ua',
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
		position: { lat: 48.6238240422547, lng: 22.948909722484508 },
	},
]
