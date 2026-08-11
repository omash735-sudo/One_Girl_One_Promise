import Link from 'next/link'
import { 
  UserPlus, 
  Heart, 
  Handshake, 
  Briefcase,
  ArrowRight
} from 'lucide-react'

export default function JoinPage() {
  const joinOptions = [
    {
      id: 'membership',
      title: 'Become a Member',
      description: 'Join the OGOP community and support teen mothers through membership.',
      icon: <UserPlus className="w-8 h-8 text-[#003A99]" />,
      link: '/join/membership',
      cta: 'Apply Now'
    },
    {
      id: 'volunteer',
      title: 'Volunteer With Us',
      description: 'Share your time and skills to help teen mothers return to school.',
      icon: <Heart className="w-8 h-8 text-[#1A7F00]" />,
      link: '/join/volunteer',
      cta: 'Volunteer Now'
    },
    {
      id: 'partner',
      title: 'Partner With Us',
      description: 'Partner your organization with OGOP to create lasting impact.',
      icon: <Handshake className="w-8 h-8 text-[#003A99]" />,
      link: '/join/partner',
      cta: 'Partner Now'
    },
    {
      id: 'work',
      title: 'Work With Us',
      description: 'Join the OGOP team and help transform lives in Malawi.',
      icon: <Briefcase className="w-8 h-8 text-[#1A7F00]" />,
      link: '/join/work-with-us',
      cta: 'Apply Now'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <section className="bg-[#003A99] text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Join <span className="text-[#FFEB00]">Us</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            There are many ways to become part of the OGOP movement. Find the one that fits you best.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {joinOptions.map((option) => (
              <div 
                key={option.id}
                className="border border-[#E0E2E6] p-6 bg-white hover:border-[#003A99] transition-colors flex flex-col"
              >
                <div className="mb-4">{option.icon}</div>
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{option.title}</h3>
                <p className="text-sm text-[#4A4F59] flex-grow">{option.description}</p>
                <Link 
                  href={option.link}
                  className="mt-4 inline-flex items-center gap-2 text-[#1A7F00] font-semibold hover:text-[#136000] transition-colors"
                >
                  {option.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#003A99] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg font-medium">
            "And do not forget to do good and to share with others, for with such sacrifices God is pleased."
          </p>
          <p className="text-sm text-white/70 mt-2">Hebrews 13:16</p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-4" />
          <p className="mt-4 text-white/80">
            Join us in transforming the lives of teen mothers in Malawi.
          </p>
        </div>
      </section>
    </div>
  )
}
