'use client'

import { FaClock, FaMapMarkerAlt, FaMoneyBillWave, FaUserTie, FaUsers } from 'react-icons/fa'
import VelykyiVerkhRouteMap from '@/components/excursions/VelykyiVerkhRouteMap'
import {
	RozhokHeroGalleryImage as HeroGalleryImage,
	RozhokPhotoGalleryProvider as PhotoGalleryProvider,
	RozhokPhotoGalleryStrip as PhotoGalleryStrip,
} from '@/components/excursions/RozhokPhotoGallery'

const VELYKYI_VERKH_PHOTOS = [
	'/images/excursions/mountains/mountains-6.webp',
	'/images/excursions/mountains/mountains-3.webp',
	'/images/excursions/mountains/mountains-2.webp',
	'/images/excursions/mountains/mountains-1.webp',
] as const

export default function VelykyiVerkhDetailPage() {
	return (
		<PhotoGalleryProvider images={VELYKYI_VERKH_PHOTOS}>
			<div className='flex min-h-0 w-full flex-col bg-[#F5F6F7] pb-3 sm:pb-12'>
				<section className='border-b border-slate-200/80 bg-white px-4 py-8 sm:px-16 lg:py-12 lg:px-24'>
					<div className='grid items-start gap-8 lg:grid-cols-2 lg:gap-14'>
						<div className='max-w-xl lg:max-w-none'>
							<p className='text-sm font-medium uppercase tracking-wide text-[#53C4DA]'>Екскурсії в гори</p>
							<h1 className='mt-2 text-3xl font-bold text-[#2D333D] sm:text-4xl'>
								Гора Поляна Кохання
							</h1>
							<p className='mt-3 flex items-start gap-2 text-slate-600'>
								<FaMapMarkerAlt className='mt-1 size-4 shrink-0 text-[#53C4DA]' aria-hidden />
								<span>с. Поляна, Закарпатська обл.</span>
							</p>
							<p className='mt-4 leading-relaxed text-slate-600'>
								Легка поїздка на оглядову точку біля Поляни: панорами, фото та короткий підйом без довгого
								походу.
							</p>

							<div className='my-6 h-px max-w-md bg-gradient-to-r from-[#53C4DA]/35 via-slate-200 to-transparent' />

							<div className='grid gap-4 sm:grid-cols-2'>
								<div className='rounded-2xl border border-slate-200/90 bg-[#F5F6F7] p-5 shadow-sm'>
									<p className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500'>
										<FaMoneyBillWave className='size-3.5 text-[#53C4DA]' aria-hidden />
										Ціна
									</p>
									<p className='mt-2 text-lg font-bold text-[#2D333D]'>Уточнюйте при бронюванні</p>
									<p className='mt-2 text-sm text-slate-600'>Залежить від формату та кількості людей у групі.</p>
								</div>

								<div className='rounded-2xl border border-slate-200/90 bg-[#F5F6F7] p-5 shadow-sm'>
									<p className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500'>
										<FaClock className='size-3.5 text-[#53C4DA]' aria-hidden />
										Тривалість
									</p>
									<p className='mt-2 text-lg font-bold text-[#2D333D]'>Орієнтовно 1–1,5 години</p>
									<p className='mt-2 text-sm text-slate-600'>Залежить від темпу, погоди та зупинок.</p>
								</div>
							</div>

							<div className='mt-5 grid gap-4 sm:grid-cols-2'>
								<div className='rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm'>
									<p className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500'>
										<FaUserTie className='size-3.5 text-[#53C4DA]' aria-hidden />
										Хто проводить
									</p>
									<p className='mt-2 font-semibold text-[#2D333D]'>Місцевий гід (за домовленістю)</p>
									<p className='mt-2 text-sm text-slate-600'>Підбір маршруту під вашу підготовку та безпеку.</p>
								</div>
								<div className='rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm'>
									<p className='flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500'>
										<FaUsers className='size-3.5 text-[#53C4DA]' aria-hidden />
										Місткість авто
									</p>
									<p className='mt-2 font-semibold text-[#2D333D]'>4–5 осіб</p>
									<p className='mt-2 text-sm text-slate-600'>Оптимально для компанії або сім’ї.</p>
								</div>
							</div>
						</div>

						<div>
							<HeroGalleryImage
								src={VELYKYI_VERKH_PHOTOS[0]}
								alt='Гора Поляна Кохання'
								priority
								sizes='(max-width: 1024px) 100vw, 50vw'
								className='relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm ring-1 ring-slate-900/5 outline-none transition hover:brightness-[1.02] focus-visible:ring-2 focus-visible:ring-[#53C4DA]'
							/>
							<div className='px-4 py-4 sm:px-5'>
								<p className='text-sm font-semibold text-[#2D333D]'>Панорами й фото</p>
								<p className='mt-1 text-sm text-slate-600'>Короткий виїзд для красивих краєвидів поруч із Поляною.</p>
							</div>
						</div>
					</div>
				</section>

				<section
					className='border-t border-slate-200/80 bg-[#EEF0F2] px-4 py-8 sm:px-16 lg:px-24'
					aria-labelledby='velykyi-verkh-gallery-heading'
				>
					<h2 id='velykyi-verkh-gallery-heading' className='text-xl font-bold text-[#2D333D] sm:text-2xl'>
						Фото
					</h2>
					<p className='mt-2 max-w-3xl text-sm text-slate-600'>Натисніть, щоб переглянути та гортати.</p>
					<div className='mt-6'>
						<PhotoGalleryStrip images={VELYKYI_VERKH_PHOTOS} />
					</div>
				</section>

				<section className='border-t border-slate-200/80 bg-white px-4 py-10 sm:px-16 lg:px-24'>
					<h2 className='text-2xl font-bold text-[#2D333D]'>Карта</h2>
					<p className='mt-2 max-w-3xl text-sm text-slate-600'>
						Маршрут позначено прапорцями: <span className='font-semibold text-emerald-600'>зелений</span> — початок,{' '}
						<span className='font-semibold text-red-600'>червоний</span> — кінець.
					</p>
					<VelykyiVerkhRouteMap />
				</section>
			</div>
		</PhotoGalleryProvider>
	)
}

