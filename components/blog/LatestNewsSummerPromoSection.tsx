import Image from 'next/image'
import Link from 'next/link'
import { FaClock, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa'
import { EXCURSIONS_ATTRACTIONS_ANCHOR_ID } from '@/data/excursions-page'

/** Якір для банера `atracion-vidpochynok` на головній → `/blog/latest-news#…`. */
export const LATEST_NEWS_SUMMER_PROMO_ANCHOR_ID = 'litno-v-polyani'

const BOOKING_PHONE = '+380 (50) 214 92 66'
const BOOKING_TEL = '+380502149266'

export default function LatestNewsSummerPromoSection() {
	return (
		<section
			id={LATEST_NEWS_SUMMER_PROMO_ANCHOR_ID}
			className='scroll-mt-[calc(var(--header-offset,68px)+16px)] mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8'
			aria-labelledby='summer-polyana-promo-heading'
		>
			<article className='overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-md ring-1 ring-slate-900/5'>
				<div className='relative aspect-[16/7] w-full min-h-[180px] sm:min-h-[240px]'>
					<Image
						src='/images/baner/atracion-vidpochynok.webp'
						alt='Літні атракціони та басейн у Поляні'
						fill
						priority
						sizes='(min-width: 1280px) 80vw, 100vw'
						className='object-cover object-center'
					/>
					<div className='absolute inset-0 bg-gradient-to-t from-[#1E3D53]/90 via-[#264D67]/35 to-transparent' />
					<div className='absolute bottom-0 left-0 right-0 p-5 sm:p-8'>
						<p className='inline-flex rounded-full bg-[#53C4DA] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-white shadow-sm'>
							Гаряча новина
						</p>
						<h2
							id='summer-polyana-promo-heading'
							className='mt-3 max-w-2xl text-2xl font-black leading-tight text-white sm:text-4xl'
						>
							Літо кличе в Поляну!
						</h2>
					</div>
				</div>

				<div className='space-y-6 p-5 sm:p-8'>
					<div className='space-y-4 text-sm leading-relaxed text-slate-700 sm:text-base'>
						<p>
							Літо в самому розпалі! А поєднати відпочинок з гірськими краєвидами можна в Поляні!
							Якщо ви досі не були тут, то радимо не зволікати! Чудовий басейн з комфортною
							температурою води у поєднанні з відпочинком на карпатських атракціонах-гігантах не
							залишають байдужими жодного гостя Поляни – туристичної дестинації №1 на Закарпатті!
						</p>
						<p>
							Всього{' '}
							<span className='font-extrabold text-[#2D333D]'>500 гривень</span> за купання у
							басейні та катання на карпатських гойдалках і літньому тюбінгу – це дуже вигідна
							пропозиція та вдала інвестиція у відновлення ваших сил!
						</p>
					</div>

					<div className='rounded-2xl border-2 border-[#53C4DA]/40 bg-gradient-to-br from-[#F2FAFC] via-white to-[#FFF8F3] p-5 sm:p-6'>
						<p className='text-center text-xs font-semibold uppercase tracking-[0.12em] text-[#53C4DA]'>
							Спеціальна пропозиція
						</p>
						<p className='mt-2 text-center text-3xl font-black tabular-nums text-[#2D333D] sm:text-4xl'>
							500 ₴
						</p>
						<p className='mt-2 text-center text-sm font-medium text-slate-600 sm:text-base'>
							Басейн + карпатські гойдалки + літній тюбінг
						</p>
					</div>

					<ul className='grid gap-3 sm:grid-cols-3'>
						<li className='flex gap-3 rounded-xl bg-[#F5F6F7] p-4'>
							<FaClock className='mt-0.5 size-4 shrink-0 text-[#53C4DA]' aria-hidden />
							<div>
								<p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
									Графік
								</p>
								<p className='mt-1 text-sm font-bold text-[#2D333D]'>Щодня з 9:00 до 21:00</p>
							</div>
						</li>
						<li className='flex gap-3 rounded-xl bg-[#F5F6F7] p-4 sm:col-span-1'>
							<FaMapMarkerAlt className='mt-0.5 size-4 shrink-0 text-[#53C4DA]' aria-hidden />
							<div>
								<p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
									Локація
								</p>
								<p className='mt-1 text-sm font-bold text-[#2D333D]'>Готель «Катерина»</p>
								<p className='mt-1 text-xs leading-snug text-slate-600'>
									вул. Сонячна, 55-б, с. Поляна, Мукачівський район, Закарпатська область, 89313
								</p>
							</div>
						</li>
						<li className='flex gap-3 rounded-xl bg-[#F5F6F7] p-4'>
							<FaPhoneAlt className='mt-0.5 size-4 shrink-0 text-[#53C4DA]' aria-hidden />
							<div>
								<p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>
									Забронювати
								</p>
								<a
									href={`tel:${BOOKING_TEL}`}
									className='mt-1 inline-block text-sm font-bold text-cyan-700 underline-offset-2 transition-colors hover:text-cyan-600 hover:underline'
								>
									{BOOKING_PHONE}
								</a>
							</div>
						</li>
					</ul>

					<div className='flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:flex-wrap'>
						<a
							href={`tel:${BOOKING_TEL}`}
							className='inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-[#53C4DA] px-5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-500 hover:shadow-md sm:min-w-[200px] sm:flex-none'
						>
							Забронювати зараз
						</a>
						<Link
							href={`/cat/goteli-polyany/kateryna`}
							className='inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-bold text-[#2D333D] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#53C4DA]/40 hover:shadow-md sm:min-w-[200px] sm:flex-none'
						>
							Готель «Катерина»
						</Link>
						<Link
							href={`/excursions#${EXCURSIONS_ATTRACTIONS_ANCHOR_ID}`}
							className='inline-flex h-11 flex-1 items-center justify-center rounded-xl bg-[#F68F5D] px-5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E9753E] hover:shadow-md sm:min-w-[200px] sm:flex-none'
						>
							Атракціони в Поляні
						</Link>
					</div>
				</div>
			</article>
		</section>
	)
}
