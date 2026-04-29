import CampsPageContent from '@/components/camps/CampsPageContent'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Табори відпочинку в Поляні — літні та зимові зміни',
	description:
		'Табори на курорті Поляна: літні програми, зимові канікули — опис заїздів, діапазон віку, дати й орієнтовні ціни.',
	pathname: '/camps',
})

export default function CampsPage() {
	return (
		<div className='flex min-h-0 flex-col'>
			<CampsPageContent />
		</div>
	)
}
