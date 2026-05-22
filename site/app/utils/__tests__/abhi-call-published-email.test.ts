import { expect, test } from 'vitest'
import { getPublishedAbhiCallEpisodeEmail } from '../abhi-call-published-email.ts'

test('includes the published episode link and artwork image in the email', () => {
	const email = getPublishedAbhiCallEpisodeEmail({
		firstName: 'Ada',
		episodeTitle: 'Episode 12',
		episodeUrl: 'https://abhidev.com/calls/12/34/episode-12',
		imageUrl: 'https://images.example.com/abhi-call-art.jpg',
	})

	expect(email.text).toContain('Episode 12')
	expect(email.text).toContain('https://abhidev.com/calls/12/34/episode-12')
	expect(email.html).toContain('Episode 12')
	expect(email.html).toContain(
		'href="https://abhidev.com/calls/12/34/episode-12"',
	)
	expect(email.html).toContain('<img')
	expect(email.html).toContain('https://images.example.com/abhi-call-art.jpg')
})

test('escapes user-provided content and omits artwork markup when image is missing', () => {
	const email = getPublishedAbhiCallEpisodeEmail({
		firstName: '<Ada & Co>',
		episodeTitle: '<Episode "12">',
		episodeUrl: 'https://abhidev.com/calls?x=1&y=2',
		imageUrl: null,
	})

	expect(email.html).toContain('Hi &lt;Ada &amp; Co&gt;,')
	expect(email.html).toContain('&lt;Episode &quot;12&quot;&gt;')
	expect(email.html).toContain(
		'href="https://abhidev.com/calls?x=1&amp;y=2"',
	)
	expect(email.html).not.toContain('<img')
})
