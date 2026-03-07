import { useRef, useEffect } from 'react'
import Navbar from './components/Navbar'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Footer from './components/Footer'

export default function App() {
  // Global aurora spotlight — fixed overlay, follows cursor anywhere on the page
  const spotlightRef = useRef(null)
  const targetPos    = useRef({ x: 0, y: 0 })
  const currentPos   = useRef({ x: 0, y: 0 })
  const rafRef       = useRef(null)

  useEffect(() => {
    targetPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    currentPos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    const handleMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMove, { passive: true })

    const animate = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.065
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.065

      if (spotlightRef.current) {
        const cx = currentPos.current.x
        const cy = currentPos.current.y
        // Use scrollY so the gradient stays pinned to the viewport (fixed positioning)
        spotlightRef.current.style.background = [
          `radial-gradient(700px circle at ${cx}px ${cy}px, rgba(99,102,241,0.10) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)`,
          `radial-gradient(500px circle at ${window.innerWidth - cx * 0.4}px ${window.innerHeight - cy * 0.4}px, rgba(139,92,246,0.06) 0%, transparent 65%)`,
        ].join(', ')
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Scroll-triggered fade-up animations
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
      {/* Fixed aurora overlay — visible on every section as you scroll */}
      <div
        ref={spotlightRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      <ScrollProgress />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Projects />
      </main>
      <Footer />
    </>
  )
}
