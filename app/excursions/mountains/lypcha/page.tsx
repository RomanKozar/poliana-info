import LypchaDetailPage from '@/components/excursions/LypchaDetailPage'
import { lypchaExcursionKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Гора Липча — маршрут біля Поляни (екскурсія)',
	description:
		'Гора Липча (Уклин, Закарпаття): менш натоптані стежки та ділянки поблизу E471. Фото, опис і карта.',
	pathname: '/excursions/mountains/lypcha',
	keywords: lypchaExcursionKeywords,
})

export default function LypchaExcursionPage() {
	return (
		<div className='lypcha-excursion-page flex min-h-0 flex-col'>
			<LypchaDetailPage />
		</div>
	)
}

