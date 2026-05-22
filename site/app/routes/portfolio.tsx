const works = [
  {
    title: 'AI Traffic Light Control System',
    impact:
      'Built a YOLOv8-based adaptive traffic system with ANPR, violation detection, and automated reporting.',
  },
  {
    title: 'Indian Sign Language Translation',
    impact:
      'Developed a clip-level Transformer architecture for continuous ISL translation with strong benchmark scores.',
  },
  {
    title: 'GoQuant C++ Strategy Pipeline',
    impact:
      'Designed a high-performance low-latency quant trading pipeline for live-to-test strategy workflows.',
  },
  {
    title: 'AI Recipe Generator',
    impact:
      'Built a React + OpenAI application that generates recipes from ingredients and image prompts.',
  },
  {
    title: 'InboxKit Smart Gmail Cleanup',
    impact:
      'Created an AI-powered Gmail workflow automation and smart inbox categorization platform.',
  },
]

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Portfolio • Work • Case Studies
        </p>

        <h1 className="mt-4 text-5xl font-bold">
          Selected Work & Engineering Impact
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          A curated portfolio of AI systems, full stack applications, machine
          learning research, and production-grade software I’ve built.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {works.map((work) => (
            <div
              key={work.title}
              className="rounded-2xl border border-slate-800 p-6"
            >
              <h2 className="text-2xl font-semibold">{work.title}</h2>
              <p className="mt-3 leading-7 text-slate-400">{work.impact}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}