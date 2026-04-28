import QuadroRideDetailPage from '@/components/excursions/QuadroRideDetailPage'
import { quadroRideKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Квадроцикли в Поляні — Quadro Ride: маршрути та карта',
	description:
		'Квадроцикли в Поляні (Quadro Ride): тури Легкий старт, Релакс, Виклик, Адреналін. Правила безпеки, фото траси та карта — організувати поїздку від курортної зони Закарпаття.',
	pathname: '/excursions/quadro-ride',
	keywords: quadroRideKeywords,
})

export default function QuadroRidePage() {
	return (
		<div className='quadro-ride-page flex min-h-0 flex-col'>
			<QuadroRideDetailPage />
		</div>
	)
}
