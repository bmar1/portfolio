import { useEffect, useRef } from 'react'
import { STORY } from '../../shared/storySpine'
import { gsap, setupGsap } from '../../shared/gsapSetup'
import { useReducedMotion } from '../../shared/useReducedMotion'
import { useDesktopMedia } from '../lib/useDesktopMedia'
import { cleanDash } from '../lib/cleanDash'
import CountUpValue from '../components/CountUpValue'
import styles from './Factions.module.css'

/**
 * Leadership as two factions, one scale. Not two side-by-side cards: a
 * single balance beam. AWS Student Builder Groups carries the weight at
 * rest (source-controlled order: GROUPS[0] in storySpine), and scrolling
 * shifts it toward GDG while the stat numbers count up and the "learned"
 * lines cross-fade underneath like timed subtitles.
 */
export default function Factions() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const fillAwsRef = useRef<HTMLSpanElement>(null)
  const fillGdgRef = useRef<HTMLSpanElement>(null)
  const captionRefs = useRef<Array<HTMLParagraphElement | null>>([])
  const reduced = useReducedMotion()
  const isDesktop = useDesktopMedia()

  const [aws, gdg] = STORY.leadership

  const captions = [
    { org: aws.org, text: aws.learned[0]?.text },
    { org: aws.org, text: aws.learned[1]?.text },
    { org: gdg.org, text: gdg.learned[0]?.text },
    { org: gdg.org, text: gdg.learned[1]?.text },
  ].filter((c): c is { org: string; text: string } => Boolean(c.text))

  const showScene = isDesktop && !reduced

  useEffect(() => {
    setupGsap()
    if (!showScene || !sceneRef.current || !fillAwsRef.current || !fillGdgRef.current) return

    const captionEls = captionRefs.current.filter((el): el is HTMLParagraphElement => Boolean(el))

    const ctx = gsap.context(() => {
      gsap.set(fillAwsRef.current, { scaleX: 1 })
      gsap.set(fillGdgRef.current, { scaleX: 0.15 })
      if (captionEls.length) {
        gsap.set(captionEls.slice(1), { autoAlpha: 0 })
        gsap.set(captionEls[0], { autoAlpha: 1 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top top',
          end: '+=1800',
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.to(fillAwsRef.current, { scaleX: 0.35, duration: 1, ease: 'none' }, 0)
      tl.to(fillGdgRef.current, { scaleX: 1, duration: 1, ease: 'none' }, 0)

      captionEls.forEach((el, i) => {
        if (i === 0) return
        const at = (i - 0.12) / captionEls.length
        tl.to(captionEls[i - 1], { autoAlpha: 0, duration: 0.08 }, at)
        tl.to(el, { autoAlpha: 1, duration: 0.08 }, at)
      })
    }, sceneRef)

    return () => ctx.revert()
  }, [showScene])

  const setCaptionRef = (i: number) => (el: HTMLParagraphElement | null) => {
    captionRefs.current[i] = el
  }

  return (
    <section className={styles.section} id="leadership">
      <div className="bd-container">
        <div className={styles.header}>
          <h2 className={styles.heading}>Two groups, one scale.</h2>
          <p className={styles.sub}>
            AWS Student Builder Groups carries the weight first. Keep scrolling and it shifts toward GDG.
          </p>
        </div>
      </div>

      {showScene ? (
        <div ref={sceneRef} className={styles.scene}>
          <div className="bd-container">
            <div className={styles.scaleWrap}>
              <div className={styles.labels}>
                <span className={styles.labelAws}>{aws.org}</span>
                <span className={styles.labelGdg}>{gdg.org}</span>
              </div>
              <div className={styles.beam}>
                <span className={styles.fulcrum} aria-hidden="true" />
                <span ref={fillAwsRef} className={styles.fillAws} style={{ width: '50%' }} aria-hidden="true" />
                <span ref={fillGdgRef} className={styles.fillGdg} style={{ width: '50%' }} aria-hidden="true" />
              </div>

              <div className={styles.statsRow}>
                <div className={styles.statGroup}>
                  {aws.outcomes.map((o) => (
                    <div key={o.label}>
                      <CountUpValue value={o.value} className={styles.statValue} />
                      <span className={styles.statLabel}>{o.label}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.statGroup}>
                  {gdg.outcomes.map((o) => (
                    <div key={o.label}>
                      <CountUpValue value={o.value} className={styles.statValue} />
                      <span className={styles.statLabel}>{o.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.captionBox}>
                {captions.map((c, i) => (
                  <p key={c.org + i} ref={setCaptionRef(i)} className={styles.caption}>
                    <span className={styles.captionSource}>{c.org}</span>
                    {cleanDash(c.text)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bd-container">
          <div className={styles.fallback}>
            {[aws, gdg].map((group) => (
              <div key={group.id} className={styles.fallbackGroup} data-faction={group.id}>
                <p className={styles.fallbackRole}>
                  {group.role}, {group.place}
                </p>
                <h3 className={styles.fallbackOrg}>{group.org}</h3>
                <div className={styles.fallbackStats}>
                  {group.outcomes.map((o) => (
                    <div key={o.label}>
                      <CountUpValue value={o.value} className={styles.statValue} />
                      <span className={styles.statLabel}>{o.label}</span>
                    </div>
                  ))}
                </div>
                <ul className={styles.fallbackLearned}>
                  {group.learned.map((l) => (
                    <li key={l.text}>{cleanDash(l.text)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
