import VedmezhaDetailPage from '@/components/excursions/VedmezhaDetailPage'
import { vedmezhaExcursionKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Гора Ведмежа — маршрут біля Поляни (екскурсія)',
	description:
		'Гора Ведмежа (Уклин, Закарпаття): маршрут через лісові ділянки з виходом на відкриті схили. Фото, опис і карта.',
	pathname: '/excursions/mountains/vedmezha',
	keywords: vedmezhaExcursionKeywords,
})

export default function VedmezhaExcursionPage() {
	return (
		<div className='vedmezha-excursion-page flex min-h-0 flex-col'>
			<VedmezhaDetailPage />
		</div>
	)
}

