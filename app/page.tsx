import Image from 'next/image'

export default function Home() {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
	const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
	const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)
	const projectRef = supabaseUrl?.replace('https://', '').split('.')[0]

	return (
		<div className='min-h-screen flex flex-col justify-between items-center bg-[#F9FAF9] text-[#064E3B] font-sans px-4 py-6 sm:p-6'>
			<main className='flex-1 flex flex-col justify-center max-w-2xl w-full items-center text-center space-y-6 sm:space-y-8 my-8'>
				{/* Блок Логотипу */}
				<div className='flex flex-col items-center mb-1'>
					<div className='relative transition-transform duration-500 hover:scale-105'>
						<Image
							src='/Poliana_info.png'
							alt='Poliana Info Logo'
							// Збільшуємо базові розміри
							width={320}
							height={100}
							// Додаємо класи для адаптивного розміру на різних екранах
							className='w-[200px] h-auto sm:w-[320px] md:w-[400px]'
							priority
						/>
					</div>
				</div>

				{/* Головні заголовки */}
				<div className='space-y-4'>
					<h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight'>
						Повна склянка вражень
					</h1>
					<p className='text-base sm:text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed px-2 opacity-90'>
						Від мінеральної води до сучасного відпочинку серед природи.
					</p>
					<p className='text-sm sm:text-base opacity-75 max-w-lg mx-auto'>
						Поляна — це не лише джерело, це повний досвід. Тут є все — і навіть
						більше, ніж очікуєш.
					</p>
				</div>

				{/* Блоки-тизери (Контейнери досвіду) */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full mt-6 sm:mt-8'>
					<div className='bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-emerald-100/50 flex flex-col items-center justify-center transition-all hover:border-[#FF6F61]/30'>
						<span className='text-2xl sm:text-3xl mb-1 sm:mb-2'>🏔️</span>
						<span className='text-xs sm:text-sm font-semibold uppercase tracking-wide'>
							PolianSki
						</span>
					</div>
					<div className='bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-emerald-100/50 flex flex-col items-center justify-center transition-all hover:border-[#FF6F61]/30'>
						<span className='text-2xl sm:text-3xl mb-1 sm:mb-2'>🍽️</span>
						<span className='text-xs sm:text-sm font-semibold uppercase tracking-wide'>
							Гастрономія
						</span>
					</div>
					<div className='bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-emerald-100/50 flex flex-col items-center justify-center transition-all hover:border-[#FF6F61]/30'>
						<span className='text-2xl sm:text-3xl mb-1 sm:mb-2'>🏕️</span>
						<span className='text-xs sm:text-sm font-semibold uppercase tracking-wide'>
							Табори
						</span>
					</div>
					<div className='bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-sm border border-emerald-100/50 flex flex-col items-center justify-center transition-all hover:border-[#FF6F61]/30'>
						<span className='text-2xl sm:text-3xl mb-1 sm:mb-2 text-[#FF6F61]'>
							💧
						</span>
						<span className='text-xs sm:text-sm font-semibold uppercase tracking-wide'>
							Оздоровлення
						</span>
					</div>
				</div>

				{/* Кнопка (Кораловий акцент) */}
				<div className='pt-4 sm:pt-8 w-full sm:w-auto'>
					<div className='w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold tracking-wide text-white transition-all duration-200 bg-[#FF6F61] border border-transparent rounded-full hover:bg-[#e85b4d] hover:shadow-lg hover:shadow-[#FF6F61]/20 active:scale-95 cursor-default'>
						Сайт у розробці
					</div>
				</div>

				{/* Перевірка підключення до Supabase */}
				<div className='w-full bg-white p-4 rounded-xl sm:rounded-2xl shadow-sm border border-emerald-100/50 text-left'>
					<p className='text-sm font-semibold mb-2'>Статус Supabase</p>
					{isSupabaseConfigured ? (
						<>
							<p className='text-xs sm:text-sm text-emerald-700 mb-1'>
								Supabase підключено. Конфігурація збережена у проєкті.
							</p>
							<p className='text-xs sm:text-sm opacity-75'>
								Project ref:{' '}
								<span className='font-semibold'>{projectRef ?? 'невідомо'}</span>
							</p>
						</>
					) : (
						<p className='text-xs sm:text-sm text-red-600'>
							Не знайдено `NEXT_PUBLIC_SUPABASE_URL` або
							`NEXT_PUBLIC_SUPABASE_ANON_KEY` у `.env.local`.
						</p>
					)}
				</div>
			</main>

			{/* Футер */}
			<footer className='w-full text-center text-xs sm:text-sm opacity-60 mt-4 font-medium'>
				© {new Date().getFullYear()} POLIANA.INFO. Туристична дестинація №1.
			</footer>
		</div>
	)
}
