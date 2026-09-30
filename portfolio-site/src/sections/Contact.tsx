import { useState } from 'react'
import { ArrowUp, ArrowUpRight, Check, Copy, Download } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import {
  GITHUB_PROFILE_URL,
  GITHUB_USERNAME,
  LINKEDIN_PROFILE_URL,
  LINKEDIN_USERNAME,
} from '../constants/social'
import { CONTACT, PROFILE } from '../content/profile'
import { getScrollBehavior } from '../utils/motion'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked: the address stays visible and has a mailto link.
    }
  }

  return (
    <section
      id="contact"
      className="section reading-section contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="photo-bed" aria-hidden>
        <img
          src="/assets/nightcity.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          style={{ opacity: 0.55, filter: 'saturate(1.25) brightness(0.8)' }}
        />
        <div className="contact-wash" />
      </div>

      <div className="container relative z-10">
        <SectionHeading id="contact-heading" text="Let's talk" />

        <div className="cp-card cp-scan contact-card">
          <div className="holocall">
            <span className="holocall__label">
              <span className="led led-online" aria-hidden /> Incoming holocall
            </span>
            <div className="holocall__frame" aria-hidden>
              <img src={PROFILE.photo} alt="" width={200} height={200} />
            </div>
            <p className="holocall__name">{PROFILE.name}</p>
            <p className="holocall__status">{PROFILE.status}</p>
            <p className="holocall__avail">{CONTACT.availability.text}</p>
          </div>

          <div className="contact-body">
            <p className="contact-pitch">{CONTACT.pitch.text}</p>

            <ul className="contact-lines">
              <li>
                <span className="contact-lines__label">Email</span>
                <a href={`mailto:${CONTACT.email}`} className="contact-lines__value">
                  {CONTACT.email}
                </a>
                <button type="button" onClick={copy} className="contact-lines__action">
                  {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </li>
              <li>
                <span className="contact-lines__label">LinkedIn</span>
                <a
                  href={LINKEDIN_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-lines__value"
                >
                  in/{LINKEDIN_USERNAME}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <ArrowUpRight size={16} className="contact-lines__icon" aria-hidden />
              </li>
              <li>
                <span className="contact-lines__label">GitHub</span>
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-lines__value"
                >
                  @{GITHUB_USERNAME}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <ArrowUpRight size={16} className="contact-lines__icon" aria-hidden />
              </li>
              <li>
                <span className="contact-lines__label">Resume</span>
                <a
                  href="/assets/Bilal_Umar_Resume_SWE.pdf"
                  download="Bilal_Umar_SWE_Resume.pdf"
                  className="contact-lines__value"
                >
                  Bilal_Umar_SWE_Resume.pdf
                </a>
                <Download size={16} className="contact-lines__icon" aria-hidden />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="eol-strip relative z-10">
        <span className="t-mono">
          <span style={{ color: 'var(--color-nc-magenta)' }}>[</span>
          {' END_OF_LINE '}
          <span style={{ color: 'var(--color-nc-magenta)' }}>]</span>
          {' · © 2026 Bilal Umar · React + Vite'}
        </span>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: getScrollBehavior() })}
          className="t-label flex items-center gap-1.5"
        >
          <ArrowUp size={14} aria-hidden /> Back to top
        </button>
      </div>
    </section>
  )
}
