import { ExternalLink, FolderGit2 } from 'lucide-react'
import SectionReveal from '../components/SectionReveal'
import CountUp from '../components/CountUp'

interface Project {
  title: string
  tagline: string
  description: string
  stats: { value: number; suffix: string; label: string }[]
  tech: string[]
  links: { github?: string; live?: string }
  visual: string // ASCII / pre-formatted terminal mock
}

const PROJECTS: Project[] = [
  {
    title: 'Plated',
    tagline: 'Full-stack meal planning platform',
    description:
      'Built with Java Spring Boot & React on AWS. Integrated 3 external REST APIs with data normalization for 400+ recipes. CI/CD pipeline with 86% test coverage.',
    stats: [
      { value: 86, suffix: '%', label: 'test coverage' },
      { value: 16, suffix: '%', label: 'load reduction' },
      { value: 3, suffix: '', label: 'APIs integrated' },
    ],
    tech: ['Java', 'Spring Boot', 'React', 'PostgreSQL', 'AWS', 'Docker'],
    links: { live: 'https://plated-app.online/' },
    visual: `GET /api/recipes/search?q=chicken
─────────────────────────────
{
  "results": 47,
  "source": "unified_schema",
  "apis_queried": [
    "spoonacular",
    "edamam",
    "mealdb"
  ],
  "cache": "HIT (freshness: 94%)",
  "response_time": "82ms"
}`,
  },
  {
    title: 'Nest',
    tagline: 'Rental search with scored rankings',
    description:
      'Scraped 100+ apartments across Craigslist & Kijiji using async jobs and cache deduplication. Priority-driven scoring model with freshness-based caching.',
    stats: [
      { value: 100, suffix: '+', label: 'apartments scraped' },
      { value: 2, suffix: '', label: 'days saved w/ AI' },
      { value: 4, suffix: '', label: 'security layers' },
    ],
    tech: ['React', 'Spring Boot', 'PostgreSQL', 'Cursor AI'],
    links: { live: 'https://nest-one-eta.vercel.app/' },
    visual: `RANKED RESULTS (score desc)
─────────────────────────────
#1  █████████▎ 94  2BR Danforth
    $1,850 · freshness: 2h
#2  ████████▌  87  1BR Liberty  
    $1,620 · freshness: 5h
#3  ███████▊   79  Studio King 
    $1,340 · freshness: 1d
#4  ██████▎    64  1BR Midtown
    $1,780 · freshness: 3d
    
cache: DEDUP_ACTIVE | async: OK`,
  },
  {
    title: 'Route Optimization',
    tagline: 'Greedy shortest-path delivery system',
    description:
      'Led 4-person Agile team. Designed greedy shortest-path algorithm in C that reduced operational costs by 12%. Comprehensive test strategy with unit, integration, and black-box tests.',
    stats: [
      { value: 12, suffix: '%', label: 'cost reduction' },
      { value: 4, suffix: '', label: 'team members' },
      { value: 3, suffix: '', label: 'test types' },
    ],
    tech: ['C', 'C++', 'Jira', 'Agile', 'Unit Testing'],
    links: {},
    visual: `    A ──(4)──→ B ──(2)──→ D
    │                       ↑
   (7)        ┌──(1)──→ E ─(3)─┘
    │         │
    ↓         │
    C ──(5)───┘
    
    Optimal: A→B→D  cost: 6
    Naive:   A→C→E→D  cost: 11
    Savings: 45% per route`,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section relative">
      {/* Ambient background */}
      <div className="absolute inset-0 z-[-1] pointer-events-none" style={{ opacity: 0.10 }}>
        <img
          src="/assets/cyberpunk.gif"
          alt=""
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, var(--color-bg-base), transparent 20%, transparent 80%, var(--color-bg-base))' }}
        />
      </div>
      
      <div className="container relative z-10">
        <SectionReveal>
          <span className="text-mono" style={{ color: 'var(--color-text-muted)' }}>
            // featured work
          </span>
          <h2 className="text-h2 mt-3">Projects</h2>
        </SectionReveal>

        <div className="mt-16 flex flex-col gap-20">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isReversed = index % 2 === 1

  return (
    <SectionReveal delay={100}>
      <div
        className="project-card relative overflow-hidden rounded-xl border"
        style={{
          borderColor: 'var(--color-border)',
          background: 'var(--color-bg-surface)',
        }}
      >
        <div
          className="grid grid-cols-1 gap-0 lg:grid-cols-2"
          style={{ direction: isReversed ? 'rtl' : 'ltr' }}
        >
          {/* Text */}
          <div className="p-8 lg:p-10 flex flex-col justify-center gap-5" style={{ direction: 'ltr' }}>
            <span className="pill pill-accent w-fit text-mono" style={{ fontSize: '0.7rem' }}>
              Featured Project
            </span>

            <h3
              className="text-h3"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {project.title}
            </h3>

            <p className="text-body" style={{ color: 'var(--color-text-secondary)' }}>
              {project.description}
            </p>

            {/* Stats */}
            <div className="flex gap-6 flex-wrap">
              {project.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-mono font-semibold text-lg"
                    style={{ color: 'var(--color-accent-cyan)' }}
                  >
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-mono" style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="pill">{t}</span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 mt-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener"
                  className="project-link link-reveal text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <FolderGit2 size={14} /> Source Code
                </a>
              )}
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener"
                  className="project-link link-reveal text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <ExternalLink size={14} /> Live Site
                </a>
              )}
            </div>
          </div>

          {/* Terminal visual */}
          <div
            className="flex items-center justify-center p-6 lg:p-8"
            style={{
              direction: 'ltr',
              background: 'var(--color-bg-base)',
              borderLeft: isReversed ? 'none' : '1px solid var(--color-border)',
              borderRight: isReversed ? '1px solid var(--color-border)' : 'none',
            }}
          >
            <div
              className="w-full rounded-lg p-5 overflow-x-auto"
              style={{ background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}
            >
              {/* Terminal header dots */}
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#FEBC2E' }} />
                <div className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
              </div>
              <pre
                className="text-mono"
                style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.75rem',
                  lineHeight: 1.6,
                  whiteSpace: 'pre',
                  margin: 0,
                }}
              >
                {project.visual}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
