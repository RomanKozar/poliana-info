/** is-active залишається, поки знову не натиснути (той самий CSS, що .heart-svg-container на головній) */
export function toggleIwHeartActive(heartLink: Element) {
	const svg = heartLink.querySelector<HTMLElement>('.heart-svg-container')
	if (!svg) return
	if (svg.classList.contains('is-active')) {
		svg.classList.remove('is-active')
		return
	}
	svg.classList.remove('is-active')
	void svg.offsetWidth
	svg.classList.add('is-active')
}

export function syncInfoWindowGalleryNav(gal: HTMLElement) {
	const total = Math.max(1, parseInt(gal.dataset.total || '1', 10))
	const idx = parseInt(gal.dataset.idx || '0', 10)
	gal
		.querySelector('.polyana-accommodation-iw-gallery-btn--prev')
		?.classList.toggle('polyana-accommodation-iw-gallery-nav--hidden', idx === 0 || total <= 1)
	gal
		.querySelector('.polyana-accommodation-iw-gallery-btn--next')
		?.classList.toggle('polyana-accommodation-iw-gallery-nav--hidden', total <= 1)
}
