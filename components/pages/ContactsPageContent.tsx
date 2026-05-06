'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { FaEnvelope, FaFacebookF, FaInstagram, FaPhoneAlt, FaTiktok } from 'react-icons/fa'

type Notice = { type: 'success' | 'error'; text: string }

function normalizePhone(value: string) {
	const trimmed = value.trim()
	const hasPlus = trimmed.startsWith('+')
	const digitsOnly = trimmed.replace(/\D/g, '').slice(0, 12)
	const normalized = hasPlus ? `+${digitsOnly}` : digitsOnly
	if (!normalized || normalized === '+' || normalized === '+3' || normalized === '+38' || normalized === '+380') {
		return '+380'
	}
	if (normalized.startsWith('+380')) return normalized
	const digits = normalized.replace(/\D/g, '')
	if (digits.startsWith('380')) return `+${digits}`
	if (digits.startsWith('0')) return `+38${digits}`
	return `+380${digits}`
}

const MESSAGE_MAX_LENGTH = 1000

function normalizeName(value: string) {
	// Allow Ukrainian/Latin letters, spaces, apostrophes and hyphens.
	const cleaned = value
		.replace(/[^a-zA-Z\u0400-\u04FF\u0500-\u052F\u1E00-\u1EFF\s'’`ʼ-]/g, '')
		.replace(/\s+/g, ' ')
		.trimStart()
	return cleaned
}

export default function ContactsPageContent() {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [message, setMessage] = useState('')
	const [notice, setNotice] = useState<Notice | null>(null)
	const [isSending, setIsSending] = useState(false)
	const noticeTimerRef = useRef<number | null>(null)

	const showNotice = (next: Notice) => {
		setNotice(next)
		if (noticeTimerRef.current) window.clearTimeout(noticeTimerRef.current)
		noticeTimerRef.current = window.setTimeout(() => setNotice(null), 3800)
	}

	const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		setNotice(null)

		const cleanName = name.trim()
		const cleanPhone = phone.trim()
		const cleanMessage = message.trim()

		if (cleanName.length < 2) {
			showNotice({ type: 'error', text: "Введіть імʼя (мінімум 2 символи)." })
			return
		}
		if (!/^[a-zA-Z\u0400-\u04FF\u0500-\u052F\u1E00-\u1EFF\s'’`ʼ-]+$/.test(cleanName)) {
			showNotice({ type: 'error', text: "В імені дозволені лише букви, пробіли, дефіс та апостроф." })
			return
		}
		if (cleanMessage.length < 10) {
			showNotice({ type: 'error', text: 'Напишіть повідомлення (мінімум 10 символів).' })
			return
		}
		if (cleanMessage.length > MESSAGE_MAX_LENGTH) {
			showNotice({ type: 'error', text: `Повідомлення занадто довге (максимум ${MESSAGE_MAX_LENGTH} символів).` })
			return
		}
		if (cleanName.length > 80) {
			showNotice({ type: 'error', text: 'Імʼя занадто довге (макс. 80 символів).' })
			return
		}
		const phoneDigits = cleanPhone.replace(/\D/g, '')
		if (phoneDigits.length < 10 || phoneDigits.length > 12) {
			showNotice({ type: 'error', text: 'Телефон некоректний: має бути 10–12 цифр.' })
			return
		}

		setIsSending(true)
		try {
			const res = await fetch('/api/feedback', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: cleanName,
					phone: cleanPhone,
					message: cleanMessage,
					pageUrl: typeof window !== 'undefined' ? window.location.href : null,
				}),
			})

			if (res.ok) {
				showNotice({ type: 'success', text: 'Дякуємо! Повідомлення надіслано.' })
				setName('')
				setPhone('')
				setMessage('')
				return
			}

			// Fallback for environments without server storage.
			showNotice({ type: 'error', text: 'Не вдалося надіслати через форму. Спробуйте через email.' })
		} catch {
			showNotice({ type: 'error', text: 'Немає зʼєднання або сервер недоступний. Спробуйте через email.' })
		} finally {
			setIsSending(false)
		}
	}

	return (
		<div className='w-full bg-[#F5F6F7]'>
			<section className='mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
				<div className='flex flex-col gap-2'>
					<h1 className='text-3xl font-black tracking-tight text-[#2D333D] sm:text-5xl'>Зворотний звʼязок</h1>
					<p className='max-w-3xl text-sm text-slate-700 sm:text-base'>
						Напишіть нам — підкажемо, порадимо, допоможемо знайти потрібне місце або додати заклад на карту.
					</p>
				</div>

				<div className='mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]'>
					<article className='rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 sm:p-8'>
						<form onSubmit={onSubmit} className='space-y-4' noValidate>
							<div className='grid gap-4 sm:grid-cols-2'>
								<label className='block'>
									<span className='text-xs font-semibold text-slate-700'>Імʼя</span>
									<input
										value={name}
										onChange={e => setName(normalizeName(e.target.value))}
										maxLength={80}
										pattern="[A-Za-z\u0400-\u04FF\u0500-\u052F\u1E00-\u1EFF\s'’`ʼ-]+"
										required
										placeholder='Як до вас звертатись'
										className='mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none ring-0 transition-colors focus:border-[#53C4DA] focus:bg-white'
									/>
								</label>

								<label className='block'>
									<span className='text-xs font-semibold text-slate-700'>Телефон</span>
									<input
										value={phone}
										onChange={e => setPhone(normalizePhone(e.target.value))}
										onFocus={() => {
											if (!phone) setPhone('+380')
										}}
										inputMode='tel'
										pattern='[+0-9]*'
										maxLength={16}
										required
										placeholder='+380…'
										className='mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none ring-0 transition-colors focus:border-[#53C4DA] focus:bg-white'
									/>
								</label>
							</div>

							<label className='block'>
								<span className='flex flex-wrap items-baseline justify-between gap-2'>
									<span className='text-xs font-semibold text-slate-700'>Повідомлення</span>
									<span className='text-xs font-medium tabular-nums text-slate-500' aria-live='polite'>
										{message.length} / {MESSAGE_MAX_LENGTH}
									</span>
								</span>
								<textarea
									value={message}
									onChange={e => setMessage(e.target.value)}
									minLength={10}
									maxLength={MESSAGE_MAX_LENGTH}
									rows={6}
									placeholder='Опишіть питання або пропозицію…'
									aria-describedby='contact-message-limit-hint'
									className='mt-2 w-full resize-y rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition-colors focus:border-[#53C4DA] focus:bg-white'
								/>
								<p id='contact-message-limit-hint' className='mt-1.5 text-xs text-slate-500'>
									Мінімум 10 символів, максимум {MESSAGE_MAX_LENGTH}.
								</p>
							</label>

							<div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
								<button
									type='submit'
									disabled={isSending}
									className='inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-[#53C4DA] px-6 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-cyan-500 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60'
								>
									{isSending ? 'Надсилаємо…' : 'Надіслати'}
								</button>
							</div>

							{notice ? (
								<div
									role={notice.type === 'error' ? 'alert' : 'status'}
									className={`rounded-xl px-4 py-3 text-sm font-semibold ${
										notice.type === 'success'
											? 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-600/20'
											: 'bg-rose-50 text-rose-800 ring-1 ring-rose-600/20'
									}`}
								>
									{notice.text}
								</div>
							) : null}
						</form>
					</article>

					<aside className='space-y-6'>
						<div className='rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 sm:p-6'>
							<p className='text-sm font-extrabold text-[#2D333D]'>Контакти</p>
							<div className='mt-4 space-y-3 text-sm text-slate-700'>
								<a href='tel:0502149266' className='flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-900/5 hover:bg-slate-100'>
									<span className='flex size-9 items-center justify-center rounded-full bg-[#53C4DA]/15 text-[#53C4DA]'>
										<FaPhoneAlt className='size-4' aria-hidden />
									</span>
									<span className='font-semibold'>0 (50) 214 92 66</span>
								</a>

								<a href='mailto:polianainfo.ua@gmail.com' className='flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 ring-1 ring-slate-900/5 hover:bg-slate-100'>
									<span className='flex size-9 items-center justify-center rounded-full bg-[#53C4DA]/15 text-[#53C4DA]'>
										<FaEnvelope className='size-4' aria-hidden />
									</span>
									<span className='break-all font-semibold'>polianainfo.ua@gmail.com</span>
								</a>
							</div>
						</div>

						<div className='rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 sm:p-6'>
							<p className='text-sm font-extrabold text-[#2D333D]'>Соцмережі</p>
							<div className='mt-4 flex items-center gap-3'>
								<Link
									href='https://instagram.com'
									target='_blank'
									rel='noreferrer'
									className='inline-flex size-11 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-900/5 transition-colors hover:bg-slate-100 hover:text-slate-900'
									aria-label='Instagram'
								>
									<FaInstagram className='size-5' aria-hidden />
								</Link>
								<Link
									href='https://facebook.com'
									target='_blank'
									rel='noreferrer'
									className='inline-flex size-11 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-900/5 transition-colors hover:bg-slate-100 hover:text-slate-900'
									aria-label='Facebook'
								>
									<FaFacebookF className='size-5' aria-hidden />
								</Link>
								<Link
									href='https://tiktok.com'
									target='_blank'
									rel='noreferrer'
									className='inline-flex size-11 items-center justify-center rounded-xl bg-slate-50 text-slate-700 ring-1 ring-slate-900/5 transition-colors hover:bg-slate-100 hover:text-slate-900'
									aria-label='TikTok'
								>
									<FaTiktok className='size-5' aria-hidden />
								</Link>
							</div>
						</div>
					</aside>
				</div>
			</section>
		</div>
	)
}

