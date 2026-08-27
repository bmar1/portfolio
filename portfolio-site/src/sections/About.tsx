import { useEffect, useRef, useState } from 'react'

const FACTS = [
  ['base', 'Toronto, ON'],
  ['school', "Seneca Polytechnic, CPA '27"],
  ['leading', 'AWS Student Builders'],
  ['status', "open for Winter '27"],
]

/**
 * Layout family: Text-Mask Manifesto. Used once, here.
 * The statement is deliberately two words per line and nothing else, so the
 * type can run big enough for the alley plate to actually read through it.
 * The substance lives in the body below, not in the mask.
 */
export default function About() {
  const ref = useRef<HTMLElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), {
      threshold: 0.2,
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      className="section relative overflow-hidden"
      style={{ paddingTop: '9rem', paddingBottom: '9rem' }}
    >
      <div className="container">
        {/* Solid yellow is set first; background-clip only overrides it where
            supported, so the statement is never invisible. */}
        <h2
          className="mask-type"
          style={{
            color: 'var(--color-nc-yellow)',
            fontSize: 'clamp(2.75rem, 11vw, 8.5rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.015em',
            maxWidth: '11ch',
            opacity: on ? 1 : 0,
            transform: on ? 'translateY(0)' : 'translateY(24px)',
            transition:
              'opacity 700ms var(--ease-out), transform 700ms var(--ease-out)',
          }}
        >
          Adapter layers.
        </h2>

        {/* The archetype, stated once, plainly. */}
        <p
          className="t-label mt-8 flex flex-wrap items-center gap-x-3 gap-y-1"
          style={{ color: 'var(--color-nc-text)' }}
        >
          <span>Product builder</span>
          <span style={{ color: 'var(--color-nc-magenta)' }} aria-hidden>
            ×
          </span>
          <span style={{ color: 'var(--color-nc-yellow)' }}>
            Engineering rigor
          </span>
        </p>

        {/* One paragraph, broken into three beats so it reads as rhythm
            rather than a wall. Nothing else. */}
        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-10">
          <p style={{ color: 'var(--color-nc-text-muted)' }}>
            I care about what is underneath more than what screenshots well.
          </p>
          <p style={{ color: 'var(--color-nc-text-muted)' }}>
            Three platform APIs became one posting service, because three
            integrations is three things that can page you at 2am and one is one.
          </p>
          <p style={{ color: 'var(--color-nc-text-muted)' }}>
            Nest ranks 140+ listings in under thirty seconds, on a queue I
            rebuilt twice before it stopped falling over.
          </p>
        </div>

        {/* Facts as one mono run-on, not a four-column card row. */}
        <p
          className="t-mono mt-24 flex flex-wrap items-center gap-x-3 gap-y-2"
          style={{ color: 'var(--color-nc-text-dim)' }}
        >
          {FACTS.map(([k, v], i) => (
            <span key={k} className="flex items-center gap-3">
              {i > 0 && (
                <span style={{ color: 'var(--color-nc-magenta)' }} aria-hidden>
                  //
                </span>
              )}
              <span>
                <span style={{ color: 'var(--color-nc-yellow)' }}>{k}:</span>{' '}
                <span style={{ color: 'var(--color-nc-text-muted)' }}>{v}</span>
              </span>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
