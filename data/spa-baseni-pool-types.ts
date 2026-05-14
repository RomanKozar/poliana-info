/**
 * Орієнтовно: які басейни згадуються в описах готелів (відкритий/літній vs критий).
 * Сезонність і доступ завжди уточнюйте в закладі.
 */
export type SpaBaseniPoolTypesRow = {
	/** Відкритий або літній басейн */
	openAir: string
	/** Критий (закритий) басейн */
	indoor: string
}

export const spaBaseniPoolTypesByHotelId: Record<string, SpaBaseniPoolTypesRow> = {
	riverside: { openAir: 'літній (сезонно)', indoor: 'критий' },
	kateryna: { openAir: '—', indoor: 'критий' },
	kontinent: { openAir: 'літній (сезонно)', indoor: 'критий' },
	arena: { openAir: 'літній (сезонно)', indoor: 'критий' },
}

export const spaBaseniPoolTypesFallback: SpaBaseniPoolTypesRow = {
	openAir: 'уточнюйте',
	indoor: 'уточнюйте',
}

export function spaBaseniPoolTypesForVenue(id: string): SpaBaseniPoolTypesRow {
	return spaBaseniPoolTypesByHotelId[id] ?? spaBaseniPoolTypesFallback
}
