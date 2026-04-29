import TheaterCampPageContent from '@/components/camps/TheaterCampPageContent'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Театральний дитячий заїзд у Поляні — театр, ролі, майстерні, програма зміни',
	description:
		'Театральна зміна в горах: акторська лабораторія, створення образу, робота з голосом і текстом, прогулянки в Карпатах, підсумкова вистава для друзів зміни. Дати 18.07–26.07. Деталі на офіційному сайті програми.',
	pathname: '/camps/theater-camp',
	keywords: [
		'театральний табір Поляна',
		'дитячий театр Карпати',
		'театральний заїзд Закарпаття',
		'літній театр для дітей Поляна',
	],
})

export default function TheaterCampPage() {
	return (
		<div className='flex min-h-0 flex-col'>
			<TheaterCampPageContent />
		</div>
	)
}
