import { useEffect } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import OffGrid from './sections/OffGrid'
import Contact from './sections/Contact'

export default function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
  }, [])

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

      <Navbar />

      <div className="animate-app-pop">
        <main>
          <Hero />
          <Experience />
          <About />
          <Projects />
          <Skills />
          <OffGrid />
          <Contact />
        </main>
      </div>
    </>
  )
}
