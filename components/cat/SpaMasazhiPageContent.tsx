'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { FaChevronLeft, FaSpa } from 'react-icons/fa'
import {
	SPA_MASAZHI_BOOKING_HREF,
	SPA_MASAZHI_MENU_CATEGORIES,
	spaMasazhiPriceLabel,
} from '@/data/spa-masazhi-services'
import { SPA_MASAZHI_VENUES } from '@/data/spa-masazhi-venues'
import { siteHeaderPhoneDisplay } from '@/data/trout-page'
import SpaBaniChanyComparisonTabs from '@/components/cat/SpaBaniChanyComparisonTabs'
import SpaChanyMap from '@/components/cat/SpaChanyMap'

const KATERYNA_HOTEL_ID = 'kateryna' as const

/** Висота блоку карти на сторінці масажів (окремо від дефолтної `SpaChanyMap`). */
const MASAZHI_MAP_FRAME_CLASS =
	'relative min-h-[340px] h-[min(64vh,34rem)] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-lg sm:min-h-[420px] lg:min-h-0 lg:h-[min(72vh,40rem)]'

/** Зум після завантаження: як на прикладі — річка, квартал, без надмірного наближення. */
const MASAZHI_MAP_MAX_ZOOM = 14

const accent = {
	iconBox: 'inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#53C4DA]/15 text-[#53C4DA]',
	leftRail:
		"relative min-w-0 pl-3 sm:pl-4 before:pointer-events-none before:absolute before:left-0 before:top-3 before:bottom-3 before:w-1 before:rounded-full before:bg-[#53C4DA] before:content-['']",
	bookBtn:
		'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#f68f5d] px-3 py-2 text-xs font-semibold text-white no-underline transition-colors duration-150 hover:bg-[#e57d4a] hover:text-white sm:px-4 sm:text-sm',
}

export default function SpaMasazhiPageContent() {
	const masazhiMapVenues = useMemo(
		() => SPA_MASAZHI_VENUES.filter(v => v.id === KATERYNA_HOTEL_ID),
		[]
	)

	return (
		<section className='w-full max-w-none px-3 pb-12 pt-4 sm:px-5 sm:pb-14 sm:pt-5 lg:px-8 lg:pb-16 lg:pt-6'>
			<nav className='mb-4 text-sm font-semibold text-[#53C4DA]'>
				<Link
					href='/cat/spa-bani-chany'
					className='inline-flex items-center gap-1.5 rounded-lg px-1 py-0.5 transition-colors hover:text-[#2D333D]'
				>
					<FaChevronLeft className='size-3' aria-hidden />
					Чани, бані та SPA центри
				</Link>
			</nav>

			<header className='mb-6 max-w-3xl'>
				<h1 className='text-2xl font-extrabold tracking-tight text-[#2D333D] sm:text-3xl lg:text-4xl'>
					Масажі в Поляні — час, ціна, запис
				</h1>
				<p className='mt-2 text-sm leading-relaxed text-slate-600 sm:text-base'>
					Зведений перелік типових SPA-послуг: тривалість сеансу, орієнтовна вартість і кнопка запису. Конкретний
					заклад, наявність масажиста й актуальний прайс завжди уточнюйте при дзвінку або на ресепшні.
				</p>
			</header>

			<SpaBaniChanyComparisonTabs active='masazhi' />

			<div className='flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,440px)] lg:items-start lg:gap-10'>
				<div className={accent.leftRail}>
					<div className='mb-4 flex items-center gap-2 sm:mb-6'>
						<span className={accent.iconBox}>
							<FaSpa className='size-4' aria-hidden />
						</span>
						<h2 className='text-lg font-extrabold text-[#2D333D] sm:text-xl'>SPA-послуги — перелік</h2>
					</div>

					<div className='w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/5'>
						<div className='hidden border-b border-slate-200 bg-slate-50/90 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 lg:grid lg:grid-cols-[minmax(0,1fr)_6rem_7rem_auto] lg:items-center lg:gap-3'>
							<span>Послуга</span>
							<span className='text-center'>Час</span>
							<span className='text-right'>Ціна</span>
							<span className='sr-only'>Запис</span>
						</div>

						{SPA_MASAZHI_MENU_CATEGORIES.map((cat, catIdx) => (
							<div key={cat.id}>
								<h3
									className={`border-b border-slate-200 bg-[#f8fafc] px-4 py-3 text-center text-sm font-extrabold tracking-wide text-[#2D333D] ${
										catIdx === 0 ? '' : 'border-t border-slate-100'
									}`}
								>
									{cat.title}
								</h3>
								<ul role='list'>
									{cat.items.map(item => (
										<li
											key={item.id}
											className='border-b border-slate-100 px-4 py-4 last:border-b-0 lg:grid lg:grid-cols-[minmax(0,1fr)_6rem_7rem_auto] lg:items-center lg:gap-3 lg:px-4 lg:py-3.5'
										>
											<p className='text-left text-sm font-semibold leading-snug text-[#2D333D] lg:text-center lg:font-bold'>
												{item.name}
											</p>
											<div className='mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 lg:mt-0 lg:contents'>
												<p className='text-sm tabular-nums text-slate-600 lg:text-center'>
													<span className='font-bold text-slate-500 lg:hidden'>Час: </span>
													{item.duration}
												</p>
												<p className='text-sm font-bold tabular-nums text-[#E06D3C] lg:text-center lg:font-semibold'>
													<span className='font-bold text-slate-500 lg:hidden'>Ціна: </span>
													{spaMasazhiPriceLabel(item.priceUah)}
												</p>
												<Link
													href={SPA_MASAZHI_BOOKING_HREF}
													prefetch={false}
													className={`${accent.bookBtn} lg:justify-self-end`}
													aria-label={`Зателефонувати для запису: ${siteHeaderPhoneDisplay}`}
												>
													Забронювати
												</Link>
											</div>
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</div>

				<div className='min-w-0 lg:sticky lg:top-[calc(var(--header-offset,5rem)+1rem)]'>
					<h2 className='mb-3 text-lg font-extrabold text-[#2D333D] sm:text-xl'>Масаж і SPA на карті</h2>
					{masazhiMapVenues.length > 0 ? (
						<SpaChanyMap
							venues={masazhiMapVenues}
							selectedId={null}
							windowInitCallbackName='initPolyanaMasazhiMap'
							mapAriaLabel='Карта: масаж і SPA — Готель Катерина, Поляна'
							embedIframeTitle='Масаж і SPA — Готель Катерина, Поляна — Google Maps'
							infoWindowVariant='masazhi'
							frameClassName={MASAZHI_MAP_FRAME_CLASS}
							fitBoundsMaxZoom={MASAZHI_MAP_MAX_ZOOM}
						/>
					) : (
						<div className='flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100/80 px-4 text-center text-sm text-slate-500'>
							Немає точки для відображення на карті.
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
