import Image from 'next/image'

export default function AboutPage() {
	return (
		<div className='w-full bg-[#F5F6F7]'>
			<section className='relative overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='/images/gallery/golovna-foto-2.jpeg'
						alt='Краєвид Поляни'
						fill
						priority
						sizes='100vw'
						className='object-cover'
					/>
				</div>
				<div className='absolute inset-0 bg-gradient-to-r from-[#1E3D53]/85 via-[#264D67]/70 to-[#294B61]/45' />
				<div className='relative z-10 mx-auto w-full max-w-7xl px-4 py-14 text-white sm:px-6 lg:px-8'>
					<h1 className='max-w-4xl text-3xl font-black leading-tight sm:text-5xl'>Про Polyana.info</h1>
					<p className='mt-4 max-w-3xl text-sm text-white/90 sm:text-lg'>
						Туристично-інформаційний центр, створений для популяризації Поляни як курорту
						сімейного відпочинку та туристичної дестинації №1 на Закарпатті.
					</p>
				</div>
			</section>

			<section className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
				<div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]'>
					<article className='rounded-2xl bg-white p-5 shadow-sm sm:p-8'>
						<div className='space-y-5 text-sm leading-relaxed text-slate-700 sm:text-base'>
							<p>
								Туристично-інформаційний центр <span className='font-semibold text-cyan-700'>Polyana.info</span>{' '}
								створений з метою популяризації Поляни як привабливого курорту та місця
								сімейного відпочинку. На платформі кожен може знайти відповідь на ключове
								питання: <span className='font-semibold text-cyan-700'>"Що робити в Поляні?"</span>
								.
							</p>
							<p>
								Це одне з найпоширеніших запитань, які ставлять гості громади як офлайн, вже
								перебуваючи на відпочинку, так і онлайн, коли лише обирають майбутню поїздку.
								Ви можете обрати проживання, послуги SPA, літній табір для дітей і багато іншого
								всього за декілька натискань на робочі посилання в підготовлених для вас
								розділах сайту.
							</p>
							<p>
								Для вашої зручності на сайті також є посилання на соціальні мережі, де
								відбувається спілкування у звичному форматі. Крім того, ви знайдете номер
								телефону нашого менеджера, який зорієнтує у всіх питаннях, що вас турбують.
							</p>
							<p>
								Ми залюбки відповімо на будь-які ваші запитання, а також рекомендуємо підписатися
								на оновлення у нашому WhatsApp-каналі, аби бути в курсі всіх новин щодо
								відпочинку в Поляні.
							</p>
							<p>
								Наша команда працює над розширенням мережі, тож заклади, які бажають
								співпрацювати, також можуть легко стати учасниками платформи: натисніть у розділі{' '}
								<span className='font-semibold text-cyan-700'>"Наші партнери"</span> кнопку{' '}
								<span className='font-semibold text-cyan-700'>"Додати заклад"</span> або
								зверніться за номером, вказаним на головній сторінці.
							</p>
							<p>
								Ми переконані, що Поляна - туристична дестинація №1 на Закарпатті, тож будемо
								раді познайомити вас із новинками, про які ви раніше не чули. Запрошуємо!
							</p>
						</div>
					</article>

					<div className='space-y-6'>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/gallery/golovna-foto.jpeg'
								alt='Відпочинок у Поляні'
								fill
								sizes='(min-width: 1024px) 26vw, 92vw'
								className='object-cover'
							/>
						</div>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/gallery/kateryna-pop.png'
								alt='Готелі Поляни'
								fill
								sizes='(min-width: 1024px) 26vw, 92vw'
								className='object-cover'
							/>
						</div>
					</div>
				</div>
			</section>

			<section className='mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8'>
				<div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
					<div className='rounded-xl bg-white p-4 shadow-sm'>
						<p className='text-sm font-bold text-[#2D333D]'>Проживання</p>
						<p className='mt-2 text-xs text-slate-600'>Готелі та варіанти відпочинку на будь-який бюджет.</p>
					</div>
					<div className='rounded-xl bg-white p-4 shadow-sm'>
						<p className='text-sm font-bold text-[#2D333D]'>SPA та відновлення</p>
						<p className='mt-2 text-xs text-slate-600'>Чани, масажі, wellness-програми та релакс-процедури.</p>
					</div>
					<div className='rounded-xl bg-white p-4 shadow-sm'>
						<p className='text-sm font-bold text-[#2D333D]'>Табори для дітей</p>
						<p className='mt-2 text-xs text-slate-600'>Літні програми розвитку, активностей і нових знайомств.</p>
					</div>
					<div className='rounded-xl bg-white p-4 shadow-sm'>
						<p className='text-sm font-bold text-[#2D333D]'>Актуальні новини</p>
						<p className='mt-2 text-xs text-slate-600'>Оновлення, події та сезонні пропозиції для гостей Поляни.</p>
					</div>
				</div>
			</section>
		</div>
	)
}
