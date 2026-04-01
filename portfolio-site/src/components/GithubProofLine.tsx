import { useEffect, useState } from 'react'
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from '../constants/social'
import { fetchGithubProof, formatRelativePast, type GithubProof } from '../utils/github'

type Props = {
  visible: boolean
}

export default function GithubProofLine({ visible }: Props) {
  const [proof, setProof] = useState<GithubProof | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'err'>('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    fetchGithubProof().then((data) => {
      if (cancelled) return
      if (data) {
        setProof(data)
        setStatus('ok')
      } else {
        setStatus('err')
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <p
      className="text-mono max-w-lg text-sm"
      style={{
        color: 'var(--color-text-muted)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 500ms cubic-bezier(0.23, 1, 0.32, 1) 760ms',
      }}
      aria-live="polite"
    >
      {status === 'loading' && (
        <span style={{ color: 'var(--color-text-muted)' }}>Syncing with GitHub…</span>
      )}
      {status === 'ok' && proof && (
        <>
          Last activity {formatRelativePast(proof.lastActivityAt)} · {proof.publicRepos} public{' '}
          {proof.publicRepos === 1 ? 'repo' : 'repos'} ·{' '}
          <a
            href={proof.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-reveal cursor-pointer"
            style={{ color: 'var(--color-accent-cyan)' }}
          >
            @{proof.login}
          </a>
        </>
      )}
      {status === 'err' && (
        <>
          Proof over posture —{' '}
          <a
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-reveal cursor-pointer"
            style={{ color: 'var(--color-accent-cyan)' }}
          >
            github.com/{GITHUB_USERNAME}
          </a>
        </>
      )}
    </p>
  )
}
