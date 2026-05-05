import TroutPageContent from '@/components/gastronomy/TroutPageContent'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Про форель у Поляні — риболовля, ресторан, карта',
	description:
		'Форелева риболовля й страви з форелі Закарпаття біля Поляни. Галерея фото, умови для груп і туристів, номер із шапки сайту та карта — де знайти.',
	pathname: '/trout',
	keywords: [
		'форель Поляна',
		'риболовля форель',
		'restoran trout poliana',
		'поляна закарпаття',
	],
})

export default function TroutPage() {
	return <TroutPageContent />
}

