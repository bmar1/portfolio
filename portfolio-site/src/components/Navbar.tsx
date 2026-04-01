import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Off-Grid', href: '#offgrid' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [pastHero, setPastHero] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection('#' + entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-100px 0px -40% 0px' }
    )

    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Desktop pill — visible after leaving hero (PRD §6) */}
      <nav
        inert={!pastHero}
        style={{
          opacity: pastHero ? 1 : 0,
          transform: pastHero ? 'translateY(0)' : 'translateY(-8px)',
          transition:
            'opacity 200ms ease, transform 200ms cubic-bezier(0.23, 1, 0.32, 1)',
          pointerEvents: pastHero ? 'auto' : 'none',
        }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-2 px-3 py-2 rounded-full border border-[var(--color-border)] backdrop-blur-xl shadow-lg"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="absolute inset-0 rounded-full bg-[var(--color-bg-surface)]" style={{ opacity: 0.85, zIndex: -1 }} />
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="px-4 py-1.5 text-sm font-semibold transition-colors hover:text-white cursor-pointer"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-accent-cyan)' }}
        >
          bumar
        </a>
        <span style={{ color: 'var(--color-text-muted)' }}>·</span>
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
              className={`px-4 py-1.5 text-sm rounded-full transition-all duration-200 cursor-pointer ${isActive ? 'bg-white/5' : 'hover:bg-white/5 hover:text-white'}`}
              style={{
                color: isActive ? 'var(--color-accent-cyan)' : 'var(--color-text-secondary)',
                fontFamily: 'var(--font-body)',
                textShadow: isActive ? '0 0 12px rgba(57, 208, 216, 0.3)' : 'none',
              }}
            >
              {link.label}
            </a>
          );
        })}
      </nav>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-5 right-5 z-50 md:hidden p-3 rounded-full border border-[var(--color-border)] backdrop-blur-xl"
        style={{
          background: 'rgba(13, 17, 23, 0.8)',
          opacity: pastHero ? 1 : 0,
          transition: 'opacity 200ms ease',
          pointerEvents: pastHero ? 'auto' : 'none',
        }}
        aria-label="Open menu"
      >
        <Menu size={20} color="var(--color-text-primary)" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
          style={{ background: 'rgba(8, 12, 16, 0.97)' }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-5 p-3"
            aria-label="Close menu"
          >
            <X size={24} color="var(--color-text-primary)" />
          </button>
          <nav className="flex flex-col items-center gap-6">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
                className="text-2xl font-medium"
                style={{
                  fontFamily: 'var(--font-heading)',
                  color: 'var(--color-text-primary)',
                  opacity: 1,
                  animation: `fadeSlideIn 300ms cubic-bezier(0.23, 1, 0.32, 1) ${i * 50}ms both`,
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <style>{`
            @keyframes fadeSlideIn {
              from {
                opacity: 0;
                transform: translateY(16px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      )}
    </>
  )
}
