const projects = [
  {
    title: 'AI Traffic Light Control System',
    description:
      'YOLOv8-powered adaptive traffic signal optimization with ANPR, speed detection, and automated violation reporting.',
  },
  {
    title: 'Indian Sign Language Translation',
    description:
      'Clip-level spatiotemporal Transformer framework for continuous ISL translation with strong BLEU and ROUGE scores.',
  },
  {
    title: 'GoQuant C++ Strategy Pipeline',
    description:
      'Low-latency C++ live-to-test quantitative trading strategy pipeline built for performance-critical backtesting.',
  },
  {
    title: 'AI Recipe Generator',
    description:
      'React + OpenAI powered intelligent recipe generation app using ingredient prompts and optional image understanding.',
  },
  {
    title: 'GAN-Based AI Art',
    description:
      'Creative generative art platform using CNNs, GANs, and TensorFlow for multi-style artwork generation.',
  },
  {
    title: 'Smart Gmail Cleanup Tool',
    description:
      'InboxKit intelligently categorizes, summarizes, and automates Gmail cleanup workflows using AI.',
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-20">
      <section className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold">Projects</h1>
        <p className="mt-4 max-w-3xl text-slate-400 text-lg">
          A curated portfolio of AI systems, machine learning research, and
          full-stack applications I’ve built across computer vision, NLP,
          quantitative finance, and developer tooling.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6"
            >
              <h2 className="text-2xl font-semibold">{project.title}</h2>
              <p className="mt-3 leading-7 text-slate-400">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}