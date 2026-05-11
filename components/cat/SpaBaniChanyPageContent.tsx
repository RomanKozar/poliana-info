import Image from 'next/image'
import Link from 'next/link'
import { categoryPlaceholders } from '@/data/category-placeholders'

const VELIKI_CHANY_PATH = '/cat/spa-bani-chany/veliki-chany' as const

const SECTION_KEYS = ['chani', 'bani', 'spaPoslugy'] as const

const SECTION_LABELS: Record<(typeof SECTION_KEYS)[number], string> = {
	chani: 'Чани',
	bani: 'Бані',
	spaPoslugy: 'SPA Послуги',
}

type SpaBannerCaption = {
	/** Акцентний фрагмент (колір `#53C4DA` як у шапці). */
	accent: string
	/** Решта фрази білим. */
	plain: string
}

/**
 * Слот сітки (1–6) → номер файлу `spa-{n}.webp`.
 * Обміняно лише слоти 3 і 6 (фото під «Бані» та «Фітобочки»).
 */
const SPA_BANNER_FILE_BY_SLOT: Record<number, number> = {
	1: 1,
	2: 2,
	3: 6,
	4: 4,
	5: 5,
	6: 3,
}

function spaBannerFileIndex(slotIndex: number): number {
	return SPA_BANNER_FILE_BY_SLOT[slotIndex] ?? slotIndex
}

/** Підписи на банерах: ключ = слот у сітці (1–6). */
const SPA_BANNER_CAPTIONS: Partial<Record<number, SpaBannerCaption>> = {
	1: { accent: 'Великий чан', plain: ' до 8 людей' },
	2: { accent: 'Малий чан', plain: ' до 4 людей' },
	3: { accent: 'Бані', plain: '' },
	4: { accent: 'Басейни', plain: '' },
	5: { accent: 'Оздоровчі масажі', plain: '' },
	6: { accent: 'Фітобочки', plain: '' },
}

function SpaTitleBanner({
	alt,
	imageIndex,
	caption,
	href,
}: {
	alt: string
	/** 1–6: слот у сітці; файл через `spaBannerFileIndex`. */
	imageIndex: number
	/** Підпис поверх знімка: градієнт знизу `from-[#2B3138]`. */
	caption?: SpaBannerCaption
	/** Якщо задано — уся картка є посиланням (наприклад, на сторінку порівняння великих чанів). */
	href?: string
}) {
	const src = `/images/spa-title/spa-${spaBannerFileIndex(imageIndex)}.webp`

	const shellClassName =
		'group relative block cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-sm ring-1 ring-slate-900/5 transition-all duration-200 hover:-translate-y-1 hover:border-[#53C4DA]/35 hover:shadow-lg hover:ring-[#53C4DA]/20 active:translate-y-0 active:shadow-md'

	const inner = (
		<div className='relative aspect-[16/9] min-h-[12rem] w-full sm:min-h-[14rem] lg:min-h-[16rem]'>
			<Image
				src={src}
				alt={alt}
				fill
				className='object-cover transition-[filter] duration-200 group-hover:brightness-[1.06]'
				sizes='(min-width: 1024px) 28vw, 96vw'
			/>
			{caption ? (
				<div className='pointer-events-none absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-[#2B3138]/95 via-[#2B3138]/65 to-transparent px-3 pb-3 pt-10 sm:px-4 sm:pb-4 sm:pt-12'>
					<p className='text-[13px] font-extrabold leading-tight tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)] sm:text-base lg:text-lg'>
						<span className='text-[#53C4DA]'>{caption.accent}</span>
						<span className='text-white'>{caption.plain}</span>
					</p>
				</div>
			) : null}
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
							{SECTION_LABELS[key]}
						</h2>
						<div className='flex flex-col gap-5'>
							{[0, 1].map(row => {
								const imageIndex = colIdx * 2 + row + 1
								const caption = SPA_BANNER_CAPTIONS[imageIndex]
								return (
									<SpaTitleBanner
										key={row}
										alt={`${SECTION_LABELS[key]} — зображення ${row + 1}`}
										imageIndex={imageIndex}
										caption={caption}
										href={imageIndex === 1 ? VELIKI_CHANY_PATH : undefined}
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
