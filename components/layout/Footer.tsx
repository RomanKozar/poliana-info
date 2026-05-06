'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
	FaEnvelope,
	FaFacebookF,
	FaInstagram,
	FaMapMarkerAlt,
	FaPhoneAlt,
	FaTiktok,
} from 'react-icons/fa'
import { IoQrCode } from 'react-icons/io5'

const informationLinks = [
	{ href: '/about', label: 'Про Polyana Info' },
	{ href: '/cat/goteli-polyany', label: 'Проживання' },
	{ href: '/cat/spa-bani-chany', label: 'SPA та відпочинок' },
	{ href: '/camps', label: 'Дитячі табори' },
	{ href: '/excursions#ekskursii-v-hory', label: 'Розваги' },
	{ href: '/#polyana-map', label: 'Карта Поляни' },
]

const supportLinks = [
	{ href: '/contacts', label: "Зворотний зв'язок" },
	{ href: '/terms', label: 'Умови використання' },
	{ href: '/privacy', label: 'Політика конфіденційності' },
]

export default function Footer() {
	const [phone, setPhone] = useState('')
	const [notice, setNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
	const [isSubscribing, setIsSubscribing] = useState(false)
	const noticeTimerRef = useRef<number | null>(null)
	const pathname = usePathname()

	useEffect(() => {
		return () => {
			if (noticeTimerRef.current) {
				window.clearTimeout(noticeTimerRef.current)
			}
		}
	}, [])

	useEffect(() => {
		setPhone('')
		setNotice(null)
		setIsSubscribing(false)
	}, [pathname])

	const showNotice = (type: 'success' | 'error', text: string) => {
		setNotice({ type, text })

		if (noticeTimerRef.current) {
			window.clearTimeout(noticeTimerRef.current)
		}

		noticeTimerRef.current = window.setTimeout(() => {
			setNotice(null)
		}, 3400)
	}

	const handlePhoneChange = (value: string) => {
		const trimmed = value.trim()
		const hasPlus = trimmed.startsWith('+')
		const digitsOnly = trimmed.replace(/\D/g, '').slice(0, 12)
		const normalized = hasPlus ? `+${digitsOnly}` : digitsOnly
		// Keep +380 prefix once input is engaged.
		if (!normalized || normalized === '+' || normalized === '+3' || normalized === '+38' || normalized === '+380') {
			setPhone('+380')
			return
		}
		if (normalized.startsWith('+380')) {
			setPhone(normalized)
			return
		}
		// If user typed without prefix, force it.
		const digits = normalized.replace(/\D/g, '')
		if (digits.startsWith('380')) {
			setPhone(`+${digits}`)
			return
		}
		if (digits.startsWith('0')) {
			setPhone(`+38${digits}`)
			return
		}
		setPhone(`+380${digits}`)
	}

	const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const digitsOnly = phone.replace(/\D/g, '')
		if (digitsOnly.length < 10 || digitsOnly.length > 12) {
			showNotice('error', 'Введіть коректний номер: лише цифри, від 10 до 12 символів.')
			return
		}

		setIsSubscribing(true)
		try {
			const res = await fetch('/api/subscribe', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ phone }),
			})
			if (!res.ok) {
				showNotice('error', 'Не вдалося підписати. Спробуйте ще раз трохи пізніше.')
				return
			}
			showNotice('success', 'Готово! Ви підписались на оновлення POLYANA.INFO.')
			setPhone('')
		} catch {
			showNotice('error', 'Немає зʼєднання або сервер недоступний. Спробуйте ще раз.')
		} finally {
			setIsSubscribing(false)
		}
	}

	return (
		<footer className='mt-auto w-full'>
			<div className='bg-[#53C4DA]'>
				<div className='mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between'>
					<div className='flex items-center gap-3 text-white'>
						<span className='flex size-9 items-center justify-center rounded-full bg-white/20'>
							<FaPhoneAlt className='size-4' />
						</span>
						<p className='text-sm font-semibold leading-tight sm:text-base'>
							Дізнавайся про нові місця
							<br className='hidden sm:block' /> та акції першим
						</p>
					</div>

					<form
						onSubmit={handleSubscribe}
						noValidate
						className='relative flex w-full max-w-xl flex-col gap-2 sm:flex-row sm:items-center'
					>
						<input
							type='tel'
							inputMode='tel'
							pattern='[+0-9]*'
							maxLength={16}
							value={phone}
							onChange={event => handlePhoneChange(event.target.value)}
							onFocus={() => {
								if (!phone) {
									setPhone('+380')
								}
							}}
							placeholder='Введіть Ваш номер телефону'
							aria-invalid={notice?.type === 'error'}
							className='h-10 w-full rounded-md border border-transparent bg-white px-4 text-base text-slate-800 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none'
						/>
						<button
							type='submit'
							disabled={isSubscribing}
							className='h-10 cursor-pointer rounded-md bg-[#2F3640] px-6 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#222831] hover:shadow-md'
						>
							{isSubscribing ? 'НАДСИЛАЄМО…' : 'ПІДПИСАТИСЬ'}
						</button>
						{notice ? (
							<div
								role={notice.type === 'error' ? 'alert' : 'status'}
								className={`pointer-events-none absolute -top-11 right-0 rounded-md px-3 py-1.5 text-xs font-semibold text-white shadow-md ${
									notice.type === 'success' ? 'bg-emerald-600/95' : 'bg-rose-600/95'
								}`}
							>
								{notice.text}
							</div>
						) : null}
					</form>
				</div>
			</div>

			<div className='bg-[#2D333D] text-white/90'>
				<div className='mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-8'>
					<div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10'>
						<div className='max-w-md space-y-4 lg:shrink-0'>
							<Link href='/' className='inline-flex'>
								<Image
									src='/images/branding/Polyana_info_3.png'
									alt='POLYANA INFO'
									width={190}
									height={58}
									className='h-10 w-[190px] object-cover object-left sm:-ml-1 lg:-translate-x-6'
								/>
							</Link>
							<p className='text-xs leading-relaxed text-white/70 sm:text-[13px]'>
								Створено у 2026 році з метою підвищення культурно-історичної, пізнавальної
								грамотності читачів, популяризації Поляни, підтримки діяльності суб’єктів
								індустрії туризму, розвитку культурних традицій та промоції регіону
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

						<div className='grid min-w-0 flex-1 grid-cols-2 gap-x-6 gap-y-6 sm:gap-x-10 lg:grid-cols-4 lg:gap-y-6'>
							<div className='min-w-0'>
								<p className='mb-3 text-sm font-semibold tracking-wide text-white'>Інформація</p>
								<ul className='space-y-2.5 text-xs leading-snug text-white/70 sm:text-[13px]'>
									{informationLinks.map(item => (
										<li key={item.label}>
											<Link href={item.href} className='transition-colors hover:text-white'>
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</div>

							<div className='min-w-0'>
								<p className='mb-3 text-sm font-semibold tracking-wide text-white'>Підтримка</p>
								<ul className='space-y-2.5 text-xs leading-snug text-white/70 sm:text-[13px]'>
									{supportLinks.map(item => (
										<li key={item.label}>
											<Link href={item.href} className='transition-colors hover:text-white'>
												{item.label}
											</Link>
										</li>
									))}
								</ul>
							</div>

							<div className='min-w-0'>
								<p className='mb-3 text-sm font-semibold tracking-wide text-white'>Контакти</p>
								<ul className='space-y-2.5 text-xs leading-snug text-white/70 sm:text-[13px]'>
									<li className='flex items-start gap-2'>
										<FaPhoneAlt className='mt-0.5 size-3.5 shrink-0 text-[#53C4DA]' />
										<a href='tel:0502149266' className='transition-colors hover:text-white'>
											0 (50) 214 92 66
										</a>
									</li>
									<li className='flex items-start gap-2'>
										<FaEnvelope className='mt-0.5 size-3.5 shrink-0 text-[#53C4DA]' />
										<a
											href='mailto:polianainfo.ua@gmail.com'
											className='break-all transition-colors hover:text-white'
										>
											polianainfo.ua@gmail.com
										</a>
									</li>
									<li className='flex items-start gap-2'>
										<FaMapMarkerAlt className='mt-0.5 size-3.5 shrink-0 text-[#53C4DA]' />
										<a
											href='https://www.google.com/maps/search/?api=1&query=%D1%81.%20%D0%9F%D0%BE%D0%BB%D1%8F%D0%BD%D0%B0%2C%20%D0%97%D0%B0%D0%BA%D0%B0%D1%80%D0%BF%D0%B0%D1%82%D1%81%D1%8C%D0%BA%D0%B0%20%D0%BE%D0%B1%D0%BB.'
											target='_blank'
											rel='noreferrer'
											className='transition-colors hover:text-white'
										>
											с. Поляна, Закарпатська обл.
										</a>
									</li>
								</ul>
							</div>

							<div className='min-w-0 text-center lg:text-left'>
								<div
									className='mx-auto inline-flex rounded-lg bg-white p-1.5 ring-1 ring-white/15 lg:mx-0'
									role='img'
									aria-label='QR-код для підписки на оновлення (скоро)'
								>
									<span className='flex size-[132px] items-center justify-center text-[#2D333D]'>
										<IoQrCode className='size-[5.25rem] opacity-90' aria-hidden />
									</span>
								</div>
								<p className='mt-3 text-sm font-semibold tracking-wide text-white'>
									Підписатися на оновлення
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}
