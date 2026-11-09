import './lab-launcher.css'

const DIRECTIONS = [
  {
    href: '/braindance',
    tag: 'BD-01',
    name: 'Braindance',
    tagline: 'A recorded memory you scrub through.',
    detail:
      'Cinematic scroll film. Rain-on-glass hero, an editor timeline for experience, recordings for projects, a two-faction split for leadership.',
  },
  {
    href: '/metro',
    tag: 'NC-02',
    name: 'Night City Metro',
    tagline: 'The site as a transit line.',
    detail:
      'Spatial transit map nav. Scroll drives a train between stations; leadership is two lines meeting at Seneca Central.',
  },
  {
    href: '/breach',
    tag: 'BP-03',
    name: 'Breach Protocol',
    tagline: 'Hack the access point to get in.',
    detail:
      'Netrunner OS. Hex-grid navigation, projects as daemons you upload, leadership as a living reach graph.',
  },
]

export default function LabLauncher() {
  return (
    <main className="lab-launcher">
      <div className="lab-launcher__grid" aria-hidden />
      <div className="lab-launcher__inner">
        <p className="lab-launcher__eyebrow">EXPERIMENTAL WING // NOT THE LIVE SITE</p>
        <h1 className="lab-launcher__title">Three takes on the same story.</h1>
        <p className="lab-launcher__lede">
          Same content, same person, three different ways to walk through it. Pick a direction below,
          or press <kbd>R</kbd> inside any of them for the 30-second recruiter version.
        </p>

        <div className="lab-launcher__list">
          {DIRECTIONS.map((d) => (
            <a key={d.href} href={d.href} className="lab-card">
              <span className="lab-card__tag">{d.tag}</span>
              <h2 className="lab-card__name">{d.name}</h2>
              <p className="lab-card__tagline">{d.tagline}</p>
              <p className="lab-card__detail">{d.detail}</p>
              <span className="lab-card__cta">Open →</span>
            </a>
          ))}
        </div>

        <a href="/" className="lab-launcher__back">← Back to the live site</a>
      </div>
    </main>
  )
}
