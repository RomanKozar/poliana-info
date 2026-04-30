'use client'

import { useEffect } from 'react'

export const BOOKING_NOTICE_MESSAGE = 'Очікуйте старт бронювання'

/** Повідомлення для розділів у розробці (головна, екскурсії тощо) */
export const WIP_SECTION_TOAST_MESSAGE = 'Ця вкладка ще знаходиться в стадії розробки!'

type Props = {
	open: boolean
	onClose: () => void
	/** За замовчуванням — текст як у картках таборів */
	message?: string
	id?: string
	durationMs?: number
}

export default function BottomStatusToast({
	open,
	onClose,
	message = BOOKING_NOTICE_MESSAGE,
	id,
	durationMs = 4200,
}: Props) {
	useEffect(() => {
		if (!open) return
		const t = window.setTimeout(onClose, durationMs)
		return () => window.clearTimeout(t)
	}, [open, onClose, durationMs])

	if (!open) return null

	return (
		<div
			{...(id ? { id } : {})}
			className='fixed bottom-6 left-1/2 z-[100] max-w-[min(90vw,24rem)] -translate-x-1/2 rounded-full bg-[#F3A169] px-4 py-2.5 text-center text-sm font-bold text-white shadow-lg'
			role='status'
		>
			{message}
		</div>
	)
}
