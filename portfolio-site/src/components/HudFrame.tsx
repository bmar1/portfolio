import type { ReactNode, CSSProperties } from 'react'

type LedTone = 'cyan' | 'magenta' | 'amber'

interface HudFrameProps {
  children: ReactNode
  label?: string
  ledTone?: LedTone
  meta?: string
  tone?: 'cyan' | 'magenta'
  className?: string
  style?: CSSProperties
  innerClassName?: string
  innerStyle?: CSSProperties
}

/**
 * HudFrame
 * Wraps content in four neon corner-brackets with an optional label header.
 * Used by hero readout, project terminals, and the GitHub chart per the
 * cyberpunk-lean-redesign plan.
 */
export default function HudFrame({
  children,
  label,
  ledTone = 'cyan',
  meta,
  tone = 'cyan',
  className = '',
  style,
  innerClassName = '',
  innerStyle,
}: HudFrameProps) {
  const ledClass =
    ledTone === 'magenta' ? 'led is-magenta' : ledTone === 'amber' ? 'led is-amber' : 'led'

  return (
    <div
      className={`hud-frame ${tone === 'magenta' ? 'is-magenta' : ''} ${className}`}
      style={style}
    >
      <span className="hud-bracket tl" aria-hidden />
      <span className="hud-bracket tr" aria-hidden />
      <span className="hud-bracket bl" aria-hidden />
      <span className="hud-bracket br" aria-hidden />

      {label && (
        <div
          className="hud-label"
          style={{
            position: 'absolute',
            top: -10,
            left: 12,
            zIndex: 4,
          }}
        >
          <span className={ledClass} aria-hidden />
          <span>{label}</span>
          {meta && (
            <span style={{ color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>
              {meta}
            </span>
          )}
        </div>
      )}

      <div className={innerClassName} style={innerStyle}>
        {children}
      </div>
    </div>
  )
}
