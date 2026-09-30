export type Trim = 'yellow' | 'magenta' | 'cyan'

export interface Role {
  id: string
  org: string
  team?: string
  title: string
  dates: string
  active?: boolean
  trim: Trim
  summary: string
  points: string[]
  outcomes: { value: string; label: string }[]
  tech: string[]
}

export const ROLES: Role[] = [
  {
    id: 'ops',
    org: 'Ontario Public Service',
    team: 'MPBSDP, Cluster Applications Branch',
    title: 'Software Developer Co\u2011op',
    dates: 'Fall 2026',
    active: true,
    trim: 'yellow',
    summary: "Getting a ministry's ticketing system off a vendor-locked platform.",
    points: [
      'Building CRUD REST APIs and ticket submission forms in React and ASP.NET to replace a vendor-locked PaaS.',
      'Set up an AI coding workflow with model-tier routing and session-scoped context, so the team does less rework each sprint.',
    ],
    outcomes: [
      { value: '120+', label: 'Ministry of Finance users' },
    ],
    tech: ['React', 'ASP.NET', '.NET', 'REST'],
  },
  {
    id: 'sikh-sparks',
    org: 'Sikh Sparks',
    title: 'Software Engineer Intern',
    dates: 'Summer 2026',
    trim: 'magenta',
    summary: 'One place for 100+ organizations to schedule, post, and answer messages.',
    points: [
      'Built a social media management platform adopted by 100+ Sikh organizations across Toronto.',
      'Wrote a Spring Boot adapter layer that makes 3+ platform APIs behave like one posting service.',
      "Built a unified inbox on Meta's webhook and polling APIs, pulling 4+ inboxes into one view.",
    ],
    outcomes: [
      { value: '100+', label: 'organizations' },
      { value: '60%', label: 'faster publishing' },
      { value: '200+', label: 'messages a day, one inbox' },
    ],
    tech: ['Spring Boot', 'Meta APIs', 'React', 'Claude'],
  },
  {
    id: 'liza-bilal',
    org: 'Liza Bilal Enterprise Inc.',
    title: 'Software Engineer',
    dates: 'Dec 2025 – Apr 2026',
    trim: 'cyan',
    summary: 'A client-facing site on AWS, plus the internal tooling behind it.',
    points: [
      'Designed and shipped a client site on AWS with a React frontend.',
      'Profiled and optimized static assets with compression, lazy loading, and minification.',
      'Built an Express.js reporting API that replaced a manual process.',
    ],
    outcomes: [
      { value: '200+', label: 'users' },
      { value: '22%', label: 'faster initial load' },
      { value: '2+ hrs', label: 'saved every week' },
    ],
    tech: ['React', 'AWS', 'Express.js'],
  },
]
