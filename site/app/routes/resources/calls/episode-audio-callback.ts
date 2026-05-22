import {
	handleAbhiCallAudioProcessorEvent,
	parseAbhiCallAudioProcessorEvent,
	verifyAbhiCallAudioProcessorCallbackSignature,
} from '#app/utils/abhi-call-audio-processor-callback.server.ts'

const callbackTimestampHeader = 'x-abhi-call-audio-timestamp'
const callbackSignatureHeader = 'x-abhi-call-audio-signature'

export async function action({ request }: { request: Request }) {
	if (request.method !== 'POST') {
		return new Response('Method not allowed', { status: 405 })
	}
	const rawBody = await request.text()
	const timestamp = request.headers.get(callbackTimestampHeader)
	const signature = request.headers.get(callbackSignatureHeader)
	if (!timestamp || !signature) {
		return new Response('Missing callback signature', { status: 401 })
	}
	const isValid = verifyAbhiCallAudioProcessorCallbackSignature({
		timestamp,
		signature,
		rawBody,
	})
	if (!isValid) {
		return new Response('Invalid callback signature', { status: 401 })
	}

	let payload: unknown
	try {
		payload = rawBody ? JSON.parse(rawBody) : null
	} catch {
		return new Response('Invalid JSON body', { status: 400 })
	}

	let event
	try {
		event = parseAbhiCallAudioProcessorEvent(payload)
	} catch {
		return new Response('Invalid callback payload', { status: 400 })
	}

	await handleAbhiCallAudioProcessorEvent(event)
	return Response.json({ ok: true })
}
