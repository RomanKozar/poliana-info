import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Форель і гастрономія Поляни',
	description:
		'Форелеві господарства, рибалка та закарпатська кухня біля Поляни. Де смачно поїсти й спробувати локальні страви.',
	pathname: '/gastronomy',
})

export default function GastronomyPage() {
	return (
		<PagePlaceholder
			title='Форель'
			description='Сторінка для форелевих господарств, риболовлі, дегустацій та відпочинку біля водойм у Поляні.'
		/>
	)
}
