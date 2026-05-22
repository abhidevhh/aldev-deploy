import { type TransformerOption } from '@cld-apis/types'
import { buildImageUrl, setConfig } from 'cloudinary-build-url'
import clsx from 'clsx'
import emojiRegex from 'emoji-regex'
import { type CSSProperties } from 'react'
import { optionalTeams, toBase64, type OptionalTeam } from './utils/misc.ts'

setConfig({
	cloudName: 'abhidev-com',
})

type ImageBuilder = {
	(transformations?: TransformerOption): string
	alt: string
	id: string
	className?: string
	style?: CSSProperties
}
const createImages = <
	ImageType extends Record<
		string,
		Pick<ImageBuilder, 'id' | 'alt' | 'className' | 'style'>
	>,
>(
	images: ImageType,
) => {
	const imageBuilders: Record<string, ImageBuilder> = {}
	for (const [name, { id, alt, className, style }] of Object.entries(images)) {
		imageBuilders[name] = getImageBuilder(id, alt, { className, style })
	}
	return imageBuilders as { [Name in keyof ImageType]: ImageBuilder }
}

function getImageBuilder(
	id: string,
	alt: string = '',
	{ className, style }: { className?: string; style?: CSSProperties } = {},
): ImageBuilder {
	function imageBuilder(transformations?: TransformerOption) {
		return buildImageUrl(id, { transformations })
	}
	imageBuilder.alt = alt
	imageBuilder.id = id
	imageBuilder.className = className
	imageBuilder.style = style
	return imageBuilder
}

const square = { aspectRatio: '1/1' } satisfies CSSProperties

const epicWebClassName =
	'h-[76%] -translate-y-[9%] @2xl/grid:-translate-x-[0.2%] @2xl/grid:h-[78%]'
const epicReactClassName = 'h-[82%]'
const testingJSClassName =
	'h-[94%] -translate-y-[8%] dark:-translate-x-[0.6%] dark:h-[98%] dark:-translate-y-[6%]'
const epicAIClassName = 'h-[80%] -translate-y-[8%]'

const images = createImages({
	abhiSignatureDarkMode: {
		id: 'abhi/signature-dark-mode',
		alt: `AbhiDev's signature`,
		style: { aspectRatio: '1.891' },
	},
	abhiSignatureLightMode: {
		id: 'abhi/signature-light-mode',
		alt: `AbhiDev's signature`,
		style: { aspectRatio: '1.891' },
	},
	abhiTransparentProfile: {
		id: 'abhi/profile-transparent',
		alt: 'AbhiDev',
		style: square,
	},
	abhiProfile: {
		id: 'abhi/profile',
		alt: 'AbhiDev',
		style: square,
	},
	abhiSnowSports: {
		id: 'abhi/snow-sports',
		alt: 'AbhiDev wearing snow clothes with skis and a snowboard',
		style: { aspectRatio: '0.8194' },
	},
	abhiCodingWithAbhiBuddy: {
		id: 'abhi/coding-with-abhiBuddy',
		alt: 'AbhiDev sitting with his laptop on a bench next to your mascot',
		style: { aspectRatio: '1.405' },
	},
	abhiRidingOnewheelOutdoors: {
		id: 'abhi/riding-onewheel-outdoors',
		alt: 'AbhiDev riding a onewheel outdoors',
		style: { aspectRatio: '1.5014' },
	},
	abhiRidingOnewheelOutdoorsFast: {
		id: 'abhi/riding-onewheel-outdoors-fast',
		alt: 'AbhiDev riding a onewheel outdoors fast',
		style: { aspectRatio: '1.5014' },
	},
	abhiWorkingInNature: {
		id: 'abhi/working-in-nature',
		alt: 'AbhiDev working in nature',
		style: { aspectRatio: '1.5014' },
	},
	abhiPalmingSoccerBall: {
		id: 'abhi/palming-soccer-ball',
		alt: 'AbhiDev holding a soccer ball',
		style: { aspectRatio: '0.7112' },
	},
	abhiCodingWithSkates: {
		id: 'abhi/rollerblade-coding-checking-watch',
		alt: 'AbhiDev checking his watch while sitting in rollerblades with a laptop',
		style: { aspectRatio: '0.7112' },
	},
	abhiHoldingOutCody: {
		id: 'abhi/holding-out-abhiBuddy',
		alt: 'AbhiDev holding out your mascot',
		style: { aspectRatio: '0.7112' },
	},
	abhiCodingOnCouch: {
		id: 'abhi/coding-on-couch',
		alt: 'AbhiDev coding on a couch',
		style: { aspectRatio: '1.4052' },
	},
	abhiSmilingWithLaptop: {
		id: 'abhi/smiling-with-laptop-on-couch',
		alt: 'AbhiDev smiling with laptop on a couch',
		style: { aspectRatio: '1.4052' },
	},
	abhiWithOnewheel: {
		id: 'abhi/walking-away-with-onewheel',
		alt: 'AbhiDev walking away with a onewheel',
		style: { aspectRatio: '0.7112' },
	},
	abhiSkatingGear: {
		id: 'abhi/skating-gear',
		alt: 'AbhiDev with skating gear',
		style: { aspectRatio: '0.7112' },
	},
	abhiSpeakingAllThingsOpen: {
		id: 'abhi/abhi-speaking-all-things-open',
		alt: 'AbhiDev speaking all things open',
		style: { aspectRatio: '1.4993' },
	},
	mrRogersBeKind: {
		id: 'abhi/video-stills/mr-rogers-be-kind',
		alt: 'Laptop with a sticker with a photo of Mr. Rogers and the words "Be kind"',
		style: { aspectRatio: '1.7798' },
	},
	microphoneWithHands: {
		id: 'abhi/video-stills/microphone-with-hands',
		alt: 'A microphone and hands',
		style: { aspectRatio: '1.7798' },
	},
	happySnowboarder: {
		id: 'abhi/video-stills/happy-snowboarder',
		alt: 'AbhiDev smiling covered in snow',
		style: { aspectRatio: '1.7798' },
	},
	abhiListeningAtReactRally: {
		id: 'abhi/abhi-listening-at-react-rally',
		alt: 'AbhiDev sitting as an audience member at React Rally',
		style: { aspectRatio: '1.5035' },
	},
	getToKnowAbhiDevVideoThumbnail: {
		id: 'abhi/video-stills/get-to-know-abhi-video-thumbnail',
		alt: 'AbhiDev in the air on a snowboard with the words "Get to know AbhiDev"',
		style: { aspectRatio: '16/9' },
	},
	abhiBuddyProfileYellow: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_profile_yellow',
		alt: 'AbhiBuddy Profile in Yellow',
		style: { aspectRatio: '1.2632' },
	},
	abhiBuddyProfileBlue: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_profile_blue',
		alt: 'AbhiBuddy Profile in Blue',
		style: { aspectRatio: '1.2632' },
	},
	abhiBuddyProfileRed: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_profile_red',
		alt: 'AbhiBuddy Profile in Red',
		style: { aspectRatio: '1.2632' },
	},
	abhiBuddyProfileGray: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_profile_gray',
		alt: 'AbhiBuddy Profile in Gray',
		style: { aspectRatio: '1.2632' },
	},
	teslaY: {
		id: 'abhidev.com/illustrations/tesla_y2_j8kti2',
		alt: 'Illustration of a Tesla Model Y',
		style: { aspectRatio: '1.61' },
	},
	solarPanels: {
		id: 'abhidev.com/illustrations/solar_panels_2_ftbwvb',
		alt: 'Illustration of Solar Panels',
		style: { aspectRatio: '1.5468' },
	},
	snowboard: {
		id: 'abhidev.com/illustrations/snowboard_nqqlyr',
		alt: 'Illustration of a snowboard',
		style: { aspectRatio: '1.764' },
	},
	skis: {
		id: 'abhidev.com/illustrations/skis_z5lkc3',
		alt: 'Illustration of skis',
		style: { aspectRatio: '0.71' },
	},
	kayak: {
		id: 'abhidev.com/illustrations/rowing',
		alt: 'Illustration of a kayak',
		style: square,
	},
	onewheel: {
		id: 'abhidev.com/illustrations/one_wheel',
		alt: 'Illustration of a onewheel',
		style: square,
	},
	microphone: {
		id: 'abhidev.com/illustrations/mic',
		alt: 'Illustration of a microphone',
		style: { aspectRatio: '0.553' },
	},
	abhiBuddySkiingBlue: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_skiing_blue',
		alt: 'Illustration of your mascot on skis in blue',
		style: square,
	},
	abhiBuddySkiingGray: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_skiing_gray',
		alt: 'Illustration of your mascot on skis in gray',
		style: square,
	},
	abhiBuddySkiingYellow: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_skiing_yellow',
		alt: 'Illustration of your mascot on skis in yellow',
		style: square,
	},
	abhiBuddySkiingRed: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_skiing_red',
		alt: 'Illustration of your mascot on skis in red',
		style: square,
	},
	abhiBuddyFlyingSkiingBlue: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_skiing_flying_blue',
		alt: 'Illustration of your mascot skiing surrounded by green leaves, a battery, two skies, a one-wheel, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingSkiingGray: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_skiing_flying_gray',
		alt: 'Illustration of your mascot skiing surrounded by green leaves, a battery, two skies, a one-wheel, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingSkiingYellow: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_skiing_flying_yellow',
		alt: 'Illustration of your mascot skiing surrounded by green leaves, a battery, two skies, a one-wheel, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingSkiingRed: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_skiing_flying_red',
		alt: 'Illustration of your mascot skiing surrounded by green leaves, a battery, two skies, a one-wheel, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingSnowboardingGray: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_snowboarding_flying_gray',
		alt: 'Illustration of your mascot standing on a snowboard surrounded by green leaves, a battery, two skies, a one-wheel, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingSnowboardingYellow: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_snowboarding_flying_yellow',
		alt: 'Illustration of your mascot standing on a snowboard surrounded by green leaves, a battery, two skies, a one-wheel, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingSnowboardingRed: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_snowboarding_flying_red',
		alt: 'Illustration of your mascot standing on a snowboard surrounded by green leaves, a battery, two skies, a one-wheel, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingSnowboardingBlue: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_snowboarding_flying_blue',
		alt: 'Illustration of your mascot standing on a snowboard surrounded by green leaves, a battery, two skies, a one-wheel, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingOnewheelingGray: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_onewheeling_flying_gray',
		alt: 'Illustration of your mascot standing on a onewheel surrounded by green leaves, a battery, two skies, a snowboard, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingOnewheelingYellow: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_onewheeling_flying_yellow',
		alt: 'Illustration of your mascot standing on a onewheel surrounded by green leaves, a battery, two skies, a snowboard, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingOnewheelingRed: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_onewheeling_flying_red',
		alt: 'Illustration of your mascot standing on a onewheel surrounded by green leaves, a battery, two skies, a snowboard, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingOnewheelingBlue: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_onewheeling_flying_blue',
		alt: 'Illustration of your mascot standing on a onewheel surrounded by green leaves, a battery, two skies, a snowboard, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingPlayingSoccerGray: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_playing_soccer_flying_gray',
		alt: 'Illustration of your mascot kicking a soccer ball surrounded by green leaves, a battery, a onewheel, a snowboard, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingPlayingSoccerYellow: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_playing_soccer_flying_yellow',
		alt: 'Illustration of your mascot kicking a soccer ball surrounded by green leaves, a battery, a onewheel, a snowboard, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingPlayingSoccerRed: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_playing_soccer_flying_red',
		alt: 'Illustration of your mascot kicking a soccer ball surrounded by green leaves, a battery, a onewheel, a snowboard, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingPlayingSoccerBlue: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_playing_soccer_flying_blue',
		alt: 'Illustration of your mascot kicking a soccer ball surrounded by green leaves, a battery, a onewheel, a snowboard, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingBackFlippingGray: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_flipping_flying_gray',
		alt: 'Illustration of your mascot back flipping surrounded by green leaves, a battery, a onewheel, a snowboard, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingBackFlippingYellow: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_flipping_flying_yellow',
		alt: 'Illustration of your mascot back flipping surrounded by green leaves, a battery, a onewheel, a snowboard, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingBackFlippingRed: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_flipping_flying_red',
		alt: 'Illustration of your mascot back flipping surrounded by green leaves, a battery, a onewheel, a snowboard, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddyFlyingBackFlippingBlue: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_flipping_flying_blue',
		alt: 'Illustration of your mascot back flipping surrounded by green leaves, a battery, a onewheel, a snowboard, a solar panel, and a recycle logo.',
		style: square,
	},
	abhiBuddySnowboardingYellow: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_snowboarding_yellow',
		alt: 'Illustration of your mascot on a snowboard in yellow',
		style: square,
	},
	abhiBuddySnowboardingRed: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_snowboarding_red',
		alt: 'Illustration of your mascot on a snowboard in red',
		style: square,
	},
	abhiBuddySnowboardingBlue: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_snowboarding_blue',
		alt: 'Illustration of your mascot on a snowboard in blue',
		style: square,
	},
	abhiBuddySnowboardingGray: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_snowboarding_gray',
		alt: 'Illustration of your mascot on a snowboard in gray',
		style: square,
	},
	abhiBuddyOnewheelingYellow: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_onewheeling_yellow',
		alt: 'Illustration of your mascot on a snowboard in yellow',
		style: square,
	},
	abhiBuddyOnewheelingRed: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_onewheeling_red',
		alt: 'Illustration of your mascot on a snowboard in red',
		style: square,
	},
	abhiBuddyOnewheelingBlue: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_onewheeling_blue',
		alt: 'Illustration of your mascot on a snowboard in blue',
		style: square,
	},
	abhiBuddyOnewheelingGray: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_onewheeling_gray',
		alt: 'Illustration of your mascot on a snowboard in gray',
		style: square,
	},
	abhiBuddyPlayingSoccerYellow: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_playing_soccer_yellow',
		alt: 'Illustration of your mascot kicking a soccer ball in yellow',
		style: { aspectRatio: '0.892' },
	},
	abhiBuddyPlayingSoccerRed: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_playing_soccer_red',
		alt: 'Illustration of your mascot kicking a soccer ball in red',
		style: { aspectRatio: '0.892' },
	},
	abhiBuddyPlayingSoccerBlue: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_playing_soccer_blue',
		alt: 'Illustration of your mascot kicking a soccer ball in blue',
		style: { aspectRatio: '0.892' },
	},
	abhiBuddyPlayingSoccerGray: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_playing_soccer_gray',
		alt: 'Illustration of your mascot kicking a soccer ball in gray',
		style: { aspectRatio: '0.892' },
	},
	abhiBuddyBackFlippingYellow: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_flipping_yellow',
		alt: 'Illustration of your mascot back flipping in yellow',
		style: { aspectRatio: '0.563' },
	},
	abhiBuddyBackFlippingRed: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_flipping_red',
		alt: 'Illustration of your mascot back flipping in red',
		style: { aspectRatio: '0.563' },
	},
	abhiBuddyBackFlippingBlue: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_flipping_blue',
		alt: 'Illustration of your mascot back flipping in blue',
		style: { aspectRatio: '0.563' },
	},
	abhiBuddyBackFlippingGray: {
		id: 'abhidev.com/illustrations/abhiBuddy/abhiBuddy_flipping_gray',
		alt: 'Illustration of your mascot back flipping in gray',
		style: { aspectRatio: '0.563' },
	},
	helmet: {
		id: 'abhidev.com/illustrations/helmet',
		alt: 'Illustration of a helmet',
		style: square,
	},
	bustedOnewheel: {
		id: 'abhidev.com/illustrations/404_2_sprold',
		alt: 'Broken onewheel',
	},
	courseAdvancedReactComponentPatterns: {
		id: 'abhidev.com/pages/courses/advanced-react-component-patterns',
		alt: 'Illustration for React Class Component Patterns',
		style: square,
	},
	courseAsts: {
		id: 'abhidev.com/pages/courses/asts',
		alt: 'Illustration for Code Transformation and Linting with ASTs',
		style: square,
	},
	courseEpicReact: {
		id: 'v1746462314/abhidev.com/pages/courses/v2/rocket',
		alt: 'Illustration of a Rocket',
		className: epicReactClassName,
	},
	courseEpicReactDark: {
		id: 'v1746462314/abhidev.com/pages/courses/v2/rocket-dark',
		alt: 'Illustration of a Rocket',
		className: epicReactClassName,
	},
	courseEpicWebLight: {
		id: 'v1746462310/abhidev.com/pages/courses/v2/epic-web',
		alt: 'The EpicWeb.dev logo',
		className: epicWebClassName,
	},
	courseEpicWebDark: {
		id: 'v1746462310/abhidev.com/pages/courses/v2/epic-web-dark',
		alt: 'The EpicWeb.dev logo',
		className: epicWebClassName,
	},
	courseEpicAILight: {
		id: 'v1746462310/abhidev.com/pages/courses/v2/epic-ai-light',
		alt: 'The EpicAI.pro logo',
		className: epicAIClassName,
	},
	courseEpicAIDark: {
		id: 'v1746462310/abhidev.com/pages/courses/v2/epic-ai-dark',
		alt: 'The EpicAI.pro logo',
		className: epicAIClassName,
	},
	courseHowToContributeToAnOpenSourceProjectOnGitHub: {
		id: 'abhidev.com/pages/courses/how-to-contribute-to-an-open-source-project-on-github',
		alt: 'Illustration for How to Contribute to an Open Source Project on GitHub',
		style: square,
	},
	courseHowToWriteAnOpenSourceJavaScriptLibrary: {
		id: 'abhidev.com/pages/courses/how-to-write-an-open-source-javascript-library',
		alt: 'Illustration for How to Write an Open Source JavaScript Library',
		style: square,
	},
	courseSimplifyReactAppsWithReactHooks: {
		id: 'abhidev.com/pages/courses/simplify-react-apps-with-react-hooks',
		alt: 'Illustration for Simplify React Apps with React Hooks',
		style: square,
	},
	courseTestingJS: {
		id: 'v1746462314/abhidev.com/pages/courses/v2/trophy',
		alt: 'Illustration of a trophy',
		className: testingJSClassName,
	},
	courseTestingJSDark: {
		id: 'v1746462314/abhidev.com/pages/courses/v2/trophy-dark',
		alt: 'Illustration of a trophy',
		className: testingJSClassName,
	},
	courseTestingPrinciples: {
		id: 'abhidev.com/pages/courses/testing-principles',
		alt: 'Illustration for JavaScript Testing Practices and Principles',
		style: square,
	},
	courseTestingReact: {
		id: 'abhidev.com/pages/courses/testing-react',
		alt: 'Illustration for Testing React Applications, v2',
		style: square,
	},
	courseTheBeginnersGuideToReact: {
		id: 'abhidev.com/pages/courses/the-beginners-guide-to-react',
		alt: `Illustration for The Beginner's Guide to React`,
		style: square,
	},
	courseUpAndRunningWithRemix: {
		id: 'abhidev.com/pages/courses/up-and-running-with-remix',
		alt: `Illustration for Up and Running with Remix`,
		style: square,
	},
	courseUseSuspenseToSimplifyYourAsyncUI: {
		id: 'abhidev.com/pages/courses/use-suspense-to-simplify-your-async-ui',
		alt: 'Illustration for Use Suspense to Simplify Your Async UI',
		style: square,
	},
	courseFEMAdvancedRemix: {
		id: 'abhidev.com/pages/courses/fem-advanced-remix',
		alt: 'Illustration of the Remix logo R with the word "Advanced"',
		style: square,
	},
	courseFEMRemixFundamentals: {
		id: 'abhidev.com/pages/courses/fem-remix-fundamentals',
		alt: 'Illustration of the Remix logo R with the word "Fundamentals"',
		style: square,
	},
})

const abhiBuddyProfiles: Record<OptionalTeam, { src: string; alt: string }> = {
	RED: {
		src: images.abhiBuddyProfileRed({
			resize: { width: 80, type: 'pad', aspectRatio: '1/1' },
		}),
		alt: images.abhiBuddyProfileRed.alt,
	},
	BLUE: {
		src: images.abhiBuddyProfileBlue({
			resize: { width: 80, height: 80, type: 'pad' },
		}),
		alt: images.abhiBuddyProfileBlue.alt,
	},
	YELLOW: {
		src: images.abhiBuddyProfileYellow({
			resize: { width: 80, height: 80, type: 'pad' },
		}),
		alt: images.abhiBuddyProfileYellow.alt,
	},
	UNKNOWN: {
		src: images.abhiBuddyProfileGray({
			resize: { width: 80, height: 80, type: 'pad' },
		}),
		alt: images.abhiBuddyProfileGray.alt,
	},
}

const abhiBuddyProfileImages: Record<OptionalTeam, ImageBuilder> = {
	RED: images.abhiBuddyProfileRed,
	YELLOW: images.abhiBuddyProfileYellow,
	BLUE: images.abhiBuddyProfileBlue,
	UNKNOWN: images.abhiBuddyProfileGray,
}

const abhiBuddySnowboardingImages: Record<OptionalTeam, ImageBuilder> = {
	RED: images.abhiBuddySnowboardingRed,
	YELLOW: images.abhiBuddySnowboardingYellow,
	BLUE: images.abhiBuddySnowboardingBlue,
	UNKNOWN: images.abhiBuddySnowboardingGray,
}
const abhiBuddySkiingImages: Record<OptionalTeam, ImageBuilder> = {
	RED: images.abhiBuddySkiingRed,
	YELLOW: images.abhiBuddySkiingYellow,
	BLUE: images.abhiBuddySkiingBlue,
	UNKNOWN: images.abhiBuddySkiingGray,
}
const abhiBuddyOnewheelingImages: Record<OptionalTeam, ImageBuilder> = {
	RED: images.abhiBuddyOnewheelingRed,
	YELLOW: images.abhiBuddyOnewheelingYellow,
	BLUE: images.abhiBuddyOnewheelingBlue,
	UNKNOWN: images.abhiBuddyOnewheelingGray,
}
const abhiBuddyPlayingSoccerImages: Record<OptionalTeam, ImageBuilder> = {
	RED: images.abhiBuddyPlayingSoccerRed,
	YELLOW: images.abhiBuddyPlayingSoccerYellow,
	BLUE: images.abhiBuddyPlayingSoccerBlue,
	UNKNOWN: images.abhiBuddyPlayingSoccerGray,
}
const abhiBuddyBackFlippingImages: Record<OptionalTeam, ImageBuilder> = {
	RED: images.abhiBuddyBackFlippingRed,
	YELLOW: images.abhiBuddyBackFlippingYellow,
	BLUE: images.abhiBuddyBackFlippingBlue,
	UNKNOWN: images.abhiBuddyBackFlippingGray,
}

const abhiBuddyFlyingSnowboardingImages: Record<OptionalTeam, ImageBuilder> = {
	RED: images.abhiBuddyFlyingSnowboardingRed,
	YELLOW: images.abhiBuddyFlyingSnowboardingYellow,
	BLUE: images.abhiBuddyFlyingSnowboardingBlue,
	UNKNOWN: images.abhiBuddyFlyingSnowboardingGray,
}
const abhiBuddyFlyingSkiingImages: Record<OptionalTeam, ImageBuilder> = {
	RED: images.abhiBuddyFlyingSkiingRed,
	YELLOW: images.abhiBuddyFlyingSkiingYellow,
	BLUE: images.abhiBuddyFlyingSkiingBlue,
	UNKNOWN: images.abhiBuddyFlyingSkiingGray,
}
const abhiBuddyFlyingOnewheelingImages: Record<OptionalTeam, ImageBuilder> = {
	RED: images.abhiBuddyFlyingOnewheelingRed,
	YELLOW: images.abhiBuddyFlyingOnewheelingYellow,
	BLUE: images.abhiBuddyFlyingOnewheelingBlue,
	UNKNOWN: images.abhiBuddyFlyingOnewheelingGray,
}
const abhiBuddyFlyingPlayingSoccerImages: Record<OptionalTeam, ImageBuilder> = {
	RED: images.abhiBuddyFlyingPlayingSoccerRed,
	YELLOW: images.abhiBuddyFlyingPlayingSoccerYellow,
	BLUE: images.abhiBuddyFlyingPlayingSoccerBlue,
	UNKNOWN: images.abhiBuddyFlyingPlayingSoccerGray,
}
const abhiBuddyFlyingBackFlippingImages: Record<OptionalTeam, ImageBuilder> = {
	RED: images.abhiBuddyFlyingBackFlippingRed,
	YELLOW: images.abhiBuddyFlyingBackFlippingYellow,
	BLUE: images.abhiBuddyFlyingBackFlippingBlue,
	UNKNOWN: images.abhiBuddyFlyingBackFlippingGray,
}

export function getRandomSportyAbhiBuddy(team?: OptionalTeam | undefined) {
	const activities = [
		abhiBuddySnowboardingImages,
		abhiBuddySkiingImages,
		abhiBuddyOnewheelingImages,
		abhiBuddyPlayingSoccerImages,
		abhiBuddyBackFlippingImages,
	]
	const set =
		activities[Math.floor(Math.random() * activities.length)] ??
		abhiBuddySnowboardingImages
	if (team) {
		return set[team]
	} else {
		const randomTeam =
			optionalTeams[Math.floor(Math.random() * optionalTeams.length)] ??
			'UNKNOWN'
		return set[randomTeam]
	}
}

export function getRandomFlyingAbhiBuddy(
	team?: OptionalTeam | undefined,
	randomImageNo: number = Math.random(),
) {
	const activities = [
		abhiBuddyFlyingSnowboardingImages,
		abhiBuddyFlyingSkiingImages,
		abhiBuddyFlyingOnewheelingImages,
		abhiBuddyFlyingPlayingSoccerImages,
		abhiBuddyFlyingBackFlippingImages,
	]
	const set =
		activities[Math.floor(randomImageNo * activities.length)] ??
		abhiBuddySnowboardingImages
	if (team) {
		return set[team]
	} else {
		const randomTeam =
			optionalTeams[Math.floor(randomImageNo * optionalTeams.length)] ??
			'UNKNOWN'
		return set[randomTeam]
	}
}

const illustrationImages = {
	teslaY: images.teslaY,
	solarPanels: images.solarPanels,
	snowboard: images.snowboard,
	skis: images.skis,
	kayak: images.kayak,
	onewheel: images.onewheel,
	microphone: images.microphone,
	helmet: images.helmet,
}

function getImgProps(
	imageBuilder: ImageBuilder,
	{
		widths,
		sizes,
		transformations,
		className,
		style,
	}: {
		widths: Array<number>
		sizes: Array<string>
		transformations?: TransformerOption
		className?: string
		style?: CSSProperties
	},
) {
	const averageSize = Math.ceil(widths.reduce((a, s) => a + s) / widths.length)
	const aspectRatio = transformations?.resize?.aspectRatio
		? transformations.resize.aspectRatio.replace(':', '/')
		: transformations?.resize?.height && transformations.resize.width
			? `${transformations.resize.width}/${transformations.resize.height}`
			: imageBuilder.style?.aspectRatio

	return {
		style: {
			...imageBuilder.style,
			aspectRatio,
			...style,
		},
		className: clsx(imageBuilder.className, className),
		alt: imageBuilder.alt,
		src: imageBuilder({
			quality: 'auto',
			format: 'auto',
			...transformations,
			resize: { width: averageSize, ...transformations?.resize },
		}),
		srcSet: widths
			.map((width) =>
				[
					imageBuilder({
						quality: 'auto',
						format: 'auto',
						...transformations,
						resize: { width, ...transformations?.resize },
					}),
					`${width}w`,
				].join(' '),
			)
			.join(', '),
		sizes: sizes.join(', '),
		crossOrigin: 'anonymous',
	} as const
}

function getSocialImageWithPreTitle({
	title,
	preTitle,
	featuredImage: img,
	url,
}: {
	title: string
	preTitle: string
	featuredImage: string
	url: string
}) {
	const vars = `$th_1256,$tw_2400,$gw_$tw_div_24,$gh_$th_div_12`

	const encodedPreTitle = doubleEncode(emojiStrip(preTitle))
	const preTitleSection = `co_rgb:a9adc1,c_fit,g_north_west,w_$gw_mul_14,h_$gh,x_$gw_mul_1.5,y_$gh_mul_1.3,l_text:abhidev.com:Matter-Regular.woff2_50:${encodedPreTitle}`

	const encodedTitle = doubleEncode(emojiStrip(title))
	const titleSection = `co_white,c_fit,g_north_west,w_$gw_mul_13.5,h_$gh_mul_7,x_$gw_mul_1.5,y_$gh_mul_2.3,l_text:abhidev.com:Matter-Regular.woff2_110:${encodedTitle}`

	const abhiProfileSection = `c_fit,g_north_west,r_max,w_$gw_mul_4,h_$gh_mul_3,x_$gw,y_$gh_mul_8,l_abhi:profile-transparent`
	const abhiNameSection = `co_rgb:a9adc1,c_fit,g_north_west,w_$gw_mul_5.5,h_$gh_mul_4,x_$gw_mul_4.5,y_$gh_mul_9,l_text:abhidev.com:Matter-Regular.woff2_70:AbhiDev`

	const encodedUrl = doubleEncode(emojiStrip(url))
	const urlSection = `co_rgb:a9adc1,c_fit,g_north_west,w_$gw_mul_9,x_$gw_mul_4.5,y_$gh_mul_9.8,l_text:abhidev.com:Matter-Regular.woff2_40:${encodedUrl}`

	const featuredImageIsRemote = img.startsWith('http')
	const featuredImageCloudinaryId = featuredImageIsRemote
		? toBase64(img)
		: img.replace(/\//g, ':')
	const featuredImageLayerType = featuredImageIsRemote ? 'l_fetch:' : 'l_'
	const featuredImageSection = `c_fill,ar_3:4,r_12,g_east,h_$gh_mul_10,x_$gw,${featuredImageLayerType}${featuredImageCloudinaryId}`

	return [
		`https://res.cloudinary.com/abhidev-com/image/upload`,
		vars,
		preTitleSection,
		titleSection,
		abhiProfileSection,
		abhiNameSection,
		urlSection,
		featuredImageSection,
		`c_fill,w_$tw,h_$th/abhidev.com/social-background.png`,
	].join('/')
}

function getGenericSocialImage({
	words,
	featuredImage: img,
	url,
}: {
	words: string
	featuredImage: string
	url: string
}) {
	const vars = `$th_1256,$tw_2400,$gw_$tw_div_24,$gh_$th_div_12`

	const encodedWords = doubleEncode(emojiStrip(words))
	const primaryWordsSection = `co_white,c_fit,g_north_west,w_$gw_mul_10,h_$gh_mul_7,x_$gw_mul_1.3,y_$gh_mul_1.5,l_text:abhidev.com:Matter-Regular.woff2_110:${encodedWords}`

	const abhiProfileSection = `c_fit,g_north_west,r_max,w_$gw_mul_4,h_$gh_mul_3,x_$gw,y_$gh_mul_8,l_abhi:profile-transparent`
	const abhiNameSection = `co_rgb:a9adc1,c_fit,g_north_west,w_$gw_mul_5.5,h_$gh_mul_4,x_$gw_mul_4.5,y_$gh_mul_9,l_text:abhidev.com:Matter-Regular.woff2_70:AbhiDev`

	const encodedUrl = doubleEncode(emojiStrip(url))
	const urlSection = `co_rgb:a9adc1,c_fit,g_north_west,w_$gw_mul_5.5,x_$gw_mul_4.5,y_$gh_mul_9.8,l_text:abhidev.com:Matter-Regular.woff2_40:${encodedUrl}`

	const featuredImageIsRemote = img.startsWith('http')
	const featuredImageCloudinaryId = featuredImageIsRemote
		? toBase64(img)
		: img.replace(/\//g, ':')
	const featuredImageLayerType = featuredImageIsRemote ? 'l_fetch:' : 'l_'

	const featureImageSection = `c_fit,g_east,w_$gw_mul_11,h_$gh_mul_11,x_$gw,${featuredImageLayerType}${featuredImageCloudinaryId}`

	const backgroundSection = `c_fill,w_$tw,h_$th/abhidev.com/social-background.png`
	return [
		`https://res.cloudinary.com/abhidev-com/image/upload`,
		vars,
		primaryWordsSection,
		abhiProfileSection,
		abhiNameSection,
		urlSection,
		featureImageSection,
		backgroundSection,
	].join('/')
}

function emojiStrip(string: string) {
	return (
		string
			.replace(emojiRegex(), '')
			// get rid of double spaces:
			.split(' ')
			.filter(Boolean)
			.join(' ')
			.trim()
	)
}

// cloudinary needs double-encoding
function doubleEncode(s: string) {
	return encodeURIComponent(encodeURIComponent(s))
}

const abhiBuddyImages = {
	profile: abhiBuddyProfileImages,
	snowboarding: abhiBuddySnowboardingImages,
	skiing: abhiBuddySkiingImages,
	onewheeling: abhiBuddyOnewheelingImages,
	playingSoccer: abhiBuddyPlayingSoccerImages,
	backFlipping: abhiBuddyBackFlippingImages,
	flyingSnowboarding: abhiBuddyFlyingSnowboardingImages,
	flyingSkiing: abhiBuddyFlyingSkiingImages,
	flyingOnewheeling: abhiBuddyFlyingOnewheelingImages,
	flyingPlayingSoccer: abhiBuddyFlyingPlayingSoccerImages,
	flyingBackFlipping: abhiBuddyFlyingBackFlippingImages,
}

export {
	images,
	abhiBuddyProfiles,
	abhiBuddyImages,
	getImgProps,
	getImageBuilder,
	getGenericSocialImage,
	getSocialImageWithPreTitle,
	illustrationImages,
}
export type { ImageBuilder }
