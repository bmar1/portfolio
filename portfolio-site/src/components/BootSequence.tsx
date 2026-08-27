import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DecodeText from './DecodeText'
import { SECTORS } from '../constants/sectors'
import { markBooted } from '../utils/boot'

type Line = { label: string; value: string }

/**
 * Real values only. A POST screen that lies about the machine it is running on
 * is just decoration, and the whole point of the readout is that it is true.
 */
function readSystem(): Line[] {
  const lines: Line[] = [
    {
      label: 'display',
      value: `${window.innerWidth}x${window.innerHeight} @${window.devicePixelRatio}x`,
    },
  ]

  const conn = (
    navigator as Navigator & { connection?: { effectiveType?: string } }
  ).connection
  if (conn?.effectiveType) {
    lines.push({ label: 'uplink', value: conn.effectiveType })
  }

  try {
    lines.push({
      label: 'locale',
      value: Intl.DateTimeFormat().resolvedOptions().timeZone,
    })
  } catch {
    // Intl unavailable: omit rather than invent.
  }

  lines.push({ label: 'operator', value: 'BILAL_UMAR' })
  lines.push({ label: 'sectors', value: `${SECTORS.length} routes mapped` })

  return lines
}

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const lines = useMemo(() => readSystem(), [])
  const [visible, setVisible] = useState(0)
  const [exiting, setExiting] = useState(false)

  const finish = useCallback(() => {
    if (exiting) return
    setExiting(true)
    markBooted()
    // Matches the band-tear duration below.
    window.setTimeout(onDone, 420)
  }, [exiting, onDone])

  // POST lines stream in after the name finishes decoding (~1.4s).
  useEffect(() => {
    if (visible >= lines.length) return
    const t = window.setTimeout(
      () => setVisible((n) => n + 1),
      visible === 0 ? 1400 : 190,
    )
    return () => window.clearTimeout(t)
  }, [visible, lines.length])

  // Progress bar fills, then the wipe.
  useEffect(() => {
    if (visible < lines.length) return
    const t = window.setTimeout(finish, 560)
    return () => window.clearTimeout(t)
  }, [visible, lines.length, finish])

  // Any key or click skips.
  useEffect(() => {
    const skip = () => finish()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [finish])

  const pct = Math.round((visible / lines.length) * 100)

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="boot"
          className="fixed inset-0 z-[9999] flex flex-col justify-center gridlines scanlines"
          style={{
            background: 'var(--color-nc-void)',
            padding: 'clamp(2rem, 8vw, 7rem)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Opening scanline sweep */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 h-px"
            style={{
              background: 'var(--color-nc-cyan)',
              boxShadow: '0 0 18px var(--color-nc-cyan)',
            }}
            initial={{ top: 0, opacity: 1 }}
            animate={{ top: '100%', opacity: 0 }}
            transition={{ duration: 0.55, ease: 'linear' }}
          />

          <span
            className="t-mono absolute left-7 top-7"
            style={{ color: 'var(--color-nc-text-dim)', letterSpacing: '0.2em' }}
          >
            NC // NEURAL INTERFACE v2.77
          </span>

          {/* The name. This same string reappears as the hero wordmark. */}
          <DecodeText
            as="h1"
            text="BILAL UMAR"
            delay={380}
            speed={64}
            className="t-hero"
            style={{
              color: 'var(--color-nc-yellow)',
              fontSize: 'clamp(2.2rem, 9vw, 6rem)',
              textShadow: '0 0 24px rgba(252,238,10,0.45)',
              marginBottom: '2rem',
            }}
          />

          {/* POST readout */}
          <div className="relative z-10 max-w-xl" aria-live="polite">
            {lines.slice(0, visible).map((line) => (
              <motion.div
                key={line.label}
                className="t-mono flex gap-3"
                style={{ lineHeight: 2, color: 'var(--color-nc-text-muted)' }}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.22 }}
              >
                <span style={{ color: 'var(--color-nc-yellow)' }}>[OK]</span>
                <span style={{ minWidth: '5.5rem' }}>{line.label}</span>
                <span style={{ color: 'var(--color-nc-text)' }}>{line.value}</span>
              </motion.div>
            ))}
            {visible > 0 && visible < lines.length && (
              <span
                className="blink t-mono"
                style={{ color: 'var(--color-nc-yellow)' }}
                aria-hidden
              >
                ▋
              </span>
            )}
          </div>

          {/* Progress */}
          <div
            className="absolute inset-x-0 bottom-14"
            style={{ padding: '0 clamp(2rem, 8vw, 7rem)' }}
          >
            <div className="mb-2 flex items-center justify-between">
              <span
                className="t-label"
                style={{ color: 'var(--color-nc-text-dim)', fontSize: '0.6rem' }}
              >
                Loading
              </span>
              <span
                className="t-data"
                style={{ color: 'var(--color-nc-yellow)', fontSize: '0.65rem' }}
              >
                {pct}%
              </span>
            </div>
            <div
              className="hazard h-1 w-full origin-left"
              style={{ opacity: 0.25 }}
              aria-hidden
            />
            <motion.div
              className="hazard h-1 origin-left"
              style={{ marginTop: -4 }}
              animate={{ scaleX: visible / lines.length }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              aria-hidden
            />
          </div>

          <button
            type="button"
            onClick={finish}
            className="t-label absolute bottom-6 right-7 px-3 py-1"
            style={{
              color: 'var(--color-nc-text-dim)',
              boxShadow: 'inset 0 0 0 1px var(--color-nc-border)',
              fontSize: '0.6rem',
            }}
          >
            Skip ▷
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
