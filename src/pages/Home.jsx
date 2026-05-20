import SEO from '../lib/seo.jsx'
import Hero from '../components/Hero.jsx'
import WhyChoose from '../components/WhyChoose.jsx'
import FeaturedProperties from '../components/FeaturedProperties.jsx'
import Services from '../components/Services.jsx'
import MeetTheTeam from '../components/MeetTheTeam.jsx'
import Testimonials from '../components/Testimonials.jsx'
import CtaBanner from '../components/CtaBanner.jsx'

export default function Home() {
  return (
    <main>
      <SEO />
      <Hero />
      <WhyChoose />
      <FeaturedProperties />
      <Services />
      <MeetTheTeam />
      <Testimonials />
      <CtaBanner />
    </main>
  )
}
