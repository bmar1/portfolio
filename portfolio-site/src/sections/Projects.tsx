import DossierFan from '../components/DossierFan'
import SectionBackdrop from '../components/SectionBackdrop'
import SectionHeading from '../components/SectionHeading'

export default function Projects() {
  return (
    <section
      id="projects"
      className="section reading-section projects-section"
      aria-labelledby="projects-heading"
    >
      <SectionBackdrop src="/assets/src-spadina-night.jpg" dim={0.22} position="center 65%" tone="magenta" />
      <div className="container relative z-10">
        <SectionHeading id="projects-heading" text="Selected projects" />
        <DossierFan />
      </div>
    </section>
  )
}
