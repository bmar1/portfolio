import type { Line } from './profile'

export interface Decision {
  choice: string
  reason: string
  draft?: boolean
}

export interface Project {
  id: string
  file: string
  name: string
  purpose: string
  contribution: string
  shot?: string
  alt?: string
  width?: number
  height?: number
  outcomes: { value: string; label: string }[]
  tech: string[]
  href?: string
  why: Line
  decisions: Decision[]
  learned: Line[]
  rebuild?: Line
  classified?: boolean
  draft?: boolean
}

export const PROJECTS: Project[] = [
  {
    id: 'plated',
    file: '01',
    name: 'Plated',
    purpose: 'Meal planning and grocery tracking, in one place.',
    contribution:
      'I built the Spring Boot backend and pulled three recipe APIs into one shared format, covering 400+ recipes. Deploys go through a Docker pipeline on AWS EC2 and RDS, with JUnit and Mockito tests gating every release.',
    shot: '/assets/plated.png',
    alt: 'Plated meal selection dialog showing three recipe suggestions',
    width: 1245,
    height: 783,
    outcomes: [
      { value: '100+', label: 'people using it' },
      { value: '400+', label: 'recipes, one format' },
      { value: '86%', label: 'test coverage' },
    ],
    tech: ['Java', 'Spring Boot', 'React', 'AWS EC2', 'RDS', 'CloudWatch', 'Docker', 'JUnit', 'Mockito'],
    href: 'https://plated-app.online/',
    why: {
      text: 'I started Plated as a student on a budget. I kept seeing people struggle with meal planning end to end — figuring out what to buy and then actually cooking it — so I built it myself.',
    },
    decisions: [
      {
        choice: 'Treat deployments as the product',
        reason:
          'The hardest call was how to ship reliably. I wired Docker, CI/CD, and AWS so the same image runs locally and in production, with tests blocking bad releases.',
      },
      {
        choice: 'Drop the Nginx reverse proxy',
        reason:
          'I originally ran Nginx inside the Docker network as a reverse proxy. That extra hop is what broke production. Removing it simplified the network and fixed the outage.',
      },
      {
        choice: 'Normalize recipes at the edge',
        reason:
          'Three recipe APIs, three shapes. An adapter layer maps them into one internal model so the rest of the app never cares where a recipe came from.',
      },
    ],
    learned: [
      { text: 'The deployment path matters as much as the feature code. My production bug was infrastructure, not business logic.' },
      { text: 'Mocking third-party APIs in JUnit/Mockito is what made 86% coverage realistic on an integration-heavy app.' },
    ],
    rebuild: {
      text: 'If I rebuilt it, I would document the deployment and adapter decisions properly, and keep shipping the features I already had on the roadmap.',
    },
  },
  {
    id: 'nest',
    file: '02',
    name: 'Nest',
    purpose: 'Rental listings gathered and ranked in one search.',
    contribution:
      'RabbitMQ hands listing collection and scoring to worker pods on GKE, so a search runs in parallel instead of one source at a time. Each search brings back 140+ ranked results.',
    shot: '/assets/nest.png',
    alt: 'Nest landing page with an apartment search action over a city view',
    width: 1754,
    height: 957,
    outcomes: [
      { value: '150+', label: 'successful searches' },
      { value: '140+', label: 'results per search' },
      { value: '<30s', label: 'to results' },
    ],
    tech: ['React', 'Spring Boot', 'RabbitMQ', 'Docker', 'Kubernetes', 'GKE', 'Artifact Registry'],
    href: 'https://nest-one-eta.vercel.app/',
    why: {
      text: 'Apartment hunting meant checking the same sites over and over. I also wanted to learn distributed systems for real — not just read about queues and workers.',
    },
    decisions: [
      {
        choice: 'RabbitMQ plus GKE workers',
        reason:
          'I chose a queue and worker pods on GKE so I could learn how work fans out, retries, and parallel throughput actually behave under load.',
      },
      {
        choice: 'Weighted ranking, not just aggregation',
        reason:
          'Listings are scored with a model I wrote: price, bedrooms, perks, and other factors each get a weight so results come back ordered, not random.',
      },
      {
        choice: 'Separate scrape from score',
        reason:
          'Collection and scoring are different jobs. Splitting them across messages kept each worker small and made it easier to scale the slow parts.',
      },
    ],
    learned: [
      { text: 'Distributed systems clicked once I watched a worker die mid-job and had to reason about what the queue should do next.' },
      { text: 'Ranking is a product decision. Explaining why an apartment scored high forced me to make the weights intentional.' },
    ],
    rebuild: {
      text: 'If I rebuilt it, I would plug in more listing sources so every search returns fewer duplicates and higher-quality places.',
    },
  },
  {
    id: 'classified',
    file: '03',
    name: 'Classified',
    purpose: 'Next build. Currently in the lab.',
    contribution:
      "Something new is in progress. It'll land here when it's ready to be looked at.",
    outcomes: [{ value: 'WIP', label: 'status' }],
    tech: [],
    why: { text: 'Details stay classified until it ships.' },
    decisions: [],
    learned: [],
    classified: true,
  },
]
