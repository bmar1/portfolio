import { useLenis } from '../shared/useLenis'
import RecruiterLane from '../shared/RecruiterLane'
import './braindance.css'
import Hero from './sections/Hero'
import WhoIAm from './sections/WhoIAm'
import Tracks from './sections/Tracks'
import Recordings from './sections/Recordings'
import Factions from './sections/Factions'
import Fragments from './sections/Fragments'
import EndOfPlayback from './sections/EndOfPlayback'

/**
 * Braindance: a cinematic scroll film. The whole site plays like a
 * recovered recording rather than a browsed page. Seven scenes, each one
 * its own GSAP-driven moment: boot, who I am, experience as editor
 * tracks, projects as recordings, leadership as a two-faction scale,
 * values as memory fragments, and a plain end-of-playback contact block.
 */
export default function BraindanceApp() {
  useLenis()

  return (
    <div className="braindance-root">
      <div className="bd-grain" aria-hidden="true" />
      <main>
        <Hero />
        <WhoIAm />
        <Tracks />
        <Recordings />
        <Factions />
        <Fragments />
        <EndOfPlayback />
      </main>
      <RecruiterLane />
    </div>
  )
}
