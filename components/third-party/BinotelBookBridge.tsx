'use client'

import { useEffect } from 'react'
import { handleBinotelBookClick } from '@/lib/open-binotel-booking'

/** Кнопки «Забронювати» в картках карти зібрані як HTML, тож клік ловимо тут. */
export default function BinotelBookBridge() {
	useEffect(() => {
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
		document.addEventListener('click', onClick, true)
		return () => document.removeEventListener('click', onClick, true)
	}, [])

	return null
}
