/**
 * Мінімальний AASA без прив’язки до iOS-додатка — знімає 404 у GSC для сканерів Apple/Google.
 * @see https://developer.apple.com/documentation/xcode/supporting-associated-domains
 */
export const APPLE_APP_SITE_ASSOCIATION_JSON = JSON.stringify({
	applinks: {
		apps: [],
		details: [],
	},
	webcredentials: {
		apps: [],
	},
})

export const APPLE_AASA_HEADERS = {
	'Content-Type': 'application/json; charset=utf-8',
	'Cache-Control': 'public, max-age=86400',
} as const
