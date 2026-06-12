'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaMapMarkerAlt, FaTimes } from 'react-icons/fa'
import { ExcursionRouteMap } from '@/components/excursions/ExcursionRouteModal'
import type { ExcursionListing } from '@/data/excursions-page'

const POLYANA_EXCURSION_START = { lat: 48.62147942660388, lng: 22.96695606419427 } as const

const carouselBtnClass =
	'flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white shadow-md transition duration-200 hover:scale-110 hover:bg-black/65 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#53C4DA]'

function ModalGallery({ images, alt }: { images: string[]; alt: string }) {
	const [index, setIndex] = useState(0)
	const touchStartX = useRef<number | null>(null)
	const n = images.length
	const canSlide = n > 1

	const go = useCallback(
		(delta: number) => {
			setIndex(i => (i + delta + n) % n)
		},
		[n],
	)

	if (n === 0) return null

	return (
		<div
			className='group/modal-gallery relative aspect-[4/3] w-full overflow-hidden bg-slate-900 sm:aspect-[16/10]'
			onTouchStart={e => {
				touchStartX.current = e.touches[0].clientX
			}}
			onTouchEnd={e => {
				if (!canSlide) return
				const start = touchStartX.current
				if (start == null) return
				const dx = e.changedTouches[0].clientX - start
				touchStartX.current = null
				if (Math.abs(dx) < 40) return
				go(dx < 0 ? 1 : -1)
			}}
		>
			{images.map((src, i) => (
				<Image
					key={`${src}-${i}`}
					src={src}
					alt={i === index ? alt : ''}
					fill
					unoptimized
					className={`object-contain transition-opacity duration-300 ${
						i === index ? 'opacity-100' : 'pointer-events-none opacity-0'
					}`}
					sizes='(min-width: 1024px) 900px, 100vw'
					priority={i === 0}
				/>
			))}

			{canSlide ? (
				<>
					<button type='button' onClick={() => go(-1)} className={`absolute left-3 top-1/2 z-[2] -translate-y-1/2 ${carouselBtnClass}`} aria-label='Попереднє фото'>
						<FaChevronLeft className='size-4 transition-transform duration-200 group-hover/modal-gallery:scale-110' aria-hidden />
					</button>
					<button type='button' onClick={() => go(1)} className={`absolute right-3 top-1/2 z-[2] -translate-y-1/2 ${carouselBtnClass}`} aria-label='Наступне фото'>
						<FaChevronRight className='size-4 transition-transform duration-200 group-hover/modal-gallery:scale-110' aria-hidden />
					</button>
					<div className='pointer-events-none absolute bottom-3 left-1/2 z-[2] flex -translate-x-1/2 gap-1.5' aria-hidden>
						{images.map((_, i) => (
							<span
								key={`dot-${i}`}
								className={`h-1.5 rounded-full transition-all duration-300 ${
									i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
								}`}
							/>
						))}
					</div>
					<p className='pointer-events-none absolute right-3 top-3 z-[2] rounded-full bg-black/45 px-2.5 py-1 text-xs font-medium tabular-nums text-white'>
						{index + 1} / {n}
					</p>
				</>
			) : null}
		</div>
	)
}

export default function BusExcursionDetailModal({
	item,
	open,
	onClose,
}: {
	item: ExcursionListing | null
	open: boolean
	onClose: () => void
}) {
	useEffect(() => {
		if (!open) return
		const prevOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = prevOverflow
		}
	}, [open])

	useEffect(() => {
		if (!open) return
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}
		window.addEventListener('keydown', onKeyDown)
		return () => window.removeEventListener('keydown', onKeyDown)
	}, [open, onClose])

	if (!open || !item) return null

	const images = item.images?.length ? item.images : item.image ? [item.image] : []
	const routeStart = item.route?.start ?? POLYANA_EXCURSION_START
	const routeEnd = item.route?.end ?? item.position
	const routeStops = item.route?.stops
	const middleStops = routeStops?.filter((_, index) => index > 0 && index < (routeStops.length ?? 0) - 1) ?? []
	const waypointsParam =
		middleStops.length > 0 ? `&waypoints=${middleStops.map(s => `${s.lat},${s.lng}`).join('|')}` : ''
	const directionsHref = `https://www.google.com/maps/dir/?api=1&origin=${routeStart.lat},${routeStart.lng}&destination=${routeEnd.lat},${routeEnd.lng}${waypointsParam}&travelmode=driving`

	return createPortal(
		<div className='fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-4' role='dialog' aria-modal='true' aria-labelledby='bus-excursion-modal-title'>
			<button type='button' className='absolute inset-0 cursor-pointer bg-slate-900/45 backdrop-blur-sm' aria-label='Закрити' onClick={onClose} />
			<div className='relative z-[1] flex max-h-[min(96vh,920px)] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-2xl sm:rounded-2xl'>
				<div className='flex shrink-0 items-start justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-5'>
					<div className='min-w-0 pr-2'>
						<h2 id='bus-excursion-modal-title' className='text-lg font-bold text-[#2D333D] sm:text-xl'>
							{item.title}
						</h2>
						{item.priceHint || item.durationHint ? (
							<p className='mt-0.5 text-sm font-semibold text-[#53C4DA]'>
								{[item.priceHint, item.durationHint].filter(Boolean).join(' · ')}
							</p>
						) : null}
					</div>
					<button
						type='button'
						onClick={onClose}
						className='flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition duration-200 hover:scale-110 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#53C4DA]'
						aria-label='Закрити'
					>
						<FaTimes className='size-4 transition-transform duration-200 hover:rotate-90' aria-hidden />
					</button>
				</div>

				<div className='min-h-0 flex-1 overflow-y-auto'>
					{images.length > 0 ? <ModalGallery images={images} alt={item.title} /> : null}

					<div className='space-y-3 px-4 py-4 sm:px-5'>
						<p className='flex items-start gap-1.5 text-xs text-slate-500 sm:text-sm'>
							<FaMapMarkerAlt className='mt-0.5 size-3.5 shrink-0 text-[#53C4DA]' aria-hidden />
							<span>{item.address}</span>
						</p>
						{item.destinationIntro ? (
							<div className='rounded-lg border border-slate-200/80 bg-slate-50 px-3 py-2.5'>
								<p className='text-[11px] font-semibold uppercase tracking-wide text-[#53C4DA]'>Про місце</p>
								<div className='mt-1 space-y-2'>
									{item.destinationIntro.split('\n\n').map((paragraph, index) => (
										<p key={index} className='text-sm leading-relaxed text-slate-600'>
											{paragraph}
										</p>
									))}
								</div>
							</div>
						) : null}
						<p className='text-sm leading-relaxed text-slate-600'>{item.description}</p>
						{item.extraCosts ? <p className='text-xs leading-snug text-slate-500 sm:text-sm'>{item.extraCosts}</p> : null}
					</div>

					<div className='border-t border-slate-200 px-4 py-4 sm:px-5'>
						<ExcursionRouteMap
							title='Маршрут'
							start={item.route?.start ?? POLYANA_EXCURSION_START}
							end={item.route?.end ?? item.position}
							path={item.route?.path}
							stops={item.route?.stops}
						/>
						<a
							href={directionsHref}
							target='_blank'
							rel='noopener noreferrer'
							className='mt-3 inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#53C4DA]/30 bg-[#53C4DA]/5 px-3 py-2 text-sm font-semibold text-[#2D333D] transition duration-200 hover:scale-[1.02] hover:border-[#53C4DA]/50 hover:bg-[#53C4DA]/10 active:scale-[0.98]'
						>
							<FaExternalLinkAlt className='size-3.5 text-[#53C4DA] transition-transform duration-200 group-hover:translate-x-0.5' aria-hidden />
							Відкрити маршрут у Google Maps
						</a>
					</div>
				</div>
			</div>
		</div>,
		document.body,
	)
}
