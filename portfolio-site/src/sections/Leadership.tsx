import SectionHeading from '../components/SectionHeading'
import { GROUPS } from '../content/leadership'

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="section reading-section leadership-section"
      aria-labelledby="leadership-heading"
    >
      <div className="container">
        <SectionHeading id="leadership-heading" text="Leadership" />
        <p className="section-lede">
          Two student groups at Seneca. What came out of them, and what I took away.
        </p>

        <div className="lead-grid">
          {GROUPS.map((g) => (
            <article
              key={g.id}
              className={`cp-card lead-card trim-${g.trim}`}
              aria-labelledby={`${g.id}-heading`}
            >
              <header className="lead-card__head">
                <span className="lead-card__faction">Faction // {g.place}</span>
                <h3 id={`${g.id}-heading`} className="lead-card__org">{g.org}</h3>
                <span className="lead-card__role">{g.role}</span>
              </header>

              <dl className="lead-card__stats">
                {g.outcomes.map((o) => (
                  <div key={o.label}>
                    <dt>{o.label}</dt>
                    <dd>{o.value}</dd>
                  </div>
                ))}
              </dl>

              <h4 className="gig-kicker">What I did</h4>
              <ul className="lead-list">
                {g.did.map((d) => <li key={d}>{d}</li>)}
              </ul>

              <h4 className="gig-kicker">What I took from it</h4>
              <ul className="lead-list is-learned">
                {g.learned.map((l) => <li key={l.text}>{l.text}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
