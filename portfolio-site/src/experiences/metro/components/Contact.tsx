import { Download, Mail } from 'lucide-react'
import { STORY } from '../../shared/storySpine'
import styles from '../metro.module.css'

/**
 * Terminus two. Same nameplate treatment as the hero so the line reads as
 * a closed loop, with one clear, unambiguous contact intent (email) as the
 * primary action. The resume link stays a small secondary text link, since
 * the hero already owns the "resume" CTA intent and two competing resume
 * buttons on one page would be a duplicate-intent violation.
 */
export default function Contact() {
  const { email, availability, pitch } = STORY.contact
  return (
    <section id="contact" className={`${styles.stationSection} ${styles.terminusSection} ${styles.contact}`}>
      <div className={styles.wrap}>
        <div className={styles.stationHeader}>
          <span className={styles.codeChip}>06</span>
          <h2 className={styles.stationName}>End of line</h2>
        </div>
        <p className={styles.contactNameplate}>Let's talk.</p>
        <p className={styles.contactPitch}>{pitch.text}</p>
        <p className={styles.contactAvailability}>{availability.text}</p>
        <div className={styles.contactActions}>
          <a href={`mailto:${email}`} className={styles.btnPrimary}>
            Email me <Mail size={16} aria-hidden="true" />
          </a>
          <a href="/assets/Bilal_Umar_Resume_SWE.pdf" className={styles.linkInline} download>
            <Download size={14} aria-hidden="true" /> Resume (PDF)
          </a>
        </div>
        <p className={styles.contactFoot}>Night City Metro &middot; Line 1 &middot; {email}</p>
      </div>
    </section>
  )
}
