import Link from 'next/link'
import TouristCampBannerAndGallery, {
	TOURIST_CAMP_1_GALLERY,
	TOURIST_CAMP_2_GALLERY,
} from '@/components/camps/TouristCampBannerAndGallery'
import { camps } from '@/data/home-page'

export type TouristCampId = 'tourist-camp' | 'tourist-camp-2'

const TOURIST_CAMP_MEDIA: Record<
	TouristCampId,
	{
		bannerSrc: string
		galleryStrip: typeof TOURIST_CAMP_1_GALLERY
		bannerImageClassName?: string
	}
> = {
	'tourist-camp': {
		bannerSrc: '/images/kids-camps/camp-4.webp',
		galleryStrip: TOURIST_CAMP_1_GALLERY,
	},
	'tourist-camp-2': {
		bannerSrc: '/images/kids-camps/camp-6/camp-6.webp',
		galleryStrip: TOURIST_CAMP_2_GALLERY,
		bannerImageClassName:
			'object-cover object-center scale-[0.9] transition group-hover:scale-[0.94]',
	},
}

const POLIANSKI_CAMP_OFFICIAL_URL = 'https://polianski-camp.vercel.app/'

type ProgramRow = { block: string; points: string[] }

const TOURIST_WHAT_AWAITS_TABLE: ProgramRow[] = [
	{
		block: '🗺️ Маршрути та рух у групі',
		points: [
			'Щодня - вихід на стежки: від легкої прогулянки по «Стежці здоров’я» до маршрутів середньої складності в околицях Поляни. Маршрут і темп пояснюють інструктори.',
			'На карті розбирають рельєф і позначки; група йде з ведучим і замикаючим - без випередження й самовільних відгалужень.',
		],
	},
	{
		block: '🧭 Орієнтування на стежці',
		points: [
			'Без зайвих гаджетів: дорожні знаки, орієнтири «на око» й короткі вправи з компасом під наглядом дорослих.',
			'Під час ходу - невеликі завдання на пошук точок за підказкою інструктора, з дотриманням правил безпеки групи.',
		],
	},
	{
		block: '🌿 Культура стежки',
		points: [
			'Мінімум сліду на природі: сміття забираємо з собою; рослини й тварин спостерігаємо спокійно, без зриву гілок і зайвого шуму.',
			'Знайдене на трасі - показуємо інструктору, щоб прибрати або обійти безпечно.',
		],
	},
	{
		block: '🥾 Спорядження й безпека',
		points: [
			'Перед виходом - перевірка взуття, рюкзака й запасу води; легка розминка й нагадування про спеку, дощ і переохолодження.',
			'У дощ чи грозу маршрут скорочують або частину занять переносять у приміщення бази - теорія карти й «клас орієнтування».',
		],
	},
	{
		block: '💧 База на курорті',
		points: [
			'Режим харчування й відпочинку пояснюють при заїзді; після маршрутів - вода з бювету «Поляна».',
			'За домовленістю - басейн партнерів курорту лише з інструкторами й у відведений час зміни.',
		],
	},
	{
		block: '🌄 Фінал зміни',
		points: [
			'Спільний колаж «карта спогадів»: кожен додає наліпку чи малюнок про найкращий день на маршруті.',
			'Вечір із фото зміни та побажаннями; відзначають відповідальність у групі й дбайливість до спільної безпеки.',
		],
	},
]

const TOURIST_CAMP_2_WHAT_AWAITS_TABLE: ProgramRow[] = [
	{
		block: '🗺️ Літні маршрути (серпень)',
		points: [
			'Окремі траси для спекотної погоди: більше тіні в лісі, помірні підйоми й зручні паузи на оглядових точках.',
			'Маршрут планують наперед; діти вчаться читати легенду стежки й домовлятися про темп усередині групи.',
		],
	},
	{
		block: '🧭 Карта й компас у поході',
		points: [
			'Практика з паперовою картою та компасом: азимут, рельєф і прості задачі «знайди точку» на знайомій ділянці.',
			'Інструктор пояснює, коли зупинитися, як зв’язатися з групою й чому не йдуть у поодинці.',
		],
	},
	{
		block: '🌿 Дбайливість до природи',
		points: [
			'Правила «залишити стежку чистою»: сміття в рюкзак, не чіпати гнізда й не зривати рідкісні рослини.',
			'Короткі бесіди про тварин і рослини Карпат, які можна побачити саме в серпні.',
		],
	},
	{
		block: '🥾 Готовність до походу',
		points: [
			'Чеклист перед виходом: взуття, кепка, вода, дощовик; нагадування про сонцезахист і питний режим у спеку.',
			'Якщо погода псується - коротший маршрут або заняття в залі бази без втрати програми дня.',
		],
	},
	{
		block: '💧 Відпочинок на базі',
		points: [
			'Після маршруту - відновлення на території курорту; мінеральна вода «Поляна» для поповнення запасів.',
			'За графіком зміни можливий басейн із супроводом інструкторів - лише у погоджені години.',
		],
	},
	{
		block: '🌄 Підсумок другої зміни',
		points: [
			'Командна «карта спогадів» з маршрутами тижня - кожен позначає улюблений день і знахідку на стежці.',
			'Спільне підбиття підсумків: що вдалося в групі, чому важлива безпека й взаємодопомога в горах.',
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

type Props = { campId: TouristCampId }

export default function TouristCampPageContent({ campId }: Props) {
	const touristCamp = camps.find(c => c.id === campId)
	const media = TOURIST_CAMP_MEDIA[campId]
	const programTable =
		campId === 'tourist-camp-2' ? TOURIST_CAMP_2_WHAT_AWAITS_TABLE : TOURIST_WHAT_AWAITS_TABLE
	const programHeading =
		campId === 'tourist-camp-2'
			? '✨ Програма другої зміни: що роблять діти щодня ✨'
			: '✨ Програма заїзду: що роблять діти щодня ✨'
	const programCaption =
		campId === 'tourist-camp-2'
			? 'Друга літня туристична зміна біля Поляни: маршрути в серпні, карта й компас, дбайливість до природи, підготовка до походу, відпочинок на базі та підсумок зміни.'
			: 'Туристична зміна біля Поляни: щоденні маршрути, основи карти й орієнтування, повага до стежки та природи, підготовка спорядження, відпочинок на базі курорту та підсумок зміни.'

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
						<div className='relative flex w-full shrink-0 flex-col items-end self-stretch lg:flex-1 lg:justify-center'>
							<span className='inline-flex w-auto shrink-0 items-center justify-center self-end rounded-full bg-[#F3A169] px-3 py-1 text-xs font-bold tabular-nums text-white sm:text-sm lg:absolute lg:right-0 lg:bottom-0 lg:z-[1]'>
								{touristCamp.price}
							</span>
						</div>
					</div>
				</div>
			</section>

			<div className='mx-auto max-w-6xl px-4 pt-3 pb-5 sm:px-6 sm:pt-4 lg:px-8 lg:pt-5'>
				<TouristCampBannerAndGallery
					key={campId}
					bannerSrc={media.bannerSrc}
					bannerAlt={touristCamp.title}
					galleryStrip={media.galleryStrip}
					bannerImageClassName={media.bannerImageClassName}
					galleryAriaLabel={
						campId === 'tourist-camp-2'
							? 'Фото зі другої зміни туристичного заїзду - натисніть, щоб відкрити й гортати'
							: 'Фото зі зміни туристичного заїзду - натисніть, щоб відкрити й гортати'
					}
				/>

				<section aria-labelledby='tourist-what-awaits-heading' className='mt-10 sm:mt-12'>
					<h2
						id='tourist-what-awaits-heading'
						className='text-center text-xl font-bold tracking-tight text-[#2D333D] sm:text-2xl'
					>
						{programHeading}
					</h2>

					<div className='mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm'>
						<div className='-mx-[1px] overflow-x-auto'>
							<table className='w-full min-w-[20rem] border-collapse text-left md:min-w-0'>
								<caption className='sr-only'>{programCaption}</caption>
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
											Що роблять і вчаться
										</th>
									</tr>
								</thead>
								<tbody>
									{programTable.map(({ block, points }, idx) => (
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
				aria-label='Забронювати табір - зателефонувати'
			>
				Забронювати
			</a>
		</div>
	)
}
