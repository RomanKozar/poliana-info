'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
	accommodations,
	campYears,
	camps,
	categoryItems,
	faqItems,
	heroSlides,
	popularNow,
	skiRecreation,
	spaItems,
} from '@/data/home-page'
import {
	FaChevronDown,
	FaChevronLeft,
	FaChevronRight,
	FaMapMarkerAlt,
	FaStar,
} from 'react-icons/fa'

const HomePageMapSection = dynamic(() => import('@/components/home/HomePageMapSection'), {
	ssr: false,
	loading: () => (
		<section className='bg-[#F5F6F7] px-4 pb-4 pt-4 sm:px-16 lg:px-24'>
			<div className='mx-auto w-full max-w-7xl'>
				<h2 className='mb-4 text-2xl font-bold text-[#2D333D]'>Карта готелів та магазинів Поляни</h2>
				<div
					className='h-[420px] w-full animate-pulse rounded-2xl bg-slate-200/90 ring-1 ring-slate-900/5'
					aria-hidden
				/>
			</div>
		</section>
	),
})

export default function HomePage() {
	const [favoriteAccommodations, setFavoriteAccommodations] = useState<Record<string, boolean>>({})
	const [activeCampYear, setActiveCampYear] = useState<(typeof campYears)[number]>('2026')
	const [activeHeroSlide, setActiveHeroSlide] = useState(0)
	const [openFaqIndexes, setOpenFaqIndexes] = useState<Set<number>>(new Set())
	const [isMobileSearch, setIsMobileSearch] = useState(false)

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
									src='/images/gallery/akziya.webp'
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
						<Link
							key={item.label}
							href={item.href}
							className='flex min-h-22 cursor-pointer flex-col items-center justify-center rounded-xl bg-white px-2 py-2 text-center shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:min-h-24 sm:px-3'
						>
							<item.icon className='size-6 text-[#7ABEC8] sm:size-7' aria-hidden />
							<p className='mt-1.5 text-[11px] font-semibold leading-tight text-slate-600 sm:mt-2 sm:text-sm'>
								{item.label}
							</p>
						</Link>
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

			<HomePageMapSection />

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
