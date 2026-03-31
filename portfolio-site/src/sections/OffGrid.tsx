import { Dumbbell, Gamepad2, Apple, Waypoints, Leaf, Cat } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'

const INTERESTS = [
  {
    icon: Dumbbell,
    label: 'Gym',
    desc: 'Trying to stay active and lift heavy things.',
  },
  {
    icon: Gamepad2,
    label: 'Video Games',
    desc: 'Always down for a good strategy or story-driven game.',
  },
  {
    icon: Apple,
    label: 'Eating Clean',
    desc: 'Trying to hit my protein goals without overthinking it.',
  },
  {
    icon: Waypoints,
    label: 'System Design',
    desc: 'I find distributed systems genuinely interesting.',
  },
  {
    icon: Leaf,
    label: 'Nature',
    desc: 'Good for the soul and a great break from screens.',
  },
  {
    icon: Cat,
    label: 'Cats',
    desc: 'I have one, and yes, he runs the household.',
  },
]

export default function OffGrid() {
  return (
    <section id="offgrid" className="section relative" style={{ paddingTop: '4rem' }}>
      {/* Ambient background */}
      <div className="absolute inset-0 z-[-1] pointer-events-none" style={{ opacity: 0.15 }}>
        <img
          src="/assets/cyberpunk_ambient_offgrid_1774920533369.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent, var(--color-bg-base))' }}
        />
      </div>
      <div className="container relative z-10">
        {/* Section label */}
        <SectionReveal delay={200}>
          <h2 
            className="text-h2 mb-10" 
            style={{ color: 'var(--color-text-primary)' }}
          >
            off the clock
            <span style={{ color: 'var(--color-accent-violet)' }}>.</span>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column — Vertical Hero Image Bento Box */}
          <div className="lg:col-span-4 h-full">
            <SectionReveal duration={600}>
              <div
                className="relative overflow-hidden rounded-3xl w-full"
                style={{
                  aspectRatio: '9/16',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 0 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(158, 124, 255, 0.15)',
                }}
              >
                <img
                  src="/assets/personal_hero.jpg"
                  alt="A glimpse of life outside code"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(8, 12, 16, 0.8) 0%, transparent 40%)',
                  }}
                />
              </div>
            </SectionReveal>
          </div>

          {/* Right Column — Prose & Original Cards Layout */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left — Prose */}
              <SectionReveal delay={300}>
                <p
                  className="text-body"
                  style={{
                    color: 'var(--color-text-secondary)',
                    maxWidth: '480px',
                    lineHeight: 1.75,
                  }}
                >
                  Outside of code, I try to keep a balance. You'll usually find me staying active at the gym 
                  or cooking up something relatively healthy. When I'm not thinking about side projects or 
                  debugging, I'm probably exploring a trail somewhere, getting hooked on a new video game, 
                  or just hanging out with my cat.
                </p>
              </SectionReveal>

              {/* Right — Top 3 Interest cards */}
              <div className="flex flex-col gap-3">
                {INTERESTS.slice(0, 3).map((interest, i) => (
                  <SectionReveal key={interest.label} delay={400 + i * 40}>
                    <div
                      className="flex items-start gap-4 px-5 py-4 rounded-lg"
                      style={{
                        background: 'rgba(13, 17, 23, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.03)'
                      }}
                    >
                      <interest.icon
                        size={18}
                        style={{ color: 'var(--color-accent-violet)', marginTop: '2px', flexShrink: 0 }}
                      />
                      <div>
                        <span
                          className="text-sm font-medium block"
                          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                        >
                          {interest.label}
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {interest.desc}
                        </span>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>

            {/* Bottom Row — Remaining Interest cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {INTERESTS.slice(3).map((interest, i) => (
                <SectionReveal key={interest.label} delay={520 + i * 40} direction="up">
                  <div
                    className="flex items-start gap-4 px-5 py-4 rounded-lg h-full"
                    style={{
                      background: 'rgba(13, 17, 23, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.03)'
                    }}
                  >
                    <interest.icon
                      size={18}
                      style={{ color: 'var(--color-accent-violet)', marginTop: '2px', flexShrink: 0 }}
                    />
                    <div>
                      <span
                        className="text-sm font-medium block"
                        style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}
                      >
                        {interest.label}
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {interest.desc}
                      </span>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
