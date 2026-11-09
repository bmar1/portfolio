import { useEffect, useState } from 'react'
import { ArrowUpRight, Download, Mail, X } from 'lucide-react'
import { RECRUITER_SUMMARY, STORY } from './storySpine'
import './recruiter-lane.css'

/**
 * Every lab direction is a scroll experience first. This is the escape
 * hatch: a recruiter (or anyone short on time) hits "R" or the visible
 * button and gets role, impact, stack, and contact in one static screen,
 * no scrubbing required.
 */
export default function RecruiterLane() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key.toLowerCase() === 'r') setOpen((v) => !v)
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="recruiter-toggle"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span className="recruiter-toggle__key">R</span>
        Recruiter mode
      </button>

      {open && (
        <div className="recruiter-lane" role="dialog" aria-modal="true" aria-label="Recruiter summary">
          <div className="recruiter-lane__panel">
            <button type="button" onClick={() => setOpen(false)} className="recruiter-lane__close" aria-label="Close">
              <X size={18} />
            </button>

            <p className="recruiter-lane__eyebrow">30-second version</p>
            <h2 className="recruiter-lane__name">{STORY.identity.name}</h2>
            <p className="recruiter-lane__status">{RECRUITER_SUMMARY.role.title} · {RECRUITER_SUMMARY.role.org}</p>
            <p className="recruiter-lane__summary">{RECRUITER_SUMMARY.role.summary}</p>

            <div className="recruiter-lane__grid">
              <section>
                <h3>Impact</h3>
                <ul>
                  {RECRUITER_SUMMARY.role.outcomes.map((o) => (
                    <li key={o.label}><strong>{o.value}</strong> {o.label}</li>
                  ))}
                  {RECRUITER_SUMMARY.topProjects.flatMap((p) => p.outcomes.slice(0, 1)).map((o) => (
                    <li key={o.label}><strong>{o.value}</strong> {o.label}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3>Stack</h3>
                <ul className="recruiter-lane__chips">
                  {Array.from(new Set(RECRUITER_SUMMARY.topProjects.flatMap((p) => p.tech))).slice(0, 10).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3>Projects</h3>
                <ul>
                  {RECRUITER_SUMMARY.topProjects.map((p) => (
                    <li key={p.id}>
                      <strong>{p.name}</strong> — {p.purpose}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="recruiter-lane__actions">
              <a className="recruiter-lane__btn is-primary" href={RECRUITER_SUMMARY.resumeHref} download>
                <Download size={16} /> Download resume
              </a>
              <a className="recruiter-lane__btn" href={`mailto:${RECRUITER_SUMMARY.email}`}>
                <Mail size={16} /> {RECRUITER_SUMMARY.email}
              </a>
              <a className="recruiter-lane__btn" href="/">
                Back to the main site <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
