import { Link } from 'react-router'
import { CloudinaryVideo } from '#app/components/cloudinary-video'
import { Grid } from '#app/components/grid'
import { HeroSection } from '#app/components/sections/hero-section'
import { Spacer } from '#app/components/spacer'
import { Paragraph } from '#app/components/typography'
import { handleKitFormSubmission } from '#app/kit/remix.server'
import { type Route } from './+types/kit'

export async function action({ request }: Route.ActionArgs) {
	return handleKitFormSubmission(request)
}

export default function Kit() {
	return (
		<>
			<HeroSection
				title="Huzzah!"
				subtitle="You've signed up"
				image={
					<CloudinaryVideo
						cloudinaryId="abhidev.com/misc/approve"
						className="rounded-lg"
						aspectRatio="3:4"
					/>
				}
			/>

			<Grid as="main" className="mb-48">
				<div className="col-span-full">
					<Paragraph>{`... Ummm... Also, please enable JavaScript 😅`}</Paragraph>
					<Spacer size="3xs" />
					<Link to="/" className="underlined">
						Go to the home page
					</Link>
				</div>
			</Grid>
		</>
	)
}
