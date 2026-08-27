import { useEffect, useRef, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { SECTORS } from '../constants/sectors'
import { jumpTo, resolveSector } from '../utils/commands'

export default function SectorRail() {
  const [active, setActive] = useState(SECTORS[0].target)
  const [entry, setEntry] = useState('')
  const [error, setError] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { scrollYProgress } = useScroll()

  // Active sector: same IntersectionObserver approach the old Navbar used.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.25, rootMargin: '-80px 0px -45% 0px' },
    )
    SECTORS.forEach((s) => {
      const el = document.getElementById(s.target)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // "/" focuses the prompt from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === '/') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const sector = resolveSector(entry)
    if (sector) {
      jumpTo(sector)
      setEntry('')
      setError(false)
      inputRef.current?.blur()
    } else {
      setError(true)
      window.setTimeout(() => setError(false), 1200)
    }
  }

  return (
    <>
      {/* ---------- Desktop: fixed left rail ---------- */}
      <nav
        aria-label="Sectors"
        className="fixed inset-y-0 left-0 z-50 hidden flex-col justify-center md:flex"
        style={{
          width: 'var(--rail-w)',
          background: 'rgba(5,5,8,0.82)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: 'inset -1px 0 0 var(--color-nc-border)',
        }}
      >
        {/* Scroll spine */}
        <div
          className="absolute left-0 top-0 w-px"
          style={{ height: '100%', background: 'var(--color-nc-border)' }}
          aria-hidden
        >
          <motion.div
            className="w-full origin-top"
            style={{
              height: '100%',
              background: 'var(--color-nc-yellow)',
              boxShadow: '0 0 8px var(--color-nc-yellow)',
              scaleY: scrollYProgress,
            }}
          />
        </div>

        <ul className="flex flex-col gap-1">
          {SECTORS.map((s) => {
            const on = active === s.target
            return (
              <li key={s.target} className="group relative">
                <a
                  href={`#${s.target}`}
                  aria-current={on ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    jumpTo(s)
                  }}
                  className="t-data flex h-11 items-center justify-center transition-colors duration-150"
                  style={{
                    fontSize: '0.72rem',
                    color: on
                      ? 'var(--color-nc-void)'
                      : 'var(--color-nc-text-dim)',
                    background: on ? 'var(--color-nc-yellow)' : 'transparent',
                    boxShadow: on
                      ? '0 0 16px rgba(252,238,10,0.45)'
                      : undefined,
                  }}
                >
                  {s.id}
                </a>

                {/* Label flies out on hover/focus so the rail stays 76px */}
                <span
                  className="t-label pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap px-2 py-1 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
                  style={{
                    background: 'var(--color-nc-void)',
                    color: 'var(--color-nc-yellow)',
                    boxShadow: 'inset 0 0 0 1px var(--color-nc-yellow)',
                    fontSize: '0.62rem',
                  }}
                  aria-hidden
                >
                  {s.label}
                </span>
              </li>
            )
          })}
        </ul>

        {/* Command line */}
        <form
          onSubmit={submit}
          className="absolute inset-x-0 bottom-4 px-2"
          style={{ writingMode: 'horizontal-tb' }}
        >
          <label htmlFor="rail-cmd" className="sr-only">
            Jump to a sector. Type a name or number, then press Enter.
          </label>
          <div
            className="flex items-center gap-1 px-1 py-1"
            style={{
              boxShadow: `inset 0 0 0 1px ${
                error ? 'var(--color-nc-magenta)' : 'var(--color-nc-border)'
              }`,
            }}
          >
            <span
              className="t-mono"
              style={{
                color: error
                  ? 'var(--color-nc-magenta)'
                  : 'var(--color-nc-yellow)',
                fontSize: '0.7rem',
              }}
              aria-hidden
            >
              &gt;
            </span>
            <input
              id="rail-cmd"
              ref={inputRef}
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') inputRef.current?.blur()
              }}
              className="t-mono w-full bg-transparent outline-none"
              style={{
                color: 'var(--color-nc-text)',
                fontSize: '0.7rem',
                minWidth: 0,
              }}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <span
            className="t-mono mt-1 block text-center"
            style={{
              color: error
                ? 'var(--color-nc-magenta)'
                : 'var(--color-nc-text-dim)',
              fontSize: '0.55rem',
            }}
            aria-live="polite"
          >
            {error ? '?? no such sector' : 'press /'}
          </span>
        </form>
      </nav>

      {/* ---------- Mobile: bottom tab strip ---------- */}
      <nav
        aria-label="Sectors"
        className="fixed inset-x-0 bottom-0 z-50 flex md:hidden"
        style={{
          background: 'rgba(5,5,8,0.94)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: 'inset 0 1px 0 var(--color-nc-border)',
        }}
      >
        {SECTORS.map((s) => {
          const on = active === s.target
          return (
            <a
              key={s.target}
              href={`#${s.target}`}
              aria-current={on ? 'true' : undefined}
              onClick={(e) => {
                e.preventDefault()
                jumpTo(s)
              }}
              className="flex flex-1 flex-col items-center justify-center gap-0.5 py-2.5"
              style={{
                color: on
                  ? 'var(--color-nc-yellow)'
                  : 'var(--color-nc-text-dim)',
              }}
            >
              <span className="t-data" style={{ fontSize: '0.68rem' }}>
                {s.id}
              </span>
              <span
                className="h-0.5 w-4"
                style={{
                  background: on ? 'var(--color-nc-yellow)' : 'transparent',
                }}
                aria-hidden
              />
              <span className="sr-only">{s.label}</span>
            </a>
          )
        })}
      </nav>
    </>
  )
}
