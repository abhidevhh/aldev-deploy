import * as React from 'react'
import { PlayIcon, PauseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons.tsx'

const tracks = [
  { name: 'Pulse Runner', src: '/music/Pulse Runner .mp3' },
  { name: 'Pulse Runner 2 Formula Theme', src: '/music/Pulse Runner2formulatheme.mp3' },
  { name: 'Echo Drift', src: '/music/Echo Drift.mp3' },
]

export function MusicPlaylist() {
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const audioRef = React.useRef<HTMLAudioElement>(null)

  const playTrack = (index: number) => {
    setCurrentTrackIndex(index)
    if (audioRef.current) {
      audioRef.current.src = tracks[index].src
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length
    playTrack(nextIndex)
  }

  const prevTrack = () => {
    const prevIndex = currentTrackIndex === 0 ? tracks.length - 1 : currentTrackIndex - 1
    playTrack(prevIndex)
  }

  React.useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const handleEnded = () => {
        setIsPlaying(false)
        nextTrack()
      }
      audio.addEventListener('ended', handleEnded)
      return () => audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrackIndex])

  return (
    <div className="bg-transparent">
      <audio ref={audioRef} />
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={prevTrack}
          className="rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
          title="Previous"
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={togglePlay}
          className="rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon size={16} /> : <PlayIcon />}
        </button>
        <button
          onClick={nextTrack}
          className="rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
          title="Next"
        >
          <ChevronRightIcon />
        </button>
        <span className="text-xs text-white ml-2 font-medium">{tracks[currentTrackIndex].name}</span>
      </div>
    </div>
  )
}