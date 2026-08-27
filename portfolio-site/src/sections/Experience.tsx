import { useEffect, useRef, useState } from 'react'
import CountUp from '../components/CountUp'
import DecodeText from '../components/DecodeText'

/**
 * Layout family: staggered scale ladder. Used once, here.
 *
 * The four entries differ by weight and scale, not by chrome. Exactly one has
 * a filled panel (the anchor); the rest are plain type on the grid. No dashed
 * rules, no tinted sub-fields, no key/value tables. Distinction comes from how
 * much room each one takes up.
 */
export default function Experience() {
  const ref = useRef<HTMLElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setSeen(true),
      { threshold: 0.1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="experience" ref={ref} className="section soft-grid relative">
      <div className="container relative z-10">
        <DecodeText
          as="h2"
          text="WHERE I'VE BEEN"
          run={seen}
          className="t-h2"
          style={{ color: 'var(--color-nc-text)' }}
        />

        {/* ---- Upcoming. One line, quiet, no container at all. ---- */}
        <div className="mt-20 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <span
            className="t-data"
            style={{ color: 'var(--color-nc-cyan)', fontSize: '0.85rem' }}
          >
            FALL &apos;26
          </span>
          <h3
            className="t-h3"
            style={{ color: 'var(--color-nc-text)', fontSize: '1.05rem' }}
          >
            Software Developer Co-op
          </h3>
          <span
            className="t-mono"
            style={{ color: 'var(--color-nc-text-muted)' }}
          >
            Ontario Public Service
          </span>
        </div>

        {/* ---- The anchor. The only filled panel on the page section. ---- */}
        <article className="panel mt-10 px-7 py-10 md:px-12 md:py-14">
          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <span
              className="t-data"
              style={{ color: 'var(--color-nc-magenta)', fontSize: '0.85rem' }}
            >
              SUMMER &apos;26
            </span>
            <span
              className="t-mono"
              style={{ color: 'var(--color-nc-text-dim)' }}
            >
              Sikh Sparks
            </span>
          </div>

          <h3
            className="t-h2 mt-4"
            style={{
              color: 'var(--color-nc-text)',
              fontSize: 'clamp(1.5rem, 3vw, 2.3rem)',
            }}
          >
            Software Engineer Intern
          </h3>

          {/* Stats as a plain row of numerals, no boxes */}
          <div className="mt-9 flex flex-wrap gap-x-14 gap-y-6">
            {[
              { v: 100, s: '+', l: 'orgs' },
              { v: 60, s: '%', l: 'faster publishing' },
              { v: 200, s: '+', l: 'daily messages' },
            ].map((st) => (
              <div key={st.l} className="flex flex-col gap-1">
                <span
                  className="t-data"
                  style={{
                    color: 'var(--color-nc-yellow)',
                    fontSize: 'clamp(1.8rem, 3.4vw, 2.6rem)',
                    lineHeight: 1,
                  }}
                >
                  <CountUp end={st.v} suffix={st.s} />
                </span>
                <span
                  className="t-label"
                  style={{
                    color: 'var(--color-nc-text-dim)',
                    fontSize: '0.58rem',
                  }}
                >
                  {st.l}
                </span>
              </div>
            ))}
          </div>

          <ul className="mt-10 flex flex-col gap-4">
            {[
              'Wrote a Spring Boot adapter layer so three platform APIs behave like one posting service. They mostly cooperate.',
              "Pulled four org inboxes into a single view with Meta's webhook and polling APIs.",
              'Split the work so three of us could ship the same week without stepping on each other.',
            ].map((b) => (
              <li
                key={b}
                style={{ color: 'var(--color-nc-text-muted)', maxWidth: '64ch' }}
              >
                {b}
              </li>
            ))}
          </ul>
        </article>

        {/* ---- Previous. Plain type, no fill, generous space. ---- */}
        <div className="mt-24 grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <span
              className="t-data block"
              style={{ color: 'var(--color-nc-text-dim)', fontSize: '0.85rem' }}
            >
              DEC &apos;25 — APR &apos;26
            </span>
            <h3
              className="t-h3 mt-3"
              style={{ color: 'var(--color-nc-text)', fontSize: '1.05rem' }}
            >
              Software Engineer
            </h3>
            <span
              className="t-mono"
              style={{ color: 'var(--color-nc-text-muted)' }}
            >
              Liza Bilal Enterprise
            </span>
          </div>

          <ul className="flex flex-col gap-4 md:col-span-8">
            {[
              'Shipped a client site on AWS that 200+ people actually use.',
              'Wrote an Express API for the reports someone was doing by hand. Two hours a week back.',
              'Cut first load by 22% with compression, lazy loading, and minification.',
            ].map((b) => (
              <li
                key={b}
                style={{ color: 'var(--color-nc-text-muted)', maxWidth: '60ch' }}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* ---- Leadership. Big numerals, nothing else. AWS first. ---- */}
        <div className="mt-24 grid gap-12 sm:grid-cols-2 sm:gap-16">
          {[
            {
              n: 75,
              unit: 'students',
              org: 'AWS Student Builders',
              role: "Group Leader · May '26 —",
              tone: 'var(--color-nc-yellow)',
            },
            {
              n: 120,
              unit: 'attendees a term',
              org: 'GDG Seneca',
              role: "President · Dec '25 —",
              tone: 'var(--color-nc-magenta)',
            },
          ].map((l) => (
            <div key={l.org} className="flex flex-col gap-2">
              <span
                className="t-data"
                style={{
                  color: l.tone,
                  fontSize: 'clamp(2.6rem, 6vw, 4rem)',
                  lineHeight: 1,
                }}
              >
                <CountUp end={l.n} suffix="+" />
              </span>
              <span
                className="t-label"
                style={{ color: 'var(--color-nc-text-dim)', fontSize: '0.58rem' }}
              >
                {l.unit}
              </span>
              <p
                className="t-h3 mt-3"
                style={{ color: 'var(--color-nc-text)', fontSize: '1rem' }}
              >
                {l.org}
              </p>
              <p
                className="t-mono"
                style={{ color: 'var(--color-nc-text-muted)' }}
              >
                {l.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
