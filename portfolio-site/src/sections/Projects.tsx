import { ExternalLink } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'
import CountUp from '../components/CountUp'

interface Project {
  slot: 'is-a' | 'is-b'
  badge: string
  name: string
  blurb: string
  shot: string
  alt: string
  stats: { value: number; suffix: string; prefix?: string; label: string }[]
  tech: string[]
  href: string
}

const PROJECTS: Project[] = [
  {
    slot: 'is-a',
    badge: '01',
    name: 'Plated',
    blurb: 'Meal planning for 100+ people. Three recipe APIs squashed into one schema, so nobody has to think about dinner.',
    shot: '/assets/plated.png',
    alt: 'Plated — meal and grocery planning interface',
    stats: [
      { value: 100, suffix: '+', label: 'people using it' },
      { value: 90, suffix: '%', label: 'uptime' },
      { value: 86, suffix: '%', label: 'covered by tests' },
    ],
    tech: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'AWS', 'Docker'],
    href: 'https://plated-app.online/',
  },
  {
    slot: 'is-b',
    badge: '02',
    name: 'Nest',
    blurb: 'Apartment hunting without forty tabs open. Ranks 140+ listings a run and gets back to you in under 30 seconds.',
    shot: '/assets/nest.png',
    alt: 'Nest — ranked rental search results',
    stats: [
      { value: 150, suffix: '+', label: 'searches run' },
      { value: 30, prefix: '<', suffix: 's', label: 'to results' },
      { value: 20, suffix: '%', label: 'fewer blowups' },
    ],
    tech: ['React', 'Spring Boot', 'RabbitMQ', 'Docker', 'GKE', 'CI/CD'],
    href: 'https://nest-one-eta.vercel.app/',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section relative" style={{ overflowX: 'clip' }}>
      <div className="photo-bed" style={{ opacity: 0.3, zIndex: -1 }} aria-hidden>
        <img
          src="/assets/cyberpunk_ambient_projects_1774920520127.png"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, var(--color-bg-base), transparent 22%, transparent 78%, var(--color-bg-base))',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'var(--scanline-bg)', opacity: 0.55, mixBlendMode: 'overlay' }}
        />
      </div>

      <div className="container relative z-10">
        <SectionReveal>
          <span
            className="text-mono"
            style={{
              color: 'var(--color-neon-cyan)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontSize: '0.72rem',
            }}
          >
            <span style={{ color: 'var(--color-text-muted)' }}>[</span>
            {' '}FEATURED_WORK{' '}
            <span style={{ color: 'var(--color-neon-magenta)' }}>// 03</span>
            {' '}
            <span style={{ color: 'var(--color-text-muted)' }}>]</span>
          </span>
          <h2 className="text-h2 mt-3">Stuff I've shipped</h2>
        </SectionReveal>

        <div className="collage mt-16">
          {PROJECTS.map((p, i) => (
            <SectionReveal
              key={p.name}
              delay={i * 140}
              className={`collage__item ${p.slot}`}
              direction={p.slot === 'is-a' ? 'right' : 'left'}
            >
              <div className="collage-shot">
                <div className="collage-shot__inner">
                  <img src={p.shot} alt={p.alt} loading="lazy" decoding="async" />
                  <span
                    className="pill pill-accent absolute top-4 left-4"
                    style={{ fontSize: '0.64rem' }}
                  >
                    {p.badge}
                  </span>
                </div>
              </div>

              <div className="collage-meta">
                <h3 className="text-h3" style={{ color: 'var(--color-text-primary)' }}>
                  {p.name}
                </h3>
                <p className="text-body mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                  {p.blurb}
                </p>

                <div className="meta-row flex gap-6 flex-wrap mt-5">
                  {p.stats.map((s) => (
                    <div key={s.label} className="flex flex-col">
                      <span
                        className="text-mono font-semibold"
                        style={{
                          color: 'var(--color-neon-cyan)',
                          fontSize: '1.2rem',
                          textShadow: '0 0 12px var(--color-glow-cyan-soft)',
                        }}
                      >
                        <CountUp end={s.value} suffix={s.suffix} prefix={s.prefix} />
                      </span>
                      <span
                        className="text-mono mt-0.5"
                        style={{
                          color: 'var(--color-text-muted)',
                          fontSize: '0.64rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="meta-row flex flex-wrap gap-2 mt-5">
                  {p.tech.map((t) => (
                    <span key={t} className="pill">{t}</span>
                  ))}
                </div>

                <div className="meta-row flex mt-5">
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener"
                    className="project-link link-reveal text-sm"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    <ExternalLink size={14} /> Take a look
                  </a>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
