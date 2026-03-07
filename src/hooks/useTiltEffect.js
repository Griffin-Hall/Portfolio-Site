import { useState, useCallback } from 'react'

export default function useTiltEffect(maxTilt = 8) {
  const [style, setStyle] = useState({})
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const onMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const rotateY = (x - 0.5) * maxTilt * 2
      const rotateX = (0.5 - y) * maxTilt * 2
      setStyle({
        transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
        transition: 'transform 0.1s ease-out',
      })
      setGlare({ x: x * 100, y: y * 100, opacity: 0.15 })
    },
    [maxTilt]
  )

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.4s ease-out',
    })
    setGlare({ x: 50, y: 50, opacity: 0 })
  }, [])

  return { style, glare, onMouseMove, onMouseLeave }
}
