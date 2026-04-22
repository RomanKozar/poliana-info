import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Новини та гіди про Поляну',
	description:
		'Новини курорту, сезонні гіди та корисні матеріали: куди піти в Поляні, що подивитися на Закарпатті та як спланувати відпочинок.',
	pathname: '/blog',
})

export default function BlogPage() {
	return (
		<PagePlaceholder
			title='Новини'
			description='Сторінка для новин, статей, гідів та корисних матеріалів про Поляну.'
		/>
	)
}
