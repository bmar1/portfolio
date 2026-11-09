import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../../../content/projects'
import { STORY } from '../../shared/storySpine'
import { gsap, setupGsap } from '../../shared/gsapSetup'
import { useReducedMotion } from '../../shared/useReducedMotion'
import { useDesktopMedia } from '../lib/useDesktopMedia'
import { cleanDash } from '../lib/cleanDash'
import ScrambleText from '../components/ScrambleText'
import CountUpValue from '../components/CountUpValue'
import styles from './Recordings.module.css'

/**
 * One pinned scene per visible project. Scroll is scrubbed through a GSAP
 * timeline that cross-fades five stages in order: purpose, contribution,
 * decisions, outcomes, tech. Mobile and reduced-motion skip the pin
 * entirely and render every stage in plain stacked flow (CSS media query
 * flips .stage from absolute to static, so no JS branching needed there).
 */
function ProjectScene({ project }: { project: Project }) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const stageRefs = useRef<Array<HTMLDivElement | null>>([])
  const reduced = useReducedMotion()
  const isDesktop = useDesktopMedia()

  useEffect(() => {
    setupGsap()
    if (reduced || !isDesktop || !sceneRef.current) return

    const stages = stageRefs.current.filter((el): el is HTMLDivElement => Boolean(el))
    if (stages.length < 2) return

    const ctx = gsap.context(() => {
      gsap.set(stages.slice(1), { autoAlpha: 0, y: 20 })
      gsap.set(stages[0], { autoAlpha: 1, y: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: 'top top',
          end: `+=${stages.length * 480}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      stages.forEach((stage, i) => {
        if (i === 0) return
        const at = i - 0.12
        tl.to(stages[i - 1], { autoAlpha: 0, y: -18, duration: 0.3 }, at)
        tl.to(stage, { autoAlpha: 1, y: 0, duration: 0.3 }, at)
      })
    }, sceneRef)

    return () => ctx.revert()
  }, [reduced, isDesktop])

  const setStageRef = (i: number) => (el: HTMLDivElement | null) => {
    stageRefs.current[i] = el
  }

  return (
    <article ref={sceneRef} className={styles.scene}>
      <div className="bd-container">
        <div className={styles.sceneGrid}>
          <div className={styles.visual}>
            {project.shot && (
              <img src={project.shot} alt={project.alt ?? project.name} className={styles.visualImg} loading="lazy" />
            )}
            <span className={styles.visualTag}>REC_{project.file}</span>
          </div>

          <div className={styles.stagesBox}>
            <div ref={setStageRef(0)} className={styles.stage}>
              <p className={styles.stageKicker}>Purpose</p>
              <h3 className={styles.title}>{project.name}</h3>
              <p className={styles.text}>{cleanDash(project.purpose)}</p>
            </div>

            <div ref={setStageRef(1)} className={styles.stage}>
              <p className={styles.stageKicker}>Contribution</p>
              <p className={styles.text}>{cleanDash(project.contribution)}</p>
            </div>

            <div ref={setStageRef(2)} className={styles.stage}>
              <p className={styles.stageKicker}>Decisions</p>
              <ul className={styles.decisions}>
                {project.decisions.slice(0, 2).map((d) => (
                  <li key={d.choice}>
                    <p className={styles.decisionChoice}>{cleanDash(d.choice)}</p>
                    <p className={styles.decisionReason}>{cleanDash(d.reason)}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div ref={setStageRef(3)} className={styles.stage}>
              <p className={styles.stageKicker}>Outcomes</p>
              <div className={styles.outcomes}>
                {project.outcomes.map((o) => (
                  <div key={o.label}>
                    <CountUpValue value={o.value} className={styles.outcomeValue} />
                    <span className={styles.outcomeLabel}>{o.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div ref={setStageRef(4)} className={styles.stage}>
              <p className={styles.stageKicker}>Stack</p>
              <ul className={styles.tech}>
                {project.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              {project.href && (
                <a className={styles.openLink} href={project.href} target="_blank" rel="noreferrer">
                  Open the live build
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

/** The Classified recording. No screenshot exists, intentionally: a short,
 * static, glitched placeholder instead of forcing it through the same
 * five-stage machinery the finished recordings use. */
function ClassifiedCard({ project }: { project: Project }) {
  return (
    <div className="bd-container">
      <div className={styles.classified}>
        <div className={styles.classifiedPanel}>
          <span className={styles.redactBar} style={{ top: '30%' }} aria-hidden="true" />
          <span className={styles.redactBar} style={{ top: '48%' }} aria-hidden="true" />
          <span className={styles.redactBar} style={{ top: '66%' }} aria-hidden="true" />
          <p className={styles.noSignal}>NO SIGNAL</p>
        </div>
        <div>
          <p className={styles.stageKicker}>File {project.file}</p>
          <h3 className={styles.classifiedTitle}>
            <ScrambleText text={project.name} loop />
          </h3>
          <p className={styles.classifiedBody}>{cleanDash(project.purpose)}</p>
          <p className={styles.classifiedBody}>{cleanDash(project.why.text)}</p>
          <span className={styles.classifiedChip}>access denied</span>
        </div>
      </div>
    </div>
  )
}

export default function Recordings() {
  const projects = STORY.actTwo.projects
  const visible = projects.filter((p) => !p.classified)
  const classified = projects.filter((p) => p.classified)

  return (
    <section className={styles.section} id="recordings">
      <div className="bd-container">
        <div className={styles.header}>
          <h2 className={styles.heading}>Projects, played back as recordings.</h2>
          <p className={styles.sub}>
            Each one is a pinned scene. Keep scrolling and it steps through purpose, contribution, the
            calls that mattered, and what shipped.
          </p>
        </div>
      </div>

      {visible.map((project) => (
        <ProjectScene key={project.id} project={project} />
      ))}

      {classified.map((project) => (
        <ClassifiedCard key={project.id} project={project} />
      ))}
    </section>
  )
}
