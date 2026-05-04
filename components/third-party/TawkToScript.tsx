import Script from 'next/script'

/** Повний URL віджета з панелі Tawk.to (можна перевизначити через NEXT_PUBLIC_TAWK_EMBED_SRC). */
const TAWK_EMBED_SRC =
	process.env.NEXT_PUBLIC_TAWK_EMBED_SRC?.trim() ||
	'https://embed.tawk.to/69f8cee14126b11c39d6082c/1jnpug85l'

/**
 * Чат Tawk.to на всіх сторінках.
 * Вимкнути локально: NEXT_PUBLIC_TAWK_DISABLED=true
 */
export default function TawkToScript() {
	if (process.env.NEXT_PUBLIC_TAWK_DISABLED === 'true') {
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
