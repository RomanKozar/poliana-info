import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Дитячі табори на Закарпатті',
	description:
		'Дитячі табори в Поляні та околицях: програми, дати, вартість і поради щодо вибору зміни. Безпечний відпочинок у Карпатах.',
	pathname: '/kids-camps',
})

export default function KidsCampsPage() {
	return (
		<PagePlaceholder
			title='Дитячі табори'
			description='Сторінка для програм таборів, змін, вартості та заявок для дітей і підлітків.'
		/>
	)
}
