import { data as json, type MetaFunction } from 'react-router'
import { Grid } from '#app/components/grid.tsx'
import { HeroSection } from '#app/components/sections/hero-section.tsx'
import { H2, Paragraph } from '#app/components/typography.tsx'
import { getGenericSocialImage, images } from '#app/images.tsx'
import { type RootLoaderType } from '#app/root.tsx'
import { getDisplayUrl, getUrl } from '#app/utils/misc.ts'
import { getSocialMetas } from '#app/utils/seo.ts'
import { getServerTimeHeader } from '#app/utils/timing.server.ts'
import { type Route } from './+types/features'

export const meta: MetaFunction<typeof loader, { root: RootLoaderType }> = ({
	matches,
}) => {
	const requestInfo = matches.find((m) => m.id === 'root')?.data.requestInfo
	return getSocialMetas({
		title: `Features`,
		description: `Explore the features and capabilities of our platform`,
		url: getUrl(requestInfo),
		image: getGenericSocialImage({
			url: getDisplayUrl(requestInfo),
			featuredImage: images.snowboard(),
			words: `Features`,
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

export default function FeaturesScreen() {
	return (
		<>
			<HeroSection
				title="Powerful Features"
				subtitle="Discover what makes us stand out"
				imageBuilder={images.snowboard}
				arrowUrl="#features"
				arrowLabel="Learn more"
			/>
			<main>
				<Grid className="mb-24">
					<div className="col-span-full">
						<H2 id="features" className="mb-8">
							Key Features
						</H2>
						<Paragraph className="mb-6 max-w-2xl">
							We provide cutting-edge tools and features designed to help you
							succeed. From advanced analytics to seamless integration, everything
							you need is here.
						</Paragraph>
					</div>
					<div className="col-span-full md:col-span-4">
						<div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
							<h3 className="text-lg font-semibold mb-3">Feature One</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Description of your first feature goes here. Edit this text to
								customize it for your needs.
							</p>
						</div>
					</div>
					<div className="col-span-full md:col-span-4">
						<div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
							<h3 className="text-lg font-semibold mb-3">Feature Two</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Description of your second feature goes here. Edit this text to
								customize it for your needs.
							</p>
						</div>
					</div>
					<div className="col-span-full md:col-span-4">
						<div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
							<h3 className="text-lg font-semibold mb-3">Feature Three</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Description of your third feature goes here. Edit this text to
								customize it for your needs.
							</p>
						</div>
					</div>
				</Grid>
			</main>
		</>
	)
}
