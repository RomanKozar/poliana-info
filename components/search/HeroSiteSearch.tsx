'use client'

import Link from 'next/link'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { searchSite } from '@/lib/site-search'

const HERO_SEARCH_RESET_EVENT = 'polyana:hero-search-reset'

type HeroSiteSearchProps = {
	placeholderLabel: string
}

export default function HeroSiteSearch({ placeholderLabel }: HeroSiteSearchProps) {
	const inputId = useId()
	const [query, setQuery] = useState('')
	const [open, setOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const blurTimerRef = useRef<number | null>(null)

	const results = useMemo(() => searchSite(query, 8), [query])

	useEffect(() => {
		const onReset = () => {
			setQuery('')
			setOpen(false)
		}
		window.addEventListener(HERO_SEARCH_RESET_EVENT, onReset)
		return () => {
			window.removeEventListener(HERO_SEARCH_RESET_EVENT, onReset)
			if (blurTimerRef.current) window.clearTimeout(blurTimerRef.current)
		}
	}, [])

	const scheduleClose = () => {
		if (blurTimerRef.current) window.clearTimeout(blurTimerRef.current)
		blurTimerRef.current = window.setTimeout(() => setOpen(false), 140)
	}

	return (
		<div ref={containerRef} className='hero-input-container min-w-0 flex-1 sm:w-[460px] sm:flex-none'>
			<input
				id={inputId}
				type='text'
				placeholder=' '
				className='hero-input-field'
				value={query}
				onChange={e => {
					setQuery(e.target.value)
					setOpen(true)
				}}
				onFocus={() => setOpen(true)}
				onBlur={scheduleClose}
				onKeyDown={e => {
					if (e.key === 'Escape') {
						setOpen(false)
						;(e.currentTarget as HTMLInputElement).blur()
					}
				}}
				aria-autocomplete='list'
				aria-expanded={open}
				aria-controls={`${inputId}-results`}
				autoComplete='off'
				spellCheck={false}
			/>
			<label htmlFor={inputId} className='hero-input-label'>
				{placeholderLabel}
			</label>
			<span className='hero-input-underline' />

			{open && query.trim().length > 0 ? (
				<div
					id={`${inputId}-results`}
					role='listbox'
					className='absolute left-0 right-0 top-full z-[80] mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg ring-1 ring-slate-900/5'
					onMouseDown={e => {
						// Keep focus while clicking results.
						e.preventDefault()
					}}
				>
					{results.length ? (
						<ul className='max-h-[min(50vh,22rem)] overflow-y-auto py-1'>
							{results.map(r => (
								<li key={r.href} role='option' aria-selected={false}>
									<Link
										href={r.href}
										className='block px-4 py-3 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900'
										onClick={() => setOpen(false)}
									>
										<p className='font-semibold text-[#2D333D]'>{r.title}</p>
										{r.section ? (
											<p className='mt-0.5 text-xs text-slate-500'>{r.section}</p>
										) : null}
									</Link>
								</li>
							))}
						</ul>
					) : (
						<div className='px-4 py-4 text-sm text-slate-600'>
							Нічого не знайдено. Спробуйте інший запит.
						</div>
					)}

					<div className='border-t border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600'>
						Порада: шукайте “готель”, “чани”, “табір”, “форель”, “контакти”.
					</div>
				</div>
			) : null}
		</div>
	)
}

