import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Оздоровлення та санаторії Поляни',
	description:
		'Санаторій «Сонячне Закарпаття» та інші формати оздоровлення в Поляні: мінеральні води, процедури та відновлення.',
	pathname: '/wellness',
})

export default function WellnessPage() {
	return (
		<PagePlaceholder
			title='Оздоровлення'
			description='Сторінка для санаторіїв, SPA і програм відновлення. Далі тут можна додати фільтри, пакети послуг та бронювання.'
		/>
	)
}
