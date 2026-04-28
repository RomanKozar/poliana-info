/**
 * Текст для мітки-«цінника» на карті (як у референсі: ₴ + число з розділювачем тисяч).
 */
export function formatHotelPriceForMapMarker(priceStr: string): string {
	const m = priceStr.match(/\d+/)
	if (!m) return '₴ —'
	const n = parseInt(m[0], 10)
	if (Number.isNaN(n)) return '₴ —'
	const formatted = new Intl.NumberFormat('uk-UA', { maximumFractionDigits: 0 }).format(n)
	return `₴ ${formatted}`
}

export type HotelPricePillMarker = {
	dataUrl: string
	width: number
	height: number
}

/** Біла таблетка; `active` і `selected` — помаранчевий акцент (наведення / вибір). */
export type HotelPricePillVariant = 'default' | 'active' | 'selected'

/**
 * «Пігулка» ціни (PNG data URL для google.maps.Marker icon).
 * `active` — помаранчевий (наведення на картку в списку або на маркер на карті).
 * `selected` — той самий помаранчевий акцент (вибраний готель / відкрите вікно).
 */
export function createHotelPricePillMarker(label: string, variant: HotelPricePillVariant = 'default'): HotelPricePillMarker {
	const logicalH = 32
	const padX = 13
	const font = '700 13px system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'

	if (typeof document === 'undefined') {
		return { dataUrl: '', width: 56, height: logicalH }
	}

	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')
	if (!ctx) return { dataUrl: '', width: 56, height: logicalH }

	ctx.font = font
	const tw = ctx.measureText(label).width
	const logicalW = Math.max(56, Math.ceil(tw + padX * 2))

	const scale =
		typeof window !== 'undefined' && window.devicePixelRatio
			? Math.min(2, Math.max(1, window.devicePixelRatio))
			: 2
	canvas.width = Math.ceil(logicalW * scale)
	canvas.height = Math.ceil(logicalH * scale)
	ctx.setTransform(scale, 0, 0, scale, 0, 0)
	ctx.font = font

	const r = logicalH / 2
	const accent = variant === 'active' || variant === 'selected'

	const selBg = '#F68F5D'
	const selStroke = '#e57d4a'

	ctx.save()
	ctx.shadowColor = accent ? 'rgba(246, 143, 93, 0.45)' : 'rgba(15, 23, 42, 0.14)'
	ctx.shadowBlur = accent ? 8 : 5
	ctx.shadowOffsetY = 1
	ctx.fillStyle = accent ? selBg : '#ffffff'
	ctx.beginPath()
	ctx.roundRect(0, 0, logicalW, logicalH, r)
	ctx.fill()
	ctx.restore()

	ctx.strokeStyle = accent ? selStroke : '#e5e7eb'
	ctx.lineWidth = 1
	ctx.beginPath()
	ctx.roundRect(0, 0, logicalW, logicalH, r)
	ctx.stroke()

	ctx.fillStyle = accent ? '#ffffff' : '#111827'
	ctx.textBaseline = 'middle'
	ctx.textAlign = 'left'
	ctx.fillText(label, padX, logicalH / 2 + 0.5)

	return {
		dataUrl: canvas.toDataURL('image/png'),
		width: logicalW,
		height: logicalH,
	}
}
