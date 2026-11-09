import { Download, Mail } from 'lucide-react'
import { STORY, RECRUITER_SUMMARY } from '../../shared/storySpine'
import { cleanDash } from '../lib/cleanDash'
import styles from './EndOfPlayback.module.css'

/**
 * End of playback. No scrubbing, no pin, nothing to scroll-hijack here on
 * purpose: this is the one moment on the page that must work the instant
 * someone lands on it, so it is plain static flow.
 */
export default function EndOfPlayback() {
  const contact = STORY.contact

  return (
    <section className={styles.section} id="contact">
      <div className="bd-container">
        <p className={styles.timecode}>End of recording</p>
        <h2 className={styles.heading}>Recording is done. Inbox is open.</h2>
        <p className={styles.availability}>{cleanDash(contact.availability.text)}</p>
        <p className={styles.pitch}>{cleanDash(contact.pitch.text)}</p>

        <div className={styles.actions}>
          <a className={`${styles.btn} ${styles.btnPrimary}`} href={`mailto:${contact.email}`}>
            <Mail size={16} aria-hidden="true" />
            {contact.email}
          </a>
          <a className={`${styles.btn} ${styles.btnSecondary}`} href={RECRUITER_SUMMARY.resumeHref} download>
            <Download size={16} aria-hidden="true" />
            Download resume
          </a>
        </div>

        <p className={styles.footerNote}>bmar1, braindance recording, Toronto, ON.</p>
      </div>
    </section>
  )
}
