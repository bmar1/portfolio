import { lazy, Suspense, type ReactElement } from 'react'
import App from './App'

/**
 * No router dependency. The production site lives at "/" and is untouched.
 * Everything under /lab is the experimental wing: three immersive takes on
 * the same content, plus a launcher that links between them and back home.
 * Split into its own file (rather than inline in main.tsx) so react-refresh
 * can treat this module as component-only.
 */
const LabLauncher = lazy(() => import('./experiences/LabLauncher'))
const Braindance = lazy(() => import('./experiences/braindance/App'))
const Metro = lazy(() => import('./experiences/metro/App'))
const Breach = lazy(() => import('./experiences/breach/App'))

export default function Root() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'

  let Page: ReactElement
  if (path === '/lab') Page = <LabLauncher />
  else if (path === '/braindance') Page = <Braindance />
  else if (path === '/metro') Page = <Metro />
  else if (path === '/breach') Page = <Breach />
  else Page = <App />

  return <Suspense fallback={null}>{Page}</Suspense>
}
