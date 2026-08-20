import SectionReveal from '../components/SectionReveal'

type Tone = 'is-cyan' | 'is-magenta' | 'is-amber' | ''

/* Tone loosely groups by family (languages cyan, frameworks magenta,
   infra amber, data/tools neutral) without imposing a grid. */
const STICKERS: { name: string; tone: Tone }[] = [
  { name: 'Java', tone: 'is-cyan' },
  { name: 'Spring Boot', tone: 'is-magenta' },
  { name: 'TypeScript', tone: 'is-cyan' },
  { name: 'Docker', tone: 'is-amber' },
  { name: 'React', tone: 'is-magenta' },
  { name: 'PostgreSQL', tone: '' },
  { name: 'Kubernetes', tone: 'is-amber' },
  { name: 'JavaScript', tone: 'is-cyan' },
  { name: 'Node.js', tone: 'is-magenta' },
  { name: 'AWS EC2', tone: 'is-amber' },
  { name: 'MongoDB', tone: '' },
  { name: 'Express.js', tone: 'is-magenta' },
  { name: 'GKE', tone: 'is-amber' },
  { name: 'C', tone: 'is-cyan' },
  { name: 'JUnit', tone: 'is-magenta' },
  { name: 'AWS RDS', tone: 'is-amber' },
  { name: 'Oracle', tone: '' },
  { name: 'C++', tone: 'is-cyan' },
  { name: 'Jest', tone: 'is-magenta' },
  { name: 'GitHub Actions', tone: 'is-amber' },
  { name: 'Git', tone: '' },
  { name: 'HTML', tone: 'is-cyan' },
  { name: 'Jira', tone: '' },
  { name: 'CSS', tone: 'is-cyan' },
  { name: 'Mockito', tone: 'is-magenta' },
  { name: 'Cursor', tone: '' },
  { name: 'VSCode', tone: '' },
  { name: 'Claude', tone: '' },
]

/* Fixed pseudo-random scatter — stable across renders, no layout jitter */
const TILTS = [-5, 3, -2, 6, -4, 2, 5, -6, 1, -3, 4, -1]
const RISES = [0, 6, -4, 8, -2, 4, -6, 2, 5, -3, 7, -5]

export default function Skills() {
  return (
    <section id="skills" className="section">
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
            {' '}STACK{' '}
            <span style={{ color: 'var(--color-neon-magenta)' }}>// 04</span>
            {' '}
            <span style={{ color: 'var(--color-text-muted)' }}>]</span>
          </span>
          <h2 className="text-h2 mt-3">Things I reach for</h2>
          <p className="text-body mt-3" style={{ color: 'var(--color-text-secondary)', maxWidth: '46ch' }}>
            No progress bars, no "expert" badges — just what I actually build with.
          </p>
        </SectionReveal>

        {/* Sticker wall — no rows, no columns, everything slightly crooked */}
        <SectionReveal delay={120}>
          <div
            className="mt-12 flex flex-wrap justify-center items-center"
            style={{ gap: '0.9rem 0.75rem', maxWidth: '58rem', margin: '3rem auto 0' }}
          >
            {STICKERS.map((s, i) => (
              <span
                key={s.name}
                className={`sticker ${s.tone}`}
                style={{
                  ['--tilt' as string]: `${TILTS[i % TILTS.length]}deg`,
                  ['--rise' as string]: `${RISES[i % RISES.length]}px`,
                }}
              >
                {s.name}
              </span>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
