import { PROFILE, CONTACT } from '../../content/profile'
import { ROLES } from '../../content/experience'
import { PROJECTS } from '../../content/projects'
import { GROUPS } from '../../content/leadership'

/**
 * One narrative spine, three acts, shared by every lab direction so the
 * story never drifts between them. Each direction stages these acts in its
 * own visual language, but the words come from here (and ultimately from
 * src/content/*, the single source of truth).
 */
export const STORY = {
  identity: {
    name: PROFILE.name,
    handle: PROFILE.handle,
    status: PROFILE.status,
    location: 'Toronto, ON',
  },
  actOne: {
    label: 'Who I am',
    headline: 'Backend-leaning builder, Cyberpunk addict, Toronto.',
    body: "I'm a Computer Programming & Analysis student at Seneca Polytechnic, graduating August 2027. I like the parts of software most people skip past: queues, adapters, the pipeline that decides whether a feature ships clean or breaks at 2am.",
  },
  actTwo: {
    label: "What I'm up to",
    roles: ROLES,
    projects: PROJECTS,
  },
  actThree: {
    label: 'What I value',
    principles: [
      {
        id: 'deploy',
        title: 'The deployment path is the product',
        body: 'A feature nobody can ship reliably is not finished. I learned this the hard way on Plated: the bug that took it down was infrastructure, not business logic.',
      },
      {
        id: 'rank',
        title: 'Ranking is a product decision',
        body: "Nest's search results are scored, not just aggregated. Explaining why something ranked high forced me to make the weights intentional instead of arbitrary.",
      },
      {
        id: 'understand',
        title: 'Make it understandable for everyone in the room',
        body: 'Running GDG workshops taught me that landing a session for the people who already know the stack is easy. Landing it for everyone is the actual job.',
      },
      {
        id: 'quality',
        title: 'Quality over cramming',
        body: 'One clear workshop beats three rushed ones. The same logic applies to code: I would rather ship less and have it hold up.',
      },
    ],
  },
  leadership: GROUPS, // AWS Student Builder Groups first, then GDG — order is source-controlled here
  contact: CONTACT,
}

export const RECRUITER_SUMMARY = {
  role: ROLES[1], // Ontario Public Service — the active co-op
  topProjects: PROJECTS.filter((p) => !p.classified).slice(0, 2),
  resumeHref: '/assets/Bilal_Umar_Resume_SWE.pdf',
  email: CONTACT.email,
}
