'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

/** Якщо в консолі браузера виконати localStorage.setItem(LS_HIDE_KEY, '1') і оновити сторінку — віджет не завантажиться (лише цей браузер). */
export const TAWK_LOCALSTORAGE_HIDE_KEY = 'polyana_hide_tawk'

/** Повний URL віджета з панелі Tawk.to (можна перевизначити через NEXT_PUBLIC_TAWK_EMBED_SRC). */
const TAWK_EMBED_SRC =
	process.env.NEXT_PUBLIC_TAWK_EMBED_SRC?.trim() ||
	'https://embed.tawk.to/69f8cee14126b11c39d6082c/1jnpug85l'

/**
 * Чат Tawk.to на всіх сторінках (після гідратації).
 *
 * Вимкнути для всіх відвідувачів: у `.env` / налаштуваннях хостингу задайте
 * `NEXT_PUBLIC_TAWK_DISABLED=true` і перезберіть сайт.
 *
 * Приховати лише у своєму браузері (без деплою): DevTools → Console →
 * `localStorage.setItem('polyana_hide_tawk','1'); location.reload()`
 * Повернути чат: `localStorage.removeItem('polyana_hide_tawk'); location.reload()`
 *
 * Також можна керувати видимістю та розкладом у панелі Tawk.to (Dashboard).
 *
 * Щоб після кліку на бульбашку не з’являвся «головний» екран (привітання, Help Center,
 * пошук по базі знань), а одразу був діалог — це налаштовується в Tawk, а не в коді сайту:
 * увійдіть на https://dashboard.tawk.to → Administration (Адміністрування) → Chat Widget
 * (Віджет чату) → розділ на кшталт **Widget Content** / **Content** / **Channels** — вимкніть
 * **Knowledge Base** / центр допомоги та зайві картки, залиште лише чат. Після збереження
 * зміни застосовуються без оновлення коду.
 *
 * Альтернатива: у розділі **Direct Chat Link** скопіюйте пряме посилання на чат і використайте
 * його для окремої кнопки «Написати» (відкриється окрема сторінка чату).
 */
export default function TawkToScript() {
	const [loadWidget, setLoadWidget] = useState(false)

	useEffect(() => {
		if (process.env.NEXT_PUBLIC_TAWK_DISABLED === 'true') {
			return
		}
		try {
			if (typeof window.localStorage !== 'undefined') {
				if (window.localStorage.getItem(TAWK_LOCALSTORAGE_HIDE_KEY) === '1') {
					return
				}
			}
		} catch {
			/* приватний режим / недоступний storage */
		}
		setLoadWidget(true)
	}, [])

	if (!loadWidget) {
		return null
	}

	const srcJson = JSON.stringify(TAWK_EMBED_SRC)

	return (
		<Script id='tawk-to-bootstrap' strategy='lazyOnload'>
			{`
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src=${srcJson};
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
			`}
		</Script>
	)
}
