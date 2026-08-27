import { SECTORS, type Sector } from '../constants/sectors.ts'
import { getScrollBehavior } from './motion.ts'

export interface ParsedCommand {
  name: string
  args: string[]
  flags: Record<string, string | true>
}

/**
 * Minimal shell-ish tokenizer. Handles `stack --filter java`, `stack --all`,
 * `help`. Not a real shell: no quoting, no escaping, no pipes. That is
 * deliberate, the input is a nav box with a personality, not a terminal
 * emulator.
 */
export function parseCommand(raw: string): ParsedCommand {
  const tokens = raw.trim().toLowerCase().split(/\s+/).filter(Boolean)
  const name = tokens.shift() ?? ''
  const args: string[] = []
  const flags: Record<string, string | true> = {}

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]
    if (token.startsWith('--')) {
      const key = token.slice(2)
      const next = tokens[i + 1]
      if (next && !next.startsWith('--')) {
        flags[key] = next
        i++
      } else {
        flags[key] = true
      }
    } else {
      args.push(token)
    }
  }

  return { name, args, flags }
}

/**
 * Resolve free text to a sector. Accepts, in priority order:
 *   exact id ("01"), bare/prefixed number ("3", ":3"), exact label ("projects"),
 * then a label prefix ("exp", "off"). Prefix matching is last so that an exact
 * hit is never shadowed by a shorter ambiguous one.
 */
export function resolveSector(input: string): Sector | null {
  const q = input.trim().toLowerCase().replace(/^[:#/]/, '')
  if (!q) return null

  const byId = SECTORS.find((s) => s.id === q.padStart(2, '0'))
  if (byId) return byId

  const norm = (label: string) => label.toLowerCase().replace(/_/g, '')
  const flat = q.replace(/[_\s-]/g, '')

  const exact = SECTORS.find((s) => norm(s.label) === flat || s.target === flat)
  if (exact) return exact

  const prefixed = SECTORS.filter(
    (s) => norm(s.label).startsWith(flat) || s.target.startsWith(flat),
  )
  return prefixed.length === 1 ? prefixed[0] : null
}

/** Smooth-scroll to a sector, honouring the reduced-motion preference. */
export function jumpTo(sector: Sector): void {
  const el = document.getElementById(sector.target)
  if (!el) return
  el.scrollIntoView({ behavior: getScrollBehavior(), block: 'start' })
}
