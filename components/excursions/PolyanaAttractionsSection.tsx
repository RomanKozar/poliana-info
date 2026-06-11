import Image from 'next/image'
import { FaImage } from 'react-icons/fa'
import { EXCURSIONS_ATTRACTIONS_ANCHOR_ID } from '@/data/excursions-page'
import { polyanaAttractionPrices, polyanaAttractions } from '@/data/polyana-attractions'

function AttractionImage({ src, alt }: { src?: string; alt: string }) {
	if (src) {
		return (
			<div className='relative aspect-[4/3] w-full overflow-hidden bg-slate-100'>
				<Image
					src={src}
					alt={alt}
					fill
					unoptimized
					className='object-cover object-center'
					sizes='(min-width: 768px) 50vw, 100vw'
				/>
			</div>
		)
	}

	return (
		<div
			className='flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-100 to-slate-200/90 text-slate-500'
			aria-hidden
		>
			<FaImage className='size-10 opacity-50' />
			<span className='text-xs font-medium'>Фото незабаром</span>
		</div>
	)
}

export default function PolyanaAttractionsSection() {
	return (
		<section
			id={EXCURSIONS_ATTRACTIONS_ANCHOR_ID}
			className='scroll-mt-[calc(var(--header-offset,68px)+12px)] border-t border-slate-200/80 bg-[#F5F6F7] px-4 py-8 sm:px-16 lg:px-24'
			aria-labelledby='polyana-attractions-heading'
		>
			<p className='mb-2 text-sm font-medium uppercase tracking-wide text-[#53C4DA]'>Активний відпочинок</p>
			<h2 id='polyana-attractions-heading' className='text-2xl font-bold text-[#2D333D] sm:text-[26px]'>
				Атракціони в Поляні
			</h2>
			<p className='mt-3 max-w-3xl text-slate-600'>
				Активні атракціони для дітей і дорослих на території курорту - оберіть безлімітний абонемент або окремий сеанс.
			</p>

			<div className='mt-6 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:rounded-none sm:border-0 sm:bg-transparent sm:shadow-none'>
				{polyanaAttractionPrices.map((tier, index) => (
					<div
						key={tier.price + tier.description}
						className={`flex items-center justify-between gap-3 px-4 py-3 sm:block sm:rounded-xl sm:border sm:px-4 sm:py-4 sm:shadow-sm ${
							index > 0 ? 'border-t border-slate-100 sm:border-t-0' : ''
						} ${
							tier.highlight
								? 'bg-white sm:border-[#53C4DA]/40 sm:ring-1 sm:ring-[#53C4DA]/20'
								: 'bg-white sm:border-slate-200/90'
						}`}
					>
						<p className='shrink-0 text-xl font-black text-[#2D333D] sm:text-2xl'>{tier.price}</p>
						<p className='text-right text-xs leading-snug text-slate-600 sm:mt-1 sm:text-left sm:text-sm'>
							{tier.description}
						</p>
					</div>
				))}
			</div>

			<div className='mt-8 grid gap-5 sm:grid-cols-2'>
				{polyanaAttractions.map(item => (
					<article
						key={item.id}
						className='overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-900/[0.03]'
					>
						<AttractionImage src={item.image} alt={item.title} />
						<div className='p-4 sm:p-5'>
							<h3 className='text-lg font-bold text-[#2D333D]'>{item.title}</h3>
							<p className='mt-2 text-sm leading-relaxed text-slate-600'>{item.description}</p>
						</div>
					</article>
				))}
			</div>
		</section>
	)
}
