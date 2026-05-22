import { useParams } from 'react-router'

const projectPages: Record<
  string,
  {
    title: string
    sections: string[]
  }
> = {
  'traffic-light-ai': {
    title: 'AI Traffic Light Control System',
    sections: [
      'Built a YOLOv8-powered adaptive traffic system with ANPR and violation reporting.',
      'Used DeepSORT for vehicle tracking and OCR for license plate extraction.',
      'Implemented speed estimation, traffic optimization, and automated email alerts.',
    ],
  },
  'isl-translation': {
    title: 'Indian Sign Language Translation',
    sections: [
      'Developed a clip-level Transformer framework for continuous ISL translation.',
      'Focused on spatiotemporal feature learning with 3D CNN embeddings.',
      'Improved BLEU-4 and ROUGE-L scores significantly over baseline methods.',
    ],
  },
  'goquant-cpp': {
    title: 'GoQuant C++ Strategy Pipeline',
    sections: [
      'Designed a high-performance low-latency trading strategy engine.',
      'Built live-to-test workflow architecture with optimized backtesting.',
      'Focused on memory-efficient C++ execution and deterministic replay.',
    ],
  },
}

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = slug ? projectPages[slug] : null

  if (!project) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <h1 className="text-4xl font-bold">Project not found</h1>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
          Engineering Case Study
        </p>

        <h1 className="mt-4 text-5xl font-bold">{project.title}</h1>

        <div className="mt-10 space-y-6">
          {project.sections.map((section, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-800 p-6"
            >
              <p className="leading-8 text-slate-400">{section}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}