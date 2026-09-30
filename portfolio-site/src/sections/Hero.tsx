import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, Download } from 'lucide-react'
import HudStrip from '../components/HudStrip'
import { HERO_TAGLINE, PROFILE } from '../content/profile'
import { jumpTo, resolveSector } from '../utils/commands'

const rise = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

export default function Hero({ bootDone }: { bootDone: boolean }) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion() === true

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

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
      className="hero gridlines scanlines relative flex min-h-screen flex-col overflow-hidden"
    >
      <motion.div className="photo-bed" style={{ y: bgY }} aria-hidden>
        <img
          src="/assets/hero-bg.jpg"
          alt=""
          fetchPriority="high"
          style={{ filter: 'brightness(0.64) saturate(1.35) contrast(1.05)' }}
        />
      </motion.div>
      <div className="hero-wash" aria-hidden />

      <div className="container relative z-10 flex flex-1 items-center">
        <motion.div
          className="hero-grid"
          initial="hidden"
          animate={bootDone ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
        >
          <div className="hero-copy">
            <motion.p variants={rise} className="hero-eyebrow t-mono">
              <span aria-hidden>▷</span> ONLINE // TORONTO // OPEN FOR WINTER &apos;27
            </motion.p>

            <motion.h1
              variants={{
                hidden: { opacity: 0, scale: 1.04 },
                show: { opacity: 1, scale: 1 },
              }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              aria-label="Bilal Umar"
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

            <motion.p variants={rise} className="hero-tagline">
              {HERO_TAGLINE.lead}{' '}
              <span>{HERO_TAGLINE.accent}</span>
            </motion.p>

            <motion.p variants={rise} className="hero-intro">
              Software Developer Co-op at Ontario Public Service. Studying at
              Seneca, building queues, APIs, and pipelines on the side.
            </motion.p>

            <motion.div variants={rise} className="flex flex-wrap gap-4">
              <button type="button" onClick={() => goTo('projects')} className="btn btn-primary">
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
          </div>

          <motion.button
            type="button"
            variants={rise}
            onClick={() => goTo('about')}
            className="cp-card hero-chip"
          >
            <img src={PROFILE.photo} alt="" width={200} height={200} className="hero-chip__photo" />
            <span className="hero-chip__body">
              <span className="hero-chip__live">
                <span className="led led-online" aria-hidden /> Active gig
              </span>
              <span className="hero-chip__status">{PROFILE.status}</span>
              <span className="hero-chip__cta">
                Open profile <ArrowRight size={14} aria-hidden />
              </span>
            </span>
          </motion.button>
        </motion.div>
      </div>

      <div className="relative z-10">
        <HudStrip />
      </div>
    </section>
  )
}
