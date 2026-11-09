import { useEffect, useRef } from 'react'
import { STORY } from '../../shared/storySpine'
import { PROFILE } from '../../../content/profile'
import { gsap, setupGsap } from '../../shared/gsapSetup'
import { useReducedMotion } from '../../shared/useReducedMotion'
import styles from './IdentityDaemon.module.css'

/**
 * Act One, presented as a decrypted dossier file rather than three loose
 * paragraphs: a file-chrome header bar, the synthesis paragraph, and a
 * labeled field list pulled straight from profile.ts facts.
 */
export default function IdentityDaemon() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setupGsap()
    if (reduced || !rootRef.current) return

    const ctx = gsap.context(() => {
      gsap.set('.id-reveal', { opacity: 0, y: 28 })
      gsap.to('.id-reveal', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="identity" ref={rootRef} className={`breach-section ${styles.section}`}>
      <div className="breach-inner">
        <div className={`${styles.fileBar} id-reveal`}>
          <span>
            FILE: <strong>IDENTITY.exe</strong>
          </span>
          <span>STATUS: DECRYPTED</span>
        </div>

        <div className={styles.layout}>
          <div className={`breach-panel ${styles.dossier} id-reveal`}>
            <h2 className="breach-h2">{STORY.actOne.headline}</h2>
            <p className="breach-lede">{STORY.actOne.body}</p>
            <p className={styles.closing}>{PROFILE.bio[2]?.text}</p>
          </div>

          <div className={`breach-panel breach-panel--sm id-reveal`}>
            <div className={styles.fields}>
              {PROFILE.facts.map(([key, value]) => (
                <div className={styles.field} key={key}>
                  <span className={styles.fieldKey}>{key}</span>
                  <span className={styles.fieldValue}>{value}</span>
                </div>
              ))}
              <div className={styles.field}>
                <span className={styles.fieldKey}>Status</span>
                <span className={styles.fieldValue}>{PROFILE.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
