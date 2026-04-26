/**
 * Data URL пінів головної карти (SVG з іконками у стилі MUI).
 */

/** Помаранчевий пін — їжа (FoodBank). */
export const diningMapPinIconDataUrl = (() => {
	const foodBankPath =
		'M12 3 4 9v12h16V9zm.5 9.5c0 .83-.67 1.5-1.5 1.5v4h-1v-4c-.83 0-1.5-.67-1.5-1.5v-3h1v3h.5v-3h1v3h.5v-3h1zM15 18h-1v-3.5h-1v-3c0-1.1.9-2 2-2z'
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
  <path fill="#ffffff" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  <g transform="translate(24 18) scale(0.82) translate(-24 -18)">
    <path fill="#F97316" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  </g>
  <g transform="translate(24 17) scale(0.72) translate(-12 -12)" fill="#ffffff">
    <path d="${foodBankPath}"/>
  </g>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
})()

/** Фіолетовий пін (#6D28D9) — ShoppingCart. */
export const shoppingMapPinIconDataUrl = (() => {
	const cartPath =
		'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2M1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2'
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
  <path fill="#ffffff" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  <g transform="translate(24 18) scale(0.82) translate(-24 -18)">
    <path fill="#6D28D9" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  </g>
  <g transform="translate(24 17) scale(0.72) translate(-12 -12)" fill="#ffffff">
    <path d="${cartPath}"/>
  </g>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
})()

/** Смарагдовий пін (#047857) — LocalPharmacy. */
export const pharmacyMapPinIconDataUrl = (() => {
	const pharmacyPath =
		'M21 5h-2.64l1.14-3.14L17.15 1l-1.46 4H3v2l2 6-2 6v2h18v-2l-2-6 2-6zm-5 9h-3v3h-2v-3H8v-2h3V9h2v3h3z'
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
  <path fill="#ffffff" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  <g transform="translate(24 18) scale(0.82) translate(-24 -18)">
    <path fill="#047857" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  </g>
  <g transform="translate(24 17) scale(0.72) translate(-12 -12)" fill="#ffffff">
    <path d="${pharmacyPath}"/>
  </g>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
})()

/** Бірюзовий пін (#0E7490) — HotTub. */
export const spaMapPinIconDataUrl = (() => {
	const hotTubCircle = '<circle cx="7" cy="6" r="2"/>'
	const hotTubPath =
		'M11.15 12c-.31-.22-.59-.46-.82-.72l-1.4-1.55c-.19-.21-.43-.38-.69-.5-.29-.14-.62-.23-.96-.23h-.03C6.01 9 5 10.01 5 11.25V12H2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8zM7 20H5v-6h2zm4 0H9v-6h2zm4 0h-2v-6h2zm4 0h-2v-6h2zm-.35-14.14-.07-.07c-.57-.62-.82-1.41-.67-2.2L18 3h-1.89l-.06.43c-.2 1.36.27 2.71 1.3 3.72l.07.06c.57.62.82 1.41.67 2.2l-.11.59h1.91l.06-.43c.21-1.36-.27-2.71-1.3-3.71m-4 0-.07-.07c-.57-.62-.82-1.41-.67-2.2L14 3h-1.89l-.06.43c-.2 1.36.27 2.71 1.3 3.72l.07.06c.57.62.82 1.41.67 2.2l-.11.59h1.91l.06-.43c.21-1.36-.27-2.71-1.3-3.71'
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
  <path fill="#ffffff" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  <g transform="translate(24 18) scale(0.82) translate(-24 -18)">
    <path fill="#0E7490" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  </g>
  <g transform="translate(24 17) scale(0.72) translate(-12 -12)" fill="#ffffff">
    ${hotTubCircle}
    <path d="${hotTubPath}"/>
  </g>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
})()

/** Темно-зелений пін (#166534) — FilterHdr. */
export const touristCityMapPinIconDataUrl = (() => {
	const filterHdrPath = 'm14 6-3.75 5 2.85 3.8-1.6 1.2C9.81 13.75 7 10 7 10l-6 8h22z'
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
  <path fill="#ffffff" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  <g transform="translate(24 18) scale(0.82) translate(-24 -18)">
    <path fill="#166534" d="M24 4C16.26 4 10 10.26 10 18c0 10.5 14 26 14 26s14-15.5 14-26c0-7.74-6.26-14-14-14z"/>
  </g>
  <g transform="translate(24 17) scale(0.72) translate(-12 -12)" fill="#ffffff">
    <path d="${filterHdrPath}"/>
  </g>
</svg>`
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
})()
