import SpaBaniPageContent from '@/components/cat/SpaBaniPageContent'
import { spaBaniPolyanaPageKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata = definePageMetadata({
	title: 'Бані та сауни в Поляні — порівняння закладів і карта',
	description:
		'Бані, лазні та сауни в Поляні, Закарпаття: порівняйте готелі, подивіться їх на карті та узгодьте візит. POLYANA.INFO — зручна таблиця закладів SPA та відпочинку.',
	pathname: '/cat/spa-bani-chany/bani',
	keywords: spaBaniPolyanaPageKeywords,
})

export default function SpaBaniPage() {
	return (
		<div className='flex flex-1 flex-col bg-[#F5F6F7]'>
			<SpaBaniPageContent />
		</div>
	)
}
