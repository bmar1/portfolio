import { useEffect, useRef } from 'react'
import type { Role } from '../../../content/experience'
import { STORY } from '../../shared/storySpine'
import { gsap, setupGsap } from '../../shared/gsapSetup'
import { useReducedMotion } from '../../shared/useReducedMotion'
import { useDesktopMedia } from '../lib/useDesktopMedia'
import { cleanDash } from '../lib/cleanDash'
import CountUpValue from '../components/CountUpValue'
import styles from './Tracks.module.css'

function statusOf(role: Role): 'queued' | 'active' | 'logged' {
  if (role.id === 'infotech') return 'queued'
  if (role.active) return 'active'
  return 'logged'
}

const STATUS_LABEL: Record<string, string> = {
  queued: 'queued next',
  active: 'active track',
  logged: 'logged',
}

const THERMAL_SCALE: Record<string, number> = {
  queued: 0.12,
  active: 1,
  logged: 0.55,
}

/** Deterministic "waveform" bar heights, derived from role data so they
 * read as a signal, not decoration for decoration's sake. */
function waveform(role: Role) {
  const seed = role.tech.length * 7 + role.points.length * 11
  return Array.from({ length: 14 }, (_, i) => 18 + ((i * 13 + seed * 5) % 70))
}

export default function Tracks() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const isDesktop = useDesktopMedia()

  useEffect(() => {
    setupGsap()
    if (reduced || !isDesktop || !wrapRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const distance = trackRef.current!.scrollWidth - window.innerWidth
      if (distance <= 0) return
      gsap.to(trackRef.current, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [reduced, isDesktop])

  const roles = STORY.actTwo.roles

  return (
    <section className={styles.section} id="tracks">
      <div className="bd-container">
        <div className={styles.header}>
          <h2 className={styles.heading}>Experience, cut as editor tracks.</h2>
          <p className={styles.sub}>
            Scroll scrubs the timeline left to right. One clip per role, video on top, signal and heat
            underneath.
          </p>
        </div>
      </div>

      <div ref={wrapRef} className={styles.wrap}>
        <div ref={trackRef} className={styles.track}>
          {roles.map((role) => {
            const status = statusOf(role)
            const hasOutcomes = role.outcomes.length > 0
            const hasTech = role.tech.length > 0
            return (
              <article key={role.id} className={styles.clip} data-status={status}>
                <div className={styles.statusRow}>
                  <span className={styles.statusChip} data-status={status}>
                    {STATUS_LABEL[status]}
                  </span>
                  <span className={styles.dates}>{cleanDash(role.dates)}</span>
                </div>

                <h3 className={styles.orgTitle}>
                  {role.title}
                  <br />
                  <span className={styles.org}>
                    {role.org}
                    {role.team ? `, ${role.team}` : ''}
                  </span>
                </h3>

                <p className={styles.summary}>{cleanDash(role.summary)}</p>

                <div>
                  <p className={styles.layerLabel}>Audio, signal density</p>
                  <div className={styles.waveform} aria-hidden="true">
                    {waveform(role).map((h, i) => (
                      <span key={i} className={styles.bar} style={{ height: `${h}%` }} />
                    ))}
                  </div>
                </div>

                <div>
                  <p className={styles.layerLabel}>Thermal, track heat</p>
                  <div className={styles.thermal}>
                    <span
                      className={styles.thermalFill}
                      style={{ transform: `scaleX(${THERMAL_SCALE[status]})` }}
                    />
                  </div>
                </div>

                <ul className={styles.points}>
                  {role.points.map((point) => (
                    <li key={point}>{cleanDash(point)}</li>
                  ))}
                </ul>

                {hasOutcomes ? (
                  <div className={styles.outcomes}>
                    {role.outcomes.map((o) => (
                      <div key={o.label}>
                        <CountUpValue value={o.value} className={styles.outcomeValue} />
                        <span className={styles.outcomeLabel}>{o.label}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={styles.emptyNote}>No outcomes logged yet, scope lands once the contract starts.</p>
                )}

                {hasTech ? (
                  <ul className={styles.tech}>
                    {role.tech.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.emptyNote}>Stack pending.</p>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
