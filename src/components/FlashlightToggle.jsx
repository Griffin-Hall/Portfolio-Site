export default function FlashlightToggle({
  enabled,
  disabled = false,
  onToggle,
  title,
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      data-flashlight-reactive="button"
      aria-label={enabled ? 'Turn flashlight mode off' : 'Turn flashlight mode on'}
      aria-pressed={enabled}
      title={title}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 motion-reduce:transition-none ${
        disabled
          ? 'cursor-not-allowed border-dark-700/40 bg-dark-900/40 text-dark-600 opacity-50'
          : enabled
            ? 'border-accent/70 bg-accent/15 text-white shadow-[0_0_24px_rgba(99,102,241,0.28)]'
            : 'border-dark-700/60 bg-dark-900/60 text-dark-300 hover:border-accent/40 hover:bg-dark-800/80 hover:text-white'
      }`}
    >
      <FlashlightIcon active={enabled} />
      <span className="sr-only">Flashlight mode</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-full transition-opacity duration-300 motion-reduce:transition-none ${
          enabled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ boxShadow: 'inset 0 0 0 1px rgba(129, 140, 248, 0.45)' }}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent-light transition-all duration-300 motion-reduce:transition-none ${
          enabled
            ? 'opacity-100 shadow-[0_0_12px_rgba(129,140,248,0.9)]'
            : 'scale-75 opacity-0'
        }`}
      />
    </button>
  )
}

function FlashlightIcon({ active }) {
  return (
    <svg
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9.75 3.5h4.5l.9 3.25H8.85l.9-3.25Z" />
      <path d="M9 6.75h6v4.5l-2.45 8.75h-1.1L9 11.25v-4.5Z" />
      <path d="M15 8.5 20.25 10.4v1.9L15 14.2" />
      <path d="M18.75 8.4 20.6 7.75" opacity={active ? '1' : '0.55'} />
      <path d="M18.75 14.35 20.6 15" opacity={active ? '1' : '0.55'} />
    </svg>
  )
}
