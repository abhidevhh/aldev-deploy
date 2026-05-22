import { createHmac } from 'node:crypto'
import { expect, test, vi } from 'vitest'

async function loadCallbackModule() {
	vi.resetModules()
	const updateMany = vi.fn()
	const startAbhiCallEpisodeDraftProcessing = vi.fn()
	vi.doMock('#app/utils/prisma.server.ts', () => ({
		prisma: {
			abhiCallEpisodeDraft: {
				updateMany,
			},
		},
	}))
	vi.doMock('#app/utils/abhi-call-episode-draft.server.ts', () => ({
		startAbhiCallEpisodeDraftProcessing,
	}))
	const mod = await import('../abhi-call-audio-processor-callback.server.ts')
	return {
		updateMany,
		startAbhiCallEpisodeDraftProcessing,
		...mod,
	}
}

test('verifyAbhiCallAudioProcessorCallbackSignature validates signed payload', async () => {
	vi.clearAllMocks()
	process.env.ABHI_CALL_AUDIO_PROCESSOR_CALLBACK_SECRET = 'test-secret'
	const { verifyAbhiCallAudioProcessorCallbackSignature } =
		await loadCallbackModule()
	const rawBody = JSON.stringify({ hello: 'world' })
	const timestamp = '1710000000'
	const signature = createHmac(
		'sha256',
		process.env.ABHI_CALL_AUDIO_PROCESSOR_CALLBACK_SECRET,
	)
		.update(`${timestamp}.${rawBody}`, 'utf8')
		.digest('hex')
	expect(
		verifyAbhiCallAudioProcessorCallbackSignature({
			timestamp,
			signature,
			rawBody,
			now: Number(timestamp) * 1000,
		}),
	).toBe(true)
	expect(
		verifyAbhiCallAudioProcessorCallbackSignature({
			timestamp,
			signature: `${signature}00`,
			rawBody,
			now: Number(timestamp) * 1000,
		}),
	).toBe(false)
	expect(
		verifyAbhiCallAudioProcessorCallbackSignature({
			timestamp,
			signature: `${signature}0`,
			rawBody,
			now: Number(timestamp) * 1000,
		}),
	).toBe(false)
})

test('handleAbhiCallAudioProcessorEvent stores generated audio metadata and continues processing', async () => {
	vi.clearAllMocks()
	const {
		updateMany,
		startAbhiCallEpisodeDraftProcessing,
		handleAbhiCallAudioProcessorEvent,
	} = await loadCallbackModule()
	updateMany.mockResolvedValue({
		count: 1,
	})
	await handleAbhiCallAudioProcessorEvent({
		type: 'audio_generation_completed',
		draftId: 'draft-1',
		episodeAudioKey: 'abhi-call/drafts/draft-1/episode.mp3',
		episodeAudioContentType: 'audio/mpeg',
		episodeAudioSize: 321,
		callerSegmentAudioKey: 'abhi-call/drafts/draft-1/caller-segment.mp3',
		responseSegmentAudioKey: 'abhi-call/drafts/draft-1/response-segment.mp3',
	})
	expect(updateMany).toHaveBeenCalledWith({
		where: {
			id: 'draft-1',
			status: 'PROCESSING',
			step: { in: ['STARTED', 'GENERATING_AUDIO'] },
		},
		data: {
			episodeAudioKey: 'abhi-call/drafts/draft-1/episode.mp3',
			episodeAudioContentType: 'audio/mpeg',
			episodeAudioSize: 321,
			callerSegmentAudioKey: 'abhi-call/drafts/draft-1/caller-segment.mp3',
			responseSegmentAudioKey: 'abhi-call/drafts/draft-1/response-segment.mp3',
			step: 'TRANSCRIBING',
			errorMessage: null,
		},
	})
	expect(startAbhiCallEpisodeDraftProcessing).toHaveBeenCalledWith('draft-1')
})
