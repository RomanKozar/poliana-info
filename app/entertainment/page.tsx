import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Розваги та активності в Поляні',
	description:
		'Куди піти в Поляні: екскурсії, тюбінг, лижі, веломаршрути та сімейні розваги на Закарпатті. Ідеї для активного відпочинку.',
	pathname: '/entertainment',
})

export default function EntertainmentPage() {
	return (
		<PagePlaceholder
			title='Розваги'
			description='Сторінка для активностей, екскурсій, подій та сімейних форматів дозвілля.'
		/>
	)
}
