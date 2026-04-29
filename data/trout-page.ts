/** Телефон як у components/layout/Header.tsx (href `tel:${siteHeaderPhoneTel}`) — підтримуй синхронно. */
export const siteHeaderPhoneTel = '0502149266' as const

export const siteHeaderPhoneDisplay = '0 (50) 214 92 66'

/** Усі локальні зображення форелі й ресторану з `public/igames/trout/`. */
export const troutFishingImages = [
	{ src: '/igames/trout/trout-1.webp', alt: 'Форелева риболовля в Карпатах' },
	{ src: '/igames/trout/trout-2.webp', alt: 'Рибалка на форелевій фермі' },
	{ src: '/igames/trout/trout-3.webp', alt: 'Риболовля й відпочинок біля водойми' },
	{ src: '/igames/trout/trout-4.webp', alt: 'Улов форелі' },
	{ src: '/igames/trout/trout-5.webp', alt: 'Рибне господарство — атмосфера' },
] as const

export const troutRestaurantImages = [
	{ src: '/igames/trout/restoran-1.webp', alt: 'Смачно приготована форель у ресторані' },
	{ src: '/igames/trout/restoran-2.webp', alt: 'Закуски та форель до столу' },
	{ src: '/igames/trout/restoran-3.webp', alt: 'Ресторанна подача страв із форелі' },
] as const

/** Одна точка форелі для Google Maps (JS API або fallback iframe `q=`). */
export const troutMapSpot = {
	lat: 48.62133408173172,
	lng: 22.970964809544952,
	zoom: 17,
	title: 'Форель',
} as const

/**
 * Одна вкладка Google Maps «Маршрут» із пунктом призначення = точка форелі
 * (@see https://developers.google.com/maps/documentation/urls/get-started#directions-action)
 */
export function getTroutMapGoogleDirectionsHref(): string {
	const { lat, lng } = troutMapSpot
	return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`
}

/** Загальний список (усі файли з папки для SEO / розширень). */
export const allTroutPageImages = [...troutFishingImages, ...troutRestaurantImages]
