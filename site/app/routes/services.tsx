import { data as json, type MetaFunction } from 'react-router'
import { Grid } from '#app/components/grid.tsx'
import { HeroSection } from '#app/components/sections/hero-section.tsx'
import { H2, Paragraph } from '#app/components/typography.tsx'
import { getGenericSocialImage, images } from '#app/images.tsx'
import { type RootLoaderType } from '#app/root.tsx'
import { getDisplayUrl, getUrl } from '#app/utils/misc.ts'
import { getSocialMetas } from '#app/utils/seo.ts'
import { getServerTimeHeader } from '#app/utils/timing.server.ts'
import { type Route } from './+types/services'

export const meta: MetaFunction<typeof loader, { root: RootLoaderType }> = ({
	matches,
}) => {
	const requestInfo = matches.find((m) => m.id === 'root')?.data.requestInfo
	return getSocialMetas({
		title: `Services`,
		description: `Explore our comprehensive range of services`,
		url: getUrl(requestInfo),
		image: getGenericSocialImage({
			url: getDisplayUrl(requestInfo),
			featuredImage: images.snowboard(),
			words: `Services`,
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

export default function ServicesScreen() {
	return (
		<>
			<HeroSection
				title="Our Services"
				subtitle="Professional solutions tailored to your needs"
				imageBuilder={images.snowboard}
				arrowUrl="#services"
				arrowLabel="See our services"
			/>
			<main>
				<Grid className="mb-24">
					<div className="col-span-full">
						<H2 id="services" className="mb-8">
							What We Offer
						</H2>
						<Paragraph className="mb-6 max-w-2xl">
							Our team provides expert services to help you achieve your goals.
							Whether you need consulting, development, or support, we have the
							expertise to help.
						</Paragraph>
					</div>
					<div className="col-span-full md:col-span-6">
						<div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
							<h3 className="text-lg font-semibold mb-3">Service One</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Add your service description here. This is a great place to explain
								what your first service includes and how it benefits your clients.
							</p>
						</div>
					</div>
					<div className="col-span-full md:col-span-6">
						<div className="rounded-lg border border-gray-200 p-6 dark:border-gray-800">
							<h3 className="text-lg font-semibold mb-3">Service Two</h3>
							<p className="text-gray-600 dark:text-gray-400">
								Add your service description here. This is a great place to explain
								what your second service includes and how it benefits your clients.
							</p>
						</div>
					</div>
				</Grid>
			</main>
		</>
	)
}
