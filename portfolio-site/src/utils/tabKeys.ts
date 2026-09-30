/** Roving-tabindex target for a tablist key press, or -1 if the key is not a tab key. */
export function nextTabIndex(key: string, index: number, count: number): number {
  const last = count - 1
  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return index === last ? 0 : index + 1
    case 'ArrowLeft':
    case 'ArrowUp':
      return index === 0 ? last : index - 1
    case 'Home':
      return 0
    case 'End':
      return last
    default:
      return -1
  }
}
