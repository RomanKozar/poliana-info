import Link from 'next/link'
import TouristCampBannerAndGallery from '@/components/camps/TouristCampBannerAndGallery'
import { camps } from '@/data/home-page'

const touristCamp = camps.find(c => c.id === 'tourist-camp')

const POLIANSKI_CAMP_OFFICIAL_URL = 'https://polianski-camp.vercel.app/'

const ctaLearnMoreClasses =
	'inline-flex w-full items-center justify-center rounded-full bg-[#53C4DA] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2FAFC8] hover:shadow-md sm:w-auto'

type ProgramRow = { block: string; points: string[] }

const TOURIST_WHAT_AWAITS_TABLE: ProgramRow[] = [
	{
		block: '🗺️ Маршрути й координати',
		points: [
			'Щодня — виходи різної довжини: від спокійних прогулянок уздовж стежки здоров’я до сходжень середньої складності поблизу Поляни; маршрут пояснюють інструктори 🗺️🚶‍♂️',
			'Читання профілю висот і позначок на карті (де використовують): група йде узгодженим темпом із ведучим і замикаючим інструктором 👥📍',
		],
	},
	{
		block: '🧭 Просте орієнтування',
		points: [
			'Базові прийоми без гаджетів: знаки на стежці, триангуляція «видно — не видно», орієнтир із компасом на короткій дистанції 🧭🌲',
			'Між ходом — міні-пошуки орієнтирів за описом дорослого, без відриву від правил безпеки групи 🔍',
		],
	},
	{
		block: '🌿 Еко-режим і стежка',
		points: [
			'Етика гірської стежки: залишаємо мінімум сліду, сміття забираємо в рюкзак; рослини спостерігаємо без зриву й зайвого шуму для дикої природи 🌿🙏',
			'Щоденний «еко-лік»: якщо уздовж трапляється сторонній предмет — повідомляємо інструктору для безпечного збору 🧃',
		],
	},
	{
		block: '🥾 Спорядження й безпека',
		points: [
			'Перевірка взуття, рюкзака й запасної води перед виходом; розминка суглобів і пояснюємо симптоми перегріву чи охолодження ⚙️💧',
			'Погані умови: скорочення маршруту або перемикання на закритий тренинг із «класом орієнтування» в залі бази ☔🏠',
		],
	},
	{
		block: '💧 База курорту Поляни',
		points: [
			'Режими харчування та відпочинку погоджують при поселенні; вода «Поляна» з бювету — для пиття під час і після маршрутів 🚰😴',
			'За попередньою домовленістю можливий вихід у басейн партнерів курорту — із дорослими інструкторами лише відповідно до графіку зміни 🏊‍♂️',
		],
	},
	{
		block: '🌄 Підсумки зміни',
		points: [
			'Колаж «маршрутів пам’яті»: кожна дитина додає наліпку/малюночок із улюбленим днем уздовж нашої дорожньої карти зміни 🖼️🛤️',
			'Вечір із фотопрезентацією та побажаннями друзів табору; нагороди за відповідальність у загоні й турботу про спільну безпеку ✨📸',
		],
	},
]

function TableCellBullets({ items }: { items: string[] }) {
	return (
		<ul className='list-outside list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600 marker:text-[#53C4DA]'>
			{items.map((text, i) => (
				<li key={i}>{text}</li>
			))}
		</ul>
	)
}

export default function TouristCampPageContent() {
	if (!touristCamp) {
		return (
			<div className='bg-[#F5F6F7] px-4 py-16 text-center text-slate-600'>
				<p>Дані про цю зміну тимчасово недоступні.</p>
				<Link href='/camps' className='mt-4 inline-block font-semibold text-[#53C4DA] underline-offset-4 hover:underline'>
					До списку таборів
				</Link>
			</div>
		)
	}

	return (
		<div className='bg-[#F5F6F7]'>
			<section className='border-b border-slate-200/80 bg-gradient-to-br from-[#E8F4F8] via-white to-[#F5F6F7] px-4 py-5 sm:px-16 sm:py-6 lg:px-24'>
				<div className='mx-auto max-w-6xl'>
					<div className='flex flex-col gap-4 lg:flex-row lg:items-stretch lg:justify-between lg:gap-8'>
						<div className='min-w-0 flex-1'>
							<p className='text-sm font-medium leading-normal text-slate-500'>
								<Link href='/camps' className='font-semibold text-[#53C4DA] underline-offset-4 hover:text-cyan-600 hover:underline'>
									← Усі табори
								</Link>
							</p>
							<h1 className='mt-1.5 text-3xl font-extrabold leading-tight tracking-tight text-[#2D333D] sm:text-4xl'>
								{touristCamp.title}
							</h1>
							<p className='mt-1 text-sm leading-snug text-[#53C4DA] sm:text-base'>{touristCamp.age}</p>
							<div className='mt-2 flex flex-wrap items-center gap-2 sm:gap-3'>
								<span className='inline-flex rounded-full bg-[#F3A169] px-3 py-1 text-xs font-bold tabular-nums text-white sm:text-sm'>
									{touristCamp.dates}
								</span>
							</div>
							<p className='mt-2 max-w-3xl text-sm leading-snug text-slate-600 sm:text-[0.9375rem]'>{touristCamp.description}</p>
						</div>
						<div className='relative flex w-full shrink-0 flex-col items-end gap-3 self-stretch lg:flex-1 lg:justify-center lg:gap-0'>
							<span className='inline-flex items-center rounded-full bg-[#F3A169] px-3 py-1 text-xs font-bold tabular-nums text-white sm:text-sm lg:relative lg:z-[1]'>
								{touristCamp.price}
							</span>
							<a
								href={POLIANSKI_CAMP_OFFICIAL_URL}
								target='_blank'
								rel='noopener noreferrer'
								className={`${ctaLearnMoreClasses} lg:absolute lg:right-0 lg:bottom-0 lg:z-[1] lg:w-auto`}
							>
								Дізнатися більше
								<span className='sr-only'> (офіційний сайт PolianskiCamp, відкриється у новій вкладці)</span>
							</a>
						</div>
					</div>
				</div>
			</section>

			<div className='mx-auto max-w-6xl px-4 pt-3 pb-10 sm:px-6 sm:pt-4 lg:px-8 lg:pt-5'>
				<TouristCampBannerAndGallery bannerSrc={touristCamp.image} bannerAlt={touristCamp.title} />

				<section aria-labelledby='tourist-what-awaits-heading' className='mt-10 sm:mt-12'>
					<h2
						id='tourist-what-awaits-heading'
						className='text-center text-xl font-bold tracking-tight text-[#2D333D] sm:text-2xl'
					>
						✨ Як улаштована програма туристичного заїзду? ✨
					</h2>

					<div className='mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm'>
						<div className='-mx-[1px] overflow-x-auto'>
							<table className='w-full min-w-[20rem] border-collapse text-left md:min-w-0'>
								<caption className='sr-only'>
									Піший туризм біля Поляни: щоденні виходи в гори, навчання читати карту й орієнтуватися, правила поведінки на стежці, підготовка спорядження, відпочинок на базі курорту та підсумок зміни з командою.
								</caption>
								<thead>
									<tr className='border-b border-slate-200/90 bg-[#EBF8FC]'>
										<th
											scope='col'
											className='px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#2D333D] sm:px-5 sm:text-sm'
										>
											Блок програми
										</th>
										<th
											scope='col'
											className='px-4 py-3 text-xs font-semibold uppercase tracking-wide text-[#2D333D] sm:px-5 sm:text-sm'
										>
											Що чекає дитину
										</th>
									</tr>
								</thead>
								<tbody>
									{TOURIST_WHAT_AWAITS_TABLE.map(({ block, points }, idx) => (
										<tr
											key={block}
											className={
												idx % 2 === 1
													? 'border-b border-slate-100 bg-slate-50/70 last:border-b-0'
													: 'border-b border-slate-100 bg-white last:border-b-0'
											}
										>
											<th
												scope='row'
												className='align-top px-4 py-4 text-[0.8125rem] font-semibold leading-snug text-[#2D333D] sm:min-w-[11rem] sm:max-w-[14rem] sm:px-5 sm:text-sm'
											>
												{block}
											</th>
											<td className='align-top px-4 py-3.5 sm:px-5 sm:py-4'>
												<TableCellBullets items={points} />
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					<div className='mt-8 flex justify-center sm:mt-10'>
						<a
							href={POLIANSKI_CAMP_OFFICIAL_URL}
							target='_blank'
							rel='noopener noreferrer'
							className={`${ctaLearnMoreClasses} sm:w-auto`}
						>
							Дізнатися більше
							<span className='sr-only'> (офіційний сайт PolianskiCamp, відкриється у новій вкладці)</span>
						</a>
					</div>
				</section>
			</div>
		</div>
	)
}
