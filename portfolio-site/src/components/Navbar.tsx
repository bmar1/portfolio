import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#skills' },
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
      {/* Desktop HUD slab — N7 brutal-slab + N8 terminal-command hybrid */}
      <nav
        inert={!pastHero}
        style={{
          opacity: pastHero ? 1 : 0,
          transform: pastHero ? 'translateY(0)' : 'translateY(-8px)',
          transition:
            'opacity 200ms ease, transform 200ms cubic-bezier(0.23, 1, 0.32, 1)',
          pointerEvents: pastHero ? 'auto' : 'none',
          clipPath: 'var(--clip-corner)',
          background: 'rgba(8, 12, 16, 0.78)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow:
            'inset 0 0 0 1px var(--color-neon-cyan), 0 0 24px var(--color-glow-cyan-soft)',
        }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-3 py-2"
        role="navigation"
        aria-label="Main navigation"
      >
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="px-3 py-1.5 text-sm font-semibold cursor-pointer flex items-center gap-1"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-neon-cyan)',
            letterSpacing: '0.04em',
          }}
        >
          <span style={{ color: 'var(--color-neon-magenta)' }}>&gt;</span>
          bumar
          <span
            className="cursor-blink"
            style={{
              display: 'inline-block',
              width: '7px',
              height: '14px',
              background: 'var(--color-neon-cyan)',
              marginLeft: '2px',
            }}
            aria-hidden
          />
        </a>
        <span style={{ color: 'var(--color-text-muted)', margin: '0 0.25rem' }}>|</span>
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
              className="px-3 py-1.5 text-sm transition-colors duration-200 cursor-pointer flex items-center gap-1"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--color-neon-cyan)' : 'var(--color-text-secondary)',
                textShadow: isActive ? '0 0 10px var(--color-glow-cyan)' : 'none',
              }}
            >
              <span
                style={{
                  color: isActive ? 'var(--color-neon-magenta)' : 'var(--color-text-muted)',
                  transition: 'color 200ms ease',
                }}
              >
                [
              </span>
              {link.label}
              <span
                style={{
                  color: isActive ? 'var(--color-neon-magenta)' : 'var(--color-text-muted)',
                  transition: 'color 200ms ease',
                }}
              >
                ]
              </span>
            </a>
          )
        })}
      </nav>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-5 right-5 z-50 md:hidden p-3"
        style={{
          background: 'rgba(8, 12, 16, 0.85)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          clipPath: 'var(--clip-corner-sm)',
          boxShadow: 'inset 0 0 0 1px var(--color-neon-cyan)',
          opacity: pastHero ? 1 : 0,
          transition: 'opacity 200ms ease',
          pointerEvents: pastHero ? 'auto' : 'none',
        }}
        aria-label="Open menu"
      >
        <Menu size={20} color="var(--color-neon-cyan)" />
      </button>

      {/* Mobile terminal overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center scanlines"
          style={{ background: 'rgba(8, 12, 16, 0.97)' }}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-5 p-3"
            style={{
              clipPath: 'var(--clip-corner-sm)',
              boxShadow: 'inset 0 0 0 1px var(--color-neon-magenta)',
              background: 'rgba(8, 12, 16, 0.85)',
            }}
            aria-label="Close menu"
          >
            <X size={24} color="var(--color-neon-magenta)" />
          </button>

          <div
            className="text-mono mb-8"
            style={{
              color: 'var(--color-neon-cyan)',
              letterSpacing: '0.18em',
              fontSize: '0.7rem',
              textTransform: 'uppercase',
            }}
          >
            &gt; nav.exec --routes
          </div>

          <nav className="flex flex-col items-center gap-5 relative z-10">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleClick(link.href) }}
                className="text-2xl font-medium flex items-center gap-3"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '0.04em',
                  animation: `mobileNavIn 320ms cubic-bezier(0.23, 1, 0.32, 1) ${i * 60}ms both`,
                }}
              >
                <span style={{ color: 'var(--color-neon-magenta)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{ color: 'var(--color-text-muted)' }}>[</span>
                {link.label}
                <span style={{ color: 'var(--color-text-muted)' }}>]</span>
              </a>
            ))}
          </nav>

          <style>{`
            @keyframes mobileNavIn {
              from {
                opacity: 0;
                transform: translateY(16px);
                filter: blur(4px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
                filter: blur(0);
              }
            }
          `}</style>
        </div>
      )}
    </>
  )
}
