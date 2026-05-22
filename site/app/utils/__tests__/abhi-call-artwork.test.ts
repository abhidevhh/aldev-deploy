import { describe, expect, test } from 'vitest'
import { getAbhiCallEpisodeArtworkUrl } from '../abhi-call-artwork.ts'

describe('getAbhiCallEpisodeArtworkUrl', () => {
	test('double-encodes title and scales to requested output size', () => {
		const url = getAbhiCallEpisodeArtworkUrl({
			title: 'Hello world',
			url: 'abhidev.com/calls/01/01',
			name: '- Alice',
			avatar: { kind: 'fetch', url: 'https://example.com/avatar.png' },
			avatarIsRound: true,
			size: 900,
		})

		// Layout is composed at 3000, then scaled for preview sizes.
		expect(url).toContain('$th_3000,$tw_3000')
		expect(url).toContain('c_scale,w_900,h_900')
		// "Hello world" => "Hello%20world" => "Hello%2520world"
		expect(url).toContain('Hello%2520world')
	})

	test('adds r_max when avatarIsRound is true', () => {
		const url = getAbhiCallEpisodeArtworkUrl({
			title: 'Test',
			url: 'abhidev.com/calls/00/00',
			name: '- Alice',
			avatar: { kind: 'fetch', url: 'https://example.com/avatar.png' },
			avatarIsRound: true,
		})
		expect(url).toContain('c_crop,r_max')
	})

	test('omits r_max when avatarIsRound is false', () => {
		const url = getAbhiCallEpisodeArtworkUrl({
			title: 'Test',
			url: 'abhidev.com/calls/00/00',
			name: '- Alice',
			avatar: { kind: 'fetch', url: 'https://example.com/avatar.png' },
			avatarIsRound: false,
		})
		expect(url).toContain('c_crop,g_north_west')
		expect(url).not.toContain('r_max')
	})

	test('encodes fetch avatar URL into l_fetch', () => {
		const fetchUrl = 'https://example.com/avatar.png'
		const expectedBase64 = Buffer.from(fetchUrl).toString('base64')
		const url = getAbhiCallEpisodeArtworkUrl({
			title: 'Test',
			url: 'abhidev.com/calls/00/00',
			name: '- Alice',
			avatar: { kind: 'fetch', url: fetchUrl },
			avatarIsRound: false,
		})
		expect(url).toContain(`l_fetch:${encodeURIComponent(expectedBase64)}`)
	})

	test('uses publicId overlays without l_fetch', () => {
		const url = getAbhiCallEpisodeArtworkUrl({
			title: 'Test',
			url: 'abhidev.com/calls/00/00',
			name: '- Alice',
			avatar: {
				kind: 'public',
				publicId: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_profile_gray',
			},
			avatarIsRound: false,
		})
		expect(url).toContain(
			'l_abhidev.com:illustrations:abhiBuddy:abhiBuddy_profile_gray',
		)
		expect(url).not.toContain('l_fetch:')
	})
})
