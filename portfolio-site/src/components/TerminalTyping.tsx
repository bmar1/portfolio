import { useEffect, useState } from 'react'

interface TerminalTypingProps {
  text?: string
  className?: string
  typingSpeed?: number
  onComplete?: () => void
}

export default function TerminalTyping({
  text = '> bilal@portfolio ~ $',
  className = '',
  typingSpeed = 60,
  onComplete,
}: TerminalTypingProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setIsComplete(true)
        onComplete?.()
        // Stop cursor blink after 2s
        setTimeout(() => setShowCursor(false), 2000)
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [text, typingSpeed, onComplete])

  return (
    <span
      className={className}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        color: isComplete ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
        transition: 'color 600ms ease',
        letterSpacing: '0.02em',
      }}
    >
      {displayedText}
      {showCursor && (
        <span className="cursor-blink" style={{ color: 'var(--color-accent-cyan)' }}>
          |
        </span>
      )}
    </span>
  )
}
