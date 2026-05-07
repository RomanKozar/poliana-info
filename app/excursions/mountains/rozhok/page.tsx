import RozhokDetailPage from '@/components/excursions/RozhokDetailPage'
import { rozhokExcursionKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Гора Рожок — оглядовий майданчик біля Поляни (екскурсія)',
	description:
		'Гора Рожок (Голубине, Закарпаття): оглядовий майданчик поруч із Поляною. Ціна 800 грн/особа (4–5 осіб у авто), фото, опис та карта.',
	pathname: '/excursions/mountains/rozhok',
	keywords: rozhokExcursionKeywords,
})

export default function RozhokExcursionPage() {
	return (
		<div className='rozhok-excursion-page flex min-h-0 flex-col'>
			<RozhokDetailPage />
		</div>
	)
}

