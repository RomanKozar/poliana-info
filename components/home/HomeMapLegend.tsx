'use client'

import type { ReactNode } from 'react'
import type { HomeMapLayerId } from '@/lib/home-map-layers'

export const MAP_LEGEND_LIST_CLASS =
	'pointer-events-auto space-y-2.5 text-[10px] leading-snug text-slate-700 sm:text-xs'

function MapLegendLayerRow({
	layerId,
	layerEnabled,
	onLayerToggle,
	pinClassName,
	labelClassName,
	label,
	description,
	children,
}: {
	layerId: HomeMapLayerId
	layerEnabled: Record<HomeMapLayerId, boolean>
	onLayerToggle: (id: HomeMapLayerId) => void
	pinClassName: string
	labelClassName: string
	label: string
	description: string
	children: ReactNode
}) {
	const on = layerEnabled[layerId]
	return (
		<li className='min-w-0'>
			<label className='flex cursor-pointer items-center gap-2 sm:cursor-default sm:gap-1.5'>
				<span className='polyana-map-legend-checkBox shrink-0'>
					<input
						type='checkbox'
						className='polyana-map-legend-checkBox-input'
						checked={on}
						onChange={() => onLayerToggle(layerId)}
						aria-label={
							on ? `Приховати мітки на карті: ${label}` : `Показати мітки на карті: ${label}`
						}
					/>
				</span>
				<span
					className={`flex size-7 shrink-0 items-center justify-center rounded-md shadow-sm ring-1 ring-white/80 ${pinClassName}`}
					aria-hidden
				>
					<svg viewBox='0 0 24 24' className='size-[15px] text-white' fill='currentColor'>
						{children}
					</svg>
				</span>
				<span className='min-w-0 flex-1 touch-manipulation leading-snug'>
					<span className={`font-semibold ${labelClassName}`}>{label}</span> — {description}
				</span>
			</label>
		</li>
	)
}

export function MapLegendTitle({ id }: { id?: string }) {
	return (
		<p
			id={id}
			className='pointer-events-auto mb-2 border-b border-slate-200/80 pb-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-600 sm:text-[11px]'
		>
			Умовні позначення
		</p>
	)
}

export function MapLegendList({
	className = MAP_LEGEND_LIST_CLASS,
	layerEnabled,
	onLayerToggle,
	hideHotels = false,
}: {
	className?: string
	layerEnabled: Record<HomeMapLayerId, boolean>
	onLayerToggle: (id: HomeMapLayerId) => void
	hideHotels?: boolean
}) {
	return (
		<ul className={className}>
			{!hideHotels ? (
				<MapLegendLayerRow
					layerId='hotels'
					layerEnabled={layerEnabled}
					onLayerToggle={onLayerToggle}
					pinClassName='bg-[#dc2626]'
					labelClassName='text-[#dc2626]'
					label='Готелі Поляни'
					description='житло та готельні комплекси курорту'
				>
					<path d='M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3m12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4' />
				</MapLegendLayerRow>
			) : null}
			<MapLegendLayerRow
				layerId='dining'
				layerEnabled={layerEnabled}
				onLayerToggle={onLayerToggle}
				pinClassName='bg-[#f97316]'
				labelClassName='text-[#ea580c]'
				label='Їжа'
				description='заклади харчування'
			>
				<path d='M12 3 4 9v12h16V9zm.5 9.5c0 .83-.67 1.5-1.5 1.5v4h-1v-4c-.83 0-1.5-.67-1.5-1.5v-3h1v3h.5v-3h1v3h.5v-3h1zM15 18h-1v-3.5h-1v-3c0-1.1.9-2 2-2z' />
			</MapLegendLayerRow>
			<MapLegendLayerRow
				layerId='shops'
				layerEnabled={layerEnabled}
				onLayerToggle={onLayerToggle}
				pinClassName='bg-[#6d28d9]'
				labelClassName='text-[#6d28d9]'
				label='Магазини'
				description='кошик'
			>
				<path d='M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2M1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2' />
			</MapLegendLayerRow>
			<MapLegendLayerRow
				layerId='pharmacy'
				layerEnabled={layerEnabled}
				onLayerToggle={onLayerToggle}
				pinClassName='bg-[#047857]'
				labelClassName='text-[#047857]'
				label='Аптеки'
				description='аптека та медзаклади'
			>
				<path d='M21 5h-2.64l1.14-3.14L17.15 1l-1.46 4H3v2l2 6-2 6v2h18v-2l-2-6 2-6zm-5 9h-3v3h-2v-3H8v-2h3V9h2v3h3z' />
			</MapLegendLayerRow>
			<MapLegendLayerRow
				layerId='spa'
				layerEnabled={layerEnabled}
				onLayerToggle={onLayerToggle}
				pinClassName='bg-[#0e7490]'
				labelClassName='text-[#0e7490]'
				label='SPA'
				description='чани та SPA'
			>
				<circle cx='7' cy='6' r='2' />
				<path d='M11.15 12c-.31-.22-.59-.46-.82-.72l-1.4-1.55c-.19-.21-.43-.38-.69-.5-.29-.14-.62-.23-.96-.23h-.03C6.01 9 5 10.01 5 11.25V12H2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8zM7 20H5v-6h2zm4 0H9v-6h2zm4 0h-2v-6h2zm4 0h-2v-6h2zm-.35-14.14-.07-.07c-.57-.62-.82-1.41-.67-2.2L18 3h-1.89l-.06.43c-.2 1.36.27 2.71 1.3 3.72l.07.06c.57.62.82 1.41.67 2.2l-.11.59h1.91l.06-.43c.21-1.36-.27-2.71-1.3-3.71m-4 0-.07-.07c-.57-.62-.82-1.41-.67-2.2L14 3h-1.89l-.06.43c-.2 1.36.27 2.71 1.3 3.72l.07.06c.57.62.82 1.41.67 2.2l-.11.59h1.91l.06-.43c.21-1.36-.27-2.71-1.3-3.71' />
			</MapLegendLayerRow>
			<MapLegendLayerRow
				layerId='tourist'
				layerEnabled={layerEnabled}
				onLayerToggle={onLayerToggle}
				pinClassName='bg-[#166534]'
				labelClassName='text-[#166534]'
				label='Огляд'
				description='оглядові точки'
			>
				<path d='m14 6-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22z' />
			</MapLegendLayerRow>
		</ul>
	)
}
