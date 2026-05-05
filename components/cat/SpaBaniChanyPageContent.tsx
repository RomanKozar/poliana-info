import { categoryPlaceholders } from '@/data/category-placeholders'

const SECTION_KEYS = ['chani', 'bani', 'spaPoslugy'] as const

const SECTION_LABELS: Record<(typeof SECTION_KEYS)[number], string> = {
	chani: 'Чани',
	bani: 'Бані',
	spaPoslugy: 'SPA Послуги',
}

function BannerSkeleton({ index }: { index: number }) {
	return (
		<div
			className='group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-sm ring-1 ring-slate-900/5 transition-all duration-200 hover:-translate-y-1 hover:border-[#53C4DA]/35 hover:shadow-lg hover:ring-[#53C4DA]/20 active:translate-y-0 active:shadow-md'
			aria-hidden
		>
			<div className='aspect-[16/9] min-h-[12rem] w-full animate-pulse bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200/90 transition-[filter] duration-200 group-hover:brightness-[1.06] sm:min-h-[14rem] lg:min-h-[16rem]' />
			<span className='sr-only'>Банер {index}, зображення з&apos;явиться пізніше</span>
		</div>
	)
}

export default function SpaBaniChanyPageContent() {
	const { title } = categoryPlaceholders['spa-bani-chany']

	return (
		<section className='w-full max-w-none px-3 py-8 sm:px-5 sm:py-10 lg:px-8 lg:py-12'>
			<h1 className='sr-only'>{title}</h1>

			<div className='grid gap-10 lg:grid-cols-3 lg:gap-8'>
				{SECTION_KEYS.map((key, colIdx) => (
					<div key={key} className='flex min-h-0 flex-col gap-5'>
						<h2 className='w-full text-center text-2xl font-extrabold tracking-tight text-[#2D333D] sm:text-3xl'>
							{SECTION_LABELS[key]}
						</h2>
						<div className='flex flex-col gap-5'>
							{[0, 1].map(row => (
								<BannerSkeleton key={row} index={colIdx * 2 + row + 1} />
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
