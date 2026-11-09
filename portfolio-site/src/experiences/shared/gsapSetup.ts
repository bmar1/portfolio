import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

/**
 * Call once per experience root. Keeps ScrollTrigger's scroll reads in sync
 * with Lenis's smoothed value via the `scrollerProxy`-free approach: Lenis
 * dispatches native scroll events, so ScrollTrigger.update() on Lenis's
 * "scroll" callback is enough, no custom proxy required.
 */
export function setupGsap() {
  if (registered) return gsap
  gsap.registerPlugin(ScrollTrigger)
  registered = true
  return gsap
}

export { gsap, ScrollTrigger }
