import { useRef, useState, useEffect, useCallback } from 'react'
import { useSpring, motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronDown, Download } from 'lucide-react'
import JarvisOrb from '../components/jarvis/JarvisOrb'
import GithubContributionChart from '../components/GithubContributionChart'
import GithubProofLine from '../components/GithubProofLine'
import TerminalTyping from '../components/TerminalTyping'
import StaggerText from '../components/StaggerText'
import { getScrollBehavior } from '../utils/motion'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [bootDone, setBootDone] = useState(() =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [heroScrollFade, setHeroScrollFade] = useState(1)

  const reducedMotionPref = useReducedMotion()
  const reduceMotion = reducedMotionPref === true

  useEffect(() => {
    if (reduceMotion) setBootDone(true)
  }, [reduceMotion])
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

  useEffect(() => {
    if (!bootDone) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
    document.body.style.overflow = ''
  }, [bootDone])

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
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 85% 55% at 72% 18%, rgba(57, 208, 216, 0.09) 0%, transparent 52%),
              radial-gradient(ellipse 55% 45% at 12% 78%, rgba(158, 124, 255, 0.07) 0%, transparent 48%),
              linear-gradient(to bottom, rgba(8, 12, 16, 0.55) 0%, var(--color-bg-base) 88%)
            `,
          }}
        />
      </div>

      {/* Full-screen boot terminal — not stacked above the headline */}
      <AnimatePresence>
        {!bootDone && (
          <motion.div
            key="boot-overlay"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-4 py-8"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.03,
              filter: reduceMotion ? 'none' : 'blur(8px)',
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background:
                'radial-gradient(ellipse 100% 70% at 50% 35%, rgba(10, 14, 20, 0.98) 0%, rgba(5, 8, 12, 0.995) 50%, var(--color-bg-base) 100%)',
            }}
          >
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0.35 }}
              animate={{ opacity: 0.55 }}
              transition={{ duration: 0.4 }}
              style={{
                background:
                  'radial-gradient(ellipse 80% 50% at 50% 40%, rgba(57, 208, 216, 0.12) 0%, transparent 60%)',
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.08 }}
              className="relative z-[1] w-full"
            >
              <TerminalTyping onComplete={() => setBootDone(true)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="container relative z-10"
        initial={false}
        animate={
          bootDone
            ? reduceMotion
              ? { opacity: 1, y: 0 }
              : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
            : reduceMotion
              ? { opacity: 0, y: 8 }
              : { opacity: 0, y: 22, scale: 0.985, filter: 'blur(4px)' }
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
        style={{ pointerEvents: bootDone ? 'auto' : 'none' }}
      >
        <div className="grid grid-cols-1 gap-12 items-center min-h-screen py-32 lg:grid-cols-12 lg:gap-14">
          <motion.div
            className="flex min-w-0 flex-col gap-6 lg:col-span-7"
            initial={false}
            animate={
              bootDone
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -12 }
            }
            transition={
              reduceMotion
                ? {}
                : { type: 'spring', stiffness: 360, damping: 32, delay: 0.18 }
            }
          >
            <div>
              <StaggerText
                key={bootDone ? 'hero-ready' : 'pre-hero'}
                text="Building things that actually work."
                className="text-h1"
                initialDelay={bootDone ? 120 : 0}
              />
            </div>

            <p className="text-body max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
              I optimize for the work nobody screenshots — schemas, indexes, and the path data takes
              when things go wrong.
            </p>

            <p className="text-body max-w-lg" style={{ color: 'var(--color-text-secondary)' }}>
              CPA @ Seneca · technical lead @ GDG Seneca · shipping Plated, Nest, and a greedy route
              solver in production.
            </p>

            <GithubProofLine visible={bootDone} />

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
                href="/assets/resume_swe.pdf"
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
            initial={false}
            animate={
              bootDone
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 16 }
            }
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
                <JarvisOrb animate={!reduceMotion && bootDone} />
              </div>
            </motion.div>

            <div className="mt-8 w-full self-center">
              <GithubContributionChart />
            </div>
          </motion.div>
        </div>

        {bootDone && (
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
        )}
      </motion.div>
    </section>
  )
}
