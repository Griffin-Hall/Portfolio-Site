import { useEffect, useRef, useState } from 'react'

export default function SkillBar({ name, level, color = 'accent' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let frame
    const start = performance.now()
    const duration = 1200

    const animate = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * level))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [visible, level])

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm font-medium text-dark-200 group-hover:text-white transition-colors">
          {name}
        </span>
        <span className="text-xs font-mono text-accent tabular-nums">
          {count}%
        </span>
      </div>
      <div className="h-2 rounded-full bg-dark-800 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light transition-all duration-1000 ease-out relative"
          style={{ width: visible ? `${level}%` : '0%' }}
        >
          <div className="absolute inset-0 bg-white/10 animate-shimmer" />
        </div>
      </div>
    </div>
  )
}
