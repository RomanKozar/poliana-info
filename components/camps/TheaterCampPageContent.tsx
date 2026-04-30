import Link from 'next/link'
import TheaterCampBannerAndGallery from '@/components/camps/TheaterCampBannerAndGallery'
import { camps } from '@/data/home-page'

const theaterCamp = camps.find(c => c.id === 'theater-camp')

const POLIANSKI_CAMP_OFFICIAL_URL = 'https://polianski-camp.vercel.app/'

type ProgramRow = { block: string; points: string[] }

const THEATER_WHAT_AWAITS_TABLE: ProgramRow[] = [
	{
		block: '🎭 Акторська база',
		points: [
			'Вправи на увагу, ритм групи й «режисерський огляд» — як зʼявитися перед глядачем без зайвої напруги 🎬🙌',
			'Спільний мікро-дійство з фінальною етюдною платформою: кожен учасник має місце в сцені — від епізоду до самостійної репліки 🎭',
		],
	},
	{
		block: '🎪 Персонаж і простір',
		points: [
			'Пошук героя: жест, намір слова й стосунки з партнерами на сцені; короткий «паспорт» персонажа в зошиті чи на картці 👤📝',
			'Робота з простором: лабіринт просторів під небом або у залі бази — простір підказує лінії й паузи вашого руху 🏟️✨',
		],
	},
	{
		block: '🗣️ Голос і слово',
		points: [
			'Розігрів голосового апарату, робота над диханням перед читанням сценічного тексту вголос; супровід педагога сценічної групи 📖🎚️',
			'Музика слова без обовʼязкового співу: ритміка рядка, робота навколо фраз — хто любить електропідклад або легкий саунд, пропонуємо простий репертуар із гаджета 🎼',
		],
	},
	{
		block: '🌲 Карпати як місце дихання',
		points: [
			'Прогулянки після блоків режисури або голосового тренування: легені із гірського повітря та легкий маршрут під наглядом дорослих групи 🥾🏔️',
			'Негода або дощ не ламають сценічний блок — етюди переносять у захищені зони бази або в залі таборового корпусу 🌧️🎭',
		],
	},
	{
		block: '💧 Життя на базі Поляни',
		points: [
			'Режими харчування та відпочинку узгоджуються при поселенні; вода «Поляна» з бювету поблизу — для режимних перерв 🚰🍽️',
			'За узгодженням — відвідування басейну партнерів курорту тільки в супроводі дорослих інструкторів і у вікні графіка зміни 🏊‍♂️',
		],
	},
	{
		block: '🌠 Вистава зміни',
		points: [
			'Завершальний етюд або читацький перформанс для своєї дружньої аудиторії зміни — формат обирають разом режисер і діти, без тиску виходити за межі локацій табору 🎭🙏',
			'Вечірні зустрічі біля вогню або теплових ламп: обговорити враження, обмін маленькими «артефактами» памʼяті зміни і фото з друзями табору 🔥📸',
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

export default function TheaterCampPageContent() {
	if (!theaterCamp) {
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
								{theaterCamp.title}
							</h1>
							<p className='mt-1 text-sm leading-snug text-[#53C4DA] sm:text-base'>{theaterCamp.age}</p>
							<div className='mt-2 flex flex-wrap items-center gap-2 sm:gap-3'>
								<span className='inline-flex rounded-full bg-[#F3A169] px-3 py-1 text-xs font-bold tabular-nums text-white sm:text-sm'>
									{theaterCamp.dates}
								</span>
							</div>
							<p className='mt-2 max-w-3xl text-sm leading-snug text-slate-600 sm:text-[0.9375rem]'>{theaterCamp.description}</p>
						</div>
						<div className='relative flex w-full shrink-0 flex-col items-end self-stretch lg:flex-1 lg:justify-center'>
							<span className='inline-flex w-full items-center justify-center rounded-full bg-[#F3A169] px-3 py-1 text-xs font-bold tabular-nums text-white sm:w-auto sm:text-sm lg:absolute lg:right-0 lg:bottom-0 lg:z-[1] lg:w-auto'>
								{theaterCamp.price}
							</span>
						</div>
					</div>
				</div>
			</section>

			<div className='mx-auto max-w-6xl px-4 pt-3 pb-5 sm:px-6 sm:pt-4 lg:px-8 lg:pt-5'>
				<TheaterCampBannerAndGallery bannerSrc={theaterCamp.image} bannerAlt={theaterCamp.title} />

				<section aria-labelledby='theater-what-awaits-heading' className='mt-10 sm:mt-12'>
					<h2
						id='theater-what-awaits-heading'
						className='text-center text-xl font-bold tracking-tight text-[#2D333D] sm:text-2xl'
					>
						✨ Як виглядає театральний заїзд у горах? ✨
					</h2>

					<div className='mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm'>
						<div className='-mx-[1px] overflow-x-auto'>
							<table className='w-full min-w-[20rem] border-collapse text-left md:min-w-0'>
								<caption className='sr-only'>
									Структура зміни: акторська лабораторія, створення образу, голос і текст, робота на природі, побут бази поблизу Поляни й підсумковий показ або читання перед друзями зміни.
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
									{THEATER_WHAT_AWAITS_TABLE.map(({ block, points }, idx) => (
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
				className='animate-wiggle fixed bottom-5 right-4 z-40 inline-flex min-h-11 items-center justify-center rounded-full bg-[#53C4DA] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg ring-1 ring-cyan-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2FAFC8] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#53C4DA] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:px-6 sm:text-sm'
				aria-label='Забронювати табір — зателефонувати'
			>
				Забронювати
			</a>
		</div>
	)
}
