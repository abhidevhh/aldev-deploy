import * as cookie from 'cookie'

const cookieName = 'en_theme'
export type Theme = 'light' | 'dark' | 'day' | 'brand' | 'red' | 'blue' | 'redblue'

const isTheme = (value: unknown): value is Theme =>
	typeof value === 'string' &&
	['light', 'dark', 'day', 'brand', 'red', 'blue', 'redblue'].includes(value)

export function getTheme(request: Request): Theme | null {
	const cookieHeader = request.headers.get('cookie')
	const parsed = cookieHeader ? cookie.parse(cookieHeader)[cookieName] : 'light'
	if (isTheme(parsed)) return parsed
	return null
}

export function setTheme(theme: Theme | 'system') {
	if (theme === 'system') {
		return cookie.serialize(cookieName, '', { path: '/', maxAge: -1 })
	} else {
		return cookie.serialize(cookieName, theme, { path: '/' })
	}
}
