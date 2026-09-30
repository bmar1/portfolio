import GigJournal from '../components/GigJournal'
import SectionHeading from '../components/SectionHeading'

export default function Experience() {
  return (
    <section
      id="experience"
      className="section reading-section experience-section soft-grid"
      aria-labelledby="experience-heading"
    >
      <div className="container relative z-10">
        <SectionHeading id="experience-heading" text="Where I've worked" />
        <p className="section-lede">
          Three gigs so far. The current one is at Ontario Public Service.
        </p>
        <GigJournal />
      </div>
    </section>
  )
}
