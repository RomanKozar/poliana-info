import ExcursionsPageContent from '@/components/excursions/ExcursionsPageContent'
import { excursionsPageKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Екскурсії та квадроцикли в Поляні — маршрути в гори',
	description:
		'Екскурсії в Поляні та Карпатах: квадроцикли Quadro Ride, піші маршрути в гори з Поляни, прогулянки курортом. Карта старту, описи та орієнтовні ціни на Закарпатті — POLYANA.INFO.',
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
