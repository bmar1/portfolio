import { useLenis } from '../shared/useLenis'
import RecruiterLane from '../shared/RecruiterLane'
import HexNav from './components/HexNav'
import Hero from './components/Hero'
import IdentityDaemon from './components/IdentityDaemon'
import ProcessMonitor from './components/ProcessMonitor'
import UploadLog from './components/UploadLog'
import NetworkReach from './components/NetworkReach'
import Quickhacks from './components/Quickhacks'
import Uplink from './components/Uplink'
import './breach.css'

/**
 * BREACH PROTOCOL: a netrunner's rig. Navigation is a hex-grid "breach
 * protocol" minigame instead of a conventional nav bar (<HexNav>, mounted
 * once here so it survives past the hero intro). The rest of the page is
 * one continuous breach session: identity, processes, uploads, reach,
 * quickhacks, uplink.
 */
export default function BreachApp() {
  useLenis()

  return (
    <main className="breach-root">
      <HexNav />
      <Hero />
      <IdentityDaemon />
      <ProcessMonitor />
      <UploadLog />
      <NetworkReach />
      <Quickhacks />
      <Uplink />
      <RecruiterLane />
    </main>
  )
}
