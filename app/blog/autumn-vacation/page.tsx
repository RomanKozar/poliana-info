import Image from 'next/image'
import Link from 'next/link'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Осінній відпочинок у Поляні',
	description:
		'Осінь у Поляні: чани, гастрономія, тихі маршрути та затишні вікенди в Карпатах. Ідеї для романтичної та сімейної поїздки.',
	pathname: '/blog/autumn-vacation',
})

export default function AutumnVacationPage() {
	return (
		<div className='w-full bg-[#F5F6F7]'>
			<section className='relative overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='/images/gallery/golovna-foto-3.webp'
						alt='Осіння Поляна'
						fill
						priority
						sizes='100vw'
						className='object-cover'
					/>
				</div>
				<div className='absolute inset-0 bg-gradient-to-r from-[#1E3D53]/85 via-[#264D67]/70 to-[#294B61]/45' />
				<div className='relative z-10 mx-auto w-full max-w-7xl px-4 py-14 text-white sm:px-6 lg:px-8'>
					<p className='inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]'>
						Осінній гід
					</p>
					<h1 className='mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-5xl'>
						Осінній відпочинок
					</h1>
					<p className='mt-4 max-w-3xl text-sm text-white/90 sm:text-lg'>
						Комфорт і затишок карпатської осені: чани, масажні процедури, гастрономія та
						нескладні маршрути з чудовими краєвидами.
					</p>
				</div>
			</section>

			<section className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
				<div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]'>
					<article className='rounded-2xl bg-white p-5 shadow-sm sm:p-8'>
						<div className='space-y-5 text-sm leading-relaxed text-slate-700 sm:text-base'>
							<p>
								Коли на вулиці перестає бути дуже жарко, а погода змінюється на легку прохолоду і
								перші дощі, природа переодягається в золотисті барви, а період відпусток у
								більшості добігає завершення. Саме тоді Поляна запрошує всіх, кому до вподоби
								комфорт і затишок, спокій, масажні процедури, чани та нескладні походи в гори.
							</p>
							<p>
								Ми раді гостям, які цінують красу карпатської осені та вміють помічати мить у
								моменті змін, яких зазнає природа. Теплий прийом закладів Поляни зі смачною
								кухнею, комфортними номерами, оздоровчими процедурами та високою якістю
								обслуговування не залишить місця для осіннього суму.
							</p>
							<p>
								У Поляні вміють спланувати відпочинок гостей так, аби поруч із активностями був
								час подбати про власне ментальне здоров&apos;я. Обираючи місце, де зупинитися,
								рекомендуємо звернути увагу на розділ{' '}
								<span className='font-semibold text-cyan-700'>"Проживання"</span>, де можна
								ознайомитися із партнерською мережею: залежно від ідеї відпочинку ми пропонуємо
								широкий вибір варіантів від сільських садиб до комфортних готелів та
								санаторно-оздоровчих закладів.
							</p>
							<p>
								Зверніть увагу і на місцеву закарпатську кухню, представлену в ресторанах. Банош з
								бринзою, кремзлики, бограч і навіть свіжозловлена форель, приготована у різних
								варіантах на вогні, не залишать байдужим навіть найвимогливішого критика.
							</p>
							<p>
								Велосипедні маршрути, піші прогулянки до лісу та нескладні походи на вершини
								місцевих гір з чудовими краєвидами восени залишать теплі спогади про перебування
								в Поляні, що без сумніву є туристичною дестинацією №1 на Закарпатті.
							</p>
							<p>
								І що може бути кращим за карпатські чани для осінніх вечорів? Незалежно, чи
								оберете велику компанію, чи захочете спокійного індивідуального відпочинку,
								заклади Поляни пропонують чани на будь-яку кількість. Також на ваш вибір - аромати
								трав, які використовують досвідчені організатори комфортного відпочинку.
							</p>
							<p>
								Що привезти з Поляни? Запитайте в адміністраторів готелів про торт "Поляна" та
								інші цікавинки або відвідайте розділ{' '}
								<span className='font-semibold text-cyan-700'>"Сувенір з Поляни"</span>. І,
								безумовно, завжди чудова ідея - взяти з собою в дорогу кілька пляшок мінеральної
								води "Поляна квасова".
							</p>
							<p>Запрошуємо на відпочинок в Поляну!</p>
						</div>

						<div className='mt-7 grid gap-3 sm:grid-cols-2'>
							<Link
								href='/accommodation'
								className='inline-flex justify-center rounded-md bg-[#53C4DA] px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2FAFC8] sm:text-sm'
							>
								Обрати проживання
							</Link>
							<Link
								href='/spa'
								className='inline-flex justify-center rounded-md bg-[#F68F5D] px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E9753E] sm:text-sm'
							>
								SPA та чани
							</Link>
						</div>
					</article>

					<div className='space-y-6'>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/accommodation/kontinent.webp'
								alt='Осінній відпочинок у горах'
								fill
								sizes='(min-width: 1024px) 26vw, 92vw'
								className='object-cover'
							/>
						</div>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/spa/maliy-chan.png'
								alt='Карпатські чани'
								fill
								sizes='(min-width: 1024px) 26vw, 92vw'
								className='object-cover'
							/>
						</div>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/accommodation/kateryna-v1.webp'
								alt='Затишні готелі Поляни'
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
