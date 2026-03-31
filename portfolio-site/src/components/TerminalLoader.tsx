import { useEffect, useState } from 'react'

const BOOT_SEQUENCE = [
  'Initializing kernel...',
  'Loading core modules... [OK]',
  'Mounting virtual DOM...',
  'Resolving dependencies... [OK]',
  'Establishing secure connection...',
  'Fetching site configuration...',
  'Boot sequence complete. Welcome.'
]

export default function TerminalLoader({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([])
  const [isFadingOut, setIsFadingOut] = useState(false)

  useEffect(() => {
    let currentLine = 0
    
    // Quick typing effect for each line
    const interval = setInterval(() => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setLines(prev => [...prev, BOOT_SEQUENCE[currentLine]])
        currentLine++
      } else {
        clearInterval(interval)
        
        // Wait a beat before fading out
        setTimeout(() => {
          setIsFadingOut(true)
          
          // Actually unmount after fade
          setTimeout(() => {
            onComplete()
          }, 600)
        }, 800)
      }
    }, 250) // Speed between lines

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div 
      className={`fixed inset-0 z-[999] bg-[#0d1117] flex flex-col justify-end p-8 sm:p-12 transition-opacity duration-500 ${isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <div className="max-w-3xl w-full mx-auto space-y-2 text-sm sm:text-base mb-12">
        {lines.map((line, i) => (
          <div 
            key={i} 
            className="text-[var(--color-text-secondary)]"
            style={{ 
              color: i === BOOT_SEQUENCE.length - 1 ? 'var(--color-accent-cyan)' : 'var(--color-text-secondary)',
              textShadow: i === BOOT_SEQUENCE.length - 1 ? '0 0 8px rgba(57, 208, 216, 0.4)' : 'none'
            }}
          >
            <span className="text-[var(--color-accent-violet)] mr-2">&gt;</span>
            {line}
          </div>
        ))}
        {!isFadingOut && lines.length < BOOT_SEQUENCE.length && (
           <div className="text-[var(--color-accent-cyan)] cursor-blink ml-4 mt-2">_</div>
        )}
      </div>
    </div>
  )
}
