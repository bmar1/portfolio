import { useEffect, useRef } from 'react'
import { gsap, setupGsap } from '../../shared/gsapSetup'
import { useReducedMotion } from '../../shared/useReducedMotion'
import { STORY } from '../../shared/storySpine'
import styles from '../metro.module.css'

/**
 * Interchange / Leadership: two transit lines (AWS Student Builder Groups,
 * then GDG, in source order from src/content/leadership.ts) physically
 * meeting at a junction, "Seneca Central". No paid DrawSVG plugin is
 * installed, so the line-draw is native: each <path> gets its real
 * getTotalLength() set as stroke-dasharray, dashoffset animated to 0 with
 * gsap.to() scrubbed to scroll. Stop markers fade in alongside. This is the
 * one place in the site that renders leadership as a diagram instead of two
 * side-by-side cards.
 */
export default function Interchange() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [aws, gdg] = STORY.leadership

  useEffect(() => {
    if (!sectionRef.current) return
    setupGsap()
    const root = sectionRef.current

    if (reduced) {
      gsap.set(root.querySelectorAll('[data-line-path]'), { strokeDashoffset: 0 })
      gsap.set(root.querySelectorAll('[data-dot]'), { opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      const paths = gsap.utils.toArray<SVGPathElement>('[data-line-path]', root)
      const dots = gsap.utils.toArray<SVGCircleElement>('[data-dot]', root)

      paths.forEach((path) => {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
      })
      gsap.set(dots, { opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 75%',
          end: 'bottom 55%',
          scrub: 0.6,
        },
      })
      tl.to(paths, { strokeDashoffset: 0, ease: 'none', stagger: 0 }, 0)
      tl.to(dots, { opacity: 1, stagger: 0.06, ease: 'none' }, 0.05)
    }, root)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="interchange" className={styles.stationSection} ref={sectionRef}>
      <div className={styles.wrap}>
        <div className={styles.stationHeader}>
          <span className={styles.codeChip}>04</span>
          <h2 className={styles.stationName}>Interchange / Leadership</h2>
        </div>
        <p className={styles.sectionIntro} style={{ marginBottom: '2rem' }}>
          Two lines, one junction. AWS Student Builder Groups runs first, Google Developer Groups second, both meeting
          at Seneca Central.
        </p>

        <div className={styles.interchangeWrap}>
          <svg
            className={`${styles.lineDiagram} ${styles.lineDiagramDesktop}`}
            viewBox="0 0 900 320"
            fill="none"
            role="img"
            aria-label="Diagram of the AWS Student Builder Groups line and the Google Developer Groups line meeting at Seneca Central"
          >
            <path
              data-line-path
              d="M40,60 C200,60 320,140 450,180 C580,220 700,240 860,260"
              stroke="var(--nm-red, #c5003c)"
              strokeWidth="3"
            />
            <path
              data-line-path
              d="M40,260 C200,260 320,180 450,180 C580,180 700,100 860,60"
              stroke="var(--nc-cyan, #25e1ed)"
              strokeWidth="3"
            />
            <circle data-dot cx={120} cy={75} r={6} fill="var(--nm-red, #c5003c)" />
            <circle data-dot cx={280} cy={115} r={6} fill="var(--nm-red, #c5003c)" />
            <circle data-dot cx={380} cy={155} r={6} fill="var(--nm-red, #c5003c)" />
            <circle data-dot cx={120} cy={245} r={6} fill="var(--nc-cyan, #25e1ed)" />
            <circle data-dot cx={280} cy={205} r={6} fill="var(--nc-cyan, #25e1ed)" />
            <circle data-dot cx={450} cy={180} r={9} fill="#050508" stroke="#e8e8e8" strokeWidth="2" />
            <text x={450} y={210} textAnchor="middle" fill="#8a9bb0" fontSize="13" fontFamily="JetBrains Mono, monospace">
              SENECA CENTRAL
            </text>
          </svg>

          <svg
            className={`${styles.lineDiagram} ${styles.lineDiagramMobile}`}
            viewBox="0 0 320 560"
            fill="none"
            role="img"
            aria-label="Diagram of the AWS Student Builder Groups line meeting the Google Developer Groups line at Seneca Central"
          >
            <path data-line-path d="M160,30 L160,280" stroke="var(--nm-red, #c5003c)" strokeWidth="3" />
            <path data-line-path d="M160,280 L160,530" stroke="var(--nc-cyan, #25e1ed)" strokeWidth="3" />
            <circle data-dot cx={160} cy={90} r={6} fill="var(--nm-red, #c5003c)" />
            <circle data-dot cx={160} cy={160} r={6} fill="var(--nm-red, #c5003c)" />
            <circle data-dot cx={160} cy={220} r={6} fill="var(--nm-red, #c5003c)" />
            <circle data-dot cx={160} cy={350} r={6} fill="var(--nc-cyan, #25e1ed)" />
            <circle data-dot cx={160} cy={440} r={6} fill="var(--nc-cyan, #25e1ed)" />
            <circle data-dot cx={160} cy={280} r={9} fill="#050508" stroke="#e8e8e8" strokeWidth="2" />
            <text x={160} y={305} textAnchor="middle" fill="#8a9bb0" fontSize="13" fontFamily="JetBrains Mono, monospace">
              SENECA CENTRAL
            </text>
          </svg>

          <div className={styles.groupColumns}>
            {[aws, gdg].map((group) => {
              const isAws = group.id === 'aws'
              return (
                <div className={styles.groupCard} key={group.id}>
                  <div className={styles.groupHead}>
                    <span className={`${styles.groupSwatch} ${isAws ? styles.groupSwatchAws : styles.groupSwatchGdg}`} />
                    <h3 className={styles.groupOrg}>{group.org}</h3>
                  </div>
                  <p className={styles.groupPlace}>
                    {group.role} &middot; {group.place}
                  </p>
                  <div className={styles.groupOutcomes}>
                    {group.outcomes.map((o) => (
                      <span key={o.label} className={styles.boardOutcome}>
                        <span className={styles.boardOutcomeValue}>{o.value}</span>
                        <span className={styles.boardOutcomeLabel}>{o.label}</span>
                      </span>
                    ))}
                  </div>
                  <ul className={styles.groupStops}>
                    {group.did.map((item) => (
                      <li key={item} className={`${styles.groupStop} ${isAws ? styles.groupStopAws : styles.groupStopGdg}`}>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {group.learned[0] && <p className={styles.groupNote}>{group.learned[0].text}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
