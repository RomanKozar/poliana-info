import SpaVelikiChanyPageContent from '@/components/cat/SpaVelikiChanyPageContent'
import { definePageMetadata } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata = definePageMetadata({
	title: 'Великі чани в Поляні — порівняння цін і карта закладів',
	description:
		'Порівняйте великі чани в Поляні: ціни, розташування на карті та швидке бронювання. POLYANA.INFO — зручна таблиця закладів SPA та відпочинку в Закарпатті.',
	pathname: '/cat/spa-bani-chany/veliki-chany',
	keywords: ['чани Поляна', 'великий чан', 'SPA Поляна', 'Закарпаття', 'ціна чан'],
})

export default function SpaVelikiChanyPage() {
	return (
		<div className='flex flex-1 flex-col bg-[#F5F6F7]'>
			<SpaVelikiChanyPageContent />
		</div>
	)
}
