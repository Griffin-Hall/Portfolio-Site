import { useEffect, useRef, useState } from 'react'

export default function Toolkit({ categories }) {
  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredItem, setHoveredItem] = useState(null)
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="space-y-4">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat, i) => (
          <button
            key={cat.category}
            data-flashlight-reactive="button"
            onClick={() => { setActiveCategory(i); setHoveredItem(null) }}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
              activeCategory === i
                ? 'bg-accent/15 text-accent border border-accent/30 shadow-lg shadow-accent/10'
                : 'bg-dark-800/60 text-dark-400 border border-dark-700/40 hover:border-dark-600 hover:text-dark-200'
            }`}
          >
            <span className="mr-1.5">{cat.icon}</span>
            {cat.category}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories[activeCategory].items.map((item, i) => (
          <div
            key={item.name}
            data-flashlight-reactive="panel"
            onMouseEnter={() => setHoveredItem(item.name)}
            onMouseLeave={() => setHoveredItem(null)}
            className={`relative p-4 rounded-xl border transition-all duration-500 cursor-default overflow-hidden ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } ${
              hoveredItem === item.name
                ? 'bg-dark-800/80 border-accent/30 shadow-lg shadow-accent/5 scale-[1.02]'
                : 'bg-dark-800/40 border-dark-700/30 hover:border-dark-600/50'
            }`}
            style={{ transitionDelay: visible ? `${i * 80}ms` : '0ms' }}
          >
            {/* Glow effect on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent transition-opacity duration-300 ${
                hoveredItem === item.name ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <div className="relative z-10">
              <p className={`font-medium text-sm transition-colors duration-300 ${
                hoveredItem === item.name ? 'text-white' : 'text-dark-200'
              }`}>
                {item.name}
              </p>
              <p className={`text-xs mt-1 transition-all duration-300 ${
                hoveredItem === item.name
                  ? 'text-dark-300 opacity-100 max-h-8'
                  : 'text-dark-500 opacity-60 max-h-8'
              }`}>
                {item.note}
              </p>
            </div>

            {/* Active indicator dot */}
            <div
              className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                hoveredItem === item.name
                  ? 'bg-accent scale-100 shadow-[0_0_8px_rgba(99,102,241,0.6)]'
                  : 'bg-dark-600 scale-75'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
