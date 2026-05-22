import { data as json, type MetaFunction } from 'react-router'
import { Grid } from '#app/components/grid.tsx'
import { HeroSection } from '#app/components/sections/hero-section.tsx'
import { H2, Paragraph } from '#app/components/typography.tsx'
import { getGenericSocialImage, images } from '#app/images.tsx'
import { type RootLoaderType } from '#app/root.tsx'
import { getDisplayUrl, getUrl } from '#app/utils/misc.ts'
import { getSocialMetas } from '#app/utils/seo.ts'
import { getServerTimeHeader } from '#app/utils/timing.server.ts'
import { type Route } from './+types/team'

export const meta: MetaFunction<typeof loader, { root: RootLoaderType }> = ({
	matches,
}) => {
	const requestInfo = matches.find((m) => m.id === 'root')?.data.requestInfo
	return getSocialMetas({
		title: `Our Team`,
		description: `Meet the talented team behind the scenes`,
		url: getUrl(requestInfo),
		image: getGenericSocialImage({
			url: getDisplayUrl(requestInfo),
			featuredImage: images.snowboard(),
			words: `Our Team`,
		}),
	})
}

export async function loader({ request }: Route.LoaderArgs) {
	const timings = {}
	return json(
		{},
		{
			headers: {
				'Cache-Control': 'private, max-age=3600',
				Vary: 'Cookie',
				'Server-Timing': getServerTimeHeader(timings),
			},
		},
	)
}

export default function TeamScreen() {
	return (
		<>
			<HeroSection
				title="Meet Our Team"
				subtitle="Talented professionals dedicated to excellence"
				imageBuilder={images.snowboard}
				arrowUrl="#team"
				arrowLabel="Meet the team"
			/>
			<main>
				<Grid className="mb-24">
					<div className="col-span-full">
						<H2 id="team" className="mb-8">
							Team Members
						</H2>
						<Paragraph className="mb-6 max-w-2xl">
							Our diverse team brings together expertise from various fields.
							Together, we create innovative solutions and deliver exceptional
							results.
						</Paragraph>
					</div>
					<div className="col-span-full md:col-span-4">
						<div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
							<h3 className="text-lg font-semibold mb-2">Team Member One</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
								Role / Position
							</p>
							<p className="text-gray-600 dark:text-gray-400">
								Add information about this team member's background, expertise, and
								contributions.
							</p>
						</div>
					</div>
					<div className="col-span-full md:col-span-4">
						<div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
							<h3 className="text-lg font-semibold mb-2">Team Member Two</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
								Role / Position
							</p>
							<p className="text-gray-600 dark:text-gray-400">
								Add information about this team member's background, expertise, and
								contributions.
							</p>
						</div>
					</div>
					<div className="col-span-full md:col-span-4">
						<div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
							<h3 className="text-lg font-semibold mb-2">Team Member Three</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
								Role / Position
							</p>
							<p className="text-gray-600 dark:text-gray-400">
								Add information about this team member's background, expertise, and
								contributions.
							</p>
						</div>
					</div>
				</Grid>
			</main>
		</>
	)
}
