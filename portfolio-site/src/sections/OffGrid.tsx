import { Cat, Dumbbell, Gamepad2, Mountain, Network, Salad, type LucideIcon } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'

type Art = 'photo' | 'icon' | 'diagram' | 'topo'

interface Tile {
  id: string
  label: string
  kicker: string
  copy: string
  icon: LucideIcon
  art: Art
  img?: string
  imgAlt?: string
}

const TILES: Tile[] = [
  {
    id: 'cat',
    label: 'The cat',
    kicker: 'Landlord',
    copy: 'He runs the household. I just pay rent.',
    icon: Cat,
    art: 'photo',
    img: '/assets/personal_hero.jpg',
    imgAlt: 'Bilal holding his white cat',
  },
  {
    id: 'games',
    label: 'Games',
    kicker: 'Main quest',
    copy: 'Strategy and story-driven, nothing competitive. Night City is home base.',
    icon: Gamepad2,
    art: 'photo',
    img: '/assets/alley.jpg',
    imgAlt: '',
  },
  {
    id: 'gym',
    label: 'Gym',
    kicker: 'Daily quest',
    copy: 'Lifting heavy things, consistently.',
    icon: Dumbbell,
    art: 'icon',
  },
  {
    id: 'food',
    label: 'Eating clean',
    kicker: 'Buff active',
    copy: 'Protein goals, minimal fuss.',
    icon: Salad,
    art: 'icon',
  },
  {
    id: 'systems',
    label: 'System design',
    kicker: 'Side quest',
    copy: 'Distributed systems, for fun, on weekends.',
    icon: Network,
    art: 'diagram',
  },
  {
    id: 'trails',
    label: 'Trails',
    kicker: 'Offline',
    copy: 'A good break from screens.',
    icon: Mountain,
    art: 'topo',
  },
]

function Diagram() {
  return (
    <svg className="bento-diagram" viewBox="0 0 240 110" aria-hidden>
      <rect x="6" y="40" width="46" height="28" />
      <rect x="92" y="40" width="56" height="28" className="is-queue" />
      <rect x="188" y="8" width="46" height="24" />
      <rect x="188" y="43" width="46" height="24" />
      <rect x="188" y="78" width="46" height="24" />
      <path d="M52 54 H92 M148 54 H168 V20 H188 M168 54 H188 M168 54 V90 H188" />
      <text x="29" y="58">api</text>
      <text x="120" y="58">queue</text>
      <text x="211" y="24">w1</text>
      <text x="211" y="59">w2</text>
      <text x="211" y="94">w3</text>
    </svg>
  )
}

export default function OffGrid() {
  return (
    <section id="offgrid" className="section reading-section" aria-labelledby="offgrid-heading">
      <div className="container">
        <SectionHeading id="offgrid-heading" text="Off the clock" />
        <p className="section-lede">Gym, trails, a new game, and a very loud cat.</p>

        <ul className="bento">
          {TILES.map((t) => {
            const Icon = t.icon
            const photo = Boolean(t.img)
            return (
              <li
                key={t.id}
                className={`cp-card bento-tile bento-${t.id}${photo ? ' has-photo' : ` art-${t.art}`}`}
              >
                {photo && (
                  <img
                    src={t.img}
                    alt={t.imgAlt ?? ''}
                    className="bento-tile__img"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                {!photo && t.art === 'diagram' && <Diagram />}
                {!photo && t.art !== 'diagram' && (
                  <Icon className="bento-tile__glyph" strokeWidth={1.25} aria-hidden />
                )}

                <div className="bento-tile__text">
                  <span className="bento-tile__kicker">
                    <Icon size={14} aria-hidden /> {t.kicker}
                  </span>
                  <h3 className="bento-tile__label">{t.label}</h3>
                  <p>{t.copy}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
