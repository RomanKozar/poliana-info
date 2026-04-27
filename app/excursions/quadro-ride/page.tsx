import QuadroRideDetailPage from '@/components/excursions/QuadroRideDetailPage'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Quadro Ride — квадроцикли біля Поляни',
	description:
		'Детальний опис турів Quadro Ride у Карпатах: маршрути Легкий старт, Релакс, Виклик, Адреналін, правила, фото та карта для побудови шляху від Поляни.',
	pathname: '/excursions/quadro-ride',
})

export default function QuadroRidePage() {
	return (
		<div className='quadro-ride-page flex min-h-0 flex-col'>
			<QuadroRideDetailPage />
		</div>
	)
}
