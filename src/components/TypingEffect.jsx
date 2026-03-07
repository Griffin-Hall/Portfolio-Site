import { useState, useEffect } from 'react'

export default function TypingEffect({ text, speed = 50, delay = 500, className = '' }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) return

    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)

    return () => clearTimeout(timer)
  }, [displayed, started, text, speed])

  return (
    <span className={className}>
      {displayed}
      <span className="animate-blink text-accent">|</span>
    </span>
  )
}
