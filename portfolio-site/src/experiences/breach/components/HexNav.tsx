import { useEffect, useState } from 'react'
import { Grid3x3, X } from 'lucide-react'
import { SECTIONS, jumpTo } from '../data/sections'
import { getActiveLenis } from '../../shared/useLenis'
import styles from './HexNav.module.css'

/**
 * The breach-protocol hex-grid, as a persistent corner widget instead of a
 * conventional nav bar. Picking a hex pair "writes it to the buffer" (jumps
 * to that daemon). Doubles as the mobile nav: the same panel becomes a
 * bottom sheet under 768px (see HexNav.module.css).
 */
export default function HexNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key.toLowerCase() === 'b') setOpen((v) => !v)
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const select = (id: string) => {
    setOpen(false)
    window.setTimeout(() => jumpTo(id, getActiveLenis), 40)
  }

  return (
    <>
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <Grid3x3 size={15} aria-hidden />
        BREACH.NAV
        <span className={styles.toggleKey}>B</span>
      </button>

      {open && (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Breach protocol navigation">
          <div className={styles.panel}>
            <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close">
              <X size={16} />
            </button>
            <h2 className={styles.heading}>SELECT BUFFER TARGET</h2>
            <p className={styles.sub}>Pick a hex pair to jump the cursor to that daemon.</p>
            <div className={styles.grid}>
              {SECTIONS.map((s) => (
                <button key={s.id} type="button" className={styles.cell} onClick={() => select(s.id)}>
                  <span className={styles.cellHex}>{s.hex}</span>
                  <span className={styles.cellLabel}>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
