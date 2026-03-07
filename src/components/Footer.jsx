export default function Footer() {
  return (
    <footer className="py-8 border-t border-dark-800">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-dark-500 text-sm">
          &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
        </p>
        <p className="text-dark-600 text-xs">
          Built with React & Three.js
        </p>
      </div>
    </footer>
  )
}
