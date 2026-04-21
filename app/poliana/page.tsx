import Image from 'next/image'

export default function PolyanaPage() {
	return (
		<div className='bg-[#F5F6F7]'>
			<section className='relative overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='/images/gallery/golovna-foto.jpeg'
						alt='Поляна'
						fill
						priority
						sizes='100vw'
						className='object-cover'
					/>
				</div>
				<div className='absolute inset-0 bg-gradient-to-r from-[#1E3D53]/80 via-[#264D67]/70 to-[#294B61]/45' />
				<div className='relative z-10 mx-auto w-full max-w-7xl px-4 py-14 text-white sm:px-6 lg:px-8'>
					<h1 className='max-w-3xl text-3xl font-black leading-tight sm:text-5xl'>
						Поляна - територія незабутніх туристичних пригод у Карпатах
					</h1>
					<p className='mt-4 max-w-3xl text-sm text-white/90 sm:text-lg'>
						Відпочинок, оздоровлення, активності та культурна спадщина Закарпаття в одному
						місці.
					</p>
				</div>
			</section>

			<section className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
				<div className='rounded-2xl bg-white p-5 shadow-sm sm:p-8'>
					<div className='space-y-5 text-sm leading-relaxed text-slate-700 sm:text-base'>
						<p>
							<span className='font-semibold text-cyan-700'>Поляна</span> - відомий курорт{' '}
							<span className='font-semibold text-cyan-700'>сімейного відпочинку на Закарпатті</span>,
							що розташований у мальовничій місцевості серед лісистих гір. Відома своєю{' '}
							<span className='font-semibold text-cyan-700'>лікувальною водою</span>, Поляна почала
							готувати нові туристичні продукти, які підходять для всієї родини, і зараз вона
							відомa як територія незабутніх туристичних пригод у Карпатах.
						</p>
						<p>
							Відпочинок на лижах та тюбінг у центральній частині Закарпаття обирає щороку все
							більше закарпатців та гостей нашого краю. Якщо ви шукаєте, що подивитись у Поляні,
							почніть з традицій курорту -{' '}
							<span className='font-semibold text-cyan-700'>мінеральних джерел</span>, які роблять
							це місце унікальним.
						</p>
						<p>
							Одне із найяскравіших вражень у Поляні - відвідування джерел мінеральної води,
							таких як <span className='font-semibold text-cyan-700'>"Поляна Квасова"</span> чи{' '}
							<span className='font-semibold text-cyan-700'>"Поляна Купель"</span>. Одне із
							джерел розташоване біля санаторію "Сонячне Закарпаття", відоме своєю історією:
							кажуть, що в 18 столітті його відкрив місцевий пастух.
						</p>
					</div>

					<div className='mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
						<div className='relative h-44 overflow-hidden rounded-xl'>
							<Image
								src='/images/accommodation/kateryna-v1.jpg'
								alt='Готель Катерина'
								fill
								sizes='(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw'
								className='object-cover'
							/>
						</div>
						<div className='relative h-44 overflow-hidden rounded-xl'>
							<Image
								src='/images/spa/maliy-chan.png'
								alt='Чани в Поляні'
								fill
								sizes='(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw'
								className='object-cover'
							/>
						</div>
						<div className='relative h-44 overflow-hidden rounded-xl'>
							<Image
								src='/images/accommodation/kontinent.jpg'
								alt='Готель Континент'
								fill
								sizes='(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw'
								className='object-cover'
							/>
						</div>
						<div className='relative h-44 overflow-hidden rounded-xl'>
							<Image
								src='/images/accommodation/arena.webp'
								alt='Arena Apart-Hotel'
								fill
								sizes='(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw'
								className='object-cover'
							/>
						</div>
					</div>

					<div className='mt-7 space-y-5 text-sm leading-relaxed text-slate-700 sm:text-base'>
						<p>
							Якщо ви фанат{' '}
							<span className='font-semibold text-cyan-700'>екотуризму</span>, обов'язково
							загляньте до менш відомих джерел на околицях. Шлях до них - це міні-похід, де ви
							можете зустріти диких тварин чи рідкісні рослини. Поляна також пропонує піші та
							велосипедні маршрути із застосуванням бугельних підйомників, пристосованих під
							ваш велосипед.
						</p>
						<p>
							<span className='font-semibold text-cyan-700'>Пам'ятки Поляни</span>: церква
							Святого Миколая (XIX століття), етнографічний музей у сусідньому селі, екскурсії
							до руїн середньовічних замків неподалік - Замок Паланок у Мукачеві, палац
							Сент-Міклош у Чинадієві, санаторій Карпати.
						</p>
						<p>
							Поїсти в Поляні - це скуштувати на смак традиції гуцулів.{' '}
							<span className='font-semibold text-cyan-700'>Банош</span>, запечена на вогні{' '}
							<span className='font-semibold text-cyan-700'>форель</span> в готелі "Катерина" та
							свіжі продукти з ферм у місцевих ресторанах не залишать байдужим жодного гурмана.
						</p>
						<p>
							Поляну також обирають для{' '}
							<span className='font-semibold text-cyan-700'>
								дитячих таборів, ретритів, конференц-подій
							</span>
							, бо поруч зі зручними та сучасними конференц-залами свіже гірське повітря та
							спокій дозволяють кожній групі почувати себе затишно і комфортно.
						</p>
					</div>
				</div>
			</section>

			<section className='mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6 lg:px-8'>
				<div className='rounded-2xl bg-white p-5 shadow-sm sm:p-8'>
					<h2 className='text-2xl font-extrabold text-[#2D333D]'>Актуально для гостей Поляни</h2>
					<p className='mt-3 text-sm text-slate-600 sm:text-base'>
						Щоб ваша поїздка до Поляни стала незабутньою, ось кілька практичних порад, заснованих
						на досвіді наших гостей:
					</p>
					<ul className='mt-5 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-base'>
						<li className='rounded-xl bg-[#F7FAFC] p-4'>
							<span className='font-semibold text-cyan-700'>Плануйте відпочинок у будь-яку пору року:</span>{' '}
							літо для походів і таборів, весна для відновлення та цвітіння, осінь для
							велопрогулянок і SPA, зима для лижної школи та тюбінгу.
						</li>
						<li className='rounded-xl bg-[#F7FAFC] p-4'>
							<span className='font-semibold text-cyan-700'>Подорожуйте зручно:</span> автобусом з
							Ужгорода, потягом до Сваляви або власним авто; у Поляні також можна орендувати
							велосипед.
						</li>
						<li className='rounded-xl bg-[#F7FAFC] p-4'>
							<span className='font-semibold text-cyan-700'>Оздоровіться:</span> санаторії та готелі
							Поляни пропонують чани, сауни, бані, масажі та SPA-процедури.
						</li>
						<li className='rounded-xl bg-[#F7FAFC] p-4'>
							<span className='font-semibold text-cyan-700'>Локальна кухня:</span> спробуйте бограч,
							банош та форель - смак Закарпаття, який складно повторити деінде.
						</li>
						<li className='rounded-xl bg-[#F7FAFC] p-4'>
							<span className='font-semibold text-cyan-700'>Екологічно:</span> бережіть природу для
							майбутніх поколінь - забирайте з собою сміття з піших і веломаршрутів.
						</li>
					</ul>
				</div>
			</section>
		</div>
	)
}
