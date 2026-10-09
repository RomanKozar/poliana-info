/**
 * Відкладає завантаження сторонніх віджетів (Binotel, Tawk) до взаємодії або idle —
 * менше невикористаного JS/CSS у першому завантаженні PageSpeed.
 */
export function scheduleDeferredClientLoad(onLoad: () => void): () => void {
	let done = false
	const run = () => {
		if (done) return
		done = true
		onLoad()
		cleanup()
	}

	const onInteraction = () => run()
	const events = ['scroll', 'pointerdown', 'keydown', 'touchstart'] as const
	for (const event of events) {
		window.addEventListener(event, onInteraction, { once: true, passive: true })
	}

	let idleId: number | undefined
	if (typeof window.requestIdleCallback === 'function') {
		idleId = window.requestIdleCallback(run, { timeout: 8000 })
	}
	const timeoutId = window.setTimeout(run, 8000)

	function cleanup() {
		for (const event of events) {
			window.removeEventListener(event, onInteraction)
		}
		if (idleId != null && typeof window.cancelIdleCallback === 'function') {
			window.cancelIdleCallback(idleId)
		}
		window.clearTimeout(timeoutId)
	}

	return cleanup
}
