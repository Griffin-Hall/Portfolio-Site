import useInView from '../hooks/useInView'

export default function StaggeredText({ text, className = '', tag: Tag = 'h2', stagger = 80 }) {
  const [ref, inView] = useInView({ threshold: 0.3 })
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <span
            className={`inline-block transition-all ease-out ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
            }`}
            style={{
              transitionDuration: '600ms',
              transitionDelay: `${i * stagger}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}
