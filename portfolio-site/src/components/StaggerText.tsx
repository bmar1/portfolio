import { useEffect, useRef, useState } from 'react'

interface StaggerTextProps {
  text: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delayBetween?: number
  initialDelay?: number
}

export default function StaggerText({
  text,
  className = '',
  tag: Tag = 'h1',
  delayBetween = 50,
  initialDelay = 0,
}: StaggerTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const words = text.split(' ')

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) ${initialDelay + i * delayBetween}ms, transform 400ms cubic-bezier(0.23, 1, 0.32, 1) ${initialDelay + i * delayBetween}ms`,
            willChange: 'opacity, transform',
          }}
        >
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}
