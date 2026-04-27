import { notFound } from 'next/navigation'
import PagePlaceholder from '@/components/shared/PagePlaceholder'
import { categoryPlaceholders, categoryPlaceholderSlugs } from '@/data/category-placeholders'
import { definePageMetadata } from '@/lib/seo'

export const dynamic = 'force-static'

export function generateStaticParams() {
	return categoryPlaceholderSlugs.map(slug => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
	const { slug } = await params
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
	const p = categoryPlaceholders[slug]
	if (!p) notFound()

	return (
		<div className='flex flex-1 flex-col bg-[#F5F6F7]'>
			<PagePlaceholder title={p.title} description={p.description} />
		</div>
	)
}
