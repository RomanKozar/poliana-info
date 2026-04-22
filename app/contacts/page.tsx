import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Контакти Polyana.info',
	description:
		'Звʼяжіться з командою POLYANA.INFO: телефон, електронна пошта, соцмережі та зручна форма зворотного звʼязку.',
	pathname: '/contacts',
})

export default function ContactsPage() {
	return (
		<PagePlaceholder
			title='Контакти'
			description='Сторінка для контактної інформації, мапи, соціальних мереж і форми зворотного звʼязку.'
		/>
	)
}
