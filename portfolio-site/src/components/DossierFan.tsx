import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'
import { PROJECTS, type Project } from '../content/projects'
import { useMedia } from '../utils/useMedia'

const FAN = [
  { x: '0%', y: '2.5rem', r: -5 },
  { x: '27%', y: '0rem', r: 1.5 },
  { x: '54%', y: '3.5rem', r: 5.5 },
]

const EASE = [0.23, 1, 0.32, 1] as const

function Shot({ project }: { project: Project }) {
  if (project.classified || !project.shot) {
    return (
      <div className="dossier-redacted" aria-hidden>
        <span>REDACTED</span>
      </div>
    )
  }
  return (
    <img
      src={project.shot}
      alt={project.alt}
      width={project.width}
      height={project.height}
      loading="lazy"
      decoding="async"
    />
  )
}

function Outcomes({ project, limit }: { project: Project; limit?: number }) {
  return (
    <dl className="dossier-outcomes">
      {project.outcomes.slice(0, limit).map((o) => (
        <div key={o.label}>
          <dt>{o.label}</dt>
          <dd>{o.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Stamp({ project }: { project: Project }) {
  return (
    <span className={`dossier-stamp${project.classified ? ' is-classified' : ''}`}>
      Case file {project.file}
    </span>
  )
}

function LiveLink({ project }: { project: Project }) {
  if (!project.href) return null
  return (
    <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
      View {project.name}
      <ExternalLink size={16} aria-hidden="true" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

function CaseFile({ project, onClose }: { project: Project; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const reduce = useReducedMotion() === true

  useEffect(() => {
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onClose()
      return
    }
    if (e.key !== 'Tab') return
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button')
    if (!focusable?.length) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  return (
    <motion.div
      className="dossier-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${project.id}-dialog-heading`}
        className={`cp-card casefile${project.classified ? ' is-classified' : ''}`}
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.28, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <header className="casefile__head">
          <div>
            <Stamp project={project} />
            <h3 id={`${project.id}-dialog-heading`} className="casefile__name">{project.name}</h3>
            <p className="casefile__purpose">{project.purpose}</p>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="dossier-close"
            onClick={onClose}
            aria-label="Close case file"
          >
            <X size={18} aria-hidden />
          </button>
        </header>

        <div className="casefile__shot cp-chamfer"><Shot project={project} /></div>

        <div className="casefile__body">
          <div className="casefile__main">
            <section>
              <h4 className="gig-kicker">The build</h4>
              <p>{project.contribution}</p>
            </section>

            <section>
              <h4 className="gig-kicker">Why I built it</h4>
              <p>{project.why.text}</p>
            </section>

            {project.decisions.length > 0 && (
              <section>
                <h4 className="gig-kicker">Key decisions</h4>
                <ol className="casefile__decisions">
                  {project.decisions.map((d, i) => (
                    <li key={d.choice}>
                      <span className="casefile__num" aria-hidden>{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <strong>{d.choice}</strong>
                        <p>{d.reason}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {project.learned.length > 0 && (
              <section>
                <h4 className="gig-kicker">What I learned</h4>
                <ul className="lead-list is-learned">
                  {project.learned.map((l) => <li key={l.text}>{l.text}</li>)}
                </ul>
              </section>
            )}

            {project.rebuild && (
              <section>
                <h4 className="gig-kicker">If I rebuilt it</h4>
                <p>{project.rebuild.text}</p>
              </section>
            )}
          </div>

          <aside className="casefile__aside">
            <h4 className="gig-kicker">Outcomes</h4>
            <Outcomes project={project} />
            {project.tech.length > 0 && (
              <>
                <h4 className="gig-kicker">Stack</h4>
                <ul className="dossier-tech" aria-label={`${project.name} technologies`}>
                  {project.tech.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </>
            )}
            <LiveLink project={project} />
          </aside>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function DossierFan() {
  const wide = useMedia('(min-width: 1024px)')
  const reduce = useReducedMotion() === true
  const fan = wide && !reduce
  const [front, setFront] = useState<string | null>(null)
  const [open, setOpen] = useState<string | null>(null)
  const returnTo = useRef<string | null>(null)
  const buttons = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    if (open || !returnTo.current) return
    const id = returnTo.current
    returnTo.current = null
    requestAnimationFrame(() => buttons.current[id]?.focus())
  }, [open])

  const openProject = PROJECTS.find((p) => p.id === open)

  const close = () => {
    returnTo.current = open
    setOpen(null)
  }

  const openButton = (p: Project) => (
    <button
      ref={(el) => { buttons.current[p.id] = el }}
      type="button"
      className="dossier-open"
      aria-haspopup="dialog"
      onFocus={() => setFront(p.id)}
      onBlur={() => setFront((f) => (f === p.id ? null : f))}
      onClick={() => setOpen(p.id)}
    >
      <span>Open case file</span>
      <span className="sr-only">: {p.name}</span>
    </button>
  )

  return (
    <>
      <p className="dossier-hint">
        {fan ? 'Hover or tab through the files.' : 'Tap a file.'} Open one for the decisions behind it.
      </p>

      {fan ? (
        <div className="dossier-fan" onMouseLeave={() => setFront(null)}>
          {PROJECTS.map((p, i) => {
            const pos = FAN[i % FAN.length]
            const isFront = front === p.id
            return (
              <motion.article
                key={p.id}
                className={`cp-card dossier-card${p.classified ? ' is-classified' : ''}${isFront ? ' is-front' : ''}`}
                style={{ left: pos.x, top: pos.y, zIndex: isFront ? 20 : i + 1 }}
                initial={false}
                animate={{
                  rotate: isFront ? 0 : pos.r,
                  y: isFront ? -18 : 0,
                  scale: isFront ? 1.03 : 1,
                  opacity: front && !isFront ? 0.72 : 1,
                }}
                transition={{ duration: 0.18, ease: EASE }}
                onMouseEnter={() => setFront(p.id)}
                aria-labelledby={`${p.id}-heading`}
              >
                <Stamp project={p} />
                <div className="dossier-card__shot cp-chamfer"><Shot project={p} /></div>
                <h3 id={`${p.id}-heading`} className="dossier-card__name">{p.name}</h3>
                <p className="dossier-card__purpose">{p.purpose}</p>
                <Outcomes project={p} limit={2} />
                {openButton(p)}
              </motion.article>
            )
          })}
        </div>
      ) : (
        <div className="dossier-stack">
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className={`cp-card dossier-card is-flat${p.classified ? ' is-classified' : ''}`}
              aria-labelledby={`${p.id}-heading`}
            >
              <Stamp project={p} />
              <div className="dossier-card__shot cp-chamfer"><Shot project={p} /></div>
              <h3 id={`${p.id}-heading`} className="dossier-card__name">{p.name}</h3>
              <p className="dossier-card__purpose">{p.purpose}</p>
              <Outcomes project={p} limit={2} />
              {openButton(p)}
            </article>
          ))}
        </div>
      )}

      <AnimatePresence>
        {openProject && <CaseFile key={openProject.id} project={openProject} onClose={close} />}
      </AnimatePresence>
    </>
  )
}
