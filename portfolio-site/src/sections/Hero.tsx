import { useRef, useState, useEffect, useCallback } from 'react'
import { useSpring, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ChevronDown, Download } from 'lucide-react'
import JarvisOrb from '../components/jarvis/JarvisOrb'
import GithubContributionChart from '../components/GithubContributionChart'
import GithubProofLine from '../components/GithubProofLine'
import StaggerText from '../components/StaggerText'
import HudFrame from '../components/HudFrame'
import { getScrollBehavior } from '../utils/motion'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [heroScrollFade, setHeroScrollFade] = useState(1)
  const [clock, setClock] = useState(() => {
    const d = new Date()
    return d.toTimeString().slice(0, 8)
  })

  useEffect(() => {
    const id = window.setInterval(() => {
      const d = new Date()
      setClock(d.toTimeString().slice(0, 8))
    }, 1000)
    return () => window.clearInterval(id)
  }, [])

  const reducedMotionPref = useReducedMotion()
  const reduceMotion = reducedMotionPref === true

  const mouseX = useSpring(0, { stiffness: 52, damping: 14 })
  const mouseY = useSpring(0, { stiffness: 52, damping: 14 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion) return
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 78
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 68
    mouseX.set(x)
    mouseY.set(y)
  }

  const updateHeroScrollFade = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const heroTop = rect.top
    const heroHeight = rect.height
    const scrolledPastTop = Math.max(0, -heroTop)
    const t = Math.min(1, scrolledPastTop / (heroHeight * 0.85))
    setHeroScrollFade(1 - t * 0.65)
  }, [])

  useEffect(() => {
    updateHeroScrollFade()
    window.addEventListener('scroll', updateHeroScrollFade, { passive: true })
    window.addEventListener('resize', updateHeroScrollFade, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateHeroScrollFade)
      window.removeEventListener('resize', updateHeroScrollFade)
    }
  }, [updateHeroScrollFade])

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="grid-bg relative min-h-screen flex items-center overflow-x-clip"
      style={
        {
          '--hero-scroll-fade': String(heroScrollFade),
        } as React.CSSProperties
      }
    >
      <div className="photo-bed" aria-hidden>
        <img
          src="/assets/city.jpg"
          alt=""
          fetchPriority="high"
          style={{ opacity: 0.55, filter: 'saturate(1.2) contrast(1.05)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 85% 55% at 72% 18%, rgba(64, 224, 230, 0.14) 0%, transparent 52%),
              radial-gradient(ellipse 60% 50% at 8% 82%, rgba(255, 90, 200, 0.12) 0%, transparent 50%),
              linear-gradient(to bottom, rgba(8, 12, 16, 0.86) 0%, rgba(8, 12, 16, 0.74) 42%, var(--color-bg-base) 94%)
            `,
          }}
        />
      </div>

      {/* HUD status readout — top-left, real values only */}
      <div
        className="hidden md:flex absolute top-24 left-6 lg:left-12 z-10 flex-col gap-1 pointer-events-none"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-text-muted)',
          opacity: heroScrollFade,
          transition: 'opacity 200ms ease',
        }}
        aria-hidden
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-block"
            style={{
              width: 6,
              height: 6,
              background: 'var(--color-neon-cyan)',
              boxShadow: '0 0 8px var(--color-neon-cyan)',
              animation: 'ledBlink 2s ease-in-out infinite',
            }}
          />
          <span style={{ color: 'var(--color-neon-cyan)' }}>SYS</span>
          <span>STATUS: ONLINE</span>
        </div>
        <div style={{ paddingLeft: 14 }}>
          LAT 43.6532° N · LON 79.3832° W
        </div>
        <div style={{ paddingLeft: 14 }}>
          T:{' '}
          <span style={{ color: 'var(--color-neon-magenta)' }}>{clock}</span>{' '}
          EST
        </div>
      </div>

      <motion.div
        className="container relative z-10"
        initial={
          reduceMotion
            ? { opacity: 0, y: 8 }
            : { opacity: 0, y: 22, scale: 0.985, filter: 'blur(4px)' }
        }
        animate={
          reduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
        }
        transition={
          reduceMotion
            ? { duration: 0.25 }
            : {
                type: 'spring',
                stiffness: 300,
                damping: 28,
                mass: 0.85,
                opacity: { duration: 0.4, delay: 0.12 },
                filter: { duration: 0.5, delay: 0.1 },
              }
        }
      >
        <div className="grid grid-cols-1 gap-12 items-center min-h-screen py-32 lg:grid-cols-12 lg:gap-14">
          <motion.div
            className="flex min-w-0 flex-col gap-6 lg:col-span-7"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              reduceMotion
                ? {}
                : { type: 'spring', stiffness: 360, damping: 32, delay: 0.18 }
            }
          >
            <div className="glitch-text" data-text="Building things that actually work.">
              <StaggerText
                text="Building things that actually work."
                className="text-h1"
                initialDelay={120}
              />
            </div>

            <p className="text-body max-w-md" style={{ color: 'var(--color-text-secondary)' }}>
              Full-stack dev in Toronto. I like the boring parts nobody screenshots.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="pill">Seneca CPA · '27</span>
              <span className="pill pill-accent">SWE Co-op @ OPS · Fall '26</span>
              <span className="pill">GDG President</span>
            </div>

            <GithubProofLine visible />

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="btn btn-primary cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: getScrollBehavior() })
                }}
              >
                View Projects <ArrowRight size={16} />
              </a>
              <a
                href="/assets/Bilal_Umar_Resume_SWE.pdf"
                download="Bilal_Umar_SWE_Resume.pdf"
                className="btn btn-ghost cursor-pointer"
              >
                Download Resume <Download size={16} />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative mx-auto flex w-full min-w-0 max-w-none flex-col items-center gap-8 overflow-visible lg:col-span-5 lg:mx-0"
            style={{
              x: reduceMotion ? 0 : mouseX,
              y: reduceMotion ? 0 : mouseY,
              perspective: '1100px',
            }}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={
              reduceMotion
                ? {}
                : { type: 'spring', stiffness: 340, damping: 30, delay: 0.22 }
            }
          >
            <motion.div
              className="flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d' }}
              initial={{ rotate: 0, x: 0, y: 0, rotateX: 0, rotateY: 0 }}
              animate={
                reduceMotion
                  ? false
                  : {
                      rotate: [0, 360],
                      x: [0, 8, -7, 5, -6, 0],
                      y: [0, -7, 8, -5, 4, 0],
                      rotateY: [4, -7, 5, -6, 4],
                      rotateX: [-5, 7, -4, 6, -5],
                    }
              }
              transition={{
                rotate: { repeat: Infinity, duration: 70, ease: 'linear' },
                x: { repeat: Infinity, duration: 12, ease: 'easeInOut' },
                y: { repeat: Infinity, duration: 13, ease: 'easeInOut' },
                rotateY: { repeat: Infinity, duration: 10, ease: 'easeInOut' },
                rotateX: { repeat: Infinity, duration: 11, ease: 'easeInOut' },
              }}
            >
              <div className="aspect-square w-[min(100%,560px)] shrink-0 overflow-visible">
                <JarvisOrb animate={!reduceMotion} />
              </div>
            </motion.div>

            <div className="mt-8 w-full self-center">
              <HudFrame
                label="Contributions"
                meta="// LIVE"
                ledTone="cyan"
                innerStyle={{ padding: '1rem 0.5rem 0.5rem' }}
              >
                <GithubContributionChart />
              </HudFrame>
            </div>
          </motion.div>
        </div>

        <button
          type="button"
          className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-1 border-0 bg-transparent p-2 text-mono text-xs focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{
            color: 'var(--color-text-muted)',
            outlineColor: 'var(--color-accent-cyan)',
          }}
          onClick={() =>
            document
              .querySelector('#projects')
              ?.scrollIntoView({ behavior: getScrollBehavior() })
          }
          aria-label="Scroll to projects"
        >
          <span>What ships next</span>
          <ChevronDown size={18} aria-hidden className="hero-scroll-chevron" />
        </button>
      </motion.div>
    </section>
  )
}
