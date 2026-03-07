import { useRef, useState } from 'react'

export default function MagneticButton({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    const threshold = Math.max(rect.width, rect.height) * 1.5
    if (dist < threshold) {
      setOffset({ x: dx * strength, y: dy * strength })
    }
  }

  const handleLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block ${className}`}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 0.3s ease-out',
      }}
    >
      {children}
    </div>
  )
}
