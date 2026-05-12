import type { Metadata } from 'next'

/** Канонічний URL для SEO: apex без www. У Vercel має бути основним доменом; www → 301 сюди. */
export const SITE_URL = 'https://polyana.info'

type PageMetaInput = {
	title: string
	description: string
	pathname: string
	/** Допоміжно для альтернативних пошуковиків; Google на ранжування майже не використовує. */
	keywords?: string[]
}

/** Унікальні title/description + canonical для кожної сторінки (злиття з кореневим layout). */
export function definePageMetadata({
	title,
	description,
	pathname,
	keywords,
}: PageMetaInput): Metadata {
	const path = pathname === '/' ? '' : pathname
	const url = `${SITE_URL}${path || ''}`
	return {
		title,
		description,
		...(keywords?.length ? { keywords } : {}),
		alternates: {
			canonical: pathname,
		},
		openGraph: {
			title,
			description,
			url,
			siteName: 'POLYANA.INFO',
			locale: 'uk_UA',
			type: 'website',
		},
		twitter: {
			title,
			description,
		},
	}
}
