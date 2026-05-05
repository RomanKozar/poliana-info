import { definePageMetadata } from '@/lib/seo'
import ContactsPageContent from '@/components/pages/ContactsPageContent'

export const metadata = definePageMetadata({
	title: 'Контакти Polyana.info',
	description:
		'Звʼяжіться з командою POLYANA.INFO: телефон, електронна пошта, соцмережі та зручна форма зворотного звʼязку.',
	pathname: '/contacts',
})

export default function ContactsPage() {
	return <ContactsPageContent />
}
