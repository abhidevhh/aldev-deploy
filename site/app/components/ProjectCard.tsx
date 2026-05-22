import { Link } from 'react-router'

type ProjectCardProps = {
  title: string
  description: string
  slug: string
}

export function ProjectCard({
  title,
  description,
  slug,
}: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${slug}`}
      className="block rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-slate-600"
    >
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mt-3 leading-7 text-slate-400">{description}</p>
      <p className="mt-4 text-sm text-slate-500">View case study →</p>
    </Link>
  )
}
