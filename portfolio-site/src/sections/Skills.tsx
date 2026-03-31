import { useState, useEffect, useRef, useCallback } from 'react'
import SectionReveal from '../components/SectionReveal'

interface Skill {
  name: string
  context: string
}

interface SkillCategory {
  label: string
  skills: Skill[]
}

const CATEGORIES: SkillCategory[] = [
  {
    label: 'Languages',
    skills: [
      { name: 'Java', context: 'Spring Boot backend on Plated + Route Opt.' },
      { name: 'JavaScript', context: 'React frontends, Node.js services' },
      { name: 'C#', context: 'Currently learning for .NET stack' },
      { name: 'C++', context: 'Route optimization test strategy' },
      { name: 'C', context: 'Greedy shortest-path algorithm' },
      { name: 'HTML', context: 'Semantic, accessible markup' },
      { name: 'CSS', context: 'Design systems, animations, Tailwind' },
    ],
  },
  {
    label: 'Frameworks',
    skills: [
      { name: 'Spring Boot', context: 'Plated + Nest backends' },
      { name: '.NET', context: 'Learning for enterprise stack' },
      { name: 'React.js', context: 'Primary frontend framework' },
      { name: 'Node.js', context: 'Express.js API servers' },
      { name: 'Express.js', context: 'REST API development' },
      { name: 'JUnit', context: '86% test coverage on Plated' },
      { name: 'Mockito', context: 'Unit testing with mocks' },
    ],
  },
  {
    label: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', context: 'EC2, RDS, S3 for Plated hosting' },
      { name: 'Docker', context: 'Containerized deployments' },
      { name: 'GitHub Actions', context: 'CI/CD pipelines' },
    ],
  },
  {
    label: 'Tools',
    skills: [
      { name: 'Git', context: 'Version control, branching strategies' },
      { name: 'Jira', context: 'Sprint planning, Agile workflows' },
      { name: 'Postman', context: 'API testing & documentation' },
      { name: 'Cursor', context: 'AI-assisted development' },
      { name: 'Claude Code', context: 'AI pair programming' },
    ],
  },
  {
    label: 'Databases',
    skills: [
      { name: 'PostgreSQL', context: 'Primary DB, indexing, optimization' },
      { name: 'Oracle', context: 'Enterprise SQL experience' },
      { name: 'MongoDB', context: 'NoSQL document storage' },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionReveal>
          <span className="text-mono" style={{ color: 'var(--color-text-muted)' }}>
            // tech stack
          </span>
          <h2 className="text-h2 mt-3">Skills & Stack</h2>
        </SectionReveal>

        <div className="mt-16 relative">
          {/* Card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat, ci) => (
              <SectionReveal key={cat.label} delay={ci * 80} direction="up">
                <div 
                  className="flex flex-col gap-5 p-6 rounded-xl h-full transition-transform hover:-translate-y-1"
                  style={{
                    background: 'rgba(13, 17, 23, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="text-mono text-sm font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {cat.label}
                    </span>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(57, 208, 216, 0.3), transparent)' }} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, si) => (
                      <SkillPill key={skill.name} skill={skill} delay={ci * 80 + si * 30} />
                    ))}
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillPill({ skill, delay }: { skill: Skill; delay: number }) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const show = useCallback(() => setShowTooltip(true), [])
  const hide = useCallback(() => setShowTooltip(false), [])

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 300ms cubic-bezier(0.23, 1, 0.32, 1), transform 300ms cubic-bezier(0.23, 1, 0.32, 1)`,
      }}
    >
      <span
        className="pill cursor-default transition-all duration-150"
        style={{
          boxShadow: showTooltip ? '0 0 12px var(--color-accent-glow)' : 'none',
          borderColor: showTooltip ? 'rgba(57, 208, 216, 0.3)' : undefined,
        }}
      >
        {skill.name}
      </span>

      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-lg z-20 whitespace-nowrap"
          style={{
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            animation: 'tooltipIn 150ms cubic-bezier(0.23, 1, 0.32, 1)',
            transformOrigin: 'bottom center',
          }}
        >
          {skill.context}
        </div>
      )}

      <style>{`
        @keyframes tooltipIn {
          from {
            opacity: 0;
            transform: translateX(-50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
