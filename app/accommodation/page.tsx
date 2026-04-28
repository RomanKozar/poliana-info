import AccommodationPageContent from '@/components/accommodation/AccommodationPageContent'
import { accommodationPageKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const metadata = definePageMetadata({
	title: 'Проживання та житло в Поляні — готелі на карті',
	description:
		'Зняти житло в Поляні, Закарпаття: готелі та апарт-готелі на інтерактивній карті. Ціни, рейтинги, адреси — проживання біля екскурсій, SPA та підйомників курорту.',
	pathname: '/accommodation',
	keywords: accommodationPageKeywords,
})

export default function AccommodationPage() {
	return (
		<div className='accommodation-page flex min-h-0 flex-col bg-[#F5F6F7] pt-4 sm:pt-6 lg:min-h-0 lg:pt-2'>
			<h1 className='sr-only'>Проживання в Поляні</h1>
			<AccommodationPageContent />
		</div>
	)
}
