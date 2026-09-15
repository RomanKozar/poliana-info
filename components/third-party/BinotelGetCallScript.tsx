'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

/** Якщо в консолі: localStorage.setItem('polyana_hide_binotel_getcall','1'); location.reload() */
export const BINOTEL_GETCALL_LOCALSTORAGE_HIDE_KEY = 'polyana_hide_binotel_getcall'

/** URL віджету GetCall з листа Binotel (можна перевизначити через NEXT_PUBLIC_BINOTEL_GETCALL_SRC). */
export const BINOTEL_GETCALL_SCRIPT_SRC =
	process.env.NEXT_PUBLIC_BINOTEL_GETCALL_SRC?.trim() ||
	'https://widgets.binotel.com/getcall/widgets/om32a54jvavta3ccsaug.js'

/**
 * Binotel GetCall — кнопка «замовити дзвінок» на всіх сторінках.
 * Працює разом із Tawk.to: на мобільному обидві кнопки внизу (див. app/globals.css).
 *
 * Вимкнути для всіх: NEXT_PUBLIC_BINOTEL_GETCALL_DISABLED=true
 */
export default function BinotelGetCallScript() {
	const [loadWidget, setLoadWidget] = useState(false)

	useEffect(() => {
		if (process.env.NEXT_PUBLIC_BINOTEL_GETCALL_DISABLED === 'true') {
			return
		}
		try {
			if (typeof window.localStorage !== 'undefined') {
				if (window.localStorage.getItem(BINOTEL_GETCALL_LOCALSTORAGE_HIDE_KEY) === '1') {
					return
				}
			}
		} catch {
			/* приватний режим / недоступний storage */
		}
		setLoadWidget(true)
	}, [])

	if (!loadWidget) {
		return null
	}

	return (
		<Script
			id='binotel-getcall-widget'
			src={BINOTEL_GETCALL_SCRIPT_SRC}
			strategy='lazyOnload'
		/>
	)
}
