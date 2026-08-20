import SectionReveal from '../components/SectionReveal'
import CountUp from '../components/CountUp'

type Status = 'upcoming' | 'recent' | 'past'

interface Role {
  title: string
  org: string
  period: string
  status: Status
  featured?: boolean
  note?: string
  stats?: { value: number; suffix: string; label: string }[]
  bullets: string[]
}

const ROLES: Role[] = [
  {
    title: 'Software Developer Co-Op',
    org: 'Ontario Public Service',
    period: "Fall '26",
    status: 'upcoming',
    note: 'Cluster Applications Branch, MPBSDP. Starting this fall.',
    bullets: [],
  },
  {
    title: 'Software Engineer Intern',
    org: 'Sikh Sparks',
    period: "Summer '26",
    status: 'recent',
    featured: true,
    stats: [
      { value: 100, suffix: '+', label: 'orgs' },
      { value: 60, suffix: '%', label: 'faster publishing' },
      { value: 200, suffix: '+', label: 'daily messages' },
    ],
    bullets: [
      'Built an adapter layer in Spring Boot so three-plus platform APIs behave like one posting service.',
      "Pulled 4+ org inboxes into a single place using Meta's webhook and polling APIs.",
      'Sliced the work up so three of us could ship without stepping on each other.',
    ],
  },
  {
    title: 'Software Engineer',
    org: 'Liza Bilal Enterprise Inc.',
    period: "Dec '25 — Apr '26",
    status: 'past',
    bullets: [
      'Shipped a client site on AWS that 200+ people actually use.',
      'Wrote an Express API to generate the reports nobody wanted to do by hand — 2+ hrs back every week.',
      'Got the first load 22% faster with compression, lazy loading, and minification.',
    ],
  },
]

const LEADERSHIP = [
  { role: 'President', org: 'GDG Seneca', period: "Dec '25 —", detail: '120+ attendees per term' },
  { role: 'Group Leader', org: 'AWS Student Builders', period: "May '26 —", detail: '75+ students, 8-event curriculum' },
]

const DOT: Record<Status, string> = {
  upcoming: 'var(--color-neon-amber)',
  recent: 'var(--color-neon-magenta)',
  past: 'var(--color-text-muted)',
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
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
            {' '}LOGFILE{' '}
            <span style={{ color: 'var(--color-neon-magenta)' }}>// 01</span>
            {' '}
            <span style={{ color: 'var(--color-text-muted)' }}>]</span>
          </span>
          <h2 className="text-h2 mt-3">Where I've been</h2>
        </SectionReveal>

        <div className="mt-14 flex flex-col">
          {ROLES.map((role, i) => (
            <SectionReveal key={role.org} delay={i * 100}>
              <article
                className="rule-row grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 py-10"
                style={
                  role.featured
                    ? {
                        borderLeft: '2px solid var(--color-neon-magenta)',
                        paddingLeft: '1.5rem',
                        background:
                          'linear-gradient(90deg, var(--color-glow-magenta-soft), transparent 55%)',
                      }
                    : undefined
                }
              >
                {/* Period rail */}
                <div className="lg:col-span-3 flex items-start gap-3">
                  <span
                    className="mt-2 shrink-0"
                    style={{
                      width: 7,
                      height: 7,
                      background: DOT[role.status],
                      boxShadow: role.status === 'past' ? 'none' : `0 0 10px ${DOT[role.status]}`,
                      transform: 'rotate(45deg)',
                    }}
                    aria-hidden
                  />
                  <span
                    className="text-mono"
                    style={{
                      color: role.status === 'past' ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
                      fontSize: '0.95rem',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {role.period}
                  </span>
                </div>

                {/* Body */}
                <div className="lg:col-span-9 flex flex-col gap-3">
                  <div>
                    <h3
                      className={role.featured ? 'text-h3' : 'text-lg font-semibold'}
                      style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}
                    >
                      {role.title}
                    </h3>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--color-accent-cyan)' }}>
                      {role.org}
                    </p>
                  </div>

                  {role.note && (
                    <p className="text-mono" style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                      {role.note}
                    </p>
                  )}

                  {role.stats && (
                    <div className="flex gap-7 flex-wrap">
                      {role.stats.map((s) => (
                        <div key={s.label} className="flex flex-col">
                          <span
                            className="text-mono font-semibold"
                            style={{
                              color: 'var(--color-neon-magenta)',
                              fontSize: '1.15rem',
                              textShadow: '0 0 12px var(--color-glow-magenta-soft)',
                            }}
                          >
                            <CountUp end={s.value} suffix={s.suffix} />
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
                  )}

                  {role.bullets.length > 0 && (
                    <ul className="flex flex-col gap-2 mt-1">
                      {role.bullets.map((b) => (
                        <li
                          key={b}
                          className="text-sm"
                          style={{
                            color: 'var(--color-text-secondary)',
                            paddingLeft: '1rem',
                            position: 'relative',
                            maxWidth: '62ch',
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              left: 0,
                              color: 'var(--color-neon-magenta)',
                              fontFamily: 'var(--font-mono)',
                            }}
                          >
                            &rsaquo;
                          </span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>

        {/* Leadership — demoted to a compact strip */}
        <SectionReveal delay={120}>
          <div className="mt-12 pt-6" style={{ borderTop: '1px solid var(--color-border)' }}>
            <span
              className="text-mono"
              style={{
                color: 'var(--color-text-muted)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                fontSize: '0.66rem',
              }}
            >
              [ LEADERSHIP ]
            </span>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LEADERSHIP.map((l) => (
                <div key={l.role} className="flex flex-col">
                  <span style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)', fontSize: '0.95rem' }}>
                    {l.role} · {l.org}
                  </span>
                  <span className="text-mono mt-0.5" style={{ color: 'var(--color-text-muted)', fontSize: '0.72rem' }}>
                    {l.period} — {l.detail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
