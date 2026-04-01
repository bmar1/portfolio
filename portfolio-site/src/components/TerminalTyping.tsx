import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/** Verbose boot log — reads like a system coming online */
const BOOT_LINES = [
  'PORTFOLIO_SYS v1.0.0 — secure boot',
  '[0.000] INIT_MEMORY .......................... [ OK ]',
  '[0.001] LOAD_KERNEL (darwin-amd64) ........... [ OK ]',
  '[0.002] MOUNT_VFS portfolio:// ............... [ OK ]',
  '[0.003] TLS_HANDSHAKE .......................... [ OK ]',
  '[0.004] VERIFY_CERT chain=portfolio .......... [ OK ]',
  '[0.005] SYNC_CLOCK ntp=pool.ntp.org .......... [ OK ]',
  '[0.006] LOAD_MODULES ui,render,api ........... [ OK ]',
  '[0.007] NET_UP eth0 ............................ [ OK ]',
  '[0.008] ROUTE_ADD default gw=/hero ........... [ OK ]',
  '[0.009] SESSION_NEGOTIATE .................... [ OK ]',
  '[0.010] VERIFY_CREDENTIALS ................... [ OK ]',
] as const

const ACCESS_LINE = 'ACCESS GRANTED — routing to /hero'

interface TerminalTypingProps {
  prompt?: string
  className?: string
  typingSpeed?: number
  onComplete?: () => void
  onAccessGranted?: () => void
}

export default function TerminalTyping({
  prompt = '> bilal@portfolio ~ $',
  className = '',
  typingSpeed = 48,
  onComplete,
  onAccessGranted,
}: TerminalTypingProps) {
  const reduceMotion = useReducedMotion()
  const [bootLines, setBootLines] = useState<string[]>([])
  const [phase, setPhase] = useState<'boot' | 'access' | 'prompt' | 'done'>('boot')
  const [displayedPrompt, setDisplayedPrompt] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  const onCompleteRef = useRef(onComplete)
  const onAccessGrantedRef = useRef(onAccessGranted)
  onCompleteRef.current = onComplete
  onAccessGrantedRef.current = onAccessGranted

  const accessFired = useRef(false)

  useEffect(() => {
    let cancelled = false
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

    async function run() {
      if (reduceMotion) {
        setBootLines([...BOOT_LINES])
        setDisplayedPrompt(prompt)
        setPhase('done')
        if (!accessFired.current) {
          accessFired.current = true
          onAccessGrantedRef.current?.()
        }
        onCompleteRef.current?.()
        setTimeout(() => setShowCursor(false), 1800)
        return
      }

      for (const line of BOOT_LINES) {
        if (cancelled) return
        setBootLines((prev) => [...prev, line])
        await wait(72 + Math.random() * 48)
      }

      if (cancelled) return
      setPhase('access')
      if (!accessFired.current) {
        accessFired.current = true
        onAccessGrantedRef.current?.()
      }

      await wait(380)

      if (cancelled) return
      setPhase('prompt')

      for (let i = 0; i < prompt.length; i++) {
        if (cancelled) return
        setDisplayedPrompt(prompt.slice(0, i + 1))
        await wait(typingSpeed)
      }

      if (cancelled) return
      setPhase('done')
      onCompleteRef.current?.()
      setTimeout(() => setShowCursor(false), 2000)
    }

    run()
    return () => {
      cancelled = true
    }
  }, [reduceMotion, prompt, typingSpeed])

  return (
    <div
      className={`terminal-boot w-full max-w-[min(100%,42rem)] ${className}`}
      aria-live="polite"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 rounded-t-md border border-b-0 px-3 py-2 sm:px-4"
        style={{
          borderColor: 'var(--color-border)',
          background: 'var(--color-bg-elevated)',
        }}
      >
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span
          className="ml-2 flex-1 truncate text-center text-[0.65rem] tracking-wide sm:text-[0.7rem]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          bilal@portfolio — zsh — 80×24
        </span>
      </div>

      <div
        className="rounded-b-md border px-3 py-3 sm:px-4 sm:py-4"
        style={{
          borderColor: 'var(--color-border)',
          background: 'rgba(5, 8, 12, 0.92)',
          boxShadow:
            'inset 0 0 0 1px rgba(57, 208, 216, 0.07), 0 12px 40px rgba(0,0,0,0.45)',
        }}
      >
        <div className="space-y-0.5 text-[0.68rem] leading-snug tracking-wide sm:text-[0.76rem]">
          {bootLines.map((line, i) => (
            <motion.div
              key={`${line}-${i}`}
              initial={reduceMotion ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              style={{ color: 'var(--color-text-muted)' }}
            >
              {line}
            </motion.div>
          ))}

          {phase !== 'boot' && (
            <motion.div
              className="pt-1.5"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      scale: 0.86,
                      filter: 'blur(5px)',
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
              }}
              transition={{
                type: 'spring',
                stiffness: 560,
                damping: 19,
                mass: 0.55,
              }}
              style={{
                color: 'var(--color-accent-cyan)',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textShadow:
                  '0 0 14px rgba(57, 208, 216, 0.5), 0 0 32px rgba(57, 208, 216, 0.22)',
              }}
            >
              {ACCESS_LINE}
            </motion.div>
          )}

          {(phase === 'prompt' || phase === 'done') && (
            <div
              className="pt-2.5"
              style={{
                color:
                  phase === 'done'
                    ? 'var(--color-text-muted)'
                    : 'var(--color-text-secondary)',
                transition: 'color 500ms ease',
              }}
            >
              {displayedPrompt}
              {showCursor && (
                <span
                  className="cursor-blink"
                  style={{ color: 'var(--color-accent-cyan)' }}
                >
                  |
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
