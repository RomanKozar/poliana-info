import Image from 'next/image'
import Link from 'next/link'
import { categoryPlaceholders } from '@/data/category-placeholders'

const VELIKI_CHANY_PATH = '/cat/spa-bani-chany/veliki-chany' as const
const MALI_CHANY_PATH = '/cat/spa-bani-chany/mali-chany' as const
const BANI_PATH = '/cat/spa-bani-chany/bani' as const
const BASENI_PATH = '/cat/spa-bani-chany/baseni' as const
const MASAZHI_PATH = '/cat/spa-bani-chany/masazhi' as const
const FITOBOCHKY_PATH = '/cat/spa-bani-chany/fitobochky' as const

const SECTION_KEYS = ['chani', 'bani', 'spaPoslugy'] as const

const SECTION_LABELS: Record<(typeof SECTION_KEYS)[number], string> = {
	chani: 'Чани',
	bani: 'Бані',
	spaPoslugy: 'SPA Послуги',
}

/** Файли `spa-title-*.webp` — 1651×1001; співвідношення сторін без обрізання по висоті/ширині. */
const SPA_TITLE_ASPECT_CLASS = 'aspect-[1651/1001]' as const

/** Alt для екранних зчитувачів (текст на картці прибрано). */
const SPA_TITLE_ALT_BY_SLOT: Record<number, string> = {
	1: 'Великий чан до 8 людей — Поляна',
	2: 'Малий чан до 4 людей — Поляна',
	3: 'Бані — Поляна',
	4: 'Басейни — Поляна',
	5: 'Оздоровчі масажі — Поляна',
	6: 'Фітобочки — Поляна',
}

function SpaTitleBanner({
	alt,
	imageIndex,
	href,
}: {
	alt: string
	/** 1–6: слот у сітці → `spa-title-{n}.webp`. */
	imageIndex: number
	/** Якщо задано — уся картка є посиланням. */
	href?: string
}) {
	const src = `/images/spa-title/spa-title-${imageIndex}.webp`

	const shellClassName =
		'group relative block cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-sm ring-1 ring-slate-900/5 transition-all duration-200 hover:-translate-y-1 hover:border-[#53C4DA]/35 hover:shadow-lg hover:ring-[#53C4DA]/20 active:translate-y-0 active:shadow-md'

	const inner = (
		<div className={`relative w-full overflow-hidden ${SPA_TITLE_ASPECT_CLASS}`}>
			<Image
				src={src}
				alt={alt}
				fill
				className='object-cover object-center transition-[filter] duration-200 group-hover:brightness-[1.06]'
				sizes='(min-width: 1024px) 32vw, 96vw'
			/>
		</div>
	)

	if (href) {
		return (
			<Link href={href} className={shellClassName}>
				{inner}
			</Link>
		)
	}

	return <div className={shellClassName}>{inner}</div>
}

export default function SpaBaniChanyPageContent() {
	const { title } = categoryPlaceholders['spa-bani-chany']

	return (
		<section className='w-full max-w-none px-3 pt-2 pb-10 sm:px-5 sm:pt-3 sm:pb-12 lg:px-8 lg:pt-4 lg:pb-16'>
			<h1 className='sr-only'>{title}</h1>

			<div className='grid gap-10 lg:grid-cols-3 lg:gap-8'>
				{SECTION_KEYS.map((key, colIdx) => (
					<div key={key} className='flex min-h-0 flex-col gap-5'>
						<h2 className='w-full cursor-pointer text-center text-2xl font-extrabold tracking-tight text-[#2D333D] sm:text-3xl'>
							{key === 'bani' ? (
								<Link
									href={BANI_PATH}
									className='rounded-lg outline-none ring-[#53C4DA]/0 transition hover:text-[#53C4DA] focus-visible:ring-2 focus-visible:ring-[#53C4DA]/40'
								>
									{SECTION_LABELS[key]}
								</Link>
							) : (
								SECTION_LABELS[key]
							)}
						</h2>
						<div className='flex flex-col gap-5'>
							{[0, 1].map(row => {
								const imageIndex = colIdx * 2 + row + 1
								const bannerAlt = SPA_TITLE_ALT_BY_SLOT[imageIndex] ?? `${SECTION_LABELS[key]} — зображення ${row + 1}`
								return (
									<SpaTitleBanner
										key={row}
										alt={bannerAlt}
										imageIndex={imageIndex}
										href={
											imageIndex === 1
												? MALI_CHANY_PATH
												: imageIndex === 2
													? VELIKI_CHANY_PATH
													: imageIndex === 3
														? BANI_PATH
														: imageIndex === 4
															? BASENI_PATH
															: imageIndex === 5
																? MASAZHI_PATH
																: imageIndex === 6
																	? FITOBOCHKY_PATH
																	: undefined
										}
									/>
								)
							})}
						</div>
					</div>
				))}
			</div>
		</section>
	)
}
