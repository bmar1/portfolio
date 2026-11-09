import { useEffect, useState } from 'react'
import BootSequence from './components/BootSequence'
import { shouldBoot } from './utils/boot'
import SectorRail from './components/SectorRail'
import SectorGate from './components/SectorGate'
import Hero from './sections/Hero'
import Experience from './sections/Experience'
import About from './sections/About'
import Projects from './sections/Projects'
import Leadership from './sections/Leadership'
import Skills from './sections/Skills'
import OffGrid from './sections/OffGrid'
import Contact from './sections/Contact'

export default function App() {
  // Decided once, before first paint, so the hero does not flash behind boot.
  const [booting, setBooting] = useState(shouldBoot)

  // Nothing scrolls while the boot screen owns the viewport.
  useEffect(() => {
    document.body.style.overflow = booting ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [booting])

  return (
    <>
      {booting && <BootSequence onDone={() => setBooting(false)} />}

      <SectorRail />

      <main>
        <Hero bootDone={!booting} />
        <SectorGate index="02" label="About" district="Heywood" tone="cyan" />
        <About />
        <SectorGate index="01" label="Experience" district="City Center" tone="cyan" />
        <Experience />
        <SectorGate index="03" label="Projects" district="Watson" />
        <Projects />
        <SectorGate index="07" label="Leadership" district="Santo Domingo" tone="magenta" />
        <Leadership />
        <SectorGate index="04" label="Stack" district="Kabuki" />
        <Skills />
        <SectorGate index="05" label="Off the clock" district="Badlands" tone="cyan" />
        <OffGrid />
        <SectorGate index="06" label="Contact" district="Afterlife" tone="magenta" />
        <Contact />
      </main>
    </>
  )
}
