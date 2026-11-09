import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, setupGsap } from './gsapSetup'
import { useReducedMotion } from './useReducedMotion'

let activeLenis: Lenis | null = null

/**
 * One Lenis instance per experience route (they are mutually exclusive,
 * never mounted together). Driven by GSAP's own ticker, which is the
 * canonical Lenis + ScrollTrigger pairing: Lenis smooths the wheel/touch
 * input, ScrollTrigger reads the smoothed position on every Lenis "scroll"
 * event, so pinned scenes stay in lockstep with what the user sees.
 */
export function useLenis() {
  const reduced = useReducedMotion()

  useEffect(() => {
    setupGsap()
    if (reduced) return

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false })
    activeLenis = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      activeLenis = null
    }
  }, [reduced])
}

export function getActiveLenis() {
  return activeLenis
}
