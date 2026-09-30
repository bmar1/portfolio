import { useEffect, useRef, useState } from 'react'
import DecodeText from './DecodeText'

export default function SectionHeading({ id, text }: { id: string; text: string }) {
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
      { threshold: 0.6 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref}>
      <DecodeText as="h2" id={id} text={text} run={seen} speed={34} className="reading-heading" />
    </div>
  )
}
