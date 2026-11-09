import { useEffect, useRef } from 'react'
import { STORY } from '../../shared/storySpine'
import type { Group } from '../../../content/leadership'
import { gsap, setupGsap } from '../../shared/gsapSetup'
import { useReducedMotion } from '../../shared/useReducedMotion'
import styles from './NetworkReach.module.css'

const CX = 150
const CY = 150
const MAX_R = 128

function parseNum(s: string) {
  const match = s.match(/\d+/)
  return match ? parseInt(match[0], 10) : 0
}

/** Sunflower-seed spiral: evenly fills a disc so node density visibly
 * scales with count, the "76 small dots vs 48 small dots" is immediately
 * readable without needing a real force-directed layout dependency. */
function sunflowerPositions(count: number, maxR: number) {
  const golden = Math.PI * (3 - Math.sqrt(5))
  const points: { x: number; y: number }[] = []
  for (let i = 0; i < count; i++) {
    const r = maxR * Math.sqrt((i + 0.5) / count)
    const theta = i * golden
    points.push({ x: CX + r * Math.cos(theta), y: CY + r * Math.sin(theta) })
  }
  return points
}

function Cluster({ group, isAws }: { group: Group; isAws: boolean }) {
  const reduced = useReducedMotion()
  const clusterRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([])
  const linkRefs = useRef<(SVGLineElement | null)[]>([])

  const primary = group.outcomes[0]
  const secondary = group.outcomes[1]
  const target = parseNum(primary.value)
  const nodeCount = Math.max(14, Math.min(64, Math.round(target / 2)))
  const nodes = sunflowerPositions(nodeCount, MAX_R)

  useEffect(() => {
    setupGsap()
    if (reduced || !clusterRef.current) return

    const ctx = gsap.context(() => {
      const nodeEls = nodeRefs.current.filter(Boolean) as SVGCircleElement[]
      const linkEls = linkRefs.current.filter(Boolean) as SVGLineElement[]
      gsap.set(nodeEls, { opacity: 0, scale: 0, transformOrigin: '50% 50%' })
      gsap.set(linkEls, { opacity: 0 })

      const counter = { value: 0 }
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: clusterRef.current,
          start: 'top 82%',
          end: 'top 28%',
          scrub: 1,
        },
      })
      tl.to(nodeEls, { opacity: 1, scale: 1, ease: 'none', stagger: { each: 0.8 / nodeEls.length, from: 'random' } }, 0)
      tl.to(linkEls, { opacity: 1, ease: 'none', stagger: { each: 0.8 / linkEls.length, from: 'random' } }, 0)
      tl.to(
        counter,
        {
          value: target,
          ease: 'none',
          onUpdate: () => {
            if (counterRef.current) counterRef.current.textContent = `${Math.round(counter.value)}+`
          },
        },
        0,
      )
    }, clusterRef)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, nodeCount])

  return (
    <div className={`breach-panel ${styles.cluster}`} ref={clusterRef}>
      <div className={styles.clusterHead}>
        <div>
          <p className={styles.org}>{group.org}</p>
          <p className={styles.role}>
            {group.role} · {group.place}
          </p>
        </div>
        <div className={styles.counters}>
          <div className={styles.counter}>
            <span className={styles.counterValue} ref={counterRef}>
              {reduced ? primary.value : '0+'}
            </span>
            <span className={styles.counterLabel}>{primary.label}</span>
          </div>
          {secondary && (
            <div className={styles.counter}>
              <span className={styles.counterValue}>{secondary.value}</span>
              <span className={styles.counterLabel}>{secondary.label}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.graphWrap}>
        <svg className={styles.graph} viewBox="0 0 300 300" role="img" aria-label={`Reach graph for ${group.org}`}>
          {nodes.map((n, i) => (
            <line
              key={`l-${i}`}
              ref={(el) => {
                linkRefs.current[i] = el
              }}
              x1={CX}
              y1={CY}
              x2={n.x}
              y2={n.y}
              className={styles.link}
            />
          ))}
          <circle cx={CX} cy={CY} r={16} className={styles.hub} />
          {nodes.map((n, i) => (
            <circle
              key={`n-${i}`}
              ref={(el) => {
                nodeRefs.current[i] = el
              }}
              cx={n.x}
              cy={n.y}
              r={isAws ? 3.2 : 2.6}
              className={`${styles.node} ${isAws ? styles['node--aws'] : ''}`}
            />
          ))}
        </svg>
      </div>

      <ul className={styles.did}>
        {group.did.slice(0, 2).map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Leadership as a living reach graph, not two plain cards. Node density
 * (sunflower-packed dots around a hub) scales with the real outcome count,
 * and the primary counter ticks up as the graph assembles on scroll.
 */
export default function NetworkReach() {
  const groups = STORY.leadership // AWS first, then GDG, order owned by storySpine

  return (
    <section id="network" className="breach-section">
      <div className="breach-inner">
        <span className="breach-daemonTag">scan --reach</span>
        <h2 className="breach-h2">NETWORK_REACH</h2>
        <p className="breach-lede">
          Two chapters, built from scratch. Each node below is a cluster of people reached, not a line in a resume.
        </p>
        <div className={styles.grid}>
          {groups.map((g) => (
            <Cluster key={g.id} group={g} isAws={g.id === 'aws'} />
          ))}
        </div>
      </div>
    </section>
  )
}
