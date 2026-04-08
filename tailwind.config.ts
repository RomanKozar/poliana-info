import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				// Додаємо ваші фірмові кольори з брендбуку
				poliana: {
					green: '#064E3B', // Темно-зелений (природа, системність)
					coral: '#FF6F61', // Кораловий (емоція, енергія, сонце)
				},
			},
			fontFamily: {
				// Підключаємо шрифт Geometria як основний санс-шрифт
				sans: ['var(--font-geometria)', 'ui-sans-serif', 'system-ui'],
			},
		},
	},
	plugins: [],
}
export default config
