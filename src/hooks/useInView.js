import { useRef, useState, useEffect } from 'react'

export default function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options.once !== false) observer.disconnect()
        } else if (options.once === false) {
          setInView(false)
        }
      },
      { threshold: options.threshold ?? 0.1, rootMargin: options.rootMargin ?? '0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}
