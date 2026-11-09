import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight IntersectionObserver hook for non-scrubbed reveals (sections
 * that just need to fade/slide in once, no pin, no ScrollTrigger). Keeps
 * those sections off the GSAP/ScrollTrigger machinery entirely, which is
 * the right call per the taste skill's "save GSAP for actual pin/scrub
 * work" guidance.
 */
export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])

  return { ref, inView }
}
