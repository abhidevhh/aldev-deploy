import * as React from 'react'
import { Link, useFetcher } from 'react-router'
import { useTheme } from '../utils/theme'
import { MusicPlaylist } from '../components/MusicPlaylist'

const themeOptions = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: 'Day', value: 'day' },
  { label: 'Red + Blue', value: 'redblue' },
] as const

export default function HomePage() {
  const fetcher = useFetcher()
  const theme = useTheme()

  return (
    <main className="min-h-screen bg-primary text-primary transition-colors duration-500 px-6 py-20">
      <section
        id="hero"
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-secondary/20 shadow-2xl shadow-black/20"
        style={{ backgroundImage: "url('/images/formula2aldev.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            src="/videos/formula1aldev.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 px-6 py-10 md:px-12 md:py-16 h-full flex flex-col justify-between">
          <div className="text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-white/70">Formula Experience</p>
            <h2 className="mt-2 text-2xl font-bold md:text-3xl">High Speed Racing</h2>
            <p className="mt-2 text-sm text-white/80 max-w-md">Experience the thrill of Formula 1 racing with our immersive video and curated soundtrack.</p>
          </div>
          <div className="self-end">
            <MusicPlaylist />
          </div>
        </div>
      </section>

      <section id="theme" className="section-panel theme-panel mx-auto mt-16 max-w-6xl rounded-3xl border border-secondary/20 bg-primary/80 p-8 shadow-2xl shadow-black/10 backdrop-blur-xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-secondary">Theme mode</p>
            <h2 className="mt-3 text-3xl font-bold">Select a color mode</h2>
            <p className="mt-4 max-w-2xl text-secondary">Use the buttons below to change the page theme and keep the layout feeling material and structured.</p>
            <p className="mt-3 text-sm text-secondary">Current mode: <strong>{theme}</strong></p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <fetcher.Form method="post" action="/action/set-theme" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  type="submit"
                  name="theme"
                  value={option.value}
                  className="rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-primary transition hover:bg-secondary/80"
                >
                  {option.label}
                </button>
              ))}
            </fetcher.Form>
          </div>
        </div>
        {fetcher.state !== 'idle' ? (
          <div className="mt-6 text-sm text-secondary">Applying theme…</div>
        ) : null}
      </section>

      <section id="more" className="mx-auto mt-16 max-w-6xl rounded-3xl border border-secondary/10 bg-secondary/10 p-10 text-primary shadow-lg shadow-black/5">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Ready to explore?</h2>
            <p className="mt-4 text-secondary">Jump directly to the blog, portfolio, or about page from the home page structure.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Link className="rounded-2xl bg-primary/90 px-5 py-3 text-center text-sm font-semibold transition hover:bg-primary" to="/blog">
              Blog
            </Link>
            <Link className="rounded-2xl bg-primary/90 px-5 py-3 text-center text-sm font-semibold transition hover:bg-primary" to="/courses">
              Portfolio
            </Link>
            <Link className="rounded-2xl bg-primary/90 px-5 py-3 text-center text-sm font-semibold transition hover:bg-primary" to="/about">
              About
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
