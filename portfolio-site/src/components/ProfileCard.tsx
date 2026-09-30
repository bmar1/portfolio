import { useRef, useState } from 'react'
import { PROFILE } from '../content/profile'
import { nextTabIndex } from '../utils/tabKeys'
import { useMedia } from '../utils/useMedia'

const TABS = [
  { id: 'bio', label: 'Bio' },
  { id: 'attributes', label: 'Attributes' },
  { id: 'cyberware', label: 'Cyberware' },
  { id: 'affiliations', label: 'Affiliations' },
] as const

type TabId = (typeof TABS)[number]['id']

const MAX_LEVEL = 20

function Bio() {
  return (
    <div className="profile-bio">
      <p className="profile-lifepath">
        <span className="profile-kicker">Life path</span>
        <strong>{PROFILE.lifePath.title}</strong>
        <span>{PROFILE.lifePath.text}</span>
      </p>
      {PROFILE.bio.map((line) => <p key={line.text}>{line.text}</p>)}
    </div>
  )
}

function Attributes() {
  return (
    <ul className="profile-attrs">
      {PROFILE.attributes.map((a) => (
        <li key={a.name}>
          <div className="profile-attrs__head">
            <span>{a.name}</span>
            <span className="profile-attrs__level">
              {a.level}
              <span className="sr-only"> of {MAX_LEVEL}</span>
            </span>
          </div>
          <div className="profile-attrs__bar" aria-hidden>
            {Array.from({ length: MAX_LEVEL }, (_, i) => (
              <span key={i} className={i < a.level ? 'is-on' : undefined} />
            ))}
          </div>
          <p>{a.reason.text}</p>
        </li>
      ))}
    </ul>
  )
}

function Cyberware() {
  return (
    <ul className="profile-chips" aria-label="Tools I build with">
      {PROFILE.cyberware.map((c) => <li key={c}>{c}</li>)}
    </ul>
  )
}

function Affiliations() {
  return (
    <ul className="profile-affil">
      {PROFILE.affiliations.map((a) => (
        <li key={a.org}>
          <span className="profile-kicker">{a.role}</span>
          <strong>{a.org}</strong>
          <span>{a.detail}</span>
        </li>
      ))}
    </ul>
  )
}

const PANELS: Record<TabId, () => React.JSX.Element> = {
  bio: Bio,
  attributes: Attributes,
  cyberware: Cyberware,
  affiliations: Affiliations,
}

export default function ProfileCard() {
  const wide = useMedia('(min-width: 768px)')
  const [tab, setTab] = useState<TabId>('bio')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    const next = nextTabIndex(e.key, index, TABS.length)
    if (next < 0) return
    e.preventDefault()
    setTab(TABS[next].id)
    tabRefs.current[next]?.focus()
  }

  const Active = PANELS[tab]

  return (
    <div className="cp-card cp-scan profile-card">
      <div className="profile-id">
        <div className="profile-photo cp-chamfer">
          <img
            src={PROFILE.photo}
            alt={PROFILE.photoAlt}
            width={200}
            height={200}
            loading="lazy"
            decoding="async"
          />
          <span className="profile-photo__tag" aria-hidden>ID // {PROFILE.handle}</span>
        </div>

        <div className="profile-status">
          <span className="profile-status__live">
            <span className="led led-online" aria-hidden />
            Active gig
          </span>
          <span className="profile-status__value">{PROFILE.status}</span>
        </div>

        <dl className="profile-facts">
          {PROFILE.facts.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="profile-sheet">
        {wide ? (
          <>
            <div className="profile-tabs" role="tablist" aria-label="Profile">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  ref={(el) => { tabRefs.current[i] = el }}
                  id={`profile-tab-${t.id}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  aria-controls={`profile-panel-${t.id}`}
                  tabIndex={tab === t.id ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className="profile-tab"
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div
              id={`profile-panel-${tab}`}
              role="tabpanel"
              aria-labelledby={`profile-tab-${tab}`}
              tabIndex={0}
              className="profile-panel"
            >
              <Active />
            </div>
          </>
        ) : (
          TABS.map((t) => {
            const Panel = PANELS[t.id]
            return (
              <section key={t.id} className="profile-panel" aria-labelledby={`profile-h-${t.id}`}>
                <h3 id={`profile-h-${t.id}`} className="profile-panel__title">{t.label}</h3>
                <Panel />
              </section>
            )
          })
        )}
      </div>
    </div>
  )
}
