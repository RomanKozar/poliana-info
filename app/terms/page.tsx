import Link from 'next/link'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Умови використання',
	description:
		'Умови використання POLYANA.INFO: правила доступу до контенту, відповідальність, інтелектуальна власність, посилання на сторонні ресурси та порядок звернень.',
	pathname: '/terms',
})

export default function TermsPage() {
	return (
		<div className='w-full bg-[#F5F6F7]'>
			<section className='border-b border-slate-200 bg-gradient-to-r from-[#1E3D53] to-[#264D67] text-white'>
				<div className='mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16'>
					<p className='text-xs font-semibold uppercase tracking-[0.12em] text-white/70'>Юридична інформація</p>
					<h1 className='mt-3 text-3xl font-black leading-tight sm:text-4xl'>Умови використання</h1>
					<p className='mt-4 max-w-3xl text-sm text-white/90 sm:text-base'>
						Ці Умови визначають правила користування вебсайтом{' '}
						<Link href='/' className='font-semibold text-white underline underline-offset-4 hover:opacity-90'>
							polyana.info
						</Link>{' '}
						(POLYANA.INFO). Використовуючи сайт, ви погоджуєтеся з наведеними нижче положеннями.
					</p>
					<p className='mt-3 text-xs text-white/70'>Останнє оновлення: травень 2026</p>
				</div>
			</section>

			<section className='mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
				<article className='rounded-2xl bg-white p-6 shadow-sm sm:p-10'>
					<div className='space-y-8 text-sm leading-relaxed text-slate-700 sm:text-base'>
						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>1. Про сайт та контент</h2>
							<p className='mt-3'>
								POLYANA.INFO — туристичний портал з інформаційними матеріалами (описи розділів, підбірки,
								поради, контакти, посилання, карта та інші довідкові дані). Контент має{' '}
								<strong>інформаційний характер</strong> і може оновлюватися.
							</p>
						</div>

						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>2. Доступ та правила користування</h2>
							<ul className='mt-3 list-disc space-y-2 pl-5'>
								<li>
									Ви можете безоплатно переглядати сторінки сайту та користуватися функціями, які доступні
									без реєстрації.
								</li>
								<li>
									Забороняється використовувати сайт для незаконних цілей, порушувати роботу ресурсу або
									намагатися отримати несанкціонований доступ до систем і даних.
								</li>
								<li>
									Під час надсилання повідомлень/даних (наприклад, через форму зворотного звʼязку) ви
									підтверджуєте, що маєте право на їх передання та що вони не порушують права третіх осіб.
								</li>
							</ul>
						</div>

						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>3. Посилання на сторонні ресурси</h2>
							<p className='mt-3'>
								Сайт може містити посилання на сторонні вебсайти та сервіси (наприклад, карти, сторінки
								закладів, соціальні мережі). Ми не контролюємо такі ресурси й не несемо відповідальності за
								їхній контент, політики чи доступність. Користування ними відбувається на ваш ризик.
							</p>
						</div>

						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>4. Точність інформації та відповідальність</h2>
							<p className='mt-3'>
								Ми прагнемо підтримувати інформацію актуальною, однак не гарантуємо, що вона завжди є
								вичерпною або безпомилковою (наприклад, графіки роботи, ціни, контакти, сезонність). Перед
								відвідуванням закладів рекомендуємо уточнювати деталі безпосередньо у власників/організаторів.
							</p>
							<p className='mt-3'>
								Команда POLYANA.INFO не несе відповідальності за прямі чи непрямі збитки, що виникли внаслідок
								використання або неможливості використання сайту, включно з діями третіх осіб.
							</p>
						</div>

						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>5. Інтелектуальна власність</h2>
							<p className='mt-3'>
								Тексти, дизайн та структура сайту охороняються законодавством про авторські права. Ви можете
								цитувати матеріали з посиланням на POLYANA.INFO. Забороняється повне копіювання та
								систематичне відтворення контенту без попереднього дозволу правовласника.
							</p>
							<p className='mt-3 text-sm text-slate-600'>
								Логотипи, торговельні марки та матеріали третіх сторін належать їхнім відповідним власникам.
							</p>
						</div>

						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>6. Зворотний звʼязок та скарги</h2>
							<p className='mt-3'>
								Якщо ви помітили неточність, хочете запропонувати правку або маєте запит щодо контенту —
								напишіть нам на сторінці{' '}
								<Link href='/contacts' className='font-semibold text-[#53C4DA] hover:underline'>
									Зворотний звʼязок
								</Link>
								.
							</p>
						</div>

						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>7. Зміни умов</h2>
							<p className='mt-3'>
								Ми можемо оновлювати ці Умови. Актуальна версія завжди розміщена на цій сторінці, а дата
								оновлення вказана вгорі.
							</p>
						</div>

						<div className='rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 sm:text-sm'>
							<p>
								Цей документ є загальним шаблоном умов використання для інформаційного вебресурсу і не є
								індивідуальною юридичною консультацією. За потреби — зверніться до юриста.
							</p>
						</div>
					</div>
				</article>
			</section>
		</div>
	)
}

