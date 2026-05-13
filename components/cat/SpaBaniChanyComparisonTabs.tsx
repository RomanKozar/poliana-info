import Link from 'next/link'

export type SpaBaniChanyComparisonTab = 'veliki' | 'mali' | 'bani'

const VELIKI_HREF = '/cat/spa-bani-chany/veliki-chany' as const
const MALI_HREF = '/cat/spa-bani-chany/mali-chany' as const
const BANI_HREF = '/cat/spa-bani-chany/bani' as const

export default function SpaBaniChanyComparisonTabs({ active }: { active: SpaBaniChanyComparisonTab }) {
	return (
		<div className='mb-5 sm:mb-6' role='tablist' aria-label='Порівняння: великі чани, малі чани чи бані'>
			<p className='mb-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-500'>Порівняння</p>
			<div className='flex flex-wrap gap-2 rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-sm ring-1 ring-slate-900/5'>
				<Link
					href={VELIKI_HREF}
					role='tab'
					aria-selected={active === 'veliki'}
					className={`min-w-0 flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-extrabold transition-all sm:flex-none sm:px-4 ${
						active === 'veliki'
							? 'bg-[#53C4DA]/14 text-[#2D333D] ring-1 ring-[#53C4DA]/35'
							: 'text-slate-600 hover:bg-slate-50 hover:text-[#2D333D]'
					}`}
				>
					Великі чани
					<span className='mt-0.5 block text-[11px] font-semibold leading-tight text-slate-500'>до 8 осіб</span>
				</Link>
				<Link
					href={MALI_HREF}
					role='tab'
					aria-selected={active === 'mali'}
					className={`min-w-0 flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-extrabold transition-all sm:flex-none sm:px-4 ${
						active === 'mali'
							? 'bg-[#0d9488]/14 text-[#2D333D] ring-1 ring-[#0d9488]/35'
							: 'text-slate-600 hover:bg-slate-50 hover:text-[#2D333D]'
					}`}
				>
					Малі чани
					<span className='mt-0.5 block text-[11px] font-semibold leading-tight text-slate-500'>до 4 осіб</span>
				</Link>
				<Link
					href={BANI_HREF}
					role='tab'
					aria-selected={active === 'bani'}
					className={`min-w-0 flex-1 rounded-xl px-3 py-2.5 text-center text-sm font-extrabold transition-all sm:flex-none sm:px-4 ${
						active === 'bani'
							? 'bg-[#d97706]/14 text-[#2D333D] ring-1 ring-[#d97706]/40'
							: 'text-slate-600 hover:bg-slate-50 hover:text-[#2D333D]'
					}`}
				>
					Бані
					<span className='mt-0.5 block text-[11px] font-semibold leading-tight text-slate-500'>сауна · парна</span>
				</Link>
			</div>
		</div>
	)
}
