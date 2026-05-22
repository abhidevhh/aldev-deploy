import { CloudinaryVideo } from './cloudinary-video.tsx'

type CloudinaryVideoProps = Parameters<typeof CloudinaryVideo>[0]

export function MissingSomething(
	props: Omit<CloudinaryVideoProps, 'cloudinaryId'>,
) {
	return (
		<CloudinaryVideo cloudinaryId="abhidev.com/misc/where_am_i" {...props} />
	)
}

export function Grimmacing(props: Omit<CloudinaryVideoProps, 'cloudinaryId'>) {
	return (
		<CloudinaryVideo cloudinaryId="abhidev.com/misc/grimmace" {...props} />
	)
}

export function Facepalm(props: Omit<CloudinaryVideoProps, 'cloudinaryId'>) {
	return (
		<CloudinaryVideo cloudinaryId="abhidev.com/misc/facepalm" {...props} />
	)
}
