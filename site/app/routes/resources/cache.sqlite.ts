import { data as json, redirect } from 'react-router'
import { cache } from '#app/utils/cache.server'
import { type Route } from './+types/cache.sqlite'

export async function action({ request }: Route.ActionArgs) {
	const { getInstanceInfo } = await import('#app/utils/litefs-js.server')
	const { currentIsPrimary, primaryInstance } = await getInstanceInfo()

	if (!currentIsPrimary) {
		throw new Error(
			`${request.url} should only be called on the primary instance (${primaryInstance})}`,
		)
	}

	const token = process.env.INTERNAL_COMMAND_TOKEN || 'dev-token'

	const isAuthorized =
		request.headers.get('Authorization') === `Bearer ${token}`

	if (!isAuthorized) {
		console.log(
			`Unauthorized request to ${request.url}, redirecting to solid tunes 🎶`,
		)

		return redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
	}

	const body = (await request.json()) as any
	const { key, cacheValue } = body

	if (cacheValue === undefined) {
		console.log(`Deleting ${key} from the cache from remote`)
		await cache.delete(key)
	} else {
		console.log(`Setting ${key} in the cache from remote`)
		await cache.set(key, cacheValue)
	}

	return json({ success: true })
}
