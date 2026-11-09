import type Lenis from 'lenis'

/**
 * The breach-protocol hex-grid nav maps hex pairs to sections, the way the
 * in-game minigame maps a grid of hex values to buffer slots. Picking a pair
 * jumps the "cursor" (scroll position) to that daemon.
 */
export interface BreachSection {
  id: string
  hex: string
  label: string
}

export const SECTIONS: BreachSection[] = [
  { id: 'access', hex: '1C', label: 'ACCESS POINT' },
  { id: 'identity', hex: 'BD', label: 'IDENTITY.exe' },
  { id: 'processes', hex: '7A', label: 'ACTIVE_PROCESSES' },
  { id: 'uploads', hex: 'E9', label: 'UPLOAD_LOG' },
  { id: 'network', hex: '4F', label: 'NETWORK_REACH' },
  { id: 'quickhacks', hex: '55', label: 'QUICKHACKS' },
  { id: 'uplink', hex: 'FF', label: 'UPLINK' },
]

/** Smooth-jumps to a section, using the shared Lenis instance when it is
 * running (desktop, motion allowed) and falling back to native scroll
 * under reduced motion or if Lenis never mounted. */
export function jumpTo(id: string, getActiveLenis: () => Lenis | null) {
  const el = document.getElementById(id)
  if (!el) return
  const lenis = getActiveLenis()
  if (lenis) {
    lenis.scrollTo(el, { offset: 0, duration: 1.1 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
