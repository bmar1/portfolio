import { useState } from 'react'
import { ArrowUp, BriefcaseBusiness, Check, FolderGit2, Mail } from 'lucide-react'
import { GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL } from '../constants/social'
import { getScrollBehavior } from '../utils/motion'

const EMAIL = 'bilalu4540@gmail.com'

/**
 * Layout family: centered bookend. The only centered section on the page,
 * which is what makes it read as an ending rather than another block.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked (insecure context, denied permission): the address
      // is visible on screen, so there is nothing to recover from.
    }
  }

  return (
    <section
      id="contact"
      className="section scanlines relative"
      style={{ paddingTop: '9rem', paddingBottom: 0 }}
    >
      <div className="photo-bed" aria-hidden>
        <img
          src="/assets/nightcity.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          style={{ opacity: 0.4, filter: 'saturate(1.2) brightness(0.7)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 35%, rgba(252,238,10,0.10) 0%, transparent 62%), linear-gradient(to bottom, var(--color-nc-void) 0%, rgba(5,5,8,0.72) 42%, var(--color-nc-void) 94%)',
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          {/* Eyebrow 3 of 3 */}
          <p
            className="t-mono mb-4"
            style={{ color: 'var(--color-nc-cyan)', letterSpacing: '0.22em' }}
          >
            ▷ UPLINK
          </p>

          <h2
            className="t-hero balance mx-auto max-w-[14ch]"
            style={{
              color: 'var(--color-nc-text)',
              fontSize: 'clamp(2.2rem, 6vw, 4rem)',
            }}
          >
            Got something{' '}
            <span style={{ color: 'var(--color-nc-yellow)' }}>boring</span> that
            needs fixing?
          </h2>

          <p
            className="balance mx-auto mt-7 max-w-[34ch]"
            style={{ color: 'var(--color-nc-text-muted)', fontSize: '1.05rem' }}
          >
            Looking for a Winter &apos;27 internship. Or just say hi.
          </p>

          {/* Short, fixed-width CTA. The address renders below in mono so it is
              never uppercased or letter-spaced, and the button does not resize
              when the label swaps to "Copied". */}
          <div className="mt-10 flex flex-col items-center gap-3">
            <button
              type="button"
              onClick={copy}
              className="btn btn-primary justify-center"
              style={{ minWidth: '13rem' }}
            >
              {copied ? (
                <>
                  <Check size={16} aria-hidden /> Copied
                </>
              ) : (
                <>
                  <Mail size={16} aria-hidden /> Copy email
                </>
              )}
            </button>
            <a
              href={`mailto:${EMAIL}`}
              className="t-mono transition-colors duration-150"
              style={{ color: 'var(--color-nc-text-dim)' }}
            >
              {EMAIL}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="t-label flex items-center gap-2 transition-colors duration-150"
              style={{ color: 'var(--color-nc-text-muted)' }}
            >
              <BriefcaseBusiness size={15} aria-hidden /> LinkedIn
            </a>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="t-label flex items-center gap-2 transition-colors duration-150"
              style={{ color: 'var(--color-nc-text-muted)' }}
            >
              <FolderGit2 size={15} aria-hidden /> GitHub
            </a>
          </div>
        </div>
      </div>

      {/* Full-bleed strip. Hairline meets the sector rail on desktop. */}
      <div
        className="eol-strip relative z-10 mt-24 flex flex-col items-start justify-between gap-3 px-6 py-4 sm:flex-row sm:items-center"
        style={{
          borderTop: '1px solid var(--color-nc-border)',
          background: 'rgba(5,5,8,0.78)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <span className="t-mono" style={{ color: 'var(--color-nc-text-dim)' }}>
          <span style={{ color: 'var(--color-nc-magenta)' }}>[</span>
          {' END_OF_LINE '}
          <span style={{ color: 'var(--color-nc-magenta)' }}>]</span>
          {' · © 2026 Bilal Umar · React + Vite'}
        </span>
        <button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: getScrollBehavior() })
          }
          className="t-label flex items-center gap-1.5"
          style={{ color: 'var(--color-nc-text-dim)' }}
        >
          <ArrowUp size={14} aria-hidden /> Back to top
        </button>
      </div>
    </section>
  )
}
