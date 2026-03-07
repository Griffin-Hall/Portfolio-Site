import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    document.body.classList.add('custom-cursor')
    return () => document.body.classList.remove('custom-cursor')
  }, [])

  useEffect(() => {
    if (isTouch) return

    const handleMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
    }

    const handleOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, [data-cursor="pointer"]')
      setHovering(!!target)
    }

    const handleLeave = () => {
      setVisible(false)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    document.addEventListener('mouseover', handleOver, { passive: true })
    document.addEventListener('mouseleave', handleLeave)

    // Ring lerp animation
    let raf
    const lerp = (a, b, f) => a + (b - a) * f
    const animate = () => {
      ringPos.current.x = lerp(ringPos.current.x, pos.current.x, 0.15)
      ringPos.current.y = lerp(ringPos.current.y, pos.current.y, 0.15)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) scale(${hovering ? 1.5 : 1})`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseleave', handleLeave)
      cancelAnimationFrame(raf)
    }
  }, [isTouch, visible, hovering])

  if (isTouch) return null

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          marginLeft: -4,
          marginTop: -4,
          borderRadius: '50%',
          backgroundColor: '#6366f1',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: '50%',
          border: '1.5px solid rgba(99, 102, 241, 0.5)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.3s, width 0.3s, height 0.3s, margin 0.3s, border-color 0.3s',
          willChange: 'transform',
          ...(hovering
            ? {
                width: 52,
                height: 52,
                marginLeft: -26,
                marginTop: -26,
                borderColor: 'rgba(99, 102, 241, 0.3)',
                backgroundColor: 'rgba(99, 102, 241, 0.05)',
              }
            : {}),
        }}
      />
    </>
  )
}
