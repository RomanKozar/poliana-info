import TouristCampPageContent from '@/components/camps/TouristCampPageContent'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Туристичний дитячий заїзд у Поляні - друга зміна, маршрути та програма',
	description:
		'Друга літня зміна туристичного табору біля Поляни: походи, карта й орієнтування, безпека в групі, побут на базі курорту. Дати 09.08–17.08. Деталі на офіційному сайті програми.',
	pathname: '/camps/tourist-camp-2',
	keywords: [
		'туристичний табір Поляна друга зміна',
		'дитячий туризм Карпати серпень',
		'табір Закарпаття 09.08',
		'маршрути біля Поляни для дітей',
	],
})

export default function TouristCamp2Page() {
	return (
		<div className='flex min-h-0 flex-col'>
			<TouristCampPageContent campId='tourist-camp-2' />
		</div>
	)
}
