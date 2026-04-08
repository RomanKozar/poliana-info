import Image from 'next/image'

export default function Home() {
	return (
		<div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-cyan-50 to-white text-slate-800 font-sans p-6'>
			{/* Контейнер для контенту */}
			<main className='max-w-2xl w-full flex flex-col items-center text-center space-y-10'>
				{/* Логотип / Іконка краплі (поки що стилізоване коло/крапля на CSS) */}
				<div className='w-24 h-24 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-full rounded-tr-none rotate-45 shadow-lg shadow-blue-200 flex items-center justify-center mb-4'>
					<span className='-rotate-45 text-white font-bold text-2xl tracking-wider'>
						П
					</span>
				</div>

				{/* Головні заголовки */}
				<div className='space-y-4'>
					<h1 className='text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900'>
						Поляна відкривається по-новому
					</h1>
					<p className='text-lg sm:text-xl text-slate-600 max-w-xl mx-auto leading-relaxed'>
						Туристична дестинація №1 на Закарпатті. Ми готуємо для вас дещо
						особливе: від мінеральних джерел до сучасних гірськолижних спусків
						та дитячих таборів.
					</p>
				</div>

				{/* Блоки-тизери */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-8'>
					<div className='bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center'>
						<span className='text-2xl mb-2'>🏔️</span>
						<span className='text-sm font-medium'>PolianSki</span>
					</div>
					<div className='bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center'>
						<span className='text-2xl mb-2'>🍽️</span>
						<span className='text-sm font-medium'>Гастрономія</span>
					</div>
					<div className='bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center'>
						<span className='text-2xl mb-2'>🏕️</span>
						<span className='text-sm font-medium'>Табори</span>
					</div>
					<div className='bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center'>
						<span className='text-2xl mb-2'>💧</span>
						<span className='text-sm font-medium'>Оздоровлення</span>
					</div>
				</div>

				{/* Кнопка / Заклик до дії */}
				<div className='pt-8'>
					<div className='inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-full hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600'>
						Сайт у розробці
					</div>
				</div>
			</main>

			{/* Футер */}
			<footer className='absolute bottom-6 text-sm text-slate-400'>
				© {new Date().getFullYear()} Громада Поляна. Усі права захищено.
			</footer>
		</div>
	)
}
