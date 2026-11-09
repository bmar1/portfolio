import { ArrowRight, Download } from 'lucide-react'
import ShaderStage from '../../shared/ShaderStage'
import { RECRUITER_SUMMARY, STORY } from '../../shared/storySpine'
import styles from '../metro.module.css'

/**
 * Terminus one. The station nameplate doubles as the page's H1. The grid
 * shader reads as a transit-map / HUD grid behind the signage, tinted red
 * to black with a cyan sweep line, the only two accent colors this
 * direction allows. The persistent line nav (mounted at the App root)
 * already shows every station ahead, so the hero itself stays to the
 * required four text elements: eyebrow, nameplate, status line, actions.
 */
export default function Hero() {
  return (
    <section id="hero" className={`${styles.stationSection} ${styles.terminusSection} ${styles.hero}`}>
      <ShaderStage
        variant="grid"
        colorA={[0.04, 0.01, 0.02]}
        colorB={[0.1, 0.85, 0.93]}
        speed={0.6}
        className={styles.heroShader}
      />
      <div className={styles.heroScrim} aria-hidden="true" />
      <div className={`${styles.wrap} ${styles.heroContent}`}>
        <p className={styles.heroEyebrow}>
          <strong>NCART</strong> Night City Transit &middot; Line 1
        </p>
        <h1 className={styles.heroNameplate}>{STORY.identity.name}</h1>
        <p className={styles.heroStatus}>{STORY.identity.status}</p>
        <div className={styles.heroActions}>
          <a href="#cargo" className={styles.btnPrimary}>
            View the work <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a href={RECRUITER_SUMMARY.resumeHref} className={styles.btnGhost} download>
            Resume <Download size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
