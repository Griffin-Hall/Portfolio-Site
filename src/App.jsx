import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'
import FlashlightOverlay from './components/FlashlightOverlay'

function getFlashlightAvailability() {
  return {
    supported: true,
    reason: 'Toggle flashlight mode.',
  }
}

export default function App() {
  // Global aurora spotlight - fixed overlay, follows the cursor anywhere on the page.
  const spotlightRef = useRef(null)
  const targetPos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })
  const flashlightPos = useRef({ x: 0, y: 0 })
  const beamBiasTarget = useRef({ x: 0, y: 0 })
  const beamBiasCurrent = useRef({ x: 0, y: 0 })
  const lastPointerRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)
  const reducedMotionRef = useRef(false)
  const [flashlightEnabled, setFlashlightEnabled] = useState(false)
  const [flashlightAvailability, setFlashlightAvailability] = useState(
    getFlashlightAvailability
  )

  useEffect(() => {
    const rootStyle = document.documentElement.style
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const syncFlashlightVars = (x, y, biasX, biasY) => {
      rootStyle.setProperty('--flashlight-x', `${x}px`)
      rootStyle.setProperty('--flashlight-y', `${y}px`)
      rootStyle.setProperty('--flashlight-bias-x', `${biasX}px`)
      rootStyle.setProperty('--flashlight-bias-y', `${biasY}px`)
    }

    const centerPointer = () => {
      const x = window.innerWidth / 2
      const y = window.innerHeight / 2
      targetPos.current = { x, y }
      currentPos.current = { x, y }
      flashlightPos.current = { x, y }
      beamBiasTarget.current = { x: 0, y: 0 }
      beamBiasCurrent.current = { x: 0, y: 0 }
      lastPointerRef.current = { x, y }
      syncFlashlightVars(x, y, 0, 12)
    }

    const updateAvailability = () => {
      reducedMotionRef.current = reducedMotionQuery.matches
      setFlashlightAvailability({
        supported: true,
        reason: 'Toggle flashlight mode.',
      })
    }

    const handlePointerMove = (event) => {
      const nextPos = { x: event.clientX, y: event.clientY }
      const dx = nextPos.x - lastPointerRef.current.x
      const dy = nextPos.y - lastPointerRef.current.y
      const distance = Math.hypot(dx, dy)

      if (distance > 0.5) {
        beamBiasTarget.current = {
          x: Math.max(-1, Math.min(1, dx / distance)),
          y: Math.max(-1, Math.min(1, dy / distance)),
        }
      }

      targetPos.current = nextPos
      lastPointerRef.current = nextPos
    }

    const handleResize = () => {
      const clamp = (value, max) => Math.min(Math.max(value, 0), max)
      targetPos.current = {
        x: clamp(targetPos.current.x, window.innerWidth),
        y: clamp(targetPos.current.y, window.innerHeight),
      }
      currentPos.current = {
        x: clamp(currentPos.current.x, window.innerWidth),
        y: clamp(currentPos.current.y, window.innerHeight),
      }
      flashlightPos.current = {
        x: clamp(flashlightPos.current.x, window.innerWidth),
        y: clamp(flashlightPos.current.y, window.innerHeight),
      }
      syncFlashlightVars(
        flashlightPos.current.x,
        flashlightPos.current.y,
        beamBiasCurrent.current.x * 48,
        beamBiasCurrent.current.y * 34 + 12
      )
    }

    centerPointer()
    updateAvailability()

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerdown', handlePointerMove, { passive: true })
    window.addEventListener('resize', handleResize)
    reducedMotionQuery.addEventListener('change', updateAvailability)

    const animate = () => {
      if (reducedMotionRef.current) {
        currentPos.current = { ...targetPos.current }
        flashlightPos.current = { ...targetPos.current }
        beamBiasCurrent.current = { ...beamBiasTarget.current }
      } else {
        currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.065
        currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.065
        flashlightPos.current.x += (targetPos.current.x - flashlightPos.current.x) * 0.24
        flashlightPos.current.y += (targetPos.current.y - flashlightPos.current.y) * 0.24
        beamBiasTarget.current.x *= 0.92
        beamBiasTarget.current.y *= 0.92
        beamBiasCurrent.current.x += (beamBiasTarget.current.x - beamBiasCurrent.current.x) * 0.14
        beamBiasCurrent.current.y += (beamBiasTarget.current.y - beamBiasCurrent.current.y) * 0.14
      }

      if (spotlightRef.current) {
        const cx = currentPos.current.x
        const cy = currentPos.current.y
        spotlightRef.current.style.background = [
          `radial-gradient(700px circle at ${cx}px ${cy}px, rgba(99,102,241,0.10) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)`,
          `radial-gradient(500px circle at ${window.innerWidth - cx * 0.4}px ${window.innerHeight - cy * 0.4}px, rgba(139,92,246,0.06) 0%, transparent 65%)`,
        ].join(', ')
      }

      syncFlashlightVars(
        flashlightPos.current.x,
        flashlightPos.current.y,
        beamBiasCurrent.current.x * 48,
        beamBiasCurrent.current.y * 34 + 12
      )
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerdown', handlePointerMove)
      window.removeEventListener('resize', handleResize)
      reducedMotionQuery.removeEventListener('change', updateAvailability)
      cancelAnimationFrame(rafRef.current)
      rootStyle.removeProperty('--flashlight-x')
      rootStyle.removeProperty('--flashlight-y')
      rootStyle.removeProperty('--flashlight-bias-x')
      rootStyle.removeProperty('--flashlight-bias-y')
    }
  }, [])

  useEffect(() => {
    if (!flashlightAvailability.supported && flashlightEnabled) {
      setFlashlightEnabled(false)
    }
  }, [flashlightAvailability.supported, flashlightEnabled])

  useEffect(() => {
    const root = document.documentElement
    root.dataset.flashlightMode = flashlightEnabled ? 'on' : 'off'

    return () => {
      delete root.dataset.flashlightMode
    }
  }, [flashlightEnabled])

  // Scroll-triggered fade-up animations.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    const elements = document.querySelectorAll('.fade-up')
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Fixed aurora overlay - visible on every section as you scroll. */}
      <div
        ref={spotlightRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <ScrollProgress />
      <FlashlightOverlay
        enabled={flashlightEnabled}
        supported={flashlightAvailability.supported}
      />
      <Navbar
        flashlightEnabled={flashlightEnabled}
        flashlightAvailable={flashlightAvailability.supported}
        flashlightHint={flashlightAvailability.reason}
        onToggleFlashlight={() => {
          if (!flashlightAvailability.supported) {
            return
          }
          setFlashlightEnabled((enabled) => !enabled)
        }}
      />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Projects />
      </main>
      <Footer />
    </>
  )
}
