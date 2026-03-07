export default function SectionDivider({ flip = false, className = '' }) {
  return (
    <div className={`overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 sm:h-16">
        {/* Background wave (slow drift) */}
        <path
          d="M0,50 C240,20 480,70 720,40 C960,10 1200,60 1440,35 L1440,80 L0,80 Z"
          className="fill-dark-900/20 animate-wave"
        />
        {/* Foreground wave */}
        <path
          d="M0,40 C360,75 720,5 1080,40 C1260,57 1380,23 1440,40 L1440,80 L0,80 Z"
          className="fill-dark-900/30"
        />
      </svg>
    </div>
  )
}
