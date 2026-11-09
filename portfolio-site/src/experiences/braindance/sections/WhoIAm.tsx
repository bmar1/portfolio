import { STORY } from '../../shared/storySpine'
import { useInView } from '../lib/useInView'
import styles from './WhoIAm.module.css'

/**
 * Who I am. One confident statement, one body paragraph, no columns, no
 * stat dump. The only motion here is a single fade-up on first view
 * (IntersectionObserver, not GSAP), because this section does not need a
 * pin, it needs to read in one breath.
 */
export default function WhoIAm() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className={styles.section}>
      <div className="bd-container">
        <div ref={ref} className={`${styles.inner} ${inView ? styles.inView : ''}`}>
          <p className={styles.statement}>{STORY.actOne.headline}</p>
          <p className={styles.body}>{STORY.actOne.body}</p>
        </div>
      </div>
    </section>
  )
}
