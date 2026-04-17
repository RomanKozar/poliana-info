import Link from 'next/link'
import Image from 'next/image'
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'
import { siteNavigation } from './site-navigation'

export default function Header() {
	return (
		<header className='w-full border-b border-slate-600 bg-gradient-to-r from-[#2B3138] to-[#3D424A]'>
			<div className='flex w-full items-center justify-start gap-6 px-12 py-3 sm:px-16 lg:px-24'>
				<Link href='/' className='flex items-center text-white'>
					<Image
						src='/images/branding/Poliana_info_white_header.png'
						alt='POLIANA INFO'
						width={300}
						height={92}
						priority
						className='h-12 w-auto object-contain md:h-14'
					/>
				</Link>

				<nav className='hidden items-center gap-6 text-sm text-white/85 lg:ml-4 lg:flex'>
					{siteNavigation.map(item => (
						<Link
							key={item.href}
							href={item.href}
							className='whitespace-nowrap font-medium transition-colors hover:text-white'
						>
							{item.label}
						</Link>
					))}
				</nav>

				<div className='ml-auto flex items-center gap-3 text-white'>
					<Link
						href='https://instagram.com'
						target='_blank'
						rel='noreferrer'
						aria-label='Instagram'
						className='hidden opacity-90 transition-opacity hover:opacity-100 sm:inline-block'
					>
						<FaInstagram className='size-4' />
					</Link>
					<Link
						href='https://facebook.com'
						target='_blank'
						rel='noreferrer'
						aria-label='Facebook'
						className='hidden opacity-90 transition-opacity hover:opacity-100 sm:inline-block'
					>
						<FaFacebookF className='size-3.5' />
					</Link>
					<Link
						href='https://tiktok.com'
						target='_blank'
						rel='noreferrer'
						aria-label='TikTok'
						className='hidden opacity-90 transition-opacity hover:opacity-100 sm:inline-block'
					>
						<FaTiktok className='size-3.5' />
					</Link>

					<Link
						href='/contacts'
						className='rounded-md bg-cyan-500 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-cyan-400 sm:px-4'
					>
						Додати заклад
					</Link>
				</div>
			</div>
		</header>
	)
}
