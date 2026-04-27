import Image from 'next/image'
import Link from 'next/link'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Літній відпочинок у Поляні',
	description:
		'Літо в Поляні: табори, SPA, тюбінг, вело та сімейний відпочинок. Поради, що взяти з собою й куди поїхати на Закарпатті.',
	pathname: '/blog/summer-vacation',
})

export default function SummerVacationPage() {
	return (
		<div className='w-full bg-[#F5F6F7]'>
			<section className='relative overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='/images/gallery/golovna-foto.webp'
						alt='Літній відпочинок у Поляні'
						fill
						priority
						sizes='100vw'
						className='object-cover'
					/>
				</div>
				<div className='absolute inset-0 bg-gradient-to-r from-[#1E3D53]/85 via-[#264D67]/70 to-[#294B61]/45' />
				<div className='relative z-10 mx-auto w-full max-w-7xl px-4 py-14 text-white sm:px-6 lg:px-8'>
					<p className='inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]'>
						Літній гід
					</p>
					<h1 className='mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-5xl'>
						Літній відпочинок у Поляні
					</h1>
					<p className='mt-4 max-w-3xl text-sm text-white/90 sm:text-lg'>
						Ідеї активного та сімейного відпочинку: табори, SPA, тюбінг, веломаршрути та
						пішохідні прогулянки з панорамами Карпат.
					</p>
				</div>
			</section>

			<section className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
				<div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]'>
					<article className='rounded-2xl bg-white p-5 shadow-sm sm:p-8'>
						<div className='space-y-5 text-sm leading-relaxed text-slate-700 sm:text-base'>
							<p>
								Обираючи відпочинок у Поляні влітку, ви можете визначитися із типом відпочинку та
								обрати для себе активності, які зроблять цей відпочинок максимально корисним.
							</p>
							<p>
								Поляна стає місцем для таборів відпочинку як дуже зручна з логістичної точки зору
								громада. Окрім того, заклади дитячого оздоровлення приймають групи протягом всього
								сезону літніх канікул з різних куточків області та різних вікових груп. Дізнатися
								про можливості відпочинку влітку для ваших діток ви можете в розділі{' '}
								<span className='font-semibold text-cyan-700'>"Табори відпочинку"</span>.
							</p>
							<p>
								Окрім того, в готелі <span className='font-semibold text-cyan-700'>"Катерина"</span>{' '}
								вже готуються до облаштування літніх атракціонів для дітей. Дорослі ж обирають
								SPA-зону з басейном із завжди комфортною температурою води. А для любителів гарячої
								води тут пропонують чани з карпатськими травами та баню.
							</p>
							<p>
								Якщо ви не пробували користуватися гірськолижним витягом влітку, то ми радимо
								обирати відпочинок у Поляні також і для катання на велосипедах. Після відвідування
								пункту прокату велосипедів та інструктажу, нагору вас підніматиме витяг, а вниз ви
								зможете з&apos;їхати нескладним, облаштованим для сімейного відпочинку туристичним
								маршрутом.
							</p>
							<p>
								На схилі гірськолижного курорту PolianSki для вас облаштований літній тюбінг, тож
								не прогавте можливість нагадати собі драйвовість моменту, а професійна команда
								подбає про комфорт і безпеку вашого відпочинку на схилі.
							</p>
							<p>
								Якщо ви обираєте літній відпочинок для пішохідних походів, то гіди Поляни
								проведуть вас нескладними маршрутами, а атракціони, оглядова вежа та літня тераса
								із чудовим видом на захід сонця на території курорту PolianSki доповнять ваші
								враження від відпочинку.
							</p>
							<p>
								Загляньте в розділ <span className='font-semibold text-cyan-700'>"Популярні категорії"</span>{' '}
								та доповніть незабутніми враженнями власний відпочинок або зверніться до нас, а ми
								допоможемо сформувати для вас цікаву програму. Приємного відпочинку в Поляні!
							</p>
						</div>

						<div className='mt-7 grid gap-3 sm:grid-cols-2'>
							<Link
								href='/kids-camps'
								className='inline-flex justify-center rounded-md bg-[#53C4DA] px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2FAFC8] sm:text-sm'
							>
								Табори відпочинку
							</Link>
							<Link
								href='/entertainment'
								className='inline-flex justify-center rounded-md bg-[#F68F5D] px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E9753E] sm:text-sm'
							>
								Літні активності
							</Link>
						</div>
					</article>

					<div className='space-y-6'>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/kids-camps/camp-2.webp'
								alt='Літні дитячі табори'
								fill
								sizes='(min-width: 1024px) 26vw, 92vw'
								className='object-cover'
							/>
						</div>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/spa/masasch.png'
								alt='SPA та відпочинок у Поляні'
								fill
								sizes='(min-width: 1024px) 26vw, 92vw'
								className='object-cover'
							/>
						</div>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/entertainment/tybinh-v2-3.webp'
								alt='Літній тюбінг у Поляні'
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
