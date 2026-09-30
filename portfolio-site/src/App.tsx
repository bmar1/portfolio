import { useEffect, useState } from 'react'
import BootSequence from './components/BootSequence'
import { shouldBoot } from './utils/boot'
import SectorRail from './components/SectorRail'
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
        <About />
        <Projects />
        <Experience />
        <Leadership />
        <Skills />
        <OffGrid />
        <Contact />
      </main>
    </>
  )
}
