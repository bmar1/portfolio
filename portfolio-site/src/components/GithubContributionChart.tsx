import { useState } from 'react'
import { GITHUB_PROFILE_URL, GITHUB_USERNAME } from '../constants/social'

const LEGEND_STOPS = [0.12, 0.28, 0.45, 0.62, 0.88] as const

/** Year-long contribution heatmap via ghchart (PNG); cyan-tinted to match the site */
export default function GithubContributionChart() {
  const [broken, setBroken] = useState(false)
  const chartSrc = `https://ghchart.rshah.org/39d0d8/${encodeURIComponent(GITHUB_USERNAME)}`

  if (broken) {
    return (
      <p className="text-mono text-center text-xs" style={{ color: 'var(--color-text-muted)' }}>
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-reveal cursor-pointer"
          style={{ color: 'var(--color-accent-cyan)' }}
        >
          View contributions on GitHub
        </a>
      </p>
    )
  }

  return (
    <figure className="w-full max-w-full">
      <a
        href={GITHUB_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group block w-full cursor-pointer rounded-md focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          outlineColor: 'var(--color-accent-cyan)',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border)',
          padding: '0.75rem 1rem',
        }}
        aria-label={`${GITHUB_USERNAME} on GitHub — yearly contribution graph (opens in a new tab)`}
      >
        {/* Desktop: full column width (legible). Smaller breakpoints: overscale + horizontal scroll */}
        <div className="relative w-full overflow-x-auto overflow-y-visible lg:overflow-x-visible">
          <img
            src={chartSrc}
            alt=""
            loading="eager"
            decoding="async"
            onError={() => setBroken(true)}
            className="relative left-1/2 block h-auto min-h-0 w-[252%] max-w-none -translate-x-1/2 rounded-sm object-contain opacity-95 transition-opacity duration-200 group-hover:opacity-100 lg:left-0 lg:w-full lg:translate-x-0"
            style={{
              filter: 'contrast(1.08) brightness(1.05)',
              imageRendering: 'auto',
            }}
          />
        </div>
      </a>

      <figcaption className="mt-2.5 flex justify-end px-0.5">
        <div
          className="flex flex-wrap items-center justify-end gap-x-3.5 gap-y-1"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <span className="text-mono text-[0.65rem] tracking-wide sm:text-[0.72rem]">Less</span>
          <div className="flex items-center gap-0.5 sm:gap-0.75" aria-hidden>
            {LEGEND_STOPS.map((alpha, i) => (
              <span
                key={i}
                className="h-3 w-3 rounded-sm sm:h-3.5 sm:w-3.5"
                style={{
                  background: `rgba(57, 208, 216, ${alpha})`,
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)',
                }}
              />
            ))}
          </div>
          <span className="text-mono text-[0.65rem] tracking-wide sm:text-[0.72rem]">More</span>
        </div>
      </figcaption>
    </figure>
  )
}
