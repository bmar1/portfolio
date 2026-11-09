import { useEffect, useState } from 'react'

/**
 * Every pinned/horizontal GSAP scene in this direction needs to know, at
 * setup time, whether it should wire ScrollTrigger at all. Below 768px we
 * skip pin/scrub entirely and render the explicit stacked fallback instead.
 * This hook exists so each scene can read that decision reactively (so a
 * resize across the breakpoint, e.g. rotating a tablet, re-evaluates it).
 */
export function useDesktopMedia(breakpoint = 768) {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === 'undefined') return true
    return window.matchMedia(`(min-width: ${breakpoint}px)`).matches
  })

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${breakpoint}px)`)
    const onChange = () => setIsDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [breakpoint])

  return isDesktop
}
