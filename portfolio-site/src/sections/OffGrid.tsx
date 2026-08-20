import { Dumbbell, Gamepad2, Apple, Waypoints, Leaf, Cat } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'

const INTERESTS = [
  { icon: Dumbbell, label: 'Gym', desc: 'Lifting heavy things, consistently.' },
  { icon: Gamepad2, label: 'Games', desc: 'Strategy and story-driven.' },
  { icon: Apple, label: 'Eating clean', desc: 'Protein goals, minimal fuss.' },
  { icon: Waypoints, label: 'System design', desc: 'Distributed systems, for fun.' },
  { icon: Leaf, label: 'Nature', desc: 'A good break from screens.' },
  { icon: Cat, label: 'Cats', desc: 'I have one. He runs the household.' },
]

export default function OffGrid() {
  return (
    <section id="offgrid" className="section relative" style={{ paddingTop: '4rem' }}>
      <div className="photo-bed" style={{ opacity: 0.32, zIndex: -1 }} aria-hidden>
        <img
          src="/assets/cyberpunk_ambient_offgrid_1774920533369.png"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg-base))' }}
        />
      </div>

      <div className="container relative z-10">
        <SectionReveal>
          <span
            className="text-mono block mb-3"
            style={{
              color: 'var(--color-neon-cyan)',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontSize: '0.72rem',
            }}
          >
            <span style={{ color: 'var(--color-text-muted)' }}>[</span>
            {' '}OFF_GRID{' '}
            <span style={{ color: 'var(--color-neon-magenta)' }}>// 05</span>
            {' '}
            <span style={{ color: 'var(--color-text-muted)' }}>]</span>
          </span>
          <h2 className="text-h2" style={{ color: 'var(--color-text-primary)' }}>
            off the clock
            <span style={{ color: 'var(--color-neon-magenta)' }}>_</span>
          </h2>
          <p className="text-body mt-4" style={{ color: 'var(--color-text-secondary)', maxWidth: '44ch' }}>
            Gym, trails, a new game, and a very loud cat.
          </p>
        </SectionReveal>

        {/* Bento — photo anchors a 6-tile asymmetric grid */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <SectionReveal duration={600} className="col-span-2 row-span-2">
            <div
              className="relative overflow-hidden w-full h-full"
              style={{
                minHeight: 340,
                clipPath: 'var(--clip-corner-lg)',
                boxShadow:
                  'inset 0 0 0 1px var(--color-neon-cyan), 0 0 40px rgba(0,0,0,0.5), 0 0 32px var(--color-glow-magenta-soft)',
              }}
            >
              <img
                src="/assets/personal_hero.jpg"
                alt="Bilal holding his cat"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
                style={{ position: 'absolute', inset: 0 }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(8,12,16,0.85) 0%, transparent 45%)' }}
              />
              <span
                className="text-mono absolute bottom-4 left-5 z-10"
                style={{ color: 'var(--color-neon-cyan)', fontSize: '0.68rem', letterSpacing: '0.14em' }}
              >
                &gt; HOUSEHOLD_MANAGER.jpg
              </span>
            </div>
          </SectionReveal>

          {INTERESTS.map((interest, i) => (
            <SectionReveal key={interest.label} delay={100 + i * 50} direction="up">
              <div
                className="flex flex-col gap-2 px-5 py-5 h-full"
                style={{
                  background: 'rgba(13, 17, 23, 0.6)',
                  clipPath: 'var(--clip-corner-sm)',
                  boxShadow: 'inset 0 0 0 1px var(--color-border)',
                  minHeight: 128,
                }}
              >
                <interest.icon
                  size={18}
                  style={{ color: i % 2 ? 'var(--color-neon-cyan)' : 'var(--color-neon-magenta)' }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                >
                  {interest.label}
                </span>
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  {interest.desc}
                </span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
