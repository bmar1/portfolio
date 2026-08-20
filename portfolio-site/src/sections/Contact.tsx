import { useState } from 'react'
import { Mail, BriefcaseBusiness, FolderGit2, ArrowUp, Check } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'
import StaggerText from '../components/StaggerText'
import { GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL } from '../constants/social'
import { getScrollBehavior } from '../utils/motion'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('bilalu4540@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: getScrollBehavior() })
  }

  return (
    <section id="contact" className="section relative overflow-hidden" style={{ paddingBottom: '2rem', paddingTop: '8rem' }}>
      {/* Full-bleed photo — magenta-graded to bookend the cyan hero */}
      <div className="photo-bed" aria-hidden>
        <img
          src="/assets/city.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          style={{ opacity: 0.45, filter: 'saturate(1.25) hue-rotate(-18deg)', objectPosition: 'center 65%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 50% 30%, rgba(255, 90, 200, 0.16) 0%, transparent 60%),
              linear-gradient(to bottom, var(--color-bg-base) 0%, rgba(8, 12, 16, 0.72) 40%, var(--color-bg-base) 92%)
            `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'var(--scanline-bg)', opacity: 0.4, mixBlendMode: 'overlay' }}
        />
      </div>

      <div className="container relative z-10">
        {/* CTA block */}
        <div className="text-center max-w-2xl mx-auto">
          <SectionReveal>
            <span
              className="text-mono block mb-4"
              style={{
                color: 'var(--color-neon-cyan)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontSize: '0.72rem',
              }}
            >
              <span style={{ color: 'var(--color-text-muted)' }}>[</span>
              {' '}UPLINK{' '}
              <span style={{ color: 'var(--color-neon-magenta)' }}>// 06</span>
              {' '}
              <span style={{ color: 'var(--color-text-muted)' }}>]</span>
            </span>
            <StaggerText
              text="Let's build something."
              className="text-h1"
              tag="h2"
              delayBetween={60}
            />
          </SectionReveal>

          <SectionReveal delay={200}>
            <p
              className="text-body mt-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Looking for a Winter '27 internship — or just say hi.
            </p>
          </SectionReveal>

          {/* Links */}
          <SectionReveal delay={350}>
            <div className="flex flex-wrap justify-center gap-6 mt-10">
              <button
                onClick={copyEmail}
                className="contact-link link-reveal text-sm transition-colors duration-150"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {copied ? <Check size={16} style={{ color: 'var(--color-accent-cyan)' }} /> : <Mail size={16} />}
                {copied ? 'Copied!' : 'bilalu4540@gmail.com'}
              </button>
              <a
                href={LINKEDIN_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link link-reveal text-sm cursor-pointer"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <BriefcaseBusiness size={16} />
                LinkedIn
              </a>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link link-reveal text-sm cursor-pointer"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <FolderGit2 size={16} />
                GitHub
              </a>
            </div>
          </SectionReveal>
        </div>

        {/* Footer strip */}
        <SectionReveal delay={500}>
          <div
            className="mt-24 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <span
              className="text-mono text-xs"
              style={{
                color: 'var(--color-text-muted)',
                letterSpacing: '0.08em',
              }}
            >
              <span style={{ color: 'var(--color-neon-magenta)' }}>[</span>
              {' '}END_OF_LINE{' '}
              <span style={{ color: 'var(--color-neon-magenta)' }}>]</span>
              {' '}· © 2026 Bilal Umar · React + Vite
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="back-to-top flex items-center gap-1 text-xs"
              style={{
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              <ArrowUp size={14} />
              Back to top
            </button>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
