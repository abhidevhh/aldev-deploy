import { parseWithZod } from '@conform-to/zod/v4'
import * as cookie from 'cookie'
import * as React from 'react'
import { useFetcher } from 'react-router'

import { z } from 'zod'
import { useHints } from './client-hints.tsx'
import { useRequestInfo } from './request-info.ts'

enum Theme {
	DARK = 'dark',
	LIGHT = 'light',
	DAY = 'day',
	BRAND = 'brand',
	RED = 'red',
	BLUE = 'blue',
	REDBLUE = 'redblue',
}
const themes: Array<Theme> = Object.values(Theme)

export const THEME_FETCHER_KEY = 'THEME_FETCHER'

export const ThemeFormSchema = z.object({
	theme: z.enum(['system', 'light', 'day', 'dark', 'brand', 'red', 'blue', 'redblue']),
})

const themeCookieName = 'en_theme'

function getThemeFromCookie() {
	if (typeof document === 'undefined') return null
	const parsed = cookie.parse(document.cookie)[themeCookieName]
	if (isTheme(parsed)) return parsed
	return null
}

function useTheme() {
	const hints = useHints()
	const requestInfo = useRequestInfo()
	const optimisticMode = useOptimisticThemeMode()
	const [theme, setTheme] = React.useState(
		() => requestInfo.userPrefs.theme ?? hints.theme,
	)

	React.useEffect(() => {
		const cookieTheme = getThemeFromCookie()
		if (cookieTheme && cookieTheme !== theme) {
			setTheme(cookieTheme)
		}
	})

	if (optimisticMode) {
		return optimisticMode === 'system' ? hints.theme : optimisticMode
	}

	return theme
}

/**
 * If the user's changing their theme mode preference, this will return the
 * value it's being changed to.
 */
function useOptimisticThemeMode() {
	const themeFetcher = useFetcher({ key: THEME_FETCHER_KEY })

	if (themeFetcher.formData) {
		const submission = parseWithZod(themeFetcher.formData, {
			schema: ThemeFormSchema,
		})
		if (submission.status === 'success') return submission.value.theme
		return null
	}
}

function Themed({
	dark,
	light,
	initialOnly = false,
}: {
	dark: React.ReactNode | string
	light: React.ReactNode | string
	initialOnly?: boolean
}) {
	const theme = useTheme()
	const [initialTheme] = React.useState(theme)
	const themeToReference = initialOnly ? initialTheme : theme

	return <>{themeToReference === 'light' || themeToReference === 'day' ? light : dark}</>
}

function isTheme(value: unknown): value is Theme {
	return typeof value === 'string' && themes.includes(value as Theme)
}

export { useTheme, useOptimisticThemeMode, themes, Theme, isTheme, Themed }
