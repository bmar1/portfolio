import { MapPin, GraduationCap, Wrench, Lightbulb } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'

const FACTS = [
  { icon: MapPin, label: 'Toronto, ON' },
  { icon: GraduationCap, label: 'Seneca Polytechnic — CPA, 2024–Present' },
  { icon: Wrench, label: 'Currently leading @ GDG Seneca' },
  { icon: Lightbulb, label: 'Open to internships' },
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionReveal>
          <span className="text-mono" style={{ color: 'var(--color-text-muted)' }}>
            // about me
          </span>
        </SectionReveal>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Bio */}
          <SectionReveal delay={100}>
            <div className="flex flex-col gap-6">
              <h2 className="text-h2" style={{ color: 'var(--color-text-primary)' }}>
                Who I am
              </h2>
              <p className="text-body" style={{ color: 'var(--color-text-secondary)', maxWidth: '540px' }}>
                I'm a Computer Programming & Analysis student at Seneca Polytechnic focusing 
                on full-stack development. Whether it's Java Spring Boot, React, or C#, I care about the parts nobody notices: the normalization layer that reconciles messy APIs, the index that halves page load time, or an error message that actually helps. 
              </p>
              <p className="text-body" style={{ color: 'var(--color-text-secondary)', maxWidth: '540px' }}>
                I believe in shipping working software with solid guardrails—because solving the foundational problems nobody wants to touch is usually where the most meaningful improvements hide. I'm also currently leading technical workshops at GDG Seneca, mentoring 25+ students through DSA strategies.
              </p>

              {/* Sidebar facts */}
              <div className="flex flex-col gap-3 mt-4">
                {FACTS.map((fact, i) => (
                  <SectionReveal key={fact.label} delay={300 + i * 60}>
                    <div className="flex items-center gap-3">
                      <fact.icon size={16} style={{ color: 'var(--color-accent-cyan)' }} />
                      <span className="text-mono" style={{ color: 'var(--color-text-secondary)' }}>
                        {fact.label}
                      </span>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Right — Skewed card */}
          <SectionReveal delay={250} direction="left">
            <div
              className="relative p-8 flex flex-col justify-center"
              style={{
                clipPath: 'polygon(0 6%, 100% 0, 100% 94%, 0% 100%)',
                background: 'var(--color-bg-surface)',
                minHeight: '320px',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(57, 208, 216, 0.04), rgba(158, 124, 255, 0.04))',
                }}
              />
              <blockquote
                className="relative z-10"
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: 'var(--color-text-primary)',
                  padding: '1.5rem 1rem',
                }}
              >
                "The boring infrastructure nobody wants to touch is often where the most meaningful 
                improvements hide."
              </blockquote>
              <p
                className="relative z-10 text-mono mt-2"
                style={{ color: 'var(--color-text-muted)', paddingLeft: '1rem' }}
              >
                — from a cover letter that landed interviews
              </p>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
