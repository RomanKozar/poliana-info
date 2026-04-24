/**
 * Червоний пін з іконкою Hotel (той самий path, що й `Hotel` з `@mui/icons-material`).
 */
export const hotelMapPinIconDataUrl = (() => {
	const hotelPath =
		'M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3m12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4'
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
  <path fill="#ffffff" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  <g transform="translate(24 18) scale(0.82) translate(-24 -18)">
    <path fill="#DC2626" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  </g>
  <g transform="translate(24 17) scale(0.72) translate(-12 -12)" fill="#ffffff">
    <path d="${hotelPath}"/>
  </g>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
})()
