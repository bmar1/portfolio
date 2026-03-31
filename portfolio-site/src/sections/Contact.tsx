import { useState } from 'react'
import { Mail, BriefcaseBusiness, FolderGit2, ArrowUp, Check } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'
import StaggerText from '../components/StaggerText'
import { getScrollBehavior } from '../utils/motion'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('bumar@myseneca.ca')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: getScrollBehavior() })
  }

  return (
    <section id="contact" className="section" style={{ paddingBottom: '2rem' }}>
      <div className="container">
        {/* CTA block */}
        <div className="text-center max-w-2xl mx-auto">
          <SectionReveal>
            <StaggerText
              text="Let's build something."
              className="text-h2"
              tag="h2"
              delayBetween={60}
            />
          </SectionReveal>

          <SectionReveal delay={200}>
            <p
              className="text-body mt-6"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Open to internships, contracts, and conversations worth having.
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
                {copied ? 'Copied!' : 'bumar@myseneca.ca'}
              </button>
              <a
                href="https://linkedin.com/in/bmar1"
                target="_blank"
                rel="noopener"
                className="contact-link link-reveal text-sm"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                <BriefcaseBusiness size={16} />
                LinkedIn
              </a>
              <a
                href="https://github.com/bmar1"
                target="_blank"
                rel="noopener"
                className="contact-link link-reveal text-sm"
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
            <span className="text-mono text-xs" style={{ color: 'var(--color-text-muted)' }}>
              © 2026 Bilal Umar · Built with React + Vite
            </span>
            <button
              onClick={scrollToTop}
              className="back-to-top flex items-center gap-1 text-xs"
              style={{
                color: 'var(--color-text-muted)',
                fontFamily: 'var(--font-mono)',
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
