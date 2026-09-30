import type { Trim } from './experience'
import type { Line } from './profile'

export interface Group {
  id: string
  org: string
  place: string
  role: string
  trim: Trim
  outcomes: { value: string; label: string }[]
  did: string[]
  learned: Line[]
}

export const GROUPS: Group[] = [
  {
    id: 'aws',
    org: 'AWS Student Builder Groups',
    place: 'Seneca Polytechnic',
    role: 'Group Leader',
    trim: 'yellow',
    outcomes: [
      { value: '75+', label: 'students' },
      { value: '8+', label: 'events in the curriculum' },
    ],
    did: [
      'Designed and delivered an 8+ event cloud engineering curriculum for 75+ students.',
      'Organized the team, planned sessions, and kept momentum between events.',
      'Recorded walkthroughs and promo clips so people knew what they were showing up for.',
    ],
    learned: [
      {
        text: 'Running AWS Builders pushed me into the marketing side: recording videos, organizing the team, and shipping events people actually wanted to attend.',
      },
      {
        text: 'Keeping everyone on the team engaged meant constant communication — and tying each session back to how AWS shows up in real projects, not just slides.',
      },
    ],
  },
  {
    id: 'gdg',
    org: 'Google Developer Groups',
    place: 'Seneca Polytechnic',
    role: 'President',
    trim: 'magenta',
    outcomes: [
      { value: '120+', label: 'attendees a term' },
      { value: '3+', label: 'technical workshops' },
    ],
    did: [
      'Led 3+ technical workshops and grew chapter reach to 120+ student attendees a term.',
      'Structured sessions so beginners and advanced students could both leave with something useful.',
    ],
    learned: [
      {
        text: 'Delivering events is one thing. Making them understandable for everyone in the room — not just people who already know the stack — is the hard part.',
      },
      {
        text: 'Quality beat cramming topics. One clear workshop lands better than three rushed ones.',
      },
    ],
  },
]
