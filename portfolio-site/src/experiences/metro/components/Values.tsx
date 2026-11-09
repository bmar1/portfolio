import { CheckCircle2, ListOrdered, ServerCog, Users } from 'lucide-react'
import { STORY } from '../../shared/storySpine'
import styles from '../metro.module.css'

const ICONS: Record<string, typeof ServerCog> = {
  deploy: ServerCog,
  rank: ListOrdered,
  understand: Users,
  quality: CheckCircle2,
}

/**
 * What I value: four principles posted like platform service announcements,
 * each with the icon doing real labeling work (not decoration), in a 2x2
 * grid that collapses to one column on mobile.
 */
export default function Values() {
  return (
    <section id="value" className={styles.stationSection}>
      <div className={styles.wrap}>
        <div className={styles.stationHeader}>
          <span className={styles.codeChip}>05</span>
          <h2 className={styles.stationName}>What I value</h2>
        </div>
        <div className={styles.valueGrid}>
          {STORY.actThree.principles.map((principle) => {
            const Icon = ICONS[principle.id] ?? CheckCircle2
            return (
              <div className={styles.valueCard} key={principle.id}>
                <p className={styles.valueAnnounce}>Service announcement</p>
                <div className={styles.valueHead}>
                  <Icon size={18} color="var(--nm-red, #c5003c)" aria-hidden="true" />
                  <h3 className={styles.valueTitle}>{principle.title}</h3>
                </div>
                <p className={styles.valueBody}>{principle.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
