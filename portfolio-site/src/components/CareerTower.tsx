import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ROLES, type Role } from '../content/experience'
import { nextTabIndex } from '../utils/tabKeys'

const floorOf = (i: number) => `F${String(ROLES.length - i).padStart(2, '0')}`

function statusOf(role: Role) {
  if (role.active) return { label: 'Current floor', cls: ' is-current' }
  if (role.upcoming) return { label: 'Under construction', cls: ' is-upcoming' }
  return { label: 'Cleared', cls: '' }
}

function Badge({ role, size }: { role: Role; size: 'sm' | 'lg' }) {
  const initials = (role.org.match(/\b[A-Za-z]/g) ?? []).join('').slice(0, 2).toUpperCase()
  return (
    <span className={`org-badge is-${size}`} aria-hidden>
      {role.logo ? <img src={role.logo} alt="" loading="lazy" /> : initials}
    </span>
  )
}

/** Stepped crown, spire and beacon, scaled to sit on the shaft. */
function Crown() {
  const tiers = [
    { x: 120, y: 58, w: 60, h: 30 },
    { x: 84, y: 88, w: 132, h: 30 },
    { x: 18, y: 118, w: 264, h: 34 },
  ]
  return (
    <svg className="tower__crown" viewBox="0 0 300 152" aria-hidden>
      <line x1={150} y1={6} x2={150} y2={58} className="tower__spire" />
      <line x1={138} y1={36} x2={162} y2={36} className="tower__spire" />
      <circle cx={150} cy={6} r={4} className="tower__beacon" />
      {tiers.map((t) => (
        <g key={t.y}>
          <rect {...{ x: t.x, y: t.y, width: t.w, height: t.h }} className="tower__tier" />
          {Array.from({ length: Math.floor((t.w - 12) / 12) }, (_, i) => (
            <rect key={i} x={t.x + 8 + i * 12} y={t.y + 8} width={6} height={4} className="tower__lit" />
          ))}
        </g>
      ))}
      <text x={150} y={142} textAnchor="middle" className="tower__sign">CAREER TOWER</text>
    </svg>
  )
}

/**
 * Experience as a megabuilding cross-section. Newest gig is the top floor;
 * an elevator car rides to whichever floor is picked and the doors open on
 * that floor's readout.
 */
export default function CareerTower() {
  const reduce = useReducedMotion()
  const [selected, setSelected] = useState((ROLES.find((r) => r.active) ?? ROLES[0]).id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const index = Math.max(0, ROLES.findIndex((r) => r.id === selected))
  const role = ROLES[index]
  const status = statusOf(role)
  const floor = floorOf(index)

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = nextTabIndex(e.key, i, ROLES.length)
    if (next < 0) return
    e.preventDefault()
    setSelected(ROLES[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <div className="tower">
      <div className="tower__building">
        <Crown />

        <div className="tower__floors" role="tablist" aria-orientation="vertical" aria-label="Jobs, newest floor at the top">
          {ROLES.map((r, i) => (
            <button
              key={r.id}
              ref={(el) => { tabRefs.current[i] = el }}
              id={`floor-tab-${r.id}`}
              type="button"
              role="tab"
              aria-selected={selected === r.id}
              aria-controls="floor-view"
              tabIndex={selected === r.id ? 0 : -1}
              onClick={() => setSelected(r.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`floor trim-${r.trim}${statusOf(r).cls}`}
            >
              {selected === r.id && (
                <motion.span
                  layoutId="elevator-car"
                  className="floor__car"
                  aria-hidden
                  transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 }}
                />
              )}
              <span className="floor__num">{floorOf(i)}</span>
              <Badge role={r} size="sm" />
              <span className="floor__body">
                <span className="floor__org">{r.org}</span>
                <span className="floor__dates">{r.dates}</span>
              </span>
              <span className="floor__windows" aria-hidden />
            </button>
          ))}
        </div>

        <div className="tower__podium" aria-hidden>
          <span className="tower__door" />
          <span className="tower__lobby">Lobby // Seneca Polytechnic</span>
        </div>
      </div>

      <div
        id="floor-view"
        role="tabpanel"
        aria-labelledby={`floor-tab-${role.id}`}
        tabIndex={0}
        className={`floor-view trim-${role.trim}`}
      >
        {!reduce && (
          <div key={`doors-${role.id}`} className="floor-view__doors" aria-hidden>
            <span />
            <span />
          </div>
        )}
        <span className="floor-view__ghost" aria-hidden>{floor}</span>

        <div key={role.id} className="floor-view__content">
          <p className={`floor-view__meta${status.cls}`}>
            <span className="floor-view__status">
              {(role.active || role.upcoming) && <span className={`led ${role.active ? 'led-online' : 'led-upcoming'}`} aria-hidden />}
              {status.label}
            </span>
            <span>{floor} // {role.dates}</span>
          </p>

          <div className="floor-view__head">
            <Badge role={role} size="lg" />
            <div>
              <h3 className="floor-view__title">{role.title}</h3>
              <p className="floor-view__org">
                {role.org}
                {role.team && <span> · {role.team}</span>}
              </p>
            </div>
          </div>
          <p className="floor-view__summary">{role.summary}</p>

          <h4 className="gig-kicker">Directory</h4>
          <ol className="floor-dir">
            {role.points.map((p, j) => (
              <li key={p}>
                <span className="floor-dir__code" aria-hidden>
                  {floor.slice(1)}-{String.fromCharCode(65 + j)}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ol>

          {role.outcomes.length > 0 && (
            <dl className="floor-outcomes">
              {role.outcomes.map((o) => (
                <div key={o.label}>
                  <dt>{o.label}</dt>
                  <dd>{o.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {role.tech.length > 0 && (
            <p className="floor-tech">
              <span className="floor-tech__label">Running on</span>
              {role.tech.join(' / ')}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
