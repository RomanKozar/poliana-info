'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { IconType } from 'react-icons'
import {
	FaBiking,
	FaCamera,
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
		price: 'від 1200 грн',
		rating: '4.8 (126)',
		image: '/images/accommodation/kateryna-v1.jpg',
	},
	{
		title: 'Готель "Континент"',
		location: 'вул. Сонячна, 59, Поляна, Закарпатська область, 89313',
		description: 'Комфортні номери, басейн, SPA зона.',
		price: 'від 1600 грн',
		rating: '4.7 (98)',
		image: '/images/accommodation/kontinent.jpg',
	},
	{
		title: 'River Side Hotel',
		location: 'вул. Духновича, 68, Поляна, Закарпатська область, 89313',
		description: 'Сімейний відпочинок, тиша та свіже повітря Карпат.',
		price: 'від 1100 грн',
		rating: '4.6 (74)',
		image: '/images/accommodation/river-side.jpg',
	},
	{
		title: 'Arena Apart-Hotel',
		location: 'Курортна вулиця, 23, Поляна, Закарпатська область, 89314',
		description: 'Сучасний апарт-готель зі SPA, сауною та відкритим басейном.',
		price: 'від 2000 грн',
		rating: '4.9 (56)',
		image: '/images/accommodation/arena.webp',
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
	{ label: 'Гірськолижні школи', icon: FaBiking },
	{ label: 'Походи', icon: FaHiking },
	{ label: 'Активний відпочинок', icon: FaBiking },
	{ label: 'Ресторани', icon: FaUtensils },
	{ label: 'Риболовля', icon: FaFish },
	{ label: 'Екскурсії', icon: FaCamera },
	{ label: 'Мінеральні води', icon: FaWater },
	{ label: 'Трансфер', icon: FaShuttleVan },
]

const popularNow = [
	{ badge: 'ТОП ГОТЕЛІ', title: 'Найкращі готелі Поляни', text: 'Підбірка перевірених готелів.' },
	{ badge: 'ТОП ЧАНИ', title: 'Чани з видом на гори', text: 'Відпочинок, який запам’ятається.' },
	{ badge: 'ТОП SPA', title: 'SPA для тіла та душі', text: 'Релакс, масажі та процедури.' },
]

const campYears = ['2026', '2025', '2024'] as const
const skiSeasons = ['ЗИМА', 'ВСЕСЕЗОН', 'ЛІТО'] as const

export default function Home() {
	const [favoriteAccommodations, setFavoriteAccommodations] = useState<Record<string, boolean>>({})
	const [activeCampYear, setActiveCampYear] = useState<(typeof campYears)[number]>('2026')
	const [activeSkiSeason, setActiveSkiSeason] = useState<(typeof skiSeasons)[number]>('ЗИМА')

	const toggleAccommodationFavorite = (title: string) => {
		setFavoriteAccommodations(prev => ({
			...prev,
			[title]: !prev[title],
		}))
	}

	return (
		<div className='w-full'>
			<section className='relative overflow-hidden rounded-none'>
				<div className='absolute inset-0'>
					<Image
						src='/images/gallery/golovna-foto.jpeg'
						alt='Відпочинок у Поляні'
						fill
						sizes='100vw'
						priority
						className='object-cover'
					/>
				</div>
				<div className='absolute inset-0 bg-gradient-to-r from-[#1E3D53]/80 via-[#264D67]/65 to-[#294B61]/40' />

				<div className='relative z-10 px-12 py-6 sm:px-16 lg:px-24'>
					<div className='mx-auto mb-8 flex w-full max-w-4xl justify-center gap-2'>
						<div className='flex h-9 w-full max-w-[460px] items-center rounded-[6px] bg-white/95 px-3'>
							<input
								type='text'
								placeholder='Пошук: Готелі, Чани, SPA, Табори...'
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
						<span className='h-2 w-2 rounded-full bg-white' />
						<span className='h-2 w-2 rounded-full bg-white/50' />
						<span className='h-2 w-2 rounded-full bg-white/50' />
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
										onClick={() => toggleAccommodationFavorite(item.title)}
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
				<div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8'>
					{categoryItems.map(item => (
						<div
							key={item.label}
							className='flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-xl bg-white px-2 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'
						>
							<item.icon className='size-7 text-[#7ABEC8]' />
							<p className='mt-2 text-xs font-semibold text-slate-600'>{item.label}</p>
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
		</div>
	)
}
