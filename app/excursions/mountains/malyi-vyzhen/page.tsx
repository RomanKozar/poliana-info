import VyzhynSmallDetailPage from '@/components/excursions/VyzhynSmallDetailPage'
import { vyzhynSmallExcursionKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Гора Малий Вижень — маршрут біля Поляни (екскурсія)',
	description:
		'Гора Малий Вижень біля Поляни (Закарпаття): компактний маршрут з панорамами без довгого походу. Фото, опис і карта.',
	pathname: '/excursions/mountains/malyi-vyzhen',
	keywords: vyzhynSmallExcursionKeywords,
})

export default function VyzhynSmallExcursionPage() {
	return (
		<div className='vyzhyn-small-excursion-page flex min-h-0 flex-col'>
			<VyzhynSmallDetailPage />
		</div>
	)
}

