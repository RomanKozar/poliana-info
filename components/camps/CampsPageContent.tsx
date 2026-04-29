import Link from 'next/link'
import { camps } from '@/data/home-page'
import CampProgramCard from '@/components/camps/CampProgramCard'

export default function CampsPageContent() {
	const summer = camps.filter(c => c.season === 'summer')
	const winter = camps.filter(c => c.season === 'winter')

	return (
		<div className='bg-[#F5F6F7]'>
			<section className='border-b border-slate-200/80 bg-gradient-to-br from-[#E8F4F8] via-white to-[#F5F6F7] px-4 py-10 sm:px-16 lg:px-24'>
				<div className='mx-auto max-w-4xl'>
					<h1 className='text-3xl font-extrabold tracking-tight text-[#2D333D] sm:text-4xl'>
						Табори відпочинку в Поляні
					</h1>
					<p className='mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base'>
						Підбірка літніх і зимових програм на курорті Поляна: короткий опис заїзду, діапазон віку, дати та
						орієнтовна вартість. Детальні сторінки кожної зміни з’являться згодом — актуальність уточнюйте
						перед записом через контакт у шапці сайту.
					</p>
					<p className='mt-3 text-xs text-slate-500'>
						<Link href='/' className='font-semibold text-[#53C4DA] underline-offset-4 hover:text-cyan-600 hover:underline'>
							На головну
						</Link>
					</p>
				</div>
			</section>

			<section className='mx-auto max-w-7xl px-4 py-10 sm:px-16 lg:px-24'>
				<h2 className='mb-6 text-xl font-bold text-[#2D333D] sm:text-2xl'>Літні табори й зміни</h2>
				<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
					{summer.map(item => (
						<CampProgramCard key={item.title + item.dates} camp={item} variant='page' />
					))}
				</div>
			</section>

			<section className='mx-auto max-w-7xl border-t border-slate-200/90 px-4 py-10 sm:px-16 lg:px-24'>
				<h2 className='mb-6 text-xl font-bold text-[#2D333D] sm:text-2xl'>Зима та канікули</h2>
				<p className='mb-6 max-w-3xl text-sm text-slate-600'>
					Зимові профілі змін — орієнтовно; перед стартом сезону ми оновимо дати та ціни.
				</p>
				<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
					{winter.map(item => (
						<CampProgramCard
							key={item.title + item.dates}
							camp={item}
							variant='page'
							bookingNoticeOnClick
						/>
					))}
				</div>
			</section>
		</div>
	)
}
