import Link from 'next/link'
import {
	FaArrowRight,
	FaBolt,
	FaLeaf,
	FaPhoneAlt,
	FaRegLightbulb,
} from 'react-icons/fa'
import { EXCURSIONS_MOUNTAINS_ANCHOR_ID } from '@/data/excursions-page'
import {
	promotionsHeroLead,
	promotionsOffers,
	promotionsTips,
	type PromoAccent,
} from '@/data/promotions-page'
import { siteHeaderPhoneDisplay, siteHeaderPhoneTel } from '@/data/trout-page'

const accentBorder: Record<PromoAccent, string> = {
	coral: 'border-l-[#F08F61]',
	cyan: 'border-l-[#53C4DA]',
	emerald: 'border-l-emerald-500',
	amber: 'border-l-amber-400',
}

export default function PromotionsOffersPageContent() {
	const telHref = `tel:${siteHeaderPhoneTel}`

	return (
		<div className='flex min-h-0 flex-col bg-[#F5F6F7]'>
			<section className='relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-[#1E3D53] via-[#264D67] to-[#153a48] px-4 py-12 text-white sm:px-10 sm:py-14 lg:px-16 lg:py-16'>
				<div
					className='pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#53C4DA]/25 blur-[80px]'
					aria-hidden
				/>
				<div
					className='pointer-events-none absolute -bottom-16 left-[-10%] h-56 w-[55%] max-w-md rounded-full bg-[#F68F5D]/20 blur-[70px]'
					aria-hidden
				/>
				<div className='relative mx-auto max-w-4xl'>
					<p className='text-xs font-semibold uppercase tracking-[0.2em] text-[#53C4DA] sm:text-sm'>
						Спецпропозиції Поляни
					</p>
					<h1 className='mt-3 text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl sm:leading-[1.05]'>
						Акції та пропозиції
					</h1>
					<p className='mt-5 max-w-2xl text-sm leading-relaxed text-white/88 sm:text-lg'>
						{promotionsHeroLead}
					</p>
					<div className='mt-8 flex flex-wrap gap-3'>
						<a
							href={telHref}
							className='inline-flex items-center gap-2 rounded-xl bg-[#53C4DA] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#45b8cf]'
						>
							<FaPhoneAlt className='size-4' aria-hidden />
							{siteHeaderPhoneDisplay}
						</a>
						<Link
							href={`/excursions#${EXCURSIONS_MOUNTAINS_ANCHOR_ID}`}
							className='inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/18'
						>
							Ідеї для дня
							<FaArrowRight className='size-3.5 opacity-90' aria-hidden />
						</Link>
					</div>
				</div>
			</section>

			<section className='mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14'>
				<h2 className='text-xl font-extrabold text-[#2D333D] sm:text-2xl'>Що зараз особливо вигідно</h2>
				<p className='mt-2 max-w-2xl text-sm text-slate-600 sm:text-base'>
					Натисніть картку — перейдете до розділу сайту з деталями. Знижки й подарункові формати завжди
					узгоджуємо індивідуально.
				</p>

				<div className='mt-8 grid gap-5 sm:grid-cols-2 lg:gap-6'>
					{promotionsOffers.map(offer => (
						<Link
							key={offer.id}
							href={offer.href}
							className={`group relative flex flex-col rounded-2xl border border-slate-200/90 border-l-4 bg-white p-5 shadow-sm ring-1 ring-slate-900/[0.04] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${accentBorder[offer.accent]} no-underline sm:p-6`}
						>
							<span className='inline-flex w-fit rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600'>
								{offer.badge}
							</span>
							<h3 className='mt-3 text-lg font-bold leading-snug text-[#2D333D] sm:text-xl'>
								{offer.title}
							</h3>
							<p className='mt-2 flex-1 text-sm leading-relaxed text-slate-600'>{offer.description}</p>
							<span className='mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#53C4DA]'>
								{offer.cta}
								<FaArrowRight
									className='size-3.5 transition-transform group-hover:translate-x-1'
									aria-hidden
								/>
							</span>
						</Link>
					))}
				</div>
			</section>

			<section className='border-y border-slate-200/80 bg-white'>
				<div className='mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 lg:py-14'>
					<div className='relative max-w-xl overflow-hidden rounded-2xl bg-gradient-to-br from-[#F08F61] via-[#ea8659] to-[#dc7349] p-6 text-white shadow-xl shadow-orange-900/20 sm:p-8'>
						<div
							className='pointer-events-none absolute -right-8 top-0 h-32 w-32 rounded-full bg-white/15 blur-2xl'
							aria-hidden
						/>
						<p className='relative text-[11px] font-bold uppercase tracking-[0.14em] text-white/85'>
							Хіт сезону
						</p>
						<p className='relative mt-2 text-2xl font-black leading-tight sm:text-3xl'>
							Форель + чан
							<span className='block text-white/95'>−20% за умовами закладу</span>
						</p>
						<p className='relative mt-3 max-w-md text-sm leading-relaxed text-white/90'>
							Як на головній сторінці: поєднайте смак Карпат із відпочинком у чані — запитайте про актуальний
							пакет при дзвінку.
						</p>
						<div className='relative mt-6 flex flex-wrap gap-3'>
							<Link
								href='/gastronomy'
								className='rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#c55d33] shadow-md transition hover:-translate-y-0.5 no-underline'
							>
								Форель і ресторани
							</Link>
							<Link
								href='/cat/spa-bani-chany'
								className='rounded-lg border border-white/45 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/15 no-underline'
							>
								Чани та SPA
							</Link>
						</div>
					</div>

					<div className='grid flex-1 gap-4 sm:max-w-md'>
						<div className='flex gap-3 rounded-xl border border-slate-200 bg-[#F5F6F7] p-4'>
							<span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#53C4DA]/20 text-[#127985]'>
								<FaBolt className='size-5' aria-hidden />
							</span>
							<div>
								<p className='font-bold text-[#2D333D]'>Швидкий старт</p>
								<p className='mt-1 text-sm text-slate-600'>
									Оберіть напрям із карток вище або зателефонуйте — підкажемо сумісний маршрут на 1–3 дні.
								</p>
							</div>
						</div>
						<div className='flex gap-3 rounded-xl border border-slate-200 bg-[#F5F6F7] p-4'>
							<span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-800'>
								<FaLeaf className='size-5' aria-hidden />
							</span>
							<div>
								<p className='font-bold text-[#2D333D]'>Локально й по-доброму</p>
								<p className='mt-1 text-sm text-slate-600'>
									Традиції Закарпаття, свіжі продукти й спокійний темп — без зайвого галасу в описах.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14'>
				<h2 className='flex items-center gap-2 text-xl font-extrabold text-[#2D333D] sm:text-2xl'>
					<FaRegLightbulb className='size-6 text-[#53C4DA]' aria-hidden />
					Як взяти максимум із поїздки
				</h2>
				<div className='mt-8 grid gap-6 md:grid-cols-3'>
					{promotionsTips.map((tip, i) => (
						<div
							key={i}
							className='rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-900/[0.04]'
						>
							<p className='text-base font-bold text-[#2D333D]'>{tip.title}</p>
							<p className='mt-2 text-sm leading-relaxed text-slate-600'>{tip.text}</p>
						</div>
					))}
				</div>
			</section>

			<section className='border-t border-slate-200/80 bg-gradient-to-r from-[#53C4DA]/12 via-white to-[#53C4DA]/10'>
				<div className='mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8'>
					<div>
						<h2 className='text-lg font-extrabold text-[#2D333D] sm:text-xl'>Готові підібрати акцію під вас?</h2>
						<p className='mt-2 max-w-xl text-sm text-slate-600 sm:text-base'>
							Залишились питання щодо чанів, житла чи екскурсій — зателефонуйте: допоможемо скласти зручний план
							відпочинку під ваші дати.
						</p>
					</div>
					<a
						href={telHref}
						className='inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#2D333D] px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#1f2429]'
					>
						<FaPhoneAlt className='size-5 text-[#53C4DA]' aria-hidden />
						{siteHeaderPhoneDisplay}
					</a>
				</div>
			</section>
		</div>
	)
}
