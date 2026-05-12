import SpaMaliChanyPageContent from '@/components/cat/SpaMaliChanyPageContent'
import { definePageMetadata } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata = definePageMetadata({
	title: 'Малі чани в Поляні — порівняння цін і карта закладів',
	description:
		'Порівняйте малі чани в Поляні: ціни, розташування на карті та швидке бронювання. POLYANA.INFO — зручна таблиця закладів SPA та відпочинку в Закарпатті.',
	pathname: '/cat/spa-bani-chany/mali-chany',
	keywords: ['чани Поляна', 'малий чан', 'SPA Поляна', 'Закарпаття', 'ціна чан'],
})

export default function SpaMaliChanyPage() {
	return (
		<div className='flex flex-1 flex-col bg-[#F5F6F7]'>
			<SpaMaliChanyPageContent />
		</div>
	)
}
