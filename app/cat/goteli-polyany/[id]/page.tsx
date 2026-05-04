import HotelDetailPageContent from '@/components/accommodation/HotelDetailPageContent'
import { accommodationHotelPath } from '@/lib/accommodation-urls'
import { polyanaHotels } from '@/lib/polyana-hotels'
import { definePageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'

export function generateStaticParams() {
	return polyanaHotels.map(h => ({ id: h.id }))
}

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
	const { id } = await params
	const hotel = polyanaHotels.find(h => h.id === id)
	if (!hotel) return {}
	const desc = `${hotel.description} Адреса: ${hotel.address}. Рейтинг ${hotel.rating}.`
	return definePageMetadata({
		title: hotel.name,
		description: desc,
		pathname: accommodationHotelPath(hotel.id),
	})
}

export default async function HotelDetailUnderCategoryPage({ params }: Props) {
	const { id } = await params
	const hotel = polyanaHotels.find(h => h.id === id)
	if (!hotel) notFound()

	return (
		<div className='accommodation-detail-page flex min-h-0 flex-col bg-white pt-4 sm:pt-6 lg:min-h-0 lg:pt-2'>
			<h1 className='sr-only'>{hotel.name}</h1>
			<HotelDetailPageContent hotel={hotel} />
		</div>
	)
}
