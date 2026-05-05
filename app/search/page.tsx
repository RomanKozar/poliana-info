'use client'

import Link from 'next/link'
import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { searchSite } from '@/lib/site-search'

function SearchResults() {
	const params = useSearchParams()
	const q = params.get('q') ?? ''
	const results = useMemo(() => searchSite(q, 50), [q])

	return (
		<>
			<p className='mt-2 text-sm text-slate-700 sm:text-base'>
				Запит: <span className='font-semibold text-[#2D333D]'>{q || '—'}</span>
			</p>

			<div className='mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 sm:p-8'>
				{q.trim().length === 0 ? (
					<p className='text-sm text-slate-700'>
						Введіть запит у адресному рядку: <span className='font-semibold'>/search?q=...</span>
					</p>
				) : results.length ? (
					<ul className='divide-y divide-slate-100'>
						{results.map(r => (
							<li key={r.href} className='py-4'>
								<Link href={r.href} className='group block'>
									<p className='text-base font-extrabold text-[#2D333D] group-hover:text-[#2FAFC8]'>
										{r.title}
									</p>
									{r.section ? (
										<p className='mt-1 text-sm text-slate-600'>{r.section}</p>
									) : (
										<p className='mt-1 text-sm text-slate-600'>{r.href}</p>
									)}
								</Link>
							</li>
						))}
					</ul>
				) : (
					<p className='text-sm text-slate-700'>Нічого не знайдено.</p>
				)}
			</div>
		</>
	)
}

export default function SearchPage() {
	return (
		<div className='w-full bg-[#F5F6F7]'>
			<section className='mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
				<h1 className='text-3xl font-black tracking-tight text-[#2D333D] sm:text-4xl'>Пошук</h1>
				<Suspense fallback={<div className='mt-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-900/5 sm:p-8' />}>
					<SearchResults />
				</Suspense>
			</section>
		</div>
	)
}

