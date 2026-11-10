'use client'

import type { ReactNode } from 'react'
import { handleBinotelBookClick } from '@/lib/open-binotel-booking'

type Props = {
	className?: string
	children: ReactNode
	/** Що побачить оператор Binotel разом із заявкою. */
	description: string
	tel?: string
	ariaLabel?: string
}

export default function BinotelBookButton({
	className,
	children,
	description,
	tel = '0502149266',
	ariaLabel,
}: Props) {
	return (
		<button
			type='button'
			className={className ? `${className} cursor-pointer` : 'cursor-pointer'}
			aria-label={ariaLabel}
			onClick={event => {
				event.preventDefault()
				event.stopPropagation()
				handleBinotelBookClick(description, tel)
			}}
		>
			{children}
		</button>
	)
}
