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

/**
 * Делеговані обробники на корені карти для HTML-картки InfoWindow (`.polyana-accommodation-iw-card`):
 * галерея, серце, кнопка закрити. Той самий підхід, що на головній карті.
 */
export function attachPolyanaAccommodationIwDomHandlers(
	mapRootEl: HTMLElement,
	onCloseActiveInfoWindow: () => void
): () => void {
	const onInfoWindowUiAny = (e: Event) => {
		const isPointerDown = e.type === 'pointerdown'
		const next =
			e.target instanceof Element ? e.target.closest('.polyana-accommodation-iw-gallery-btn--next') : null
		const prev =
			e.target instanceof Element ? e.target.closest('.polyana-accommodation-iw-gallery-btn--prev') : null
		if ((next || prev) && !isPointerDown) {
			e.preventDefault()
			e.stopPropagation()
			e.stopImmediatePropagation()
			const gal = (next || prev)!.closest('[data-iw-gallery]') as HTMLElement | null
			if (!gal) return
			syncInfoWindowGalleryNav(gal)
			if (gal.dataset.ready !== '1') return
			const total = Math.max(1, parseInt(gal.dataset.total || '1', 10))
			let idx = parseInt(gal.dataset.idx || '0', 10)
			if (next) idx = (idx + 1) % total
			else idx = (idx - 1 + total) % total
			gal.dataset.idx = String(idx)
			const track = gal.querySelector<HTMLElement>('[data-gallery-track]')
			if (track) {
				const step = 100 / total
				track.style.transform = `translate3d(-${step * idx}%,0,0)`
			}
			gal.querySelectorAll<HTMLElement>('.polyana-accommodation-iw-dot').forEach((dot, i) => {
				dot.classList.toggle('polyana-accommodation-iw-dot--on', i === idx)
			})
			syncInfoWindowGalleryNav(gal)
			return
		}
		const heart =
			e.target instanceof Element ? e.target.closest('.polyana-accommodation-iw-heart') : null
		if (heart && !isPointerDown) {
			e.preventDefault()
			e.stopPropagation()
			e.stopImmediatePropagation()
			toggleIwHeartActive(heart)
			return
		}
		const closer =
			e.target instanceof Element ? e.target.closest('.polyana-accommodation-iw-close') : null
		if (!closer) return
		e.preventDefault()
		e.stopPropagation()
		;(e as any).stopImmediatePropagation?.()
		onCloseActiveInfoWindow()
	}
	const onIwImageLoad = (e: Event) => {
		const t = e.target
		if (!(t instanceof HTMLImageElement)) return
		if (!t.classList.contains('polyana-accommodation-iw-img')) return
		const gal = t.closest('[data-iw-gallery]') as HTMLElement | null
		if (!gal) return
		syncInfoWindowGalleryNav(gal)
	}
	mapRootEl.addEventListener('pointerdown', onInfoWindowUiAny, true)
	mapRootEl.addEventListener('click', onInfoWindowUiAny, true)
	mapRootEl.addEventListener('load', onIwImageLoad, true)
	return () => {
		mapRootEl.removeEventListener('pointerdown', onInfoWindowUiAny, true)
		mapRootEl.removeEventListener('click', onInfoWindowUiAny, true)
		mapRootEl.removeEventListener('load', onIwImageLoad, true)
	}
}
