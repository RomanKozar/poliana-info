'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaTiktok } from 'react-icons/fa'
import { siteNavigation } from './site-navigation'

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [isMobileNewsOpen, setIsMobileNewsOpen] = useState(false)
	const [isDesktopNewsOpen, setIsDesktopNewsOpen] = useState(false)
	const headerRef = useRef<HTMLElement | null>(null)
	const pathname = usePathname()

	const isActivePath = (href: string) => {
		if (href === '/') {
			return pathname === '/'
		}

		return pathname === href || pathname.startsWith(`${href}/`)
	}

	const handleLogoClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
		setIsMobileMenuOpen(false)
		setIsMobileNewsOpen(false)

		if (pathname === '/') {
			event.preventDefault()
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	useEffect(() => {
		const headerElement = headerRef.current
		if (!headerElement) {
			return
		}

		const root = document.documentElement
		const syncHeaderOffset = () => {
			const headerHeight = Math.ceil(headerElement.getBoundingClientRect().height)
			root.style.setProperty('--header-offset', `${headerHeight}px`)
		}

		syncHeaderOffset()
		const observer = new ResizeObserver(syncHeaderOffset)
		observer.observe(headerElement)
		window.addEventListener('resize', syncHeaderOffset)

		return () => {
			observer.disconnect()
			window.removeEventListener('resize', syncHeaderOffset)
		}
	}, [])

	return (
		<header ref={headerRef} className='fixed left-0 top-0 z-50 w-full bg-gradient-to-r from-[#2B3138] to-[#3D424A] text-cyan-400'>
			<div className='flex w-full items-center justify-start gap-1 bg-cyan-500 px-3 py-3 text-cyan-400 sm:gap-4 sm:px-16 lg:gap-6 lg:px-24'>
				<button
					type='button'
					onClick={() => {
						setIsMobileNewsOpen(false)
						setIsMobileMenuOpen(true)
					}}
					aria-label='Відкрити меню'
					aria-expanded={isMobileMenuOpen}
					className='inline-flex h-8 w-8 flex-col items-center justify-center gap-0.5 rounded-[3px] bg-[#0E7992] text-white sm:h-10 sm:w-10 sm:gap-1 sm:rounded-sm lg:hidden'
				>
					<span className='block h-px w-3 bg-white sm:h-0.5 sm:w-5' />
					<span className='block h-px w-3 bg-white sm:h-0.5 sm:w-5' />
					<span className='block h-px w-3 bg-white sm:h-0.5 sm:w-5' />
				</button>

				<Link
					href='/'
					onClick={handleLogoClick}
					className='shrink-0 flex items-center overflow-hidden text-white sm:-ml-3'
				>
					<Image
						src='/images/branding/Polyana_info_3.png'
						alt='POLYANA INFO'
						width={130}
						height={40}
						priority
						className='h-10 w-[130px] scale-125 object-cover sm:h-12 sm:w-[156px] md:h-14 md:w-[182px] lg:h-10 lg:w-[130px] xl:h-12 xl:w-[156px] 2xl:h-14 2xl:w-[182px]'
					/>
				</Link>

				<nav className='hidden min-w-0 items-center gap-1 text-[10px] font-semibold text-white lg:ml-2 lg:flex xl:ml-3 xl:gap-2 xl:text-xs 2xl:gap-3 2xl:text-sm'>
					{siteNavigation.map(item =>
						item.children ? (
							<div
								key={item.label}
								className='relative'
								onMouseEnter={() => setIsDesktopNewsOpen(true)}
								onMouseLeave={() => setIsDesktopNewsOpen(false)}
							>
								<span
									className={`inline-flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-lg px-1 py-1.5 font-semibold text-white transition-colors hover:bg-cyan-600 hover:text-white xl:px-2 ${
										isDesktopNewsOpen ? 'bg-cyan-600 text-white shadow-sm' : ''
									}`}
								>
									{item.label}
									<span className={`text-xs transition-transform ${isDesktopNewsOpen ? 'rotate-180' : ''}`}>
										▾
									</span>
								</span>
								<div
									className={`absolute left-0 top-full z-[70] min-w-[230px] rounded-lg border border-slate-200 bg-white p-2 text-sm text-slate-700 shadow-lg transition-all duration-200 ${
										isDesktopNewsOpen
											? 'pointer-events-auto translate-y-0 opacity-100'
											: 'pointer-events-none translate-y-1 opacity-0'
									}`}
								>
									{item.children.map(child => (
										<Link
											key={child.href}
											href={child.href}
											onClick={() => setIsDesktopNewsOpen(false)}
											className={`block rounded-md px-3 py-2 font-medium transition-colors hover:bg-slate-100 hover:text-slate-900 ${
												isActivePath(child.href) ? 'bg-slate-100 text-slate-900' : ''
											}`}
										>
											{child.label}
										</Link>
									))}
								</div>
							</div>
						) : (
							<Link
								key={item.href}
								href={item.href}
								className={`whitespace-nowrap rounded-lg px-1 py-1.5 font-semibold text-white transition-colors hover:bg-cyan-600 hover:text-white xl:px-2 ${
									isActivePath(item.href) ? 'bg-cyan-600 text-white shadow-sm' : ''
								}`}
							>
								{item.label}
							</Link>
						)
					)}
				</nav>

				<div className='ml-auto flex items-center gap-1 text-sm font-semibold text-white sm:gap-2 xl:gap-3'>
					<Link
						href='https://instagram.com'
						target='_blank'
						rel='noreferrer'
						aria-label='Instagram'
						className='hidden text-white transition-opacity hover:opacity-90 lg:inline-block'
					>
						<FaInstagram className='size-4 text-white' />
					</Link>
					<Link
						href='https://facebook.com'
						target='_blank'
						rel='noreferrer'
						aria-label='Facebook'
						className='hidden text-white transition-opacity hover:opacity-90 lg:inline-block'
					>
						<FaFacebookF className='size-3.5 text-white' />
					</Link>
					<Link
						href='https://tiktok.com'
						target='_blank'
						rel='noreferrer'
						aria-label='TikTok'
						className='hidden text-white transition-opacity hover:opacity-90 lg:inline-block'
					>
						<FaTiktok className='size-3.5 text-white' />
					</Link>

					<a
						href='tel:0502149266'
						className='shrink-0 whitespace-nowrap rounded-md bg-cyan-600 px-2.5 py-1.5 text-xs font-bold text-white transition-colors hover:bg-cyan-400 sm:px-3 sm:py-2 sm:text-sm lg:px-3 lg:text-sm xl:px-4 xl:text-base'
					>
						0 (50) 214 92 66
					</a>
				</div>
			</div>

			<div
				className={`fixed inset-0 z-[60] bg-black/35 transition-opacity duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
					isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
				}`}
				style={{ transitionDelay: isMobileMenuOpen ? '0ms' : '440ms' }}
				onClick={() => setIsMobileMenuOpen(false)}
			>
				<div
					className={`absolute inset-y-0 left-0 w-[86%] max-w-[400px] bg-black/30 blur-[2px] transition-opacity duration-300 ease-out ${
						isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
					}`}
				/>
				<div
					className={`relative h-full w-[86%] max-w-[400px] bg-cyan-500 px-4 py-6 shadow-2xl transition-all duration-[1640ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
						isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
					} transform-gpu will-change-transform`}
					style={{ transitionDelay: isMobileMenuOpen ? '360ms' : '160ms' }}
					onClick={event => event.stopPropagation()}
				>
					<div
						className={`flex items-center justify-between transition-all duration-[980ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
							isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
						}`}
						style={{ transitionDelay: isMobileMenuOpen ? '620ms' : '0ms' }}
					>
						<div className='flex items-center gap-4'>
							<Link
								href='https://instagram.com'
								target='_blank'
								rel='noreferrer'
								aria-label='Instagram'
								className='inline-flex size-11 items-center justify-center rounded-full bg-cyan-600/95 text-white ring-1 ring-white/25 transition-colors hover:bg-cyan-700'
							>
								<FaInstagram className='size-5 text-white' />
							</Link>
							<Link
								href='https://facebook.com'
								target='_blank'
								rel='noreferrer'
								aria-label='Facebook'
								className='inline-flex size-11 items-center justify-center rounded-full bg-cyan-600/95 text-white ring-1 ring-white/25 transition-colors hover:bg-cyan-700'
							>
								<FaFacebookF className='size-[18px] text-white' />
							</Link>
							<Link
								href='https://tiktok.com'
								target='_blank'
								rel='noreferrer'
								aria-label='TikTok'
								className='inline-flex size-11 items-center justify-center rounded-full bg-cyan-600/95 text-white ring-1 ring-white/25 transition-colors hover:bg-cyan-700'
							>
								<FaTiktok className='size-[18px] text-white' />
							</Link>
						</div>
						<button
							type='button'
							onClick={() => {
								setIsMobileMenuOpen(false)
								setIsMobileNewsOpen(false)
							}}
							aria-label='Закрити меню'
							className='inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/25 bg-cyan-600 text-3xl font-bold leading-none text-white'
						>
							x
						</button>
					</div>

					<nav
						className={`mt-10 flex flex-col items-center gap-7 text-center text-2xl font-extrabold text-white transition-all duration-[1120ms] ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-3xl ${
							isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
						}`}
						style={{ transitionDelay: isMobileMenuOpen ? '720ms' : '0ms' }}
					>
						{siteNavigation.map(item =>
							item.children ? (
								<div key={item.label} className='flex w-full max-w-[320px] flex-col items-center gap-3'>
									{(() => {
										const isParentActive = isActivePath(item.href)
										return (
									<button
										type='button'
										onClick={() => setIsMobileNewsOpen(prev => !prev)}
										className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors duration-200 hover:text-white/85 ${
											isParentActive ? 'bg-cyan-600 text-white shadow-sm' : ''
										}`}
									>
										{item.label}
										<span className={`text-xl transition-transform ${isMobileNewsOpen ? 'rotate-180' : ''}`}>
											▾
										</span>
									</button>
										)
									})()}
									{isMobileNewsOpen ? (
										<div className='flex w-full flex-col items-center gap-3 rounded-xl bg-cyan-600/70 p-4 text-xl sm:text-2xl'>
											{item.children.map(child => (
												(() => {
													const isChildActive = isActivePath(child.href)
													return (
												<Link
													key={child.href}
													href={child.href}
													onClick={() => {
														setIsMobileMenuOpen(false)
														setIsMobileNewsOpen(false)
													}}
													className={`rounded-lg px-3 py-1 transition-colors duration-200 hover:text-white/85 ${
														isChildActive ? 'bg-cyan-700 text-white shadow-sm' : ''
													}`}
												>
													{child.label}
												</Link>
													)
												})()
											))}
										</div>
									) : null}
								</div>
							) : (
								(() => {
									const isItemActive = isActivePath(item.href)
									return (
								<Link
									key={item.href}
									href={item.href}
									onClick={() => setIsMobileMenuOpen(false)}
									className={`inline-flex items-center rounded-lg px-3 py-1.5 transition-colors duration-200 hover:text-white/85 ${
										isItemActive ? 'bg-cyan-600 text-white shadow-sm' : ''
									}`}
								>
									{item.label}
								</Link>
									)
								})()
							)
						)}
					</nav>

					<a
						href='tel:0502149266'
						className={`absolute bottom-6 left-1/2 inline-flex min-w-[230px] -translate-x-1/2 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-cyan-600/95 px-5 py-2.5 text-sm font-bold text-white shadow-lg ring-1 ring-white/30 transition-all duration-500 ${
							isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
						}`}
						style={{ transitionDelay: isMobileMenuOpen ? '860ms' : '0ms' }}
					>
						<span className='inline-flex size-10 items-center justify-center rounded-full bg-white/20'>
							<FaPhoneAlt className='size-4' />
						</span>
						0 (50) 214 92 66
					</a>
				</div>
			</div>
		</header>
	)
}
