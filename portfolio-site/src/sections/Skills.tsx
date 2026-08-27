import { useCallback, useEffect, useRef, useState } from 'react'
import { jumpTo, parseCommand, resolveSector } from '../utils/commands'
import { prefersReducedMotion } from '../utils/motion'

const STACK: Record<string, string[]> = {
  languages: ['Java', 'TypeScript', 'JavaScript', 'C', 'C++', 'SQL'],
  frameworks: ['Spring Boot', 'React', 'Node.js', 'Express.js'],
  infra: ['AWS EC2', 'AWS RDS', 'Docker', 'Kubernetes', 'GKE', 'GitHub Actions'],
  data: ['PostgreSQL', 'MongoDB', 'Oracle', 'RabbitMQ'],
  testing: ['JUnit', 'Mockito', 'Jest'],
  tools: ['Git', 'Jira', 'Cursor', 'Claude'],
}

type Row = { kind: 'in' | 'out' | 'err' | 'head'; text: string }

const HELP: Row[] = [
  { kind: 'out', text: 'stack --all            print every group' },
  { kind: 'out', text: 'stack --filter <term>  match across groups' },
  { kind: 'out', text: 'clear                  wipe the buffer' },
  { kind: 'out', text: 'help                   this' },
  { kind: 'out', text: '' },
  { kind: 'out', text: 'sector names also work here: try "projects"' },
]

function allRows(): Row[] {
  return Object.entries(STACK).flatMap(([group, items]) => [
    { kind: 'head' as const, text: group },
    { kind: 'out' as const, text: items.join('  ·  ') },
  ])
}

function filterRows(term: string): Row[] {
  const hits = Object.entries(STACK)
    .map(([group, items]) => {
      const matched = items.filter((i) => i.toLowerCase().includes(term))
      return matched.length ? { group, matched } : null
    })
    .filter(Boolean) as { group: string; matched: string[] }[]

  if (!hits.length) {
    return [{ kind: 'err', text: `no match for "${term}"` }]
  }
  return hits.flatMap(({ group, matched }) => [
    { kind: 'head' as const, text: group },
    { kind: 'out' as const, text: matched.join('  ·  ') },
  ])
}

/**
 * Layout family: live terminal REPL. Used once, here.
 * It auto-runs `stack --all` on entry so the content is fully visible without
 * anyone typing. The prompt is a bonus, never a gate.
 */
export default function Skills() {
  const ref = useRef<HTMLElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [rows, setRows] = useState<Row[]>([])
  const [entry, setEntry] = useState('')
  const [typed, setTyped] = useState(0)

  const reduce = prefersReducedMotion()

  // Auto-run on first scroll into view.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setRows([{ kind: 'in', text: 'stack --all' }, ...allRows()])
        io.disconnect()
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Reveal rows one at a time. Reduced motion skips this entirely and `shown`
  // below renders the full buffer.
  useEffect(() => {
    if (reduce || typed >= rows.length) return
    const t = window.setTimeout(() => setTyped((n) => n + 1), 85)
    return () => window.clearTimeout(t)
  }, [typed, rows.length, reduce])

  const run = useCallback(
    (raw: string) => {
      const { name, args, flags } = parseCommand(raw)
      const echo: Row = { kind: 'in', text: raw.trim() }

      if (name === 'clear') {
        setRows([])
        setTyped(0)
        return
      }
      if (name === 'help') {
        setRows((r) => [...r, echo, ...HELP])
        return
      }
      if (name === 'stack') {
        const term =
          typeof flags.filter === 'string' ? flags.filter : args[0] ?? ''
        setRows((r) => [
          ...r,
          echo,
          ...(term && !flags.all ? filterRows(term) : allRows()),
        ])
        return
      }

      // Anything else: try it as a sector, so the nav grammar works here too.
      const sector = resolveSector(raw)
      if (sector) {
        setRows((r) => [
          ...r,
          echo,
          { kind: 'out', text: `jumping to ${sector.label.toLowerCase()}` },
        ])
        jumpTo(sector)
        return
      }

      setRows((r) => [
        ...r,
        echo,
        { kind: 'err', text: `${name || 'that'}: not a command. try "help"` },
      ])
    },
    [],
  )

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!entry.trim()) return
    run(entry)
    setEntry('')
  }

  const shown = rows.slice(0, reduce ? rows.length : typed)

  return (
    <section id="skills" ref={ref} className="section">
      <div className="container">
        {/* No eyebrow. The window chrome says what this is. */}
        <div
          className="panel scanlines relative mx-auto max-w-4xl overflow-hidden"
          style={{ boxShadow: 'inset 0 0 0 1px var(--color-nc-yellow)' }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-3 px-4 py-2"
            style={{
              background: 'var(--color-nc-surface-2)',
              boxShadow: 'inset 0 -1px 0 var(--color-nc-border)',
            }}
          >
            <span className="led" aria-hidden />
            <span
              className="t-label"
              style={{ color: 'var(--color-nc-yellow)', fontSize: '0.62rem' }}
            >
              bumar@nightcity — stack
            </span>
          </div>

          {/* Output */}
          <div
            className="relative z-10 min-h-[22rem] px-5 py-5"
            aria-live="polite"
          >
            {shown.map((row, i) => (
              <div
                key={`${row.kind}-${i}-${row.text}`}
                className="t-mono"
                style={{
                  lineHeight: 1.9,
                  color:
                    row.kind === 'in'
                      ? 'var(--color-nc-text)'
                      : row.kind === 'err'
                        ? 'var(--color-nc-magenta)'
                        : row.kind === 'head'
                          ? 'var(--color-nc-yellow)'
                          : 'var(--color-nc-text-muted)',
                }}
              >
                {row.kind === 'in' && (
                  <span style={{ color: 'var(--color-nc-yellow)' }}>
                    &gt;{' '}
                  </span>
                )}
                {row.kind === 'head' && (
                  <span style={{ color: 'var(--color-nc-cyan)' }}>// </span>
                )}
                {row.text}
              </div>
            ))}

            {/* Prompt */}
            <form onSubmit={submit} className="mt-2 flex items-center gap-2">
              <label htmlFor="stack-cmd" className="sr-only">
                Run a stack command. Try: stack --filter java
              </label>
              <span
                className="t-mono"
                style={{ color: 'var(--color-nc-yellow)' }}
                aria-hidden
              >
                &gt;
              </span>
              <input
                id="stack-cmd"
                ref={inputRef}
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="stack --filter java"
                className="t-mono w-full bg-transparent outline-none"
                style={{ color: 'var(--color-nc-text)' }}
                autoComplete="off"
                spellCheck={false}
              />
            </form>
          </div>
        </div>

        <p
          className="t-mono mt-4 text-center"
          style={{ color: 'var(--color-nc-text-dim)' }}
        >
          no progress bars, no &quot;expert&quot; badges. just what I build with.
        </p>
      </div>
    </section>
  )
}
