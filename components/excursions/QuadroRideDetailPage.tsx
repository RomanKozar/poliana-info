import type { IconType } from 'react-icons'
import {
	FaChalkboardTeacher,
	FaClipboardList,
	FaHardHat,
	FaMapMarkerAlt,
	FaMotorcycle,
	FaRoute,
	FaUserTie,
} from 'react-icons/fa'
import { quadroRideHeroImage } from '@/data/quadro-ride-page'
import {
	QuadroRideAtvGalleryStrip,
	QuadroRideGalleryProvider,
	QuadroRideHeroGalleryImage,
} from '@/components/excursions/QuadroRideAtvGallery'
import { QuadroRideRouteMap } from '@/components/excursions/QuadroRideRouteMap'

const WHATS_INCLUDED: { icon: IconType; title: string; text: string }[] = [
	{
		icon: FaChalkboardTeacher,
		title: 'Інструктаж',
		text: 'Коротке навчання керму та правилам безпеки перед стартом.',
	},
	{
		icon: FaHardHat,
		title: 'Захист і техніка',
		text: 'Шоломи та необхідне спорядження на час поїздки.',
	},
	{
		icon: FaUserTie,
		title: 'Гід поруч',
		text: 'Супровід на маршруті та підказки для комфортного катання.',
	},
	{
		icon: FaRoute,
		title: 'Маршрути на вибір',
		text: 'Від короткого знайомства до довгої «адреналінової» поїздки.',
	},
	{
		icon: FaMotorcycle,
		title: 'Позашляховий драйв',
		text: 'Стежки, ліси та панорами без асфальту в околицях Поляни.',
	},
	{
		icon: FaClipboardList,
		title: 'Бронювання',
		text: 'Уточнюйте вік, умови та час — запис обов’язковий.',
	},
]

const BROCHURE_RULES = [
	'Кожен учасник проходить обов’язковий інструктаж перед стартом.',
	'Шолом і захисне спорядження — протягом усього маршруту.',
	'Рух лише за маршрутом і за рекомендаціями гіда.',
	'Керування в стані алкогольного чи наркотичного сп’яніння суворо заборонено.',
	'Тримайте безпечну швидкість — максимум задоволення без зайвого ризику.',
	'Шануйте природу Карпат: не смітіть і не псуйте довкілля.',
] as const

const BROCHURE_CONDITIONS = [
	'Вікові обмеження та умови — уточнюйте під час бронювання.',
	'Документ, що посвідчує особу, обов’язковий.',
	'Попереднє бронювання обов’язкове.',
] as const

const BROCHURE_TIPS = [
	'Зручний одяг і закрите взуття.',
	'Вода та мінімум речей у рюкзак.',
	'Фото й відео на маршруті вітаються.',
] as const

export default function QuadroRideDetailPage() {
	return (
		<QuadroRideGalleryProvider>
			<div className='flex min-h-0 w-full flex-col bg-[#F5F6F7] pb-3 sm:pb-12'>
				<section className='border-b border-slate-200/80 bg-white px-4 py-8 sm:px-16 lg:py-12 lg:px-24'>
					<div className='grid items-start gap-8 lg:grid-cols-2 lg:gap-14'>
						<div className='max-w-xl lg:max-w-none'>
							<p className='text-sm font-medium uppercase tracking-wide text-[#53C4DA]'>Квадроцикли</p>
							<h1 className='mt-2 text-3xl font-bold text-[#2D333D] sm:text-4xl'>
								Quadro Ride у Карпатах
							</h1>
							<p className='mt-3 flex items-start gap-2 text-slate-600'>
								<FaMapMarkerAlt className='mt-1 size-4 shrink-0 text-[#53C4DA]' aria-hidden />
								<span>Старт біля курортної зони Поляни, Закарпатська обл.</span>
							</p>
							<p className='mt-4 leading-relaxed text-slate-600'>
								Без асфальту: гірські стежки, ліси та панорами. Інструктаж, шоломи й супровід гіда —
								обирайте рівень і вирушайте разом із Quadro Ride.
							</p>

							<div className='my-6 h-px max-w-md bg-gradient-to-r from-[#53C4DA]/35 via-slate-200 to-transparent' />

							<h2 className='text-xl font-bold text-[#2D333D] sm:text-2xl'>
								Вітаємо у світі позашляхових пригод
							</h2>
							<p className='mt-4 leading-relaxed text-slate-600'>
								Ніякого асфальту — лише гірські маршрути, краєвиди й драйв. Обирайте складність, сідайте
								за кермо — і вперед. Відкрийте свободу серед Карпат.
							</p>
							<p className='mt-4 font-medium leading-relaxed text-[#2D333D]'>
								Quadro Ride — це про свободу руху та емоції, які залишаються з вами назавжди.
							</p>
							<ul className='mt-6 list-disc space-y-2.5 pl-5 text-slate-600'>
								<li>
									Захопливі маршрути: стежки, ліси та панорами, куди не доїде звичайний транспорт.
								</li>
								<li>
									Навчимо, порадимо, проведемо інструктаж і супроводжуватимемо на маршруті — максимально
									просто й безпечно.
								</li>
								<li>Нові враження та маршрути, які перетворюються на яскраві спогади.</li>
							</ul>
						</div>

						<QuadroRideHeroGalleryImage
							src={quadroRideHeroImage}
							alt='Квадроцикли Quadro Ride в Карпатах біля Поляни'
							priority
							sizes='(max-width: 1024px) 100vw, 50vw'
						/>
					</div>
				</section>

				<section
					className='border-t border-slate-200/80 bg-[#EEF0F2] px-4 py-8 sm:px-16 lg:px-24'
					aria-labelledby='quadro-atv-gallery-heading'
				>
					<h2 id='quadro-atv-gallery-heading' className='text-xl font-bold text-[#2D333D] sm:text-2xl'>
						Фото з поїздок
					</h2>
					<p className='mt-2 max-w-3xl text-sm text-slate-600'>
						Кадри з маршрутів і гірських краєвидів біля Поляни — та сама атмосфера, що чекає на стежках.
					</p>
					<div className='mt-6'>
						<QuadroRideAtvGalleryStrip />
					</div>
				</section>

				<section className='border-t border-slate-200/80 bg-[#F5F6F7] px-4 py-10 sm:px-16 lg:px-24'>
					<h2 className='text-2xl font-bold text-[#2D333D]'>Що зазвичай входить</h2>
					<p className='mt-2 max-w-3xl text-sm text-slate-600'>
						Деталі та ціну уточнюйте при бронюванні — набір може залежати від обраного маршруту.
					</p>
					<div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
						{WHATS_INCLUDED.map(({ icon: Icon, title, text }) => (
							<div
								key={title}
								className='flex gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm'
							>
								<span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#53C4DA]/12 text-[#53C4DA]'>
									<Icon className='size-5' aria-hidden />
								</span>
								<div>
									<h3 className='font-semibold text-[#2D333D]'>{title}</h3>
									<p className='mt-1 text-sm leading-relaxed text-slate-600'>{text}</p>
								</div>
							</div>
						))}
					</div>
				</section>

				<section className='border-t border-slate-200/80 bg-[#F5F6F7] px-4 py-10 sm:px-16 lg:px-24'>
					<div className='mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-800/80 bg-[#141719] shadow-xl ring-1 ring-white/5'>
						<div className='h-1.5 bg-gradient-to-r from-[#b8cc2a] via-[#d4e84a] to-[#9fb820]' aria-hidden />
						<div className='px-5 py-8 sm:px-10 sm:py-10'>
							<p className='text-xs font-semibold uppercase tracking-[0.2em] text-[#c8d84a]'>
								Quadro Ride
							</p>
							<h2 className='mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl'>
								Для безпечної та яскравої пригоди
							</h2>
							<p className='mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base'>
								Усе найважливіше з наших брошур — коротко, наочно й без зайвих зображень. Дотримуйтесь
								правил, щоб драйв залишив лише найкращі спогади.
							</p>

							<h3 className='mt-10 text-sm font-bold uppercase tracking-wide text-[#c8d84a]'>
								Основні правила
							</h3>
							<div className='mt-4 grid gap-3 sm:grid-cols-2'>
								{BROCHURE_RULES.map(text => (
									<div
										key={text}
										className='flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm'
									>
										<span
											className='mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d4e84a] shadow-[0_0_12px_rgba(212,232,74,0.5)]'
											aria-hidden
										/>
										<p className='text-sm leading-relaxed text-white/88'>{text}</p>
									</div>
								))}
							</div>

							<div className='mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8'>
								<div className='rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6'>
									<h3 className='text-sm font-bold uppercase tracking-wide text-[#c8d84a]'>
										Умови участі
									</h3>
									<ul className='mt-4 space-y-3'>
										{BROCHURE_CONDITIONS.map(line => (
											<li key={line} className='flex gap-3 text-sm leading-relaxed text-white/80'>
												<span
													className='mt-1.5 h-1 w-1 shrink-0 rounded-sm bg-[#d4e84a]/90'
													aria-hidden
												/>
												<span>{line}</span>
											</li>
										))}
									</ul>
								</div>
								<div className='rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6'>
									<h3 className='text-sm font-bold uppercase tracking-wide text-[#c8d84a]'>Поради</h3>
									<ul className='mt-4 space-y-3'>
										{BROCHURE_TIPS.map(line => (
											<li key={line} className='flex gap-2 text-sm leading-relaxed text-white/80'>
												<span className='text-[#d4e84a]' aria-hidden>
													→
												</span>
												<span>{line}</span>
											</li>
										))}
									</ul>
								</div>
							</div>

							<blockquote className='relative mt-10 border-l-4 border-[#d4e84a] bg-white/[0.03] py-4 pl-5 pr-4 text-base font-medium leading-snug text-white sm:pl-6 sm:text-lg'>
								Безпека — основа справжнього драйву та незабутніх вражень.
							</blockquote>
						</div>
					</div>
				</section>

				<section className='border-t border-slate-200/80 bg-white px-4 py-10 sm:px-16 lg:px-24'>
					<h2 className='text-2xl font-bold text-[#2D333D]'>Оберіть свій маршрут</h2>
					<p className='mt-2 max-w-3xl text-slate-600'>
						Чотири готові формати — від короткого знайомства до довгої «адреналінової» поїздки.
					</p>
					<div className='mt-8 grid gap-5 sm:grid-cols-2'>
						<article className='rounded-2xl border border-slate-200 bg-[#F5F6F7] p-5 shadow-sm'>
							<h3 className='text-lg font-bold text-[#2D333D]'>Легкий старт</h3>
							<p className='mt-1 text-sm font-semibold text-[#53C4DA]'>12–15 хв</p>
							<p className='mt-3 text-sm leading-relaxed text-slate-600'>
								Підготовлена траса на території — ідеально для першого катання. Підходить новачкам, жінкам і
								дітям.
							</p>
						</article>
						<article className='rounded-2xl border border-slate-200 bg-[#F5F6F7] p-5 shadow-sm'>
							<h3 className='text-lg font-bold text-[#2D333D]'>Релакс</h3>
							<p className='mt-1 text-sm font-semibold text-[#53C4DA]'>1 година</p>
							<p className='mt-3 text-sm leading-relaxed text-slate-600'>
								Повільний маршрут мальовничими стежками. Ідеально для першого знайомства з квадроциклом.
							</p>
						</article>
						<article className='rounded-2xl border border-slate-200 bg-[#F5F6F7] p-5 shadow-sm'>
							<h3 className='text-lg font-bold text-[#2D333D]'>Виклик</h3>
							<p className='mt-1 text-sm font-semibold text-[#53C4DA]'>2 години</p>
							<p className='mt-3 text-sm leading-relaxed text-slate-600'>
								Динамічний квадрорайд із поворотами, підйомами та швидкістю. Баланс емоцій і комфорту.
							</p>
						</article>
						<article className='rounded-2xl border border-slate-200 bg-[#F5F6F7] p-5 shadow-sm'>
							<h3 className='text-lg font-bold text-[#2D333D]'>Адреналін</h3>
							<p className='mt-1 text-sm font-semibold text-[#53C4DA]'>3 години</p>
							<p className='mt-3 text-sm leading-relaxed text-slate-600'>
								Справжній екстрим: складні ділянки, бруд та перепади висот.
							</p>
						</article>
					</div>
				</section>

				<section className='border-t border-slate-200/80 bg-[#F5F6F7] px-4 pt-8 pb-2 sm:px-16 sm:py-10 lg:px-24'>
					<QuadroRideRouteMap />
				</section>
			</div>
		</QuadroRideGalleryProvider>
	)
}
