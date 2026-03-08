import { useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import StaggeredText from './StaggeredText'
import projects from '../data/projects'

export default function Projects() {
  const hasProjects = projects.length > 0
  const categories = hasProjects
    ? ['All', ...new Set(projects.map((p) => p.category))]
    : []
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState(null)

  const filtered =
    !hasProjects || active === 'All'
      ? projects
      : projects.filter((p) => p.category === active)

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-3 fade-up">
            Projects
          </p>
          <StaggeredText text="Selected Work" tag="h2" className="section-heading" />
          <p className="section-subheading mx-auto fade-up">
            Interactive builds that blend data, mapping, and 3D to stay useful in the real world.
          </p>
        </div>

        {hasProjects && (
          <div className="flex flex-wrap justify-center gap-2 mb-12 fade-up">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active === cat
                    ? 'bg-accent text-white shadow-lg shadow-accent/20'
                    : 'bg-dark-800 text-dark-400 hover:text-white hover:bg-dark-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {hasProjects ? (
            filtered.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onSelect={() => setSelected(project)}
              />
            ))
          ) : (
            <div className="col-span-full glass rounded-2xl p-8 text-center text-dark-300 border border-dark-700/50 fade-up">
              More projects are on the way. Check back soon.
            </div>
          )}
        </div>

        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </section>
  )
}

function ProjectModal({ project, onClose }) {
  const [activeImage, setActiveImage] = useState(
    project.gallery?.[0] || project.image
  )
  const [show, setShow] = useState(false)

  useEffect(() => {
    setActiveImage(project.gallery?.[0] || project.image)
  }, [project])

  useEffect(() => {
    requestAnimationFrame(() => setShow(true))
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleClose = () => {
    setShow(false)
    setTimeout(onClose, 300)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 transition-all duration-300 ${
        show ? 'bg-dark-950/80 backdrop-blur-sm' : 'bg-transparent backdrop-blur-none'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-7xl bg-dark-900 rounded-3xl border border-dark-700/60 shadow-2xl overflow-hidden transition-all duration-300 ${
          show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ height: '74vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-dark-800 text-dark-300 hover:text-white hover:bg-dark-700 border border-dark-700/60 transition-colors"
          aria-label="Close project details"
        >
          ×
        </button>

        {/* Flex layout: stacked on mobile, side-by-side on md+ */}
        <div className="flex flex-col md:flex-row h-full">

          {/* Left: image viewer — fills full height on desktop */}
          <div className="md:w-[58%] flex flex-col bg-dark-900 border-b md:border-b-0 md:border-r border-dark-700/50">
            {/* object-contain: full screenshot visible, dark bg fills the rest */}
            <div className="flex-1 min-h-0 flex items-center justify-center bg-dark-900 overflow-hidden" style={{ minHeight: '260px' }}>
              <img
                src={activeImage}
                alt={`${project.title} main`}
                className="max-w-full max-h-full object-contain"
                style={{ display: 'block' }}
              />
            </div>

            {project.gallery?.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto flex-shrink-0 border-t border-dark-700/40 bg-dark-900/60">
                {project.gallery.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(src)}
                    className={`h-16 w-24 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImage === src
                        ? 'border-accent ring-2 ring-accent/30'
                        : 'border-dark-700/60 hover:border-accent/40'
                    }`}
                  >
                    <img
                      src={src}
                      alt={`${project.title} thumbnail`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: description — independently scrollable within the fixed modal height */}
          <div className="md:w-[42%] flex-shrink-0 overflow-y-auto p-6 sm:p-8 space-y-5">
            <div>
              <p className="text-accent font-semibold text-xs uppercase tracking-widest mb-1">
                Project
              </p>
              <StaggeredText
                text={project.title}
                tag="h3"
                stagger={60}
                className="text-2xl font-bold text-white leading-tight"
              />
            </div>

            <p className="text-dark-200 leading-relaxed">{project.description}</p>

            {project.fullDescription && (
              <div className="space-y-3 text-sm text-dark-300 leading-relaxed border-t border-dark-700/40 pt-4">
                {project.fullDescription.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            {(project.liveUrl || project.repoUrl) && (
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors"
                  >
                    Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800 text-white text-sm font-medium hover:bg-dark-700 transition-colors border border-dark-700/60"
                  >
                    Source Code
                  </a>
                )}
              </div>
            )}

            {project.highlights?.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-dark-300 mb-2">Key capabilities</p>
                <ul className="space-y-2 text-sm text-dark-200">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2 pb-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs rounded-full bg-dark-800 text-dark-200 border border-dark-700/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
