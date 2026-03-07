import { useState, useEffect } from 'react'
import useInView from '../hooks/useInView'
import StaggeredText from './StaggeredText'
import profile from '../data/profile'

function AnimatedCounter({ target, suffix = '', inView }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame
    const duration = 2000
    const start = performance.now()
    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // cubic ease-out
      setCount(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [inView, target])

  return (
    <span>
      {count.toLocaleString()}
      {suffix && <span className="text-accent">{suffix}</span>}
    </span>
  )
}

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.3 })
  const stats = profile.stats

  if (!stats || stats.length === 0) return null

  return (
    <section className="py-20 sm:py-24">
      <div className="section-container">
        <div className="text-center mb-14">
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-3 fade-up">
            By the Numbers
          </p>
          <StaggeredText
            text="Building & Shipping"
            tag="h2"
            className="section-heading"
          />
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center glass rounded-2xl p-6 border border-dark-700/50 hover:border-accent/30 transition-all duration-500 hover:shadow-lg hover:shadow-accent/5 fade-up"
            >
              <p className="text-4xl sm:text-5xl font-bold text-white mb-2">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix || ''}
                  inView={inView}
                />
              </p>
              <p className="text-dark-400 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
