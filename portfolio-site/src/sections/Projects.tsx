import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import CountUp from '../components/CountUp'

interface Project {
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
    badge: '01',
    name: 'Plated',
    blurb:
      'Meal planning for 100+ people. Three recipe APIs squashed into one schema so nobody has to think about dinner.',
    shot: '/assets/plated.png',
    alt: 'Plated, a meal and grocery planning interface',
    stats: [
      { value: 100, suffix: '+', label: 'people using it' },
      { value: 90, suffix: '%', label: 'uptime' },
      { value: 86, suffix: '%', label: 'covered by tests' },
    ],
    tech: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'AWS', 'Docker'],
    href: 'https://plated-app.online/',
  },
  {
    badge: '02',
    name: 'Nest',
    blurb:
      'Apartment hunting without forty tabs open. Ranks 140+ listings a run and answers in under 30 seconds.',
    shot: '/assets/nest.png',
    alt: 'Nest, ranked rental search results',
    stats: [
      { value: 150, suffix: '+', label: 'searches run' },
      { value: 30, prefix: '<', suffix: 's', label: 'to results' },
      { value: 20, suffix: '%', label: 'fewer blowups' },
    ],
    tech: ['React', 'Spring Boot', 'RabbitMQ', 'Docker', 'GKE', 'CI/CD'],
    href: 'https://nest-one-eta.vercel.app/',
  },
]

function Panel({ p }: { p: Project }) {
  return (
    <article className="panel-pane flex w-full shrink-0 flex-col justify-center gap-8 px-6 md:px-16 lg:flex-row lg:items-center lg:gap-14">
      <div className="lg:w-[54%]">
        <div className="panel hud relative overflow-hidden">
          <img
            src={p.shot}
            alt={p.alt}
            loading="lazy"
            decoding="async"
            className="w-full object-cover object-top"
            style={{ aspectRatio: '16 / 10' }}
          />
        </div>
      </div>

      <div className="lg:w-[38%]">
        <div className="mb-3 flex items-center gap-3">
          <span className="badge">{p.badge}</span>
          <h3 className="t-h2" style={{ color: 'var(--color-nc-text)' }}>
            {p.name}
          </h3>
        </div>

        <p
          className="mb-6 max-w-[46ch]"
          style={{ color: 'var(--color-nc-text-muted)' }}
        >
          {p.blurb}
        </p>

        <div className="mb-6 flex flex-wrap gap-7">
          {p.stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <span
                className="t-data"
                style={{
                  color: 'var(--color-nc-yellow)',
                  fontSize: '1.35rem',
                  textShadow: '0 0 14px rgba(252,238,10,0.3)',
                }}
              >
                <CountUp end={s.value} suffix={s.suffix} prefix={s.prefix} />
              </span>
              <span
                className="t-label mt-1"
                style={{ color: 'var(--color-nc-text-dim)', fontSize: '0.6rem' }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span key={t} className="badge badge-ghost">
              {t}
            </span>
          ))}
        </div>

        <a
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Open it <ExternalLink size={15} aria-hidden />
        </a>
      </div>
    </article>
  )
}

/**
 * Layout family: Horizontal Scroll Hijack. Used once, here.
 * Below lg, or with reduced motion, it degrades to a plain vertical stack.
 * A pinned sideways scroll on a phone is broken by default, so the fallback
 * is not optional.
 */
export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion() === true

  // Read the breakpoint synchronously. If this starts false, the pan container
  // is absent on first render, useScroll binds to a null target and never
  // re-measures once it appears, which parks the track mid-pane.
  const [wide, setWide] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 1024px)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const sync = () => setWide(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const pan = wide && !reduce

  // Measure the real overflow instead of guessing a percentage. Percentages
  // resolve against the track's own width, which changes with the rail, the
  // pane count and font metrics; this cannot drift.
  const [distance, setDistance] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!track || !viewport) return

    const measure = () =>
      setDistance(Math.max(0, track.scrollWidth - viewport.clientWidth))

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    ro.observe(viewport)
    return () => ro.disconnect()
  }, [pan])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance])
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="projects" className="section relative" style={{ paddingBottom: 0 }}>
      <div className="photo-bed" style={{ opacity: 0.22 }} aria-hidden>
        <img src="/assets/alley.jpg" alt="" loading="lazy" decoding="async" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, var(--color-nc-void), transparent 25%, transparent 75%, var(--color-nc-void))',
          }}
        />
      </div>

      <div className="container relative z-10">
        {/* Eyebrow 2 of 3 */}
        <p
          className="t-mono mb-3"
          style={{ color: 'var(--color-nc-cyan)', letterSpacing: '0.22em' }}
        >
          ▷ FEATURED_WORK
        </p>
        <h2 className="t-h2" style={{ color: 'var(--color-nc-text)' }}>
          Stuff I&apos;ve shipped
        </h2>
      </div>

      {pan ? (
        <div ref={ref} className="relative z-10 mt-12" style={{ height: '260vh' }}>
          <div
            ref={viewportRef}
            className="sticky top-0 flex h-screen items-center overflow-hidden"
          >
            <motion.div ref={trackRef} className="flex w-max shrink-0" style={{ x }}>
              {PROJECTS.map((p) => (
                <Panel key={p.name} p={p} />
              ))}
            </motion.div>

            {/* Pan progress */}
            <div
              className="absolute inset-x-16 bottom-12 h-px"
              style={{ background: 'var(--color-nc-border)' }}
              aria-hidden
            >
              <motion.div
                className="h-full"
                style={{
                  width: bar,
                  background: 'var(--color-nc-yellow)',
                  boxShadow: '0 0 10px var(--color-nc-yellow)',
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 mt-12 flex flex-col gap-24 pb-24">
          {PROJECTS.map((p) => (
            <Panel key={p.name} p={p} />
          ))}
        </div>
      )}
    </section>
  )
}
