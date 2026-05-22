import { Buffer } from 'node:buffer'
import { expect, test, vi } from 'vitest'

async function loadDraftModule() {
	vi.resetModules()
	const getAudioBuffer = vi.fn()
	const assembleAbhiCallTranscript = vi.fn()
	const generateAbhiCallEpisodeMetadataWithWorkersAi = vi.fn()
	const formatAbhiCallTranscriptWithWorkersAi = vi.fn()
	const transcribeMp3WithWorkersAi = vi.fn()
	const findUnique = vi.fn()
	const updateMany = vi.fn()

	vi.doMock('#app/utils/abhi-call-audio-storage.server.ts', () => ({
		getAudioBuffer,
	}))
	vi.doMock('#app/utils/abhi-call-transcript-template.ts', () => ({
		assembleAbhiCallTranscript,
	}))
	vi.doMock('#app/utils/cloudflare-ai-abhi-call-metadata.server.ts', () => ({
		generateAbhiCallEpisodeMetadataWithWorkersAi,
	}))
	vi.doMock(
		'#app/utils/cloudflare-ai-abhi-call-transcript-format.server.ts',
		() => ({
			formatAbhiCallTranscriptWithWorkersAi,
		}),
	)
	vi.doMock('#app/utils/cloudflare-ai-transcription.server.ts', () => ({
		transcribeMp3WithWorkersAi,
	}))
	vi.doMock('#app/utils/prisma.server.ts', () => ({
		prisma: {
			callKentEpisodeDraft: {
				findUnique,
				updateMany,
			},
		},
	}))

	const mod = await import('../abhi-call-episode-draft.server.ts')

	return {
		getAudioBuffer,
		assembleAbhiCallTranscript,
		generateAbhiCallEpisodeMetadataWithWorkersAi,
		formatAbhiCallTranscriptWithWorkersAi,
		transcribeMp3WithWorkersAi,
		findUnique,
		updateMany,
		...mod,
	}
}

test('startAbhiCallEpisodeDraftProcessing reuses saved caller transcript', async () => {
	vi.clearAllMocks()
	const {
		getAudioBuffer,
		assembleAbhiCallTranscript,
		generateAbhiCallEpisodeMetadataWithWorkersAi,
		formatAbhiCallTranscriptWithWorkersAi,
		transcribeMp3WithWorkersAi,
		findUnique,
		updateMany,
		startAbhiCallEpisodeDraftProcessing,
	} = await loadDraftModule()

	const callerSegmentAudio = Buffer.from('caller-segment-audio')
	const responseSegmentAudio = Buffer.from('response-segment-audio')

	findUnique.mockResolvedValue({
		id: 'draft-1',
		status: 'PROCESSING',
		step: 'TRANSCRIBING',
		transcript: null,
		title: null,
		description: null,
		keywords: null,
		episodeAudioKey: 'drafts/draft-1.mp3',
		callerSegmentAudioKey: 'drafts/draft-1-caller.mp3',
		responseSegmentAudioKey: 'drafts/draft-1-response.mp3',
		call: {
			id: 'call-1',
			title: 'A testing question',
			notes: 'Need confidence in this flow.',
			isAnonymous: false,
			callerTranscript: 'Caller: I edited this caller transcript.',
			user: { firstName: 'Riley' },
		},
	})
	updateMany.mockResolvedValue({ count: 1 })
	getAudioBuffer
		.mockResolvedValueOnce(Buffer.from('episode-audio'))
		.mockResolvedValueOnce(callerSegmentAudio)
		.mockResolvedValueOnce(responseSegmentAudio)
	transcribeMp3WithWorkersAi.mockResolvedValue('This is Kent responding.')
	assembleAbhiCallTranscript.mockReturnValue('raw assembled transcript')
	formatAbhiCallTranscriptWithWorkersAi.mockResolvedValue(
		'formatted transcript',
	)
	generateAbhiCallEpisodeMetadataWithWorkersAi.mockResolvedValue({
		title: 'Episode title',
		description: 'Episode description',
		keywords: 'testing, transcript',
	})

	await startAbhiCallEpisodeDraftProcessing('draft-1')

	expect(transcribeMp3WithWorkersAi).toHaveBeenCalledTimes(1)
	expect(transcribeMp3WithWorkersAi).toHaveBeenCalledWith({
		mp3: responseSegmentAudio,
		callerName: 'Riley',
		callTitle: 'A testing question',
		callerNotes: 'Need confidence in this flow.',
	})
	expect(assembleAbhiCallTranscript).toHaveBeenCalledWith({
		callerName: 'Riley',
		callerTranscript: 'I edited this caller transcript.',
		kentTranscript: 'This is Kent responding.',
	})
	expect(generateAbhiCallEpisodeMetadataWithWorkersAi).toHaveBeenCalledWith({
		callerTranscript: 'I edited this caller transcript.',
		responderTranscript: 'This is Kent responding.',
		callTitle: 'A testing question',
		callerNotes: 'Need confidence in this flow.',
	})
})
