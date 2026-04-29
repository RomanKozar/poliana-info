import PolianskiCampPageContent from '@/components/camps/PolianskiCampPageContent'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Літні зміни PolianskiCamp у Поляні — програма To BE(e) Camp, харчування, галерея',
	description:
		'Що чекає дітей у літній зміні PolianskiCamp: пригоди, творчість, режим дня, харчування в «Катерині», безпека та фото галерея.',
	pathname: '/camps/polianski-camp',
	keywords: [
		'PolianskiCamp',
		'дитячий табір Поляна',
		'To BE(e) Camp',
		'літній табір Закарпаття',
	],
})

export default function PolianskiCampPage() {
	return (
		<div className='flex min-h-0 flex-col'>
			<PolianskiCampPageContent />
		</div>
	)
}
