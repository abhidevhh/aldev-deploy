import { getRandomSportyAbhiBuddy, images } from '#app/images.tsx'
import { type Team } from '#app/types.ts'

export const TEAM_MAP: Record<
	Team,
	{
		image: () => typeof images.abhiBuddySnowboardingBlue
		label: string
		focusClassName: string
	}
> = {
	BLUE: {
		image: () => getRandomSportyAbhiBuddy('BLUE'),
		label: 'Blue Team',
		focusClassName: 'ring-team-blue',
	},
	RED: {
		image: () => getRandomSportyAbhiBuddy('RED'),
		label: 'Red Team',
		focusClassName: 'ring-team-red',
	},
	YELLOW: {
		image: () => getRandomSportyAbhiBuddy('YELLOW'),
		label: 'Yellow Team',
		focusClassName: 'ring-team-yellow',
	},
}

export const TEAM_SNOWBOARD_MAP: Record<
	Team,
	{
		image: typeof images.abhiBuddySnowboardingBlue
		label: string
		focusClassName: string
	}
> = {
	BLUE: {
		image: images.abhiBuddySnowboardingBlue,
		label: 'Blue Team',
		focusClassName: 'ring-team-blue',
	},
	RED: {
		image: images.abhiBuddySnowboardingRed,
		label: 'Red Team',
		focusClassName: 'ring-team-red',
	},
	YELLOW: {
		image: images.abhiBuddySnowboardingYellow,
		label: 'Yellow Team',
		focusClassName: 'ring-team-yellow',
	},
}

export const TEAM_ONEWHEELING_MAP: Record<
	Team,
	{
		image: typeof images.abhiBuddyOnewheelingBlue
		label: string
		focusClassName: string
	}
> = {
	BLUE: {
		image: images.abhiBuddyOnewheelingBlue,
		label: 'Blue Team',
		focusClassName: 'ring-team-blue',
	},
	RED: {
		image: images.abhiBuddyOnewheelingRed,
		label: 'Red Team',
		focusClassName: 'ring-team-red',
	},
	YELLOW: {
		image: images.abhiBuddyOnewheelingYellow,
		label: 'Yellow Team',
		focusClassName: 'ring-team-yellow',
	},
}

export const TEAM_SKIING_MAP: Record<
	Team,
	{
		image: typeof images.abhiBuddySkiingBlue
		label: string
		focusClassName: string
	}
> = {
	BLUE: {
		image: images.abhiBuddySkiingBlue,
		label: 'Blue Team',
		focusClassName: 'ring-team-blue',
	},
	RED: {
		image: images.abhiBuddySkiingRed,
		label: 'Red Team',
		focusClassName: 'ring-team-red',
	},
	YELLOW: {
		image: images.abhiBuddySkiingYellow,
		label: 'Yellow Team',
		focusClassName: 'ring-team-yellow',
	},
}
