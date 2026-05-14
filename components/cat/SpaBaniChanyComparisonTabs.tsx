import Link from 'next/link'

export type SpaBaniChanyComparisonTab = 'veliki' | 'mali' | 'bani' | 'baseni' | 'masazhi' | 'fitobochky'

const VELIKI_HREF = '/cat/spa-bani-chany/veliki-chany' as const
const MALI_HREF = '/cat/spa-bani-chany/mali-chany' as const
const BANI_HREF = '/cat/spa-bani-chany/bani' as const
const BASENI_HREF = '/cat/spa-bani-chany/baseni' as const
const MASAZHI_HREF = '/cat/spa-bani-chany/masazhi' as const
const FITOBOCHKY_HREF = '/cat/spa-bani-chany/fitobochky' as const

/** Бірюзовий фон лише на поточній сторінці; інші вкладки без заливки. */
const tabInactive = 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-[#2D333D]'
const tabActive =
	'bg-[#53C4DA]/22 text-[#2D333D] ring-2 ring-[#53C4DA]/50 shadow-sm shadow-[#53C4DA]/15'

export default function SpaBaniChanyComparisonTabs({ active }: { active: SpaBaniChanyComparisonTab }) {
	return (
		<div className='mb-5 sm:mb-6' role='tablist' aria-label='Порівняння: чани, бані, басейни, масажі чи фітобочки'>
			<p className='mb-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-500'>Порівняння</p>
			<div className='grid grid-cols-2 gap-2 rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-sm ring-1 ring-slate-900/5 sm:flex sm:flex-row sm:flex-wrap sm:gap-2'>
				<Link
					href={VELIKI_HREF}
					role='tab'
					aria-selected={active === 'veliki'}
					className={`w-full min-w-0 rounded-xl px-3 py-2.5 text-center text-sm font-extrabold transition-all sm:w-auto sm:flex-none sm:px-4 ${
						active === 'veliki' ? tabActive : tabInactive
					}`}
				>
					Великі чани
					<span className='mt-0.5 block text-[11px] font-semibold leading-tight text-slate-500'>до 8 осіб</span>
				</Link>
				<Link
					href={MALI_HREF}
					role='tab'
					aria-selected={active === 'mali'}
					className={`w-full min-w-0 rounded-xl px-3 py-2.5 text-center text-sm font-extrabold transition-all sm:w-auto sm:flex-none sm:px-4 ${
						active === 'mali' ? tabActive : tabInactive
					}`}
				>
					Малі чани
					<span className='mt-0.5 block text-[11px] font-semibold leading-tight text-slate-500'>до 4 осіб</span>
				</Link>
				<Link
					href={BANI_HREF}
					role='tab'
					aria-selected={active === 'bani'}
					className={`w-full min-w-0 rounded-xl px-3 py-2.5 text-center text-sm font-extrabold transition-all sm:w-auto sm:flex-none sm:px-4 ${
						active === 'bani' ? tabActive : tabInactive
					}`}
				>
					Бані
					<span className='mt-0.5 block text-[11px] font-semibold leading-tight text-slate-500'>
						дрова · релакс
					</span>
				</Link>
				<Link
					href={BASENI_HREF}
					role='tab'
					aria-selected={active === 'baseni'}
					className={`w-full min-w-0 rounded-xl px-3 py-2.5 text-center text-sm font-extrabold transition-all sm:w-auto sm:flex-none sm:px-4 ${
						active === 'baseni' ? tabActive : tabInactive
					}`}
				>
					Басейни
					<span className='mt-0.5 block text-[11px] font-semibold leading-tight text-slate-500'>
						відкриті · закриті
					</span>
				</Link>
				<Link
					href={MASAZHI_HREF}
					role='tab'
					aria-selected={active === 'masazhi'}
					className={`w-full min-w-0 rounded-xl px-3 py-2.5 text-center text-sm font-extrabold transition-all sm:w-auto sm:flex-none sm:px-4 ${
						active === 'masazhi' ? tabActive : tabInactive
					}`}
				>
					Масажі
					<span className='mt-0.5 block text-[11px] font-semibold leading-tight text-slate-500'>
						{"здоров'я · спокій"}
					</span>
				</Link>
				<Link
					href={FITOBOCHKY_HREF}
					role='tab'
					aria-selected={active === 'fitobochky'}
					className={`w-full min-w-0 rounded-xl px-3 py-2.5 text-center text-sm font-extrabold transition-all sm:w-auto sm:flex-none sm:px-4 ${
						active === 'fitobochky' ? tabActive : tabInactive
					}`}
				>
					Фітобочки
					<span className='mt-0.5 block text-[11px] font-semibold leading-tight text-slate-500'>
						аромат · тепло
					</span>
				</Link>
			</div>
		</div>
	)
}
