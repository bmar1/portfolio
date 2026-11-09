import { STORY } from '../../shared/storySpine'
import styles from '../metro.module.css'

/**
 * Station platform placard: one panel, one confident voice, styled like the
 * laminated signage bolted to a real platform wall (top red bar, corner
 * bolts) rather than three disconnected paragraphs.
 */
export default function WhoIAm() {
  return (
    <section id="who" className={styles.stationSection}>
      <div className={styles.wrap}>
        <div className={styles.stationHeader}>
          <span className={styles.codeChip}>01</span>
          <h2 className={styles.stationName}>Who I am</h2>
        </div>
        <div className={styles.placard}>
          <span className={styles.placardTopBar} aria-hidden="true" />
          <span className={styles.placardBolts} aria-hidden="true">
            <span className={styles.placardBolt} />
            <span className={styles.placardBolt} />
          </span>
          <p className={styles.placardLede}>{STORY.actOne.headline}</p>
          <p className={styles.placardBody}>{STORY.actOne.body}</p>
        </div>
      </div>
    </section>
  )
}
