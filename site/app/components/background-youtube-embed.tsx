import { clsx } from 'clsx'
import * as React from 'react'

export function BackgroundYouTubeEmbed({
  id,
  title,
  className,
}: {
  id: string
  title: string
  className?: string
}) {
  const url = new URL(`https://www.youtube-nocookie.com/embed/${id}`)
  url.searchParams.set('autoplay', '1')
  url.searchParams.set('controls', '0')
  url.searchParams.set('rel', '0')
  url.searchParams.set('mute', '0')
  url.searchParams.set('loop', '1')
  url.searchParams.set('playlist', id)
  url.searchParams.set('modestbranding', '1')
  url.searchParams.set('playsinline', '1')
  url.searchParams.set('iv_load_policy', '3')

  return (
    <div className={clsx('relative overflow-hidden rounded-3xl bg-black', className)}>
      <iframe
        className="absolute left-1/2 top-1/2 h-[170%] w-[170%] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
        src={url.toString()}
        title={title}
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowFullScreen
        frameBorder="0"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/10" />
    </div>
  )
}

export const links = () => [
  { rel: 'preconnect', href: 'https://www.youtube-nocookie.com' },
  { rel: 'preconnect', href: 'https://www.google.com' },
]
