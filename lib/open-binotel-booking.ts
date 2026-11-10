export const BINOTEL_BOOK_TITLE = 'Забронювати. Ми передзвонимо.'

const DEFAULT_TEL = '0502149266'

type OpenPassiveForm = (title: string, description?: string) => void

function findOpenPassiveForm(widget: object): OpenPassiveForm | null {
	for (const key of Object.keys(widget)) {
		if (key.toLowerCase() !== 'openpassiveform') continue
		const fn = (widget as Record<string, unknown>)[key]
		if (typeof fn === 'function') return fn as OpenPassiveForm
	}
	return null
}

declare global {
	interface Window {
		BinotelGetCall?: Record<string, object>
	}
}

/** Відкриває форму зворотного дзвінка Binotel. Повертає false, якщо віджет ще не завантажився. */
export function openBinotelBooking(description: string): boolean {
	if (typeof window === 'undefined') return false
	const widgets = window.BinotelGetCall
	if (!widgets) return false
	for (const widget of Object.values(widgets)) {
		if (!widget || typeof widget !== 'object') continue
		const openForm = findOpenPassiveForm(widget)
		if (openForm) {
			openForm.call(widget, BINOTEL_BOOK_TITLE, description)
			return true
		}
	}
	return false
}

export function dialBookingFallback(tel: string) {
	const raw = tel.trim()
	if (!raw) return
	window.location.href = raw.startsWith('tel:') ? raw : `tel:${raw}`
}

export function handleBinotelBookClick(description: string, tel: string = DEFAULT_TEL) {
	if (!openBinotelBooking(description)) dialBookingFallback(tel)
}

const BINOTEL_ACCEPTED_RE =
	/Замовлення дзвінка прийнято|Ми Вам вже телефонуємо|Ми з Вами зв['’]яжемось/

function callWidgetMethod(name: string) {
	const widgets = window.BinotelGetCall
	if (!widgets) return
	for (const widget of Object.values(widgets)) {
		if (!widget || typeof widget !== 'object') continue
		const key = Object.keys(widget).find(item => item.toLowerCase() === name)
		const fn = key ? (widget as Record<string, unknown>)[key] : undefined
		if (typeof fn !== 'function') continue
		try {
			fn.call(widget)
		} catch {
			/* віджет може кинути помилку під час закриття */
		}
	}
}

/** Binotel показав, що дзвінок уже замовлено. */
export function binotelCallWasAccepted(): boolean {
	for (const id of ['bingc-passive', 'bingc-active']) {
		const el = document.getElementById(id)
		if (!el || getComputedStyle(el).display === 'none') continue
		if (BINOTEL_ACCEPTED_RE.test(el.innerText || '')) return true
	}
	return false
}

export function closeBinotelWindows() {
	callWidgetMethod('closeactiveform')
	document.querySelectorAll('.bingc-blur-whole-page').forEach(el => {
		el.classList.remove('bingc-blur-whole-page')
	})
	for (const id of ['bingc-passive', 'bingc-active']) {
		const el = document.getElementById(id)
		if (el) el.style.display = 'none'
	}
}
