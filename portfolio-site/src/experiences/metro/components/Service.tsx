import type { Role } from '../../../content/experience'
import { STORY } from '../../shared/storySpine'
import styles from '../metro.module.css'
import SplitFlap from './SplitFlap'
import { useInView } from '../hooks/useInView'

function statusFor(role: Role): { label: string; cls: string } {
  if (role.id === 'infotech') return { label: 'INCOMING', cls: styles.statusUpcoming }
  if (role.active) return { label: 'BOARDING NOW', cls: styles.statusActive }
  return { label: 'DEPARTED', cls: styles.statusDone }
}

function BoardRow({ role, index }: { role: Role; index: number }) {
  const [ref, inView] = useInView<HTMLDivElement>()
  const status = statusFor(role)

  return (
    <div ref={ref} className={styles.boardRow}>
      <span className={`${styles.statusChip} ${status.cls}`}>
        <span className={styles.statusDot} aria-hidden="true" />
        <SplitFlap text={status.label} active={inView} delay={index * 90} />
      </span>

      <div className={styles.boardRole}>
        <span className={styles.boardOrg}>{role.org}</span>
        <span className={styles.boardTitle}>{role.title}</span>
        <p className={styles.boardSummary}>{role.summary}</p>
        {role.tech.length > 0 && (
          <div className={styles.boardTech}>
            {role.tech.map((t) => (
              <span key={t} className={styles.techChip}>
                {t}
              </span>
            ))}
          </div>
        )}
        {role.outcomes.length > 0 && (
          <div className={styles.boardOutcomes}>
            {role.outcomes.map((o) => (
              <span key={o.label} className={styles.boardOutcome}>
                <span className={styles.boardOutcomeValue}>{o.value}</span>
                <span className={styles.boardOutcomeLabel}>{o.label}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      <span className={styles.boardRoute}>{role.team ?? role.org}</span>

      <span className={styles.boardDates}>
        <SplitFlap text={role.dates} active={inView} delay={index * 90 + 60} />
      </span>
    </div>
  )
}

/**
 * Current Service: a literal departures board. Roles are already ordered
 * newest-to-oldest in src/content/experience.ts, which maps cleanly onto
 * the transit metaphor: Infotech (Winter 2027) hasn't departed yet, OPS is
 * the train currently boarding, the rest already left the platform. The
 * status and date columns split-flap into place the first time the row
 * scrolls into view. Below 760px the grid collapses to a stacked card per
 * role (see .boardRow media query in metro.module.css).
 */
export default function Service() {
  return (
    <section id="service" className={styles.stationSection}>
      <div className={styles.wrap}>
        <div className={styles.stationHeader}>
          <span className={styles.codeChip}>02</span>
          <h2 className={styles.stationName}>Current service</h2>
        </div>
        <div className={styles.board}>
          <div className={`${styles.boardHead} ${styles.stripes}`}>
            <span>Status</span>
            <span>Service</span>
            <span>Route</span>
            <span>Departs</span>
          </div>
          {STORY.actTwo.roles.map((role, index) => (
            <BoardRow key={role.id} role={role} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
