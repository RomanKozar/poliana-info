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

/** Біла таблетка (дефолт) або чорна як при наведенні на картку в списку. */
export type HotelPricePillVariant = 'default' | 'active'

/**
 * «Пігулка» ціни (PNG data URL для google.maps.Marker icon).
 * `active` — чорний фон, білий текст (як підсвічена мітка на референсі).
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
	const active = variant === 'active'

	ctx.save()
	ctx.shadowColor = active ? 'rgba(0, 0, 0, 0.35)' : 'rgba(15, 23, 42, 0.14)'
	ctx.shadowBlur = active ? 6 : 5
	ctx.shadowOffsetY = 1
	ctx.fillStyle = active ? '#111827' : '#ffffff'
	ctx.beginPath()
	ctx.roundRect(0, 0, logicalW, logicalH, r)
	ctx.fill()
	ctx.restore()

	ctx.strokeStyle = active ? '#1f2937' : '#e5e7eb'
	ctx.lineWidth = 1
	ctx.beginPath()
	ctx.roundRect(0, 0, logicalW, logicalH, r)
	ctx.stroke()

	ctx.fillStyle = active ? '#ffffff' : '#111827'
	ctx.textBaseline = 'middle'
	ctx.textAlign = 'left'
	ctx.fillText(label, padX, logicalH / 2 + 0.5)

	return {
		dataUrl: canvas.toDataURL('image/png'),
		width: logicalW,
		height: logicalH,
	}
}
