import type { Metadata } from 'next'
import { Suspense } from 'react'
import { definePageMetadata } from '@/lib/seo'
import SearchPageClient from './SearchPageClient'

export const metadata: Metadata = definePageMetadata({
	title: 'Пошук — готелі, чани, екскурсії Поляни',
	description:
		'Пошук по POLYANA.INFO: готелі й житло в Поляні, чани та SPA, екскурсії в гори й квадроцикли Quadro Ride, дитячі табори та розваги. Туристичний портал Закарпаття.',
	pathname: '/search',
	keywords: [
		'пошук Поляна',
		'POLYANA.INFO пошук',
		'готелі Поляна',
		'чани Поляна',
		'екскурсії Поляна',
		'SPA Поляна',
		'квадроцикли Поляна',
	],
})

export default function SearchPage() {
	return (
		<div className='w-full bg-[#F5F6F7]'>
			<section className='mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
				<h1 className='text-3xl font-black tracking-tight text-[#2D333D] sm:text-4xl'>Пошук</h1>
				<Suspense fallback={<div className='mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 sm:p-8' />}>
					<SearchPageClient />
				</Suspense>
			</section>
		</div>
	)
}
