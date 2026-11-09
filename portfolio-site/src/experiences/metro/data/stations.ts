export interface Station {
  id: string
  code: string
  name: string
  kind: 'terminus' | 'station'
}

/**
 * The spine of the whole direction: this list drives the persistent line
 * nav (desktop rail + mobile bottom sheet) AND the section ids rendered in
 * App.tsx. Keep this in sync with the section order in App.tsx.
 */
export const STATIONS: Station[] = [
  { id: 'hero', code: '00', name: 'BILAL UMAR', kind: 'terminus' },
  { id: 'who', code: '01', name: 'WHO I AM', kind: 'station' },
  { id: 'service', code: '02', name: 'CURRENT SERVICE', kind: 'station' },
  { id: 'cargo', code: '03', name: 'CARGO / PROJECTS', kind: 'station' },
  { id: 'interchange', code: '04', name: 'INTERCHANGE', kind: 'station' },
  { id: 'value', code: '05', name: 'WHAT I VALUE', kind: 'station' },
  { id: 'contact', code: '06', name: 'END OF LINE', kind: 'terminus' },
]
