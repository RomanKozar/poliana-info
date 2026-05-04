import { notFound } from 'next/navigation'
import AccommodationPageContent from '@/components/accommodation/AccommodationPageContent'
import SpaBaniChanyPageContent from '@/components/cat/SpaBaniChanyPageContent'
import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { categoryPlaceholders, categoryPlaceholderSlugs } from '@/data/category-placeholders'
import { HOTELS_CATEGORY_SLUG } from '@/lib/accommodation-urls'
import { accommodationPageKeywords } from '@/lib/site-keywords'
import { definePageMetadata } from '@/lib/seo'

export const dynamic = 'force-static'

export function generateStaticParams() {
	return categoryPlaceholderSlugs.map(slug => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
	const { slug } = await params
	if (slug === HOTELS_CATEGORY_SLUG) {
		return definePageMetadata({
			title: 'Проживання та житло в Поляні — готелі на карті',
			description:
				'Зняти житло в Поляні, Закарпаття: готелі та апарт-готелі на інтерактивній карті. Ціни, рейтинги, адреси — проживання біля екскурсій, SPA та підйомників курорту.',
			pathname: `/cat/${slug}`,
			keywords: accommodationPageKeywords,
		})
	}
	const p = categoryPlaceholders[slug]
	if (!p) return {}
	return definePageMetadata({
		title: p.title,
		description: p.description,
		pathname: `/cat/${slug}`,
	})
}

export default async function CategoryPlaceholderPage({ params }: Props) {
	const { slug } = await params
	if (slug === HOTELS_CATEGORY_SLUG) {
		return (
			<div className='accommodation-page flex min-h-0 flex-col bg-[#F5F6F7] pt-4 sm:pt-6 lg:min-h-0 lg:pt-2'>
				<h1 className='sr-only'>Проживання в Поляні</h1>
				<AccommodationPageContent />
			</div>
		)
	}
	if (slug === 'spa-bani-chany') {
		return (
			<div className='flex flex-1 flex-col bg-[#F5F6F7]'>
				<SpaBaniChanyPageContent />
			</div>
		)
	}
	const p = categoryPlaceholders[slug]
	if (!p) notFound()

	return (
		<div className='flex flex-1 flex-col bg-[#F5F6F7]'>
			<PagePlaceholder title={p.title} description={p.description} />
		</div>
	)
}
