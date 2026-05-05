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
	const imgs = Array.from(gal.querySelectorAll<HTMLImageElement>('img.polyana-accommodation-iw-img'))
	const isReady = imgs.length > 0 ? imgs.every(img => img.complete && img.naturalWidth > 0) : true
	gal.dataset.ready = isReady ? '1' : '0'

	// Пока фото не завантажені — ховаємо навігацію, щоб не було "порожніх" перегортань.
	if (!isReady) {
		gal
			.querySelector('.polyana-accommodation-iw-gallery-btn--prev')
			?.classList.add('polyana-accommodation-iw-gallery-nav--hidden')
		gal
			.querySelector('.polyana-accommodation-iw-gallery-btn--next')
			?.classList.add('polyana-accommodation-iw-gallery-nav--hidden')
		return
	}
	// Looping gallery: allow paging from first → last and last → first.
	gal
		.querySelector('.polyana-accommodation-iw-gallery-btn--prev')
		?.classList.toggle('polyana-accommodation-iw-gallery-nav--hidden', total <= 1)
	gal
		.querySelector('.polyana-accommodation-iw-gallery-btn--next')
		?.classList.toggle('polyana-accommodation-iw-gallery-nav--hidden', total <= 1)
}
