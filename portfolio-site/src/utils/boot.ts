import { prefersReducedMotion } from './motion'

const STORAGE_KEY = 'bumar:booted'

/**
 * True once per browser session. A reload in the same tab skips the boot,
 * so the 3s sequence is a first-impression, not a toll booth.
 */
export function shouldBoot(): boolean {
  if (typeof window === 'undefined') return false
  if (prefersReducedMotion()) return false
  try {
    return sessionStorage.getItem(STORAGE_KEY) !== '1'
  } catch {
    // Private mode / storage blocked: boot anyway, it is only 3s.
    return true
  }
}

export function markBooted(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Non-fatal: the boot just plays again next reload.
  }
}
