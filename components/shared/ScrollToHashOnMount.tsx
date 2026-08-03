'use client'

import { useEffect } from 'react'

function scrollToHashTarget() {
	const id = window.location.hash.slice(1)
	if (!id) return
	const el = document.getElementById(id)
	if (!el) return
	requestAnimationFrame(() => {
		requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
	})
}

/** Плавна прокрутка до `#id` після переходу на сторінку (наприклад, з банера на головній). */
export default function ScrollToHashOnMount() {
	useEffect(() => {
		scrollToHashTarget()
		window.addEventListener('hashchange', scrollToHashTarget)
		return () => window.removeEventListener('hashchange', scrollToHashTarget)
	}, [])

	return null
}
