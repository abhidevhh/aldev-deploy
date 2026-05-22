import { useParams } from 'react-router'

export default function ProjectDetailPage() {
  const { slug } = useParams()

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Project Case Study
        </p>

        <h1 className="mt-4 text-5xl font-bold">{slug}</h1>

        <p className="mt-6 text-lg leading-8 text-slate-400">
          This page will render the full MDX case study for the selected project.
        </p>
      </section>
    </main>
  )
}
