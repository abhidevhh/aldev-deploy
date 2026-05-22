import { expect, test, vi } from 'vitest'
import { formatAbhiCallTranscriptWithWorkersAi } from '#app/utils/cloudflare-ai-abhi-call-transcript-format.server.ts'
import { setEnv } from '#tests/env-disposable.ts'

test('formatAbhiCallTranscriptWithWorkersAi rejects empty transcripts', async () => {
	await expect(
		formatAbhiCallTranscriptWithWorkersAi({ transcript: '' }),
	).rejects.toThrow(/missing transcript input/i)
})

test('formatAbhiCallTranscriptWithWorkersAi returns paragraphs and preserves separators', async () => {
	using _env = setEnv({
		CLOUDFLARE_API_TOKEN: 'MOCK_CLOUDFLARE_API_TOKEN',
		CLOUDFLARE_ACCOUNT_ID: 'mock-account',
		CLOUDFLARE_AI_GATEWAY_ID: 'mock-gateway',
		CLOUDFLARE_AI_GATEWAY_AUTH_TOKEN: 'MOCK_CLOUDFLARE_AI_GATEWAY_AUTH_TOKEN',
		CLOUDFLARE_AI_ABHI_CALL_TRANSCRIPT_FORMAT_MODEL:
			'@cf/meta/llama-3.1-8b-instruct',
	})

	const transcript = `
Announcer: You're listening to the call AbhiDev Podcast. Now let's hear the call.

---

Caller: Hi Kent. I have a question about loaders. I keep seeing double fetching.

---

Kent: Great question. Let's talk about it. First, loaders run on the server.

---

Announcer: This has been the call AbhiDev Podcast. Thanks for listening.
`.trim()

	const formatted = await formatAbhiCallTranscriptWithWorkersAi({ transcript })

	expect(formatted).toContain('Announcer:')
	expect(formatted).toContain('Caller:')
	expect(formatted).toContain('Kent:')

	const originalSepCount = (transcript.match(/^---$/gm) ?? []).length
	const formattedSepCount = (formatted.match(/^---$/gm) ?? []).length
	expect(formattedSepCount).toBe(originalSepCount)

	// The mock formatter inserts a blank line after sentence-ending punctuation.
	expect(formatted).toMatch(/[.!?]\n\n/)
})

test('formatAbhiCallTranscriptWithWorkersAi works without --- separators', async () => {
	using _env = setEnv({
		CLOUDFLARE_API_TOKEN: 'MOCK_CLOUDFLARE_API_TOKEN',
		CLOUDFLARE_ACCOUNT_ID: 'mock-account',
		CLOUDFLARE_AI_GATEWAY_ID: 'mock-gateway',
		CLOUDFLARE_AI_GATEWAY_AUTH_TOKEN: 'MOCK_CLOUDFLARE_AI_GATEWAY_AUTH_TOKEN',
		CLOUDFLARE_AI_ABHI_CALL_TRANSCRIPT_FORMAT_MODEL:
			'@cf/meta/llama-3.1-8b-instruct',
	})

	const transcript = `Caller: Hi Kent. This is a single block transcript. It should still get paragraph breaks.`
	const formatted = await formatAbhiCallTranscriptWithWorkersAi({ transcript })
	expect(formatted).toContain('Caller:')
	expect(formatted).toMatch(/[.!?]\n\n/)
})

test('formatAbhiCallTranscriptWithWorkersAi does not truncate long transcripts', async () => {
	using _env = setEnv({
		CLOUDFLARE_API_TOKEN: 'MOCK_CLOUDFLARE_API_TOKEN',
		CLOUDFLARE_ACCOUNT_ID: 'mock-account',
		CLOUDFLARE_AI_GATEWAY_ID: 'mock-gateway',
		CLOUDFLARE_AI_GATEWAY_AUTH_TOKEN: 'MOCK_CLOUDFLARE_AI_GATEWAY_AUTH_TOKEN',
		CLOUDFLARE_AI_ABHI_CALL_TRANSCRIPT_FORMAT_MODEL:
			'@cf/meta/llama-3.1-8b-instruct',
	})

	const longBody = Array.from(
		{ length: 600 },
		(_, i) => `Sentence ${i + 1}.`,
	).join(' ')
	const transcript = `Kent: ${longBody}`

	const formatted = await formatAbhiCallTranscriptWithWorkersAi({ transcript })
	expect(formatted).toContain('Kent:')
	expect(formatted).toContain('Sentence 600.')
	expect(formatted).toMatch(/[.!?]\n\n/)
})

test('formatAbhiCallTranscriptWithWorkersAi prompts for paragraph breaks in long single-speaker sections', async () => {
	using _env = setEnv({
		CLOUDFLARE_API_TOKEN: 'MOCK_CLOUDFLARE_API_TOKEN',
		CLOUDFLARE_ACCOUNT_ID: 'mock-account',
		CLOUDFLARE_AI_GATEWAY_ID: 'mock-gateway',
		CLOUDFLARE_AI_GATEWAY_AUTH_TOKEN: 'MOCK_CLOUDFLARE_AI_GATEWAY_AUTH_TOKEN',
		CLOUDFLARE_AI_ABHI_CALL_TRANSCRIPT_FORMAT_MODEL:
			'@cf/meta/llama-3.1-8b-instruct',
	})

	const transcript = `Kent: First sentence. Second sentence. Third sentence. Fourth sentence.`

	const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
		ok: true,
		json: async () => ({
			result: {
				response: transcript,
			},
		}),
	} as Response)

	try {
		const formatted = await formatAbhiCallTranscriptWithWorkersAi({
			transcript,
		})
		expect(formatted).toBe(transcript)

		const request = fetchSpy.mock.calls[0]?.[1]
		expect(request).toBeDefined()
		expect(request?.body).toBeTypeOf('string')

		const body = JSON.parse(String(request?.body)) as {
			messages: Array<{ role: string; content: string }>
		}
		expect(body.messages[0]?.content).toContain(
			'For long single-speaker sections, insert paragraph breaks every few sentences or at clear topic shifts.',
		)
		expect(body.messages[0]?.content).not.toContain(
			"(especially Kent's response)",
		)
	} finally {
		fetchSpy.mockRestore()
	}
})
