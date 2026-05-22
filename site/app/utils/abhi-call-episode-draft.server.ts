import { getAudioBuffer } from '#app/utils/abhi-call-audio-storage.server.ts'
import { normalizeCallerTranscriptForEpisode } from '#app/utils/abhi-call-caller-transcript.server.ts'
import { assembleAbhiCallTranscript } from '#app/utils/abhi-call-transcript-template.ts'
import { generateAbhiCallEpisodeMetadataWithWorkersAi } from '#app/utils/cloudflare-ai-abhi-call-metadata.server.ts'
import { formatAbhiCallTranscriptWithWorkersAi } from '#app/utils/cloudflare-ai-abhi-call-transcript-format.server.ts'
import { transcribeMp3WithWorkersAi } from '#app/utils/cloudflare-ai-transcription.server.ts'
import { getErrorMessage } from '#app/utils/misc.ts'
import { prisma } from '#app/utils/prisma.server.ts'

export async function startAbhiCallEpisodeDraftProcessing(draftId: string) {
	// Fire-and-forget background work; errors are recorded on the draft row.
	try {
		const draft = await prisma.abhiCallEpisodeDraft.findUnique({
			where: { id: draftId },
			include: {
				call: {
					select: {
						id: true,
						title: true,
						notes: true,
						isAnonymous: true,
						callerTranscript: true,
						user: { select: { firstName: true } },
					},
				},
			},
		})
		if (!draft) return
		if (draft.status !== 'PROCESSING') return

		// Step 1: episode audio (stitch + persist) if needed
		let episodeMp3: Buffer
		let segmentMp3s: { callerMp3: Buffer; responseMp3: Buffer } | null = null
		if (draft.episodeAudioKey) {
			episodeMp3 = await getAudioBuffer({ key: draft.episodeAudioKey })
		} else {
			throw new Error(
				'Episode audio is missing. Audio generation must complete before draft processing can continue.',
			)
		}

		// Step 2: transcript (skip if already present)
		let transcript = draft.transcript
		let transcriptForMetadata: string | null = null
		let callerTranscriptForMetadata: string | null = null
		let responderTranscriptForMetadata: string | null = null
		if (!transcript) {
			const stepTranscribe = await prisma.abhiCallEpisodeDraft.updateMany({
				where: { id: draftId, status: 'PROCESSING' },
				data: { step: 'TRANSCRIBING', errorMessage: null },
			})
			if (stepTranscribe.count !== 1) return
			const callerName = draft.call.isAnonymous
				? undefined
				: draft.call.user.firstName
			const callTitle = draft.call.title
			const callerNotes = draft.call.notes ?? undefined
			const savedCallerTranscript = normalizeCallerTranscriptForEpisode({
				callerTranscript: draft.call.callerTranscript,
				callerName,
			})

			if (
				!segmentMp3s &&
				draft.callerSegmentAudioKey &&
				draft.responseSegmentAudioKey
			) {
				const [callerMp3, responseMp3] = await Promise.all([
					getAudioBuffer({ key: draft.callerSegmentAudioKey }),
					getAudioBuffer({ key: draft.responseSegmentAudioKey }),
				])
				segmentMp3s = { callerMp3, responseMp3 }
			}

			if (segmentMp3s) {
				const callerTranscriptPromise = savedCallerTranscript
					? Promise.resolve(savedCallerTranscript)
					: transcribeMp3WithWorkersAi({
							mp3: segmentMp3s.callerMp3,
							callerName,
							callTitle,
							callerNotes,
						})
				const [callerTranscript, abhiTranscript] = await Promise.all([
					callerTranscriptPromise,
					transcribeMp3WithWorkersAi({
						mp3: segmentMp3s.responseMp3,
						callerName,
						callTitle,
						callerNotes,
					}),
				])
				callerTranscriptForMetadata = callerTranscript
				responderTranscriptForMetadata = abhiTranscript
				transcript = assembleAbhiCallTranscript({
					callerName,
					callerTranscript,
					abhiTranscript,
				})
			} else {
				// Fallback: transcribe the stitched episode audio (includes bumpers).
				transcript = await transcribeMp3WithWorkersAi({
					mp3: episodeMp3,
					callerName,
					callTitle,
					callerNotes,
				})
			}
			const rawTranscript = transcript.trim()
			if (!rawTranscript) {
				throw new Error(
					'Workers AI transcription returned an empty transcript.',
				)
			}
			transcriptForMetadata = rawTranscript

			transcript = await formatAbhiCallTranscriptWithWorkersAi({
				transcript: rawTranscript,
				callTitle,
				callerNotes,
				callerName,
			}).catch((error: unknown) => {
				console.error(
					'call AbhiDev transcript formatting failed; using unformatted transcript.',
					{ draftId, error: getErrorMessage(error) },
				)
				return rawTranscript
			})
			transcript = transcript.trim()
			if (!transcript) {
				// Should not happen (formatter either returns something or we fall back),
				// but keep the error message clear if it does.
				throw new Error('Transcript formatting returned an empty transcript.')
			}

			const step3 = await prisma.abhiCallEpisodeDraft.updateMany({
				where: { id: draftId, status: 'PROCESSING' },
				data: { transcript, step: 'GENERATING_METADATA' },
			})
			if (step3.count !== 1) return
		}

		if (!transcript) {
			throw new Error('Transcript is missing after transcription/formatting.')
		}

		// Step 3: AI metadata (title/description/keywords) if not already present
		if (!draft.title || !draft.description || !draft.keywords) {
			const stepMetadata = await prisma.abhiCallEpisodeDraft.updateMany({
				where: { id: draftId, status: 'PROCESSING' },
				data: { step: 'GENERATING_METADATA', errorMessage: null },
			})
			if (stepMetadata.count !== 1) return

			const metadata = await generateAbhiCallEpisodeMetadataWithWorkersAi({
				// Prefer segment transcripts (caller + Kent) for metadata when available.
				...(callerTranscriptForMetadata && responderTranscriptForMetadata
					? {
							callerTranscript: callerTranscriptForMetadata,
							responderTranscript: responderTranscriptForMetadata,
						}
					: { transcript: transcriptForMetadata ?? transcript }),
				callTitle: draft.call.title,
				callerNotes: draft.call.notes,
			})

			const existingTitle = draft.title?.trim()
			const existingDescription = draft.description?.trim()
			const existingKeywords = draft.keywords?.trim()
			const nextTitle = existingTitle || metadata.title.trim()
			const nextDescription = existingDescription || metadata.description.trim()
			const nextKeywords = existingKeywords || metadata.keywords.trim()

			await prisma.abhiCallEpisodeDraft.updateMany({
				where: { id: draftId, status: 'PROCESSING' },
				data: {
					title: nextTitle,
					description: nextDescription,
					keywords: nextKeywords,
					status: 'READY',
					step: 'DONE',
				},
			})
		} else {
			await prisma.abhiCallEpisodeDraft.updateMany({
				where: { id: draftId, status: 'PROCESSING' },
				data: { status: 'READY', step: 'DONE' },
			})
		}
	} catch (error: unknown) {
		const message = getErrorMessage(error)
		// Only record the error if the draft still exists and is in progress.
		await prisma.abhiCallEpisodeDraft.updateMany({
			where: { id: draftId, status: 'PROCESSING' },
			data: { status: 'ERROR', errorMessage: message, step: 'DONE' },
		})
	}
}
