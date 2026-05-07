import VelykyiVerkhDetailPage from '@/components/excursions/VelykyiVerkhDetailPage'
import { velykyiVerkhExcursionKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Гора Поляна Кохання — оглядова точка (екскурсія)',
	description:
		'Гора Поляна Кохання біля Поляни (Закарпаття): панорами, фото та короткий підйом. Фото, опис і карта.',
	pathname: '/excursions/mountains/velykyi-verkh',
	keywords: velykyiVerkhExcursionKeywords,
})

export default function VelykyiVerkhExcursionPage() {
	return (
		<div className='velykyi-verkh-excursion-page flex min-h-0 flex-col'>
			<VelykyiVerkhDetailPage />
		</div>
	)
}

