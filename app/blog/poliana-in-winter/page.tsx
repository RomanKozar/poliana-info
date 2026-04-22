import Image from 'next/image'
import Link from 'next/link'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Поляна взимку — лижі, тюбінг і чани',
	description:
		'Зимовий відпочинок у Поляні: лижна школа, тюбінг, гірськолижний курорт і затишні чани. Плануйте зимову поїздку на Закарпаття.',
	pathname: '/blog/poliana-in-winter',
})

export default function PolyanaInWinterPage() {
	return (
		<div className='w-full bg-[#F5F6F7]'>
			<section className='relative overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='/images/gallery/golovna-foto-2.jpeg'
						alt='Поляна взимку'
						fill
						priority
						sizes='100vw'
						className='object-cover'
					/>
				</div>
				<div className='absolute inset-0 bg-gradient-to-r from-[#1E3D53]/85 via-[#264D67]/70 to-[#294B61]/45' />
				<div className='relative z-10 mx-auto w-full max-w-7xl px-4 py-14 text-white sm:px-6 lg:px-8'>
					<p className='inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]'>
						Зимній гід
					</p>
					<h1 className='mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-5xl'>
						Поляна взимку - місце драйву та сили!
					</h1>
					<p className='mt-4 max-w-3xl text-sm text-white/90 sm:text-lg'>
						Лижі, тюбінг, зимова школа, чани та затишний відпочинок для всієї родини у самому
						серці Закарпаття.
					</p>
				</div>
			</section>

			<section className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
				<div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]'>
					<article className='rounded-2xl bg-white p-5 shadow-sm sm:p-8'>
						<div className='space-y-5 text-sm leading-relaxed text-slate-700 sm:text-base'>
							<p>
								Погляд організаторів відпочинку на Поляну як туристичну локацію з круглорічним
								відпочинком стимулює місцеві заклади розміщення та відпочинку розвивати нові
								туристичні продукти й атракції.
							</p>
							<p>
								Понад 12 років у Поляні функціонує гірськолижний витяг на схилі гори у самому
								центрі села. Курорт PolianSki підказує гостям Поляни користувати кожну мить для
								драйву та чудового відпочинку. 100, 300 та 600-метрові траси у курортному селі
								роблять відпочинок для всієї родини незабутнім.
							</p>
							<p>
								Гірськолижна школа - дуже популярна послуга в Поляні. Сюди приїжджають родинами,
								аби стати на лижі та навчитись стійко триматися на різних дистанціях. Для
								комфортного катання організатори зимового відпочинку щоденно дбають про якість
								трас, вирівнюючи та вдосконалюючи їх.
							</p>
							<p>
								Із метою продовжити зимовий відпочинок у Поляні, гірськолижні схили досніжують за
								допомогою спеціальних снігових гармат, тож сезон катання триває довше, ніж
								тримається календарна зима.
							</p>
							<p>
								На тюбінг у Поляну їде велика кількість дітей та дорослих з різних куточків
								регіону. Курорт обирають завдяки логістичній доступності та високій якості послуг.
								В основі зимового відпочинку тут - слідування заходам безпеки та максимально
								комфортне перебування гостей.
							</p>
							<p>
								Для любителів неактивного відпочинку в готелі "Катерина" пропонують чани з
								ароматними карпатськими травами та запашним чаєм. Поціновувачам рибного меню в
								ресторані приготують форель на вогні.
							</p>
							<p>
								Обирати зимовий відпочинок в Поляні стає все популярніше. Про це свідчать
								економічні показники, зокрема зростання туристичного збору та кількості туристів.
								Поява нових інвестиційних проєктів у сфері туризму також вказує на покращення
								інвестиційного клімату та зростання конкуренції, що веде до підвищення рівня
								сервісу у сфері гостинності.
							</p>
							<p>
								Обирайте відпочинок в Поляні в будь-яку пору року!
							</p>
						</div>

						<div className='mt-7 grid gap-3 sm:grid-cols-2'>
							<Link
								href='/entertainment'
								className='inline-flex justify-center rounded-md bg-[#53C4DA] px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2FAFC8] sm:text-sm'
							>
								Зимові активності
							</Link>
							<Link
								href='/accommodation'
								className='inline-flex justify-center rounded-md bg-[#F68F5D] px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E9753E] sm:text-sm'
							>
								Обрати проживання
							</Link>
						</div>
					</article>

					<div className='space-y-6'>
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
								src='/images/spa/maliy-chan.png'
								alt='Карпатські чани взимку'
								fill
								sizes='(min-width: 1024px) 26vw, 92vw'
								className='object-cover'
							/>
						</div>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/accommodation/kateryna-v1.jpg'
								alt='Зимовий відпочинок у готелі'
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
