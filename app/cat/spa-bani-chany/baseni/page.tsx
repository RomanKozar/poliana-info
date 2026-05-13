import SpaBaseniPageContent from '@/components/cat/SpaBaseniPageContent'
import { spaBaseniPolyanaPageKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata = definePageMetadata({
	title: 'Басейни в Поляні — порівняння закладів і карта',
	description:
		'Басейни та купальні зони в Поляні, Закарпаття: порівняйте готелі, подивіться їх на карті та узгодьте візит. POLYANA.INFO — зручна таблиця SPA та відпочинку.',
	pathname: '/cat/spa-bani-chany/baseni',
	keywords: spaBaseniPolyanaPageKeywords,
})

export default function SpaBaseniPage() {
	return (
		<div className='flex flex-1 flex-col bg-[#F5F6F7]'>
			<SpaBaseniPageContent />
		</div>
	)
}
