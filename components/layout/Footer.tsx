import Link from 'next/link'
import Image from 'next/image'
import {
	FaEnvelope,
	FaFacebookF,
	FaInstagram,
	FaMapMarkerAlt,
	FaPhoneAlt,
	FaTiktok,
} from 'react-icons/fa'

const informationLinks = [
	{ href: '/accommodation', label: 'Проживання' },
	{ href: '/spa', label: 'SPA та відпочинок' },
	{ href: '/kids-camps', label: 'Дитячі табори' },
	{ href: '/entertainment', label: 'Розваги' },
	{ href: '/blog', label: 'Карта Поляни' },
]

const supportLinks = [
	{ href: '/contacts', label: 'Контакти' },
	{ href: '/#', label: 'Платити та відповідей' },
	{ href: '/#', label: 'Умови використання' },
	{ href: '/#', label: 'Політика конфіденційності' },
]

const aboutLinks = [
	{ href: '/about', label: 'Про Poliana Info' },
	{ href: '/about', label: 'Про нас' },
	{ href: '/contacts', label: 'Реклама на сайті' },
	{ href: '/blog', label: 'Блог' },
]

export default function Footer() {
	return (
		<footer className='w-full'>
			<div className='bg-[#53C4DA]'>
				<div className='mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between'>
					<div className='flex items-center gap-3 text-white'>
						<span className='flex size-9 items-center justify-center rounded-full bg-white/20'>
							<FaEnvelope className='size-4' />
						</span>
						<p className='text-sm font-semibold leading-tight sm:text-base'>
							Дізнавайся про нові місця
							<br className='hidden sm:block' /> та акції першим
						</p>
					</div>

					<form className='flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center'>
						<input
							type='email'
							placeholder='Введіть Ваш email'
							className='h-10 w-full rounded-md border border-transparent bg-white px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none'
						/>
						<button
							type='button'
							className='h-10 cursor-pointer rounded-md bg-[#2F3640] px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#222831] hover:shadow-md'
						>
							ПІДПИСАТИСЬ
						</button>
					</form>
				</div>
			</div>

			<div className='bg-[#2D333D] text-white/90'>
				<div className='mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-5'>
					<div className='space-y-3'>
						<Link href='/' className='inline-flex'>
							<Image
								src='/images/branding/Poliana_info_white_header.png'
								alt='POLIANA INFO'
								width={190}
								height={58}
								className='h-10 w-auto object-contain'
							/>
						</Link>
						<p className='max-w-xs text-xs leading-relaxed text-white/70'>
							Туристичний гід по Закарпатті. Відпочинок у Поляні - легко та зручно.
						</p>
						<div className='flex items-center gap-3 text-white/75'>
							<Link href='https://instagram.com' target='_blank' rel='noreferrer'>
								<FaInstagram className='size-4 transition-colors hover:text-white' />
							</Link>
							<Link href='https://facebook.com' target='_blank' rel='noreferrer'>
								<FaFacebookF className='size-3.5 transition-colors hover:text-white' />
							</Link>
							<Link href='https://tiktok.com' target='_blank' rel='noreferrer'>
								<FaTiktok className='size-3.5 transition-colors hover:text-white' />
							</Link>
						</div>
					</div>

					<div>
						<p className='mb-3 text-sm font-semibold text-white'>Про нас</p>
						<ul className='space-y-2 text-xs text-white/70'>
							{aboutLinks.map(item => (
								<li key={item.label}>
									<Link href={item.href} className='transition-colors hover:text-white'>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<p className='mb-3 text-sm font-semibold text-white'>Інформація</p>
						<ul className='space-y-2 text-xs text-white/70'>
							{informationLinks.map(item => (
								<li key={item.label}>
									<Link href={item.href} className='transition-colors hover:text-white'>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<p className='mb-3 text-sm font-semibold text-white'>Підтримка</p>
						<ul className='space-y-2 text-xs text-white/70'>
							{supportLinks.map(item => (
								<li key={item.label}>
									<Link href={item.href} className='transition-colors hover:text-white'>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					<div>
						<p className='mb-3 text-sm font-semibold text-white'>Контакти</p>
						<ul className='space-y-2 text-xs text-white/70'>
							<li className='flex items-center gap-2'>
								<FaPhoneAlt className='size-3.5 text-[#53C4DA]' />
								<span>+38 (050) 123 45 67</span>
							</li>
							<li className='flex items-center gap-2'>
								<FaEnvelope className='size-3.5 text-[#53C4DA]' />
								<span>info@poliana.info</span>
							</li>
							<li className='flex items-center gap-2'>
								<FaMapMarkerAlt className='size-3.5 text-[#53C4DA]' />
								<span>с. Поляна, Закарпатська обл.</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	)
}
