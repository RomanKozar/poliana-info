import Link from 'next/link'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Політика конфіденційності',
	description:
		'Політика конфіденційності POLYANA.INFO: обробка персональних даних, файли cookie, аналітика відвідувань та способи звʼязку щодо ваших прав.',
	pathname: '/privacy',
})

export default function PrivacyPage() {
	return (
		<div className='w-full bg-[#F5F6F7]'>
			<section className='border-b border-slate-200 bg-gradient-to-r from-[#1E3D53] to-[#264D67] text-white'>
				<div className='mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16'>
					<p className='text-xs font-semibold uppercase tracking-[0.12em] text-white/70'>Юридична інформація</p>
					<h1 className='mt-3 text-3xl font-black leading-tight sm:text-4xl'>Політика конфіденційності</h1>
					<p className='mt-4 max-w-3xl text-sm text-white/90 sm:text-base'>
						Вебсайт <span className='font-semibold'>polyana.info</span> (POLYANA.INFO) — туристичний портал
						Поляни. Ми поважаємо вашу приватність і пояснюємо, як обробляємо дані під час використання сайту.
					</p>
					<p className='mt-3 text-xs text-white/70'>Останнє оновлення: квітень 2026</p>
				</div>
			</section>

			<section className='mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14'>
				<article className='rounded-2xl bg-white p-6 shadow-sm sm:p-10'>
					<div className='space-y-8 text-sm leading-relaxed text-slate-700 sm:text-base'>
						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>1. Загальні положення</h2>
							<p className='mt-3'>
								Ця Політика описує порядок збору та використання інформації під час відвідування сайту{' '}
								<Link href='/' className='font-semibold text-[#53C4DA] underline-offset-2 hover:underline'>
									polyana.info
								</Link>
								. Використовуючи сайт, ви погоджуєтеся з умовами цієї Політики. Якщо ви не згодні — будь
								ласка, припиніть використання ресурсу.
							</p>
						</div>

						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>2. Хто відповідає за обробку даних</h2>
							<p className='mt-3'>
								Володільцем сайту та особою, яка визначає цілі обробки даних, є команда проєкту POLYANA.INFO.
								З питань щодо персональних даних можна звернутися за електронною поштою:{' '}
								<a
									href='mailto:polianainfo.ua@gmail.com'
									className='font-semibold text-[#53C4DA] underline-offset-2 hover:underline'
								>
									polianainfo.ua@gmail.com
								</a>
								.
							</p>
						</div>

						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>3. Які дані ми можемо отримувати</h2>
							<ul className='mt-3 list-disc space-y-2 pl-5'>
								<li>
									<strong>Технічні дані:</strong> тип браузера, пристрій, мова інтерфейсу, орієнтовний
									регіон (якщо передається стандартними заголовками), час відвідування, сторінки
									перегляду — для стабільної роботи сайту та розуміння навантаження.
								</li>
								<li>
									<strong>Дані, які ви самі надсилаєте:</strong> наприклад, номер телефону у формі
									підписки на новини у підвалі сайту (якщо ви її заповнюєте). Ми використовуємо їх лише
									для зазначеної мети (інформування про матеріали та акції порталу) і не продаємо бази
									третім особам.
								</li>
							</ul>
						</div>

						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>4. Файли cookie та аналітика</h2>
							<p className='mt-3'>
								Сайт може використовувати невеликі файли <strong>cookie</strong> та сервіси вебаналітики
								(наприклад, зведена статистика відвідувань), щоб зрозуміти, як користувачі користуються
								порталом, і покращувати контент. Дані зазвичай агреговані й не дозволяють ідентифікувати
								конкретну особу без додаткової інформації.
							</p>
							<p className='mt-3'>
								Ви можете обмежити або вимкнути cookie в налаштуваннях свого браузера; у такому разі частина
								функцій сайту може працювати інакше.
							</p>
						</div>

						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>5. Вбудовані сервіси та посилання</h2>
							<p className='mt-3'>
								На сайті можуть бути карти (наприклад, Google Maps), кнопки соціальних мереж або віджети
								партнерів. Ці сервіси мають власні політики конфіденційності; ми рекомендуємо ознайомитися
								з ними окремо.
							</p>
						</div>

						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>6. Зберігання та захист</h2>
							<p className='mt-3'>
								Ми застосовуємо розумні організаційні та технічні заходи, щоб убезпечити інформацію від
								несанкціонованого доступу. Термін зберігання залежить від мети: технічні журнали — обмежений
								час; дані з форм — поки потрібні для звʼязку з вами або поки ви не відкличете згоду.
							</p>
						</div>

						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>7. Ваші права</h2>
							<p className='mt-3'>
								Відповідно до чинного законодавства України про захист персональних даних ви можете
								запитувати доступ до своїх даних, їх виправлення, обмеження обробки або видалення (де це
								застосовно), а також відкликати згоду на обробку. Для звернень використовуйте електронну
								пошту, вказану вище.
							</p>
						</div>

						<div>
							<h2 className='text-lg font-bold text-[#2D333D]'>8. Зміни до Політики</h2>
							<p className='mt-3'>
								Ми можемо оновлювати цей документ; актуальна версія завжди буде на цій сторінці. Дата
								оновлення вказана на початку тексту.
							</p>
						</div>

						<div className='rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 sm:text-sm'>
							<p>
								Цей текст має загальний інформаційний характер і не замінює індивідуальну юридичну
								консультацію. За додатковими питаннями звертайтеся на сторінку{' '}
								<Link href='/contacts' className='font-semibold text-[#53C4DA] hover:underline'>
									Контакти
								</Link>
								.
							</p>
						</div>
					</div>
				</article>
			</section>
		</div>
	)
}
