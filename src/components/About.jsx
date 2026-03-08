import profile from '../data/profile'
import Toolkit from './Toolkit'

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="section-container">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — text content */}
          <div>
            <p className="text-accent font-medium text-sm tracking-widest uppercase mb-3 fade-up">
              About Me
            </p>
            <h2 className="section-heading fade-up">
              Passionate about crafting great experiences.
            </h2>

            <div className="space-y-4 mb-8">
              {profile.about.bio.map((paragraph, i) => (
                <p key={i} className="text-dark-300 leading-relaxed fade-up">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Skill tags */}
            <div className="fade-up">
              <h3 className="text-sm font-medium text-dark-400 uppercase tracking-widest mb-4">
                Skills & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.about.skills.map((skill) => (
                  <span
                    key={skill}
                    data-flashlight-reactive="button"
                    className="px-3 py-1.5 text-sm rounded-full bg-dark-800 text-dark-200 border border-dark-700/50 hover:border-accent/40 hover:text-accent-light hover:scale-105 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {profile.about.resumeUrl && (
              <a
                href={profile.about.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-flashlight-reactive="button"
                className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full border border-dark-600 text-dark-200 hover:border-accent hover:text-white transition-all fade-up"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
            )}
          </div>

          {/* Right — interactive toolkit */}
          <div className="fade-up">
            <h3 className="text-sm font-medium text-dark-400 uppercase tracking-widest mb-6">
              My Toolkit
            </h3>
            <Toolkit categories={profile.about.toolkit} />
          </div>
        </div>
      </div>
    </section>
  )
}
