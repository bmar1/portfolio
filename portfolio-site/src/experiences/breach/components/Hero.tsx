import { useEffect, useRef, useState } from 'react'
import { Download, ArrowRight } from 'lucide-react'
import ShaderStage from '../../shared/ShaderStage'
import { gsap, setupGsap } from '../../shared/gsapSetup'
import { useReducedMotion } from '../../shared/useReducedMotion'
import { STORY, RECRUITER_SUMMARY } from '../../shared/storySpine'
import { HERO_TAGLINE } from '../../../content/profile'
import { jumpTo } from '../data/sections'
import { getActiveLenis } from '../../shared/useLenis'
import styles from './Hero.module.css'

const HEX_CHARS = '0123456789ABCDEF'
const FINAL_HEX = ['4D', '2F', 'C1', '09', 'A6', 'F2', '7B', '31']

function randomHex() {
  return HEX_CHARS[Math.floor(Math.random() * 16)] + HEX_CHARS[Math.floor(Math.random() * 16)]
}

/**
 * Access point hero. Plays a one-shot breach animation (hex pairs resolving,
 * a progress readout) then reveals identity over a dataStream shader. The
 * hex-grid nav itself lives in <HexNav>, mounted once at the App root so it
 * stays reachable after the intro, not just during it.
 */
export default function Hero() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLParagraphElement>(null)
  const line2Ref = useRef<HTMLParagraphElement>(null)
  const line3Ref = useRef<HTMLParagraphElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const hexRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [revealed, setRevealed] = useState(reduced)

  useEffect(() => {
    setupGsap()
    // Reduced-motion content is already revealed via the initial state
    // (useState(reduced)), so there is nothing to animate in that case.
    if (reduced || !rootRef.current) return

    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 24 })

      let scrambleInterval: number | undefined
      const tl = gsap.timeline({
        onComplete: () => setRevealed(true),
      })

      tl.to(line1Ref.current, { opacity: 1, duration: 0.3 })
        .to(line1Ref.current, { opacity: 1, duration: 0.5 })
        .to(line2Ref.current, { opacity: 1, duration: 0.3 }, '+=0.1')
        .call(() => {
          scrambleInterval = window.setInterval(() => {
            hexRefs.current.forEach((el) => {
              if (el) el.textContent = randomHex()
            })
          }, 60)
        })
        .to(fillRef.current, { width: '100%', duration: 1.3, ease: 'power2.inOut' })
        .call(() => {
          window.clearInterval(scrambleInterval)
          hexRefs.current.forEach((el, i) => {
            if (el) el.textContent = FINAL_HEX[i]
          })
        }, undefined, '-=0.15')
        .to(line3Ref.current, { opacity: 1, duration: 0.25 }, '-=0.05')
        .to(introRef.current, { opacity: 0, duration: 0.5, ease: 'power1.out' }, '+=0.35')
        .set(introRef.current, { pointerEvents: 'none' })
        .to(
          contentRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '<',
        )

      return () => {
        if (scrambleInterval) window.clearInterval(scrambleInterval)
      }
    }, rootRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="access" ref={rootRef} className={styles.hero}>
      <ShaderStage
        variant="dataStream"
        className={styles.shader}
        colorA={[0.06, 0.04, 0.1]}
        colorB={[0.96, 0.82, 0.38]}
        speed={0.6}
      />
      <div className={styles.scrim} aria-hidden />

      {!reduced && (
        <div ref={introRef} className={styles.intro} aria-hidden={revealed}>
          <p ref={line1Ref} className={styles.introLine}>
            &gt; INITIATING BREACH SEQUENCE...
          </p>
          <p ref={line2Ref} className={styles.introLine}>
            &gt; BYPASSING ICE
          </p>
          <div className={styles.hexRow}>
            {FINAL_HEX.map((hex, i) => (
              <span
                key={i}
                className={styles.hexCell}
                ref={(el) => {
                  hexRefs.current[i] = el
                }}
              >
                {hex}
              </span>
            ))}
          </div>
          <div className={styles.progressTrack}>
            <div ref={fillRef} className={styles.progressFill} />
          </div>
          <p ref={line3Ref} className={`${styles.introLine} ${styles.isGold}`}>
            &gt; ACCESS GRANTED
          </p>
        </div>
      )}

      <div ref={contentRef} className={styles.content} style={reduced ? undefined : { opacity: revealed ? 1 : 0 }}>
        <p className={styles.status}>
          <span className={styles.statusDot} aria-hidden />
          Access granted. Identity decrypted.
        </p>
        <h1 className={styles.name}>{STORY.identity.name}</h1>
        <p className={styles.subtext}>
          {STORY.identity.status}. {HERO_TAGLINE.lead} {HERO_TAGLINE.accent}
        </p>
        <div className={styles.ctaRow}>
          <button
            type="button"
            className="breach-btn breach-btn--primary"
            onClick={() => jumpTo('uploads', getActiveLenis)}
          >
            View the uploads <ArrowRight size={16} aria-hidden />
          </button>
          <a className="breach-btn breach-btn--ghost" href={RECRUITER_SUMMARY.resumeHref} download>
            <Download size={16} aria-hidden /> Resume
          </a>
        </div>
      </div>
    </section>
  )
}
