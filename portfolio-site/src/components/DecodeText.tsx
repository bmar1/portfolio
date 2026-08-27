import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../utils/motion'

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________'

type Props = {
  text: string
  /** Start the decode. Flip to true when the element scrolls into view. */
  run?: boolean
  /** ms before the first character settles */
  delay?: number
  /** ms each character spends scrambling before it locks */
  speed?: number
  className?: string
  style?: React.CSSProperties
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'
}

/**
 * Left-to-right glyph scramble. Characters resolve in order, each cycling
 * through GLYPHS until its lock time passes.
 *
 * Replaces GlitchText + StaggerText: one effect covers both the boot decode
 * and the section headings.
 */
export default function DecodeText({
  text,
  run = true,
  delay = 0,
  speed = 42,
  className,
  style,
  as: Tag = 'span',
}: Props) {
  const reduce = prefersReducedMotion()

  const [output, setOutput] = useState('')
  const frame = useRef(0)

  // When the decode is not running, the settled text IS the output. Deriving
  // it here keeps the effect purely about the animation.
  const animating = run && !reduce
  const display = animating ? output : text

  useEffect(() => {
    if (!animating) return

    let raf = 0
    const start = performance.now() + delay

    const tick = (now: number) => {
      const elapsed = now - start
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick)
        return
      }

      let done = true
      let next = ''

      for (let i = 0; i < text.length; i++) {
        const lockAt = i * speed
        if (text[i] === ' ') {
          next += ' '
        } else if (elapsed >= lockAt + speed) {
          next += text[i]
        } else if (elapsed >= lockAt - speed * 6) {
          next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          done = false
        } else {
          done = false
        }
      }

      setOutput(next)
      frame.current++
      if (!done) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [text, animating, delay, speed])

  return (
    <Tag className={className} style={style} aria-label={text}>
      <span aria-hidden>{display}</span>
    </Tag>
  )
}
