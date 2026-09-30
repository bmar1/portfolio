import { useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { ROLES, type Role } from '../content/experience'
import { nextTabIndex } from '../utils/tabKeys'
import { useMedia } from '../utils/useMedia'

function GigDetail({ role }: { role: Role }) {
  return (
    <>
      <div className="gig-detail__meta">
        <span className={`gig-status${role.active ? ' is-active' : ''}`}>
          {role.active && <span className="led led-online" aria-hidden />}
          {role.active ? 'Active gig' : 'Completed'}
        </span>
        <span className="gig-detail__dates">{role.dates}</span>
      </div>

      <h3 className="gig-detail__title">{role.title}</h3>
      <p className="gig-detail__org">
        {role.org}
        {role.team && <span>{role.team}</span>}
      </p>
      <p className="gig-detail__summary">{role.summary}</p>

      <h4 className="gig-kicker">Objectives</h4>
      <ul className="gig-objectives">
        {role.points.map((p) => (
          <li key={p}>
            <span className={`gig-check${role.active ? '' : ' is-done'}`} aria-hidden>
              {!role.active && <Check size={12} strokeWidth={3} />}
            </span>
            {p}
          </li>
        ))}
      </ul>

      <h4 className="gig-kicker">Outcomes</h4>
      <dl className="gig-outcomes">
        {role.outcomes.map((o) => (
          <div key={o.label}>
            <dt>{o.label}</dt>
            <dd>{o.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="gig-tech" aria-label={`${role.org} technologies`}>
        {role.tech.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </>
  )
}

export default function GigJournal() {
  const wide = useMedia('(min-width: 900px)')
  const [selected, setSelected] = useState(ROLES[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  if (!wide) {
    return (
      <div className="gig-stack">
        {ROLES.map((role) => (
          <article
            key={role.id}
            className={`cp-card gig-detail trim-${role.trim}`}
            aria-label={`${role.title}, ${role.org}`}
          >
            <GigDetail role={role} />
          </article>
        ))}
      </div>
    )
  }

  const role = ROLES.find((r) => r.id === selected) ?? ROLES[0]

  const onKey = (e: React.KeyboardEvent, index: number) => {
    const next = nextTabIndex(e.key, index, ROLES.length)
    if (next < 0) return
    e.preventDefault()
    setSelected(ROLES[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="cp-card cp-scan gig-journal">
      <div className="gig-list" role="tablist" aria-orientation="vertical" aria-label="Jobs">
        <span className="gig-kicker gig-list__head" aria-hidden>Gigs · {ROLES.length}</span>
        {ROLES.map((r, i) => (
          <button
            key={r.id}
            ref={(el) => { tabRefs.current[i] = el }}
            id={`gig-tab-${r.id}`}
            type="button"
            role="tab"
            aria-selected={selected === r.id}
            aria-controls="gig-panel"
            tabIndex={selected === r.id ? 0 : -1}
            onClick={() => setSelected(r.id)}
            onKeyDown={(e) => onKey(e, i)}
            className={`gig-tab trim-${r.trim}`}
          >
            <span className="gig-tab__dates">
              {r.active && <span className="led led-online" aria-hidden />}
              {r.dates}
            </span>
            <span className="gig-tab__title">{r.title}</span>
            <span className="gig-tab__org">{r.org}</span>
          </button>
        ))}
      </div>

      <div
        id="gig-panel"
        role="tabpanel"
        aria-labelledby={`gig-tab-${role.id}`}
        tabIndex={0}
        className={`gig-detail trim-${role.trim}`}
      >
        <GigDetail key={role.id} role={role} />
      </div>
    </div>
  )
}
