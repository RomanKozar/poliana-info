'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import type { IconType } from 'react-icons'
import { hotelMapPinIconDataUrl } from '@/lib/google-map-hotel-pin'
import {
	ACCOMMODATION_MAP_COLLAPSE_ICON,
	ACCOMMODATION_MAP_EXPAND_ICON,
	attachPolyanaMapExpandAndZoomControls,
} from '@/lib/google-map-stack-controls'
import { polyanaHotels as hotelsMapMarkers } from '@/lib/polyana-hotels'
import {
	FaBiking,
	FaCamera,
	FaChevronDown,
	FaChevronLeft,
	FaChevronRight,
	FaFish,
	FaHeart,
	FaHiking,
	FaMapMarkerAlt,
	FaRegClock,
	FaStar,
	FaShuttleVan,
	FaSpa,
	FaUtensils,
	FaWater,
} from 'react-icons/fa'

const accommodations = [
	{
		title: 'Готель "Катерина"',
		location: 'Сонячна, 55 Б, Поляна, Закарпатська область, 89313',
		description: 'Затишний готель у самому серці курорту.',
		price: 'від 1500 грн',
		rating: '4.3 (1104)',
		image: '/images/accommodation/kateryna-v1.jpg',
		website: 'https://hotel-kateryna.com/',
	},
	{
		title: 'Готель "Континент"',
		location: 'вул. Сонячна, 59, Поляна, Закарпатська область, 89313',
		description: 'Комфортні номери, басейн, SPA зона.',
		price: 'від 1800 грн',
		rating: '4.3 (1256)',
		image: '/images/accommodation/kontinent.jpg',
		website: 'https://www.hotel-continent.com/',
	},
	{
		title: 'River Side Hotel',
		location: 'вул. Духновича, 68, Поляна, Закарпатська область, 89313',
		description: 'Сімейний відпочинок, тиша та свіже повітря Карпат.',
		price: 'від 1100 грн',
		rating: '3.8 (61)',
		image: '/images/accommodation/river-side.jpg',
		website: 'https://www.instagram.com/hotel.riverside.ua?igsh=Y280d250MmF4Y2p5',
	},
	{
		title: 'Arena Apart-Hotel',
		location: 'Курортна вулиця, 23, Поляна, Закарпатська область, 89314',
		description: 'Сучасний апарт-готель зі SPA, сауною та відкритим басейном.',
		price: 'від 2500 грн',
		rating: '4.7 (212)',
		image: '/images/accommodation/arena.webp',
		website: 'https://arena-hotel.com.ua/',
	},
]

const spaItems: Array<{
	title: string
	subtitle: string
	icon: IconType
	image: string
	imageAlt: string
}> = [
	{
		title: 'Чани в Карпатах',
		subtitle: 'Гарячі чани з джерельною водою',
		icon: FaWater,
		image: '/images/spa/maliy-chan.png',
		imageAlt: 'Чани в Карпатах',
	},
	{
		title: 'Масаж',
		subtitle: 'Професійний масаж для відновлення',
		icon: FaSpa,
		image: '/images/spa/masasch.png',
		imageAlt: 'Масаж',
	},
	{
		title: 'Фітобочки',
		subtitle: 'Оздоровлення та детокс для вашого організму',
		icon: FaRegClock,
		image: '/images/spa/fitobochka.png',
		imageAlt: 'Фітобочки',
	},
]

const camps = [
	{
		title: 'Табір "Гірський орел"',
		age: '7-15 років',
		description: 'Активний відпочинок у горах.',
		price: 'від 9500 грн',
		image: '/images/kids-camps/camp-1.webp',
	},
	{
		title: 'Табір "Карпатська пригода"',
		age: '8-15 років',
		description: 'Пригодницькі зміни для дітей.',
		price: 'від 8900 грн',
		image: '/images/kids-camps/camp-2.webp',
	},
	{
		title: 'Табір "Лісова школа"',
		age: '6-13 років',
		description: 'Природа, творчість та нові друзі.',
		price: 'від 7900 грн',
		image: '/images/kids-camps/camp-3.webp',
	},
	{
		title: 'Табір "Young Camp"',
		age: '10-17 років',
		description: 'Англійська, спорт та креативні модулі.',
		price: 'від 9900 грн',
		image: '/images/kids-camps/camp-4.webp',
	},
]

const skiRecreation = [
	{
		title: 'Гірськолижна школа',
		label: 'Для дітей і дорослих',
		description: 'Навчання з інструктором, прокат спорядження та безпечні спуски.',
		price: 'від 600 грн',
		image: '/images/entertainment/tybinh-v2-1.webp',
	},
	{
		title: 'Тюбінг',
		label: 'Активна розвага',
		description: 'Динамічні спуски на тюбах для компаній і сімейного відпочинку.',
		price: 'від 300 грн',
		image: '/images/entertainment/tybinh-v2-2.webp',
	},
	{
		title: 'Літній тюбінг',
		label: 'Літній сезон',
		description: 'Швидкі та безпечні спуски на спеціальній всесезонній трасі.',
		price: 'від 350 грн',
		image: '/images/entertainment/tybinh-v2-3.webp',
	},
]

const categoryItems: { label: string; icon: IconType }[] = [
	{ label: 'Чани, бані, SPA центри', icon: FaSpa },
	{ label: 'Мінеральна вода', icon: FaWater },
	{ label: 'Сільський туризм', icon: FaHiking },
	{ label: 'Санаторії Поляни', icon: FaHeart },
	{ label: 'Конференц сервіс', icon: FaRegClock },
	{ label: 'Їжа та напої', icon: FaUtensils },
	{ label: 'Екскурсії Поляною', icon: FaCamera },
	{ label: 'Дегустації', icon: FaFish },
	{ label: 'Готелі Поляни', icon: FaStar },
	{ label: 'Відпочинок з дітьми', icon: FaHeart },
	{ label: 'Активний відпочинок', icon: FaBiking },
	{ label: 'Сувенір з Поляни', icon: FaMapMarkerAlt },
]

const popularNow = [
	{
		badge: 'ТОП ГОТЕЛІ',
		title: 'Найкращі готелі Поляни',
		text: 'Підбірка перевірених готелів.',
		image: '/images/gallery/kateryna-pop.png',
	},
	{
		badge: 'ТОП ЧАНИ',
		title: 'Чани з видом на гори',
		text: 'Відпочинок, який запам’ятається.',
		image: '/images/gallery/chan_1.png',
	},
	{
		badge: 'ТОП SPA',
		title: 'SPA для тіла та душі',
		text: 'Релакс, масажі та процедури.',
		image: '/images/gallery/sayna.png',
	},
]

/** Кафе та ресторани Поляни (координати та рейтинги з Google Maps). */
const diningMapMarkers = [
	{
		name: 'Ресторан «Катерина»',
		address: 'вул. Сонячна, 55-Б, Поляна, Закарпатська обл., 89313',
		category:
			'Ресторан готельного комплексу «Катерина»: закарпатська й українська кухня (бограч, банош, деруни), форель з власного ставка, тераса й винна карта — зручно для сімейного обіду в Поляні.',
		image: '/images/accommodation/kateryna-v1.jpg',
		position: { lat: 48.621246497414745, lng: 22.971365350910737 },
	},
	{
		name: 'EQUATOR',
		address: 'вул. Духновича, Поляна, Закарпатська обл., 89313',
		category:
			'★ 4,6 (309) · кафе · орієнтовно 200–400 ₴ · їжа в закладі, замовлення з вулиці, доставка · до 22:00 · 098 929 2202',
		image: '/images/gallery/golovna-foto-2.jpeg',
		position: { lat: 48.62173358568664, lng: 22.967105354571046 },
	},
	{
		name: 'Coffee Line',
		address: 'вул. Духновича, 88б, Поляна, Закарпатська обл., 89313',
		category:
			'★ 5,0 (33) · кав’ярня · орієнтовно 1–200 ₴ · їжа в закладі, із собою, доставка · 095 639 7993',
		image: '/images/gallery/golovna-foto-3.jpg',
		position: { lat: 48.62426419571715, lng: 22.96902223943357 },
	},
	{
		name: 'Good Zone',
		address: 'вул. Курортна, Поляна, Закарпатська обл., 89313',
		category:
			'★ 4,7 (1 085) · ресторан · їжа в закладі, із собою, доставка · до 23:30 · меню на good-zone.ctl.net.ua · 066 647 8918',
		image: '/images/gallery/golovna-foto.jpeg',
		position: { lat: 48.624618551922836, lng: 22.946096953186508 },
	},
	{
		name: 'ПанОрама',
		address: 'вул. Курортна, Поляна, Закарпатська обл., 89313',
		category: '★ 4,5 (665) · кафе · орієнтовно 200–400 ₴ · їжа в закладі, з вулиці, доставка · до 22:00 · 050 808 5879',
		image: '/images/entertainment/tybinh-v2-3.webp',
		position: { lat: 48.626204712025924, lng: 22.945207647879602 },
	},
	{
		name: 'Лілея',
		address: 'вул. Курортна, Поляна, Закарпатська обл., 89313',
		category: '★ 3,9 (1 496) · ресторан при готельно-ресторанному комплексі',
		image: '/images/gallery/golovna-foto-2.jpeg',
		position: { lat: 48.62671402968627, lng: 22.94738223808272 },
	},
	{
		name: 'Siesta family cafe',
		address: 'ТЦ Polayna Plaza, вул. Духновича, 56, Поляна, Закарпатська обл., 89313',
		category: '★ 4,2 (69) · кафе · орієнтовно 200–400 ₴ · до 22:00',
		image: '/images/gallery/golovna-foto-3.jpg',
		position: { lat: 48.621581391228176, lng: 22.967498727610323 },
	},
]

/** Продуктові мережі та спеціалізовані магазини в Поляні (Google Maps). */
const shopsMapMarkers = [
	{
		name: 'Копійочка',
		address: 'вул. Духновича, 56, Поляна, Закарпатська обл., 89313',
		category: '★ 3,2 (9) · магазин господарських товарів · kopiyochka.com.ua · 0800 502 990',
		image: '/images/gallery/golovna-foto.jpeg',
		position: { lat: 48.621467383655634, lng: 22.96762098879696 },
	},
	{
		name: 'Супермаркет',
		address: 'вул. Духновича, 5, Поляна (ТЦ Polayna Plaza), Закарпатська обл., 89313',
		category: '★ 4,6 (7) · супермаркет · до 22:00',
		image: '/images/gallery/golovna-foto-2.jpeg',
		position: { lat: 48.62152356911222, lng: 22.967642765451984 },
	},
	{
		name: 'Амбар Маркет',
		address: 'вул. Духновича, 65, Поляна, Закарпатська обл., 89313',
		category: '★ 4,3 (9) · супермаркет',
		image: '/images/gallery/golovna-foto-3.jpg',
		position: { lat: 48.621451094236136, lng: 22.966283208147484 },
	},
	{
		name: 'Алкомаркет «Тиса»',
		address: 'Поляна, Закарпатська обл., 89313',
		category: '★ 4,1 (8) · алкомаркет',
		image: '/images/gallery/golovna-foto.jpeg',
		position: { lat: 48.62158274103911, lng: 22.966256386059687 },
	},
	{
		name: 'Будівельний магазин',
		address: 'вул. Духновича, 41, Поляна, Закарпатська обл., 89313',
		category: 'Будівельний маркет — матеріали та інструменти',
		image: '/images/gallery/golovna-foto-2.jpeg',
		position: { lat: 48.6211049645062, lng: 22.967164113166138 },
	},
]

/** Аптеки та медичні точки (Google Maps). */
const pharmacyMapMarkers: Array<{
	name: string
	address: string
	category: string
	image: string
	position: { lat: number; lng: number }
	badge: string
}> = [
	{
		name: 'Аптека «Подорожник»',
		address: 'вул. Духновича, 56, Поляна, Закарпатська обл., 89313',
		category:
			'★ 4,2 (22) · аптека · покупки й самовивіз, доставка · зачиняється о 21:00',
		image: '/images/gallery/golovna-foto-3.jpg',
		position: { lat: 48.62142192423074, lng: 22.967409720203054 },
		badge: 'Аптека',
	},
	{
		name: 'Амбулаторія загальної практики-сімейної медицини',
		address: 'вул. Духновича, 108, Поляна, Закарпатська обл., 89313',
		category: '★ 4,8 (4) · амбулаторія сімейної медицини · 03133 74599',
		image: '/images/gallery/golovna-foto.jpeg',
		position: { lat: 48.62675756921276, lng: 22.97237635248425 },
		badge: 'Медзаклад',
	},
	{
		name: 'Аптека «Подорожник»',
		address: 'вул. Курортна, 3Б, Поляна, Закарпатська обл., 89313',
		category: '★ 4,7 (18) · аптека · podorozhnyk.ua · 0800 303 111 · самовивіз і доставка',
		image: '/images/gallery/golovna-foto-2.jpeg',
		position: { lat: 48.62526979873458, lng: 22.94656504413456 },
		badge: 'Аптека',
	},
]

/**
 * Помаранчевий пін — їжа (іконка FoodBank з `@mui/icons-material`).
 */
const diningMapPinIconDataUrl = (() => {
	const foodBankPath =
		'M12 3 4 9v12h16V9zm.5 9.5c0 .83-.67 1.5-1.5 1.5v4h-1v-4c-.83 0-1.5-.67-1.5-1.5v-3h1v3h.5v-3h1v3h.5v-3h1zM15 18h-1v-3.5h-1v-3c0-1.1.9-2 2-2z'
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
  <path fill="#ffffff" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  <g transform="translate(24 18) scale(0.82) translate(-24 -18)">
    <path fill="#F97316" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  </g>
  <g transform="translate(24 17) scale(0.72) translate(-12 -12)" fill="#ffffff">
    <path d="${foodBankPath}"/>
  </g>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
})()

/**
 * Фіолетовий пін (#6D28D9 — «ритейл / покупки»), іконка ShoppingCart з `@mui/icons-material`.
 */
const shoppingMapPinIconDataUrl = (() => {
	const cartPath =
		'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2M1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2'
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
  <path fill="#ffffff" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  <g transform="translate(24 18) scale(0.82) translate(-24 -18)">
    <path fill="#6D28D9" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  </g>
  <g transform="translate(24 17) scale(0.72) translate(-12 -12)" fill="#ffffff">
    <path d="${cartPath}"/>
  </g>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
})()

/**
 * Смарагдовий пін (#047857 — «аптека / медицина»), іконка LocalPharmacy з `@mui/icons-material`.
 */
const pharmacyMapPinIconDataUrl = (() => {
	const pharmacyPath =
		'M21 5h-2.64l1.14-3.14L17.15 1l-1.46 4H3v2l2 6-2 6v2h18v-2l-2-6 2-6zm-5 9h-3v3h-2v-3H8v-2h3V9h2v3h3z'
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
  <path fill="#ffffff" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  <g transform="translate(24 18) scale(0.82) translate(-24 -18)">
    <path fill="#047857" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  </g>
  <g transform="translate(24 17) scale(0.72) translate(-12 -12)" fill="#ffffff">
    <path d="${pharmacyPath}"/>
  </g>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
})()

/**
 * Бірюзово-циановий пін (#0E7490 — «вода / велнес»), окремо від готелів, їжі та магазинів.
 * та іконка HotTub з `@mui/icons-material` (коло + path).
 */
const spaMapPinIconDataUrl = (() => {
	const hotTubCircle = '<circle cx="7" cy="6" r="2"/>'
	const hotTubPath =
		'M11.15 12c-.31-.22-.59-.46-.82-.72l-1.4-1.55c-.19-.21-.43-.38-.69-.5-.29-.14-.62-.23-.96-.23h-.03C6.01 9 5 10.01 5 11.25V12H2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8zM7 20H5v-6h2zm4 0H9v-6h2zm4 0h-2v-6h2zm4 0h-2v-6h2zm-.35-14.14-.07-.07c-.57-.62-.82-1.41-.67-2.2L18 3h-1.89l-.06.43c-.2 1.36.27 2.71 1.3 3.72l.07.06c.57.62.82 1.41.67 2.2l-.11.59h1.91l.06-.43c.21-1.36-.27-2.71-1.3-3.71m-4 0-.07-.07c-.57-.62-.82-1.41-.67-2.2L14 3h-1.89l-.06.43c-.2 1.36.27 2.71 1.3 3.72l.07.06c.57.62.82 1.41.67 2.2l-.11.59h1.91l.06-.43c.21-1.36-.27-2.71-1.3-3.71'
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
  <path fill="#ffffff" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  <g transform="translate(24 18) scale(0.82) translate(-24 -18)">
    <path fill="#0E7490" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  </g>
  <g transform="translate(24 17) scale(0.72) translate(-12 -12)" fill="#ffffff">
    ${hotTubCircle}
    <path d="${hotTubPath}"/>
  </g>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
})()

/** SPA, чани та оздоровлення в Поляні (координати з Google Maps / уточнення на місці). */
const spaMapMarkers = [
	{
		name: 'Чан на території «Катерина»',
		address: 'готель «Катерина», вул. Сонячна, 55-Б, Поляна, Закарпатська обл.',
		category: 'Гарячий чан на території готельно-ресторанного комплексу «Катерина».',
		image: '/images/spa/maliy-chan.png',
		position: { lat: 48.621390668230035, lng: 22.970576982649888 },
	},
	{
		name: 'Чан (SPA на гарячій плиті)',
		address: 'вул. Курортна, 27, Поляна, Закарпатська обл.',
		category: '★ 5,0 (4) · SPA-процедури на гарячій кам’яній плиті',
		image: '/images/spa/fitobochka.png',
		position: { lat: 48.624395001303014, lng: 22.95056637197927 },
	},
	{
		name: 'SPA та оздоровлення «Континент»',
		address: 'готель «Континент», вул. Сонячна, 59, Поляна, Закарпатська обл.',
		category:
			'Оздоровчий комплекс готелю «Континент»: критий басейн, сауна; у описах комплексу також згадують масажі та SPA-послуги для гостей.',
		image: '/images/accommodation/kontinent.jpg',
		position: { lat: 48.62058462616725, lng: 22.9702754849307 },
	},
]

/**
 * Темно-зелений пін (#166534 — «Карпати / гори / природа»), іконка FilterHdr з `@mui/icons-material`.
 */
const touristCityMapPinIconDataUrl = (() => {
	const filterHdrPath = 'm14 6-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22z'
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
  <path fill="#ffffff" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  <g transform="translate(24 18) scale(0.82) translate(-24 -18)">
    <path fill="#166534" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  </g>
  <g transform="translate(24 17) scale(0.72) translate(-12 -12)" fill="#ffffff">
    <path d="${filterHdrPath}"/>
  </g>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
})()

/** Гірські оглядові точки та туристичні пам’ятки (координати з Google Maps). */
const touristCityMapMarkers = [
	{
		name: 'Гора Рожок — Chalet Family, оглядовий майданчик',
		address: 'с. Голубине, Закарпатська обл.',
		category: '★ 4,9 (12) · зона для прогулянок · оглядовий майданчик',
		image: '/images/gallery/golovna-foto.jpeg',
		position: { lat: 48.608805906666305, lng: 23.01986710639653 },
	},
	{
		name: 'Гора Малий Вижень',
		address: 'с. Уклин, Закарпатська обл.',
		category: '★ 5,0 (6) · туристична пам’ятка',
		image: '/images/gallery/golovna-foto-2.jpeg',
		position: { lat: 48.673916128142324, lng: 22.947541351811637 },
	},
	{
		name: 'Гора Великий Вижень',
		address: 'с. Верхня Грабівниця, Закарпатська обл.',
		category: '★ 4,7 (6) · туристична пам’ятка',
		image: '/images/gallery/golovna-foto-3.jpg',
		position: { lat: 48.70178118047461, lng: 22.957258642049577 },
	},
	{
		name: 'Гора Ведмежа',
		address: 'с. Уклин, Закарпатська обл.',
		category: '★ 4,8 (5) · зона для прогулянок',
		image: '/images/entertainment/tybinh-v2-1.webp',
		position: { lat: 48.65316352015213, lng: 22.965168433299574 },
	},
	{
		name: 'Гора Липча',
		address: 'с. Уклин, Закарпатська обл. (E471)',
		category: 'Туристична пам’ятка · огляд з висоти',
		image: '/images/entertainment/tybinh-v2-2.webp',
		position: { lat: 48.66332239338579, lng: 23.02946671577749 },
	},
]

const faqItems = [
	{
		question: 'Як до нас доїхати?',
		answer:
			'До Поляни зручно дістатися автобусом із Сваляви або Ужгорода, а також власним авто трасою М-06 з поворотом на Поляну.',
	},
	{
		question: 'Де смачно поїсти в Поляні?',
		answer:
			'У центрі громади є ресторани, колиби та кафе з закарпатською кухнею. На карті вище відмічені ключові гастролокації.',
	},
	{
		question: 'Які туристичні маршрути пропонує Поляна?',
		answer:
			'Популярні напрями: прогулянкові маршрути лісом, Стежка здоровʼя та підйом у напрямку гори Поляна-Кобила.',
	},
	{
		question: 'Як замовити екскурсію в Поляні?',
		answer:
			'Екскурсію можна обрати за категоріями на сайті або звернутися за телефоном у шапці сайту для підбору формату під вас.',
	},
	{
		question: 'Чи дегустують в Поляні вино?',
		answer:
			'Так, у Поляні доступні дегустації локальних напоїв та гастроформати для туристичних груп і сімейних поїздок.',
	},
	{
		question: 'Який сувенір привезти з Поляни?',
		answer:
			'Найчастіше обирають локальні смаколики, травʼяні збори, вироби ручної роботи та сувеніри з символікою Закарпаття.',
	},
	{
		question: 'Де придбати мінеральну воду з Поляни?',
		answer:
			'Мінеральну воду можна придбати у бюветах, спеціалізованих крамницях та на територіях санаторно-оздоровчих комплексів.',
	},
	{
		question: 'Дружні до тварин заклади в Поляні',
		answer:
			'Частина готелів і закладів приймає гостей із тваринами. Рекомендуємо уточнювати умови розміщення під час бронювання.',
	},
]

const campYears = ['2026', '2025', '2024'] as const
const heroSlides = [
	'/images/gallery/golovna-foto.jpeg',
	'/images/gallery/golovna-foto-2.jpeg',
	'/images/gallery/golovna-foto-3.jpg',
]

/** Ті самі path, що в пінах карти (MUI Hotel, FoodBank, ShoppingCart, LocalPharmacy, HotTub, FilterHdr). */
function MapLegendRow({
	pinClassName,
	labelClassName,
	label,
	description,
	children,
}: {
	pinClassName: string
	labelClassName: string
	label: string
	description: string
	children: ReactNode
}) {
	return (
		<li className='flex gap-2'>
			<span
				className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md shadow-sm ring-1 ring-white/80 ${pinClassName}`}
				aria-hidden
			>
				<svg viewBox='0 0 24 24' className='size-[15px] text-white' fill='currentColor'>
					{children}
				</svg>
			</span>
			<span>
				<span className={`font-semibold ${labelClassName}`}>{label}</span> — {description}
			</span>
		</li>
	)
}

const mapLegendListClass =
	'pointer-events-auto space-y-2 text-[10px] leading-snug text-slate-700 sm:text-xs'

function MapLegendTitle({ id }: { id?: string }) {
	return (
		<p
			id={id}
			className='pointer-events-auto mb-2 border-b border-slate-200/80 pb-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-600 sm:text-[11px]'
		>
			Умовні позначення
		</p>
	)
}

function MapLegendList({ className = mapLegendListClass }: { className?: string }) {
	return (
		<ul className={className}>
			<MapLegendRow
				pinClassName='bg-[#dc2626]'
				labelClassName='text-[#dc2626]'
				label='Готелі Поляни'
				description='житло та готельні комплекси курорту'
			>
				<path d='M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3m12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4' />
			</MapLegendRow>
			<MapLegendRow
				pinClassName='bg-[#f97316]'
				labelClassName='text-[#ea580c]'
				label='Їжа'
				description='заклади харчування'
			>
				<path d='M12 3 4 9v12h16V9zm.5 9.5c0 .83-.67 1.5-1.5 1.5v4h-1v-4c-.83 0-1.5-.67-1.5-1.5v-3h1v3h.5v-3h1v3h.5v-3h1zM15 18h-1v-3.5h-1v-3c0-1.1.9-2 2-2z' />
			</MapLegendRow>
			<MapLegendRow
				pinClassName='bg-[#6d28d9]'
				labelClassName='text-[#6d28d9]'
				label='Магазини'
				description='кошик'
			>
				<path d='M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2M1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2' />
			</MapLegendRow>
			<MapLegendRow
				pinClassName='bg-[#047857]'
				labelClassName='text-[#047857]'
				label='Аптеки'
				description='аптека та медзаклади'
			>
				<path d='M21 5h-2.64l1.14-3.14L17.15 1l-1.46 4H3v2l2 6-2 6v2h18v-2l-2-6 2-6zm-5 9h-3v3h-2v-3H8v-2h3V9h2v3h3z' />
			</MapLegendRow>
			<MapLegendRow
				pinClassName='bg-[#0e7490]'
				labelClassName='text-[#0e7490]'
				label='SPA'
				description='чани та SPA'
			>
				<circle cx='7' cy='6' r='2' />
				<path d='M11.15 12c-.31-.22-.59-.46-.82-.72l-1.4-1.55c-.19-.21-.43-.38-.69-.5-.29-.14-.62-.23-.96-.23h-.03C6.01 9 5 10.01 5 11.25V12H2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8zM7 20H5v-6h2zm4 0H9v-6h2zm4 0h-2v-6h2zm4 0h-2v-6h2zm-.35-14.14-.07-.07c-.57-.62-.82-1.41-.67-2.2L18 3h-1.89l-.06.43c-.2 1.36.27 2.71 1.3 3.72l.07.06c.57.62.82 1.41.67 2.2l-.11.59h1.91l.06-.43c.21-1.36-.27-2.71-1.3-3.71m-4 0-.07-.07c-.57-.62-.82-1.41-.67-2.2L14 3h-1.89l-.06.43c-.2 1.36.27 2.71 1.3 3.72l.07.06c.57.62.82 1.41.67 2.2l-.11.59h1.91l.06-.43c.21-1.36-.27-2.71-1.3-3.71' />
			</MapLegendRow>
			<MapLegendRow
				pinClassName='bg-[#166534]'
				labelClassName='text-[#166534]'
				label='Огляд'
				description='оглядові точки'
			>
				<path d='m14 6-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22z' />
			</MapLegendRow>
		</ul>
	)
}

export default function HomePage() {
	const [favoriteAccommodations, setFavoriteAccommodations] = useState<Record<string, boolean>>({})
	const [activeCampYear, setActiveCampYear] = useState<(typeof campYears)[number]>('2026')
	const [activeHeroSlide, setActiveHeroSlide] = useState(0)
	const [openFaqIndexes, setOpenFaqIndexes] = useState<Set<number>>(new Set())
	const [mapError, setMapError] = useState<string | null>(null)
	const [isMapFallbackMode, setIsMapFallbackMode] = useState(false)
	const [isMobileSearch, setIsMobileSearch] = useState(false)
	const [isMapLegendExpanded, setIsMapLegendExpanded] = useState(true)
	const [isHomeMapExpanded, setIsHomeMapExpanded] = useState(false)
	const mapContainerRef = useRef<HTMLDivElement | null>(null)
	const mapInstanceRef = useRef<unknown>(null)
	const faqColumns = faqItems.reduce(
		(columns, item, index) => {
			columns[index % 2].push({ item, index })
			return columns
		},
		[[] as Array<{ item: (typeof faqItems)[number]; index: number }>, [] as Array<{ item: (typeof faqItems)[number]; index: number }>]
	)

	const toggleAccommodationFavorite = (title: string) => {
		setFavoriteAccommodations(prev => ({
			...prev,
			[title]: !prev[title],
		}))
	}

	const goToHeroSlide = (slideIndex: number) => {
		setActiveHeroSlide(slideIndex)
	}

	const goToPrevHeroSlide = () => {
		setActiveHeroSlide(prev => (prev - 1 + heroSlides.length) % heroSlides.length)
	}

	const goToNextHeroSlide = () => {
		setActiveHeroSlide(prev => (prev + 1) % heroSlides.length)
	}

	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

		if (!apiKey) {
			setIsMapFallbackMode(true)
			setMapError('API ключ не знайдено, показуємо fallback-карту.')
			return
		}

		if (!mapContainerRef.current) {
			return
		}

		const win = window as Window & {
			google?: any
			initPolyanaHotelsMap?: () => void
		}

		let detachCustomControls: (() => void) | null = null
		const clearCustomControls = () => {
			detachCustomControls?.()
			detachCustomControls = null
		}

		const teardownMap = () => {
			clearCustomControls()
			mapInstanceRef.current = null
			delete win.initPolyanaHotelsMap
		}

		const initMap = () => {
			if (!mapContainerRef.current || !win.google?.maps) {
				return
			}

			const map = new win.google.maps.Map(mapContainerRef.current, {
				center: hotelsMapMarkers[0].position,
				zoom: 14,
				mapTypeId: 'hybrid',
				gestureHandling: 'greedy',
				/* Як на проживанні: без нативних кнопок Google; справа — div.accommodation-map-stack-controls (розгортання + зум). */
				disableDefaultUI: true,
				mapTypeControl: false,
				fullscreenControl: false,
				zoomControl: false,
				keyboardShortcuts: false,
				clickableIcons: false,
				styles: [
					{ featureType: 'poi', stylers: [{ visibility: 'off' }] },
					{ featureType: 'transit', stylers: [{ visibility: 'off' }] },
					{ featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
					{ featureType: 'administrative', elementType: 'labels', stylers: [{ visibility: 'off' }] },
					{ elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
				],
			})

			mapInstanceRef.current = map
			clearCustomControls()
			detachCustomControls = attachPolyanaMapExpandAndZoomControls(map, win.google.maps, {
				onToggleExpand: () => setIsHomeMapExpanded(v => !v),
			})

			let activeInfoWindow: any = null
			const bounds = new win.google.maps.LatLngBounds()

			const diningIcon = {
				url: diningMapPinIconDataUrl,
				scaledSize: new win.google.maps.Size(44, 52),
				anchor: new win.google.maps.Point(22, 52),
			}

			const shoppingIcon = {
				url: shoppingMapPinIconDataUrl,
				scaledSize: new win.google.maps.Size(44, 52),
				anchor: new win.google.maps.Point(22, 52),
			}

			const pharmacyIcon = {
				url: pharmacyMapPinIconDataUrl,
				scaledSize: new win.google.maps.Size(44, 52),
				anchor: new win.google.maps.Point(22, 52),
			}

			const hotelIcon = {
				url: hotelMapPinIconDataUrl,
				scaledSize: new win.google.maps.Size(44, 52),
				anchor: new win.google.maps.Point(22, 52),
			}

			const spaIcon = {
				url: spaMapPinIconDataUrl,
				scaledSize: new win.google.maps.Size(44, 52),
				anchor: new win.google.maps.Point(22, 52),
			}

			const touristCityIcon = {
				url: touristCityMapPinIconDataUrl,
				scaledSize: new win.google.maps.Size(44, 52),
				anchor: new win.google.maps.Point(22, 52),
			}

			hotelsMapMarkers.forEach(hotel => {
				const marker = new win.google.maps.Marker({
					position: hotel.position,
					map,
					title: hotel.name,
					icon: hotelIcon,
				})

				bounds.extend(hotel.position)

				const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
					`${hotel.name}, ${hotel.address}`
				)}`
				const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
					`${hotel.name}, ${hotel.address}`
				)}`

				const infoWindow = new win.google.maps.InfoWindow({
					content: `<div style="width:296px;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 12px 22px rgba(15,23,42,.2);line-height:1.35">
						<div style="position:relative;height:98px;overflow:hidden">
							<img
								src="${hotel.image}"
								alt="${hotel.name}"
								style="display:block;width:100%;height:100%;object-fit:cover"
							/>
							<div style="position:absolute;right:8px;bottom:8px;background:rgba(255,255,255,.96);padding:6px 10px;border-radius:10px;font-size:16px;font-weight:700;color:#2d333d">
								${hotel.price}
							</div>
						</div>
						<div style="padding:10px 12px 12px">
							<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
								<div style="font-size:16px;font-weight:700;color:#2d333d;line-height:1.2">${hotel.name}</div>
								<div style="display:flex;gap:8px;flex-shrink:0">
									<a
										href="${routeLink}"
										target="_blank"
										rel="noopener noreferrer"
										title="Маршрути"
										style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#bde6f2;color:#0b5f74;font-size:13px;text-decoration:none;cursor:pointer"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
											<path d="M12 2 22 12 12 22 2 12Z" fill="#0b5f74" />
											<path d="M9 12h6M12 9l3 3-3 3" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
										</svg>
									</a>
									<a
										href="${saveLink}"
										target="_blank"
										rel="noopener noreferrer"
										title="Зберегти"
										style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#bde6f2;color:#0b5f74;font-size:13px;text-decoration:none;cursor:pointer"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
											<path d="M7 4h10a1 1 0 0 1 1 1v14l-6-2.8L6 19V5a1 1 0 0 1 1-1Z" stroke="#0b5f74" stroke-width="1.8" stroke-linejoin="round" />
										</svg>
									</a>
								</div>
							</div>
							<div style="margin-top:6px;font-size:12px;color:#475569">
								<span style="color:#f59e0b">★★★★☆</span> ${hotel.rating}
							</div>
							<div style="margin-top:4px;font-size:12px;color:#64748b">📶 ${hotel.feature}</div>
							<a
								href="tel:${hotel.phone}"
								style="margin-top:10px;display:inline-flex;width:100%;align-items:center;justify-content:center;border-radius:9999px;background:#bde6f2;color:#0b5f74;text-decoration:none;font-size:13px;font-weight:700;padding:8px 10px"
							>
								Перевірити доступність
							</a>
						</div>
					</div>`,
				})

				marker.addListener('click', () => {
					if (activeInfoWindow) {
						activeInfoWindow.close()
					}
					infoWindow.open({ anchor: marker, map })
					activeInfoWindow = infoWindow
				})
			})

			diningMapMarkers.forEach(place => {
				const marker = new win.google.maps.Marker({
					position: place.position,
					map,
					title: place.name,
					icon: diningIcon,
				})

				bounds.extend(place.position)

				const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
					`${place.name}, ${place.address}`
				)}`
				const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
					`${place.name}, ${place.address}`
				)}`

				const infoWindow = new win.google.maps.InfoWindow({
					content: `<div style="width:296px;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 12px 22px rgba(15,23,42,.2);line-height:1.35">
						<div style="position:relative;height:98px;overflow:hidden">
							<img
								src="${place.image}"
								alt="${place.name}"
								style="display:block;width:100%;height:100%;object-fit:cover"
							/>
							<div style="position:absolute;left:8px;top:8px;background:rgba(249,115,22,.95);padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:700;color:#fff">
								Їжа
							</div>
						</div>
						<div style="padding:10px 12px 12px">
							<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
								<div style="font-size:16px;font-weight:700;color:#2d333d;line-height:1.2">${place.name}</div>
								<div style="display:flex;gap:8px;flex-shrink:0">
									<a
										href="${routeLink}"
										target="_blank"
										rel="noopener noreferrer"
										title="Маршрути"
										style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#fde68a;color:#9a3412;font-size:13px;text-decoration:none;cursor:pointer"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
											<path d="M12 2 22 12 12 22 2 12Z" fill="#9a3412" />
											<path d="M9 12h6M12 9l3 3-3 3" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
										</svg>
									</a>
									<a
										href="${saveLink}"
										target="_blank"
										rel="noopener noreferrer"
										title="Зберегти"
										style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#fde68a;color:#9a3412;font-size:13px;text-decoration:none;cursor:pointer"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
											<path d="M7 4h10a1 1 0 0 1 1 1v14l-6-2.8L6 19V5a1 1 0 0 1 1-1Z" stroke="#9a3412" stroke-width="1.8" stroke-linejoin="round" />
										</svg>
									</a>
								</div>
							</div>
							<div style="margin-top:6px;font-size:12px;color:#475569">${place.category}</div>
							<div style="margin-top:4px;font-size:12px;color:#64748b">${place.address}</div>
						</div>
					</div>`,
				})

				marker.addListener('click', () => {
					if (activeInfoWindow) {
						activeInfoWindow.close()
					}
					infoWindow.open({ anchor: marker, map })
					activeInfoWindow = infoWindow
				})
			})

			shopsMapMarkers.forEach(store => {
				const marker = new win.google.maps.Marker({
					position: store.position,
					map,
					title: store.name,
					icon: shoppingIcon,
				})

				bounds.extend(store.position)

				const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
					`${store.name}, ${store.address}`
				)}`
				const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
					`${store.name}, ${store.address}`
				)}`

				const infoWindow = new win.google.maps.InfoWindow({
					content: `<div style="width:296px;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 12px 22px rgba(15,23,42,.2);line-height:1.35">
						<div style="position:relative;height:98px;overflow:hidden">
							<img
								src="${store.image}"
								alt="${store.name}"
								style="display:block;width:100%;height:100%;object-fit:cover"
							/>
							<div style="position:absolute;left:8px;top:8px;background:rgba(109,40,217,.95);padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:700;color:#fff">
								Магазин
							</div>
						</div>
						<div style="padding:10px 12px 12px">
							<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
								<div style="font-size:16px;font-weight:700;color:#2d333d;line-height:1.2">${store.name}</div>
								<div style="display:flex;gap:8px;flex-shrink:0">
									<a
										href="${routeLink}"
										target="_blank"
										rel="noopener noreferrer"
										title="Маршрути"
										style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#ede9fe;color:#6d28d9;font-size:13px;text-decoration:none;cursor:pointer"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
											<path d="M12 2 22 12 12 22 2 12Z" fill="#6d28d9" />
											<path d="M9 12h6M12 9l3 3-3 3" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
										</svg>
									</a>
									<a
										href="${saveLink}"
										target="_blank"
										rel="noopener noreferrer"
										title="Зберегти"
										style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#ede9fe;color:#6d28d9;font-size:13px;text-decoration:none;cursor:pointer"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
											<path d="M7 4h10a1 1 0 0 1 1 1v14l-6-2.8L6 19V5a1 1 0 0 1 1-1Z" stroke="#6d28d9" stroke-width="1.8" stroke-linejoin="round" />
										</svg>
									</a>
								</div>
							</div>
							<div style="margin-top:6px;font-size:12px;color:#475569">${store.category}</div>
							<div style="margin-top:4px;font-size:12px;color:#64748b">${store.address}</div>
						</div>
					</div>`,
				})

				marker.addListener('click', () => {
					if (activeInfoWindow) {
						activeInfoWindow.close()
					}
					infoWindow.open({ anchor: marker, map })
					activeInfoWindow = infoWindow
				})
			})

			pharmacyMapMarkers.forEach(ph => {
				const marker = new win.google.maps.Marker({
					position: ph.position,
					map,
					title: ph.name,
					icon: pharmacyIcon,
				})

				bounds.extend(ph.position)

				const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
					`${ph.name}, ${ph.address}`
				)}`
				const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
					`${ph.name}, ${ph.address}`
				)}`

				const infoWindow = new win.google.maps.InfoWindow({
					content: `<div style="width:296px;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 12px 22px rgba(15,23,42,.2);line-height:1.35">
						<div style="position:relative;height:98px;overflow:hidden">
							<img
								src="${ph.image}"
								alt="${ph.name}"
								style="display:block;width:100%;height:100%;object-fit:cover"
							/>
							<div style="position:absolute;left:8px;top:8px;background:rgba(4,120,87,.95);padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:700;color:#fff">
								${ph.badge}
							</div>
						</div>
						<div style="padding:10px 12px 12px">
							<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
								<div style="font-size:16px;font-weight:700;color:#2d333d;line-height:1.2">${ph.name}</div>
								<div style="display:flex;gap:8px;flex-shrink:0">
									<a
										href="${routeLink}"
										target="_blank"
										rel="noopener noreferrer"
										title="Маршрути"
										style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#d1fae5;color:#047857;font-size:13px;text-decoration:none;cursor:pointer"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
											<path d="M12 2 22 12 12 22 2 12Z" fill="#047857" />
											<path d="M9 12h6M12 9l3 3-3 3" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
										</svg>
									</a>
									<a
										href="${saveLink}"
										target="_blank"
										rel="noopener noreferrer"
										title="Зберегти"
										style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#d1fae5;color:#047857;font-size:13px;text-decoration:none;cursor:pointer"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
											<path d="M7 4h10a1 1 0 0 1 1 1v14l-6-2.8L6 19V5a1 1 0 0 1 1-1Z" stroke="#047857" stroke-width="1.8" stroke-linejoin="round" />
										</svg>
									</a>
								</div>
							</div>
							<div style="margin-top:6px;font-size:12px;color:#475569">${ph.category}</div>
							<div style="margin-top:4px;font-size:12px;color:#64748b">${ph.address}</div>
						</div>
					</div>`,
				})

				marker.addListener('click', () => {
					if (activeInfoWindow) {
						activeInfoWindow.close()
					}
					infoWindow.open({ anchor: marker, map })
					activeInfoWindow = infoWindow
				})
			})

			spaMapMarkers.forEach(spot => {
				const marker = new win.google.maps.Marker({
					position: spot.position,
					map,
					title: spot.name,
					icon: spaIcon,
				})

				bounds.extend(spot.position)

				const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
					`${spot.name}, ${spot.address}`
				)}`
				const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
					`${spot.name}, ${spot.address}`
				)}`

				const infoWindow = new win.google.maps.InfoWindow({
					content: `<div style="width:296px;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 12px 22px rgba(15,23,42,.2);line-height:1.35">
						<div style="position:relative;height:98px;overflow:hidden">
							<img
								src="${spot.image}"
								alt="${spot.name}"
								style="display:block;width:100%;height:100%;object-fit:cover"
							/>
							<div style="position:absolute;left:8px;top:8px;background:rgba(14,116,144,.95);padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:700;color:#fff">
								SPA
							</div>
						</div>
						<div style="padding:10px 12px 12px">
							<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
								<div style="font-size:16px;font-weight:700;color:#2d333d;line-height:1.2">${spot.name}</div>
								<div style="display:flex;gap:8px;flex-shrink:0">
									<a
										href="${routeLink}"
										target="_blank"
										rel="noopener noreferrer"
										title="Маршрути"
										style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#cffafe;color:#0e7490;font-size:13px;text-decoration:none;cursor:pointer"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
											<path d="M12 2 22 12 12 22 2 12Z" fill="#0e7490" />
											<path d="M9 12h6M12 9l3 3-3 3" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
										</svg>
									</a>
									<a
										href="${saveLink}"
										target="_blank"
										rel="noopener noreferrer"
										title="Зберегти"
										style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#cffafe;color:#0e7490;font-size:13px;text-decoration:none;cursor:pointer"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
											<path d="M7 4h10a1 1 0 0 1 1 1v14l-6-2.8L6 19V5a1 1 0 0 1 1-1Z" stroke="#0e7490" stroke-width="1.8" stroke-linejoin="round" />
										</svg>
									</a>
								</div>
							</div>
							<div style="margin-top:6px;font-size:12px;color:#475569">${spot.category}</div>
							<div style="margin-top:4px;font-size:12px;color:#64748b">${spot.address}</div>
						</div>
					</div>`,
				})

				marker.addListener('click', () => {
					if (activeInfoWindow) {
						activeInfoWindow.close()
					}
					infoWindow.open({ anchor: marker, map })
					activeInfoWindow = infoWindow
				})
			})

			touristCityMapMarkers.forEach(city => {
				const marker = new win.google.maps.Marker({
					position: city.position,
					map,
					title: city.name,
					icon: touristCityIcon,
				})

				bounds.extend(city.position)

				const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
					`${city.name}, ${city.address}`
				)}`
				const saveLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
					`${city.name}, ${city.address}`
				)}`

				const infoWindow = new win.google.maps.InfoWindow({
					content: `<div style="width:296px;border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 12px 22px rgba(15,23,42,.2);line-height:1.35">
						<div style="position:relative;height:98px;overflow:hidden">
							<img
								src="${city.image}"
								alt="${city.name}"
								style="display:block;width:100%;height:100%;object-fit:cover"
							/>
							<div style="position:absolute;left:8px;top:8px;background:rgba(22,101,52,.95);padding:4px 10px;border-radius:9999px;font-size:11px;font-weight:700;color:#fff">
								Огляд
							</div>
						</div>
						<div style="padding:10px 12px 12px">
							<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
								<div style="font-size:16px;font-weight:700;color:#2d333d;line-height:1.2">${city.name}</div>
								<div style="display:flex;gap:8px;flex-shrink:0">
									<a
										href="${routeLink}"
										target="_blank"
										rel="noopener noreferrer"
										title="Маршрути"
										style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#dcfce7;color:#166534;font-size:13px;text-decoration:none;cursor:pointer"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
											<path d="M12 2 22 12 12 22 2 12Z" fill="#166534" />
											<path d="M9 12h6M12 9l3 3-3 3" fill="none" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
										</svg>
									</a>
									<a
										href="${saveLink}"
										target="_blank"
										rel="noopener noreferrer"
										title="Зберегти"
										style="display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;border-radius:9999px;background:#dcfce7;color:#166534;font-size:13px;text-decoration:none;cursor:pointer"
									>
										<svg viewBox="0 0 24 24" width="15" height="15" fill="none" aria-hidden="true">
											<path d="M7 4h10a1 1 0 0 1 1 1v14l-6-2.8L6 19V5a1 1 0 0 1 1-1Z" stroke="#166534" stroke-width="1.8" stroke-linejoin="round" />
										</svg>
									</a>
								</div>
							</div>
							<div style="margin-top:6px;font-size:12px;color:#475569">${city.category}</div>
							<div style="margin-top:4px;font-size:12px;color:#64748b">${city.address}</div>
						</div>
					</div>`,
				})

				marker.addListener('click', () => {
					if (activeInfoWindow) {
						activeInfoWindow.close()
					}
					infoWindow.open({ anchor: marker, map })
					activeInfoWindow = infoWindow
				})
			})

			map.fitBounds(bounds)
			win.google.maps.event.addListenerOnce(map, 'idle', () => {
				const zoom = map.getZoom()
				if (typeof zoom === 'number') {
					/* Мін. ~9 — щоб після fitBounds були видні й віддалені обласні міста; «−1» дає легкий відступ від країв. */
					map.setZoom(Math.max(9, zoom - 1))
				}
			})
		}

		if (win.google?.maps) {
			initMap()
			return teardownMap
		}

		win.initPolyanaHotelsMap = initMap

		const existingScript = document.getElementById('google-maps-script')
		if (!existingScript) {
			const script = document.createElement('script')
			script.id = 'google-maps-script'
			script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=uk&region=UA&callback=initPolyanaHotelsMap`
			script.async = true
			script.defer = true
			script.onerror = () => {
				setMapError('Не вдалося завантажити Google Maps API. Показуємо fallback-карту.')
				setIsMapFallbackMode(true)
			}
			document.head.appendChild(script)
			return teardownMap
		}

		const retryId = window.setInterval(() => {
			if (win.google?.maps) {
				window.clearInterval(retryId)
				initMap()
			}
		}, 150)

		return () => {
			window.clearInterval(retryId)
			teardownMap()
		}
	}, [])

	useEffect(() => {
		const main = document.querySelector('body > main')
		if (isHomeMapExpanded) {
			document.body.setAttribute('data-home-map-expanded', 'true')
			main?.setAttribute('data-home-map-expanded', 'true')
		} else {
			document.body.removeAttribute('data-home-map-expanded')
			main?.removeAttribute('data-home-map-expanded')
		}
		return () => {
			document.body.removeAttribute('data-home-map-expanded')
			document.querySelector('body > main')?.removeAttribute('data-home-map-expanded')
		}
	}, [isHomeMapExpanded])

	useEffect(() => {
		if (!isHomeMapExpanded) return
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsHomeMapExpanded(false)
		}
		window.addEventListener('keydown', onKey)
		return () => window.removeEventListener('keydown', onKey)
	}, [isHomeMapExpanded])

	useEffect(() => {
		const btn = mapContainerRef.current?.querySelector<HTMLButtonElement>(
			'.accommodation-map-stack-controls__fullscreen'
		)
		if (!btn) return
		const expanded = isHomeMapExpanded
		btn.setAttribute('aria-pressed', String(expanded))
		btn.setAttribute('data-expanded', String(expanded))
		const collapseLabel = 'Зменшити карту'
		const expandLabel = 'Розгорнути карту'
		btn.title = expanded ? collapseLabel : expandLabel
		btn.setAttribute('aria-label', expanded ? collapseLabel : expandLabel)
		btn.innerHTML = expanded ? ACCOMMODATION_MAP_COLLAPSE_ICON : ACCOMMODATION_MAP_EXPAND_ICON
	}, [isHomeMapExpanded])

	useEffect(() => {
		const map = mapInstanceRef.current
		const win = window as Window & { google?: any }
		if (!map || !win.google?.maps?.event) return
		const id = window.requestAnimationFrame(() => {
			win.google.maps.event.trigger(map, 'resize')
		})
		return () => window.cancelAnimationFrame(id)
	}, [isHomeMapExpanded])

	useEffect(() => {
		const onResize = () => {
			const map = mapInstanceRef.current
			const win = window as Window & { google?: any }
			if (map && win.google?.maps?.event) win.google.maps.event.trigger(map, 'resize')
		}
		window.addEventListener('resize', onResize)
		return () => window.removeEventListener('resize', onResize)
	}, [])

	useEffect(() => {
		const mediaQuery = window.matchMedia('(max-width: 639px)')
		const updateSearchPlaceholder = () => setIsMobileSearch(mediaQuery.matches)
		updateSearchPlaceholder()
		mediaQuery.addEventListener('change', updateSearchPlaceholder)

		return () => mediaQuery.removeEventListener('change', updateSearchPlaceholder)
	}, [])

	useEffect(() => {
		const intervalId = window.setInterval(() => {
			setActiveHeroSlide(prev => (prev + 1) % heroSlides.length)
		}, 6000)

		return () => window.clearInterval(intervalId)
	}, [])

	return (
		<div className='w-full overflow-x-hidden'>
			<section className='relative w-full overflow-hidden rounded-none'>
				<div className='absolute inset-0'>
					{heroSlides.map((slideSrc, index) => (
						<div
							key={slideSrc}
							className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
								index === activeHeroSlide ? 'opacity-100' : 'opacity-0'
							}`}
						>
							<Image
								src={slideSrc}
								alt='Відпочинок у Поляні'
								fill
								sizes='100vw'
								priority={index === 0}
								className='object-cover'
							/>
						</div>
					))}
				</div>
				<div className='absolute inset-0 bg-gradient-to-r from-[#1E3D53]/80 via-[#264D67]/65 to-[#294B61]/40' />

				<div className='relative z-10 px-4 py-5 sm:px-16 sm:py-6 lg:px-24'>
					<div className='mx-auto mb-6 flex w-full max-w-4xl items-center gap-2 sm:mb-8 sm:justify-center'>
						<div className='hero-input-container min-w-0 flex-1 sm:w-[460px] sm:flex-none'>
							<input
								id='hero-search-input'
								type='text'
								placeholder=' '
								className='hero-input-field'
							/>
							<label htmlFor='hero-search-input' className='hero-input-label'>
								{isMobileSearch ? 'Пошук' : 'Пошук: Готелі, Чани, SPA, Табори...'}
							</label>
							<span className='hero-input-underline' />
						</div>
						<button
							type='button'
							className='inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-1.5 bg-transparent px-1 text-[12px] font-normal text-white/80 transition-colors hover:text-[#53C4DA] sm:h-11 sm:px-1.5 sm:text-[15px]'
						>
							<FaMapMarkerAlt className='size-3.5 text-[#53C4DA]' />
							Поляна
						</button>
					</div>

					<div className='grid items-end gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_560px]'>
						<div className='max-w-[560px] pt-0.5 text-white sm:pt-1'>
							<h1 className='text-[28px] font-black leading-[1.08] sm:text-[60px] sm:leading-[1.04]'>
								Поляна - туристична дестинація №1
								<br />
								на Закарпатті!
							</h1>
							<p className='mt-3 max-w-[540px] text-[13px] leading-[1.35] font-medium text-white/90 sm:mt-4 sm:text-[22px] sm:leading-[1.12]'>
								житло, spa, чани, табори та розваги
							</p>
							<div className='mt-5 flex gap-2 sm:mt-7 sm:flex-row sm:flex-wrap sm:gap-5'>
								<button
									type='button'
									className='w-1/2 cursor-pointer rounded-md bg-[#53C4DA] px-3 py-2.5 text-[11px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:w-auto sm:px-7 sm:py-3 sm:text-sm'
								>
									ЗНАЙТИ ЖИТЛО
								</button>
								<button
									type='button'
									className='w-1/2 cursor-pointer rounded-md bg-[#F68F5D] px-3 py-2.5 text-[11px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:w-auto sm:px-7 sm:py-3 sm:text-sm'
								>
									АКЦІЇ ТА ПРОПОЗИЦІЇ
								</button>
							</div>
						</div>

						<div className='ml-auto flex w-full max-w-[520px] min-h-[210px] overflow-hidden rounded-[16px] bg-[#F08F61] text-white sm:max-w-[560px] sm:min-h-[340px] sm:rounded-[18px]'>
							<div className='flex w-[52%] flex-col px-3 pb-3 pt-2.5 sm:w-[53%] sm:px-5 sm:pb-5 sm:pt-4'>
								<p className='mt-1 inline-block self-start rounded-full bg-white/25 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] sm:mt-2 sm:px-2.5 sm:text-[12px]'>
									Гаряча пропозиція
								</p>
								<h3 className='mt-3 max-w-[250px] text-[20px] font-black leading-[1.2] sm:mt-8 sm:text-[32px] sm:leading-[1.5]'>
									Форель + чан
									<br />= -20%
								</h3>
								<p className='mt-2.5 max-w-[205px] text-[12px] leading-[1.25] text-white/90 sm:mt-4 sm:text-[16px] sm:leading-[1.5]'>
									Відпочивай зі смаком у Поляні
								</p>
								<button
									type='button'
									className='mt-auto self-start cursor-pointer rounded-md bg-white px-2.5 py-1 text-[11px] font-bold text-[#E06D3C] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:px-4 sm:py-2 sm:text-[14px]'
								>
									ДЕТАЛЬНІШЕ
								</button>
							</div>
							<div className='relative w-[48%] overflow-hidden rounded-l-[72px] sm:w-[47%] sm:rounded-l-[140px]'>
								<Image
									src='/images/gallery/akziya.png'
									alt='Чан'
									fill
									sizes='(min-width: 1024px) 264px, 45vw'
									className='object-cover object-center'
								/>
							</div>
						</div>
					</div>

					<div className='mt-3 flex items-center justify-center gap-3 sm:mt-4'>
						<button
							type='button'
							onClick={goToPrevHeroSlide}
							aria-label='Попереднє фото банера'
							className='inline-flex size-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/35'
						>
							<FaChevronLeft className='size-3.5' />
						</button>
						{heroSlides.map((_, index) => (
							<button
								type='button'
								key={index}
								onClick={() => goToHeroSlide(index)}
								aria-label={`Перейти до фото ${index + 1}`}
								aria-pressed={index === activeHeroSlide}
								className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${
									index === activeHeroSlide ? 'bg-white' : 'bg-white/50'
								}`}
							/>
						))}
						<button
							type='button'
							onClick={goToNextHeroSlide}
							aria-label='Наступне фото банера'
							className='inline-flex size-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/35'
						>
							<FaChevronRight className='size-3.5' />
						</button>
					</div>
				</div>
			</section>

			<section className='bg-white px-4 py-6 sm:px-16 lg:px-24'>
				<div className='mb-4 flex items-center justify-between'>
					<h2 className='text-2xl font-bold text-[#2D333D]'>Проживання в Поляні</h2>
					<button className='cursor-pointer text-sm font-semibold text-[#53C4DA] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#2FAFC8]'>
						Показати ще →
					</button>
				</div>
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
					{accommodations.map(item => {
						const isFavorite = Boolean(favoriteAccommodations[item.title])

						return (
							<article
								key={item.title}
								className='flex h-full cursor-pointer flex-col overflow-hidden rounded-[10px] border border-[#E4EBEE] bg-white shadow-sm'
							>
								<div className='relative h-28'>
									<Image
										src={item.image}
										alt={item.title}
										fill
										sizes='(min-width: 1024px) 17vw, (min-width: 640px) 42vw, 88vw'
										className='object-cover'
									/>
									<button
										type='button'
										onClick={event => {
											event.stopPropagation()
											toggleAccommodationFavorite(item.title)
										}}
										aria-label={
											isFavorite
												? `Прибрати ${item.title} з обраного`
												: `Додати ${item.title} в обране`
										}
										aria-pressed={isFavorite}
										className='heart-container'
									>
										<span className='sr-only'>
											{isFavorite ? 'Прибрати з обраного' : 'Додати в обране'}
										</span>
										<span className={`heart-svg-container ${isFavorite ? 'is-active' : ''}`} aria-hidden='true'>
											<svg viewBox='0 0 24 24' className='heart-svg-outline'>
												<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
											</svg>
											<svg viewBox='0 0 24 24' className='heart-svg-filled'>
												<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
											</svg>
											<svg viewBox='0 0 24 24' className='heart-svg-celebrate'>
												<path d='M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1' />
											</svg>
										</span>
									</button>
								</div>
								<div className='flex flex-1 flex-col p-2.5'>
									<div className='space-y-1.5'>
										<h3 className='text-[13px] font-bold leading-tight text-[#2D333D]'>{item.title}</h3>
										<p className='text-[10px] leading-snug text-[#53C4DA]'>
											<FaMapMarkerAlt className='mr-1 inline-block size-2.5 align-[-1px]' />
											{item.location}
										</p>
										<p className='text-xs text-slate-600'>{item.description}</p>
									</div>
									<div className='mt-auto flex items-center justify-between pt-1.5'>
										<span className='flex items-center gap-1 text-[11px] text-slate-500'>
											<FaStar className='size-3 text-[#F7C948]' />
											{item.rating}
										</span>
										<span className='text-[13px] font-bold text-[#E06D3C]'>{item.price}</span>
									</div>
								</div>
							</article>
						)
					})}
				</div>
			</section>

			<section className='rounded-none bg-[#EEF4EA] px-4 py-6 sm:px-16 lg:px-24'>
				<div className='mb-4 flex items-center justify-between'>
					<h2 className='text-2xl font-bold text-[#2D333D]'>SPA та відпочинок</h2>
					<button className='cursor-pointer text-sm font-semibold text-[#53C4DA] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#2FAFC8]'>
						Дивитись все →
					</button>
				</div>
				<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
					{spaItems.map(item => (
						<div
							key={item.title}
							className='flex min-h-36 cursor-pointer overflow-hidden rounded-xl border border-[#DCE8D8] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
						>
							<div className='flex flex-1 flex-col px-4 py-8'>
								<item.icon className='size-13 text-[#53C4DA]' />
								<div className='mt-2 space-y-1'>
									<h3 className='text-lg font-bold text-[#2D333D]'>{item.title}</h3>
									<p className='text-sm text-slate-600'>{item.subtitle}</p>
								</div>
							</div>
							<div className='relative w-[46%] min-w-[150px]'>
								<Image
									src={item.image}
									alt={item.imageAlt}
									fill
									sizes='(min-width: 1024px) 11vw, (min-width: 640px) 21vw, 40vw'
									className='object-cover'
								/>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className='bg-white px-4 py-6 sm:px-16 lg:px-24'>
				<div className='mb-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center'>
					<h2 className='text-2xl font-bold text-[#2D333D] sm:justify-self-start'>
						Дитячі табори
					</h2>
					<div className='hidden items-center gap-2 sm:flex sm:justify-self-center'>
						{campYears.map(year => (
							<button
								key={year}
								type='button'
								onClick={() => setActiveCampYear(year)}
								aria-pressed={activeCampYear === year}
								className={`cursor-pointer rounded-md px-4 py-1 text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 ${
									activeCampYear === year
										? 'bg-[#53C4DA] text-white'
										: 'bg-slate-100 text-slate-500 hover:bg-slate-200'
								}`}
							>
								{year}
							</button>
						))}
					</div>
					<button className='justify-self-start cursor-pointer text-sm font-semibold text-[#53C4DA] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#2FAFC8] sm:justify-self-end'>
						Всі табори →
					</button>
				</div>
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
					{camps.map(item => (
						<article
							key={item.title}
							className='cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
						>
							<div className='relative h-28'>
								<Image
									src={item.image}
									alt={item.title}
									fill
									sizes='(min-width: 1024px) 17vw, (min-width: 640px) 42vw, 88vw'
									className='object-cover'
								/>
							</div>
							<div className='space-y-2 p-3'>
								<h3 className='text-sm font-bold text-[#2D333D]'>{item.title}</h3>
								<p className='text-xs text-[#53C4DA]'>{item.age}</p>
								<p className='text-xs text-slate-600'>{item.description}</p>
								<p className='text-right text-sm font-bold text-[#E06D3C]'>{item.price}</p>
							</div>
						</article>
					))}
				</div>
			</section>

			<section className='bg-white px-4 py-6 sm:px-16 lg:px-24'>
				<div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
					<h2 className='text-2xl font-bold text-[#2D333D]'>Гірськолижний відпочинок</h2>
					<button className='cursor-pointer self-start text-sm font-semibold text-[#53C4DA] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#2FAFC8] sm:self-auto'>
						Всі активності →
					</button>
				</div>
				<div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
					{skiRecreation.map(item => (
						<div
							key={item.title}
							className='flex min-h-36 cursor-pointer overflow-hidden rounded-xl border border-[#DCE8D8] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
						>
							<div className='flex flex-1 flex-col px-4 py-8'>
								<div className='space-y-1'>
									<h3 className='text-lg font-bold text-[#2D333D]'>{item.title}</h3>
									<p className='text-sm text-[#53C4DA]'>{item.label}</p>
									<p className='text-sm text-slate-600'>{item.description}</p>
								</div>
								<p className='mt-auto pt-2 text-sm font-bold text-[#E06D3C]'>{item.price}</p>
							</div>
							<div className='relative w-[46%] min-w-[150px]'>
								<Image
									src={item.image}
									alt={item.title}
									fill
									sizes='(min-width: 1024px) 11vw, (min-width: 640px) 21vw, 40vw'
									className='object-cover'
								/>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className='bg-[#F5F6F7] px-4 py-6 sm:px-16 lg:px-24'>
				<h2 className='mb-4 text-2xl font-bold text-[#2D333D]'>Популярні категорії</h2>
				<div className='grid grid-cols-3 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
					{categoryItems.map(item => (
						<div
							key={item.label}
							className='flex min-h-22 cursor-pointer flex-col items-center justify-center rounded-xl bg-white px-2 py-2 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:min-h-24 sm:px-3'
						>
							<item.icon className='size-6 text-[#7ABEC8] sm:size-7' />
							<p className='mt-1.5 text-[11px] font-semibold leading-tight text-slate-600 sm:mt-2 sm:text-sm'>
								{item.label}
							</p>
						</div>
					))}
				</div>
			</section>

			<section className='bg-white px-4 pb-6 pt-2 sm:px-16 lg:px-24'>
				<div className='mb-4 flex items-center justify-between'>
					<h2 className='text-2xl font-bold text-[#2D333D]'>Популярне зараз</h2>
					<button className='cursor-pointer text-sm font-semibold text-[#53C4DA] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#2FAFC8]'>
						Дивитись все →
					</button>
				</div>
				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
					{popularNow.map(item => (
						<article
							key={item.title}
							className='cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
						>
							<div className='relative h-32 lg:h-36'>
								<Image
									src={item.image}
									alt={item.title}
									fill
									sizes='(min-width: 1024px) 29vw, (min-width: 640px) 44vw, 88vw'
									className='object-cover'
								/>
							</div>
							<div className='space-y-2 p-3'>
								<span className='inline-flex rounded-full bg-[#F3A169] px-2 py-0.5 text-[10px] font-bold text-white'>
									{item.badge}
								</span>
								<h3 className='text-sm font-bold text-[#2D333D]'>{item.title}</h3>
								<p className='text-xs text-slate-600'>{item.text}</p>
							</div>
						</article>
					))}
				</div>
			</section>

			<section
				className={
					isHomeMapExpanded
						? 'fixed inset-x-0 bottom-0 z-40 flex flex-col overflow-hidden bg-[#F5F6F7]'
						: 'bg-[#F5F6F7] px-4 pb-4 pt-4 sm:px-16 lg:px-24'
				}
				style={isHomeMapExpanded ? { top: 'var(--header-offset, 68px)' } : undefined}
			>
				<div
					className={
						isHomeMapExpanded
							? 'accommodation-map-expanded-shell flex min-h-0 flex-1 flex-col'
							: 'mx-auto w-full max-w-7xl'
					}
				>
					<h2
						className={
							isHomeMapExpanded
								? 'sr-only'
								: 'mb-4 text-2xl font-bold text-[#2D333D]'
						}
					>
						Карта готелів та магазинів Поляни
					</h2>
					<div
						className={`relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-900/5${
							isHomeMapExpanded ? ' flex min-h-0 flex-1 flex-col' : ''
						}`}
					>
						<div
							className={
								isHomeMapExpanded
									? 'accommodation-map-frame relative flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-slate-100'
									: 'relative h-[420px] w-full shrink-0'
							}
						>
							{isMapFallbackMode ? (
								<iframe
									title='Fallback карта готелів Поляни'
									src='https://maps.google.com/maps?hl=uk&q=%D0%93%D0%BE%D1%82%D0%B5%D0%BB%D1%8C+%D0%9A%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B0+%D0%9F%D0%BE%D0%BB%D1%8F%D0%BD%D0%B0&t=k&z=14&ie=UTF8&iwloc=B&output=embed'
									className={`w-full min-w-0 ${
										isHomeMapExpanded ? 'min-h-0 flex-1' : 'h-[420px]'
									}`}
									loading='lazy'
									referrerPolicy='no-referrer-when-downgrade'
								/>
							) : (
								<div
									ref={mapContainerRef}
									className={`polyana-google-map-root polyana-google-map-root--home-map w-full min-w-0 ${
										isHomeMapExpanded ? 'min-h-0 flex-1' : 'h-[420px]'
									}`}
								/>
							)}
							{mapError ? (
								<div className='pointer-events-none absolute bottom-10 left-1/2 z-[2] -translate-x-1/2 rounded-md bg-white/90 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm sm:bottom-14'>
									{mapError}
								</div>
							) : null}
							{/* Легенда на карті — від sm; вкладка зліва, згортання вліво */}
							<div
								className='absolute left-2 top-1/2 z-[1] hidden -translate-y-1/2 sm:left-3 sm:flex sm:items-stretch'
								role='presentation'
							>
								<button
									type='button'
									onClick={() => setIsMapLegendExpanded(prev => !prev)}
									className={`pointer-events-auto flex w-9 shrink-0 flex-col items-center justify-center border border-slate-900/15 bg-white/22 text-slate-700 shadow-md ring-1 ring-slate-900/10 backdrop-blur-md transition-colors hover:bg-white/30 ${
										isMapLegendExpanded
											? 'rounded-l-lg rounded-r-none border-r-0'
											: 'min-h-[104px] rounded-lg'
									}`}
									aria-expanded={isMapLegendExpanded}
									aria-controls='polyana-map-legend-desktop-panel'
									aria-label={
										isMapLegendExpanded
											? 'Згорнути умовні позначення вліво'
											: 'Показати умовні позначення'
									}
								>
									{isMapLegendExpanded ? (
										<FaChevronLeft className='size-3.5 shrink-0' aria-hidden />
									) : (
										<FaChevronRight className='size-3.5 shrink-0' aria-hidden />
									)}
								</button>
								<div
									id='polyana-map-legend-desktop-panel'
									role='region'
									aria-label='Умовні позначення на карті'
									aria-hidden={!isMapLegendExpanded}
									className={`overflow-hidden transition-[max-width,opacity] duration-300 ease-out ${
										isMapLegendExpanded ? 'max-w-56 opacity-100' : 'pointer-events-none max-w-0 opacity-0'
									}`}
								>
									<div className='pointer-events-auto flex w-56 flex-col rounded-r-lg border border-l-0 border-slate-900/15 bg-white/22 px-2.5 py-2 shadow-md ring-1 ring-slate-900/10 backdrop-blur-md sm:px-3 sm:py-2.5'>
										<MapLegendTitle />
										<MapLegendList />
									</div>
								</div>
							</div>
						</div>
						{/* Легенда під картою — до sm; у розгорнутому режимі ховаємо (лише хедер сайту + карта). */}
						<section
							className={`z-0 border-t border-slate-900/10 bg-white/22 px-3 py-2.5 shadow-sm ring-1 ring-slate-900/10 backdrop-blur-md sm:hidden ${
								isHomeMapExpanded ? 'hidden' : ''
							}`}
							aria-labelledby='polyana-map-legend-title'
						>
							<MapLegendTitle id='polyana-map-legend-title' />
							<MapLegendList />
						</section>
					</div>
				</div>
			</section>

			<section className='bg-[#F5F6F7] px-4 pb-10 pt-2 sm:px-16 lg:px-24'>
				<div className='mx-auto mt-4 w-full max-w-7xl sm:mt-5'>
					<h2 className='mb-4 text-2xl font-bold text-[#2D333D]'>Відповіді на поширені запитання</h2>
					<div className='grid gap-3 md:grid-cols-2'>
						{faqColumns.map((column, columnIndex) => (
							<div key={columnIndex} className='space-y-3'>
								{column.map(({ item, index }) => {
									const isOpen = openFaqIndexes.has(index)
									return (
										<div
											key={item.question}
											className='h-fit overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'
										>
											<button
												type='button'
												onClick={() =>
													setOpenFaqIndexes(prev => {
														const next = new Set(prev)
														if (next.has(index)) {
															next.delete(index)
														} else {
															next.add(index)
														}
														return next
													})
												}
												className='flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-[#2D333D] sm:px-5 sm:py-4 sm:text-base'
											>
												<span>{item.question}</span>
												<FaChevronDown
													className={`size-4 shrink-0 text-cyan-600 transition-transform duration-200 ${
														isOpen ? 'rotate-180' : ''
													}`}
												/>
											</button>
											{isOpen ? (
												<div className='border-t border-slate-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-slate-600 sm:px-5'>
													{item.answer}
												</div>
											) : null}
										</div>
									)
								})}
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
