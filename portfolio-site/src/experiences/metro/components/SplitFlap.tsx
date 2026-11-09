import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../shared/useReducedMotion'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789./-: '

export interface SplitFlapProps {
  text: string
  active: boolean
  className?: string
  /** Stagger start, in ms. Lets a board reveal row by row. */
  delay?: number
}

/**
 * Departures-board text reveal: scrambles through random glyphs then locks
 * each character in, left to right. One-shot, triggered by `active` (driven
 * by useInView upstream). Degrades to the plain final string immediately
 * under prefers-reduced-motion, so no motion-sick flicker is ever forced.
 */
export default function SplitFlap({ text, active, className, delay = 0 }: SplitFlapProps) {
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState('')
  const played = useRef(false)

  useEffect(() => {
    if (reduced || !active || played.current) return
    played.current = true

    let frame = 0
    const totalFrames = 16
    let raf = 0
    const timeout = window.setTimeout(() => {
      function tick() {
        frame += 1
        const revealCount = Math.ceil((frame / totalFrames) * text.length)
        const next = text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i < revealCount) return ch
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
        setDisplay(next)
        if (frame < totalFrames) {
          raf = requestAnimationFrame(tick)
        } else {
          setDisplay(text)
        }
      }
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => {
      window.clearTimeout(timeout)
      cancelAnimationFrame(raf)
    }
  }, [active, delay, reduced, text])

  if (reduced) {
    return (
      <span className={className} aria-label={text}>
        {text}
      </span>
    )
  }

  return (
    <span className={className} aria-label={text}>
      {display || '\u00A0'}
    </span>
  )
}
