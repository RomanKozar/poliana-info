import QuestCampPageContent from '@/components/camps/QuestCampPageContent'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Квестовий дитячий табір у Поляні — командні квести, загадки, програма зміни',
	description:
		'Сюжетний квест у командах, кодові станції з ребусами, прогулянки біля Поляни, творчі паузи та комфорт курорту. Дати зміни 05.07–11.07. Деталі на офіційному сайті програми.',
	pathname: '/camps/quest-camp',
	keywords: [
		'квестовий табір Поляна',
		'дитячий квест Карпати',
		'табір загадки Закарпаття',
		'командний квест для дітей Поляна',
	],
})

export default function QuestCampPage() {
	return (
		<div className='flex min-h-0 flex-col'>
			<QuestCampPageContent />
		</div>
	)
}
