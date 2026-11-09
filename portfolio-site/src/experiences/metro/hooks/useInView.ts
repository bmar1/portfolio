import { useEffect, useRef, useState } from 'react'

/**
 * One-shot "has this element been scrolled into view" flag. Used to gate
 * the split-flap reveal animation so it fires once, the first time a stop
 * enters the viewport, rather than re-triggering on every scroll pass.
 */
export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3, ...options },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return [ref, inView] as const
}
