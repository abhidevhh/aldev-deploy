import { expect, test } from 'vitest'
import {
	AI_VOICE_DISCLOSURE_PREFIX,
	formatAbhiCallTextToSpeechNotes,
} from '../abhi-call-text-to-speech.ts'

test('formats typed-question notes with AI disclosure prefix', () => {
	const notes = formatAbhiCallTextToSpeechNotes('  Hello from a typed call.  ')
	expect(notes).toBe(
		`${AI_VOICE_DISCLOSURE_PREFIX}\nTyped question: Hello from a typed call.`,
	)
})

test('preserves internal newlines in typed question', () => {
	const question = 'First line\nSecond line'
	const notes = formatAbhiCallTextToSpeechNotes(question)
	expect(notes).toBe(
		`${AI_VOICE_DISCLOSURE_PREFIX}\nTyped question: ${question}`,
	)
})

test('removes duplicate AI disclosure from typed question', () => {
	const question = `${AI_VOICE_DISCLOSURE_PREFIX} Hello from a typed call.`
	const notes = formatAbhiCallTextToSpeechNotes(question)
	expect(notes).toBe(
		`${AI_VOICE_DISCLOSURE_PREFIX}\nTyped question: Hello from a typed call.`,
	)
})

test('returns empty string for empty input', () => {
	expect(formatAbhiCallTextToSpeechNotes('')).toBe('')
})

test('returns empty string for whitespace-only input', () => {
	expect(formatAbhiCallTextToSpeechNotes('   ')).toBe('')
})
