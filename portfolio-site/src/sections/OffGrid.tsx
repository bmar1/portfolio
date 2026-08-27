const STRIPS = [
  {
    label: 'The cat',
    copy: 'He runs the household. I just pay rent.',
    img: '/assets/personal_hero.jpg',
    wide: true,
  },
  { label: 'Gym', copy: 'Lifting heavy things, consistently.' },
  { label: 'Games', copy: 'Strategy and story-driven, nothing competitive.' },
  { label: 'Eating clean', copy: 'Protein goals, minimal fuss.' },
  { label: 'System design', copy: 'Distributed systems, for fun, on weekends.' },
  { label: 'Trails', copy: 'A good break from screens.' },
]

/**
 * Layout family: Accordion Image Slider. Used once, here.
 * Strips expand on hover AND focus-within, so it is reachable by keyboard.
 * Below md they unstack into a plain readable list with nothing to discover.
 */
export default function OffGrid() {
  return (
    <section id="offgrid" className="section">
      <div className="container">
        <h2
          className="t-h2 mb-3"
          style={{ color: 'var(--color-nc-text)' }}
        >
          Off the clock
          <span style={{ color: 'var(--color-nc-magenta)' }}>_</span>
        </h2>
        <p
          className="mb-10 max-w-[46ch]"
          style={{ color: 'var(--color-nc-text-muted)' }}
        >
          Gym, trails, a new game, and a very loud cat.
        </p>
      </div>

      {/* Full-bleed strips, edge to edge. Night City is dense, not airy. */}
      <div className="accordion">
        {STRIPS.map((s) => (
          <div
            key={s.label}
            className={`accordion-strip${s.wide ? ' is-wide' : ''}`}
            tabIndex={0}
            style={
              s.img
                ? ({
                    ['--strip-img' as string]: `url(${s.img})`,
                  } as React.CSSProperties)
                : undefined
            }
          >
            <div className="accordion-strip__label">
              <span className="t-h3">{s.label}</span>
            </div>
            <div className="accordion-strip__body">
              <span className="t-h3" style={{ color: 'var(--color-nc-yellow)' }}>
                {s.label}
              </span>
              <p style={{ color: 'var(--color-nc-text-muted)' }}>{s.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
