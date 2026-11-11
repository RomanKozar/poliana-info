import Link from 'next/link'
import BinotelBookButton from '@/components/shared/BinotelBookButton'
import PolianskiCampBannerAndGallery from '@/components/camps/PolianskiCampBannerAndGallery'
import type { CampCardItem } from '@/data/home-page'

const POLIANSKI_CAMP_OFFICIAL_URL = 'https://polianski-camp.vercel.app/'

type ProgramRow = { block: string; points: string[] }

const WHAT_AWAITS_TABLE: ProgramRow[] = [
	{
		block: '⛷️ Катання',
		points: [
			'П’ять ранків з лижними інструкторами: щодня дві години навчання і додаткове катання протягом дня 🎿❄️',
			'У середньому щонайменше 4 години на лижах на день, близько 24 годин за шість днів. Хто має сили, може кататися довше ⏱️🏔️',
			'Після ранкового заняття діти лишаються на схилі з дорослими виховниками, які самі впевнено катаються 🏂👨‍🏫',
			'Безлімітний скіпас на підйомник і спорядження входять у вартість 🎟️🎿',
		],
	},
	{
		block: '🎯 Навчання',
		points: [
			'Групи збирають за рівнем: і для тих, хто вперше стає на лижі, і для дітей, які вже катаються 🟢🎿',
			'Початківці вчаться стійки, падіння і підйому, контролю швидкості та впевненого руху схилом ⛷️📈',
			'Досвідчені отримують окремі завдання: техніка, робота над помилками, нові навички 🏆',
			'Після програми рекомендуємо для дитячого відпочинку зелені траси. Катання має приносити задоволення, а не бути способом довести сміливість 💚😊',
		],
	},
	{
		block: '🫂 Супровід',
		points: [
			'До 20 дітей у заїзді. На групу - 4 лижні інструктори і 4 виховники 👥🎿',
			'Дорослі супроводжують на схилі, стежать за пересуванням і допомагають у побуті 👀🤝',
			'Гірськолижний спорт має ризик травм. Повну їх відсутність не обіцяємо: ризики зменшуємо навчанням і постійним наглядом ⛑️',
		],
	},
	{
		block: '🏔️ Схили і спорядження',
		points: [
			'Для навчання є гірки 100 і 300 метрів з бугельними підйомниками 🚠❄️',
			'Дітям видають лижі, черевики, палки і шолом за розміром 🎿🥾⛑️',
		],
	},
	{
		block: '🏨 Проживання і їжа',
		points: [
			'Готель «Катерина», хостел на третьому поверсі 🛏️',
			'Сніданок, обід і вечеря в ресторані, плюс два повноцінні перекуси 🍳🍽️🍎',
		],
	},
	{
		block: '🎉 Після схилу',
		points: [
			'Басейн, чани і SPA, тюбінг, командні ігри, акторські тренажі 🏊🔥🎭',
			'Настільні ігри, вечірки, дискотеки, майстер-класи і нові знайомства 🎲🪩🤝',
		],
	},
]

function TableCellBullets({ items }: { items: string[] }) {
	return (
		<ul className='list-outside list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-600 marker:text-[#53C4DA]'>
			{items.map(text => (
				<li key={text}>{text}</li>
			))}
		</ul>
	)
}

export default function WinterCampPageContent({ camp }: { camp: CampCardItem }) {
	const strip = (camp.gallery ?? [camp.image]).slice(1).map((src, index) => ({
		id: `${camp.id}-g${index + 2}`,
		src,
		alt: `${camp.title}, фото ${index + 2}`,
	}))

	return (
		<div className='bg-[#F5F6F7] pb-5'>
			<section className='border-b border-slate-200/80 bg-gradient-to-br from-[#E8F4F8] via-white to-[#F5F6F7] px-4 py-5 sm:px-16 sm:py-6 lg:px-24'>
				<div className='mx-auto max-w-6xl'>
					<div className='flex flex-col gap-4 lg:flex-row lg:items-stretch lg:justify-between lg:gap-8'>
						<div className='min-w-0 flex-1'>
							<p className='text-sm font-medium leading-normal text-slate-500'>
								<Link
									href='/camps'
									className='font-semibold text-[#53C4DA] underline-offset-4 hover:text-cyan-600 hover:underline'
								>
									← Усі табори
								</Link>
							</p>
							<h1 className='mt-1.5 text-3xl font-extrabold leading-tight tracking-tight text-[#2D333D] sm:text-4xl'>
								{camp.title}
							</h1>
							<p className='mt-1 text-sm leading-snug text-[#53C4DA] sm:text-base'>{camp.age}</p>
							<div className='mt-2 flex flex-wrap items-center gap-2 sm:gap-3'>
								<span className='inline-flex rounded-full bg-[var(--brand-cta-promo)] px-3 py-1 text-xs font-bold tabular-nums text-white sm:text-sm'>
									{camp.dates}
								</span>
								{camp.note ? (
									<span className='text-xs font-semibold text-slate-500 sm:text-sm'>{camp.note}</span>
								) : null}
							</div>
							<p className='mt-2 max-w-3xl text-sm leading-snug text-slate-600 sm:text-[0.9375rem]'>
								{camp.description}
							</p>
						</div>
						<div className='relative flex w-full shrink-0 flex-col items-end self-stretch lg:flex-1 lg:justify-center'>
							<span className='inline-flex w-auto shrink-0 items-center justify-center self-end rounded-full bg-[var(--brand-cta-promo)] px-3 py-1 text-xs font-bold tabular-nums text-white sm:text-sm lg:absolute lg:right-0 lg:bottom-0 lg:z-[1]'>
								{camp.price}
							</span>
						</div>
					</div>
				</div>
			</section>

			<div className='mx-auto max-w-6xl px-4 pt-3 pb-5 sm:px-6 sm:pt-4 lg:px-8 lg:pt-5'>
				<PolianskiCampBannerAndGallery
					bannerSrc={camp.image}
					bannerAlt={camp.title}
					strip={strip}
					lightboxTitle={`${camp.title} - фото зміни`}
				/>

				<section aria-labelledby='winter-what-awaits-heading' className='mt-10 sm:mt-12'>
					<h2
						id='winter-what-awaits-heading'
						className='text-center text-xl font-bold tracking-tight text-[#2D333D] sm:text-2xl'
					>
						✨ Що чекає на дітей у зимовому заїзді? ✨
					</h2>
					<p className='mx-auto mt-3 max-w-3xl text-center text-sm leading-relaxed text-slate-600'>
						За шість днів дитина отримує близько 24 годин на схилі, п’ять ранків професійного навчання і
						можливість кататися додатково протягом дня ⛷️❄️
					</p>

					<div className='mt-6 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm'>
						<div className='-mx-[1px] overflow-x-auto'>
							<table className='w-full min-w-[20rem] border-collapse text-left md:min-w-0'>
								<caption className='sr-only'>Програма зимового лижного заїзду PolianSki CAMP.</caption>
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
									{WHAT_AWAITS_TABLE.map(({ block, points }, idx) => (
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
						<span className='sr-only'> (офіційний сайт PolianSki CAMP, відкриється у новій вкладці)</span>
					</a>
				</div>
			</div>
			<BinotelBookButton
				description={`Бронювання табору: ${camp.title}`}
				className='animate-wiggle fixed bottom-5 left-1/2 z-40 -translate-x-1/2 inline-flex min-h-11 items-center justify-center rounded-full bg-[#53C4DA] px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg ring-1 ring-cyan-900/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2FAFC8] hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#53C4DA] focus-visible:ring-offset-2 sm:bottom-6 sm:left-6 sm:translate-x-0 sm:px-6 sm:text-sm'
				ariaLabel={`Забронювати табір: ${camp.title}`}
			>
				Забронювати
			</BinotelBookButton>
		</div>
	)
}
