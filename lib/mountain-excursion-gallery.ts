const GALLERY_COUNT = 4

/** WebP з `public/images/excursions/mountains/peaks`. */
const PEAKS_IMAGES = [1, 2, 3, 4, 5, 6].map(
	n => `/images/excursions/mountains/peaks/peaks-${n}.webp`,
)

/** 4 фото для галереї вершини: своє peaks-N і наступні три по колу. */
export function summitDetailGalleryImages(peakIndex: 1 | 2 | 3 | 4 | 5 | 6): string[] {
	const out: string[] = []
	for (let k = 0; k < GALLERY_COUNT; k++) {
		const n = ((peakIndex - 1 + k) % PEAKS_IMAGES.length) + 1
		out.push(`/images/excursions/mountains/peaks/peaks-${n}.webp`)
	}
	return out
}
