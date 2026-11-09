import { ArrowRight, Download } from 'lucide-react'
import ShaderStage from '../../shared/ShaderStage'
import { STORY, RECRUITER_SUMMARY } from '../../shared/storySpine'
import { getActiveLenis } from '../../shared/useLenis'
import ScrambleText from '../components/ScrambleText'
import styles from './Hero.module.css'

function scrollToRecordings() {
  const el = document.getElementById('recordings')
  if (!el) return
  const lenis = getActiveLenis()
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Boot / playback head. Full-bleed rain-on-glass shader behind the name,
 * which decodes from static on load (ScrambleText). The timecode chip is
 * this page's one deliberate "eyebrow"-shaped element, used nowhere else,
 * so the mechanical eyebrow-count stays well under budget.
 */
export default function Hero() {
  return (
    <section className={styles.hero}>
      <ShaderStage
        variant="rain"
        colorA={[0.03, 0.03, 0.035]}
        colorB={[0.1, 0.42, 0.24]}
        className={styles.shader}
      />
      <div className={styles.scrim} aria-hidden />
      <div className={styles.inner}>
        <p className={styles.timecode}>
          REC <span>00:00:00</span> playback head active
        </p>
        <h1 className={styles.name}>
          <ScrambleText text={STORY.identity.name} className={styles.nameText} />
        </h1>
        <p className={styles.status}>{STORY.identity.status}</p>
        <p className={styles.subtext}>
          Recovered footage of a backend developer learning distributed systems, one shipped project at a
          time.
        </p>
        <div className={styles.ctas}>
          <button type="button" className={styles.primaryCta} onClick={scrollToRecordings}>
            View the recording
            <ArrowRight size={16} aria-hidden="true" />
          </button>
          <a className={styles.secondaryCta} href={RECRUITER_SUMMARY.resumeHref} download>
            <Download size={16} aria-hidden="true" />
            Download resume
          </a>
        </div>
      </div>
    </section>
  )
}
