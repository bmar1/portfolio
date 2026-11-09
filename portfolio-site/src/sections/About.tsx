import { useEffect, useRef, useState } from 'react'
import { Maximize2 } from 'lucide-react'
import DecodeText from '../components/DecodeText'
import JackIn from '../components/JackIn'
import SectionBackdrop from '../components/SectionBackdrop'
import SectionHeading from '../components/SectionHeading'
import { PROFILE } from '../content/profile'

export default function About() {
  const portraitRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [seen, setSeen] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const el = portraitRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setSeen(true)
        io.disconnect()
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const openProfile = () => {
    dialogRef.current?.showModal()
    setOpen(true)
  }

  return (
    <section
      id="about"
      className="section reading-section about-section"
      aria-labelledby="about-heading"
    >
      <SectionBackdrop tone="cyan" />

      <div className="container relative z-10">
        <SectionHeading id="about-heading" text="About me" />

        <div className={`about-breach${seen ? ' is-seen' : ''}`}>
          <div ref={portraitRef} className="glitch-portrait cp-chamfer">
            <img src={PROFILE.photo} alt={PROFILE.photoAlt} width={320} height={320} decoding="async" />
            <img src={PROFILE.photo} alt="" className="glitch-portrait__ghost is-c" aria-hidden />
            <img src={PROFILE.photo} alt="" className="glitch-portrait__ghost is-m" aria-hidden />
            <span className="glitch-portrait__tag" aria-hidden>ID // {PROFILE.handle}</span>
          </div>

          <div className="about-intro">
            <p className="about-intro__status">
              <span className="led led-online" aria-hidden /> {PROFILE.status}
            </p>
            <DecodeText
              as="p"
              className="about-intro__line"
              text={PROFILE.lifePath.title}
              run={seen}
              delay={250}
              speed={38}
            />
            <p className="about-intro__copy">{PROFILE.bio[0].text}</p>
            <p className="about-intro__copy is-dim">{PROFILE.lifePath.text}</p>

            <dl className="about-facts">
              {PROFILE.facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>

            <button type="button" className="btn btn-primary about-jack" onClick={openProfile}>
              <Maximize2 size={16} aria-hidden /> Jack into my profile
            </button>
            <p className="about-jack__hint">Opens my attribute matrix: what I'm good at, and why.</p>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="takeover"
        aria-label={`${PROFILE.name}, full profile`}
        onClose={() => setOpen(false)}
      >
        {open && <JackIn onClose={() => dialogRef.current?.close()} />}
      </dialog>
    </section>
  )
}
