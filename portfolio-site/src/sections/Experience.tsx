import CareerTower from '../components/CareerTower'
import SectionBackdrop from '../components/SectionBackdrop'
import SectionHeading from '../components/SectionHeading'

export default function Experience() {
  return (
    <section
      id="experience"
      className="section reading-section experience-section"
      aria-labelledby="experience-heading"
    >
      <SectionBackdrop tone="yellow" />
      <div className="container relative z-10">
        <SectionHeading id="experience-heading" text="Where I've worked" />
        <p className="section-lede">
          Two floors cleared, I'm on the third at Ontario Public Service, and Infotech is going up
          for Winter '27. Pick a floor.
        </p>
        <CareerTower />
      </div>
    </section>
  )
}
