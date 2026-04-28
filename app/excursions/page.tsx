import ExcursionsPageContent from '@/components/excursions/ExcursionsPageContent'
import { excursionsPageKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Екскурсії в Поляні та Карпатах — карта маршрутів',
	description:
		'Екскурсії в Поляні та околицях: квадроцикли Quadro Ride, маршрути в гори, прогулянки Поляною. Описи, орієнтовні ціни та карта старту біля курорту на Закарпатті.',
	pathname: '/excursions',
	keywords: excursionsPageKeywords,
})

export default function ExcursionsPage() {
	return (
		<div className='excursions-page flex min-h-0 flex-col'>
			<ExcursionsPageContent />
		</div>
	)
}
