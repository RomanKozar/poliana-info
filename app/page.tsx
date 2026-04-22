import type { Metadata } from 'next'
import HomePage from '@/components/pages/HomePage'
import { definePageMetadata } from '@/lib/seo'

export const metadata: Metadata = definePageMetadata({
	title: 'Поляна — туристична дестинація №1 на Закарпатті',
	description:
		'Відпочинок у Поляні: готелі та житло, чани, SPA, табори, гірськолижний курорт, форель, мінеральні води. Поради, карта та корисна інформація на POLYANA.INFO.',
	pathname: '/',
})

export default function Home() {
	return <HomePage />
}
