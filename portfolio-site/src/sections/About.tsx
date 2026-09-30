import ProfileCard from '../components/ProfileCard'
import SectionHeading from '../components/SectionHeading'

export default function About() {
  return (
    <section
      id="about"
      className="section reading-section about-section"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <SectionHeading id="about-heading" text="About me" />
        <div className="about-layout">
          <ProfileCard />
        </div>
      </div>
    </section>
  )
}
