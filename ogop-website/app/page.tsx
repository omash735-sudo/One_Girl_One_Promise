import HeroCarousel from '@/components/HeroCarousel'
import AboutSection from '@/components/AboutSection'
import ProgramsSection from '@/components/ProgramsSection'
import ImpactSection from '@/components/ImpactSection'
import SuccessStories from '@/components/SuccessStories'
import NewsletterSection from '@/components/NewsletterSection'
import ContactSection from '@/components/ContactSection'

export default async function Home() {
  return (
    <>
      <HeroCarousel />
      <AboutSection />
      <ProgramsSection />
      <ImpactSection />
      <SuccessStories />
      <NewsletterSection />
      <ContactSection />
    </>
  )
}
