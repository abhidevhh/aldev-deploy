import { data as json, type MetaFunction } from 'react-router'
import { Grid } from '#app/components/grid.tsx'
import { HeroSection } from '#app/components/sections/hero-section.tsx'
import { H2, Paragraph } from '#app/components/typography.tsx'
import { getGenericSocialImage, images } from '#app/images.tsx'
import { type RootLoaderType } from '#app/root.tsx'
import { getDisplayUrl, getUrl } from '#app/utils/misc.ts'
import { getSocialMetas } from '#app/utils/seo.ts'
import { getServerTimeHeader } from '#app/utils/timing.server.ts'
import { type Route } from './+types/faq'

export const meta: MetaFunction<typeof loader, { root: RootLoaderType }> = ({
	matches,
}) => {
	const requestInfo = matches.find((m) => m.id === 'root')?.data.requestInfo
	return getSocialMetas({
		title: `FAQ - Frequently Asked Questions`,
		description: `Find answers to commonly asked questions`,
		url: getUrl(requestInfo),
		image: getGenericSocialImage({
			url: getDisplayUrl(requestInfo),
			featuredImage: images.snowboard(),
			words: `FAQ`,
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

export default function FAQScreen() {
	const faqs = [
		{
			question: 'Question One',
			answer:
				'Add your answer here. This is a great place to address common customer questions and concerns.',
		},
		{
			question: 'Question Two',
			answer:
				'Add your answer here. This is a great place to address common customer questions and concerns.',
		},
		{
			question: 'Question Three',
			answer:
				'Add your answer here. This is a great place to address common customer questions and concerns.',
		},
	]

	return (
		<>
			<HeroSection
				title="Frequently Asked Questions"
				subtitle="Find answers to your questions"
				imageBuilder={images.snowboard}
				arrowUrl="#faq"
				arrowLabel="View FAQs"
			/>
			<main>
				<Grid className="mb-24">
					<div className="col-span-full">
						<H2 id="faq" className="mb-8">
							Common Questions
						</H2>
						<Paragraph className="mb-12 max-w-2xl">
							Here are answers to some of our most frequently asked questions. If
							you don't find what you're looking for, feel free to contact us.
						</Paragraph>
					</div>
					<div className="col-span-full max-w-2xl">
						<div className="space-y-6">
							{faqs.map((faq, index) => (
								<div
									key={index}
									className="rounded-lg border border-gray-200 p-6 dark:border-gray-800"
								>
									<h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
									<p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
								</div>
							))}
						</div>
					</div>
				</Grid>
			</main>
		</>
	)
}
