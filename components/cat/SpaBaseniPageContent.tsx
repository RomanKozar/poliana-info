'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState } from 'react'
import { FaChevronDown, FaChevronLeft, FaMapMarkedAlt } from 'react-icons/fa'
import { spaBaseniPoolTypesForVenue } from '@/data/spa-baseni-pool-types'
import { SPA_BASENI_VENUES } from '@/data/spa-baseni-venues'
import { siteHeaderPhoneDisplay } from '@/data/trout-page'
import SpaBaniChanyComparisonTabs from '@/components/cat/SpaBaniChanyComparisonTabs'
import SpaChanyMap from '@/components/cat/SpaChanyMap'

type SortDir = 'asc' | 'desc'

const SORT_PRESETS: { dir: SortDir; label: string }[] = [
	{ dir: 'asc', label: 'Спочатку дешевші' },
	{ dir: 'desc', label: 'Спочатку дорожчі' },
]

function sortDirLabel(dir: SortDir): string {
	return SORT_PRESETS.find(p => p.dir === dir)?.label ?? 'Спочатку дешевші'
}

/** Акцент #53C4DA як на сторінках чанів і бань. */
const accent = {
	iconBox: 'inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#53C4DA]/15 text-[#53C4DA]',
	filterBtn:
		'inline-flex min-w-0 cursor-pointer items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white px-4 py-2.5 text-left shadow-sm ring-1 ring-slate-900/5 transition-all hover:border-[#53C4DA]/40 hover:ring-[#53C4DA]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#53C4DA]/35 sm:min-w-[8.5rem]',
	filterLabel: 'text-sm font-extrabold tracking-tight text-[#53C4DA]',
	sortSelected: 'bg-[#53C4DA]/12 text-[#2D333D]',
	reset:
		'cursor-pointer rounded-xl border border-transparent px-3 py-2 text-sm font-bold text-slate-500 underline decoration-slate-300 underline-offset-2 transition-colors hover:text-[#53C4DA] disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-40 disabled:no-underline',
	rowActive: 'bg-[#53C4DA]/8 ring-1 ring-inset ring-[#53C4DA]/25',
	rowInactive: 'hover:bg-slate-50/80',
	mapBtn:
		'cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-[#53C4DA] shadow-sm transition-all hover:border-[#53C4DA]/50 hover:bg-[#53C4DA]/10',
	mobileCard: 'ring-2 ring-[#53C4DA]/40',
	mobileMapBtn:
		'cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-[#53C4DA] transition-colors hover:bg-[#53C4DA]/10',
	leftRail:
		"relative min-w-0 pl-3 sm:pl-4 before:pointer-events-none before:absolute before:left-0 before:top-3 before:bottom-3 before:w-1 before:rounded-full before:bg-[#53C4DA] before:content-['']",
}

export default function SpaBaseniPageContent() {
	const [selectedId, setSelectedId] = useState<string | null>(null)
	const [sortDir, setSortDir] = useState<SortDir>('asc')
	const [sortMenuOpen, setSortMenuOpen] = useState(false)
	const sortControlRef = useRef<HTMLDivElement | null>(null)
	const mapAnchorRef = useRef<HTMLDivElement | null>(null)

	const filteredVenues = useMemo(() => {
		const list = [...SPA_BASENI_VENUES]
		list.sort((a, b) =>
			sortDir === 'asc' ? a.priceFromUah - b.priceFromUah : b.priceFromUah - a.priceFromUah
		)
		return list
	}, [sortDir])

	useEffect(() => {
		if (selectedId && !filteredVenues.some(v => v.id === selectedId)) {
			setSelectedId(null)
		}
	}, [filteredVenues, selectedId])

	useEffect(() => {
		if (!sortMenuOpen) return
		const onPointerDown = (e: PointerEvent) => {
			if (!sortControlRef.current?.contains(e.target as Node)) {
				setSortMenuOpen(false)
			}
		}
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setSortMenuOpen(false)
		}
		document.addEventListener('pointerdown', onPointerDown)
		window.addEventListener('keydown', onKey)
		return () => {
			document.removeEventListener('pointerdown', onPointerDown)
			window.removeEventListener('keydown', onKey)
		}
	}, [sortMenuOpen])

	const resetSortFilter = () => {
		setSortDir('asc')
		setSortMenuOpen(false)
	}

	const showOnMap = (id: string) => {
		setSelectedId(id)
		mapAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
	}

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
					Басейни в Поляні
				</h1>
				<p className='mt-2 text-sm leading-relaxed text-slate-600 sm:text-base'>
					Після прогулянки чи гірськолижного дня так і хочеться стрибнути в теплу воду. Порівняйте заклади,
					подивіться їх на карті й узгодьте візит. Суми в таблиці зазвичай відображають орієнтир за
					проживанням; вартість відвідування басейну завжди уточнюйте в готелі.
				</p>
			</header>

			<SpaBaniChanyComparisonTabs active='baseni' />

			<div className='flex flex-col gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,440px)] lg:items-start lg:gap-10'>
				<div className={accent.leftRail}>
					<div className='mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between'>
						<h2 className='flex items-center gap-2 text-lg font-extrabold text-[#2D333D] sm:text-xl'>
							<span className={accent.iconBox}>
								<FaMapMarkedAlt className='size-4' aria-hidden />
							</span>
							<span className='leading-snug'>Де поплавати після гір</span>
						</h2>
						<div
							ref={sortControlRef}
							className='flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto sm:shrink-0'
						>
							<div className='relative'>
								<button
									type='button'
									id='baseni-sort-filter'
									onClick={() => setSortMenuOpen(o => !o)}
									aria-expanded={sortMenuOpen}
									aria-haspopup='listbox'
									aria-controls='baseni-sort-listbox'
									aria-label={`Фільтр сортування. Зараз: ${sortDirLabel(sortDir)}`}
									className={accent.filterBtn}
								>
									<span className={accent.filterLabel}>Фільтр</span>
									<span className='flex shrink-0 items-center text-slate-500'>
										<FaChevronDown
											className={`size-3.5 transition-transform duration-200 ${sortMenuOpen ? 'rotate-180' : ''}`}
											aria-hidden
										/>
									</span>
								</button>
								{sortMenuOpen ? (
									<ul
										id='baseni-sort-listbox'
										role='listbox'
										aria-labelledby='baseni-sort-filter'
										className='absolute right-0 z-30 mt-2 w-full min-w-[min(100%,17.5rem)] overflow-hidden rounded-2xl border border-slate-200/90 bg-white py-1 shadow-xl ring-1 ring-slate-900/10 sm:left-auto sm:min-w-[13.5rem]'
									>
										{SORT_PRESETS.map(preset => {
											const selected = sortDir === preset.dir
											return (
												<li key={preset.dir} role='presentation'>
													<button
														type='button'
														role='option'
														aria-selected={selected}
														onClick={() => {
															setSortDir(preset.dir)
															setSortMenuOpen(false)
														}}
														className={`w-full cursor-pointer px-4 py-3 text-left text-sm font-extrabold transition-colors ${
															selected ? accent.sortSelected : 'text-slate-700 hover:bg-slate-50'
														}`}
													>
														{preset.label}
													</button>
												</li>
											)
										})}
									</ul>
								) : null}
							</div>
							<button
								type='button'
								onClick={resetSortFilter}
								disabled={sortDir === 'asc'}
								className={accent.reset}
								title='Повернути сортування: спочатку дешевші'
							>
								Скинути
							</button>
						</div>
					</div>

					{filteredVenues.length === 0 ? (
						<p className='rounded-2xl border border-dashed border-slate-300 bg-white/80 px-4 py-6 text-center text-sm text-slate-600'>
							Закладів поки немає в списку.
						</p>
					) : (
						<>
							<div className='hidden overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/5 lg:block'>
								<table className='w-full border-collapse text-center text-sm'>
									<thead>
										<tr className='border-b border-slate-200 bg-slate-50/90 text-xs font-bold uppercase tracking-wide text-slate-500'>
											<th className='px-4 py-3'>Заклад</th>
											<th className='min-w-0 px-3 py-3 sm:px-4'>Відкриті / криті</th>
											<th className='px-4 py-3'>Ціна</th>
											<th className='px-4 py-3'>На карті</th>
											<th className='px-4 py-3'>Дія</th>
										</tr>
									</thead>
									<tbody>
										{filteredVenues.map(v => {
											const active = selectedId === v.id
											const pool = spaBaseniPoolTypesForVenue(v.id)
											return (
												<tr
													key={v.id}
													className={`border-b border-slate-100 transition-colors last:border-0 ${
														active ? accent.rowActive : accent.rowInactive
													}`}
												>
													<td className='px-4 py-3.5 font-bold text-[#2D333D]'>{v.name}</td>
													<td className='min-w-0 px-3 py-3.5 text-left text-xs font-semibold leading-snug text-slate-700 sm:px-4'>
														<span className='block'>
															<span className='font-bold uppercase tracking-wide text-slate-500'>Відкриті:</span>{' '}
															{pool.openAir}
														</span>
														<span className='mt-1 block'>
															<span className='font-bold uppercase tracking-wide text-slate-500'>Криті:</span>{' '}
															{pool.indoor}
														</span>
													</td>
													<td className='px-4 py-3.5 font-semibold text-[#E06D3C]'>{v.priceLabel}</td>
													<td className='px-4 py-3.5'>
														<button
															type='button'
															onClick={() => showOnMap(v.id)}
															className={accent.mapBtn}
														>
															Переглянути
														</button>
													</td>
													<td className='px-4 py-3.5'>
														<Link
															href={v.bookingHref}
															prefetch={false}
															className='inline-flex cursor-pointer items-center justify-center rounded-full bg-[#f68f5d] px-2.5 py-2 text-xs font-semibold text-white no-underline transition-colors duration-150 hover:bg-[#e57d4a] hover:text-white'
															aria-label={`Зателефонувати для бронювання: ${siteHeaderPhoneDisplay}`}
														>
															Забронювати
														</Link>
													</td>
												</tr>
											)
										})}
									</tbody>
								</table>
							</div>

							<ul className='flex flex-col gap-3 lg:hidden'>
								{filteredVenues.map(v => {
									const active = selectedId === v.id
									const pool = spaBaseniPoolTypesForVenue(v.id)
									return (
										<li
											key={v.id}
											className={`rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm ring-1 ring-slate-900/5 ${
												active ? accent.mobileCard : ''
											}`}
										>
											<div className='flex flex-col gap-2'>
												<p className='text-base font-extrabold text-[#2D333D]'>{v.name}</p>
												<div className='text-[11px] leading-snug text-slate-600'>
													<p className='text-[10px] font-bold uppercase tracking-wide text-slate-500'>Відкриті / криті</p>
													<p className='mt-1'>
														<span className='font-semibold text-slate-500'>Відкриті:</span> {pool.openAir}
													</p>
													<p className='mt-0.5'>
														<span className='font-semibold text-slate-500'>Криті:</span> {pool.indoor}
													</p>
												</div>
												<p className='text-xs font-semibold uppercase tracking-wide text-slate-500'>Ціна</p>
												<p className='text-sm font-bold text-[#E06D3C]'>{v.priceLabel}</p>
												<div className='mt-2 flex flex-wrap justify-end gap-2'>
													<button
														type='button'
														onClick={() => showOnMap(v.id)}
														className={accent.mobileMapBtn}
													>
														На карті
													</button>
													<Link
														href={v.bookingHref}
														prefetch={false}
														className='inline-flex cursor-pointer items-center justify-center rounded-full bg-[#f68f5d] px-4 py-2 text-sm font-semibold text-white no-underline transition-colors duration-150 hover:bg-[#e57d4a] hover:text-white'
														aria-label={`Зателефонувати для бронювання: ${siteHeaderPhoneDisplay}`}
													>
														Забронювати
													</Link>
												</div>
											</div>
										</li>
									)
								})}
							</ul>
						</>
					)}
				</div>

				<div ref={mapAnchorRef} className='min-w-0 lg:sticky lg:top-[calc(var(--header-offset,5rem)+1rem)]'>
					<h2 className='mb-3 text-lg font-extrabold text-[#2D333D] sm:text-xl'>Карта закладів із басейнами</h2>
					{filteredVenues.length > 0 ? (
						<SpaChanyMap
							venues={filteredVenues}
							selectedId={selectedId}
							windowInitCallbackName='initPolyanaBaseniMap'
							mapAriaLabel='Карта готелів із басейнами в Поляні'
							embedIframeTitle='Басейни в Поляні — карта Google'
							infoWindowVariant='baseni'
						/>
					) : (
						<div className='flex min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-100/80 px-4 text-center text-sm text-slate-500'>
							Немає точок для відображення на карті.
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
