import ExcursionsPageContent from '@/components/excursions/ExcursionsPageContent'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Екскурсії Поляною та в Карпатах',
	description:
		'Екскурсії на квадроциклах, маршрути в гори та прогулянки Поляною: описи, ціни та карта точок старту біля Поляни, Закарпаття.',
	pathname: '/excursions',
})

export default function ExcursionsPage() {
	return (
		<div className='excursions-page flex min-h-0 flex-col'>
			<ExcursionsPageContent />
		</div>
	)
}
