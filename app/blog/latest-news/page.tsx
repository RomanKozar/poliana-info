import Image from 'next/image'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Останні новини Поляни та туризму на Закарпатті',
	description:
		'Новини курорту Поляна: розвиток інфраструктури, туристичний збір, інвестиції та тренди відпочинку у 2025–2026 роках.',
	pathname: '/blog/latest-news',
})

export default function LatestNewsPage() {
	return (
		<div className='w-full bg-[#F5F6F7]'>
			<section className='relative overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='/images/gallery/golovna-foto-3.jpg'
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
								src='/images/gallery/chan_1.png'
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
								src='/images/gallery/sayna.png'
								alt='SPA та відпочинок у Поляні'
								fill
								sizes='(min-width: 1024px) 26vw, 92vw'
								className='object-cover'
							/>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
