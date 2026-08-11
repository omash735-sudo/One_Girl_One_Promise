import Link from 'next/link'
import { 
  HeartHandshake, 
  GraduationCap, 
  Gift, 
  CalendarHeart, 
  Package, 
  Bus, 
  Home, 
  ShoppingBag, 
  Megaphone,
  ArrowLeft
} from 'lucide-react'

export default function SupportPage() {
  const supportOptions = [
    {
      id: 'sponsor',
      icon: <GraduationCap className="w-8 h-8 text-[#003A99]" />,
      title: 'Sponsor a Girl',
      description: 'Help a young mother return to school by covering education costs, school fees, uniforms, books, and essential needs.',
      ctaText: 'Sponsor Now',
      ctaLink: '/support/sponsor',
      bgColor: 'bg-white'
    },
    {
      id: 'donate',
      icon: <HeartHandshake className="w-8 h-8 text-[#1A7F00]" />,
      title: 'Make a Donation',
      description: 'Your contribution helps OGOP provide education, counselling, skills development, and essential support to young mothers.',
      ctaText: 'Donate Now',
      ctaLink: '/support/donate',
      bgColor: 'bg-white'
    },
    {
      id: 'monthly',
      icon: <CalendarHeart className="w-8 h-8 text-[#003A99]" />,
      title: 'Donate Monthly',
      description: 'Become a monthly supporter and provide predictable, consistent support that helps OGOP plan and sustain its programs.',
      ctaText: 'Give Monthly',
      ctaLink: '/support/monthly',
      bgColor: 'bg-white'
    },
    {
      id: 'supplies',
      icon: <Package className="w-8 h-8 text-[#1A7F00]" />,
      title: 'Donate Supplies',
      description: 'Contribute school uniforms, bags, books, stationery, sanitary products, or other essential items for teen mothers.',
      ctaText: 'Donate Supplies',
      ctaLink: '/support/supplies',
      bgColor: 'bg-white'
    },
    {
      id: 'transport',
      icon: <Bus className="w-8 h-8 text-[#003A99]" />,
      title: 'Support Transportation',
      description: 'Help girls safely travel to and from school by covering transportation costs, removing a significant barrier to education.',
      ctaText: 'Support Transport',
      ctaLink: '/support/transport',
      bgColor: 'bg-white'
    },
    {
      id: 'housing',
      icon: <Home className="w-8 h-8 text-[#1A7F00]" />,
      title: 'Support Housing',
      description: 'Provide safe accommodation for girls who cannot remain at home while pursuing their education.',
      ctaText: 'Support Housing',
      ctaLink: '/support/housing',
      bgColor: 'bg-white'
    },
    {
      id: 'essentials',
      icon: <ShoppingBag className="w-8 h-8 text-[#003A99]" />,
      title: 'Support Essential Needs',
      description: 'Help cover groceries, personal necessities, and basic living expenses that enable girls to focus on their education.',
      ctaText: 'Support Essentials',
      ctaLink: '/support/essentials',
      bgColor: 'bg-white'
    },
    {
      id: 'fundraise',
      icon: <Megaphone className="w-8 h-8 text-[#1A7F00]" />,
      title: 'Fundraise for OGOP',
      description: 'Organize a birthday fundraiser, school campaign, community event, or online initiative to raise funds for OGOP.',
      ctaText: 'Start Fundraising',
      ctaLink: '/support/fundraise',
      bgColor: 'bg-white'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Back to Home */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-[#003A99] font-medium hover:text-[#002A70] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-[#003A99] text-white py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Support a Girl. <span className="text-[#FFEB00]">Change a Future.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Your support helps young mothers return to school, rebuild their confidence, 
            and create a better future for themselves and their children.
          </p>
          <div className="w-16 h-1 bg-[#FFEB00] mx-auto mt-6" />
        </div>
      </section>

      {/* Support Options Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A1A1A]">
              How You Can <span className="text-[#003A99]">Support</span>
            </h2>
            <p className="text-[#4A4F59] mt-2">
              Choose the way that feels right for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportOptions.map((option) => (
              <div 
                key={option.id}
                className="border border-[#E0E2E6] p-6 bg-white hover:border-[#003A99] transition-colors"
              >
                <div className="mb-4">{option.icon}</div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{option.title}</h3>
                <p className="text-sm text-[#4A4F59] mb-4">{option.description}</p>
                <Link
                  href={option.ctaLink}
                  className="inline-block text-[#1A7F00] font-semibold hover:text-[#136000] transition-colors"
                >
                  {option.ctaText} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-12 bg-white border-t border-[#E0E2E6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-[#1A1A1A] mb-2">
            Want to do more than donate?
          </h3>
          <p className="text-[#4A4F59] mb-6">
            Become part of the OGOP community through volunteering, partnerships, and more.
          </p>
          <Link
            href="/join"
            className="inline-block bg-[#1A7F00] text-white px-8 py-3 font-bold hover:bg-[#136000] transition-colors"
          >
            Join the OGOP Community →
          </Link>
        </div>
      </section>
    </div>
  )
}
