import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../shared/useReducedMotion'

/**
 * Parses strings like "120+", "86%", "<30s", "2+ hrs". Returns null for
 * strings with no digits at all ("WIP"), which we render as-is, static.
 */
function parseValue(raw: string) {
  const match = raw.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return null
  const [, prefix, num, suffix] = match
  return { prefix, num: Number.parseFloat(num), suffix, isInt: !num.includes('.') }
}

export interface CountUpValueProps {
  value: string
  className?: string
}

/**
 * Self-contained count-up readout. Triggers once, the moment it enters the
 * viewport (IntersectionObserver), independent of any ScrollTrigger pin, so
 * it works the same whether it sits inside a pinned horizontal track, a
 * scrubbed vertical scene, or a plain stacked mobile fallback.
 */
export default function CountUpValue({ value, className }: CountUpValueProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()
  const parsed = parseValue(value)
  const [display, setDisplay] = useState(reduced || !parsed ? value : `${parsed.prefix}0${parsed.suffix}`)
  const fired = useRef(false)

  useEffect(() => {
    if (reduced || !parsed) return
    const el = ref.current
    if (!el) return
    const { prefix, suffix, num: target, isInt } = parsed
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired.current) return
        fired.current = true
        const duration = 900
        const start = performance.now()
        function tick(now: number) {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - (1 - t) ** 3
          const current = target * eased
          const numStr = isInt ? Math.round(current).toString() : current.toFixed(1)
          setDisplay(`${prefix}${numStr}${suffix}`)
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
