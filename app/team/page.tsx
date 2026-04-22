import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Наша команда Polyana.info',
	description:
		'Команда туристичного порталу POLYANA.INFO: хто створює матеріали про Поляну та підтримує розвиток дестинації.',
	pathname: '/team',
})

export default function TeamPage() {
	return (
		<PagePlaceholder
			title='Наша команда'
			description='Сторінка команди Polyana.info. Тут згодом буде інформація про учасників команди, ролі та контакти.'
		/>
	)
}
