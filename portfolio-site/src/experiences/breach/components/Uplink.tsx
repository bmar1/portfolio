import { Mail, Download, ArrowLeft } from 'lucide-react'
import { STORY, RECRUITER_SUMMARY } from '../../shared/storySpine'
import styles from './Uplink.module.css'

/**
 * Closing the breach-protocol metaphor: opening a connection instead of a
 * generic contact form. No scroll choreography, immediately actionable.
 */
export default function Uplink() {
  const { contact } = STORY

  return (
    <section id="uplink" className="breach-section">
      <div className="breach-inner">
        <span className="breach-daemonTag">uplink --open</span>
        <h2 className="breach-h2">UPLINK</h2>
        <p className="breach-lede">Open a connection. No breach protocol required this time.</p>

        <div className="breach-panel">
          <div className={styles.panel}>
            <span className={styles.statusLine}>
              <span className={styles.statusDot} aria-hidden /> Connection open
            </span>
            <p className={styles.pitch}>{contact.pitch.text}</p>
            <div className={styles.row}>
              <a className="breach-btn breach-btn--primary" href={`mailto:${contact.email}`}>
                <Mail size={16} aria-hidden /> {contact.email}
              </a>
              <a className="breach-btn breach-btn--ghost" href={RECRUITER_SUMMARY.resumeHref} download>
                <Download size={16} aria-hidden /> Resume
              </a>
            </div>
            <p className={styles.availability}>{contact.availability.text}</p>
          </div>
        </div>

        <a className={styles.back} href="/lab">
          <ArrowLeft size={14} aria-hidden /> Back to the lab index
        </a>
      </div>
    </section>
  )
}
