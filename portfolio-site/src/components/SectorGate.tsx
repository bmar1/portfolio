import { useEffect, useRef, useState } from 'react'
import DecodeText from './DecodeText'

type Props = {
  index: string
  label: string
  district: string
  tone?: 'yellow' | 'magenta' | 'cyan'
}

/** Divider between sections. A packet runs the rule once as it scrolls in. */
export default function SectorGate({ index, label, district, tone = 'yellow' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [seen, setSeen] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        setSeen(true)
        io.disconnect()
      },
      { threshold: 1 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`sector-gate tone-${tone}${seen ? ' is-seen' : ''}`} aria-hidden>
      <span className="sector-gate__idx">{index}</span>
      <span className="sector-gate__rule">
        <span className="sector-gate__packet" />
      </span>
      <DecodeText className="sector-gate__label" text={`Entering ${label}`} run={seen} speed={22} />
      <span className="sector-gate__district">{district}</span>
    </div>
  )
}
