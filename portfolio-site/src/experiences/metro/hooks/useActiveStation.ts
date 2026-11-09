import { useEffect, useState } from 'react'

/**
 * Center-biased IntersectionObserver, not a scroll listener: picks whichever
 * observed station section has the most overlap with the middle band of the
 * viewport. Used to light up the current stop on the line nav.
 */
export function useActiveStation(ids: string[]): string {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
