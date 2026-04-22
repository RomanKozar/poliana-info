import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Табори відпочинку в Поляні',
	description:
		'Дитячі та сімейні табори відпочинку в Поляні: програми, зміни, активності в Карпатах. Корисна інформація для батьків.',
	pathname: '/camps',
})

export default function CampsPage() {
	return (
		<PagePlaceholder
			title='Табори відпочинку'
			description='Сторінка для дитячих і сімейних таборів відпочинку. Тут буде структура з програмами, датами, цінами та формою заявки.'
		/>
	)
}
