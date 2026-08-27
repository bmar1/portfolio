import { useEffect, useState } from 'react'
import { GITHUB_PROFILE_URL } from '../constants/social'
import {
  fetchGithubProof,
  formatRelativePast,
  type GithubProof,
} from '../utils/github'

function Cell({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5 px-5 py-3">
      <span
        className="t-label"
        style={{ color: 'var(--color-nc-text-dim)', fontSize: '0.58rem' }}
      >
        {label}
      </span>
      <span
        className="t-data truncate"
        style={{ color: 'var(--color-nc-text)', fontSize: '0.78rem' }}
      >
        {children}
      </span>
    </div>
  )
}

/**
 * Instrument strip along the bottom of the hero. Replaces the three.js orb:
 * same "live system" job, ~600KB cheaper, and every value on it is real.
 */
export default function HudStrip() {
  const [proof, setProof] = useState<GithubProof | null>(null)
  const [clock, setClock] = useState(() =>
    new Date().toTimeString().slice(0, 8),
  )

  useEffect(() => {
    let cancelled = false
    fetchGithubProof().then((data) => {
      if (!cancelled) setProof(data)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const id = window.setInterval(
      () => setClock(new Date().toTimeString().slice(0, 8)),
      1000,
    )
    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      className="relative w-full"
      style={{
        background: 'rgba(5,5,8,0.78)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: 'inset 0 1px 0 var(--color-nc-border)',
      }}
    >
      <div className="flex flex-wrap items-center">
        <div className="flex items-center gap-2 px-5 py-3">
          <span className="led" aria-hidden />
          <span
            className="t-label"
            style={{ color: 'var(--color-nc-magenta)', fontSize: '0.62rem' }}
          >
            Operator
          </span>
        </div>

        <Cell label="Local">{clock} EST</Cell>

        <Cell label="Repos">
          {proof ? proof.publicRepos : '--'}
        </Cell>

        <Cell label="Last push">
          {proof ? formatRelativePast(proof.lastActivityAt) : 'syncing'}
        </Cell>

        <div className="flex items-center px-5 py-3">
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="t-mono transition-colors duration-150 hover:opacity-80"
            style={{ color: 'var(--color-nc-cyan)', fontSize: '0.72rem' }}
          >
            {proof ? `@${proof.login}` : 'github'} ↗
          </a>
        </div>
      </div>
    </div>
  )
}
