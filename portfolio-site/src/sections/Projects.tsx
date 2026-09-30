import DossierFan from '../components/DossierFan'
import SectionHeading from '../components/SectionHeading'

export default function Projects() {
  return (
    <section
      id="projects"
      className="section reading-section projects-section"
      aria-labelledby="projects-heading"
    >
      <div className="container">
        <SectionHeading id="projects-heading" text="Selected projects" />
        <DossierFan />
      </div>
    </section>
  )
}
