import SpaMasazhiPageContent from '@/components/cat/SpaMasazhiPageContent'
import { spaMasazhiPolyanaPageKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const dynamic = 'force-static'

export const metadata = definePageMetadata({
	title: 'Масажі в Поляні — час сеансу, ціна, запис',
	description:
		'Перелік SPA-масажів у Поляні: тривалість, орієнтовна вартість і запис телефоном. POLYANA.INFO — зручно спланувати відпочинок у Закарпатті.',
	pathname: '/cat/spa-bani-chany/masazhi',
	keywords: spaMasazhiPolyanaPageKeywords,
})

export default function SpaMasazhiPage() {
	return (
		<div className='flex flex-1 flex-col bg-[#F5F6F7]'>
			<SpaMasazhiPageContent />
		</div>
	)
}
