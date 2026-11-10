import Image from 'next/image'
import Link from 'next/link'
import { FaClock, FaMapMarkerAlt, FaPhoneAlt, FaQrcode } from 'react-icons/fa'
import BinotelBookButton from '@/components/shared/BinotelBookButton'
import {
	katerynaMenu,
	katerynaMenuQrSrc,
	katerynaMenuUrl,
	katerynaRestaurant,
	katerynaRestaurantPhotos,
	type MenuDish,
} from '@/data/kateryna-restaurant'

function DishRow({ dish }: { dish: MenuDish }) {
	return (
		<li className='flex items-baseline gap-2 py-2 text-sm text-[#2D333D]'>
			<span className='min-w-0'>
				<span className='font-semibold'>{dish.name}</span>
				{dish.detail ? <span className='text-slate-500'> · {dish.detail}</span> : null}
			</span>
			<span className='mb-1 min-w-4 flex-1 border-b border-dotted border-slate-300' aria-hidden />
			<span className='shrink-0 font-bold text-[var(--brand-price)]'>{dish.price}</span>
		</li>
	)
}

export default function FoodDrinksPageContent() {
	const delivery = katerynaRestaurant.phones[1]

	return (
		<div className='flex min-h-0 flex-col bg-[#F5F6F7]'>
			<section className='relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-[#1E3D53] via-[#264D67] to-[#153a48] px-4 py-12 text-white sm:px-10 sm:py-14 lg:px-16'>
				<div className='pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-[#53C4DA]/25 blur-[80px]' aria-hidden />
				<div className='pointer-events-none absolute -bottom-16 left-[-10%] h-56 w-[55%] max-w-md rounded-full bg-[var(--brand-cta-promo)]/20 blur-[70px]' aria-hidden />
				<div className='relative mx-auto max-w-5xl'>
					<p className='text-xs font-semibold uppercase tracking-[0.2em] text-[#53C4DA] sm:text-sm'>Поляна · готель «Катерина»</p>
					<h1 className='mt-3 text-3xl font-black leading-[1.08] tracking-tight sm:text-5xl'>Їжа та напої</h1>
					<p className='mt-5 max-w-2xl text-sm leading-relaxed text-white/88 sm:text-lg'>
						Ресторан у готелі «Катерина»: закарпатська кухня, форель на замовлення, піца, кава і доставка в Поляні.
					</p>
					<div className='mt-8 flex flex-wrap gap-3'>
						<a
							href='#menu'
							className='inline-flex items-center rounded-xl bg-[#53C4DA] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#45b8cf]'
						>
							Дивитись меню
						</a>
						<BinotelBookButton
							description='Бронювання столика: ресторан готелю Катерина'
							className='inline-flex items-center rounded-xl bg-[var(--brand-cta-promo)] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#9a3412]'
						>
							Забронювати столик
						</BinotelBookButton>
						<a
							href={`tel:${delivery.tel}`}
							className='inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 py-3 text-sm font-bold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:bg-white/18'
						>
							<FaPhoneAlt className='size-3.5' aria-hidden />
							Доставка
						</a>
					</div>
				</div>
			</section>

			<section className='mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-12'>
				<div className='overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.04]'>
					<div className='grid grid-cols-2'>
						{katerynaRestaurantPhotos.map(photo => (
							<div key={photo.src} className='relative aspect-[4/3]'>
								<Image src={photo.src} alt={photo.alt} fill className='object-cover' sizes='(min-width: 1024px) 28vw, 46vw' />
							</div>
						))}
					</div>
				</div>
				<div className='flex flex-col justify-center rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-900/[0.04] sm:p-8'>
					<h2 className='text-2xl font-extrabold tracking-tight text-[#2D333D] sm:text-3xl'>{katerynaRestaurant.name}</h2>
					<p className='mt-4 text-sm leading-relaxed text-slate-600 sm:text-base'>
						Заклад на території готелю: сніданок, обід і вечеря в селі Поляна. У меню банош, борщ, мангал, лаваші-гриль і окремий блок страв із форелі.
					</p>
					<ul className='mt-6 space-y-3 text-sm text-[#2D333D]'>
						<li className='flex items-start gap-3'>
							<FaMapMarkerAlt className='mt-0.5 size-4 shrink-0 text-[#53C4DA]' aria-hidden />
							<span>{katerynaRestaurant.address}</span>
						</li>
						<li className='flex items-start gap-3'>
							<FaClock className='mt-0.5 size-4 shrink-0 text-[#53C4DA]' aria-hidden />
							<span>{katerynaRestaurant.hours}</span>
						</li>
						{katerynaRestaurant.phones.map(phone => (
							<li key={phone.tel} className='flex items-start gap-3'>
								<FaPhoneAlt className='mt-0.5 size-4 shrink-0 text-[#53C4DA]' aria-hidden />
								<a href={`tel:${phone.tel}`} className='font-semibold hover:text-[var(--brand-cta-promo)]'>
									{phone.label}: {phone.display}
								</a>
							</li>
						))}
					</ul>
					<div className='mt-6 flex flex-wrap gap-3'>
						<Link
							href={katerynaRestaurant.hotelHref}
							className='inline-flex rounded-xl bg-[var(--brand-cta-promo)] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#9a3412]'
						>
							Готель «Катерина»
						</Link>
						<a
							href={katerynaRestaurant.mapsHref}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-flex rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-[#2D333D] transition hover:border-[#53C4DA]'
						>
							Маршрут
						</a>
					</div>
				</div>
			</section>

			<section className='mx-auto grid w-full max-w-6xl gap-5 px-4 pb-4 sm:px-6 lg:grid-cols-[1.4fr_0.8fr] lg:px-8'>
				<article className='rounded-2xl border border-slate-200/90 border-l-4 border-l-[var(--brand-cta-promo)] bg-white p-6 shadow-sm sm:p-8'>
					<p className='text-xs font-bold uppercase tracking-[0.16em] text-[var(--brand-cta-promo)]'>Пропозиція</p>
					<h2 className='mt-2 text-2xl font-extrabold text-[#2D333D] sm:text-3xl'>Форель в Катерині</h2>
					<p className='mt-3 text-sm leading-relaxed text-slate-600 sm:text-base'>
						Форель готують зі спеціями, цибулею, овочами, грибами, гарячим копченням або у вершково-винному соусі. Є шеф-салат, вареники й фунчоза з фореллю. Спіймати рибу можна окремо, а з’їсти її тут.
					</p>
					<p className='mt-4 text-sm font-bold text-[var(--brand-price)]'>Від 110 грн за 100 г</p>
					<div className='mt-5 flex flex-wrap gap-3'>
						<a href='#forel' className='text-sm font-bold text-[#0e7490] hover:underline'>
							Страви з форелі в меню
						</a>
						<Link href={katerynaRestaurant.troutHref} className='text-sm font-bold text-[#0e7490] hover:underline'>
							Риболовля в Поляні
						</Link>
					</div>
				</article>
				<article className='flex flex-col items-center rounded-2xl border border-slate-200/90 bg-white p-6 text-center shadow-sm sm:p-8'>
					<FaQrcode className='size-5 text-[#53C4DA]' aria-hidden />
					<h2 className='mt-2 text-lg font-extrabold text-[#2D333D]'>Меню в телефоні</h2>
					<a href={katerynaMenuUrl} target='_blank' rel='noopener noreferrer' className='mt-4 block'>
						<Image
							src={katerynaMenuQrSrc}
							alt='QR-код меню ресторану готелю Катерина'
							width={180}
							height={180}
							className='h-auto w-[180px]'
						/>
					</a>
					<a
						href={katerynaMenuUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='mt-3 text-sm font-bold text-[#0e7490] hover:underline'
					>
						Відкрити меню
					</a>
					<p className='mt-3 text-xs leading-relaxed text-slate-500'>
						Доставка: {delivery.display}. Ціни з меню ресторану, перед візитом їх краще уточнити.
					</p>
				</article>
			</section>

			<section id='menu' className='mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-10 sm:px-6 lg:px-8 lg:py-12'>
				<h2 className='text-2xl font-extrabold text-[#2D333D] sm:text-3xl'>Меню</h2>
				<nav className='mt-5 flex flex-wrap gap-2' aria-label='Розділи меню'>
					{katerynaMenu.map(block => (
						<a
							key={block.id}
							href={`#${block.id}`}
							className='rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#2D333D] shadow-sm ring-1 ring-slate-200 transition hover:ring-[#53C4DA] sm:text-sm'
						>
							{block.title}
						</a>
					))}
				</nav>
				<div className='mt-6 grid gap-5 lg:grid-cols-2'>
					{katerynaMenu.map(block => (
						<section
							key={block.id}
							id={block.id}
							className='scroll-mt-24 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6'
						>
							<h3 className='text-xl font-extrabold text-[#2D333D]'>{block.title}</h3>
							{block.note ? <p className='mt-2 text-sm text-slate-500'>{block.note}</p> : null}
							{block.groups.map(group => (
								<div key={group.title ?? block.id} className='mt-3'>
									{group.title ? <h4 className='text-sm font-bold uppercase tracking-wide text-[#0e7490]'>{group.title}</h4> : null}
									<ul>
										{group.items.map(dish => (
											<DishRow key={`${block.id}-${dish.name}`} dish={dish} />
										))}
									</ul>
								</div>
							))}
						</section>
					))}
				</div>
			</section>
		</div>
	)
}
