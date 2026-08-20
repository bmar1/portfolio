import type { CSSProperties } from 'react'
import { createElement } from 'react'

type Tag = 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'div'

interface GlitchTextProps {
  text: string
  as?: Tag
  className?: string
  style?: CSSProperties
}

/**
 * GlitchText
 * Renders text that runs a short cyan/magenta channel-split snap on hover/focus.
 * Uses data-text attribute so ::before/::after pseudo-layers can mirror the
 * content without duplicating it in the DOM tree.
 *
 * Restraint: used only on the hero headline — seen once per session load.
 * Deliberately not used on nav links, which render/hover far too often for
 * a glitch snap to read as delight rather than noise.
 */
export default function GlitchText({
  text,
  as = 'span',
  className = '',
  style,
}: GlitchTextProps) {
  return createElement(
    as,
    {
      className: `glitch-text ${className}`,
      'data-text': text,
      style,
    },
    text,
  )
}
