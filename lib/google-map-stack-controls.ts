/** Іконки для кнопки розгортання (синхронізація з React-станом). */
export const ACCOMMODATION_MAP_EXPAND_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>'

export const ACCOMMODATION_MAP_COLLAPSE_ICON =
	'<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M4 14h6v6M4 14l6 6M20 10h-6V4M20 10l-6-6"/></svg>'

function addZoomColumn(map: any, maps: any): HTMLDivElement {
	const zoomCol = document.createElement('div')
	zoomCol.className = 'accommodation-map-stack-controls__zoom'

	const addZoomBtn = (title: string, delta: number) => {
		const btn = document.createElement('button')
		btn.type = 'button'
		btn.className =
			delta > 0
				? 'accommodation-map-stack-controls__zoom-btn accommodation-map-stack-controls__zoom-btn--in'
				: 'accommodation-map-stack-controls__zoom-btn accommodation-map-stack-controls__zoom-btn--out'
		btn.title = title
		btn.setAttribute('aria-label', title)
		btn.appendChild(document.createTextNode(delta > 0 ? '+' : '−'))
		btn.addEventListener('click', () => {
			const z = map.getZoom()
			if (typeof z === 'number') map.setZoom(z + delta)
		})
		return btn
	}

	zoomCol.appendChild(addZoomBtn('Збільшити', 1))
	zoomCol.appendChild(addZoomBtn('Зменшити', -1))
	return zoomCol
}

function removeControlFromSlot(map: any, maps: any, root: HTMLDivElement) {
	const CP = maps.ControlPosition
	const slot = map.controls[CP.RIGHT_TOP]
	for (let i = slot.getLength() - 1; i >= 0; i--) {
		if (slot.getAt(i) === root) {
			slot.removeAt(i)
			break
		}
	}
}

/** Лише +/− зум (якщо не потрібна кнопка розгортання). */
export function attachPolyanaMapZoomControlsOnly(map: any, maps: any): () => void {
	const CP = maps.ControlPosition
	const root = document.createElement('div')
	root.className = 'accommodation-map-stack-controls'
	root.appendChild(addZoomColumn(map, maps))
	map.controls[CP.RIGHT_TOP].push(root)
	return () => removeControlFromSlot(map, maps, root)
}

/** Повний стек: розгортання карти + зум (як на проживанні та головній). */
export function attachPolyanaMapExpandAndZoomControls(
	map: any,
	maps: any,
	opts: { onToggleExpand: () => void }
): () => void {
	const CP = maps.ControlPosition

	const root = document.createElement('div')
	root.className = 'accommodation-map-stack-controls'

	const fsBtn = document.createElement('button')
	fsBtn.type = 'button'
	fsBtn.className = 'accommodation-map-stack-controls__fullscreen'
	fsBtn.title = 'Розгорнути карту'
	fsBtn.setAttribute('aria-label', 'Розгорнути карту')
	fsBtn.setAttribute('aria-pressed', 'false')
	fsBtn.setAttribute('data-expanded', 'false')
	fsBtn.innerHTML = ACCOMMODATION_MAP_EXPAND_ICON

	const zoomCol = addZoomColumn(map, maps)

	root.appendChild(fsBtn)
	root.appendChild(zoomCol)

	fsBtn.addEventListener('click', () => opts.onToggleExpand())

	map.controls[CP.RIGHT_TOP].push(root)
	return () => removeControlFromSlot(map, maps, root)
}
