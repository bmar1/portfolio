import { useLenis } from '../shared/useLenis'
import RecruiterLane from '../shared/RecruiterLane'
import Nav from './components/Nav'
import Hero from './components/Hero'
import WhoIAm from './components/WhoIAm'
import Service from './components/Service'
import Cargo from './components/Cargo'
import Interchange from './components/Interchange'
import Values from './components/Values'
import Contact from './components/Contact'
import styles from './metro.module.css'

/**
 * NIGHT CITY METRO: the whole site reframed as a transit line. Navigation
 * is not a side-rail of numbers, it is the map itself (see Nav.tsx), with
 * each section below standing in as a station along Line 1. Neo-Militarism
 * is the dominant sub-style: cold red as the only primary accent, cyan as
 * complement, hard clipped corners, institutional signage over street
 * glitch. See src/experiences/shared/storySpine.ts for the single source
 * of narrative copy this direction stages visually.
 */
export default function MetroApp() {
  useLenis()

  return (
    <div className={styles.metroRoot}>
      <Nav />
      <main className={styles.main}>
        <Hero />
        <WhoIAm />
        <Service />
        <Cargo />
        <Interchange />
        <Values />
        <Contact />
      </main>
      <RecruiterLane />
    </div>
  )
}
