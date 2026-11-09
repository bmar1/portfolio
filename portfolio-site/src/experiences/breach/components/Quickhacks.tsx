import { useEffect, useRef } from 'react'
import { Server, TrendingUp, Users, Gem } from 'lucide-react'
import { STORY } from '../../shared/storySpine'
import { gsap, setupGsap } from '../../shared/gsapSetup'
import { useReducedMotion } from '../../shared/useReducedMotion'
import styles from './Quickhacks.module.css'

const ICONS: Record<string, typeof Server> = {
  deploy: Server,
  rank: TrendingUp,
  understand: Users,
  quality: Gem,
}

/**
 * What I value, as quickhack cards: hack name + what it does, grounded in
 * the real principle copy from storySpine (no invented stats or RAM-cost
 * flavor text, the idea itself is the hook).
 */
export default function Quickhacks() {
  const reduced = useReducedMotion()
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setupGsap()
    if (reduced || !rootRef.current) return

    const ctx = gsap.context(() => {
      gsap.set('.hack-card', { opacity: 0, y: 24 })
      gsap.to('.hack-card', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.1,
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
    <section id="quickhacks" ref={rootRef} className="breach-section">
      <div className="breach-inner">
        <span className="breach-daemonTag">quickhacks --list</span>
        <h2 className="breach-h2">QUICKHACKS</h2>
        <p className="breach-lede">Four things I keep coming back to, whatever the project.</p>

        <div className={styles.grid}>
          {STORY.actThree.principles.map((p) => {
            const Icon = ICONS[p.id] ?? Gem
            return (
              <div className={`breach-panel breach-panel--sm ${styles.card} hack-card`} key={p.id}>
                <span className={styles.iconWrap}>
                  <Icon size={20} aria-hidden />
                </span>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.body}>{p.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
