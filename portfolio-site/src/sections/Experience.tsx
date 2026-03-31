import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import SectionReveal from '../components/SectionReveal'

interface ExperienceNode {
  title: string
  org: string
  period: string
  isCurrent: boolean
  bullets: string[]
}

const EXPERIENCE: ExperienceNode[] = [
  {
    title: 'Technical Lead',
    org: 'Google Developers Group at Seneca Polytechnic',
    period: 'Dec 2025 – Present',
    isCurrent: true,
    bullets: [
      'Led technical workshops for 50+ students covering development concepts and real-world problem solving',
      'Mentored 25+ students through data structures/algorithms and LeetCode strategies',
      'Collaborated with student team to design workshops, adapting content based on audience technicality',
    ],
  },
  {
    title: 'Event Coordinator',
    org: 'Markham Fair',
    period: 'Dec 2023 – Feb 2024',
    isCurrent: false,
    bullets: [
      'Coordinated event operations and team logistics for 100+ daily attendees',
      'Resolved attendee inquiries and on-site conflicts efficiently, maintaining positive guest experience',
    ],
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end center'],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <div className="container">
        <SectionReveal>
          <span className="text-mono" style={{ color: 'var(--color-text-muted)' }}>
            // experience
          </span>
          <h2 className="text-h2 mt-3">Where I've been</h2>
        </SectionReveal>

        <div className="mt-16 relative pl-8 md:pl-12">
          {/* Growing timeline line */}
          <div
            className="absolute left-3 md:left-5 top-0 bottom-0 w-[2px]"
            style={{ background: 'var(--color-border)' }}
          >
            <motion.div
              className="w-full origin-top"
              style={{
                height: lineHeight,
                background: 'var(--color-accent-cyan)',
              }}
            />
          </div>

          {/* Nodes */}
          <div className="flex flex-col gap-16">
            {EXPERIENCE.map((exp, i) => (
              <SectionReveal key={exp.title} delay={i * 150} direction="right">
                <div className="relative">
                  {/* Dot */}
                  <div
                    className="absolute -left-[calc(1.25rem+8px)] md:-left-[calc(1.75rem+8px)] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                    style={{
                      borderColor: exp.isCurrent ? 'var(--color-accent-cyan)' : 'var(--color-border)',
                      background: exp.isCurrent ? 'var(--color-accent-cyan)' : 'transparent',
                    }}
                  >
                    {exp.isCurrent && (
                      <div
                        className="absolute w-4 h-4 rounded-full"
                        style={{
                          background: 'var(--color-accent-cyan)',
                          animation: 'pulseRing 2s ease-out infinite',
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <h3
                        className="font-semibold text-lg"
                        style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                      >
                        {exp.title}
                      </h3>
                      <span className="text-mono" style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: 'var(--color-accent-cyan)', fontFamily: 'var(--font-body)' }}>
                      {exp.org}
                    </p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {exp.bullets.map((bullet, bi) => (
                        <li
                          key={bi}
                          className="text-body text-sm"
                          style={{ color: 'var(--color-text-secondary)', paddingLeft: '1rem', position: 'relative' }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              left: 0,
                              color: 'var(--color-text-muted)',
                            }}
                          >
                            ›
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
