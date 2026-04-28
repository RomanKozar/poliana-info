import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { entertainmentPageKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Розваги та активності в Поляні',
	description:
		'Куди піти в Поляні: екскурсії, квадроцикли, тюбінг, лижі, веломаршрути та розваги для сімей на Закарпатті. Ідеї активного відпочинку в Карпатах.',
	pathname: '/entertainment',
	keywords: entertainmentPageKeywords,
})

export default function EntertainmentPage() {
	return (
		<PagePlaceholder
			title='Розваги'
			description='Сторінка для активностей, екскурсій, подій та сімейних форматів дозвілля.'
		/>
	)
}
