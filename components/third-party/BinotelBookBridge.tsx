'use client'

import { useCallback, useEffect, useState } from 'react'
import BottomStatusToast from '@/components/shared/BottomStatusToast'
import { binotelCallWasAccepted, closeBinotelWindows, handleBinotelBookClick } from '@/lib/open-binotel-booking'

const CALL_ACCEPTED_MESSAGE = 'Очікуйте на дзвінок. Ми вже телефонуємо.'

/** Кнопки «Забронювати» в картках карти зібрані як HTML, тож клік ловимо тут. */
export default function BinotelBookBridge() {
	const [noticeOpen, setNoticeOpen] = useState(false)
	const closeNotice = useCallback(() => setNoticeOpen(false), [])

	useEffect(() => {
		let lockedUntil = 0
		const acceptCall = () => {
			if (!binotelCallWasAccepted() || Date.now() < lockedUntil) return
			lockedUntil = Date.now() + 4000
			closeBinotelWindows()
			window.setTimeout(() => setNoticeOpen(true), 0)
		}
		const onClick = (event: MouseEvent) => {
			const target = event.target
			if (!(target instanceof Element)) return
			const button = target.closest('.polyana-binotel-book')
			if (!button) return
			event.preventDefault()
			event.stopPropagation()
			const description =
				button.getAttribute('data-binotel-description') || 'Кнопка Забронювати на сайті'
			const tel = button.getAttribute('data-binotel-tel') || '0502149266'
			handleBinotelBookClick(description, tel)
		}
		const observer = new MutationObserver(acceptCall)
		observer.observe(document.body, { childList: true, subtree: true, characterData: true })
		document.addEventListener('click', onClick, true)
		return () => {
			observer.disconnect()
			document.removeEventListener('click', onClick, true)
		}
	}, [])

	return (
		<BottomStatusToast
			open={noticeOpen}
			onClose={closeNotice}
			message={CALL_ACCEPTED_MESSAGE}
			id='binotel-call-accepted'
			className='z-[100000]'
		/>
	)
}
