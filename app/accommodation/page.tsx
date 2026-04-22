import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Проживання та житло в Поляні',
	description:
		'Зняти житло в Поляні, Закарпаття: готелі, садиби, апартаменти й бази відпочинку. Огляд варіантів розміщення на курорті.',
	pathname: '/accommodation',
})

export default function AccommodationPage() {
	return (
		<PagePlaceholder
			title='Проживання'
			description='Сторінка для готелів, садиб, апартаментів і бронювання проживання у Поляні.'
		/>
	)
}
