import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { prefersReducedMotion } from './utils/motion'
import BootSequence from './components/BootSequence'
import { shouldBoot } from './utils/boot'
import SectorRail from './components/SectorRail'
import Hero from './sections/Hero'
import Experience from './sections/Experience'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import OffGrid from './sections/OffGrid'
import Contact from './sections/Contact'

export default function App() {
  // Decided once, before first paint, so the hero does not flash behind boot.
  const [booting, setBooting] = useState(shouldBoot)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

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
        <Experience />
        <About />
        <Projects />
        <Skills />
        <OffGrid />
        <Contact />
      </main>
    </>
  )
}
