import SpaFitobochkyPageContent from '@/components/cat/SpaFitobochkyPageContent'
import { spaFitobochkyPolyanaPageKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata = definePageMetadata({
	title: 'Фітобочки в Поляні — заклади й карта',
	description:
		'Фітобочки та фіто-пари в Поляні, Закарпаття: порівняйте готелі, подивіться їх на карті та узгодьте сеанс. POLYANA.INFO — зручна таблиця для відпочинку в Карпатах.',
	pathname: '/cat/spa-bani-chany/fitobochky',
	keywords: spaFitobochkyPolyanaPageKeywords,
})

export default function SpaFitobochkyPage() {
	return (
		<div className='flex flex-1 flex-col bg-[#F5F6F7]'>
			<SpaFitobochkyPageContent />
		</div>
	)
}
