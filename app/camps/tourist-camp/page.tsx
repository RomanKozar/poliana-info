import TouristCampPageContent from '@/components/camps/TouristCampPageContent'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Туристичний дитячий заїзд у Поляні — маршрути, орієнтування, програма зміни',
	description:
		'Піший туризм у Карпатах біля Поляни: походи різної тривалості, читання карти й просте орієнтування, етика на стежці й безпека в групі, побут бази курорту. Дати 29.07–06.08. Деталі на офіційному сайті програми.',
	pathname: '/camps/tourist-camp',
	keywords: [
		'туристичний табір Поляна',
		'дитячий туризм Карпати',
		'орієнтування табір Закарпаття',
		'маршрути біля Поляни для дітей',
	],
})

export default function TouristCampPage() {
	return (
		<div className='flex min-h-0 flex-col'>
			<TouristCampPageContent />
		</div>
	)
}
