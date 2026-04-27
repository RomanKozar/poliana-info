import Image from 'next/image'
import Link from 'next/link'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Поляна весною — відпочинок і маршрути',
	description:
		'Весняний відпочинок у Поляні: погода, прогулянки, SPA та ідеї для короткої подорожі в Карпати без натовпів.',
	pathname: '/blog/poliana-in-spring',
})

export default function PolyanaInSpringPage() {
	return (
		<div className='w-full bg-[#F5F6F7]'>
			<section className='relative overflow-hidden'>
				<div className='absolute inset-0'>
					<Image
						src='/images/gallery/golovna-foto-2.webp'
						alt='Весняна Поляна'
						fill
						priority
						sizes='100vw'
						className='object-cover'
					/>
				</div>
				<div className='absolute inset-0 bg-gradient-to-r from-[#1E3D53]/85 via-[#264D67]/70 to-[#294B61]/45' />
				<div className='relative z-10 mx-auto w-full max-w-7xl px-4 py-14 text-white sm:px-6 lg:px-8'>
					<p className='inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]'>
						Весняний гід
					</p>
					<h1 className='mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-5xl'>Поляна весною</h1>
					<p className='mt-4 max-w-3xl text-sm text-white/90 sm:text-lg'>
						Ідеї для спокійного та активного відпочинку серед карпатських гір у період
						пробудження природи.
					</p>
				</div>
			</section>

			<section className='mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
				<div className='grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]'>
					<article className='rounded-2xl bg-white p-5 shadow-sm sm:p-8'>
						<div className='space-y-5 text-sm leading-relaxed text-slate-700 sm:text-base'>
							<p>
								Обираючи весняний відпочинок у Поляні, наші гості обирають спокій і затишок
								карпатських гір, період пробудження дерев, прогулянки пішохідними маршрутами та
								відпочинок на велосипедах.
							</p>
							<p>
								Ми рекомендуємо готель <span className='font-semibold text-cyan-700'>"Катерина"</span>{' '}
								для комплексного відпочинку як невеликими компаніями, так і гостям, що обирають
								індивідуальний формат. Тут ви можете обрати комфортний номер із видом на
								гірськолижний курорт, що перетворюється із активного зимового схилу на центр
								активного відпочинку для дітей та всієї родини.
							</p>
							<p>
								Також із вікна відкривається вид на ставок з фореллю, яку за вашим бажанням можуть
								приготувати в ресторані готелю. А ще прохолодні весняні вечори стануть більш
								комфортними з відвідуванням чанів, які на території готелю готують із використанням
								карпатських трав.
							</p>
							<p>
								Захід сонця в Поляні найкраще спостерігати на спеціальній терасі, облаштованій на
								курорті PolianSki. Із запашним чаєм або ароматною кавою у колі рідних це
								споглядання стає не лише романтичною подією, але й часом для нових ідей у
								творчості та професійному житті.
							</p>
							<p>
								Закарпаття обирають у період цвітіння квіткових, тож якщо ви шукатимете сакури,
								в Поляні вони також є. Звідси зручно їхати на Долину нарцисів у травні. Наші гості
								часто обирають поїздки на озеро Синевир та в Колочаву, аби побачити, як на
								території музею <span className='font-semibold text-cyan-700'>"Старе село"</span>{' '}
								квітнуть крокуси.
							</p>
							<p>
								Санаторії Поляни пропонують мінеральну воду як ключовий бальнеологічний ресурс
								громади. Поруч із процедурами, які розписують в оздоровчих закладах, приємністю
								стануть прогулянки доглянутими стежками і маршрутами, що їх пропонують заклади
								розміщення.
							</p>
							<p>
								Перейдіть у розділ <span className='font-semibold text-cyan-700'>"Проживання"</span>{' '}
								та визначтеся з відпочинком в Поляні, а ми допоможемо з бронюванням на зручну для
								вас дату. Приємного перебування!
							</p>
						</div>

						<div className='mt-7 rounded-xl bg-[#F2FAFC] p-4'>
							<p className='text-sm font-semibold text-[#2D333D]'>Рекомендуємо для весни:</p>
							<p className='mt-2 text-xs text-slate-600 sm:text-sm'>
								піші маршрути, велопрогулянки, чани, форель, тераса PolianSki та оздоровчі
								процедури в санаторіях.
							</p>
							<Link
								href='/accommodation'
								className='mt-3 inline-flex rounded-md bg-[#53C4DA] px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#2FAFC8] sm:text-sm'
							>
								Перейти до проживання
							</Link>
						</div>
					</article>

					<div className='space-y-6'>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/gallery/kateryna-pop.webp'
								alt='Весняний відпочинок у готелі'
								fill
								sizes='(min-width: 1024px) 26vw, 92vw'
								className='object-cover'
							/>
						</div>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/spa/maliy-chan.png'
								alt='Чани у Поляні'
								fill
								sizes='(min-width: 1024px) 26vw, 92vw'
								className='object-cover'
							/>
						</div>
						<div className='relative h-56 overflow-hidden rounded-2xl shadow-sm sm:h-64 lg:h-56'>
							<Image
								src='/images/entertainment/tybinh-v2-2.webp'
								alt='Активності в Поляні'
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
