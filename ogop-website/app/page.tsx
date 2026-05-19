import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ProgramsSection from '@/components/ProgramsSection'
import ImpactSection from '@/components/ImpactSection'
import SuccessStories from '@/components/SuccessStories'
import ContactSection from '@/components/ContactSection'
import NewsletterSection from '@/components/NewsletterSection'

export default async function Home() {
  // Data is fetched inside each component for better performance
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <ImpactSection />
      <SuccessStories />
      <NewsletterSection />
      <ContactSection />
    </>
  )
}
