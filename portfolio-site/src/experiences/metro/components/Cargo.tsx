import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { gsap, setupGsap } from '../../shared/gsapSetup'
import { useReducedMotion } from '../../shared/useReducedMotion'
import { STORY } from '../../shared/storySpine'
import styles from '../metro.module.css'
import SplitFlap from './SplitFlap'
import { useInView } from '../hooks/useInView'

function CargoStop({ project, index }: { project: (typeof STORY.actTwo.projects)[number]; index: number }) {
  const [viewRef, inView] = useInView<HTMLDivElement>({ threshold: 0.2 })
  const reduced = useReducedMotion()

  if (project.classified) {
    return (
      <div ref={viewRef} data-stop className={styles.stop} data-static={reduced ? 'true' : undefined}>
        <div className={styles.stopMeta}>
          <div className={styles.stopHeadRow}>
            <span className={styles.stopFile}>{project.file}</span>
            <h3 className={styles.stopName}>
              <SplitFlap text={project.name} active={inView} delay={index * 120} />
            </h3>
          </div>
          <p className={styles.stopPurpose}>{project.purpose}</p>
          <p className={styles.stopContribution}>{project.contribution}</p>
        </div>
        <div className={styles.stopClassified}>
          <span className={styles.stopClassifiedStamp}>CLASSIFIED</span>
          <span className={styles.stopRedactedLine} style={{ width: '80%' }} />
          <span className={styles.stopRedactedLine} style={{ width: '55%' }} />
          <span className={styles.stopRedactedLine} style={{ width: '65%' }} />
        </div>
      </div>
    )
  }

  return (
    <div ref={viewRef} data-stop className={styles.stop} data-static={reduced ? 'true' : undefined}>
      <div className={styles.stopMeta}>
        <div className={styles.stopHeadRow}>
          <span className={styles.stopFile}>{project.file}</span>
          <h3 className={styles.stopName}>
            <SplitFlap text={project.name} active={inView} delay={index * 120} />
          </h3>
        </div>
        <p className={styles.stopPurpose}>{project.purpose}</p>
        <p className={styles.stopContribution}>{project.contribution}</p>

        {project.outcomes.length > 0 && (
          <div className={styles.boardOutcomes}>
            {project.outcomes.map((o) => (
              <span key={o.label} className={styles.boardOutcome}>
                <span className={styles.boardOutcomeValue}>{o.value}</span>
                <span className={styles.boardOutcomeLabel}>{o.label}</span>
              </span>
            ))}
          </div>
        )}

        <div className={styles.boardTech}>
          {project.tech.map((t) => (
            <span key={t} className={styles.techChip}>
              {t}
            </span>
          ))}
        </div>

        {project.href && (
          <div className={styles.stopFooter}>
            <a href={project.href} className={styles.stopVisit} target="_blank" rel="noreferrer">
              Visit stop <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>

      {project.shot && (
        <div className={styles.stopShot}>
          <img src={project.shot} alt={project.alt ?? project.name} loading="lazy" />
          <span className={styles.stopShotFrame} aria-hidden="true" />
        </div>
      )}
    </div>
  )
}

/**
 * Cargo / Projects: each project is a stop on the line, revealed with a
 * real GSAP ScrollTrigger stagger (gpt-taste 5.C pattern, adapted: fade +
 * rise per stop, staggered by scroll position rather than all at once).
 * The project name itself split-flaps in via SplitFlap, like a destination
 * board locking in a station name. Classified stays visually redacted,
 * no screenshot, no real copy, per src/content/projects.ts.
 */
export default function Cargo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !containerRef.current) return
    setupGsap()
    const ctx = gsap.context(() => {
      const stops = gsap.utils.toArray<HTMLElement>('[data-stop]', containerRef.current!)
      stops.forEach((stop) => {
        gsap.to(stop, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stop,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="cargo" className={styles.stationSection}>
      <div className={styles.wrap}>
        <div className={styles.stationHeader}>
          <span className={styles.codeChip}>03</span>
          <h2 className={styles.stationName}>Cargo / Projects</h2>
        </div>
        <div className={styles.stopList} ref={containerRef}>
          {STORY.actTwo.projects.map((project, index) => (
            <CargoStop key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
