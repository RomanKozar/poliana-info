const BINOTEL_POWERED_BY_HREF = 'https://www.binotel.ua/'

function patchBinotelAnchor(anchor: HTMLAnchorElement) {
	const href = anchor.getAttribute('href') ?? ''
	if (!/^javascript:/i.test(href)) return

	if (anchor.classList.contains('bingc-powered-by')) {
		anchor.setAttribute('href', BINOTEL_POWERED_BY_HREF)
		anchor.setAttribute('target', '_blank')
		anchor.setAttribute('rel', 'noopener noreferrer')
		return
	}

	anchor.setAttribute('href', '#')
	anchor.setAttribute('role', 'button')
}

/** Binotel рендерить `<a href="javascript:void(0)">` — Lighthouse SEO / a11y. */
export function patchBinotelWidgetAnchors(root: ParentNode = document) {
	root.querySelectorAll<HTMLAnchorElement>('#bingc-passive a[href], #bingc-active a[href]').forEach(patchBinotelAnchor)
}

export function observeBinotelWidgetDom(): () => void {
	patchBinotelWidgetAnchors()
	const observer = new MutationObserver(() => patchBinotelWidgetAnchors())
	observer.observe(document.body, { childList: true, subtree: true })
	return () => observer.disconnect()
}
