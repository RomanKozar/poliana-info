import type { Metadata } from 'next'
import HomePage from '@/components/pages/HomePage'
import { definePageMetadata } from '@/lib/seo'

export const metadata: Metadata = {
	...definePageMetadata({
		title: 'Поляна — туристична дестинація №1 на Закарпатті',
		description:
			'POLYANA.INFO (Поляна інфо) — туристичний портал села Поляна на Закарпатті: житло, чани, SPA, табори, карта готелів, новини та ідеї для відпочинку в Карпатах.',
		pathname: '/',
	}),
	keywords: [
		'Поляна',
		'Поляна інфо',
		'POLYANA.INFO',
		'Поляна Закарпаття',
		'відпочинок Поляна',
		'курорт Поляна',
		'туризм Поляна',
		'Сонячна Поляна',
		'готелі Поляна',
	],
}

export default function Home() {
	return <HomePage />
}
