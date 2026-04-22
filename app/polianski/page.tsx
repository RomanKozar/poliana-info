import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'PolianSki — гірськолижний курорт Поляна',
	description:
		'Гірськолижний відпочинок у Поляні: траси, підйомники, прокат спорядження та зимові активності на курорті Сонячна Поляна.',
	pathname: '/polianski',
})

export default function PolianSkiPage() {
	return (
		<PagePlaceholder
			title='PolianSki'
			description='Сторінка для гірськолижного напрямку. Тут буде контент про траси, підйомники, прокат і сезонні активності.'
		/>
	)
}
