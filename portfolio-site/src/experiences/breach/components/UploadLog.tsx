import { useEffect, useRef, useState } from 'react'
import { Lock, ExternalLink } from 'lucide-react'
import { STORY } from '../../shared/storySpine'
import type { Project } from '../../../content/projects'
import { gsap, setupGsap } from '../../shared/gsapSetup'
import { useReducedMotion } from '../../shared/useReducedMotion'
import styles from './UploadLog.module.css'

function ProjectBody({ project }: { project: Project }) {
  return (
    <>
      <div className={styles.fileHead}>
        <span>UPLOAD_LOG // DAEMON_{project.file}</span>
        {project.classified && <Lock size={14} aria-hidden />}
      </div>
      <h3 className={styles.name}>{project.name}</h3>
      <p className={styles.purpose}>{project.purpose}</p>
      {!project.classified && <p className={styles.contribution}>{project.contribution}</p>}

      {project.decisions.length > 0 && (
        <div className={styles.decisions}>
          {project.decisions.slice(0, 2).map((d) => (
            <div className={styles.decision} key={d.choice}>
              <span className={styles.decisionChoice}>{d.choice}</span>
              <span className={styles.decisionReason}>{d.reason}</span>
            </div>
          ))}
        </div>
      )}

      {project.outcomes.length > 0 && (
        <div className={styles.outcomes}>
          {project.outcomes.map((o) => (
            <div className={styles.outcome} key={o.label}>
              <span className={styles.outcomeValue}>{o.value}</span>
              <span className={styles.outcomeLabel}>{o.label}</span>
            </div>
          ))}
        </div>
      )}

      {project.tech.length > 0 && (
        <div className={styles.techRow}>
          {project.tech.map((t) => (
            <span className="breach-chip" key={t}>
              {t}
            </span>
          ))}
        </div>
      )}

      {project.href && (
        <a className="breach-btn breach-btn--ghost" href={project.href} target="_blank" rel="noreferrer">
          Open live <ExternalLink size={14} aria-hidden />
        </a>
      )}
    </>
  )
}

function Media({ project }: { project: Project }) {
  if (project.classified) {
    return (
      <div className={styles.lockedMedia}>
        <Lock size={32} aria-hidden />
        <span className={styles.lockedLabel}>ENCRYPTED // ACCESS DENIED</span>
        <span style={{ fontSize: '0.8rem' }}>Clearance required. Check back once it ships.</span>
      </div>
    )
  }
  return (
    <div className={styles.media}>
      <img src={project.shot} alt={project.alt ?? project.name} loading="lazy" />
    </div>
  )
}

/**
 * Projects as daemons you upload: a real GSAP horizontal-pan (skill 5.B)
 * on desktop, a simple stacked list on mobile or under reduced motion.
 * Classified stays visibly locked rather than hidden entirely.
 */
export default function UploadLog() {
  const reduced = useReducedMotion()
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(min-width: 768px)').matches
  })
  const wrapRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dotsRef = useRef<(HTMLSpanElement | null)[]>([])
  const projects = STORY.actTwo.projects

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const usePan = isDesktop && !reduced

  useEffect(() => {
    setupGsap()
    if (!usePan || !wrapRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const distance = trackRef.current!.scrollWidth - window.innerWidth
      const tween = gsap.to(trackRef.current, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: () => `+=${distance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(projects.length - 1, Math.floor(self.progress * projects.length))
            dotsRef.current.forEach((dot, i) => dot?.classList.toggle(styles.isActive, i === idx))
          },
        },
      })
      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    }, wrapRef)

    return () => ctx.revert()
  }, [usePan, projects.length])

  if (!usePan) {
    return (
      <section id="uploads" className="breach-section">
        <div className="breach-inner">
          <span className="breach-daemonTag">run ./upload_log</span>
          <h2 className="breach-h2">UPLOAD_LOG</h2>
          <p className="breach-lede">Three daemons, uploaded one at a time. Here is what each one does.</p>
        </div>
        <div className={styles.stack}>
          {projects.map((p) => (
            <div className={`breach-panel ${styles.stackCard}`} key={p.id}>
              <Media project={p} />
              <div style={{ marginTop: '1.5rem' }}>
                <ProjectBody project={p} />
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section id="uploads" ref={wrapRef} className={styles.wrap}>
      <div className={styles.intro}>
        <span className="breach-daemonTag">run ./upload_log</span>
        <h2 className="breach-h2">UPLOAD_LOG</h2>
        <p className="breach-lede">Three daemons, uploaded one at a time. Scroll to run the next one.</p>
      </div>
      <div ref={trackRef} className={styles.track}>
        {projects.map((p) => (
          <div className={styles.panel} key={p.id}>
            <div className={`breach-panel ${styles.panelInner}`}>
              <Media project={p} />
              <div>
                <ProjectBody project={p} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.progress}>
        {projects.map((p, i) => (
          <span
            key={p.id}
            ref={(el) => {
              dotsRef.current[i] = el
            }}
            className={`${styles.progressDot} ${i === 0 ? styles.isActive : ''}`}
          />
        ))}
      </div>
    </section>
  )
}
