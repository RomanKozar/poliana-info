import Image from 'next/image'
import Link from 'next/link'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Останні новини Поляни та туризму на Закарпатті',
	description:
		'Новини курорту Поляна: розвиток інфраструктури, туристичний збір, інвестиції та тренди відпочинку у 2025–2026 роках.',
	pathname: '/blog/latest-news',
})

export default function LatestNewsPage() {
	const latestPublications = [
		{
			href: '/blog/autumn-vacation',
			image: '/images/gallery/golovna-foto-3.webp',
			date: 'Квітень 2026',
			tag: 'Що побачити',
			title: 'Осінній відпочинок у Поляні',
			excerpt: 'Чани, гастрономія, затишні вікенди та нескладні маршрути з панорамами Карпат.',
		},
		{
			href: '/blog/summer-vacation',
			image: '/images/gallery/golovna-foto.webp',
			date: 'Травень 2026',
			tag: 'Поради',
			title: 'Літній відпочинок у Поляні',
			excerpt: 'Табори, SPA, тюбінг, веломаршрути та сімейний відпочинок — ідеї на весь сезон.',
		},
		{
			href: '/blog/poliana-in-spring',
			image: '/images/gallery/golovna-foto-2.webp',
			date: 'Березень 2026',
			tag: 'Що побачити',
			title: 'Поляна весною',
			excerpt: 'Спокійні прогулянки, SPA та поїздки без натовпів — найкращий час для короткої подорожі.',
		},
		{
			href: '/blog/poliana-in-winter',
			image: '/images/entertainment/tybinh-v2-1.webp',
			date: 'Лютий 2026',
			tag: 'Новини Закарпаття',
			title: 'Поляна взимку — лижі, тюбінг і чани',
			excerpt: 'Лижна школа, тюбінг, гірськолижний курорт і теплі чани для всієї родини.',
		},
	] as const

	return (
		<div className='w-full bg-[#F5F6F7]'>
			<section className='relative overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='/images/gallery/golovna-foto-3.webp'
						alt='Панорама Поляни'
						fill
						priority
						sizes='100vw'
						className='object-cover'
					/>
				</div>
				<div className='absolute inset-0 bg-gradient-to-r from-[#1E3D53]/85 via-[#264D67]/70 to-[#294B61]/45' />
				<div className='relative z-10 mx-auto w-full max-w-7xl px-4 py-14 text-white sm:px-6 lg:px-8'>
					<p className='inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]'>
						Останні новини
					</p>
					<h1 className='mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-5xl'>
						Поляна - лідер туристичного збору на Закарпатті
					</h1>
					<p className='mt-4 max-w-3xl text-sm text-white/90 sm:text-lg'>
						Підсумки 2025 року підтверджують динамічний розвиток громади: інвестиції, розширення
						мережі розміщення та стійкий попит на відпочинок упродовж усього року.
					</p>
				</div>
			</section>

			<section className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
				<div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]'>
					<article className='rounded-2xl bg-white p-5 shadow-sm sm:p-8'>
						<div className='mb-6 grid gap-3 sm:grid-cols-3'>
							<div className='rounded-xl bg-[#F2FAFC] px-4 py-3'>
								<p className='text-xs font-semibold uppercase tracking-wide text-[#53C4DA]'>Закарпаття 2025</p>
								<p className='mt-1 text-lg font-extrabold text-[#2D333D]'>31 886 000 грн</p>
								<p className='text-xs text-slate-500'>загальний туристичний збір</p>
							</div>
							<div className='rounded-xl bg-[#F2FAFC] px-4 py-3'>
								<p className='text-xs font-semibold uppercase tracking-wide text-[#53C4DA]'>Ріст за рік</p>
								<p className='mt-1 text-lg font-extrabold text-[#2D333D]'>+37,6%</p>
								<p className='text-xs text-slate-500'>порівняно з 2024 роком</p>
							</div>
							<div className='rounded-xl bg-[#F2FAFC] px-4 py-3'>
								<p className='text-xs font-semibold uppercase tracking-wide text-[#53C4DA]'>Полянська громада</p>
								<p className='mt-1 text-lg font-extrabold text-[#2D333D]'>7 000 000 грн</p>
								<p className='text-xs text-slate-500'>туристичний збір за рік</p>
							</div>
						</div>

						<div className='space-y-5 text-sm leading-relaxed text-slate-700 sm:text-base'>
							<p>
								За результатами 2025 року загальна сума туристичного збору на Закарпатті
								становила 31 млн 886 тис. грн., що на 37,6% більше, ніж торік. Ці дані озвучило
								управління туризму і курортів облдержадміністрації. Полянська громада
								Мукачівського району Закарпатської області зібрала 7 мільйонів гривень
								туристичного збору.
							</p>
							<p>
								Ріст надходжень вказує на підвищення зацікавленості цим туристичним центром,
								зокрема завдяки підвищенню якості надання послуг, активному просуванню бренду
								Поляни та наявному кадровому потенціалу фахівців у галузі туризму в громаді.
							</p>
							<p>
								У громаді активно використовують бальнеологічний потенціал, що, без сумніву, є
								туристичним магнітом громади і Закарпаття загалом. Однак, крім мінеральної води,
								в Поляні та навколишніх селах формують туристичні продукти, що забезпечують
								стабільне збільшення місцевого бюджету.
							</p>
							<p>
								Все більше гостей Закарпаття обирають Поляну взимку: тут діє гірськолижна школа
								для новачків на курорті PolianSki, цілими родинами приїжджають на тюбінг, до
								списку популярних SPA-процедур входить купання в чанах. У так зване міжсезоння
								Поляну обирають любителі нешумного відпочинку, ловлі та приготування форелі,
								любителі піших маршрутів та велолюбителі.
							</p>
							<p>
								Під час зустрічі бізнесу з представниками влади у березні 2026 року було
								озвучено, що суб&apos;єктами розміщення Поляни (готелі, оздоровчі заклади, сільські
								садиби) туристам пропонується понад 3000 ліжкомісць, хоча безумовно потенціал
								громади - значно більший.
							</p>
							<p>
								Про це також свідчить поява нових закладів розміщення та робота бізнесу над
								розширенням номерного фонду в громаді. Громада приваблює інвесторів високим
								рівнем заповнення існуючої мережі закладів розміщення навіть у міжсезоння.
							</p>
							<p>
								Літо 2026 року знову стане часом відкриття активних літніх та тематичних таборів,
								ретритів та професійних зустрічей в Поляні. Ті, хто обирає Поляну для відпочинку,
								знайдуть відпочинок для себе та близьких людей.
							</p>
						</div>
					</article>

					<div className='space-y-6'>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/gallery/chan_1.webp'
								alt='Туристичні активності в Поляні'
								fill
								sizes='(min-width: 1024px) 26vw, 92vw'
								className='object-cover'
							/>
						</div>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/entertainment/tybinh-v2-1.webp'
								alt='Тюбінг у Поляні'
								fill
								sizes='(min-width: 1024px) 26vw, 92vw'
								className='object-cover'
							/>
						</div>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/gallery/sayna.webp'
								alt='SPA та відпочинок у Поляні'
								fill
								sizes='(min-width: 1024px) 26vw, 92vw'
								className='object-cover'
							/>
						</div>
					</div>
				</div>
			</section>

			<section className='mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8'>
				<div className='mb-6 text-center'>
					<h2 className='text-3xl font-black tracking-tight text-[#2D333D]'>Останні публікації</h2>
					<p className='mt-2 text-sm text-slate-600 sm:text-base'>
						Корисні поради, репортажі та статті — найцікавіше про відпочинок у Поляні та Закарпатті.
					</p>
				</div>

				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
					{latestPublications.map(item => (
						<Link
							key={item.href}
							href={item.href}
							className='group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#53C4DA]/35 hover:shadow-md hover:ring-[#53C4DA]/20'
						>
							<div className='relative aspect-[16/10] w-full overflow-hidden bg-slate-100'>
								<Image
									src={item.image}
									alt={item.title}
									fill
									sizes='(min-width: 1024px) 22vw, (min-width: 640px) 46vw, 92vw'
									className='object-cover transition-transform duration-300 group-hover:scale-[1.03]'
								/>
							</div>
							<div className='flex flex-1 flex-col p-4'>
								<p className='text-[11px] font-medium text-slate-500'>{item.date}</p>
								<p className='text-[11px] font-semibold uppercase tracking-wide text-[#E06D3C]'>
									{item.tag}
								</p>
								<h3 className='mt-2 text-[15px] font-extrabold leading-snug text-[#2D333D]'>
									{item.title}
								</h3>
								<p className='mt-3 line-clamp-4 text-sm leading-relaxed text-slate-600'>{item.excerpt}</p>
							</div>
						</Link>
					))}
				</div>

				<div className='mt-8 flex justify-center'>
					<button
						type='button'
						className='inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-[#53C4DA] px-6 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-cyan-500 hover:shadow-md active:translate-y-0'
					>
						Переглянути усі публікації
					</button>
				</div>
			</section>
		</div>
	)
}
