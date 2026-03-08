import useTiltEffect from '../hooks/useTiltEffect'

export default function ProjectCard({ project, onSelect = () => {} }) {
  const {
    title,
    description,
    image,
    tags,
    liveUrl,
    repoUrl,
    highlights = [],
    gallery = [],
  } = project

  const { style, glare, onMouseMove, onMouseLeave } = useTiltEffect(6)

  return (
    <div
      className="group glass rounded-2xl overflow-hidden fade-up relative flex flex-col"
      style={{ ...style, willChange: 'transform' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Glare overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
        }}
      />

      {/* Accent border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-accent/0 group-hover:border-accent/30 transition-all duration-500 pointer-events-none z-10" />

      {/* Image — fixed aspect ratio, same on every card */}
      <div
        className="relative aspect-[4/3] bg-dark-800 overflow-hidden cursor-pointer flex-shrink-0"
        onClick={onSelect}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onSelect()}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-900">
            <div className="text-center">
              <svg
                className="w-10 h-10 text-dark-600 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-dark-600 text-xs">Add screenshot</p>
            </div>
          </div>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors"
            >
              Live Demo
            </a>
          )}
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-4 py-2 rounded-full bg-dark-700 text-white text-sm font-medium hover:bg-dark-600 transition-colors"
            >
              Source
            </a>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onSelect()
            }}
            className="px-4 py-2 rounded-full bg-white/90 text-dark-900 text-sm font-semibold shadow-md hover:bg-white transition-colors"
          >
            View details
          </button>
        </div>
      </div>

      {/* Content — flex column so tags always pin to bottom */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-light transition-colors duration-300">
          {title}
        </h3>

        {/* Fixed 2-line height for all cards */}
        <p className="text-dark-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Gallery thumbnails — same 3-column grid on every card that has images */}
        {gallery.length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-3 gap-2">
              {gallery.slice(0, 3).map((src, idx) => {
                const hiddenCount = gallery.length - 3
                const showOverlay = idx === 2 && hiddenCount > 0
                return (
                  <div
                    key={src}
                    className="relative rounded-lg overflow-hidden border border-dark-700/60 bg-dark-800"
                  >
                    <img
                      src={src}
                      alt={`${title} preview ${idx + 1}`}
                      loading="lazy"
                      className="h-20 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {showOverlay && (
                      <div className="absolute inset-0 bg-dark-900/70 backdrop-blur-sm flex items-center justify-center text-xs font-semibold text-white">
                        +{hiddenCount}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Tags pinned to bottom via mt-auto */}
        <div className="mt-auto flex flex-wrap gap-2">
          {tags.slice(0, 5).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-full bg-dark-800 text-dark-300 border border-dark-700/30 group-hover:border-accent/20 group-hover:text-dark-200 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
          {tags.length > 5 && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-dark-800 text-dark-500 border border-dark-700/30">
              +{tags.length - 5}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
