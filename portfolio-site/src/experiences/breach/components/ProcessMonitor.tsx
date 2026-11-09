import { useEffect, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { STORY } from '../../shared/storySpine'
import type { Role } from '../../../content/experience'
import { gsap, setupGsap } from '../../shared/gsapSetup'
import { useReducedMotion } from '../../shared/useReducedMotion'
import styles from './ProcessMonitor.module.css'

type ProcState = 'RUNNING' | 'QUEUED' | 'TERMINATED'

function stateFor(role: Role): ProcState {
  if (role.active) return 'RUNNING'
  if (role.id === 'infotech') return 'QUEUED'
  return 'TERMINATED'
}

/** RUNNING first, then QUEUED (incoming work), then TERMINATED newest-first,
 * the way a process monitor would read the active job as the headline row. */
function orderRoles(roles: Role[]): Role[] {
  const rank: Record<ProcState, number> = { RUNNING: 0, QUEUED: 1, TERMINATED: 2 }
  return [...roles].sort((a, b) => rank[stateFor(a)] - rank[stateFor(b)])
}

export default function ProcessMonitor() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  const [openId, setOpenId] = useState<string | null>(STORY.actTwo.roles.find((r) => r.active)?.id ?? null)
  const roles = orderRoles(STORY.actTwo.roles)

  useEffect(() => {
    setupGsap()
    if (reduced || !rootRef.current) return

    const ctx = gsap.context(() => {
      gsap.set('.proc-row', { opacity: 0, y: 20 })
      gsap.to('.proc-row', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 72%',
          toggleActions: 'play none none none',
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="processes" ref={rootRef} className={`breach-section ${styles.section}`}>
      <div className="breach-inner">
        <span className="breach-daemonTag">top -o pid</span>
        <h2 className="breach-h2">ACTIVE_PROCESSES</h2>
        <p className="breach-lede">
          Every role, read as a process. Expand one to see what it actually ran.
        </p>

        <div className={styles.table}>
          <div className={styles.headerRow}>
            <span>State</span>
            <span>Process</span>
            <span>Since</span>
            <span />
          </div>

          {roles.map((role) => {
            const state = stateFor(role)
            const isOpen = openId === role.id
            return (
              <div key={role.id} className="proc-row">
                <button
                  type="button"
                  className={`${styles.row} ${isOpen ? styles.isOpen : ''}`}
                  onClick={() => setOpenId(isOpen ? null : role.id)}
                  aria-expanded={isOpen}
                >
                  <span className={`${styles.status} ${styles[`status--${state.toLowerCase()}`]}`}>{state}</span>
                  <span className={styles.process}>
                    <span className={styles.processTitle}>{role.title}</span>
                    <span className={styles.processOrg}>
                      {role.org}
                      {role.team ? ` · ${role.team}` : ''}
                    </span>
                  </span>
                  <span className={styles.dates}>
                    <span className={styles.rowLabel}>Since</span>
                    {role.dates}
                  </span>
                  <ChevronRight size={18} className={styles.chevron} aria-hidden />
                </button>

                {isOpen && (
                  <div className={styles.detail}>
                    <div className={styles.detailBody}>
                      <p className="breach-lede" style={{ marginBottom: '1rem' }}>
                        {role.summary}
                      </p>
                      {role.points.length > 0 && (
                        <ul className={styles.points}>
                          {role.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                      )}
                      {role.outcomes.length > 0 && (
                        <div className={styles.outcomes}>
                          {role.outcomes.map((o) => (
                            <div className={styles.outcome} key={o.label}>
                              <span className={styles.outcomeValue}>{o.value}</span>
                              <span className={styles.outcomeLabel}>{o.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {role.tech.length > 0 && (
                        <div className={styles.techRow}>
                          {role.tech.map((t) => (
                            <span className="breach-chip" key={t}>
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
