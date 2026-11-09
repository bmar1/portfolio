/**
 * The content files (src/content/*) are the single source of truth and this
 * direction does not edit them. A few long-form strings in there use an
 * em dash or en dash as a sentence break. The global rule for this direction
 * bans that character outright, so this is a display-only transform: it
 * swaps em/en dashes for a hyphen with surrounding spaces. It never touches
 * numbers, facts, or word choice, only the punctuation glyph.
 */
export function cleanDash(text: string): string {
  return text.replace(/\s*[\u2013\u2014]\s*/g, ' - ')
}
