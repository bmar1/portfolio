import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../shared/useReducedMotion'
import styles from './ScrambleText.module.css'

const GLYPHS = '!@#$%&01_-/\\[]{}<>?*^~;:'

export interface ScrambleTextProps {
  text: string
  className?: string
  /** Keeps scrambling forever instead of resolving. Used for the corrupted
   * Classified recording title. Reduced motion always wins: it shows the
   * static text immediately, never loops. */
  loop?: boolean
}

/**
 * Matrix-style decode-on-load text. Pure requestAnimationFrame, no
 * ScrollTrigger involved (this is a one-shot load animation, not a scroll
 * hijack), so it has nothing to clean up beyond its own raf. The real text
 * is always present for screen readers via aria-label; the animated glyphs
 * are aria-hidden.
 */
export default function ScrambleText({ text, className, loop = false }: ScrambleTextProps) {
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (reduced) return
    let raf = 0
    let timeout = 0
    const length = text.length
    const totalFrames = 26
    let frame = 0

    function renderFrame(revealCount: number) {
      let out = ''
      for (let i = 0; i < length; i += 1) {
        const ch = text[i]
        if (ch === ' ') {
          out += ' '
          continue
        }
        out += i < revealCount ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      return out
    }

    function tick() {
      frame += 1
      if (!loop) {
        const revealCount = Math.floor((frame / totalFrames) * length)
        setDisplay(renderFrame(revealCount))
        if (frame < totalFrames) {
          raf = requestAnimationFrame(tick)
        } else {
          setDisplay(text)
        }
        return
      }
      // Loop mode: never resolves, just keeps flickering glyphs in place.
      setDisplay(renderFrame(0))
      timeout = window.setTimeout(() => {
        raf = requestAnimationFrame(tick)
      }, 90)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(timeout)
    }
  }, [text, reduced, loop])

  return (
    <span className={`${styles.scramble} ${className ?? ''}`} aria-label={text}>
      <span className={styles.glyphs} aria-hidden="true">
        {display}
      </span>
    </span>
  )
}
