/** Візуальна заглушка панелі сторінок (без логіки навігації). */

function ChevronLeft({ className }: { className?: string }) {
	return (
		<svg className={className} width={20} height={20} viewBox='0 0 24 24' fill='none' aria-hidden>
			<path
				d='M15 18l-6-6 6-6'
				stroke='currentColor'
				strokeWidth={1.75}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

function ChevronRight({ className }: { className?: string }) {
	return (
		<svg className={className} width={20} height={20} viewBox='0 0 24 24' fill='none' aria-hidden>
			<path
				d='M9 18l6-6-6-6'
				stroke='currentColor'
				strokeWidth={1.75}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default function AccommodationListPaginationStub() {
	return (
		<nav
			className='flex justify-center pt-6'
			aria-label='Пагінація списку (заглушка)'
		>
			<div className='flex items-center gap-7 text-[#2d333d]'>
				<span className='flex items-center justify-center text-slate-300' aria-hidden>
					<ChevronLeft className='block' />
				</span>
				<span className='flex size-9 shrink-0 items-center justify-center rounded-full bg-[#2d333d] text-sm font-semibold text-white'>
					1
				</span>
				<span className='text-sm font-semibold tabular-nums'>2</span>
				<span className='flex items-center justify-center text-[#2d333d]' aria-hidden>
					<ChevronRight className='block' />
				</span>
			</div>
		</nav>
	)
}
