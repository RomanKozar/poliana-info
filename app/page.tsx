'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { IconType } from 'react-icons'
import {
	FaBiking,
	FaCamera,
	FaChevronDown,
	FaFish,
	FaHeart,
	FaHiking,
	FaMapMarkerAlt,
	FaRegClock,
	FaSearch,
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
	},
	{
		title: 'Табір "Карпатська пригода"',
		age: '8-15 років',
		description: 'Пригодницькі зміни для дітей.',
		price: 'від 8900 грн',
	},
	{
		title: 'Табір "Лісова школа"',
		age: '6-13 років',
		description: 'Природа, творчість та нові друзі.',
		price: 'від 7900 грн',
	},
	{
		title: 'Табір "Young Camp"',
		age: '10-17 років',
		description: 'Англійська, спорт та креативні модулі.',
		price: 'від 9900 грн',
	},
]

const skiRecreation = [
	{
		title: 'Гірськолижна школа',
		label: 'Для дітей і дорослих',
		description: 'Навчання з інструктором, прокат спорядження та безпечні спуски.',
		price: 'від 600 грн',
		image: '/preview.png',
	},
	{
		title: 'Тюбінг',
		label: 'Активна розвага',
		description: 'Динамічні спуски на тюбах для компаній і сімейного відпочинку.',
		price: 'від 300 грн',
		image: '/preview.png',
	},
	{
		title: 'Літній тюбінг',
		label: 'Літній сезон',
		description: 'Швидкі та безпечні спуски на спеціальній всесезонній трасі.',
		price: 'від 350 грн',
		image: '/preview.png',
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
	{ badge: 'ТОП ГОТЕЛІ', title: 'Найкращі готелі Поляни', text: 'Підбірка перевірених готелів.' },
	{ badge: 'ТОП ЧАНИ', title: 'Чани з видом на гори', text: 'Відпочинок, який запам’ятається.' },
	{ badge: 'ТОП SPA', title: 'SPA для тіла та душі', text: 'Релакс, масажі та процедури.' },
]

const hotelsMapMarkers = [
	{
		name: 'Готель Катерина',
		address: 'Сонячна, 55 Б, Поляна',
		description: 'Сімейний готель зі SPA, рестораном та затишною територією.',
		phone: '067-34-60-556',
		position: { lat: 48.62146474176638, lng: 22.97048064221818 },
	},
	{
		name: 'Готель Континент',
		address: 'Сонячна, 59, Поляна',
		description: 'Комфортні номери, басейн та оздоровчі процедури.',
		phone: '050-70-55-000',
		position: { lat: 48.62080723777113, lng: 22.969461724127456 },
	},
	{
		name: 'River Side Hotel',
		address: 'вул. Духновича, 68, Поляна',
		description: 'Тиха локація біля річки для спокійного відпочинку.',
		phone: '095-30-11-000',
		position: { lat: 48.62244278745904, lng: 22.96724255849585 },
	},
	{
		name: 'Arena Apart-Hotel',
		address: 'Курортна, 23, Поляна',
		description: 'Апарт-готель зі SPA-зоною та сучасними апартаментами.',
		phone: '096-80-27-777',
		position: { lat: 48.6238240422547, lng: 22.948909722484508 },
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
const skiSeasons = ['ЗИМА', 'ВСЕСЕЗОН', 'ЛІТО'] as const
const heroSlides = [
	'/images/gallery/golovna-foto.jpeg',
	'/images/gallery/golovna-foto-2.jpeg',
	'/images/gallery/golovna-foto-3.jpg',
]
const katerynaSpaWebsite = 'https://hotel-kateryna.com/spa/'

export default function Home() {
	const [favoriteAccommodations, setFavoriteAccommodations] = useState<Record<string, boolean>>({})
	const [activeCampYear, setActiveCampYear] = useState<(typeof campYears)[number]>('2026')
	const [activeSkiSeason, setActiveSkiSeason] = useState<(typeof skiSeasons)[number]>('ЗИМА')
	const [activeHeroSlide, setActiveHeroSlide] = useState(0)
	const [openFaqIndexes, setOpenFaqIndexes] = useState<Set<number>>(new Set())
	const [mapError, setMapError] = useState<string | null>(null)
	const [isMobileSearch, setIsMobileSearch] = useState(false)
	const mapContainerRef = useRef<HTMLDivElement | null>(null)
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

	const openAccommodationWebsite = (website: string) => {
		window.open(website, '_blank', 'noopener,noreferrer')
	}

	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

		if (!apiKey) {
			setMapError('Google Maps API key не знайдено. Додайте NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.')
			return
		}

		if (!mapContainerRef.current) {
			return
		}

		const win = window as Window & {
			google?: any
			initPolianaHotelsMap?: () => void
		}

		const initMap = () => {
			if (!mapContainerRef.current || !win.google?.maps) {
				return
			}

			const map = new win.google.maps.Map(mapContainerRef.current, {
				center: hotelsMapMarkers[0].position,
				zoom: 14,
				mapTypeId: 'hybrid',
				streetViewControl: false,
				fullscreenControl: true,
				mapTypeControl: true,
			})

			let activeInfoWindow: any = null
			const bounds = new win.google.maps.LatLngBounds()

			hotelsMapMarkers.forEach((hotel, index) => {
				const marker = new win.google.maps.Marker({
					position: hotel.position,
					map,
					title: hotel.name,
					label: index === 0 ? '★' : undefined,
				})

				bounds.extend(hotel.position)

				const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
					`${hotel.name}, ${hotel.address}`
				)}`

				const infoWindow = new win.google.maps.InfoWindow({
					content: `<div style="min-width:220px;line-height:1.4">
						<div style="font-weight:700;font-size:14px;margin-bottom:4px">${hotel.name}</div>
						<div style="font-size:12px;color:#334155;margin-bottom:4px">${hotel.address}</div>
						<div style="font-size:12px;color:#475569;margin-bottom:6px">${hotel.description}</div>
						<div style="font-size:12px;font-weight:600;color:#0f766e;margin-bottom:8px">Тел: ${hotel.phone}</div>
						<a
							href="${googleMapsLink}"
							target="_blank"
							rel="noopener noreferrer"
							style="display:inline-block;padding:6px 10px;border-radius:8px;background:#2563eb;color:#fff;text-decoration:none;font-size:12px;font-weight:600"
						>
							Перейти на Google Maps
						</a>
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
					map.setZoom(Math.max(12, zoom - 1))
				}
			})
		}

		if (win.google?.maps) {
			initMap()
			return
		}

		win.initPolianaHotelsMap = initMap

		const existingScript = document.getElementById('google-maps-script')
		if (!existingScript) {
			const script = document.createElement('script')
			script.id = 'google-maps-script'
			script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&language=uk&region=UA&callback=initPolianaHotelsMap`
			script.async = true
			script.defer = true
			script.onerror = () => setMapError('Не вдалося завантажити Google Maps. Перевірте API key.')
			document.head.appendChild(script)
		} else {
			const retryId = window.setInterval(() => {
				if (win.google?.maps) {
					window.clearInterval(retryId)
					initMap()
				}
			}, 150)

			return () => window.clearInterval(retryId)
		}

		return () => {
			delete win.initPolianaHotelsMap
		}
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
		}, 12000)

		return () => window.clearInterval(intervalId)
	}, [])

	return (
		<div className='w-full'>
			<section className='relative overflow-hidden rounded-none'>
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

				<div className='relative z-10 px-12 py-6 sm:px-16 lg:px-24'>
					<div className='mx-auto mb-8 flex w-full max-w-4xl justify-center gap-2'>
						<div className='flex h-9 w-full max-w-[460px] items-center rounded-[6px] bg-white/95 px-3'>
							<input
								type='text'
								placeholder={
									isMobileSearch ? 'Пошук:' : 'Пошук: Готелі, Чани, SPA, Табори...'
								}
								className='w-full bg-transparent text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none sm:text-sm'
							/>
							<FaSearch className='size-3.5 text-[#53C4DA]' />
						</div>
						<button
							type='button'
							className='inline-flex h-9 items-center justify-center gap-2 rounded-md bg-white/95 px-4 text-xs font-medium text-slate-700 sm:text-sm'
						>
							<FaMapMarkerAlt className='size-3.5 text-[#53C4DA]' />
							Поляна
						</button>
					</div>

					<div className='grid items-end gap-8 lg:grid-cols-[minmax(0,1fr)_560px]'>
						<div className='max-w-[560px] pt-1 text-white'>
							<h1 className='text-[44px] font-black leading-[1.04] sm:text-[60px]'>
								Поляна
								<br />туристична дестинація №1
								<br />
								на Закарпатті!
							</h1>
							<p className='mt-4 max-w-[540px] text-sm font-medium text-white/90 sm:text-[26px] sm:leading-[1.05]'>
								Житло, SPA, Чани, Табори та Розваги
							</p>
							<div className='mt-7 flex flex-wrap gap-4 sm:gap-5'>
								<button
									type='button'
									className='cursor-pointer rounded-md bg-[#53C4DA] px-7 py-3 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:text-sm'
								>
									ЗНАЙТИ ЖИТЛО
								</button>
								<button
									type='button'
									className='cursor-pointer rounded-md bg-[#F68F5D] px-7 py-3 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:text-sm'
								>
									АКЦІЇ ТА ПРОПОЗИЦІЇ
								</button>
							</div>
						</div>

						<div className='ml-auto flex w-full max-w-[560px] min-h-[340px] overflow-hidden rounded-[18px] bg-[#F08F61] text-white'>
							<div className='flex w-[53%] flex-col px-5 pb-5 pt-4'>
								<p className='mt-2 inline-block self-start rounded-full bg-white/25 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.08em]'>
									Гаряча пропозиція
								</p>
								<h3 className='mt-8 max-w-[250px] text-[32px] font-black leading-[1.5]'>
									Форель + чан
									<br />= -20%
								</h3>
								<p className='mt-4 max-w-[205px] text-[16px] leading-[1.5] text-white/90'>
									Відпочивай зі смаком у Поляні
								</p>
								<button
									type='button'
									className='mt-auto self-start cursor-pointer rounded-md bg-white px-4 py-2 text-[14px] font-bold text-[#E06D3C] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
								>
									ДЕТАЛЬНІШЕ
								</button>
							</div>
							<div className='relative w-[47%] overflow-hidden rounded-l-[140px]'>
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

					<div className='mt-4 flex justify-center gap-2'>
						{heroSlides.map((_, index) => (
							<span
								key={index}
								className={`h-2 w-2 rounded-full transition-colors duration-500 ${
									index === activeHeroSlide ? 'bg-white' : 'bg-white/50'
								}`}
							/>
						))}
					</div>
				</div>
			</section>

			<section className='bg-white px-12 py-6 sm:px-16 lg:px-24'>
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
								role='link'
								tabIndex={0}
								onClick={() => openAccommodationWebsite(item.website)}
								onKeyDown={event => {
									if (event.key === 'Enter' || event.key === ' ') {
										event.preventDefault()
										openAccommodationWebsite(item.website)
									}
								}}
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
										className='group absolute right-2 top-2 cursor-pointer rounded-full bg-white/95 p-1.5 text-slate-400 transition-all duration-200 hover:scale-110 hover:text-red-500 active:scale-95'
									>
										<FaHeart
											className={`size-3.5 transition-all duration-200 ${
												isFavorite ? 'scale-110 text-red-500' : 'scale-100 text-slate-400 group-hover:scale-110'
											}`}
										/>
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

			<section className='rounded-none bg-[#EEF4EA] px-12 py-6 sm:px-16 lg:px-24'>
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
							role='link'
							tabIndex={0}
							onClick={() => window.open(katerynaSpaWebsite, '_blank', 'noopener,noreferrer')}
							onKeyDown={event => {
								if (event.key === 'Enter' || event.key === ' ') {
									event.preventDefault()
									window.open(katerynaSpaWebsite, '_blank', 'noopener,noreferrer')
								}
							}}
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

			<section className='bg-white px-12 py-6 sm:px-16 lg:px-24'>
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
									src='/preview.png'
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

			<section className='bg-white px-12 py-6 sm:px-16 lg:px-24'>
				<div className='mb-4 grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center'>
					<h2 className='text-2xl font-bold text-[#2D333D] sm:justify-self-start'>
						Гірськолижний відпочинок
					</h2>
					<div className='hidden items-center gap-2 sm:flex sm:justify-self-center'>
						{skiSeasons.map(season => (
							<button
								key={season}
								type='button'
								onClick={() => setActiveSkiSeason(season)}
								aria-pressed={activeSkiSeason === season}
								className={`cursor-pointer rounded-md px-4 py-1 text-xs font-bold transition-all duration-200 hover:-translate-y-0.5 ${
									activeSkiSeason === season
										? 'bg-[#53C4DA] text-white'
										: 'bg-slate-100 text-slate-500 hover:bg-slate-200'
								}`}
							>
								{season}
							</button>
						))}
					</div>
					<button className='justify-self-start cursor-pointer text-sm font-semibold text-[#53C4DA] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#2FAFC8] sm:justify-self-end'>
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

			<section className='bg-[#F5F6F7] px-12 py-6 sm:px-16 lg:px-24'>
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

			<section className='bg-white px-12 pb-6 pt-2 sm:px-16 lg:px-24'>
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
							<div className='relative h-24'>
								<Image
									src='/preview.png'
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

			<section className='bg-[#F5F6F7] px-12 pb-10 pt-4 sm:px-16 lg:px-24'>
				<div className='mx-auto w-full max-w-7xl'>
					<h2 className='mb-4 text-2xl font-bold text-[#2D333D]'>Карта готелів Поляни</h2>
					<div className='relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm'>
						<div ref={mapContainerRef} className='h-[420px] w-full' />
						<a
							href='https://maps.google.com/?q=%D0%93%D0%BE%D1%82%D0%B5%D0%BB%D1%8C+%D0%9A%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%BD%D0%B0+%D0%9F%D0%BE%D0%BB%D1%8F%D0%BD%D0%B0'
							target='_blank'
							rel='noreferrer'
							className='absolute left-3 top-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#2563EB] shadow-sm ring-1 ring-slate-200 hover:bg-slate-50'
						>
							Відкрити на Картах ↗
						</a>
						{mapError ? (
							<div className='absolute inset-0 flex items-center justify-center bg-white/90 p-4 text-center text-sm font-medium text-slate-600'>
								{mapError}
							</div>
						) : null}
						<div className='border-t border-slate-200 px-4 py-3 text-xs text-slate-600 sm:px-5 sm:text-sm'>
							Карта показує готелі Поляни з окремими маркерами. Основна мітка: Готель Катерина.
						</div>
					</div>
				</div>

				<div className='mx-auto mt-8 w-full max-w-7xl'>
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
												className='flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-[#2D333D] sm:px-5 sm:py-4 sm:text-base'
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
