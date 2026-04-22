import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'SPA та відпочинок у Поляні',
	description:
		'SPA, басейни, масажі та оздоровчі процедури в Поляні. Де розслабитися після лиж або прогулянок у Карпатах.',
	pathname: '/spa',
})

export default function SpaPage() {
	return (
		<PagePlaceholder
			title='SPA та відпочинок'
			description='Сторінка для SPA-комплексів, басейнів, оздоровчих процедур і форматів відпочинку.'
		/>
	)
}
