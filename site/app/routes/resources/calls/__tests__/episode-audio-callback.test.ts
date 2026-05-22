import { expect, test, vi } from 'vitest'

vi.mock('#app/utils/abhi-call-audio-processor-callback.server.ts', () => ({
	handleAbhiCallAudioProcessorEvent: vi.fn(),
	parseAbhiCallAudioProcessorEvent: vi.fn(),
	verifyAbhiCallAudioProcessorCallbackSignature: vi.fn(),
}))

import {
	handleAbhiCallAudioProcessorEvent,
	parseAbhiCallAudioProcessorEvent,
	verifyAbhiCallAudioProcessorCallbackSignature,
} from '#app/utils/abhi-call-audio-processor-callback.server.ts'
import { action } from '../episode-audio-callback.ts'

test('episode-audio-callback rejects unsigned cloudflare callback', async () => {
	vi.clearAllMocks()
	process.env.ABHI_CALL_AUDIO_PROCESSOR_CALLBACK_SECRET = 'callback-secret'
	const request = new Request(
		'http://localhost/resources/calls/episode-audio-callback',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				type: 'audio_generation_started',
				draftId: 'draft-1',
			}),
		},
	)
	const response = await action({ request })
	expect(response.status).toBe(401)
	expect(verifyAbhiCallAudioProcessorCallbackSignature).not.toHaveBeenCalled()
})

test('episode-audio-callback validates, parses, and handles callback payload', async () => {
	vi.clearAllMocks()
	process.env.ABHI_CALL_AUDIO_PROCESSOR_CALLBACK_SECRET = 'callback-secret'
	vi.mocked(verifyAbhiCallAudioProcessorCallbackSignature).mockReturnValue(true)
	vi.mocked(parseAbhiCallAudioProcessorEvent).mockReturnValue({
		type: 'audio_generation_started',
		draftId: 'draft-1',
	})
	const request = new Request(
		'http://localhost/resources/calls/episode-audio-callback',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-abhi-call-audio-timestamp': '1710000000',
				'x-abhi-call-audio-signature': 'abcd',
			},
			body: JSON.stringify({
				type: 'audio_generation_started',
				draftId: 'draft-1',
			}),
		},
	)
	const response = await action({ request })
	expect(response.status).toBe(200)
	expect(verifyAbhiCallAudioProcessorCallbackSignature).toHaveBeenCalled()
	expect(parseAbhiCallAudioProcessorEvent).toHaveBeenCalled()
	expect(handleAbhiCallAudioProcessorEvent).toHaveBeenCalledWith({
		type: 'audio_generation_started',
		draftId: 'draft-1',
	})
})
