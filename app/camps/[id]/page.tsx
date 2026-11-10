import WinterCampPageContent from '@/components/camps/WinterCampPageContent'
import { camps } from '@/data/home-page'
import { definePageMetadata } from '@/lib/seo'
import { notFound } from 'next/navigation'

function winterCamp(id: string) {
	return camps.find(camp => camp.id === id && camp.season === 'winter' && camp.detailPath)
}

export function generateStaticParams() {
	return camps
		.filter(camp => camp.season === 'winter' && camp.id && camp.detailPath)
		.map(camp => ({ id: camp.id as string }))
}

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props) {
	const { id } = await params
	const camp = winterCamp(id)
	if (!camp?.detailPath) return {}
	return definePageMetadata({
		title: `${camp.title} у Поляні`,
		description: `${camp.description} Дати: ${camp.dates}. Вартість: ${camp.price}.`,
		pathname: camp.detailPath,
		keywords: ['PolianSki CAMP', 'зимовий лижний табір', 'дитячий табір Поляна', camp.dates],
	})
}

export default async function WinterCampPage({ params }: Props) {
	const { id } = await params
	const camp = winterCamp(id)
	if (!camp) notFound()

	return (
		<div className='flex min-h-0 flex-col'>
			<WinterCampPageContent camp={camp} />
		</div>
	)
}
