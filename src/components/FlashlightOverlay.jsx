export default function FlashlightOverlay({ enabled, supported }) {
  if (!supported) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className={`flashlight-overlay fixed inset-0 z-40 pointer-events-none transition-opacity duration-300 motion-reduce:transition-none ${
        enabled ? 'opacity-100' : 'opacity-0'
      }`}
    />
  )
}
