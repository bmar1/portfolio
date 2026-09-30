/**
 * Every personal line is flagged `draft: true` until Bilal approves or rewrites
 * it. Facts pulled straight from the resume carry no flag.
 */
export interface Line {
  text: string
  draft?: boolean
}

export interface Attribute {
  name: string
  level: number
  reason: Line
}

export const PROFILE = {
  handle: 'bmar1',
  name: 'Bilal Umar',
  photo: '/assets/avatar.png',
  photoAlt: 'Bilal in over-ear headphones, side profile',
  status: 'Ontario Public Service · Software Developer Co-op',
  lifePath: {
    title: 'Streetkid → Corpo co-op',
    text: 'Grew up on side projects, now shipping inside a ministry. Still a streetkid at heart.',
    draft: true,
  },
  bio: [
    {
      text: "I'm Bilal. I study Computer Programming & Analysis at Seneca and I'm spending this fall at Ontario Public Service, moving a ticketing system off a vendor platform and onto React and ASP.NET.",
    },
    {
      text: 'I like the backend work that makes everything else possible: queues, adapters, pipelines. And I like when it ends up in front of real people.',
      draft: true,
    },
    {
      text: 'Too many hours in Cyberpunk 2077, which explains the site.',
      draft: true,
    },
  ] satisfies Line[],
  attributes: [
    {
      name: 'Technical Ability',
      level: 17,
      reason: { text: 'Spring Boot, .NET, AWS, GKE. The stuff behind the UI.', draft: true },
    },
    {
      name: 'Intelligence',
      level: 15,
      reason: { text: 'Systems design on weekends, for fun.', draft: true },
    },
    {
      name: 'Reflexes',
      level: 13,
      reason: { text: 'Ship in days with Claude and Cursor, then test it properly.', draft: true },
    },
    {
      name: 'Body',
      level: 14,
      reason: { text: 'Gym, consistently. Protein goals.', draft: true },
    },
    {
      name: 'Cool',
      level: 12,
      reason: { text: 'Runs an AWS group and a GDG chapter without panicking.', draft: true },
    },
  ] satisfies Attribute[],
  cyberware: ['Spring Boot', 'React', '.NET', 'AWS', 'GKE', 'RabbitMQ', 'Docker', 'Claude', 'Cursor'],
  affiliations: [
    { org: 'AWS Student Builder Groups', role: 'Group Leader', detail: '8+ event cloud curriculum, 75+ students' },
    { org: 'Google Developer Groups, Seneca', role: 'President', detail: '3+ workshops, 120+ attendees a term' },
  ],
  facts: [
    ['Based in', 'Toronto, ON'],
    ['Studying', 'Seneca Polytechnic'],
    ['Graduating', 'August 2027'],
  ] as [string, string][],
}

export const CONTACT = {
  email: 'bilalu4540@gmail.com',
  availability: { text: "Open to Winter '27 internships", draft: true },
  pitch: {
    text: "Hiring for a co-op, building something with a queue in it, or want to argue about the Phantom Liberty ending? My inbox is open.",
    draft: true,
  },
}

export const HERO_TAGLINE = {
  lead: 'Backend dev who plays',
  accent: 'too much Cyberpunk.',
  draft: true,
}
