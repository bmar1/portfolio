import { useMemo, useState } from 'react'
import { List, X } from 'lucide-react'
import styles from '../metro.module.css'
import { STATIONS } from '../data/stations'
import { useActiveStation } from '../hooks/useActiveStation'

/**
 * The navigation IS the map: a persistent vertical line diagram (desktop
 * rail, left-fixed) where each station is a stop. The current stop lights
 * up red as the user scrolls past it; stops already passed dim to a solid
 * red fill; stops ahead stay hollow cyan outlines, naming what's coming.
 *
 * Under 900px this collapses to an explicit mobile form: a thin progress
 * rail pinned to the bottom with the current station name, plus a button
 * that opens a full station list as a bottom sheet.
 */
export default function Nav() {
  const ids = useMemo(() => STATIONS.map((s) => s.id), [])
  const active = useActiveStation(ids)
  const [sheetOpen, setSheetOpen] = useState(false)

  const activeIndex = STATIONS.findIndex((s) => s.id === active)
  const progress = STATIONS.length > 1 ? (activeIndex / (STATIONS.length - 1)) * 100 : 0
  const activeStation = STATIONS[activeIndex] ?? STATIONS[0]

  function stateFor(index: number) {
    if (index < activeIndex) return 'isPast'
    if (index === activeIndex) return 'isActive'
    return 'isUpcoming'
  }

  return (
    <>
      <nav className={styles.nav} aria-label="Line 1 station map">
        <div className={styles.navHead}>
          <p className={styles.navHeadLine}>NCART &middot; Line 1</p>
          <p className={styles.navHeadName}>Night City Metro</p>
        </div>
        <ul className={styles.navList}>
          <span className={styles.navRail} aria-hidden="true" />
          {STATIONS.map((station, index) => (
            <li key={station.id} className={styles.navItem}>
              <a href={`#${station.id}`} className={`${styles.navLink} ${styles[stateFor(index)]}`}>
                <span className={styles.navDot} aria-hidden="true" />
                <span>
                  {station.code} {station.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.navFoot}>
          <p className={styles.navFootText}>Press R for recruiter mode</p>
        </div>
      </nav>

      <div className={styles.mobileRail}>
        <div className={styles.mobileRailBar}>
          <p className={styles.mobileRailLabel}>
            {activeStation.code} <strong>{activeStation.name}</strong>
          </p>
          <div className={styles.mobileRailProgress} aria-hidden="true">
            <span className={styles.mobileRailProgressFill} style={{ width: `${progress}%` }} />
          </div>
          <button
            type="button"
            className={styles.mobileRailToggle}
            onClick={() => setSheetOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={sheetOpen}
            aria-label="Open station list"
          >
            <List size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {sheetOpen && (
        <div
          className={styles.mobileSheet}
          role="dialog"
          aria-modal="true"
          aria-label="Line 1 station list"
          onClick={() => setSheetOpen(false)}
        >
          <div className={styles.mobileSheetPanel} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileSheetHead}>
              <p className={styles.mobileSheetTitle}>Line 1 &middot; All stations</p>
              <button
                type="button"
                className={styles.mobileSheetClose}
                onClick={() => setSheetOpen(false)}
                aria-label="Close station list"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <ul className={styles.mobileSheetList}>
              {STATIONS.map((station, index) => (
                <li key={station.id}>
                  <a
                    href={`#${station.id}`}
                    className={`${styles.mobileSheetLink} ${index === activeIndex ? styles.isActive : ''}`}
                    onClick={() => setSheetOpen(false)}
                  >
                    <span className={styles.navDot} aria-hidden="true" />
                    {station.code} {station.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
