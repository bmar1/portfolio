import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionBackdrop from '../components/SectionBackdrop'
import SectionHeading from '../components/SectionHeading'
import StationScene from '../components/StationScene'
import { GROUPS, type Group } from '../content/leadership'
import { nextTabIndex } from '../utils/tabKeys'

/*
 * Vertical line map. Both lines leave the Seneca interchange at the top and
 * run side by side; AWS stops first, then its line ends and GDG carries on.
 */
const TRACK_X: Record<string, number> = { aws: 36, gdg: 68 }
const LABEL_X = 112
const STEP = 82
const FIRST_Y = 112
const GAP_BETWEEN_LINES = 20

type Station =
  | { kind: 'org'; group: Group; y: number }
  | { kind: 'stop'; group: Group; y: number; index: number }

function buildStations() {
  const stations: Station[] = []
  const ends: Record<string, number> = {}
  let y = FIRST_Y
  for (const g of GROUPS) {
    stations.push({ kind: 'org', group: g, y })
    y += STEP
    g.outcomes.forEach((_, index) => {
      stations.push({ kind: 'stop', group: g, y, index })
      y += STEP
    })
    ends[g.id] = y - STEP + 30
    y += GAP_BETWEEN_LINES
  }
  return { stations, ends, height: y }
}

const MAP = buildStations()
const EASE = [0.65, 0, 0.35, 1] as const

function LineMap({ selected, onPick }: { selected: string; onPick: (id: string) => void }) {
  const reduce = useReducedMotion()
  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, x: -8 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.35, delay },
        }

  return (
    <svg
      viewBox={`0 0 420 ${MAP.height}`}
      className="transit-map"
      aria-label="Line map: the AWS and GDG lines both leave Seneca Polytechnic. Stations link out."
    >
      {GROUPS.map((g, i) => {
        const x = TRACK_X[g.id]
        const d = `M${x} 52 V${MAP.ends[g.id]}`
        const on = selected === g.id
        return (
          <g
            key={g.id}
            className={`transit-line trim-${g.trim}${on ? ' is-on' : ' is-dim'}`}
            onClick={() => onPick(g.id)}
          >
            <path d={d} className="transit-line__hit" />
            <motion.path
              id={`vline-${g.id}`}
              d={d}
              className="transit-line__track"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease: EASE, delay: i * 0.3 }}
            />
            <rect x={x - 9} y={MAP.ends[g.id] - 3} width={18} height={6} className="transit-line__end" />
            {on && !reduce && (
              <rect x={-3} y={-6} width={6} height={12} className="transit-line__train">
                <animateMotion dur="5s" repeatCount="indefinite">
                  <mpath href={`#vline-${g.id}`} />
                </animateMotion>
              </rect>
            )}
          </g>
        )
      })}

      <g className="transit-hub">
        <rect x={20} y={24} width={64} height={28} />
        <text x={LABEL_X} y={34} className="transit-hub__label">Seneca Polytechnic</text>
        <text x={LABEL_X} y={52} className="transit-hub__sub">Interchange</text>
      </g>

      {MAP.stations.map((s, n) => {
        const g = s.group
        const x = TRACK_X[g.id]
        const on = selected === g.id
        const cls = `transit-stop trim-${g.trim}${on ? ' is-on' : ' is-dim'}`
        const tick = <line x1={x + 10} y1={s.y} x2={LABEL_X - 10} y2={s.y} className="transit-stop__tick" />

        if (s.kind === 'org') {
          return (
            <motion.a
              key={`${g.id}-org`}
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${cls} transit-station`}
              aria-label={`${g.org} home page (opens in a new tab)`}
              {...reveal(0.3 + n * 0.08)}
            >
              <title>{g.url.replace(/^https:\/\//, '')}</title>
              <rect x={x - 16} y={s.y - 16} width={300} height={40} className="transit-station__hit" />
              {tick}
              <rect x={x - 9} y={s.y - 9} width={18} height={18} className="transit-line__terminal" />
              <text x={LABEL_X} y={s.y - 2} className="transit-stop__org">{g.org}</text>
              <text x={LABEL_X} y={s.y + 18} className="transit-stop__role">
                {g.role} <tspan className="transit-station__go">↗</tspan>
              </text>
            </motion.a>
          )
        }

        const o = g.outcomes[s.index]
        return (
          <motion.a
            key={`${g.id}-${o.label}`}
            href={o.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cls} transit-station`}
            aria-label={`${o.value} ${o.label}: ${o.hrefLabel} (opens in a new tab)`}
            {...reveal(0.3 + n * 0.08)}
          >
            <title>{o.hrefLabel}</title>
            <rect x={x - 16} y={s.y - 22} width={300} height={44} className="transit-station__hit" />
            {tick}
            <circle cx={x} cy={s.y} r={8} className="transit-line__stop" />
            <text x={LABEL_X} y={s.y} dominantBaseline="middle" className="transit-stop__value">{o.value}</text>
            <text x={LABEL_X + 76} y={s.y - 7} className="transit-stop__caption">{o.label}</text>
            <text x={LABEL_X + 76} y={s.y + 12} className="transit-stop__link">
              {o.hrefLabel} <tspan className="transit-station__go">↗</tspan>
            </text>
          </motion.a>
        )
      })}
    </svg>
  )
}

export default function Leadership() {
  const [selected, setSelected] = useState(GROUPS[0].id)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const group = GROUPS.find((g) => g.id === selected) ?? GROUPS[0]

  const onKey = (e: React.KeyboardEvent, index: number) => {
    const next = nextTabIndex(e.key, index, GROUPS.length)
    if (next < 0) return
    e.preventDefault()
    setSelected(GROUPS[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section
      id="leadership"
      className="section reading-section leadership-section"
      aria-labelledby="leadership-heading"
    >
      <SectionBackdrop scene={<StationScene />} dim={0.55} tone="magenta" />

      <div className="container relative z-10">
        <SectionHeading id="leadership-heading" text="Leadership" />
        <p className="section-lede">
          Two student groups, one campus. Ride a line on the map, or hop off at a station to see the
          real thing.
        </p>

        <div className="lead-layout">
          <div className="transit-frame">
            <LineMap selected={selected} onPick={setSelected} />
          </div>

          <aside className="lead-side" aria-label="Line details">
            <div className="lead-lines" role="tablist" aria-label="Student groups">
              {GROUPS.map((g, i) => (
                <button
                  key={g.id}
                  ref={(el) => { tabRefs.current[i] = el }}
                  id={`lead-tab-${g.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected === g.id}
                  aria-controls="lead-board"
                  tabIndex={selected === g.id ? 0 : -1}
                  onClick={() => setSelected(g.id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`lead-chip trim-${g.trim}`}
                >
                  <span className="lead-chip__swatch" aria-hidden />
                  <span className="lead-chip__line">{g.trim} line</span>
                  <span className="lead-chip__org">{g.id === 'aws' ? 'AWS Builders' : 'GDG Seneca'}</span>
                </button>
              ))}
            </div>

            <div
              key={group.id}
              id="lead-board"
              role="tabpanel"
              aria-labelledby={`lead-tab-${group.id}`}
              className={`cp-card cp-scan lead-board trim-${group.trim}`}
            >
              <header className="lead-board__head">
                <span className="lead-board__line">
                  {group.trim} line // {group.place}
                </span>
                <h3 className="lead-board__org">{group.org}</h3>
                <p className="lead-board__role">{group.role}</p>
              </header>

              <h4 className="gig-kicker">What I did</h4>
              <ol className="lead-stations">
                {group.did.map((d) => <li key={d}>{d}</li>)}
              </ol>

              <h4 className="gig-kicker">What I took from it</h4>
              <ul className="lead-list is-learned">
                {group.learned.map((l) => <li key={l.text}>{l.text}</li>)}
              </ul>

              <ul className="lead-board__links" aria-label={`${group.org} links`}>
                {[{ href: group.url, hrefLabel: 'Group site' }, ...group.outcomes].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.hrefLabel}
                      <ArrowUpRight size={14} aria-hidden />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
