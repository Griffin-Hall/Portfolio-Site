import { useRef, useEffect, useState } from 'react'
import ThreeBackground from './ThreeBackground'
import TypingEffect from './TypingEffect'
import profile from '../data/profile'

export default function Hero() {
  const containerRef = useRef(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setMouse({ x, y })
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <ThreeBackground />

      {/* Gradient overlays — bottom fades to transparent so it blends with the page gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950/50 via-transparent to-transparent pointer-events-none" />

      {/* Parallax floating accents */}
      <div
        className="absolute w-72 h-72 rounded-full bg-accent/5 blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mouse.x * 30}px, ${mouse.y * 30}px)`, top: '20%', left: '15%' }}
      />
      <div
        className="absolute w-48 h-48 rounded-full bg-accent/8 blur-2xl pointer-events-none transition-transform duration-700 ease-out"
        style={{ transform: `translate(${mouse.x * -20}px, ${mouse.y * -20}px)`, bottom: '25%', right: '20%' }}
      />

      <div
        className="section-container relative z-10 text-center py-20 transition-transform duration-300 ease-out"
        style={{ transform: `translate(${mouse.x * -8}px, ${mouse.y * -8}px)` }}
      >
        <p className="text-accent font-medium text-sm tracking-widest uppercase mb-6 fade-up">
          {profile.title}
        </p>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-8 fade-up">
          <TypingEffect text={profile.hero.headline} speed={40} delay={300} />
        </h1>

        <p className="text-dark-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 fade-up">
          {profile.hero.subheadline}
        </p>

        <div className="flex items-center justify-center gap-4 fade-up">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent hover:bg-accent-dark text-white font-medium transition-all hover:shadow-lg hover:shadow-accent/25 hover:scale-105 active:scale-95"
          >
            {profile.hero.cta}
            <svg
              className="w-4 h-4 group-hover:translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-up">
          <div className="w-6 h-10 rounded-full border-2 border-dark-600 flex items-start justify-center p-1">
            <div className="w-1.5 h-2.5 rounded-full bg-accent animate-scroll-dot" />
          </div>
        </div>
      </div>
    </section>
  )
}
