import type { Trim } from './experience'
import type { Line } from './profile'

export interface Group {
  id: string
  org: string
  place: string
  role: string
  trim: Trim
  /** Where the line's terminal station links to. */
  url: string
  outcomes: { value: string; label: string; href: string; hrefLabel: string }[]
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
    url: 'https://awsseneca.com/',
    outcomes: [
      {
        value: '90+',
        label: 'students',
        href: 'https://www.meetup.com/aws-sbg-at-seneca-polytechnic-newnham-campus/',
        hrefLabel: 'Meetup group',
      },
      {
        value: '8+',
        label: 'events in the curriculum',
        href: 'https://linktr.ee/awsseneca',
        hrefLabel: 'Events, Discord, and socials',
      },
    ],
    did: [
      'Designed and delivered an 8+ event cloud engineering curriculum for 90+ students.',
      'Organized the team, planned sessions, and kept momentum between events.',
      'Recorded walkthroughs and promo clips so people knew what they were showing up for.',
    ],
    learned: [
      {
        text: 'Running AWS Builders pushed me into the marketing side: recording videos, organizing the team, and shipping events people actually wanted to attend.',
      },
      {
        text: 'Keeping everyone on the team engaged meant constant communication, and tying each session back to how AWS shows up in real projects, not just slides.',
      },
    ],
  },
  {
    id: 'gdg',
    org: 'Google Developer Groups',
    place: 'Seneca Polytechnic',
    role: 'President',
    trim: 'magenta',
    url: 'https://gdg.community.dev/gdg-on-campus-seneca-polytechnic-toronto-canada/',
    outcomes: [
      {
        value: '120+',
        label: 'attendees a term',
        href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-seneca-polytechnic-toronto-canada-presents-meet-the-gdg-on-campus-info-session/',
        hrefLabel: 'Info session, 169 RSVPs',
      },
      {
        value: '3+',
        label: 'technical workshops',
        href: 'https://gdg.community.dev/events/details/google-gdg-on-campus-seneca-polytechnic-toronto-canada-presents-beyond-the-prompt-gdg-workshop/',
        hrefLabel: 'Beyond the Prompt workshop',
      },
    ],
    did: [
      'Led 3+ technical workshops and grew chapter reach to 120+ student attendees a term.',
      'Structured sessions so beginners and advanced students could both leave with something useful.',
    ],
    learned: [
      {
        text: 'Delivering events is one thing. Making them understandable for everyone in the room, not just people who already know the stack, is the hard part.',
      },
      {
        text: 'Quality beat cramming topics. One clear workshop lands better than three rushed ones.',
      },
    ],
  },
]
