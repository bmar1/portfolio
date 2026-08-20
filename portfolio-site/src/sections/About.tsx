import SectionReveal from '../components/SectionReveal'

const STATEMENT = [
  'I do the boring half.',
  'Adapter layers. Schema migrations.',
  'The pipeline that breaks at 2am.',
]

const FACTS = [
  { k: 'Base', v: 'Toronto, ON' },
  { k: 'School', v: "Seneca Polytechnic — CPA, Aug '27" },
  { k: 'Leading', v: 'AWS Student Builders' },
  { k: 'Status', v: "Open — Winter '27" },
]

export default function About() {
  return (
    <section id="about" className="section">
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
            {' '}OPERATOR{' '}
            <span style={{ color: 'var(--color-neon-magenta)' }}>// 02</span>
            {' '}
            <span style={{ color: 'var(--color-text-muted)' }}>]</span>
          </span>
        </SectionReveal>

        {/* Oversized statement — the whole section leads with type, no cards */}
        <div className="mt-10 flex flex-col gap-1">
          {STATEMENT.map((line, i) => (
            <SectionReveal key={line} delay={i * 90}>
              <h2
                className="text-h2"
                style={{
                  color: i === 0 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  maxWidth: '18ch',
                  lineHeight: 1.12,
                }}
              >
                {line}
              </h2>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <SectionReveal delay={120} className="lg:col-span-7">
            <p className="text-body" style={{ color: 'var(--color-text-secondary)', maxWidth: '52ch' }}>
              Squashed three platform APIs into one posting service at Sikh Sparks. Got Plated up to
              86% coverage. Government systems next. It's the same job every time, really — make the
              messy part boring.
            </p>
          </SectionReveal>

          {/* Pull quote — magenta rule instead of a card */}
          <SectionReveal delay={220} direction="left" className="lg:col-span-5">
            <blockquote
              style={{
                borderLeft: '2px solid var(--color-neon-magenta)',
                paddingLeft: '1.25rem',
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.05rem, 1.7vw, 1.35rem)',
                fontWeight: 500,
                lineHeight: 1.45,
                color: 'var(--color-text-primary)',
              }}
            >
              "The boring infrastructure nobody wants to touch is usually where the good
              improvements are hiding."
            </blockquote>
            <p className="text-mono mt-3" style={{ color: 'var(--color-text-muted)', fontSize: '0.72rem', paddingLeft: '1.25rem' }}>
              — something I actually wrote in a cover letter
            </p>
          </SectionReveal>
        </div>

        {/* Fact rail — four hairline columns, no boxes */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
          {FACTS.map((fact, i) => (
            <SectionReveal key={fact.k} delay={i * 70} direction="up">
              <div className="rule-row pt-4 pb-5 h-full">
                <span
                  className="text-mono block"
                  style={{
                    color: 'var(--color-neon-cyan)',
                    fontSize: '0.66rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                  }}
                >
                  {fact.k}
                </span>
                <span
                  className="block mt-1.5"
                  style={{
                    color: 'var(--color-text-primary)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                  }}
                >
                  {fact.v}
                </span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
