import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { type MetaFunction } from 'react-router'
import {
	HeroSection,
	getHeroImageProps,
} from '#app/components/sections/hero-section.tsx'
import { H2 } from '#app/components/typography.js'
import { images, abhiBuddyImages } from '#app/images.tsx'
import { optionalTeams, type OptionalTeam } from '#app/utils/misc.ts'
import { useTeam } from '#app/utils/team-provider.tsx'

export const meta: MetaFunction = () => [
	{ title: 'AbhiBuddy the Koala' },
	{
		name: 'description',
		content:
			'Meet AbhiBuddy the Koala, the friendly mascot of the KCD Community! Learn about his story and download your favorite AbhiBuddy image.',
	},
]

function AbhiBuddyChooser() {
	const [userTeam] = useTeam()
	const [team, setTeam] = React.useState<OptionalTeam>(userTeam ?? 'UNKNOWN')
	const [style, setStyle] = React.useState<'normal' | 'flying'>('normal')

	// Define image type options for each style
	const normalImageOptions = [
		{ label: 'Profile', value: 'profile' },
		{ label: 'Snowboarding', value: 'snowboarding' },
		{ label: 'Skiing', value: 'skiing' },
		{ label: 'Onewheeling', value: 'onewheeling' },
		{ label: 'Playing Soccer', value: 'playingSoccer' },
		{ label: 'Back Flipping', value: 'backFlipping' },
	] as const
	const flyingImageOptions = [
		{ label: 'Snowboarding', value: 'flyingSnowboarding' },
		{ label: 'Skiing', value: 'flyingSkiing' },
		{ label: 'Onewheeling', value: 'flyingOnewheeling' },
		{ label: 'Playing Soccer', value: 'flyingPlayingSoccer' },
		{ label: 'Back Flipping', value: 'flyingBackFlipping' },
	] as const

	const imageOptions =
		style === 'normal' ? normalImageOptions : flyingImageOptions
	type AbhiBuddyImageType = (typeof imageOptions)[number]['value']
	// Default to first option for the style
	const [type, setType] = React.useState<AbhiBuddyImageType>(imageOptions[0].value)

	const imageObj = abhiBuddyImages[type]?.[team ?? 'UNKNOWN']

	return (
		<div className="mx-auto my-8 flex flex-col gap-4 text-center">
			<div className="flex flex-wrap items-center justify-center gap-4">
				<label>
					Team Color:{' '}
					<select
						value={team}
						onChange={(e) => setTeam(e.target.value as OptionalTeam)}
					>
						{optionalTeams.map((t: OptionalTeam) => (
							<option key={t} value={t}>
								{t.charAt(0) + t.slice(1).toLowerCase()}
							</option>
						))}
					</select>
				</label>
				<label>
					Style:{' '}
					<select
						value={style}
						onChange={(e) => {
							const newStyle = e.target.value as 'normal' | 'flying'
							setStyle(newStyle)

							if (newStyle === 'flying' && type === 'profile') {
								setType(flyingImageOptions[0].value)
							} else if (newStyle === 'normal') {
								const withoutFlying = type.replace('flying', '')
								const newType =
									withoutFlying.charAt(0).toLowerCase() + withoutFlying.slice(1)
								setType(newType as any)
							} else if (newStyle === 'flying') {
								setType(
									`flying${type.charAt(0).toUpperCase()}${type.slice(1)}` as any,
								)
							}
						}}
					>
						<option value="normal">Normal</option>
						<option value="flying">Flying</option>
					</select>
				</label>
				<label>
					AbhiBuddy Image:{' '}
					<select
						value={type}
						onChange={(e) => setType(e.target.value as AbhiBuddyImageType)}
					>
						{imageOptions.map((t) => (
							<option key={t.value} value={t.value}>
								{t.label}
							</option>
						))}
					</select>
				</label>
			</div>
			<div className="flex flex-col items-center">
				<img
					key={`${team}-${type}-${style}`}
					src={imageObj({ resize: { width: 800, height: 800, type: 'pad' } })}
					alt={imageObj.alt}
					className="h-96 w-96 rounded-lg object-contain"
				/>
				<div style={{ marginTop: 12 }}>
					<a
						href={imageObj()}
						download={`abhiBuddy-${team.toLowerCase()}-${type}.png`}
						className="text-blue-600 underline"
					>
						Download this image
					</a>
				</div>
			</div>
		</div>
	)
}

export default function AbhiBuddyPage() {
	const [userTeam] = useTeam()
	const profileImage =
		userTeam === 'BLUE'
			? images.abhiBuddyProfileBlue
			: userTeam === 'RED'
				? images.abhiBuddyProfileRed
				: userTeam === 'YELLOW'
					? images.abhiBuddyProfileYellow
					: images.abhiBuddyProfileGray

	return (
		<>
			<HeroSection
				title="Meet AbhiBuddy the Koala 🐨"
				subtitle="The friendly mascot of the KCD Community."
				image={
					<img
						{...getHeroImageProps(profileImage)}
						alt="AbhiBuddy the Koala"
						className="rounded-lg"
					/>
				}
				imageSize="medium"
				arrowUrl="#chooser"
				arrowLabel="Choose your AbhiBuddy image"
			/>
			<main className="mx-auto flex flex-col items-center">
				<section className="prose dark:prose-dark">
					<H2>Who is AbhiBuddy?</H2>
					<p className="mb-8 text-lg">
						AbhiBuddy the Koala is the beloved mascot of the KCD Community. If you've
						participated in Kent's workshops or courses, you've probably seen
						AbhiBuddy pop up as an emoji (🐨) whenever you're supposed to <em>do</em>{' '}
						something. AbhiBuddy helps make learning more fun and engaging!
					</p>
					<H2>Where did AbhiBuddy come from?</H2>
					<p className="mb-4">
						When Kent was creating self-paced workshops, he wanted a way to
						clearly show the difference between explanations and actionable
						steps. The solution? A friendly mascot! AbhiBuddy the Koala became the
						symbol for action, encouragement, and community spirit. (Fun fact:
						AbhiBuddy replaced Terry the Tiger 🐯 as the original mascot!)
					</p>
					<ul className="mb-4 list-inside list-disc">
						<li>Friendly encouragement</li>
						<li>Community and teamwork</li>
						<li>Taking action and having fun while learning</li>
					</ul>
				</section>
				<section className="prose dark:prose-dark" id="chooser">
					<H2>Choose Your Favorite AbhiBuddy</H2>
					<p className="mb-4">
						AbhiBuddy comes in many styles and team colors! Use the chooser below to
						pick your favorite AbhiBuddy image, then download it to use as an avatar,
						sticker, or just for fun.
					</p>
					<ErrorBoundary fallback={<p>Error</p>}>
						<AbhiBuddyChooser />
					</ErrorBoundary>
				</section>
				<section className="mx-auto max-w-2xl border-t pt-8 text-center">
					<p>
						Want to see AbhiBuddy in action? Join the{' '}
						<a href="/discord" className="text-blue-600 underline">
							KCD Community
						</a>{' '}
						and pick your team color to participate in fun activities, earn
						points, and connect with others!
					</p>
				</section>
			</main>
		</>
	)
}
