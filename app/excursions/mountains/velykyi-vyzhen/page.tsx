import VyzhynBigDetailPage from '@/components/excursions/VyzhynBigDetailPage'
import { vyzhynBigExcursionKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Гора Великий Вижень — маршрут в Карпатах (екскурсія)',
	description:
		'Гора Великий Вижень (Верхня Грабівниця, Закарпаття): підйом для підготовлених туристів. Фото, опис і карта.',
	pathname: '/excursions/mountains/velykyi-vyzhen',
	keywords: vyzhynBigExcursionKeywords,
})

export default function VyzhynBigExcursionPage() {
	return (
		<div className='vyzhyn-big-excursion-page flex min-h-0 flex-col'>
			<VyzhynBigDetailPage />
		</div>
	)
}

