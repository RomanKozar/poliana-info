/** Path з іконки `Phishing` (Material) — той самий, що `import PhishingIcon from '@mui/icons-material/Phishing'`. */
const PHISHING_ICON_PATH_D =
	'M19 9c0-1.3-.84-2.4-2-2.82V2h-2v4.18C13.84 6.6 13 7.7 13 9s.84 2.4 2 2.82V15c0 2.21-1.79 4-4 4s-4-1.79-4-4v-1h3L5 9v6c0 3.31 2.69 6 6 6s6-2.69 6-6v-3.18c1.16-.42 2-1.52 2-2.82m-3 1c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1'

/** Темно-зелений «зародок» маркера, як у класичному Google-pin (зі скріну). */
const PIN_INNER_GREEN = '#14532d'

const FILL = '#0e7490'

/** Раніше — плоский квадрат іконки (залишаємо для сумісності). */
export function getTroutPhishingMarkerIconDataUrl(sizePx = 48): string {
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${sizePx}" height="${sizePx}"><path fill="${FILL}" d="${PHISHING_ICON_PATH_D}"/></svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

/**
 * Маркер у стилі «крап + біла окантовка + темно-зелена заливка + біла іконка» — той самий прийом, що
 * `hotelMapPinIconDataUrl` у `lib/google-map-hotel-pin.ts`, лише з Phishing замість Hotel.
 */
export function getTroutPhishingGoogleStylePinDataUrl(): string {
	const dropPath =
		'M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z'
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
  <path fill="#ffffff" d="${dropPath}"/>
  <g transform="translate(24 18) scale(0.82) translate(-24 -18)">
    <path fill="${PIN_INNER_GREEN}" d="${dropPath}"/>
  </g>
  <g transform="translate(24 17) scale(0.72) translate(-12 -12)" fill="#ffffff">
    <path d="${PHISHING_ICON_PATH_D}"/>
  </g>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

/** Розміри й опорна точка (`anchor`) для Google Maps — низ «крапка». */
export const TROUT_PIN_MARKER_SIZE = { w: 48, h: 56 } as const
export const TROUT_PIN_MARKER_ANCHOR = { x: 24, y: 56 } as const

