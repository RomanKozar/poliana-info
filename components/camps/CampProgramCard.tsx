'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useId, useState } from 'react'
import type { CampCardItem } from '@/data/home-page'

type Props = {
	camp: CampCardItem
	/** Трохи вища картка на сторінці /camps */
	variant?: 'home' | 'page'
	/** Показати повідомлення про майбутнє відкриття бронювання по кліку (наприклад на /camps) */
	bookingNoticeOnClick?: boolean
}

export default function CampProgramCard({
	camp,
	variant = 'home',
	bookingNoticeOnClick = false,
}: Props) {
	const imgH = variant === 'page' ? 'h-36 sm:h-40' : 'h-28'
	const [noticeOpen, setNoticeOpen] = useState(false)
	const noticeId = useId()

	const closeNotice = useCallback(() => setNoticeOpen(false), [])

	useEffect(() => {
		if (!noticeOpen) return
		const t = window.setTimeout(closeNotice, 4200)
		return () => window.clearTimeout(t)
	}, [noticeOpen, closeNotice])

	const cardBody = (
		<>
			<div className={`relative ${imgH}`}>
				<Image
					src={camp.image}
					alt={camp.title}
					fill
					sizes='(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 88vw'
					className='object-cover'
				/>
			</div>
			<div className='space-y-2 bg-white p-3'>
				<h3 className='text-sm font-bold text-[#2D333D] sm:text-base'>{camp.title}</h3>
				<p className='text-xs text-[#53C4DA]'>{camp.age}</p>
				<span className='inline-flex w-fit rounded-full bg-[#F3A169] px-2 py-0.5 text-[10px] font-bold tabular-nums text-white'>
					{camp.dates}
				</span>
				<p className='text-xs leading-snug text-slate-600'>{camp.description}</p>
				<p className='text-right text-sm font-bold text-[#E06D3C]'>{camp.price}</p>
			</div>
		</>
	)

	const cardClass =
		'cursor-pointer overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md'

	if (bookingNoticeOnClick) {
		return (
			<>
				<button
					type='button'
					onClick={() => setNoticeOpen(true)}
					className={`${cardClass} block w-full text-left outline-none ring-[#53C4DA] focus-visible:ring-2 focus-visible:ring-offset-2`}
					aria-describedby={noticeOpen ? noticeId : undefined}
				>
					{cardBody}
				</button>
				{noticeOpen ? (
					<div
						id={noticeId}
						className='fixed bottom-6 left-1/2 z-[100] max-w-[min(90vw,24rem)] -translate-x-1/2 rounded-full bg-[#F3A169] px-4 py-2.5 text-center text-sm font-bold text-white shadow-lg'
						role='status'
					>
						Очікуйте старт бронювання
					</div>
				) : null}
			</>
		)
	}

	if (camp.detailPath) {
		return (
			<Link
				href={camp.detailPath}
				className={`${cardClass} block outline-none ring-[#53C4DA] focus-visible:ring-2 focus-visible:ring-offset-2`}
				aria-label={`Детально про табір: ${camp.title}`}
			>
				{cardBody}
			</Link>
		)
	}

	return <article className={cardClass}>{cardBody}</article>
}
