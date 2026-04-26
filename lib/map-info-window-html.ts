import { getHotelMapGallery, type PolyanaHotel } from '@/lib/polyana-hotels'

export function escHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
}

function normalizeMapCardGallery(images: string[]): string[] {
	const g = images.map(x => x.trim()).filter(Boolean)
	if (g.length >= 2) return g
	if (g.length === 1) return [g[0], g[0], g[0], g[0]]
	return ['/images/gallery/golovna-foto.jpeg']
}

function splitCategoryMeta(category: string): { rating: string; body: string } {
	const t = category.trim()
	const m = t.match(/^★\s*([\d,\s]+)\s*\(([^)]+)\)\s*(?:·|•)?\s*(.*)$/)
	if (m) {
		return {
			rating: `${m[1].trim()} (${m[2].trim()})`,
			body: (m[3] || '').trim(),
		}
	}
	return { rating: '', body: t }
}

function extractUaPhone(s: string): string {
	const matches = [...s.matchAll(/(?:\+?38)?0\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/g)]
	const last = matches[matches.length - 1]
	if (!last) return ''
	return last[0].replace(/[\s-]/g, '')
}

function normalizeTelForHref(digits: string): string {
	const d = digits.replace(/\D/g, '')
	if (d.startsWith('380') && d.length >= 12) return '+' + d.slice(0, 12)
	if (d.startsWith('0') && d.length === 10) return '+38' + d
	if (digits.startsWith('+')) return digits.replace(/\s/g, '')
	return digits ? `+${d}` : ''
}

function extractPriceHint(s: string): string {
	const m = s.match(/орієнтовно\s*([\d\s–\-]+)\s*₴/i)
	if (m) return `≈ ${m[1].replace(/\s/g, '').replace('-', '–')} ₴`
	const m2 = s.match(/(\d[\d\s–\-]*\d|\d+)\s*₴/)
	if (m2) return `${m2[1].replace(/\s/g, '')} ₴`
	return ''
}

export type UnifiedMapCardIw = {
	name: string
	address: string
	description: string
	rating: string
	price: string
	feature: string
	phone: string
	galleryImages: string[]
	routeLink: string
	/** Якщо немає телефону — CTA веде сюди */
	saveLink?: string
}

/**
 * Єдина картка InfoWindow (як готельна на проживанні): галерея, серце, маршрут, закрити, рейтинг, ціна, пілюля, CTA.
 */
export function unifiedMapCardInfoWindowHtml(p: UnifiedMapCardIw): string {
	const routeEsc = escHtml(p.routeLink)
	const name = escHtml(p.name)
	const desc = escHtml(p.description)
	const address = escHtml(p.address)
	const price = escHtml(p.price)
	const feature = escHtml(p.feature)
	const rating = escHtml((p.rating || '').trim() || '—')
	const gallery = normalizeMapCardGallery(p.galleryImages)
	const total = gallery.length
	const sw = 100 / total
	const slides = gallery
		.map(
			(src, i) =>
				`<div class="polyana-accommodation-iw-gallery__slide" style="flex:0 0 ${sw}%" data-slide="${i}"><img class="polyana-accommodation-iw-img" src="${escHtml(src)}" alt="${name}${i > 0 ? ` — ${i + 1}` : ''}" /></div>`
		)
		.join('')
	const dots = gallery
		.map(
			(_, i) =>
				`<span class="polyana-accommodation-iw-dot${i === 0 ? ' polyana-accommodation-iw-dot--on' : ''}" data-dot-index="${i}" aria-hidden="true"></span>`
		)
		.join('')
	const nextHiddenClass = total <= 1 ? ' polyana-accommodation-iw-gallery-nav--hidden' : ''

	const rawPhone = p.phone.replace(/\s/g, '')
	const telHref = rawPhone ? normalizeTelForHref(rawPhone) : ''
	const save = p.saveLink ? escHtml(p.saveLink) : ''

	const priceBlock = p.price.trim()
		? `<p class="polyana-accommodation-iw-price">${price}</p>`
		: ''
	const pillBlock = p.feature.trim()
		? `<div class="polyana-accommodation-iw-pill">${feature}</div>`
		: ''
	const ctaBlock = telHref
		? `<a class="polyana-accommodation-iw-cta" href="tel:${escHtml(telHref)}">Подзвонити</a>`
		: save
			? `<a class="polyana-accommodation-iw-cta" href="${save}" target="_blank" rel="noopener noreferrer">Подзвонити</a>`
			: ''

	return `<div class="polyana-accommodation-iw-card">
		<div class="polyana-accommodation-iw-media">
			<div class="polyana-accommodation-iw-gallery" data-iw-gallery data-idx="0" data-total="${total}">
				<div class="polyana-accommodation-iw-gallery__viewport">
					<div class="polyana-accommodation-iw-gallery__track" data-gallery-track data-gallery-total="${total}" style="width:${total * 100}%">${slides}</div>
				</div>
				<button type="button" class="polyana-accommodation-iw-gallery-nav polyana-accommodation-iw-gallery-nav--prev polyana-accommodation-iw-gallery-btn--prev polyana-accommodation-iw-gallery-nav--hidden" aria-label="Попереднє фото"><svg class="polyana-accommodation-iw-gallery-nav__svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" /></svg></button>
				<button type="button" class="polyana-accommodation-iw-gallery-nav polyana-accommodation-iw-gallery-nav--next polyana-accommodation-iw-gallery-btn--next${nextHiddenClass}" aria-label="Наступне фото"><svg class="polyana-accommodation-iw-gallery-nav__svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" /></svg></button>
				<div class="polyana-accommodation-iw-dots" data-gallery-dots aria-hidden="true">${dots}</div>
			</div>
			<div class="polyana-accommodation-iw-media__gradient" aria-hidden="true"></div>
			<div class="polyana-accommodation-iw-media__toprow">
				<div class="polyana-accommodation-iw-media__actions">
					<button type="button" class="polyana-accommodation-iw-icobtn polyana-accommodation-iw-heart" title="Додати в обране" aria-label="Додати в обране">
						<span class="heart-svg-container" aria-hidden="true">
							<svg viewBox="0 0 24 24" class="heart-svg-outline" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
							<svg viewBox="0 0 24 24" class="heart-svg-filled" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
							<svg viewBox="0 0 24 24" class="heart-svg-celebrate" aria-hidden="true"><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1" /></svg>
						</span>
					</button>
					<a class="polyana-accommodation-iw-icobtn" href="${routeEsc}" target="_blank" rel="noopener noreferrer" title="Маршрут" aria-label="Маршрут">
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" /></svg>
					</a>
				</div>
				<button type="button" class="polyana-accommodation-iw-icobtn polyana-accommodation-iw-close" title="Закрити" aria-label="Закрити вікно">
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
				</button>
			</div>
		</div>
		<div class="polyana-accommodation-iw-body">
			<div class="polyana-accommodation-iw-row1">
				<div class="polyana-accommodation-iw-title">${name}</div>
				<div class="polyana-accommodation-iw-rating" title="Рейтинг"><span class="polyana-accommodation-iw-rating-star" aria-hidden="true">&#9733;</span> ${rating}</div>
			</div>
			<p class="polyana-accommodation-iw-desc">${desc}</p>
			<p class="polyana-accommodation-iw-address">${address}</p>
			${priceBlock}
			${pillBlock}
			${ctaBlock}
		</div>
	</div>`
}

export function hotelInfoWindowHtml(hotel: PolyanaHotel): string {
	const routeLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
		`${hotel.name}, ${hotel.address}`
	)}`
	return unifiedMapCardInfoWindowHtml({
		name: hotel.name,
		address: hotel.address,
		description: hotel.description,
		rating: hotel.rating,
		price: hotel.price,
		feature: hotel.feature,
		phone: hotel.phone,
		galleryImages: getHotelMapGallery(hotel),
		routeLink,
		saveLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${hotel.name}, ${hotel.address}`)}`,
	})
}

/** Дані маркера головної карти → той самий шаблон, що й готель. */
export function homeMapMarkerToUnifiedCard(p: {
	name: string
	address: string
	category: string
	image: string
	featurePill: string
	routeLink: string
	saveLink: string
}): UnifiedMapCardIw {
	const { rating, body } = splitCategoryMeta(p.category)
	const phone = extractUaPhone(p.category)
	const price = extractPriceHint(p.category)
	return {
		name: p.name,
		address: p.address,
		description: body || p.category,
		rating: rating || '—',
		price,
		feature: p.featurePill,
		phone,
		galleryImages: [p.image],
		routeLink: p.routeLink,
		saveLink: p.saveLink,
	}
}
