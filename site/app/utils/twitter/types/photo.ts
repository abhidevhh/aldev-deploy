import { type Rect, type RGB } from './media'

export interface TweetPhoto {
	backgroundColor: RGB
	cropCandidates: Rect[]
	expandedUrl: string
	url: string
	width: number
	height: number
}
