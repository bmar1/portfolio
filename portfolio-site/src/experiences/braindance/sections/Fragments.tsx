import { useEffect, useRef } from 'react'
import { STORY } from '../../shared/storySpine'
import { gsap, setupGsap } from '../../shared/gsapSetup'
import { useReducedMotion } from '../../shared/useReducedMotion'
import { useDesktopMedia } from '../lib/useDesktopMedia'
import { cleanDash } from '../lib/cleanDash'
import styles from './Fragments.module.css'

/**
 * What I value, as four memory fragments. On desktop they advance like
 * clips on a scrubbed tape: one visible at a time, a thin four-segment
 * rail tracks position (no "01/04" pagination text, just a filled
 * indicator). Reduced motion / mobile render all four stacked, statically.
 */
export default function Fragments() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const fragmentRefs = useRef<Array<HTMLDivElement | null>>([])
  const railRefs = useRef<Array<HTMLSpanElement | null>>([])
  const reduced = useReducedMotion()
  const isDesktop = useDesktopMedia()

  const principles = STORY.actThree.principles
  const showScene = isDesktop && !reduced

  useEffect(() => {
    setupGsap()
    if (!showScene || !sceneRef.current) return

    const fragments = fragmentRefs.current.filter((el): el is HTMLDivElement => Boolean(el))
    const rails = railRefs.current.filter((el): el is HTMLSpanElement => Boolean(el))
    if (fragments.length < 2) return

    const ctx = gsap.context(() => {
      gsap.set(fragments.slice(1), { autoAlpha: 0, y: 16 })
      gsap.set(fragments[0], { autoAlpha: 1, y: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top top',
          end: `+=${fragments.length * 420}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(fragments.length - 1, Math.floor(self.progress * fragments.length))
            rails.forEach((rail, i) => {
              rail.dataset.active = i === idx ? 'true' : 'false'
            })
          },
        },
      })

      fragments.forEach((frag, i) => {
        if (i === 0) return
        const at = i - 0.1
        tl.to(fragments[i - 1], { autoAlpha: 0, y: -16, duration: 0.3 }, at)
        tl.to(frag, { autoAlpha: 1, y: 0, duration: 0.3 }, at)
      })
    }, sceneRef)

    return () => ctx.revert()
  }, [showScene])

  const setFragmentRef = (i: number) => (el: HTMLDivElement | null) => {
    fragmentRefs.current[i] = el
  }
  const setRailRef = (i: number) => (el: HTMLSpanElement | null) => {
    railRefs.current[i] = el
  }

  return (
    <section className={styles.section} id="fragments">
      <div className="bd-container">
        <div className={styles.header}>
          <h2 className={styles.heading}>What I value.</h2>
          <p className={styles.sub}>Four fragments, each one a lesson that stuck after it shipped.</p>
        </div>
      </div>

      {showScene ? (
        <div ref={sceneRef} className={styles.scene}>
          <div className="bd-container">
            <div className={styles.frameBox}>
              <div className={styles.rail}>
                {principles.map((p, i) => (
                  <span key={p.id} ref={setRailRef(i)} className={styles.railSeg} data-active={i === 0} />
                ))}
              </div>
              {principles.map((p, i) => (
                <div key={p.id} ref={setFragmentRef(i)} className={styles.fragment}>
                  <p className={styles.fragmentNumber}>Fragment, recovered</p>
                  <h3 className={styles.fragmentTitle}>{cleanDash(p.title)}</h3>
                  <p className={styles.fragmentBody}>{cleanDash(p.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bd-container">
          <div className={styles.fallback}>
            {principles.map((p) => (
              <div key={p.id} className={styles.fallbackItem}>
                <h3 className={styles.fragmentTitle}>{cleanDash(p.title)}</h3>
                <p className={styles.fragmentBody}>{cleanDash(p.body)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
