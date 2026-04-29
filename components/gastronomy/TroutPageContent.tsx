'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaPhoneAlt } from 'react-icons/fa'
import TroutHeroFishingDecoration from '@/components/gastronomy/TroutHeroFishingDecoration'
import TroutMapSection from '@/components/gastronomy/TroutMapSection'
import {
	siteHeaderPhoneDisplay,
	siteHeaderPhoneTel,
	troutFishingImages,
	troutRestaurantImages,
} from '@/data/trout-page'

/** Два рядки візуально — один номер із хедера виділено як ключовий контакт для груп і ресторанів. */
function PhoneCard() {
	const href = `tel:${siteHeaderPhoneTel}`
	return (
		<a
			href={href}
			className='group flex min-h-[5.25rem] items-center gap-4 rounded-2xl border-2 border-[#8B2942]/25 bg-white/95 px-5 py-4 shadow-md shadow-[#8B2942]/10 transition hover:border-[#8B2942]/45 hover:shadow-lg'
		>
			<span className='flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#53C4DA]/30 to-[#53C4DA]/10 text-[#1a6374] ring-2 ring-[#53C4DA]/50 transition group-hover:from-[#53C4DA]/45'>
				<FaPhoneAlt className='size-6' aria-hidden />
			</span>
			<div className='min-w-0 text-left'>
				<span className='block text-xs font-semibold uppercase tracking-wide text-slate-600'>Умови за телефоном</span>
				<span className='mt-0.5 block text-lg font-extrabold tracking-tight text-[#8B2942] sm:text-xl'>
					{siteHeaderPhoneDisplay}
				</span>
			</div>
		</a>
	)
}

/** Помітний фона для блоку про риболовлю — насиченіший aqua/cyan узгоджений із шапкою сайту (без фото). */
function LovlyaSectionBackdrop() {
	return (
		<>
			<div
				className='pointer-events-none absolute inset-0 bg-gradient-to-br from-[#9ddfef] via-[#d2f1f8] to-[#7ecfe3]'
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/30'
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute inset-0 opacity-[0.55] bg-[radial-gradient(rgb(15_118_110_/_0.16)_1.5px,transparent_1.5px)] [background-size:20px_20px]'
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute -left-32 top-0 h-[22rem] w-[22rem] rounded-full bg-[#53C4DA]/35 blur-[72px]'
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute -right-16 bottom-[-10%] h-64 w-64 rounded-full bg-cyan-300/40 blur-[60px]'
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute bottom-0 left-1/2 h-24 w-[120%] max-w-5xl -translate-x-1/2 bg-gradient-to-t from-cyan-600/10 to-transparent'
				aria-hidden
			/>
		</>
	)
}

/** Тепліший тон для ресторану: камінь/крем, діагональний штрих і м’які warm-орели (без зображень). */
function RestoranSectionBackdrop() {
	return (
		<>
			<div
				className='pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#faf8f6] via-white to-[#fff9f3]'
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute inset-0 opacity-[0.055] bg-[repeating-linear-gradient(-32deg,#78716c_0,#78716c_1px,transparent_1px,transparent_14px)]'
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute inset-0 opacity-[0.2] bg-[radial-gradient(rgb(251_146_60_/_0.09)_1px,transparent_1px)] [background-size:18px_18px]'
				aria-hidden
			/>
			<div
				className='pointer-events-none absolute right-[-10%] top-[-5%] h-48 w-[38%] max-w-xl rounded-[40%] bg-amber-100/35 blur-[70px]'
				aria-hidden
			/>
		</>
	)
}

function SectionCarousel({
	items,
	priorityFirst,
}: {
	items: readonly { src: string; alt: string }[]
	priorityFirst?: boolean
}) {
	const n = items.length
	const [idx, setIdx] = useState(0)
	const go = useCallback(
		(delta: number) => {
			if (n <= 0) return
			setIdx(i => (i + delta + n) % n)
		},
		[n]
	)

	if (n === 0) return null
	const active = items[idx] ?? items[0]

	return (
		<div className='relative mx-auto w-full max-w-[min(24.5rem,100%)] sm:max-w-[min(25rem,100%)] lg:max-w-[min(24rem,100%)]'>
			<div className='relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-100 shadow-md sm:aspect-[4/3] lg:aspect-[3/4]'>
				<Image
					src={active.src}
					alt={active.alt}
					fill
					className='object-cover object-center'
					sizes='(min-width: 1024px) 400px, (min-width: 640px) 400px, 92vw'
					priority={Boolean(priorityFirst && idx === 0)}
				/>

				{n > 1 ? (
					<>
						<button
							type='button'
							onClick={() => go(-1)}
							className='absolute left-2 top-1/2 z-[1] flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/35 text-xl text-white shadow backdrop-blur-sm transition hover:bg-black/55'
							aria-label='Попереднє фото'
						>
							<FaChevronLeft aria-hidden />
						</button>
						<button
							type='button'
							onClick={() => go(1)}
							className='absolute right-2 top-1/2 z-[1] flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/35 text-xl text-white shadow backdrop-blur-sm transition hover:bg-black/55'
							aria-label='Наступне фото'
						>
							<FaChevronRight aria-hidden />
						</button>
					</>
				) : null}
			</div>

			{n > 1 ? (
				<div className='mt-4 flex justify-center gap-2' role='tablist' aria-label='Слайди галереї'>
					{items.map((_, i) => (
						<button
							key={items[i]?.src ?? i}
							type='button'
							role='tab'
							aria-selected={i === idx}
							onClick={() => setIdx(i)}
							className={`h-2.5 w-2.5 rounded-sm transition ${i === idx ? 'scale-125 bg-[#2B3138]' : 'bg-slate-300 hover:bg-slate-400'}`}
							aria-label={`Фото ${i + 1} з ${n}`}
						/>
					))}
				</div>
			) : null}
		</div>
	)
}

export default function TroutPageContent() {
	return (
		<main className='bg-white text-slate-800'>
			<section className='relative overflow-x-clip overflow-y-visible border-b border-slate-200/80 bg-gradient-to-br from-[#e8f6fa] via-white to-[#f3fdfa] px-4 py-12 sm:px-10 lg:px-20'>
				<TroutHeroFishingDecoration />
				<div
					className='pointer-events-none absolute -right-16 top-8 z-[1] h-64 w-32 opacity-[0.12]'
					style={{
						backgroundImage: `repeating-linear-gradient(105deg, #64748b 0 2px, transparent 2px 14px)`,
					}}
					aria-hidden
				/>
				<div className='relative z-10 mx-auto max-w-5xl'>
					<h1 className='text-4xl font-extrabold tracking-tight text-[#2B3138] sm:text-5xl'>
						Форель у Поляні
					</h1>
					<p className='mt-4 max-w-2xl text-lg leading-relaxed text-slate-600'>
						Риболовля для дітей і дорослих, локальні страви з форелі й приємний відпочинок біля водойми в
						Закарпатті.
					</p>
				</div>
			</section>

			<section
				id='lovlya'
				className='relative w-full overflow-hidden border-b border-slate-200/40'
				aria-labelledby='trout-fishing-heading'
			>
				{/* М’який перехід від світлішого блоку над секцією */}
				<div
					className='pointer-events-none absolute inset-x-0 top-0 z-[2] h-24 bg-gradient-to-b from-white via-white/70 to-transparent sm:h-28'
					aria-hidden
				/>
				<LovlyaSectionBackdrop />
				<div className='relative z-[3] mx-auto max-w-6xl px-4 py-14 sm:px-10 lg:px-12 lg:py-16'>
					<div className='grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14'>
						<SectionCarousel items={troutFishingImages} priorityFirst />
						<div className='relative rounded-3xl bg-gradient-to-r from-white/25 via-white/65 to-white/85 p-6 shadow-[0_8px_40px_-12px_rgb(13_116_133_/_0.25)] backdrop-blur-md lg:min-h-[280px] lg:p-8'>
							<h2 id='trout-fishing-heading' className='text-2xl font-extrabold text-[#2B3138] sm:text-3xl'>
								Клює у всіх!
							</h2>
						<p className='mt-5 leading-relaxed text-slate-600'>
							Форелева риболовля — улюблена розвага дітей і дорослих у нас уже багато років. Радимо неспішно
							насолодитися риболовлею, а потім смачно поласувати спійманою рибою. Гарантовані яскраві емоції й
							гарячий обід або вечеря.
						</p>
						<p className='mt-4 leading-relaxed text-slate-600'>
							У наявності є спорядження, щоб риболовля була успішною й комфортною — персонал підказує й ділиться
							порадами.
						</p>
					</div>
					</div>
				</div>
			</section>

			<section className='relative overflow-hidden bg-gradient-to-br from-[#eef2f4] via-[#f5f8fa] to-[#eaeef2] px-4 py-16 sm:px-10 lg:py-20'>
				<div
					className='pointer-events-none absolute inset-0 opacity-[0.06]'
					aria-hidden
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpath fill='%23475569' d='M60 18c14 8 26 26 26 42 0 18-22 42-26 42-6 0-26-26-26-42 0-16 14-34 26-42z'/%3E%3C/svg%3E")`,
						backgroundSize: '140px 140px',
					}}
				/>
				<div className='relative mx-auto max-w-4xl'>
					<div className='rounded-[1.65rem] border border-white/80 bg-white/70 p-8 shadow-xl shadow-slate-400/15 backdrop-blur-sm sm:p-10'>
						<h2 className='text-center text-xl font-extrabold uppercase leading-snug tracking-wide text-[#2B3138] sm:text-2xl'>
							Для ресторанів і туристичних груп — окремі умови й ціни
						</h2>
						<p className='mt-3 text-center text-slate-600'>Уточнюйте деталі й бронювання за телефоном:</p>
						<div className='mx-auto mt-8 flex max-w-xl justify-center'>
							<PhoneCard />
						</div>
					</div>
				</div>
			</section>

			<section
				id='restoran'
				className='relative w-full overflow-hidden border-b border-slate-200/50'
				aria-labelledby='trout-rest-heading'
			>
				<RestoranSectionBackdrop />
				<div className='relative z-[1] mx-auto max-w-6xl px-4 py-14 sm:px-10 lg:px-12 lg:py-16'>
				<div className='grid gap-10 lg:grid-flow-dense lg:grid-cols-2 lg:items-center lg:gap-14'>
					<div className='lg:col-start-2'>
						<SectionCarousel items={troutRestaurantImages} />
					</div>
					<div className='lg:col-start-1 lg:row-start-1'>
						<h2 id='trout-rest-heading' className='text-2xl font-extrabold text-[#2B3138] sm:text-3xl'>
							Ресторан
						</h2>
						<p className='mt-5 leading-relaxed text-slate-600'>
							Найсмачніше починається тут: приготуйте свій улов самі або замовте страву з форелі в нашому
							закладі — готуємо на вогні з ароматними зеленню або овочами, і через кілька хвилин на столі —
							свіжа та соковита риба.
						</p>
						<p className='mt-4 leading-relaxed text-slate-600'>
							Питання щодо меню та замовлень зручніше вирішити голосом — тим самим номером, що й у верхній
							панелі сайту.
						</p>
						<Link
							href={`tel:${siteHeaderPhoneTel}`}
							className='mt-8 inline-flex min-h-[2.875rem] items-center justify-center rounded-xl border-2 border-[#8B2942] px-7 py-2.5 text-base font-bold text-[#8B2942] transition hover:bg-[#8B2942] hover:text-white'
						>
							Зателефонувати
						</Link>
					</div>
				</div>
				</div>
			</section>

			<section
				id='de-tse'
				className='bg-slate-50/90 px-4 pb-8 pt-8 sm:px-10 sm:pb-9 sm:pt-9 lg:px-16'
				aria-labelledby='where-heading'
			>
				<div className='mx-auto max-w-5xl'>
					<h2 id='where-heading' className='text-center text-2xl font-extrabold text-[#2B3138] sm:text-3xl'>
						Де це розташовано
					</h2>
					<p className='mx-auto mt-3 max-w-2xl text-center leading-relaxed text-slate-600'>
						Споруди й водойми для форелевої риболовлі та туристична інфраструктура села знаходяться в{' '}
						<strong className='font-semibold text-slate-800'>Поляні, Закарпатська область</strong> —
						дорогою між гірськими курортами, затишним кліматом і зручним під&apos;їздом із обласного центру.
					</p>
					<p className='mx-auto mt-2 flex flex-wrap items-center justify-center gap-2 text-center text-slate-600'>
						<span>Навігатор або питання —</span>
						<a
							className='inline-flex items-center gap-2 rounded-lg bg-[#53C4DA]/20 px-3 py-1.5 font-bold text-[#0c4a5e] hover:bg-[#53C4DA]/35'
							href={`tel:${siteHeaderPhoneTel}`}
						>
							<FaPhoneAlt className='size-4' aria-hidden />
							{siteHeaderPhoneDisplay}
						</a>
					</p>

					<div className='relative mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-lg sm:mt-7'>
						<TroutMapSection
							frameClassName='relative min-h-[280px] h-[min(55vh,28rem)] max-h-[640px] w-full overflow-hidden rounded-2xl bg-slate-100'
						/>
					</div>
				</div>
			</section>
		</main>
	)
}
