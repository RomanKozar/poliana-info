import Link from 'next/link'
import QuestCampBannerAndGallery from '@/components/camps/QuestCampBannerAndGallery'
import { camps } from '@/data/home-page'

const questCamp = camps.find(c => c.id === 'quest-camp')

const POLIANSKI_CAMP_OFFICIAL_URL = 'https://polianski-camp.vercel.app/'

type ProgramRow = { block: string; points: string[] }

const QUEST_WHAT_AWAITS_TABLE: ProgramRow[] = [
	{
		block: '🎯 Велика історія квесту',
		points: [
			'Одна головна легенда зміни: дітей ділять на команди й ведуть крізь кілька епізодів, щоб наблизити розвʼязання головної таємниці 🗺️🤝',
			'Кожен епізод дає ключ чи підказку до фінального випробування; усі на рівних — кожен учасник має змогу внести частину в спільний успіх ⚙️🏅',
		],
	},
	{
		block: '🧩 Кодові станції й ребуси',
		points: [
			'Короткі зупинки між локаціями: шифри, схеми й логічні задачі там, де це дозволяє лісова стежка чи територія бази 📜🌲',
			'Підказки з обмеженим часом (мʼякий тайминг), щоб тренувати увагу та вміння домовлятися, хто за що відповідає ⏱️📋',
		],
	},
	{
		block: '🥾 Свіже повітря й орієнтування',
		points: [
			'Прогулянки впевненими маршрутами біля Поляни: мапи, дорожні описи групи й дотримання правил дорослого проводу 🧭🏔️',
			'При дощовій погоді — перемикання активностей під навіси таборуючої локації, щоб продовжити квест у комфортному режимі 🌧️',
		],
	},
	{
		block: '🎭 Творчі паузи',
		points: [
			'Короткі заходи між етапами: міні-сценки, імпровізація за простими домовленими правилами — хто любить слово чи образ, пробує голос 📣🎭',
			'Візитівка своєї команди: малюнок або колаж — як артефакт, що живе поруч із текстом звіту після перемоги 🖌️',
		],
	},
	{
		block: '💧 Комфорт курорту',
		points: [
			'Перепочинок біля бювету з мінеральною водою «Поляна»; режим харчування та відпочинку пояснюють при поселенні 🚰😴',
			'За домовленістю зміни можливий вихід у басейн інфраструктури партнерів — лише з дорослими інструкторами й за графіком дня табору 🏊‍♂️',
		],
	},
	{
		block: '🔥 Вечірні традиції',
		points: [
			'Настільні ігри й змагання між командами в затишній зоні; за дозволом локації — вечір біля вогнища, інакше тепле світло ламп замість відкритого полум’я 🔥🎲',
			'Підведення результатів квесту й нагороди за винахідливість, повагу до інших учасників і відданість спільній місії ✨🏆',
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

export default function QuestCampPageContent() {
	if (!questCamp) {
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
		<div className='bg-[#F5F6F7] pb-5'>
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
								{questCamp.title}
							</h1>
							<p className='mt-1 text-sm leading-snug text-[#53C4DA] sm:text-base'>{questCamp.age}</p>
							<div className='mt-2 flex flex-wrap items-center gap-2 sm:gap-3'>
								<span className='inline-flex rounded-full bg-[#F3A169] px-3 py-1 text-xs font-bold tabular-nums text-white sm:text-sm'>
									{questCamp.dates}
								</span>
							</div>
							<p className='mt-2 max-w-3xl text-sm leading-snug text-slate-600 sm:text-[0.9375rem]'>{questCamp.description}</p>
						</div>
						<div className='relative flex w-full shrink-0 flex-col items-end self-stretch lg:flex-1 lg:justify-center'>
							<span className='inline-flex w-full items-center justify-center rounded-full bg-[#F3A169] px-3 py-1 text-xs font-bold tabular-nums text-white sm:w-auto sm:text-sm lg:absolute lg:right-0 lg:bottom-0 lg:z-[1] lg:w-auto'>
								{questCamp.price}
							</span>
						</div>
					</div>
				</div>
			</section>

			<div className='mx-auto max-w-6xl px-4 pt-3 pb-5 sm:px-6 sm:pt-4 lg:px-8 lg:pt-5'>
				<QuestCampBannerAndGallery bannerSrc={questCamp.image} bannerAlt={questCamp.title} />

				<section aria-labelledby='quest-what-awaits-heading' className='mt-10 sm:mt-12'>
					<h2
						id='quest-what-awaits-heading'
						className='text-center text-xl font-bold tracking-tight text-[#2D333D] sm:text-2xl'
					>
						✨ Що включено до програми квестового табору? ✨
					</h2>

					<div className='mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm'>
						<div className='-mx-[1px] overflow-x-auto'>
							<table className='w-full min-w-[20rem] border-collapse text-left md:min-w-0'>
								<caption className='sr-only'>
									Структура зміни: сюжетний квест у командах, станції із загадками, активності просто неба, паузи з творчістю й комфорт бази поблизу Поляни.
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
									{QUEST_WHAT_AWAITS_TABLE.map(({ block, points }, idx) => (
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
				</section>

				<div className='mt-8 flex justify-center sm:mt-10'>
					<a
						href={POLIANSKI_CAMP_OFFICIAL_URL}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-flex w-full items-center justify-center rounded-full bg-[#53C4DA] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#2FAFC8] hover:shadow-md sm:w-auto'
					>
						Дізнатися більше
						<span className='sr-only'> (офіційний сайт PolianskiCamp, відкриється у новій вкладці)</span>
					</a>
				</div>
			</div>
			<a
				href='tel:0502149266'
				className='animate-wiggle fixed bottom-5 left-4 z-40 inline-flex min-h-11 items-center justify-center rounded-full bg-[#53C4DA] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg ring-1 ring-cyan-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2FAFC8] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#53C4DA] focus-visible:ring-offset-2 sm:bottom-6 sm:left-6 sm:px-6 sm:text-sm'
				aria-label='Забронювати табір — зателефонувати'
			>
				Забронювати
			</a>
		</div>
	)
}
