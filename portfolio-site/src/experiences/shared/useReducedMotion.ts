import { useEffect, useState } from 'react'

/**
 * Mirrors framer-motion's useReducedMotion but with no dependency on it,
 * since the lab wing deliberately keeps its own animation stack (GSAP + ogl)
 * separate from the main site's framer-motion tree.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}
