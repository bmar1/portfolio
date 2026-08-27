export interface Sector {
  /** Two-digit rail number, also a valid jump target ("3", ":3", "03") */
  id: string
  /** Rail label + fuzzy-match target */
  label: string
  /** Element id, without the hash */
  target: string
}

/**
 * Single source of truth for page order. The rail renders these, the command
 * parser resolves against them, and section headings pull their number here,
 * so adding a section never desyncs the three.
 */
export const SECTORS: Sector[] = [
  { id: '01', label: 'EXPERIENCE', target: 'experience' },
  { id: '02', label: 'ABOUT', target: 'about' },
  { id: '03', label: 'PROJECTS', target: 'projects' },
  { id: '04', label: 'STACK', target: 'skills' },
  { id: '05', label: 'OFF_GRID', target: 'offgrid' },
  { id: '06', label: 'UPLINK', target: 'contact' },
]
