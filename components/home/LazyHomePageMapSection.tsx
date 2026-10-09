'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const HomePageMapSection = dynamic(() => import('@/components/home/HomePageMapSection'), {
	ssr: false,
})

function MapSectionPlaceholder() {
	return (
		<section
			id='polyana-map'
			className='bg-[#F5F6F7] px-4 pb-4 pt-4 sm:px-16 lg:px-24'
			style={{ scrollMarginTop: 'calc(var(--header-offset, 68px) + 12px)' }}
		>
			<div className='mx-auto w-full max-w-7xl'>
				<h2 className='mb-4 text-2xl font-bold text-[#2D333D]'>Карта готелів та магазинів Поляни</h2>
				<div
					className='h-[420px] w-full animate-pulse rounded-2xl bg-slate-200/90 ring-1 ring-slate-900/5'
					aria-hidden
				/>
			</div>
		</section>
	)
}

function shouldEagerLoadHomeMapFromLocation(): boolean {
	if (typeof window === 'undefined') return false
	const params = new URLSearchParams(window.location.search)
	if (params.get('mapPlace')?.trim()) return true
	if (params.get('mapLayer')?.trim()) return true
	if (window.location.hash === '#polyana-map') return true
	return false
}

/**
 * Карта й Google Maps API підвантажуються лише біля viewport (або одразу для ?mapPlace / #polyana-map).
 */
export default function LazyHomePageMapSection() {
	const sentinelRef = useRef<HTMLDivElement>(null)
	const [loadMap, setLoadMap] = useState(false)

	useEffect(() => {
		if (shouldEagerLoadHomeMapFromLocation()) {
			setLoadMap(true)
		}
	}, [])

	useEffect(() => {
		if (loadMap) return

		const onHash = () => {
			if (window.location.hash === '#polyana-map') setLoadMap(true)
		}
		onHash()
		window.addEventListener('hashchange', onHash)
		return () => window.removeEventListener('hashchange', onHash)
	}, [loadMap])

	useEffect(() => {
		if (loadMap) return
		const el = sentinelRef.current
		if (!el) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setLoadMap(true)
					observer.disconnect()
				}
			},
			{ rootMargin: '400px 0px', threshold: 0.01 }
		)
		observer.observe(el)
		return () => observer.disconnect()
	}, [loadMap])

	if (loadMap) {
		return <HomePageMapSection />
	}

	return (
		<div ref={sentinelRef}>
			<MapSectionPlaceholder />
		</div>
	)
}
