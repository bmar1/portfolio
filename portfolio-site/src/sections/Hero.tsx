import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown, Download } from 'lucide-react'
import HudStrip from '../components/HudStrip'
import { jumpTo, resolveSector } from '../utils/commands'

/** Layout family: Kinetic-Type + full-bleed media. Used once, here. */
export default function Hero({ bootDone }: { bootDone: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion() === true

  // Background drifts slower than the page.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  // Cursor counter-drift on the wordmark layer only.
  const mx = useSpring(0, { stiffness: 60, damping: 16 })
  const my = useSpring(0, { stiffness: 60, damping: 16 })

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * -16)
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * -10)
  }

  const goTo = (name: string) => {
    const sector = resolveSector(name)
    if (sector) jumpTo(sector)
  }

  return (
    <section
      id="hero"
      ref={ref}
      onMouseMove={onMove}
      className="gridlines scanlines relative flex min-h-screen flex-col justify-end overflow-hidden"
    >
      {/* Night City plate */}
      <motion.div className="photo-bed" style={{ y: bgY }} aria-hidden>
        <img
          src="/assets/hero-bg.jpg"
          alt=""
          fetchPriority="high"
          style={{ filter: 'brightness(0.32) saturate(1.3)' }}
        />
      </motion.div>

      {/* Depth wash: dark where the type sits, city breathing on the right */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to right, rgba(5,5,8,0.94) 0%, rgba(5,5,8,0.68) 46%, rgba(5,5,8,0.22) 100%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2/5"
        style={{
          background: 'linear-gradient(to top, var(--color-nc-void), transparent)',
        }}
        aria-hidden
      />

      <div className="container relative z-10 flex flex-1 items-center">
        <motion.div
          className="w-full max-w-[820px] py-32"
          initial="hidden"
          animate={bootDone ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
          }}
        >
          {/* 1 — eyebrow (1 of the 3 the page is allowed) */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
            className="t-mono mb-8 flex items-center gap-2"
            style={{ color: 'var(--color-nc-cyan)', letterSpacing: '0.22em' }}
          >
            <span aria-hidden>▷</span>
            ONLINE // TORONTO // OPEN FOR WINTER &apos;27
          </motion.p>

          {/* 2 — the wordmark. Boot decodes this name, then hands it off here. */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, scale: 1.04 },
              show: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            aria-label="Bilal Umar"
            className="mb-2"
            style={{ lineHeight: 0.9 }}
          >
            <motion.span
              className="block"
              style={{ x: reduce ? 0 : mx, y: reduce ? 0 : my }}
            >
              <img
                src="/name.jpg"
                alt="Bilal Umar"
                className={`wordmark ${reduce ? '' : 'wordmark-idle'}`}
                onError={(e) => {
                  const img = e.currentTarget
                  img.style.display = 'none'
                  const fb = img.nextElementSibling as HTMLElement | null
                  if (fb) fb.style.display = 'block'
                }}
              />
              {/* Fallback if name.jpg ever goes missing */}
              <span
                className="t-hero"
                style={{
                  display: 'none',
                  fontSize: 'clamp(3rem, 12vw, 8rem)',
                  color: 'var(--color-nc-yellow)',
                  textShadow: '0 0 24px rgba(252,238,10,0.5)',
                }}
              >
                Bilal Umar
              </span>
            </motion.span>
          </motion.h1>

          {/* 3 — tagline, 2 lines */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
            className="t-hero mb-16 mt-10"
            style={{ color: 'var(--color-nc-text)', lineHeight: 1.15 }}
          >
            <span className="block">I fix the part</span>
            <span
              className="block"
              style={{ color: 'var(--color-nc-cyan)', marginTop: '0.55em' }}
            >
              everyone scrolled past.
            </span>
          </motion.p>

          {/* 4 — CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
            className="flex flex-wrap gap-4"
          >
            <button
              type="button"
              onClick={() => goTo('projects')}
              className="btn btn-primary"
            >
              View work <ArrowRight size={16} aria-hidden />
            </button>
            <a
              href="/assets/Bilal_Umar_Resume_SWE.pdf"
              download="Bilal_Umar_SWE_Resume.pdf"
              className="btn btn-ghost"
            >
              Resume <Download size={16} aria-hidden />
            </a>
          </motion.div>
        </motion.div>

        <button
          type="button"
          onClick={() => goTo('experience')}
          className="t-label absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 md:flex"
          style={{ color: 'var(--color-nc-text-dim)', fontSize: '0.6rem' }}
          aria-label="Scroll to experience"
        >
          Scroll
          <ChevronDown size={16} className="nudge" aria-hidden />
        </button>
      </div>

      {/* Instrument strip — the orb's replacement, demoted so it never
          competes with the wordmark. */}
      <div className="relative z-10">
        <HudStrip />
      </div>
    </section>
  )
}
