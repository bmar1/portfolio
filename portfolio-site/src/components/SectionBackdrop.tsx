import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../utils/motion'

type Props = {
  /** Omit both src and scene for an ambient-only bed: tone glow plus a grid the cursor uncovers. */
  src?: string
  /** Drawn backdrop, shaded like a photo. */
  scene?: React.ReactNode
  /** How much of the photo shows through at rest, 0 to 1. */
  dim?: number
  position?: string
  tone?: 'yellow' | 'magenta' | 'cyan'
}

/**
 * Layer behind a section. On fine pointers the cursor acts as a flashlight:
 * it thins the shade over a photo, or uncovers the grid on an ambient bed.
 * The listener sits on the parent section because the bed ignores pointer
 * events.
 */
export default function SectionBackdrop({ src, scene, dim = 0.4, position = 'center', tone = 'yellow' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bed = ref.current
    const host = bed?.parentElement
    if (!bed || !host) return
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return

    let raf = 0
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = host.getBoundingClientRect()
        bed.style.setProperty('--mx', `${e.clientX - r.left}px`)
        bed.style.setProperty('--my', `${e.clientY - r.top}px`)
        bed.classList.add('is-lit')
      })
    }
    const leave = () => bed.classList.remove('is-lit')

    host.addEventListener('pointermove', move)
    host.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={`photo-bed backdrop tone-${tone}${src || scene ? '' : ' is-ambient'}`}
      style={{ '--shade': 1 - dim } as React.CSSProperties}
      aria-hidden
    >
      {scene ? (
        <>
          <div className="backdrop__scene">{scene}</div>
          <div className="backdrop__shade" />
        </>
      ) : src ? (
        <>
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            className="backdrop__img"
            style={{ objectPosition: position }}
          />
          <div className="backdrop__shade" />
        </>
      ) : (
        <>
          <div className="backdrop__glow" />
          <div className="backdrop__grid" />
        </>
      )}
      <div className="backdrop__wash" />
    </div>
  )
}
