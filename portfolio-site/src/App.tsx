import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import OffGrid from './sections/OffGrid'
import Contact from './sections/Contact'
import TerminalLoader from './components/TerminalLoader'

export default function App() {
  const [booting, setBooting] = useState(true)

  useEffect(() => {
    // Only init smooth scroll after boot sequence finishes
    if (booting || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    let rafId = 0

    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [booting])

  return (
    <>
      <style>{`
        @keyframes appPop {
          0% { opacity: 0; transform: scale(0.95); filter: brightness(1) blur(10px); }
          40% { opacity: 1; transform: scale(1.02); filter: brightness(1.5) blur(0px); }
          100% { opacity: 1; transform: scale(1); filter: brightness(1) blur(0px); }
        }
        .animate-app-pop {
          animation: appPop 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {booting && <TerminalLoader onComplete={() => setBooting(false)} />}
      
      {!booting && <Navbar />}

      {/* Hide overflow while booting to prevent early scrolling */}
      <div 
        className={!booting ? "animate-app-pop" : "opacity-0"}
        style={{ 
        height: booting ? '100vh' : 'auto', 
        overflow: booting ? 'hidden' : 'visible'
      }}>
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <OffGrid />
          <Contact />
        </main>
      </div>
    </>
  )
}
