import { GITHUB_USERNAME } from '../constants/social'

export type GithubProof = {
  login: string
  publicRepos: number
  /** Best available signal: latest repo push, else profile `updated_at` */
  lastActivityAt: string
  profileUrl: string
}

/**
 * Public GitHub REST API (no token). Rate limit: 60/hr per IP unauthenticated.
 */
export async function fetchGithubProof(
  username: string = GITHUB_USERNAME,
): Promise<GithubProof | null> {
  try {
    const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`)
    if (!userRes.ok) return null
    const user = (await userRes.json()) as {
      login?: string
      html_url?: string
      public_repos?: number
      updated_at?: string
    }

    let lastActivityAt = user.updated_at ?? new Date().toISOString()

    const reposRes = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&per_page=1`,
    )
    if (reposRes.ok) {
      const repos = (await reposRes.json()) as { pushed_at?: string }[]
      if (Array.isArray(repos) && repos[0]?.pushed_at) {
        lastActivityAt = repos[0].pushed_at
      }
    }

    if (!user.login || !user.html_url) return null

    return {
      login: user.login,
      publicRepos: user.public_repos ?? 0,
      lastActivityAt,
      profileUrl: user.html_url,
    }
  } catch {
    return null
  }
}

/** Human-readable relative time for a past ISO timestamp */
export function formatRelativePast(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return 'recently'

  const now = Date.now()
  const seconds = Math.floor((now - then) / 1000)
  if (seconds < 45) return 'just now'

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return rtf.format(-minutes, 'minute')

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return rtf.format(-hours, 'hour')

  const days = Math.floor(hours / 24)
  if (days < 30) return rtf.format(-days, 'day')

  const months = Math.floor(days / 30)
  if (months < 12) return rtf.format(-months, 'month')

  const years = Math.floor(days / 365)
  return rtf.format(-years, 'year')
}
